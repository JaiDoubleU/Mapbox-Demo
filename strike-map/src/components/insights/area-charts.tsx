"use client";

import * as React from "react";
import type { Group, Spread, TypeCurvePoint } from "@/lib/area-insights";
import { keyToDate } from "@/lib/area-insights";
import { cn } from "@/lib/utils";
import { linearTicks, timeTicks } from "./chart-controls";

/* Charts for the Wells / Permits / Rigs tabs. Each draws on a recessive grid with a hover
   tooltip; identity is carried by a legend (and direct labels where there's room), never by
   colour alone. */

export const fmtK = (v: number) =>
  v >= 1e6 ? `${+(v / 1e6).toFixed(1)}M` : v >= 1e3 ? `${+(v / 1e3).toFixed(v >= 1e4 ? 0 : 1)}k` : `${+v.toFixed(v >= 10 ? 0 : 1)}`;
const fmtNum = (v: number, digits = 0) => v.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const fmtMonth = (k: number) => keyToDate(k).toLocaleDateString("en-US", { month: "short", year: "numeric" });

function useWidth(min = 220) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(320);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(min, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, [min]);
  return [ref, width] as const;
}

function Tip({ x, width, children }: { x: number; width: number; children: React.ReactNode }) {
  return (
    <div
      className="pointer-events-none absolute top-1 z-10 rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs whitespace-nowrap text-popover-foreground tabular-nums shadow-[var(--shadow-overlay)]"
      style={x > width / 2 ? { right: width - x + 8 } : { left: x + 8 }}
    >
      {children}
    </div>
  );
}

function TipRow({ color, label, value }: { color: string; label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="inline-block size-1.5 shrink-0 rounded-full" style={{ background: color }} />
      <span className="max-w-[150px] truncate text-s-muted">{label}</span>
      <span className="ml-auto pl-3 font-medium">{value}</span>
    </div>
  );
}

export function Legend({ groups, className }: { groups: Group[]; className?: string }) {
  return (
    <ul className={cn("m-0 mt-2 flex list-none flex-wrap gap-x-3 gap-y-1 p-0 text-xs text-s-text", className)}>
      {groups.map((g) => (
        <li key={g.key} className="flex max-w-[180px] items-center gap-1.5">
          <span className="inline-block size-2 shrink-0 rounded-[2px]" style={{ background: g.color }} />
          <span className="truncate uppercase">{g.label}</span>
        </li>
      ))}
    </ul>
  );
}

const M = { left: 38, right: 10, top: 8, bottom: 20 };

/** Stacked areas over months (e.g. production by operator). */
export function StackedAreaChart({
  months,
  groups,
  values,
  unit,
  height = 190,
}: {
  months: number[];
  groups: Group[];
  values: number[][];
  unit: string;
  height?: number;
}) {
  const [ref, width] = useWidth();
  const [hover, setHover] = React.useState<number | null>(null);
  if (months.length < 2) return <div className="py-8 text-center text-xs text-s-muted">No production in this range.</div>;
  const iw = width - M.left - M.right, ih = height - M.top - M.bottom;
  const totals = months.map((_, i) => values.reduce((s, g) => s + g[i], 0));
  const yTicks = linearTicks(Math.max(1, ...totals));
  const yMax = yTicks[yTicks.length - 1];
  const x = (i: number) => M.left + (i / (months.length - 1)) * iw;
  const y = (v: number) => M.top + ih - (v / yMax) * ih;
  // Cumulative tops per group, bottom to top.
  const tops: number[][] = [];
  groups.forEach((_, g) => (tops[g] = months.map((__, i) => (g ? tops[g - 1][i] : 0) + values[g][i])));
  const area = (g: number) => {
    const upper = months.map((_, i) => `${x(i).toFixed(1)},${y(tops[g][i]).toFixed(1)}`);
    const lower = months.map((_, i) => `${x(i).toFixed(1)},${y(g ? tops[g - 1][i] : 0).toFixed(1)}`).reverse();
    return `M${upper.join("L")}L${lower.join("L")}Z`;
  };
  const xTicks = timeTicks(keyToDate(months[0]).getTime(), keyToDate(months[months.length - 1]).getTime(), iw);
  const xOf = (t: number) => M.left + ((t - keyToDate(months[0]).getTime()) / (keyToDate(months[months.length - 1]).getTime() - keyToDate(months[0]).getTime())) * iw;
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const px = e.clientX - e.currentTarget.getBoundingClientRect().left;
    setHover(Math.max(0, Math.min(months.length - 1, Math.round(((px - M.left) / iw) * (months.length - 1)))));
  };
  return (
    <div ref={ref} className="relative">
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`Stacked ${unit} by ${groups.length} groups, ${fmtMonth(months[0])} to ${fmtMonth(months[months.length - 1])}`}
        className="block touch-pan-y"
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setHover(null)}
      >
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={M.left} x2={M.left + iw} y1={y(v)} y2={y(v)} stroke="var(--s-line)" strokeDasharray="2 3" />
            <text x={M.left - 6} y={y(v) + 3} textAnchor="end" fontSize={10} fill="var(--s-muted)" className="tabular-nums">
              {fmtK(v)}
            </text>
          </g>
        ))}
        {xTicks.map((t) => (
          <text key={t.t} x={xOf(t.t)} y={height - 5} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
            {t.label}
          </text>
        ))}
        {/* 1px surface-coloured edge between layers keeps adjacent fills apart */}
        {groups.map((g, i) => (
          <path key={g.key} d={area(i)} fill={g.color} fillOpacity={0.85} stroke="var(--s-card)" strokeWidth={1} strokeLinejoin="round" />
        ))}
        {hover != null && <line x1={x(hover)} x2={x(hover)} y1={M.top} y2={M.top + ih} stroke="var(--s-muted)" pointerEvents="none" />}
      </svg>
      {hover != null && (
        <Tip x={x(hover)} width={width}>
          <div className="mb-0.5 font-semibold">
            {fmtMonth(months[hover])} · {fmtK(totals[hover])} {unit}
          </div>
          {groups
            .map((g, i) => ({ g, v: values[i][hover] }))
            .filter((r) => r.v > 0)
            .reverse()
            .map(({ g, v }) => (
              <TipRow key={g.key} color={g.color} label={g.label} value={fmtK(v)} />
            ))}
        </Tip>
      )}
    </div>
  );
}

/** Stacked bars per year (e.g. wells spudded by operator). */
export function StackedBarChart({ years, groups, values, height = 170 }: { years: number[]; groups: Group[]; values: number[][]; height?: number }) {
  const [ref, width] = useWidth();
  const [hover, setHover] = React.useState<number | null>(null);
  if (!years.length) return <div className="py-8 text-center text-xs text-s-muted">No wells spudded in this range.</div>;
  const iw = width - M.left - M.right, ih = height - M.top - M.bottom;
  const totals = years.map((_, i) => values.reduce((s, g) => s + g[i], 0));
  const yTicks = linearTicks(Math.max(1, ...totals));
  const yMax = yTicks[yTicks.length - 1];
  const band = iw / years.length;
  const bw = Math.max(1.5, Math.min(14, band - 2));
  const x = (i: number) => M.left + band * i + (band - bw) / 2;
  const y = (v: number) => M.top + ih - (v / yMax) * ih;
  const labelStep = Math.max(1, Math.ceil((years.length * 30) / iw));
  const step = [1, 2, 5, 10].find((s) => s >= labelStep) ?? 10;
  return (
    <div ref={ref} className="relative">
      <svg width={width} height={height} role="img" aria-label={`Count by year, ${years[0]} to ${years[years.length - 1]}`} className="block" onPointerLeave={() => setHover(null)}>
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={M.left} x2={M.left + iw} y1={y(v)} y2={y(v)} stroke="var(--s-line)" strokeDasharray="2 3" />
            <text x={M.left - 6} y={y(v) + 3} textAnchor="end" fontSize={10} fill="var(--s-muted)" className="tabular-nums">
              {fmtK(v)}
            </text>
          </g>
        ))}
        <text transform={`translate(9 ${M.top + ih / 2}) rotate(-90)`} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
          Count
        </text>
        {years.map((yr, i) =>
          yr % step ? null : (
            <text key={yr} x={x(i) + bw / 2} y={height - 5} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
              {yr}
            </text>
          ),
        )}
        {years.map((yr, i) => {
          let base = 0;
          return (
            <g key={yr} opacity={hover == null || hover === i ? 1 : 0.55}>
              {groups.map((g, gi) => {
                const v = values[gi][i];
                if (!v) return null;
                const y0 = y(base), y1 = y(base + v);
                base += v;
                // 1px surface gap between stacked segments
                return <rect key={g.key} x={x(i)} y={y1} width={bw} height={Math.max(0.5, y0 - y1 - 1)} fill={g.color} />;
              })}
              {/* hit target: the whole column, wider than the bar */}
              <rect x={M.left + band * i} y={M.top} width={band} height={ih} fill="transparent" onPointerEnter={() => setHover(i)} onPointerDown={() => setHover(i)} />
            </g>
          );
        })}
      </svg>
      {hover != null && totals[hover] > 0 && (
        <Tip x={x(hover) + bw / 2} width={width}>
          <div className="mb-0.5 font-semibold">
            {years[hover]} · {totals[hover]} spudded
          </div>
          {groups
            .map((g, gi) => ({ g, v: values[gi][hover] }))
            .filter((r) => r.v > 0)
            .reverse()
            .map(({ g, v }) => (
              <TipRow key={g.key} color={g.color} label={g.label} value={String(v)} />
            ))}
        </Tip>
      )}
    </div>
  );
}

/** P90–P10 range bar with a P50 marker per group, plus the overall P50 as a reference line. */
export function RangePlot({ rows, overall, unit, digits }: { rows: (Group & Spread)[]; overall: Spread; unit: string; digits: number }) {
  const [ref, width] = useWidth();
  const [hover, setHover] = React.useState<number | null>(null);
  if (!rows.length) return <div className="py-8 text-center text-xs text-s-muted">No horizontal wells with this data.</div>;
  const labelW = Math.min(130, width * 0.38);
  const L = labelW + 8, R = 12, rowH = 24, top = 6;
  // ~6.4px per character at 11px, so long names truncate instead of running off the left edge.
  const maxChars = Math.max(6, Math.floor(labelW / 6.4));
  const iw = width - L - R;
  const height = top + rows.length * rowH + 22;
  const ticks = linearTicks(Math.max(...rows.map((r) => r.p10)));
  const max = ticks[ticks.length - 1];
  const x = (v: number) => L + (v / max) * iw;
  return (
    <div ref={ref} className="relative">
      <svg width={width} height={height} role="img" aria-label={`P90, P50 and P10 ${unit} by group`} className="block" onPointerLeave={() => setHover(null)}>
        {ticks.map((v) => (
          <g key={v}>
            <line x1={x(v)} x2={x(v)} y1={top} y2={top + rows.length * rowH} stroke="var(--s-line)" strokeDasharray="2 3" />
            <text x={x(v)} y={height - 6} textAnchor="middle" fontSize={10} fill="var(--s-muted)" className="tabular-nums">
              {fmtK(v)}
            </text>
          </g>
        ))}
        <line x1={x(overall.p50)} x2={x(overall.p50)} y1={top - 2} y2={top + rows.length * rowH} stroke="var(--s-text)" strokeWidth={1} strokeDasharray="4 3" opacity={0.6} />
        {rows.map((r, i) => {
          const cy = top + i * rowH + rowH / 2;
          return (
            <g key={r.key} opacity={hover == null || hover === i ? 1 : 0.55}>
              <text x={labelW} y={cy + 3.5} textAnchor="end" fontSize={11} fill="var(--s-text)">
                <title>{r.label}</title>
                {r.label.length > maxChars ? r.label.slice(0, maxChars - 1) + "…" : r.label}
              </text>
              <line x1={x(r.p90)} x2={x(r.p10)} y1={cy} y2={cy} stroke={r.color} strokeWidth={4} strokeLinecap="round" opacity={0.45} />
              <circle cx={x(r.p50)} cy={cy} r={4.5} fill={r.color} stroke="var(--s-card)" strokeWidth={2} />
              <rect x={0} y={cy - rowH / 2} width={width} height={rowH} fill="transparent" onPointerEnter={() => setHover(i)} onPointerDown={() => setHover(i)} />
            </g>
          );
        })}
      </svg>
      {hover != null && (
        <div
          className="pointer-events-none absolute z-10 rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs whitespace-nowrap text-popover-foreground tabular-nums shadow-[var(--shadow-overlay)]"
          style={{ top: top + hover * rowH + rowH, left: Math.max(0, Math.min(width - 190, x(rows[hover].p50) - 60)) }}
        >
          <div className="mb-0.5 font-semibold">
            {rows[hover].label} · {rows[hover].n} wells
          </div>
          {(["p10", "p50", "p90"] as const).map((k) => (
            <div key={k} className="flex gap-3">
              <span className="text-s-muted uppercase">{k}</span>
              <span className="ml-auto font-medium">
                {fmtNum(rows[hover][k], digits)} {unit}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Type curve: P90–P10 band with the P50 line, by months on production, on a log axis.
 * Optionally a fitted curve (solid) and forecast (dashed) for decline analysis.
 */
export function TypeCurveChart({
  points,
  color,
  unit,
  fit,
  forecast,
  height = 200,
}: {
  points: TypeCurvePoint[];
  color: string;
  unit: string;
  fit?: { t: number; v: number }[];
  forecast?: { t: number; v: number }[];
  height?: number;
}) {
  const [ref, width] = useWidth();
  const [hover, setHover] = React.useState<number | null>(null);
  if (points.length < 2) return <div className="py-8 text-center text-xs text-s-muted">Not enough horizontal wells with production history.</div>;
  const Mx = { ...M, left: 44, bottom: 30 };
  const iw = width - Mx.left - Mx.right, ih = height - Mx.top - Mx.bottom;
  const tMax = Math.max(points[points.length - 1].t, forecast?.length ? forecast[forecast.length - 1].t : 0);
  const vals = [...points.flatMap((p) => [p.p10, p.p90]), ...(forecast ?? []).map((f) => f.v)].filter((v) => v > 0);
  const lo = Math.pow(10, Math.floor(Math.log10(Math.min(...vals))));
  const hi = Math.pow(10, Math.ceil(Math.log10(Math.max(...vals))));
  const x = (t: number) => Mx.left + (t / Math.max(1, tMax)) * iw;
  const y = (v: number) => Mx.top + ih - ((Math.log10(Math.max(v, lo)) - Math.log10(lo)) / (Math.log10(hi) - Math.log10(lo))) * ih;
  const yTicks: number[] = [];
  for (let v = lo; v <= hi * 1.0001; v *= 10) yTicks.push(v);
  const yearStep = tMax / 12 > 16 ? 5 : tMax / 12 > 6 ? 2 : 1;
  const xTicks: number[] = [];
  for (let yr = 0; yr * 12 <= tMax; yr += yearStep) xTicks.push(yr);
  const line = (pts: { t: number; v: number }[]) => pts.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)},${y(p.v).toFixed(1)}`).join("");
  const band = `M${points.map((p) => `${x(p.t).toFixed(1)},${y(p.p10).toFixed(1)}`).join("L")}L${[...points]
    .reverse()
    .map((p) => `${x(p.t).toFixed(1)},${y(p.p90).toFixed(1)}`)
    .join("L")}Z`;
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const px = e.clientX - e.currentTarget.getBoundingClientRect().left;
    setHover(Math.max(0, Math.min(tMax, Math.round(((px - Mx.left) / iw) * tMax))));
  };
  const hp = hover != null ? points.find((p) => p.t === hover) : undefined;
  const hf = hover != null ? (fit?.find((p) => p.t === hover) ?? forecast?.find((p) => p.t === hover)) : undefined;
  return (
    <div ref={ref} className="relative">
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`Type curve, ${unit}, P10 to P90 band with P50`}
        className="block touch-pan-y"
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setHover(null)}
      >
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={Mx.left} x2={Mx.left + iw} y1={y(v)} y2={y(v)} stroke="var(--s-line)" strokeDasharray="2 3" />
            <text x={Mx.left - 6} y={y(v) + 3} textAnchor="end" fontSize={10} fill="var(--s-muted)" className="tabular-nums">
              {fmtK(v)}
            </text>
          </g>
        ))}
        <text transform={`translate(9 ${Mx.top + ih / 2}) rotate(-90)`} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
          {unit}
        </text>
        {xTicks.map((yr) => (
          <text key={yr} x={x(yr * 12)} y={Mx.top + ih + 14} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
            {yr}
          </text>
        ))}
        <text x={Mx.left + iw / 2} y={height - 3} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
          Years on production
        </text>
        <path d={band} fill={color} fillOpacity={0.16} />
        <path d={line(points.map((p) => ({ t: p.t, v: p.p10 })))} fill="none" stroke={color} strokeWidth={1} strokeDasharray="2 3" opacity={0.8} />
        <path d={line(points.map((p) => ({ t: p.t, v: p.p90 })))} fill="none" stroke={color} strokeWidth={1} strokeDasharray="2 3" opacity={0.8} />
        {fit ? (
          points.map((p) => <circle key={p.t} cx={x(p.t)} cy={y(p.p50)} r={1.9} fill={color} />)
        ) : (
          <path d={line(points.map((p) => ({ t: p.t, v: p.p50 })))} fill="none" stroke={color} strokeWidth={2} strokeLinejoin="round" />
        )}
        {fit && <path d={line(fit)} fill="none" stroke="var(--s-text)" strokeWidth={1.5} opacity={0.85} />}
        {forecast && forecast.length > 0 && (
          <path d={line([...(fit?.length ? [fit[fit.length - 1]] : []), ...forecast])} fill="none" stroke="var(--s-text)" strokeWidth={2} strokeDasharray="6 4" opacity={0.85} />
        )}
        {hover != null && <line x1={x(hover)} x2={x(hover)} y1={Mx.top} y2={Mx.top + ih} stroke="var(--s-muted)" pointerEvents="none" />}
      </svg>
      {hover != null && (hp || hf) && (
        <Tip x={x(hover)} width={width}>
          <div className="mb-0.5 font-semibold">
            Month {hover + 1}
            {hp ? ` · ${hp.n} wells` : ""}
          </div>
          {hp &&
            (["p10", "p50", "p90"] as const).map((k) => (
              <div key={k} className="flex gap-3">
                <span className="text-s-muted uppercase">{k}</span>
                <span className="ml-auto font-medium">
                  {fmtNum(hp[k], 1)} {unit}
                </span>
              </div>
            ))}
          {hf && (
            <div className="flex gap-3">
              <span className="text-s-muted">{hp ? "Fit" : "Forecast"}</span>
              <span className="ml-auto font-medium">
                {fmtNum(hf.v, 1)} {unit}
              </span>
            </div>
          )}
        </Tip>
      )}
      <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-s-muted">
        <span className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-3.5 rounded-[2px]" style={{ background: color, opacity: 0.3 }} />
          P90–P10
        </span>
        <span className="inline-flex items-center gap-1">
          <svg width="16" height="6" aria-hidden="true">
            {fit ? (
              <>
                <circle cx="3" cy="3" r="1.9" fill={color} />
                <circle cx="10" cy="3" r="1.9" fill={color} />
              </>
            ) : (
              <line x1="0" x2="16" y1="3" y2="3" stroke={color} strokeWidth="2" />
            )}
          </svg>
          P50
        </span>
        {fit && (
          <>
            <span className="inline-flex items-center gap-1">
              <svg width="16" height="6" aria-hidden="true">
                <line x1="0" x2="16" y1="3" y2="3" stroke="var(--s-text)" strokeWidth="1.5" />
              </svg>
              Fit
            </span>
            <span className="inline-flex items-center gap-1">
              <svg width="16" height="6" aria-hidden="true">
                <line x1="0" x2="16" y1="3" y2="3" stroke="var(--s-text)" strokeWidth="2" strokeDasharray="6 4" />
              </svg>
              Forecast
            </span>
          </>
        )}
      </div>
    </div>
  );
}
