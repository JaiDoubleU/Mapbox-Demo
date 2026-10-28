"use client";

import * as React from "react";
import { DEFAULT_DARK_STYLE, DEFAULT_LIGHT_STYLE } from "@/lib/config";

export interface Tweaks {
  dotSize: number;
  density: number;
  labels: boolean;
  grid: boolean;
  /** Overrides NEXT_PUBLIC_MAPBOX_TOKEN when set. */
  token: string;
  lightBasemapStyle: string;
  darkBasemapStyle: string;
  responsiveExportDialog: boolean;
}

export const TWEAK_DEFAULTS: Tweaks = {
  dotSize: 4,
  density: 1,
  labels: true,
  grid: true,
  token: "",
  lightBasemapStyle: DEFAULT_LIGHT_STYLE,
  darkBasemapStyle: DEFAULT_DARK_STYLE,
  responsiveExportDialog: true,
};

const KEY = "strike_tweaks_v1";

/** Tweak values persisted per browser. */
export function useTweaks() {
  const [tweaks, setTweaks] = React.useState<Tweaks>(TWEAK_DEFAULTS);
  React.useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved) setTweaks({ ...TWEAK_DEFAULTS, ...saved });
    } catch {
      /* ignore unreadable storage */
    }
  }, []);

  const setTweak = React.useCallback(<K extends keyof Tweaks>(key: K, value: Tweaks[K]) => {
    setTweaks((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* storage unavailable */
      }
      return next;
    });
  }, []);

  return [tweaks, setTweak] as const;
}
