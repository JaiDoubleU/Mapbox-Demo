"use client";

import * as React from "react";
import { LoaderCircle, Sparkles, X } from "lucide-react";
import { useDataset } from "@/lib/dataset-context";
import { aiSelect, selectableWells } from "@/lib/selection";
import type { Layers } from "@/lib/types";
import { cn } from "@/lib/utils";

const SUGGESTIONS = ["Horizontal oil wells", "Pioneer wells", "Wolfcamp formation", "Vertical gas wells", "Injection wells"];

interface AISelectOverlayProps {
  layers: Layers;
  density: number;
  additive: boolean;
  onSelectMulti: (idxs: number[], additive: boolean) => void;
}

/** AI Select: click the map to open a prompt bar, then describe the records to select. */
export function AISelectOverlay({ layers, density, additive, onSelectMulti }: AISelectOverlayProps) {
  const data = useDataset();
  const [ready, setReady] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [phase, setPhase] = React.useState<"idle" | "thinking" | "result" | "empty">("idle");
  const [count, setCount] = React.useState(0);
  const [mouse, setMouse] = React.useState<{ x: number; y: number } | null>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const timers = React.useRef<number[]>([]);

  React.useEffect(() => () => timers.current.forEach(clearTimeout), []);
  React.useEffect(() => {
    if (ready) timers.current.push(window.setTimeout(() => inputRef.current?.focus(), 60));
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setReady(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [ready]);

  if (!ready) {
    // Pre-click state: crosshair cursor with a hint that follows the pointer.
    return (
      <div
        className="absolute inset-0 z-[55] cursor-crosshair"
        onClick={() => setReady(true)}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
        }}
        onMouseLeave={() => setMouse(null)}
      >
        {mouse && (
          <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible">
            <circle cx={mouse.x} cy={mouse.y} r={13} fill="none" stroke="#3C8321" strokeWidth={1.3} strokeDasharray="3 2" opacity={0.6} />
            <circle cx={mouse.x} cy={mouse.y} r={2.5} fill="#3C8321" opacity={0.8} />
            <g transform={`translate(${mouse.x + 16},${mouse.y - 8})`}>
              <rect x={0} y={0} width={148} height={24} rx={5} fill="var(--card)" stroke="var(--border)" strokeWidth={1} />
              <text x={10} y={16} fontSize={11} fontFamily="var(--font-sans)" fill="var(--s-text)" fontWeight={500}>
                Click to open AI selection
              </text>
            </g>
          </svg>
        )}
      </div>
    );
  }

  const submit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!query.trim()) return;
    setPhase("thinking");
    timers.current.push(
      window.setTimeout(() => {
        const idxs = aiSelect(selectableWells(data, layers, density), query);
        setCount(idxs.length);
        if (idxs.length > 0) {
          setPhase("result");
          onSelectMulti(idxs, additive);
          timers.current.push(
            window.setTimeout(() => {
              setReady(false);
              setPhase("idle");
              setQuery("");
            }, 900),
          );
        } else {
          setPhase("empty");
        }
      }, 700),
    );
  };

  const canSubmit = !!query.trim() && phase !== "thinking";

  return (
    <div className="absolute bottom-7 left-1/2 z-[70] w-[420px] -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-card shadow-[0_8px_32px_rgba(0,0,0,.22)]">
      <div className="flex items-center gap-[7px] border-b border-border px-3.5 py-[11px]">
        <Sparkles size={14} strokeWidth={1.75} color="var(--primary)" />
        <span className="text-xs font-semibold tracking-[.3px] text-s-text">AI Selection</span>
        <span className="ml-0.5 text-[11px] text-s-muted">— describe what to select</span>
        <button
          onClick={() => setReady(false)}
          title="Close"
          className="ml-auto flex cursor-pointer border-none bg-transparent p-0.5 text-s-muted"
        >
          <X size={14} strokeWidth={1.75} />
        </button>
      </div>
      <form onSubmit={submit} className="px-3 pt-2.5">
        <div className="flex gap-2">
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setPhase("idle");
            }}
            placeholder="e.g. horizontal oil wells by Pioneer in Wolfcamp"
            disabled={phase === "thinking"}
            className="h-9 flex-1 rounded-[7px] border border-border bg-[var(--s-input)] px-3 text-[13px] text-s-text outline-none placeholder:text-s-faint"
          />
          <button
            type="submit"
            disabled={!canSubmit}
            className={cn(
              "flex h-9 items-center gap-[5px] rounded-[7px] border-none bg-primary px-3.5 text-xs font-semibold text-white",
              canSubmit ? "cursor-pointer" : "cursor-default",
              !query.trim() && "opacity-45",
            )}
          >
            {phase === "thinking" ? (
              <LoaderCircle size={13} strokeWidth={1.75} className="animate-spin" />
            ) : (
              <Sparkles size={13} strokeWidth={1.75} />
            )}
            {phase === "thinking" ? "Selecting…" : "Select"}
          </button>
        </div>
        <div className="min-h-7 px-0.5 py-1.5 text-xs">
          {phase === "result" && (
            <span className="font-medium text-primary">
              ✓ {count.toLocaleString()} well{count === 1 ? "" : "s"} selected
            </span>
          )}
          {phase === "empty" && <span className="text-s-muted">No matching wells found — try different keywords.</span>}
        </div>
      </form>
      {!query && (
        <div className="flex flex-wrap gap-[5px] px-3 pb-2.5">
          {SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => {
                setQuery(s);
                setPhase("idle");
                timers.current.push(window.setTimeout(() => inputRef.current?.focus(), 0));
              }}
              className="h-6 cursor-pointer rounded-full border border-border bg-transparent px-2.5 text-[11px] text-s-muted"
            >
              {s}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
