/* Enverus STRIKE — synthetic Permian Basin dataset (Notrees / Ector County, TX).
   Plain JS. Deterministic (seeded). Exposes window.STRIKE_DATA. */
(function () {
  // ---- seeded RNG (mulberry32) ----------------------------------------
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  const rnd = mulberry32(73219);
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const rint = (a, b) => a + Math.floor(rnd() * (b - a + 1));
  const rflt = (a, b) => a + rnd() * (b - a);
  const gauss = () => (rnd() + rnd() + rnd() + rnd() - 2) / 2; // ~[-1,1]

  // ---- geography ------------------------------------------------------
  // Centered on Notrees / Ector County, Permian Basin, West Texas.
  const CENTER = { lng: -102.58, lat: 31.97 };
  const BOUNDS = { w: -102.92, e: -102.18, s: 31.74, n: 32.20 };

  // ---- categories (color keys mirror the STRIKE legend) ---------------
  const CATS = {
    oil:       { label: "Oil Well",          color: "#62c23f", layer: "wells" },
    gas:       { label: "Gas Well",          color: "#3b9ae1", layer: "wells" },
    oilgas:    { label: "Oil & Gas Well",    color: "#37c9bd", layer: "wells" },
    injection: { label: "Injection / Disposal", color: "#9b6dff", layer: "wells" },
    dry:       { label: "Dry Hole",          color: "#e84db0", layer: "wells" },
    pa:        { label: "Plugged & Abandoned", color: "#b9c0c7", layer: "wells" },
    permit:    { label: "Permit",            color: "#ff8c42", layer: "permits" },
    rig:       { label: "Active Rig",        color: "#e0432f", layer: "rigs" },
  };
  const CAT_KEYS = Object.keys(CATS);

  // weighting toward producing oil wells, like the screenshot
  const WEIGHTED = [
    ["oil", 46], ["gas", 16], ["pa", 13], ["oilgas", 8],
    ["injection", 6], ["dry", 5], ["permit", 5], ["rig", 1],
  ];
  function weightedCat() {
    const total = WEIGHTED.reduce((s, w) => s + w[1], 0);
    let r = rnd() * total;
    for (const [k, w] of WEIGHTED) { if ((r -= w) <= 0) return k; }
    return "oil";
  }

  // ---- domain vocab ---------------------------------------------------
  const OPERATORS = [
    "SAXET OIL CORPORATION", "PIONEER NATURAL RESOURCES", "DIAMONDBACK ENERGY",
    "OXY USA INC", "APACHE CORPORATION", "ENDEAVOR ENERGY RESOURCES",
    "CHEVRON USA INC", "XTO ENERGY INC", "CONOCOPHILLIPS", "COTERRA ENERGY",
    "SM ENERGY COMPANY", "PERMIAN RESOURCES", "CALLON PETROLEUM",
    "MEWBOURNE OIL COMPANY", "SURGE ENERGY", "FASKEN OIL & RANCH",
  ];
  const BASINS = ["Midland Basin", "Delaware Basin"];
  const COUNTIES = ["Ector", "Andrews", "Winkler", "Ward", "Midland", "Crane"];
  const FORMATIONS = ["Spraberry", "Wolfcamp A", "Wolfcamp B", "Bone Spring", "Dean", "San Andres", "Clearfork", "Devonian"];
  const LEASE_ROOTS = ["BASHARA", "UNIVERSITY", "PARKS BELL", "TXL", "SHACKELFORD",
    "GOLDSMITH", "FOSTER", "EMPEROR", "HEADLEE", "COWDEN", "WADDELL", "SEALY SMITH",
    "TRIPLE N", "NOTREES", "PENWELL", "GULF", "MABEE", "PEGASUS", "JUDKINS", "COLBY"];
  const FIELDS = ["COLBY", "SPRABERRY (TREND AREA)", "GOLDSMITH", "FOSTER", "NOTREES",
    "PENWELL", "EMPEROR", "WADDELL", "TXL", "DUNE", "JUDKINS", "PEGASUS"];
  const SUFFIX = ["-A", "-B", "-C", "-D", "-E", " A", " B", " UNIT", ""];
  const STATUS_BY_CAT = {
    oil: ["Producing", "Producing", "Shut-in", "Completed"],
    gas: ["Producing", "Producing", "Shut-in"],
    oilgas: ["Producing", "Completed"],
    injection: ["Active", "Active", "Inactive"],
    dry: ["Dry Hole", "P & A"],
    pa: ["P & A", "P & A", "Plugged"],
    permit: ["Permitted", "Permitted", "Approved", "Drilling"],
    rig: ["Drilling", "Drilling", "Active"],
  };
  const ABSTRACT_BLOCKS = [
    "T&P RR CO BLK-46 T1N", "T&P RR CO BLK-46 T1S", "T&P RR CO BLK-45 T1S",
    "PSL BLK-B1", "PSL BLK-B7", "PSL BLK-40", "PSL BLK-1", "T&P RR CO BLK-45 T2S",
  ];

  function apiNumber() {
    // Texas API: 42 (state) - 3-digit county - 5-digit unique
    const county = pick(["329", "495", "003", "103", "475", "135"]);
    return "42-" + county + "-" + String(rint(10000, 99999)).padStart(5, "0");
  }

  function leaseName() {
    return pick(LEASE_ROOTS) + " " + pick(SUFFIX).trim() + " " + rint(1, 48);
  }

  // ---- monthly production series (for the panel chart/CSV vibe) -------
  function prodSeries(cat) {
    const base = cat === "gas" ? rflt(200, 1400) : rflt(40, 900);
    const decline = rflt(0.78, 0.94);
    const months = 36;
    let v = base * rflt(0.6, 1.0);
    const out = [];
    for (let i = 0; i < months; i++) {
      v = i === 0 ? base : v * decline * rflt(0.92, 1.05);
      out.push(Math.max(0, Math.round(v)));
    }
    return out;
  }

  // ---- well files (varies per record) --------------------------------
  const FILE_POOL = [
    "PLAT MAP", "PLAT MAP", "PLAT MAP", "APPLICATION FOR PERMIT TO DRILL",
    "DIRECTIONAL SURVEY CERTIFICATION", "W 15 CEMENTING REPORT",
    "DIRECTIONAL SURVEY", "COMPLETION REPORT", "P 16 ACREAGE DESIGNATION",
    "W 15 CEMENTING REPORT", "G 1 GAS WELL BACK PRESSURE TEST",
    "W 2 OIL WELL POTENTIAL TEST", "P 4 PRODUCER TRANSPORTER",
  ];
  function wellFiles() {
    const n = rint(7, 11);
    const files = [];
    for (let i = 0; i < n; i++) {
      files.push({ name: pick(FILE_POOL), checked: i < 8 && rnd() > 0.06 });
    }
    return files;
  }

  // ---- generate wells -------------------------------------------------
  const WELLS = [];
  const N = 4200;
  // create a few dense "trends" (drilling fairways) to mimic the screenshot clusters
  const TRENDS = [];
  for (let t = 0; t < 7; t++) {
    TRENDS.push({
      lng: rflt(BOUNDS.w + 0.05, BOUNDS.e - 0.05),
      lat: rflt(BOUNDS.s + 0.05, BOUNDS.n - 0.05),
      ang: rflt(0, Math.PI),
      spread: rflt(0.02, 0.06),
    });
  }

  for (let i = 0; i < N; i++) {
    let lng, lat;
    if (rnd() < 0.62) {
      // along a trend (clustered fairway)
      const tr = pick(TRENDS);
      const along = gauss() * 0.10;
      const perp = gauss() * tr.spread;
      lng = tr.lng + Math.cos(tr.ang) * along + Math.cos(tr.ang + Math.PI / 2) * perp;
      lat = tr.lat + Math.sin(tr.ang) * along + Math.sin(tr.ang + Math.PI / 2) * perp;
    } else {
      lng = rflt(BOUNDS.w, BOUNDS.e);
      lat = rflt(BOUNDS.s, BOUNDS.n);
    }
    lng = Math.max(BOUNDS.w, Math.min(BOUNDS.e, lng));
    lat = Math.max(BOUNDS.s, Math.min(BOUNDS.n, lat));

    const cat = weightedCat();
    const formation = pick(FORMATIONS);
    const tvd = rint(3300, 11800);
    const oilEUR = cat === "gas" || cat === "pa" || cat === "dry" ? rint(2, 60) : rint(40, 1850);
    const be = cat === "pa" || cat === "dry" || rnd() < 0.25 ? null : rint(28, 64);
    WELLS.push({
      idx: i,
      api: apiNumber(),
      name: leaseName().toUpperCase(),
      operator: pick(OPERATORS),
      basin: pick(BASINS),
      county: pick(COUNTIES) + " County",
      field: pick(FIELDS),
      formation,
      cat,
      type: CATS[cat].label,
      orientation: rnd() < 0.34 ? "Horizontal" : "Vertical",
      status: pick(STATUS_BY_CAT[cat]),
      lng, lat,
      tvd,
      oilEUR,
      be,
      gor: rint(400, 4200),
      spud: (2008 + rint(0, 17)) + "-" + String(rint(1, 12)).padStart(2, "0"),
      lastUpdatedH: rint(1, 96),
      files: wellFiles(),
      prod: prodSeries(cat),
    });
  }

  // ---- horizontal laterals (the colored lines in the screenshot) ------
  const LATERALS = [];
  const LAT_COLORS = ["#3b9ae1", "#37c9bd", "#ff7eb6", "#62c23f", "#9b6dff"];
  for (let i = 0; i < 160; i++) {
    const lng = rflt(BOUNDS.w, BOUNDS.e);
    const lat = rflt(BOUNDS.s, BOUNDS.n);
    const ang = rnd() < 0.5 ? rflt(-0.25, 0.25) : rflt(Math.PI / 2 - 0.25, Math.PI / 2 + 0.25);
    const len = rflt(0.006, 0.028);
    LATERALS.push({
      color: pick(LAT_COLORS),
      a: [lng, lat],
      b: [lng + Math.cos(ang) * len, lat + Math.sin(ang) * len],
    });
  }

  // ---- survey labels (abstract + block/section text scatter) ----------
  const LABELS = [];
  let abstractN = 1598;
  const cols = 11, rows = 9;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const lng = BOUNDS.w + ((c + 0.5) / cols) * (BOUNDS.e - BOUNDS.w) + rflt(-0.01, 0.01);
      const lat = BOUNDS.s + ((r + 0.5) / rows) * (BOUNDS.n - BOUNDS.s) + rflt(-0.008, 0.008);
      abstractN += rint(1, 6);
      const blk = pick(ABSTRACT_BLOCKS);
      LABELS.push({
        lng, lat,
        l1: "A-" + abstractN,
        l2: blk + ", S-" + rint(1, 44),
      });
    }
  }

  // ---- grid lines (faint survey grid) ---------------------------------
  const GRID = { v: [], h: [] };
  for (let c = 0; c <= cols; c++) GRID.v.push(BOUNDS.w + (c / cols) * (BOUNDS.e - BOUNDS.w));
  for (let r = 0; r <= rows; r++) GRID.h.push(BOUNDS.s + (r / rows) * (BOUNDS.n - BOUNDS.s));

  // ---- "roads" (a couple of polylines for basemap fallback) -----------
  const ROADS = [
    [[-102.92, 31.84], [-102.55, 31.96], [-102.18, 32.05]],
    [[-102.62, 31.74], [-102.60, 32.20]],
    [[-102.92, 32.02], [-102.40, 31.90], [-102.18, 31.86]],
    [[-102.80, 31.78], [-102.30, 32.16]],
  ];
  const PLACES = [
    { name: "Notrees", lng: -102.76, lat: 31.92 },
    { name: "Ector", lng: -102.52, lat: 31.84 },
    { name: "Penwell", lng: -102.58, lat: 31.74 },
    { name: "Goldsmith", lng: -102.61, lat: 31.98 },
  ];

  // ---- Landtrac lease parcels (polygons) ------------------------------
  const LEASES = [];
  (function () {
    const lcols = 6, lrows = 5;
    let li = 0;
    const cellW = (BOUNDS.e - BOUNDS.w) / lcols;
    const cellH = (BOUNDS.n - BOUNDS.s) / lrows;
    for (let r = 0; r < lrows; r++) {
      for (let c = 0; c < lcols; c++) {
        if (rnd() < 0.18) continue; // leave some gaps
        const cx = BOUNDS.w + (c + 0.5) * cellW + rflt(-0.18, 0.18) * cellW;
        const cy = BOUNDS.s + (r + 0.5) * cellH + rflt(-0.18, 0.18) * cellH;
        const w = cellW * rflt(0.45, 0.82);
        const h = cellH * rflt(0.45, 0.82);
        const coords = [
          [cx - w / 2, cy - h / 2],
          [cx + w / 2, cy - h / 2],
          [cx + w / 2, cy + h / 2],
          [cx - w / 2, cy + h / 2],
          [cx - w / 2, cy - h / 2],
        ];
        LEASES.push({
          idx: li++,
          name: (pick(LEASE_ROOTS) + " " + pick(SUFFIX)).trim().toUpperCase() + " LEASE",
          operator: pick(OPERATORS),
          county: pick(COUNTIES) + " County",
          acres: rint(160, 2560),
          status: pick(["Held by Production", "Primary Term", "Expired", "Active"]),
          coords,
        });
      }
    }
  })();

  // counts for the status pill
  const counts = { rigs: 0, permits: 0, wells: 0 };
  WELLS.forEach((w) => {
    if (w.cat === "rig") counts.rigs++;
    else if (w.cat === "permit") counts.permits++;
    else counts.wells++;
  });

  window.STRIKE_DATA = {
    CENTER, BOUNDS, CATS, CAT_KEYS,
    WELLS, LATERALS, LABELS, GRID, ROADS, PLACES, LEASES,
    counts,
  };
})();
