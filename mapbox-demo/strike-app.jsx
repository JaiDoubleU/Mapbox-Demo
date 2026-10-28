/* global React, ReactDOM */
// Enverus STRIKE — app wiring.
const { Header, LayersPanel, Legend, StatusPill, Toast, RecordPanel, MapView, ManageDownloadsDialog } = window;
const { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakText } = window;

const PANEL_W = 380;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmtTime(d) {
  let h = d.getHours(); const ampm = h >= 12 ? "pm" : "am"; h = h % 12 || 12;
  return MONTHS[d.getMonth()] + " " + String(d.getDate()).padStart(2, "0") + ", " + d.getFullYear() + ", " + h + ":" + String(d.getMinutes()).padStart(2, "0") + " " + ampm;
}
let _jobSeq = 0;
function makeJob(count, rec) {
  const id = "job" + (_jobSeq++) + "-" + Math.random().toString(16).slice(2, 7);
  const name = Math.random().toString(16).slice(2, 7);
  const types = ["Production", "Wells", "Permits", "Well Header"];
  const type = types[Math.floor(Math.random() * types.length)];
  const recs = type === "Production" ? 40 + Math.floor(Math.random() * 90) : 2 + Math.floor(Math.random() * 28);
  return {
    id, name,
    details: type + ", " + recs + " records, CSV",
    time: fmtTime(new Date()),
    duration: (10 + Math.floor(Math.random() * 7)) + "s",
    status: "COMPLETED",
    files: count,
  };
}

const DEFAULT_JOBS = [
  { id: "seed-0", name: "wells_permian_20260607",   details: "Wells, 312 records, CSV",          time: "Jun 07, 2026, 2:14 pm", duration: "18s", status: "COMPLETED", files: 3 },
  { id: "seed-1", name: "permits_midland_20260607",  details: "Permits, 87 records, CSV",         time: "Jun 07, 2026, 11:02 am", duration: "12s", status: "COMPLETED", files: 2 },
  { id: "seed-2", name: "prod_monthly_20260606",    details: "Production, 124 records, CSV",     time: "Jun 06, 2026, 4:51 pm", duration: "22s", status: "COMPLETED", files: 2 },
  { id: "seed-3", name: "rigs_active_20260605",     details: "Active Rigs, 14 records, SHP",     time: "Jun 05, 2026, 9:30 am", duration: "11s", status: "COMPLETED", files: 1 },
];

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "dotSize": 4,
  "density": 1,
  "labels": true,
  "grid": true,
  "token": ""
}/*EDITMODE-END*/;

// Make the first selected record match the reference screenshot, using a real
// data point so map highlighting stays consistent.
(function seedReference() {
  const d = window.STRIKE_DATA;
  const w = d.WELLS[0];
  Object.assign(w, {
    name: "BASHARA -D- 2", operator: "SAXET OIL CORPORATION", api: "42-495-00235",
    cat: "pa", type: "Plugged & Abandoned", status: "P & A", field: "COLBY",
    orientation: "Vertical", oilEUR: 16, be: null, tvd: 3508,
    lng: d.CENTER.lng + 0.02, lat: d.CENTER.lat + 0.01,
    files: [
      { name: "PLAT MAP", checked: true }, { name: "PLAT MAP", checked: true },
      { name: "PLAT MAP", checked: true }, { name: "APPLICATION FOR PERMIT TO DRILL", checked: true },
      { name: "DIRECTIONAL SURVEY CERTIFICATION", checked: true }, { name: "W 15 CEMENTING REPORT", checked: true },
      { name: "DIRECTIONAL SURVEY", checked: true }, { name: "COMPLETION REPORT", checked: true },
      { name: "P 16 ACREAGE DESIGNATION", checked: false }, { name: "W 15 CEMENTING REPORT", checked: false },
    ],
  });
})();

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const d = window.STRIKE_DATA;

  const [theme, setTheme] = React.useState(() => localStorage.getItem("strike_theme") || "dark");
  React.useEffect(() => { localStorage.setItem("strike_theme", theme); }, [theme]);

  const [layers, setLayers] = React.useState({ rigs: true, permits: true, wells: true, landtracLease: true, landtracUnit: true });
  const [layersOpen, setLayersOpen] = React.useState(true);
  const [legendOpen, setLegendOpen] = React.useState(false);

  // selected records collection (indices into WELLS)
  const initial = React.useMemo(() => {
    const ids = [0];
    const step = Math.floor(d.WELLS.length / 11);
    for (let i = 1; i <= 9; i++) ids.push(i * step + 3);
    return ids;
  }, []);
  const [recordIds, setRecordIds] = React.useState(initial);
  const [active, setActive] = React.useState(0);
  const [selSource, setSelSource] = React.useState("init");
  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);
  const [jobs, setJobs] = React.useState(DEFAULT_JOBS);
  const [dlOpen, setDlOpen] = React.useState(false);
  const [manageOpen, setManageOpen] = React.useState(false);

  const records = recordIds.map((i) => d.WELLS[i]);
  const selectedIdx = recordIds.length ? recordIds[active] : null;

  const flash = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2600);
  };

  const selectWell = React.useCallback((idx) => {
    setRecordIds((ids) => {
      const at = ids.indexOf(idx);
      if (at >= 0) { setActive(at); return ids; }
      let next = ids.concat(idx);
      if (next.length > 10) next = next.slice(next.length - 10);
      setActive(next.length - 1);
      return next;
    });
    setSelSource("map");
  }, []);

  const goTo = (i) => { setActive(i); setSelSource("record"); };
  const closeActive = () => {
    setRecordIds((ids) => {
      if (ids.length <= 1) return ids;
      const next = ids.filter((_, i) => i !== active);
      setActive((a) => Math.max(0, Math.min(a, next.length - 1)));
      return next;
    });
    setSelSource("record");
  };

  const doExport = (n) => {
    const count = n || (records[active] ? records[active].files.filter(f => f.checked).length + 2 : 0);
    const rec = records[active];
    flash("Exporting " + count + " file" + (count === 1 ? "" : "s") + " for " + (rec ? rec.name : "selection") + "…");
    setTimeout(() => {
      const job = makeJob(count, rec);
      setJobs(j => [job, ...j]);
      flash("Export complete · " + job.name + " ready in Downloads");
    }, 1400);
  };

  const renameJob = (id) => {
    const job = jobs.find(j => j.id === id);
    const v = window.prompt("Rename download", job ? job.name : "");
    if (v != null && v.trim()) setJobs(js => js.map(j => j.id === id ? Object.assign({}, j, { name: v.trim() }) : j));
  };

  const tweaks = { dotSize: t.dotSize, density: t.density, labels: t.labels, grid: t.grid };

  return React.createElement("div", { className: "strike " + (theme === "light" ? "light" : "dark"), style: { position: "fixed", inset: 0, display: "flex", flexDirection: "column", background: "var(--s-bg)" } },
    React.createElement(Header, { theme, onTheme: () => setTheme(th => th === "light" ? "dark" : "light"), jobs, dlOpen, setDlOpen, onManage: () => { setDlOpen(false); setManageOpen(true); }, onDeleteJob: (id) => setJobs(j => j.filter(x => x.id !== id)), onDownloadItem: (job) => flash("Downloading " + job.name + ".csv …"), onRenameJob: renameJob }),
    React.createElement("div", { style: { flex: 1, display: "flex", minHeight: 0 } },
      // map area
      React.createElement("div", { style: { position: "relative", flex: 1, minWidth: 0 } },
        React.createElement(MapView, { theme, layers, tweaks, token: (t.token || "").trim(), selectedIdx, selectSource: selSource, onSelect: selectWell }),
        React.createElement(LayersPanel, { open: layersOpen, onOpen: setLayersOpen, layers, setLayers }),
        React.createElement(Legend, { open: legendOpen, onOpen: setLegendOpen }),
        React.createElement(StatusPill, { layers }),
        React.createElement(Toast, { msg: toast })
      ),
      // record panel
      React.createElement("div", { style: { width: PANEL_W, flexShrink: 0 } },
        records.length
          ? React.createElement(RecordPanel, { records, activeIndex: active, onActive: goTo, onPrev: () => goTo(Math.max(0, active - 1)), onNext: () => goTo(Math.min(records.length - 1, active + 1)), onClose: closeActive, onExport: doExport, layers })
          : React.createElement("div", { style: { height: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: 30, textAlign: "center", color: "var(--s-muted)", background: "var(--s-panel)", borderLeft: "1px solid var(--s-line)", fontSize: 14 } }, "No records selected. Click a well on the map to inspect it.")
      )
    ),
    // tweaks
    React.createElement(TweaksPanel, null,
      React.createElement(TweakSection, { label: "Map display" }),
      React.createElement(TweakSlider, { label: "Well dot size", value: t.dotSize, min: 2, max: 8, step: 0.5, unit: "px", onChange: (v) => setTweak("dotSize", v) }),
      React.createElement(TweakSlider, { label: "Well density", value: Math.round(t.density * 100), min: 20, max: 100, step: 5, unit: "%", onChange: (v) => setTweak("density", v / 100) }),
      React.createElement(TweakToggle, { label: "Map labels", value: t.labels, onChange: (v) => setTweak("labels", v) }),
      React.createElement(TweakToggle, { label: "Survey grid", value: t.grid, onChange: (v) => setTweak("grid", v) }),
      React.createElement(TweakSection, { label: "Basemap" }),
      React.createElement(TweakText, { label: "Mapbox token", value: t.token, placeholder: "pk.… (optional — real Mapbox)", onChange: (v) => setTweak("token", v) })
    ),
    React.createElement(ManageDownloadsDialog, {
      jobs, open: manageOpen, onClose: () => setManageOpen(false),
      onDeleteJobs: (idArr) => setJobs(j => j.filter(x => idArr.indexOf(x.id) === -1)),
      onDownloadJobs: (idArr) => flash("Downloading " + idArr.length + " file" + (idArr.length === 1 ? "" : "s") + " …"),
      onClearAll: () => setJobs([]),
      onRenameJob: renameJob,
    })
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(React.createElement(App));
