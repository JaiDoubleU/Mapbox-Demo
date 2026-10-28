"use client";

import * as React from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { LeaseDetail, RecordDetail, SelectionStepper } from "./record-detail";
import { BarRow, SummaryTile, topCounts } from "./panel-bits";
import { GroupStepper, InsightTabs, NO_STEP, type InsightTab } from "./insight-tabs";
import { QuickInsights } from "./quick-insights";
import { WellsInsights } from "./wells-insights";
import { useDataset } from "@/lib/dataset-context";
import type { Well } from "@/lib/strike-data";
import type { ApiCopyMode, Layers } from "@/lib/types";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ExportOptionsPopover, initialChecks, type ExportChecks, type ExportSectionDef, type ExportSummary } from "./export-options-popover";

const TYPE_COLORS: Record<string, string> = {
  "Oil Well": "#62c23f",
  "Gas Well": "#3b9ae1",
  "Oil & Gas Well": "#37c9bd",
  "Injection / Disposal": "#9b6dff",
  "Dry Hole": "#e84db0",
  "Plugged & Abandoned": "#b9c0c7",
};

const eyebrow = "text-[11px] font-semibold text-s-muted uppercase";

interface InsightsPanelProps {
  records: Well[];
  selectedLeaseIdxs: number[];
  layers: Layers;
  responsiveExportDialog: boolean;
  /** Phone layout: render as a bottom sheet that shows only the summary until expanded. */
  sheet?: boolean;
  expanded?: boolean;
  onToggleExpanded?: () => void;
  onCopyApi: (wells: Well[], mode: ApiCopyMode) => void;
  onExport: (summary: ExportSummary) => void;
  /** Detail view: drop one record or lease from the selection, or clear it entirely. */
  onRemoveRecord?: (idx: number) => void;
  onRemoveLease?: (idx: number) => void;
  onClearSelection?: () => void;
}

/** Right-hand panel: insights for the selection (or everything visible), plus the export flow. */
export function InsightsPanel({
  records,
  selectedLeaseIdxs,
  layers,
  responsiveExportDialog,
  onCopyApi,
  onExport,
  sheet = false,
  expanded = false,
  onToggleExpanded,
  onRemoveRecord,
  onRemoveLease,
  onClearSelection,
}: InsightsPanelProps) {
  const showDetail = !sheet || expanded;
  const d = useDataset();

  // ---- detail view: one selected record or lease at a time, with a stepper
  const items = React.useMemo(
    () => [
      ...records.map((w) => ({ key: `w${w.idx}`, well: w, lease: null })),
      ...selectedLeaseIdxs.map((i) => ({ key: `l${i}`, well: null, lease: d.LEASES[i] })),
    ],
    [records, selectedLeaseIdxs, d],
  );
  // One selected item shows its detail view; none or several show the tabs.
  const active = items.length === 1 ? items[0] : null;
  const [tab, setTab] = React.useState<InsightTab>("area");
  /** Per tab, the selected item being viewed (-1 = all of them). */
  const [step, setStep] = React.useState<Record<InsightTab, number>>(NO_STEP);
  React.useEffect(() => setStep(NO_STEP), [records, selectedLeaseIdxs]);
  const layerOf = (w: Well) => d.CATS[w.cat].layer;

  const hasRecordSel = records.length > 0;
  const hasLeaseSel = selectedLeaseIdxs.length > 0;
  const hasSelection = hasRecordSel || hasLeaseSel;

  // ---- insights: selected records, otherwise everything visible on the map
  const dataSubset = React.useMemo(
    () => (hasRecordSel ? records : d.WELLS.filter((w) => layers[layerOf(w)] !== false)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [hasRecordSel, records, layers, d],
  );
  const wellsData = dataSubset.filter((w) => layerOf(w) === "wells");
  const permitsData = dataSubset.filter((w) => layerOf(w) === "permits");
  const rigsData = dataSubset.filter((w) => w.cat === "rig");
  const typeEntries = topCounts(wellsData, (w) => w.type);
  const topOps = topCounts(dataSubset, (w) => w.operator, 5);
  const topForms = topCounts(wellsData, (w) => w.formation, 5);
  const horizCount = wellsData.filter((w) => w.orientation === "Horizontal").length;
  const vertCount = wellsData.filter((w) => w.orientation === "Vertical").length;
  const sel = (label: string) => (hasRecordSel ? `${label} Selected` : label);
  const counts: Record<InsightTab, number | null> = { area: null, wells: wellsData.length, permits: permitsData.length, rigs: rigsData.length };
  // An emptied tab (layer turned off, selection changed) falls back to Area Insights.
  const tabEmpty = counts[tab] === 0;
  React.useEffect(() => {
    if (tabEmpty) setTab("area");
  }, [tabEmpty]);
  // Selected items each tab can step through.
  const selectedIn: Record<Exclude<InsightTab, "area">, Well[]> = {
    wells: records.filter((w) => layerOf(w) === "wells"),
    permits: records.filter((w) => layerOf(w) === "permits"),
    rigs: records.filter((w) => w.cat === "rig"),
  };

  // ---- export flow
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [exportMode, setExportMode] = React.useState<"selected" | "all">("all");
  const [checks, setChecks] = React.useState<ExportChecks>(() => initialChecks(false, false));

  const openMenu = () => {
    setExportMode(hasSelection ? "selected" : "all");
    setChecks(
      initialChecks(
        hasSelection,
        records.some((r) => r.cat === "rig"),
      ),
    );
    setMenuOpen(true);
  };
  const closeMenu = React.useCallback(() => setMenuOpen(false), []);

  const exportSel = exportMode === "selected" && hasSelection;
  const pool = exportSel ? records : d.WELLS.filter((w) => layers[layerOf(w)] === true);
  const exportWells = pool.filter((w) => layerOf(w) === "wells");
  const exportPermits = pool.filter((w) => layerOf(w) === "permits");
  const exportRigs = pool.filter((w) => w.cat === "rig");
  const countLabel = (n: number) => `${n.toLocaleString()} record${n === 1 ? "" : "s"}${exportSel ? " selected" : ""}`;

  const show = {
    rigs: exportSel ? exportRigs.length > 0 : layers.rigs === true,
    wells: exportSel ? exportWells.length > 0 : layers.wells === true,
    permits: exportSel ? exportPermits.length > 0 : layers.permits === true,
    lease: exportSel ? hasLeaseSel : layers.landtracLease === true,
    unit: exportSel ? false : layers.landtracUnit === true,
  };

  const sections: ExportSectionDef[] = [];
  if (show.rigs)
    sections.push({
      id: "rigs",
      title: "Active Rigs",
      recordCount: exportRigs.length,
      countLabel: countLabel(exportRigs.length),
      rows: [
        { key: "rigsCSV", label: "Active Rigs CSV", format: "CSV" },
        { key: "rigsSHP", label: "Active Rigs SHP", format: "SHP" },
      ],
    });
  if (show.wells)
    sections.push({
      id: "wells",
      title: "Wells",
      recordCount: exportWells.length,
      copyApi: true,
      countLabel: countLabel(exportWells.length),
      rows: [
        {
          key: "wellFiles",
          label: "Well Files",
          format: "PDF",
          disabled: !hasSelection,
          note: !hasSelection ? "Export limit is 100 records. Apply a filter to decrease the number of records" : undefined,
        },
        { key: "wellHeaderCSV", label: "Well Headers CSV", format: "CSV" },
        {
          key: "wellHeaderSHP",
          label: "Well Headers SHP",
          format: "SHP",
          geomOptions: ["Surface Hole", "Bottom Hole", "Well Lateral", "Calculated Horizontal Line"],
        },
        { key: "wellMonthlyCSV", label: "Monthly Production", format: "CSV" },
      ],
    });
  if (show.permits)
    sections.push({
      id: "permits",
      title: "Permits",
      recordCount: exportPermits.length,
      countLabel: countLabel(exportPermits.length),
      rows: [
        { key: "permitsCSV", label: "Permits CSV", format: "CSV" },
        { key: "permitsSHP", label: "Permits SHP", format: "SHP", geomOptions: ["Surface Hole", "Bottom Hole", "Directional Sticks"] },
      ],
    });
  if (show.lease)
    sections.push({
      id: "lease",
      title: "Landtrac Lease",
      recordCount: exportSel ? selectedLeaseIdxs.length : d.LEASES.length,
      rows: [
        { key: "relatedFiling", label: "Related Filing", format: "PDF" },
        { key: "leaseHeaderCSV", label: "Lease Headers CSV", format: "CSV" },
        { key: "leaseHeaderSHP", label: "Lease Headers SHP", format: "SHP" },
        { key: "leaseAssignments", label: "Lease Assignments", format: "PDF" },
        { key: "leaseAssignmentDataCSV", label: "Lease Assignment Data CSV", format: "CSV" },
        { key: "depthClauseDataCSV", label: "Depth Clause Data CSV", format: "CSV" },
      ],
    });
  if (show.unit)
    sections.push({
      id: "unit",
      title: "Landtrac Unit",
      recordCount: 0,
      rows: [
        { key: "landtracUnitCSV", label: "Landtrac Unit CSV", format: "CSV" },
        { key: "landtracUnitSHP", label: "Landtrac Unit SHP", format: "SHP" },
      ],
    });

  // Copy API List now lives only in the Export Options popover.
  const copyApi = (mode: ApiCopyMode) => onCopyApi(exportWells, mode);

  return (
    <div
      className={cn(
        "flex flex-col bg-s-panel",
        sheet ? "rounded-t-xl border-t border-s-line-strong shadow-[0_-6px_24px_rgba(0,0,0,0.12)]" : "h-full border-l border-s-line-strong",
      )}
      style={sheet && expanded ? { height: "62dvh" } : undefined}
    >
      <div className={cn("overflow-y-auto px-[18px]", sheet ? "pt-2" : "flex-1 pt-4 pb-2", sheet && expanded && "flex-1 pb-2")}>
        {sheet ? (
          <button
            onClick={onToggleExpanded}
            aria-expanded={expanded}
            className="mb-2 flex w-full cursor-pointer flex-col items-center gap-2 border-none bg-transparent p-0 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
          >
            <span className="h-1 w-9 rounded-full bg-s-line-strong" aria-hidden="true" />
            <span className="flex w-full items-center justify-between">
              <span className={eyebrow}>{active ? "Selected Record" : "Explore this Area"}</span>
              <span className="flex items-center gap-1 text-[11px] font-medium text-s-muted">
                {expanded ? "Less" : "More"}
                {expanded ? <ChevronDown size={14} strokeWidth={1.75} /> : <ChevronUp size={14} strokeWidth={1.75} />}
              </span>
            </span>
          </button>
        ) : null}
        {active ? (
          <div className={showDetail ? "pb-2" : "pb-1"}>
            <SelectionStepper index={0} count={1} onIndex={() => {}} onClear={() => onClearSelection?.()} />
            {active.well ? (
              <RecordDetail key={active.key} well={active.well} showDetail={showDetail} onClose={() => onRemoveRecord?.(active.well!.idx)} />
            ) : (
              <LeaseDetail key={active.key} d={d} lease={active.lease!} showDetail={showDetail} onClose={() => onRemoveLease?.(active.lease!.idx)} />
            )}
          </div>
        ) : (
          <>
            <InsightTabs value={tab} counts={counts} onChange={setTab} />
            {tab === "area" ? (
              hasLeaseSel && selectedLeaseIdxs.length > 0 && step.area >= 0 ? (
                <>
                  <GroupStepper
                    noun="leases"
                    index={step.area}
                    count={selectedLeaseIdxs.length}
                    onIndex={(i) => setStep((st) => ({ ...st, area: i }))}
                    onClear={() => onClearSelection?.()}
                  />
                  <LeaseDetail
                    key={selectedLeaseIdxs[step.area]}
                    d={d}
                    lease={d.LEASES[selectedLeaseIdxs[step.area]]}
                    showDetail={showDetail}
                    onClose={() => onRemoveLease?.(selectedLeaseIdxs[step.area])}
                  />
                </>
              ) : (
                <>
                  {selectedLeaseIdxs.length > 0 && (
                    <GroupStepper
                      noun="leases"
                      index={-1}
                      count={selectedLeaseIdxs.length}
                      onIndex={(i) => setStep((st) => ({ ...st, area: i }))}
                      onClear={() => onClearSelection?.()}
                    />
                  )}
                  {!sheet && <div className={cn(eyebrow, "mb-2.5")}>Explore this Area</div>}
                  <div className={cn("flex gap-2", showDetail ? "mb-2.5" : "mb-1")}>
                    {wellsData.length > 0 && <SummaryTile value={wellsData.length} label={sel("Wells")} />}
                    {permitsData.length > 0 && <SummaryTile value={permitsData.length} label={sel("Permits")} />}
                    {rigsData.length > 0 && <SummaryTile value={rigsData.length} label={sel("Active Rigs")} />}
                    {(layers.landtracLease !== false || hasLeaseSel) && (
                      <SummaryTile value={hasLeaseSel ? selectedLeaseIdxs.length : d.LEASES.length} label={hasLeaseSel ? "Leases Selected" : "Leases"} />
                    )}
                  </div>

                  {showDetail && wellsData.length > 0 && typeEntries.length > 0 && (
                    <section className="card mb-2.5 px-3.5 py-3 [&>:last-child]:mb-0">
                      <div className={cn(eyebrow, "mb-2.5")}>Well Types</div>
                      {typeEntries.map(([type, count]) => (
                        <BarRow
                          key={type}
                          label={type}
                          count={count}
                          max={typeEntries[0][1]}
                          dot={TYPE_COLORS[type] ?? "#888"}
                          color={TYPE_COLORS[type] ?? "var(--primary)"}
                          labelWidth={130}
                        />
                      ))}
                    </section>
                  )}

                  {showDetail && topOps.length > 0 && (
                    <section className="card mb-2.5 px-3.5 py-3 [&>:last-child]:mb-0">
                      <div className={cn(eyebrow, "mb-2.5")}>Top Operators</div>
                      {topOps.map(([op, count]) => (
                        <BarRow key={op} label={op} count={count} max={topOps[0][1]} color="var(--primary)" barWidth={60} countWidth={36} />
                      ))}
                    </section>
                  )}

                  {showDetail && wellsData.length > 0 && topForms.length > 0 && (
                    <section className="card mb-2.5 px-3.5 py-3 [&>:last-child]:mb-0">
                      <div className={cn(eyebrow, "mb-2.5")}>Formations</div>
                      {topForms.map(([form, count]) => (
                        <BarRow key={form} label={form} count={count} max={topForms[0][1]} color="#3b9ae1" labelWidth={120} />
                      ))}
                    </section>
                  )}

                  {showDetail && wellsData.length > 0 && horizCount + vertCount > 0 && (
                    <section className="card mb-2 px-3.5 py-3 [&>:last-child]:mb-0">
                      <div className={cn(eyebrow, "mb-2.5")}>Orientation</div>
                      <div className="flex gap-2">
                        {[
                          [horizCount, "Horizontal"],
                          [vertCount, "Vertical"],
                        ].map(([n, label]) => (
                          <div key={label} className="flex-1 rounded-md border border-s-line bg-s-bg px-3 py-2">
                            <div className="text-lg leading-none font-bold text-s-text">{n.toLocaleString()}</div>
                            <div className="mt-1 text-[11px] text-s-muted">{label}</div>
                          </div>
                        ))}
                      </div>
                    </section>
                  )}
                </>
              )
            ) : (
              (() => {
                const t = tab;
                const picked = selectedIn[t];
                const i = Math.min(step[t], picked.length - 1);
                const stepper = picked.length > 0 && (
                  <GroupStepper
                    noun={t}
                    index={i}
                    count={picked.length}
                    onIndex={(n) => setStep((st) => ({ ...st, [t]: n }))}
                    onClear={() => onClearSelection?.()}
                  />
                );
                if (i >= 0)
                  return (
                    <div className="pb-2">
                      {stepper}
                      <RecordDetail key={picked[i].idx} well={picked[i]} showDetail={showDetail} onClose={() => onRemoveRecord?.(picked[i].idx)} />
                    </div>
                  );
                if (!showDetail) return stepper || null;
                return (
                  <div className="pb-2">
                    {stepper}
                    {t === "wells" ? (
                      <WellsInsights wells={wellsData} />
                    ) : (
                      <QuickInsights
                        items={t === "permits" ? permitsData : rigsData}
                        groups={[
                          { title: t === "permits" ? "Permit Status" : "Rig Status", key: (w) => w.status },
                          { title: "Operator", key: (w) => w.operator },
                          { title: "Target Formation", key: (w) => w.formation },
                          { title: "County", key: (w) => w.county },
                        ]}
                      />
                    )}
                  </div>
                );
              })()
            )}
          </>
        )}
      </div>

      {menuOpen && (
        <ExportOptionsPopover
          hasSelection={hasSelection}
          exportMode={exportMode}
          onExportMode={setExportMode}
          sections={sections}
          checks={checks}
          onChecks={setChecks}
          responsive={responsiveExportDialog}
          onCopyApi={copyApi}
          onClose={closeMenu}
          onExport={(summary) => {
            setMenuOpen(false);
            onExport(summary);
          }}
        />
      )}

      <div
        className={cn(
          "flex items-center gap-2.5 border-t border-s-line bg-s-panel p-3.5 pb-[calc(0.875rem+env(safe-area-inset-bottom,0px))]",
          sheet ? "mt-1" : "mt-2.5",
        )}
      >
        <Button
          onClick={() => (menuOpen ? closeMenu() : openMenu())}
          aria-expanded={menuOpen}
          className={cn("flex-1", menuOpen && "bg-primary-hover shadow-[inset_0_2px_6px_rgba(0,0,0,0.25)]")}
        >
          Export Options...
        </Button>
      </div>
    </div>
  );
}
