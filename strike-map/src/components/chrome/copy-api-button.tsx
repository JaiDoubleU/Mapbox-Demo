"use client";

import * as React from "react";
import { ChevronDown, ChevronUp, Copy } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { ApiCopyMode } from "@/lib/types";
import { cn } from "@/lib/utils";

/** "Copy API List" drop-up: formatted (42-329-30742) or digits-only API numbers. */
export function CopyApiButton({ onCopy, size = "sm" }: { onCopy: (mode: ApiCopyMode) => void; size?: "sm" | "md" }) {
  const md = size === "md";
  const [open, setOpen] = React.useState(false);
  return (
    <DropdownMenu open={open} onOpenChange={setOpen} modal={false}>
      <Tooltip open={open ? false : undefined}>
        <TooltipTrigger asChild>
          <DropdownMenuTrigger asChild>
            <button
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md border border-border bg-transparent font-medium text-foreground outline-none hover:bg-s-chip focus-visible:ring-[3px] focus-visible:ring-ring/50",
                md ? "h-9 gap-[7px] px-3.5 text-sm" : "h-5 gap-[5px] px-[7px] text-[11px]",
              )}
            >
              <Copy size={md ? 15 : 12} strokeWidth={1.75} />
              Copy API List
              {open ? <ChevronUp size={md ? 13 : 11} strokeWidth={1.75} /> : <ChevronDown size={md ? 13 : 11} strokeWidth={1.75} />}
            </button>
          </DropdownMenuTrigger>
        </TooltipTrigger>
        <TooltipContent side="top">Copy API List to Clipboard</TooltipContent>
      </Tooltip>
      <DropdownMenuContent side="top" align="start" onClick={(e) => e.stopPropagation()}>
        <DropdownMenuItem onSelect={() => onCopy("formatted")}>Copy Formatted API List</DropdownMenuItem>
        <DropdownMenuItem onSelect={() => onCopy("unformatted")}>Copy Unformatted API List</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
