"use client";

import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { Well } from "@/lib/strike-data";
import { cn } from "@/lib/utils";

/* Small pieces shared by the panel's summary and tab views. */

export function SummaryTile({ value, label }: { value: number; label: string }) {
  return (
    <Card size="sm" className="min-w-0 flex-1 gap-1">
      <CardContent>
        <div className="text-lg leading-none font-bold text-s-text">{value.toLocaleString()}</div>
        <div className="mt-1 text-xs text-s-muted">{label}</div>
      </CardContent>
    </Card>
  );
}

export function BarRow({
  label,
  count,
  max,
  color,
  dot,
  labelWidth,
  barWidth,
  countWidth = 42,
}: {
  label: string;
  count: number;
  max: number;
  color: string;
  dot?: string;
  labelWidth?: number;
  barWidth?: number;
  countWidth?: number;
}) {
  return (
    <div className="mb-[7px] flex items-center gap-2">
      {dot && <div className="size-2 shrink-0 rounded-full" style={{ background: dot }} />}
      <div
        className={cn("truncate text-xs text-s-text", labelWidth ? "shrink-0" : "flex-1")}
        style={labelWidth ? { width: labelWidth } : undefined}
      >
        {label}
      </div>
      <div
        className={cn("h-1 overflow-hidden rounded-[2px] bg-s-line", barWidth ? "shrink-0" : "flex-1")}
        style={barWidth ? { width: barWidth } : undefined}
      >
        <div
          className="h-full rounded-[2px] transition-[width] duration-300"
          style={{ width: `${(count / max) * 100}%`, background: color }}
        />
      </div>
      <div className="shrink-0 text-right text-xs text-s-muted" style={{ width: countWidth }}>
        {count.toLocaleString()}
      </div>
    </div>
  );
}

export function topCounts(items: Well[], key: (w: Well) => string, limit?: number) {
  const counts: Record<string, number> = {};
  items.forEach((w) => (counts[key(w)] = (counts[key(w)] || 0) + 1));
  const entries = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return limit ? entries.slice(0, limit) : entries;
}

