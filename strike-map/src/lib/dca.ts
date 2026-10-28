import type { ProductionMonth } from "./well-details";

/**
 * Decline curve analysis: an Arps hyperbolic fit per stream (oil, gas, water) with a switch to
 * exponential terminal decline (modified hyperbolic), forecast monthly until the economic limit
 * or the forecast end date.
 */

export type Stream = "oil" | "gas" | "water";
export const STREAMS: Stream[] = ["oil", "gas", "water"];

export interface ArpsParams {
  /** Rate at the start of the fit (t = 0), per day. */
  qi: number;
  /** Initial nominal decline, per year. */
  di: number;
  /** Hyperbolic exponent. */
  b: number;
  /** Terminal (minimum) decline, per year. */
  dMin: number;
}

export interface ForecastMonth {
  month: Date;
  rate: number;
}

export interface StreamForecast {
  params: ArpsParams;
  /** Fitted curve over the history (same months as the history from the fit start). */
  fit: ForecastMonth[];
  forecast: ForecastMonth[];
  cumToDate: number; // bbl or mcf
  remaining: number;
  eur: number;
  next12Decline: number | null; // fraction
  next60Decline: number | null;
}

export interface DcaResult {
  fitStart: Date;
  forecastStart: Date;
  endDate: Date;
  streams: Record<Stream, StreamForecast>;
}

const DAYS_PER_MONTH = 30.44;
const addMonths = (d: Date, n: number) => new Date(d.getFullYear(), d.getMonth() + n, 1);

/** Modified-hyperbolic rate at t months after the fit start. */
export function arpsRate(p: ArpsParams, tMonths: number): number {
  const t = tMonths / 12; // years
  const { qi, di, b, dMin } = p;
  if (b < 1e-3) return qi * Math.exp(-di * t);
  // Hyperbolic until its instantaneous decline falls to dMin, exponential after.
  const tSwitch = dMin > 0 && di > dMin ? (di / dMin - 1) / (b * di) : Infinity;
  if (t <= tSwitch) return qi / Math.pow(1 + b * di * t, 1 / b);
  const qSwitch = qi / Math.pow(1 + b * di * tSwitch, 1 / b);
  return qSwitch * Math.exp(-dMin * (t - tSwitch));
}

/** Least-squares fit in log space over a grid of b and Di; qi solved in closed form. */
export function fitArps(history: { t: number; q: number }[], dMin = 0.06): ArpsParams {
  const pts = history.filter((h) => h.q > 0);
  let best: ArpsParams = { qi: pts[0]?.q ?? 1, di: 0.5, b: 1, dMin };
  let bestErr = Infinity;
  // b limited to the range typical of unconventional wells, so short histories stay realistic.
  for (let b = 0.5; b <= 1.6001; b += 0.05) {
    for (let k = 0; k <= 60; k++) {
      const di = 0.05 * Math.pow(1.08, k); // 5%/yr … ~5,000%/yr nominal
      const shape = (t: number) => arpsRate({ qi: 1, di, b, dMin }, t);
      const logRes = pts.map((p) => Math.log(p.q) - Math.log(shape(p.t)));
      const lnQi = logRes.reduce((s, v) => s + v, 0) / logRes.length;
      const err = logRes.reduce((s, v) => s + (v - lnQi) ** 2, 0);
      if (err < bestErr) {
        bestErr = err;
        best = { qi: Math.exp(lnQi), di, b, dMin };
      }
    }
  }
  return best;
}

export interface DcaOptions {
  endDate?: Date;
  /** Per-stream overrides from "Modify Forecast". */
  overrides?: Partial<Record<Stream, Partial<ArpsParams>>>;
  /** Economic limits, per day. */
  limits?: Record<Stream, number>;
}

/** Null when there's not enough producing history to fit (or the well no longer produces). */
export function runDca(production: ProductionMonth[], today: Date, opts: DcaOptions = {}): DcaResult | null {
  if (production.length < 6) return null;
  const last = production[production.length - 1].month;
  // A well whose production stopped more than 3 months ago (plugged) gets no forecast.
  if ((today.getTime() - last.getTime()) / (DAYS_PER_MONTH * 86_400_000) > 3) return null;
  // Fit from the peak month (skips the partial first month and the ramp-up).
  const peak = production.slice(0, 4).reduce((bi, p, i, arr) => (p.oil > arr[bi].oil ? i : bi), 0);
  const fitStart = production[peak].month;
  const hist = production.slice(peak);
  const forecastStart = addMonths(last, 1);
  // Default: 20 years of well life, and at least 10 years past today.
  const endDate =
    opts.endDate ??
    new Date(Math.max(fitStart.getFullYear() + 20, forecastStart.getFullYear() + 10), fitStart.getMonth(), 1);
  const limits = opts.limits ?? { oil: 2, gas: 10, water: 1 };
  const horizon = Math.max(0, (endDate.getFullYear() - forecastStart.getFullYear()) * 12 + endDate.getMonth() - forecastStart.getMonth());

  const streams = {} as Record<Stream, StreamForecast>;
  for (const s of STREAMS) {
    const fitted = fitArps(hist.map((p, i) => ({ t: i, q: p[s] })));
    const params = { ...fitted, ...opts.overrides?.[s] };
    const fit = hist.map((p, i) => ({ month: p.month, rate: arpsRate(params, i) }));
    const forecast: ForecastMonth[] = [];
    for (let m = 0; m <= horizon; m++) {
      const rate = arpsRate(params, hist.length + m);
      if (rate < limits[s]) break;
      forecast.push({ month: addMonths(forecastStart, m), rate });
    }
    const cumToDate = production.reduce((sum, p) => sum + p[s] * DAYS_PER_MONTH, 0);
    const remaining = forecast.reduce((sum, f) => sum + f.rate * DAYS_PER_MONTH, 0);
    const q0 = arpsRate(params, hist.length);
    const decline = (months: number) => (q0 > 0 ? 1 - arpsRate(params, hist.length + months) / q0 : null);
    streams[s] = { params, fit, forecast, cumToDate, remaining, eur: cumToDate + remaining, next12Decline: decline(12), next60Decline: decline(60) };
  }
  return { fitStart, forecastStart, endDate, streams };
}

/** CSV of history and forecast by month, for "Export Forecast". */
export function dcaCsv(name: string, production: ProductionMonth[], dca: DcaResult): string {
  const rows = ["well,month,type,oil_bbl_d,gas_mcf_d,water_bbl_d"];
  const ym = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
  const q = (v: number | undefined) => (v == null ? "" : v.toFixed(2));
  for (const p of production) rows.push([name, ym(p.month), "actual", q(p.oil), q(p.gas), q(p.water)].join(","));
  const n = Math.max(...STREAMS.map((s) => dca.streams[s].forecast.length));
  for (let i = 0; i < n; i++) {
    const m = dca.streams.oil.forecast[i]?.month ?? dca.streams.gas.forecast[i]?.month ?? dca.streams.water.forecast[i]?.month;
    rows.push([name, ym(m), "forecast", ...STREAMS.map((s) => q(dca.streams[s].forecast[i]?.rate))].join(","));
  }
  return rows.join("\n");
}
