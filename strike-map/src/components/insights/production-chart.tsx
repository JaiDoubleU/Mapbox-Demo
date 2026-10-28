"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ProductionMonth } from "@/lib/well-details";
import { linearTicks, ScaleToggle, timeTicks, ZoomControls, type YScale } from "./chart-controls";

/* Oil / gas / water daily rates on one axis, semi-log by default. Identity is never color alone: each series
   also has its own dash pattern, a direct label at the line end, and a legend entry. */
const ALL_SERIES = [
  {
    key: "oil",
    label: "Oil",
    unit: "BBL/d",
    color: "var(--chart-oil)",
    dash: undefined,
  },
  {
    key: "gas",
    label: "Gas",
    unit: "MCF/d",
    color: "var(--chart-gas)",
    dash: "6 3",
  },
  {
    key: "water",
    label: "Water",
    unit: "BBL/d",
    color: "var(--chart-water)",
    dash: "1.5 3.5",
  },
] as const;

type SeriesKey = (typeof ALL_SERIES)[number]["key"];
export type ProductionShow = Partial<Record<SeriesKey, boolean>>;

const fmtRate = (v: number) => (v >= 100 ? Math.round(v).toLocaleString("en-US") : v.toFixed(v >= 10 ? 0 : 1));
const fmtMonth = (d: Date) => d.toLocaleDateString("en-US", { month: "short", year: "numeric" });

/**
 * Oil / gas / water on one axis. `scale` and `show` may be controlled by the parent (the card's
 * edit drawer); otherwise the chart keeps its own scale and shows every series.
 */
export function ProductionChart({
  data,
  height = 150,
  scale: scaleProp,
  onScaleChange,
  show,
}: {
  data: ProductionMonth[];
  height?: number;
  scale?: YScale;
  onScaleChange?: (s: YScale) => void;
  show?: ProductionShow;
}) {
  const wrapRef = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(320);
  const [hover, setHover] = React.useState<number | null>(null);
  const [scaleLocal, setScaleLocal] = React.useState<YScale>("log");
  const scale = scaleProp ?? scaleLocal;
  const setScale = onScaleChange ?? setScaleLocal;
  const SERIES = ALL_SERIES.filter((s) => show?.[s.key] !== false);
  const [zoomMode, setZoomMode] = React.useState(false);
  /** Visible time window (ms); null shows the full history. */
  const [domain, setDomain] = React.useState<[number, number] | null>(null);
  /** Drag selection in px while zooming. */
  const [drag, setDrag] = React.useState<{ a: number; b: number } | null>(null);
  const clipId = React.useId();

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
  const iw = width - M.left - M.right,
    ih = height - M.top - M.bottom;
  const fullT0 = data[0].month.getTime(),
    fullT1 = data[data.length - 1].month.getTime();
  const [t0, t1] = domain ?? [fullT0, fullT1];
  const x = (d: Date) => M.left + (t1 === t0 ? iw / 2 : ((d.getTime() - t0) / (t1 - t0)) * iw);
  const tAt = (px: number) => t0 + ((Math.min(Math.max(px, M.left), M.left + iw) - M.left) / iw) * (t1 - t0);
  // Points in the window plus one either side, so lines run to the plot edges (clipped).
  const firstIn = Math.max(0, data.findIndex((p) => p.month.getTime() >= t0) - 1);
  const lastIn = data.findLastIndex((p) => p.month.getTime() <= t1);
  const visible = data.slice(firstIn, Math.min(data.length, lastIn + 2));
  const inWindow = visible.filter((p) => p.month.getTime() >= t0 && p.month.getTime() <= t1);

  // The y-axis fits the visible window.
  const vals = (inWindow.length ? inWindow : visible).flatMap((p) => SERIES.map((sr) => p[sr.key]));
  const values = vals.length ? vals : [1, 10]; // every series switched off
  const lo = Math.pow(10, Math.floor(Math.log10(Math.max(0.5, Math.min(...values)))));
  const hi = Math.pow(10, Math.ceil(Math.log10(Math.max(...values))));
  const yTicks: number[] = [];
  if (scale === "log") for (let v = lo; v <= hi * 1.0001; v *= 10) yTicks.push(v);
  else yTicks.push(...linearTicks(Math.max(...values)));
  const yMax = yTicks[yTicks.length - 1];
  const y = (v: number) =>
    scale === "log"
      ? M.top + ih - ((Math.log10(Math.max(v, lo)) - Math.log10(lo)) / (Math.log10(hi) - Math.log10(lo))) * ih
      : M.top + ih - (Math.max(0, v) / yMax) * ih;
  const xTicks = timeTicks(t0, t1, iw);

  const path = (k: SeriesKey) => visible.map((p, i) => `${i ? "L" : "M"}${x(p.month).toFixed(1)},${y(p[k]).toFixed(1)}`).join("");

  // Direct labels at the line ends (last month in view), nudged apart so they never collide.
  const last = inWindow[inWindow.length - 1] ?? data[data.length - 1];
  const ends = SERIES.map((s) => ({ ...s, y: y(last[s.key]) })).sort((a, b) => a.y - b.y);
  for (let i = 1; i < ends.length; i++) ends[i].y = Math.max(ends[i].y, ends[i - 1].y + 11);

  const localX = (e: React.PointerEvent<SVGSVGElement>) => e.clientX - e.currentTarget.getBoundingClientRect().left;
  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const px = localX(e);
    if (drag) {
      setDrag({ ...drag, b: Math.min(Math.max(px, M.left), M.left + iw) });
      return;
    }
    let best = 0,
      bestD = Infinity;
    data.forEach((p, i) => {
      const t = p.month.getTime();
      if (t < t0 || t > t1) return;
      const dd = Math.abs(x(p.month) - px);
      if (dd < bestD) {
        bestD = dd;
        best = i;
      }
    });
    setHover(bestD < Infinity ? best : null);
  };
  const onDown = (e: React.PointerEvent<SVGSVGElement>) => {
    if (!zoomMode) return onMove(e);
    const px = Math.min(Math.max(localX(e), M.left), M.left + iw);
    e.currentTarget.setPointerCapture(e.pointerId);
    setHover(null);
    setDrag({ a: px, b: px });
  };
  const onUp = () => {
    if (!drag) return;
    const [a, b] = [Math.min(drag.a, drag.b), Math.max(drag.a, drag.b)];
    setDrag(null);
    // At least ~2 months wide, so a click doesn't zoom to nothing.
    const ta = tAt(a),
      tb = tAt(b);
    if (b - a >= 6 && tb - ta >= 60 * 86_400_000) setDomain([ta, tb]);
  };
  const resetZoom = () => setDomain(null);

  const hp = hover != null ? data[hover] : null;
  const hx = hp ? x(hp.month) : 0;

  return (
    <div ref={wrapRef} className="relative">
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <ScaleToggle value={scale} onChange={setScale} />
        <ZoomControls
          active={zoomMode}
          zoomed={domain != null}
          onToggle={() => {
            setZoomMode((z) => !z);
            setDrag(null);
          }}
          onReset={resetZoom}
        />
      </div>
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`Production decline, ${fmtMonth(new Date(t0))} to ${fmtMonth(new Date(t1))}, ${scale === "log" ? "semi-log" : "linear"} scale`}
        className={cn("block select-none", zoomMode ? "cursor-crosshair touch-none" : "touch-pan-y")}
        onPointerMove={onMove}
        onPointerDown={onDown}
        onPointerUp={onUp}
        onPointerCancel={() => setDrag(null)}
        onPointerLeave={() => !drag && setHover(null)}
        onDoubleClick={domain ? resetZoom : undefined}
      >
        <defs>
          <clipPath id={clipId}>
            <rect x={M.left} y={M.top - 4} width={iw} height={ih + 8} />
          </clipPath>
        </defs>
        {yTicks.map((v) => (
          <g key={v}>
            <line x1={M.left} x2={M.left + iw} y1={y(v)} y2={y(v)} stroke="var(--s-line)" strokeDasharray="2 3" />
            <text x={M.left - 6} y={y(v) + 3} textAnchor="end" fontSize={10} fill="var(--s-muted)" className="tabular-nums">
              {v >= 1 || v === 0 ? v.toLocaleString("en-US") : v}
            </text>
          </g>
        ))}
        {xTicks.map((tk) => (
          <text key={tk.t} x={x(new Date(tk.t))} y={height - 5} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
            {tk.label}
          </text>
        ))}
        <g clipPath={`url(#${clipId})`}>
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
        </g>
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
          className="pointer-events-none absolute top-1 z-10 rounded-md border border-border bg-popover px-2.5 py-1.5 text-xs text-popover-foreground shadow-[var(--shadow-overlay)]"
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
      <div className="mt-1 flex flex-wrap justify-center gap-x-3 gap-y-1 text-xs text-s-muted">
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
