"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, Download, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CopyApiButton } from "@/components/chrome/copy-api-button";
import type { ApiCopyMode } from "@/lib/types";
import { cn } from "@/lib/utils";

export type ExportKey =
  | "rigsCSV" | "rigsSHP"
  | "wellFiles" | "wellHeaderCSV" | "wellHeaderSHP" | "wellMonthlyCSV"
  | "permitsCSV" | "permitsSHP"
  | "relatedFiling" | "leaseHeaderCSV" | "leaseHeaderSHP" | "leaseAssignments" | "leaseAssignmentDataCSV" | "depthClauseDataCSV"
  | "landtracUnitCSV" | "landtracUnitSHP";

export type ExportChecks = Record<ExportKey, boolean>;

const ALL_KEYS: ExportKey[] = [
  "rigsCSV", "rigsSHP", "wellFiles", "wellHeaderCSV", "wellHeaderSHP", "wellMonthlyCSV", "permitsCSV", "permitsSHP",
  "relatedFiling", "leaseHeaderCSV", "leaseHeaderSHP", "leaseAssignments", "leaseAssignmentDataCSV", "depthClauseDataCSV",
  "landtracUnitCSV", "landtracUnitSHP",
];

/** Nothing is pre-checked without a map selection; with one, the common exports are. */
export function initialChecks(hasSelection: boolean, hasSelectedRigs: boolean): ExportChecks {
  const none = Object.fromEntries(ALL_KEYS.map((k) => [k, false])) as ExportChecks;
  if (!hasSelection) return none;
  return {
    ...none,
    rigsCSV: hasSelectedRigs,
    wellFiles: true,
    wellHeaderCSV: true,
    wellMonthlyCSV: true,
    relatedFiling: true,
    leaseHeaderCSV: true,
    leaseAssignments: true,
  };
}

interface ExportRowDef {
  key: ExportKey;
  label: string;
  format: string;
  note?: string;
  disabled?: boolean;
  geomOptions?: string[];
}

export interface ExportSectionDef {
  id: string;
  title: string;
  /** e.g. "92 records selected" — omitted for Landtrac sections. */
  countLabel?: string;
  recordCount: number;
  copyApi?: boolean;
  rows: ExportRowDef[];
}

export interface ExportSummary {
  files: number;
  sections: string[];
  records: number;
  formats: string[];
}

function ExportRow({
  row,
  checked,
  onChecked,
  geometry,
  onGeometry,
}: {
  row: ExportRowDef;
  checked: boolean;
  onChecked: (v: boolean) => void;
  geometry?: string;
  onGeometry: (v: string) => void;
}) {
  const id = `export-${row.key}`;
  const on = checked && !row.disabled;
  return (
    <div className={cn("flex items-center gap-2.5 py-[7px]", row.disabled && "opacity-50")}>
      <Checkbox id={id} checked={on} disabled={row.disabled} onCheckedChange={(v) => onChecked(v === true)} />
      <label htmlFor={id} className={cn("flex-1", row.disabled ? "cursor-default" : "cursor-pointer")}>
        <div className="text-sm font-medium text-s-text">{row.label}</div>
        {row.note && <div className="mt-px text-[11px] text-popover-foreground">{row.note}</div>}
      </label>
      {row.geomOptions && on && (
        <Select value={geometry} onValueChange={onGeometry}>
          <SelectTrigger aria-label={`${row.label} geometry`} className="h-[26px] rounded-[var(--radius-xs)] px-1.5 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {row.geomOptions.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      )}
    </div>
  );
}

interface ExportOptionsPopoverProps {
  hasSelection: boolean;
  exportMode: "selected" | "all";
  onExportMode: (m: "selected" | "all") => void;
  sections: ExportSectionDef[];
  checks: ExportChecks;
  onChecks: (c: ExportChecks) => void;
  responsive: boolean;
  onCopyApi: (mode: ApiCopyMode) => void;
  onClose: () => void;
  onExport: (summary: ExportSummary) => void;
}

/** Export Options popover, anchored above the Insights panel's Export button. */
export function ExportOptionsPopover(props: ExportOptionsPopoverProps) {
  const { hasSelection, exportMode, onExportMode, sections, checks, onChecks, responsive, onCopyApi, onClose, onExport } = props;
  const [collapsed, setCollapsed] = React.useState<Record<string, boolean>>({});
  const [geometry, setGeometry] = React.useState<Record<string, string>>({});
  const dialogRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    dialogRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const checkedRows = sections.flatMap((s) => s.rows.filter((r) => checks[r.key] && !r.disabled).map((r) => ({ s, r })));
  const summary: ExportSummary = {
    files: checkedRows.length,
    sections: [...new Set(checkedRows.map(({ s }) => s.title))],
    records: [...new Set(checkedRows.map(({ s }) => s))].reduce((n, s) => n + s.recordCount, 0),
    formats: [...new Set(checkedRows.map(({ r }) => r.format))],
  };

  return (
    <div className="fixed inset-0 z-[79]" onClick={onClose}>
      <div
        ref={dialogRef}
        role="dialog"
        aria-labelledby="export-options-title"
        tabIndex={-1}
        onClick={(e) => e.stopPropagation()}
        className="fixed right-0 bottom-[calc(76px+env(safe-area-inset-bottom,0px))] left-0 z-[80] flex max-h-[75vh] w-full flex-col md:left-auto md:w-[420px] overflow-hidden rounded-t-xl border border-border bg-card shadow-[-10px_0_40px_rgba(0,0,0,0.35),0_-6px_30px_rgba(0,0,0,0.22)] outline-none"
        style={{ height: responsive ? "auto" : "75vh", animation: "s-popover-in 0.4s cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div className="flex shrink-0 items-center justify-between border-b border-border px-[22px] py-[18px]">
          <div id="export-options-title" className="text-lg font-semibold tracking-[-0.2px] text-s-text">
            Export Options
          </div>
          <button
            onClick={onClose}
            title="Close"
            className="flex cursor-pointer rounded-md border-none bg-transparent p-1 text-s-muted"
          >
            <X size={20} strokeWidth={1.75} />
          </button>
        </div>

        {hasSelection && (
          <div className="shrink-0 border-b border-border px-[22px] py-3">
            <label id="exportModeLabel" className="mb-2 block text-xs font-medium text-foreground">
              What do you want to Export?
            </label>
            <RadioGroup
              aria-labelledby="exportModeLabel"
              value={exportMode}
              onValueChange={(v) => onExportMode(v as "selected" | "all")}
            >
              <label className="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value="selected" />
                <span className="text-[13px] font-medium text-foreground">Selected Records</span>
              </label>
              <label className="flex cursor-pointer items-center gap-2">
                <RadioGroupItem value="all" />
                <span className="text-[13px] font-medium text-foreground">All Records in Map Area</span>
              </label>
            </RadioGroup>
          </div>
        )}

        <div className="min-h-0 flex-1 overflow-y-auto px-[22px]">
          {sections.map((s) => {
            const open = !collapsed[s.id];
            const setOpen = (o: boolean) => setCollapsed((c) => ({ ...c, [s.id]: !o }));
            return (
              <Collapsible key={s.id} open={open} onOpenChange={setOpen} className="border-b border-s-line">
                {/* The whole header row toggles; the title is the accessible trigger. */}
                <div className="flex cursor-pointer items-center justify-between py-[13px]" onClick={() => setOpen(!open)}>
                  <div className="flex items-center gap-2">
                    <CollapsibleTrigger
                      onClick={(e) => e.stopPropagation()}
                      className="cursor-pointer rounded-sm border-none bg-transparent p-0 text-xs font-semibold tracking-[1px] text-s-text uppercase outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                      {s.title}
                    </CollapsibleTrigger>
                    {s.countLabel && <span className="text-xs font-normal text-s-faint">{s.countLabel}</span>}
                    {s.copyApi && <CopyApiButton onCopy={onCopyApi} />}
                  </div>
                  {open ? (
                    <ChevronUp size={15} strokeWidth={1.75} color="var(--s-muted)" />
                  ) : (
                    <ChevronDown size={15} strokeWidth={1.75} color="var(--s-muted)" />
                  )}
                </div>
                <CollapsibleContent className="flex flex-col pb-3.5">
                  {s.rows.map((r) => (
                    <ExportRow
                      key={r.key}
                      row={r}
                      checked={checks[r.key]}
                      onChecked={(v) => onChecks({ ...checks, [r.key]: v })}
                      geometry={geometry[r.key] ?? r.geomOptions?.[0]}
                      onGeometry={(g) => setGeometry((m) => ({ ...m, [r.key]: g }))}
                    />
                  ))}
                </CollapsibleContent>
              </Collapsible>
            );
          })}
          {sections.length === 0 && (
            <div className="py-8 text-center text-[13px] text-s-muted">
              Turn a layer on to interactive in the Layers panel to see its export options.
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center justify-between gap-2.5 border-t border-border px-[22px] py-3.5">
          <CopyApiButton size="md" onCopy={onCopyApi} />
          <div className="flex items-center gap-2.5">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              disabled={summary.files === 0}
              onClick={() => onExport(summary)}
              className="gap-[7px] px-[18px] font-semibold"
            >
              <Download size={15} strokeWidth={1.75} />
              Export
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
