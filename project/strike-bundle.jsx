// AUTO-GENERATED BUNDLE — do not edit directly; edit source .jsx files and rebuild.

/* ===== tweaks-panel.jsx ===== */
;(function(){
// @ds-adherence-ignore -- omelette starter scaffold (raw elements/hex/px by design)

/* BEGIN USAGE */
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
// Exports (to window): useTweaks, TweaksPanel, TweakSection, TweakRow, TweakSlider,
//   TweakToggle, TweakRadio, TweakSelect, TweakText, TweakNumber, TweakColor, TweakButton.
//
// Owns the host protocol (listens for __activate_edit_mode / __deactivate_edit_mode,
// posts __edit_mode_available / __edit_mode_set_keys / __edit_mode_dismissed) so
// individual prototypes don't re-roll it. Ships a consistent set of controls so you
// don't hand-draw <input type="range">, segmented radios, steppers, etc.
//
// Usage (in an HTML file that loads React + Babel):
//
//   const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
//     "primaryColor": "#D97757",
//     "palette": ["#D97757", "#29261b", "#f6f4ef"],
//     "fontSize": 16,
//     "density": "regular",
//     "dark": false
//   }/*EDITMODE-END*/;
//
//   function App() {
//     const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
//     return (
//       <div style={{ fontSize: t.fontSize, color: t.primaryColor }}>
//         Hello
//         <TweaksPanel>
//           <TweakSection label="Typography" />
//           <TweakSlider label="Font size" value={t.fontSize} min={10} max={32} unit="px"
//                        onChange={(v) => setTweak('fontSize', v)} />
//           <TweakRadio  label="Density" value={t.density}
//                        options={['compact', 'regular', 'comfy']}
//                        onChange={(v) => setTweak('density', v)} />
//           <TweakSection label="Theme" />
//           <TweakColor  label="Primary" value={t.primaryColor}
//                        options={['#D97757', '#2A6FDB', '#1F8A5B', '#7A5AE0']}
//                        onChange={(v) => setTweak('primaryColor', v)} />
//           <TweakColor  label="Palette" value={t.palette}
//                        options={[['#D97757', '#29261b', '#f6f4ef'],
//                                  ['#475569', '#0f172a', '#f1f5f9']]}
//                        onChange={(v) => setTweak('palette', v)} />
//           <TweakToggle label="Dark mode" value={t.dark}
//                        onChange={(v) => setTweak('dark', v)} />
//         </TweaksPanel>
//       </div>
//     );
//   }
//
// TweakRadio is the segmented control for 2–3 short options (auto-falls-back to
// TweakSelect past ~16/~10 chars per label); reach for TweakSelect directly when
// options are many or long. For color tweaks always curate 3-4 options rather than
// a free picker; an option can also be a whole 2–5 color palette (the stored value
// is the array). The Tweak* controls are a floor, not a ceiling — build custom
// controls inside the panel if a tweak calls for UI they don't cover.
/* END USAGE */
// ─────────────────────────────────────────────────────────────────────────────

const __TWEAKS_STYLE = `
  .twk-panel{position:fixed;right:16px;bottom:16px;z-index:2147483646;width:280px;
    max-height:calc(100vh - 32px);display:flex;flex-direction:column;
    transform:scale(var(--dc-inv-zoom,1));transform-origin:bottom right;
    background:rgba(250,249,247,.78);color:#29261b;
    -webkit-backdrop-filter:blur(24px) saturate(160%);backdrop-filter:blur(24px) saturate(160%);
    border:.5px solid rgba(255,255,255,.6);border-radius:14px;
    box-shadow:0 1px 0 rgba(255,255,255,.5) inset,0 12px 40px rgba(0,0,0,.18);
    font:11.5px/1.4 ui-sans-serif,system-ui,-apple-system,sans-serif;overflow:hidden}
  .twk-hd{display:flex;align-items:center;justify-content:space-between;
    padding:10px 8px 10px 14px;cursor:move;user-select:none}
  .twk-hd b{font-size:12px;font-weight:600;letter-spacing:.01em}
  .twk-x{appearance:none;border:0;background:transparent;color:rgba(41,38,27,.55);
    width:22px;height:22px;border-radius:6px;cursor:default;font-size:13px;line-height:1}
  .twk-x:hover{background:rgba(0,0,0,.06);color:#29261b}
  .twk-body{padding:2px 14px 14px;display:flex;flex-direction:column;gap:10px;
    overflow-y:auto;overflow-x:hidden;min-height:0;
    scrollbar-width:thin;scrollbar-color:rgba(0,0,0,.15) transparent}
  .twk-body::-webkit-scrollbar{width:8px}
  .twk-body::-webkit-scrollbar-track{background:transparent;margin:2px}
  .twk-body::-webkit-scrollbar-thumb{background:rgba(0,0,0,.15);border-radius:4px;
    border:2px solid transparent;background-clip:content-box}
  .twk-body::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.25);
    border:2px solid transparent;background-clip:content-box}
  .twk-row{display:flex;flex-direction:column;gap:5px}
  .twk-row-h{flex-direction:row;align-items:center;justify-content:space-between;gap:10px}
  .twk-lbl{display:flex;justify-content:space-between;align-items:baseline;
    color:rgba(41,38,27,.72)}
  .twk-lbl>span:first-child{font-weight:500}
  .twk-val{color:rgba(41,38,27,.5);font-variant-numeric:tabular-nums}

  .twk-sect{font-size:10px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;
    color:rgba(41,38,27,.45);padding:10px 0 0}
  .twk-sect:first-child{padding-top:0}

  .twk-field{appearance:none;box-sizing:border-box;width:100%;min-width:0;height:26px;padding:0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;
    background:rgba(255,255,255,.6);color:inherit;font:inherit;outline:none}
  .twk-field:focus{border-color:rgba(0,0,0,.25);background:rgba(255,255,255,.85)}
  select.twk-field{padding-right:22px;
    background-image:url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='6' viewBox='0 0 10 6'><path fill='rgba(0,0,0,.5)' d='M0 0h10L5 6z'/></svg>");
    background-repeat:no-repeat;background-position:right 8px center}

  .twk-slider{appearance:none;-webkit-appearance:none;width:100%;height:4px;margin:6px 0;
    border-radius:999px;background:rgba(0,0,0,.12);outline:none}
  .twk-slider::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;
    width:14px;height:14px;border-radius:50%;background:#fff;
    border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}
  .twk-slider::-moz-range-thumb{width:14px;height:14px;border-radius:50%;
    background:#fff;border:.5px solid rgba(0,0,0,.12);box-shadow:0 1px 3px rgba(0,0,0,.2);cursor:default}

  .twk-seg{position:relative;display:flex;padding:2px;border-radius:8px;
    background:rgba(0,0,0,.06);user-select:none}
  .twk-seg-thumb{position:absolute;top:2px;bottom:2px;border-radius:6px;
    background:rgba(255,255,255,.9);box-shadow:0 1px 2px rgba(0,0,0,.12);
    transition:left .15s cubic-bezier(.3,.7,.4,1),width .15s}
  .twk-seg.dragging .twk-seg-thumb{transition:none}
  .twk-seg button{appearance:none;position:relative;z-index:1;flex:1;border:0;
    background:transparent;color:inherit;font:inherit;font-weight:500;min-height:22px;
    border-radius:6px;cursor:default;padding:4px 6px;line-height:1.2;
    overflow-wrap:anywhere}

  .twk-toggle{position:relative;width:32px;height:18px;border:0;border-radius:999px;
    background:rgba(0,0,0,.15);transition:background .15s;cursor:default;padding:0}
  .twk-toggle[data-on="1"]{background:#34c759}
  .twk-toggle i{position:absolute;top:2px;left:2px;width:14px;height:14px;border-radius:50%;
    background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .15s}
  .twk-toggle[data-on="1"] i{transform:translateX(14px)}

  .twk-num{display:flex;align-items:center;box-sizing:border-box;min-width:0;height:26px;padding:0 0 0 8px;
    border:.5px solid rgba(0,0,0,.1);border-radius:7px;background:rgba(255,255,255,.6)}
  .twk-num-lbl{font-weight:500;color:rgba(41,38,27,.6);cursor:ew-resize;
    user-select:none;padding-right:8px}
  .twk-num input{flex:1;min-width:0;height:100%;border:0;background:transparent;
    font:inherit;font-variant-numeric:tabular-nums;text-align:right;padding:0 8px 0 0;
    outline:none;color:inherit;-moz-appearance:textfield}
  .twk-num input::-webkit-inner-spin-button,.twk-num input::-webkit-outer-spin-button{
    -webkit-appearance:none;margin:0}
  .twk-num-unit{padding-right:8px;color:rgba(41,38,27,.45)}

  .twk-btn{appearance:none;height:26px;padding:0 12px;border:0;border-radius:7px;
    background:rgba(0,0,0,.78);color:#fff;font:inherit;font-weight:500;cursor:default}
  .twk-btn:hover{background:rgba(0,0,0,.88)}
  .twk-btn.secondary{background:rgba(0,0,0,.06);color:inherit}
  .twk-btn.secondary:hover{background:rgba(0,0,0,.1)}

  .twk-swatch{appearance:none;-webkit-appearance:none;width:56px;height:22px;
    border:.5px solid rgba(0,0,0,.1);border-radius:6px;padding:0;cursor:default;
    background:transparent;flex-shrink:0}
  .twk-swatch::-webkit-color-swatch-wrapper{padding:0}
  .twk-swatch::-webkit-color-swatch{border:0;border-radius:5.5px}
  .twk-swatch::-moz-color-swatch{border:0;border-radius:5.5px}

  .twk-chips{display:flex;gap:6px}
  .twk-chip{position:relative;appearance:none;flex:1;min-width:0;height:46px;
    padding:0;border:0;border-radius:6px;overflow:hidden;cursor:default;
    box-shadow:0 0 0 .5px rgba(0,0,0,.12),0 1px 2px rgba(0,0,0,.06);
    transition:transform .12s cubic-bezier(.3,.7,.4,1),box-shadow .12s}
  .twk-chip:hover{transform:translateY(-1px);
    box-shadow:0 0 0 .5px rgba(0,0,0,.18),0 4px 10px rgba(0,0,0,.12)}
  .twk-chip[data-on="1"]{box-shadow:0 0 0 1.5px rgba(0,0,0,.85),
    0 2px 6px rgba(0,0,0,.15)}
  .twk-chip>span{position:absolute;top:0;bottom:0;right:0;width:34%;
    display:flex;flex-direction:column;box-shadow:-1px 0 0 rgba(0,0,0,.1)}
  .twk-chip>span>i{flex:1;box-shadow:0 -1px 0 rgba(0,0,0,.1)}
  .twk-chip>span>i:first-child{box-shadow:none}
  .twk-chip svg{position:absolute;top:6px;left:6px;width:13px;height:13px;
    filter:drop-shadow(0 1px 1px rgba(0,0,0,.3))}
`;

// ── useTweaks ───────────────────────────────────────────────────────────────
// Single source of truth for tweak values. setTweak persists via the host
// (__edit_mode_set_keys → host rewrites the EDITMODE block on disk).
function useTweaks(defaults) {
  const [values, setValues] = React.useState(defaults);
  // Accepts either setTweak('key', value) or setTweak({ key: value, ... }) so a
  // useState-style call doesn't write a "[object Object]" key into the persisted
  // JSON block.
  const setTweak = React.useCallback((keyOrEdits, val) => {
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null
      ? keyOrEdits : { [keyOrEdits]: val };
    setValues((prev) => ({ ...prev, ...edits }));
    window.parent.postMessage({ type: '__edit_mode_set_keys', edits }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', { detail: edits }));
  }, []);
  return [values, setTweak];
}

// ── TweaksPanel ─────────────────────────────────────────────────────────────
// Floating shell. Registers the protocol listener BEFORE announcing
// availability — if the announce ran first, the host's activate could land
// before our handler exists and the toolbar toggle would silently no-op.
// The close button posts __edit_mode_dismissed so the host's toolbar toggle
// flips off in lockstep; the host echoes __deactivate_edit_mode back which
// is what actually hides the panel.
function TweaksPanel({ title = 'Tweaks', children }) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  const offsetRef = React.useRef({ x: 16, y: 16 });
  const PAD = 16;

  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth, h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y)),
    };
    panel.style.right = offsetRef.current.x + 'px';
    panel.style.bottom = offsetRef.current.y + 'px';
  }, []);

  React.useEffect(() => {
    if (!open) return;
    clampToViewport();
    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', clampToViewport);
      return () => window.removeEventListener('resize', clampToViewport);
    }
    const ro = new ResizeObserver(clampToViewport);
    ro.observe(document.documentElement);
    return () => ro.disconnect();
  }, [open, clampToViewport]);

  React.useEffect(() => {
    const onMsg = (e) => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);
      else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({ type: '__edit_mode_dismissed' }, '*');
  };

  const onDragStart = (e) => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX, sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = (ev) => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy),
      };
      clampToViewport();
    };
    const up = () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseup', up);
    };
    window.addEventListener('mousemove', move);
    window.addEventListener('mouseup', up);
  };

  if (!open) return null;
  return (
    <>
      <style>{__TWEAKS_STYLE}</style>
      <div ref={dragRef} className="twk-panel" data-omelette-chrome=""
           style={{ right: offsetRef.current.x, bottom: offsetRef.current.y }}>
        <div className="twk-hd" onMouseDown={onDragStart}>
          <b>{title}</b>
          <button className="twk-x" aria-label="Close tweaks"
                  onMouseDown={(e) => e.stopPropagation()}
                  onClick={dismiss}>✕</button>
        </div>
        <div className="twk-body">
          {children}
        </div>
      </div>
    </>
  );
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({ label, children }) {
  return (
    <>
      <div className="twk-sect">{label}</div>
      {children}
    </>
  );
}

function TweakRow({ label, value, children, inline = false }) {
  return (
    <div className={inline ? 'twk-row twk-row-h' : 'twk-row'}>
      <div className="twk-lbl">
        <span>{label}</span>
        {value != null && <span className="twk-val">{value}</span>}
      </div>
      {children}
    </div>
  );
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({ label, value, min = 0, max = 100, step = 1, unit = '', onChange }) {
  return (
    <TweakRow label={label} value={`${value}${unit}`}>
      <input type="range" className="twk-slider" min={min} max={max} step={step}
             value={value} onChange={(e) => onChange(Number(e.target.value))} />
    </TweakRow>
  );
}

function TweakToggle({ label, value, onChange }) {
  return (
    <div className="twk-row twk-row-h">
      <div className="twk-lbl"><span>{label}</span></div>
      <button type="button" className="twk-toggle" data-on={value ? '1' : '0'}
              role="switch" aria-checked={!!value}
              onClick={() => onChange(!value)}><i /></button>
    </div>
  );
}

function TweakRadio({ label, value, options, onChange }) {
  const trackRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  // The active value is read by pointer-move handlers attached for the lifetime
  // of a drag — ref it so a stale closure doesn't fire onChange for every move.
  const valueRef = React.useRef(value);
  valueRef.current = value;

  // Segments wrap mid-word once per-segment width runs out. The track is
  // ~248px (280 panel − 28 body pad − 4 seg pad), each button loses 12px
  // to its own padding, and 11.5px system-ui averages ~6.3px/char — so 2
  // options fit ~16 chars each, 3 fit ~10. Past that (or >3 options), fall
  // back to a dropdown rather than wrap.
  const labelLen = (o) => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({ 2: 16, 3: 10 }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = (s) => {
      const m = options.find((o) => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return <TweakSelect label={label} value={value} options={options}
                        onChange={(s) => onChange(resolve(s))} />;
  }
  const opts = options.map((o) => (typeof o === 'object' ? o : { value: o, label: o }));
  const idx = Math.max(0, opts.findIndex((o) => o.value === value));
  const n = opts.length;

  const segAt = (clientX) => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor(((clientX - r.left - 2) / inner) * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };

  const onPointerDown = (e) => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = (ev) => {
      if (!trackRef.current) return;
      const v = segAt(ev.clientX);
      if (v !== valueRef.current) onChange(v);
    };
    const up = () => {
      setDragging(false);
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };

  return (
    <TweakRow label={label}>
      <div ref={trackRef} role="radiogroup" onPointerDown={onPointerDown}
           className={dragging ? 'twk-seg dragging' : 'twk-seg'}>
        <div className="twk-seg-thumb"
             style={{ left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
                      width: `calc((100% - 4px) / ${n})` }} />
        {opts.map((o) => (
          <button key={o.value} type="button" role="radio" aria-checked={o.value === value}>
            {o.label}
          </button>
        ))}
      </div>
    </TweakRow>
  );
}

function TweakSelect({ label, value, options, onChange }) {
  return (
    <TweakRow label={label}>
      <select className="twk-field" value={value} onChange={(e) => onChange(e.target.value)}>
        {options.map((o) => {
          const v = typeof o === 'object' ? o.value : o;
          const l = typeof o === 'object' ? o.label : o;
          return <option key={v} value={v}>{l}</option>;
        })}
      </select>
    </TweakRow>
  );
}

function TweakText({ label, value, placeholder, onChange }) {
  return (
    <TweakRow label={label}>
      <input className="twk-field" type="text" value={value} placeholder={placeholder}
             onChange={(e) => onChange(e.target.value)} />
    </TweakRow>
  );
}

function TweakNumber({ label, value, min, max, step = 1, unit = '', onChange }) {
  const clamp = (n) => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({ x: 0, val: 0 });
  const onScrubStart = (e) => {
    e.preventDefault();
    startRef.current = { x: e.clientX, val: value };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = (ev) => {
      const dx = ev.clientX - startRef.current.x;
      const raw = startRef.current.val + dx * step;
      const snapped = Math.round(raw / step) * step;
      onChange(clamp(Number(snapped.toFixed(decimals))));
    };
    const up = () => {
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerup', up);
    };
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', up);
  };
  return (
    <div className="twk-num">
      <span className="twk-num-lbl" onPointerDown={onScrubStart}>{label}</span>
      <input type="number" value={value} min={min} max={max} step={step}
             onChange={(e) => onChange(clamp(Number(e.target.value)))} />
      {unit && <span className="twk-num-unit">{unit}</span>}
    </div>
  );
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, (c) => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}

const __TwkCheck = ({ light }) => (
  <svg viewBox="0 0 14 14" aria-hidden="true">
    <path d="M3 7.2 5.8 10 11 4.2" fill="none" strokeWidth="2.2"
          strokeLinecap="round" strokeLinejoin="round"
          stroke={light ? 'rgba(0,0,0,.78)' : '#fff'} />
  </svg>
);

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({ label, value, options, onChange }) {
  if (!options || !options.length) {
    return (
      <div className="twk-row twk-row-h">
        <div className="twk-lbl"><span>{label}</span></div>
        <input type="color" className="twk-swatch" value={value}
               onChange={(e) => onChange(e.target.value)} />
      </div>
    );
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = (o) => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return (
    <TweakRow label={label}>
      <div className="twk-chips" role="radiogroup">
        {options.map((o, i) => {
          const colors = Array.isArray(o) ? o : [o];
          const [hero, ...rest] = colors;
          const sup = rest.slice(0, 4);
          const on = key(o) === cur;
          return (
            <button key={i} type="button" className="twk-chip" role="radio"
                    aria-checked={on} data-on={on ? '1' : '0'}
                    aria-label={colors.join(', ')} title={colors.join(' · ')}
                    style={{ background: hero }}
                    onClick={() => onChange(o)}>
              {sup.length > 0 && (
                <span>
                  {sup.map((c, j) => <i key={j} style={{ background: c }} />)}
                </span>
              )}
              {on && <__TwkCheck light={__twkIsLight(hero)} />}
            </button>
          );
        })}
      </div>
    </TweakRow>
  );
}

function TweakButton({ label, onClick, secondary = false }) {
  return (
    <button type="button" className={secondary ? 'twk-btn secondary' : 'twk-btn'}
            onClick={onClick}>{label}</button>
  );
}

Object.assign(window, {
  useTweaks, TweaksPanel, TweakSection, TweakRow,
  TweakSlider, TweakToggle, TweakRadio, TweakSelect,
  TweakText, TweakNumber, TweakColor, TweakButton,
});

})();

/* ===== primitives.jsx ===== */
;(function(){
/* global React */
// Enverus One — UI kit primitives. Exported to window for cross-file use.

function _toPascal(name) {
  return name.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}

// Lucide icon as inline SVG (reads window.lucide.icons IconNode arrays).
function Icon({ name, size = 16, strokeWidth = 1.75, className, style, color }) {
  const icons = (window.lucide && window.lucide.icons) || {};
  const node = icons[_toPascal(name)];
  const children = node
    ? node.map((c, i) => React.createElement(c[0], Object.assign({ key: i }, c[1])))
    : null;
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg', width: size, height: size, viewBox: '0 0 24 24',
    fill: 'none', stroke: color || 'currentColor', strokeWidth,
    strokeLinecap: 'round', strokeLinejoin: 'round', className,
    style: Object.assign({ flexShrink: 0, display: 'block' }, style),
  }, children);
}

function Button({ variant = 'default', size = 'default', children, icon, onClick, disabled, style, title }) {
  const base = {
    fontFamily: 'var(--font-sans)', fontWeight: 500, display: 'inline-flex',
    alignItems: 'center', justifyContent: 'center', gap: 8, whiteSpace: 'nowrap',
    border: '1px solid transparent', borderRadius: 'var(--radius-md)', cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background .12s, border-color .12s, transform .04s', userSelect: 'none', outline: 'none',
  };
  const sizes = {
    default: { height: 36, padding: '0 16px', fontSize: 14 },
    sm: { height: 28, padding: '0 12px', fontSize: 13, borderRadius: 'var(--radius-sm)' },
    lg: { height: 40, padding: '0 20px', fontSize: 14 },
    icon: { height: 36, width: 36, padding: 0 },
    'icon-sm': { height: 28, width: 28, padding: 0 },
  };
  const variants = {
    default: { background: 'var(--primary)', color: '#fff' },
    secondary: { background: 'var(--canvas)', color: 'var(--ink)', borderColor: 'var(--hairline-strong)' },
    ghost: { background: 'transparent', color: 'var(--body)' },
    destructive: { background: 'var(--error)', color: '#fff' },
    warning: { background: 'var(--warning)', color: '#fff' },
    link: { background: 'transparent', color: 'var(--primary)', padding: '0 4px' },
  };
  const hoverBg = {
    default: 'var(--primary-hover)', secondary: 'var(--canvas-soft)', ghost: 'var(--canvas-muted)',
    destructive: '#b91c1c', warning: 'var(--warning-hover)', link: 'transparent',
  };
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = variants[variant];
  const st = Object.assign({}, base, sizes[size], v, style);
  if (disabled) {
    if (variant === 'default') { st.background = 'var(--primary-disabled)'; st.color = 'var(--muted)'; }
    else { st.opacity = 0.5; }
  } else if (hover) {
    st.background = hoverBg[variant];
    if (variant === 'link') st.textDecoration = 'underline';
    if (variant === 'secondary') st.borderColor = 'var(--hairline-strong)';
  }
  if (press && !disabled) st.transform = 'translateY(1px)';
  return React.createElement('button', {
    style: st, onClick: disabled ? undefined : onClick, title,
    onMouseEnter: () => setHover(true), onMouseLeave: () => { setHover(false); setPress(false); },
    onMouseDown: () => setPress(true), onMouseUp: () => setPress(false),
  }, icon ? React.createElement(Icon, { name: icon, size: size === 'sm' ? 14 : 16 }) : null, children);
}

function Badge({ variant = 'default', children }) {
  const v = {
    default: { background: 'var(--canvas-muted)', color: 'var(--ink)' },
    success: { background: 'var(--success-surface)', color: 'var(--primary)' },
    warning: { background: 'var(--warning-surface)', color: 'var(--warning)' },
    error: { background: 'var(--error-surface)', color: 'var(--error)' },
    processing: { background: 'var(--badge-processing-surface)', color: 'var(--badge-processing)' },
    outline: { background: 'transparent', color: 'var(--muted)', border: '1px solid var(--hairline-strong)' },
  }[variant];
  return React.createElement('span', {
    style: Object.assign({
      display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: 12, fontWeight: 500,
      letterSpacing: '.2px', borderRadius: 'var(--radius-pill)', padding: '2px 9px',
      fontFamily: 'var(--font-sans)', lineHeight: 1.4, whiteSpace: 'nowrap',
    }, v),
  }, children);
}

function Card({ children, elevated, style, onClick, pad = 20 }) {
  return React.createElement('div', {
    onClick,
    style: Object.assign({
      background: 'var(--surface-card)', border: '1px solid var(--hairline)',
      borderRadius: 'var(--radius-xl)', padding: pad,
      boxShadow: elevated ? 'var(--shadow-soft)' : 'none',
    }, style),
  }, children);
}

function KpiCard({ label, value, unit, trend, trendDir }) {
  const col = { up: 'var(--primary)', down: 'var(--error)', flat: 'var(--muted)' }[trendDir || 'flat'];
  const arrow = { up: '▲', down: '▼', flat: '—' }[trendDir || 'flat'];
  return React.createElement(Card, { pad: 18 },
    React.createElement('div', { style: { fontSize: 12, fontWeight: 500, letterSpacing: '.2px', color: 'var(--muted)', textTransform: 'uppercase' } }, label),
    React.createElement('div', { style: { fontSize: 28, fontWeight: 700, letterSpacing: '-0.5px', color: 'var(--ink)', lineHeight: 1.1, marginTop: 8 } },
      value, unit ? React.createElement('span', { style: { fontSize: 14, fontWeight: 500, color: 'var(--muted)' } }, ' ' + unit) : null),
    trend ? React.createElement('div', { style: { fontSize: 12, fontWeight: 500, color: col, marginTop: 6 } }, arrow + ' ' + trend) : null
  );
}

function Input({ value, onChange, placeholder, icon, style, onKeyDown, ...rest }) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('div', {
    style: Object.assign({
      display: 'flex', alignItems: 'center', gap: 8, height: 36, background: 'var(--canvas)',
      border: '1px solid ' + (focus ? 'var(--primary)' : 'var(--hairline-strong)'),
      borderRadius: 'var(--radius-md)', padding: '0 12px',
      boxShadow: focus ? 'var(--focus-shadow)' : 'none', transition: 'border-color .12s, box-shadow .12s',
    }, style),
  },
    icon ? React.createElement(Icon, { name: icon, size: 15, color: 'var(--muted)' }) : null,
    React.createElement('input', Object.assign({
      value, onChange, placeholder, onKeyDown,
      onFocus: () => setFocus(true), onBlur: () => setFocus(false),
      style: { flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 14, fontFamily: 'var(--font-sans)', color: 'var(--ink)' },
    }, rest))
  );
}

Object.assign(window, { Icon, Button, Badge, Card, KpiCard, Input });

})();

/* ===== strike-map.jsx ===== */
;(function(){
/* global React, mapboxgl */
// Enverus STRIKE — map engine. Mapbox GL JS when a token exists; otherwise a
// faithful canvas basemap. Both render the same dataset & honor the same props.

const D = () => window.STRIKE_DATA;

// =====================================================================
// Canvas basemap engine (vanilla) — dark survey-grid look + well dots.
// =====================================================================
class CanvasMap {
  constructor(canvas, opts) {
    this.cv = canvas;
    this.ctx = canvas.getContext("2d");
    this.opts = opts; // { theme, layers, tweaks, onSelect, onHover }
    const d = D();
    this.cLng = d.CENTER.lng;
    this.cLat = d.CENTER.lat;
    this.scale = 2600;            // px per degree latitude
    this.selected = [];
    this.selectedLeases = [];
    this.hoverIdx = null;
    this._raf = null;
    this._bind();
    this.resize();
  }
  _bind() {
    this.onResize = () => this.resize();
    window.addEventListener("resize", this.onResize);
    let dragging = false, lastX = 0, lastY = 0, moved = 0;
    const cv = this.cv;
    cv.addEventListener("mousedown", (e) => { dragging = true; moved = 0; lastX = e.clientX; lastY = e.clientY; cv.style.cursor = "grabbing"; });
    window.addEventListener("mouseup", () => { dragging = false; cv.style.cursor = "grab"; });
    window.addEventListener("mousemove", (e) => {
      if (dragging) {
        const dx = e.clientX - lastX, dy = e.clientY - lastY;
        moved += Math.abs(dx) + Math.abs(dy);
        lastX = e.clientX; lastY = e.clientY;
        const sLng = this.scale * Math.cos(this.cLat * Math.PI / 180);
        this.cLng -= dx / sLng;
        this.cLat += dy / this.scale;
        this._clamp();
        this.draw();
      }
    });
    cv.addEventListener("mousemove", (e) => {
      if (dragging) return;
      const r = cv.getBoundingClientRect();
      const hit = this._hit(e.clientX - r.left, e.clientY - r.top);
      const ni = hit ? hit.idx : null;
      if (ni !== this.hoverIdx) {
        this.hoverIdx = ni;
        cv.style.cursor = ni != null ? "pointer" : "grab";
        this.draw();
        this.opts.onHover && this.opts.onHover(hit, e.clientX, e.clientY);
      }
    });
    cv.addEventListener("click", (e) => {
      if (moved > 5) return;
      const r = cv.getBoundingClientRect();
      const x = e.clientX - r.left, y = e.clientY - r.top;
      const hit = this._hit(x, y);
      if (hit) { this.opts.onSelect && this.opts.onSelect(hit.idx, e.ctrlKey || e.metaKey); return; }
      const lease = this._hitLease(x, y);
      if (lease) { this.opts.onSelectLease && this.opts.onSelectLease(lease.idx, e.ctrlKey || e.metaKey); return; }
      this.opts.onEmptyClick && this.opts.onEmptyClick();
    });
    cv.addEventListener("wheel", (e) => {
      e.preventDefault();
      const r = cv.getBoundingClientRect();
      const mx = e.clientX - r.left, my = e.clientY - r.top;
      const before = this._unproject(mx, my);
      const f = Math.pow(1.0015, -e.deltaY);
      this.scale = Math.max(900, Math.min(40000, this.scale * f));
      const after = this._unproject(mx, my);
      this.cLng += before.lng - after.lng;
      this.cLat += before.lat - after.lat;
      this._clamp();
      this.draw();
    }, { passive: false });
  }
  _clamp() {
    const b = D().BOUNDS;
    this.cLng = Math.max(b.w - 0.1, Math.min(b.e + 0.1, this.cLng));
    this.cLat = Math.max(b.s - 0.1, Math.min(b.n + 0.1, this.cLat));
  }
  resize() {
    const dpr = window.devicePixelRatio || 1;
    const w = this.cv.clientWidth, h = this.cv.clientHeight;
    this.cv.width = w * dpr; this.cv.height = h * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.W = w; this.H = h;
    this.draw();
  }
  _project(lng, lat) {
    const sLng = this.scale * Math.cos(this.cLat * Math.PI / 180);
    return {
      x: this.W / 2 + (lng - this.cLng) * sLng,
      y: this.H / 2 - (lat - this.cLat) * this.scale,
    };
  }
  _unproject(x, y) {
    const sLng = this.scale * Math.cos(this.cLat * Math.PI / 180);
    return {
      lng: this.cLng + (x - this.W / 2) / sLng,
      lat: this.cLat - (y - this.H / 2) / this.scale,
    };
  }
  _hit(x, y) {
    const d = D(), layers = this.opts.layers, tw = this.opts.tweaks;
    const rad = (tw.dotSize || 4) + 5;
    let best = null, bestD = rad * rad;
    for (let i = 0; i < d.WELLS.length; i++) {
      const w = d.WELLS[i];
      if (layers[d.CATS[w.cat].layer] !== true) continue; // only interactive when layer === true
      const p = this._project(w.lng, w.lat);
      if (p.x < -10 || p.x > this.W + 10 || p.y < -10 || p.y > this.H + 10) continue;
      const dd = (p.x - x) * (p.x - x) + (p.y - y) * (p.y - y);
      if (dd < bestD) { bestD = dd; best = w; }
    }
    return best;
  }
  _hitLease(x, y) {
    const d = D(), layers = this.opts.layers;
    if (layers.landtracLease !== true || !d.LEASES) return null;
    for (let i = d.LEASES.length - 1; i >= 0; i--) {
      const ls = d.LEASES[i];
      const pts = ls.coords.map((c) => this._project(c[0], c[1]));
      if (pointInPoly(x, y, pts)) return ls;
    }
    return null;
  }
  _visible(cat, layers) {
    const lyr = D().CATS[cat].layer;
    return layers[lyr] !== false;
  }
  setState(opts) { Object.assign(this.opts, opts); this.draw(); }
  setSelected(idxs, activeIdx, fly) {
    this.selected = Array.isArray(idxs) ? idxs : (idxs != null ? [idxs] : []);
    if (fly && activeIdx != null) {
      const w = D().WELLS[activeIdx];
      if (w) { this.cLng = w.lng; this.cLat = w.lat; }
    }
    this.draw();
  }
  setSelectedLeases(idxs) { this.selectedLeases = Array.isArray(idxs) ? idxs : []; this.draw(); }
  _tweenTo(lng, lat) {
    cancelAnimationFrame(this._tw);
    const sL = this.cLng, sA = this.cLat, t0 = performance.now();
    const step = (t) => {
      const k = Math.min(1, (t - t0) / 450);
      const e = 1 - Math.pow(1 - k, 3);
      this.cLng = sL + (lng - sL) * e;
      this.cLat = sA + (lat - sA) * e;
      this.draw();
      if (k < 1) this._tw = requestAnimationFrame(step);
    };
    this._tw = requestAnimationFrame(step);
  }
  draw() {
    const ctx = this.ctx, d = D(), tw = this.opts.tweaks, layers = this.opts.layers;
    const dark = this.opts.theme !== "light";
    const styleName = (dark ? this.opts.darkBasemapStyle : this.opts.lightBasemapStyle) || (dark ? "dark-v11" : "light-v11");
    const PALETTES = {
      "mapbox://styles/jaidoubleu/cmped3pws002k01sc2twg1als": { bg: "#efece4", road: "rgba(90,95,100,0.5)", grid: "rgba(0,0,0,0.05)" },
      "mapbox://styles/jaidoubleu/cksruzh4z30oh18ptegc97aan": { bg: "#e7e9ec", road: "rgba(120,125,130,0.5)", grid: "rgba(0,0,0,0.06)" },
      "mapbox://styles/jaidoubleu/cmrat1y5v000w01ri5hgtbl44": { bg: "#dfeae4", road: "rgba(60,110,90,0.5)", grid: "rgba(0,60,40,0.06)" },
      "mapbox://styles/jaidoubleu/cmolnwpmv000t01s61q70cq53": { bg: "#f4f4f4", road: "rgba(100,100,100,0.5)", grid: "rgba(0,0,0,0.05)" },
      "mapbox://styles/jaidoubleu/cmnq32zve00a301s0852df4fr": { bg: "#f0ecf5", road: "rgba(120,90,150,0.5)", grid: "rgba(60,20,90,0.06)" },
      "mapbox://styles/jaidoubleu/cmp9wzzqs000q01ri6lrldt2v": { bg: "#10151d", road: "rgba(60,140,255,0.45)", grid: "rgba(255,255,255,0.05)" },
      "mapbox://styles/jaidoubleu/cl127hars001a15qoc7cmvxjy": { bg: "#1a2029", road: "rgba(150,170,200,0.35)", grid: "rgba(255,255,255,0.05)" },
      "mapbox://styles/jaidoubleu/clm7sk7yt02qe01qi0inwduj1": { bg: "#1b1b1b", road: "rgba(170,170,170,0.3)", grid: "rgba(255,255,255,0.045)" },
      "mapbox://styles/jaidoubleu/cl24sqi6000hj15ozr8ix7fdh": { bg: "#15171a", road: "rgba(180,185,190,0.28)", grid: "rgba(255,255,255,0.045)" },
      "mapbox://styles/jaidoubleu/cmpe9zi1k000x01s3abdx3u87": { bg: "#191a1c", road: "rgba(200,200,200,0.3)", grid: "rgba(255,255,255,0.045)" },
      "mapbox://styles/jaidoubleu/cmnq2xzrv000701s4djtu2l4x": { bg: "#201828", road: "rgba(190,140,220,0.4)", grid: "rgba(255,255,255,0.05)" },
      "mapbox://styles/jaidoubleu/clm7sjoom02qr01qxdoer3830": { bg: "#15171a", road: "rgba(180,185,190,0.28)", grid: "rgba(255,255,255,0.045)" },
    };
    const pal = PALETTES[styleName] || (dark ? { bg: "#15171a", road: "rgba(180,185,190,0.28)", grid: "rgba(255,255,255,0.045)" } : { bg: "#e7e9ec", road: "rgba(120,125,130,0.5)", grid: "rgba(0,0,0,0.06)" });
    ctx.clearRect(0, 0, this.W, this.H);
    // background
    ctx.fillStyle = pal.bg;
    ctx.fillRect(0, 0, this.W, this.H);
    // subtle vignette grain via two-tone blocks (cheap texture)
    // grid
    if (tw.grid !== false) {
      ctx.strokeStyle = pal.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      d.GRID.v.forEach((lng) => { const p = this._project(lng, this.cLat); ctx.moveTo(p.x, 0); ctx.lineTo(p.x, this.H); });
      d.GRID.h.forEach((lat) => { const p = this._project(this.cLng, lat); ctx.moveTo(0, p.y); ctx.lineTo(this.W, p.y); });
      ctx.stroke();
    }
    // roads
    ctx.strokeStyle = pal.road;
    ctx.lineWidth = 2; ctx.lineCap = "round";
    d.ROADS.forEach((line) => {
      ctx.beginPath();
      line.forEach((pt, i) => { const p = this._project(pt[0], pt[1]); i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); });
      ctx.stroke();
    });
    // lease parcels
    if (layers.landtracLease !== false && d.LEASES) {
      const leaseView = layers.landtracLease === 'view';
      const self = this;
      d.LEASES.forEach(function(ls) {
        ctx.beginPath();
        ls.coords.forEach((pt, i) => { const p = self._project(pt[0], pt[1]); i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y); });
        ctx.closePath();
        const sel = self.selectedLeases && self.selectedLeases.indexOf(ls.idx) !== -1;
        ctx.globalAlpha = leaseView ? 0.5 : 1;
        ctx.fillStyle = sel ? "rgba(212,162,74,0.32)" : "rgba(212,162,74,0.10)";
        ctx.fill();
        ctx.strokeStyle = sel ? "#fff" : "#d4a24a";
        ctx.lineWidth = sel ? 2.5 : 1.3;
        ctx.stroke();
        ctx.globalAlpha = 1;
      });
    }
    // laterals
    if (layers.wells !== false) {
      ctx.lineWidth = 2.2;
      d.LATERALS.forEach((l) => {
        const a = this._project(l.a[0], l.a[1]), b = this._project(l.b[0], l.b[1]);
        ctx.strokeStyle = l.color; ctx.globalAlpha = 0.9;
        ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
      });
      ctx.globalAlpha = 1;
    }
    // dots
    const r = tw.dotSize || 4;
    const density = tw.density == null ? 1 : tw.density;
    for (let i = 0; i < d.WELLS.length; i++) {
      if (density < 1 && (i % 1000) / 1000 >= density) continue;
      const w = d.WELLS[i];
      if (!this._visible(w.cat, layers)) continue;
      const p = this._project(w.lng, w.lat);
      if (p.x < -8 || p.x > this.W + 8 || p.y < -8 || p.y > this.H + 8) continue;
      ctx.globalAlpha = layers[d.CATS[w.cat].layer] === 'view' ? 0.65 : 1;
      ctx.fillStyle = d.CATS[w.cat].color;
      ctx.beginPath();
      ctx.arc(p.x, p.y, w.cat === "rig" ? r + 1.5 : r, 0, 6.2832);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
    // labels
    if (tw.labels !== false && this.scale > 1700) {
      ctx.fillStyle = dark ? "rgba(150,155,162,0.65)" : "rgba(70,75,80,0.7)";
      ctx.font = "10px 'Roboto Flex', sans-serif";
      ctx.textAlign = "center";
      d.LABELS.forEach((lb) => {
        const p = this._project(lb.lng, lb.lat);
        if (p.x < 0 || p.x > this.W || p.y < 0 || p.y > this.H) return;
        ctx.fillText(lb.l1, p.x, p.y - 5);
        ctx.fillText(lb.l2, p.x, p.y + 7);
      });
    }
    // place names
    ctx.fillStyle = dark ? "rgba(210,214,219,0.92)" : "rgba(40,44,48,0.92)";
    ctx.font = "600 13px 'Roboto Flex', sans-serif";
    ctx.textAlign = "center";
    d.PLACES.forEach((pl) => {
      const p = this._project(pl.lng, pl.lat);
      if (p.x < 0 || p.x > this.W || p.y < 0 || p.y > this.H) return;
      ctx.fillText(pl.name, p.x, p.y);
    });
    // selected highlights
    if (this.selected.length > 0) {
      const self = this;
      this.selected.forEach(function(selIdx) {
        const w = d.WELLS[selIdx];
        if (w && self._visible(w.cat, layers)) {
          const p = self._project(w.lng, w.lat);
          ctx.strokeStyle = "#fff"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(p.x, p.y, (tw.dotSize || 4) + 6, 0, 6.2832); ctx.stroke();
          ctx.strokeStyle = D().CATS[w.cat].color; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(p.x, p.y, (tw.dotSize || 4) + 9, 0, 6.2832); ctx.stroke();
        }
      });
    }
    // hover highlight — pink ring for object-select tool
    if (this.hoverIdx != null) {
      const w = d.WELLS[this.hoverIdx];
      if (w && this._visible(w.cat, layers)) {
        const p = this._project(w.lng, w.lat);
        if (this.opts.drawTool === 'object-select') {
          ctx.fillStyle = 'rgba(255,80,160,0.22)';
          ctx.beginPath(); ctx.arc(p.x, p.y, (tw.dotSize || 4) + 5, 0, 6.2832); ctx.fill();
          ctx.strokeStyle = '#ff50a0'; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(p.x, p.y, (tw.dotSize || 4) + 5, 0, 6.2832); ctx.stroke();
        }
      }
    }
  }
  destroy() { window.removeEventListener("resize", this.onResize); }
}

// =====================================================================
// Mapbox engine wrapper
// =====================================================================
function buildGeoJSON() {
  const d = D();
  return {
    type: "FeatureCollection",
    features: d.WELLS.map((w) => ({
      type: "Feature",
      properties: { idx: w.idx, cat: w.cat, layer: D().CATS[w.cat].layer, color: D().CATS[w.cat].color },
      geometry: { type: "Point", coordinates: [w.lng, w.lat] },
    })),
  };
}
function lateralGeoJSON() {
  const d = D();
  return {
    type: "FeatureCollection",
    features: d.LATERALS.map((l) => ({
      type: "Feature", properties: { color: l.color },
      geometry: { type: "LineString", coordinates: [l.a, l.b] },
    })),
  };
}
function leaseGeoJSON() {
  const d = D();
  return {
    type: "FeatureCollection",
    features: (d.LEASES || []).map((ls) => ({
      type: "Feature",
      properties: { idx: ls.idx },
      geometry: { type: "Polygon", coordinates: [ls.coords] },
    })),
  };
}
function pointInPoly(x, y, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const xi = pts[i].x, yi = pts[i].y, xj = pts[j].x, yj = pts[j].y;
    if (((yi > y) !== (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi)) inside = !inside;
  }
  return inside;
}

class MapboxMap {
  constructor(container, opts) {
    this.opts = opts;
    const d = D();
    mapboxgl.accessToken = opts.token;
    this.map = new mapboxgl.Map({
      container,
      style: this._styleUrl(opts),
      center: [d.CENTER.lng, d.CENTER.lat],
      zoom: 10.4,
      attributionControl: false,
    });
    this.map.on("load", () => this._addLayers());
  }
  _styleUrl(opts) {
    return (opts.theme === "light" ? opts.lightBasemapStyle : opts.darkBasemapStyle)
      || (opts.theme === "light" ? "mapbox://styles/mapbox/light-v11" : "mapbox://styles/mapbox/dark-v11");
  }
  _addLayers() {
    const map = this.map;
    map.addSource("laterals", { type: "geojson", data: lateralGeoJSON() });
    map.addLayer({ id: "laterals", type: "line", source: "laterals",
      paint: { "line-color": ["get", "color"], "line-width": 2, "line-opacity": 0.85 } });
    map.addSource("leases", { type: "geojson", data: leaseGeoJSON() });
    map.addLayer({ id: "leases-fill", type: "fill", source: "leases",
      paint: { "fill-color": "#d4a24a", "fill-opacity": 0.10 } });
    map.addLayer({ id: "leases-sel-fill", type: "fill", source: "leases",
      filter: ["==", ["get", "idx"], -1],
      paint: { "fill-color": "#d4a24a", "fill-opacity": 0.30 } });
    map.addLayer({ id: "leases-line", type: "line", source: "leases",
      paint: { "line-color": "#d4a24a", "line-width": 1.4, "line-opacity": 0.75 } });
    map.addLayer({ id: "leases-sel", type: "line", source: "leases",
      filter: ["==", ["get", "idx"], -1],
      paint: { "line-color": "#fff", "line-width": 2.5 } });
    map.addSource("wells", { type: "geojson", data: buildGeoJSON() });
    map.addLayer({
      id: "wells", type: "circle", source: "wells",
      paint: {
        "circle-radius": ["interpolate", ["linear"], ["zoom"], 8, 2, 12, this.opts.tweaks.dotSize || 4, 15, (this.opts.tweaks.dotSize || 4) + 3],
        "circle-color": ["get", "color"],
        "circle-stroke-width": ["case", ["==", ["get", "idx"], ["literal", -1]], 2, 0],
      },
    });
    map.addLayer({
      id: "wells-sel", type: "circle", source: "wells",
      filter: ["==", ["get", "idx"], -1],
      paint: { "circle-radius": (this.opts.tweaks.dotSize || 4) + 7, "circle-color": "rgba(0,0,0,0)", "circle-stroke-color": "#fff", "circle-stroke-width": 2 },
    });
    map.on("click", "wells", (e) => {
      if (e.features && e.features[0]) {
        if (this.opts.layers[e.features[0].properties.layer] !== true) return;
        const ctrl = e.originalEvent && (e.originalEvent.ctrlKey || e.originalEvent.metaKey);
        this.opts.onSelect(e.features[0].properties.idx, ctrl);
      }
    });
    map.on("click", "leases-fill", (e) => {
      if (this.opts.layers.landtracLease !== true) return;
      if (e.features && e.features[0]) {
        const ctrl = e.originalEvent && (e.originalEvent.ctrlKey || e.originalEvent.metaKey);
        this.opts.onSelectLease && this.opts.onSelectLease(e.features[0].properties.idx, ctrl);
      }
    });
    map.on("click", (e) => {
      const hits = map.queryRenderedFeatures(e.point, { layers: ["wells", "leases-fill"] });
      if (!hits || hits.length === 0) {
        this.opts.onEmptyClick && this.opts.onEmptyClick();
      }
    });
    map.on("mouseenter", "wells", () => map.getCanvas().style.cursor = "pointer");
    map.on("mouseleave", "wells", () => map.getCanvas().style.cursor = "");
    this._applyLayers();
  }
  _applyLayers() {
    const map = this.map; if (!map.getLayer("wells")) return;
    const L = this.opts.layers;
    const filter = ["all"];
    const hidden = [];
    if (L.wells === false) hidden.push("wells");
    if (L.permits === false) hidden.push("permits");
    if (L.rigs === false) hidden.push("rigs");
    map.setFilter("wells", hidden.length ? ["!", ["in", ["get", "layer"], ["literal", hidden]]] : null);
    map.setLayoutProperty("laterals", "visibility", L.wells === false ? "none" : "visible");
    if (map.getLayer("laterals")) map.setPaintProperty("laterals", "line-opacity", L.wells === 'view' ? 0.65 : 0.85);
    map.setPaintProperty("wells", "circle-opacity", ["case",
      ["==", ["get", "layer"], "wells"],   L.wells   === 'view' ? 0.65 : 1,
      ["==", ["get", "layer"], "permits"], L.permits === 'view' ? 0.65 : 1,
      ["==", ["get", "layer"], "rigs"],    L.rigs    === 'view' ? 0.65 : 1,
      1
    ]);
    const leaseHidden = L.landtracLease === false;
    ["leases-fill", "leases-sel-fill", "leases-line", "leases-sel"].forEach(function(id) {
      if (map.getLayer(id)) map.setLayoutProperty(id, "visibility", leaseHidden ? "none" : "visible");
    });
    if (map.getLayer("leases-fill")) map.setPaintProperty("leases-fill", "fill-opacity", L.landtracLease === 'view' ? 0.05 : 0.10);
    if (map.getLayer("leases-line")) map.setPaintProperty("leases-line", "line-opacity", L.landtracLease === 'view' ? 0.4 : 0.75);
  }
  setState(opts) {
    const prevUrl = this._styleUrl(this.opts);
    Object.assign(this.opts, opts);
    const nextUrl = this._styleUrl(this.opts);
    if (nextUrl !== prevUrl) {
      this.map.setStyle(nextUrl);
      this.map.once("style.load", () => this._addLayers());
      return;
    }
    if (this.map.isStyleLoaded() && this.map.getLayer("wells")) {
      this._applyLayers();
      this.map.setPaintProperty("wells", "circle-radius",
        ["interpolate", ["linear"], ["zoom"], 8, 2, 12, this.opts.tweaks.dotSize || 4, 15, (this.opts.tweaks.dotSize || 4) + 3]);
    }
  }
  setSelected(idxs, activeIdx, fly) {
    if (!this.map.getLayer("wells-sel")) return;
    const arr = Array.isArray(idxs) ? idxs : (idxs != null ? [idxs] : []);
    this.map.setFilter("wells-sel", arr.length ? ["in", ["get", "idx"], ["literal", arr]] : ["==", ["get", "idx"], -1]);
    if (fly && activeIdx != null) {
      const w = D().WELLS[activeIdx];
      if (w) this.map.easeTo({ center: [w.lng, w.lat], duration: 500 });
    }
  }
  // Screen position relative to the map container, so the selection overlays work on Mapbox too.
  _project(lng, lat) { const p = this.map.project([lng, lat]); return { x: p.x, y: p.y }; }
  setSelectedLeases(idxs) {
    if (!this.map.getLayer("leases-sel")) return;
    const arr = Array.isArray(idxs) ? idxs : [];
    const f = arr.length ? ["in", ["get", "idx"], ["literal", arr]] : ["==", ["get", "idx"], -1];
    this.map.setFilter("leases-sel", f);
    this.map.setFilter("leases-sel-fill", f);
  }
  destroy() { try { this.map.remove(); } catch (e) {} }
}

// =====================================================================
// React wrapper
// =====================================================================
const SELECTION_TOOLS = [
  { id: 'object-select',   icon: 'crosshair',     label: 'Object Selection' },
  { id: 'quick-select',    icon: 'paintbrush',    label: 'Brush Selection' },
  { id: 'rect-marquee',    icon: 'square-dashed', label: 'Rectangular Marquee Tool' },
  { id: 'ellipse-marquee', icon: 'circle',        label: 'Elliptical Marquee Tool' },
  { id: 'magic-wand',      icon: 'wand-2',        label: 'Magic Wand',        divider: true },
  { id: 'lasso',           icon: 'lasso',         label: 'Lasso',             divider: true },
  { id: 'poly-lasso',      icon: 'pentagon',      label: 'Polygonal Lasso' },
  { id: 'magnetic-lasso',  icon: 'magnet',        label: 'Magnetic Lasso' },
];

function SelectionFlyout({ activeTool, onTool, onClose }) {
  return React.createElement('div', {
    style: {
      position: 'absolute', right: 'calc(100% + 10px)', top: 0,
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 10, boxShadow: '0 4px 24px rgba(0,0,0,.22)',
      padding: '4px 0', minWidth: 205, zIndex: 100,
    }
  },
    React.createElement('div', { style: { padding: '8px 14px 6px', fontSize: 10, fontWeight: 700, letterSpacing: '1px', color: 'var(--s-muted)', textTransform: 'uppercase' } }, 'Selection Tools'),
    SELECTION_TOOLS.map(function(tool) {
      const isActive = activeTool === tool.id;
      return React.createElement(React.Fragment, { key: tool.id },
        tool.divider ? React.createElement('div', { style: { height: 1, background: 'var(--border)', margin: '4px 0' } }) : null,
        React.createElement('button', {
          onClick: function() { onTool(tool.id); onClose(); },
          style: {
            display: 'flex', alignItems: 'center', gap: 10, width: '100%',
            padding: '8px 14px', border: 'none', cursor: 'pointer', textAlign: 'left',
            background: isActive ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : 'transparent',
          }
        },
          React.createElement(Icon, { name: tool.icon, size: 14, color: isActive ? 'var(--primary)' : 'var(--s-muted)' }),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 500, flex: 1, color: isActive ? 'var(--primary)' : 'var(--s-text)' } }, tool.label),
          isActive ? React.createElement(Icon, { name: 'check', size: 13, color: 'var(--primary)' }) : null
        )
      );
    })
  );
}

function MapToolbar({ activeTool, onTool, additive, onAdditive }) {
  const [flyOpen, setFlyOpen] = React.useState(false);
  const groupRef = React.useRef(null);
  React.useEffect(function() {
    if (!flyOpen) return;
    function onDown(e) { if (groupRef.current && !groupRef.current.contains(e.target)) setFlyOpen(false); }
    document.addEventListener('mousedown', onDown);
    return function() { document.removeEventListener('mousedown', onDown); };
  }, [flyOpen]);
  const selTools = window.SELECTION_TOOLS || SELECTION_TOOLS;
  const selTool = selTools.find(function(t) { return t.id === activeTool; });
  const isSelGroup = !!selTool;
  const sep = React.createElement('div', { style: { height: 1, background: 'var(--border)', margin: '2px 2px' } });
  return React.createElement('div', {
    style: {
      position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
      zIndex: 60, display: 'flex', flexDirection: 'column', gap: 3,
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '5px', boxShadow: '0 2px 8px rgba(0,0,0,.18)'
    }
  },
    // Pointer
    React.createElement('button', {
      title: 'Click to select', onClick: () => onTool('pointer'),
      style: {
        width: 36, height: 36, borderRadius: 7, border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background .12s, color .12s',
        background: activeTool === 'pointer' ? 'var(--primary)' : 'transparent',
        color: activeTool === 'pointer' ? '#fff' : 'var(--s-muted)',
      }
    }, React.createElement(Icon, { name: 'mouse-pointer-2', size: 16, strokeWidth: 0, style: { fill: 'currentColor', stroke: 'none' } })),
    sep,
    // AI select
    React.createElement('button', {
      title: 'AI selection — describe what to select',
      onClick: () => onTool('ai-select'),
      style: {
        width: 36, height: 36, borderRadius: 7, border: 'none', position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', transition: 'background .12s, color .12s',
        background: activeTool === 'ai-select' ? 'var(--primary)' : 'color-mix(in srgb, var(--primary) 10%, transparent)',
        color: activeTool === 'ai-select' ? '#fff' : 'var(--primary)',
      }
    },
      React.createElement('span', { style: { position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 20, height: 20 } },
        React.createElement(Icon, { name: 'mouse-pointer-2', size: 14, strokeWidth: 0, style: { fill: 'var(--foreground)', stroke: 'none' } }),
        React.createElement('span', { style: { position: 'absolute', top: -3, right: -4, width: 10, height: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' } },
          React.createElement(Icon, { name: 'sparkles', size: 9, strokeWidth: 0, style: { fill: 'var(--foreground)', stroke: 'none' } })
        )
      )
    ),
    sep,
    // Selection group flyout
    React.createElement('div', { ref: groupRef, style: { position: 'relative' } },
      React.createElement('button', {
        title: selTool ? selTool.label : 'Selection tools',
        onClick: () => setFlyOpen(function(v) { return !v; }),
        style: {
          width: 36, height: 36, borderRadius: 7, border: 'none', position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          cursor: 'pointer', transition: 'background .12s, color .12s',
          background: isSelGroup ? 'var(--primary)' : 'transparent',
          color: isSelGroup ? '#fff' : 'var(--s-muted)',
        }
      },
        React.createElement(Icon, { name: selTool ? selTool.icon : 'square-dashed', size: 15 }),
        React.createElement('span', { style: {
          position: 'absolute', bottom: 4, left: 4, width: 0, height: 0,
          borderStyle: 'solid', borderWidth: '4px 0 0 4px',
          borderColor: 'currentColor transparent transparent transparent', opacity: 0.6
        } })
      ),
      flyOpen ? React.createElement(SelectionFlyout, { activeTool, onTool: function(id) { onTool(id); }, onClose: () => setFlyOpen(false) }) : null
    ),
  );
}

function AISelectOverlay({ additive, onSelectMulti, onDone }) {
  const [ready, setReady]   = React.useState(false); // true once user clicks map
  const [query, setQuery]   = React.useState('');
  const [phase, setPhase]   = React.useState('idle');
  const [count, setCount]   = React.useState(0);
  const [mouse, setMouse]   = React.useState(null);
  const inputRef = React.useRef(null);

  React.useEffect(function() {
    if (ready) setTimeout(function() { inputRef.current && inputRef.current.focus(); }, 60);
    function onKey(e) { if (e.key === 'Escape') setReady(false); }
    window.addEventListener('keydown', onKey);
    return function() { window.removeEventListener('keydown', onKey); };
  }, [ready]);

  // --- pre-click cursor overlay ---
  if (!ready) {
    const PRIMARY = '#3C8321';
    return React.createElement('div', {
      style: { position: 'absolute', inset: 0, zIndex: 55, cursor: 'crosshair' },
      onClick: function(e) { setMouse({ x: e.clientX, y: e.clientY }); setReady(true); },
      onMouseMove: function(e) { setMouse({ x: e.clientX, y: e.clientY }); },
    },
      mouse ? React.createElement('svg', {
        style: { position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', overflow: 'visible' }
      },
        React.createElement('g', null,
          React.createElement('circle', { cx: mouse.x, cy: mouse.y, r: 13, fill: 'none', stroke: PRIMARY, strokeWidth: 1.3, strokeDasharray: '3 2', opacity: 0.6 }),
          React.createElement('circle', { cx: mouse.x, cy: mouse.y, r: 2.5, fill: PRIMARY, opacity: 0.8 })
        ),
        // tooltip
        React.createElement('g', { transform: 'translate(' + (mouse.x + 16) + ',' + (mouse.y - 8) + ')' },
          React.createElement('rect', { x: 0, y: 0, width: 148, height: 24, rx: 5, fill: 'var(--card)', stroke: 'var(--border)', strokeWidth: 1 }),
          React.createElement('text', { x: 10, y: 16, fontSize: 11, fontFamily: 'var(--font-sans)', fill: 'var(--s-text)', fontWeight: 500 }, 'Click to open AI selection')
        )
      ) : null
    );
  }

  function parseAndSelect(q) {
    const d = window.STRIKE_DATA;
    const lower = q.toLowerCase();
    const hz = /\bhorizontal\b|\bhz\b/.test(lower);
    const vt = /\bvertical\b|\bvert\b/.test(lower);
    const typeTests = [
      { label: 'oil well',            re: /\boil well\b/ },
      { label: 'gas well',            re: /\bgas well\b/ },
      { label: 'oil & gas well',      re: /oil\s*[&+]\s*gas/ },
      { label: 'injection / disposal',re: /\binject|\bdisposal/ },
      { label: 'dry hole',            re: /\bdry/ },
      { label: 'plugged & abandoned', re: /\bplug|\babandon|\bp&a\b/ },
    ];
    const activeTypes = typeTests.filter(function(t) { return t.re.test(lower); }).map(function(t) { return t.label; });
    const stops = new Set(['select','find','show','get','all','the','and','or','with','that','are','have','wells','well','from','in','on','by','for','a','an','which','where']);
    const nameTokens = lower.split(/[\s,]+/).filter(function(t) {
      return t.length > 2 && !stops.has(t) &&
        !['oil','gas','horizontal','vertical','inject','dry','plug','abandon','well'].some(function(k) { return t.startsWith(k); });
    });
    return d.WELLS.filter(function(w) {
      if (hz && w.orientation !== 'Horizontal') return false;
      if (vt && w.orientation !== 'Vertical') return false;
      if (activeTypes.length > 0) {
        const wt = (w.type || '').toLowerCase();
        if (!activeTypes.some(function(t) { return wt.includes(t); })) return false;
      }
      if (nameTokens.length > 0) {
        const hay = [(w.operator||''), (w.formation||''), (w.field||w.name||'')].join(' ').toLowerCase();
        if (!nameTokens.some(function(t) { return hay.includes(t); })) {
          if (!hz && !vt && activeTypes.length === 0) return false;
        }
      }
      return true;
    }).map(function(w) { return w.idx; });
  }

  function submit(e) {
    e && e.preventDefault();
    if (!query.trim()) return;
    setPhase('thinking');
    setTimeout(function() {
      const idxs = parseAndSelect(query);
      setCount(idxs.length);
      if (idxs.length > 0) {
        setPhase('result');
        onSelectMulti(idxs, additive);
        setTimeout(function() { setReady(false); setPhase('idle'); setQuery(''); }, 900);
      } else {
        setPhase('empty');
      }
    }, 700);
  }

  const suggestions = ['Horizontal oil wells', 'Pioneer wells', 'Wolfcamp formation', 'Vertical gas wells', 'Injection wells'];
  const PRIMARY = 'var(--primary)';

  return React.createElement('div', {
    style: {
      position: 'absolute', left: '50%', bottom: 28, transform: 'translateX(-50%)',
      zIndex: 70, width: 420,
      background: 'var(--card)', border: '1px solid var(--border)',
      borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,.22)', overflow: 'hidden'
    }
  },
    // header
    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 7, padding: '11px 14px', borderBottom: '1px solid var(--border)' } },
      React.createElement(Icon, { name: 'sparkles', size: 14, color: 'var(--primary)' }),
      React.createElement('span', { style: { fontSize: 12, fontWeight: 600, letterSpacing: '.3px', color: 'var(--s-text)' } }, 'AI Selection'),
      React.createElement('span', { style: { fontSize: 11, color: 'var(--s-muted)', marginLeft: 2 } }, '— describe what to select'),
      React.createElement('button', {
        onClick: () => setReady(false),
        style: { marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--s-muted)', display: 'flex', padding: 2 }
      }, React.createElement(Icon, { name: 'x', size: 14 }))
    ),
    // input + submit
    React.createElement('form', { onSubmit: submit, style: { padding: '10px 12px 0' } },
      React.createElement('div', { style: { display: 'flex', gap: 8 } },
        React.createElement('input', {
          ref: inputRef, value: query,
          onChange: function(e) { setQuery(e.target.value); setPhase('idle'); },
          placeholder: 'e.g. horizontal oil wells by Pioneer in Wolfcamp',
          disabled: phase === 'thinking',
          style: {
            flex: 1, height: 36, padding: '0 12px', border: '1px solid var(--border)',
            borderRadius: 7, background: 'var(--s-input)', color: 'var(--s-text)',
            fontSize: 13, fontFamily: 'var(--font-sans)', outline: 'none',
          }
        }),
        React.createElement('button', {
          type: 'submit', disabled: !query.trim() || phase === 'thinking',
          style: {
            height: 36, padding: '0 14px', borderRadius: 7, border: 'none',
            background: PRIMARY, color: '#fff', fontSize: 12, fontWeight: 600,
            cursor: query.trim() && phase !== 'thinking' ? 'pointer' : 'default',
            fontFamily: 'var(--font-sans)', opacity: !query.trim() ? 0.45 : 1,
            display: 'flex', alignItems: 'center', gap: 5
          }
        },
          phase === 'thinking'
            ? React.createElement(Icon, { name: 'loader-circle', size: 13, color: '#fff' })
            : React.createElement(Icon, { name: 'sparkles', size: 13, color: '#fff' }),
          phase === 'thinking' ? 'Selecting…' : 'Select'
        )
      ),
      // feedback
      React.createElement('div', { style: { minHeight: 28, padding: '6px 2px', fontSize: 12 } },
        phase === 'result' ? React.createElement('span', { style: { color: PRIMARY, fontWeight: 500 } },
          '✓ ' + count.toLocaleString() + ' well' + (count === 1 ? '' : 's') + ' selected'
        ) : phase === 'empty' ? React.createElement('span', { style: { color: 'var(--s-muted)' } },
          'No matching wells found — try different keywords.'
        ) : null
      )
    ),
    // suggestions
    !query ? React.createElement('div', { style: { padding: '0 12px 10px', display: 'flex', flexWrap: 'wrap', gap: 5 } },
      suggestions.map(function(s) {
        return React.createElement('button', {
          key: s, type: 'button',
          onClick: function() { setQuery(s); setPhase('idle'); setTimeout(function() { inputRef.current && inputRef.current.focus(); }, 0); },
          style: {
            height: 24, padding: '0 10px', borderRadius: 999, border: '1px solid var(--border)',
            background: 'transparent', color: 'var(--s-muted)', fontSize: 11,
            cursor: 'pointer', fontFamily: 'var(--font-sans)'
          }
        }, s);
      })
    ) : null
  );
}

function DrawOverlay({ tool, engineRef, additive, onSelectMulti, onDone }) {
  const [polyPts, setPolyPts] = React.useState([]);
  const polyPtsRef = React.useRef([]); polyPtsRef.current = polyPts;
  const [circle, setCircle] = React.useState(null);
  const [circleDrag, setCirDrag] = React.useState(false);
  const [rCenter, setRCenter] = React.useState(null);
  const [tracePath, setTrace] = React.useState([]);
  const traceRef = React.useRef([]); traceRef.current = tracePath;
  const [tracing, setTracing] = React.useState(false);
  const tracingRef = React.useRef(false); tracingRef.current = tracing;
  const [dragSt, setDragSt] = React.useState(null);
  const [dragCur, setDragCur] = React.useState(null);
  const dragStRef = React.useRef(null);
  const [dragging, setDragging] = React.useState(false);
  const draggingRef = React.useRef(false); draggingRef.current = dragging;
  const [mouse, setMouse] = React.useState(null);
  const [shift, setShift] = React.useState(false);
  const svgRef = React.useRef(null);

  function sv(e) { const r = svgRef.current.getBoundingClientRect(); return { x: e.clientX - r.left, y: e.clientY - r.top }; }
  function dst(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }
  function pip(pt, pts) {
    let inside = false;
    for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
      const xi = pts[i].x, yi = pts[i].y, xj = pts[j].x, yj = pts[j].y;
      if (((yi > pt.y) !== (yj > pt.y)) && pt.x < (xj - xi) * (pt.y - yi) / (yj - yi) + xi) inside = !inside;
    }
    return inside;
  }
  function snapToWell(pt) {
    if (!engineRef || !engineRef.current) return pt;
    const eng = engineRef.current, d = window.STRIKE_DATA;
    let best = null, bestD = 35;
    d.WELLS.forEach(function(w) { const p = eng._project(w.lng, w.lat), dd = dst(p, pt); if (dd < bestD) { bestD = dd; best = p; } });
    return best || pt;
  }
  function runSel(shape) {
    if (!engineRef || !engineRef.current) { onDone(); return; }
    const eng = engineRef.current, d = window.STRIKE_DATA, idxs = [];
    d.WELLS.forEach(function(w) {
      const p = eng._project(w.lng, w.lat);
      let hit = false;
      if (shape.type === 'polygon') hit = pip(p, shape.pts);
      else if (shape.type === 'circle') hit = dst(p, shape.center) <= shape.radius;
      else if (shape.type === 'rect') hit = p.x >= shape.x1 && p.x <= shape.x2 && p.y >= shape.y1 && p.y <= shape.y2;
      else if (shape.type === 'ellipse') { const dx = (p.x - shape.cx) / Math.max(1, shape.rx), dy = (p.y - shape.cy) / Math.max(1, shape.ry); hit = dx*dx + dy*dy <= 1; }
      else if (shape.type === 'brush') hit = shape.path.some(function(bp) { return dst(p, bp) <= shape.r; });
      if (hit) idxs.push(w.idx);
    });
    onSelectMulti(idxs, additive); onDone();
  }

  const isPoly = tool === 'polygon' || tool === 'poly-lasso';
  const isCirc = tool === 'circle', isRad = tool === 'radius';
  const isLasso = tool === 'lasso', isMag = tool === 'magnetic-lasso', isQuick = tool === 'quick-select';
  const isRect = tool === 'rect-marquee', isEll = tool === 'ellipse-marquee';
  const isDrag = isRect || isEll, isPath = isLasso || isMag || isQuick;

  function onPolyClick(e) { if (e.detail >= 2) return; setPolyPts(function(p) { return p.concat(sv(e)); }); }
  function onPolyDbl() { const pts = polyPtsRef.current; if (pts.length < 3) { setPolyPts([]); onDone(); return; } runSel({ type: 'polygon', pts }); setPolyPts([]); }
  function onRadClick(e) { const pt = sv(e); if (!rCenter) setRCenter(pt); else { const r = dst(rCenter, pt); if (r < 5) { setRCenter(null); return; } runSel({ type: 'circle', center: rCenter, radius: r }); setRCenter(null); } }
  function onCirDown(e) { const pt = sv(e); setCircle({ cx: pt.x, cy: pt.y, r: 0 }); setCirDrag(true); }
  function onCirMove(e) { if (!circleDrag) return; const pt = sv(e); setCircle(function(c) { return c ? Object.assign({}, c, { r: dst({ x: c.cx, y: c.cy }, pt) }) : null; }); }
  function onCirUp() { setCirDrag(false); setCircle(function(c) { if (!c || c.r < 10) return null; runSel({ type: 'circle', center: { x: c.cx, y: c.cy }, radius: c.r }); return null; }); }
  function onDragDown(e) { const pt = sv(e); setDragSt(pt); dragStRef.current = pt; setDragCur(pt); setDragging(true); draggingRef.current = true; }
  function onDragMove(e) { if (!draggingRef.current) return; setShift(e.shiftKey); setDragCur(sv(e)); }
  function onDragUp(e) {
    setDragging(false); draggingRef.current = false;
    const st = dragStRef.current; if (!st) return;
    let en = sv(e);
    if (e.shiftKey) { const dx = en.x-st.x, dy = en.y-st.y, s = Math.min(Math.abs(dx),Math.abs(dy)); en = { x: st.x+Math.sign(dx)*s, y: st.y+Math.sign(dy)*s }; }
    const x1=Math.min(st.x,en.x), x2=Math.max(st.x,en.x), y1=Math.min(st.y,en.y), y2=Math.max(st.y,en.y);
    if (isRect && x2-x1>5 && y2-y1>5) runSel({ type: 'rect', x1, y1, x2, y2 });
    else if (isEll) { const cx=(x1+x2)/2, cy=(y1+y2)/2; let rx=(x2-x1)/2, ry=(y2-y1)/2; if (e.shiftKey) ry=rx; if (rx>5||ry>5) runSel({ type: 'ellipse', cx, cy, rx, ry }); }
    setDragSt(null); setDragCur(null);
  }
  function onPathDown(e) { const pt = sv(e); const p = isMag ? snapToWell(pt) : pt; setTrace([p]); traceRef.current=[p]; setTracing(true); tracingRef.current=true; }
  function onPathMove(e) { if (!tracingRef.current) return; const pt = sv(e); const p = isMag ? snapToWell(pt) : pt; setTrace(function(prev) { return prev.concat(p); }); }
  function onPathUp() { setTracing(false); tracingRef.current=false; const pts=traceRef.current; if (pts.length<3) { setTrace([]); onDone(); return; } if (isQuick) runSel({ type: 'brush', path: pts, r: 30 }); else runSel({ type: 'polygon', pts }); setTrace([]); }

  React.useEffect(function() {
    function onKey(e) { if (e.key==='Escape') { setPolyPts([]); setCircle(null); setRCenter(null); setTrace([]); setDragSt(null); setDragCur(null); setTracing(false); onDone(); } }
    window.addEventListener('keydown', onKey);
    return function() { window.removeEventListener('keydown', onKey); };
  }, []);

  let rX1=dragSt?dragSt.x:0, rY1=dragSt?dragSt.y:0, rX2=dragCur?dragCur.x:0, rY2=dragCur?dragCur.y:0;
  if (shift && dragSt && dragCur) { const dx=rX2-rX1,dy=rY2-rY1,s=Math.min(Math.abs(dx),Math.abs(dy)); rX2=rX1+Math.sign(dx)*s; rY2=rY1+Math.sign(dy)*s; }
  const mnX=Math.min(rX1,rX2), mnY=Math.min(rY1,rY2), rW=Math.abs(rX2-rX1), rH=Math.abs(rY2-rY1);
  const eCX=(rX1+rX2)/2, eCY=(rY1+rY2)/2, eRX=rW/2, eRY=shift?rW/2:rH/2;
  const P='#3C8321', F='rgba(60,131,33,.13)', MP='#9b6dff', MF='rgba(155,109,255,.13)', QP='#3b9ae1', QF='rgba(59,154,225,.18)';

  return React.createElement('svg', {
    ref: svgRef,
    style: { position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 55, cursor: 'crosshair', overflow: 'visible' },
    onClick: isPoly ? onPolyClick : (isRad ? onRadClick : undefined),
    onDoubleClick: isPoly ? onPolyDbl : undefined,
    onMouseDown: isCirc ? onCirDown : (isDrag ? onDragDown : (isPath ? onPathDown : undefined)),
    onMouseMove: function(e) { setMouse(sv(e)); if (isCirc) onCirMove(e); else if (isDrag) onDragMove(e); else if (isPath) onPathMove(e); },
    onMouseUp: isCirc ? onCirUp : (isDrag ? onDragUp : (isPath ? onPathUp : undefined)),
  },
    isPoly && polyPts.length > 0 ? React.createElement('g', { key: 'poly' },
      polyPts.length > 2 ? React.createElement('polygon', { points: polyPts.map(function(p){return p.x+','+p.y;}).join(' '), fill: F }) : null,
      React.createElement('polyline', { points: polyPts.map(function(p){return p.x+','+p.y;}).join(' '), fill: 'none', stroke: P, strokeWidth: 1.5, strokeDasharray: '5 3' }),
      mouse ? React.createElement('line', { x1: polyPts[polyPts.length-1].x, y1: polyPts[polyPts.length-1].y, x2: mouse.x, y2: mouse.y, stroke: P, strokeWidth: 1, strokeDasharray: '4 4', opacity: 0.55 }) : null,
      polyPts.map(function(p,i) { return React.createElement('circle', { key: 'v'+i, cx: p.x, cy: p.y, r: i===0?5:3.5, fill: i===0?P:'#fff', stroke: P, strokeWidth: 1.5 }); }),
      polyPts.length >= 3 && mouse && Math.hypot(mouse.x-polyPts[0].x, mouse.y-polyPts[0].y) < 18 ? React.createElement('circle', { cx: polyPts[0].x, cy: polyPts[0].y, r: 10, fill: 'none', stroke: P, strokeWidth: 1.5, opacity: 0.45 }) : null
    ) : null,
    isCirc && circle && circle.r > 1 ? React.createElement('g', { key: 'circ' },
      React.createElement('circle', { cx: circle.cx, cy: circle.cy, r: circle.r, fill: F, stroke: P, strokeWidth: 1.5, strokeDasharray: '5 3' }),
      React.createElement('circle', { cx: circle.cx, cy: circle.cy, r: 3.5, fill: P })
    ) : null,
    isRad && rCenter && mouse ? React.createElement('g', { key: 'rad' },
      React.createElement('circle', { cx: rCenter.x, cy: rCenter.y, r: Math.max(1, Math.hypot(mouse.x-rCenter.x, mouse.y-rCenter.y)), fill: F, stroke: P, strokeWidth: 1.5, strokeDasharray: '5 3' }),
      React.createElement('line', { x1: rCenter.x, y1: rCenter.y, x2: mouse.x, y2: mouse.y, stroke: P, strokeWidth: 1, strokeDasharray: '3 3', opacity: 0.5 }),
      React.createElement('circle', { cx: rCenter.x, cy: rCenter.y, r: 4, fill: P }),
      React.createElement('circle', { cx: mouse.x, cy: mouse.y, r: 3, fill: 'none', stroke: P, strokeWidth: 1.5 })
    ) : null,
    isRad && !rCenter && mouse ? React.createElement('g', { key: 'rad-idle' },
      React.createElement('circle', { cx: mouse.x, cy: mouse.y, r: 11, fill: 'none', stroke: P, strokeWidth: 1.2, strokeDasharray: '3 2', opacity: 0.55 }),
      React.createElement('circle', { cx: mouse.x, cy: mouse.y, r: 2.5, fill: P, opacity: 0.7 })
    ) : null,
    (isLasso || isMag) && tracePath.length > 0 ? React.createElement('g', { key: 'lasso' },
      tracePath.length > 2 ? React.createElement('polygon', { points: tracePath.map(function(p){return p.x+','+p.y;}).join(' '), fill: isMag?MF:F }) : null,
      React.createElement('polyline', { points: tracePath.map(function(p){return p.x+','+p.y;}).join(' '), fill: 'none', stroke: isMag?MP:P, strokeWidth: 1.5, strokeDasharray: '4 2' }),
      isMag ? tracePath.filter(function(_,i){return i%6===0;}).map(function(p,i){return React.createElement('circle',{key:'mp'+i,cx:p.x,cy:p.y,r:3,fill:MP,opacity:0.75});}) : null,
      React.createElement('circle', { cx: tracePath[0].x, cy: tracePath[0].y, r: 4.5, fill: isMag?MP:P })
    ) : null,
    isQuick ? React.createElement('g', { key: 'quick' },
      tracePath.map(function(p,i){return React.createElement('circle',{key:'qb'+i,cx:p.x,cy:p.y,r:30,fill:QF});}),
      tracePath.length>0?React.createElement('circle',{cx:tracePath[tracePath.length-1].x,cy:tracePath[tracePath.length-1].y,r:30,fill:'none',stroke:QP,strokeWidth:1.5,strokeDasharray:'4 2'}):null,
      !tracing&&mouse?React.createElement('circle',{cx:mouse.x,cy:mouse.y,r:30,fill:QF,stroke:QP,strokeWidth:1.3,strokeDasharray:'4 2'}):null
    ) : null,
    isRect && dragSt && dragCur ? React.createElement('rect', { key: 'rect', x: mnX, y: mnY, width: rW, height: rH, fill: F, stroke: P, strokeWidth: 1.5, strokeDasharray: '6 3' }) : null,
    isEll && dragSt && dragCur && eRX > 2 ? React.createElement('g', { key: 'ell' },
      React.createElement('ellipse', { cx: eCX, cy: eCY, rx: eRX, ry: eRY, fill: F, stroke: P, strokeWidth: 1.5, strokeDasharray: '6 3' }),
      React.createElement('circle', { cx: eCX, cy: eCY, r: 3, fill: P })
    ) : null
  );
}

function MapView({ theme, layers, tweaks, token, lightBasemapStyle, darkBasemapStyle, selectedIdxs, selectedIdx, selectSource, onSelect, onHover, onEngine, onEmptyClick, onSelectLease, selectedLeaseIdxs, drawTool }) {
  const hostRef = React.useRef(null);
  const engineRef = React.useRef(null);
  const usingMapbox = !!token && token.indexOf("pk.") === 0 && token.length >= 40 && typeof mapboxgl !== "undefined";

  React.useEffect(() => {
    const host = hostRef.current;
    let engine;
    const common = { theme, layers, tweaks, onSelect, onHover, onEmptyClick, onSelectLease, token, lightBasemapStyle, darkBasemapStyle };
    if (usingMapbox) {
      try { engine = new MapboxMap(host, common); }
      catch (e) { console.warn("Mapbox init failed, using canvas", e); }
    }
    if (!engine) {
      const cv = document.createElement("canvas");
      cv.style.width = "100%"; cv.style.height = "100%"; cv.style.cursor = "grab";
      cv.style.display = "block";
      host.appendChild(cv);
      engine = new CanvasMap(cv, common);
    }
    engineRef.current = engine;
    if (onEngine) onEngine(engine);
    return () => { engine.destroy && engine.destroy(); if (host) host.innerHTML = ""; };
    // re-init only when the engine identity changes (not on every token keystroke)
    // eslint-disable-next-line
  }, [usingMapbox]);

  React.useEffect(() => { engineRef.current && engineRef.current.setState({ theme, layers, tweaks, drawTool, onEmptyClick, onSelectLease, lightBasemapStyle, darkBasemapStyle }); }, [theme, layers, tweaks, drawTool, onEmptyClick, onSelectLease, lightBasemapStyle, darkBasemapStyle]);
  React.useEffect(() => { engineRef.current && engineRef.current.setSelectedLeases && engineRef.current.setSelectedLeases(selectedLeaseIdxs || []); }, [selectedLeaseIdxs]);
  React.useEffect(() => {
    if (engineRef.current) engineRef.current.setSelected(selectedIdxs || [], selectedIdx, selectSource === "record");
  }, [selectedIdxs, selectedIdx, selectSource]);

  return React.createElement("div", { ref: hostRef, style: { position: "absolute", inset: 0 } });
}

window.MapView = MapView;
window.MapToolbar = MapToolbar;
window.DrawOverlay = DrawOverlay;
window.AISelectOverlay = AISelectOverlay;
window.SelectionFlyout = SelectionFlyout;
window.SELECTION_TOOLS = SELECTION_TOOLS;
window.STRIKE_buildGeoJSON = buildGeoJSON;

})();

/* ===== strike-chrome.jsx ===== */
;(function(){
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
  // States: false (off) | 'view' (visible, not interactive) | true (on, interactive)
  function cycle() {
    if (on === false) return onChange('view');
    if (on === 'view') return onChange(true);
    return onChange(false);
  }
  const isOn = on === true, isView = on === 'view';
  const bg = isOn ? 'var(--primary)' : isView ? 'color-mix(in srgb, var(--primary) 40%, var(--s-line-strong))' : 'var(--s-line-strong)';
  const justify = isOn ? 'flex-end' : isView ? 'center' : 'flex-start';
  const tip = isOn ? 'Interactive — click to turn off' : isView ? 'View only — click for full interaction' : 'Off — click to show as view only';
  return React.createElement("button", {
    onClick: (e) => { e.stopPropagation(); cycle(); },
    title: tip,
    style: {
      width: 38, height: 21, borderRadius: 999, border: "none", cursor: "pointer", padding: 2,
      background: bg, transition: "background .15s", flexShrink: 0,
      display: "flex", justifyContent: justify, alignItems: "center",
    },
  }, React.createElement("span", { style: { width: 17, height: 17, borderRadius: "50%", background: "#fff", display: "block" } }));
}

if (!document.getElementById('__badge-pop-kf')) {
  const s = document.createElement('style'); s.id = '__badge-pop-kf';
  s.textContent = '@keyframes badge-pop{0%{transform:scale(1)}40%{transform:scale(1.55)}100%{transform:scale(1)}}';
  document.head.appendChild(s);
}

function DlBadge({ count }) {
  const ref = React.useRef(null);
  const prev = React.useRef(count);
  React.useEffect(() => {
    if (ref.current && count !== prev.current) {
      ref.current.style.animation = 'none';
      ref.current.offsetWidth; // reflow
      ref.current.style.animation = 'badge-pop 0.7s ease-out';
    }
    prev.current = count;
  }, [count]);
  return React.createElement('span', { ref, style: {
    position: 'absolute', top: 3, right: 1, minWidth: 17, height: 17, padding: '0 4px',
    borderRadius: 999, background: 'var(--primary)', color: '#fff', fontSize: 10.5, fontWeight: 700,
    lineHeight: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
    border: '2px solid var(--s-header)', boxSizing: 'content-box', transformOrigin: 'center',
  }}, count > 99 ? '99+' : count);
}

function Header({ theme, onTheme, jobs, dlOpen, setDlOpen, onManage, onDeleteJob, onDownloadItem, onRenameJob, viewsOpen, onViewsToggle, viewCount, currentViewName }) {
  const dark = theme !== "light";
  const count = jobs.length;
  const iconBtn = { width: 38, height: 38, borderRadius: 8, background: "transparent", border: "none", cursor: "pointer", color: "var(--s-text)", display: "flex", alignItems: "center", justifyContent: "center" };
  return React.createElement("header", {
    style: {
      height: 60, flexShrink: 0, background: "var(--s-header)", borderBottom: "1px solid var(--s-line-strong)",
      display: "grid", gridTemplateColumns: "1fr auto 1fr", alignItems: "center", padding: "0 22px", position: "relative", zIndex: 60,
    },
  },
    // Left: logo
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 13 } },
      React.createElement(EnverusWordmark, { height: 17 }),
      React.createElement("span", { style: { width: 1, height: 20, background: "var(--foreground)", margin: "0 2px" } }),
      React.createElement("span", { style: { fontSize: 19, fontWeight: 500, letterSpacing: "1px", color: "var(--s-text)" } }, "STRIKE")
    ),
    // Center: views button
    React.createElement("button", {
      title: "Saved Views", onClick: onViewsToggle,
      style: {
        display: "flex", alignItems: "center", gap: 8, height: 36, padding: "0 14px",
        borderRadius: 8, border: "1px solid var(--s-line)", cursor: "pointer",
        background: viewsOpen ? "var(--s-chip)" : "transparent",
        color: "var(--s-text)", fontFamily: "var(--font-sans)",
        transition: "background .12s",
      },
      onMouseEnter: e => e.currentTarget.style.background = "var(--s-chip)",
      onMouseLeave: e => e.currentTarget.style.background = viewsOpen ? "var(--s-chip)" : "transparent",
    },
      React.createElement(CIcon, { name: "save", size: 16 }),
      React.createElement("span", { style: { fontSize: 13, fontWeight: 600, maxWidth: 220, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: currentViewName ? "var(--s-text)" : "var(--s-muted)" } }, currentViewName || "Unsaved View"),
      React.createElement(CIcon, { name: "chevron-down", size: 13, color: "var(--s-muted)" })
    ),
    // Right: controls
    React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, justifyContent: "flex-end" } },
      React.createElement("button", {
        title: count > 0 ? count + " download" + (count === 1 ? "" : "s") + " available" : "Downloads",
        onClick: onManage, style: Object.assign({ position: "relative", background: "transparent" }, iconBtn),
        onMouseEnter: e => e.currentTarget.style.background = "var(--s-chip)", onMouseLeave: e => e.currentTarget.style.background = "transparent",
      },
        React.createElement(CIcon, { name: "download", size: 19 }),
        count > 0 ? React.createElement(DlBadge, { count }) : null
      ),
      React.createElement("button", { title: "Toggle theme", onClick: onTheme, style: iconBtn,
        onMouseEnter: e => e.currentTarget.style.background = "var(--s-chip)", onMouseLeave: e => e.currentTarget.style.background = "transparent" },
        React.createElement(CIcon, { name: dark ? "moon" : "sun", size: 19 })),
      React.createElement("div", { style: { width: 38, height: 38, borderRadius: "50%", background: "var(--primary)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, marginLeft: 6 } }, "JS")
    ),
    null
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
      React.createElement(DLField, { label: "Date:" }, job.time),
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
        React.createElement("span", { style: { fontSize: 16, fontWeight: 700, color: "var(--s-text)" } }, "Downloads"),
        jobs.length ? React.createElement(DLButton, { variant: "secondary", icon: "settings-2", onClick: onManage }, "Manage Downloads") : null
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
      border: "1px solid transparent",
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

function WellsExpandable({ layers, setLayers }) {
  const [expanded, setExpanded] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState("FILTERS");
  const [search, setSearch] = React.useState("");
  const [pasteDialogOpen, setPasteDialogOpen] = React.useState(false);
  const [pasteText, setPasteText] = React.useState("");
  const [toastMessage, setToastMessage] = React.useState(null);
  const [showInvalidOnly, setShowInvalidOnly] = React.useState(false);
  const [invalidCount, setInvalidCount] = React.useState(0);
  const [sortDropdownOpen, setSortDropdownOpen] = React.useState(false);
  const [sortBy, setSortBy] = React.useState("a-z");
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
  
  const handlePasteSubmit = () => {
    const apis = pasteText.split(",").map(s => s.trim().toUpperCase()).filter(s => s);
    const validApis = apis.filter(api => apiList.includes(api));
    const invalid = apis.length - validApis.length;
    
    if (showInvalidOnly && invalid > 0) {
      setInvalidCount(invalid);
      return;
    }
    
    if (validApis.length > 0) {
      setSearch(validApis.join(", "));
      setPasteDialogOpen(false);
      setPasteText("");
      setShowInvalidOnly(false);
      setInvalidCount(0);
      setToastMessage("An API/UWI filter was applied successfully");
      setTimeout(() => setToastMessage(null), 3000);
    }
  };

  return React.createElement(React.Fragment, null,
    React.createElement("div", {
      style: {
        display: "flex", alignItems: "center", gap: 10, padding: "10px 12px",
        background: "transparent", borderRadius: 8,
        border: "1px solid transparent",
      },
    },
      React.createElement(CIcon, { name: "grip-vertical", size: 15, color: "var(--s-faint)", style: { cursor: "grab" } }),
      React.createElement("span", { style: { flex: 1, fontSize: 14.5, fontWeight: 500, color: "var(--s-text)" } }, "Wells"),
      React.createElement(Toggle, { on: layers.wells, onChange: (v) => setLayers(l => Object.assign({}, l, { wells: v })) }),
      React.createElement("button", { onClick: () => setExpanded(!expanded), style: { background: "none", border: "none", cursor: "pointer", padding: 0, display: "flex", alignItems: "center", color: "var(--s-muted)" } }, React.createElement(CIcon, { name: "chevron-down", size: 17, color: "var(--s-muted)" }))
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
          React.createElement("div", { style: { display: "flex", alignItems: "center", border: "1px solid var(--s-line)", borderRadius: "var(--radius-sm)", background: "var(--s-card)", overflow: "hidden" } },
            React.createElement("input", {
              type: "text", placeholder: "Search...", value: search, onChange: (e) => setSearch(e.target.value),
              style: {
                flex: 1, boxSizing: "border-box", padding: "6px 8px", background: "transparent", border: "none", fontSize: 12, color: "var(--s-text)", outline: "none",
              },
            }),
            React.createElement("button", {
              type: "button", title: "Paste a list of API/UWI values",
              style: { display: "flex", alignItems: "center", justifyContent: "center", width: 32, height: 32, background: "transparent", border: "none", borderLeft: "1px solid var(--s-line)", color: "var(--s-text)", cursor: "pointer", padding: 0, flexShrink: 0 },
              onClick: () => setPasteDialogOpen(true),
            },
              React.createElement(Icon, { name: "clipboard", size: 16 })
            )
          ),
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 4, fontSize: 11, color: "var(--s-muted)", marginTop: 6, marginBottom: 8, justifyContent: "space-between" } },
            React.createElement("button", {
              type: "button",
              onClick: () => setSortDropdownOpen(!sortDropdownOpen),
              style: { display: "flex", alignItems: "center", gap: 4, background: "transparent", border: "1px solid var(--s-line)", borderRadius: "var(--radius-sm)", padding: "4px 8px", cursor: "pointer", color: "var(--s-muted)", fontSize: 11, position: "relative" },
            },
              React.createElement("span", null, "Sort: " + (sortBy === "a-z" ? "A-Z" : sortBy === "z-a" ? "Z-A" : "Count")),
              sortDropdownOpen ? React.createElement("div", {
                style: { position: "absolute", top: "100%", left: 0, marginTop: 4, background: "var(--s-card)", border: "1px solid var(--s-line)", borderRadius: "var(--radius-sm)", minWidth: 120, boxShadow: "0 2px 8px rgba(0,0,0,0.1)", zIndex: 100 },
                onClick: (e) => e.stopPropagation(),
              },
                React.createElement("button", { onClick: () => { setSortBy("a-z"); setSortDropdownOpen(false); }, style: { width: "100%", padding: "8px 12px", background: sortBy === "a-z" ? "var(--s-chip)" : "transparent", border: "none", cursor: "pointer", textAlign: "left", fontSize: 11, color: "var(--s-text)", display: "block" } }, "A-Z"),
                React.createElement("button", { onClick: () => { setSortBy("z-a"); setSortDropdownOpen(false); }, style: { width: "100%", padding: "8px 12px", background: sortBy === "z-a" ? "var(--s-chip)" : "transparent", border: "none", cursor: "pointer", textAlign: "left", fontSize: 11, color: "var(--s-text)", display: "block" } }, "Z-A"),
                React.createElement("button", { onClick: () => { setSortBy("count"); setSortDropdownOpen(false); }, style: { width: "100%", padding: "8px 12px", background: sortBy === "count" ? "var(--s-chip)" : "transparent", border: "none", cursor: "pointer", textAlign: "left", fontSize: 11, color: "var(--s-text)", display: "block" } }, "Count")
              ) : null
            ),
            React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 6, cursor: "pointer", userSelect: "none" } },
              React.createElement("input", { type: "checkbox", style: { width: 14, height: 14, cursor: "pointer" } }),
              React.createElement("span", null, "Exclude")
            )
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
              React.createElement("span", { style: { fontSize: 11, color: "var(--s-muted)" } }, 1)
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
          React.createElement(Icon, { name: "sliders", size: 12 }),
          "Customize Filters"
        )
      ) : React.createElement("div", { style: { padding: "8px", color: "var(--s-muted)", fontSize: 11, textAlign: "center" } }, activeTab + " (coming soon)")
    ) : null,
    pasteDialogOpen ? React.createElement("div", {
      style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
      onClick: () => setPasteDialogOpen(false),
    },
      React.createElement("div", {
        style: { background: "var(--s-panel)", border: "1px solid var(--s-line)", borderRadius: 12, padding: 20, width: "90%", maxWidth: 400, boxShadow: "var(--shadow-overlay)" },
        onClick: (e) => e.stopPropagation(),
      },
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 } },
          React.createElement("div", { style: { fontSize: 14, fontWeight: 600, color: "var(--s-text)" } }, "Paste API/UWI List"),
          React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--s-text)", cursor: "pointer" } },
            React.createElement("input", { type: "checkbox", checked: showInvalidOnly, onChange: (e) => setShowInvalidOnly(e.target.checked), style: { cursor: "pointer" } }),
            "Show Invalid"
          )
        ),
        React.createElement("textarea", {
          value: pasteText, onChange: (e) => setPasteText(e.target.value),
          placeholder: "Paste up to 1000 API/UWI values here...",
          style: { width: "100%", height: 120, padding: 8, background: "var(--s-card)", border: invalidCount > 0 ? "1px solid var(--destructive)" : "1px solid var(--s-line)", borderRadius: 6, color: "var(--s-text)", fontSize: 12, fontFamily: "monospace", boxSizing: "border-box" },
        }),
        invalidCount > 0 ? React.createElement("div", { style: { fontSize: 12, color: "var(--destructive)", marginTop: 6 } }, `${invalidCount} of the API/UWI values is invalid`) : null,
        React.createElement("div", { style: { display: "flex", gap: 8, marginTop: 12, justifyContent: "flex-end" } },
          React.createElement("button", {
            onClick: () => setPasteDialogOpen(false),
            style: { padding: "6px 12px", background: "transparent", border: "1px solid var(--s-line)", borderRadius: 6, color: "var(--s-text)", cursor: "pointer", fontSize: 12, fontWeight: 500 },
          }, "Cancel"),
          React.createElement("button", {
            onClick: handlePasteSubmit,
            style: { padding: "6px 12px", background: "var(--primary)", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontSize: 12, fontWeight: 500 },
          }, "Apply")
        )
      )
    ) : null,
    toastMessage ? React.createElement("div", {
      style: { position: "fixed", top: 20, left: "50%", transform: "translateX(-50%)", background: "var(--primary)", color: "#fff", padding: "12px 20px", borderRadius: 8, fontSize: 13, fontWeight: 500, boxShadow: "0 4px 12px rgba(0,0,0,0.2)", zIndex: 999999 },
    }, toastMessage) : null
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
        React.createElement(WellsExpandable, { layers, setLayers }),
        React.createElement(LayerRow, { label: "Permits", filtered: true, on: layers.permits, onToggle: (v) => setLayers(l => Object.assign({}, l, { permits: v })) }),
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
        )),
        React.createElement("div", { key: "lease", style: { display: "flex", alignItems: "center", gap: 10 } },
          React.createElement("span", { style: { width: 12, height: 12, borderRadius: 2, background: "rgba(212,162,74,0.25)", border: "1.5px solid #d4a24a", flexShrink: 0, boxSizing: "border-box" } }),
          React.createElement("span", { style: { fontSize: 13.5, color: "var(--s-text)" } }, "Lease")
        )
      )
    ) : null,
    React.createElement("button", {
      onClick: () => onOpen(!open),
      style: { display: "flex", alignItems: "center", gap: 9, height: 42, padding: "0 18px 0 16px", borderRadius: 10, background: "var(--card)", border: "1px solid var(--border)", color: "var(--s-text)", cursor: "pointer", fontSize: 15, fontWeight: 500, boxShadow: "var(--shadow-soft)" },
    }, React.createElement(CIcon, { name: "list", size: 18 }), "Legend")
  );
}

function StatusPill({ layers, records = [], onFlash }) {
  const { CopyApiBtn } = window;
  const d = window.STRIKE_DATA;
  const c = d.counts;
  const wellsLabel = c.wells >= 1000 ? (c.wells / 1000).toFixed(1).replace(/\.0$/, "") + "k" : c.wells;
  const wpTotal = c.wells + c.permits;
  const wpLabel = wpTotal >= 1000 ? (wpTotal / 1000).toFixed(1).replace(/\.0$/, "") + "k" : wpTotal;
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
    seg(layers.wells || layers.permits, wpLabel, "Wells & Permits"),
    CopyApiBtn ? React.createElement(CopyApiBtn, { size: "md", onCopy: (mode) => {
      const wellsForApi = records.length ? records.filter(r => d.CATS[r.cat] && d.CATS[r.cat].layer === 'wells') : d.WELLS.filter(w => d.CATS[w.cat] && layers[d.CATS[w.cat].layer] === true);
      const apiList = mode === "unformatted"
        ? wellsForApi.map(w => (w.api || "").replace(/[^0-9]/g, "")).join("\n")
        : wellsForApi.map(w => w.api).join("\n");
      if (navigator.clipboard) navigator.clipboard.writeText(apiList).catch(() => {});
      if (onFlash) onFlash("API list copied \u2014 paste with Ctrl+V (\u2318V on Mac)");
    } }) : null
  );
}

if (!document.getElementById('__toast-slide-kf')) {
  const s = document.createElement('style'); s.id = '__toast-slide-kf';
  s.textContent = '@keyframes toast-slide-in{0%{transform:translate(-50%,-24px);opacity:0}100%{transform:translate(-50%,0);opacity:1}}@keyframes toast-slide-out{0%{transform:translate(-50%,0);opacity:1}100%{transform:translate(-50%,-24px);opacity:0}}';
  document.head.appendChild(s);
}

function Toast({ msg }) {
  const [display, setDisplay] = React.useState(msg);
  const [closing, setClosing] = React.useState(false);
  const timer = React.useRef(null);
  React.useEffect(() => {
    clearTimeout(timer.current);
    if (msg) { setDisplay(msg); setClosing(false); }
    else if (display) {
      setClosing(true);
      timer.current = setTimeout(() => { setDisplay(null); setClosing(false); }, 280);
    }
    return () => clearTimeout(timer.current);
  }, [msg]);
  if (!display) return null;
  return React.createElement("div", {
    style: {
      position: "absolute", top: 16, left: "50%", zIndex: 80, background: "var(--primary)", color: "#fff",
      border: "none", borderRadius: 10, padding: "14px 24px", fontSize: 15, fontWeight: 600, whiteSpace: "nowrap",
      boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
      animation: (closing ? "toast-slide-out" : "toast-slide-in") + " 0.28s cubic-bezier(0.16,1,0.3,1) forwards",
    },
  }, display);
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

if (!document.getElementById('__spin-kf')) {
  const s = document.createElement('style'); s.id = '__spin-kf';
  s.textContent = '@keyframes mg-spin{to{transform:rotate(360deg)}}';
  document.head.appendChild(s);
}

function MgIconBtn({ icon, title, danger, onClick, loading }) {
  const [h, setH] = React.useState(false);
  return React.createElement("button", {
    title, onClick: loading ? undefined : onClick, disabled: loading, onMouseEnter: () => setH(true), onMouseLeave: () => setH(false),
    style: {
      width: 30, height: 30, borderRadius: "var(--radius-md)", cursor: loading ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center",
      border: "1px solid " + (h && !loading ? (danger ? "var(--error)" : "var(--s-line-strong)") : "var(--border)"),
      background: h && !loading ? (danger ? "var(--error-surface)" : "var(--s-chip)") : "transparent",
      color: danger ? "var(--error)" : "var(--s-text)", opacity: loading ? 0.7 : 1,
    },
  }, React.createElement(CIcon, { name: loading ? "loader-2" : icon, size: 15, style: loading ? { animation: "mg-spin 0.7s linear infinite" } : undefined }));
}

function ManageDownloadsDialog({ jobs, open, onClose, onDeleteJobs, onDownloadJobs, onClearAll, onRenameJob }) {
  const [sel, setSel] = React.useState({});
  const [busyIds, setBusyIds] = React.useState({});
  React.useEffect(() => { if (open) setSel({}); }, [open]);
  if (!open) return null;
  function handleDownload(id) {
    setBusyIds(b => Object.assign({}, b, { [id]: true }));
    onDownloadJobs([id]);
    setTimeout(() => setBusyIds(b => { const n = Object.assign({}, b); delete n[id]; return n; }), 1000);
  }
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
          React.createElement("div", { style: { fontSize: 20, fontWeight: 600, color: "var(--s-text)", letterSpacing: "-0.2px" } }, "Export History"),
          React.createElement("div", { style: { fontSize: 13, color: "var(--s-muted)", marginTop: 2 } }, "Exports will be removed after 7 days")
        ),
        React.createElement("button", { onClick: onClose, title: "Close", style: { background: "none", border: "none", cursor: "pointer", color: "var(--s-muted)", display: "flex", padding: 4 } }, React.createElement(CIcon, { name: "x", size: 20 }))
      ),
      // list
      jobs.length ? React.createElement("div", { style: { overflowY: "auto", flex: 1 } },
        jobs.map((job, i) => {
          return React.createElement("div", {
            key: job.id,
            style: {
              display: "flex", alignItems: "center", gap: 14, padding: "12px 22px",
              borderBottom: i === jobs.length - 1 ? "none" : "1px solid var(--border)",
            },
          },
            React.createElement(MgIconBtn, { icon: "download", title: "Download", loading: !!busyIds[job.id], onClick: (e) => { e.stopPropagation(); handleDownload(job.id); } }),
            React.createElement("div", { style: { flex: 2, minWidth: 0 } },
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 6, fontSize: 14, fontWeight: 600, color: "var(--s-text)" } },
                React.createElement("span", { style: { fontFamily: "var(--font-mono)" } }, job.name),
                React.createElement("button", { title: "Rename", onClick: (e) => { e.stopPropagation(); onRenameJob(job.id); }, style: { background: "none", border: "none", cursor: "pointer", color: "var(--s-muted)", display: "flex", padding: 2 } }, React.createElement(CIcon, { name: "pencil", size: 12 }))
              ),
              React.createElement("div", { style: { fontSize: 12.5, color: "var(--s-muted)", marginTop: 2 } }, job.details)
            ),
            React.createElement("div", { style: { flex: 1.3, minWidth: 0, fontSize: 12.5, color: "var(--s-muted)" } },
              React.createElement("div", { style: { color: "var(--s-text)" } }, job.time)
            ),
            React.createElement("span", { style: { fontSize: 11, fontWeight: 700, letterSpacing: ".3px", color: "var(--primary)", flexShrink: 0, width: 92 } }, job.status),
            React.createElement(MgIconBtn, { icon: "trash-2", title: "Delete", danger: true, onClick: (e) => { e.stopPropagation(); onDeleteJobs([job.id]); } })
          );
        })
      ) : React.createElement("div", { style: { padding: "48px 22px", textAlign: "center", color: "var(--s-muted)", fontSize: 14 } },
          React.createElement(CIcon, { name: "inbox", size: 30, color: "var(--s-faint)", style: { margin: "0 auto 12px" } }),
          "No downloads to manage."),
      // footer
      React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "flex-end", padding: "14px 22px", borderTop: "1px solid var(--border)", gap: 12 } },
        React.createElement("button", {
          onClick: onClose,
          style: { height: 36, padding: "0 18px", borderRadius: "var(--radius-md)", fontSize: 14, fontWeight: 500, fontFamily: "var(--font-sans)", cursor: "pointer", border: "none", background: "var(--primary)", color: "#fff" },
          onMouseEnter: e => e.currentTarget.style.background = "var(--primary-hover)", onMouseLeave: e => e.currentTarget.style.background = "var(--primary)",
        }, "Done")
      )
    )
  );
}

function ViewsPanel({ open, views, onClose, onSave, onLoad, onManage }) {
  const [search, setSearch] = React.useState('');
  if (!open) return null;
  function fmtAge(ts) {
    const s = (Date.now() - ts) / 1000;
    if (s < 60) return 'just now'; if (s < 3600) return Math.floor(s/60) + 'm ago';
    if (s < 86400) return Math.floor(s/3600) + 'h ago'; if (s < 604800) return Math.floor(s/86400) + 'd ago';
    return Math.floor(s/604800) + 'w ago';
  }
  const filtered = views.filter(v => v.name.toLowerCase().includes(search.toLowerCase()));
  return React.createElement(React.Fragment, null,
    React.createElement('div', { onClick: onClose, style: { position: 'fixed', inset: 0, zIndex: 64 } }),
    React.createElement('div', {
      style: { position: 'fixed', top: 64, left: '50%', transform: 'translateX(-50%)', width: 340, zIndex: 65, background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,.2)', overflow: 'hidden' }
    },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 18px', borderBottom: '1px solid var(--border)' } },
        React.createElement('span', { style: { fontSize: 15, fontWeight: 600, color: 'var(--s-text)' } }, 'Saved Views'),
        React.createElement('button', {
          onClick: () => { onSave(); onClose(); },
          style: { height: 30, padding: '0 12px', borderRadius: 6, border: 'none', background: 'var(--primary)', color: '#fff', fontSize: 12, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, fontFamily: 'var(--font-sans)' }
        }, React.createElement(CIcon, { name: 'plus', size: 13 }), 'Save current')
      ),
      views.length > 3 ? React.createElement('div', { style: { padding: '10px 18px', borderBottom: '1px solid var(--border)' } },
        React.createElement('input', { value: search, onChange: e => setSearch(e.target.value), placeholder: 'Search views…', style: { width: '100%', height: 32, padding: '0 10px', border: '1px solid var(--border)', borderRadius: 6, background: 'var(--s-input)', color: 'var(--s-text)', fontSize: 13, fontFamily: 'var(--font-sans)', outline: 'none', boxSizing: 'border-box' } })
      ) : null,
      React.createElement('div', { style: { maxHeight: 340, overflowY: 'auto' } },
        filtered.length === 0 ? React.createElement('div', { style: { padding: '28px 18px', textAlign: 'center', color: 'var(--s-muted)', fontSize: 13 } },
          views.length === 0 ? 'No saved views yet. Click \u201cSave current\u201d to save the current map state.' : 'No matching views.'
        ) : filtered.map(function(v) {
          return React.createElement('div', {
            key: v.id, onClick: () => { onLoad(v); onClose(); },
            style: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 18px', borderBottom: '1px solid var(--border)', cursor: 'pointer' },
            onMouseEnter: e => e.currentTarget.style.background = 'var(--s-chip)',
            onMouseLeave: e => e.currentTarget.style.background = 'transparent',
          },
            React.createElement(CIcon, { name: 'map-pin', size: 15, color: 'var(--primary)', style: { flexShrink: 0 } }),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: 'var(--s-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, v.name),
              React.createElement('div', { style: { fontSize: 12, color: 'var(--s-muted)', marginTop: 2 } }, v.layerLabels + (v.selectedCount > 0 ? ' \u00b7 ' + v.selectedCount + ' selected' : ''))
            ),
            React.createElement('span', { style: { fontSize: 11, color: 'var(--s-faint)', flexShrink: 0 } }, fmtAge(v.createdAt))
          );
        })
      ),
      views.length > 0 ? React.createElement('div', { style: { padding: '10px 18px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end' } },
        React.createElement('button', { onClick: () => { onManage(); onClose(); }, style: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--s-muted)', fontSize: 12, fontFamily: 'var(--font-sans)', display: 'flex', alignItems: 'center', gap: 5 } },
          'Manage views', React.createElement(CIcon, { name: 'arrow-right', size: 13 })
        )
      ) : null
    )
  );
}

function SaveViewDialog({ open, onClose, onSave, layers, selectedCount }) {
  const [name, setName] = React.useState('');
  const inputRef = React.useRef(null);
  React.useEffect(function() { if (open) { setName(''); setTimeout(function() { inputRef.current && inputRef.current.focus(); }, 60); } }, [open]);
  if (!open) return null;
  const layerLabels = [];
  if (layers.wells !== false) layerLabels.push('Wells');
  if (layers.permits !== false) layerLabels.push('Permits');
  if (layers.rigs !== false) layerLabels.push('Active Rigs');
  if (layers.landtracLease !== false) layerLabels.push('Landtrac Lease');
  if (layers.landtracUnit !== false) layerLabels.push('Landtrac Unit');
  function submit(e) { e && e.preventDefault(); if (!name.trim()) return; onSave(name.trim(), layerLabels); onClose(); }
  return React.createElement('div', { style: { position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.45)' }, onClick: e => { if (e.target === e.currentTarget) onClose(); } },
    React.createElement('div', { style: { width: 420, background: 'var(--card)', borderRadius: 14, boxShadow: '0 20px 60px rgba(0,0,0,.25)', overflow: 'hidden' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', borderBottom: '1px solid var(--border)' } },
        React.createElement('div', { style: { fontSize: 18, fontWeight: 600, color: 'var(--s-text)' } }, 'Save View'),
        React.createElement('button', { onClick: onClose, style: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--s-muted)', display: 'flex', padding: 4 } }, React.createElement(CIcon, { name: 'x', size: 18 }))
      ),
      React.createElement('div', { style: { padding: '20px 22px' } },
        React.createElement('div', { style: { background: 'var(--s-chip)', borderRadius: 8, padding: '9px 14px', marginBottom: 18, fontSize: 13, color: 'var(--s-muted)' } },
          layerLabels.join(', ') + (selectedCount > 0 ? ' \u00b7 ' + selectedCount + ' selected' : '')
        ),
        React.createElement('form', { onSubmit: submit },
          React.createElement('label', { style: { display: 'block', fontSize: 11, fontWeight: 600, color: 'var(--s-muted)', marginBottom: 6, letterSpacing: '1px', textTransform: 'uppercase' } }, 'View Name'),
          React.createElement('input', { ref: inputRef, value: name, onChange: e => setName(e.target.value), placeholder: 'e.g. Permian Basin Overview', style: { width: '100%', height: 38, padding: '0 12px', border: '1px solid var(--border)', borderRadius: 7, background: 'var(--s-input)', color: 'var(--s-text)', fontSize: 14, fontFamily: 'var(--font-sans)', outline: 'none', boxSizing: 'border-box' } })
        )
      ),
      React.createElement('div', { style: { display: 'flex', justifyContent: 'flex-end', gap: 10, padding: '14px 22px', borderTop: '1px solid var(--border)' } },
        React.createElement('button', { onClick: onClose, style: { height: 36, padding: '0 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--s-line-strong)', background: 'transparent', color: 'var(--s-text)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-sans)' } }, 'Cancel'),
        React.createElement('button', { onClick: submit, disabled: !name.trim(), style: { height: 36, padding: '0 16px', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: name.trim() ? 'pointer' : 'default', opacity: name.trim() ? 1 : 0.5, fontFamily: 'var(--font-sans)' } }, 'Save View')
      )
    )
  );
}

function ManageViewsDialog({ open, onClose, views, onDeleteViews, onRenameView }) {
  const [sel, setSel] = React.useState({});
  React.useEffect(function() { if (open) setSel({}); }, [open]);
  if (!open) return null;
  const selIds = views.filter(v => sel[v.id]).map(v => v.id);
  const allOn = views.length > 0 && selIds.length === views.length;
  function toggle(id) { setSel(s => Object.assign({}, s, { [id]: !s[id] })); }
  function toggleAll() { if (allOn) setSel({}); else { const m = {}; views.forEach(v => { m[v.id] = true; }); setSel(m); } }
  function fmtDate(ts) { return new Date(ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }); }
  return React.createElement('div', { style: { position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.45)' }, onClick: e => { if (e.target === e.currentTarget) onClose(); } },
    React.createElement('div', { style: { width: 560, maxHeight: '80vh', display: 'flex', flexDirection: 'column', background: 'var(--card)', borderRadius: 14, boxShadow: '0 20px 60px rgba(0,0,0,.25)', overflow: 'hidden' } },
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', borderBottom: '1px solid var(--border)', flexShrink: 0 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 18, fontWeight: 600, color: 'var(--s-text)' } }, 'Manage Views'),
          React.createElement('div', { style: { fontSize: 13, color: 'var(--s-muted)', marginTop: 2 } }, views.length + ' saved view' + (views.length === 1 ? '' : 's') + (selIds.length > 0 ? ' \u00b7 ' + selIds.length + ' selected' : ''))
        ),
        React.createElement('button', { onClick: onClose, style: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--s-muted)', display: 'flex', padding: 4 } }, React.createElement(CIcon, { name: 'x', size: 18 }))
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 22px', borderBottom: '1px solid var(--border)', flexShrink: 0, background: 'var(--s-chip)' } },
        React.createElement('label', { onClick: toggleAll, style: { display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' } },
          React.createElement('div', { style: { width: 17, height: 17, borderRadius: 4, flexShrink: 0, border: '1.5px solid ' + (allOn ? 'var(--primary)' : 'var(--s-line-strong)'), background: allOn ? 'var(--primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
            allOn ? React.createElement(CIcon, { name: 'check', size: 11, color: '#fff', strokeWidth: 3 }) : null
          ),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 500, color: 'var(--s-text)' } }, allOn ? 'Deselect all' : 'Select all')
        )
      ),
      React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
        views.map(function(v) {
          const on = !!sel[v.id];
          return React.createElement('div', { key: v.id, onClick: () => toggle(v.id), style: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px', borderBottom: '1px solid var(--border)', cursor: 'pointer', background: on ? 'color-mix(in srgb, var(--primary) 6%, transparent)' : 'transparent' } },
            React.createElement('div', { style: { width: 17, height: 17, borderRadius: 4, flexShrink: 0, border: '1.5px solid ' + (on ? 'var(--primary)' : 'var(--s-line-strong)'), background: on ? 'var(--primary)' : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center' } },
              on ? React.createElement(CIcon, { name: 'check', size: 11, color: '#fff', strokeWidth: 3 }) : null
            ),
            React.createElement(CIcon, { name: 'map-pin', size: 14, color: 'var(--primary)', style: { flexShrink: 0 } }),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: 'var(--s-text)' } }, v.name),
              React.createElement('div', { style: { fontSize: 12, color: 'var(--s-muted)', marginTop: 2 } }, v.layerLabels)
            ),
            React.createElement('span', { style: { fontSize: 12, color: 'var(--s-faint)', marginRight: 6 } }, fmtDate(v.createdAt)),
            React.createElement('button', { title: 'Rename', onClick: e => { e.stopPropagation(); const n = window.prompt('Rename view', v.name); if (n && n.trim()) onRenameView(v.id, n.trim()); }, style: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--s-muted)', display: 'flex', padding: 3 } }, React.createElement(CIcon, { name: 'pencil', size: 14 })),
            React.createElement('button', { title: 'Copy share link', onClick: e => { e.stopPropagation(); try { navigator.clipboard.writeText(window.location.href + '#view=' + v.id); } catch(e) {} }, style: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--s-muted)', display: 'flex', padding: 3 } }, React.createElement(CIcon, { name: 'share-2', size: 14 }))
          );
        })
      ),
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, padding: '14px 22px', borderTop: '1px solid var(--border)', flexShrink: 0 } },
        React.createElement('span', { style: { flex: 1 } }),
        React.createElement('button', { onClick: onClose, style: { height: 36, padding: '0 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--s-line-strong)', background: 'transparent', color: 'var(--s-text)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-sans)' } }, 'Done'),
        selIds.length > 0 ? React.createElement('button', { onClick: () => { onDeleteViews(selIds); setSel({}); }, style: { height: 36, padding: '0 16px', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--error)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' } }, 'Delete ' + selIds.length + ' view' + (selIds.length === 1 ? '' : 's')) : null
      )
    )
  );
}

Object.assign(window, { Header, LayersPanel, Legend, StatusPill, Toast, LeafMark, ManageDownloadsDialog, ViewsPanel, SaveViewDialog, ManageViewsDialog });

})();

/* ===== strike-panel.jsx ===== */
;(function(){
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

function ExportRow({ label, formats, csv, onTog, note, disabled, noteColor, geomOptions }) {
  const anySelected = !disabled && formats.some(function(f) { return csv[f.key]; });
  function toggleRow() {
    if (disabled) return;
    if (anySelected) {
      const updates = {};
      formats.forEach(function(f) { if (csv[f.key]) updates[f.key] = false; });
      onTog(updates);
    } else {
      onTog({ [formats[0].key]: true });
    }
  }
  return React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10, padding: "7px 0", opacity: disabled ? 0.5 : 1 } },
    React.createElement("button", {
      onClick: toggleRow,
      style: {
        width: 18, height: 18, borderRadius: 4, flexShrink: 0, padding: 0, cursor: disabled ? "default" : "pointer",
        background: anySelected ? "var(--primary)" : "transparent",
        border: "1.5px solid " + (anySelected ? "var(--primary)" : "var(--s-line-strong)"),
        display: "flex", alignItems: "center", justifyContent: "center",
      }
    }, anySelected ? React.createElement(Icon, { name: "check", size: 12, color: "#fff", strokeWidth: 3 }) : null),
    React.createElement("div", { style: { flex: 1 } },
      React.createElement("div", { style: { fontSize: 14, fontWeight: 500, color: "var(--s-text)" } }, label),
      note ? React.createElement("div", { style: { fontSize: 11, color: noteColor || "var(--s-muted)", marginTop: 1 } }, note) : null
    ),
    geomOptions && anySelected ? React.createElement("select", {
      defaultValue: "Surface Hole",
      onClick: (e) => e.stopPropagation(),
      onChange: (e) => e.stopPropagation(),
      style: { height: 26, borderRadius: "var(--radius-xs)", border: "1px solid var(--border)", background: "var(--card)", color: "var(--foreground)", fontSize: 12, fontFamily: "var(--font-sans)", padding: "0 6px", flexShrink: 0 }
    },
      geomOptions.map(g => React.createElement("option", { key: g, value: g }, g))
    ) : null,
    formats.some(function(f) { return f.label; }) ? React.createElement("div", { style: { display: "flex", gap: 5 } },
      formats.map(function(f) {
        const on = csv[f.key];
        return React.createElement("button", {
          key: f.key,
          onClick: () => onTog(f.key),
          style: {
            height: 26, padding: "0 10px", borderRadius: 999,
            fontSize: 11, fontWeight: 700, letterSpacing: ".3px",
            cursor: "pointer", transition: "all .12s",
            border: on ? "none" : "1px solid var(--s-line-strong)",
            background: on ? "var(--primary)" : "transparent",
            color: on ? "#fff" : "var(--s-muted)",
            fontFamily: "var(--font-sans)",
          }
        }, f.label);
      })
    ) : null
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

function CopyApiBtn({ onCopy, size }) {
  const md = size === "md";
  const [hover, setHover] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [pos, setPos] = React.useState(null);
  const btnRef = React.useRef(null);
  const showTip = () => {
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setPos({ x: r.left + r.width / 2, y: r.top - 6, menuLeft: r.left, menuBottom: window.innerHeight - r.top + 4 });
    }
    setHover(true);
  };
  React.useEffect(() => {
    if (!open) return;
    const close = () => setOpen(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [open]);
  return React.createElement("span", { style: { position: "relative", display: "inline-flex" } },
    React.createElement("button", {
      ref: btnRef,
      onClick: (e) => { e.stopPropagation(); if (btnRef.current) { const r = btnRef.current.getBoundingClientRect(); setPos(p => Object.assign({}, p, { menuLeft: r.left, menuBottom: window.innerHeight - r.top + 4 })); } setOpen(o => !o); },
      onMouseEnter: showTip,
      onMouseLeave: () => setHover(false),
      style: { display: "inline-flex", alignItems: "center", gap: md ? 7 : 5, justifyContent: "center", height: md ? 36 : 20, padding: md ? "0 14px" : "0 7px", border: "1px solid var(--border)", background: "transparent", borderRadius: "var(--radius-md)", cursor: "pointer", color: "var(--foreground)", fontSize: md ? 14 : 11, fontWeight: 500, fontFamily: "var(--font-sans)" }
    }, React.createElement(Icon, { name: "copy", size: md ? 15 : 12 }), "Copy API List", React.createElement(Icon, { name: open ? "chevron-up" : "chevron-down", size: md ? 13 : 11 })),
    (hover && !open && pos) ? ReactDOM.createPortal(
      React.createElement("span", { style: { position: "fixed", left: pos.x, top: pos.y, transform: "translate(-50%, -100%)", zIndex: 99999, background: "var(--popover)", color: "var(--popover-foreground)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", padding: "5px 9px", fontSize: 11, fontWeight: 500, whiteSpace: "nowrap", boxShadow: "var(--shadow-overlay)", pointerEvents: "none" } }, "Copy API List to Clipboard"),
      document.body
    ) : null,
    (open && pos) ? ReactDOM.createPortal(
      React.createElement("div", {
        onClick: (e) => e.stopPropagation(),
        style: { position: "fixed", left: pos.menuLeft, bottom: pos.menuBottom, zIndex: 99999, background: "var(--popover)", color: "var(--popover-foreground)", border: "1px solid var(--border)", borderRadius: "var(--radius-md)", boxShadow: "var(--shadow-overlay)", minWidth: 200, padding: 4, display: "flex", flexDirection: "column" }
      },
        React.createElement("button", {
          onClick: () => { setOpen(false); onCopy("formatted"); },
          style: { textAlign: "left", background: "transparent", border: "none", cursor: "pointer", padding: "8px 10px", fontSize: 13, fontWeight: 400, color: "var(--popover-foreground)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-sans)" },
          onMouseEnter: (e) => e.currentTarget.style.background = "var(--accent)",
          onMouseLeave: (e) => e.currentTarget.style.background = "transparent"
        }, "Copy Formatted API List"),
        React.createElement("button", {
          onClick: () => { setOpen(false); onCopy("unformatted"); },
          style: { textAlign: "left", background: "transparent", border: "none", cursor: "pointer", padding: "8px 10px", fontSize: 13, fontWeight: 400, color: "var(--popover-foreground)", borderRadius: "var(--radius-sm)", fontFamily: "var(--font-sans)" },
          onMouseEnter: (e) => e.currentTarget.style.background = "var(--accent)",
          onMouseLeave: (e) => e.currentTarget.style.background = "transparent"
        }, "Copy Unformatted API List")
      ),
      document.body
    ) : null
  );
}

function RecordPanel(props) {
  const { records = [], onClose, onClearAll, onExport, layers = {}, onEditSelections, selectedLeaseIdxs = [], responsiveExportDialog = false, dsSegmentedExportToggle = false, onFlash } = props;
  const d = window.STRIKE_DATA;

  const hasLeaseSelection = (props.selectedLeaseIdxs || []).length > 0;
  const hasSelection     = records.length > 0 || hasLeaseSelection;

  // Export state
  const [menuOpen, setMenuOpen] = React.useState(false);
  const [exportMode, setExportMode] = React.useState(hasSelection ? "selected" : "all");
  React.useEffect(function() {
    if (!menuOpen) return;
    setExportMode(hasSelection ? "selected" : "all");
    if (!hasSelection) {
      setCsv(Object.keys(csvDefaults).reduce(function(a, k) { a[k] = false; return a; }, {}));
    } else {
      const hasSelectedRigs = records.some(function(r) { return r.cat === 'rig'; });
      setCsv(Object.assign({}, csvDefaults, { rigsCSV: hasSelectedRigs }));
    }
  }, [menuOpen]);
  const exportSel = exportMode === "selected" && hasSelection;
  const hasRigs          = exportSel ? records.some(r => r.cat === 'rig') : layers.rigs === true;
  const hasPermits       = exportSel ? records.some(r => d.CATS[r.cat] && d.CATS[r.cat].layer === 'permits') : layers.permits === true;
  const hasWells         = exportSel ? records.some(r => d.CATS[r.cat] && d.CATS[r.cat].layer === 'wells') : layers.wells === true;
  const hasLandtracLease = exportSel ? hasLeaseSelection : layers.landtracLease === true;
  const hasLandtracUnit  = exportSel ? false : layers.landtracUnit === true;

  // Record counts for export accordion headers
  const _allPrimary = d.WELLS.filter(w => d.CATS[w.cat] && layers[d.CATS[w.cat].layer] === true);
  const exportWellsCount  = exportSel
    ? records.filter(r => d.CATS[r.cat] && d.CATS[r.cat].layer === 'wells').length
    : _allPrimary.filter(w => d.CATS[w.cat] && d.CATS[w.cat].layer === 'wells').length;
  const exportPermitsCount = exportSel
    ? records.filter(r => d.CATS[r.cat] && d.CATS[r.cat].layer === 'permits').length
    : _allPrimary.filter(w => d.CATS[w.cat] && d.CATS[w.cat].layer === 'permits').length;
  const exportRigsCount = exportSel
    ? records.filter(r => r.cat === 'rig').length
    : _allPrimary.filter(w => w.cat === 'rig').length;
  const exportCountSuffix = exportSel ? " records selected" : " records";

  // Popover height: fits all interactive-layer section headers (collapsed) + chrome
  const _exportSections = [
    layers.rigs === true,
    layers.wells === true,
    layers.permits === true,
    layers.landtracLease === true,
    layers.landtracUnit === true,
  ].filter(Boolean).length;
  const popoverH = Math.min(window.innerHeight - 120, 200 + _exportSections * 42);
  const csvDefaults = {
    rigsCSV: false, rigsSHP: false,
    permitsCSV: false, permitsSHP: false,
    top8WellFiles: true, wellHeaderCSV: true, wellHeaderSHP: false, wellMonthlyCSV: true,
    wellDocuments: false, wellsSHP: false, drillinginfoDRI: false, openworksOWX: false, geographixASCII4: false,
    relatedFiling: true, leaseHeaderCSV: true, leaseHeaderSHP: false, leaseAssignments: true, depthClauses: true,
    landtracLeaseCSV: false, landtracLeaseSHP: false,
    leaseAssignmentDataCSV: false, depthClauseDataCSV: false, relatedFilings: false,
    landtracUnitCSV: false, landtracUnitSHP: false,
  };
  const [csv, setCsv] = React.useState(() => {
    try { const s = JSON.parse(localStorage.getItem("strike_export_csv_v4")); return s ? Object.assign({}, csvDefaults, s) : csvDefaults; } catch (e) { return csvDefaults; }
  });
  React.useEffect(() => {
    try { localStorage.setItem("strike_export_csv_v4", JSON.stringify(csv)); } catch (e) {}
  }, [csv]);
  const tog = (key) => {
    if (typeof key === 'string') {
      setCsv(c => Object.assign({}, c, { [key]: !c[key] }));
    } else {
      setCsv(c => Object.assign({}, c, key));
    }
  };
  const exportTotal    = Object.values(csv).filter(Boolean).length;

  const rigsSelected    = [csv.rigsCSV, csv.rigsSHP].some(Boolean) ? 1 : 0;
  const permitsSelected = [csv.permitsCSV, csv.permitsSHP].some(Boolean) ? 1 : 0;
  const wellsSelected   = ([csv.wellHeaderCSV, csv.wellsSHP, csv.drillinginfoDRI, csv.openworksOWX, csv.geographixASCII4].some(Boolean) ? 1 : 0)
                        + (csv.wellDocuments ? 1 : 0)
                        + (csv.wellMonthlyCSV ? 1 : 0);
  const leaseSelected   = [csv.landtracLeaseCSV, csv.landtracLeaseSHP].some(Boolean) ? 1 : 0;
  const unitSelected    = [csv.landtracUnitCSV, csv.landtracUnitSHP].some(Boolean) ? 1 : 0;
  const [accRigs, setAccRigs]       = React.useState(true);
  const [accPermits, setAccPermits] = React.useState(true);
  const [accWells, setAccWells]     = React.useState(true);
  const [accLease, setAccLease]     = React.useState(true);
  const [accUnit, setAccUnit]       = React.useState(true);

  // ---- Insights computation ----
  const allLayersOn = layers.rigs !== false && layers.permits !== false &&
    layers.wells !== false && layers.landtracLease !== false && layers.landtracUnit !== false;

  const dataSubset = hasSelection
    ? records
    : d.WELLS.filter(w => d.CATS[w.cat] && layers[d.CATS[w.cat].layer] !== false);

  const wellsData   = dataSubset.filter(w => d.CATS[w.cat] && d.CATS[w.cat].layer === 'wells');
  const permitsData = dataSubset.filter(w => d.CATS[w.cat] && d.CATS[w.cat].layer === 'permits');
  const rigsData    = dataSubset.filter(w => w.cat === 'rig');

  // Lease selection: count wells/permits/rigs whose point falls inside selected lease polygons
  const _geoInPoly = function(lng, lat, coords) {
    let inside = false;
    for (let i = 0, j = coords.length - 1; i < coords.length; j = i++) {
      const xi = coords[i][0], yi = coords[i][1], xj = coords[j][0], yj = coords[j][1];
      if (((yi > lat) !== (yj > lat)) && (lng < (xj - xi) * (lat - yi) / (yj - yi) + xi)) inside = !inside;
    }
    return inside;
  };
  const hasLeaseSel = selectedLeaseIdxs.length > 0;
  const selLeases = hasLeaseSel ? (d.LEASES || []).filter(function(l) { return selectedLeaseIdxs.indexOf(l.idx) !== -1; }) : [];
  const inSelLeases = function(w) { return selLeases.some(function(l) { return _geoInPoly(w.lng, w.lat, l.coords); }); };
  const leaseWellsCount   = hasLeaseSel ? d.WELLS.filter(function(w) { return d.CATS[w.cat] && d.CATS[w.cat].layer === 'wells' && inSelLeases(w); }).length : 0;
  const leasePermitsCount = hasLeaseSel ? d.WELLS.filter(function(w) { return d.CATS[w.cat] && d.CATS[w.cat].layer === 'permits' && inSelLeases(w); }).length : 0;
  const leaseRigsCount    = hasLeaseSel ? d.WELLS.filter(function(w) { return w.cat === 'rig' && inSelLeases(w); }).length : 0;

  const typeCounts = {};
  wellsData.forEach(w => { typeCounts[w.type] = (typeCounts[w.type] || 0) + 1; });
  const typeEntries = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const maxTypeCount = typeEntries[0] ? typeEntries[0][1] : 1;

  const opCounts = {};
  dataSubset.forEach(w => { opCounts[w.operator] = (opCounts[w.operator] || 0) + 1; });
  const topOps = Object.entries(opCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxOpCount = topOps[0] ? topOps[0][1] : 1;

  const formCounts = {};
  wellsData.forEach(w => { formCounts[w.formation] = (formCounts[w.formation] || 0) + 1; });
  const topForms = Object.entries(formCounts).sort((a, b) => b[1] - a[1]).slice(0, 5);
  const maxFormCount = topForms[0] ? topForms[0][1] : 1;

  const horizCount = wellsData.filter(w => w.orientation === 'Horizontal').length;
  const vertCount  = wellsData.filter(w => w.orientation === 'Vertical').length;

  let contextLabel, contextSub;
  if (hasSelection) {
    contextLabel = 'SELECTION';
    contextSub = records.length + ' record' + (records.length === 1 ? '' : 's');
  } else if (!allLayersOn) {
    contextLabel = 'FILTERED VIEW';
    contextSub = dataSubset.length.toLocaleString() + ' records visible';
  } else {
    contextLabel = 'ALL VISIBLE DATA';
    contextSub = dataSubset.length.toLocaleString() + ' records';
  }

  const TYPE_COLORS = {
    'Oil Well': '#62c23f', 'Gas Well': '#3b9ae1', 'Oil & Gas Well': '#37c9bd',
    'Injection / Disposal': '#9b6dff', 'Dry Hole': '#e84db0', 'Plugged & Abandoned': '#b9c0c7',
  };

  return React.createElement("div", { style: { display: "flex", flexDirection: "column", height: "100%", background: "var(--s-panel)", borderLeft: "1px solid var(--s-line-strong)" } },
    // scroll region
    React.createElement("div", { style: { flex: 1, overflowY: "auto", padding: "16px 18px 8px" } },

      // summary tiles
      React.createElement("div", { style: { fontSize: 11, fontWeight: 600, letterSpacing: "1px", color: "var(--s-muted)", textTransform: "uppercase", marginBottom: 10 } }, "Explore this Area"),
      React.createElement("div", { style: { display: "flex", gap: 8, marginBottom: 20 } },
        wellsData.length > 0 ? React.createElement("div", { style: { flex: 1, background: "var(--s-card)", border: "1px solid var(--s-line)", borderRadius: "var(--radius-lg)", padding: "10px 12px" } },
          React.createElement("div", { style: { fontSize: 20, fontWeight: 700, color: "var(--s-text)", lineHeight: 1 } }, wellsData.length.toLocaleString()),
          React.createElement("div", { style: { fontSize: 10, color: "var(--s-muted)", marginTop: 4 } }, hasSelection ? "Wells Selected" : "Wells")
        ) : null,
        permitsData.length > 0 ? React.createElement("div", { style: { flex: 1, background: "var(--s-card)", border: "1px solid var(--s-line)", borderRadius: "var(--radius-lg)", padding: "10px 12px" } },
          React.createElement("div", { style: { fontSize: 20, fontWeight: 700, color: "var(--s-text)", lineHeight: 1 } }, permitsData.length.toLocaleString()),
          React.createElement("div", { style: { fontSize: 10, color: "var(--s-muted)", marginTop: 4 } }, hasSelection ? "Permits Selected" : "Permits")
        ) : null,
        rigsData.length > 0 ? React.createElement("div", { style: { flex: 1, background: "var(--s-card)", border: "1px solid var(--s-line)", borderRadius: "var(--radius-lg)", padding: "10px 12px" } },
          React.createElement("div", { style: { fontSize: 20, fontWeight: 700, color: "var(--s-text)", lineHeight: 1 } }, rigsData.length.toLocaleString()),
          React.createElement("div", { style: { fontSize: 10, color: "var(--s-muted)", marginTop: 4 } }, hasSelection ? "Active Rigs Selected" : "Active Rigs")
        ) : null,
        ((layers.landtracLease !== false || hasLeaseSel) && d.LEASES) ? React.createElement("div", { style: { flex: 1, background: "var(--s-card)", border: "1px solid var(--s-line)", borderRadius: "var(--radius-lg)", padding: "10px 12px" } },
          React.createElement("div", { style: { fontSize: 20, fontWeight: 700, color: "var(--s-text)", lineHeight: 1 } }, (hasLeaseSel ? selectedLeaseIdxs.length : d.LEASES.length).toLocaleString()),
          React.createElement("div", { style: { fontSize: 10, color: "var(--s-muted)", marginTop: 4 } }, hasLeaseSel ? "Leases Selected" : "Leases")
        ) : null
      ),

      // well types
      wellsData.length > 0 && typeEntries.length > 0 ? React.createElement("div", { style: { marginBottom: 20 } },
        React.createElement("div", { style: { fontSize: 11, fontWeight: 600, letterSpacing: "1px", color: "var(--s-muted)", marginBottom: 10 } }, "WELL TYPES"),
        typeEntries.map(([type, count]) => React.createElement("div", { key: type, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 7 } },
          React.createElement("div", { style: { width: 8, height: 8, borderRadius: "50%", background: TYPE_COLORS[type] || "#888", flexShrink: 0 } }),
          React.createElement("div", { style: { fontSize: 12, color: "var(--s-text)", width: 130, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, type),
          React.createElement("div", { style: { flex: 1, height: 4, background: "var(--s-line)", borderRadius: 2, overflow: "hidden" } },
            React.createElement("div", { style: { width: (count / maxTypeCount * 100) + "%", height: "100%", background: TYPE_COLORS[type] || "var(--primary)", borderRadius: 2, transition: "width .3s" } })
          ),
          React.createElement("div", { style: { fontSize: 12, color: "var(--s-muted)", width: 42, textAlign: "right", flexShrink: 0 } }, count.toLocaleString())
        ))
      ) : null,

      // top operators
      topOps.length > 0 ? React.createElement("div", { style: { marginBottom: 20, paddingTop: 16, borderTop: "1px solid var(--s-line)" } },
        React.createElement("div", { style: { fontSize: 11, fontWeight: 600, letterSpacing: "1px", color: "var(--s-muted)", marginBottom: 10 } }, "TOP OPERATORS"),
        topOps.map(([op, count]) => React.createElement("div", { key: op, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 7 } },
          React.createElement("div", { style: { fontSize: 12, color: "var(--s-text)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, op),
          React.createElement("div", { style: { width: 60, height: 4, background: "var(--s-line)", borderRadius: 2, overflow: "hidden", flexShrink: 0 } },
            React.createElement("div", { style: { width: (count / maxOpCount * 100) + "%", height: "100%", background: "var(--primary)", borderRadius: 2, transition: "width .3s" } })
          ),
          React.createElement("div", { style: { fontSize: 12, color: "var(--s-muted)", width: 36, textAlign: "right", flexShrink: 0 } }, count)
        ))
      ) : null,

      // formations
      wellsData.length > 0 && topForms.length > 0 ? React.createElement("div", { style: { marginBottom: 20, paddingTop: 16, borderTop: "1px solid var(--s-line)" } },
        React.createElement("div", { style: { fontSize: 11, fontWeight: 600, letterSpacing: "1px", color: "var(--s-muted)", marginBottom: 10 } }, "FORMATIONS"),
        topForms.map(([form, count]) => React.createElement("div", { key: form, style: { display: "flex", alignItems: "center", gap: 8, marginBottom: 7 } },
          React.createElement("div", { style: { fontSize: 12, color: "var(--s-text)", width: 120, flexShrink: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" } }, form),
          React.createElement("div", { style: { flex: 1, height: 4, background: "var(--s-line)", borderRadius: 2, overflow: "hidden" } },
            React.createElement("div", { style: { width: (count / maxFormCount * 100) + "%", height: "100%", background: "#3b9ae1", borderRadius: 2, transition: "width .3s" } })
          ),
          React.createElement("div", { style: { fontSize: 12, color: "var(--s-muted)", width: 42, textAlign: "right", flexShrink: 0 } }, count.toLocaleString())
        ))
      ) : null,

      // orientation
      wellsData.length > 0 && (horizCount + vertCount) > 0 ? React.createElement("div", { style: { paddingTop: 16, borderTop: "1px solid var(--s-line)", marginBottom: 8 } },
        React.createElement("div", { style: { fontSize: 11, fontWeight: 600, letterSpacing: "1px", color: "var(--s-muted)", marginBottom: 10 } }, "ORIENTATION"),
        React.createElement("div", { style: { display: "flex", gap: 8 } },
          React.createElement("div", { style: { flex: 1, background: "var(--s-card)", border: "1px solid var(--s-line)", borderRadius: "var(--radius-md)", padding: "8px 12px" } },
            React.createElement("div", { style: { fontSize: 18, fontWeight: 700, color: "var(--s-text)", lineHeight: 1 } }, horizCount.toLocaleString()),
            React.createElement("div", { style: { fontSize: 11, color: "var(--s-muted)", marginTop: 4 } }, "Horizontal")
          ),
          React.createElement("div", { style: { flex: 1, background: "var(--s-card)", border: "1px solid var(--s-line)", borderRadius: "var(--radius-md)", padding: "8px 12px" } },
            React.createElement("div", { style: { fontSize: 18, fontWeight: 700, color: "var(--s-text)", lineHeight: 1 } }, vertCount.toLocaleString()),
            React.createElement("div", { style: { fontSize: 11, color: "var(--s-muted)", marginTop: 4 } }, "Vertical")
          )
        )
      ) : null

    ),
    // Export Contents modal
    menuOpen ? React.createElement("div", {
      onClick: () => setMenuOpen(false),
      style: { position: "fixed", inset: 0, zIndex: 79, background: "transparent" },
    },
      React.createElement("div", {
        onClick: e => e.stopPropagation(),
        style: {
          position: "fixed", bottom: 76, right: 0, width: 420,
          height: responsiveExportDialog ? "auto" : "75vh", maxHeight: "75vh", display: "flex", flexDirection: "column",
          background: "var(--card)", border: "1px solid var(--border)",
          borderRadius: "var(--radius-xl) var(--radius-xl) 0 0",
          boxShadow: "-10px 0 40px rgba(0,0,0,0.35), 0 -6px 30px rgba(0,0,0,0.22)", overflow: "hidden", zIndex: 80,
          animation: "s-popover-in 0.4s cubic-bezier(0.16,1,0.3,1)",
        },
      },
        // modal header
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 22px", borderBottom: "1px solid var(--border)", flexShrink: 0 } },
          React.createElement("div", null,
            React.createElement("div", { style: { fontSize: 18, fontWeight: 600, color: "var(--s-text)", letterSpacing: "-0.2px" } }, "Export Options"),
          ),
          React.createElement("button", {
            onClick: () => setMenuOpen(false), title: "Close",
            style: { background: "none", border: "none", cursor: "pointer", color: "var(--s-muted)", display: "flex", padding: 4, borderRadius: "var(--radius-md)" },
          }, React.createElement(Icon, { name: "x", size: 20 }))
        ),
        // export mode toggle
        hasSelection ? React.createElement("div", { style: { padding: "12px 22px", borderBottom: "1px solid var(--border)", flexShrink: 0 } },
          React.createElement("label", { id: "exportModeLabel", style: { display: "block", fontSize: 12, fontWeight: 500, color: "var(--foreground)", marginBottom: 8 } }, "What do you want to Export?"),
          React.createElement("div", { role: "radiogroup", "aria-labelledby": "exportModeLabel", style: { display: "flex", flexDirection: "column", gap: 8 } },
            React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: hasSelection ? "pointer" : "not-allowed", opacity: hasSelection ? 1 : 0.6 }, onClick: () => hasSelection && setExportMode("selected") },
              React.createElement("span", { style: { width: 16, height: 16, borderRadius: "50%", flexShrink: 0, background: exportMode === "selected" ? "var(--primary)" : "transparent", border: "1.5px solid " + (exportMode === "selected" ? "var(--primary)" : "var(--s-line-strong)"), display: "flex", alignItems: "center", justifyContent: "center" } },
                exportMode === "selected" ? React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "#fff" } }) : null
              ),
              React.createElement("span", { style: { fontSize: 13, fontWeight: 500, color: "var(--foreground)" } }, "Selected Records")
            ),
            React.createElement("label", { style: { display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }, onClick: () => setExportMode("all") },
              React.createElement("span", { style: { width: 16, height: 16, borderRadius: "50%", flexShrink: 0, background: exportMode === "all" ? "var(--primary)" : "transparent", border: "1.5px solid " + (exportMode === "all" ? "var(--primary)" : "var(--s-line-strong)"), display: "flex", alignItems: "center", justifyContent: "center" } },
                exportMode === "all" ? React.createElement("span", { style: { width: 6, height: 6, borderRadius: "50%", background: "#fff" } }) : null
              ),
              React.createElement("span", { style: { fontSize: 13, fontWeight: 500, color: "var(--foreground)" } }, "All Records in Map Area")
            )
          )
        ) : null,
        // modal body
        React.createElement("div", { style: { flex: 1, minHeight: 0, overflowY: "auto", padding: "0 22px" } },
          // Active Rigs section
          hasRigs ? React.createElement("div", { style: { borderBottom: "1px solid var(--s-line)" } },
            React.createElement("div", {
              onClick: () => setAccRigs(v => !v),
              style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", cursor: "pointer" }
            },
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                React.createElement("span", { style: { fontSize: 12, fontWeight: 600, letterSpacing: "1px", color: "var(--s-text)", textTransform: "uppercase" } }, "Active Rigs"),
                React.createElement("span", { style: { fontSize: 12, color: "var(--s-faint)", fontWeight: 400 } }, exportRigsCount.toLocaleString() + exportCountSuffix),
              ),
              React.createElement(Icon, { name: accRigs ? "chevron-up" : "chevron-down", size: 15, color: "var(--s-muted)" })
            ),
            accRigs ? React.createElement("div", { style: { display: "flex", flexDirection: "column", paddingBottom: 14 } },
              React.createElement(ExportRow, { label: "Active Rigs CSV", formats: [{ key: "rigsCSV", label: "" }], csv, onTog: tog }),
              React.createElement(ExportRow, { label: "Active Rigs SHP", formats: [{ key: "rigsSHP", label: "" }], csv, onTog: tog })
            ) : null
          ) : null,
          // Wells section
          hasWells ? React.createElement("div", { style: { borderBottom: "1px solid var(--s-line)" } },
            React.createElement("div", {
              onClick: () => setAccWells(v => !v),
              style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", cursor: "pointer" }
            },
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                React.createElement("span", { style: { fontSize: 12, fontWeight: 600, letterSpacing: "1px", color: "var(--s-text)", textTransform: "uppercase" } }, "Wells"),
                React.createElement("span", { style: { fontSize: 12, color: "var(--s-faint)", fontWeight: 400 } }, exportWellsCount.toLocaleString() + exportCountSuffix),
                React.createElement(CopyApiBtn, { onCopy: (mode) => {
                  const wellsForApi = exportSel ? records.filter(r => d.CATS[r.cat] && d.CATS[r.cat].layer === 'wells') : _allPrimary.filter(w => d.CATS[w.cat] && d.CATS[w.cat].layer === 'wells');
                  const apiList = mode === "unformatted"
                    ? wellsForApi.map(w => (w.api || "").replace(/[^0-9]/g, "")).join("\n")
                    : wellsForApi.map(w => w.api).join("\n");
                  if (navigator.clipboard) navigator.clipboard.writeText(apiList).catch(() => {});
                  if (onFlash) onFlash("API list copied \u2014 paste with Ctrl+V (\u2318V on Mac)");
                } }),
              ),
              React.createElement(Icon, { name: accWells ? "chevron-up" : "chevron-down", size: 15, color: "var(--s-muted)" })
            ),
            accWells ? React.createElement("div", { style: { display: "flex", flexDirection: "column", paddingBottom: 14 } },
              React.createElement(ExportRow, { label: "Well Files", formats: [{ key: "top8WellFiles", label: "" }], csv, onTog: tog, disabled: !hasSelection, note: !hasSelection ? "Export limit is 100 records. Apply a filter to decrease the number of records" : null, noteColor: "var(--popover-foreground)" }),
              React.createElement(ExportRow, { label: "Well Headers CSV", formats: [{ key: "wellHeaderCSV", label: "" }], csv, onTog: tog }),
              React.createElement(ExportRow, { label: "Well Headers SHP", formats: [{ key: "wellHeaderSHP", label: "" }], csv, onTog: tog, geomOptions: ["Surface Hole", "Bottom Hole", "Well Lateral", "Calculated Horizontal Line"] }),
              React.createElement(ExportRow, { label: "Monthly Production", formats: [{ key: "wellMonthlyCSV", label: "" }], csv, onTog: tog })
            ) : null
          ) : null,
          // Permits section
          hasPermits ? React.createElement("div", { style: { borderBottom: "1px solid var(--s-line)" } },
            React.createElement("div", {
              onClick: () => setAccPermits(v => !v),
              style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", cursor: "pointer" }
            },
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                React.createElement("span", { style: { fontSize: 12, fontWeight: 600, letterSpacing: "1px", color: "var(--s-text)", textTransform: "uppercase" } }, "Permits"),
                React.createElement("span", { style: { fontSize: 12, color: "var(--s-faint)", fontWeight: 400 } }, exportPermitsCount.toLocaleString() + exportCountSuffix),
              ),
              React.createElement(Icon, { name: accPermits ? "chevron-up" : "chevron-down", size: 15, color: "var(--s-muted)" })
            ),
            accPermits ? React.createElement("div", { style: { display: "flex", flexDirection: "column", paddingBottom: 14 } },
              React.createElement(ExportRow, { label: "Permits CSV", formats: [{ key: "permitsCSV", label: "" }], csv, onTog: tog }),
              React.createElement(ExportRow, { label: "Permits SHP", formats: [{ key: "permitsSHP", label: "" }], csv, onTog: tog, geomOptions: ["Surface Hole", "Bottom Hole", "Directional Sticks"] })
            ) : null
          ) : null,
          // Landtrac Lease section
          hasLandtracLease ? React.createElement("div", { style: { borderBottom: "1px solid var(--s-line)" } },
            React.createElement("div", {
              onClick: () => setAccLease(v => !v),
              style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", cursor: "pointer" }
            },
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                React.createElement("span", { style: { fontSize: 12, fontWeight: 600, letterSpacing: "1px", color: "var(--s-text)", textTransform: "uppercase" } }, "Landtrac Lease"),
              ),
              React.createElement(Icon, { name: accLease ? "chevron-up" : "chevron-down", size: 15, color: "var(--s-muted)" })
            ),
            accLease ? React.createElement("div", { style: { display: "flex", flexDirection: "column", paddingBottom: 14 } },
              React.createElement(ExportRow, { label: "Related Filing", formats: [{ key: "relatedFiling", label: "" }], csv, onTog: tog }),
              React.createElement(ExportRow, { label: "Lease Headers CSV", formats: [{ key: "leaseHeaderCSV", label: "" }], csv, onTog: tog }),
              React.createElement(ExportRow, { label: "Lease Headers SHP", formats: [{ key: "leaseHeaderSHP", label: "" }], csv, onTog: tog }),
              React.createElement(ExportRow, { label: "Lease Assignments", formats: [{ key: "leaseAssignments", label: "" }], csv, onTog: tog }),
              React.createElement(ExportRow, { label: "Lease Assignment Data CSV", formats: [{ key: "leaseAssignmentDataCSV", label: "" }], csv, onTog: tog }),
              React.createElement(ExportRow, { label: "Depth Clause Data CSV", formats: [{ key: "depthClauseDataCSV", label: "" }], csv, onTog: tog })
            ) : null
          ) : null,
          // Landtrac Unit section
          hasLandtracUnit ? React.createElement("div", { style: { borderBottom: "1px solid var(--s-line)" } },
            React.createElement("div", {
              onClick: () => setAccUnit(v => !v),
              style: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 0", cursor: "pointer" }
            },
              React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 8 } },
                React.createElement("span", { style: { fontSize: 12, fontWeight: 600, letterSpacing: "1px", color: "var(--s-text)", textTransform: "uppercase" } }, "Landtrac Unit"),
              ),
              React.createElement(Icon, { name: accUnit ? "chevron-up" : "chevron-down", size: 15, color: "var(--s-muted)" })
            ),
            accUnit ? React.createElement("div", { style: { display: "flex", flexDirection: "column", paddingBottom: 14 } },
              React.createElement(ExportRow, { label: "Landtrac Unit CSV", formats: [{ key: "landtracUnitCSV", label: "" }], csv, onTog: tog }),
              React.createElement(ExportRow, { label: "Landtrac Unit SHP", formats: [{ key: "landtracUnitSHP", label: "" }], csv, onTog: tog })
            ) : null
          ) : null
        ),
        // modal footer
        React.createElement("div", { style: { display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, padding: "14px 22px", borderTop: "1px solid var(--border)", flexShrink: 0 } },
          React.createElement(CopyApiBtn, { size: "md", onCopy: (mode) => {
            const wellsForApi = exportSel ? records.filter(r => d.CATS[r.cat] && d.CATS[r.cat].layer === 'wells') : _allPrimary.filter(w => d.CATS[w.cat] && d.CATS[w.cat].layer === 'wells');
            const apiList = mode === "unformatted"
              ? wellsForApi.map(w => (w.api || "").replace(/[^0-9]/g, "")).join("\n")
              : wellsForApi.map(w => w.api).join("\n");
            if (navigator.clipboard) navigator.clipboard.writeText(apiList).catch(() => {});
            if (onFlash) onFlash("API list copied \u2014 paste with Ctrl+V (\u2318V on Mac)");
          } }),
          React.createElement("div", { style: { display: "flex", alignItems: "center", gap: 10 } },
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
          }, React.createElement(Icon, { name: "download", size: 15 }), "Export")
          )
        )
      )
    ) : null,
    // footer export bar
    React.createElement("div", { style: { padding: 14, borderTop: "1px solid var(--s-line)", background: "var(--s-panel)", marginTop: 10, display: "flex", alignItems: "center", gap: 10 } },
      React.createElement("button", {
        onClick: () => setMenuOpen(o => !o),
        style: { flex: 1, height: 48, background: menuOpen ? "var(--primary-hover)" : "var(--primary)", color: "#fff", border: "none", borderRadius: "var(--radius-md)", fontSize: 16, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 9, fontFamily: "var(--font-sans)", boxShadow: menuOpen ? "inset 0 2px 6px rgba(0,0,0,0.25)" : "none", transition: "background .12s, box-shadow .12s" },
        onMouseEnter: e => e.currentTarget.style.background = "var(--primary-hover)",
        onMouseLeave: e => e.currentTarget.style.background = menuOpen ? "var(--primary-hover)" : "var(--primary)",
      }, "Export Options..."),
      React.createElement(CopyApiBtn, { size: "md", onCopy: (mode) => {
        const wellsForApi = exportSel ? records.filter(r => d.CATS[r.cat] && d.CATS[r.cat].layer === 'wells') : _allPrimary.filter(w => d.CATS[w.cat] && d.CATS[w.cat].layer === 'wells');
        const apiList = mode === "unformatted"
          ? wellsForApi.map(w => (w.api || "").replace(/[^0-9]/g, "")).join("\n")
          : wellsForApi.map(w => w.api).join("\n");
        if (navigator.clipboard) navigator.clipboard.writeText(apiList).catch(() => {});
        if (onFlash) onFlash("API list copied \u2014 paste with Ctrl+V (\u2318V on Mac)");
      } })
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

function EditSelectionsDialog({ records, open, onClose, onRemove, onClearAll }) {
  const { Icon } = window;
  const [marked, setMarked] = React.useState({});
  const [typeFilter, setTypeFilter] = React.useState(null);
  React.useEffect(() => { if (open) { setMarked({}); setTypeFilter(null); } }, [open]);
  if (!open) return null;

  const typeCounts = {};
  records.forEach(r => { typeCounts[r.type || 'Unknown'] = (typeCounts[r.type || 'Unknown'] || 0) + 1; });
  const typeEntries = Object.entries(typeCounts).sort((a, b) => b[1] - a[1]);
  const TYPE_COLORS = {
    'Oil Well': '#62c23f', 'Gas Well': '#3b9ae1', 'Oil & Gas Well': '#37c9bd',
    'Injection / Disposal': '#9b6dff', 'Dry Hole': '#e84db0', 'Plugged & Abandoned': '#b9c0c7',
  };
  const visibleRecords = typeFilter ? records.filter(r => (r.type || 'Unknown') === typeFilter) : records;

  const toggle = (idx) => setMarked(m => Object.assign({}, m, { [idx]: !m[idx] }));
  const markedCount = Object.values(marked).filter(Boolean).length;
  const allMarked = visibleRecords.length > 0 && visibleRecords.every(r => marked[r.idx]);
  const toggleAll = () => {
    const m = Object.assign({}, marked);
    if (allMarked) visibleRecords.forEach(r => { m[r.idx] = false; });
    else visibleRecords.forEach(r => { m[r.idx] = true; });
    setMarked(m);
  };
  const removeMarked = () => {
    const idxs = records.filter(r => marked[r.idx]).map(r => r.idx);
    onRemove(idxs);
    onClose();
  };

  return React.createElement('div', {
    style: { position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,.45)' },
    onClick: (e) => { if (e.target === e.currentTarget) onClose(); }
  },
    React.createElement('div', {
      style: { width: 520, maxHeight: '75vh', display: 'flex', flexDirection: 'column', background: 'var(--card)', borderRadius: 14, boxShadow: '0 20px 60px rgba(0,0,0,.25)', overflow: 'hidden' }
    },
      // header
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px', borderBottom: '1px solid var(--border)', flexShrink: 0 } },
        React.createElement('div', null,
          React.createElement('div', { style: { fontSize: 18, fontWeight: 600, color: 'var(--s-text)', letterSpacing: '-0.2px' } }, 'Edit Selection'),
          React.createElement('div', { style: { fontSize: 13, color: 'var(--s-muted)', marginTop: 2 } }, records.length + ' record' + (records.length === 1 ? '' : 's') + ' selected' + (markedCount > 0 ? ' · ' + markedCount + ' marked' : ''))
        ),
        React.createElement('button', { onClick: onClose, style: { background: 'none', border: 'none', cursor: 'pointer', color: 'var(--s-muted)', display: 'flex', padding: 4 } },
          React.createElement(Icon, { name: 'x', size: 18 })
        )
      ),
      typeEntries.length > 1 ? React.createElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: 6, padding: '12px 22px', borderBottom: '1px solid var(--border)', flexShrink: 0, background: 'var(--s-bg)' } },
        typeEntries.map(function([type, count]) {
          const active = typeFilter === type;
          const color = TYPE_COLORS[type] || '#888';
          return React.createElement('button', {
            key: type, onClick: () => setTypeFilter(active ? null : type),
            style: {
              display: 'flex', alignItems: 'center', gap: 5, height: 26, padding: '0 10px',
              borderRadius: 999, cursor: 'pointer', fontFamily: 'var(--font-sans)',
              fontSize: 12, fontWeight: 600, transition: 'all .12s',
              border: active ? 'none' : '1px solid var(--s-line-strong)',
              background: active ? color : 'transparent',
              color: active ? '#fff' : 'var(--s-muted)',
            }
          },
            React.createElement('span', { style: { width: 7, height: 7, borderRadius: '50%', background: active ? 'rgba(255,255,255,.7)' : color, flexShrink: 0 } }),
            type + '  ', React.createElement('span', { style: { opacity: 0.75, fontWeight: 400 } }, count)
          );
        })
      ) : null,
      // select-all row
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, padding: '10px 22px', borderBottom: '1px solid var(--border)', flexShrink: 0, background: 'var(--s-chip)' } },
        React.createElement('label', { onClick: toggleAll, style: { display: 'flex', alignItems: 'center', gap: 9, cursor: 'pointer' } },
          React.createElement('div', {
            style: {
              width: 17, height: 17, borderRadius: 4, flexShrink: 0,
              border: '1.5px solid ' + (allMarked ? 'var(--primary)' : 'var(--s-line-strong)'),
              background: allMarked ? 'var(--primary)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }
          }, allMarked ? React.createElement(Icon, { name: 'check', size: 11, color: '#fff', strokeWidth: 3 }) : null),
          React.createElement('span', { style: { fontSize: 13, fontWeight: 500, color: 'var(--s-text)' } }, allMarked ? 'Deselect all' : 'Select all')
        ),
        typeFilter ? React.createElement('span', { style: { fontSize: 12, color: 'var(--s-muted)', marginLeft: 'auto' } }, 'Showing ', React.createElement('b', null, visibleRecords.length), ' of ', records.length) : null
      ),
      React.createElement('div', { style: { flex: 1, overflowY: 'auto' } },
        visibleRecords.map(function(r) {
          const on = !!marked[r.idx];
          return React.createElement('div', {
            key: r.idx,
            onClick: () => toggle(r.idx),
            style: {
              display: 'flex', alignItems: 'center', gap: 12, padding: '12px 22px',
              borderBottom: '1px solid var(--border)', cursor: 'pointer',
              background: on ? 'color-mix(in srgb, var(--primary) 6%, transparent)' : 'transparent',
              transition: 'background .1s'
            }
          },
            React.createElement('div', {
              style: {
                width: 17, height: 17, borderRadius: 4, flexShrink: 0,
                border: '1.5px solid ' + (on ? 'var(--primary)' : 'var(--s-line-strong)'),
                background: on ? 'var(--primary)' : 'transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }
            }, on ? React.createElement(Icon, { name: 'check', size: 11, color: '#fff', strokeWidth: 3 }) : null),
            React.createElement('div', { style: { width: 8, height: 8, borderRadius: '50%', background: TYPE_COLORS[r.type] || '#888', flexShrink: 0 } }),
            React.createElement('div', { style: { flex: 1, minWidth: 0 } },
              React.createElement('div', { style: { fontSize: 14, fontWeight: 600, color: 'var(--s-text)', fontFamily: 'var(--font-mono)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, r.name),
              React.createElement('div', { style: { fontSize: 12, color: 'var(--s-muted)', marginTop: 2 } }, r.operator + ' · ' + (r.orientation || '') + ' ' + (r.type || ''))
            )
          );
        })
      ),
      // footer
      React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: 10, padding: '14px 22px', borderTop: '1px solid var(--border)', flexShrink: 0 } },
        React.createElement('button', {
          onClick: () => { onClearAll(); onClose(); },
          style: { height: 36, padding: '0 14px', borderRadius: 'var(--radius-md)', border: '1px solid var(--s-line-strong)', background: 'transparent', color: 'var(--s-muted)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-sans)' }
        }, 'Clear all'),
        React.createElement('span', { style: { flex: 1 } }),
        React.createElement('button', { onClick: onClose, style: { height: 36, padding: '0 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--s-line-strong)', background: 'transparent', color: 'var(--s-text)', fontSize: 13, fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-sans)' } }, 'Done'),
        markedCount > 0 ? React.createElement('button', {
          onClick: removeMarked,
          style: { height: 36, padding: '0 16px', borderRadius: 'var(--radius-md)', border: 'none', background: 'var(--primary)', color: '#fff', fontSize: 13, fontWeight: 600, cursor: 'pointer', fontFamily: 'var(--font-sans)' }
        }, 'Remove ' + markedCount + ' record' + (markedCount === 1 ? '' : 's')) : null
      )
    )
  );
}

window.RecordPanel = RecordPanel;
window.EditSelectionsDialog = EditSelectionsDialog;
window.CopyApiBtn = CopyApiBtn;

})();

/* ===== strike-app.jsx ===== */
;(function(){
/* global React, ReactDOM */
// Enverus STRIKE — app wiring.
const { Header, LayersPanel, Legend, StatusPill, Toast, RecordPanel, EditSelectionsDialog, MapView, MapToolbar, DrawOverlay, AISelectOverlay, ManageDownloadsDialog, ViewsPanel, SaveViewDialog, ManageViewsDialog } = window;
const { useTweaks, TweaksPanel, TweakSection, TweakSlider, TweakToggle, TweakText, TweakSelect } = window;
const LIGHT_BASEMAP_STYLES = [
  { value: "mapbox://styles/jaidoubleu/cmped3pws002k01sc2twg1als", label: "Default Light" },
  { value: "mapbox://styles/jaidoubleu/cksruzh4z30oh18ptegc97aan", label: "Muted Light" },
  { value: "mapbox://styles/jaidoubleu/cmrat1y5v000w01ri5hgtbl44", label: "Light Blue Green" },
  { value: "mapbox://styles/jaidoubleu/cmolnwpmv000t01s61q70cq53", label: "2D Light" },
  { value: "mapbox://styles/jaidoubleu/cmnq32zve00a301s0852df4fr", label: "Prism Light" },
];
const DARK_BASEMAP_STYLES = [
  { value: "mapbox://styles/jaidoubleu/cmp9wzzqs000q01ri6lrldt2v", label: "Default Dark" },
  { value: "mapbox://styles/jaidoubleu/cl127hars001a15qoc7cmvxjy", label: "Dark Blue Gray" },
  { value: "mapbox://styles/jaidoubleu/clm7sk7yt02qe01qi0inwduj1", label: "Dark Muted" },
  { value: "mapbox://styles/jaidoubleu/cl24sqi6000hj15ozr8ix7fdh", label: "Claude Design Dark" },
  { value: "mapbox://styles/jaidoubleu/cmpe9zi1k000x01s3abdx3u87", label: "Mapbox Dark" },
  { value: "mapbox://styles/jaidoubleu/cmnq2xzrv000701s4djtu2l4x", label: "Prism Dark" },
  { value: "mapbox://styles/jaidoubleu/clm7sjoom02qr01qxdoer3830", label: "Dark Theme" },
];

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
  "token": "",
  "lightBasemapStyle": "mapbox://styles/jaidoubleu/cmped3pws002k01sc2twg1als",
  "darkBasemapStyle": "mapbox://styles/jaidoubleu/cmp9wzzqs000q01ri6lrldt2v",
  "responsiveExportDialog": true,
  "dsSegmentedExportToggle": false
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

  const [theme, setTheme] = React.useState(() => localStorage.getItem("strike_theme") || "light");
  React.useEffect(() => { localStorage.setItem("strike_theme", theme); document.documentElement.classList.toggle("dark", theme === "dark"); }, [theme]);
  React.useEffect(() => {
    setTweak(theme === "light" ? "lightBasemapStyle" : "darkBasemapStyle",
      theme === "light" ? "mapbox://styles/jaidoubleu/cmped3pws002k01sc2twg1als" : "mapbox://styles/jaidoubleu/cmp9wzzqs000q01ri6lrldt2v");
    // eslint-disable-next-line
  }, [theme]);

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
  const [recordIds, setRecordIds] = React.useState([]);
  const [active, setActive] = React.useState(0);
  const [selSource, setSelSource] = React.useState("init");
  const [drawTool, setDrawTool] = React.useState('pointer');
  const [additive, setAdditive] = React.useState(false);
  const mapEngineRef  = React.useRef(null);
  const drawToolRef   = React.useRef('pointer');
  const additiveRef   = React.useRef(false);
  React.useEffect(function() { drawToolRef.current = drawTool; }, [drawTool]);
  React.useEffect(function() { additiveRef.current  = additive;  }, [additive]);

  // Shift key temporarily enables additive mode
  React.useEffect(function() {
    function onDown(e) { if (e.key === 'Shift') setAdditive(true); }
    function onUp(e)   { if (e.key === 'Shift') setAdditive(false); }
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup',   onUp);
    return function() { window.removeEventListener('keydown', onDown); window.removeEventListener('keyup', onUp); };
  }, []);
  const [toast, setToast] = React.useState(null);
  const toastTimer = React.useRef(null);
  const [jobs, setJobs] = React.useState(DEFAULT_JOBS);
  const [dlOpen, setDlOpen] = React.useState(false);
  const [manageOpen, setManageOpen] = React.useState(false);
  const [viewsOpen, setViewsOpen] = React.useState(false);
  const [saveViewOpen, setSaveViewOpen] = React.useState(false);
  const [manageViewsOpen, setManageViewsOpen] = React.useState(false);
  const [currentViewName, setCurrentViewName] = React.useState(null);
  const VIEWS_KEY = 'strike_views_v1';
  const [views, setViews] = React.useState(function() { try { return JSON.parse(localStorage.getItem('strike_views_v1') || '[]'); } catch(e) { return []; } });

  const records = recordIds.map((i) => d.WELLS[i]);
  const selectedIdx = recordIds.length ? recordIds[active] : null;

  const flash = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 5000);
  };

  const selectMany = React.useCallback(function(idxs, isAdditive) {
    if (!idxs || idxs.length === 0) return;
    setRecordIds(function(prev) { return isAdditive ? Array.from(new Set(prev.concat(idxs))) : idxs; });
    setActive(0);
    setSelSource('draw');
  }, []);

  const selectWell = React.useCallback((idx, ctrl) => {
    // Magic wand: select all wells of same type
    if (drawToolRef.current === 'magic-wand') {
      const d = window.STRIKE_DATA;
      const clicked = d.WELLS.find(function(w) { return w.idx === idx; });
      if (!clicked) return;
      const idxs = d.WELLS.filter(function(w) { return w.type === clicked.type; }).map(function(w) { return w.idx; });
      setRecordIds(function(prev) { return additiveRef.current ? Array.from(new Set(prev.concat(idxs))) : idxs; });
      setActive(0); setSelSource('draw');
      return;
    }
    if (ctrl) {
      setRecordIds(function(ids) { const at = ids.indexOf(idx); if (at !== -1) { const n = ids.slice(); n.splice(at,1); return n; } return ids.concat(idx); });
    } else {
      setRecordIds([idx]);
    }
    setSelSource('map');
  }, []);

  const [editSelOpen, setEditSelOpen] = React.useState(false);

  const removeRecords = React.useCallback(function(idxsToRemove) {
    const removeSet = new Set(idxsToRemove);
    setRecordIds(function(ids) { return ids.filter(function(id) { return !removeSet.has(id); }); });
    setActive(0);
  }, []);

  const clearAll = React.useCallback(function() { setRecordIds([]); setActive(0); setLeaseIds([]); }, []);
  const [leaseIds, setLeaseIds] = React.useState([]);
  const selectLease = React.useCallback(function(idx, additive) {
    setLeaseIds(function(ids) {
      if (additive) {
        const at = ids.indexOf(idx);
        if (at !== -1) { const n = ids.slice(); n.splice(at, 1); return n; }
        return ids.concat(idx);
      }
      return (ids.length === 1 && ids[0] === idx) ? [] : [idx];
    });
  }, []);

  const handleSaveView = React.useCallback(function(name, layerLabels) {
    const eng = mapEngineRef.current;
    const view = {
      id: 'v_' + Date.now(), name, createdAt: Date.now(),
      center: eng && eng.map ? { lng: eng.map.getCenter().lng, lat: eng.map.getCenter().lat } : eng ? { lng: eng.cLng, lat: eng.cLat } : { lng: -101, lat: 32 },
      scale: eng && eng.map ? undefined : eng ? eng.scale : 2600,
      zoom: eng && eng.map ? eng.map.getZoom() : undefined,
      layers: Object.assign({}, layers),
      selectedIdxs: recordIds.slice(),
      selectedCount: recordIds.length,
      layerLabels: layerLabels.join(', ') || 'All layers',
    };
    const next = [view, ...views];
    setViews(next);
    try { localStorage.setItem('strike_views_v1', JSON.stringify(next)); } catch(e) {}
    flash('View \u201c' + name + '\u201d saved');
  }, [layers, recordIds, views]);

  const handleLoadView = React.useCallback(function(view) {
    const eng = mapEngineRef.current;
    if (eng && eng.map) { eng.map.jumpTo(Object.assign({ center: [view.center.lng, view.center.lat] }, view.zoom != null ? { zoom: view.zoom } : {})); }
    else if (eng && eng.cLng !== undefined) { eng.cLng = view.center.lng; eng.cLat = view.center.lat; if (view.scale) eng.scale = view.scale; eng.draw(); }
    setLayers(view.layers);
    setRecordIds(view.selectedIdxs || []);
    setActive(0);
    setCurrentViewName(view.name);
    flash('Loaded \u201c' + view.name + '\u201d');
  }, []);

  const handleDeleteViews = React.useCallback(function(ids) {
    setViews(function(prev) { const next = prev.filter(v => ids.indexOf(v.id) === -1); try { localStorage.setItem('strike_views_v1', JSON.stringify(next)); } catch(e) {} return next; });
  }, []);

  const handleRenameView = React.useCallback(function(id, name) {
    setViews(function(prev) { const next = prev.map(v => v.id === id ? Object.assign({}, v, { name }) : v); try { localStorage.setItem('strike_views_v1', JSON.stringify(next)); } catch(e) {} return next; });
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
    }, 3500);
  };

  const renameJob = (id) => {
    const job = jobs.find(j => j.id === id);
    const v = window.prompt("Rename download", job ? job.name : "");
    if (v != null && v.trim()) setJobs(js => js.map(j => j.id === id ? Object.assign({}, j, { name: v.trim() }) : j));
  };

  const tweaks = { dotSize: t.dotSize, density: t.density, labels: t.labels, grid: t.grid };

  return React.createElement("div", { className: "strike " + (theme === "light" ? "light" : "dark"), style: { position: "fixed", inset: 0, display: "flex", flexDirection: "column", background: "var(--s-bg)" } },
    React.createElement(Header, { theme, onTheme: () => setTheme(th => th === "light" ? "dark" : "light"), jobs, dlOpen, setDlOpen, onManage: () => setManageOpen(true), onDeleteJob: (id) => setJobs(j => j.filter(x => x.id !== id)), onDownloadItem: (job) => flash("Downloading " + job.name + ".csv …"), onRenameJob: renameJob, viewsOpen, viewCount: views.length, onViewsToggle: () => setViewsOpen(v => !v), currentViewName }),
    React.createElement("div", { style: { flex: 1, display: "flex", minHeight: 0 } },
      // map area
      React.createElement("div", { style: { position: "relative", flex: 1, minWidth: 0 } },
        React.createElement(MapView, { theme, layers, tweaks, token: (t.token || "").trim(), lightBasemapStyle: t.lightBasemapStyle, darkBasemapStyle: t.darkBasemapStyle, selectedIdxs: recordIds, selectedIdx, selectSource: selSource, onSelect: selectWell, onEmptyClick: clearAll, onSelectLease: selectLease, selectedLeaseIdxs: leaseIds, drawTool, onEngine: function(eng) { mapEngineRef.current = eng; } }),
        (drawTool !== 'pointer' && drawTool !== 'ai-select' && drawTool !== 'object-select' && drawTool !== 'magic-wand') ? React.createElement(DrawOverlay, { tool: drawTool, engineRef: mapEngineRef, additive, onSelectMulti: selectMany, onDone: () => {} }) : null,
        drawTool === 'ai-select' ? React.createElement(AISelectOverlay, { additive, onSelectMulti: selectMany, onDone: () => {} }) : null,
        React.createElement(MapToolbar, { activeTool: drawTool, onTool: setDrawTool, additive, onAdditive: () => setAdditive(v => !v) }),
        React.createElement(LayersPanel, { open: layersOpen, onOpen: setLayersOpen, layers, setLayers }),
        React.createElement(Legend, { open: legendOpen, onOpen: setLegendOpen }),
        React.createElement(StatusPill, { layers, records, onFlash: flash }),
        React.createElement(Toast, { msg: toast })
      ),
      // record panel
      React.createElement("div", { id: "insightsPanel", style: { width: PANEL_W, flexShrink: 0 } },
        React.createElement(RecordPanel, { records, onClose: closeActive, onClearAll: clearAll, onExport: doExport, layers, onEditSelections: () => setEditSelOpen(true), selectedLeaseIdxs: leaseIds, responsiveExportDialog: t.responsiveExportDialog, onFlash: flash })
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
      React.createElement(TweakText, { label: "Mapbox token", value: t.token, placeholder: "pk.… (optional — real Mapbox)", onChange: (v) => setTweak("token", v) }),
      React.createElement(TweakSelect, { label: "Light mode style", value: t.lightBasemapStyle, options: LIGHT_BASEMAP_STYLES, onChange: (v) => setTweak("lightBasemapStyle", v) }),
      React.createElement(TweakSelect, { label: "Dark mode style", value: t.darkBasemapStyle, options: DARK_BASEMAP_STYLES, onChange: (v) => setTweak("darkBasemapStyle", v) }),
      React.createElement(TweakSection, { label: "Export dialog" }),
      React.createElement(TweakToggle, { label: "Responsive height", value: t.responsiveExportDialog, onChange: (v) => setTweak("responsiveExportDialog", v) })
    ),
    viewsOpen ? React.createElement(ViewsPanel, { open: viewsOpen, views, onClose: () => setViewsOpen(false), onSave: () => { setViewsOpen(false); setSaveViewOpen(true); }, onLoad: handleLoadView, onManage: () => { setViewsOpen(false); setManageViewsOpen(true); } }) : null,
    React.createElement(SaveViewDialog, { open: saveViewOpen, onClose: () => setSaveViewOpen(false), onSave: handleSaveView, layers, selectedCount: recordIds.length }),
    React.createElement(ManageViewsDialog, { open: manageViewsOpen, onClose: () => setManageViewsOpen(false), views, onDeleteViews: handleDeleteViews, onRenameView: handleRenameView }),
    React.createElement(EditSelectionsDialog, { records, open: editSelOpen, onClose: () => setEditSelOpen(false), onRemove: removeRecords, onClearAll: clearAll }),
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

})();

