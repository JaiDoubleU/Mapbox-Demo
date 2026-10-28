"use client";

import * as React from "react";
import type { ProductionMonth } from "@/lib/well-details";

/* Oil / gas / water daily rates on one log axis. Identity is never color alone: each series
   also has its own dash pattern, a direct label at the line end, and a legend entry. */
const SERIES = [
  { key: "oil", label: "Oil", unit: "BBL/d", color: "var(--chart-oil)", dash: undefined },
  { key: "gas", label: "Gas", unit: "MCF/d", color: "var(--chart-gas)", dash: "6 3" },
  { key: "water", label: "Water", unit: "BBL/d", color: "var(--chart-water)", dash: "1.5 3.5" },
] as const;

type SeriesKey = (typeof SERIES)[number]["key"];

const fmtRate = (v: number) => (v >= 100 ? Math.round(v).toLocaleString("en-US") : v.toFixed(v >= 10 ? 0 : 1));
const fmtMonth = (d: Date) => d.toLocaleDateString("en-US", { month: "short", year: "numeric" });

export function ProductionChart({ data, height = 150 }: { data: ProductionMonth[]; height?: number }) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(320);
  const [hover, setHover] = React.useState<number | null>(null);

  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(200, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  if (!data.length) {
    return <div className="py-6 text-center text-xs text-s-muted">No production reported for this record.</div>;
  }

  const M = { left: 38, right: 40, top: 8, bottom: 20 };
  const iw = width - M.left - M.right, ih = height - M.top - M.bottom;
  const values = data.flatMap((p) => [p.oil, p.gas, p.water]);
  const lo = Math.pow(10, Math.floor(Math.log10(Math.max(0.5, Math.min(...values)))));
  const hi = Math.pow(10, Math.ceil(Math.log10(Math.max(...values))));
  const y = (v: number) => M.top + ih - ((Math.log10(Math.max(v, lo)) - Math.log10(lo)) / (Math.log10(hi) - Math.log10(lo))) * ih;
  const t0 = data[0].month.getTime(), t1 = data[data.length - 1].month.getTime();
  const x = (d: Date) => M.left + (t1 === t0 ? iw / 2 : ((d.getTime() - t0) / (t1 - t0)) * iw);

  const yTicks: number[] = [];
  for (let v = lo; v <= hi * 1.0001; v *= 10) yTicks.push(v);
  const firstYear = data[0].month.getFullYear() + (data[0].month.getMonth() > 0 ? 1 : 0);
  const lastYear = data[data.length - 1].month.getFullYear();
  const years: number[] = [];
  for (let yr = firstYear; yr <= lastYear; yr++) years.push(yr);
  const yearStep = Math.max(1, Math.ceil((years.length * 40) / iw));

  const path = (k: SeriesKey) => data.map((p, i) => `${i ? "L" : "M"}${x(p.month).toFixed(1)},${y(p[k]).toFixed(1)}`).join("");

  // Direct labels at the line ends, nudged apart so they never collide.
  const last = data[data.length - 1];
  const ends = SERIES.map((s) => ({ ...s, y: y(last[s.key]) })).sort((a, b) => a.y - b.y);
  for (let i = 1; i < ends.length; i++) ends[i].y = Math.max(ends[i].y, ends[i - 1].y + 11);

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - r.left;
    let best = 0, bestD = Infinity;
    data.forEach((p, i) => {
      const dd = Math.abs(x(p.month) - px);
      if (dd < bestD) {
        bestD = dd;
        best = i;
      }
    });
    setHover(best);
  };

  const hp = hover != null ? data[hover] : null;
  const hx = hp ? x(hp.month) : 0;

  return (
    <div ref={wrapRef} className="relative">
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`Production decline, ${fmtMonth(data[0].month)} to ${fmtMonth(last.month)}`}
        className="block touch-pan-y"
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setHover(null)}
      >
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={M.left} x2={M.left + iw} y1={y(v)} y2={y(v)} stroke="var(--s-line)" strokeDasharray="2 3" />
            <text x={M.left - 6} y={y(v) + 3} textAnchor="end" fontSize={10} fill="var(--s-muted)" className="tabular-nums">
              {v >= 1 ? v.toLocaleString("en-US") : v}
            </text>
          </g>
        ))}
        {years.map((yr, i) =>
          i % yearStep ? null : (
            <text key={yr} x={x(new Date(yr, 0, 1))} y={height - 5} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
              {yr}
            </text>
          ),
        )}
        {SERIES.map((s) => (
          <path
            key={s.key}
            d={path(s.key)}
            fill="none"
            stroke={s.color}
            strokeWidth={2}
            strokeDasharray={s.dash}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
        {ends.map((s) => (
          <text key={s.key} x={M.left + iw + 6} y={s.y + 3} fontSize={10} fontWeight={600} fill="var(--s-text)">
            {s.label}
          </text>
        ))}
        {hp && (
          <g pointerEvents="none">
            <line x1={hx} x2={hx} y1={M.top} y2={M.top + ih} stroke="var(--s-muted)" strokeWidth={1} />
            {SERIES.map((s) => (
              <circle key={s.key} cx={hx} cy={y(hp[s.key])} r={4} fill={s.color} stroke="var(--s-card)" strokeWidth={2} />
            ))}
          </g>
        )}
      </svg>
      {hp && (
        <div
          className="pointer-events-none absolute top-1 z-10 rounded-md border border-border bg-popover px-2.5 py-1.5 text-[11px] text-popover-foreground shadow-[var(--shadow-overlay)]"
          style={hx > width / 2 ? { right: width - hx + 8 } : { left: hx + 8 }}
        >
          <div className="mb-0.5 font-semibold">{fmtMonth(hp.month)}</div>
          {SERIES.map((s) => (
            <div key={s.key} className="flex items-center gap-1.5 tabular-nums">
              <span className="inline-block h-0.5 w-3" style={{ background: s.color }} />
              <span className="text-s-muted">{s.label}</span>
              <span className="ml-auto pl-2 font-medium">
                {fmtRate(hp[s.key])} {s.unit}
              </span>
            </div>
          ))}
        </div>
      )}
      <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1 text-[11px] text-s-muted">
        {SERIES.map((s) => (
          <span key={s.key} className="flex items-center gap-1.5">
            <svg width={16} height={6} aria-hidden="true">
              <line x1={1} x2={15} y1={3} y2={3} stroke={s.color} strokeWidth={2} strokeDasharray={s.dash} strokeLinecap="round" />
            </svg>
            {s.label} ({s.unit})
          </span>
        ))}
      </div>
    </div>
  );
}
