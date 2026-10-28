import type { Well } from "./strike-data";
import type { WellDetails } from "./well-details";

/**
 * Wellbore & completion design for one well: a 2D path (TVD vs horizontal displacement),
 * casing strings, completion, tubing, liner, formation tops and a directional survey.
 * Derived deterministically from the well (the synthetic dataset has no wellbore records);
 * swap for real directional-survey and casing data when available.
 */

export interface PathPoint {
  md: number; // measured depth, ft
  tvd: number; // ft
  x: number; // horizontal displacement, ft
  inc: number; // inclination, degrees
}

export interface CasingString {
  name: string;
  sizeIn: string;
  weightLbFt: number;
  grade: string;
  topFt: number;
  bottomMdFt: number;
  cementSx: number;
}

export type Cell = string | number;
export interface DataTable {
  id: string;
  label: string;
  columns: { key: string; label: string; numeric?: boolean }[];
  rows: Record<string, Cell>[];
  empty?: string;
  /** Column the rows are already ordered by (shown with ↑); unset means natural order. */
  sortedBy?: string;
}

export interface Wellbore {
  path: PathPoint[];
  kopFt: number;
  mdFt: number;
  tvdFt: number;
  lateralFt: number | null;
  casing: CasingString[];
  /** Perforated interval (MD), when completed. */
  perfTopMd: number | null;
  perfBottomMd: number | null;
  formationTops: { name: string; tvd: number }[];
  tables: DataTable[];
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

// Midland Basin tops as a fraction of the well's TVD.
const FORMATION_TOPS: [string, number][] = [
  ["Yates", 0.3],
  ["Seven Rivers", 0.325],
  ["Queen", 0.38],
  ["Grayburg", 0.43],
  ["San Andres - High Flows H2S Corrosive", 0.465],
  ["Glorieta", 0.61],
  ["Clearfork", 0.73],
  ["Spraberry", 0.82],
  ["Spraberry - Dean", 0.95],
  ["Wolfcamp", 0.965],
];

const fmtDate = (d: Date | null) => (d ? d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "—");

export function getWellbore(w: Well, det: WellDetails): Wellbore {
  const rnd = mulberry32(w.idx * 104729 + 3);
  const rint = (a: number, b: number) => a + Math.floor(rnd() * (b - a + 1));
  const rflt = (a: number, b: number) => a + rnd() * (b - a);
  const tvd = det.tvdFt;
  const lateral = det.lateralFt;

  // ---- path: vertical with an S-shaped nudge (drift out, then hold), build curve to 90°, then the lateral
  const path: PathPoint[] = [];
  const drift = rflt(250, 550);
  const nudge = (z: number) => {
    const u = Math.min(1, Math.max(0, (z / kop - 0.15) / 0.5)); // drifts between 15% and 65% of KOP
    return u * u * (3 - 2 * u);
  };
  const radius = lateral ? rint(700, 1100) : 0;
  const kop = lateral ? tvd - radius : tvd;
  let md = 0;
  const step = 100;
  for (let z = 0; z <= kop; z += step) {
    md = z;
    path.push({ md, tvd: z, x: drift * nudge(z), inc: 0.5 + rnd() * 1.5 });
  }
  if (lateral) {
    const x0 = path[path.length - 1].x;
    for (let deg = 5; deg <= 90; deg += 5) {
      const th = (deg * Math.PI) / 180;
      path.push({ md: kop + radius * th, tvd: kop + radius * Math.sin(th), x: x0 + radius * (1 - Math.cos(th)), inc: deg });
    }
    const heel = path[path.length - 1];
    for (let s = step * 5; s <= lateral; s += step * 5) {
      path.push({ md: heel.md + s, tvd: heel.tvd + Math.sin(s / 1800) * 25, x: heel.x + s, inc: 89 + rflt(0, 2) });
    }
    // Total depth station at the toe.
    if (lateral % (step * 5)) path.push({ md: heel.md + lateral, tvd: heel.tvd + Math.sin(lateral / 1800) * 25, x: heel.x + lateral, inc: 89 + rflt(0, 2) });
    md = heel.md + lateral;
  }
  const mdFt = Math.round(md);
  const heelMd = lateral ? Math.round(kop + (radius * Math.PI) / 2) : Math.round(tvd - rint(300, 900));

  // ---- casing
  const surfaceShoe = rint(12, 18) * 100;
  const intShoe = lateral ? Math.round(kop - rint(200, 800)) : rint(40, 55) * 100;
  const casing: CasingString[] = [
    { name: "Conductor", sizeIn: "20", weightLbFt: 94, grade: "H-40", topFt: 0, bottomMdFt: rint(80, 120), cementSx: rint(150, 300) },
    { name: "Surface", sizeIn: "10-3/4", weightLbFt: 45.5, grade: "J-55", topFt: 0, bottomMdFt: surfaceShoe, cementSx: rint(900, 1400) },
    { name: "Intermediate", sizeIn: "7-5/8", weightLbFt: 29.7, grade: "HCP-110", topFt: 0, bottomMdFt: intShoe, cementSx: rint(1500, 2600) },
    { name: "Production", sizeIn: "5-1/2", weightLbFt: 20, grade: "P-110", topFt: 0, bottomMdFt: mdFt, cementSx: rint(2400, 4200) },
  ];
  const hasLiner = !lateral && rnd() < 0.3;

  // ---- tables
  const completion = det.timeline.find((t) => t.label === "Completion")?.date ?? null;
  const uwi = `${w.api}-00-00`;
  const survey = path.filter((_, i) => i % 3 === 0 || i === path.length - 1).map((p) => ({
    md: Math.round(p.md),
    inc: p.inc.toFixed(1),
    azi: (lateral ? 180 + rflt(-3, 3) : rflt(0, 360)).toFixed(1),
    tvd: Math.round(p.tvd),
    x: Math.round(p.x),
  }));

  const n = (v: number) => Math.round(v).toLocaleString("en-US");
  // Drawn in this order so the seeded values stay the same.
  const perfBottomMd = completion ? mdFt - rint(50, 150) : null;
  const tubingDepth = completion ? kop - rint(100, 400) : null;
  const formationTops = FORMATION_TOPS.filter(([, f]) => f * tvd * 1.02 < tvd + 200).map(([name, f]) => ({ name, tvd: Math.round(f * tvd * rflt(0.97, 1.03)) }));
  const tables: DataTable[] = [
    {
      id: "completions",
      label: "Completions",
      sortedBy: "uwi",
      columns: [
        { key: "uwi", label: "API14 / UWI" },
        { key: "date", label: "Completion Date" },
        { key: "upper", label: "Upper Perf (ft)", numeric: true },
        { key: "lower", label: "Lower Perf (ft)", numeric: true },
        { key: "lateral", label: "Effective Lat Length (ft)", numeric: true },
        { key: "proppant", label: "Proppant (lbs)", numeric: true },
        { key: "fluid", label: "Total Fluid (bbl)", numeric: true },
      ],
      rows: completion
        ? [{ uwi, date: fmtDate(completion), upper: n(heelMd), lower: n(perfBottomMd!), lateral: lateral ? n(lateral) : "—", proppant: det.proppantLbs ? n(det.proppantLbs) : "—", fluid: det.fluidBbl ? n(det.fluidBbl) : "—" }]
        : [],
      empty: "No completion reported yet.",
    },
    {
      id: "casing",
      label: "Casing",
      columns: [
        { key: "name", label: "String" },
        { key: "size", label: "Size (in)" },
        { key: "weight", label: "Weight (lb/ft)", numeric: true },
        { key: "grade", label: "Grade" },
        { key: "top", label: "Top (ft)", numeric: true },
        { key: "bottom", label: "Shoe MD (ft)", numeric: true },
        { key: "cement", label: "Cement (sx)", numeric: true },
      ],
      rows: casing.map((c) => ({ name: c.name, size: c.sizeIn, weight: c.weightLbFt, grade: c.grade, top: n(c.topFt), bottom: n(c.bottomMdFt), cement: n(c.cementSx) })),
    },
    {
      id: "tubing",
      label: "Tubing",
      columns: [
        { key: "size", label: "Size (in)" },
        { key: "weight", label: "Weight (lb/ft)", numeric: true },
        { key: "grade", label: "Grade" },
        { key: "depth", label: "Set Depth (ft)", numeric: true },
        { key: "lift", label: "Artificial Lift" },
      ],
      rows: completion ? [{ size: "2-7/8", weight: 6.5, grade: "L-80", depth: n(tubingDepth!), lift: lateral ? "Gas lift" : "Rod pump" }] : [],
      empty: "No tubing reported.",
    },
    {
      id: "liner",
      label: "Liner",
      columns: [
        { key: "size", label: "Size (in)" },
        { key: "top", label: "Top (ft)", numeric: true },
        { key: "bottom", label: "Bottom (ft)", numeric: true },
        { key: "grade", label: "Grade" },
      ],
      rows: hasLiner ? [{ size: "4-1/2", top: n(intShoe - 200), bottom: n(mdFt), grade: "P-110" }] : [],
      empty: "No liner in this wellbore.",
    },
    {
      id: "tops",
      label: "Formation Tops",
      sortedBy: "top",
      columns: [
        { key: "formation", label: "Formation" },
        { key: "top", label: "Top TVD (ft)", numeric: true },
      ],
      rows: formationTops.map((t) => ({ formation: t.name, top: n(t.tvd) })),
    },
    {
      id: "survey",
      label: "Directional Survey",
      sortedBy: "md",
      columns: [
        { key: "md", label: "MD (ft)", numeric: true },
        { key: "inc", label: "Inc (°)", numeric: true },
        { key: "azi", label: "Azi (°)", numeric: true },
        { key: "tvd", label: "TVD (ft)", numeric: true },
        { key: "x", label: "Displacement (ft)", numeric: true },
      ],
      rows: survey.map((s) => ({ md: n(s.md), inc: s.inc, azi: s.azi, tvd: n(s.tvd), x: n(s.x) })),
    },
  ];

  return { path, kopFt: kop, mdFt, tvdFt: tvd, lateralFt: lateral, casing, perfTopMd: completion ? heelMd : null, perfBottomMd, formationTops, tables };
}
