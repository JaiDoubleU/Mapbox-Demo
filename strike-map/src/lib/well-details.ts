import { segmentFeet } from "./geo";
import type { Lateral, Well } from "./strike-data";

/**
 * Detail-panel data for one record: timeline, monthly production and completion figures.
 * The synthetic dataset only carries header fields, so these are derived deterministically
 * from the record's index — the same well always shows the same history. Replace this with
 * the real well-detail service when one is wired into data-source.ts.
 */

export interface TimelineStep {
  label: string;
  /** null while the step hasn't happened yet. */
  date: Date | null;
}

export interface ProductionMonth {
  month: Date;
  /** Daily rates averaged over the month. */
  oil: number; // BBL/d
  gas: number; // MCF/d
  water: number; // BBL/d
}

export interface WellDetails {
  /** e.g. "Well & Permit (Horizontal)" */
  kind: string;
  lateralFt: number | null;
  tvdFt: number;
  timeline: TimelineStep[];
  production: ProductionMonth[];
  cumOilBbl: number;
  cumGasMcf: number;
  oilEurMbbl: number;
  gasEurBcf: number;
  /** Per 1,000 ft of lateral (horizontal wells only). */
  oilEurPer1k: number | null;
  gasEurPer1k: number | null;
  proppantLbs: number | null;
  fluidBbl: number | null;
}

function mulberry32(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const DAY = 86_400_000;
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * DAY);
const monthStart = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);

export function wellKind(w: Well): string {
  if (w.cat === "permit") return `Permit (${w.orientation})`;
  if (w.cat === "rig") return `Active Rig (${w.orientation})`;
  const base = w.orientation === "Horizontal" || w.files.length > 8 ? "Well & Permit" : "Well";
  return `${base} (${w.orientation})`;
}

/** `lateral` is the well's mapped wellbore, if any; its length becomes the lateral length. */
export function getWellDetails(w: Well, lateral?: Lateral, today = new Date()): WellDetails {
  const rnd = mulberry32(w.idx * 7919 + 17);
  const rint = (a: number, b: number) => a + Math.floor(rnd() * (b - a + 1));
  const rflt = (a: number, b: number) => a + rnd() * (b - a);
  const horizontal = w.orientation === "Horizontal";
  const randomLateral = horizontal ? rint(42, 125) * 100 + rint(0, 99) : null; // keeps the random sequence stable
  const lateralFt = lateral ? Math.round(segmentFeet(lateral.a, lateral.b)) : randomLateral;

  // ---- timeline -----------------------------------------------------------------
  const [y, m] = w.spud.split("-").map(Number);
  let spud = new Date(y, m - 1, rint(1, 28));
  if (w.cat === "permit") spud = addDays(today, rint(20, 160)); // planned, not yet spudded
  if (w.cat === "rig") spud = addDays(today, -rint(5, 40)); // drilling now
  // A permit on the map has already been approved, even when its spud is still ahead.
  const approved = w.cat === "permit" ? addDays(today, -rint(10, 200)) : addDays(spud, -rint(25, 120));
  const rigRelease = addDays(spud, horizontal ? rint(40, 95) : rint(12, 35));
  const completion = addDays(rigRelease, rnd() < 0.35 ? 0 : rint(5, 70));
  const firstProd = addDays(completion, rint(45, 200));
  const past = (dt: Date) => (dt.getTime() <= today.getTime() ? dt : null);
  const producesNever = w.cat === "dry" || w.cat === "injection" || w.cat === "permit" || w.cat === "rig";
  const timeline: TimelineStep[] = [
    { label: "Permit Approved", date: past(approved) },
    { label: "Spud", date: past(spud) },
    { label: "Rig Release", date: w.cat === "rig" ? null : past(rigRelease) },
    { label: "Completion", date: w.cat === "rig" || w.cat === "dry" ? null : past(completion) },
    { label: "First Production", date: producesNever ? null : past(firstProd) },
  ];
  if (w.cat === "dry") timeline[3] = { label: "Plugged (Dry Hole)", date: past(addDays(rigRelease, rint(10, 60))) };

  // ---- production: hyperbolic decline from first production to today -----------
  const production: ProductionMonth[] = [];
  if (!producesNever && firstProd < today) {
    const gasWell = w.cat === "gas";
    const qi = (w.prod[0] || 300) * (horizontal ? 1.7 : 0.6) * (gasWell ? 0.15 : 1);
    const di = rflt(0.07, 0.2);
    const b = rflt(0.8, 1.2);
    const gor = w.gor * (gasWell ? 8 : 1);
    const wor = rflt(0.65, 1.5);
    // Plugged wells stop producing partway through their life.
    const months = Math.min(240, Math.round((today.getTime() - firstProd.getTime()) / (30.44 * DAY)));
    const lastMonth = w.cat === "pa" ? Math.max(3, Math.round(months * rflt(0.3, 0.8))) : months;
    let cur = monthStart(firstProd);
    // Reported through last month; the current month isn't in yet.
    const thisMonth = monthStart(today);
    for (let i = 0; i <= lastMonth; i++) {
      const ramp = i === 0 ? rflt(0.15, 0.4) : 1;
      const q = (qi / Math.pow(1 + b * di * i, 1 / b)) * ramp * rflt(0.9, 1.08);
      const water = rflt(0.9, 1.1);
      if (cur < thisMonth) production.push({
        month: cur,
        oil: Math.max(0.5, q),
        gas: Math.max(0.5, (q * gor * (1 + i * 0.012)) / 1000),
        water: Math.max(0.5, q * wor * water),
      });
      cur = new Date(cur.getFullYear(), cur.getMonth() + 1, 1);
    }
  }
  const cumOilBbl = Math.round(production.reduce((s, p) => s + p.oil * 30.44, 0));
  const cumGasMcf = Math.round(production.reduce((s, p) => s + p.gas * 30.44, 0));
  const eurFactor = rflt(1.5, 2.2);
  const oilEurMbbl = (cumOilBbl * eurFactor) / 1000;
  const gasEurBcf = (cumGasMcf * eurFactor) / 1e6;

  return {
    kind: wellKind(w),
    lateralFt,
    tvdFt: w.tvd,
    timeline,
    production,
    cumOilBbl,
    cumGasMcf,
    oilEurMbbl,
    gasEurBcf,
    oilEurPer1k: lateralFt ? oilEurMbbl / (lateralFt / 1000) : null,
    gasEurPer1k: lateralFt ? gasEurBcf / (lateralFt / 1000) : null,
    proppantLbs: w.cat === "permit" || w.cat === "rig" ? null : lateralFt ? lateralFt * rint(1500, 2100) : rint(150, 900) * 1000,
    fluidBbl: w.cat === "permit" || w.cat === "rig" ? null : lateralFt ? lateralFt * rint(35, 55) : rint(8, 40) * 1000,
  };
}

/** "46 days", "Same day", "1 year 2 months"… between two timeline steps. */
export function gapLabel(a: Date, b: Date): string {
  const days = Math.round((b.getTime() - a.getTime()) / DAY);
  if (days <= 0) return "Same day";
  return `${days.toLocaleString("en-US")} day${days === 1 ? "" : "s"}`;
}

export const fmtDate = (dt: Date) => dt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
