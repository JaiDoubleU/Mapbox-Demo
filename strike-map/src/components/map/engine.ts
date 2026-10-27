import type { StrikeDataset } from "@/lib/strike-data";
import type { DrawToolId, Layers, MapTweaks, Theme } from "@/lib/types";
import type { Pt } from "@/lib/geo";

export interface EngineOptions {
  data: StrikeDataset;
  theme: Theme;
  layers: Layers;
  tweaks: MapTweaks;
  drawTool: DrawToolId;
  lightBasemapStyle: string;
  darkBasemapStyle: string;
  onSelect: (idx: number, ctrl: boolean) => void;
  onSelectLease: (idx: number, ctrl: boolean) => void;
  onEmptyClick: () => void;
}

/**
 * Shared contract for both renderers (Mapbox GL and the canvas fallback), so the
 * selection tools and the React wrapper don't care which one is active.
 */
export interface MapEngine {
  /** lng/lat → pixel position relative to the map container. */
  project(lng: number, lat: number): Pt;
  setOptions(opts: Partial<EngineOptions>): void;
  setSelected(idxs: number[]): void;
  setSelectedLeases(idxs: number[]): void;
  destroy(): void;
}

/** Wells/permits/rigs are clickable only when their layer is fully interactive. */
export function isInteractive(layers: Layers, layer: keyof Layers) {
  return layers[layer] === true;
}

/** Density tweak keeps a stable subset of points (same rule in both engines). */
export function passesDensity(idx: number, density: number) {
  return density >= 1 || (idx % 1000) / 1000 < density;
}

/** Fallback canvas palettes approximating each Mapbox style. */
export const CANVAS_PALETTES: Record<string, { bg: string; road: string; grid: string }> = {
  "mapbox://styles/jaidoubleu/cmped3pws002k01sc2twg1als": { bg: "#efece4", road: "rgba(90,95,100,0.5)", grid: "rgba(0,0,0,0.05)" },
  "mapbox://styles/jaidoubleu/cksruzh4z30oh18ptegc97aan": { bg: "#e7e9ec", road: "rgba(120,125,130,0.5)", grid: "rgba(0,0,0,0.06)" },
  "mapbox://styles/jaidoubleu/cmrat1y5v000w01ri5hgtbl44": { bg: "#dfeae4", road: "rgba(60,110,90,0.5)", grid: "rgba(0,60,40,0.06)" },
  "mapbox://styles/jaidoubleu/cmolnwpmv000t01s61q70cq53": { bg: "#f4f4f4", road: "rgba(100,100,100,0.5)", grid: "rgba(0,0,0,0.05)" },
  "mapbox://styles/jaidoubleu/cmnq32zve00a301s0852df4fr": { bg: "#f0ecf5", road: "rgba(120,90,150,0.5)", grid: "rgba(60,20,90,0.06)" },
  "mapbox://styles/jaidoubleu/cmp9wzzqs000q01ri6lrldt2v": { bg: "#10151d", road: "rgba(60,140,255,0.45)", grid: "rgba(255,255,255,0.05)" },
  "mapbox://styles/jaidoubleu/cl127hars001a15qoc7cmvxjy": { bg: "#1a2029", road: "rgba(150,170,200,0.35)", grid: "rgba(255,255,255,0.05)" },
  "mapbox://styles/jaidoubleu/clm7sk7yt02qe01qi0inwduj1": { bg: "#1b1b1b", road: "rgba(170,170,170,0.3)", grid: "rgba(255,255,255,0.045)" },
  "mapbox://styles/jaidoubleu/cl24sqi6000hj15ozr8ix7fdh": { bg: "#15171a", road: "rgba(180,185,190,0.28)", grid: "rgba(255,255,255,0.045)" },
  "mapbox://styles/jaidoubleu/cmpe9zi1k000x01s3abdx3u87": { bg: "#191a1c", road: "rgba(200,200,200,0.3)", grid: "rgba(255,255,255,0.045)" },
  "mapbox://styles/jaidoubleu/cmnq2xzrv000701s4djtu2l4x": { bg: "#201828", road: "rgba(190,140,220,0.4)", grid: "rgba(255,255,255,0.05)" },
  "mapbox://styles/jaidoubleu/clm7sjoom02qr01qxdoer3830": { bg: "#15171a", road: "rgba(180,185,190,0.28)", grid: "rgba(255,255,255,0.045)" },
};

export const LEASE_COLOR = "#d4a24a";
export const HOVER_PINK = "#ff50a0";
