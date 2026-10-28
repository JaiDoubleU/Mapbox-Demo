import { fitArps, arpsRate, type ArpsParams } from "./dca";
import type { StrikeDataset, Well } from "./strike-data";
import { getWellDetails, type WellDetails } from "./well-details";

/**
 * Aggregations behind the Wells / Permits / Rigs tabs: production and spud counts by group,
 * completion benchmarks, and type curves. All derived from the synthetic per-well details;
 * swap for real production and completion tables when available.
 */

const DAYS_PER_MONTH = 30.44;
export const monthKey = (d: Date) => d.getFullYear() * 12 + d.getMonth();
export const keyToDate = (k: number) => new Date(Math.floor(k / 12), k % 12, 1);

// Per-well details are deterministic, so compute each once.
const detailCache = new WeakMap<Well, WellDetails>();
export function detailsFor(d: StrikeDataset, w: Well): WellDetails {
  let det = detailCache.get(w);
  if (!det) {
    det = getWellDetails(w, w.lateralIdx != null ? d.LATERALS[w.lateralIdx] : undefined);
    detailCache.set(w, det);
  }
  return det;
}

/** Every nth well so heavy aggregations stay fast on large areas; deterministic. */
export function sample<T>(items: T[], max: number): T[] {
  if (items.length <= max) return items;
  const step = items.length / max;
  return Array.from({ length: max }, (_, i) => items[Math.floor(i * step)]);
}

// ---- grouping & colours ---------------------------------------------------------

export type GroupBy = "operator" | "formation" | "type" | "status";
export const GROUP_LABELS: Record<GroupBy, string> = { operator: "Operator", formation: "Formation", type: "Well Type", status: "Status" };
export const groupOf = (w: Well, by: GroupBy) => w[by];

/** Categorical slots, fixed order (CSS tokens, light and dark steps). Past 7 groups fold into Other. */
const SLOTS = 7;
export const CAT_COLOR = (i: number) => `var(--cat-${i + 1})`;
export const OTHER = { key: "__other", label: "Other", color: "var(--cat-other)" };
export interface Group {
  key: string;
  label: string;
  color: string;
}

/**
 * The largest groups by well count get colour slots in rank order; the rest share Other.
 * Every chart in a tab ranks the same wells this way (as Quick Insights does), so an operator
 * keeps one colour across all of them.
 */
export function rankGroups(items: Well[], by: GroupBy) {
  const totals = new Map<string, number>();
  for (const w of items) totals.set(groupOf(w, by), (totals.get(groupOf(w, by)) ?? 0) + 1);
  const ranked = [...totals.entries()].filter(([, v]) => v > 0).sort((a, b) => b[1] - a[1]);
  const groups: Group[] = ranked.slice(0, SLOTS).map(([k], i) => ({ key: k, label: k, color: CAT_COLOR(i) }));
  if (ranked.length > SLOTS) groups.push(OTHER);
  const index = new Map(groups.map((g, i) => [g.key, i]));
  const otherIdx = index.get(OTHER.key);
  return { groups, indexOf: (w: Well) => index.get(groupOf(w, by)) ?? otherIdx ?? -1 };
}

// ---- historical production by group ------------------------------------------

export type Stream = "oil" | "gas";
export interface StackedSeries {
  /** Month keys (year*12 + month), ascending. */
  months: number[];
  groups: Group[];
  /** values[group][monthIndex], daily rate summed across wells. */
  values: number[][];
}

export function productionByGroup(d: StrikeDataset, wells: Well[], stream: Stream, by: GroupBy = "operator"): StackedSeries {
  const producing = wells.filter((w) => detailsFor(d, w).production.length > 0);
  const ranked = rankGroups(wells, by);
  const { indexOf } = ranked;
  // Keep only groups that produced; order and colours still follow the all-wells ranking.
  const present = new Set(producing.map(indexOf));
  const groups = ranked.groups.map((g, i) => (present.has(i) ? g : null));
  let m0 = Infinity, m1 = -Infinity;
  for (const w of producing) {
    const p = detailsFor(d, w).production;
    m0 = Math.min(m0, monthKey(p[0].month));
    m1 = Math.max(m1, monthKey(p[p.length - 1].month));
  }
  if (!producing.length) return { months: [], groups: [], values: [] };
  const months = Array.from({ length: m1 - m0 + 1 }, (_, i) => m0 + i);
  const values = groups.map(() => new Array<number>(months.length).fill(0));
  for (const w of producing) {
    const g = indexOf(w);
    if (g < 0) continue;
    for (const p of detailsFor(d, w).production) values[g][monthKey(p.month) - m0] += p[stream];
  }
  const keep = groups.map((g, i) => (g ? i : -1)).filter((i) => i >= 0);
  return { months, groups: keep.map((i) => groups[i]!), values: keep.map((i) => values[i]) };
}

// ---- spud year ------------------------------------------------------------------

export const spudYear = (w: Well) => Number(w.spud.slice(0, 4));

export interface YearCounts {
  years: number[];
  groups: Group[];
  values: number[][];
}
export function spudByGroup(wells: Well[], by: GroupBy): YearCounts {
  if (!wells.length) return { years: [], groups: [], values: [] };
  const { groups, indexOf } = rankGroups(wells, by);
  const ys = wells.map(spudYear);
  const y0 = Math.min(...ys), y1 = Math.max(...ys);
  const years = Array.from({ length: y1 - y0 + 1 }, (_, i) => y0 + i);
  const values = groups.map(() => new Array<number>(years.length).fill(0));
  wells.forEach((w, i) => {
    const g = indexOf(w);
    if (g >= 0) values[g][ys[i] - y0]++;
  });
  return { years, groups, values };
}

// ---- completion & production benchmarks ---------------------------------------

export type Metric = "lateral" | "proppant" | "fluid" | "eur" | "cum12";
export const METRICS: Record<Metric, { label: string; unit: string; digits: number }> = {
  lateral: { label: "Lateral Length", unit: "ft", digits: 0 },
  proppant: { label: "Proppant Intensity", unit: "lbs/ft", digits: 0 },
  fluid: { label: "Fluid Intensity", unit: "bbl/ft", digits: 1 },
  eur: { label: "Oil EUR per 1,000 ft", unit: "Mbbl", digits: 1 },
  cum12: { label: "First 12-Month Oil", unit: "bbl/ft", digits: 1 },
};

export function metricValue(det: WellDetails, m: Metric): number | null {
  const lat = det.lateralFt;
  if (!lat) return null;
  switch (m) {
    case "lateral":
      return lat;
    case "proppant":
      return det.proppantLbs ? det.proppantLbs / lat : null;
    case "fluid":
      return det.fluidBbl ? det.fluidBbl / lat : null;
    case "eur":
      return det.oilEurPer1k;
    case "cum12": {
      if (det.production.length < 12) return null;
      const cum = det.production.slice(0, 12).reduce((s, p) => s + p.oil * DAYS_PER_MONTH, 0);
      return cum / lat;
    }
  }
}

const quantile = (sorted: number[], q: number) => {
  if (!sorted.length) return NaN;
  const pos = (sorted.length - 1) * q, lo = Math.floor(pos), hi = Math.ceil(pos);
  return sorted[lo] + (sorted[hi] - sorted[lo]) * (pos - lo);
};
export interface Spread {
  p10: number;
  p50: number;
  p90: number;
  n: number;
}
/** Industry convention: P10 is the high case (90th percentile), P90 the low case. */
export const spread = (vals: number[]): Spread => {
  const s = [...vals].sort((a, b) => a - b);
  return { p10: quantile(s, 0.9), p50: quantile(s, 0.5), p90: quantile(s, 0.1), n: s.length };
};

export interface Benchmark extends Group, Spread {}
export function benchmarks(d: StrikeDataset, wells: Well[], metric: Metric, by: GroupBy) {
  const rows = wells.map((w) => ({ w, v: metricValue(detailsFor(d, w), metric) })).filter((r): r is { w: Well; v: number } => r.v != null && r.v > 0);
  const { groups, indexOf } = rankGroups(wells, by);
  const per = groups.map(() => [] as number[]);
  for (const r of rows) {
    const g = indexOf(r.w);
    if (g >= 0) per[g].push(r.v);
  }
  const byGroup: Benchmark[] = groups.map((g, i) => ({ ...g, ...spread(per[i]) })).filter((b) => b.n > 0);
  return { overall: spread(rows.map((r) => r.v)), byGroup: byGroup.sort((a, b) => b.p50 - a.p50) };
}

// ---- type curve -----------------------------------------------------------------

export interface TypeCurvePoint extends Spread {
  /** Months since first production. */
  t: number;
}
export interface TypeCurve {
  points: TypeCurvePoint[];
  wells: number;
  normalizedFt: number | null;
}

/**
 * Daily rate by month on production across horizontal wells: P10 / P50 / P90 at each month,
 * kept while enough wells contribute. Optionally normalised to a common lateral length.
 */
export type RateStream = Stream | "water";
export function typeCurve(d: StrikeDataset, wells: Well[], stream: RateStream, normalizeFt: number | null): TypeCurve {
  const hz = wells
    .map((w) => ({ w, det: detailsFor(d, w) }))
    .filter(({ det }) => det.lateralFt && det.production.length >= 6);
  const cols: number[][] = [];
  for (const { det } of hz) {
    const scale = normalizeFt ? normalizeFt / det.lateralFt! : 1;
    // Month 0 is the partial first month; the curve starts at the first full month.
    det.production.slice(1).forEach((p, t) => (cols[t] ??= []).push(p[stream] * scale));
  }
  const points: TypeCurvePoint[] = [];
  // Stop once fewer than 10 wells (or 10% of the starting count) still contribute; the tail gets noisy.
  const minWells = Math.max(10, Math.ceil((cols[0]?.length ?? 0) * 0.1));
  for (let t = 0; t < cols.length && cols[t].length >= minWells; t++) points.push({ t, ...spread(cols[t]) });
  return { points, wells: hz.length, normalizedFt: normalizeFt };
}

export interface TypeCurveDca {
  params: ArpsParams;
  fit: { t: number; v: number }[];
  forecast: { t: number; v: number }[];
  /** Volumes in bbl or mcf. */
  cumHistory: number;
  eur: number;
  years: number;
}
/** Arps fit to the P50 type curve, forecast to `years` of well life. */
export function typeCurveDca(curve: TypeCurve, years = 30, limit = 2): TypeCurveDca | null {
  const pts = curve.points.filter((p) => p.p50 > 0);
  if (pts.length < 6) return null;
  const params = fitArps(pts.map((p) => ({ t: p.t, q: p.p50 })));
  const fit = pts.map((p) => ({ t: p.t, v: arpsRate(params, p.t) }));
  const forecast: { t: number; v: number }[] = [];
  for (let t = pts[pts.length - 1].t + 1; t < years * 12; t++) {
    const v = arpsRate(params, t);
    if (v < limit) break;
    forecast.push({ t, v });
  }
  const cumHistory = pts.reduce((s, p) => s + p.p50 * DAYS_PER_MONTH, 0);
  const eur = cumHistory + forecast.reduce((s, f) => s + f.v * DAYS_PER_MONTH, 0);
  return { params, fit, forecast, cumHistory, eur, years };
}
