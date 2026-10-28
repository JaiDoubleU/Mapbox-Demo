"use client";

import * as React from "react";
import { Download, Maximize2, Pencil, type LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

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

/** The Edit / Export / Maximize icon buttons. Only the actions a chart supports are rendered. */
export function ChartToolButtons({ title, tools }: { title: string; tools: ChartTools }) {
  const available = TOOLS.flatMap((t) => (tools[t.key] ? [{ ...t, run: tools[t.key]! }] : []));
  if (!available.length) return null;
  return (
    <div className="-mr-1 flex shrink-0 items-center gap-0.5" role="toolbar" aria-label={`${title} tools`}>
      {available.map(({ key, label, icon: Icon, run }) => (
        <Tooltip key={key}>
          <TooltipTrigger asChild>
            <button
              type="button"
              aria-label={`${label} ${title.toLowerCase()}`}
              onClick={run}
              className="flex size-6 cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-0 text-s-muted outline-none hover:bg-s-chip hover:text-s-text focus-visible:ring-[3px] focus-visible:ring-primary/20"
            >
              <Icon size={13} strokeWidth={1.75} />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top">{label}</TooltipContent>
        </Tooltip>
      ))}
    </div>
  );
}
