"use client";

import * as React from "react";
import { Header } from "@/components/chrome/header";
import { LayersPanel } from "@/components/chrome/layers-panel";
import { Legend } from "@/components/chrome/legend";
import { StatusPill } from "@/components/chrome/status-pill";
import { Toast } from "@/components/chrome/toast";
import { ExportHistoryDialog } from "@/components/chrome/export-history-dialog";
import { InsightsPanel } from "@/components/insights/insights-panel";
import type { ExportSummary } from "@/components/insights/export-options-popover";
import { AISelectOverlay } from "@/components/map/ai-select-overlay";
import { DrawOverlay } from "@/components/map/draw-overlay";
import type { MapEngine } from "@/components/map/engine";
import { MapToolbar } from "@/components/map/map-toolbar";
import { MapView } from "@/components/map/map-view";
import { TweaksPanel } from "@/components/tweaks/tweaks-panel";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useTweaks } from "@/hooks/use-tweaks";
import { CURRENT_USER_INITIALS, DEFAULT_DARK_STYLE, DEFAULT_LIGHT_STYLE, ENV_MAPBOX_TOKEN } from "@/lib/config";
import { useDataset } from "@/lib/dataset-context";
import { API_COPIED_MESSAGE, buildApiList, copyToClipboard, fmtJobTime, wellsForApiCopy } from "@/lib/format";
import { selectableWells } from "@/lib/selection";
import type { Well } from "@/lib/strike-data";
import { DEFAULT_LAYERS, type ApiCopyMode, type DrawToolId, type ExportJob, type LayerState, type Layers, type Theme } from "@/lib/types";

const PANEL_W = 380;
const EXPORT_DURATION_MS = 3500;
const TOAST_MS = 5000;

const DEFAULT_JOBS: ExportJob[] = [
  { id: "seed-0", name: "wells_permian_20260607", details: "Wells, 312 records, CSV", time: "Jun 07, 2026, 2:14 pm", status: "COMPLETED", files: 3 },
  { id: "seed-1", name: "permits_midland_20260607", details: "Permits, 87 records, CSV", time: "Jun 07, 2026, 11:02 am", status: "COMPLETED", files: 2 },
  { id: "seed-2", name: "prod_monthly_20260606", details: "Production, 124 records, CSV", time: "Jun 06, 2026, 4:51 pm", status: "COMPLETED", files: 2 },
  { id: "seed-3", name: "rigs_active_20260605", details: "Active Rigs, 14 records, SHP", time: "Jun 05, 2026, 9:30 am", status: "COMPLETED", files: 1 },
];

/** Tools that draw on an overlay; the others act through map clicks. */
const OVERLAY_TOOLS: DrawToolId[] = ["quick-select", "rect-marquee", "ellipse-marquee", "lasso", "poly-lasso", "magnetic-lasso"];

function makeJob(summary: ExportSummary): ExportJob {
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}${String(now.getDate()).padStart(2, "0")}`;
  const slug = (summary.sections[0] ?? "export").toLowerCase().replace(/[^a-z]+/g, "_");
  const hex = Math.random().toString(16).slice(2, 6);
  return {
    id: `job-${now.getTime()}-${hex}`,
    name: `${slug}_${stamp}_${hex}`,
    details: `${summary.sections.join(", ")}, ${summary.records.toLocaleString()} records, ${summary.formats.join("/")}`,
    time: fmtJobTime(now),
    status: "COMPLETED",
    files: summary.files,
  };
}

export function StrikeApp() {
  const d = useDataset();
  const [tweaks, setTweak] = useTweaks();
  const [tweaksOpen, setTweaksOpen] = React.useState(false);

  // ---- theme (".dark" on <html>, persisted)
  const [theme, setTheme] = React.useState<Theme>("light");
  React.useEffect(() => {
    if (document.documentElement.classList.contains("dark")) setTheme("dark");
  }, []);
  const toggleTheme = () => {
    const next: Theme = theme === "light" ? "dark" : "light";
    setTheme(next);
    document.documentElement.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("strike_theme", next);
    } catch {
      /* storage unavailable */
    }
    // Switching theme resets that theme's basemap to its default style.
    if (next === "light") setTweak("lightBasemapStyle", DEFAULT_LIGHT_STYLE);
    else setTweak("darkBasemapStyle", DEFAULT_DARK_STYLE);
  };

  // ---- Tweaks panel: Alt+T or ?tweaks in the URL
  React.useEffect(() => {
    if (new URLSearchParams(window.location.search).has("tweaks")) setTweaksOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.altKey && e.code === "KeyT") {
        e.preventDefault();
        setTweaksOpen((o) => !o);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // ---- layers + panels
  const [layers, setLayers] = React.useState<Layers>(DEFAULT_LAYERS);
  const setLayer = React.useCallback((key: keyof Layers, v: LayerState) => setLayers((l) => ({ ...l, [key]: v })), []);
  const [layersOpen, setLayersOpen] = React.useState(true);
  const [legendOpen, setLegendOpen] = React.useState(false);

  // ---- selection
  const [recordIds, setRecordIds] = React.useState<number[]>([]);
  const [leaseIds, setLeaseIds] = React.useState<number[]>([]);
  const [drawTool, setDrawTool] = React.useState<DrawToolId>("pointer");
  const [additive, setAdditive] = React.useState(false);
  const [engine, setEngine] = React.useState<MapEngine | null>(null);
  const drawToolRef = React.useRef(drawTool);
  drawToolRef.current = drawTool;
  const additiveRef = React.useRef(additive);
  additiveRef.current = additive;
  const layersRef = React.useRef(layers);
  layersRef.current = layers;

  // Holding Shift makes shape selections add to the current selection.
  React.useEffect(() => {
    const down = (e: KeyboardEvent) => e.key === "Shift" && setAdditive(true);
    const up = (e: KeyboardEvent) => e.key === "Shift" && setAdditive(false);
    const blur = () => setAdditive(false);
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    window.addEventListener("blur", blur);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
      window.removeEventListener("blur", blur);
    };
  }, []);

  const records = React.useMemo(() => recordIds.map((i) => d.WELLS[i]), [recordIds, d]);

  const selectMany = React.useCallback((idxs: number[], isAdditive: boolean) => {
    if (!idxs.length) return;
    setRecordIds((prev) => (isAdditive ? Array.from(new Set(prev.concat(idxs))) : idxs));
  }, []);

  /** Click on a well: replace, Ctrl/⌘+click toggles; Magic Wand selects every well of that type. */
  const selectWell = React.useCallback(
    (idx: number, ctrl: boolean) => {
      if (drawToolRef.current === "magic-wand") {
        const type = d.WELLS[idx].type;
        const idxs = selectableWells(d, layersRef.current).filter((w) => w.type === type).map((w) => w.idx);
        selectMany(idxs, additiveRef.current);
        return;
      }
      setRecordIds((ids) => {
        if (!ctrl) return [idx];
        return ids.includes(idx) ? ids.filter((i) => i !== idx) : ids.concat(idx);
      });
    },
    [d, selectMany],
  );

  const selectLease = React.useCallback((idx: number, ctrl: boolean) => {
    setLeaseIds((ids) => {
      if (ctrl) return ids.includes(idx) ? ids.filter((i) => i !== idx) : ids.concat(idx);
      return ids.length === 1 && ids[0] === idx ? [] : [idx];
    });
  }, []);

  const clearAll = React.useCallback(() => {
    setRecordIds([]);
    setLeaseIds([]);
  }, []);

  // ---- toast
  const [toast, setToast] = React.useState<string | null>(null);
  const toastTimer = React.useRef<number | undefined>(undefined);
  const flash = React.useCallback((msg: string) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToast(null), TOAST_MS);
  }, []);

  const copyApi = React.useCallback(
    (wells: Well[], mode: ApiCopyMode) => {
      copyToClipboard(buildApiList(wells, mode));
      flash(API_COPIED_MESSAGE);
    },
    [flash],
  );

  // ---- exports
  const [jobs, setJobs] = React.useState<ExportJob[]>(DEFAULT_JOBS);
  const [historyOpen, setHistoryOpen] = React.useState(false);
  const doExport = (summary: ExportSummary) => {
    const target = records.length === 1 ? records[0].name : records.length > 1 ? `${records.length} selected records` : "selection";
    flash(`Exporting ${summary.files} file${summary.files === 1 ? "" : "s"} for ${target}…`);
    window.setTimeout(() => {
      const job = makeJob(summary);
      setJobs((j) => [job, ...j]);
      flash(`Export complete · ${job.name} ready in Downloads`);
    }, EXPORT_DURATION_MS);
  };

  const token = (tweaks.token || ENV_MAPBOX_TOKEN).trim();
  const mapTweaks = React.useMemo(
    () => ({ dotSize: tweaks.dotSize, density: tweaks.density, labels: tweaks.labels, grid: tweaks.grid }),
    [tweaks.dotSize, tweaks.density, tweaks.labels, tweaks.grid],
  );

  return (
    <TooltipProvider>
      <div className="fixed inset-0 flex flex-col bg-s-bg text-s-text">
        <Header
          theme={theme}
          onTheme={toggleTheme}
          downloadCount={jobs.length}
          onDownloads={() => setHistoryOpen(true)}
          userInitials={CURRENT_USER_INITIALS}
        />
        <div className="flex min-h-0 flex-1">
          <div className="relative min-w-0 flex-1">
            <MapView
              theme={theme}
              layers={layers}
              tweaks={mapTweaks}
              token={token}
              lightBasemapStyle={tweaks.lightBasemapStyle}
              darkBasemapStyle={tweaks.darkBasemapStyle}
              drawTool={drawTool}
              selectedIdxs={recordIds}
              selectedLeaseIdxs={leaseIds}
              onSelect={selectWell}
              onSelectLease={selectLease}
              onEmptyClick={clearAll}
              onEngine={setEngine}
            />
            {OVERLAY_TOOLS.includes(drawTool) && (
              <DrawOverlay tool={drawTool} engine={engine} layers={layers} additive={additive} onSelectMulti={selectMany} />
            )}
            {drawTool === "ai-select" && <AISelectOverlay layers={layers} additive={additive} onSelectMulti={selectMany} />}
            <MapToolbar activeTool={drawTool} onTool={setDrawTool} />
            <LayersPanel open={layersOpen} onOpen={setLayersOpen} layers={layers} setLayer={setLayer} />
            <Legend open={legendOpen} onOpen={setLegendOpen} />
            <StatusPill layers={layers} onCopyApi={(mode) => copyApi(wellsForApiCopy(d, records, layers), mode)} />
            <Toast msg={toast} />
          </div>
          <aside id="insightsPanel" className="shrink-0" style={{ width: PANEL_W }}>
            <InsightsPanel
              records={records}
              selectedLeaseIdxs={leaseIds}
              layers={layers}
              responsiveExportDialog={tweaks.responsiveExportDialog}
              onCopyApi={copyApi}
              onExport={doExport}
            />
          </aside>
        </div>
        <ExportHistoryDialog
          open={historyOpen}
          onOpenChange={setHistoryOpen}
          jobs={jobs}
          onDownload={(job) => flash(`Downloading ${job.name} …`)}
          onDelete={(id) => setJobs((j) => j.filter((x) => x.id !== id))}
          onRename={(id, name) => setJobs((js) => js.map((j) => (j.id === id ? { ...j, name } : j)))}
        />
        <TweaksPanel open={tweaksOpen} onClose={() => setTweaksOpen(false)} tweaks={tweaks} setTweak={setTweak} />
      </div>
    </TooltipProvider>
  );
}
