"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight, Maximize2, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { useDataset } from "@/lib/dataset-context";
import { lngLatInPoly } from "@/lib/geo";
import type { Lease, StrikeDataset, Well } from "@/lib/strike-data";
import { fmtDate, gapLabel, getWellDetails, type TimelineStep } from "@/lib/well-details";
import { cn } from "@/lib/utils";
import { ProductionChart } from "./production-chart";
import { SchematicInfo, WellboreSchematic, WellboreTables } from "./wellbore-view";
import { getWellbore, type DataTable } from "@/lib/wellbore";
import { downloadText, fileSafe } from "@/lib/download";
import { ChartHeader, type ChartTools } from "./chart-header";
import { DcaForecast, exportDcaCsv, ModifyDialog, ResourceEstimates, useDca } from "./dca-view";

const eyebrow = "text-[11px] font-semibold tracking-[1px] text-s-muted uppercase";
const card = "rounded-lg border border-s-line bg-s-card";
const n0 = (v: number) => Math.round(v).toLocaleString("en-US");
const n1 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 1, maximumFractionDigits: 1 });
const n2 = (v: number) => v.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

// ---- shared pieces -------------------------------------------------------------

function HeaderCard({ eyebrow: kind, title, lines, onClose }: { eyebrow: string; title: string; lines: string[]; onClose: () => void }) {
  return (
    <div className={cn(card, "px-3.5 py-3")}>
      <div className="flex items-start justify-between gap-2">
        <div className={eyebrow}>{kind}</div>
        <button
          onClick={onClose}
          title="Remove from selection"
          aria-label="Remove from selection"
          className="-mt-0.5 -mr-1 flex cursor-pointer rounded-sm border-none bg-transparent p-0.5 text-s-muted hover:text-s-text"
        >
          <X size={14} strokeWidth={1.75} />
        </button>
      </div>
      <div className="mt-1.5 text-[15px] leading-snug font-bold text-s-text">{title}</div>
      {lines.map((l) => (
        <div key={l} className="mt-0.5 text-xs text-s-muted uppercase">
          {l}
        </div>
      ))}
    </div>
  );
}

/** Well views. The active one is shown selected (green text, accent bar, tint). */
function ActionLinks({ links, active, onAction }: { links: string[]; active: string; onAction: (label: string) => void }) {
  return (
    <div className={cn(card, "py-1.5")} role="tablist" aria-orientation="vertical" aria-label="Well views">
      {links.map((l) => {
        const on = l === active;
        return (
          <button
            key={l}
            role="tab"
            aria-selected={on}
            onClick={() => onAction(l)}
            className={cn(
              "block w-full cursor-pointer border-y-0 border-r-0 border-l-[3px] border-solid bg-transparent px-3 py-1.5 text-left text-[13px] outline-none hover:text-primary focus-visible:text-primary",
              on
                ? "border-primary bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] font-medium text-primary"
                : "border-transparent text-s-text hover:bg-[color-mix(in_srgb,var(--primary)_6%,transparent)]",
            )}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}

function KpiTiles({ tiles }: { tiles: { value: string; label: string }[] }) {
  return (
    <div className="flex gap-2">
      {tiles.map((t) => (
        <div key={t.label} className={cn(card, "flex-1 px-2 py-2.5 text-center")}>
          <div className="text-base leading-none font-bold text-s-text tabular-nums">{t.value}</div>
          <div className="mt-1.5 text-[11px] leading-tight text-s-muted">{t.label}</div>
        </div>
      ))}
    </div>
  );
}

/** A panel card. Chart cards pass `tools` and get the standard chart header (Edit, Export, Maximize). */
function Section({
  title,
  extra,
  onExpand,
  tools,
  children,
}: {
  title: string;
  extra?: React.ReactNode;
  onExpand?: () => void;
  tools?: ChartTools;
  children: React.ReactNode;
}) {
  if (tools)
    return (
      <section className={cn(card, "px-3.5 py-3")} aria-label={title}>
        <ChartHeader title={title} extra={extra} tools={tools} />
        {children}
      </section>
    );
  return (
    <section className={cn(card, "px-3.5 py-3")}>
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <div className={eyebrow}>{title}</div>
          {extra}
        </div>
        {onExpand && (
          <button
            onClick={onExpand}
            title={`Expand ${title.toLowerCase()}`}
            aria-label={`Expand ${title.toLowerCase()}`}
            className="flex cursor-pointer rounded-sm border-none bg-transparent p-0.5 text-s-muted hover:text-s-text"
          >
            <Maximize2 size={13} strokeWidth={1.75} />
          </button>
        )}
      </div>
      {children}
    </section>
  );
}

function Timeline({ steps }: { steps: TimelineStep[] }) {
  return (
    <ol className="m-0 list-none p-0">
      {steps.map((s, i) => {
        const next = steps[i + 1];
        const gap = s.date && next?.date ? gapLabel(s.date, next.date) : null;
        const done = !!s.date;
        return (
          <li key={s.label} className="relative pb-2.5 pl-5 last:pb-0">
            {i < steps.length - 1 && (
              <span className={cn("absolute top-3 bottom-0 left-[4.5px] w-px", next?.date ? "bg-primary/60" : "bg-s-line")} aria-hidden="true" />
            )}
            <span
              className={cn("absolute top-[5px] left-0 size-2.5 rounded-full border-2", done ? "border-primary bg-primary" : "border-s-line-strong bg-transparent")}
              aria-hidden="true"
            />
            <div className="flex items-baseline justify-between gap-2">
              <span className={cn("text-[13px] font-semibold", done ? "text-s-text" : "text-s-muted")}>{s.label}</span>
              <span className="text-xs text-s-muted tabular-nums">{s.date ? fmtDate(s.date) : "Pending"}</span>
            </div>
            {gap && <div className="mt-0.5 text-xs text-s-muted">{gap}</div>}
          </li>
        );
      })}
    </ol>
  );
}

function Metrics({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="m-0">
      {rows.map(([k, v]) => (
        <div key={k} className="flex items-baseline justify-between gap-3 border-b border-s-line py-[7px] last:border-b-0">
          <dt className="text-xs text-s-text">{k}</dt>
          <dd className="m-0 font-mono text-xs font-medium text-s-text tabular-nums">{v}</dd>
        </div>
      ))}
    </dl>
  );
}

// ---- record (well / permit / rig) --------------------------------------------

const ym = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}`;
const csvCell = (v: string | number) => (/[",\n]/.test(String(v)) ? `"${String(v).replace(/"/g, '""')}"` : String(v));

function productionCsv(name: string, production: { month: Date; oil: number; gas: number; water: number }[]) {
  return ["well,month,oil_bbl_d,gas_mcf_d,water_bbl_d", ...production.map((p) => [name, ym(p.month), p.oil.toFixed(2), p.gas.toFixed(2), p.water.toFixed(2)].map(csvCell).join(","))].join("\n");
}

/** Every wellbore table, one after another, each under its own label. */
function wellboreCsv(name: string, tables: DataTable[]) {
  return tables
    .map((t) => [csvCell(`${name} — ${t.label}`), t.columns.map((c) => csvCell(c.label)).join(","), ...t.rows.map((r) => t.columns.map((c) => csvCell(r[c.key] ?? "")).join(","))].join("\n"))
    .join("\n\n");
}

const WELL_ACTIONS = ["Evaluate this well", "View Wellbore & Completion Design", "Generate Decline Curve Analysis"];

export function RecordDetail({
  well,
  onClose,
  showDetail,
}: {
  well: Well;
  onClose: () => void;
  /** False in the collapsed phone sheet: header and tiles only. */
  showDetail: boolean;
}) {
  const data = useDataset();
  const det = React.useMemo(
    () => getWellDetails(well, well.lateralIdx != null ? data.LATERALS[well.lateralIdx] : undefined),
    [well, data],
  );
  const [expanded, setExpanded] = React.useState<"chart" | "timeline" | "wellbore" | "dca" | null>(null);
  // Every newly selected well opens on "Evaluate this well".
  const [view, setView] = React.useState(WELL_ACTIONS[0]);
  const wellbore = React.useMemo(() => getWellbore(well, det), [well, det]);
  const dcaState = useDca(det.production);
  const isWellbore = view === WELL_ACTIONS[1], isDca = view === WELL_ACTIONS[2];
  const isPermit = well.cat === "permit", isRig = well.cat === "rig";
  const lat = det.lateralFt ? n0(det.lateralFt) : "—";

  const tiles = isPermit || isRig
    ? [
        { value: n0(det.tvdFt), label: "Target TVD (ft)" },
        { value: lat, label: "Planned Lateral (ft)" },
        { value: well.county.replace(" County", ""), label: "County" },
      ]
    : det.lateralFt
      ? [
          { value: n1(det.oilEurPer1k!), label: "Oil EUR, WH (Mbbl/1,000 ft)" },
          { value: n2(det.gasEurPer1k!), label: "Gas EUR, WH (Bcf/1,000 ft)" },
          { value: lat, label: "Effective Lat Length (ft)" },
        ]
      : [
          { value: n1(det.oilEurMbbl), label: "Oil EUR (Mbbl)" },
          { value: n2(det.gasEurBcf), label: "Gas EUR (Bcf)" },
          { value: n0(det.tvdFt), label: "True Vertical Depth (ft)" },
        ];

  const rows: [string, string][] = isPermit || isRig
    ? [
        ["Operator", well.operator],
        ["Basin", well.basin],
        ["Field", well.field],
        ["Target Formation", well.formation],
        ["Target TVD (ft)", n0(det.tvdFt)],
        ["Planned Lateral (ft)", lat],
      ]
    : [
        ...(det.lateralFt
          ? ([
              ["Oil EUR, WH (Mbbl/1,000 ft)", n1(det.oilEurPer1k!)],
              ["Gas EUR, WH (Bcf/1,000 ft)", n2(det.gasEurPer1k!)],
            ] as [string, string][])
          : ([
              ["Oil EUR (Mbbl)", n1(det.oilEurMbbl)],
              ["Gas EUR (Bcf)", n2(det.gasEurBcf)],
            ] as [string, string][])),
        ["Cum Oil Prod (bbl)", n0(det.cumOilBbl)],
        ["Cum Gas Prod (Mcf)", n0(det.cumGasMcf)],
        ...(det.lateralFt ? ([["Effective Lat Length (ft)", lat]] as [string, string][]) : []),
        ["True Vertical Depth (ft)", n0(det.tvdFt)],
        ["Proppant (lbs)", det.proppantLbs ? n0(det.proppantLbs) : "—"],
        ["Total Fluid Pumped (bbl)", det.fluidBbl ? n0(det.fluidBbl) : "—"],
      ];

  const hasProduction = !isPermit && !isRig;
  return (
    <div className="flex flex-col gap-2.5">
      <HeaderCard
        eyebrow={det.kind}
        title={well.name}
        lines={[well.operator, `${well.api} · ${well.status} · ${well.formation}`]}
        onClose={onClose}
      />
      {showDetail && !isPermit && !isRig && <ActionLinks links={WELL_ACTIONS} active={view} onAction={setView} />}
      {showDetail && isDca ? (
        <>
          <Section
            title="DCA Forecast"
            tools={
              dcaState.dca
                ? {
                    onEdit: () => dcaState.setModifyOpen(true),
                    onExport: () => exportDcaCsv(well.name, det.production, dcaState.dca!),
                    onMaximize: () => setExpanded("dca"),
                  }
                : {}
            }
          >
            <DcaForecast production={det.production} state={dcaState} />
          </Section>
          {dcaState.dca && (
            <Section title="Resource Estimates">
              <ResourceEstimates dca={dcaState.dca} production={det.production} lateralFt={det.lateralFt} />
            </Section>
          )}
        </>
      ) : showDetail && isWellbore ? (
        <Section
          title="Wellbore & Completion Design"
          extra={<SchematicInfo />}
          tools={{
            onExport: () => downloadText(`${fileSafe(well.name)}_wellbore.csv`, wellboreCsv(well.name, wellbore.tables)),
            onMaximize: () => setExpanded("wellbore"),
          }}
        >
          <WellboreSchematic wb={wellbore} />
          <div className="mt-2">
            <WellboreTables tables={wellbore.tables} />
          </div>
        </Section>
      ) : (
        <KpiTiles tiles={tiles} />
      )}
      {showDetail && !isWellbore && !isDca && (
        <>
          {hasProduction && (
            <Section
              title="Production Decline"
              tools={
                det.production.length
                  ? {
                      // Editing production means adjusting its decline forecast.
                      onEdit: dcaState.dca
                        ? () => {
                            setView(WELL_ACTIONS[2]);
                            dcaState.setModifyOpen(true);
                          }
                        : undefined,
                      onExport: () => downloadText(`${fileSafe(well.name)}_production.csv`, productionCsv(well.name, det.production)),
                      onMaximize: () => setExpanded("chart"),
                    }
                  : {}
              }
            >
              <ProductionChart data={det.production} />
            </Section>
          )}
          <Section title="Timeline" onExpand={() => setExpanded("timeline")}>
            <Timeline steps={det.timeline} />
          </Section>
          <Section title={isPermit ? "Permit Details" : isRig ? "Rig Details" : "Well Metrics"}>
            <Metrics rows={rows} />
          </Section>
        </>
      )}
      <ModifyDialog production={det.production} wellName={well.name} state={dcaState} />
      <Dialog open={expanded != null} onOpenChange={(o) => !o && setExpanded(null)}>
        <DialogContent
          className={cn("rounded-2xl", expanded === "wellbore" ? "w-[min(1240px,96vw)]" : "w-[min(760px,94vw)]")}
          // Focus the dialog itself, so the title's info tooltip doesn't pop open.
          onOpenAutoFocus={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLElement).focus();
          }}
        >
          {expanded === "wellbore" ? (
            <div className="border-b border-border px-[22px] py-[16px] pr-14">
              <div className="flex items-center gap-1.5">
                <DialogTitle className="text-lg font-semibold">Wellbore &amp; Completion Design</DialogTitle>
                <SchematicInfo />
              </div>
              <div className="mt-1 text-xs text-s-muted uppercase">{[well.name, well.api, well.operator, well.formation].join(" · ")}</div>
            </div>
          ) : (
            <div className="border-b border-border px-[22px] py-[18px] pr-14">
              <DialogTitle className="text-lg font-semibold">
                {expanded === "chart" ? "Production Decline" : expanded === "dca" ? "DCA Forecast" : "Timeline"} · {well.name}
              </DialogTitle>
            </div>
          )}
          <div className={cn("overflow-y-auto px-[22px] py-4", expanded === "wellbore" ? "max-h-[86vh]" : "max-h-[75vh]")}>
            {expanded === "chart" && <ProductionChart data={det.production} height={340} />}
            {expanded === "timeline" && <Timeline steps={det.timeline} />}
            {expanded === "dca" && dcaState.dca && (
              <>
                <DcaForecast production={det.production} state={dcaState} height={340} />
                <div className="mt-4">
                  <ResourceEstimates dca={dcaState.dca} production={det.production} lateralFt={det.lateralFt} />
                </div>
              </>
            )}
            {expanded === "wellbore" && (
              <>
                <WellboreSchematic wb={wellbore} detailed height={Math.round(Math.max(380, Math.min(640, window.innerHeight - 400)))} />
                <div className="mt-2">
                  <WellboreTables tables={wellbore.tables} />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// ---- lease -------------------------------------------------------------------

export function LeaseDetail({ d, lease, onClose, showDetail }: { d: StrikeDataset; lease: Lease; onClose: () => void; showDetail: boolean }) {
  const inside = React.useMemo(() => d.WELLS.filter((w) => lngLatInPoly(w.lng, w.lat, lease.coords)), [d, lease]);
  const wells = inside.filter((w) => d.CATS[w.cat].layer === "wells").length;
  const permits = inside.filter((w) => w.cat === "permit").length;
  const rigs = inside.filter((w) => w.cat === "rig").length;
  const ops = Object.entries(
    inside.reduce<Record<string, number>>((m, w) => ((m[w.operator] = (m[w.operator] || 0) + 1), m), {}),
  ).sort((a, b) => b[1] - a[1]);
  return (
    <div className="flex flex-col gap-2.5">
      <HeaderCard eyebrow="Landtrac Lease" title={lease.name} lines={[lease.operator, `${lease.county} · ${lease.status}`]} onClose={onClose} />
      <KpiTiles
        tiles={[
          { value: n0(lease.acres), label: "Gross Acres" },
          { value: n0(wells), label: "Wells in Lease" },
          { value: n0(permits), label: "Permits in Lease" },
        ]}
      />
      {showDetail && (
        <Section title="Lease Details">
          <Metrics
            rows={[
              ["Lessee / Operator", lease.operator],
              ["County", lease.county],
              ["Status", lease.status],
              ["Gross Acres", n0(lease.acres)],
              ["Active Rigs in Lease", n0(rigs)],
              ["Top Operator in Lease", ops[0] ? `${ops[0][0]} (${ops[0][1]})` : "—"],
            ]}
          />
        </Section>
      )}
    </div>
  );
}

// ---- stepper -----------------------------------------------------------------

export function SelectionStepper({ index, count, onIndex, onClear }: { index: number; count: number; onIndex: (i: number) => void; onClear: () => void }) {
  const nav = "flex size-7 cursor-pointer items-center justify-center rounded-md border border-s-line bg-s-chip text-s-text disabled:cursor-default disabled:opacity-40";
  return (
    <div className="mb-2.5 flex items-center gap-2">
      {count > 1 && (
        <>
          <button className={nav} onClick={() => onIndex(index - 1)} disabled={index === 0} aria-label="Previous record">
            <ChevronLeft size={15} strokeWidth={1.75} />
          </button>
          <span className="text-xs font-medium text-s-text tabular-nums">
            {index + 1} of {count.toLocaleString("en-US")}
          </span>
          <button className={nav} onClick={() => onIndex(index + 1)} disabled={index === count - 1} aria-label="Next record">
            <ChevronRight size={15} strokeWidth={1.75} />
          </button>
        </>
      )}
      <button onClick={onClear} className="ml-auto cursor-pointer border-none bg-transparent p-0 text-xs font-medium text-s-muted hover:text-s-text">
        {count > 1 ? "Clear selection" : "Back to area summary"}
      </button>
    </div>
  );
}
