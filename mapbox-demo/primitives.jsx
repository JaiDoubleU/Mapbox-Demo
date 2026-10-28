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
