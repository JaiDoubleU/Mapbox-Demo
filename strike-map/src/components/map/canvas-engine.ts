import { BASEMAP_IMAGES } from "@/lib/basemap-images";
import { pointInPoly, type Pt } from "@/lib/geo";
import type { Lease, Well } from "@/lib/strike-data";
import {
  CANVAS_PALETTES,
  HOVER_PINK,
  LEASE_COLOR,
  isInteractive,
  passesDensity,
  type EngineOptions,
  type MapEngine,
} from "./engine";

/**
 * Canvas basemap fallback: survey grid, roads, leases, laterals and well dots on a
 * flat equirectangular projection. Used when no Mapbox token is configured.
 */
export class CanvasMapEngine implements MapEngine {
  private ctx: CanvasRenderingContext2D;
  private cLng: number;
  private cLat: number;
  private scale = 2600; // px per degree latitude
  private W = 0;
  private H = 0;
  private selected: number[] = [];
  private selectedLeases: number[] = [];
  private hoverIdx: number | null = null;
  private cleanup: (() => void)[] = [];
  private basemaps = new Map<string, HTMLImageElement>();

  constructor(private cv: HTMLCanvasElement, private opts: EngineOptions) {
    this.ctx = cv.getContext("2d")!;
    this.cLng = opts.data.CENTER.lng;
    this.cLat = opts.data.CENTER.lat;
    this.bind();
    this.resize();
  }

  private listen<K extends keyof WindowEventMap>(target: Window, type: K, fn: (e: WindowEventMap[K]) => void): void;
  private listen<K extends keyof HTMLElementEventMap>(
    target: HTMLElement,
    type: K,
    fn: (e: HTMLElementEventMap[K]) => void,
    o?: AddEventListenerOptions,
  ): void;
  private listen(target: Window | HTMLElement, type: string, fn: (e: Event) => void, o?: AddEventListenerOptions) {
    target.addEventListener(type, fn, o);
    this.cleanup.push(() => target.removeEventListener(type, fn, o));
  }

  private bind() {
    const cv = this.cv;
    // Pointer events cover mouse, pen and touch: one pointer pans, two pointers pinch-zoom.
    const pointers = new Map<number, { x: number; y: number }>();
    let moved = 0;
    let pinchDist = 0;
    cv.style.touchAction = "none";
    const local = (e: { clientX: number; clientY: number }) => {
      const r = cv.getBoundingClientRect();
      return { x: e.clientX - r.left, y: e.clientY - r.top };
    };
    const pinchState = () => {
      const [a, b] = [...pointers.values()];
      return { mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 }, d: Math.hypot(a.x - b.x, a.y - b.y) };
    };

    this.listen(cv, "pointerdown", (e) => {
      cv.setPointerCapture(e.pointerId);
      pointers.set(e.pointerId, local(e));
      if (pointers.size === 1) moved = 0;
      if (pointers.size === 2) pinchDist = pinchState().d;
      cv.style.cursor = "grabbing";
    });
    const release = (e: PointerEvent) => {
      pointers.delete(e.pointerId);
      if (pointers.size < 2) pinchDist = 0;
      if (!pointers.size) cv.style.cursor = "grab";
    };
    this.listen(cv, "pointerup", release);
    this.listen(cv, "pointercancel", release);
    this.listen(cv, "pointermove", (e) => {
      const pt = local(e);
      const prev = pointers.get(e.pointerId);
      if (!prev) {
        // Hover (mouse/pen only): pointer cursor and the Object Selection highlight.
        const hit = this.hitWell(pt.x, pt.y);
        const ni = hit ? hit.idx : null;
        if (ni !== this.hoverIdx) {
          this.hoverIdx = ni;
          cv.style.cursor = ni != null ? "pointer" : "grab";
          this.draw();
        }
        return;
      }
      if (pointers.size === 2) {
        const before = pinchState();
        pointers.set(e.pointerId, pt);
        const after = pinchState();
        moved += 10; // a pinch is never a tap
        if (pinchDist > 0 && before.d > 0) this.zoomAt(after.mid.x, after.mid.y, after.d / before.d);
        this.panBy(after.mid.x - before.mid.x, after.mid.y - before.mid.y);
        return;
      }
      const dx = pt.x - prev.x, dy = pt.y - prev.y;
      pointers.set(e.pointerId, pt);
      moved += Math.abs(dx) + Math.abs(dy);
      this.panBy(dx, dy);
    });
    this.listen(cv, "click", (e) => {
      if (moved > 5) return;
      const { x, y } = local(e);
      const ctrl = e.ctrlKey || e.metaKey;
      const hit = this.hitWell(x, y);
      if (hit) return this.opts.onSelect(hit.idx, ctrl);
      const lease = this.hitLease(x, y);
      if (lease) return this.opts.onSelectLease(lease.idx, ctrl);
      this.opts.onEmptyClick();
    });
    this.listen(
      cv,
      "wheel",
      (e) => {
        e.preventDefault();
        const { x, y } = local(e);
        this.zoomAt(x, y, Math.pow(1.0015, -e.deltaY));
      },
      { passive: false },
    );
  }

  private panBy(dx: number, dy: number) {
    const sLng = this.scale * Math.cos((this.cLat * Math.PI) / 180);
    this.cLng -= dx / sLng;
    this.cLat += dy / this.scale;
    this.clamp();
    this.draw();
  }

  /** Zoom by `factor`, keeping the point under (mx, my) fixed. */
  private zoomAt(mx: number, my: number, factor: number) {
    const before = this.unproject(mx, my);
    this.scale = Math.max(900, Math.min(40000, this.scale * factor));
    const after = this.unproject(mx, my);
    this.cLng += before.lng - after.lng;
    this.cLat += before.lat - after.lat;
    this.clamp();
    this.draw();
  }

  private clamp() {
    const b = this.opts.data.BOUNDS;
    this.cLng = Math.max(b.w - 0.1, Math.min(b.e + 0.1, this.cLng));
    this.cLat = Math.max(b.s - 0.1, Math.min(b.n + 0.1, this.cLat));
  }

  private resize() {
    const dpr = window.devicePixelRatio || 1;
    const w = this.cv.clientWidth, h = this.cv.clientHeight;
    this.cv.width = w * dpr;
    this.cv.height = h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.W = w;
    this.H = h;
    this.draw();
  }

  project(lng: number, lat: number): Pt {
    const sLng = this.scale * Math.cos((this.cLat * Math.PI) / 180);
    return { x: this.W / 2 + (lng - this.cLng) * sLng, y: this.H / 2 - (lat - this.cLat) * this.scale };
  }

  private unproject(x: number, y: number) {
    const sLng = this.scale * Math.cos((this.cLat * Math.PI) / 180);
    return { lng: this.cLng + (x - this.W / 2) / sLng, lat: this.cLat - (y - this.H / 2) / this.scale };
  }

  private hitWell(x: number, y: number): Well | null {
    const { data: d, layers, tweaks } = this.opts;
    const rad = (tweaks.dotSize || 4) + 5;
    let best: Well | null = null, bestD = rad * rad;
    for (const w of d.WELLS) {
      if (!isInteractive(layers, d.CATS[w.cat].layer)) continue;
      if (!passesDensity(w.idx, tweaks.density)) continue;
      const p = this.project(w.lng, w.lat);
      if (p.x < -10 || p.x > this.W + 10 || p.y < -10 || p.y > this.H + 10) continue;
      const dd = (p.x - x) ** 2 + (p.y - y) ** 2;
      if (dd < bestD) {
        bestD = dd;
        best = w;
      }
    }
    return best;
  }

  private hitLease(x: number, y: number): Lease | null {
    const { data: d, layers } = this.opts;
    if (layers.landtracLease !== true) return null;
    for (let i = d.LEASES.length - 1; i >= 0; i--) {
      const ls = d.LEASES[i];
      if (pointInPoly(x, y, ls.coords.map((c) => this.project(c[0], c[1])))) return ls;
    }
    return null;
  }

  /** Pre-rendered snapshot of the current style, if one has been generated and has loaded. */
  private basemapFor(style: string): HTMLImageElement | null {
    const entry = BASEMAP_IMAGES[style];
    if (!entry) return null;
    let img = this.basemaps.get(style);
    if (!img) {
      img = new Image();
      img.onload = () => this.draw();
      img.src = entry.src;
      this.basemaps.set(style, img);
    }
    return img.complete && img.naturalWidth ? img : null;
  }

  setOptions(opts: Partial<EngineOptions>) {
    Object.assign(this.opts, opts);
    this.draw();
  }

  setSelected(idxs: number[]) {
    this.selected = idxs;
    this.draw();
  }

  setSelectedLeases(idxs: number[]) {
    this.selectedLeases = idxs;
    this.draw();
  }

  private draw() {
    const ctx = this.ctx, { data: d, tweaks: tw, layers } = this.opts;
    if (!this.W || !this.H) return;
    const dark = this.opts.theme === "dark";
    const styleName = dark ? this.opts.darkBasemapStyle : this.opts.lightBasemapStyle;
    const pal =
      CANVAS_PALETTES[styleName] ||
      (dark
        ? { bg: "#15171a", road: "rgba(180,185,190,0.28)", grid: "rgba(255,255,255,0.045)" }
        : { bg: "#e7e9ec", road: "rgba(120,125,130,0.5)", grid: "rgba(0,0,0,0.06)" });
    const visible = (w: Well) => layers[d.CATS[w.cat].layer] !== false;
    const r = tw.dotSize || 4;

    ctx.clearRect(0, 0, this.W, this.H);
    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, this.W, this.H);

    // Mapbox snapshot, georeferenced to its bbox. It replaces the synthetic roads and place names.
    const basemap = this.basemapFor(styleName);
    if (basemap) {
      const [w, s, e, n] = BASEMAP_IMAGES[styleName].bbox;
      const nw = this.project(w, n), se = this.project(e, s);
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(basemap, nw.x, nw.y, se.x - nw.x, se.y - nw.y);
    }

    // survey grid
    if (tw.grid) {
      ctx.strokeStyle = pal.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      d.GRID.v.forEach((lng) => {
        const p = this.project(lng, this.cLat);
        ctx.moveTo(p.x, 0);
        ctx.lineTo(p.x, this.H);
      });
      d.GRID.h.forEach((lat) => {
        const p = this.project(this.cLng, lat);
        ctx.moveTo(0, p.y);
        ctx.lineTo(this.W, p.y);
      });
      ctx.stroke();
    }

    // roads
    ctx.strokeStyle = pal.road;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    (basemap ? [] : d.ROADS).forEach((line) => {
      ctx.beginPath();
      line.forEach((pt, i) => {
        const p = this.project(pt[0], pt[1]);
        if (i) ctx.lineTo(p.x, p.y);
        else ctx.moveTo(p.x, p.y);
      });
      ctx.stroke();
    });

    // lease parcels
    if (layers.landtracLease !== false) {
      const leaseView = layers.landtracLease === "view";
      d.LEASES.forEach((ls) => {
        ctx.beginPath();
        ls.coords.forEach((pt, i) => {
          const p = this.project(pt[0], pt[1]);
          if (i) ctx.lineTo(p.x, p.y);
          else ctx.moveTo(p.x, p.y);
        });
        ctx.closePath();
        const sel = this.selectedLeases.includes(ls.idx);
        ctx.globalAlpha = leaseView ? 0.5 : 1;
        ctx.fillStyle = sel ? "rgba(212,162,74,0.32)" : "rgba(212,162,74,0.10)";
        ctx.fill();
        ctx.strokeStyle = sel ? "#fff" : LEASE_COLOR;
        ctx.lineWidth = sel ? 2.5 : 1.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
    }

    // laterals
    if (layers.wells !== false) {
      ctx.lineWidth = 2.2;
      ctx.globalAlpha = layers.wells === "view" ? 0.65 * 0.9 : 0.9;
      d.LATERALS.forEach((l) => {
        const a = this.project(l.a[0], l.a[1]), b = this.project(l.b[0], l.b[1]);
        ctx.strokeStyle = l.color;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }

    // well dots
    for (const w of d.WELLS) {
      if (!passesDensity(w.idx, tw.density) || !visible(w)) continue;
      const p = this.project(w.lng, w.lat);
      if (p.x < -8 || p.x > this.W + 8 || p.y < -8 || p.y > this.H + 8) continue;
      ctx.globalAlpha = layers[d.CATS[w.cat].layer] === "view" ? 0.65 : 1;
      ctx.fillStyle = d.CATS[w.cat].color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, w.cat === "rig" ? r + 1.5 : r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    // survey labels
    if (tw.labels && this.scale > 1700) {
      ctx.fillStyle = dark ? "rgba(150,155,162,0.65)" : "rgba(70,75,80,0.7)";
      ctx.font = "10px 'Roboto Flex', sans-serif";
      ctx.textAlign = "center";
      d.LABELS.forEach((lb) => {
        const p = this.project(lb.lng, lb.lat);
        if (p.x < 0 || p.x > this.W || p.y < 0 || p.y > this.H) return;
        ctx.fillText(lb.l1, p.x, p.y - 5);
        ctx.fillText(lb.l2, p.x, p.y + 7);
      });
    }

    // place names
    ctx.fillStyle = dark ? "rgba(210,214,219,0.92)" : "rgba(40,44,48,0.92)";
    ctx.font = "600 13px 'Roboto Flex', sans-serif";
    ctx.textAlign = "center";
    (basemap ? [] : d.PLACES).forEach((pl) => {
      const p = this.project(pl.lng, pl.lat);
      if (p.x < 0 || p.x > this.W || p.y < 0 || p.y > this.H) return;
      ctx.fillText(pl.name, p.x, p.y);
    });

    // selection rings: white inner ring + category-colored outer ring
    this.selected.forEach((selIdx) => {
      const w = d.WELLS[selIdx];
      if (!w || !visible(w)) return;
      const p = this.project(w.lng, w.lat);
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#fff";
      ctx.beginPath();
      ctx.arc(p.x, p.y, r + 6, 0, Math.PI * 2);
      ctx.stroke();
      ctx.strokeStyle = d.CATS[w.cat].color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, r + 9, 0, Math.PI * 2);
      ctx.stroke();
    });

    // Object Selection tool: pink hover highlight
    if (this.hoverIdx != null && this.opts.drawTool === "object-select") {
      const w = d.WELLS[this.hoverIdx];
      if (w && visible(w)) {
        const p = this.project(w.lng, w.lat);
        ctx.fillStyle = "rgba(255,80,160,0.22)";
        ctx.beginPath();
        ctx.arc(p.x, p.y, r + 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = HOVER_PINK;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    }
  }

  destroy() {
    this.cleanup.forEach((fn) => fn());
    this.cleanup = [];
  }
}
