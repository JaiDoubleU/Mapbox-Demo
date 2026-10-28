"use client";

import * as React from "react";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
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
import { ChartToolButtons } from "./chart-header";
import { downloadText } from "@/lib/download";
import { ActionLinks, card, Section } from "./record-detail";

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

/** Full-screen copy of a chart card. */
function Expandable({ title, render }: { title: string; render: (big: boolean) => React.ReactNode }) {
  const [open, setOpen] = React.useState(false);
  return (
    <>
      <Section title={title} onExpand={() => setOpen(true)}>
        {render(false)}
      </Section>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[min(960px,94vw)] rounded-2xl">
          <div className="border-b border-border px-[22px] py-[18px] pr-14">
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          </div>
          <div className="max-h-[80vh] overflow-y-auto px-[22px] py-4">{render(true)}</div>
        </DialogContent>
      </Dialog>
    </>
  );
}

// ---- Understand Well History ---------------------------------------------------

function HistoricalProduction({ wells }: { wells: Well[] }) {
  const d = useDataset();
  const [stream, setStream] = React.useState<Stream>("oil");
  const [open, setOpen] = React.useState(false);
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
    <>
      <Card size="sm">
        <CardHeader className="chart-header border-b border-orange-500">
          <CardTitle className="min-w-0 truncate text-xs font-semibold whitespace-nowrap text-s-muted normal-case">{title}</CardTitle>
          <CardAction>
            <ChartToolButtons title={title} tools={{ onExport: exportCsv, onMaximize: () => setOpen(true) }} />
          </CardAction>
        </CardHeader>
        <CardContent>{chart(false)}</CardContent>
        <CardFooter>
          <Legend groups={data.groups} className="mt-0" />
        </CardFooter>
      </Card>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[min(960px,94vw)] rounded-2xl">
          <div className="border-b border-border px-[22px] py-[18px] pr-14">
            <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
          </div>
          <div className="max-h-[80vh] overflow-y-auto px-[22px] py-4">
            {chart(true)}
            <Legend groups={data.groups} />
          </div>
        </DialogContent>
      </Dialog>
    </>
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
      <Legend groups={data.groups} />
    </>
  );
  return <Expandable title={`Spud Year by ${GROUP_LABELS[by]}`} render={body} />;
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

function DeclineView({ wells, stream, setStream, normalize, setNormalize }: CurveProps) {
  const d = useDataset();
  const curve = React.useMemo(() => typeCurve(d, wells, stream, normalize ? NORMALIZE_FT : null), [d, wells, stream, normalize]);
  const dca = React.useMemo(() => typeCurveDca(curve, 30, stream === "oil" ? 2 : 10), [curve, stream]);
  const s = STREAM[stream];
  const body = (big: boolean) => (
    <>
      <CurveControls stream={stream} setStream={setStream} normalize={normalize} setNormalize={setNormalize} />
      {dca ? (
        <>
          <Kpis
            items={[
              { label: `qi (${s.rate.toLowerCase()})`, value: fmtK(dca.params.qi) },
              { label: "Di (%/yr)", value: fmtNum(dca.params.di * 100, 0) },
              { label: "b", value: dca.params.b.toFixed(2) },
              { label: `P50 EUR (${s.vol})`, value: fmtNum(dca.eur / s.volDiv, 0) },
            ]}
          />
          <TypeCurveChart points={curve.points} color={s.color} unit={s.rate} fit={dca.fit} forecast={dca.forecast} height={big ? 380 : 200} />
          <p className="m-0 mt-1.5 text-xs text-s-muted">
            Arps hyperbolic fit to the P50 type curve of {curve.wells.toLocaleString("en-US")} wells
            {normalize ? `, normalized to ${NORMALIZE_FT.toLocaleString("en-US")} ft` : ""}; {dca.years}-year forecast, terminal decline{" "}
            {Math.round(dca.params.dMin * 100)}%/yr.
          </p>
        </>
      ) : (
        <p className="m-0 py-6 text-center text-xs text-s-muted">Not enough horizontal wells with production history to fit a decline curve.</p>
      )}
    </>
  );
  return <Expandable title="Decline Curve Analysis" render={body} />;
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
        <DeclineView {...curve} />
      )}
    </div>
  );
}
