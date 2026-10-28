"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

function Slider({ className, thumbLabels, ...props }: React.ComponentProps<typeof SliderPrimitive.Root> & { thumbLabels?: string[] }) {
  return (
    <SliderPrimitive.Root
      data-slot="slider"
      className={cn("relative flex w-full touch-none items-center select-none", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1 w-full grow overflow-hidden rounded-full bg-s-line">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {/* One thumb per value, so a two-value slider is a range. */}
      {(props.value ?? props.defaultValue ?? [0]).map((_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          aria-label={thumbLabels?.[i]}
          className="block size-3.5 cursor-pointer rounded-full border border-primary bg-white shadow-sm outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
        />
      ))}
    </SliderPrimitive.Root>
  );
}

export { Slider };
