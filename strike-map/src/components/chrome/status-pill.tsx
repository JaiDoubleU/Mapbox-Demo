"use client";

import { useDataset } from "@/lib/dataset-context";
import { compactCount } from "@/lib/format";
import type { ApiCopyMode, LayerState, Layers } from "@/lib/types";
import { CopyApiButton } from "./copy-api-button";

function Segment({ active, value, unit }: { active: LayerState; value: string | number; unit: string }) {
  return (
    <span style={{ color: active ? "var(--s-text)" : "var(--s-faint)", opacity: active ? 1 : 0.6 }}>
      <b className="font-bold">{value}</b> {unit}
    </span>
  );
}

/** Bottom-center summary: rig and well/permit totals, plus a Copy API List shortcut. */
export function StatusPill({ layers, onCopyApi }: { layers: Layers; onCopyApi: (mode: ApiCopyMode) => void }) {
  const { counts: c } = useDataset();
  return (
    <div className="absolute bottom-[22px] left-1/2 z-[56] hidden -translate-x-1/2 md:flex items-center gap-3.5 rounded-full border border-border bg-card px-[22px] py-2.5 text-[14.5px] whitespace-nowrap shadow-[var(--shadow-soft)]">
      <Segment active={layers.rigs} value={c.rigs} unit="Active Rigs" />
      <span className="text-s-line-strong">|</span>
      <Segment active={layers.wells || layers.permits} value={compactCount(c.wells + c.permits)} unit="Wells & Permits" />
      <CopyApiButton size="md" onCopy={onCopyApi} />
    </div>
  );
}
