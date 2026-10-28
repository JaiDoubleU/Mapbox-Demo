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

/** Log axis bounds and decade ticks for a set of values. */
function logAxis(vals: number[]) {
  const lo = Math.pow(10, Math.floor(Math.log10(Math.max(1e-3, Math.min(...vals)))));
  const hi = Math.pow(10, Math.ceil(Math.log10(Math.max(...vals))));
  const top = hi > lo ? hi : lo * 10;
  const ticks: number[] = [];
  // Narrow ranges (one or two decades) also get 2× and 5× ticks so the axis stays readable.
  const steps = top / lo <= 100 ? [1, 2, 5] : [1];
  for (let d = lo; d <= top * 1.0001; d *= 10) for (const m of steps) if (d * m <= top * 1.0001) ticks.push(d * m);
  return { lo, hi: top, ticks };
}
const tickLabel = (v: number) => (v >= 1 ? v.toLocaleString("en-US") : String(v));

/**
 * Log-scale rate-time chart for decline curve analysis: history as dots, the fit solid,
 * the forecast dashed. An optional `secondary` series (a ratio such as GOR) is plotted on its
 * own log axis on the right, drawn in that series' colour. Hover/touch shows the month's
 * actual and forecast values.
 */
export function DcaChart({
  series,
  secondary,
  height = 170,
  yLabel = "Daily Rate",
}: {
  series: DcaSeries[];
  secondary?: DcaSeries;
  height?: number;
  yLabel?: string;
}) {
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

  const pointsOf = (s: DcaSeries) => [...s.actual, ...s.fit, ...s.forecast];
  const primary = series.flatMap(pointsOf);
  const sec = secondary ? pointsOf(secondary) : [];
  const all = [...primary, ...sec];
  if (!all.length) return null;
  const M = { left: 44, right: secondary ? 52 : 38, top: 8, bottom: 20 };
  const iw = width - M.left - M.right,
    ih = height - M.top - M.bottom;
  const pv = primary.map((p) => p.v).filter((v) => v > 0);
  const hasPrimary = pv.length > 0;
  const { lo, hi, ticks: yTicks } = logAxis(pv.length ? pv : [1, 10]);
  const sv = sec.map((p) => p.v).filter((v) => v > 0);
  const right = sv.length ? logAxis(sv) : null;
  const m0 = Math.min(...all.map((p) => monthKey(p.month)));
  const m1 = Math.max(...all.map((p) => monthKey(p.month)));
  const x = (m: number) => M.left + ((m - m0) / Math.max(1, m1 - m0)) * iw;
  const scaleY = (a: { lo: number; hi: number }) => (v: number) =>
    M.top + ih - ((Math.log10(Math.max(v, a.lo)) - Math.log10(a.lo)) / (Math.log10(a.hi) - Math.log10(a.lo))) * ih;
  const y = scaleY({ lo, hi });
  const y2 = right ? scaleY(right) : y;
  const line = (pts: { month: Date; v: number }[], yy = y) =>
    pts.map((p, i) => `${i ? "L" : "M"}${x(monthKey(p.month)).toFixed(1)},${yy(p.v).toFixed(1)}`).join("");
  const plotted = [...series.map((s) => ({ s, yy: y })), ...(secondary ? [{ s: secondary, yy: y2 }] : [])];
  const y0 = Math.ceil(m0 / 12),
    y1 = Math.floor(m1 / 12);
  const yearStep = Math.max(1, Math.ceil(((y1 - y0 + 1) * 40) / iw));
  const years: number[] = [];
  for (let yr = y0; yr <= y1; yr++) if ((yr - y0) % (yearStep < 4 ? yearStep : 4) === 0) years.push(yr);

  // Direct labels at each forecast end (or history end), nudged apart. With a right axis they sit
  // just inside the plot so they don't collide with its tick labels.
  const ends = plotted
    .map(({ s, yy }) => {
      const tail = s.forecast.length ? s.forecast[s.forecast.length - 1] : s.actual[s.actual.length - 1];
      return tail ? { key: s.key, label: s.label, x: x(monthKey(tail.month)), y: yy(tail.v) - (secondary ? 6 : 0) } : null;
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
    hoverM == null ? [] : plotted.map(({ s }) => ({ s, actual: lookup(s.actual, hoverM), model: lookup(s.fit, hoverM) ?? lookup(s.forecast, hoverM) }));

  return (
    <div ref={wrapRef} className="relative">
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`Decline curve: ${plotted.map(({ s }) => s.label).join(", ")}${secondary ? ` (${secondary.label} on the right axis)` : ""}`}
        className="block touch-pan-y"
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setHoverM(null)}
      >
        {/* With only the ratio on, its right axis carries the gridlines and the left axis is hidden. */}
        {!hasPrimary &&
          right?.ticks.map((v) => <line key={`g${v}`} x1={M.left} x2={M.left + iw} y1={y2(v)} y2={y2(v)} stroke="var(--s-line)" strokeDasharray="2 3" />)}
        {hasPrimary &&
          yTicks.map((v) => (
            <g key={v}>
              <line x1={M.left} x2={M.left + iw} y1={y(v)} y2={y(v)} stroke="var(--s-line)" strokeDasharray="2 3" />
              <text x={M.left - 6} y={y(v) + 3} textAnchor="end" fontSize={10} fill="var(--s-muted)" className="tabular-nums">
                {tickLabel(v)}
              </text>
            </g>
          ))}
        {secondary && right && (
          <g>
            <line x1={M.left + iw} x2={M.left + iw} y1={M.top} y2={M.top + ih} stroke={secondary.color} strokeWidth={1.25} />
            {right.ticks.map((v) => (
              <g key={`r${v}`}>
                <line x1={M.left + iw} x2={M.left + iw + 4} y1={y2(v)} y2={y2(v)} stroke={secondary.color} strokeWidth={1.25} />
                <text x={M.left + iw + 6} y={y2(v) + 3} fontSize={10} fill={secondary.color} className="tabular-nums">
                  {tickLabel(v)}
                </text>
              </g>
            ))}
            <text transform={`translate(${width - 6} ${M.top + ih / 2}) rotate(90)`} textAnchor="middle" fontSize={10} fill={secondary.color}>
              {`${secondary.label} (${secondary.unit})`}
            </text>
          </g>
        )}
        <text transform={`translate(10 ${M.top + ih / 2}) rotate(-90)`} textAnchor="middle" fontSize={10} fill="var(--s-muted)" opacity={hasPrimary ? 1 : 0}>
          {yLabel}
        </text>
        {years.map((yr) => (
          <text key={yr} x={x(yr * 12)} y={height - 5} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
            {yr}
          </text>
        ))}
        {plotted.map(({ s, yy }) => (
          <g key={s.key}>
            {s.actual.map((p, i) => (
              <circle key={i} cx={x(monthKey(p.month))} cy={yy(p.v)} r={1.9} fill={s.color} />
            ))}
            <path d={line(s.fit, yy)} fill="none" stroke={s.color} strokeWidth={1.5} opacity={0.9} />
            {s.forecast.length > 0 && (
              <path
                d={line([...(s.fit.length ? [s.fit[s.fit.length - 1]] : []), ...s.forecast], yy)}
                fill="none"
                stroke={s.color}
                strokeWidth={2}
                strokeDasharray="6 4"
              />
            )}
          </g>
        ))}
        {ends.map((e) => (
          <text
            key={e.key}
            x={secondary ? Math.min(e.x, M.left + iw) - 3 : Math.min(e.x + 4, width - 2)}
            y={e.y + 3}
            textAnchor={secondary || e.x + 30 > width ? "end" : "start"}
            fontSize={10}
            fontWeight={600}
            fill="var(--s-text)"
          >
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
