"use client";

import * as React from "react";
import { useDataset } from "@/lib/dataset-context";
import type { DrawToolId, Layers, MapTweaks, Theme } from "@/lib/types";
import { CanvasMapEngine } from "./canvas-engine";
import type { EngineOptions, MapEngine } from "./engine";
import { MapboxMapEngine } from "./mapbox-engine";
import { loadMapbox } from "@/lib/load-mapbox";

export function isValidMapboxToken(token: string) {
  return token.startsWith("pk.") && token.length >= 40;
}

interface MapViewProps {
  theme: Theme;
  layers: Layers;
  tweaks: MapTweaks;
  token: string;
  lightBasemapStyle: string;
  darkBasemapStyle: string;
  drawTool: DrawToolId;
  selectedIdxs: number[];
  selectedLeaseIdxs: number[];
  onSelect: (idx: number, ctrl: boolean) => void;
  onSelectLease: (idx: number, ctrl: boolean) => void;
  onEmptyClick: () => void;
  onEngine: (engine: MapEngine | null) => void;
}

/** Hosts whichever engine applies (Mapbox when a token is set, canvas otherwise). */
export function MapView(props: MapViewProps) {
  const data = useDataset();
  const hostRef = React.useRef<HTMLDivElement>(null);
  const engineRef = React.useRef<MapEngine | null>(null);
  const useMapbox = isValidMapboxToken(props.token);

  // Callbacks are read through a ref so engines never hold stale closures.
  const latest = React.useRef(props);
  latest.current = props;

  const engineOptions = (): EngineOptions => {
    const p = latest.current;
    return {
      data,
      theme: p.theme,
      layers: p.layers,
      tweaks: p.tweaks,
      drawTool: p.drawTool,
      lightBasemapStyle: p.lightBasemapStyle,
      darkBasemapStyle: p.darkBasemapStyle,
      onSelect: (i, c) => latest.current.onSelect(i, c),
      onSelectLease: (i, c) => latest.current.onSelectLease(i, c),
      onEmptyClick: () => latest.current.onEmptyClick(),
    };
  };

  React.useEffect(() => {
    const host = hostRef.current!;
    let cancelled = false;
    let engine: MapEngine | null = null;

    const attach = (e: MapEngine) => {
      engine = e;
      engineRef.current = e;
      e.setSelected(latest.current.selectedIdxs);
      e.setSelectedLeases(latest.current.selectedLeaseIdxs);
      latest.current.onEngine(e);
    };
    const startCanvas = () => {
      const cv = document.createElement("canvas");
      Object.assign(cv.style, { width: "100%", height: "100%", cursor: "grab", display: "block" });
      host.appendChild(cv);
      attach(new CanvasMapEngine(cv, engineOptions()));
    };

    if (useMapbox) {
      // If the library, the token or the style can't load (e.g. the claude.ai sandbox blocks
      // Mapbox), drop back to the canvas basemap instead of leaving an empty map.
      const fallBack = (err: unknown) => {
        if (cancelled) return;
        console.warn("Mapbox unavailable, using canvas basemap", err);
        engine?.destroy();
        host.innerHTML = "";
        startCanvas();
      };
      loadMapbox()
        .then((mapbox) => {
          if (cancelled) return;
          // Mapbox's stylesheet makes its container `position: relative`, which would collapse
          // our absolutely positioned host; give it its own full-size child, sized inline.
          const mapHost = document.createElement("div");
          Object.assign(mapHost.style, { position: "absolute", inset: "0" });
          host.appendChild(mapHost);
          attach(new MapboxMapEngine(mapbox, mapHost, latest.current.token, engineOptions(), fallBack));
        })
        .catch(fallBack);
    } else {
      startCanvas();
    }

    return () => {
      cancelled = true;
      engine?.destroy();
      engineRef.current = null;
      latest.current.onEngine(null);
      host.innerHTML = "";
    };
    // Re-create only when switching renderer, not on every token keystroke.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [useMapbox, data]);

  const { theme, layers, tweaks, drawTool, lightBasemapStyle, darkBasemapStyle, selectedIdxs, selectedLeaseIdxs } = props;
  React.useEffect(() => {
    engineRef.current?.setOptions({ theme, layers, tweaks, drawTool, lightBasemapStyle, darkBasemapStyle });
  }, [theme, layers, tweaks, drawTool, lightBasemapStyle, darkBasemapStyle]);
  React.useEffect(() => engineRef.current?.setSelected(selectedIdxs), [selectedIdxs]);
  React.useEffect(() => engineRef.current?.setSelectedLeases(selectedLeaseIdxs), [selectedLeaseIdxs]);

  return <div ref={hostRef} className="absolute inset-0" />;
}
