"use client";

import * as React from "react";
import { X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { DARK_BASEMAP_STYLES, LIGHT_BASEMAP_STYLES } from "@/lib/config";
import type { Tweaks } from "@/hooks/use-tweaks";

function Section({ label }: { label: string }) {
  return <div className="pt-2.5 text-[10px] font-semibold tracking-[.06em] text-s-muted uppercase first:pt-0">{label}</div>;
}

function Row({ label, value, children, inline }: { label: string; value?: string; children: React.ReactNode; inline?: boolean }) {
  return (
    <div className={inline ? "flex items-center justify-between gap-2.5" : "flex flex-col gap-[5px]"}>
      <div className="flex items-baseline justify-between text-s-text">
        <span className="font-medium">{label}</span>
        {value != null && <span className="text-s-muted tabular-nums">{value}</span>}
      </div>
      {children}
    </div>
  );
}

function StyleSelect({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return (
    <Row label={label}>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger aria-label={label} className="h-[26px] w-full rounded-md px-2 text-[11.5px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="z-[2147483647]">
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value}>
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Row>
  );
}

interface TweaksPanelProps {
  open: boolean;
  onClose: () => void;
  tweaks: Tweaks;
  setTweak: <K extends keyof Tweaks>(key: K, value: Tweaks[K]) => void;
}

/** Floating, draggable tuning panel (Alt+T or ?tweaks to open). */
export function TweaksPanel({ open, onClose, tweaks: t, setTweak }: TweaksPanelProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [offset, setOffset] = React.useState({ x: 16, y: 16 });

  const onDragStart = (e: React.MouseEvent) => {
    const panel = ref.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right, startBottom = window.innerHeight - r.bottom;
    const move = (ev: MouseEvent) => {
      const maxX = Math.max(16, window.innerWidth - r.width - 16);
      const maxY = Math.max(16, window.innerHeight - r.height - 16);
      setOffset({
        x: Math.min(maxX, Math.max(16, startRight - (ev.clientX - sx))),
        y: Math.min(maxY, Math.max(16, startBottom - (ev.clientY - sy))),
      });
    };
    const up = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", up);
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", up);
  };

  if (!open) return null;
  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Tweaks"
      className="fixed z-[2147483646] flex max-h-[calc(100vh-32px)] w-[280px] flex-col overflow-hidden rounded-[14px] border border-border bg-card text-[11.5px] leading-[1.4] text-s-text shadow-[0_12px_40px_rgba(0,0,0,.18)]"
      style={{ right: offset.x, bottom: offset.y }}
    >
      <div className="flex cursor-move items-center justify-between py-2.5 pr-2 pl-3.5 select-none" onMouseDown={onDragStart}>
        <b className="text-xs font-semibold">Tweaks</b>
        <button
          aria-label="Close tweaks"
          onMouseDown={(e) => e.stopPropagation()}
          onClick={onClose}
          className="flex size-[22px] cursor-pointer items-center justify-center rounded-md border-none bg-transparent text-s-muted hover:bg-s-chip"
        >
          <X size={13} strokeWidth={1.75} />
        </button>
      </div>
      <div className="flex min-h-0 flex-col gap-2.5 overflow-y-auto px-3.5 pt-0.5 pb-3.5">
        <Section label="Map display" />
        <Row label="Well dot size" value={`${t.dotSize}px`}>
          <Slider min={2} max={8} step={0.5} value={[t.dotSize]} onValueChange={([v]) => setTweak("dotSize", v)} className="my-1.5" />
        </Row>
        <Row label="Well density" value={`${Math.round(t.density * 100)}%`}>
          <Slider
            min={20}
            max={100}
            step={5}
            value={[Math.round(t.density * 100)]}
            onValueChange={([v]) => setTweak("density", v / 100)}
            className="my-1.5"
          />
        </Row>
        <Row label="Map labels" inline>
          <Switch checked={t.labels} onCheckedChange={(v) => setTweak("labels", v)} />
        </Row>
        <Row label="Survey grid" inline>
          <Switch checked={t.grid} onCheckedChange={(v) => setTweak("grid", v)} />
        </Row>

        <Section label="Basemap" />
        <Row label="Mapbox token">
          <Input
            value={t.token}
            placeholder="pk.… (overrides NEXT_PUBLIC_MAPBOX_TOKEN)"
            onChange={(e) => setTweak("token", e.target.value)}
            className="h-[26px] rounded-md px-2 text-[11.5px]"
          />
        </Row>
        <StyleSelect label="Light mode style" value={t.lightBasemapStyle} options={LIGHT_BASEMAP_STYLES} onChange={(v) => setTweak("lightBasemapStyle", v)} />
        <StyleSelect label="Dark mode style" value={t.darkBasemapStyle} options={DARK_BASEMAP_STYLES} onChange={(v) => setTweak("darkBasemapStyle", v)} />

        <Section label="Export dialog" />
        <Row label="Responsive height" inline>
          <Switch checked={t.responsiveExportDialog} onCheckedChange={(v) => setTweak("responsiveExportDialog", v)} />
        </Row>
      </div>
    </div>
  );
}
