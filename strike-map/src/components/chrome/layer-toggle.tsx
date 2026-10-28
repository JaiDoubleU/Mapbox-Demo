"use client";

import type { LayerState } from "@/lib/types";

const NEXT: Record<string, LayerState> = { false: "view", view: true, true: false };

/**
 * Three-state layer switch: off → view only (knob centered, layer visible but not
 * clickable) → interactive (knob right). Clicking cycles through the states.
 */
export function LayerToggle({ on, onChange, label }: { on: LayerState; onChange: (v: LayerState) => void; label: string }) {
  const isOn = on === true, isView = on === "view";
  const bg = isOn
    ? "var(--primary)"
    : isView
      ? "color-mix(in srgb, var(--primary) 40%, var(--s-line-strong))"
      : "var(--s-line-strong)";
  const tip = isOn
    ? "Interactive — click to turn off"
    : isView
      ? "View only — click for full interaction"
      : "Off — click to show as view only";
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn ? "true" : isView ? "mixed" : "false"}
      aria-label={`${label}: ${isOn ? "interactive" : isView ? "view only" : "off"}`}
      title={tip}
      onClick={(e) => {
        e.stopPropagation();
        onChange(NEXT[String(on)]);
      }}
      className="flex h-[21px] w-[38px] shrink-0 cursor-pointer items-center rounded-full border-none p-0.5 transition-[background] duration-150 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
      style={{ background: bg, justifyContent: isOn ? "flex-end" : isView ? "center" : "flex-start" }}
    >
      <span className="block size-[17px] rounded-full bg-white" />
    </button>
  );
}
