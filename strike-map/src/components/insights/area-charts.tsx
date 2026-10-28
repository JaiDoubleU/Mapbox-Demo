"use client";

import * as React from "react";
import type { Group, Spread } from "@/lib/area-insights";
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

/**
 * Stacked areas over months (e.g. production by operator). With `zoomMode` on, dragging across
 * the chart selects a span of months and calls `onZoom(first, last)` with indices into `months`;
 * double-clicking calls `onResetZoom`.
 */
export function StackedAreaChart({
  months,
  groups,
  values,
  unit,
  yLabel,
  zoomMode = false,
  onZoom,
  onResetZoom,
  height = 190,
}: {
  months: number[];
  groups: Group[];
  values: number[][];
  unit: string;
  /** Rotated y-axis title, e.g. "Oil (BBL/D)". */
  yLabel?: string;
  zoomMode?: boolean;
  onZoom?: (first: number, last: number) => void;
  onResetZoom?: () => void;
  height?: number;
}) {
  const [ref, width] = useWidth();
  const [hover, setHover] = React.useState<number | null>(null);
  /** Drag selection in px while zooming. */
  const [drag, setDrag] = React.useState<{ a: number; b: number } | null>(null);
  if (months.length < 2) return <div className="py-8 text-center text-xs text-s-muted">No production in this range.</div>;
  const M = { left: yLabel ? 50 : 38, right: 10, top: 8, bottom: 20 };
  const iw = width - M.left - M.right,
    ih = height - M.top - M.bottom;
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
  const xOf = (t: number) =>
    M.left + ((t - keyToDate(months[0]).getTime()) / (keyToDate(months[months.length - 1]).getTime() - keyToDate(months[0]).getTime())) * iw;
  const clampPx = (px: number) => Math.min(Math.max(px, M.left), M.left + iw);
  const idxAt = (px: number) => Math.max(0, Math.min(months.length - 1, Math.round(((px - M.left) / iw) * (months.length - 1))));
  const localX = (e: React.PointerEvent<SVGSVGElement>) => e.clientX - e.currentTarget.getBoundingClientRect().left;
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const px = localX(e);
    if (drag) return setDrag({ ...drag, b: clampPx(px) });
    setHover(idxAt(px));
  };
  const onDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!zoomMode) return onMove(e);
    const px = clampPx(localX(e));
    e.currentTarget.setPointerCapture(e.pointerId);
    setHover(null);
    setDrag({ a: px, b: px });
  };
  const onUp = () => {
    if (!drag) return;
    const [pa, pb] = [Math.min(drag.a, drag.b), Math.max(drag.a, drag.b)];
    setDrag(null);
    // At least a few pixels and three months, so a plain click never zooms to nothing.
    const i0 = idxAt(pa),
      i1 = idxAt(pb);
    if (pb - pa >= 6 && i1 - i0 >= 2) onZoom?.(i0, i1);
  };
  return (
    <div ref={ref} className="relative">
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`Stacked ${unit} by ${groups.length} groups, ${fmtMonth(months[0])} to ${fmtMonth(months[months.length - 1])}`}
        className={cn("block select-none", zoomMode ? "cursor-crosshair touch-none" : "touch-pan-y")}
        onPointerMove={onMove}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => setDrag(null)}
        onPointerLeave={() => !drag && setHover(null)}
        onDoubleClick={onResetZoom}
      >
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={M.left} x2={M.left + iw} y1={y(v)} y2={y(v)} stroke="var(--s-line)" strokeDasharray="2 3" />
            <text x={M.left - 6} y={y(v) + 3} textAnchor="end" fontSize={10} fill="var(--s-muted)" className="tabular-nums">
              {fmtK(v)}
            </text>
          </g>
        ))}
        {yLabel && (
          <text transform={`translate(10 ${M.top + ih / 2}) rotate(-90)`} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
            {yLabel}
          </text>
        )}
        {xTicks.map((t) => (
          <text key={t.t} x={xOf(t.t)} y={height - 5} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
            {t.label}
          </text>
        ))}
        {/* 1px surface-coloured edge between layers keeps adjacent fills apart */}
        {groups.map((g, i) => (
          <path key={g.key} d={area(i)} fill={g.color} fillOpacity={0.85} stroke="var(--s-card)" strokeWidth={1} strokeLinejoin="round" />
        ))}
        {drag && (
          <rect
            x={Math.min(drag.a, drag.b)}
            y={M.top}
            width={Math.abs(drag.b - drag.a)}
            height={ih}
            fill="color-mix(in srgb, var(--primary) 16%, transparent)"
            stroke="var(--primary)"
            strokeWidth={1}
            pointerEvents="none"
          />
        )}
        {hover != null && !drag && <line x1={x(hover)} x2={x(hover)} y1={M.top} y2={M.top + ih} stroke="var(--s-muted)" pointerEvents="none" />}
      </svg>
      {hover != null && !drag && (
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
  const iw = width - M.left - M.right,
    ih = height - M.top - M.bottom;
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
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`Count by year, ${years[0]} to ${years[years.length - 1]}`}
        className="block"
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
                const y0 = y(base),
                  y1 = y(base + v);
                base += v;
                // 1px surface gap between stacked segments
                return <rect key={g.key} x={x(i)} y={y1} width={bw} height={Math.max(0.5, y0 - y1 - 1)} fill={g.color} />;
              })}
              {/* hit target: the whole column, wider than the bar */}
              <rect
                x={M.left + band * i}
                y={M.top}
                width={band}
                height={ih}
                fill="transparent"
                onPointerEnter={() => setHover(i)}
                onPointerDown={() => setHover(i)}
              />
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
  const L = labelW + 8,
    R = 12,
    rowH = 24,
    top = 6;
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
        <line
          x1={x(overall.p50)}
          x2={x(overall.p50)}
          y1={top - 2}
          y2={top + rows.length * rowH}
          stroke="var(--s-text)"
          strokeWidth={1}
          strokeDasharray="4 3"
          opacity={0.6}
        />
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
              <rect
                x={0}
                y={cy - rowH / 2}
                width={width}
                height={rowH}
                fill="transparent"
                onPointerEnter={() => setHover(i)}
                onPointerDown={() => setHover(i)}
              />
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
