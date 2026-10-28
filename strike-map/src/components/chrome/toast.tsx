"use client";

import * as React from "react";

/** Prominent top-center notification that slides in and out. */
export function Toast({ msg }: { msg: string | null }) {
  const [display, setDisplay] = React.useState<string | null>(msg);
  const [closing, setClosing] = React.useState(false);

  React.useEffect(() => {
    if (msg) {
      setDisplay(msg);
      setClosing(false);
      return;
    }
    setClosing(true);
    const t = window.setTimeout(() => {
      setDisplay(null);
      setClosing(false);
    }, 280);
    return () => clearTimeout(t);
  }, [msg]);

  if (!display) return null;
  return (
    <div
      role="status"
      aria-live="polite"
      className="absolute top-4 left-1/2 z-[80] w-max max-w-[calc(100vw-32px)] rounded-[10px] bg-primary px-6 py-3.5 text-center text-[15px] font-semibold text-white md:whitespace-nowrap shadow-[0_8px_32px_rgba(0,0,0,0.22)]"
      style={{ animation: `${closing ? "toast-slide-out" : "toast-slide-in"} 0.28s cubic-bezier(0.16,1,0.3,1) forwards` }}
    >
      {display}
    </div>
  );
}
