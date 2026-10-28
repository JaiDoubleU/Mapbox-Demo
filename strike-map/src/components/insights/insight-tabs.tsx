"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export type InsightTab = "area" | "wells" | "permits" | "rigs";
export const NO_STEP: Record<InsightTab, number> = { area: -1, wells: -1, permits: -1, rigs: -1 };
const TABS: { id: InsightTab; label: string }[] = [
  { id: "area", label: "Area Insights" },
  { id: "wells", label: "Wells" },
  { id: "permits", label: "Permits" },
  { id: "rigs", label: "Rigs" },
];

/**
 * shadcn ToggleGroup (single, outline, small) with a count Badge in each item. A single toggle
 * group lets the active item be pressed again to deselect, so that's ignored to keep one tab on.
 */
export function InsightTabs({ value, counts, onChange }: { value: InsightTab; counts: Record<InsightTab, number | null>; onChange: (t: InsightTab) => void }) {
  return (
    <ToggleGroup
      type="single"
      variant="outline"
      size="sm"
      value={value}
      onValueChange={(v) => v && onChange(v as InsightTab)}
      aria-label="Insights"
      className="mb-3 w-full"
    >
      {TABS.map((t) => {
        const n = counts[t.id];
        const on = value === t.id;
        return (
          <ToggleGroupItem key={t.id} value={t.id} disabled={n === 0} aria-label={n == null ? t.label : `${t.label} (${n})`} className="h-7 gap-0.5 px-2 text-xs">
            {t.label}
            {n != null && (
              <Badge variant={on ? "default" : "secondary"} className="h-4 rounded-full px-1.5 py-0 text-xs leading-none tabular-nums">
                {n.toLocaleString("en-US")}
              </Badge>
            )}
          </ToggleGroupItem>
        );
      })}
    </ToggleGroup>
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
