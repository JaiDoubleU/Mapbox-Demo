"use client";

import * as React from "react";
import {
  Check,
  Circle,
  Crosshair,
  Lasso,
  Magnet,
  MousePointer2,
  Paintbrush,
  Pentagon,
  Sparkles,
  SquareDashed,
  Wand2,
  type LucideIcon,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { DrawToolId } from "@/lib/types";

interface SelectionTool {
  id: DrawToolId;
  icon: LucideIcon;
  label: string;
  divider?: boolean;
}

export const SELECTION_TOOLS: SelectionTool[] = [
  { id: "object-select", icon: Crosshair, label: "Object Selection" },
  { id: "quick-select", icon: Paintbrush, label: "Brush Selection" },
  { id: "rect-marquee", icon: SquareDashed, label: "Rectangular Marquee Tool" },
  { id: "ellipse-marquee", icon: Circle, label: "Elliptical Marquee Tool" },
  { id: "magic-wand", icon: Wand2, label: "Magic Wand", divider: true },
  { id: "lasso", icon: Lasso, label: "Lasso", divider: true },
  { id: "poly-lasso", icon: Pentagon, label: "Polygonal Lasso" },
  { id: "magnetic-lasso", icon: Magnet, label: "Magnetic Lasso" },
];

const toolBtn =
  "relative flex size-9 cursor-pointer items-center justify-center rounded-[7px] border-none transition-[background,color] duration-[120ms] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

function Sep() {
  return <div className="mx-0.5 my-0.5 h-px bg-border" />;
}

interface MapToolbarProps {
  activeTool: DrawToolId;
  onTool: (id: DrawToolId) => void;
}

/** Vertical selection toolbar on the right edge of the map. */
export function MapToolbar({ activeTool, onTool }: MapToolbarProps) {
  const selTool = SELECTION_TOOLS.find((t) => t.id === activeTool);
  const GroupIcon = selTool ? selTool.icon : SquareDashed;
  const pointerActive = activeTool === "pointer";
  const aiActive = activeTool === "ai-select";

  return (
    <div className="absolute top-1/2 right-3.5 z-[60] flex -translate-y-1/2 flex-col gap-[3px] rounded-[10px] border border-border bg-card p-[5px] shadow-[0_2px_8px_rgba(0,0,0,.18)]">
      <button
        title="Click to select"
        onClick={() => onTool("pointer")}
        className={cn(toolBtn, pointerActive ? "bg-primary text-white" : "bg-transparent text-s-muted")}
      >
        <MousePointer2 size={16} strokeWidth={0} fill="currentColor" />
      </button>
      <Sep />
      <button
        title="AI selection — describe what to select"
        onClick={() => onTool("ai-select")}
        className={cn(
          toolBtn,
          aiActive ? "bg-primary text-white" : "bg-[color-mix(in_srgb,var(--primary)_10%,transparent)] text-primary",
        )}
      >
        <span className="relative inline-flex size-5 items-center justify-center">
          <MousePointer2 size={14} strokeWidth={0} fill="var(--foreground)" />
          <span className="absolute -top-[3px] -right-1 flex size-2.5 items-center justify-center">
            <Sparkles size={9} strokeWidth={0} fill="var(--foreground)" />
          </span>
        </span>
      </button>
      <Sep />
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <button
            title={selTool ? selTool.label : "Selection tools"}
            className={cn(toolBtn, selTool ? "bg-primary text-white" : "bg-transparent text-s-muted")}
          >
            <GroupIcon size={15} strokeWidth={1.75} />
            {/* submenu indicator, bottom-left */}
            <span className="absolute bottom-1 left-1 size-0 border-solid border-t-[4px] border-l-[4px] border-t-current border-r-transparent border-b-transparent border-l-transparent opacity-60" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          side="left"
          align="start"
          sideOffset={15}
          alignOffset={-5}
          className="min-w-[205px] rounded-[10px] bg-card px-0 py-1 shadow-[0_4px_24px_rgba(0,0,0,.22)]"
        >
          <DropdownMenuLabel className="px-3.5 pt-2 pb-1.5 text-[10px] font-bold text-s-muted uppercase">
            Selection Tools
          </DropdownMenuLabel>
          {SELECTION_TOOLS.map((tool) => {
            const active = activeTool === tool.id;
            const Icon = tool.icon;
            return (
              <React.Fragment key={tool.id}>
                {tool.divider && <DropdownMenuSeparator className="my-1" />}
                <DropdownMenuItem
                  onSelect={() => onTool(tool.id)}
                  className={cn(
                    "gap-2.5 rounded-none px-3.5 py-2 data-[highlighted]:bg-s-chip",
                    active && "bg-[color-mix(in_srgb,var(--primary)_8%,transparent)]",
                  )}
                >
                  <Icon size={14} strokeWidth={1.75} color={active ? "var(--primary)" : "var(--s-muted)"} />
                  <span className={cn("flex-1 text-[13px] font-medium", active ? "text-primary" : "text-s-text")}>
                    {tool.label}
                  </span>
                  {active && <Check size={13} strokeWidth={1.75} color="var(--primary)" />}
                </DropdownMenuItem>
              </React.Fragment>
            );
          })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
