"use client";

import { List } from "lucide-react";
import { useDataset } from "@/lib/dataset-context";
import { LEASE_COLOR } from "@/components/map/engine";

export function Legend({ open, onOpen }: { open: boolean; onOpen: (open: boolean) => void }) {
  const d = useDataset();
  return (
    <div className="absolute bottom-[18px] left-4 z-[57]">
      {open && (
        <div className="mb-2.5 w-60 rounded-xl border border-border bg-card p-3.5 shadow-[var(--shadow-overlay)]">
          <div className="mb-2.5 text-xs font-semibold tracking-[1.2px] text-s-muted">LEGEND</div>
          <div className="flex flex-col gap-[9px]">
            {d.CAT_KEYS.map((k) => (
              <div key={k} className="flex items-center gap-2.5">
                <span
                  className="size-3 shrink-0 rounded-full"
                  style={{
                    background: d.CATS[k].color,
                    boxShadow: k === "rig" ? `0 0 0 2px color-mix(in srgb, ${d.CATS[k].color} 40%, transparent)` : "none",
                  }}
                />
                <span className="text-[13.5px] text-s-text">{d.CATS[k].label}</span>
              </div>
            ))}
            <div className="flex items-center gap-2.5">
              <span
                className="size-3 shrink-0 rounded-[2px] border-[1.5px]"
                style={{ background: "rgba(212,162,74,0.25)", borderColor: LEASE_COLOR }}
              />
              <span className="text-[13.5px] text-s-text">Lease</span>
            </div>
          </div>
        </div>
      )}
      <button
        onClick={() => onOpen(!open)}
        aria-expanded={open}
        className="flex h-[42px] cursor-pointer items-center gap-[9px] rounded-[10px] border border-border bg-card pr-[18px] pl-4 text-[15px] font-medium text-s-text shadow-[var(--shadow-soft)]"
      >
        <List size={18} strokeWidth={1.75} />
        Legend
      </button>
    </div>
  );
}
