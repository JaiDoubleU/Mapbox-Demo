"use client";

import * as React from "react";

export interface DcaSeries {
  key: string;
  label: string;
  unit: string;
  color: string;
  /** Actual history (dots). */
  actual: { month: Date; v: number }[];
  /** Fitted curve over the history (solid) and the forecast (dashed). */
  fit: { month: Date; v: number }[];
  forecast: { month: Date; v: number }[];
}

const fmtMonth = (d: Date) => d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
const fmtV = (v: number) => (v >= 100 ? Math.round(v).toLocaleString("en-US") : v >= 10 ? v.toFixed(0) : v.toFixed(v >= 1 ? 1 : 2));
const monthKey = (d: Date) => d.getFullYear() * 12 + d.getMonth();

/**
 * Log-scale rate-time chart for decline curve analysis: history as dots, the fit solid,
 * the forecast dashed. Hover/touch shows the month's actual and forecast values.
 */
export function DcaChart({ series, height = 170, yLabel = "Daily Rate" }: { series: DcaSeries[]; height?: number; yLabel?: string }) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(320);
  const [hoverM, setHoverM] = React.useState<number | null>(null);
  React.useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(220, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const all = series.flatMap((s) => [...s.actual, ...s.fit, ...s.forecast]);
  if (!all.length) return null;
  const M = { left: 44, right: 38, top: 8, bottom: 20 };
  const iw = width - M.left - M.right, ih = height - M.top - M.bottom;
  const vals = all.map((p) => p.v).filter((v) => v > 0);
  const lo = Math.pow(10, Math.floor(Math.log10(Math.max(1e-3, Math.min(...vals)))));
  const hi = Math.pow(10, Math.ceil(Math.log10(Math.max(...vals))));
  const m0 = Math.min(...all.map((p) => monthKey(p.month)));
  const m1 = Math.max(...all.map((p) => monthKey(p.month)));
  const x = (m: number) => M.left + ((m - m0) / Math.max(1, m1 - m0)) * iw;
  const y = (v: number) => M.top + ih - ((Math.log10(Math.max(v, lo)) - Math.log10(lo)) / (Math.log10(hi) - Math.log10(lo))) * ih;
  const line = (pts: { month: Date; v: number }[]) => pts.map((p, i) => `${i ? "L" : "M"}${x(monthKey(p.month)).toFixed(1)},${y(p.v).toFixed(1)}`).join("");

  const yTicks: number[] = [];
  for (let v = lo; v <= hi * 1.0001; v *= 10) yTicks.push(v);
  const y0 = Math.ceil(m0 / 12), y1 = Math.floor(m1 / 12);
  const yearStep = Math.max(1, Math.ceil(((y1 - y0 + 1) * 40) / iw));
  const years: number[] = [];
  for (let yr = y0; yr <= y1; yr++) if ((yr - y0) % (yearStep < 4 ? yearStep : 4) === 0) years.push(yr);

  // Direct labels at each forecast end (or history end), nudged apart.
  const ends = series
    .map((s) => {
      const tail = s.forecast.length ? s.forecast[s.forecast.length - 1] : s.actual[s.actual.length - 1];
      return tail ? { key: s.key, label: s.label, x: x(monthKey(tail.month)), y: y(tail.v) } : null;
    })
    .filter((e): e is NonNullable<typeof e> => !!e)
    .sort((a, b) => a.y - b.y);
  for (let i = 1; i < ends.length; i++) ends[i].y = Math.max(ends[i].y, ends[i - 1].y + 11);

  const lookup = (pts: { month: Date; v: number }[], m: number) => pts.find((p) => monthKey(p.month) === m)?.v;
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const m = Math.round(m0 + ((e.clientX - r.left - M.left) / iw) * (m1 - m0));
    setHoverM(Math.max(m0, Math.min(m1, m)));
  };
  const hx = hoverM != null ? x(hoverM) : 0;
  const hoverRows =
    hoverM == null
      ? []
      : series.map((s) => ({ s, actual: lookup(s.actual, hoverM), model: lookup(s.fit, hoverM) ?? lookup(s.forecast, hoverM) }));

  return (
    <div ref={wrapRef} className="relative">
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`Decline curve: ${series.map((s) => s.label).join(", ")}`}
        className="block touch-pan-y"
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setHoverM(null)}
      >
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={M.left} x2={M.left + iw} y1={y(v)} y2={y(v)} stroke="var(--s-line)" strokeDasharray="2 3" />
            <text x={M.left - 6} y={y(v) + 3} textAnchor="end" fontSize={10} fill="var(--s-muted)" className="tabular-nums">
              {v >= 1 ? v.toLocaleString("en-US") : v}
            </text>
          </g>
        ))}
        <text transform={`translate(10 ${M.top + ih / 2}) rotate(-90)`} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
          {yLabel}
        </text>
        {years.map((yr) => (
          <text key={yr} x={x(yr * 12)} y={height - 5} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
            {yr}
          </text>
        ))}
        {series.map((s) => (
          <g key={s.key}>
            {s.actual.map((p, i) => (
              <circle key={i} cx={x(monthKey(p.month))} cy={y(p.v)} r={1.9} fill={s.color} />
            ))}
            <path d={line(s.fit)} fill="none" stroke={s.color} strokeWidth={1.5} opacity={0.9} />
            {s.forecast.length > 0 && (
              <path d={line([...(s.fit.length ? [s.fit[s.fit.length - 1]] : []), ...s.forecast])} fill="none" stroke={s.color} strokeWidth={2} strokeDasharray="6 4" />
            )}
          </g>
        ))}
        {ends.map((e) => (
          <text key={e.key} x={Math.min(e.x + 4, width - 2)} y={e.y + 3} textAnchor={e.x + 30 > width ? "end" : "start"} fontSize={10} fontWeight={600} fill="var(--s-text)">
            {e.label}
          </text>
        ))}
        {hoverM != null && <line x1={hx} x2={hx} y1={M.top} y2={M.top + ih} stroke="var(--s-muted)" pointerEvents="none" />}
      </svg>
      {hoverM != null && (
        <div
          className="pointer-events-none absolute top-1 z-10 rounded-md border border-border bg-popover px-2.5 py-1.5 text-[11px] whitespace-nowrap text-popover-foreground tabular-nums shadow-[var(--shadow-overlay)]"
          style={hx > width / 2 ? { right: width - hx + 8 } : { left: hx + 8 }}
        >
          <div className="mb-0.5 font-semibold">{fmtMonth(new Date(Math.floor(hoverM / 12), hoverM % 12, 1))}</div>
          {hoverRows.map(({ s, actual, model }) => (
            <div key={s.key} className="flex items-center gap-1.5">
              <span className="inline-block size-1.5 rounded-full" style={{ background: s.color }} />
              <span className="text-s-muted">{s.label}</span>
              <span className="ml-auto pl-2 font-medium">
                {actual != null ? `${fmtV(actual)} actual` : model != null ? `${fmtV(model)} forecast` : "—"} {s.unit}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
