"use client";

import * as React from "react";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChartToolButtons } from "./chart-header";

/**
 * The panel's card: shadcn Card (small) with a chart-header CardHeader (title left, tools right),
 * content, and an optional footer. Tools are shown when any is provided (a missing one stays
 * disabled): Edit and Export call their handler; Maximize either calls `onMaximize`, or, with
 * `renderExpanded`, opens that content in a dialog titled like the card.
 */
export function InsightCard({
  title,
  extra,
  onEdit,
  onExport,
  onMaximize,
  renderExpanded,
  footer,
  children,
}: {
  title: string;
  /** Shown beside the title (e.g. an info tooltip). */
  extra?: React.ReactNode;
  onEdit?: () => void;
  onExport?: () => void;
  onMaximize?: () => void;
  renderExpanded?: () => React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const maximize = onMaximize ?? (renderExpanded ? () => setOpen(true) : undefined);
  const hasTools = !!(onEdit || onExport || maximize);
  const heading = <CardTitle className="min-w-0 truncate text-sm font-semibold whitespace-nowrap text-s-muted normal-case">{title}</CardTitle>;
  return (
    <>
      <Card size="sm" role="region" aria-label={title}>
        <CardHeader className="chart-header border-b border-orange-500">
          {extra ? (
            <div className="flex min-w-0 items-center gap-1.5">
              {heading}
              {extra}
            </div>
          ) : (
            heading
          )}
          {hasTools && (
            <CardAction>
              <ChartToolButtons title={title} tools={{ onEdit, onExport, onMaximize: maximize }} />
            </CardAction>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
      </Card>
      {renderExpanded && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="w-[min(960px,94vw)] rounded-2xl">
            <div className="border-b border-border px-[22px] py-[18px] pr-14">
              <DialogTitle className="text-lg font-semibold">{title}</DialogTitle>
            </div>
            <div className="max-h-[80vh] overflow-y-auto px-[22px] py-4">{open && renderExpanded()}</div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
