"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export type InsightTab = "area" | "wells" | "permits" | "rigs";
export const NO_STEP: Record<InsightTab, number> = { area: -1, wells: -1, permits: -1, rigs: -1 };
const TABS: { id: InsightTab; label: string }[] = [
  { id: "area", label: "Area Insights" },
  { id: "wells", label: "Wells" },
  { id: "permits", label: "Permits" },
  { id: "rigs", label: "Rigs" },
];

/** Toggle button group of small buttons (one active) with count badges; an empty tab is disabled. */
export function InsightTabs({ value, counts, onChange }: { value: InsightTab; counts: Record<InsightTab, number | null>; onChange: (t: InsightTab) => void }) {
  return (
    <div role="tablist" aria-label="Insights" className="mb-3 flex overflow-hidden rounded-md border border-solid border-s-line-strong">
      {TABS.map((t, i) => {
        const n = counts[t.id];
        const on = value === t.id;
        return (
          <button
            key={t.id}
            role="tab"
            aria-selected={on}
            disabled={n === 0}
            onClick={() => onChange(t.id)}
            className={cn(
              "inline-flex h-7 min-w-0 flex-auto cursor-pointer items-center justify-center gap-1 border-0 px-2 text-[11px] font-medium whitespace-nowrap outline-none focus-visible:z-[1] focus-visible:ring-[3px] focus-visible:ring-primary/20 disabled:cursor-default disabled:opacity-45",
              i > 0 && "border-l border-solid border-s-line-strong",
              on ? "bg-[color-mix(in_srgb,var(--primary)_14%,transparent)] text-primary" : "bg-transparent text-s-text hover:bg-s-chip",
            )}
          >
            {t.label}
            {n != null && (
              <span className={cn("rounded-full px-1.5 py-px text-[10px] leading-none tabular-nums", on ? "bg-primary/15 text-primary" : "bg-s-chip text-s-muted")}>
                {n.toLocaleString("en-US")}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Steps through the selected items of one kind; position -1 is "all of them". */
export function GroupStepper({ noun, index, count, onIndex, onClear }: { noun: string; index: number; count: number; onIndex: (i: number) => void; onClear: () => void }) {
  const nav = "flex size-7 cursor-pointer items-center justify-center rounded-md border border-s-line bg-s-chip text-s-text disabled:cursor-default disabled:opacity-40";
  return (
    <div className="mb-2.5 flex items-center gap-2">
      <button className={nav} onClick={() => onIndex(index - 1)} disabled={index < 0} aria-label={index === 0 ? `All selected ${noun}` : "Previous record"}>
        <ChevronLeft size={15} strokeWidth={1.75} />
      </button>
      <span className="text-xs font-medium text-s-text tabular-nums">
        {index < 0 ? `All ${count.toLocaleString("en-US")} selected ${count === 1 ? noun.replace(/s$/, "") : noun}` : `${index + 1} of ${count.toLocaleString("en-US")}`}
      </span>
      <button className={nav} onClick={() => onIndex(index + 1)} disabled={index >= count - 1} aria-label="Next record">
        <ChevronRight size={15} strokeWidth={1.75} />
      </button>
      {index >= 0 ? (
        <button onClick={() => onIndex(-1)} className="ml-auto cursor-pointer border-none bg-transparent p-0 text-xs font-medium text-s-muted hover:text-s-text">
          Show all
        </button>
      ) : (
        <button onClick={onClear} className="ml-auto cursor-pointer border-none bg-transparent p-0 text-xs font-medium text-s-muted hover:text-s-text">
          Clear selection
        </button>
      )}
    </div>
  );
}
