"use client";

import * as React from "react";
import { Download, Maximize2, Pencil, type LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export interface ChartTools {
  onEdit?: () => void;
  onExport?: () => void;
  onMaximize?: () => void;
}

const TOOLS: { key: keyof ChartTools; label: string; icon: LucideIcon }[] = [
  { key: "onEdit", label: "Edit", icon: Pencil },
  { key: "onExport", label: "Export", icon: Download },
  { key: "onMaximize", label: "Maximize", icon: Maximize2 },
];

/**
 * Standard header for chart containers: the chart name on the left; Edit, Export and Maximize
 * icon buttons on the right, each with a tooltip naming its action. A tool without a handler
 * stays in place but disabled, so every chart header has the same layout.
 */
export function ChartHeader({ title, extra, tools, className }: { title: string; extra?: React.ReactNode; tools: ChartTools; className?: string }) {
  return (
    <div className={cn("chart-header mb-2 flex items-center justify-between border-b border-orange-500 pb-2", className)}>
      <div className="flex min-w-0 items-center gap-1.5">
        <h3 className="m-0 truncate text-[11px] font-semibold text-s-muted uppercase">{title}</h3>
        {extra}
      </div>
      <div className="-mr-1 flex shrink-0 items-center gap-0.5" role="toolbar" aria-label={`${title} tools`}>
        {TOOLS.map(({ key, label, icon: Icon }) => {
          const run = tools[key];
          const tip = run ? label : `${label} (not available for this chart)`;
          return (
            <Tooltip key={key}>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  aria-label={`${label} ${title.toLowerCase()}`}
                  aria-disabled={!run || undefined}
                  onClick={run}
                  className={cn(
                    "flex size-6 items-center justify-center rounded-md border-none bg-transparent p-0 outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20",
                    run ? "cursor-pointer text-s-muted hover:bg-s-chip hover:text-s-text" : "cursor-not-allowed text-s-faint",
                  )}
                >
                  <Icon size={13} strokeWidth={1.75} />
                </button>
              </TooltipTrigger>
              <TooltipContent side="top">{tip}</TooltipContent>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
}
