import { dist, pointInPoly, type Pt } from "./geo";
import type { StrikeDataset, Well } from "./strike-data";
import type { Layers } from "./types";
import { passesDensity } from "@/components/map/engine";

export type SelectionShape =
  | { type: "polygon"; pts: Pt[] }
  | { type: "circle"; center: Pt; radius: number }
  | { type: "rect"; x1: number; y1: number; x2: number; y2: number }
  | { type: "ellipse"; cx: number; cy: number; rx: number; ry: number }
  | { type: "brush"; path: Pt[]; r: number };

/** Only drawn records in fully interactive layers can be selected (same rule as clicking). */
export function selectableWells(d: StrikeDataset, layers: Layers, density = 1): Well[] {
  return d.WELLS.filter((w) => layers[d.CATS[w.cat].layer] === true && passesDensity(w.idx, density));
}

export function hitShape(p: Pt, shape: SelectionShape): boolean {
  switch (shape.type) {
    case "polygon":
      return pointInPoly(p.x, p.y, shape.pts);
    case "circle":
      return dist(p, shape.center) <= shape.radius;
    case "rect":
      return p.x >= shape.x1 && p.x <= shape.x2 && p.y >= shape.y1 && p.y <= shape.y2;
    case "ellipse": {
      const dx = (p.x - shape.cx) / Math.max(1, shape.rx);
      const dy = (p.y - shape.cy) / Math.max(1, shape.ry);
      return dx * dx + dy * dy <= 1;
    }
    case "brush":
      return shape.path.some((bp) => dist(p, bp) <= shape.r);
  }
}

/** Keyword-based stand-in for AI selection: orientation, well type, and operator/formation/field tokens. */
export function aiSelect(wells: Well[], q: string): number[] {
  const lower = q.toLowerCase();
  const hz = /\bhorizontal\b|\bhz\b/.test(lower);
  const vt = /\bvertical\b|\bvert\b/.test(lower);
  const typeTests = [
    { label: "oil well", re: /\boil wells?\b/ },
    { label: "gas well", re: /\bgas wells?\b/ },
    { label: "oil & gas well", re: /oil\s*[&+]\s*gas/ },
    { label: "injection / disposal", re: /\binject|\bdisposal/ },
    { label: "dry hole", re: /\bdry/ },
    { label: "plugged & abandoned", re: /\bplug|\babandon|\bp&a\b/ },
  ];
  let activeTypes = typeTests.filter((t) => t.re.test(lower)).map((t) => t.label);
  // "oil & gas wells" also trips the plain "gas wells" rule; it means only the combined type.
  if (activeTypes.includes("oil & gas well")) activeTypes = activeTypes.filter((t) => t !== "gas well");
  const stops = new Set([
    "select", "find", "show", "get", "give", "all", "the", "and", "or", "with", "that", "are", "have", "wells",
    "well", "from", "in", "on", "by", "for", "a", "an", "which", "where", "me", "near", "operated", "operator",
    "operators", "formation", "formations", "field", "fields", "county", "basin", "records",
  ]);
  const nameTokens = lower
    .split(/[\s,]+/)
    .filter(
      (t) =>
        t.length > 2 &&
        !stops.has(t) &&
        !["oil", "gas", "horizontal", "vertical", "inject", "dry", "plug", "abandon", "well"].some((k) => t.startsWith(k)),
    );
  return wells
    .filter((w) => {
      if (hz && w.orientation !== "Horizontal") return false;
      if (vt && w.orientation !== "Vertical") return false;
      if (activeTypes.length > 0) {
        const wt = w.type.toLowerCase();
        if (!activeTypes.includes(wt)) return false;
      }
      // Every remaining word must match the operator, formation or field ("Pioneer in Wolfcamp").
      if (nameTokens.length > 0) {
        const hay = [w.operator, w.formation, w.field || w.name].join(" ").toLowerCase();
        if (!nameTokens.every((t) => hay.includes(t))) return false;
      }
      return true;
    })
    .map((w) => w.idx);
}
