"use client";

import * as React from "react";
import { Download, Info, SlidersHorizontal } from "lucide-react";
import { downloadText, fileSafe } from "@/lib/download";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { dcaCsv, runDca, STREAMS, type ArpsParams, type DcaResult, type Stream } from "@/lib/dca";
import type { ProductionMonth } from "@/lib/well-details";
import { cn } from "@/lib/utils";
import { DcaChart, type DcaSeries } from "./dca-chart";

const STREAM_META: Record<Stream, { label: string; rateUnit: string; color: string; volUnit: string; perFt: string }> = {
  oil: { label: "Oil", rateUnit: "BBL/d", color: "var(--chart-oil)", volUnit: "MBBL", perFt: "BBL/ft" },
  gas: { label: "Gas", rateUnit: "MCF/d", color: "var(--chart-gas)", volUnit: "MMCF", perFt: "MCF/ft" },
  water: { label: "Water", rateUnit: "BBL/d", color: "var(--chart-water)", volUnit: "MBBL", perFt: "BBL/ft" },
};
type Ratio = "gor" | "wor";
const RATIO_META: Record<Ratio, { label: string; unit: string; color: string; num: Stream; scale: number }> = {
  gor: { label: "GOR", unit: "scf/bbl", color: "var(--chart-gor)", num: "gas", scale: 1000 },
  wor: { label: "WOR", unit: "bbl/bbl", color: "var(--chart-wor)", num: "water", scale: 1 },
};
type Toggle = Stream | Ratio;

const fmtMonthYear = (d: Date) => d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
const fmtNum = (v: number, digits = 0) => v.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });
const pct = (v: number | null) => (v == null ? "—" : `${fmtNum(v * 100, 1)}%`);

/** Forecast state shared by the panel and its expanded dialog: user overrides and end date. */
export function useDca(production: ProductionMonth[]) {
  const [overrides, setOverrides] = React.useState<Partial<Record<Stream, Partial<ArpsParams>>>>({});
  const [endDate, setEndDate] = React.useState<Date | undefined>();
  const dca = React.useMemo(() => runDca(production, new Date(), { overrides, endDate }), [production, overrides, endDate]);
  const fitted = React.useMemo(() => runDca(production, new Date()), [production]);
  const reset = () => {
    setOverrides({});
    setEndDate(undefined);
  };
  const modified = Object.keys(overrides).length > 0 || endDate != null;
  // One Modify dialog per well, opened from the panel, the expanded view or the chart header.
  const [modifyOpen, setModifyOpen] = React.useState(false);
  // Series toggles, shared by the panel chart and its full-screen view.
  const [on, setOn] = React.useState<Record<Toggle, boolean>>({ oil: true, gas: true, water: true, gor: false, wor: false });
  return { dca, fitted, overrides, setOverrides, endDate, setEndDate, reset, modified, modifyOpen, setModifyOpen, on, setOn };
}
export type DcaState = ReturnType<typeof useDca>;

export function exportDcaCsv(wellName: string, production: ProductionMonth[], dca: DcaResult) {
  downloadText(`${fileSafe(wellName)}_dca.csv`, dcaCsv(wellName, production, dca));
}

function buildSeries(production: ProductionMonth[], dca: DcaResult) {
  const rates = STREAMS.map((s): DcaSeries => {
    const m = STREAM_META[s];
    return {
      key: s,
      label: m.label,
      unit: m.rateUnit,
      color: m.color,
      actual: production.filter((p) => p[s] > 0).map((p) => ({ month: p.month, v: p[s] })),
      fit: dca.streams[s].fit.map((f) => ({ month: f.month, v: f.rate })),
      forecast: dca.streams[s].forecast.map((f) => ({ month: f.month, v: f.rate })),
    };
  });
  const ratio = (r: Ratio): DcaSeries => {
    const m = RATIO_META[r];
    const div = (a: number, b: number) => (b > 0 && a > 0 ? (a * m.scale) / b : 0);
    const oil = dca.streams.oil,
      num = dca.streams[m.num];
    return {
      key: r,
      label: m.label,
      unit: m.unit,
      color: m.color,
      actual: production.map((p) => ({ month: p.month, v: div(p[m.num], p.oil) })).filter((p) => p.v > 0),
      fit: oil.fit.map((f, i) => ({ month: f.month, v: div(num.fit[i]?.rate ?? 0, f.rate) })).filter((p) => p.v > 0),
      forecast: oil.forecast.map((f, i) => ({ month: f.month, v: div(num.forecast[i]?.rate ?? 0, f.rate) })).filter((p) => p.v > 0),
    };
  };
  return { rates, gor: ratio("gor"), wor: ratio("wor") };
}

/** One button in the series toggle group; its unit is in the tooltip (and accessible name). */
function ToggleChip({
  on,
  label,
  unit,
  color,
  first,
  onClick,
}: {
  on: boolean;
  label: string;
  unit: string;
  color: string;
  first?: boolean;
  onClick: () => void;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-pressed={on}
          aria-label={`${label} (${unit})`}
          onClick={onClick}
          className={cn(
            "inline-flex h-7 flex-1 cursor-pointer items-center justify-center gap-1.5 border-0 px-2 text-[11px] leading-none font-medium transition-colors outline-none focus-visible:z-[1] focus-visible:ring-[3px] focus-visible:ring-primary/20",
            !first && "border-l border-solid border-s-line-strong",
            on ? "bg-s-chip text-s-text" : "bg-transparent text-s-muted hover:text-s-text",
          )}
        >
          <span className="inline-block size-2 rounded-full border-2 border-solid" style={{ borderColor: color, background: on ? color : "transparent" }} />
          {label}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">Measured in {unit}</TooltipContent>
    </Tooltip>
  );
}

/** Legend toggles, the rate-time chart (plus GOR/WOR charts when on) and "Modify or Export Forecast". */
export function DcaForecast({ production, state, height = 180 }: { production: ProductionMonth[]; state: DcaState; height?: number }) {
  const { dca, on, setOn } = state;
  const series = React.useMemo(() => (dca ? buildSeries(production, dca) : null), [production, dca]);
  if (!dca || !series) {
    return (
      <p className="m-0 py-3 text-xs text-s-muted">
        Not enough recent production to fit a decline curve. A forecast needs at least 6 months of history and production in the last 3 months.
      </p>
    );
  }
  // Rates toggle independently; GOR and WOR share the right axis, so turning one on turns the other off.
  const flip = (k: Toggle) =>
    setOn((o) => {
      const next = { ...o, [k]: !o[k] };
      if (next[k] && k === "gor") next.wor = false;
      if (next[k] && k === "wor") next.gor = false;
      return next;
    });
  const rates = series.rates.filter((s) => on[s.key as Stream]);
  const ratio = on.gor ? series.gor : on.wor ? series.wor : undefined;
  const nothing = !rates.length && !ratio;
  return (
    <div>
      <div className="mb-2 flex overflow-hidden rounded-md border border-solid border-s-line-strong" role="group" aria-label="Series">
        {STREAMS.map((s, i) => (
          <ToggleChip
            key={s}
            first={i === 0}
            on={on[s]}
            label={STREAM_META[s].label}
            unit={STREAM_META[s].rateUnit}
            color={STREAM_META[s].color}
            onClick={() => flip(s)}
          />
        ))}
        {(["gor", "wor"] as Ratio[]).map((r) => (
          <ToggleChip key={r} on={on[r]} label={RATIO_META[r].label} unit={RATIO_META[r].unit} color={RATIO_META[r].color} onClick={() => flip(r)} />
        ))}
      </div>
      {!nothing && <DcaChart series={rates} secondary={ratio} height={height} />}
      {nothing && <p className="m-0 py-6 text-center text-xs text-s-muted">Turn on a series to see the forecast.</p>}
      <div className="mt-1.5 flex items-center gap-3 text-[11px] text-s-muted">
        <span className="inline-flex items-center gap-1">
          <svg width="14" height="6" aria-hidden="true">
            <circle cx="3" cy="3" r="1.9" fill="currentColor" />
            <circle cx="10" cy="3" r="1.9" fill="currentColor" />
          </svg>
          Actual
        </span>
        <span className="inline-flex items-center gap-1">
          <svg width="16" height="6" aria-hidden="true">
            <line x1="0" x2="16" y1="3" y2="3" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          Fit
        </span>
        <span className="inline-flex items-center gap-1">
          <svg width="16" height="6" aria-hidden="true">
            <line x1="0" x2="16" y1="3" y2="3" stroke="currentColor" strokeWidth="2" strokeDasharray="6 4" />
          </svg>
          Forecast
        </span>
        {state.modified && <span className="ml-auto font-medium text-primary">Modified</span>}
      </div>
      <Button variant="outline" className="mt-2.5 w-full" onClick={() => state.setModifyOpen(true)}>
        <SlidersHorizontal size={14} strokeWidth={1.75} />
        Modify or Export Forecast
      </Button>
    </div>
  );
}

type Draft = Record<Stream, { qi: string; di: string; b: string; dMin: string }>;
const toDraft = (dca: DcaResult): Draft =>
  Object.fromEntries(
    STREAMS.map((s) => {
      const p = dca.streams[s].params;
      return [s, { qi: p.qi.toFixed(1), di: (p.di * 100).toFixed(1), b: p.b.toFixed(2), dMin: (p.dMin * 100).toFixed(1) }];
    }),
  ) as Draft;

export function ModifyDialog({ production, wellName, state }: { production: ProductionMonth[]; wellName: string; state: DcaState }) {
  const { dca, fitted, modifyOpen: open, setModifyOpen: onOpenChange } = state;
  const [draft, setDraft] = React.useState<Draft | null>(null);
  const [endYear, setEndYear] = React.useState("");
  React.useEffect(() => {
    if (open && dca) {
      setDraft(toDraft(dca));
      setEndYear(String(dca.endDate.getFullYear()));
    }
  }, [open, dca]);
  if (!dca || !fitted || !draft) return null;

  const minYear = dca.forecastStart.getFullYear() + 1;
  const parsed = STREAMS.map((s) => {
    const d = draft[s];
    const qi = Number(d.qi),
      di = Number(d.di) / 100,
      b = Number(d.b),
      dMin = Number(d.dMin) / 100;
    const ok = qi > 0 && di > 0 && di < 100 && b >= 0 && b <= 2 && dMin >= 0 && dMin < di;
    return { s, ok, params: { qi, di, b, dMin } };
  });
  const yr = Number(endYear);
  const yearOk = Number.isInteger(yr) && yr >= minYear && yr <= minYear + 60;
  const valid = parsed.every((p) => p.ok) && yearOk;

  const apply = () => {
    if (!valid) return;
    const overrides: Partial<Record<Stream, Partial<ArpsParams>>> = {};
    for (const { s, params } of parsed) {
      const f = fitted.streams[s].params;
      const same = (a: number, b: number) => Math.abs(a - b) <= Math.abs(b) * 1e-3 + 1e-6;
      if (!(same(params.qi, f.qi) && same(params.di, f.di) && same(params.b, f.b) && same(params.dMin, f.dMin))) overrides[s] = params;
    }
    state.setOverrides(overrides);
    state.setEndDate(yr === fitted.endDate.getFullYear() ? undefined : new Date(yr, fitted.endDate.getMonth(), 1));
    onOpenChange(false);
  };
  const set = (s: Stream, k: keyof Draft[Stream], v: string) => setDraft((d) => (d ? { ...d, [s]: { ...d[s], [k]: v } } : d));
  const fields: { k: keyof Draft[Stream]; label: string }[] = [
    { k: "qi", label: "qi (/d)" },
    { k: "di", label: "Di (%/yr)" },
    { k: "b", label: "b" },
    { k: "dMin", label: "Dmin (%/yr)" },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[min(560px,94vw)] rounded-2xl">
        <div className="border-b border-border px-[22px] py-[18px] pr-14">
          <DialogTitle className="text-lg font-semibold">Modify or Export Forecast</DialogTitle>
          <p className="m-0 mt-1 text-xs text-s-muted">
            Modified hyperbolic (Arps) decline, fit from {fmtMonthYear(dca.fitStart)}. qi is the rate at the fit start.
          </p>
        </div>
        <div className="max-h-[70vh] overflow-y-auto px-[22px] py-4">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                <th className="pb-1.5 text-left font-semibold text-s-muted" />
                {fields.map((f) => (
                  <th key={f.k} className="px-1 pb-1.5 text-left font-semibold text-s-muted">
                    {f.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {parsed.map(({ s, ok }) => (
                <tr key={s}>
                  <th scope="row" className="pr-2 text-left font-semibold whitespace-nowrap" style={{ color: STREAM_META[s].color }}>
                    {STREAM_META[s].label}
                  </th>
                  {fields.map((f) => (
                    <td key={f.k} className="px-1 py-1">
                      <Input
                        inputMode="decimal"
                        aria-label={`${STREAM_META[s].label} ${f.label}`}
                        value={draft[s][f.k]}
                        onChange={(e) => set(s, f.k, e.target.value)}
                        aria-invalid={!ok || undefined}
                        className={cn("h-8 px-2 text-xs tabular-nums", !ok && "border-destructive")}
                      />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {!parsed.every((p) => p.ok) && <p className="m-0 mt-1 text-xs text-destructive">qi and Di must be positive, b between 0 and 2, and Dmin below Di.</p>}
          <label className="mt-3 flex items-center gap-2 text-xs text-s-text">
            Forecast end year
            <Input
              inputMode="numeric"
              value={endYear}
              onChange={(e) => setEndYear(e.target.value)}
              aria-invalid={!yearOk || undefined}
              className={cn("h-8 w-20 px-2 text-xs tabular-nums", !yearOk && "border-destructive")}
            />
            {!yearOk && (
              <span className="text-destructive">
                Between {minYear} and {minYear + 60}
              </span>
            )}
          </label>
        </div>
        <div className="flex flex-wrap items-center gap-2 border-t border-border px-[22px] py-3">
          <Button variant="ghost" onClick={() => exportDcaCsv(wellName, production, dca)}>
            <Download size={14} strokeWidth={1.75} />
            Export CSV
          </Button>
          <div className="ml-auto flex gap-2">
            <Button
              variant="outline"
              onClick={() => {
                state.reset();
                onOpenChange(false);
              }}
            >
              Reset to Fit
            </Button>
            <Button onClick={apply} disabled={!valid}>
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

/** Forecast window and per-stream volumes: cum to date, EUR, EUR/ft, remaining, declines. */
export function ResourceEstimates({ dca, production, lateralFt }: { dca: DcaResult; production: ProductionMonth[]; lateralFt: number | null }) {
  const last = production[production.length - 1]?.month;
  const vol = (v: number) => fmtNum(v / 1000, 1);
  const rows: { label: React.ReactNode; key: string; cell: (s: Stream) => string }[] = [
    {
      key: "cum",
      label: (
        <span className="inline-flex items-center gap-1">
          Cum to Date
          <Tooltip>
            <TooltipTrigger asChild>
              <button aria-label="About cum to date" className="flex cursor-help border-none bg-transparent p-0 text-s-muted">
                <Info size={11} strokeWidth={1.75} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="top">Produced through {last ? fmtMonthYear(last) : "—"}</TooltipContent>
          </Tooltip>
        </span>
      ),
      cell: (s) => vol(dca.streams[s].cumToDate),
    },
    { key: "eur", label: "EUR", cell: (s) => vol(dca.streams[s].eur) },
    { key: "eurft", label: "EUR/ft", cell: (s) => (lateralFt ? fmtNum(dca.streams[s].eur / lateralFt, 1) : "—") },
    { key: "rem", label: "Remaining", cell: (s) => vol(dca.streams[s].remaining) },
    { key: "d12", label: "Next 12-Mo Decline", cell: (s) => pct(dca.streams[s].next12Decline) },
    { key: "d60", label: "Next 60-Mo Decline", cell: (s) => pct(dca.streams[s].next60Decline) },
  ];
  return (
    <div>
      <dl className="m-0 mb-2.5 grid grid-cols-2 gap-2">
        {[
          ["Forecast Start", fmtMonthYear(dca.forecastStart)],
          ["End Date", fmtMonthYear(dca.endDate)],
        ].map(([k, v]) => (
          <div key={k} className="rounded-md bg-s-bg px-2.5 py-2">
            <dt className="text-[11px] text-s-muted">{k}</dt>
            <dd className="m-0 mt-0.5 text-[13px] font-semibold text-s-text tabular-nums">{v}</dd>
          </div>
        ))}
      </dl>
      <table className="w-full border-collapse text-xs">
        <thead>
          <tr>
            <th className="pb-1.5 text-left" />
            {STREAMS.map((s) => (
              <th key={s} className="pb-1.5 text-right font-semibold">
                <div className="text-[11px] uppercase" style={{ color: STREAM_META[s].color }}>
                  {STREAM_META[s].label}
                </div>
                <div className="text-[10px] font-normal text-s-muted">{STREAM_META[s].volUnit}</div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} className="border-t border-s-line">
              <th scope="row" className="py-[7px] pr-2 text-left font-normal text-s-text">
                {r.label}
                {r.key === "eurft" && <span className="ml-1 text-[10px] text-s-muted">(BBL · MCF)</span>}
              </th>
              {STREAMS.map((s) => (
                <td key={s} className="py-[7px] pl-2 text-right font-mono font-medium text-s-text tabular-nums">
                  {r.cell(s)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
