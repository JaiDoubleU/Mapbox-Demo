"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Card, CardAction, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ChartToolButtons } from "./chart-header";

/**
 * The panel's card: shadcn Card (small) with a chart-header CardHeader (title left, tools right),
 * content, and an optional footer. Tools are shown when any is provided (a missing one stays
 * disabled): Edit and Export call their handler; Maximize either calls `onMaximize`, or, with
 * `renderExpanded`, opens that content in a dialog titled like the card.
 *
 * With `editor`, Edit slides a drawer out inside the card (over its content) holding a form for
 * the chart's parameters; `editor` gets a `close` callback. The drawer's open state is internal
 * unless `editorOpen` and `onEditorOpenChange` control it.
 */
export function InsightCard({
  title,
  extra,
  onEdit,
  onExport,
  onMaximize,
  renderExpanded,
  editor,
  editorTitle = "Chart parameters",
  editorOpen,
  onEditorOpenChange,
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
  editor?: (close: () => void) => React.ReactNode;
  editorTitle?: string;
  editorOpen?: boolean;
  onEditorOpenChange?: (open: boolean) => void;
  footer?: React.ReactNode;
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [drawerLocal, setDrawerLocal] = React.useState(false);
  const drawerOpen = editorOpen ?? drawerLocal;
  const setDrawer = (o: boolean) => (onEditorOpenChange ? onEditorOpenChange(o) : setDrawerLocal(o));
  const drawerRef = React.useRef<HTMLDivElement>(null);
  // Move focus into the drawer when it opens.
  React.useEffect(() => {
    if (drawerOpen) drawerRef.current?.focus();
  }, [drawerOpen]);
  const edit = editor ? () => setDrawer(true) : onEdit;
  const maximize = onMaximize ?? (renderExpanded ? () => setOpen(true) : undefined);
  const hasTools = !!(edit || onExport || maximize);
  const heading = <CardTitle className="min-w-0 truncate text-sm font-semibold whitespace-nowrap text-s-muted normal-case">{title}</CardTitle>;
  return (
    <>
      <Card size="sm" role="region" aria-label={title} className="relative">
        <CardHeader className="chart-header border-b border-border">
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
              <ChartToolButtons title={title} tools={{ onEdit: edit, onExport, onMaximize: maximize }} />
            </CardAction>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
        {footer && <CardFooter>{footer}</CardFooter>}
        {editor && (
          // Dims the card behind the drawer; clicking it closes the drawer.
          <div
            aria-hidden="true"
            data-slot="card-drawer-scrim"
            onClick={() => setDrawer(false)}
            className={cn(
              "absolute inset-0 z-10 bg-black/40 transition-opacity duration-300 ease-out motion-reduce:transition-none",
              drawerOpen ? "opacity-100" : "pointer-events-none opacity-0",
            )}
          />
        )}
        {editor && (
          <div
            ref={drawerRef}
            data-slot="card-drawer"
            role="dialog"
            aria-label={`${editorTitle}: ${title}`}
            aria-hidden={!drawerOpen}
            inert={!drawerOpen}
            tabIndex={-1}
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.stopPropagation();
                setDrawer(false);
              }
            }}
            className={cn(
              "absolute inset-y-0 right-0 z-20 flex w-[min(22rem,100%)] flex-col border-l border-border bg-card shadow-[var(--shadow-overlay)] outline-none transition-[translate,visibility] duration-300 ease-out motion-reduce:transition-none",
              drawerOpen ? "translate-x-0 visible" : "invisible translate-x-full",
            )}
          >
            <div className="flex items-center justify-between border-b border-border px-(--card-spacing) py-2">
              <div className="min-w-0 truncate text-sm font-semibold text-s-text">{editorTitle}</div>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setDrawer(false)}
                className="-mr-1 flex size-6 cursor-pointer items-center justify-center rounded-md border-none bg-transparent p-0 text-s-muted outline-none hover:bg-s-chip hover:text-s-text focus-visible:ring-[3px] focus-visible:ring-primary/20"
              >
                <X size={14} strokeWidth={1.75} />
              </button>
            </div>
            <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-(--card-spacing)">{drawerOpen && editor(() => setDrawer(false))}</div>
          </div>
        )}
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
