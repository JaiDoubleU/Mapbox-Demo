/* global React, mapboxgl */
// Enverus STRIKE — map engine. Mapbox GL JS when a token exists; otherwise a
// faithful canvas basemap. Both render the same dataset & honor the same props.

const D = () => window.STRIKE_DATA;

// =====================================================================
// Canvas basemap engine (vanilla) — dark survey-grid look + well dots.
// =====================================================================
class CanvasMap {
  constructor(canvas, opts) {
    this.cv = canvas;
    this.ctx = canvas.getContext("2d");
    this.opts = opts; // { theme, layers, tweaks, onSelect, onHover }
    const d = D();
    this.cLng = d.CENTER.lng;
    this.cLat = d.CENTER.lat;
    this.scale = 2600;            // px per degree latitude
    this.selected = null;
    this.hoverIdx = null;
    this._raf = null;
    this._bind();
    this.resize();
  }
  _bind() {
    this.onResize = () => this.resize();
    window.addEventListener("resize", this.onResize);
    let dragging = false, lastX = 0, lastY = 0, moved = 0;
    const cv = this.cv;
    cv.addEventListener("mousedown", (e) => { dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; cv.style.cursor = "grabbing"; });
    window.addEventListener("mouseup", () => { dragging = false; cv.style.cursor = "grab"; });
    window.addEventListener("mousemove", (e) => {
      if (dragging) {
        const dx = e.clientX - lastX, dy = e.clientY - lastY;
        moved += Math.abs(dx) + Math.abs(dy);
        lastX = e.clientX; lastY = e.clientY;
        const sLng = this.scale * Math.cos(this.cLat * Math.PI / 180);
        this.cLng -= dx / sLng;
        this.cLat += dy / this.scale;
        this._clamp();
        this.draw();
      }
    });
    cv.addEventListener("mousemove", (e) => {
      if (dragging) return;
      const r = cv.getBoundingClientRect();
      const hit = this._hit(e.clientX - r.left, e.clientY - r.top);
      const ni = hit ? hit.idx : null;
      if (ni !== this.hoverIdx) {
        this.hoverIdx = ni;
        cv.style.cursor = ni != null ? "pointer" : "grab";
        this.draw();
        this.opts.onHover && this.opts.onHover(hit, e.clientX, e.clientY);
      }
    });
    cv.addEventListener("click", (e) => {
      if (moved > 5) return;
      const r = cv.getBoundingClientRect();
      const hit = this._hit(e.clientX - r.left, e.clientY - r.top);
      if (hit) this.opts.onSelect && this.opts.onSelect(hit.idx);
    });
    cv.addEventListener("wheel", (e) => {
      e.preventDefault();
      const r = cv.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      const before = this._unproject(mx, my);
      const f = Math.pow(1.0015, -e.deltaY);
      this.scale = Math.max(900, Math.min(40000, this.scale * f));
      const after = this._unproject(mx, my);
      this.cLng += before.lng - after.lng;
      this.cLat += before.lat - after.lat;
      this._clamp();
      this.draw();
    }, { passive: false });
  }
  _clamp() {
    const b = D().BOUNDS;
    this.cLng = Math.max(b.w - 0.1, Math.min(b.e + 0.1, this.cLng));
    this.cLat = Math.max(b.s - 0.1, Math.min(b.n + 0.1, this.cLat));
  }
  resize() {
    const dpr = window.devicePixelRatio || 1;
    const w = this.cv.clientWidth, h = this.cv.clientHeight;
    this.cv.width = w * dpr; this.cv.height = h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.W = w; this.H = h;
    this.draw();
  }
  _project(lng, lat) {
    const sLng = this.scale * Math.cos(this.cLat * Math.PI / 180);
    return {
      x: this.W / 2 + (lng - this.cLng) * sLng,
      y: this.H / 2 - (lat - this.cLat) * this.scale,
    };
  }
  _unproject(x, y) {
    const sLng = this.scale * Math.cos(this.cLat * Math.PI / 180);
    return {
      lng: this.cLng + (x - this.W / 2) / sLng,
      lat: this.cLat - (y - this.H / 2) / this.scale,
    };
  }
  _hit(x, y) {
    const d = D(), layers = this.opts.layers, tw = this.opts.tweaks;
    const rad = (tw.dotSize || 4) + 5;
    let best = null, bestD = rad * rad;
    for (let i = 0; i < d.WELLS.length; i++) {
      const w = d.WELLS[i];
      if (!this._visible(w.cat, layers)) continue;
      const p = this._project(w.lng, w.lat);
      if (p.x < -10 || p.x > this.W + 10 || p.y < -10 || p.y > this.H + 10) continue;
      const dd = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y);
      if (dd < bestD) { bestD = dd; best = w; }
    }
    return best;
  }
  _visible(cat, layers) {
    const lyr = D().CATS[cat].layer;
    return layers[lyr] !== false;
  }
  setState(opts) { Object.assign(this.opts, opts); this.draw(); }
  setSelected(idx, fly) {
    this.selected = idx;
    if (fly && idx != null) {
      const w = D().WELLS[idx];
      this._tweenTo(w.lng, w.lat);
    } else this.draw();
  }
  _tweenTo(lng, lat) {
    cancelAnimationFrame(this._tw);
    const sL = this.cLng, sA = this.cLat, t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 450);
      const e = 1 - Math.pow(1 - k, 3);
      this.cLng = sL + (lng - sL) * e;
      this.cLat = sA + (lat - sA) * e;
      this.draw();
      if (k < 1) this._tw = requestAnimationFrame(step);
    };
    this._tw = requestAnimationFrame(step);
  }
  draw() {
    const ctx = this.ctx, d = D(), tw = this.opts.tweaks, layers = this.opts.layers;
    const dark = this.opts.theme !== "light";
    ctx.clearRect(0, 0, this.W, this.H);
    // background
    ctx.fillStyle = dark ? "#15171a" : "#e7e9ec";
    ctx.fillRect(0, 0, this.W, this.H);
    // subtle vignette grain via two-tone blocks (cheap texture)
    // grid
    if (tw.grid !== false) {
      ctx.strokeStyle = dark ? "rgba(255,255,255,0.045)" : "rgba(0,0,0,0.06)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      d.GRID.v.forEach((lng) => { const p = this._project(lng, this.cLat); ctx.moveTo(p.x, 0); ctx.lineTo(p.x, this.H); });
      d.GRID.h.forEach((lat) => { const p = this._project(this.cLng, lat); ctx.moveTo(0, p.y); ctx.lineTo(this.W, p.y); });
      ctx.stroke();
    }
    // roads
    ctx.strokeStyle = dark ? "rgba(180,185,190,0.28)" : "rgba(120,125,130,0.5)";
    ctx.lineWidth = 2; ctx.lineCap = "round";
    d.ROADS.forEach((line) => {
      ctx.beginPath();
      line.forEach((pt, i) => { const p = this._project(pt[0], pt[1]); i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); });
      ctx.stroke();
    });
    // laterals
    if (layers.wells !== false) {
      ctx.lineWidth = 2.2;
      d.LATERALS.forEach((l) => {
        const a = this._project(l.a[0], l.a[1]), b = this._project(l.b[0], l.b[1]);
        ctx.strokeStyle = l.color; ctx.globalAlpha = 0.9;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }
    // dots
    const r = tw.dotSize || 4;
    const density = tw.density == null ? 1 : tw.density;
    for (let i = 0; i < d.WELLS.length; i++) {
      if (density < 1 && (i % 1000) / 1000 >= density) continue;
      const w = d.WELLS[i];
      if (!this._visible(w.cat, layers)) continue;
      const p = this._project(w.lng, w.lat);
      if (p.x < -8 || p.x > this.W + 8 || p.y < -8 || p.y > this.H + 8) continue;
      ctx.fillStyle = d.CATS[w.cat].color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, w.cat === "rig" ? r + 1.5 : r, 0, 6.2832);
      ctx.fill();
    }
    // labels
    if (tw.labels !== false && this.scale > 1700) {
      ctx.fillStyle = dark ? "rgba(150,155,162,0.65)" : "rgba(70,75,80,0.7)";
      ctx.font = "10px 'Roboto Flex', sans-serif";
      ctx.textAlign = "center";
      d.LABELS.forEach((lb) => {
        const p = this._project(lb.lng, lb.lat);
        if (p.x < 0 || p.x > this.W || p.y < 0 || p.y > this.H) return;
        ctx.fillText(lb.l1, p.x, p.y - 5);
        ctx.fillText(lb.l2, p.x, p.y + 7);
      });
    }
    // place names
    ctx.fillStyle = dark ? "rgba(210,214,219,0.92)" : "rgba(40,44,48,0.92)";
    ctx.font = "600 13px 'Roboto Flex', sans-serif";
    ctx.textAlign = "center";
    d.PLACES.forEach((pl) => {
      const p = this._project(pl.lng, pl.lat);
      if (p.x < 0 || p.x > this.W || p.y < 0 || p.y > this.H) return;
      ctx.fillText(pl.name, p.x, p.y);
    });
    // selected highlight
    if (this.selected != null) {
      const w = d.WELLS[this.selected];
      if (w && this._visible(w.cat, layers)) {
        const p = this._project(w.lng, w.lat);
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(p.x, p.y, (tw.dotSize || 4) + 6, 0, 6.2832); ctx.stroke();
        ctx.strokeStyle = D().CATS[w.cat].color; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(p.x, p.y, (tw.dotSize || 4) + 9, 0, 6.2832); ctx.stroke();
      }
    }
  }
  destroy() { window.removeEventListener("resize", this.onResize); }
}

// =====================================================================
// Mapbox engine wrapper
// =====================================================================
function buildGeoJSON() {
  const d = D();
  return {
    type: "FeatureCollection",
    features: d.WELLS.map((w) => ({
      type: "Feature",
      properties: { idx: w.idx, cat: w.cat, layer: D().CATS[w.cat].layer, color: D().CATS[w.cat].color },
      geometry: { type: "Point", coordinates: [w.lng, w.lat] },
    })),
  };
}
function lateralGeoJSON() {
  const d = D();
  return {
    type: "FeatureCollection",
    features: d.LATERALS.map((l) => ({
      type: "Feature", properties: { color: l.color },
      geometry: { type: "LineString", coordinates: [l.a, l.b] },
    })),
  };
}

class MapboxMap {
  constructor(container, opts) {
    this.opts = opts;
    const d = D();
    mapboxgl.accessToken = opts.token;
    this.map = new mapboxgl.Map({
      container,
      style: opts.theme === "light" ? "mapbox://styles/mapbox/light-v11" : "mapbox://styles/mapbox/dark-v11",
      center: [d.CENTER.lng, d.CENTER.lat],
      zoom: 10.4,
      attributionControl: false,
    });
    this.map.on("load", () => this._addLayers());
  }
  _addLayers() {
    const map = this.map;
    map.addSource("laterals", { type: "geojson", data: lateralGeoJSON() });
    map.addLayer({ id: "laterals", type: "line", source: "laterals",
      paint: { "line-color": ["get", "color"], "line-width": 2, "line-opacity": 0.85 } });
    map.addSource("wells", { type: "geojson", data: buildGeoJSON() });
    map.addLayer({
      id: "wells", type: "circle", source: "wells",
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 2, 12, this.opts.tweaks.dotSize || 4, 15, (this.opts.tweaks.dotSize || 4) + 3],
        "circle-color": ["get", "color"],
        "circle-stroke-width": ["case", ["==", ["get", "idx"], ["literal", -1]], 2, 0],
      },
    });
    map.addLayer({
      id: "wells-sel", type: "circle", source: "wells",
      filter: ["==", ["get", "idx"], -1],
      paint: { "circle-radius": (this.opts.tweaks.dotSize || 4) + 7, "circle-color": "rgba(0,0,0,0)", "circle-stroke-color": "#fff", "circle-stroke-width": 2 },
    });
    map.on("click", "wells", (e) => {
      if (e.features && e.features[0]) this.opts.onSelect(e.features[0].properties.idx);
    });
    map.on("mouseenter", "wells", () => map.getCanvas().style.cursor = "pointer");
    map.on("mouseleave", "wells", () => map.getCanvas().style.cursor = "");
    this._applyLayers();
  }
  _applyLayers() {
    const map = this.map; if (!map.getLayer("wells")) return;
    const L = this.opts.layers;
    const filter = ["all"];
    const hidden = [];
    if (L.wells === false) hidden.push("wells");
    if (L.permits === false) hidden.push("permits");
    if (L.rigs === false) hidden.push("rigs");
    map.setFilter("wells", hidden.length ? ["!", ["in", ["get", "layer"], ["literal", hidden]]] : null);
    map.setLayoutProperty("laterals", "visibility", L.wells === false ? "none" : "visible");
  }
  setState(opts) {
    Object.assign(this.opts, opts);
    if (this.map.isStyleLoaded() && this.map.getLayer("wells")) {
      this._applyLayers();
      this.map.setPaintProperty("wells", "circle-radius",
        ["interpolate", ["linear"], ["zoom"], 8, 2, 12, this.opts.tweaks.dotSize || 4, 15, (this.opts.tweaks.dotSize || 4) + 3]);
    }
  }
  setSelected(idx, fly) {
    if (!this.map.getLayer("wells-sel")) return;
    this.map.setFilter("wells-sel", ["==", ["get", "idx"], idx == null ? -1 : idx]);
    if (fly && idx != null) {
      const w = D().WELLS[idx];
      this.map.easeTo({ center: [w.lng, w.lat], duration: 500 });
    }
  }
  destroy() { try { this.map.remove(); } catch (e) {} }
}

// =====================================================================
// React wrapper
// =====================================================================
function MapView({ theme, layers, tweaks, token, selectedIdx, selectSource, onSelect, onHover }) {
  const hostRef = React.useRef(null);
  const engineRef = React.useRef(null);
  const usingMapbox = !!token && token.indexOf("pk.") === 0 && token.length >= 40 && typeof mapboxgl !== "undefined";

  React.useEffect(() => {
    const host = hostRef.current;
    let engine;
    const common = { theme, layers, tweaks, onSelect, onHover, token };
    if (usingMapbox) {
      try { engine = new MapboxMap(host, common); }
      catch (e) { console.warn("Mapbox init failed, using canvas", e); }
    }
    if (!engine) {
      const cv = document.createElement("canvas");
      cv.style.width = "100%"; cv.style.height = "100%"; cv.style.cursor = "grab";
      cv.style.display = "block";
      host.appendChild(cv);
      engine = new CanvasMap(cv, common);
    }
    engineRef.current = engine;
    return () => { engine.destroy && engine.destroy(); if (host) host.innerHTML = ""; };
    // re-init only when the engine identity changes (not on every token keystroke)
    // eslint-disable-next-line
  }, [usingMapbox]);

  React.useEffect(() => { engineRef.current && engineRef.current.setState({ theme, layers, tweaks }); }, [theme, layers, tweaks]);
  React.useEffect(() => {
    if (engineRef.current) engineRef.current.setSelected(selectedIdx, selectSource === "record");
  }, [selectedIdx, selectSource]);

  return React.createElement("div", { ref: hostRef, style: { position: "absolute", inset: 0 } });
}

window.MapView = MapView;
window.STRIKE_buildGeoJSON = buildGeoJSON;
