"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import {
  benchmarks,
  GROUP_LABELS,
  keyToDate,
  METRICS,
  productionByGroup,
  spudByGroup,
  typeCurve,
  typeCurveDca,
  type GroupBy,
  type Metric,
  type Stream,
} from "@/lib/area-insights";
import { useDataset } from "@/lib/dataset-context";
import type { Well } from "@/lib/strike-data";
import { cn } from "@/lib/utils";
import { fmtK, Legend, RangePlot, StackedAreaChart, StackedBarChart, TypeCurveChart } from "./area-charts";
import { QuickInsights } from "./quick-insights";
import { DcaChart, elapsedDate, type DcaSeries } from "./dca-chart";
import { InsightCard } from "./insight-card";
import { downloadText } from "@/lib/download";
import { ActionLinks, card } from "./record-detail";

export const WELL_AREA_ACTIONS = ["Understand Well History", "Benchmark Completions and Production", "Type Curve Creation", "Decline Curve Analysis"];

const STREAM: Record<Stream, { label: string; rate: string; vol: string; volDiv: number; color: string }> = {
  oil: { label: "Oil Production", rate: "BBL/D", vol: "Mbbl", volDiv: 1e3, color: "var(--chart-oil)" },
  gas: { label: "Gas Production", rate: "MCF/D", vol: "MMcf", volDiv: 1e3, color: "var(--chart-gas)" },
};
const NORMALIZE_FT = 10_000;
const fmtNum = (v: number, digits = 0) => v.toLocaleString("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits });

// ---- small controls -----------------------------------------------------------------

/** Oil / Gas text tabs above a chart. */
function StreamTabs({ value, onChange }: { value: Stream; onChange: (s: Stream) => void }) {
  return (
    <div role="tablist" aria-label="Stream" className="mb-2 flex gap-3">
      {(["oil", "gas"] as Stream[]).map((s) => (
        <button
          key={s}
          role="tab"
          aria-selected={value === s}
          onClick={() => onChange(s)}
          className={cn(
            "cursor-pointer border-none bg-transparent p-0 text-xs font-semibold uppercase outline-none focus-visible:underline",
            value === s ? "text-s-text" : "text-s-faint hover:text-s-muted",
          )}
        >
          {STREAM[s].label} - {STREAM[s].rate}
        </button>
      ))}
    </div>
  );
}

function Picker<T extends string>({ label, value, options, onChange }: { label: string; value: T; options: [T, string][]; onChange: (v: T) => void }) {
  return (
    <label className="flex items-center gap-1.5 text-xs text-s-text">
      {label}
      <Select value={value} onValueChange={(v) => onChange(v as T)}>
        <SelectTrigger aria-label={label} className="h-7 min-w-[104px] rounded-md px-2 text-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map(([v, l]) => (
            <SelectItem key={v} value={v} className="text-xs">
              {l}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}

function Kpis({ items }: { items: { label: string; value: string }[] }) {
  return (
    <div className="mb-2.5 flex gap-2">
      {items.map((k) => (
        <div key={k.label} className="flex-1 rounded-md bg-s-bg px-2 py-1.5 text-center">
          <div className="text-[13px] font-semibold text-s-text tabular-nums">{k.value}</div>
          <div className="mt-0.5 text-xs leading-tight text-s-muted">{k.label}</div>
        </div>
      ))}
    </div>
  );
}

/** A chart card that opens a full-screen copy of itself. */
function Expandable({ title, render }: { title: string; render: (big: boolean) => React.ReactNode }) {
  return (
    <InsightCard title={title} renderExpanded={() => render(true)}>
      {render(false)}
    </InsightCard>
  );
}

// ---- Understand Well History ---------------------------------------------------

function HistoricalProduction({ wells }: { wells: Well[] }) {
  const d = useDataset();
  const [stream, setStream] = React.useState<Stream>("oil");
  const data = React.useMemo(() => productionByGroup(d, wells, stream), [d, wells, stream]);
  const n = data.months.length;
  const [range, setRange] = React.useState<[number, number]>([0, Math.max(0, n - 1)]);
  const firstMonth = data.months[0];
  // A new data set (stream or wells changed) resets the range to everything.
  React.useEffect(() => setRange([0, Math.max(0, n - 1)]), [n, firstMonth]);
  const [a, b] = [Math.min(range[0], n - 1), Math.min(range[1], n - 1)];
  const months = data.months.slice(a, b + 1);
  const values = data.values.map((v) => v.slice(a, b + 1));
  const year = (i: number) => (n ? keyToDate(data.months[Math.max(0, i)]).getFullYear() : "—");
  const title = "Historical Production by Operator";
  const exportCsv = () => {
    const ym = (k: number) => `${Math.floor(k / 12)}-${String((k % 12) + 1).padStart(2, "0")}`;
    const q = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
    const rows = [
      ["month", ...data.groups.map((g) => q(g.label))].join(","),
      ...data.months.map((m, i) => [ym(m), ...data.values.map((v) => v[i].toFixed(1))].join(",")),
    ];
    downloadText(`historical_production_${stream}.csv`, rows.join("\n"));
  };
  const chart = (big: boolean) => (
    <>
      <StreamTabs value={stream} onChange={setStream} />
      <StackedAreaChart months={months} groups={data.groups} values={values} unit={STREAM[stream].rate} height={big ? 380 : 190} />
      {n > 1 && (
        <div className="mt-1 flex items-center gap-2 pl-[38px]">
          <span className="rounded border border-s-line-strong px-1.5 py-0.5 text-xs text-s-text tabular-nums">{year(a)}</span>
          <Slider
            min={0}
            max={n - 1}
            step={1}
            minStepsBetweenThumbs={2}
            value={[a, b]}
            onValueChange={(v) => setRange([v[0], v[1]])}
            thumbLabels={["Start month", "End month"]}
            className="flex-1"
          />
          <span className="rounded border border-s-line-strong px-1.5 py-0.5 text-xs text-s-text tabular-nums">{year(b)}</span>
        </div>
      )}
    </>
  );
  return (
    <InsightCard
      title={title}
      onExport={exportCsv}
      renderExpanded={() => (
        <>
          {chart(true)}
          <Legend groups={data.groups} />
        </>
      )}
      footer={<Legend groups={data.groups} className="mt-0" />}
    >
      {chart(false)}
    </InsightCard>
  );
}

function SpudYear({ wells }: { wells: Well[] }) {
  const [by, setBy] = React.useState<GroupBy>("operator");
  // Groups (and their colours) come from all wells, so narrowing the years never repaints them.
  const data = React.useMemo(() => spudByGroup(wells, by), [wells, by]);
  const y0 = data.years[0] ?? 0,
    y1 = data.years[data.years.length - 1] ?? 0;
  const [from, setFrom] = React.useState(String(y0));
  const [to, setTo] = React.useState(String(y1));
  React.useEffect(() => {
    setFrom(String(y0));
    setTo(String(y1));
  }, [y0, y1]);
  const f = Number(from) || y0,
    t = Number(to) || y1;
  const lo = Math.max(y0, Math.min(f, t)),
    hi = Math.min(y1, Math.max(f, t));
  const i0 = data.years.indexOf(lo),
    i1 = data.years.indexOf(hi);
  const years = i0 >= 0 && i1 >= 0 ? data.years.slice(i0, i1 + 1) : [];
  const values = data.values.map((v) => (i0 >= 0 && i1 >= 0 ? v.slice(i0, i1 + 1) : []));
  const changed = lo !== y0 || hi !== y1;
  const body = (big: boolean) => (
    <>
      <div className="mb-2 flex flex-wrap items-center gap-x-3 gap-y-2">
        <Picker label="Group By:" value={by} options={(Object.keys(GROUP_LABELS) as GroupBy[]).map((k) => [k, GROUP_LABELS[k]])} onChange={setBy} />
        <div className="flex items-center gap-1.5 text-xs text-s-text">
          Years:
          <Input
            aria-label="From year"
            inputMode="numeric"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="h-7 w-[58px] px-1.5 text-xs tabular-nums"
          />
          to
          <Input
            aria-label="To year"
            inputMode="numeric"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="h-7 w-[58px] px-1.5 text-xs tabular-nums"
          />
          <Button
            variant="outline"
            size="sm"
            disabled={!changed}
            onClick={() => {
              setFrom(String(y0));
              setTo(String(y1));
            }}
            className="h-6 rounded-full px-2 text-xs"
          >
            Reset
          </Button>
        </div>
      </div>
      <StackedBarChart years={years} groups={data.groups} values={values} height={big ? 340 : 170} />
    </>
  );
  const exportCsv = () => {
    const q = (v: string) => (/[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v);
    const rows = [["year", ...data.groups.map((g) => q(g.label))].join(","), ...years.map((yr, i) => [yr, ...values.map((v) => v[i])].join(","))];
    downloadText(`spud_year_by_${by}.csv`, rows.join("\n"));
  };
  return (
    <InsightCard
      title={`Spud Year by ${GROUP_LABELS[by]}`}
      onExport={exportCsv}
      renderExpanded={() => (
        <>
          {body(true)}
          <Legend groups={data.groups} />
        </>
      )}
      footer={<Legend groups={data.groups} className="mt-0" />}
    >
      {body(false)}
    </InsightCard>
  );
}

function WellHistory({ wells }: { wells: Well[] }) {
  return (
    <>
      <HistoricalProduction wells={wells} />
      <SpudYear wells={wells} />
      <QuickInsights
        items={wells}
        groups={[
          { title: "Well Status", key: (w) => w.status },
          { title: "Operator", key: (w) => w.operator },
          { title: "Formation", key: (w) => w.formation },
        ]}
      />
    </>
  );
}

// ---- Benchmark Completions and Production ------------------------------------

function Benchmarks({ wells }: { wells: Well[] }) {
  const d = useDataset();
  const [metric, setMetric] = React.useState<Metric>("eur");
  const [by, setBy] = React.useState<GroupBy>("operator");
  const res = React.useMemo(() => benchmarks(d, wells, metric, by), [d, wells, metric, by]);
  const m = METRICS[metric];
  const body = () => (
    <>
      <div className="mb-2.5 flex flex-wrap gap-x-3 gap-y-2">
        <Picker label="Metric:" value={metric} options={(Object.keys(METRICS) as Metric[]).map((k) => [k, METRICS[k].label])} onChange={setMetric} />
        <Picker label="By:" value={by} options={(["operator", "formation"] as GroupBy[]).map((k) => [k, GROUP_LABELS[k]])} onChange={setBy} />
      </div>
      {res.overall.n > 0 && (
        <Kpis
          items={[
            { label: `P90 (${m.unit})`, value: fmtNum(res.overall.p90, m.digits) },
            { label: `P50 (${m.unit})`, value: fmtNum(res.overall.p50, m.digits) },
            { label: `P10 (${m.unit})`, value: fmtNum(res.overall.p10, m.digits) },
          ]}
        />
      )}
      <RangePlot rows={res.byGroup} overall={res.overall} unit={m.unit} digits={m.digits} />
      <p className="m-0 mt-1.5 text-xs text-s-muted">
        {res.overall.n.toLocaleString("en-US")} horizontal wells. Bar spans P90–P10, dot is P50; dashed line is the overall P50.
      </p>
    </>
  );
  return <Expandable title={`${m.label} by ${GROUP_LABELS[by]}`} render={body} />;
}

// ---- Type curve & decline analysis -----------------------------------------------

function CurveControls({
  stream,
  setStream,
  normalize,
  setNormalize,
}: {
  stream: Stream;
  setStream: (s: Stream) => void;
  normalize: boolean;
  setNormalize: (v: boolean) => void;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-2">
      <StreamTabs value={stream} onChange={setStream} />
      <label className="mb-2 flex items-center gap-1.5 text-xs text-s-text">
        <Switch checked={normalize} onCheckedChange={setNormalize} aria-label={`Normalize to ${NORMALIZE_FT.toLocaleString("en-US")} ft lateral`} />
        Normalize to 10k ft
      </label>
    </div>
  );
}

function TypeCurveView({ wells, stream, setStream, normalize, setNormalize }: CurveProps) {
  const d = useDataset();
  const curve = React.useMemo(() => typeCurve(d, wells, stream, normalize ? NORMALIZE_FT : null), [d, wells, stream, normalize]);
  const s = STREAM[stream];
  const peak = curve.points.length ? Math.max(...curve.points.map((p) => p.p50)) : 0;
  const cum12 = curve.points.slice(0, 12).reduce((sum, p) => sum + p.p50 * 30.44, 0);
  const body = (big: boolean) => (
    <>
      <CurveControls stream={stream} setStream={setStream} normalize={normalize} setNormalize={setNormalize} />
      <Kpis
        items={[
          { label: "Wells", value: curve.wells.toLocaleString("en-US") },
          { label: `P50 Peak (${s.rate.toLowerCase()})`, value: fmtK(peak) },
          { label: `P50 First 12 Mo (${s.vol})`, value: fmtNum(cum12 / s.volDiv, 1) },
        ]}
      />
      <TypeCurveChart points={curve.points} color={s.color} unit={s.rate} height={big ? 380 : 200} />
    </>
  );
  return <Expandable title="Type Curve" render={body} />;
}

type DeclineToggle = "oil" | "gas" | "water" | "gor" | "wor";
const DECLINE_ITEMS: { key: DeclineToggle; label: string; unit: string; color: string }[] = [
  { key: "oil", label: "Oil", unit: "BBL/d", color: "var(--chart-oil)" },
  { key: "gas", label: "Gas", unit: "MCF/d", color: "var(--chart-gas)" },
  { key: "water", label: "Water", unit: "BBL/d", color: "var(--chart-water)" },
  { key: "gor", label: "GOR", unit: "scf/bbl", color: "var(--chart-gor)" },
  { key: "wor", label: "WOR", unit: "bbl/bbl", color: "var(--chart-wor)" },
];
const RATE_KEYS = ["oil", "gas", "water"] as const;
// Economic limits for the forecast, per day.
const DECLINE_LIMIT = { oil: 2, gas: 10, water: 1 } as const;
const DECLINE_VOL = { oil: { unit: "Mbbl", div: 1e3 }, gas: { unit: "MMcf", div: 1e3 }, water: { unit: "Mbbl", div: 1e3 } } as const;

/** One button of the series toggle group: just the word, the unit in a tooltip. */
function DeclineToggleItem({ item }: { item: (typeof DECLINE_ITEMS)[number] }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        {/* The tooltip trigger overwrites data-state, so the pressed style keys off aria-pressed. */}
        <ToggleGroupItem value={item.key} className="h-7 px-2 text-xs aria-pressed:bg-accent aria-pressed:text-accent-foreground">
          {item.label}
        </ToggleGroupItem>
      </TooltipTrigger>
      <TooltipContent side="top">Measured in {item.unit}</TooltipContent>
    </Tooltip>
  );
}

function DeclineView({ wells, normalize, setNormalize }: Pick<CurveProps, "wells" | "normalize" | "setNormalize">) {
  const d = useDataset();
  // Oil, gas and water each toggle on their own; GOR and WOR each add a log axis on the right.
  const [on, setOn] = React.useState<DeclineToggle[]>(["oil", "gas", "water"]);
  const fits = React.useMemo(
    () =>
      Object.fromEntries(
        RATE_KEYS.map((k) => {
          const curve = typeCurve(d, wells, k, normalize ? NORMALIZE_FT : null);
          return [k, { curve, dca: typeCurveDca(curve, 30, DECLINE_LIMIT[k]) }];
        }),
      ) as Record<(typeof RATE_KEYS)[number], { curve: ReturnType<typeof typeCurve>; dca: ReturnType<typeof typeCurveDca> }>,
    [d, wells, normalize],
  );
  const wellCount = fits.oil.curve.wells;
  const monthly = (pts: { t: number; v: number }[]) => pts.map((p) => ({ month: elapsedDate(p.t), v: p.v }));
  const series = React.useMemo(() => {
    const out = {} as Record<DeclineToggle, DcaSeries | null>;
    for (const item of DECLINE_ITEMS) {
      const base = { key: item.key, label: item.label, unit: item.unit, color: item.color };
      if (item.key === "gor" || item.key === "wor") {
        const num = fits[item.key === "gor" ? "gas" : "water"],
          den = fits.oil;
        if (!num.dca || !den.dca) {
          out[item.key] = null;
          continue;
        }
        const scale = item.key === "gor" ? 1000 : 1;
        const over = (a: { t: number; v: number }[], b: { t: number; v: number }[]) => {
          const bm = new Map(b.map((p) => [p.t, p.v]));
          return a.filter((p) => (bm.get(p.t) ?? 0) > 0).map((p) => ({ t: p.t, v: (p.v * scale) / bm.get(p.t)! }));
        };
        const pts = (c: typeof num) => c.curve.points.filter((p) => p.p50 > 0).map((p) => ({ t: p.t, v: p.p50 }));
        out[item.key] = {
          ...base,
          actual: monthly(over(pts(num), pts(den))),
          fit: monthly(over(num.dca.fit, den.dca.fit)),
          forecast: monthly(over(num.dca.forecast, den.dca.forecast)),
        };
      } else {
        const { curve, dca } = fits[item.key];
        out[item.key] = dca
          ? {
              ...base,
              actual: monthly(curve.points.filter((p) => p.p50 > 0).map((p) => ({ t: p.t, v: p.p50 }))),
              fit: monthly(dca.fit),
              forecast: monthly(dca.forecast),
            }
          : null;
      }
    }
    return out;
  }, [fits]);
  const rates = RATE_KEYS.filter((k) => on.includes(k)).flatMap((k) => (series[k] ? [series[k]!] : []));
  const ratios = (["gor", "wor"] as const).filter((k) => on.includes(k)).flatMap((k) => (series[k] ? [series[k]!] : []));
  const params = RATE_KEYS.filter((k) => on.includes(k) && fits[k].dca);
  const any = wellCount > 0 && DECLINE_ITEMS.some((i) => series[i.key]);
  const body = (big: boolean) => (
    <>
      <ToggleGroup
        type="multiple"
        variant="outline"
        size="sm"
        value={on}
        onValueChange={(v) => setOn(v as DeclineToggle[])}
        aria-label="Series"
        className="mb-2 w-full"
      >
        {DECLINE_ITEMS.map((item) => (
          <DeclineToggleItem key={item.key} item={item} />
        ))}
      </ToggleGroup>
      <label className="mb-2 flex items-center gap-1.5 text-xs text-s-text">
        <Switch checked={normalize} onCheckedChange={setNormalize} aria-label={`Normalize to ${NORMALIZE_FT.toLocaleString("en-US")} ft lateral`} />
        Normalize to 10k ft
      </label>
      {!any ? (
        <p className="m-0 py-6 text-center text-xs text-s-muted">Not enough horizontal wells with production history to fit a decline curve.</p>
      ) : rates.length + ratios.length === 0 ? (
        <p className="m-0 py-6 text-center text-xs text-s-muted">Turn on a series to see the forecast.</p>
      ) : (
        <>
          <DcaChart series={rates} secondaries={ratios} elapsed height={big ? 380 : 200} />
          <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-s-muted">
            <span className="inline-flex items-center gap-1">
              <svg width="14" height="6" aria-hidden="true">
                <circle cx="3" cy="3" r="1.9" fill="currentColor" />
                <circle cx="10" cy="3" r="1.9" fill="currentColor" />
              </svg>
              P50
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
          </div>
          {params.length > 0 && (
            <table className="mt-2.5 w-full border-collapse text-xs">
              <thead>
                <tr className="text-left text-s-muted">
                  <th className="pb-1 font-medium">Series</th>
                  <th className="pb-1 text-right font-medium">qi (/d)</th>
                  <th className="pb-1 text-right font-medium">Di (%/yr)</th>
                  <th className="pb-1 text-right font-medium">b</th>
                  <th className="pb-1 text-right font-medium">P50 EUR</th>
                </tr>
              </thead>
              <tbody>
                {params.map((k) => {
                  const dca = fits[k].dca!;
                  const item = DECLINE_ITEMS.find((i) => i.key === k)!;
                  return (
                    <tr key={k} className="border-t border-border tabular-nums">
                      <th scope="row" className="py-1 text-left font-normal text-s-text">
                        {item.label}
                      </th>
                      <td className="py-1 text-right text-s-text">{fmtK(dca.params.qi)}</td>
                      <td className="py-1 text-right text-s-text">{fmtNum(dca.params.di * 100, 0)}</td>
                      <td className="py-1 text-right text-s-text">{dca.params.b.toFixed(2)}</td>
                      <td className="py-1 text-right text-s-text">
                        {fmtNum(dca.eur / DECLINE_VOL[k].div, 0)} {DECLINE_VOL[k].unit}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
          <p className="m-0 mt-1.5 text-xs text-s-muted">
            Arps hyperbolic fit to the P50 type curve of {wellCount.toLocaleString("en-US")} wells
            {normalize ? `, normalized to ${NORMALIZE_FT.toLocaleString("en-US")} ft` : ""}; 30-year forecast to the economic limit.
          </p>
        </>
      )}
    </>
  );
  return <Expandable title="DCA Forecast" render={body} />;
}

interface CurveProps {
  wells: Well[];
  stream: Stream;
  setStream: (s: Stream) => void;
  normalize: boolean;
  setNormalize: (v: boolean) => void;
}

// ---- tab ---------------------------------------------------------------------------

/** Wells tab: the four area workflows over `wells` (the selection, or everything visible). */
export function WellsInsights({ wells }: { wells: Well[] }) {
  const [view, setView] = React.useState(WELL_AREA_ACTIONS[0]);
  const [stream, setStream] = React.useState<Stream>("oil");
  const [normalize, setNormalize] = React.useState(true);
  const curve = { wells, stream, setStream, normalize, setNormalize };
  return (
    <div className="flex flex-col gap-2.5">
      <ActionLinks links={WELL_AREA_ACTIONS} active={view} onAction={setView} label="Well workflows" />
      {wells.length === 0 ? (
        <div className={cn(card, "px-3.5 py-6 text-center text-xs text-s-muted")}>No wells here. Turn on the Wells layer or change the selection.</div>
      ) : view === WELL_AREA_ACTIONS[0] ? (
        <WellHistory wells={wells} />
      ) : view === WELL_AREA_ACTIONS[1] ? (
        <Benchmarks wells={wells} />
      ) : view === WELL_AREA_ACTIONS[2] ? (
        <TypeCurveView {...curve} />
      ) : (
        <DeclineView wells={wells} normalize={normalize} setNormalize={setNormalize} />
      )}
    </div>
  );
}
