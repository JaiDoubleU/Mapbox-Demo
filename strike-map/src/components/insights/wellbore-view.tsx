"use client";

import * as React from "react";
import { ArrowDown, ArrowUp, ChevronLeft, ChevronRight, ChevronsUpDown, Info } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Cell, DataTable, Wellbore } from "@/lib/wellbore";
import { cn } from "@/lib/utils";

const n0 = (v: number) => Math.round(v).toLocaleString("en-US");
const kLabel = (v: number) => (v === 0 ? "0" : `${Math.round(v / 1000)}k`);

/* Casing strings drawn as nested outlines along the path, widest first. */
const CASING_WIDTH: Record<string, number> = { Conductor: 24, Surface: 19, Intermediate: 14, Production: 9 };

export function WellboreSchematic({ wb, height = 250 }: { wb: Wellbore; height?: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [width, setWidth] = React.useState(320);
  const [hover, setHover] = React.useState<number | null>(null);
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([e]) => setWidth(Math.max(220, e.contentRect.width)));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const M = { left: 46, right: 14, top: 16, bottom: 34 };
  const iw = width - M.left - M.right, ih = height - M.top - M.bottom;
  const maxX = Math.max(1000, ...wb.path.map((p) => p.x)) * 1.05;
  const xStep = maxX > 6000 ? 1000 * Math.ceil(maxX / 9000) : 1000;
  const xMax = Math.ceil(maxX / xStep) * xStep;
  // Start a little left of zero so the wellhead clears the depth axis.
  const xMin = -xStep * 0.6;
  const yMax = Math.ceil((wb.tvdFt + 400) / 2000) * 2000;
  const sx = (x: number) => M.left + ((x - xMin) / (xMax - xMin)) * iw;
  const sy = (y: number) => M.top + (y / yMax) * ih;
  const pts = (maxMd: number) =>
    wb.path
      .filter((p) => p.md <= maxMd)
      .map((p) => `${sx(p.x).toFixed(1)},${sy(p.tvd).toFixed(1)}`)
      .join(" ");

  const xTicks: number[] = [];
  for (let v = 0; v <= xMax; v += xStep) xTicks.push(v);
  const yTicks: number[] = [];
  for (let v = 0; v <= yMax; v += 2000) yTicks.push(v);
  const top = wb.path[0];

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - r.left, py = e.clientY - r.top;
    let best = 0, bestD = Infinity;
    wb.path.forEach((p, i) => {
      const dd = (sx(p.x) - px) ** 2 + (sy(p.tvd) - py) ** 2;
      if (dd < bestD) {
        bestD = dd;
        best = i;
      }
    });
    setHover(bestD < 40 * 40 ? best : null);
  };
  const hp = hover != null ? wb.path[hover] : null;

  return (
    <div ref={ref} className="relative">
      <svg
        width={width}
        height={height}
        role="img"
        aria-label={`Wellbore schematic: MD ${n0(wb.mdFt)} ft, TVD ${n0(wb.tvdFt)} ft${wb.lateralFt ? `, lateral ${n0(wb.lateralFt)} ft` : ""}`}
        className="block touch-pan-y"
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setHover(null)}
      >
        {yTicks.map((v) => (
          <g key={`y${v}`}>
            <line x1={M.left} x2={M.left + iw} y1={sy(v)} y2={sy(v)} stroke="var(--s-line)" strokeDasharray="2 3" />
            <text x={M.left - 6} y={sy(v) + 3} textAnchor="end" fontSize={10} fill="var(--s-muted)">
              {kLabel(v)}
            </text>
          </g>
        ))}
        {xTicks.map((v) => (
          <text key={`x${v}`} x={sx(v)} y={M.top + ih + 14} textAnchor="middle" fontSize={10} fill="var(--s-muted)">
            {kLabel(v)}
          </text>
        ))}
        <text x={M.left + iw / 2} y={height - 4} textAnchor="middle" fontSize={11} fill="var(--s-muted)">
          Horizontal Displacement (ft)
        </text>
        <text transform={`translate(11 ${M.top + ih / 2}) rotate(-90)`} textAnchor="middle" fontSize={11} fill="var(--s-muted)">
          TVD (ft)
        </text>

        {/* casing strings: outline then interior, widest first, so they read as nested pipes */}
        {wb.casing.map((c) => {
          const wpx = CASING_WIDTH[c.name] ?? 9;
          const p = pts(c.bottomMdFt);
          return (
            <g key={c.name}>
              <polyline points={p} fill="none" stroke="var(--s-muted)" strokeWidth={wpx} strokeLinejoin="round" />
              <polyline points={p} fill="none" stroke="var(--s-card)" strokeWidth={wpx - 2} strokeLinejoin="round" />
            </g>
          );
        })}
        {/* wellbore */}
        <polyline points={pts(Infinity)} fill="none" stroke="var(--primary)" strokeWidth={3.5} strokeLinejoin="round" strokeLinecap="round" />
        {/* wellhead */}
        <g stroke="var(--s-muted)" strokeWidth={1.5} fill="none">
          <path d={`M${sx(top.x) - 14},${M.top - 2} h28 M${sx(top.x) - 10},${M.top - 8} h20 M${sx(top.x) - 6},${M.top - 8} v6 M${sx(top.x) + 6},${M.top - 8} v6`} />
        </g>

        <text x={M.left + iw} y={M.top + 12} textAnchor="end" fontSize={11} fill="var(--s-text)">
          {wb.lateralFt ? `Effective Lat Length ${n0(wb.lateralFt)} ft` : "Vertical wellbore"}
        </text>
        <text x={M.left + iw} y={M.top + 26} textAnchor="end" fontSize={11} fill="var(--s-text)">
          MD {n0(wb.mdFt)} ft · TVD {n0(wb.tvdFt)} ft
        </text>

        {hp && (
          <circle cx={sx(hp.x)} cy={sy(hp.tvd)} r={5} fill="var(--primary)" stroke="var(--s-card)" strokeWidth={2} pointerEvents="none" />
        )}
      </svg>
      {hp && (
        <div
          className="pointer-events-none absolute z-10 rounded-md border border-border bg-popover px-2.5 py-1.5 text-[11px] whitespace-nowrap text-popover-foreground tabular-nums shadow-[var(--shadow-overlay)]"
          style={{
            top: Math.min(height - 70, Math.max(0, sy(hp.tvd) - 70)),
            ...(sx(hp.x) > width / 2 ? { right: width - sx(hp.x) + 10 } : { left: sx(hp.x) + 10 }),
          }}
        >
          <div>MD {n0(hp.md)} ft</div>
          <div>TVD {n0(hp.tvd)} ft</div>
          <div>Inclination {hp.inc.toFixed(1)}°</div>
        </div>
      )}
    </div>
  );
}

const PAGE = 8;
const asNumber = (c: Cell) => (typeof c === "number" ? c : Number(String(c).replace(/[^0-9.-]/g, "")));

export function WellboreTables({ tables }: { tables: DataTable[] }) {
  const [tabId, setTabId] = React.useState(tables[0].id);
  const [sort, setSort] = React.useState<{ key: string; dir: 1 | -1 } | null>(null);
  const [page, setPage] = React.useState(0);
  const stripRef = React.useRef<HTMLDivElement>(null);
  const table = tables.find((t) => t.id === tabId) ?? tables[0];
  // Default: the table's natural order (e.g. casing by depth); ↑ shows when that is a column order.
  const sortKey = sort?.key ?? table.sortedBy ?? null;
  const dir = sort?.dir ?? 1;
  const col = table.columns.find((c) => c.key === sortKey);
  const rows = !sort
    ? table.rows
    : [...table.rows].sort((a, b) => {
        const va = a[sort.key], vb = b[sort.key];
        const cmp = col?.numeric ? asNumber(va) - asNumber(vb) : String(va).localeCompare(String(vb));
        return cmp * dir;
      });
  const pages = Math.max(1, Math.ceil(rows.length / PAGE));
  const shown = rows.slice(page * PAGE, page * PAGE + PAGE);

  const pick = (id: string) => {
    setTabId(id);
    setSort(null);
    setPage(0);
  };
  const scrollTabs = (dx: number) => stripRef.current?.scrollBy({ left: dx, behavior: "smooth" });
  const navBtn = "flex shrink-0 cursor-pointer items-center border-none bg-transparent p-1 text-s-muted hover:text-s-text";

  return (
    <div>
      <div className="flex items-center border-b border-s-line">
        <button className={navBtn} onClick={() => scrollTabs(-140)} aria-label="Scroll tabs left">
          <ChevronLeft size={14} strokeWidth={1.75} />
        </button>
        <div ref={stripRef} role="tablist" className="flex flex-1 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {tables.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={t.id === table.id}
              onClick={() => pick(t.id)}
              className={cn(
                "-mb-px shrink-0 cursor-pointer border-x-0 border-t-0 border-b-2 border-solid bg-transparent px-2.5 py-2 text-xs font-medium whitespace-nowrap",
                t.id === table.id ? "border-primary text-primary" : "border-transparent text-s-text hover:text-primary",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button className={navBtn} onClick={() => scrollTabs(140)} aria-label="Scroll tabs right">
          <ChevronRight size={14} strokeWidth={1.75} />
        </button>
      </div>

      <div className="min-h-[170px] overflow-x-auto" role="tabpanel">
        {rows.length ? (
          <table className="w-max min-w-full border-collapse text-xs">
            <thead>
              <tr>
                {table.columns.map((c) => {
                  const active = c.key === sortKey;
                  const Icon = active ? (dir === 1 ? ArrowUp : ArrowDown) : ChevronsUpDown;
                  return (
                    <th key={c.key} scope="col" className="border-b border-s-line px-2.5 py-2 text-left font-semibold whitespace-nowrap text-s-text">
                      <button
                        onClick={() => {
                          setSort({ key: c.key, dir: active ? ((dir === 1 ? -1 : 1) as 1 | -1) : 1 });
                          setPage(0);
                        }}
                        className="flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 font-semibold text-s-text"
                      >
                        {c.label}
                        <Icon size={11} strokeWidth={2} className={active ? "text-s-text" : "text-s-faint"} />
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {shown.map((r, i) => (
                <tr key={i} className="border-b border-s-line last:border-b-0">
                  {table.columns.map((c) => (
                    <td key={c.key} className={cn("px-2.5 py-2 whitespace-nowrap text-s-text", c.numeric && "tabular-nums")}>
                      {r[c.key]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="py-8 text-center text-xs text-s-muted">{table.empty ?? "No records."}</div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-s-line pt-2 text-xs">
        <button
          onClick={() => setPage((p) => p - 1)}
          disabled={page === 0}
          className="flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-s-text disabled:cursor-default disabled:text-s-faint"
        >
          <ChevronLeft size={12} strokeWidth={1.75} /> Prev
        </button>
        <span className="text-s-text tabular-nums">
          {page + 1} of {pages}
        </span>
        <button
          onClick={() => setPage((p) => p + 1)}
          disabled={page >= pages - 1}
          className="flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-s-text disabled:cursor-default disabled:text-s-faint"
        >
          Next <ChevronRight size={12} strokeWidth={1.75} />
        </button>
      </div>
    </div>
  );
}

export function SchematicInfo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button aria-label="About this schematic" className="flex cursor-help border-none bg-transparent p-0 text-s-muted">
          <Info size={12} strokeWidth={1.75} />
        </button>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-60 whitespace-normal">
        Built from the directional survey and casing records. Horizontal and vertical scales differ.
      </TooltipContent>
    </Tooltip>
  );
}
