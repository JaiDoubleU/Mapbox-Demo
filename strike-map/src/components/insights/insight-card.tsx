"use client";

import * as React from "react";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChartToolButtons } from "./chart-header";

/**
 * The panel's card: shadcn Card (small) with a chart-header CardHeader (title left, tools right),
 * content, and an optional footer. Pass `onExport` and/or `renderExpanded` to get the Export and
 * Maximize tools; Maximize opens `renderExpanded()` in a dialog titled like the card.
 */
export function InsightCard({
  title,
  onExport,
  renderExpanded,
  footer,
  children,
}: {
  title: string;
  onExport?: () => void;
  renderExpanded?: () => React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const hasTools = !!(onExport || renderExpanded);
  return (
    <>
      <Card size="sm">
        <CardHeader className="chart-header border-b border-orange-500">
          <CardTitle className="min-w-0 truncate text-xs font-semibold whitespace-nowrap text-s-muted normal-case">{title}</CardTitle>
          {hasTools && (
            <CardAction>
              <ChartToolButtons title={title} tools={{ onExport, onMaximize: renderExpanded ? () => setOpen(true) : undefined }} />
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
