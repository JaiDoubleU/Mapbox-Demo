"use client";

import * as React from "react";
import { Download, Moon, Sun } from "lucide-react";
import type { Theme } from "@/lib/types";
import { EnverusWordmark } from "./enverus-wordmark";

function DownloadBadge({ count }: { count: number }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const prev = React.useRef(count);
  React.useEffect(() => {
    // Pop the badge whenever the number of available downloads changes.
    if (ref.current && count !== prev.current) {
      ref.current.style.animation = "none";
      void ref.current.offsetWidth;
      ref.current.style.animation = "badge-pop 0.7s ease-out";
    }
    prev.current = count;
  }, [count]);
  return (
    <span
      ref={ref}
      className="absolute top-[3px] right-px box-content flex h-[17px] min-w-[17px] items-center justify-center rounded-full border-2 border-s-header bg-primary px-1 text-[10.5px] leading-none font-bold text-white"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

const iconBtn =
  "relative flex size-[38px] cursor-pointer items-center justify-center rounded-lg border-none bg-transparent text-s-text hover:bg-s-chip outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

interface HeaderProps {
  theme: Theme;
  onTheme: () => void;
  downloadCount: number;
  onDownloads: () => void;
  userInitials: string;
}

export function Header({ theme, onTheme, downloadCount, onDownloads, userInitials }: HeaderProps) {
  return (
    <header className="relative z-[60] flex h-[60px] shrink-0 items-center justify-between border-b border-s-line-strong bg-s-header px-[22px]">
      <div className="flex items-center gap-[13px]">
        <EnverusWordmark height={17} />
        <span className="mx-0.5 h-5 w-px bg-foreground" />
        <span className="text-[19px] font-medium tracking-[1px] text-s-text">STRIKE</span>
      </div>
      <div className="flex items-center justify-end gap-1.5">
        <button
          className={iconBtn}
          onClick={onDownloads}
          title={
            downloadCount > 0
              ? `${downloadCount} download${downloadCount === 1 ? "" : "s"} available`
              : "Downloads"
          }
        >
          <Download size={19} strokeWidth={1.75} />
          {downloadCount > 0 && <DownloadBadge count={downloadCount} />}
        </button>
        <button className={iconBtn} onClick={onTheme} title="Toggle theme">
          {theme === "dark" ? <Moon size={19} strokeWidth={1.75} /> : <Sun size={19} strokeWidth={1.75} />}
        </button>
        <div className="ml-1.5 flex size-[38px] items-center justify-center rounded-full bg-primary text-[13px] font-semibold text-white">
          {userInitials}
        </div>
      </div>
    </header>
  );
}
