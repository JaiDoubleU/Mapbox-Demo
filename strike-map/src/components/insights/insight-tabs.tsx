"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export type InsightTab = "area" | "wells" | "permits" | "rigs";
export const NO_STEP: Record<InsightTab, number> = { area: -1, wells: -1, permits: -1, rigs: -1 };
const TABS: { id: InsightTab; label: string }[] = [
  { id: "area", label: "Insights" },
  { id: "wells", label: "Wells" },
  { id: "permits", label: "Permits" },
  { id: "rigs", label: "Rigs" },
];

/**
 * shadcn Tabs with a count Badge in each tab. The strip scrolls sideways when the tabs don't fit
 * (the list is absolutely positioned inside a fixed-height scroller, so there is never a vertical
 * scrollbar), and the active tab is scrolled into view.
 */
export function InsightTabs({ value, counts, onChange }: { value: InsightTab; counts: Record<InsightTab, number | null>; onChange: (t: InsightTab) => void }) {
  const scroller = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    const box = scroller.current;
    const el = box?.querySelector<HTMLElement>('[data-state="active"]');
    if (!box || !el) return;
    if (el.offsetLeft < box.scrollLeft || el.offsetLeft + el.offsetWidth > box.scrollLeft + box.clientWidth)
      box.scrollTo({ left: el.offsetLeft - 16, behavior: "smooth" });
  }, [value]);
  return (
    <Tabs value={value} onValueChange={(v) => onChange(v as InsightTab)} className="mb-3 gap-0">
      <div ref={scroller} className="relative h-10 overflow-x-auto overflow-y-hidden rounded-sm bg-muted [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <TabsList aria-label="Insights" className="absolute top-0 left-0 flex h-10 w-full min-w-max flex-row items-center rounded-none bg-transparent p-0">
          <div className="w-4 shrink-0" aria-hidden />
          {TABS.map((t) => {
            const n = counts[t.id];
            const on = value === t.id;
            return (
              <TabsTrigger key={t.id} value={t.id} disabled={n === 0} aria-label={n == null ? t.label : `${t.label} (${n})`} className="h-8 shrink-0 px-4 text-xs">
                {t.label}
                {n != null && (
                  <Badge variant={on ? "default" : "secondary"} className="h-4 rounded-full px-1.5 py-0 text-xs leading-none tabular-nums">
                    {n.toLocaleString("en-US")}
                  </Badge>
                )}
              </TabsTrigger>
            );
          })}
          <div className="w-4 shrink-0" aria-hidden />
        </TabsList>
      </div>
    </Tabs>
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
