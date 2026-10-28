import type { Well } from "./strike-data";

/** Layer visibility: off, visible-but-not-interactive ("view"), or fully interactive. */
export type LayerState = boolean | "view";

export interface Layers {
  rigs: LayerState;
  permits: LayerState;
  wells: LayerState;
  landtracLease: LayerState;
  landtracUnit: LayerState;
}

export const DEFAULT_LAYERS: Layers = {
  rigs: true,
  permits: true,
  wells: true,
  landtracLease: true,
  landtracUnit: true,
};

export type Theme = "light" | "dark";

export interface MapTweaks {
  dotSize: number;
  density: number;
  labels: boolean;
  grid: boolean;
}

export type DrawToolId =
  | "pointer"
  | "ai-select"
  | "object-select"
  | "quick-select"
  | "rect-marquee"
  | "ellipse-marquee"
  | "magic-wand"
  | "lasso"
  | "poly-lasso"
  | "magnetic-lasso";

export interface ExportJob {
  id: string;
  name: string;
  details: string;
  time: string;
  status: "COMPLETED";
  files: number;
}

export type ApiCopyMode = "formatted" | "unformatted";

export type { Well };
