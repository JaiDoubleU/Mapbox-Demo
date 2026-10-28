"use client";

import { ChevronDown, Filter, Globe, GripVertical, Layers as LayersIcon, X } from "lucide-react";
import type { LayerState, Layers } from "@/lib/types";
import { cn } from "@/lib/utils";
import { LayerToggle } from "./layer-toggle";

interface LayerRowProps {
  label: string;
  on?: LayerState;
  onToggle?: (v: LayerState) => void;
  filtered?: boolean;
  isAll?: boolean;
}

function LayerRow({ label, on = false, onToggle, filtered, isAll }: LayerRowProps) {
  return (
    <div className={cn("flex items-center gap-2.5 rounded-lg px-3 py-2.5", isAll ? "bg-s-chip" : "bg-transparent")}>
      {isAll ? (
        <span className="flex size-[22px] shrink-0 items-center justify-center rounded-full bg-primary">
          <Globe size={14} strokeWidth={1.75} color="#fff" />
        </span>
      ) : (
        <GripVertical size={15} strokeWidth={1.75} color="var(--s-faint)" className="cursor-grab" />
      )}
      <span className="flex-1 text-[14.5px] font-medium text-s-text">{label}</span>
      {filtered && (
        <>
          <Filter size={14} strokeWidth={1.75} color="var(--primary)" />
          <button title="Clear filter" className="flex cursor-pointer border-none bg-transparent p-0 text-s-muted">
            <X size={15} strokeWidth={1.75} />
          </button>
        </>
      )}
      {!isAll && onToggle && <LayerToggle on={on} onChange={onToggle} label={label} />}
      <ChevronDown size={17} strokeWidth={1.75} color="var(--s-muted)" />
    </div>
  );
}

interface LayersPanelProps {
  open: boolean;
  onOpen: (open: boolean) => void;
  layers: Layers;
  setLayer: (key: keyof Layers, v: LayerState) => void;
}

export function LayersPanel({ open, onOpen, layers, setLayer }: LayersPanelProps) {
  return (
    <div className="absolute top-4 left-4 z-[57]">
      <button
        onClick={() => onOpen(!open)}
        aria-expanded={open}
        className="flex h-[42px] cursor-pointer items-center gap-[9px] rounded-[10px] border border-border bg-card pr-[18px] pl-4 text-[15px] font-medium text-s-text shadow-[var(--shadow-soft)]"
      >
        <LayersIcon size={18} strokeWidth={1.75} />
        Layers
      </button>
      {open && (
        <div className="mt-2.5 max-h-[calc(100%-64px)] w-[min(20rem,calc(100vw-5.5rem))] overflow-y-auto rounded-xl border border-border bg-card p-3.5 shadow-[var(--shadow-overlay)]">
          <div className="px-1 pt-0.5 pb-3 text-xs font-semibold tracking-[1.2px] text-s-muted">LAYERS</div>
          <div className="flex flex-col gap-1">
            <LayerRow isAll label="All Layers" />
            <LayerRow label="Active Rigs" on={layers.rigs} onToggle={(v) => setLayer("rigs", v)} />
            <LayerRow label="Wells" on={layers.wells} onToggle={(v) => setLayer("wells", v)} />
            <LayerRow label="Permits" filtered on={layers.permits} onToggle={(v) => setLayer("permits", v)} />
            <LayerRow label="Landtrac Lease" on={layers.landtracLease} onToggle={(v) => setLayer("landtracLease", v)} />
            <LayerRow label="Landtrac Unit" on={layers.landtracUnit} onToggle={(v) => setLayer("landtracUnit", v)} />
          </div>
        </div>
      )}
    </div>
  );
}
