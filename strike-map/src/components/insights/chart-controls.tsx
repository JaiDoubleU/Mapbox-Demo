"use client";

import * as React from "react";
import { ZoomIn, ZoomOut } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export type YScale = "linear" | "log";


/** Linear / Semi-log as a single-select shadcn ToggleGroup (pressing the active one keeps it). */
export function ScaleToggle({ value, onChange }: { value: YScale; onChange: (v: YScale) => void }) {
  return (
    <ToggleGroup type="single" variant="outline" size="sm" value={value} onValueChange={(v) => v && onChange(v as YScale)} aria-label="Y-axis scale">
      <ToggleGroupItem value="linear" className="h-6 px-2 text-xs">
        Linear
      </ToggleGroupItem>
      <ToggleGroupItem value="log" className="h-6 px-2 text-xs">
        Semi-log
      </ToggleGroupItem>
    </ToggleGroup>
  );
}

function IconToggle({ label, pressed, onClick, children }: { label: string; pressed?: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          aria-label={label}
          aria-pressed={pressed}
          onClick={onClick}
          className={cn(
            "flex size-6 cursor-pointer items-center justify-center rounded-md border border-solid outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20",
            pressed ? "border-primary bg-[color-mix(in_srgb,var(--primary)_12%,transparent)] text-primary" : "border-s-line-strong bg-transparent text-s-muted hover:text-s-text",
          )}
        >
          {children}
        </button>
      </TooltipTrigger>
      <TooltipContent side="top">{label}</TooltipContent>
    </Tooltip>
  );
}

/** Drag-to-zoom toggle for the x-axis, plus Reset Zoom once zoomed in. */
export function ZoomControls({ active, zoomed, onToggle, onReset }: { active: boolean; zoomed: boolean; onToggle: () => void; onReset: () => void }) {
  return (
    <div className="flex items-center gap-1">
      <IconToggle label={active ? "Zoom x-axis: on (drag across the chart)" : "Zoom x-axis (click and drag)"} pressed={active} onClick={onToggle}>
        <ZoomIn size={13} strokeWidth={1.75} />
      </IconToggle>
      {zoomed && (
        <IconToggle label="Reset zoom" onClick={onReset}>
          <ZoomOut size={13} strokeWidth={1.75} />
        </IconToggle>
      )}
    </div>
  );
}

/** Nice linear ticks from 0 to just above max. */
export function linearTicks(max: number, count = 4): number[] {
  const raw = Math.max(max, 1e-6) / count;
  const mag = Math.pow(10, Math.floor(Math.log10(raw)));
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= raw) ?? 10 * mag;
  const ticks: number[] = [];
  for (let v = 0; v <= max + step * 0.999; v += step) ticks.push(v);
  return ticks;
}

/** Month ticks spaced to fit: monthly up to every 4 years, labelled "Jan '24" or "2024". */
export function timeTicks(t0: number, t1: number, widthPx: number): { t: number; label: string }[] {
  const start = new Date(t0), end = new Date(t1);
  const months = (end.getFullYear() - start.getFullYear()) * 12 + end.getMonth() - start.getMonth();
  const step = [1, 3, 6, 12, 24, 48].find((s) => (months / s) * 46 <= widthPx) ?? 48;
  const out: { t: number; label: string }[] = [];
  const first = new Date(start.getFullYear(), start.getMonth() + (start.getDate() > 1 ? 1 : 0), 1);
  for (let d = new Date(first); d.getTime() <= t1; d = new Date(d.getFullYear(), d.getMonth() + 1, 1)) {
    const mi = d.getFullYear() * 12 + d.getMonth();
    if (step >= 12 ? d.getMonth() === 0 && d.getFullYear() % (step / 12) === 0 : mi % step === 0)
      out.push({
        t: d.getTime(),
        label: step >= 12 ? String(d.getFullYear()) : `${d.toLocaleDateString("en-US", { month: "short" })} '${String(d.getFullYear()).slice(2)}`,
      });
  }
  return out;
}
