/* global React */
// Enverus STRIKE — chrome: header, layers panel, legend, status pill, toast.
const { Icon: CIcon } = window;

function LeafMark({ size = 18 }) {
  return React.createElement("svg", { width: size * (21 / 17), height: size, viewBox: "0 0 21 17", fill: "none", style: { display: "block" } },
    React.createElement("path", { d: "M4.15775 15.9591H9.40602L9.40605 13.14H4.15775V15.9591Z", fill: "#A0EF6E" }),
    React.createElement("path", { d: "M0 9.29H3.4978V6.45H0V9.29Z", fill: "#A0EF6E" }),
    React.createElement("path", { d: "M5.90822 9.29H20.54V6.45H5.90822V9.29Z", fill: "#56BC2F" })
  );
}

// Integrated ENVERUS wordmark: the green leaf forms the "E"; the remaining
// letters use currentColor (white in dark theme, dark ink in light theme).
function EnverusWordmark({ height = 18 }) {
  const letters = [
    "M23.0012 15.9591V0.159084H26.4739L33.0704 10.2405H33.127V0.159084H36.3388V15.9591H33.127L26.2445 5.78916H26.1848V15.9591H23.0012Z",
    "M43.7398 15.9591L38.3187 0.159084H41.8479L45.4306 11.3396H45.4903L49.2175 0.159084H52.4859L47.0365 15.9591H43.7398Z",
    "M54.4657 15.9591V0.159084H65.2231V3.08H57.9353V6.45H65.022V9.29H57.9353V13.14H65.6222V15.9591H54.4657Z",
    "M71.3891 7.28291H73.7681C74.2552 7.28291 74.714 7.25463 75.088 7.16666C75.462 7.08184 75.7763 6.96559 76.0057 6.79279C76.2351 6.61999 76.4362 6.39064 76.5493 6.10474C76.6656 5.81884 76.7222 5.50152 76.7222 5.10252C76.7222 4.32964 76.4928 3.78297 76.0057 3.44051C75.5186 3.12634 74.7737 2.95354 73.7681 2.95354H71.3891V7.28291ZM67.9761 15.9591V0.155184H73.9126C74.8869 0.155184 75.748 0.226477 76.5242 0.399274C77.3004 0.572072 77.929 0.857974 78.4758 1.26012C79.0195 1.66227 79.4218 2.14924 79.7077 2.78074C79.9937 3.41224 80.1383 4.15684 80.1383 5.01769C80.1383 5.64918 80.0534 6.19271 79.9089 6.67969C79.7643 7.16666 79.5632 7.59709 79.2772 7.97096C78.9912 8.34483 78.6455 8.65901 78.2433 8.91663C77.841 9.17426 77.3822 9.37533 76.8385 9.54813L80.3363 15.9591H76.6656L73.3972 10.0068H71.3891V15.9591H67.9761Z",
    "M85.8737 15.5279C85.0692 15.2461 84.4123 14.8219 83.8938 14.2832C83.3784 13.7475 82.9761 13.0973 82.7184 12.3326C82.4607 11.5678 82.3445 10.6947 82.3445 9.75962V0.155151H85.814V9.67602C85.814 10.2426 85.8705 10.7504 85.9868 11.1746C86.1031 11.5988 86.2728 11.9951 86.5022 12.2768C86.7316 12.5865 87.0459 12.8125 87.4199 12.9549C87.7939 13.0973 88.2527 13.1809 88.7681 13.1809C89.802 13.1809 90.5186 12.8713 90.9774 12.2768C91.4362 11.6824 91.6656 10.8061 91.6656 9.67602V0.155151H95.0786V9.73485C95.0786 10.6947 94.9623 11.543 94.7046 12.3357C94.4469 13.0973 94.0729 13.7475 93.5575 14.2863C93.0421 14.8219 92.3822 15.2461 91.5777 15.531C90.7731 15.8127 89.8272 15.9552 88.7367 15.9552C87.621 15.949 86.6751 15.8096 85.8737 15.5279Z",
    "M103.683 15.9552C102.822 15.9552 102.049 15.8736 101.361 15.6804C100.673 15.4871 100.041 15.2395 99.4972 14.9073C98.9535 14.5751 98.4633 14.1916 98.0359 13.7235C97.6053 13.2554 97.2628 12.7601 96.9736 12.2347L99.6135 10.7459C99.8429 11.1596 100.101 11.519 100.387 11.8481C100.701 12.1803 101.018 12.4279 101.389 12.6484C101.763 12.8689 102.134 13.0349 102.564 13.1437C102.995 13.2554 103.426 13.3098 103.884 13.3098C104.287 13.3098 104.657 13.2826 105.003 13.198C105.349 13.1165 105.635 13.0319 105.864 12.8658C106.094 12.7269 106.295 12.5336 106.439 12.3132C106.584 12.0927 106.641 11.8451 106.641 11.5401C106.641 11.2653 106.584 11.0177 106.439 10.7972C106.295 10.5768 106.094 10.4107 105.836 10.2174C105.578 10.0513 105.233 9.88521 104.833 9.74932C104.431 9.6104 103.972 9.47451 103.457 9.3356C102.998 9.19668 102.511 9.08797 102.052 8.94905C101.593 8.81014 101.135 8.67424 100.704 8.50815C100.273 8.34206 99.8712 8.14879 99.5003 7.92833C99.1264 7.70788 98.8121 7.46025 98.5544 7.15524C98.2967 6.85326 98.0673 6.49389 97.9227 6.10735C97.7782 5.7208 97.6933 5.25272 97.6933 4.7031C97.6933 3.98739 97.8379 3.35322 98.0956 2.80058C98.3816 2.24794 98.7555 1.77986 99.2709 1.36614C99.758 0.979596 100.361 0.677608 101.078 0.457157C101.766 0.236706 102.539 0.155169 103.4 0.155169C104.205 0.155169 104.95 0.236705 105.581 0.402799C106.241 0.568892 106.813 0.816522 107.332 1.09133C107.85 1.36614 108.306 1.69833 108.68 2.08487C109.054 2.47142 109.397 2.85796 109.683 3.26866L107.272 5.03227C107.071 4.70008 106.813 4.42528 106.527 4.15047C106.241 3.87566 105.924 3.65521 105.581 3.46193C105.236 3.26866 104.893 3.12975 104.519 3.02103C104.145 2.9093 103.774 2.85494 103.372 2.85494C102.627 2.85494 102.08 2.99385 101.681 3.26866C101.279 3.54347 101.078 3.90284 101.078 4.37092C101.078 4.67291 101.135 4.92356 101.279 5.14401C101.424 5.36446 101.625 5.55773 101.911 5.72382C102.197 5.88992 102.542 6.02581 102.945 6.16473C103.347 6.30364 103.806 6.43953 104.321 6.57845C104.78 6.69018 105.239 6.82608 105.698 6.96499C106.157 7.10391 106.615 7.2398 107.018 7.43307C107.448 7.59917 107.85 7.81962 108.193 8.04007C108.567 8.26052 108.881 8.53533 109.139 8.84034C109.397 9.14232 109.626 9.50169 109.771 9.91541C109.915 10.3291 110 10.77 110 11.2925C110 11.8995 109.884 12.4763 109.626 13.0561C109.368 13.6087 108.994 14.104 108.479 14.5177C107.964 14.9586 107.304 15.2908 106.527 15.5384C105.72 15.8163 104.774 15.9552 103.683 15.9552Z",
    "M20.5374 9.29V6.45H12.8787V3.08H20.5374V0.159084H9.40605V13.14H12.8756V9.29H20.5374ZM12.8787 15.9591H20.5374V13.14H12.8787V15.9591Z",
  ];
  return React.createElement("svg", { width: height * (110 / 17), height, viewBox: "0 0 110 17", fill: "none", style: { display: "block", color: "var(--s-text)" } },
    letters.map((d, i) => React.createElement("path", { key: i, fillRule: "evenodd", clipRule: "evenodd", d, fill: "currentColor" })),
    React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M4.15775 15.9591H9.40602L9.40605 13.14H4.15775V15.9591Z", fill: "#A0EF6E" }),
    React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M0 9.29H3.4978V6.45H0V9.29Z", fill: "#A0EF6E" }),
    React.createElement("path", { fillRule: "evenodd", clipRule: "evenodd", d: "M5.90822 9.29H20.54V6.45H5.90822V9.29Z", fill: "#56BC2F" })
  );
}

function Toggle({ on, onChange }) {
  return React.createElement("button", {
    onClick: (e) => { e.stopPropagation(); onChange(!on); },
    style: {
      width: 38, height: 21, borderRadius: 999, border: "none", cursor: "pointer", padding: 2,
      background: on ? "var(--primary)" : "var(--s-line-strong)", transition: "background .15s", flexShrink: 0,
      display: "flex", justifyContent: on ? "flex-end" : "flex-start", alignItems: "center",
    },
  }, React.createElement("span", { style: { width: 17, height: 17, borderRadius: "50%", background: "#fff", display: "block" } }));
}

function Header({ theme, onTheme, jobs, dlOpen, setDlOpen, onManage, onDeleteJob, onDownloadItem, onRenameJob }) {
  const dark = theme !== "light";
  const count = jobs.length;
  const iconBtn = { width: 38, height: 38, borderRadius: 8, background: "transparent", border: "none", cursor: "pointer", color: "var(--s-text)", display: "flex", alignItems: "center", justifyContent: "center" };
  return React.createElement("header", {
    style: {
      height: 60, flexShrink: 0, background: "var(--s-header)", borderBottom: "1px solid var(--s-line-strong)",
      display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 22px", position: "relative", zIndex: 60,
    },
  },
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 13 } },
      React.createElement(EnverusWordmark, { height: 17 }),
      React.createElement("span", { style: { width: 1, height: 20, background: "var(--foreground)", margin: "0 2px" } }),
      React.createElement("span", { style: { fontSize: 19, fontWeight: 500, letterSpacing: "1px", color: "var(--s-text)" } }, "STRIKE")
    ),
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6 } },
      React.createElement("button", {
        title: count > 0 ? count + " download" + (count === 1 ? "" : "s") + " available" : "Downloads",
        onClick: () => setDlOpen(!dlOpen), style: Object.assign({ position: "relative", background: dlOpen ? "var(--s-chip)" : "transparent" }, iconBtn),
        onMouseEnter: e => e.currentTarget.style.background = "var(--s-chip)", onMouseLeave: e => e.currentTarget.style.background = dlOpen ? "var(--s-chip)" : "transparent",
      },
        React.createElement(CIcon, { name: "download", size: 19 }),
        count > 0 ? React.createElement("span", {
          style: {
            position: "absolute", top: 3, right: 1, minWidth: 17, height: 17, padding: "0 4px",
            borderRadius: 999, background: "var(--primary)", color: "#fff", fontSize: 10.5, fontWeight: 700,
            lineHeight: 1, display: "flex", alignItems: "center", justifyContent: "center",
            border: "2px solid var(--s-header)", boxSizing: "content-box",
          },
        }, count > 99 ? "99+" : count) : null
      ),
      React.createElement("button", { title: "Toggle theme", onClick: onTheme, style: iconBtn,
        onMouseEnter: e => e.currentTarget.style.background = "var(--s-chip)", onMouseLeave: e => e.currentTarget.style.background = "transparent" },
        React.createElement(CIcon, { name: dark ? "moon" : "sun", size: 19 })),
      React.createElement("div", { style: { width: 38, height: 38, borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, marginLeft: 6 } }, "JS")
    ),
    dlOpen ? React.createElement(DownloadsMenu, { jobs, onClose: () => setDlOpen(false), onManage, onDeleteJob, onDownloadItem, onRenameJob }) : null
  );
}

function DLField({ label, children }) {
  return React.createElement("div", { style: { display: "flex", gap: 8, fontSize: 13, lineHeight: 1.55 } },
    React.createElement("span", { style: { fontWeight: 700, color: "var(--s-text)", minWidth: 58, flexShrink: 0 } }, label),
    React.createElement("span", { style: { color: "var(--s-text)", display: "flex", alignItems: "center", gap: 6 } }, children)
  );
}

function DLButton({ variant, icon, children, onClick }) {
  const [h, setH] = React.useState(false);
  const base = { height: 28, padding: "0 11px", borderRadius: "var(--radius-md)", fontSize: 13, fontWeight: 500, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-sans)", transition: "background .12s, border-color .12s" };
  const v = variant === "primary"
    ? { background: h ? "var(--primary-hover)" : "var(--primary)", color: "#fff", border: "1px solid transparent" }
    : { background: h ? "var(--s-chip)" : "transparent", color: "var(--s-text)", border: "1px solid var(--s-line-strong)" };
  return React.createElement("button", { onClick, onMouseEnter: () => setH(true), onMouseLeave: () => setH(false), style: Object.assign({}, base, v) },
    icon ? React.createElement(CIcon, { name: icon, size: 14 }) : null, children);
}

function DLItem({ job, onDelete, onDownload, onRename }) {
  return React.createElement("div", { style: { position: "relative", padding: "14px 18px" } },
    React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 1 } },
      React.createElement(DLField, { label: "Name:" },
        React.createElement("span", null, job.name),
        React.createElement("button", { title: "Rename", onClick: onRename, style: { background: "none", border: "none", cursor: "pointer", color: "var(--s-muted)", display: "flex", padding: 2 } }, React.createElement(CIcon, { name: "pencil", size: 13 }))
      ),
      React.createElement(DLField, { label: "Details:" }, job.details),
      React.createElement(DLField, { label: "Time:" }, job.time),
      React.createElement(DLField, { label: "Duration:" }, job.duration),
      React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginTop: 1 } },
        React.createElement(DLField, { label: "Status:" }, React.createElement("span", { style: { color: "var(--primary)", fontWeight: 700, letterSpacing: ".3px" } }, job.status)),
        React.createElement("div", { style: { display: "flex", gap: 8, flexShrink: 0 } },
          React.createElement(DLButton, { variant: "secondary", onClick: onDelete }, "Delete"),
          React.createElement(DLButton, { variant: "primary", icon: "download", onClick: onDownload }, "Download")
        )
      )
    )
  );
}

function DownloadsMenu({ jobs, onClose, onManage, onDeleteJob, onDownloadItem, onRenameJob }) {
  return React.createElement(React.Fragment, null,
    React.createElement("div", { onClick: onClose, style: { position: "fixed", inset: 0, zIndex: 64 } }),
    React.createElement("div", {
      style: {
        position: "absolute", top: 54, right: 50, width: 392, maxHeight: "78vh", overflowY: "auto", zIndex: 65,
        background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, boxShadow: "var(--shadow-overlay)",
      },
    },
      React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", borderBottom: "1px solid var(--border)", position: "sticky", top: 0, background: "var(--card)", zIndex: 1 } },
        React.createElement("span", { style: { fontSize: 16, fontWeight: 700, color: "var(--s-text)" } }, "Downloaded Files"),
        jobs.length ? React.createElement(DLButton, { variant: "secondary", icon: "settings-2", onClick: onManage }, "Manage Exports") : null
      ),
      jobs.length
        ? React.createElement("div", { role: "list" }, jobs.map((job, i) => React.createElement("div", { key: job.id, style: { borderBottom: i === jobs.length - 1 ? "none" : "1px solid var(--border)" } },
            React.createElement(DLItem, { job, onDelete: () => onDeleteJob(job.id), onDownload: () => onDownloadItem(job), onRename: () => onRenameJob(job.id) })
          )))
        : React.createElement("div", { style: { padding: "34px 18px", textAlign: "center", color: "var(--s-muted)", fontSize: 14 } },
            React.createElement(CIcon, { name: "download", size: 26, color: "var(--s-faint)", style: { margin: "0 auto 10px" } }),
            "No downloads yet. Use ", React.createElement("b", { style: { color: "var(--s-text)" } }, "Export..."), " to queue files.")
    )
  );
}

function LayerRow({ icon, label, on, onToggle, filtered, isAll }) {
  return React.createElement("div", {
    style: {
      display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
      background: isAll ? "var(--s-chip)" : "transparent", borderRadius: 8,
      border: isAll ? "1px solid var(--border)" : "1px solid transparent",
    },
  },
    isAll
      ? React.createElement("span", { style: { width: 22, height: 22, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 } }, React.createElement(CIcon, { name: "globe", size: 14, color: "#fff" }))
      : React.createElement(CIcon, { name: "grip-vertical", size: 15, color: "var(--s-faint)", style: { cursor: "grab" } }),
    React.createElement("span", { style: { flex: 1, fontSize: 14.5, fontWeight: 500, color: "var(--s-text)" } }, label),
    filtered ? React.createElement(React.Fragment, null,
      React.createElement(CIcon, { name: "filter", size: 14, color: "var(--primary)" }),
      React.createElement("button", { title: "Clear filter", style: { background: "none", border: "none", cursor: "pointer", color: "var(--s-muted)", display: "flex", padding: 0 } }, React.createElement(CIcon, { name: "x", size: 15 }))
    ) : null,
    isAll ? null : React.createElement(Toggle, { on, onChange: onToggle }),
    React.createElement(CIcon, { name: "chevron-down", size: 17, color: "var(--s-muted)" })
  );
}

function WellsExpandable() {
  const [expanded, setExpanded] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("FILTERS");
  const [search, setSearch] = React.useState("");
  const d = window.STRIKE_DATA;
  const wells = d.WELLS || [];
  const wellsByAPI = wells.reduce((acc, w) => {
    const api = (w.api || "").split("-").slice(0, 2).join("-");
    if (!acc[api]) acc[api] = [];
    acc[api].push(w);
    return acc;
  }, {});
  const apiList = Object.keys(wellsByAPI).sort();
  const filtered = search ? apiList.filter(api => api.includes(search.toUpperCase())) : apiList;
  const well_name = wells[0]?.name || "";
  const well_status = wells[0]?.status || "";
  return React.createElement("div", { style: { marginBottom: 12 } },
    React.createElement("button", {
      onClick: () => setExpanded(!expanded),
      style: {
        width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8,
        padding: "8px 12px", background: "transparent", border: "1px solid var(--s-line)", borderRadius: "var(--radius-md)",
        cursor: "pointer", color: "var(--s-text)", fontSize: 14, fontWeight: 600, transition: "all .2s",
      },
      onMouseEnter: e => e.currentTarget.style.background = "var(--s-chip)",
      onMouseLeave: e => e.currentTarget.style.background = "transparent",
    },
      React.createElement("span", { style: { display: "flex", alignItems: "center", gap: 6 } },
        React.createElement(CIcon, { name: "info", size: 16 }),
        "Wells"
      ),
      React.createElement(CIcon, { name: expanded ? "chevron-up" : "chevron-down", size: 16 })
    ),
    expanded ? React.createElement("div", { style: { marginTop: 8, padding: "12px", background: "var(--s-chip)", borderRadius: "var(--radius-md)", fontSize: 12 } },
      React.createElement("div", { style: { display: "flex", gap: 4, marginBottom: 12, borderBottom: "1px solid var(--s-line)" } },
        ["FILTERS", "STYLES", "LABELS"].map(tab => React.createElement("button", {
          key: tab,
          onClick: () => setActiveTab(tab),
          style: {
            padding: "6px 10px", background: "transparent", border: "none", cursor: "pointer",
            color: activeTab === tab ? "var(--primary)" : "var(--s-muted)",
            borderBottom: activeTab === tab ? "2px solid var(--primary)" : "none",
            fontSize: 11, fontWeight: 600, letterSpacing: ".5px",
          },
        }, tab))
      ),
      activeTab === "FILTERS" ? React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 8 } },
        React.createElement("div", null,
          React.createElement("label", { style: { display: "block", fontSize: 11, fontWeight: 600, color: "var(--s-muted)", marginBottom: 4 } }, "ENV Operator"),
          React.createElement("div", { style: { padding: "6px 8px", background: "var(--s-card)", borderRadius: "var(--radius-sm)", fontSize: 12, color: "var(--s-text)" } }, "Chevron USA")
        ),
        React.createElement("div", null,
          React.createElement("label", { style: { display: "block", fontSize: 11, fontWeight: 600, color: "var(--s-muted)", marginBottom: 4 } }, "API / UWI"),
          React.createElement("input", {
            type: "text", placeholder: "Search...", value: search, onChange: (e) => setSearch(e.target.value),
            style: {
              width: "100%", boxSizing: "border-box", padding: "6px 8px", background: "var(--s-card)",
              border: "1px solid var(--s-line)", borderRadius: "var(--radius-sm)", fontSize: 12, color: "var(--s-text)",
            },
          }),
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--s-muted)", marginTop: 6, marginBottom: 8 } },
            React.createElement("span", null, "A-Z"),
            React.createElement(CIcon, { name: "arrow-right", size: 12 }),
            React.createElement("span", null, "Count")
          ),
          React.createElement("div", { style: { maxHeight: 200, overflowY: "auto", display: "flex", flexDirection: "column", gap: 4 } },
            filtered.slice(0, 20).map(api => React.createElement("label", {
              key: api,
              style: { display: "flex", alignItems: "center", gap: 6, padding: "4px 6px", cursor: "pointer", borderRadius: "var(--radius-sm)", transition: "background .1s" },
              onMouseEnter: e => e.currentTarget.style.background = "var(--s-line)",
              onMouseLeave: e => e.currentTarget.style.background = "transparent",
            },
              React.createElement("input", { type: "checkbox", defaultChecked: true, style: { width: 14, height: 14, cursor: "pointer" } }),
              React.createElement("span", { style: { fontSize: 12, color: "var(--s-text)", flex: 1 } }, api),
              React.createElement("span", { style: { fontSize: 11, color: "var(--s-muted)" } }, wellsByAPI[api].length)
            ))
          )
        ),
        React.createElement("button", {
          style: {
            width: "100%", padding: "6px", background: "transparent", border: "1px solid var(--s-line)",
            borderRadius: "var(--radius-sm)", color: "var(--s-text)", fontSize: 11, fontWeight: 600,
            cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 4,
          },
        },
          React.createElement(CIcon, { name: "sliders", size: 12 }),
          "Customize Filters"
        )
      ) : React.createElement("div", { style: { padding: "8px", color: "var(--s-muted)", fontSize: 11, textAlign: "center" } }, activeTab + " (coming soon)")
    ) : null
  );
}

function LayersPanel({ open, onOpen, layers, setLayers }) {
  return React.createElement("div", { style: { position: "absolute", top: 16, left: 16, zIndex: 40 } },
    React.createElement("button", {
      onClick: () => onOpen(!open),
      style: {
        display: "flex", alignItems: "center", gap: 9, height: 42, padding: "0 18px 0 16px", borderRadius: 10,
        background: "var(--card)", border: "1px solid var(--border)", color: "var(--s-text)", cursor: "pointer",
        fontSize: 15, fontWeight: 500, boxShadow: "var(--shadow-soft)",
      },
    }, React.createElement(CIcon, { name: "layers", size: 18 }), "Layers"),
    open ? React.createElement("div", {
      style: {
        marginTop: 10, width: 320, background: "var(--card)", border: "1px solid var(--border)",
        borderRadius: 12, boxShadow: "var(--shadow-overlay)", padding: 14,
      },
    },
      React.createElement("div", { style: { fontSize: 12, fontWeight: 600, letterSpacing: "1.2px", color: "var(--s-muted)", padding: "2px 4px 12px" } }, "LAYERS"),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 4 } },
        React.createElement(LayerRow, { isAll: true, label: "All Layers" }),
        React.createElement(LayerRow, { label: "Active Rigs", on: layers.rigs, onToggle: (v) => setLayers(l => Object.assign({}, l, { rigs: v })) }),
        React.createElement(LayerRow, { label: "Permits", filtered: true, on: layers.permits, onToggle: (v) => setLayers(l => Object.assign({}, l, { permits: v })) }),
        React.createElement(WellsExpandable),
        React.createElement(LayerRow, { label: "Landtrac Lease", on: layers.landtracLease, onToggle: (v) => setLayers(l => Object.assign({}, l, { landtracLease: v })) }),
        React.createElement(LayerRow, { label: "Landtrac Unit", on: layers.landtracUnit, onToggle: (v) => setLayers(l => Object.assign({}, l, { landtracUnit: v })) })
      )
    ) : null
  );
}

function Legend({ open, onOpen }) {
  const d = window.STRIKE_DATA;
  return React.createElement("div", { style: { position: "absolute", bottom: 18, left: 16, zIndex: 40 } },
    open ? React.createElement("div", {
      style: { marginBottom: 10, width: 240, background: "var(--card)", border: "1px solid var(--border)", borderRadius: 12, boxShadow: "var(--shadow-overlay)", padding: 14 },
    },
      React.createElement("div", { style: { fontSize: 12, fontWeight: 600, letterSpacing: "1.2px", color: "var(--s-muted)", marginBottom: 10 } }, "LEGEND"),
      React.createElement("div", { style: { display: "flex", flexDirection: "column", gap: 9 } },
        d.CAT_KEYS.map((k) => React.createElement("div", { key: k, style: { display: "flex", alignItems: "center", gap: 10 } },
          React.createElement("span", { style: { width: 12, height: 12, borderRadius: "50%", background: d.CATS[k].color, flexShrink: 0, boxShadow: k === "rig" ? "0 0 0 2px color-mix(in srgb, " + d.CATS[k].color + " 40%, transparent)" : "none" } }),
          React.createElement("span", { style: { fontSize: 13.5, color: "var(--s-text)" } }, d.CATS[k].label)
        ))
      )
    ) : null,
    React.createElement("button", {
      onClick: () => onOpen(!open),
      style: { display: "flex", alignItems: "center", gap: 9, height: 42, padding: "0 18px 0 16px", borderRadius: 10, background: "var(--card)", border: "1px solid var(--border)", color: "var(--s-text)", cursor: "pointer", fontSize: 15, fontWeight: 500, boxShadow: "var(--shadow-soft)" },
    }, React.createElement(CIcon, { name: "list", size: 18 }), "Legend")
  );
}

function StatusPill({ layers }) {
  const c = window.STRIKE_DATA.counts;
  const wellsLabel = c.wells >= 1000 ? (c.wells / 1000).toFixed(1).replace(/\.0$/, "") + "k" : c.wells;
  const seg = (active, value, unit) => React.createElement("span", { style: { color: active ? "var(--s-text)" : "var(--s-faint)", opacity: active ? 1 : 0.6 } },
    React.createElement("b", { style: { fontWeight: 700 } }, value), " ", unit);
  return React.createElement("div", {
    style: {
      position: "absolute", bottom: 22, left: "50%", transform: "translateX(-50%)", zIndex: 30,
      display: "flex", alignItems: "center", gap: 14, padding: "10px 22px", borderRadius: 999,
      background: "var(--card)", border: "1px solid var(--border)", boxShadow: "var(--shadow-soft)",
      fontSize: 14.5, whiteSpace: "nowrap",
    },
  },
    seg(layers.rigs, c.rigs, "Active Rigs"),
    React.createElement("span", { style: { color: "var(--s-line-strong)" } }, "|"),
    seg(layers.permits, c.permits, "Permits"),
    React.createElement("span", { style: { color: "var(--s-line-strong)" } }, "|"),
    seg(layers.wells, wellsLabel, "Wells (Distinct API/UWI)")
  );
}

function Toast({ msg }) {
  if (!msg) return null;
  return React.createElement("div", {
    style: {
      position: "absolute", top: 74, right: 388, zIndex: 80, background: "var(--card)", color: "var(--s-text)",
      border: "1px solid var(--border)", borderLeft: "3px solid var(--primary)", borderRadius: 8, padding: "12px 18px", fontSize: 14,
      boxShadow: "var(--shadow-overlay)", maxWidth: 320,
    },
  }, msg);
}

function MgChk({ on, onClick, indeterminate }) {
  return React.createElement("button", {
    onClick: (e) => { e.stopPropagation(); onClick(); },
    style: {
      width: 18, height: 18, borderRadius: 4, flexShrink: 0, cursor: "pointer", padding: 0,
      background: on || indeterminate ? "var(--primary)" : "transparent",
      border: "1.5px solid " + (on || indeterminate ? "var(--primary)" : "var(--s-line-strong)"),
      display: "flex", alignItems: "center", justifyContent: "center",
    },
  }, on ? React.createElement(CIcon, { name: "check", size: 12, color: "#fff", strokeWidth: 3 })
       : indeterminate ? React.createElement("span", { style: { width: 9, height: 2, background: "#fff", borderRadius: 1 } }) : null);
}

function MgIconBtn({ icon, title, danger, onClick }) {
  const [h, setH] = React.useState(false);
  return React.createElement("button", {
    title, onClick, onMouseEnter: () => setH(true), onMouseLeave: () => setH(false),
    style: {
      width: 30, height: 30, borderRadius: "var(--radius-md)", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      border: "1px solid " + (h ? (danger ? "var(--error)" : "var(--s-line-strong)") : "var(--border)"),
      background: h ? (danger ? "var(--error-surface)" : "var(--s-chip)") : "transparent",
      color: danger ? "var(--error)" : "var(--s-text)",
    },
  }, React.createElement(CIcon, { name: icon, size: 15 }));
}

function ManageDownloadsDialog({ jobs, open, onClose, onDeleteJobs, onDownloadJobs, onClearAll, onRenameJob }) {
  const [sel, setSel] = React.useState({});
  React.useEffect(() => { if (open) setSel({}); }, [open]);
  if (!open) return null;
  const ids = jobs.map(j => j.id);
  const selIds = ids.filter(id => sel[id]);
  const allOn = ids.length > 0 && selIds.length === ids.length;
  const some = selIds.length > 0 && !allOn;
  const toggle = (id) => setSel(s => Object.assign({}, s, { [id]: !s[id] }));
  const toggleAll = () => { if (allOn) setSel({}); else { const n = {}; ids.forEach(id => n[id] = true); setSel(n); } };

  return React.createElement("div", {
    onClick: onClose,
    style: { position: "fixed", inset: 0, zIndex: 90, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 },
  },
    React.createElement("div", {
      onClick: (e) => e.stopPropagation(),
      style: { width: "min(720px, 94vw)", maxHeight: "84vh", display: "flex", flexDirection: "column", background: "var(--card)", border: "1px solid var(--border)", borderRadius: "var(--radius-2xl)", boxShadow: "var(--shadow-overlay)", overflow: "hidden" },
    },
      // header
      React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: "1px solid var(--border)" } },
        React.createElement("div", null,
          React.createElement("div", { style: { fontSize: 20, fontWeight: 600, color: "var(--s-text)", letterSpacing: "-0.2px" } }, "Manage Exports"),
          React.createElement("div", { style: { fontSize: 13, color: "var(--s-muted)", marginTop: 2 } }, jobs.length + " export" + (jobs.length === 1 ? "" : "s") + " · " + selIds.length + " selected")
        ),
        React.createElement("button", { onClick: onClose, title: "Close", style: { background: "none", border: "none", cursor: "pointer", color: "var(--s-muted)", display: "flex", padding: 4 } }, React.createElement(CIcon, { name: "x", size: 20 }))
      ),
      // bulk toolbar
      jobs.length ? React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 14, padding: "12px 22px", borderBottom: "1px solid var(--border)", background: "var(--s-chip)" } },
        React.createElement("label", { onClick: toggleAll, style: { display: "flex", alignItems: "center", gap: 9, cursor: "pointer" } },
          React.createElement(MgChk, { on: allOn, indeterminate: some, onClick: toggleAll }),
          React.createElement("span", { style: { fontSize: 13, fontWeight: 500, color: "var(--s-text)" } }, allOn ? "Deselect all" : "Select all")
        ),
        React.createElement("span", { style: { flex: 1 } }),
        React.createElement(DLButton, { variant: "secondary", icon: "download", onClick: () => selIds.length && (onDownloadJobs(selIds)) },
          "Download" + (selIds.length ? " (" + selIds.length + ")" : "")),
        React.createElement("button", {
          onClick: () => { if (selIds.length) { onDeleteJobs(selIds); setSel({}); } },
          disabled: !selIds.length,
          style: {
            height: 28, padding: "0 11px", borderRadius: "var(--radius-md)", fontSize: 13, fontWeight: 500,
            cursor: selIds.length ? "pointer" : "not-allowed", display: "inline-flex", alignItems: "center", gap: 6,
            fontFamily: "var(--font-sans)", border: "1px solid " + (selIds.length ? "var(--error)" : "var(--border)"),
            background: selIds.length ? "var(--error-surface)" : "transparent", color: selIds.length ? "var(--error)" : "var(--s-faint)",
          },
        }, React.createElement(CIcon, { name: "trash-2", size: 14 }), "Delete" + (selIds.length ? " (" + selIds.length + ")" : ""))
      ) : null,
      // list
      jobs.length ? React.createElement("div", { style: { overflowY: "auto", flex: 1 } },
        jobs.map((job, i) => {
          const on = !!sel[job.id];
          return React.createElement("div", {
            key: job.id, onClick: () => toggle(job.id),
            style: {
              display: "flex", alignItems: "center", gap: 14, padding: "12px 22px", cursor: "pointer",
              borderBottom: i === jobs.length - 1 ? "none" : "1px solid var(--border)",
              borderLeft: "2px solid " + (on ? "var(--primary)" : "transparent"),
              background: on ? "var(--success-surface)" : "transparent",
            },
          },
            React.createElement(MgChk, { on, onClick: () => toggle(job.id) }),
            React.createElement("div", { style: { flex: 2, minWidth: 0 } },
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "var(--s-text)" } },
                React.createElement("span", { style: { fontFamily: "var(--font-mono)" } }, job.name),
                React.createElement("button", { title: "Rename", onClick: (e) => { e.stopPropagation(); onRenameJob(job.id); }, style: { background: "none", border: "none", cursor: "pointer", color: "var(--s-muted)", display: "flex", padding: 2 } }, React.createElement(CIcon, { name: "pencil", size: 12 }))
              ),
              React.createElement("div", { style: { fontSize: 12.5, color: "var(--s-muted)", marginTop: 2 } }, job.details)
            ),
            React.createElement("div", { style: { flex: 1.3, minWidth: 0, fontSize: 12.5, color: "var(--s-muted)" } },
              React.createElement("div", { style: { color: "var(--s-text)" } }, job.time),
              React.createElement("div", { style: { marginTop: 2 } }, "Duration " + job.duration)
            ),
            React.createElement("span", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".3px", color: "var(--primary)", flexShrink: 0, width: 92 } }, job.status),
            React.createElement("div", { style: { display: "flex", gap: 7, flexShrink: 0 } },
              React.createElement(MgIconBtn, { icon: "download", title: "Download", onClick: (e) => { e.stopPropagation(); onDownloadJobs([job.id]); } }),
              React.createElement(MgIconBtn, { icon: "trash-2", title: "Delete", danger: true, onClick: (e) => { e.stopPropagation(); onDeleteJobs([job.id]); setSel(s => { const n = Object.assign({}, s); delete n[job.id]; return n; }); } })
            )
          );
        })
      ) : React.createElement("div", { style: { padding: "48px 22px", textAlign: "center", color: "var(--s-muted)", fontSize: 14 } },
          React.createElement(CIcon, { name: "inbox", size: 30, color: "var(--s-faint)", style: { margin: "0 auto 12px" } }),
          "No downloads to manage."),
      // footer
      React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 22px", borderTop: "1px solid var(--border)", gap: 12 } },
        React.createElement("button", {
          onClick: () => { onClearAll(); setSel({}); }, disabled: !jobs.length,
          style: { height: 36, padding: "0 14px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, fontFamily: "var(--font-sans)", cursor: jobs.length ? "pointer" : "not-allowed", border: "1px solid " + (jobs.length ? "var(--s-line-strong)" : "var(--border)"), background: "transparent", color: jobs.length ? "var(--error)" : "var(--s-faint)", display: "inline-flex", alignItems: "center", gap: 7 },
        }, React.createElement(CIcon, { name: "trash-2", size: 15 }), "Clear All"),
        React.createElement("button", {
          onClick: onClose,
          style: { height: 36, padding: "0 18px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, fontFamily: "var(--font-sans)", cursor: "pointer", border: "none", background: "var(--primary)", color: "#fff" },
          onMouseEnter: e => e.currentTarget.style.background = "var(--primary-hover)", onMouseLeave: e => e.currentTarget.style.background = "var(--primary)",
        }, "Done")
      )
    )
  );
}

Object.assign(window, { Header, LayersPanel, Legend, StatusPill, Toast, LeafMark, ManageDownloadsDialog });
