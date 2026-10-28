"use client";

import type { Well } from "@/lib/strike-data";
import { CAT_COLOR } from "@/lib/area-insights";
import { BarRow, topCounts } from "./panel-bits";
import { Section } from "./record-detail";

export interface InsightGroup {
  title: string;
  key: (w: Well) => string;
}

/** Breakdown bars (status, operator, formation…). The top seven take colour slots in rank order. */
export function QuickInsights({ items, groups, limit = 8 }: { items: Well[]; groups: InsightGroup[]; limit?: number }) {
  return (
    <Section title="Quick Insights">
      {items.length === 0 ? (
        <p className="m-0 py-2 text-xs text-s-muted">Nothing to summarise here.</p>
      ) : (
        groups.map((g) => {
          const rows = topCounts(items, g.key);
          const shown = rows.slice(0, limit);
          return (
            <div key={g.title} className="mb-3 last:mb-0">
              <div className="mb-2 text-xs font-semibold text-s-text uppercase">{g.title}</div>
              {shown.map(([label, count], i) => {
                const color = i < 7 ? CAT_COLOR(i) : "var(--cat-other)";
                return <BarRow key={label} label={label} count={count} max={rows[0][1]} color={color} dot={color} labelWidth={140} />;
              })}
              {rows.length > limit && (
                <div className="mt-1 text-xs text-s-muted">
                  +{rows.length - limit} more ({rows.slice(limit).reduce((s, [, c]) => s + c, 0).toLocaleString("en-US")})
                </div>
              )}
            </div>
          );
        })
      )}
    </Section>
  );
}
