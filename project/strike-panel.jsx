/* global React */
// Enverus STRIKE — right-hand "Selected Records" panel.
const { Icon, Button } = window;

function fmt(n) { return n == null ? "—" : n.toLocaleString("en-US"); }
function kindOf(w) {
  if (w.cat === "permit") return "Permit";
  if (w.cat === "rig") return "Well & Permit";
  return (w.files.length > 8 || w.orientation === "Horizontal") ? "Well & Permit" : "Well";
}

function Chip({ rec, active, onClick }) {
  const [hover, setHover] = React.useState(false);
  return React.createElement("button", {
    onClick, onMouseEnter: () => setHover(true), onMouseLeave: () => setHover(false),
    style: {
      flex: "0 0 auto", width: 118, textAlign: "left", cursor: "pointer",
      background: active ? "color-mix(in srgb, var(--primary) 16%, var(--s-card))" : "var(--s-chip)",
      border: "1px solid " + (active ? "var(--primary)" : hover ? "var(--s-line-strong)" : "var(--s-line)"),
      borderRadius: "var(--radius-md)", padding: "7px 10px", transition: "all .12s",
    },
  },
    React.createElement("div", { style: { fontSize: 11, fontWeight: 500, color: active ? "var(--primary)" : "var(--s-muted)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" } }, kindOf(rec)),
    React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--s-text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", marginTop: 2 } }, rec.api)
  );
}

function KpiTile({ value, label }) {
  return React.createElement("div", {
    style: { flex: 1, background: "var(--s-card)", border: "1px solid var(--s-line)", borderRadius: "var(--radius-lg)", padding: "16px 14px", textAlign: "center", minWidth: 0 },
  },
    React.createElement("div", { style: { fontSize: 26, fontWeight: 700, letterSpacing: "-0.5px", color: "var(--s-text)", lineHeight: 1.1 } }, value),
    React.createElement("div", { style: { fontSize: 11, fontWeight: 500, color: "var(--s-muted)", marginTop: 8, lineHeight: 1.35 } }, label)
  );
}

function FileRow({ name, checked, disabled, onToggle }) {
  return React.createElement("label", {
    style: { display: "flex", alignItems: "center", gap: 12, padding: "5px 0", cursor: disabled ? "default" : "pointer", opacity: disabled ? 0.42 : 1 },
    onClick: disabled ? undefined : onToggle,
  },
    React.createElement("span", {
      style: {
        width: 18, height: 18, borderRadius: 4, flexShrink: 0,
        background: checked ? "var(--primary)" : "transparent",
        border: "1.5px solid " + (checked ? "var(--primary)" : "var(--s-line-strong)"),
        display: "flex", alignItems: "center", justifyContent: "center",
      },
    }, checked ? React.createElement(Icon, { name: "check", size: 13, color: "#fff", strokeWidth: 3 }) : null),
    React.createElement("span", { style: { fontSize: 13.5, fontWeight: 500, letterSpacing: ".3px", color: "var(--s-text)" } }, name)
  );
}

function CsvRow({ title, desc, checked, onToggle }) {
  return React.createElement("label", { style: { display: "flex", gap: 12, cursor: "pointer", padding: "4px 0" }, onClick: onToggle },
    React.createElement("span", {
      style: {
        width: 18, height: 18, borderRadius: 4, flexShrink: 0, marginTop: 2,
        background: checked ? "var(--primary)" : "transparent",
        border: "1.5px solid " + (checked ? "var(--primary)" : "var(--s-line-strong)"),
        display: "flex", alignItems: "center", justifyContent: "center",
      },
    }, checked ? React.createElement(Icon, { name: "check", size: 13, color: "#fff", strokeWidth: 3 }) : null),
    React.createElement("div", null,
      React.createElement("div", { style: { fontSize: 15, fontWeight: 600, color: "var(--s-text)" } }, title),
      React.createElement("div", { style: { fontSize: 13, color: "var(--s-muted)", marginTop: 2 } }, desc)
    )
  );
}

const WELL_FILES = [
  { name: "APPLICATION FOR PERMIT TO DRILL",                  checked: true  },
  { name: "DIRECTIONAL SURVEY",                               checked: true  },
  { name: "P 4 CERT OF COMPLIANCE & TRANSPORTATION AUTHORITY", checked: true  },
  { name: "P 16 ACREAGE DESIGNATION",                        checked: true  },
  { name: "COMPLETION REPORT",                               checked: true  },
  { name: "W 15 CEMENTING REPORT",                           checked: true  },
  { name: "OTHER",                                           checked: true  },
  { name: "L 1 ELECTRIC LOG STATUS REPORT",                  checked: true  },
  { name: "W 15 CEMENTING REPORT",                           checked: false },
  { name: "CIRCULAR GRAPH",                                  checked: false },
  { name: "PLAT MAP",                                        checked: false },
  { name: "H 9 CERT OF COMPLIANCE FOR HYDROGEN SULFIDE",     checked: false },
  { name: "PLAT MAP",                                        checked: false },
  { name: "GROUNDWATER ADVISORY UNIT",                       checked: false },
  { name: "OTHER",                                           checked: false },
  { name: "DIRECTIONAL SURVEY",                              checked: false },
];

function RecordPanel(props) {
  const { records, activeIndex, onActive, onPrev, onNext, onClose, onExport, layers = {}, responsiveExportDialog = false } = props;
  const rec = records[activeIndex];
  const chipsRef = React.useRef(null);

  // Derive which data types are present in the selected records
  const d = window.STRIKE_DATA;
  const hasRigs    = records.some(r => r.cat === 'rig');
  const hasPermits = records.some(r => d.CATS[r.cat] && d.CATS[r.cat].layer === 'permits');
  const hasWells   = records.some(r => d.CATS[r.cat] && d.CATS[r.cat].layer === 'wells');
  const hasLandtracLease = !!layers.landtracLease;
  const hasLandtracUnit  = !!layers.landtracUnit;
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [filesOpen, setFilesOpen] = React.useState(true);
  const [fileState, setFileState] = React.useState({});
  const [csv, setCsv] = React.useState({
    header: true, monthly: true,
    rigsCSV: false, rigsSHP: false,
    permitsCSV: false, permitsSHP: false,
    wellHeaderCSV: true, wellDocuments: true, wellMonthlyCSV: true, wellsSHP: false,
    drillinginfoDRI: false, openworksOWX: false, geographixASCII4: false,
    landtracLeaseCSV: false, landtracLeaseSHP: false,
    landtracUnitCSV: false, landtracUnitSHP: false,
  });

  const checkedKey = (i) => "wf:" + i;
  const isChecked = (i) => { const k = checkedKey(i); return k in fileState ? fileState[k] : WELL_FILES[i].checked; };
  const checkedCount = WELL_FILES.filter((_, i) => isChecked(i)).length;

  React.useEffect(() => {
    // keep active chip in view
    const el = chipsRef.current && chipsRef.current.children[activeIndex];
    if (el && el.scrollIntoView) { /* avoid scrollIntoView per guidelines */ }
    if (chipsRef.current && el) {
      const c = chipsRef.current;
      const left = el.offsetLeft - c.offsetLeft;
      if (left < c.scrollLeft || left + el.offsetWidth > c.scrollLeft + c.clientWidth) {
        c.scrollLeft = left - 8;
      }
    }
  }, [activeIndex]);

  const kind = kindOf(rec);
  const field = rec.field || rec.name.split(" ")[0];
  const tog = (key) => setCsv(c => Object.assign({}, c, { [key]: !c[key] }));
  const exportTotal = checkedCount + Object.values(csv).filter(Boolean).length;

  return React.createElement("div", { style: { display: "flex", flexDirection: "column", height: "100%", background: "var(--s-panel)", borderLeft: "1px solid var(--s-line-strong)" } },
    // scroll region
    React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "18px 18px 8px" } },
      // header
      React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 14 } },
        React.createElement("span", { style: { fontSize: 12, fontWeight: 600, letterSpacing: "1.2px", color: "var(--s-muted)" } }, "SELECTED RECORDS"),
        React.createElement("span", { style: { fontSize: 13, color: "var(--s-muted)" } }, (activeIndex + 1) + " of " + records.length)
      ),
      // chips row
      React.createElement("div", { style: { display: "flex", alignItems: "stretch", gap: 8, marginBottom: 16 } },
        React.createElement("button", { onClick: onPrev, disabled: activeIndex === 0, style: navBtn(activeIndex === 0) }, React.createElement(Icon, { name: "arrow-left", size: 16 })),
        React.createElement("div", { ref: chipsRef, style: { display: "flex", gap: 8, overflowX: "auto", flex: 1, scrollbarWidth: "none", paddingBottom: 2 } },
          records.map((r, i) => React.createElement(Chip, { key: r.idx, rec: r, active: i === activeIndex, onClick: () => onActive(i) }))
        ),
        React.createElement("button", { onClick: onNext, disabled: activeIndex === records.length - 1, style: navBtn(activeIndex === records.length - 1) }, React.createElement(Icon, { name: "arrow-right", size: 16 }))
      ),
      // record card
      React.createElement("div", { style: { background: "var(--s-card)", border: "1px solid var(--s-line)", borderRadius: "var(--radius-lg)", padding: "16px 18px", marginBottom: 14 } },
        React.createElement("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 } },
          React.createElement("span", { style: { fontSize: 12, fontWeight: 600, letterSpacing: ".8px", color: "var(--s-muted)" } }, (kind + " (" + rec.orientation + ")").toUpperCase()),
          React.createElement("button", { onClick: onClose, title: "Remove from selection", style: { background: "none", border: "none", color: "var(--s-muted)", cursor: "pointer", padding: 2, display: "flex" } }, React.createElement(Icon, { name: "x", size: 17 }))
        ),
        React.createElement("div", { style: { fontSize: 21, fontWeight: 700, color: "var(--s-text)", letterSpacing: "-0.2px" } }, rec.name),
        React.createElement("div", { style: { fontSize: 14, color: "var(--s-text)", marginTop: 8 } }, rec.operator),
        React.createElement("div", { style: { fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--s-muted)", marginTop: 5 } }, rec.api + "  ·  " + rec.status + "  ·  " + field)
      ),
      // evaluate card
      React.createElement("div", { style: { background: "var(--s-card)", border: "1px solid var(--s-line)", borderLeft: "3px solid var(--primary)", borderRadius: "var(--radius-lg)", padding: "14px 18px", marginBottom: 16 } },
        React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: "var(--primary)", marginBottom: 12 } }, "Evaluate this well"),
        React.createElement(EvalLink, { label: "Analyze Performance" }),
        React.createElement("div", { style: { height: 1, background: "var(--s-line)", margin: "10px 0" } }),
        React.createElement(EvalLink, { label: "View Well Design" })
      ),
      // KPIs
      React.createElement("div", { style: { display: "flex", gap: 10, marginBottom: 4 } },
        React.createElement(KpiTile, { value: fmt(rec.oilEUR), label: "Oil EUR, WH (Mbbl)" }),
        React.createElement(KpiTile, { value: rec.be == null ? "—" : rec.be, label: "BE 20:1 WTI/NYMEX ($/bbl)" }),
        React.createElement(KpiTile, { value: fmt(rec.tvd), label: "True Vertical Depth (ft)" })
      )
    ),
    // Export Contents modal
    menuOpen ? React.createElement("div", {
      onClick: () => setMenuOpen(false),
      style: { position: "fixed", inset: 0, zIndex: 79, background: "transparent" },
    },
      React.createElement("div", {
        onClick: e => e.stopPropagation(),
        style: {
          position: "fixed", bottom: 76, right: 0, width: 380,
          height: responsiveExportDialog ? "auto" : "min(520px, calc(100vh - 120px))", maxHeight: "min(520px, calc(100vh - 120px))", display: "flex", flexDirection: "column",
          background: "var(--card)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
          boxShadow: "var(--shadow-overlay)", overflow: "hidden", zIndex: 80,
          animation: "s-popover-in 0.4s cubic-bezier(0.16,1,0.3,1)",
        },
      },
        // modal header
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: "1px solid var(--border)", flexShrink: 0 } },
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 18, fontWeight: 600, color: "var(--s-text)", letterSpacing: "-0.2px" } }, "Export Contents"),
          ),
          React.createElement("button", {
            onClick: () => setMenuOpen(false), title: "Close",
            style: { background: "none", border: "none", cursor: "pointer", color: "var(--s-muted)", display: "flex", padding: 4, borderRadius: "var(--radius-md)" },
          }, React.createElement(Icon, { name: "x", size: 20 }))
        ),
        // modal body
        React.createElement("div", { style: { flex: 1, minHeight: 0, overflowY: "auto", padding: "20px 22px" } },
          // Permits section
          hasPermits ? React.createElement("div", { style: { marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--s-line)" } },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 600, letterSpacing: "1px", color: "var(--s-muted)", textTransform: "uppercase", marginBottom: 10 } }, "Permits"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
              React.createElement(CsvRow, { title: "Permits CSV", desc: "Permit records and locations", checked: csv.permitsCSV, onToggle: () => tog("permitsCSV") }),
              React.createElement(CsvRow, { title: "Permits SHP", desc: "Shapefile for GIS applications", checked: csv.permitsSHP, onToggle: () => tog("permitsSHP") })
            )
          ) : null,
          // Wells section
          hasWells ? React.createElement("div", { style: { marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--s-line)" } },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 600, letterSpacing: "1px", color: "var(--s-muted)", textTransform: "uppercase", marginBottom: 10 } }, "Wells"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
              React.createElement(CsvRow, { title: "Well Header CSV", desc: "Location, operator, cum volumes, etc.", checked: csv.wellHeaderCSV, onToggle: () => tog("wellHeaderCSV") }),
              React.createElement(CsvRow, { title: "Well Documents", desc: "Raw documents for this well", checked: csv.wellDocuments, onToggle: () => tog("wellDocuments") }),
              React.createElement(CsvRow, { title: "Well Monthly Production CSV", desc: "Time-series production volumes", checked: csv.wellMonthlyCSV, onToggle: () => tog("wellMonthlyCSV") }),
              React.createElement(CsvRow, { title: "Wells SHP", desc: "Shapefile for GIS applications", checked: csv.wellsSHP, onToggle: () => tog("wellsSHP") }),
              React.createElement(CsvRow, { title: "Drillinginfo DRI", desc: "DrillingInfo native format", checked: csv.drillinginfoDRI, onToggle: () => tog("drillinginfoDRI") }),
              React.createElement(CsvRow, { title: "Openworks OWX", desc: "Openworks exchange format", checked: csv.openworksOWX, onToggle: () => tog("openworksOWX") }),
              React.createElement(CsvRow, { title: "GeoGraphix ASCII4", desc: "GeoGraphix ASCII4 format", checked: csv.geographixASCII4, onToggle: () => tog("geographixASCII4") })
            )
          ) : null,
          // Landtrac Lease section
          hasLandtracLease ? React.createElement("div", { style: { marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--s-line)" } },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 600, letterSpacing: "1px", color: "var(--s-muted)", textTransform: "uppercase", marginBottom: 10 } }, "Landtrac Lease"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
              React.createElement(CsvRow, { title: "Landtrac Lease CSV", desc: "Lease records and attributes", checked: csv.landtracLeaseCSV, onToggle: () => tog("landtracLeaseCSV") }),
              React.createElement(CsvRow, { title: "Landtrac Lease SHP", desc: "Shapefile for GIS applications", checked: csv.landtracLeaseSHP, onToggle: () => tog("landtracLeaseSHP") })
            )
          ) : null,
          // Landtrac Unit section
          hasLandtracUnit ? React.createElement("div", { style: { marginTop: 18, paddingTop: 18, borderTop: "1px solid var(--s-line)" } },
            React.createElement("div", { style: { fontSize: 11, fontWeight: 600, letterSpacing: "1px", color: "var(--s-muted)", textTransform: "uppercase", marginBottom: 10 } }, "Landtrac Unit"),
            React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 10 } },
              React.createElement(CsvRow, { title: "Landtrac Unit CSV", desc: "Unit records and attributes", checked: csv.landtracUnitCSV, onToggle: () => tog("landtracUnitCSV") }),
              React.createElement(CsvRow, { title: "Landtrac Unit SHP", desc: "Shapefile for GIS applications", checked: csv.landtracUnitSHP, onToggle: () => tog("landtracUnitSHP") })
            )
          ) : null
        ),
        // modal footer
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, padding: "14px 22px", borderTop: "1px solid var(--border)", flexShrink: 0 } },
          React.createElement("button", {
            onClick: () => setMenuOpen(false),
            style: { height: 36, padding: "0 16px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, fontFamily: "var(--font-sans)", cursor: "pointer", border: "1px solid var(--s-line-strong)", background: "transparent", color: "var(--s-text)" },
            onMouseEnter: e => e.currentTarget.style.background = "var(--s-chip)",
            onMouseLeave: e => e.currentTarget.style.background = "transparent",
          }, "Cancel"),
          React.createElement("button", {
            onClick: () => { setMenuOpen(false); onExport(exportTotal); },
            style: { height: 36, padding: "0 18px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 600, fontFamily: "var(--font-sans)", cursor: "pointer", border: "none", background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", gap: 7 },
            onMouseEnter: e => e.currentTarget.style.background = "var(--primary-hover)",
            onMouseLeave: e => e.currentTarget.style.background = "var(--primary)",
          }, React.createElement(Icon, { name: "download", size: 15 }), "Export " + exportTotal + " item" + (exportTotal === 1 ? "" : "s"))
        )
      )
    ) : null,
    // footer export bar
    React.createElement("div", { style: { padding: 14, borderTop: "1px solid var(--s-line)", background: "var(--s-panel)" } },
      React.createElement("button", {
        onClick: () => setMenuOpen(o => !o),
        style: { width: "100%", height: 48, background: "var(--primary)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, fontFamily: "var(--font-sans)" },
        onMouseEnter: e => e.currentTarget.style.background = "var(--primary-hover)",
        onMouseLeave: e => e.currentTarget.style.background = "var(--primary)",
      }, React.createElement(Icon, { name: "download", size: 18 }), "Export...")
    )
  );
}

function EvalLink({ label }) {
  const [h, setH] = React.useState(false);
  return React.createElement("div", {
    onMouseEnter: () => setH(true), onMouseLeave: () => setH(false),
    style: { display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", color: h ? "var(--primary)" : "var(--s-text)", transition: "color .12s" },
  },
    React.createElement("span", { style: { fontSize: 15, fontWeight: 500 } }, label),
    React.createElement(Icon, { name: "chevron-right", size: 17, color: h ? "var(--primary)" : "var(--s-muted)" })
  );
}

function navBtn(disabled) {
  return {
    width: 34, flexShrink: 0, background: "var(--s-chip)", border: "1px solid var(--s-line)",
    borderRadius: "var(--radius-md)", color: disabled ? "var(--s-faint)" : "var(--s-text)",
    cursor: disabled ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center",
    opacity: disabled ? 0.5 : 1,
  };
}

window.RecordPanel = RecordPanel;
