import type mapboxgl from "mapbox-gl";
import type { Map as MapboxMap, MapMouseEvent } from "mapbox-gl";
import type { Pt } from "@/lib/geo";
import type { StrikeDataset } from "@/lib/strike-data";
import { HOVER_PINK, LEASE_COLOR, isInteractive, type EngineOptions, type MapEngine } from "./engine";

type MapboxModule = typeof mapboxgl;

const NONE = ["==", ["get", "idx"], -1];
const idxIn = (arr: number[]) => (arr.length ? ["in", ["get", "idx"], ["literal", arr]] : NONE);

function wellsGeoJSON(d: StrikeDataset): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: d.WELLS.map((w) => ({
      type: "Feature",
      properties: { idx: w.idx, cat: w.cat, layer: d.CATS[w.cat].layer, color: d.CATS[w.cat].color },
      geometry: { type: "Point", coordinates: [w.lng, w.lat] },
    })),
  };
}

function lateralsGeoJSON(d: StrikeDataset): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: d.LATERALS.map((l) => ({
      type: "Feature",
      // idx = the owning well, so selection filters work the same as for well dots.
      properties: { color: l.color, idx: l.wellIdx, layer: d.CATS[d.WELLS[l.wellIdx]?.cat ?? "oil"].layer },
      geometry: { type: "LineString", coordinates: [l.a, l.b] },
    })),
  };
}

function leasesGeoJSON(d: StrikeDataset): GeoJSON.FeatureCollection {
  return {
    type: "FeatureCollection",
    features: d.LEASES.map((ls) => ({
      type: "Feature",
      properties: { idx: ls.idx },
      geometry: { type: "Polygon", coordinates: [ls.coords] },
    })),
  };
}

function gridGeoJSON(d: StrikeDataset): GeoJSON.FeatureCollection {
  const { BOUNDS: b, GRID } = d;
  const lines: [number, number][][] = [
    ...GRID.v.map((lng): [number, number][] => [[lng, b.s], [lng, b.n]]),
    ...GRID.h.map((lat): [number, number][] => [[b.w, lat], [b.e, lat]]),
  ];
  return {
    type: "FeatureCollection",
    features: lines.map((coordinates) => ({ type: "Feature", properties: {}, geometry: { type: "LineString", coordinates } })),
  };
}

const LAYER_IDS = ["grid", "laterals-sel", "laterals", "leases-fill", "leases-sel-fill", "leases-line", "leases-sel", "wells", "wells-sel", "wells-hover"];

/** Mapbox GL renderer. Mirrors the canvas engine's look and interaction rules. */
export class MapboxMapEngine implements MapEngine {
  private map: MapboxMap;
  private selected: number[] = [];
  private selectedLeases: number[] = [];
  private hoverIdx: number | null = null;
  private styleUrl: string;

  private styleLoaded = false;
  private resizeObserver: ResizeObserver;
  private failTimer: ReturnType<typeof setTimeout>;

  /** `onFail` fires if the first style never loads (bad token, blocked network, private style). */
  constructor(
    mapbox: MapboxModule,
    container: HTMLElement,
    token: string,
    private opts: EngineOptions,
    onFail: (err: unknown) => void = () => {},
  ) {
    mapbox.accessToken = token;
    this.styleUrl = this.currentStyleUrl();
    this.map = new mapbox.Map({
      container,
      style: this.styleUrl,
      center: [opts.data.CENTER.lng, opts.data.CENTER.lat],
      zoom: 10.4,
      attributionControl: false,
    });
    const fail = (err: unknown) => {
      if (this.styleLoaded) return;
      clearTimeout(this.failTimer);
      this.styleLoaded = true; // report once
      onFail(err);
    };
    this.failTimer = setTimeout(() => fail(new Error("Mapbox style did not load within 12s")), 12000);
    this.map.on("error", (e) => fail(e.error));
    this.map.on("style.load", () => {
      this.styleLoaded = true;
      clearTimeout(this.failTimer);
      this.addLayers();
    });
    // Follow container size changes (e.g. the mobile Insights sheet), not just window resizes.
    this.resizeObserver = new ResizeObserver(() => this.map.resize());
    this.resizeObserver.observe(container);
    this.map.on("click", (e) => this.onClick(e));
    this.map.on("mousemove", (e) => this.onMove(e));
  }

  private currentStyleUrl() {
    const o = this.opts;
    return (
      (o.theme === "light" ? o.lightBasemapStyle : o.darkBasemapStyle) ||
      (o.theme === "light" ? "mapbox://styles/mapbox/light-v11" : "mapbox://styles/mapbox/dark-v11")
    );
  }

  private dotRadius(): mapboxgl.ExpressionSpecification {
    const r = this.opts.tweaks.dotSize || 4;
    return ["interpolate", ["linear"], ["zoom"], 8, 2, 12, r, 15, r + 3];
  }

  private addLayers() {
    const map = this.map, d = this.opts.data;
    if (map.getSource("wells")) return;
    const r = this.opts.tweaks.dotSize || 4;

    map.addSource("grid", { type: "geojson", data: gridGeoJSON(d) });
    map.addLayer({ id: "grid", type: "line", source: "grid", paint: { "line-color": this.opts.theme === "dark" ? "#ffffff" : "#000000", "line-opacity": 0.06, "line-width": 1 } });

    map.addSource("laterals", { type: "geojson", data: lateralsGeoJSON(d) });
    // Halo under the selected wellbores (white) or the Object Selection hover (pink).
    map.addLayer({
      id: "laterals-sel", type: "line", source: "laterals", filter: NONE as mapboxgl.FilterSpecification,
      layout: { "line-cap": "round" },
      paint: { "line-color": "#fff", "line-width": 7 },
    });
    map.addLayer({ id: "laterals", type: "line", source: "laterals", paint: { "line-color": ["get", "color"], "line-width": 2, "line-opacity": 0.85 } });

    map.addSource("leases", { type: "geojson", data: leasesGeoJSON(d) });
    map.addLayer({ id: "leases-fill", type: "fill", source: "leases", paint: { "fill-color": LEASE_COLOR, "fill-opacity": 0.1 } });
    map.addLayer({ id: "leases-sel-fill", type: "fill", source: "leases", filter: NONE as mapboxgl.FilterSpecification, paint: { "fill-color": LEASE_COLOR, "fill-opacity": 0.3 } });
    map.addLayer({ id: "leases-line", type: "line", source: "leases", paint: { "line-color": LEASE_COLOR, "line-width": 1.4, "line-opacity": 0.75 } });
    map.addLayer({ id: "leases-sel", type: "line", source: "leases", filter: NONE as mapboxgl.FilterSpecification, paint: { "line-color": "#fff", "line-width": 2.5 } });

    map.addSource("wells", { type: "geojson", data: wellsGeoJSON(d) });
    map.addLayer({ id: "wells", type: "circle", source: "wells", paint: { "circle-radius": this.dotRadius(), "circle-color": ["get", "color"] } });
    map.addLayer({
      id: "wells-sel", type: "circle", source: "wells", filter: NONE as mapboxgl.FilterSpecification,
      paint: { "circle-radius": r + 7, "circle-color": "rgba(0,0,0,0)", "circle-stroke-color": "#fff", "circle-stroke-width": 2 },
    });
    map.addLayer({
      id: "wells-hover", type: "circle", source: "wells", filter: NONE as mapboxgl.FilterSpecification,
      paint: { "circle-radius": r + 5, "circle-color": "rgba(255,80,160,0.22)", "circle-stroke-color": HOVER_PINK, "circle-stroke-width": 2 },
    });

    this.apply();
    this.setSelected(this.selected);
    this.setSelectedLeases(this.selectedLeases);
  }

  private ready() {
    return !!this.map.getLayer("wells");
  }

  /** Filter that hides records whose layer is switched off (rings follow it, like the canvas engine). */
  private layerFilter(): unknown[] {
    const hidden = (["wells", "permits", "rigs"] as const).filter((k) => this.opts.layers[k] === false);
    return hidden.length ? ["!", ["in", ["get", "layer"], ["literal", hidden]]] : ["literal", true];
  }

  /** Push layer visibility, view-only dimming, density and label tweaks into the style. */
  private apply() {
    if (!this.ready()) return;
    const map = this.map, L = this.opts.layers, tw = this.opts.tweaks;
    const r = tw.dotSize || 4;
    const filters: unknown[] = ["all", this.layerFilter()];
    if (tw.density < 1) filters.push(["<", ["%", ["get", "idx"], 1000], tw.density * 1000]);
    map.setFilter("wells", filters as mapboxgl.FilterSpecification);
    map.setPaintProperty("wells", "circle-radius", this.dotRadius());
    map.setPaintProperty("wells-sel", "circle-radius", r + 7);
    map.setPaintProperty("wells-hover", "circle-radius", r + 5);
    this.setSelected(this.selected);
    map.setPaintProperty("wells", "circle-opacity", [
      "case",
      ["==", ["get", "layer"], "wells"], L.wells === "view" ? 0.65 : 1,
      ["==", ["get", "layer"], "permits"], L.permits === "view" ? 0.65 : 1,
      ["==", ["get", "layer"], "rigs"], L.rigs === "view" ? 0.65 : 1,
      1,
    ]);
    map.setLayoutProperty("laterals", "visibility", L.wells === false ? "none" : "visible");
    map.setLayoutProperty("laterals-sel", "visibility", L.wells === false ? "none" : "visible");
    map.setFilter(
      "laterals",
      (tw.density < 1 ? ["<", ["%", ["get", "idx"], 1000], tw.density * 1000] : null) as mapboxgl.FilterSpecification | null,
    );
    map.setPaintProperty("laterals", "line-opacity", L.wells === "view" ? 0.65 : 0.85);
    const leaseVis = L.landtracLease === false ? "none" : "visible";
    ["leases-fill", "leases-sel-fill", "leases-line", "leases-sel"].forEach((id) => map.setLayoutProperty(id, "visibility", leaseVis));
    map.setPaintProperty("leases-fill", "fill-opacity", L.landtracLease === "view" ? 0.05 : 0.1);
    map.setPaintProperty("leases-line", "line-opacity", L.landtracLease === "view" ? 0.4 : 0.75);
    map.setLayoutProperty("grid", "visibility", tw.grid ? "visible" : "none");
    // "Map labels" tweak toggles every symbol layer that belongs to the basemap style.
    for (const layer of map.getStyle()?.layers ?? []) {
      if (layer.type === "symbol" && !LAYER_IDS.includes(layer.id)) {
        map.setLayoutProperty(layer.id, "visibility", tw.labels ? "visible" : "none");
      }
    }
  }

  private interactiveWellAt(e: MapMouseEvent): number | null {
    if (!this.ready()) return null;
    const hits = this.map.queryRenderedFeatures(e.point, { layers: ["wells"] });
    const hit = hits.find((f) => isInteractive(this.opts.layers, f.properties?.layer));
    if (hit) return hit.properties!.idx as number;
    // Laterals are thin, so accept clicks within 5px of the line.
    const { x, y } = e.point;
    const lines = this.map.queryRenderedFeatures(
      [
        [x - 5, y - 5],
        [x + 5, y + 5],
      ],
      { layers: ["laterals"] },
    );
    const line = lines.find((f) => isInteractive(this.opts.layers, f.properties?.layer));
    return line ? (line.properties!.idx as number) : null;
  }

  private onClick(e: MapMouseEvent) {
    if (!this.ready()) return;
    const ctrl = !!(e.originalEvent && (e.originalEvent.ctrlKey || e.originalEvent.metaKey));
    const idx = this.interactiveWellAt(e);
    if (idx != null) return this.opts.onSelect(idx, ctrl);
    if (this.opts.layers.landtracLease === true) {
      const leases = this.map.queryRenderedFeatures(e.point, { layers: ["leases-fill"] });
      if (leases[0]) return this.opts.onSelectLease(leases[0].properties!.idx as number, ctrl);
    }
    this.opts.onEmptyClick();
  }

  private onMove(e: MapMouseEvent) {
    const idx = this.interactiveWellAt(e);
    this.map.getCanvas().style.cursor = idx != null ? "pointer" : "";
    if (idx !== this.hoverIdx) {
      this.hoverIdx = idx;
      this.applyHover();
    }
  }

  private applyHover() {
    if (!this.ready()) return;
    const show = this.opts.drawTool === "object-select" && this.hoverIdx != null;
    this.map.setFilter(
      "wells-hover",
      (show ? ["all", this.layerFilter(), ["==", ["get", "idx"], this.hoverIdx]] : NONE) as mapboxgl.FilterSpecification,
    );
    this.applyLateralHighlight();
  }

  project(lng: number, lat: number): Pt {
    const p = this.map.project([lng, lat]);
    return { x: p.x, y: p.y };
  }

  setOptions(opts: Partial<EngineOptions>) {
    Object.assign(this.opts, opts);
    const next = this.currentStyleUrl();
    if (next !== this.styleUrl) {
      this.styleUrl = next;
      this.map.setStyle(next); // "style.load" re-adds our layers
      return;
    }
    this.apply();
    this.applyHover();
  }

  setSelected(idxs: number[]) {
    this.selected = idxs;
    if (this.ready()) {
      this.map.setFilter("wells-sel", ["all", this.layerFilter(), idxIn(idxs)] as mapboxgl.FilterSpecification);
      this.applyLateralHighlight();
    }
  }

  /** Selected wellbores get a white halo and a thicker line; the Object Selection hover a pink halo. */
  private applyLateralHighlight() {
    if (!this.ready()) return;
    const sel = ["literal", this.selected];
    const hover = this.opts.drawTool === "object-select" ? this.hoverIdx : null;
    const shown: unknown[] = ["any", ["in", ["get", "idx"], sel]];
    if (hover != null) shown.push(["==", ["get", "idx"], hover]);
    this.map.setFilter("laterals-sel", shown as mapboxgl.FilterSpecification);
    this.map.setPaintProperty("laterals-sel", "line-color", ["case", ["in", ["get", "idx"], sel], "#ffffff", HOVER_PINK]);
    this.map.setPaintProperty("laterals", "line-width", ["case", ["in", ["get", "idx"], sel], 3.5, 2]);
  }

  setSelectedLeases(idxs: number[]) {
    this.selectedLeases = idxs;
    if (!this.ready()) return;
    const f = idxIn(idxs) as mapboxgl.FilterSpecification;
    this.map.setFilter("leases-sel", f);
    this.map.setFilter("leases-sel-fill", f);
  }

  destroy() {
    clearTimeout(this.failTimer);
    this.resizeObserver.disconnect();
    try {
      this.map.remove();
    } catch {
      /* already removed */
    }
  }
}
