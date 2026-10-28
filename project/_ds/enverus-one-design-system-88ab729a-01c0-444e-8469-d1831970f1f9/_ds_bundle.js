/* @ds-bundle: {"format":4,"namespace":"EnverusOneDesignSystem_88ab72","components":[{"name":"Progress","sourcePath":"preview/progress/Progress.jsx"}],"sourceHashes":{"preview/progress/Progress.jsx":"b466ea475a6a","ui_kits/enverus-one/agent.jsx":"abd185651bf0","ui_kits/enverus-one/app.jsx":"4dd8e9c986ac","ui_kits/enverus-one/applications.jsx":"17f984ff0162","ui_kits/enverus-one/chat-primitives-ui.jsx":"366512bd8f17","ui_kits/enverus-one/dashboard.jsx":"48af8461138a","ui_kits/enverus-one/data.jsx":"1b3e10562fb5","ui_kits/enverus-one/detail.jsx":"e09f79d488c6","ui_kits/enverus-one/enverus-logo.js":"b105724f7a6f","ui_kits/enverus-one/flows.jsx":"5c170255045d","ui_kits/enverus-one/home.jsx":"c94fc42fa830","ui_kits/enverus-one/ideas.jsx":"981fe8bdd95b","ui_kits/enverus-one/leases.jsx":"0d1bf1a174bf","ui_kits/enverus-one/library.jsx":"533806afba63","ui_kits/enverus-one/primitives.jsx":"da9b012d7371","ui_kits/enverus-one/settings-access-usage.jsx":"400ed6e8cf64","ui_kits/enverus-one/settings-app.jsx":"3b6beae21502","ui_kits/enverus-one/settings-branding.jsx":"b34e4a5cdd46","ui_kits/enverus-one/settings-memory.jsx":"c38014e360e3","ui_kits/enverus-one/settings-org.jsx":"1e6790b81775","ui_kits/enverus-one/settings-persona.jsx":"c5d32ce184e6","ui_kits/enverus-one/settings-profile-simple.jsx":"ab28e88ee5aa","ui_kits/enverus-one/settings-resources.jsx":"baac715a73ab","ui_kits/enverus-one/settings-scheduled.jsx":"2a717ea5992c","ui_kits/enverus-one/settings-sections.jsx":"cbfe6afc8f3a","ui_kits/enverus-one/settings-shell.jsx":"efdd20bcfd27","ui_kits/enverus-one/settings-skills.jsx":"d442ec97dbea","ui_kits/enverus-one/settings-whats-new-simple.jsx":"b42e4aacbe81","ui_kits/enverus-one/shell.jsx":"09afe748aeb6","ui_kits/enverus-one/spaces.jsx":"b250efff36b9","ui_kits/enverus-one/tweaks-panel.jsx":"22c052960f83","ui_kits/enverus-one/whats-new.jsx":"786dc0bc5e8d","ui_kits/enverus-one/workflow.jsx":"1f035886efd7"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.EnverusOneDesignSystem_88ab72 = window.EnverusOneDesignSystem_88ab72 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// preview/progress/Progress.jsx
try { (() => {
/* global React */
// Enverus One — Progress component (shadcn/ui pattern)

function Progress({
  value = 0,
  variant = 'default',
  size = 'default',
  label,
  style
}) {
  const heights = {
    sm: 4,
    default: 8,
    lg: 12
  };
  const colors = {
    default: 'var(--primary)',
    info: 'var(--info)',
    success: 'var(--primary)',
    warning: 'var(--warning)',
    destructive: 'var(--destructive)'
  };
  const h = heights[size] ?? 8;
  const clr = colors[variant] ?? colors.default;
  const pct = Math.max(0, Math.min(100, value ?? 0));
  return React.createElement('div', {
    style: Object.assign({
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      width: '100%'
    }, style)
  }, label != null && React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, React.createElement('span', {
    style: {
      fontSize: 13,
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      color: 'var(--foreground)'
    }
  }, label), React.createElement('span', {
    style: {
      fontSize: 12,
      fontFamily: 'var(--font-mono)',
      color: 'var(--muted-foreground)'
    }
  }, pct + '%')), React.createElement('div', {
    role: 'progressbar',
    'aria-valuemin': 0,
    'aria-valuemax': 100,
    'aria-valuenow': pct,
    style: {
      position: 'relative',
      width: '100%',
      height: h,
      overflow: 'hidden',
      borderRadius: 9999,
      background: 'var(--secondary)'
    }
  }, React.createElement('div', {
    style: {
      height: '100%',
      width: pct + '%',
      background: clr,
      borderRadius: 9999,
      transition: 'width 0.35s cubic-bezier(.4,0,.2,1)',
      flex: 1
    }
  })));
}
Object.assign(__ds_scope, { Progress });
})(); } catch (e) { __ds_ns.__errors.push({ path: "preview/progress/Progress.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/agent.jsx
try { (() => {
/* global React, Icon, Button */
// Enverus One — Agent Studio view.

const ONE_AGENTS = [{
  id: 'oil-gas',
  name: 'Oil + Gas Analyst',
  desc: 'Oil and Gas Analyst'
}, {
  id: 'earnings',
  name: 'Earnings Analyst',
  desc: 'Instant Analyst Earnings App'
}, {
  id: 'adv-intel',
  name: 'Advanced Intelligence Research',
  desc: 'Instant Analyst - Research Pro RAG'
}, {
  id: 'prism-test',
  name: 'Power Analyst - PRISM (Testing Version)',
  desc: 'test workflow only for Product + dev for system prompt test...'
}, {
  id: 'prism',
  name: 'Power Analyst - PRISM',
  desc: 'test workflow only for Product + dev for system prompt test...'
}, {
  id: 'activity',
  name: 'Activity Analytics Analyst',
  desc: ''
}, {
  id: 'pet-intel',
  name: 'PET Test Workflow - Intel Skills Added',
  desc: 'test workflow only for Product + dev for system prompt test...'
}, {
  id: 'intel-research',
  name: 'Intelligence Research',
  desc: 'Research assistant powered by Enverus Intelligence public...'
}, {
  id: 'pet-v3',
  name: 'PET Test Workflow V3',
  desc: 'test workflow only for Product + dev for system prompt test...'
}, {
  id: 'pet-v2',
  name: 'PET Test Workflow V2',
  desc: 'All skills reference the Prism DAS skill.'
}];
const MY_AGENTS = [{
  id: 'chatty',
  name: 'Chatty',
  desc: 'It answers my energy questions',
  badge: 'Quickstart',
  shared: false
}, {
  id: 'tom',
  name: 'Tom the Agent',
  desc: "It's just a dude I chat with",
  badge: 'Quickstart',
  shared: false
}, {
  id: 'asdfdsf',
  name: 'asdfdsf',
  desc: 'adfasdf',
  badge: 'Quickstart',
  shared: false
}, {
  id: 'test-uploads',
  name: 'Test uploads',
  desc: 'Test uploads',
  badge: 'Quickstart',
  shared: true
}];
function AgentRow({
  agent,
  active,
  onClick
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('div', {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      cursor: 'pointer',
      borderRadius: 'var(--radius-md)',
      background: active ? 'color-mix(in srgb, var(--primary) 10%, transparent)' : hover ? 'var(--accent)' : 'transparent',
      transition: 'background .1s'
    }
  }, React.createElement('div', {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement('div', {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--foreground)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }
  }, agent.name), React.createElement('div', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      marginTop: 1
    }
  }, agent.desc)), React.createElement('span', {
    style: {
      fontSize: 11,
      fontWeight: 500,
      padding: '2px 8px',
      borderRadius: 'var(--radius-sm)',
      background: 'color-mix(in srgb, var(--primary) 12%, transparent)',
      color: 'var(--primary)',
      flexShrink: 0
    }
  }, agent.badge), agent.shared ? React.createElement('span', {
    style: {
      color: 'var(--muted-foreground)',
      display: 'flex',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    name: 'user-round',
    size: 14,
    strokeWidth: 1.75
  })) : React.createElement('button', {
    onClick: e => e.stopPropagation(),
    'aria-label': 'More actions',
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--muted-foreground)',
      padding: 0,
      display: 'flex',
      flexShrink: 0,
      alignItems: 'center'
    }
  }, React.createElement(Icon, {
    name: 'ellipsis',
    size: 14
  })));
}
function WhatCard({
  icon,
  title,
  desc,
  cta,
  comingSoon,
  active
}) {
  return React.createElement('div', {
    style: {
      flex: 1,
      borderRadius: 'var(--radius-xl)',
      border: '1px solid ' + (active ? 'var(--primary)' : 'var(--border)'),
      background: 'var(--card)',
      padding: '20px 20px 16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      position: 'relative',
      opacity: comingSoon ? 0.75 : 1
    }
  }, comingSoon && React.createElement('span', {
    style: {
      position: 'absolute',
      top: 14,
      right: 14,
      fontSize: 11,
      fontWeight: 500,
      padding: '3px 10px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--muted)',
      color: 'var(--muted-foreground)',
      border: '1px solid var(--border)'
    }
  }, 'Coming soon'), React.createElement('div', {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-lg)',
      border: '1.5px solid ' + (active ? 'color-mix(in srgb, var(--primary) 50%, transparent)' : 'var(--border)'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: active ? 'color-mix(in srgb, var(--primary) 8%, transparent)' : 'transparent'
    }
  }, React.createElement(Icon, {
    name: icon,
    size: 20,
    strokeWidth: 1.5,
    color: active ? 'var(--primary)' : 'var(--muted-foreground)'
  })), React.createElement('div', null, React.createElement('div', {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--foreground)',
      marginBottom: 6
    }
  }, title), React.createElement('div', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      lineHeight: 1.55
    }
  }, desc)), React.createElement('a', {
    href: '#',
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: active ? 'var(--primary)' : 'var(--muted-foreground)',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginTop: 'auto'
    }
  }, cta + ' ', React.createElement(Icon, {
    name: 'arrow-right',
    size: 13,
    strokeWidth: 2
  })));
}
function AgentView() {
  const [agentTab, setAgentTab] = React.useState('agents');
  const [filterTab, setFilterTab] = React.useState('one-agents');
  const [selected, setSelected] = React.useState(null);
  const filterBtns = ['mine', 'one-agents', 'teams'];
  const filterLabel = {
    mine: 'Mine',
    'one-agents': 'ONE Agents',
    teams: 'Teams'
  };
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: 0
    }
  },
  // ── Page header ────────────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 32
    }
  }, React.createElement('div', null, React.createElement('h1', {
    style: {
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--foreground)',
      margin: '0 0 4px'
    }
  }, 'Agent Studio'), React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      margin: 0
    }
  }, 'Build, manage, and deploy AI agents for your energy workflows.')), React.createElement('button', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      height: 36,
      padding: '0 16px',
      background: 'var(--primary)',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--primary-foreground)',
      fontFamily: 'var(--font-sans)'
    }
  }, React.createElement(Icon, {
    name: 'plus',
    size: 15,
    strokeWidth: 2.5,
    color: 'var(--primary-foreground)'
  }), 'Create agent')),
  // ── Body: left list + right panel ─────────────────────────────────────
  React.createElement('div', {
    style: {
      display: 'flex',
      gap: 24,
      flex: 1,
      minHeight: 0
    }
  },
  // ── Left: agent list ───────────────────────────────────────────────
  React.createElement('div', {
    style: {
      width: 300,
      flexShrink: 0,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      display: 'flex',
      flexDirection: 'column',
      overflow: 'hidden'
    }
  },
  // Tabs
  React.createElement('div', {
    role: 'tablist',
    'aria-label': 'Agent Studio view',
    style: {
      display: 'flex',
      borderBottom: '1px solid var(--border)'
    }
  }, ['agents', 'chats'].map(function (t) {
    const active = agentTab === t;
    return React.createElement('button', {
      key: t,
      role: 'tab',
      'aria-selected': active,
      onClick: function () {
        setAgentTab(t);
      },
      style: {
        flex: 1,
        padding: '12px 0',
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        color: active ? 'var(--foreground)' : 'var(--muted-foreground)',
        background: 'transparent',
        border: 'none',
        borderBottom: active ? '2px solid var(--primary)' : '2px solid transparent',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        textTransform: 'capitalize',
        marginBottom: -1
      }
    }, t === 'agents' ? 'Agents' : 'Chats');
  })),
  // Search
  React.createElement('div', {
    style: {
      padding: '10px 12px',
      borderBottom: '1px solid var(--border)'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 32,
      background: 'var(--accent)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '0 10px'
    }
  }, React.createElement(Icon, {
    name: 'search',
    size: 14,
    color: 'var(--muted-foreground)',
    strokeWidth: 1.75
  }), React.createElement('span', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      userSelect: 'none'
    }
  }, 'Search agents'))),
  // Filter tabs
  React.createElement('div', {
    style: {
      display: 'flex',
      padding: '8px 12px',
      borderBottom: '1px solid var(--border)'
    }
  }, React.createElement('div', {
    role: 'tablist',
    'aria-label': 'Agent filter',
    style: {
      display: 'flex',
      width: '100%',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, filterBtns.map(function (f, i) {
    const active = filterTab === f;
    return React.createElement('button', {
      key: f,
      role: 'tab',
      'aria-selected': active,
      onClick: function () {
        setFilterTab(f);
      },
      style: {
        flex: 1,
        padding: '6px 4px',
        fontSize: 12,
        fontWeight: active ? 700 : 500,
        background: 'transparent',
        color: active ? 'var(--primary)' : 'var(--foreground)',
        border: 'none',
        borderLeft: i > 0 ? '1px solid var(--border)' : 'none',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        transition: 'color .1s',
        whiteSpace: 'nowrap'
      }
    }, filterLabel[f]);
  }))),
  // Agent rows
  React.createElement('div', {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '6px 4px'
    }
  }, (filterTab === 'one-agents' ? ONE_AGENTS : MY_AGENTS).map(function (agent) {
    if (filterTab === 'one-agents') {
      // Simple rows for ONE Agents — no badge or menu
      return React.createElement('div', {
        key: agent.id,
        style: {
          padding: '10px 12px',
          cursor: 'pointer',
          borderRadius: 'var(--radius-md)'
        }
      }, React.createElement('div', {
        style: {
          fontSize: 13,
          fontWeight: 600,
          color: 'var(--foreground)',
          lineHeight: 1.3
        }
      }, agent.name), agent.desc ? React.createElement('div', {
        style: {
          fontSize: 12,
          color: 'var(--muted-foreground)',
          marginTop: 2
        }
      }, agent.desc) : null);
    }
    return React.createElement(AgentRow, {
      key: agent.id,
      agent: agent,
      active: selected === agent.id,
      onClick: function () {
        setSelected(selected === agent.id ? null : agent.id);
      }
    });
  }))),
  // ── Right: what do you want to do ─────────────────────────────────
  React.createElement('div', {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  }, React.createElement('div', {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--foreground)',
      letterSpacing: '-0.1px'
    }
  }, 'What do you want to do?'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'stretch'
    }
  }, React.createElement(WhatCard, {
    icon: 'wand-2',
    title: 'Create an agent',
    active: false,
    desc: 'Upload documents, set instructions, and build a custom agent for your workflow.',
    cta: 'Get started'
  }), React.createElement(WhatCard, {
    icon: 'sparkles',
    title: 'ONE Agents',
    active: true,
    desc: 'Energy-trained AI experts that answer, decide, and advise. Formerly Instant Analysts.',
    cta: 'Explore'
  }), React.createElement(WhatCard, {
    icon: 'network',
    title: 'Agent Teams',
    comingSoon: true,
    desc: 'Intelligent agents that execute workflows, transform data into decisions, and act as digital teammates across your business.',
    cta: 'Explore'
  })))));
}
Object.assign(window, {
  AgentView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/agent.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/app.jsx
try { (() => {
/* global React, ReactDOM, Icon, Button, Sidebar, Header, NAV, HomeView, FlowsView, Dashboard, AgentView, LibraryView, ApplicationsView, IdeasView, WhatsNewView, SpacesView, SidePanel, WorkflowView */
// Enverus One — UI kit app root. Composes the shell + routes between views.

const PLACEHOLDERS = {
  applications: {
    title: 'Applications',
    subtitle: 'Enterprise solutions and integrations for your organisation.',
    icon: 'layout-grid'
  },
  library: {
    title: 'Library',
    subtitle: 'Discover and manage saved assets: reports, datasets, agent configs, and exports.',
    icon: 'library-big'
  },
  spaces: {
    title: 'Spaces',
    subtitle: 'Collaborative project spaces for teams to organise work and run workflows together.',
    icon: 'component'
  },
  activity: {
    title: 'Activity',
    subtitle: 'Monitor agent runs, workflow logs, and audit history across the workspace.',
    icon: 'clock-check'
  },
  concepts: {
    title: 'Concepts',
    subtitle: 'Early-stage product ideas and experiments — try them before they ship.',
    icon: 'lightbulb'
  },
  'whats-new': {
    title: "What's New",
    subtitle: 'Latest features and improvements across Enverus One.',
    icon: 'sparkles'
  }
};
function EmptyState({
  icon,
  title,
  subtitle
}) {
  return React.createElement('div', null, React.createElement('h1', {
    style: {
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--foreground)',
      margin: '0 0 4px'
    }
  }, title), React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      margin: '0 0 32px'
    }
  }, subtitle), React.createElement('div', {
    style: {
      background: 'var(--env-one-background)',
      border: '1px dashed var(--input)',
      borderRadius: 'var(--radius-xl)',
      padding: '64px 24px',
      textAlign: 'center',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 12
    }
  }, React.createElement('div', {
    style: {
      width: 48,
      height: 48,
      borderRadius: 'var(--radius-full)',
      background: 'var(--accent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement(Icon, {
    name: icon,
    size: 22,
    color: 'var(--muted-foreground)'
  })), React.createElement('div', {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, 'Nothing here yet'), React.createElement('div', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      maxWidth: 360,
      lineHeight: 1.5
    }
  }, subtitle), React.createElement('div', {
    style: {
      marginTop: 4
    }
  }, React.createElement(Button, {
    variant: 'default',
    icon: 'plus'
  }, 'Get Started'))));
}
function App() {
  const [view, setView] = React.useState(document.getElementById('root').dataset.initialView || 'one');
  const [collapsed, setCollapsed] = React.useState(true);
  const [selectedWell, setSelectedWell] = React.useState(null);
  const [dark, setDark] = React.useState(false);
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
  }, [dark]);
  function go(v) {
    setSelectedWell(null);
    setView(v);
    if (v === 'workflow') setCollapsed(true);
  }
  let content;
  if (view === 'one') content = React.createElement(HomeView, {
    onNavigate: go
  });else if (view === 'flows') content = React.createElement(FlowsView, null);else if (view === 'workflow') content = React.createElement(WorkflowView, null);else if (view === 'dashboard') content = React.createElement(Dashboard, {
    onSelectWell: setSelectedWell,
    selectedId: selectedWell && selectedWell.id
  });else if (view === 'agent') content = React.createElement(AgentView, null);else if (view === 'spaces') content = React.createElement(SpacesView, null);else if (view === 'concepts') content = React.createElement(IdeasView, null);else if (view === 'whats-new') content = React.createElement(WhatsNewView, null);else if (view === 'applications') content = React.createElement(ApplicationsView, null);else if (view === 'library') content = React.createElement(LibraryView, null);else {
    const p = PLACEHOLDERS[view] || PLACEHOLDERS.applications;
    content = React.createElement(EmptyState, p);
  }
  return React.createElement('div', {
    className: 'e1-root',
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      paddingTop: 56
    }
  }, React.createElement(Header, {
    onSearch: () => {},
    dark,
    onToggleTheme: () => setDark(d => !d)
  }), React.createElement('div', {
    style: {
      display: 'flex',
      flex: 1,
      minHeight: 0
    }
  }, React.createElement(Sidebar, {
    key: 'sb-' + view + '-' + collapsed,
    view,
    setView: go,
    collapsed,
    setCollapsed
  }), React.createElement('main', {
    id: 'main-content',
    'aria-label': 'Main content',
    style: {
      flex: 1,
      position: 'relative',
      overflow: 'hidden',
      paddingBottom: view === 'workflow' ? 20 : 0,
      marginLeft: collapsed ? 56 : 280
    }
  }, view === 'workflow' ? React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      gap: 16,
      padding: 24
    }
  }, React.createElement('div', null, React.createElement('h1', {
    style: {
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--foreground)',
      margin: '0 0 4px'
    }
  }, 'Workflow Name'), React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      margin: 0,
      lineHeight: 1.5
    }
  }, 'Workflow description')), React.createElement('div', {
    className: 'card',
    style: {
      height: '100%'
    }
  }, content)) : React.createElement('div', {
    style: {
      height: '100%',
      overflowY: 'auto',
      padding: 24
    }
  }, React.createElement('div', {
    style: {
      maxWidth: 1180,
      margin: '0 auto'
    }
  }, content)), React.createElement(SidePanel, {
    well: selectedWell,
    onClose: () => setSelectedWell(null)
  }))));
}
ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(App));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/applications.jsx
try { (() => {
/* global React, Icon */
// Enverus One — Applications view.

const APPS = [{
  id: 'landscape',
  name: 'LandScape',
  icon: 'file-search',
  desc: 'Proprietary land intelligence layer, transforming documents and data into actionable, spatially connected insights for faster decisions'
}, {
  id: 'lifesaver',
  name: 'LifeSaver',
  icon: 'hard-hat',
  desc: 'AI-Powered Safety & Risk Intelligence for Oilfield Operations'
}, {
  id: 'strike',
  name: 'Strike DEV',
  icon: 'zap',
  desc: 'A map-based application for daily lookup work across wells, permits, and rigs.'
}];
function AppCard({
  app
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('div', {
    onMouseEnter: function () {
      setHover(true);
    },
    onMouseLeave: function () {
      setHover(false);
    },
    style: {
      flex: 1,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-2xl)',
      padding: '28px 28px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 0,
      boxShadow: hover ? 'var(--shadow)' : 'none',
      transition: 'box-shadow .15s',
      cursor: 'default'
    }
  },
  // Icon
  React.createElement('div', {
    style: {
      width: 56,
      height: 56,
      borderRadius: 'var(--radius-lg)',
      background: 'color-mix(in srgb, var(--primary) 20%, var(--card))',
      border: '1px solid color-mix(in srgb, var(--primary) 30%, transparent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 24
    }
  }, React.createElement(Icon, {
    name: app.icon,
    size: 24,
    strokeWidth: 1.75,
    color: 'var(--primary)'
  })),
  // Title
  React.createElement('div', {
    style: {
      fontSize: 20,
      fontWeight: 600,
      color: 'var(--foreground)',
      marginBottom: 10,
      lineHeight: 1.25
    }
  }, app.name),
  // Description
  React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      lineHeight: 1.6,
      margin: '0 0 auto',
      flex: 1
    }
  }, app.desc),
  // Footer
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 28
    }
  }, React.createElement('button', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      fontSize: 14,
      color: 'var(--muted-foreground)',
      fontFamily: 'var(--font-sans)',
      padding: 0
    }
  }, React.createElement(Icon, {
    name: 'info',
    size: 15,
    strokeWidth: 1.75
  }), 'View overview'), React.createElement('button', {
    style: {
      height: 36,
      padding: '0 20px',
      background: 'var(--primary)',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--primary-foreground)',
      fontFamily: 'var(--font-sans)'
    }
  }, 'Open')));
}
function ApplicationsView() {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 32
    }
  },
  // Page header
  React.createElement('div', null, React.createElement('h1', {
    style: {
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--foreground)',
      margin: '0 0 4px'
    }
  }, 'Applications'), React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      margin: 0
    }
  }, 'Select an application to view your projects or create new ones.')),
  // App cards grid
  React.createElement('div', {
    style: {
      display: 'flex',
      gap: 20,
      alignItems: 'stretch'
    }
  }, APPS.map(function (app) {
    return React.createElement(AppCard, {
      key: app.id,
      app: app
    });
  })));
}
Object.assign(window, {
  ApplicationsView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/applications.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/chat-primitives-ui.jsx
try { (() => {
/* global React, Icon */
// Enverus One — Chat primitive React components (mirrors design-system dsCard patterns)

function ChatScroller({
  children,
  scrollRef,
  style
}) {
  return React.createElement('div', {
    ref: scrollRef,
    style: Object.assign({
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      overflowY: 'auto',
      flex: 1,
      padding: '24px 22px',
      WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 30px, black calc(100% - 30px), transparent 100%)',
      maskImage: 'linear-gradient(to bottom, transparent 0%, black 30px, black calc(100% - 30px), transparent 100%)'
    }, style)
  }, children);
}
function ChatMarker({
  children,
  status,
  completed,
  role
}) {
  // status: 'running' | undefined; completed: bool
  return React.createElement('div', {
    role: role,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      padding: '4px 0',
      color: 'var(--muted-foreground)',
      fontSize: 12,
      fontWeight: 400
    }
  }, React.createElement('div', {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border)'
    }
  }), status === 'running' && React.createElement('div', {
    style: {
      width: 13,
      height: 13,
      borderRadius: '50%',
      flexShrink: 0,
      border: '2px solid var(--info)',
      borderTopColor: 'transparent',
      animation: 'e1spin .8s linear infinite'
    }
  }), completed && React.createElement('div', {
    style: {
      width: 16,
      height: 16,
      borderRadius: '50%',
      background: 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    name: 'check',
    size: 9,
    strokeWidth: 3,
    color: '#fff'
  })), React.createElement('span', {
    style: {
      whiteSpace: 'nowrap',
      flexShrink: 0,
      color: status === 'running' ? 'var(--info)' : completed ? 'var(--foreground)' : 'var(--muted-foreground)',
      animation: status === 'running' ? 'e1shimmer 1.6s linear infinite' : 'none',
      background: status === 'running' ? 'linear-gradient(90deg, var(--muted-foreground) 0%, var(--foreground) 40%, var(--muted-foreground) 80%)' : 'none',
      backgroundSize: '200% 100%',
      WebkitBackgroundClip: status === 'running' ? 'text' : 'unset',
      WebkitTextFillColor: status === 'running' ? 'transparent' : 'unset',
      backgroundClip: status === 'running' ? 'text' : 'unset'
    }
  }, children), React.createElement('div', {
    style: {
      flex: 1,
      height: 1,
      background: 'var(--border)'
    }
  }));
}
function ChatMessage({
  role,
  children
}) {
  var isUser = role === 'user';
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 8,
      flexDirection: isUser ? 'row-reverse' : 'row'
    }
  }, React.createElement('div', {
    style: {
      width: 28,
      height: 28,
      borderRadius: '50%',
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: 10,
      fontWeight: 600,
      marginTop: 2,
      background: isUser ? 'var(--primary)' : 'color-mix(in oklab, var(--ai) 15%, var(--card))',
      color: isUser ? '#fff' : 'var(--ai)',
      border: isUser ? 'none' : '1px solid color-mix(in oklab, var(--ai) 25%, transparent)'
    }
  }, isUser ? 'You' : 'AI'), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      maxWidth: isUser ? '68%' : undefined,
      flex: isUser ? undefined : 1,
      alignItems: isUser ? 'flex-end' : 'flex-start'
    }
  }, children));
}
function ChatBubble({
  variant,
  children,
  style
}) {
  variant = variant || 'ghost';
  var base = {
    fontSize: 13,
    lineHeight: 1.6
  };
  var variants = {
    primary: {
      background: 'var(--primary)',
      color: '#fff',
      borderRadius: 'var(--radius-xl)',
      borderBottomRightRadius: 'var(--radius-xs)',
      padding: '9px 13px'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--foreground)',
      padding: '2px 0',
      width: '100%'
    },
    muted: {
      background: 'var(--muted)',
      color: 'var(--foreground)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      borderBottomLeftRadius: 'var(--radius-xs)',
      padding: '9px 13px'
    }
  };
  return React.createElement('div', {
    style: Object.assign({}, base, variants[variant] || variants.ghost, style)
  }, children);
}
function ChatAttachment({
  title,
  desc,
  state,
  onRemove
}) {
  state = state || 'idle';
  var shimmer = state === 'uploading' || state === 'processing';
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'color-mix(in oklab, var(--input) 35%, transparent)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '9px 12px',
      minWidth: 200,
      maxWidth: 280
    }
  }, React.createElement('div', {
    style: {
      width: 32,
      height: 32,
      borderRadius: 'var(--radius-md)',
      flexShrink: 0,
      background: state === 'error' ? 'color-mix(in oklab, var(--destructive) 12%, var(--card))' : 'color-mix(in oklab, var(--info) 12%, var(--card))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement(Icon, {
    name: state === 'error' ? 'file-x' : 'file-text',
    size: 15,
    color: state === 'error' ? 'var(--destructive)' : 'var(--info)'
  })), React.createElement('div', {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement('div', {
    style: Object.assign({
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--foreground)',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }, shimmer ? {
      background: 'linear-gradient(90deg, var(--muted-foreground) 0%, var(--foreground) 40%, var(--muted-foreground) 80%)',
      backgroundSize: '200% 100%',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      animation: 'e1shimmer 1.6s linear infinite'
    } : {})
  }, title), React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--muted-foreground)',
      marginTop: 1
    }
  }, desc)), state === 'done' && React.createElement(Icon, {
    name: 'check-circle-2',
    size: 14,
    color: 'var(--primary)',
    style: {
      flexShrink: 0
    }
  }), state === 'uploading' && React.createElement('div', {
    style: {
      width: 13,
      height: 13,
      borderRadius: '50%',
      border: '2px solid var(--info)',
      borderTopColor: 'transparent',
      animation: 'e1spin .8s linear infinite',
      flexShrink: 0
    }
  }), onRemove && React.createElement('button', {
    onClick: onRemove,
    'aria-label': 'Remove ' + title,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      padding: 2,
      display: 'flex',
      color: 'var(--muted-foreground)',
      marginLeft: 2
    }
  }, React.createElement(Icon, {
    name: 'x',
    size: 12
  })));
}
Object.assign(window, {
  ChatScroller,
  ChatMarker,
  ChatMessage,
  ChatBubble,
  ChatAttachment
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/chat-primitives-ui.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/dashboard.jsx
try { (() => {
/* global React, Icon, Button, Badge, Card, KpiCard, WELLS */
// Enverus One — Dashboard view: breadcrumb + KPI row + wells DataTable.

function Breadcrumb({
  trail
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: '.2px',
      color: 'var(--muted-foreground)',
      marginBottom: 14
    }
  }, trail.map((t, i) => React.createElement(React.Fragment, {
    key: i
  }, i > 0 ? React.createElement(Icon, {
    name: 'chevron-right',
    size: 13,
    color: 'var(--muted-foreground)'
  }) : null, React.createElement('span', {
    style: {
      color: i === trail.length - 1 ? 'var(--foreground)' : 'var(--muted-foreground)'
    }
  }, t))));
}
const STATUS_VARIANT = {
  Active: 'success',
  Processing: 'processing',
  Declining: 'warning',
  'Shut-in': 'outline',
  Expiring: 'warning',
  Renewed: 'success',
  Critical: 'error'
};
function WellsTable({
  onSelect,
  selectedId
}) {
  const [sortDesc, setSortDesc] = React.useState(true);
  const rows = [...WELLS].sort((a, b) => sortDesc ? b.boe - a.boe : a.boe - b.boe);
  const th = {
    background: 'var(--env-one-background)',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '.2px',
    color: 'var(--muted-foreground)',
    textTransform: 'uppercase',
    textAlign: 'left',
    padding: '10px 16px',
    borderBottom: '1px solid var(--border)',
    whiteSpace: 'nowrap'
  };
  const td = {
    padding: '12px 16px',
    fontSize: 14,
    color: 'var(--foreground)',
    borderBottom: '1px solid var(--border)'
  };
  return React.createElement(Card, {
    pad: 0,
    style: {
      overflow: 'hidden'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      borderBottom: '1px solid var(--border)'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 16,
      fontWeight: 600,
      color: 'var(--foreground)',
      whiteSpace: 'nowrap'
    }
  }, 'Active Wells'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement(Button, {
    variant: 'secondary',
    size: 'sm',
    icon: 'sliders-horizontal'
  }, 'Filters'), React.createElement(Button, {
    variant: 'secondary',
    size: 'sm',
    icon: 'download'
  }, 'Export'))), React.createElement('table', {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, React.createElement('thead', null, React.createElement('tr', null, React.createElement('th', {
    style: th
  }, 'Well'), React.createElement('th', {
    style: th
  }, 'Basin'), React.createElement('th', {
    style: th
  }, 'Operator'), React.createElement('th', {
    style: Object.assign({
      textAlign: 'right',
      cursor: 'pointer'
    }, th),
    onClick: () => setSortDesc(s => !s)
  }, React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4
    }
  }, 'Boe/d', React.createElement(Icon, {
    name: sortDesc ? 'arrow-down' : 'arrow-up',
    size: 12
  }))), React.createElement('th', {
    style: th
  }, 'Status'), React.createElement('th', {
    style: Object.assign({
      width: 44
    }, th)
  }, ''))), React.createElement('tbody', null, rows.map((w, i) => {
    const sel = selectedId === w.id;
    return React.createElement(WellRow, {
      key: w.id,
      w,
      td,
      sel,
      last: i === rows.length - 1,
      onSelect
    });
  }))));
}
function WellRow({
  w,
  td,
  sel,
  last,
  onSelect
}) {
  const [hover, setHover] = React.useState(false);
  const trendCol = {
    up: 'var(--primary)',
    down: 'var(--destructive)',
    flat: 'var(--muted)'
  }[w.trend];
  const rowStyle = {
    background: sel ? 'var(--success-background)' : hover ? 'var(--env-one-background)' : 'var(--card)',
    boxShadow: sel ? 'inset 2px 0 0 var(--primary)' : 'none',
    cursor: 'pointer',
    transition: 'background .1s'
  };
  const cell = Object.assign({}, td, last ? {
    borderBottom: 0
  } : null);
  return React.createElement('tr', {
    style: rowStyle,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => onSelect(w)
  }, React.createElement('td', {
    style: cell
  }, React.createElement('div', {
    style: {
      color: 'var(--foreground)',
      fontWeight: 500
    }
  }, w.name), React.createElement('div', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--muted-foreground)',
      marginTop: 2
    }
  }, w.api)), React.createElement('td', {
    style: cell
  }, w.basin), React.createElement('td', {
    style: cell
  }, w.operator), React.createElement('td', {
    style: Object.assign({
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--foreground)'
    }, cell)
  }, React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      justifyContent: 'flex-end'
    }
  }, w.boe.toLocaleString(), React.createElement(Icon, {
    name: w.trend === 'up' ? 'trending-up' : w.trend === 'down' ? 'trending-down' : 'minus',
    size: 13,
    color: trendCol
  }))), React.createElement('td', {
    style: cell
  }, React.createElement(Badge, {
    variant: STATUS_VARIANT[w.status]
  }, w.status)), React.createElement('td', {
    style: cell
  }, React.createElement(Icon, {
    name: 'chevron-right',
    size: 16,
    color: 'var(--muted)'
  })));
}
function Dashboard({
  onSelectWell,
  selectedId
}) {
  return React.createElement('div', null, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 32
    }
  }, React.createElement('div', null, React.createElement('h1', {
    style: {
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--foreground)',
      margin: '0 0 4px'
    }
  }, 'Permian Basin'), React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      margin: 0
    }
  }, 'Q1 2026 production summary · 3,840 active wells')), React.createElement(Button, {
    variant: 'default',
    icon: 'play'
  }, 'Run Workflow')), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12,
      marginBottom: 20
    }
  }, React.createElement(KpiCard, {
    label: 'Avg Production',
    value: '142',
    unit: 'MBoe/d',
    trend: '4.2% vs Q4',
    trendDir: 'up'
  }), React.createElement(KpiCard, {
    label: 'Active Wells',
    value: '3,840',
    trend: '1.1% vs Q4',
    trendDir: 'down'
  }), React.createElement(KpiCard, {
    label: 'Leases Expiring',
    value: '12',
    trend: 'within 60 days',
    trendDir: 'flat'
  }), React.createElement(KpiCard, {
    label: 'Workflows Run',
    value: '208',
    trend: '18% vs Q4',
    trendDir: 'up'
  })), React.createElement(WellsTable, {
    onSelect: onSelectWell,
    selectedId
  }));
}
Object.assign(window, {
  Dashboard,
  Breadcrumb,
  STATUS_VARIANT
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/dashboard.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/data.jsx
try { (() => {
/* global window */
// Enverus One — sample domain data (energy / upstream).

const WELLS = [{
  id: '4821-A',
  name: 'Wolfcamp 4821-A',
  api: '42-329-30742-0000',
  basin: 'Midland',
  operator: 'Permian Resources',
  boe: 1204,
  status: 'Active',
  trend: 'up',
  updated: '2 hours ago'
}, {
  id: '3390-C',
  name: 'Spraberry 3390-C',
  api: '42-317-38812-0100',
  basin: 'Delaware',
  operator: 'Diamondback',
  boe: 847,
  status: 'Processing',
  trend: 'flat',
  updated: '12 min ago'
}, {
  id: '5102-B',
  name: 'Bone Spring 5102-B',
  api: '30-015-44021-0000',
  basin: 'Delaware',
  operator: 'Coterra Energy',
  boe: 2933,
  status: 'Active',
  trend: 'up',
  updated: '1 hour ago'
}, {
  id: '2284-D',
  name: 'Anadarko 2284-D',
  api: '35-093-21884-0200',
  basin: 'Anadarko',
  operator: 'Devon Energy',
  boe: 612,
  status: 'Declining',
  trend: 'down',
  updated: '4 hours ago'
}, {
  id: '6710-A',
  name: 'Wolfcamp 6710-A',
  api: '42-329-41007-0000',
  basin: 'Midland',
  operator: 'Pioneer NR',
  boe: 1788,
  status: 'Active',
  trend: 'up',
  updated: '38 min ago'
}, {
  id: '1190-F',
  name: 'ArkLaTex 1190-F',
  api: '17-031-29551-0000',
  basin: 'ArkLaTex',
  operator: 'Comstock',
  boe: 421,
  status: 'Shut-in',
  trend: 'down',
  updated: '1 day ago'
}];
const LEASES = [{
  id: 'L-2207',
  tract: 'Section 14 · Blk A-29',
  acres: 640,
  operator: 'Permian Resources',
  basin: 'Midland',
  expires: 'Jun 18, 2026',
  days: 20,
  status: 'Expiring'
}, {
  id: 'L-3318',
  tract: 'Section 6 · Blk 41',
  acres: 1280,
  operator: 'Diamondback',
  basin: 'Delaware',
  expires: 'Aug 02, 2026',
  days: 65,
  status: 'Active'
}, {
  id: 'L-1144',
  tract: 'Section 22 · Blk C-7',
  acres: 320,
  operator: 'Coterra Energy',
  basin: 'Delaware',
  expires: 'Jun 30, 2026',
  days: 32,
  status: 'Expiring'
}, {
  id: 'L-5590',
  tract: 'Section 9 · Blk 18',
  acres: 960,
  operator: 'Devon Energy',
  basin: 'Anadarko',
  expires: 'Renewed',
  days: 365,
  status: 'Renewed'
}, {
  id: 'L-4471',
  tract: 'Section 31 · Blk A-12',
  acres: 480,
  operator: 'Pioneer NR',
  basin: 'Midland',
  expires: 'May 30, 2026',
  days: 1,
  status: 'Critical'
}];
Object.assign(window, {
  WELLS,
  LEASES
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/data.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/detail.jsx
try { (() => {
/* global React, Icon, Button, Badge, STATUS_VARIANT */
// Enverus One — SidePanel: well detail, overlays from the right.

function SidePanel({
  well,
  onClose
}) {
  if (!well) return null;
  return React.createElement(React.Fragment, null,
  // scrim
  React.createElement('div', {
    onClick: onClose,
    style: {
      position: 'absolute',
      inset: 0,
      background: 'color-mix(in srgb, var(--foreground) 18%, transparent)',
      zIndex: 20,
      animation: 'e1fade .2s ease'
    }
  }), React.createElement('div', {
    style: {
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      width: 360,
      background: 'var(--card)',
      borderLeft: '1px solid var(--border)',
      boxShadow: 'var(--shadow-panel)',
      zIndex: 21,
      animation: 'e1slidein .22s ease',
      display: 'flex',
      flexDirection: 'column'
    }
  }, React.createElement(SidePanelBody, {
    well,
    onClose
  })));
}
function SidePanelBody({
  well,
  onClose
}) {
  const [tab, setTab] = React.useState('overview');
  const trendCol = {
    up: 'var(--primary)',
    down: 'var(--destructive)',
    flat: 'var(--muted)'
  }[well.trend];
  const field = (label, value, mono) => React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 4
    }
  }, React.createElement('span', {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--muted-foreground)',
      textTransform: 'uppercase',
      letterSpacing: '.2px'
    }
  }, label), React.createElement('span', {
    style: {
      fontSize: 14,
      color: 'var(--foreground)',
      fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)'
    }
  }, value));
  return React.createElement(React.Fragment, null, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      padding: '16px 18px',
      borderBottom: '1px solid var(--border)'
    }
  }, React.createElement('div', null, React.createElement('div', {
    style: {
      fontSize: 20,
      fontWeight: 600,
      letterSpacing: '-0.2px',
      color: 'var(--foreground)'
    }
  }, well.name), React.createElement('div', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      marginTop: 3
    }
  }, well.basin + ' · ' + well.operator + ' · ' + well.updated)), React.createElement(Button, {
    variant: 'ghost',
    size: 'icon-sm',
    icon: 'x',
    onClick: onClose
  })),
  // mini stats
  React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 1,
      background: 'var(--border)',
      borderBottom: '1px solid var(--border)'
    }
  }, React.createElement('div', {
    className: 'card',
    style: {
      padding: '14px 18px'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--muted-foreground)',
      textTransform: 'uppercase',
      letterSpacing: '.2px'
    }
  }, 'Production'), React.createElement('div', {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--foreground)',
      marginTop: 5,
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, well.boe.toLocaleString(), React.createElement(Icon, {
    name: well.trend === 'up' ? 'trending-up' : well.trend === 'down' ? 'trending-down' : 'minus',
    size: 16,
    color: trendCol
  })), React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--muted-foreground)'
    }
  }, 'Boe/d')), React.createElement('div', {
    className: 'card',
    style: {
      padding: '14px 18px'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--muted-foreground)',
      textTransform: 'uppercase',
      letterSpacing: '.2px'
    }
  }, 'Status'), React.createElement('div', {
    style: {
      marginTop: 8
    }
  }, React.createElement(Badge, {
    variant: STATUS_VARIANT[well.status]
  }, well.status)))),
  // tabs
  React.createElement('div', {
    role: 'tablist',
    'aria-label': 'Well detail view',
    style: {
      display: 'flex',
      gap: 20,
      padding: '0 18px',
      borderBottom: '1px solid var(--border)'
    }
  }, ['overview', 'production', 'documents'].map(t => React.createElement('button', {
    key: t,
    role: 'tab',
    'aria-selected': tab === t,
    onClick: () => setTab(t),
    style: {
      fontSize: 14,
      fontWeight: 500,
      textTransform: 'capitalize',
      color: tab === t ? 'var(--foreground)' : 'var(--muted)',
      background: 'none',
      border: 'none',
      borderBottom: '2px solid ' + (tab === t ? 'var(--primary)' : 'transparent'),
      padding: '11px 2px',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, t))), React.createElement('div', {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: 18,
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, tab === 'overview' ? React.createElement(React.Fragment, null, field('API Number', well.api, true), field('Operator', well.operator), field('Basin', well.basin), field('Last Updated', well.updated), React.createElement('div', {
    style: {
      background: 'var(--info-background)',
      border: '1px solid var(--info-border)',
      borderRadius: 'var(--radius-lg)',
      padding: '11px 14px',
      display: 'flex',
      gap: 9
    }
  }, React.createElement(Icon, {
    name: 'info',
    size: 15,
    color: 'var(--info)',
    style: {
      marginTop: 1
    }
  }), React.createElement('div', {
    style: {
      fontSize: 13,
      color: 'var(--info)',
      lineHeight: 1.5
    }
  }, 'Production data syncs hourly from the Enverus data lake.'))) : tab === 'production' ? React.createElement('div', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      lineHeight: 1.6
    }
  }, 'Decline curve and monthly volumes would render here. Numeric series use Roboto Mono for column alignment.') : React.createElement('div', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      lineHeight: 1.6
    }
  }, 'Attached filings, permits, and lease documents would list here, opening in the DocumentViewer.')), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 8,
      padding: 16,
      borderTop: '1px solid var(--border)'
    }
  }, React.createElement(Button, {
    variant: 'default',
    icon: 'play',
    style: {
      flex: 1
    }
  }, 'Run Analysis'), React.createElement(Button, {
    variant: 'secondary',
    icon: 'download'
  }, 'Export')));
}
Object.assign(window, {
  SidePanel
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/detail.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/enverus-logo.js
try { (() => {
/* Enverus ONE wordmark — single source of truth.
 * Drops an inline SVG into every `[data-logo="enverus-one"]` element
 * on DOMContentLoaded. Ink paths use `fill="currentColor"` so the
 * wordmark inherits whatever `color` the host element resolves to —
 * tying logo color to `var(--text-body)` (or any local override) for
 * automatic theme flipping. Greens stay literal.
 *
 * Usage:
 *   <span class="brand" data-logo="enverus-one" aria-label="Enverus One"></span>
 *   <script src="../../assets/logos/enverus-logo.js"></script>
 *
 * The host controls size via CSS (e.g. `.brand svg { height: 16px }`).
 */
(function () {
  const SVG = '<svg viewBox="0 0 164 17" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false"><path fill-rule="evenodd" clip-rule="evenodd" d="M23.0012 15.9591V0.159084H26.4739L33.0704 10.2405H33.127V0.159084H36.3388V15.9591H33.127L26.2445 5.78916H26.1848V15.9591H23.0012Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M43.7398 15.9591L38.3187 0.159084H41.8479L45.4306 11.3396H45.4903L49.2175 0.159084H52.4859L47.0365 15.9591H43.7398Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M54.4657 15.9591V0.159084H65.2231V3.08H57.9353V6.45H65.022V9.29H57.9353V13.14H65.6222V15.9591H54.4657Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M71.3891 7.28291H73.7681C74.2552 7.28291 74.714 7.25463 75.088 7.16666C75.462 7.08184 75.7763 6.96559 76.0057 6.79279C76.2351 6.61999 76.4362 6.39064 76.5493 6.10474C76.6656 5.81884 76.7222 5.50152 76.7222 5.10252C76.7222 4.32964 76.4928 3.78297 76.0057 3.44051C75.5186 3.12634 74.7737 2.95354 73.7681 2.95354H71.3891V7.28291ZM67.9761 15.9591V0.155184H73.9126C74.8869 0.155184 75.748 0.226477 76.5242 0.399274C77.3004 0.572072 77.929 0.857974 78.4758 1.26012C79.0195 1.66227 79.4218 2.14924 79.7077 2.78074C79.9937 3.41224 80.1383 4.15684 80.1383 5.01769C80.1383 5.64918 80.0534 6.19271 79.9089 6.67969C79.7643 7.16666 79.5632 7.59709 79.2772 7.97096C78.9912 8.34483 78.6455 8.65901 78.2433 8.91663C77.841 9.17426 77.3822 9.37533 76.8385 9.54813L80.3363 15.9591H76.6656L73.3972 10.0068H71.3891V15.9591H67.9761Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M85.8737 15.5279C85.0692 15.2461 84.4123 14.8219 83.8938 14.2832C83.3784 13.7475 82.9761 13.0973 82.7184 12.3326C82.4607 11.5678 82.3445 10.6947 82.3445 9.75962V0.155151H85.814V9.67602C85.814 10.2426 85.8705 10.7504 85.9868 11.1746C86.1031 11.5988 86.2728 11.9951 86.5022 12.2768C86.7316 12.5865 87.0459 12.8125 87.4199 12.9549C87.7939 13.0973 88.2527 13.1809 88.7681 13.1809C89.802 13.1809 90.5186 12.8713 90.9774 12.2768C91.4362 11.6824 91.6656 10.8061 91.6656 9.67602V0.155151H95.0786V9.73485C95.0786 10.6947 94.9623 11.543 94.7046 12.3357C94.4469 13.0973 94.0729 13.7475 93.5575 14.2863C93.0421 14.8219 92.3822 15.2461 91.5777 15.531C90.7731 15.8127 89.8272 15.9552 88.7367 15.9552C87.621 15.949 86.6751 15.8096 85.8737 15.5279Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M103.683 15.9552C102.822 15.9552 102.049 15.8736 101.361 15.6804C100.673 15.4871 100.041 15.2395 99.4972 14.9073C98.9535 14.5751 98.4633 14.1916 98.0359 13.7235C97.6053 13.2554 97.2628 12.7601 96.9736 12.2347L99.6135 10.7459C99.8429 11.1596 100.101 11.519 100.387 11.8481C100.701 12.1803 101.018 12.4279 101.389 12.6484C101.763 12.8689 102.134 13.0349 102.564 13.1437C102.995 13.2554 103.426 13.3098 103.884 13.3098C104.287 13.3098 104.657 13.2826 105.003 13.198C105.349 13.1165 105.635 13.0319 105.864 12.8658C106.094 12.7269 106.295 12.5336 106.439 12.3132C106.584 12.0927 106.641 11.8451 106.641 11.5401C106.641 11.2653 106.584 11.0177 106.439 10.7972C106.295 10.5768 106.094 10.4107 105.836 10.2174C105.578 10.0513 105.233 9.88521 104.833 9.74932C104.431 9.6104 103.972 9.47451 103.457 9.3356C102.998 9.19668 102.511 9.08797 102.052 8.94905C101.593 8.81014 101.135 8.67424 100.704 8.50815C100.273 8.34206 99.8712 8.14879 99.5003 7.92833C99.1264 7.70788 98.8121 7.46025 98.5544 7.15524C98.2967 6.85326 98.0673 6.49389 97.9227 6.10735C97.7782 5.7208 97.6933 5.25272 97.6933 4.7031C97.6933 3.98739 97.8379 3.35322 98.0956 2.80058C98.3816 2.24794 98.7555 1.77986 99.2709 1.36614C99.758 0.979596 100.361 0.677608 101.078 0.457157C101.766 0.236706 102.539 0.155169 103.4 0.155169C104.205 0.155169 104.95 0.236705 105.581 0.402799C106.241 0.568892 106.813 0.816522 107.332 1.09133C107.85 1.36614 108.306 1.69833 108.68 2.08487C109.054 2.47142 109.397 2.85796 109.683 3.26866L107.272 5.03227C107.071 4.70008 106.813 4.42528 106.527 4.15047C106.241 3.87566 105.924 3.65521 105.581 3.46193C105.236 3.26866 104.893 3.12975 104.519 3.02103C104.145 2.9093 103.774 2.85494 103.372 2.85494C102.627 2.85494 102.08 2.99385 101.681 3.26866C101.279 3.54347 101.078 3.90284 101.078 4.37092C101.078 4.67291 101.135 4.92356 101.279 5.14401C101.424 5.36446 101.625 5.55773 101.911 5.72382C102.197 5.88992 102.542 6.02581 102.945 6.16473C103.347 6.30364 103.806 6.43953 104.293 6.55127C104.95 6.71434 105.61 6.90761 106.241 7.10089C106.872 7.32134 107.444 7.59615 107.934 7.95551C108.448 8.31487 108.851 8.75577 109.165 9.30841C109.483 9.86105 109.625 10.5526 109.625 11.4135C109.625 12.1564 109.481 12.8453 109.165 13.4519C108.879 14.0586 108.448 14.5779 107.876 15.0188C107.301 15.4567 106.612 15.7889 105.808 16.0124C105.061 16.1815 104.4 16.0577 103.683 15.9552Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M20.5374 9.29V6.45H12.8787V3.08H20.5374V0.159084H9.40605V13.14H12.8756V9.29H20.5374ZM12.8787 15.9591H20.5374V13.14H12.8787V15.9591Z" fill="currentColor"/><path fill-rule="evenodd" clip-rule="evenodd" d="M4.15775 15.9591H9.40602L9.40605 13.14H4.15775V15.9591Z" fill="#A0EF6E"/><path fill-rule="evenodd" clip-rule="evenodd" d="M0 9.29H3.4978V6.45H0V9.29Z" fill="#A0EF6E"/><path fill-rule="evenodd" clip-rule="evenodd" d="M5.90822 9.29H20.54V6.45H5.90822V9.29Z" fill="#56BC2F"/><path d="M118 0V16.1143" stroke="currentColor"/><g clip-path="url(#env-logo-clip)"><path d="M137.265 7.33899V8.86243C137.265 10.8546 136.763 12.4431 135.761 13.628C134.765 14.8129 133.424 15.4054 131.737 15.4054C130.084 15.4054 128.746 14.8129 127.724 13.628C126.702 12.4431 126.19 10.8546 126.19 8.86243V7.33899C126.19 5.35331 126.698 3.76803 127.714 2.58313C128.73 1.39172 130.064 0.796021 131.718 0.796021C133.404 0.796021 134.748 1.39172 135.751 2.58313C136.76 3.76803 137.265 5.35331 137.265 7.33899ZM136.073 8.86243V7.31946C136.073 5.63977 135.692 4.30839 134.931 3.32532C134.169 2.34225 133.098 1.85071 131.718 1.85071C130.377 1.85071 129.319 2.34225 128.544 3.32532C127.776 4.30839 127.392 5.63977 127.392 7.31946V8.86243C127.392 10.5551 127.779 11.893 128.554 12.8761C129.335 13.8591 130.396 14.3507 131.737 14.3507C133.118 14.3507 134.185 13.8591 134.94 12.8761C135.696 11.893 136.073 10.5551 136.073 8.86243ZM150.907 0.991333V15.2101H149.696L141.532 3.04212V15.2101H140.321V0.991333H141.532L149.706 13.1593V0.991333H150.907ZM154.54 15.2101V0.991333H163.329V2.01672H155.741V7.36829H162.382V8.39368H155.741V14.1944H163.378V15.2101H154.54Z" fill="currentColor"/></g><defs><clipPath id="env-logo-clip"><rect width="38" height="15" fill="#fff" transform="translate(126 0.557129)"/></clipPath></defs></svg>';
  function paint() {
    document.querySelectorAll('[data-logo="enverus-one"]').forEach(el => {
      // Idempotent: skip if we've already injected the SVG.
      if (el.querySelector(':scope > svg')) return;
      el.innerHTML = SVG;
    });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', paint);
  } else {
    paint();
  }

  // Expose the paint helper so React/SPA consumers can re-trigger
  // it after rendering new `[data-logo="enverus-one"]` elements.
  window.paintEnverusLogo = paint;
})();
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/enverus-logo.js", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/flows.jsx
try { (() => {
/* global React, Icon, Button */
// Enverus One — Flows page view (redesigned).

const PINNED_FLOWS = [{
  name: 'AFE Evaluation'
}, {
  name: 'Type Curve Genera...',
  fullName: 'Type Curve Generator'
}, {
  name: 'Generation Site Sel...',
  fullName: 'Generation Site Selection'
}];
const USE_CASES = [{
  label: 'Acquisitions &\ndivestitures',
  count: 4
}, {
  label: 'Inventory &\ndevelopment',
  count: 4
}, {
  label: 'Power siting & load',
  count: 3
}, {
  label: 'Production valuation',
  count: 3
}, {
  label: 'Land & lease',
  count: 2
}, {
  label: 'Well & completion\ndesign',
  count: 4
}];
const ALL_FLOWS = [{
  name: 'AFE Evaluation',
  licensed: true,
  pinned: true,
  desc: 'Decide participate, non-consent, or market/sell on inbound AFEs with offset-based economics.',
  tags: ['Minerals', 'Operators', 'Finance']
}, {
  name: 'Deal Screener',
  licensed: true,
  pinned: false,
  desc: 'Screen acquisition and divestiture opportunities against real analogs in minutes.',
  tags: ['Operators', 'Minerals', 'Finance']
}, {
  name: 'Inventory Evaluation',
  licensed: true,
  pinned: false,
  desc: 'Quantify remaining drilling inventory and rank locations by economic return.',
  tags: ['Operators', 'Finance']
}, {
  name: 'Frac Hit Mitigation',
  licensed: false,
  pinned: false,
  desc: 'Model parent-child interference and flag wells at risk of frac hits.',
  tags: ['Operators', 'Minerals']
}, {
  name: 'Type Curve Generator',
  licensed: true,
  pinned: true,
  desc: 'Build normalized type curves from offset production with one click.',
  tags: ['Operators', 'Finance']
}, {
  name: 'Lease Expiry Monitor',
  licensed: true,
  pinned: false,
  desc: 'Track leases nearing expiration and prioritize retention actions.',
  tags: ['Land & Legal', 'Operators']
}, {
  name: 'Generation Site Selection',
  licensed: true,
  pinned: true,
  desc: 'Rank candidate sites for new generation on interconnection and load.',
  tags: ['Power & Renewables']
}, {
  name: 'Large Load Site Selection',
  licensed: false,
  pinned: false,
  desc: 'Match large-load prospects to sites with available capacity and land.',
  tags: ['Power & Renewables']
}];
function FlowIcon({
  size = 18
}) {
  return React.createElement(Icon, {
    name: 'git-branch',
    size,
    strokeWidth: 1.5,
    color: 'var(--muted-foreground)'
  });
}
function PinnedCard({
  flow
}) {
  return React.createElement('div', {
    style: {
      flex: '0 0 calc(33.333% - 8px)',
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '12px 14px'
    }
  }, React.createElement('div', {
    style: {
      width: 26,
      height: 26,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement(FlowIcon)), React.createElement('span', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)',
      flex: 1,
      minWidth: 0,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    }
  }, flow.name), React.createElement('button', {
    'aria-label': 'More info about ' + flow.name,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--muted-foreground)',
      padding: '0 2px',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    name: 'info',
    size: 13,
    strokeWidth: 1.75
  })), React.createElement(Button, {
    variant: 'default',
    size: 'sm'
  }, 'Run'), React.createElement('button', {
    'aria-label': 'Pin ' + flow.name,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--primary)',
      padding: '0 2px',
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    name: 'pin',
    size: 13,
    strokeWidth: 1.75
  })));
}
function UseCaseCard({
  uc
}) {
  return React.createElement('div', {
    style: {
      flex: '0 0 190px',
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '16px 16px 14px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      cursor: 'pointer',
      minHeight: 90
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      gap: 6
    }
  }, React.createElement('span', {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--foreground)',
      lineHeight: 1.4,
      whiteSpace: 'pre-line'
    }
  }, uc.label), React.createElement(Icon, {
    name: 'chevron-right',
    size: 15,
    strokeWidth: 2,
    color: 'var(--muted-foreground)'
  })), React.createElement('span', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)',
      marginTop: 10
    }
  }, uc.count + ' flows'));
}
function AllFlowCard({
  flow
}) {
  return React.createElement('div', {
    style: {
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '16px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  },
  // Top: icon + name + info + pin
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      gap: 10
    }
  }, React.createElement('div', {
    style: {
      width: 28,
      height: 28,
      flexShrink: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 2
    }
  }, React.createElement(FlowIcon)), React.createElement('div', {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, React.createElement('span', {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--foreground)',
      lineHeight: 1.3
    }
  }, flow.name), React.createElement('button', {
    'aria-label': 'More info about ' + flow.name,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--muted-foreground)',
      padding: 0,
      display: 'flex',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    name: 'info',
    size: 12,
    strokeWidth: 1.75
  }))), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 4,
      marginTop: 4
    }
  }, flow.licensed ? React.createElement(Icon, {
    name: 'check',
    size: 11,
    strokeWidth: 2.5,
    color: 'var(--primary)'
  }) : React.createElement(Icon, {
    name: 'lock',
    size: 11,
    strokeWidth: 2,
    color: 'var(--muted-foreground)'
  }), React.createElement('span', {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: flow.licensed ? 'var(--primary)' : 'var(--muted-foreground)'
    }
  }, flow.licensed ? 'Licensed' : 'Not licensed'))), React.createElement('button', {
    'aria-label': (flow.pinned ? 'Unpin ' : 'Pin ') + flow.name,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: flow.pinned ? 'var(--primary)' : 'var(--muted-foreground)',
      padding: 0,
      display: 'flex',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    name: 'pin',
    size: 13,
    strokeWidth: 1.75
  }))),
  // Description
  React.createElement('p', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      margin: 0,
      lineHeight: 1.5
    }
  }, flow.desc),
  // Tags + Run
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      gap: 8,
      marginTop: 'auto'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 4
    }
  }, flow.tags.map(function (tag) {
    return React.createElement('span', {
      key: tag,
      style: {
        fontSize: 11,
        fontWeight: 500,
        padding: '2px 8px',
        borderRadius: 999,
        border: '1px solid var(--border)',
        color: 'var(--muted-foreground)',
        background: 'var(--accent)'
      }
    }, tag);
  })), React.createElement(Button, {
    variant: 'default',
    size: 'sm'
  }, 'Run')));
}
function FlowsView() {
  const [accessFilter, setAccessFilter] = React.useState('all');
  const useCasesRef = React.useRef(null);
  function scrollUC(dir) {
    if (useCasesRef.current) {
      useCasesRef.current.scrollLeft += dir * 220;
    }
  }
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 28
    }
  },
  // Page header
  React.createElement('div', null, React.createElement('h1', {
    style: {
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--foreground)',
      margin: '0 0 4px'
    }
  }, 'Flows'), React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      margin: 0,
      lineHeight: 1.5
    }
  }, 'Decision-ready workflows built for energy. Run analysis in minutes, no setup needed.')),
  // Search
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 40,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '0 14px'
    }
  }, React.createElement(Icon, {
    name: 'search',
    size: 15,
    color: 'var(--muted-foreground)',
    strokeWidth: 1.75
  }), React.createElement('span', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      userSelect: 'none'
    }
  }, "Search flows, personas, or describe what you're trying to do...")),
  // Pinned
  React.createElement('div', null, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginBottom: 12
    }
  }, React.createElement(Icon, {
    name: 'pin',
    size: 14,
    strokeWidth: 2,
    color: 'var(--primary)'
  }), React.createElement('span', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, 'Pinned')), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 12
    }
  }, PINNED_FLOWS.map(function (f) {
    return React.createElement(PinnedCard, {
      key: f.name,
      flow: f
    });
  }))),
  // Use cases
  React.createElement('div', null, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 12
    }
  }, React.createElement('span', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, 'Use cases'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 6
    }
  }, React.createElement('button', {
    onClick: function () {
      scrollUC(-1);
    },
    'aria-label': 'Scroll use cases left',
    style: {
      width: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      color: 'var(--foreground)'
    }
  }, React.createElement(Icon, {
    name: 'chevron-left',
    size: 13,
    strokeWidth: 2
  })), React.createElement('button', {
    onClick: function () {
      scrollUC(1);
    },
    'aria-label': 'Scroll use cases right',
    style: {
      width: 28,
      height: 28,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      color: 'var(--foreground)'
    }
  }, React.createElement(Icon, {
    name: 'chevron-right',
    size: 13,
    strokeWidth: 2
  })))), React.createElement('div', {
    ref: useCasesRef,
    style: {
      display: 'flex',
      gap: 12,
      overflowX: 'auto',
      scrollBehavior: 'smooth',
      paddingBottom: 4,
      scrollbarWidth: 'none'
    }
  }, USE_CASES.map(function (uc) {
    return React.createElement(UseCaseCard, {
      key: uc.label,
      uc: uc
    });
  }))),
  // All Flows
  React.createElement('div', null, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 8
    }
  }, React.createElement('span', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, 'All Flows'), React.createElement('span', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)'
    }
  }, '14 flows')), React.createElement('div', {
    style: {
      display: 'flex',
      background: 'var(--muted)',
      borderRadius: 'var(--radius-md)',
      padding: 3,
      gap: 2
    }
  }, ['all', 'my-access'].map(function (f) {
    const active = accessFilter === f;
    return React.createElement('button', {
      key: f,
      onClick: function () {
        setAccessFilter(f);
      },
      style: {
        padding: '4px 12px',
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        background: active ? 'var(--card)' : 'transparent',
        color: active ? 'var(--foreground)' : 'var(--muted-foreground)',
        border: active ? '1px solid var(--border)' : '1px solid transparent',
        borderRadius: 'var(--radius-sm)',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        transition: 'background .1s, color .1s'
      }
    }, f === 'all' ? 'All flows' : 'My access');
  }))), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 14
    }
  }, ALL_FLOWS.map(function (flow) {
    return React.createElement(AllFlowCard, {
      key: flow.name,
      flow: flow
    });
  }))));
}
Object.assign(window, {
  FlowsView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/flows.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/home.jsx
try { (() => {
/* global React, Icon, Button, Card */
// Enverus One — Command Center (ONE) home view.

function CreateAgentModal({
  onClose
}) {
  const [name, setName] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [instructions, setInstructions] = React.useState('');
  const [dragOver, setDragOver] = React.useState(false);
  const dialogRef = React.useRef(null);
  const firstFocusRef = React.useRef(null);
  const fileInputRef = React.useRef(null);
  React.useEffect(() => {
    // Focus first input on open
    if (firstFocusRef.current) firstFocusRef.current.focus();
    // Escape to close
    function onKey(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll('button, [href], input, textarea, select, [tabindex]:not([tabindex="-1"])');
        const first = focusable[0],
          last = focusable[focusable.length - 1];
        if (e.shiftKey ? document.activeElement === first : document.activeElement === last) {
          e.preventDefault();
          (e.shiftKey ? last : first).focus();
        }
      }
    }
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);
  const overlay = {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(4px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    animation: 'e1fade .15s ease'
  };
  const dialog = {
    width: 560,
    maxWidth: 'calc(100vw - 32px)',
    maxHeight: 'calc(100vh - 48px)',
    background: 'var(--card)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--border)',
    display: 'flex',
    flexDirection: 'column',
    boxShadow: '0 24px 64px rgba(0,0,0,0.5)'
  };
  const sectionLabel = (icon, text, sub) => React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      marginBottom: 8
    }
  }, React.createElement(Icon, {
    name: icon,
    size: 15,
    strokeWidth: 1.75,
    color: 'var(--foreground)'
  }), React.createElement('span', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, text), sub && React.createElement('span', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)',
      marginLeft: 2
    }
  }, sub));
  const inputBase = {
    width: '100%',
    background: 'var(--env-one-background)',
    border: '1px solid var(--input)',
    borderRadius: 'var(--radius-md)',
    color: 'var(--foreground)',
    fontFamily: 'var(--font-sans)',
    fontSize: 13,
    resize: 'none',
    outline: 'none',
    boxSizing: 'border-box'
  };
  const counter = (val, max) => {
    const pct = val.length / max;
    const col = pct >= 1 ? 'var(--destructive)' : pct >= 0.8 ? 'var(--warning, #ff9500)' : 'var(--muted-foreground)';
    return React.createElement('div', {
      style: {
        textAlign: 'right',
        fontSize: 11,
        color: col,
        marginTop: 4
      }
    }, `${val.length}/${max}`);
  };
  return React.createElement('div', {
    style: overlay,
    onClick: e => e.target === e.currentTarget && onClose()
  }, React.createElement('div', {
    ref: dialogRef,
    role: 'dialog',
    'aria-modal': 'true',
    'aria-labelledby': 'create-agent-title',
    style: dialog
  },
  // Header
  React.createElement('div', {
    style: {
      padding: '20px 24px 16px',
      borderBottom: '1px solid var(--border)',
      flexShrink: 0
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    }
  }, React.createElement('div', null, React.createElement('h2', {
    id: 'create-agent-title',
    style: {
      margin: 0,
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--foreground)',
      letterSpacing: '-0.2px'
    }
  }, 'Create agent'), React.createElement('p', {
    style: {
      margin: '3px 0 0',
      fontSize: 13,
      color: 'var(--muted-foreground)'
    }
  }, 'Configure details of your new agent')), React.createElement('button', {
    onClick: onClose,
    'aria-label': 'Close dialog',
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--muted-foreground)',
      padding: 4,
      display: 'flex',
      alignItems: 'center',
      borderRadius: 'var(--radius-sm)',
      marginTop: -2
    }
  }, React.createElement(Icon, {
    name: 'x',
    size: 18,
    strokeWidth: 1.75
  })))),
  // Scrollable body
  React.createElement('div', {
    style: {
      flex: 1,
      overflowY: 'auto',
      padding: '20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 20,
      maskImage: 'linear-gradient(to bottom, black calc(100% - 32px), transparent 100%)'
    }
  },
  // Name
  React.createElement('div', null, sectionLabel('type', 'Name'), React.createElement('label', {
    htmlFor: 'agent-name',
    style: {
      display: 'none'
    }
  }, 'Agent name'), React.createElement('input', {
    id: 'agent-name',
    ref: firstFocusRef,
    value: name,
    onChange: e => setName(e.target.value),
    placeholder: 'Enter a name for your agent',
    'aria-label': 'Agent name',
    style: Object.assign({}, inputBase, {
      height: 38,
      padding: '0 12px'
    })
  }), counter(name, 100)),
  // Description
  React.createElement('div', null, sectionLabel('align-justify', 'Description'), React.createElement('textarea', {
    id: 'agent-desc',
    'aria-label': 'Agent description',
    value: desc,
    onChange: e => setDesc(e.target.value),
    placeholder: 'Briefly describe what this agent does...',
    rows: 4,
    style: Object.assign({}, inputBase, {
      padding: '10px 12px'
    })
  }), counter(desc, 500)),
  // Prompt Template
  React.createElement('div', null, React.createElement('div', {
    style: {
      marginBottom: 6
    }
  }, React.createElement('div', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)',
      marginBottom: 2
    }
  }, 'Prompt Template'), React.createElement('div', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)'
    }
  }, 'Pick a template to base your agent on, or start from scratch.')), React.createElement('div', {
    style: {
      display: 'inline-flex',
      alignItems: 'flex-start',
      gap: 10,
      padding: '12px 16px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--env-one-background)',
      border: '1px solid var(--primary)',
      cursor: 'pointer',
      maxWidth: 220
    }
  }, React.createElement('div', {
    style: {
      marginTop: 1,
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    name: 'sparkles',
    size: 16,
    strokeWidth: 1.75,
    color: 'var(--primary)'
  })), React.createElement('div', null, React.createElement('div', {
    style: {
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--foreground)',
      marginBottom: 4
    }
  }, 'Start from scratch'), React.createElement('div', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)',
      lineHeight: 1.5
    }
  }, 'Create reusable instructions and context for your agent'))), React.createElement('p', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)',
      margin: '10px 0 0'
    }
  }, 'No templates yet — your agent will use only your custom instructions.')),
  // Instructions
  React.createElement('div', null, sectionLabel('message-square', 'Instructions', '(optional)'), React.createElement('textarea', {
    id: 'agent-instructions',
    'aria-label': 'Agent instructions (optional)',
    value: instructions,
    onChange: e => setInstructions(e.target.value),
    placeholder: 'Add any specific instructions for this agent, e.g. tone, focus areas, or response format...',
    rows: 5,
    style: Object.assign({}, inputBase, {
      padding: '10px 12px'
    })
  }), counter(instructions, 1000)),
  // Upload files
  React.createElement('div', null, React.createElement('div', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)',
      marginBottom: 8
    }
  }, 'Upload files'), React.createElement('input', {
    ref: fileInputRef,
    type: 'file',
    multiple: true,
    accept: '.pdf,.jpg,.jpeg,.png,.ppt,.pptx',
    'aria-label': 'Upload files',
    style: {
      position: 'absolute',
      width: 1,
      height: 1,
      opacity: 0,
      pointerEvents: 'none'
    }
  }), React.createElement('div', {
    role: 'button',
    tabIndex: 0,
    'aria-label': 'Upload files — drop here or press Enter to browse',
    onClick: () => fileInputRef.current && fileInputRef.current.click(),
    onKeyDown: e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        fileInputRef.current && fileInputRef.current.click();
      }
    },
    onDragOver: e => {
      e.preventDefault();
      setDragOver(true);
    },
    onDragLeave: () => setDragOver(false),
    onDrop: e => {
      e.preventDefault();
      setDragOver(false);
    },
    style: {
      border: `1.5px dashed ${dragOver ? 'var(--primary)' : 'var(--input)'}`,
      borderRadius: 'var(--radius-md)',
      padding: '32px 24px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 10,
      background: dragOver ? 'color-mix(in srgb, var(--primary) 6%, transparent)' : 'var(--env-one-background)',
      transition: 'border-color .15s, background .15s',
      cursor: 'pointer'
    }
  }, React.createElement(Icon, {
    name: 'upload',
    size: 28,
    strokeWidth: 1.5,
    color: 'var(--muted-foreground)'
  }), React.createElement('div', {
    style: {
      textAlign: 'center'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--foreground)',
      marginBottom: 3
    }
  }, 'Drop files here or click to browse'), React.createElement('div', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)'
    }
  }, 'PDF, JPEG, PNG, PPT · Max 50 files, 50 MB each'))))),
  // Footer
  React.createElement('div', {
    style: {
      padding: '14px 24px',
      borderTop: '1px solid var(--border)',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 10,
      flexShrink: 0
    }
  }, React.createElement(Button, {
    variant: 'secondary',
    onClick: onClose
  }, 'Cancel'), React.createElement(Button, {
    variant: 'default'
  }, 'Create'))));
}
const FEATURED_FLOWS = [{
  id: 'quickstart',
  icon: 'layout-list',
  title: 'QuickStart',
  description: 'An intelligent research assistant that searches your uploaded documents using semantic search and provides cited answers.',
  category: 'Custom'
}, {
  id: 'afe-eval',
  icon: 'table-2',
  title: 'AFE Evaluation',
  description: 'Get comprehensive analysis and recommendations from AFE document.',
  category: 'Minerals'
}, {
  id: 'gen-site',
  icon: 'wind',
  title: 'Generation Site Selection',
  description: 'Optimize pipeline, electrical, and telecommunications infrastructure placement using AI-powered analysis of regulatory constraints.',
  category: 'Power & Renewables'
}];
const RECENT_ACTIVITY = [{
  name: 'ExecPrec three-tier-1781279473193 – 2026-06-12T15:51:13.636Z',
  started: '6 days ago',
  duration: '0s',
  id: 'e244e82ee250',
  status: 'Completed'
}, {
  name: 'ExecPrec public-effective-1781279459802 – 2026-06-12T15:50:59.959Z',
  started: '6 days ago',
  duration: '0s',
  id: 'bd54dd93b840',
  status: 'Completed'
}, {
  name: 'Chatty',
  started: '8 days ago',
  duration: '3m',
  id: 'ecde910df533',
  status: 'Active'
}, {
  name: 'Activity Analytics Analyst – 2026-06-10T16:34:14.213Z',
  started: '8 days ago',
  duration: '13s',
  id: 'b8fa2083058e',
  status: 'Completed'
}, {
  name: 'Tom the Agent – 2026-06-10T16:10:23.168Z',
  started: '8 days ago',
  duration: '12s',
  id: '83fe552bb6e5',
  status: 'Completed'
}, {
  name: 'Tom the Agent – 2026-06-10T16:00:57.392Z',
  started: '8 days ago',
  duration: '20s',
  id: 'bc706e37c696',
  status: 'Completed'
}, {
  name: 'Asset Performance Management Analysis',
  started: '28 days ago',
  duration: '25s',
  id: '79c6b45aeb30',
  status: 'Completed'
}, {
  name: 'Asset Performance Management Insights',
  started: '28 days ago',
  duration: '27s',
  id: 'e249d10cf45a',
  status: 'Completed'
}, {
  name: 'Greeting User in Research Workflow',
  started: '28 days ago',
  duration: '5s',
  id: '9231c76afd0b',
  status: 'Completed'
}, {
  name: 'Site Selection Agent',
  started: 'about 1 month ago',
  duration: '53s',
  id: '56ae2243e83d',
  status: 'Active'
}];
function HomeAskRing({
  size = 16
}) {
  return React.createElement('img', {
    src: '../../assets/ask-one-ring.svg',
    width: size,
    height: size,
    alt: '',
    style: {
      flexShrink: 0,
      display: 'block'
    }
  });
}
function SectionHeader({
  title,
  subtitle
}) {
  return React.createElement('div', {
    style: {
      position: 'relative',
      marginBottom: 20,
      textAlign: 'center'
    }
  }, React.createElement('h2', {
    style: {
      fontSize: 20,
      fontWeight: 700,
      letterSpacing: '-0.2px',
      color: 'var(--foreground)',
      margin: '0 0 5px'
    }
  }, title), React.createElement('p', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      margin: 0,
      lineHeight: 1.4
    }
  }, subtitle), React.createElement(Button, {
    variant: 'secondary',
    size: 'sm',
    style: {
      position: 'absolute',
      right: 0,
      top: 0
    }
  }, 'View all'));
}
function FlowCard({
  flow,
  onRun
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('div', {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    className: 'card',
    style: {
      flex: 1,
      minWidth: 0,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 'var(--radius-xl)',
      padding: '18px 20px',
      boxShadow: hover ? 'var(--shadow)' : undefined,
      transition: 'box-shadow .15s',
      cursor: 'default'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      marginBottom: 12
    }
  }, React.createElement('div', {
    style: {
      width: 34,
      height: 34,
      borderRadius: 'var(--radius-full)',
      background: 'var(--accent)',
      border: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    name: flow.icon,
    size: 15,
    strokeWidth: 1.75
  })), React.createElement('span', {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--foreground)',
      flex: 1,
      lineHeight: 1.2
    }
  }, flow.title), React.createElement('button', {
    'aria-label': 'More information about ' + flow.title,
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--muted-foreground)',
      padding: 0,
      display: 'flex',
      alignItems: 'center',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    name: 'info',
    size: 14,
    strokeWidth: 1.75
  }))), React.createElement('p', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      lineHeight: 1.6,
      margin: '0 0 auto',
      flex: 1
    }
  }, flow.description), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 16
    }
  }, React.createElement('span', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)'
    }
  }, flow.category), React.createElement(Button, {
    variant: 'default',
    size: 'sm',
    onClick: onRun
  }, 'Run')));
}
function ActivityRow({
  row,
  last
}) {
  const [hover, setHover] = React.useState(false);
  const completed = row.status === 'Completed';
  const td = {
    padding: '11px 16px',
    fontSize: 13,
    color: 'var(--foreground)',
    borderBottom: last ? 'none' : '1px solid var(--border)'
  };
  return React.createElement('tr', {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: hover ? 'var(--env-one-background)' : 'var(--card)',
      transition: 'background .1s',
      cursor: 'pointer'
    }
  }, React.createElement('td', {
    style: Object.assign({}, td, {
      maxWidth: 380,
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap'
    })
  }, row.name), React.createElement('td', {
    style: Object.assign({}, td, {
      color: 'var(--muted-foreground)',
      whiteSpace: 'nowrap'
    })
  }, row.started), React.createElement('td', {
    style: Object.assign({}, td, {
      color: 'var(--muted-foreground)',
      fontFamily: 'var(--font-mono)',
      fontSize: 12
    })
  }, row.duration), React.createElement('td', {
    style: td
  }, React.createElement('span', {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      letterSpacing: '.3px',
      background: 'color-mix(in srgb, var(--primary) 10%, transparent)',
      color: 'var(--primary)',
      padding: '2px 8px',
      borderRadius: 'var(--radius-sm)'
    }
  }, row.id)), React.createElement('td', {
    style: td
  }, React.createElement('span', {
    style: {
      display: 'inline-block',
      fontSize: 12,
      fontWeight: 500,
      padding: '2px 10px',
      borderRadius: 'var(--radius-pill)',
      border: '1px solid ' + (completed ? 'var(--primary)' : 'var(--input)'),
      color: completed ? 'var(--primary)' : 'var(--muted-foreground)'
    }
  }, row.status)));
}
function HomeView({
  onNavigate
}) {
  const [showCreateAgent, setShowCreateAgent] = React.useState(false);
  const th = {
    padding: '9px 16px',
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '.3px',
    color: 'var(--muted-foreground)',
    textTransform: 'uppercase',
    textAlign: 'left',
    borderBottom: '1px solid var(--border)',
    background: 'var(--env-one-background)',
    whiteSpace: 'nowrap'
  };
  return React.createElement(React.Fragment, null, showCreateAgent && React.createElement(CreateAgentModal, {
    onClose: () => setShowCreateAgent(false)
  }), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 40
    }
  },
  // ── Greeting + search ───────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 22,
      paddingTop: 12
    }
  }, React.createElement('h1', {
    style: {
      fontSize: 26,
      fontWeight: 500,
      color: 'var(--foreground)',
      margin: 0,
      letterSpacing: '-0.2px',
      textAlign: 'center'
    }
  }, 'Good morning Akash, let\'s do some magic ✨'), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      width: '100%',
      maxWidth: 500
    }
  }, React.createElement('div', {
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 42,
      background: 'var(--card)',
      border: '1px solid var(--input)',
      borderRadius: 'var(--radius-md)',
      padding: '0 12px'
    }
  }, React.createElement('label', {
    htmlFor: 'home-search',
    style: {
      display: 'none'
    }
  }, 'Search or ask ONE'), React.createElement(Icon, {
    name: 'search',
    size: 15,
    color: 'var(--muted-foreground)',
    strokeWidth: 1.75
  }), React.createElement('input', {
    id: 'home-search',
    type: 'search',
    placeholder: 'I want to evaluate an AFE, run a flow...',
    'aria-label': 'Search or ask ONE',
    style: {
      flex: 1,
      fontSize: 14,
      color: 'var(--foreground)',
      background: 'transparent',
      border: 'none',
      outline: 'none',
      fontFamily: 'var(--font-sans)'
    }
  }), React.createElement('button', {
    'aria-label': 'Record voice input',
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--muted-foreground)',
      padding: 0,
      display: 'flex',
      alignItems: 'center'
    }
  }, React.createElement(Icon, {
    name: 'mic',
    size: 15,
    strokeWidth: 1.75
  }))), React.createElement('button', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      height: 42,
      padding: '0 18px',
      background: 'var(--primary)',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--primary-foreground)',
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'nowrap',
      flexShrink: 0
    }
  }, React.createElement(HomeAskRing, {
    size: 16
  }), 'Ask ONE'))),
  // ── Featured Flows ──────────────────────────────────────────────────────
  React.createElement('div', null, React.createElement(SectionHeader, {
    title: 'Featured Flows',
    subtitle: 'Click on a Flow to get started.'
  }), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'stretch'
    }
  }, FEATURED_FLOWS.map(function (flow) {
    var onRun = flow.id === 'afe-eval' ? function () {
      onNavigate && onNavigate('workflow');
    } : flow.id === 'quickstart' ? function () {
      setShowCreateAgent(true);
    } : undefined;
    return React.createElement(FlowCard, {
      key: flow.id,
      flow: flow,
      onRun: onRun
    });
  }))),
  // ── Recent Activity ─────────────────────────────────────────────────────
  React.createElement('div', null, React.createElement(SectionHeader, {
    title: 'Recent Activity',
    subtitle: 'Pick up where you left off. Revisit recent flows.'
  }), React.createElement(Card, {
    pad: 0,
    style: {
      overflow: 'hidden'
    }
  }, React.createElement('div', {
    style: {
      overflowX: 'auto'
    }
  }, React.createElement('table', {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      minWidth: 600
    }
  }, React.createElement('thead', null, React.createElement('tr', null, React.createElement('th', {
    style: th
  }, 'Name'), React.createElement('th', {
    style: th
  }, 'Started'), React.createElement('th', {
    style: th
  }, 'Duration'), React.createElement('th', {
    style: th
  }, 'ID'), React.createElement('th', {
    style: th
  }, 'Status'))), React.createElement('tbody', null, RECENT_ACTIVITY.map(function (row, i) {
    return React.createElement(ActivityRow, {
      key: row.id,
      row: row,
      last: i === RECENT_ACTIVITY.length - 1
    });
  }))))))));
}
Object.assign(window, {
  HomeView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/home.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/ideas.jsx
try { (() => {
/* global React, Icon */
// Enverus One — Ideas (Concepts) view.

const TAGS_LIST = [{
  label: 'Power',
  count: 10
}, {
  label: 'Economics',
  count: 4
}, {
  label: 'Forecast',
  count: 4
}, {
  label: 'PET',
  count: 4
}, {
  label: 'LTF',
  count: 4
}, {
  label: 'test',
  count: 3
}, {
  label: 'power',
  count: 3
}, {
  label: 'Intel',
  count: 3
}, {
  label: 'renewables',
  count: 2
}, {
  label: 'energy',
  count: 2
}, {
  label: 'Power Economics',
  count: 2
}, {
  label: 'Production',
  count: 2
}, {
  label: 'sdf',
  count: 1
}, {
  label: 'tgb',
  count: 1
}, {
  label: 'restart5',
  count: 1
}, {
  label: 'Test',
  count: 1
}, {
  label: 'restart7',
  count: 1
}];
const CONCEPTS = [{
  id: 1,
  votes: 0,
  status: 'Exploring',
  shared: true,
  title: 'Dashboard Build Instructions: Weekly Rig Count & Market Shar...',
  desc: 'Dashboard Build Instructions: Weekly Rig Count & Market Share Report Overall Structure Three-page report with a dark navy header bar on each page carrying the title, subtitle (date range), and a source attribution in the top right. A confidential footer with page number sits at the bottom. Pages are landscape-oriented, white background, clean and corporate in style. Page 1 — Executive Summary KPI cards row...',
  author: 'Brendan Heberton',
  updated: 'Jun 23, 2026',
  tags: []
}, {
  id: 2,
  votes: 0,
  status: 'Exploring',
  shared: true,
  title: 'Releasing workflows in prod',
  desc: 'Imported Enverus ONE Concept',
  author: 'Michal Bures',
  updated: 'Jun 23, 2026',
  tags: []
}, {
  id: 3,
  votes: 0,
  status: 'Exploring',
  shared: true,
  title: 'A renewables project pipeline dashboard with capacity by tec...',
  desc: 'A renewables project pipeline dashboard with capacity by technology (solar, wind, storage), project status, and ISO territory, and a map',
  author: 'Brendan Heberton',
  updated: 'Jun 19, 2026',
  tags: []
}, {
  id: 4,
  votes: 0,
  status: 'Building',
  shared: true,
  title: 'A production benchmarking dashboard for a buy-side analyst e...',
  desc: 'A production benchmarking dashboard for a buy-side analyst evaluating US E&P operators. Show the top 25 operators by total BOE production over the last 12 months, with a breakdown by basin and commodity (oil, gas, NGL). Include a production growth rate chart comparing year-over-year change, and a scatter plot of production volume vs. active rig count to identify operators running lean. Highlight the five operato...',
  author: 'Brendan Heberton',
  updated: 'Jun 16, 2026',
  tags: []
}, {
  id: 5,
  votes: 0,
  status: 'Building',
  shared: true,
  title: 'If H&P 252 was going to be dropped by Oxy in September of th...',
  desc: 'If H&P 252 was going to be dropped by Oxy in September of this year, what other operators are nearby that have a rig that is drilling a slower footage per day compared to the basin average for the last 12 months. What competitor rig should H&P look to displace nearby? Show me a map of these resources, as well as a nice interactive dashboard to help me understand how i compare to related competitors',
  author: 'Brendan Heberton',
  updated: 'Jun 12, 2026',
  tags: []
}, {
  id: 6,
  votes: 0,
  status: 'Building',
  shared: true,
  title: 'A map of data centers across the US with capacity by state',
  desc: 'A map of data centers across the US with capacity by state',
  author: 'Brendan Heberton',
  updated: 'Jun 12, 2026',
  tags: []
}, {
  id: 7,
  votes: 0,
  status: 'Building',
  shared: true,
  title: 'Enverus ONE | Knowledge Share Topics',
  desc: 'Enverus ONE Knowledge Share Tuesday meetings topics list. Bring your own, nominate a topic, vote one what you want to discuss next!',
  author: 'Brendan Heberton',
  updated: 'Jun 2, 2026',
  tags: ['meetings']
}];
const STATUS_STYLE = {
  Exploring: {
    background: 'color-mix(in srgb, var(--info) 15%, transparent)',
    color: 'var(--info)',
    border: '1px solid color-mix(in srgb, var(--info) 30%, transparent)'
  },
  Building: {
    background: 'color-mix(in srgb, var(--primary) 15%, transparent)',
    color: 'var(--primary)',
    border: '1px solid color-mix(in srgb, var(--primary) 30%, transparent)'
  }
};
function StatusBadge({
  status
}) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.Exploring;
  return React.createElement('span', {
    style: Object.assign({
      fontSize: 12,
      fontWeight: 500,
      padding: '2px 10px',
      borderRadius: 'var(--radius-pill)'
    }, s)
  }, status);
}
function SharedBadge() {
  return React.createElement('span', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 4,
      fontSize: 12,
      fontWeight: 500,
      padding: '2px 10px',
      borderRadius: 'var(--radius-pill)',
      background: 'color-mix(in srgb, var(--foreground) 8%, transparent)',
      color: 'var(--muted-foreground)',
      border: '1px solid var(--border)'
    }
  }, React.createElement(Icon, {
    name: 'users',
    size: 11,
    strokeWidth: 2
  }), 'Shared');
}
function ConceptRow({
  concept,
  last
}) {
  const [votes, setVotes] = React.useState(concept.votes);
  const [voted, setVoted] = React.useState(false);
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: 16,
      padding: '18px 20px',
      borderBottom: last ? 'none' : '1px solid var(--border)',
      alignItems: 'flex-start'
    }
  },
  // Vote column
  React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 2,
      flexShrink: 0,
      paddingTop: 2
    }
  }, React.createElement('button', {
    onClick: function () {
      if (!voted) {
        setVotes(function (v) {
          return v + 1;
        });
        setVoted(true);
      } else {
        setVotes(function (v) {
          return v - 1;
        });
        setVoted(false);
      }
    },
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: voted ? 'var(--primary)' : 'var(--muted-foreground)',
      padding: 0,
      display: 'flex'
    }
  }, React.createElement(Icon, {
    name: 'thumbs-up',
    size: 16,
    strokeWidth: 1.75
  })), React.createElement('span', {
    style: {
      fontSize: 12,
      fontWeight: 600,
      color: 'var(--muted-foreground)'
    }
  }, votes)),
  // Content
  React.createElement('div', {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap',
      marginBottom: 6
    }
  }, React.createElement('span', {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--foreground)'
    }
  }, concept.title), React.createElement(StatusBadge, {
    status: concept.status
  }), concept.shared ? React.createElement(SharedBadge) : null), React.createElement('p', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      margin: '0 0 8px',
      lineHeight: 1.55,
      display: '-webkit-box',
      WebkitLineClamp: 2,
      WebkitBoxOrient: 'vertical',
      overflow: 'hidden'
    }
  }, concept.desc), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, React.createElement('span', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)'
    }
  }, 'by ' + concept.author), React.createElement('span', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)'
    }
  }, '· updated ' + concept.updated), concept.tags.map(function (tag) {
    return React.createElement('span', {
      key: tag,
      style: {
        fontSize: 11,
        fontWeight: 500,
        padding: '2px 8px',
        borderRadius: 'var(--radius-pill)',
        background: 'var(--accent)',
        color: 'var(--muted-foreground)',
        border: '1px solid var(--border)'
      }
    }, tag);
  }))),
  // Doc icon
  React.createElement('div', {
    style: {
      flexShrink: 0,
      color: 'var(--muted-foreground)',
      paddingTop: 2
    }
  }, React.createElement(Icon, {
    name: 'file-text',
    size: 16,
    strokeWidth: 1.5
  })));
}
function IdeasView() {
  const [tab, setTab] = React.useState('all');
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  },
  // ── Header ────────────────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    }
  }, React.createElement('div', null, React.createElement('h1', {
    style: {
      fontSize: 24,
      fontWeight: 700,
      color: 'var(--foreground)',
      margin: '0 0 4px'
    }
  }, React.createElement('span', null, 'Where Ideas Become '), React.createElement('span', {
    style: {
      fontWeight: 300
    }
  }, 'ONE')), React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      margin: 0
    }
  }, 'Product-expert innovations ready for your feedback.')), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 10
    }
  }, React.createElement('button', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      height: 36,
      padding: '0 16px',
      background: 'transparent',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--foreground)',
      fontFamily: 'var(--font-sans)'
    }
  }, React.createElement(Icon, {
    name: 'upload',
    size: 14,
    strokeWidth: 1.75
  }), 'Upload Concept'), React.createElement('button', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      height: 36,
      padding: '0 16px',
      background: 'var(--primary)',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--primary-foreground)',
      fontFamily: 'var(--font-sans)'
    }
  }, React.createElement(Icon, {
    name: 'lightbulb',
    size: 14,
    strokeWidth: 1.75,
    color: 'var(--primary-foreground)'
  }), 'Build Your Concept'))),
  // ── Search ────────────────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 42,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '0 14px'
    }
  }, React.createElement(Icon, {
    name: 'search',
    size: 16,
    color: 'var(--muted-foreground)',
    strokeWidth: 1.75
  }), React.createElement('span', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      userSelect: 'none'
    }
  }, 'Search concepts by name or description...')),
  // ── Tags ─────────────────────────────────────────────────────────────
  React.createElement('div', null, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      flexWrap: 'wrap'
    }
  }, React.createElement('span', {
    style: {
      fontSize: 11,
      fontWeight: 600,
      color: 'var(--muted-foreground)',
      letterSpacing: '.5px',
      textTransform: 'uppercase',
      flexShrink: 0
    }
  }, 'TAGS'), TAGS_LIST.map(function (tag) {
    return React.createElement('button', {
      key: tag.label,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 13,
        fontWeight: 500,
        padding: '3px 10px',
        borderRadius: 'var(--radius-pill)',
        background: 'transparent',
        border: '1px solid var(--border)',
        color: 'var(--foreground)',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)'
      }
    }, tag.label, React.createElement('span', {
      style: {
        fontSize: 11,
        color: 'var(--muted-foreground)'
      }
    }, tag.count));
  }), React.createElement('span', {
    style: {
      fontSize: 13,
      color: 'var(--primary)',
      cursor: 'pointer',
      fontWeight: 500
    }
  }, '+3 more'))),
  // ── List header ───────────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, React.createElement('span', {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--foreground)'
    }
  }, '7 Concepts'), React.createElement('div', {
    role: 'tablist',
    'aria-label': 'Concepts filter',
    style: {
      display: 'flex',
      gap: 4
    }
  }, [['all', 'All'], ['mine', 'My Concepts'], ['shared', 'Shared With Me']].map(function (pair) {
    const active = tab === pair[0];
    return React.createElement('button', {
      key: pair[0],
      role: 'tab',
      'aria-selected': active,
      onClick: function () {
        setTab(pair[0]);
      },
      style: {
        padding: '5px 12px',
        fontSize: 13,
        fontWeight: active ? 600 : 400,
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? 'var(--foreground)' : 'var(--muted-foreground)',
        border: active ? '1px solid var(--border)' : '1px solid transparent',
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)'
      }
    }, pair[1]);
  }))), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      color: 'var(--muted-foreground)',
      cursor: 'pointer'
    }
  }, React.createElement(Icon, {
    name: 'arrow-up-down',
    size: 13,
    strokeWidth: 2
  }), 'Newest')),
  // ── Concept list ──────────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden'
    }
  }, CONCEPTS.map(function (c, i) {
    return React.createElement(ConceptRow, {
      key: c.id,
      concept: c,
      last: i === CONCEPTS.length - 1
    });
  })));
}
Object.assign(window, {
  IdeasView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/ideas.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/leases.jsx
try { (() => {
/* global React, Icon, Button, Badge, Card, LEASES, Breadcrumb, STATUS_VARIANT */
// Enverus One — Leases table view.

function LeasesView({
  onSelectLease,
  selectedId
}) {
  const th = {
    background: 'var(--env-one-background)',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '.2px',
    color: 'var(--muted-foreground)',
    textTransform: 'uppercase',
    textAlign: 'left',
    padding: '10px 16px',
    borderBottom: '1px solid var(--border)',
    whiteSpace: 'nowrap'
  };
  const td = {
    padding: '12px 16px',
    fontSize: 14,
    color: 'var(--foreground)',
    borderBottom: '1px solid var(--border)'
  };
  return React.createElement('div', null, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 32
    }
  }, React.createElement('div', null, React.createElement('h1', {
    style: {
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--foreground)',
      margin: '0 0 4px'
    }
  }, 'Leases'), React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      margin: 0
    }
  }, '4,128 acres under management · 12 expiring within 60 days')), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement(Button, {
    variant: 'secondary',
    icon: 'sliders-horizontal'
  }, 'Filters'), React.createElement(Button, {
    variant: 'default',
    icon: 'plus'
  }, 'Add Lease'))), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 8,
      marginBottom: 14
    }
  }, React.createElement('div', {
    role: 'tablist',
    'aria-label': 'Lease status filter',
    style: {
      display: 'inline-flex',
      background: 'var(--accent)',
      borderRadius: 'var(--radius-md)',
      padding: 3,
      gap: 2
    }
  }, ['All', 'Expiring', 'Active', 'Renewed'].map((t, i) => React.createElement('button', {
    key: t,
    role: 'tab',
    'aria-selected': i === 0,
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: i === 0 ? 'var(--foreground)' : 'var(--muted)',
      background: i === 0 ? 'var(--card)' : 'transparent',
      boxShadow: i === 0 ? '0 1px 2px rgba(0,0,0,.06)' : 'none',
      borderRadius: 'var(--radius-sm)',
      padding: '6px 14px',
      border: 'none',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, t)))), React.createElement(Card, {
    pad: 0,
    style: {
      overflow: 'hidden'
    }
  }, React.createElement('table', {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, React.createElement('thead', null, React.createElement('tr', null, ['Lease', 'Tract', 'Operator', 'Basin'].map(h => React.createElement('th', {
    key: h,
    style: th
  }, h)), React.createElement('th', {
    style: Object.assign({
      textAlign: 'right'
    }, th)
  }, 'Acres'), React.createElement('th', {
    style: th
  }, 'Expires'), React.createElement('th', {
    style: th
  }, 'Status'))), React.createElement('tbody', null, LEASES.map((l, i) => {
    const sel = selectedId === l.id;
    return React.createElement(LeaseRow, {
      key: l.id,
      l,
      td,
      sel,
      last: i === LEASES.length - 1,
      onSelect: onSelectLease
    });
  })))));
}
function LeaseRow({
  l,
  td,
  sel,
  last,
  onSelect
}) {
  const [hover, setHover] = React.useState(false);
  const cell = Object.assign({}, td, last ? {
    borderBottom: 0
  } : null);
  const urgent = l.days <= 30 && l.status !== 'Renewed';
  return React.createElement('tr', {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: () => onSelect && onSelect(l),
    style: {
      background: sel ? 'var(--success-background)' : hover ? 'var(--env-one-background)' : 'var(--card)',
      boxShadow: sel ? 'inset 2px 0 0 var(--primary)' : 'none',
      cursor: 'pointer',
      transition: 'background .1s'
    }
  }, React.createElement('td', {
    style: Object.assign({
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--foreground)'
    }, cell)
  }, l.id), React.createElement('td', {
    style: Object.assign({
      color: 'var(--foreground)'
    }, cell)
  }, l.tract), React.createElement('td', {
    style: cell
  }, l.operator), React.createElement('td', {
    style: cell
  }, l.basin), React.createElement('td', {
    style: Object.assign({
      textAlign: 'right',
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--foreground)'
    }, cell)
  }, l.acres.toLocaleString()), React.createElement('td', {
    style: Object.assign({
      color: urgent ? 'var(--warning)' : 'var(--foreground)',
      fontWeight: urgent ? 600 : 400
    }, cell)
  }, l.expires), React.createElement('td', {
    style: cell
  }, React.createElement(Badge, {
    variant: STATUS_VARIANT[l.status] || 'default'
  }, l.status)));
}
Object.assign(window, {
  LeasesView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/leases.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/library.jsx
try { (() => {
/* global React, Icon, Button */
// Enverus One — Library view.

const LIBRARY_ASSETS = [{
  id: 'questions',
  name: 'Questions',
  tier: 'Silver',
  type: 'File',
  owner: 'Jason Shannon',
  access: 'Owner',
  space: ''
}, {
  id: 'louisiana',
  name: 'Louisiana AFE Example',
  tier: 'Bronze',
  type: 'File',
  owner: 'Jason Shannon',
  access: 'Owner',
  space: ''
}];
const TIER_STYLES = {
  Silver: {
    background: 'color-mix(in srgb, #9ca3af 18%, transparent)',
    color: '#9ca3af',
    border: '1px solid color-mix(in srgb, #9ca3af 35%, transparent)'
  },
  Bronze: {
    background: 'color-mix(in srgb, #b87333 18%, transparent)',
    color: '#c08040',
    border: '1px solid color-mix(in srgb, #b87333 35%, transparent)'
  }
};
function FilterDropdown({
  label
}) {
  return React.createElement('button', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      height: 34,
      padding: '0 12px',
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--foreground)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)',
      whiteSpace: 'nowrap'
    }
  }, label, React.createElement(Icon, {
    name: 'chevron-down',
    size: 13,
    strokeWidth: 2,
    color: 'var(--muted-foreground)'
  }));
}
function Checkbox() {
  const [checked, setChecked] = React.useState(false);
  return React.createElement('div', {
    onClick: function () {
      setChecked(function (c) {
        return !c;
      });
    },
    style: {
      width: 16,
      height: 16,
      borderRadius: 4,
      border: '1.5px solid var(--border)',
      background: checked ? 'var(--primary)' : 'transparent',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, checked ? React.createElement(Icon, {
    name: 'check',
    size: 10,
    strokeWidth: 3,
    color: 'var(--primary-foreground)'
  }) : null);
}
function AssetRow({
  asset,
  last
}) {
  const [hover, setHover] = React.useState(false);
  const tier = TIER_STYLES[asset.tier] || {};
  const td = {
    padding: '13px 16px',
    fontSize: 13,
    color: 'var(--foreground)',
    borderBottom: last ? 'none' : '1px solid var(--border)',
    verticalAlign: 'middle'
  };
  return React.createElement('tr', {
    onMouseEnter: function () {
      setHover(true);
    },
    onMouseLeave: function () {
      setHover(false);
    },
    style: {
      background: hover ? 'var(--accent)' : 'transparent',
      transition: 'background .1s',
      cursor: 'pointer'
    }
  },
  // Checkbox
  React.createElement('td', {
    style: Object.assign({}, td, {
      width: 44,
      paddingRight: 0
    })
  }, React.createElement(Checkbox)),
  // Asset name + tier badge
  React.createElement('td', {
    style: td
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, React.createElement('span', {
    style: {
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, asset.name), React.createElement('span', {
    style: Object.assign({
      fontSize: 11,
      fontWeight: 500,
      padding: '2px 8px',
      borderRadius: 'var(--radius-pill)'
    }, tier)
  }, asset.tier))),
  // Type
  React.createElement('td', {
    style: td
  }, React.createElement('span', {
    style: {
      fontSize: 12,
      fontWeight: 500,
      padding: '3px 10px',
      borderRadius: 'var(--radius-md)',
      background: 'var(--accent)',
      border: '1px solid var(--border)',
      color: 'var(--foreground)'
    }
  }, asset.type)),
  // Owner
  React.createElement('td', {
    style: Object.assign({}, td, {
      color: 'var(--foreground)'
    })
  }, asset.owner),
  // Access
  React.createElement('td', {
    style: td
  }, React.createElement('span', {
    style: {
      fontSize: 13,
      color: 'var(--primary)',
      fontWeight: 500
    }
  }, asset.access)),
  // Space
  React.createElement('td', {
    style: Object.assign({}, td, {
      color: 'var(--muted-foreground)'
    })
  }, asset.space),
  // Actions
  React.createElement('td', {
    style: Object.assign({}, td, {
      width: 44,
      textAlign: 'right'
    })
  }, React.createElement('button', {
    'aria-label': 'More actions',
    style: {
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: 'var(--muted-foreground)',
      padding: 4,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-sm)'
    }
  }, React.createElement(Icon, {
    name: 'ellipsis',
    size: 15
  }))));
}
function LibraryView() {
  const th = {
    padding: '11px 16px',
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: '.2px',
    color: 'var(--muted-foreground)',
    textTransform: 'uppercase',
    textAlign: 'left',
    borderBottom: '1px solid var(--border)',
    background: 'transparent',
    whiteSpace: 'nowrap'
  };
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  },
  // ── Page header ───────────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between'
    }
  }, React.createElement('div', null, React.createElement('h1', {
    style: {
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--foreground)',
      margin: '0 0 4px'
    }
  }, 'Library'), React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      margin: 0
    }
  }, 'Your assets powering Enverus ONE')), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 10
    }
  }, React.createElement('button', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 7,
      height: 36,
      padding: '0 16px',
      background: 'transparent',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--foreground)',
      fontFamily: 'var(--font-sans)'
    }
  }, React.createElement(Icon, {
    name: 'layers',
    size: 15,
    strokeWidth: 1.75
  }), 'Gateway'), React.createElement('button', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      height: 36,
      padding: '0 4px 0 16px',
      background: 'var(--primary)',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--primary-foreground)',
      fontFamily: 'var(--font-sans)'
    }
  }, React.createElement(Icon, {
    name: 'plus',
    size: 15,
    strokeWidth: 2.5,
    color: 'var(--primary-foreground)'
  }), 'Create Assets', React.createElement('div', {
    style: {
      width: 1,
      height: 20,
      background: 'color-mix(in srgb, var(--primary-foreground) 30%, transparent)',
      margin: '0 4px 0 8px'
    }
  }), React.createElement('div', {
    style: {
      padding: '0 8px',
      display: 'flex',
      alignItems: 'center'
    }
  }, React.createElement(Icon, {
    name: 'chevron-down',
    size: 13,
    strokeWidth: 2.5,
    color: 'var(--primary-foreground)'
  }))))),
  // ── Search bar ────────────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      height: 42,
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '0 14px',
      width: '100%',
      maxWidth: 520
    }
  }, React.createElement(Icon, {
    name: 'search',
    size: 16,
    color: 'var(--muted-foreground)',
    strokeWidth: 1.75
  }), React.createElement('span', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      userSelect: 'none'
    }
  }, 'Search or ask anything...')),
  // ── Filter bar ────────────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, React.createElement('span', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      fontWeight: 500
    }
  }, 'Filter by'), React.createElement(FilterDropdown, {
    label: 'Owned by anyone'
  }), React.createElement(FilterDropdown, {
    label: 'All assets'
  }), React.createElement(FilterDropdown, {
    label: 'All sources'
  }), React.createElement('div', {
    style: {
      width: 1,
      height: 20,
      background: 'var(--border)',
      margin: '0 4px'
    }
  }), React.createElement('span', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      fontWeight: 500
    }
  }, 'Sort by'), React.createElement(FilterDropdown, {
    label: 'Last Updated'
  })),
  // ── Table ─────────────────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden'
    }
  }, React.createElement('table', {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, React.createElement('thead', null, React.createElement('tr', null, React.createElement('th', {
    style: Object.assign({}, th, {
      width: 44,
      paddingRight: 0
    })
  }, React.createElement('div', {
    style: {
      width: 16,
      height: 16,
      borderRadius: 4,
      border: '1.5px solid var(--border)',
      background: 'transparent'
    }
  })), React.createElement('th', {
    style: th
  }, 'Asset'), React.createElement('th', {
    style: th
  }, 'Type'), React.createElement('th', {
    style: th
  }, 'Owner'), React.createElement('th', {
    style: th
  }, 'Access'), React.createElement('th', {
    style: th
  }, 'Space'), React.createElement('th', {
    style: Object.assign({}, th, {
      width: 44
    })
  }))), React.createElement('tbody', null, LIBRARY_ASSETS.map(function (asset, i) {
    return React.createElement(AssetRow, {
      key: asset.id,
      asset: asset,
      last: i === LIBRARY_ASSETS.length - 1
    });
  }))),
  // Footer
  React.createElement('div', {
    style: {
      padding: '10px 16px',
      borderTop: '1px solid var(--border)',
      fontSize: 13,
      color: 'var(--muted-foreground)'
    }
  }, 'Showing 2 of 2')),
  // ── Stacks FAB ───────────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      position: 'fixed',
      bottom: 24,
      right: 24
    }
  }, React.createElement('button', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 40,
      padding: '0 18px',
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--foreground)',
      fontFamily: 'var(--font-sans)',
      boxShadow: 'var(--shadow)'
    }
  }, React.createElement(Icon, {
    name: 'layers',
    size: 15,
    strokeWidth: 1.75
  }), 'Stacks')));
}
Object.assign(window, {
  LibraryView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/library.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/primitives.jsx
try { (() => {
/* global React */
// Enverus One — UI kit primitives. Exported to window for cross-file use.

function _toPascal(name) {
  return name.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('');
}

// Lucide icon as inline SVG (reads window.lucide.icons IconNode arrays).
function Icon({
  name,
  size = 16,
  strokeWidth = 1.75,
  className,
  style,
  color
}) {
  const icons = window.lucide && window.lucide.icons || {};
  const node = icons[_toPascal(name)];
  const children = node ? node.map((c, i) => React.createElement(c[0], Object.assign({
    key: i
  }, c[1]))) : null;
  return React.createElement('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color || 'currentColor',
    strokeWidth,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
    className,
    'aria-hidden': 'true',
    focusable: 'false',
    style: Object.assign({
      flexShrink: 0,
      display: 'block'
    }, style)
  }, children);
}
function Button({
  variant = 'default',
  size = 'default',
  children,
  icon,
  onClick,
  disabled,
  style,
  title
}) {
  const base = {
    fontFamily: 'var(--font-sans)',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    whiteSpace: 'nowrap',
    border: '1px solid transparent',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background .12s, border-color .12s, transform .04s',
    userSelect: 'none',
    outline: 'none'
  };
  const sizes = {
    default: {
      height: 36,
      padding: '0 16px',
      fontSize: 14
    },
    sm: {
      height: 28,
      padding: '0 12px',
      fontSize: 13,
      borderRadius: 'var(--radius-sm)'
    },
    lg: {
      height: 40,
      padding: '0 20px',
      fontSize: 14
    },
    icon: {
      height: 36,
      width: 36,
      padding: 0
    },
    'icon-sm': {
      height: 28,
      width: 28,
      padding: 0
    }
  };
  const variants = {
    default: {
      background: 'var(--primary)',
      color: 'var(--primary-foreground)'
    },
    secondary: {
      background: 'var(--card)',
      color: 'var(--foreground)',
      borderColor: 'var(--input)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--foreground)'
    },
    destructive: {
      background: 'var(--destructive)',
      color: 'var(--primary-foreground)'
    },
    warning: {
      background: 'var(--warning)',
      color: 'var(--warning-foreground)'
    },
    link: {
      background: 'transparent',
      color: 'var(--primary)',
      padding: '0 4px'
    }
  };
  const hoverBg = {
    default: 'var(--primary-hover)',
    secondary: 'var(--env-one-background)',
    ghost: 'var(--accent)',
    destructive: 'color-mix(in srgb, var(--destructive), black 20%)',
    warning: 'var(--warning-hover)',
    link: 'transparent'
  };
  const [hover, setHover] = React.useState(false);
  const [press, setPress] = React.useState(false);
  const v = variants[variant];
  const st = Object.assign({}, base, sizes[size], v, style);
  if (disabled) {
    if (variant === 'default') {
      st.opacity = '50%';
    } else {
      st.opacity = 0.5;
    }
  } else if (hover) {
    st.background = hoverBg[variant];
    if (variant === 'link') st.textDecoration = 'underline';
    if (variant === 'secondary') st.borderColor = 'var(--input)';
  }
  if (press && !disabled) st.transform = 'translateY(1px)';
  return React.createElement('button', {
    className: 'ds-focusable',
    style: st,
    onClick: disabled ? undefined : onClick,
    title,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setPress(false);
    },
    onMouseDown: () => setPress(true),
    onMouseUp: () => setPress(false)
  }, icon ? React.createElement(Icon, {
    name: icon,
    size: size === 'sm' ? 14 : 16
  }) : null, children);
}
function Badge({
  variant = 'default',
  children
}) {
  const v = {
    default: {
      background: 'var(--accent)',
      color: 'var(--foreground)'
    },
    success: {
      background: 'var(--success-background)',
      color: 'var(--primary)'
    },
    warning: {
      background: 'var(--warning-background)',
      color: 'var(--warning)'
    },
    error: {
      background: 'var(--destructive-background)',
      color: 'var(--destructive)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--muted-foreground)',
      border: '1px solid var(--input)'
    }
  }[variant];
  return React.createElement('span', {
    style: Object.assign({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: '.2px',
      borderRadius: 'var(--radius-pill)',
      padding: '2px 9px',
      fontFamily: 'var(--font-sans)',
      lineHeight: 1.4,
      whiteSpace: 'nowrap'
    }, v)
  }, children);
}
function Card({
  children,
  elevated,
  style,
  onClick,
  pad = 0
}) {
  return React.createElement('div', {
    onClick,
    className: 'card',
    style: Object.assign({
      boxShadow: elevated ? 'var(--shadow)' : undefined
    }, style)
  }, children);
}
function KpiCard({
  label,
  value,
  unit,
  trend,
  trendDir
}) {
  const col = {
    up: 'var(--primary)',
    down: 'var(--destructive)',
    flat: 'var(--muted)'
  }[trendDir || 'flat'];
  const arrow = {
    up: '▲',
    down: '▼',
    flat: '—'
  }[trendDir || 'flat'];
  return React.createElement(Card, {
    pad: 18
  }, React.createElement('div', {
    style: {
      fontSize: 12,
      fontWeight: 500,
      letterSpacing: '.2px',
      color: 'var(--muted-foreground)',
      textTransform: 'uppercase'
    }
  }, label), React.createElement('div', {
    style: {
      fontSize: 28,
      fontWeight: 700,
      letterSpacing: '-0.5px',
      color: 'var(--foreground)',
      lineHeight: 1.1,
      marginTop: 8
    }
  }, value, unit ? React.createElement('span', {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--muted-foreground)'
    }
  }, ' ' + unit) : null), trend ? React.createElement('div', {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: col,
      marginTop: 6
    }
  }, arrow + ' ' + trend) : null);
}
function Input({
  value,
  onChange,
  placeholder,
  icon,
  style,
  onKeyDown,
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  return React.createElement('div', {
    style: Object.assign({
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 36,
      background: 'var(--card)',
      border: '1px solid ' + (focus ? 'var(--primary)' : 'var(--input)'),
      borderRadius: 'var(--radius-md)',
      padding: '0 12px',
      boxShadow: focus ? 'var(--focus-shadow)' : 'none',
      transition: 'border-color .12s, box-shadow .12s'
    }, style)
  }, icon ? React.createElement(Icon, {
    name: icon,
    size: 15,
    color: 'var(--muted-foreground)'
  }) : null, React.createElement('input', Object.assign({
    value,
    onChange,
    placeholder,
    onKeyDown,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      color: 'var(--foreground)'
    }
  }, rest)));
}
function ToggleGroup({
  children,
  style
}) {
  return React.createElement('div', {
    role: 'group',
    style: Object.assign({
      display: 'inline-flex',
      gap: 2,
      padding: 3,
      background: 'var(--accent)',
      borderRadius: 'var(--radius-lg)',
      border: '1px solid var(--border)'
    }, style)
  }, children);
}
function ToggleButton({
  active,
  onClick,
  children,
  style,
  disabled
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('button', {
    role: 'radio',
    'aria-pressed': active,
    className: 'ds-focusable',
    onClick: disabled ? undefined : onClick,
    disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: Object.assign({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '7px 16px',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      background: active ? 'var(--card)' : hover ? 'color-mix(in srgb, var(--foreground) 6%, transparent)' : 'transparent',
      color: active ? 'var(--foreground)' : 'var(--muted-foreground)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: active ? 600 : 400,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      transition: 'background .12s, color .12s',
      boxShadow: active ? '0 1px 3px rgba(0,0,0,.12)' : 'none',
      whiteSpace: 'nowrap'
    }, style)
  }, children);
}
function Tabs({
  value,
  onValueChange,
  children,
  style
}) {
  return React.createElement('div', {
    style: Object.assign({
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }, style)
  }, children);
}
function TabsList({
  children,
  style
}) {
  return React.createElement('div', {
    role: 'tablist',
    style: Object.assign({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 2,
      background: 'var(--accent)',
      borderRadius: 'var(--radius-md)',
      padding: 4,
      border: '1px solid var(--border)'
    }, style)
  }, children);
}
function TabsTrigger({
  value,
  active,
  onClick,
  children,
  style
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('button', {
    role: 'tab',
    'aria-selected': active,
    className: 'ds-focusable',
    onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: Object.assign({
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      padding: '5px 12px',
      border: 'none',
      borderRadius: 'var(--radius-sm)',
      background: active ? 'var(--card)' : hover ? 'color-mix(in srgb, var(--foreground) 6%, transparent)' : 'transparent',
      color: active ? 'var(--foreground)' : 'var(--muted-foreground)',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: active ? 500 : 400,
      cursor: 'pointer',
      transition: 'background .12s, color .12s',
      whiteSpace: 'nowrap',
      boxShadow: active ? '0 1px 2px rgba(0,0,0,.1)' : 'none'
    }, style)
  }, children);
}
Object.assign(window, {
  Icon,
  Button,
  Badge,
  Card,
  KpiCard,
  Input,
  ToggleGroup,
  ToggleButton,
  Tabs,
  TabsList,
  TabsTrigger
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/primitives.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/settings-access-usage.jsx
try { (() => {
// settings-access-usage.jsx
// Two new sections:
//
// 1. MyAccessSection (user scope) — self-administering permissions:
//    see what you can do, request elevated access, manage personal
//    API tokens, browse your access history.
//
// 2. OrgUsageSection (org scope) — usage analytics that lives next to
//    Billing & seats: who's using what, how that's trending, and what
//    it costs the org to run.

const {
  useState: useAU,
  useMemo: useAUM
} = React;

// ============================================================================
// 1. MY ACCESS  (user scope)
// ============================================================================

// Capability rows the user can interact with. Each has a current level
// (full | edit | read | none) and an indication of what the maximum a
// Team Admin / Org Admin would get.
const MY_CAPS = [{
  group: 'Permian Analytics workspace'
}, {
  id: 'wells',
  icon: 'crosshair',
  label: 'Wells & production data',
  desc: 'Search, filter, export well-level data',
  cur: 'edit',
  max: 'edit'
}, {
  id: 'views',
  icon: 'bookmark',
  label: 'Saved views & dashboards',
  desc: 'Create, share, and set workspace defaults',
  cur: 'edit',
  max: 'edit'
}, {
  id: 'flows',
  icon: 'workflow',
  label: 'Workflows & flows',
  desc: 'Build, edit, and schedule flows',
  cur: 'edit',
  max: 'edit'
}, {
  id: 'agents',
  icon: 'bot',
  label: 'Agent Studio',
  desc: 'Create personal agents and teams',
  cur: 'edit',
  max: 'edit'
}, {
  id: 'members',
  icon: 'users',
  label: 'Manage members & invites',
  desc: 'Invite, remove, change roles in this workspace',
  cur: 'edit',
  max: 'edit'
}, {
  id: 'integrations',
  icon: 'plug-zap',
  label: 'Workspace integrations',
  desc: 'Connect Salesforce, S3, Snowflake, etc.',
  cur: 'edit',
  max: 'edit'
}, {
  group: 'Other workspaces'
}, {
  id: 'bakken',
  icon: 'briefcase',
  label: 'Bakken Strategy workspace',
  desc: 'Read-only access; you are not a member',
  cur: 'read',
  max: 'edit',
  altPath: 'request-membership'
}, {
  id: 'renewables',
  icon: 'briefcase',
  label: 'Renewables Group workspace',
  desc: 'No access yet',
  cur: 'none',
  max: 'edit',
  altPath: 'request-membership'
}, {
  group: 'Organization'
}, {
  id: 'org-sso',
  icon: 'shield-check',
  label: 'SSO & identity policy',
  desc: 'View only — only Org Admins can edit',
  cur: 'read',
  max: 'edit',
  altPath: 'request-org-admin'
}, {
  id: 'org-audit',
  icon: 'history',
  label: 'Audit log',
  desc: 'View only — read access via your Team Admin role',
  cur: 'read',
  max: 'edit',
  altPath: 'request-org-admin'
}, {
  id: 'org-billing',
  icon: 'credit-card',
  label: 'Billing & invoicing',
  desc: 'No access — Org Admin only',
  cur: 'none',
  max: 'edit',
  altPath: 'request-org-admin'
}, {
  id: 'org-export',
  icon: 'download',
  label: 'Org-wide data export',
  desc: 'Required for compliance / migrations',
  cur: 'none',
  max: 'edit',
  altPath: 'request-org-admin'
}];
const PENDING_REQUESTS = [{
  id: 1,
  what: 'Access to Bakken Strategy workspace',
  reason: 'Joining cross-basin acquisition project Q2',
  sent: '2 days ago',
  status: 'pending',
  approver: 'Maria Velez (Workspace Owner)'
}, {
  id: 2,
  what: 'Org Admin: audit log export',
  reason: 'Quarterly compliance reporting',
  sent: '1 week ago',
  status: 'approved',
  approver: 'Karen Ortiz',
  notes: 'Time-boxed: expires Jun 30, 2026'
}, {
  id: 3,
  what: 'Renewables Group · Editor',
  reason: 'Power generation siting collaboration',
  sent: '3 weeks ago',
  status: 'denied',
  approver: 'Sam Lin',
  notes: 'Reason: not aligned with current project allocation'
}];
const PERSONAL_TOKENS = [{
  id: 1,
  name: 'ev1-cli — local development',
  scopes: ['read:wells', 'read:production', 'read:views'],
  lastUsed: '14 days ago',
  expires: 'Aug 14, 2026',
  created: 'Feb 14, 2026'
}, {
  id: 2,
  name: 'jupyter-notebook · research',
  scopes: ['read:wells', 'read:rigs', 'read:flows:run'],
  lastUsed: '4 min ago',
  expires: 'Never',
  created: 'Mar 02, 2026'
}];
const ACCESS_HISTORY = [{
  ts: 'May 11, 2026 · 09:14',
  who: 'Karen Ortiz',
  action: 'granted',
  what: 'Audit log export (time-boxed Jun 30)'
}, {
  ts: 'Apr 22, 2026 · 14:32',
  who: 'Maria Velez',
  action: 'granted',
  what: 'Team Admin in Permian Analytics'
}, {
  ts: 'Mar 14, 2026 · 11:08',
  who: 'self',
  action: 'rotated',
  what: 'API token ev1-cli'
}, {
  ts: 'Feb 28, 2026 · 16:51',
  who: 'Mike Donnelly',
  action: 'revoked',
  what: 'Old SCIM-provisioned admin role (auto-rotated)'
}, {
  ts: 'Jan 04, 2026 · 10:22',
  who: 'self',
  action: 'enabled',
  what: 'MFA — Duo Mobile TOTP'
}];
function MyAccessSection({
  markDirty
}) {
  const [requestFor, setRequestFor] = useAU(null);
  const [reason, setReason] = useAU('');
  const [duration, setDuration] = useAU('30 days');
  const [showRequestModal, setShowRequestModal] = useAU(false);
  const startRequest = cap => {
    setRequestFor(cap);
    setReason('');
    setDuration('30 days');
    setShowRequestModal(true);
  };
  const submit = () => {
    setShowRequestModal(false);
    markDirty();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "User \xB7 06",
    title: "My access",
    sub: "What you can do across Enverus ONE today, what you can request to do more, and the API tokens you've issued."
  }), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Your role"), /*#__PURE__*/React.createElement("span", {
    className: "v",
    style: {
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      fontWeight: 500
    }
  }, "Team Admin"), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Permian Analytics")), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Capabilities"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, MY_CAPS.filter(c => !c.group && (c.cur === 'edit' || c.cur === 'full')).length, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 400,
      fontSize: 13
    }
  }, " / ", MY_CAPS.filter(c => !c.group).length)), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "With full access")), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Pending requests"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, PENDING_REQUESTS.filter(r => r.status === 'pending').length), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Awaiting approval")), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Personal tokens"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, PERSONAL_TOKENS.length), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Active API tokens"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Capabilities & permissions",
    s: "What you can do today. Click \u2018Request\u2019 on any restricted item to ask your admin for elevated access.",
    actions: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 11,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--accent-brand)'
      }
    }), "Full"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 11,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--warning)'
      }
    }), "Read"), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 11,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: 'var(--neutral-60)'
      }
    }), "None"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content caps-list"
  }, MY_CAPS.map((c, i) => {
    if (c.group) return /*#__PURE__*/React.createElement("div", {
      key: 'g' + i,
      className: "caps-group"
    }, c.group);
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      className: 'caps-row caps-' + c.cur
    }, /*#__PURE__*/React.createElement("span", {
      className: "caps-ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: c.icon
    })), /*#__PURE__*/React.createElement("div", {
      className: "caps-meta"
    }, /*#__PURE__*/React.createElement("div", {
      className: "caps-nm"
    }, c.label), /*#__PURE__*/React.createElement("div", {
      className: "caps-ds"
    }, c.desc)), /*#__PURE__*/React.createElement("div", {
      className: "caps-level"
    }, /*#__PURE__*/React.createElement("span", {
      className: 'caps-dot caps-dot-' + c.cur
    }), /*#__PURE__*/React.createElement("span", {
      className: "caps-lvl-lbl"
    }, c.cur === 'edit' || c.cur === 'full' ? 'Full' : c.cur === 'read' ? 'Read only' : 'No access')), /*#__PURE__*/React.createElement("div", {
      className: "caps-action"
    }, c.cur !== c.max ? /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm",
      onClick: () => startRequest(c)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "key-round"
    }), "Request") : /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--text-muted)',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.04em',
        textTransform: 'uppercase'
      }
    }, "Granted")));
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Access requests",
    s: `${PENDING_REQUESTS.filter(r => r.status === 'pending').length} pending · ${PENDING_REQUESTS.filter(r => r.status !== 'pending').length} resolved`,
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm",
      onClick: () => {
        setRequestFor(null);
        setShowRequestModal(true);
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "New request")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content req-list"
  }, PENDING_REQUESTS.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.id,
    className: 'req-row req-' + r.status
  }, /*#__PURE__*/React.createElement("span", {
    className: 'req-status-dot req-' + r.status
  }), /*#__PURE__*/React.createElement("div", {
    className: "req-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "req-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "req-what"
  }, r.what), /*#__PURE__*/React.createElement("span", {
    className: 'pill ' + (r.status === 'pending' ? 'pill--warn' : r.status === 'approved' ? 'pill--brand' : 'pill--danger'),
    style: {
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: 10
    }
  }, r.status)), /*#__PURE__*/React.createElement("div", {
    className: "req-reason"
  }, "\"", r.reason, "\""), /*#__PURE__*/React.createElement("div", {
    className: "req-foot"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), r.sent), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "user-check"
  }), r.approver), r.notes && /*#__PURE__*/React.createElement("span", {
    className: "req-notes"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info"
  }), r.notes))), /*#__PURE__*/React.createElement("div", {
    className: "req-actions"
  }, r.status === 'pending' && /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Cancel"), r.status === 'denied' && /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rotate-cw"
  }), "Re-request"), r.status === 'approved' && /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external-link"
  }), "Use")))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Personal API tokens",
    s: "Tokens scoped to your access. They expire automatically and are revoked when you leave the org.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "New token")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content token-list"
  }, PERSONAL_TOKENS.map(t => /*#__PURE__*/React.createElement("div", {
    key: t.id,
    className: "token-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "token-ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "key"
  })), /*#__PURE__*/React.createElement("div", {
    className: "token-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "token-nm"
  }, t.name), /*#__PURE__*/React.createElement("div", {
    className: "token-scopes"
  }, t.scopes.map(s => /*#__PURE__*/React.createElement("code", {
    key: s
  }, s)))), /*#__PURE__*/React.createElement("div", {
    className: "token-times"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "lbl-mono"
  }, "Last used"), " ", t.lastUsed), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "lbl-mono"
  }, "Expires"), " ", t.expires)), /*#__PURE__*/React.createElement("div", {
    className: "token-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rotate-cw"
  }), "Rotate"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    style: {
      color: 'var(--danger-text)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  }), "Revoke")))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Access history",
    s: "Every grant, revocation, and rotation that has touched your account."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content history-list"
  }, ACCESS_HISTORY.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "history-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "history-ts"
  }, h.ts), /*#__PURE__*/React.createElement("span", {
    className: 'history-action history-' + h.action
  }, h.action === 'granted' && /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), h.action === 'revoked' && /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  }), h.action === 'rotated' && /*#__PURE__*/React.createElement(Icon, {
    name: "rotate-cw"
  }), h.action === 'enabled' && /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check"
  }), h.action), /*#__PURE__*/React.createElement("span", {
    className: "history-what"
  }, h.what), /*#__PURE__*/React.createElement("span", {
    className: "history-who"
  }, "by ", h.who))))), showRequestModal && /*#__PURE__*/React.createElement(RequestAccessModal, {
    cap: requestFor,
    reason: reason,
    setReason: setReason,
    duration: duration,
    setDuration: setDuration,
    onSubmit: submit,
    onClose: () => setShowRequestModal(false)
  }));
}
function RequestAccessModal({
  cap,
  reason,
  setReason,
  duration,
  setDuration,
  onSubmit,
  onClose
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "drawer-scrim open",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "req-modal"
  }, /*#__PURE__*/React.createElement("div", {
    className: "req-modal-head"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "key-round"
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "req-modal-t"
  }, "Request elevated access"), /*#__PURE__*/React.createElement("div", {
    className: "req-modal-s"
  }, "Your admin will review this request and either approve, ask for more context, or deny it.")), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "req-modal-body"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Requesting"
  }, cap ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10,
      padding: '10px 12px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--background)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: cap.icon,
    style: {
      width: 18,
      height: 18,
      color: 'var(--accent-brand)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, cap.label), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, cap.desc))) : /*#__PURE__*/React.createElement(SelectBox, {
    value: "Choose a capability",
    options: ['Choose a capability', ...MY_CAPS.filter(c => !c.group).map(c => c.label)]
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Reason",
    sub: "One or two sentences. Your admin will see exactly this."
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "inp inst-area",
    rows: "4",
    placeholder: "Why do you need this access? What project or task does it unblock?",
    value: reason,
    onChange: e => setReason(e.target.value)
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Duration"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: duration,
    onChange: e => setDuration(e.target.value),
    options: ['7 days', '30 days', '90 days', 'Until project end', 'Permanent']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Approver"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Karen Ortiz (Org Admin)",
    options: ['Karen Ortiz (Org Admin)', 'Mike Donnelly (Org Admin)', 'Auto-route to on-call admin']
  })))), /*#__PURE__*/React.createElement("div", {
    className: "req-modal-foot"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onClose
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "default",
    onClick: onSubmit
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send"
  }), "Send request"))));
}

// ============================================================================
// 2. ORG USAGE & COST  (org scope)
// ============================================================================

// Generated usage data (last 12 months)
const USAGE_MONTHS = [{
  m: 'Jun 2025',
  queries: 142000,
  ai: 8.2,
  storage: 12.1,
  cost: 48200
}, {
  m: 'Jul 2025',
  queries: 158000,
  ai: 9.6,
  storage: 13.4,
  cost: 52900
}, {
  m: 'Aug 2025',
  queries: 167000,
  ai: 11.1,
  storage: 14.0,
  cost: 55100
}, {
  m: 'Sep 2025',
  queries: 174000,
  ai: 12.4,
  storage: 14.6,
  cost: 57200
}, {
  m: 'Oct 2025',
  queries: 188000,
  ai: 14.8,
  storage: 15.2,
  cost: 60800
}, {
  m: 'Nov 2025',
  queries: 193000,
  ai: 17.2,
  storage: 15.8,
  cost: 63500
}, {
  m: 'Dec 2025',
  queries: 172000,
  ai: 16.1,
  storage: 16.0,
  cost: 58400
}, {
  m: 'Jan 2026',
  queries: 201000,
  ai: 18.9,
  storage: 16.7,
  cost: 64900
}, {
  m: 'Feb 2026',
  queries: 218000,
  ai: 22.3,
  storage: 17.3,
  cost: 69200
}, {
  m: 'Mar 2026',
  queries: 234000,
  ai: 26.7,
  storage: 17.9,
  cost: 72800
}, {
  m: 'Apr 2026',
  queries: 247000,
  ai: 30.4,
  storage: 18.4,
  cost: 76100
}, {
  m: 'May 2026',
  queries: 259000,
  ai: 33.8,
  storage: 18.9,
  cost: 78600
}];
const TOP_USERS = [{
  name: 'Sarah Chen',
  ws: 'Permian Analytics',
  queries: 12480,
  ai: 1.84,
  av: '#9b1d4d',
  initials: 'SC'
}, {
  name: 'Priya Anand',
  ws: 'Permian Analytics',
  queries: 11102,
  ai: 1.62,
  av: '#5b399e',
  initials: 'PA'
}, {
  name: 'David Park',
  ws: 'Permian Analytics',
  queries: 9847,
  ai: 1.41,
  av: '#1f648d',
  initials: 'DP'
}, {
  name: 'Alex Rivera',
  ws: 'Renewables Group',
  queries: 8923,
  ai: 1.28,
  av: '#0e7c66',
  initials: 'AR'
}, {
  name: 'Jamal Williams',
  ws: 'Bakken Strategy',
  queries: 8451,
  ai: 1.19,
  av: '#3c8321',
  initials: 'JW'
}, {
  name: 'Maria Velez',
  ws: 'Permian Analytics',
  queries: 7832,
  ai: 1.04,
  av: '#c4622d',
  initials: 'MV'
}, {
  name: 'Jason Shannon',
  ws: 'Permian Analytics',
  queries: 6921,
  ai: 0.94,
  av: '#3c8321',
  initials: 'JS',
  you: true
}];
const MODULES_USAGE = [{
  name: 'PRISM — production',
  pct: 32,
  cost: 25600,
  color: '#3c8321'
}, {
  name: 'Foundations — wells',
  pct: 24,
  cost: 19200,
  color: '#1f648d'
}, {
  name: 'Panels — dashboards',
  pct: 18,
  cost: 14400,
  color: '#5b399e'
}, {
  name: 'Agent Studio',
  pct: 12,
  cost: 9600,
  color: '#c4622d'
}, {
  name: 'Power & Renewables',
  pct: 8,
  cost: 6400,
  color: '#0e7c66'
}, {
  name: 'Trading — market data',
  pct: 6,
  cost: 4800,
  color: '#9b1d4d'
}];
function OrgUsageSection({
  markDirty
}) {
  const [view, setView] = useAU('queries'); // queries | ai | cost | storage
  const [hover, setHover] = useAU(null);
  const series = USAGE_MONTHS.map(m => m[view]);
  const max = Math.max(...series);
  const last = USAGE_MONTHS[USAGE_MONTHS.length - 1];
  const prev = USAGE_MONTHS[USAGE_MONTHS.length - 2];
  const delta = (last[view] - prev[view]) / prev[view] * 100;
  const fmt = v => {
    if (view === 'queries') return v >= 1000 ? Math.round(v / 1000).toLocaleString() + 'k' : v.toLocaleString();
    if (view === 'ai') return v.toFixed(1) + 'M tok';
    if (view === 'cost') return '$' + v.toLocaleString();
    if (view === 'storage') return v.toFixed(1) + ' TB';
    return v;
  };
  const fmtLong = v => {
    if (view === 'queries') return v.toLocaleString() + ' queries';
    if (view === 'ai') return v.toFixed(1) + 'M AI tokens';
    if (view === 'cost') return '$' + v.toLocaleString();
    if (view === 'storage') return v.toFixed(1) + ' TB';
    return v;
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Org \xB7 05",
    title: "Usage & cost",
    sub: "Who's using what across Enverus, how usage is trending, and what it costs to run. Detailed invoicing lives next door in Billing & seats."
  }), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Active users \xB7 30d"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "947"), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, /*#__PURE__*/React.createElement("span", {
    className: "up"
  }, "\u25B2 4.2%"), " vs. prev 30d")), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Queries \xB7 30d"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "259k"), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, /*#__PURE__*/React.createElement("span", {
    className: "up"
  }, "\u25B2 4.9%"))), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "AI tokens \xB7 30d"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "33.8M"), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, /*#__PURE__*/React.createElement("span", {
    className: "up"
  }, "\u25B2 11.2%"))), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "YTD cost"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "$361.6k"), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "vs $612k Q2 budget"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Usage trend",
    s: `Last 12 months · ${fmtLong(last[view])} this month · ${delta >= 0 ? '▲' : '▼'} ${Math.abs(delta).toFixed(1)}% MoM`,
    actions: /*#__PURE__*/React.createElement("div", {
      className: "seg-row"
    }, /*#__PURE__*/React.createElement("button", {
      className: 'seg' + (view === 'queries' ? ' on' : ''),
      onClick: () => setView('queries')
    }, "Queries"), /*#__PURE__*/React.createElement("button", {
      className: 'seg' + (view === 'ai' ? ' on' : ''),
      onClick: () => setView('ai')
    }, "AI tokens"), /*#__PURE__*/React.createElement("button", {
      className: 'seg' + (view === 'storage' ? ' on' : ''),
      onClick: () => setView('storage')
    }, "Storage"), /*#__PURE__*/React.createElement("button", {
      className: 'seg' + (view === 'cost' ? ' on' : ''),
      onClick: () => setView('cost')
    }, "Cost"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content usage-chart"
  }, /*#__PURE__*/React.createElement("div", {
    className: "usage-yaxis"
  }, /*#__PURE__*/React.createElement("span", null, fmt(max)), /*#__PURE__*/React.createElement("span", null, fmt(max * 0.66)), /*#__PURE__*/React.createElement("span", null, fmt(max * 0.33)), /*#__PURE__*/React.createElement("span", null, "0")), /*#__PURE__*/React.createElement("div", {
    className: "usage-bars",
    onMouseLeave: () => setHover(null)
  }, /*#__PURE__*/React.createElement("div", {
    className: "usage-grid"
  }, /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null)), USAGE_MONTHS.map((m, i) => {
    const h = m[view] / max * 100;
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      className: 'usage-bar-col' + (hover === i ? ' hover' : ''),
      onMouseEnter: () => setHover(i)
    }, /*#__PURE__*/React.createElement("div", {
      className: "usage-bar",
      style: {
        height: h + '%'
      }
    }), /*#__PURE__*/React.createElement("div", {
      className: "usage-bar-lbl"
    }, m.m.slice(0, 3)), hover === i && /*#__PURE__*/React.createElement("div", {
      className: "usage-tip"
    }, /*#__PURE__*/React.createElement("div", {
      className: "usage-tip-m"
    }, m.m), /*#__PURE__*/React.createElement("div", {
      className: "usage-tip-v"
    }, fmtLong(m[view]))));
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "By module",
    s: "Where compute and storage are going. Cost figures are this month's run-rate.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external-link"
    }), "Per-flow breakdown")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content modules-bar"
  }, MODULES_USAGE.map(m => /*#__PURE__*/React.createElement("span", {
    key: m.name,
    className: "mb-seg",
    style: {
      width: m.pct + '%',
      background: m.color
    },
    title: `${m.name} · ${m.pct}%`
  }))), /*#__PURE__*/React.createElement("div", {
    className: "modules-legend"
  }, MODULES_USAGE.map(m => /*#__PURE__*/React.createElement("div", {
    key: m.name,
    className: "ml-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ml-sw",
    style: {
      background: m.color
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "ml-nm"
  }, m.name), /*#__PURE__*/React.createElement("span", {
    className: "ml-pct"
  }, m.pct, "%"), /*#__PURE__*/React.createElement("span", {
    className: "ml-cost"
  }, "$", m.cost.toLocaleString()))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Top users \xB7 last 30 days",
    s: "By query volume. Includes Ask ONE, dashboard refreshes, and scheduled flows.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download"
    }), "Export CSV")
  }), /*#__PURE__*/React.createElement("table", {
    className: "team-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "User"), /*#__PURE__*/React.createElement("th", null, "Workspace"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Queries"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "AI tokens"), /*#__PURE__*/React.createElement("th", {
    style: {
      textAlign: 'right'
    }
  }, "Share"))), /*#__PURE__*/React.createElement("tbody", null, TOP_USERS.map((u, i) => {
    const totalQ = TOP_USERS.reduce((s, x) => s + x.queries, 0);
    const pct = u.queries / totalQ * 100;
    return /*#__PURE__*/React.createElement("tr", {
      key: u.name
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "who"
    }, /*#__PURE__*/React.createElement("span", {
      className: "av",
      style: {
        background: u.av
      }
    }, u.initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "nm"
    }, u.name, " ", u.you && /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-muted)',
        fontWeight: 400,
        fontSize: 11.5
      }
    }, "\xB7 you")), /*#__PURE__*/React.createElement("div", {
      className: "em"
    }, "Rank #", i + 1)))), /*#__PURE__*/React.createElement("td", {
      style: {
        fontSize: 12.5
      }
    }, u.ws), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: 'right',
        fontFamily: 'var(--font-mono)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, u.queries.toLocaleString()), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: 'right',
        fontFamily: 'var(--font-mono)',
        fontVariantNumeric: 'tabular-nums'
      }
    }, u.ai.toFixed(2), "M"), /*#__PURE__*/React.createElement("td", {
      style: {
        width: 120
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "share-bar"
    }, /*#__PURE__*/React.createElement("div", {
      className: "share-bar-fill",
      style: {
        width: pct * 5 + '%'
      }
    }), /*#__PURE__*/React.createElement("span", {
      className: "share-pct"
    }, pct.toFixed(1), "%"))));
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Cost attribution & alerts",
    s: "How costs are split across workspaces, and when to ping a finance owner."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Chargeback model"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "By workspace \xB7 pro-rata by usage",
    options: ['By workspace · pro-rata by usage', 'By workspace · equal split', 'By cost center · GL coded', 'Centralized · no chargeback']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Finance owner"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Karen Ortiz",
    options: ['Karen Ortiz', 'Mike Donnelly', 'External · NetSuite']
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [{
    name: 'Monthly spend exceeds $80k',
    on: true,
    desc: 'Email Finance and Org Admins'
  }, {
    name: 'A single workspace > 50% of compute',
    on: true,
    desc: 'Email workspace owner with breakdown'
  }, {
    name: 'AI token usage > +30% MoM',
    on: true,
    desc: 'Email Org Admins with top 5 consumers'
  }, {
    name: 'Storage growth > 1 TB / week',
    on: false,
    desc: 'Email Org Admins'
  }, {
    name: 'Any user > 50k queries / 30d',
    on: false,
    desc: 'Email manager, suggest scheduling'
  }].map(a => /*#__PURE__*/React.createElement("div", {
    key: a.name,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 60px',
      gap: 12,
      alignItems: 'center',
      padding: '10px 14px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--background)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, a.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, a.desc)), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    className: "switch-input",
    checked: a.on,
    readOnly: true,
    "aria-label": a.name
  }))))));
}
Object.assign(window, {
  MyAccessSection,
  OrgUsageSection
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/settings-access-usage.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/settings-app.jsx
try { (() => {
// settings-app.jsx
// Root App with three customization scopes (User / Team / Organization)
// and role-aware access control.

const {
  useState: useAS,
  useEffect: useAE,
  useMemo: useAM
} = React;
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "themePicker": "cards",
  "notifLayout": "matrix",
  "density": "comfortable",
  "accent": "#3c8321",
  "settingsIA": "fullPage",
  "role": "team_admin"
} /*EDITMODE-END*/;
const USER = {
  initials: 'JS',
  name: 'Jason Shannon',
  email: 'jason.shannon@enverus.com'
};

// ----------------------------------------------------------------------------
// Sections by scope. Each section maps to a Component.
// ----------------------------------------------------------------------------
const SECTIONS_BY_SCOPE = {
  user: [{
    group: 'Account'
  }, {
    id: 'profile',
    icon: 'user',
    label: 'Profile & account',
    count: null
  }, {
    id: 'persona',
    icon: 'sparkles',
    label: 'Persona & instructions',
    count: null
  }, {
    id: 'skills',
    icon: 'puzzle',
    label: 'Skills library',
    count: '6 on'
  }, {
    id: 'memory',
    icon: 'brain',
    label: 'AI memory',
    count: '17'
  }, {
    id: 'notifs',
    icon: 'bell',
    label: 'Notifications',
    count: 14
  }, {
    id: 'scheduled',
    icon: 'calendar-clock',
    label: 'Scheduled',
    count: 8
  }, {
    group: 'Access'
  }, {
    id: 'my-access',
    icon: 'key-round',
    label: 'My access',
    count: '3 pending'
  }, {
    group: 'Defaults'
  }, {
    id: 'data',
    icon: 'database',
    label: 'Data preferences',
    count: null
  }, {
    id: 'appearance',
    icon: 'palette',
    label: 'Appearance',
    count: null
  }, {
    group: 'Resources'
  }, {
    id: 'whats-new',
    icon: 'sparkles',
    label: "What's new",
    count: null
  }, {
    id: 'docs',
    icon: 'book-open',
    label: 'Documentation',
    count: null
  }, {
    id: 'feedback',
    icon: 'message-square',
    label: 'Provide feedback',
    count: null
  }],
  team: [{
    group: 'Permian Analytics'
  }, {
    id: 'team-identity',
    icon: 'briefcase',
    label: 'Identity & sharing',
    count: null
  }, {
    id: 'team-members',
    icon: 'users',
    label: 'Members & roles',
    count: 6
  }, {
    id: 'team-defaults',
    icon: 'sliders',
    label: 'Defaults for new members',
    count: null
  }],
  org: [{
    group: 'Enverus'
  }, {
    id: 'org-workspaces',
    icon: 'building-2',
    label: 'Workspaces & teams',
    count: 6
  }, {
    id: 'org-sso',
    icon: 'shield-check',
    label: 'Identity & access',
    count: null
  }, {
    id: 'org-audit',
    icon: 'history',
    label: 'Audit log',
    count: '12h'
  }, {
    group: 'Billing & cost'
  }, {
    id: 'org-billing',
    icon: 'credit-card',
    label: 'Billing & seats',
    count: null
  }, {
    id: 'org-usage',
    icon: 'bar-chart-3',
    label: 'Usage & cost',
    count: null
  }, {
    group: 'Brand & library'
  }, {
    id: 'org-branding',
    icon: 'palette',
    label: 'Branding & resources',
    count: null
  }]
};
const DEFAULT_SECTION_BY_SCOPE = {
  user: 'profile',
  team: 'team-identity',
  org: 'org-workspaces'
};
function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const tweaks = {
    ...t,
    setTweak
  };
  const [collapsed, setCollapsed] = useAS(true);
  const [scope, setScope] = useAS('user');
  const [active, setActive] = useAS('profile');
  const [dirty, setDirty] = useAS(new Set());
  const [toast, setToast] = useAS({
    show: false,
    msg: ''
  });
  const [drawerOpen, setDrawerOpen] = useAS(false);
  const role = t.role || 'member';
  const access = getAccess(role, scope);
  const markDirty = (key = '__changed') => {
    if (access !== 'edit') return; // read-only / locked: don't surface a save bar
    setDirty(prev => {
      const next = new Set(prev);
      next.add(key);
      return next;
    });
  };

  // When scope changes, jump to that scope's default section
  useAE(() => {
    const sections = SECTIONS_BY_SCOPE[scope].filter(s => !s.group);
    if (!sections.some(s => s.id === active)) {
      setActive(DEFAULT_SECTION_BY_SCOPE[scope]);
    }
  }, [scope]);

  // When role changes, drop any unsaved changes for safety
  useAE(() => {
    setDirty(new Set());
  }, [role, scope]);

  // Theme application -----------------------------------------------------
  useAE(() => {
    const root = document.documentElement;
    const apply = mode => {
      const dark = mode === 'dark' || mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches;
      root.classList.toggle('dark-theme', dark);
      root.classList.toggle('dark', dark);
      document.body.classList.toggle('dark-theme', dark);
      document.body.classList.toggle('dark', dark);
    };
    apply(t.theme);
    if (t.theme === 'system') {
      const mq = window.matchMedia('(prefers-color-scheme: dark)');
      const cb = () => apply('system');
      mq.addEventListener('change', cb);
      return () => mq.removeEventListener('change', cb);
    }
  }, [t.theme]);

  // Density application ---------------------------------------------------
  useAE(() => {
    document.body.classList.toggle('compact', t.density === 'compact');
  }, [t.density]);

  // Accent application ----------------------------------------------------
  useAE(() => {
    const r = document.documentElement;
    if (t.accent && t.accent !== '#3c8321') {
      r.style.setProperty('--accent-brand', t.accent);
      r.style.setProperty('--accent-brand-dark', shade(t.accent, -0.18));
      r.style.setProperty('--accent-brand-light', shade(t.accent, 0.18));
    } else {
      r.style.removeProperty('--accent-brand');
      r.style.removeProperty('--accent-brand-dark');
      r.style.removeProperty('--accent-brand-light');
    }
  }, [t.accent]);

  // Repaint brand logo after each render (icons paint via Icon's own effect).
  useAE(() => {
    if (window.paintEnverusLogo) window.paintEnverusLogo();
  });
  const saveAll = () => {
    setDirty(new Set());
    setToast({
      show: true,
      msg: 'Changes saved'
    });
    setTimeout(() => setToast({
      show: false,
      msg: ''
    }), 2200);
  };
  const discardAll = () => {
    setDirty(new Set());
    setToast({
      show: true,
      msg: 'Changes discarded'
    });
    setTimeout(() => setToast({
      show: false,
      msg: ''
    }), 2200);
  };
  const renderSection = () => {
    switch (active) {
      // User scope
      case 'profile':
        return /*#__PURE__*/React.createElement(ProfileSection, {
          markDirty: markDirty
        });
      case 'persona':
        return /*#__PURE__*/React.createElement(PersonaSection, {
          markDirty: markDirty
        });
      case 'skills':
        return /*#__PURE__*/React.createElement(SkillsLibrarySection, {
          markDirty: markDirty
        });
      case 'memory':
        return /*#__PURE__*/React.createElement(MemorySection, {
          markDirty: markDirty
        });
      case 'notifs':
        return /*#__PURE__*/React.createElement(NotificationsSection, {
          tweaks: tweaks,
          markDirty: markDirty
        });
      case 'scheduled':
        return /*#__PURE__*/React.createElement(ScheduledSection, {
          markDirty: markDirty
        });
      case 'data':
        return /*#__PURE__*/React.createElement(DataPrefsSection, {
          markDirty: markDirty
        });
      case 'appearance':
        return /*#__PURE__*/React.createElement(AppearanceSection, {
          tweaks: tweaks,
          markDirty: markDirty
        });
      case 'my-access':
        return /*#__PURE__*/React.createElement(MyAccessSection, {
          markDirty: markDirty
        });
      case 'whats-new':
        return /*#__PURE__*/React.createElement(WhatsNewSection, {
          markDirty: markDirty
        });
      case 'docs':
        return /*#__PURE__*/React.createElement(DocsSection, {
          markDirty: markDirty
        });
      case 'feedback':
        return /*#__PURE__*/React.createElement(FeedbackSection, {
          markDirty: markDirty
        });
      // Team scope
      case 'team-identity':
        return /*#__PURE__*/React.createElement(TeamIdentitySection, {
          markDirty: markDirty
        });
      case 'team-members':
        return /*#__PURE__*/React.createElement(TeamMembersSection, {
          markDirty: markDirty
        });
      case 'team-defaults':
        return /*#__PURE__*/React.createElement(TeamDefaultsSection, {
          markDirty: markDirty
        });
      // Org scope
      case 'org-workspaces':
        return /*#__PURE__*/React.createElement(OrgWorkspacesSection, {
          markDirty: markDirty
        });
      case 'org-sso':
        return /*#__PURE__*/React.createElement(OrgSSOSection, {
          markDirty: markDirty
        });
      case 'org-audit':
        return /*#__PURE__*/React.createElement(OrgAuditSection, {
          markDirty: markDirty
        });
      case 'org-billing':
        return /*#__PURE__*/React.createElement(OrgBillingSection, {
          markDirty: markDirty
        });
      case 'org-usage':
        return /*#__PURE__*/React.createElement(OrgUsageSection, {
          markDirty: markDirty
        });
      case 'org-branding':
        return /*#__PURE__*/React.createElement(OrgBrandingSection, {
          markDirty: markDirty
        });
      default:
        return /*#__PURE__*/React.createElement(ProfileSection, {
          markDirty: markDirty
        });
    }
  };
  const sections = SECTIONS_BY_SCOPE[scope];
  const showQuickStrip = t.settingsIA === 'hybrid';
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      overflow: 'hidden',
      paddingTop: 56
    },
    "data-screen-label": "Settings"
  }, /*#__PURE__*/React.createElement(Header, {
    dark: t.theme === 'dark',
    onToggleTheme: () => setTweak('theme', t.theme === 'dark' ? 'light' : 'dark'),
    onSearch: () => {}
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flex: 1,
      minHeight: 0
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    view: "settings",
    setView: () => {},
    collapsed: collapsed,
    setCollapsed: setCollapsed
  }), /*#__PURE__*/React.createElement("main", {
    id: "main-content",
    "aria-label": "Settings",
    style: {
      flex: 1,
      position: 'relative',
      overflow: 'hidden',
      marginLeft: collapsed ? 56 : 280
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      overflowY: 'auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "settings"
  }, /*#__PURE__*/React.createElement(SettingsRail, {
    active: active,
    onPick: setActive,
    sections: sections,
    scopeLabel: SCOPES.find(s => s.id === scope).label,
    scopeSubtitle: SCOPES.find(s => s.id === scope).sub
  }), /*#__PURE__*/React.createElement("div", {
    className: "s-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-main-inner",
    "data-screen-label": `Settings · ${scope} · ${active}`
  }, /*#__PURE__*/React.createElement(ScopeSwitcher, {
    scope: scope,
    setScope: setScope,
    role: role
  }), showQuickStrip && access === 'edit' && /*#__PURE__*/React.createElement(QuickStrip, {
    tweaks: tweaks
  }), /*#__PURE__*/React.createElement(AccessBanner, {
    access: access,
    scope: scope,
    role: role
  }), access === 'locked' ? /*#__PURE__*/React.createElement(LockedScopeScreen, {
    scope: scope
  }) : /*#__PURE__*/React.createElement(LockedFieldset, {
    access: access
  }, renderSection())))))))), /*#__PURE__*/React.createElement(SaveBar, {
    show: dirty.size > 0 && access === 'edit',
    dirtyCount: dirty.size,
    onSave: saveAll,
    onDiscard: discardAll
  }), /*#__PURE__*/React.createElement(Toast, {
    show: toast.show,
    message: toast.msg
  }), /*#__PURE__*/React.createElement(AvatarDrawer, {
    open: drawerOpen,
    onClose: () => setDrawerOpen(false),
    user: USER,
    role: role,
    onJumpTo: id => {
      // jump to the scope that owns this section
      const target = Object.keys(SECTIONS_BY_SCOPE).find(sc => SECTIONS_BY_SCOPE[sc].some(x => x.id === id));
      if (target) setScope(target);
      setActive(id);
    }
  }), /*#__PURE__*/React.createElement(TweaksPanel, null, /*#__PURE__*/React.createElement(TweakSection, {
    label: "Role simulator"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Your role",
    value: t.role,
    options: [{
      value: 'member',
      label: 'Member'
    }, {
      value: 'team_admin',
      label: 'Team Admin'
    }, {
      value: 'org_admin',
      label: 'Org Admin'
    }],
    onChange: v => setTweak('role', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Scope"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Surface",
    value: scope,
    options: [{
      value: 'user',
      label: 'User'
    }, {
      value: 'team',
      label: 'Team'
    }, {
      value: 'org',
      label: 'Org'
    }],
    onChange: v => setScope(v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Theme"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Mode",
    value: t.theme,
    options: ['light', 'dark', 'system'],
    onChange: v => setTweak('theme', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Settings IA"
  }), /*#__PURE__*/React.createElement(TweakSelect, {
    label: "Surface",
    value: t.settingsIA,
    options: [{
      value: 'fullPage',
      label: 'Full page (default)'
    }, {
      value: 'hybrid',
      label: '+ Quick-stats strip'
    }],
    onChange: v => setTweak('settingsIA', v)
  }), /*#__PURE__*/React.createElement(TweakSection, {
    label: "Section variants"
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Theme picker",
    value: t.themePicker,
    options: ['cards', 'swatches'],
    onChange: v => setTweak('themePicker', v)
  }), /*#__PURE__*/React.createElement(TweakRadio, {
    label: "Notifications",
    value: t.notifLayout,
    options: ['matrix', 'cards'],
    onChange: v => setTweak('notifLayout', v)
  })));
}

// Inline quick-strip variant (the "hybrid" IA).
function QuickStrip({
  tweaks
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "quick-strip"
  }, /*#__PURE__*/React.createElement("span", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell"
  }), /*#__PURE__*/React.createElement("strong", null, "14"), " notifications"), /*#__PURE__*/React.createElement("span", {
    className: "qs-divider"
  }), /*#__PURE__*/React.createElement("span", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bookmark"
  }), /*#__PURE__*/React.createElement("strong", null, "23"), " saved views"), /*#__PURE__*/React.createElement("span", {
    className: "qs-divider"
  }), /*#__PURE__*/React.createElement("span", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users"
  }), /*#__PURE__*/React.createElement("strong", null, "6"), " teammates"), /*#__PURE__*/React.createElement("span", {
    className: "qs-divider"
  }), /*#__PURE__*/React.createElement("span", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "palette"
  }), "Theme \xB7 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      textTransform: 'capitalize'
    }
  }, tweaks.theme)), /*#__PURE__*/React.createElement("span", {
    className: "qs-divider"
  }), /*#__PURE__*/React.createElement("span", {
    className: "qs-item"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ruler"
  }), "Density \xB7 ", /*#__PURE__*/React.createElement("strong", {
    style: {
      textTransform: 'capitalize'
    }
  }, tweaks.density)), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external-link"
  }), "Open command palette")));
}

// Tiny color-shading helper.
function shade(hex, pct) {
  const m = hex.replace('#', '');
  const r = parseInt(m.slice(0, 2), 16);
  const g = parseInt(m.slice(2, 4), 16);
  const b = parseInt(m.slice(4, 6), 16);
  const adj = c => Math.max(0, Math.min(255, Math.round(c + (pct < 0 ? c * pct : (255 - c) * pct))));
  const to2 = n => n.toString(16).padStart(2, '0');
  return '#' + to2(adj(r)) + to2(adj(g)) + to2(adj(b));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/settings-app.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/settings-branding.jsx
try { (() => {
// settings-branding.jsx
// Org-scope: branding & shared resources — color templates, logos, and
// reusable skills/templates the org admin curates and pushes out to
// every workspace.

const {
  useState: useBS
} = React;

// ============================================================================
// Mock data
// ============================================================================
const COLOR_TEMPLATES = [{
  id: 'default',
  name: 'Enverus default',
  by: 'System',
  desc: 'The default Enverus ONE palette — brand greens with neutral surfaces and the datis chart palette.',
  mode: 'Both',
  swatches: ['#3c8321', '#1f648d', '#a04ec2', '#c4622d', '#0e7c66', '#9b1d4d', '#586f78'],
  workspaces: 6,
  isDefault: true,
  locked: true
}, {
  id: 'permian',
  name: 'Permian Analytics — corporate',
  by: 'Karen Ortiz',
  desc: 'Approved colors for client-facing exports out of the Permian Analytics workspace. Aligned with the 2026 brand refresh.',
  mode: 'Light',
  swatches: ['#0a3d2e', '#86a978', '#c8d7c0', '#2d4a36', '#e8eee5', '#1a1a1a', '#fafafa'],
  workspaces: 1
}, {
  id: 'investor',
  name: 'Investor briefings',
  by: 'Mike Donnelly',
  desc: 'Higher-contrast palette designed for printed leave-behinds and board decks. Optimized for AA on white paper.',
  mode: 'Light',
  swatches: ['#0d2840', '#2c6f9c', '#f2c349', '#bf3b2d', '#5f7a51', '#222', '#fff'],
  workspaces: 3
}, {
  id: 'colorblind',
  name: 'Colorblind-safe',
  by: 'Accessibility working group',
  desc: 'Categorical palette tuned for deuteranopia + protanopia. Used by default for any export tagged "external."',
  mode: 'Both',
  swatches: ['#0072b2', '#e69f00', '#009e73', '#cc79a7', '#56b4e9', '#d55e00', '#f0e442'],
  workspaces: 6,
  mandatory: true
}];
const LOGO_VARIANTS = [{
  id: 'wordmark-light',
  label: 'Wordmark — light',
  use: 'Default · light theme',
  updated: 'Jan 14, 2026',
  filetype: 'SVG',
  size: '4.2 KB'
}, {
  id: 'wordmark-dark',
  label: 'Wordmark — dark',
  use: 'Default · dark theme',
  updated: 'Jan 14, 2026',
  filetype: 'SVG',
  size: '4.1 KB'
}, {
  id: 'mark',
  label: 'Mark only',
  use: 'Favicon, social cards',
  updated: 'Feb 02, 2026',
  filetype: 'SVG',
  size: '2.1 KB'
}, {
  id: 'pdf-header',
  label: 'PDF header',
  use: 'Top-left of every exported PDF',
  updated: 'Mar 11, 2026',
  filetype: 'PNG',
  size: '18 KB'
}, {
  id: 'email-header',
  label: 'Email header',
  use: 'Top of daily digests & alert emails',
  updated: 'Mar 11, 2026',
  filetype: 'PNG',
  size: '22 KB'
}, {
  id: 'auth',
  label: 'Sign-in page',
  use: 'Center of the Okta-SAML sign-in screen',
  updated: 'Apr 28, 2026',
  filetype: 'SVG',
  size: '6.4 KB'
}];
const SHARED_SKILLS = [{
  id: 'screen',
  type: 'Flow',
  icon: 'crosshair',
  name: 'Acquisition screening · Tier-1 basins',
  desc: 'Pre-built flow with the org-approved filter set and ranking model.',
  updated: 'May 04, 2026',
  version: 'v3.2',
  uses: 142,
  mandatory: false
}, {
  id: 'brief',
  type: 'Flow',
  icon: 'sunrise',
  name: 'Morning market brief',
  desc: 'Outputs an email-ready brief with WTI, HH, basis differentials, and rig movement.',
  updated: 'May 11, 2026',
  version: 'v1.7',
  uses: 312,
  mandatory: true
}, {
  id: 'lease',
  type: 'Flow',
  icon: 'file-text',
  name: 'Lease expiration report · 90-day',
  desc: 'Pulls land-system data and ranks by NPV impact.',
  updated: 'Apr 18, 2026',
  version: 'v2.1',
  uses: 88,
  mandatory: false
}, {
  id: 'fin',
  type: 'Agent',
  icon: 'bot',
  name: 'Finance Analyst agent',
  desc: 'Speaks finance — DCF, IRR, multiples. Pre-loaded with the org\'s WACC and discount assumptions.',
  updated: 'May 02, 2026',
  version: 'v1.4',
  uses: 54,
  mandatory: false
}, {
  id: 'risk',
  type: 'Agent',
  icon: 'shield-alert',
  name: 'Risk Officer agent',
  desc: 'Reviews flow outputs for org-mandated risk disclosures and compliance language.',
  updated: 'Apr 30, 2026',
  version: 'v1.0',
  uses: 23,
  mandatory: true
}, {
  id: 'panel',
  type: 'Dashboard',
  icon: 'layout-grid',
  name: 'Executive snapshot dashboard',
  desc: 'Standardized executive-ready dashboard template with the brand palette baked in.',
  updated: 'Mar 22, 2026',
  version: 'v2.0',
  uses: 67,
  mandatory: false
}, {
  id: 'narr',
  type: 'Skill',
  icon: 'sparkles',
  name: 'Investor-tone narrator',
  desc: 'A response shaper that rewrites Ask ONE outputs in the org\'s approved investor voice.',
  updated: 'May 09, 2026',
  version: 'v0.9 (beta)',
  uses: 31,
  mandatory: false
}];
const SKILL_TYPES = [{
  id: 'all',
  label: 'All',
  icon: 'layers'
}, {
  id: 'Flow',
  label: 'Flows',
  icon: 'workflow'
}, {
  id: 'Agent',
  label: 'Agents',
  icon: 'bot'
}, {
  id: 'Dashboard',
  label: 'Dashboards',
  icon: 'layout-grid'
}, {
  id: 'Skill',
  label: 'Skills',
  icon: 'sparkles'
}];
const WORKSPACE_LIST = ['Permian Analytics', 'Bakken Strategy', 'Renewables Group', 'Midstream Operations', 'Power Trading Desk', 'Sandbox'];

// ============================================================================
// Section
// ============================================================================
function OrgBrandingSection({
  markDirty
}) {
  const [activePalette, setActivePalette] = useBS('default');
  const [previewPalette, setPreviewPalette] = useBS(null);
  const [skillFilter, setSkillFilter] = useBS('all');
  const visibleSkills = skillFilter === 'all' ? SHARED_SKILLS : SHARED_SKILLS.filter(s => s.type === skillFilter);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Org \xB7 06",
    title: "Branding & shared resources",
    sub: "Color templates, logos, and reusable skills that every workspace inherits. Upload once here, and it flows everywhere."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Color templates",
    s: "Palettes that brand exported PDFs, PowerPoints, dashboards, and AI-generated visuals. Workspaces can pick which template applies.",
    actions: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "upload"
    }), "Import from Adobe"), /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "New template"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content palette-list"
  }, COLOR_TEMPLATES.map(p => /*#__PURE__*/React.createElement("div", {
    key: p.id,
    className: 'palette-row' + (activePalette === p.id ? ' selected' : ''),
    onMouseEnter: () => setPreviewPalette(p.id),
    onMouseLeave: () => setPreviewPalette(null),
    onClick: () => {
      setActivePalette(p.id);
      markDirty();
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "palette-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "palette-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "palette-name"
  }, p.name, p.isDefault && /*#__PURE__*/React.createElement("span", {
    className: "pill pill--brand",
    style: {
      marginLeft: 8,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: 10
    }
  }, "Default"), p.mandatory && /*#__PURE__*/React.createElement("span", {
    className: "pill pill--info",
    style: {
      marginLeft: 8,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: 10
    }
  }, "Mandatory"), p.locked && /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    style: {
      marginLeft: 8,
      width: 13,
      height: 13,
      color: 'var(--text-muted)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "palette-by"
  }, "Curated by ", p.by, " \xB7 ", p.swatches.length, " colors \xB7 ", p.mode === 'Both' ? 'light + dark' : p.mode.toLowerCase() + ' mode', " \xB7 used in ", p.workspaces, " workspaces")), /*#__PURE__*/React.createElement("div", {
    className: "palette-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye"
  }), "Preview"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "copy"
  }), "Duplicate"), !p.locked && /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    style: {
      color: 'var(--danger-text)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash-2"
  }), "Delete"))), /*#__PURE__*/React.createElement("div", {
    className: "palette-swatches"
  }, p.swatches.map((c, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "palette-sw",
    style: {
      background: c
    },
    title: c
  }, /*#__PURE__*/React.createElement("code", null, c)))), /*#__PURE__*/React.createElement("div", {
    className: "palette-desc"
  }, p.desc), /*#__PURE__*/React.createElement("div", {
    className: "palette-config"
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Apply to PDF exports",
    defaultOn: p.id !== 'investor',
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Apply to PPT exports",
    defaultOn: p.id === 'investor' || p.id === 'default',
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Apply to in-product dashboards",
    defaultOn: p.id === 'default',
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Apply to AI-generated visuals",
    defaultOn: p.id === 'default' || p.id === 'colorblind',
    markDirty: markDirty
  })))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Style guide",
    s: "A single document that combines the active color templates, logos, type stack, and chart guidelines. Linked from every workspace's Help menu.",
    actions: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "upload"
    }), "Replace PDF"), /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external-link"
    }), "Open style guide"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content styleguide-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book-open"
  })), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, "Enverus ONE Style Guide \xB7 v2026.04"), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "Last updated by Karen Ortiz on Apr 28, 2026 \xB7 142 pages \xB7 6.2 MB PDF")), /*#__PURE__*/React.createElement("div", {
    className: "badges"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill pill--brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "Auto-distributed")))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Logos",
    s: "Brand marks used throughout the product, exports, sign-in, and outbound email.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "upload"
    }), "Upload")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content logos-grid"
  }, LOGO_VARIANTS.map(l => /*#__PURE__*/React.createElement("div", {
    key: l.id,
    className: 'logo-card logo-' + l.id
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-preview"
  }, /*#__PURE__*/React.createElement(LogoPreview, {
    kind: l.id
  })), /*#__PURE__*/React.createElement("div", {
    className: "logo-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-name"
  }, l.label), /*#__PURE__*/React.createElement("div", {
    className: "logo-use"
  }, l.use), /*#__PURE__*/React.createElement("div", {
    className: "logo-detail"
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill pill--mono",
    style: {
      fontSize: 10
    }
  }, l.filetype), /*#__PURE__*/React.createElement("span", null, l.size), /*#__PURE__*/React.createElement("span", null, "\xB7 ", l.updated))), /*#__PURE__*/React.createElement("div", {
    className: "logo-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    title: "Replace"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    title: "Download"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "download"
  }))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Shared skills & templates",
    s: "Reusable building blocks the org has curated. Workspaces inherit these \u2014 mandatory ones can't be deleted at the workspace level.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "upload"
    }), "Upload skill")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content skill-tabs"
  }, SKILL_TYPES.map(t => {
    const count = t.id === 'all' ? SHARED_SKILLS.length : SHARED_SKILLS.filter(s => s.type === t.id).length;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      className: 'skill-tab' + (skillFilter === t.id ? ' on' : ''),
      onClick: () => setSkillFilter(t.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: t.icon
    }), /*#__PURE__*/React.createElement("span", null, t.label), /*#__PURE__*/React.createElement("span", {
      className: "count"
    }, count));
  })), /*#__PURE__*/React.createElement("div", {
    className: "skill-list"
  }, visibleSkills.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    className: "skill-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: 'skill-ic skill-' + s.type.toLowerCase()
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "skill-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "skill-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "skill-name"
  }, s.name), /*#__PURE__*/React.createElement("span", {
    className: "pill pill--mono",
    style: {
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, s.type), s.mandatory && /*#__PURE__*/React.createElement("span", {
    className: "pill pill--info",
    style: {
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: 10
    }
  }, "Mandatory")), /*#__PURE__*/React.createElement("div", {
    className: "skill-desc"
  }, s.desc), /*#__PURE__*/React.createElement("div", {
    className: "skill-foot"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "git-branch"
  }), s.version), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "users"
  }), s.uses, " users"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), "Updated ", s.updated))), /*#__PURE__*/React.createElement("div", {
    className: "skill-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "eye"
  }), "Preview"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "git-pull-request"
  }), "New version"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal"
  }))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Distribution",
    s: "Which workspaces inherit which assets. Use this to roll out brand updates incrementally before pushing to everyone."
  }), /*#__PURE__*/React.createElement("table", {
    className: "dist-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Workspace"), /*#__PURE__*/React.createElement("th", null, "Color template"), /*#__PURE__*/React.createElement("th", null, "Logos"), /*#__PURE__*/React.createElement("th", null, "Skills"), /*#__PURE__*/React.createElement("th", null, "Style guide"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, WORKSPACE_LIST.map(ws => {
    const isPermian = ws === 'Permian Analytics';
    return /*#__PURE__*/React.createElement("tr", {
      key: ws
    }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "who"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dist-logo",
      style: {
        background: isPermian ? '#3c8321' : ws === 'Renewables Group' ? '#0e7c66' : ws === 'Bakken Strategy' ? '#1f648d' : '#586f78'
      }
    }, ws.split(' ').map(s => s[0]).slice(0, 2).join('')), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "nm"
    }, ws), isPermian && /*#__PURE__*/React.createElement("div", {
      className: "em"
    }, "Your workspace")))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
      className: "sel-wrap",
      style: {
        maxWidth: 200
      }
    }, /*#__PURE__*/React.createElement("select", {
      className: "sel",
      defaultValue: isPermian ? 'Permian Analytics — corporate' : 'Enverus default'
    }, /*#__PURE__*/React.createElement("option", null, "Enverus default"), /*#__PURE__*/React.createElement("option", null, "Permian Analytics \u2014 corporate"), /*#__PURE__*/React.createElement("option", null, "Investor briefings"), /*#__PURE__*/React.createElement("option", null, "Colorblind-safe")), /*#__PURE__*/React.createElement(Icon, {
      name: "chevron-down"
    }))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "pill pill--brand"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }), "Inherited")), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11.5,
        color: 'var(--text-body)'
      }
    }, SHARED_SKILLS.filter(s => s.mandatory).length, " required", /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--text-muted)'
      }
    }, " \xB7 ", SHARED_SKILLS.length - SHARED_SKILLS.filter(s => s.mandatory).length, " available"))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
      className: "pill pill--brand"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }), "v2026.04")), /*#__PURE__*/React.createElement("td", {
      style: {
        textAlign: 'right'
      }
    }, /*#__PURE__*/React.createElement("button", {
      className: "iconbtn",
      "aria-label": "More actions"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "more-horizontal"
    }))));
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 8
    }
  }, [{
    name: 'Auto-push branding updates to all workspaces',
    defaultOn: true,
    desc: 'Color, logo, and style-guide changes propagate within 1 hour.'
  }, {
    name: 'Allow workspaces to override colors',
    defaultOn: true,
    desc: 'Workspaces can swap in any non-mandatory template.'
  }, {
    name: 'Allow workspaces to add their own skills',
    defaultOn: true,
    desc: 'Workspaces can author additional skills not in the shared library.'
  }, {
    name: 'Require workspace owner approval for changes',
    defaultOn: false,
    desc: 'Send branding updates as a request rather than a force-push.'
  }].map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 60px',
      gap: 12,
      alignItems: 'center',
      padding: '10px 14px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--background)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, p.desc)), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    className: "switch-input",
    checked: p.defaultOn,
    readOnly: true,
    "aria-label": p.name
  }))))));
}

// Generates a synthesized logo preview for the assigned slot.
function LogoPreview({
  kind
}) {
  if (kind === 'wordmark-light' || kind === 'auth') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#fafafa',
        padding: '18px 24px',
        borderRadius: 8,
        color: '#0e0e0e',
        display: 'inline-flex',
        height: 48,
        alignItems: 'center'
      },
      "data-logo": "enverus-one",
      "aria-label": "Enverus One"
    });
  }
  if (kind === 'wordmark-dark') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#1b1b1b',
        padding: '18px 24px',
        borderRadius: 8,
        color: '#fff',
        display: 'inline-flex',
        height: 48,
        alignItems: 'center'
      },
      "data-logo": "enverus-one",
      "aria-label": "Enverus One"
    });
  }
  if (kind === 'mark') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: 'linear-gradient(135deg, #56bc2f, #3c8321)',
        width: 48,
        height: 48,
        borderRadius: 12,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontWeight: 700,
        fontSize: 22,
        letterSpacing: '-0.04em'
      }
    }, "E1");
  }
  if (kind === 'pdf-header') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#fafafa',
        color: '#0e0e0e',
        padding: 12,
        borderRadius: 6,
        border: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        alignItems: 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        height: 14,
        display: 'inline-flex'
      },
      "data-logo": "enverus-one",
      "aria-label": "Enverus One"
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 9,
        color: '#666',
        fontFamily: 'var(--font-mono)'
      }
    }, "PERMIAN ANALYTICS \xB7 Q1 2026 BRIEFING"));
  }
  if (kind === 'email-header') {
    return /*#__PURE__*/React.createElement("div", {
      style: {
        background: '#3c8321',
        color: '#fff',
        padding: '14px 16px',
        borderRadius: '6px 6px 0 0',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        width: 220,
        justifyContent: 'space-between'
      }
    }, /*#__PURE__*/React.createElement("span", {
      "data-logo": "enverus-one",
      style: {
        height: 14,
        display: 'inline-flex',
        color: '#fff'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontFamily: 'var(--font-mono)',
        opacity: 0.8
      }
    }, "DAILY DIGEST"));
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: 48,
      height: 48,
      background: 'var(--card)',
      borderRadius: 8
    }
  });
}
Object.assign(window, {
  OrgBrandingSection
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/settings-branding.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/settings-memory.jsx
try { (() => {
// settings-memory.jsx
// User-scope: AI memory & context — what ONE remembers about you across
// chats, flows, and sessions. Companion to Persona (which says HOW you
// want responses) — Memory says WHAT ONE knows about you.

const {
  useState: useMS
} = React;

// ============================================================================
// Mock memory catalog
// ============================================================================
const MEM_CATEGORIES = [{
  id: 'work',
  icon: 'briefcase',
  label: 'Work patterns',
  desc: 'How and when you tend to use Enverus ONE'
}, {
  id: 'prefs',
  icon: 'sparkles',
  label: 'Output preferences',
  desc: 'How you want answers formatted, what metrics you favor'
}, {
  id: 'assets',
  icon: 'crosshair',
  label: 'Assets & watchlists',
  desc: 'Operators, basins, wells, and plays you track'
}, {
  id: 'context',
  icon: 'message-circle',
  label: 'Recent context',
  desc: 'Threads carried between Ask ONE chats'
}, {
  id: 'expertise',
  icon: 'graduation-cap',
  label: 'Domain expertise',
  desc: 'What ONE has inferred about your background'
}, {
  id: 'relations',
  icon: 'users',
  label: 'People & teams',
  desc: 'Colleagues you collaborate with frequently'
}];
const MEMORIES = [
// Work patterns
{
  id: 1,
  cat: 'work',
  text: 'Runs the Acquisition screening flow every Monday morning, usually between 06:00–07:00 CT.',
  source: 'flow',
  sourceLabel: 'Scheduled run history',
  when: 'Inferred 2 weeks ago',
  confidence: 'high'
}, {
  id: 2,
  cat: 'work',
  text: 'Tends to review rig-count and price moves first thing in the morning before opening dashboards.',
  source: 'chat',
  sourceLabel: 'Ask ONE conversations',
  when: 'Inferred 4 days ago',
  confidence: 'medium'
}, {
  id: 3,
  cat: 'work',
  text: 'Exports investor leave-behinds the first Monday of every month for the Q1 client meeting.',
  source: 'manual',
  sourceLabel: 'You told ONE on Mar 4',
  when: 'Mar 4, 2026',
  confidence: 'high'
},
// Output preferences
{
  id: 4,
  cat: 'prefs',
  text: 'Prefers IP30 / IP90 over first-month metrics when comparing wells.',
  source: 'manual',
  sourceLabel: 'Persona custom instructions',
  when: 'You added it',
  confidence: 'locked'
}, {
  id: 5,
  cat: 'prefs',
  text: 'Wants midstream takeaway capacity factored into any acreage recommendation.',
  source: 'manual',
  sourceLabel: 'Persona custom instructions',
  when: 'You added it',
  confidence: 'locked'
}, {
  id: 6,
  cat: 'prefs',
  text: 'Asked ONE to default to MMcfe rather than BOE in gas-weighted basins.',
  source: 'manual',
  sourceLabel: 'Persona custom instructions',
  when: 'You added it',
  confidence: 'locked'
}, {
  id: 7,
  cat: 'prefs',
  text: 'Tends to reject responses longer than 200 words on screening questions.',
  source: 'feedback',
  sourceLabel: 'Thumbs feedback in Ask ONE',
  when: 'Inferred 1 week ago',
  confidence: 'medium'
},
// Assets & watchlists
{
  id: 8,
  cat: 'assets',
  text: 'Actively tracks Pioneer, Diamondback, Devon, and EOG in the Permian.',
  source: 'flow',
  sourceLabel: 'Saved screen criteria',
  when: 'Inferred 1 month ago',
  confidence: 'high'
}, {
  id: 9,
  cat: 'assets',
  text: 'Permian — Midland and Permian — Delaware are the primary basins of interest.',
  source: 'manual',
  sourceLabel: 'Data preferences',
  when: 'You set this',
  confidence: 'locked'
}, {
  id: 10,
  cat: 'assets',
  text: 'Has shown recent interest in Loving County completions activity.',
  source: 'chat',
  sourceLabel: 'Last 12 Ask ONE chats',
  when: 'Inferred yesterday',
  confidence: 'medium'
}, {
  id: 11,
  cat: 'assets',
  text: 'Watching Bakken — Reservation operators as a secondary focus.',
  source: 'flow',
  sourceLabel: 'Saved screen criteria',
  when: 'Inferred 2 weeks ago',
  confidence: 'medium'
},
// Recent context
{
  id: 12,
  cat: 'context',
  text: 'Mid-thread comparing Wolfcamp B vs. Wolfcamp A type curves on recent Pioneer wells.',
  source: 'chat',
  sourceLabel: 'Ask ONE · Today',
  when: '2 hours ago',
  confidence: 'medium',
  recent: true
}, {
  id: 13,
  cat: 'context',
  text: 'Investigating an unexpected GOR shift in three Loving County wells flagged last Friday.',
  source: 'chat',
  sourceLabel: 'Ask ONE · Last week',
  when: 'May 9, 2026',
  confidence: 'medium',
  recent: true
},
// Expertise
{
  id: 14,
  cat: 'expertise',
  text: 'Identifies as an Energy Analyst (selected in Persona).',
  source: 'manual',
  sourceLabel: 'Persona',
  when: 'You set this',
  confidence: 'locked'
}, {
  id: 15,
  cat: 'expertise',
  text: 'Familiar with reserves engineering vocabulary (EUR, type curves, decline analysis).',
  source: 'chat',
  sourceLabel: 'Inferred from chat usage',
  when: 'Inferred 3 weeks ago',
  confidence: 'medium'
},
// Relations
{
  id: 16,
  cat: 'relations',
  text: 'Frequently shares views with Maria Velez and David Park.',
  source: 'workspace',
  sourceLabel: 'Sharing patterns',
  when: 'Inferred over 60 days',
  confidence: 'medium'
}, {
  id: 17,
  cat: 'relations',
  text: 'Hands off completed acquisition screens to Mike Donnelly for review.',
  source: 'workspace',
  sourceLabel: 'Sharing patterns',
  when: 'Inferred 1 month ago',
  confidence: 'medium'
}];
const RECENT_ACTIVITY = [{
  ts: '2h ago',
  action: 'remembered',
  text: 'Comparing Wolfcamp B vs. A type curves on Pioneer wells'
}, {
  ts: '1d ago',
  action: 'remembered',
  text: 'Interest in Loving County completions activity'
}, {
  ts: '2d ago',
  action: 'updated',
  text: 'Updated watchlist: added EOG, removed Coterra'
}, {
  ts: '4d ago',
  action: 'remembered',
  text: 'Mornings are when you typically review rig-count moves'
}, {
  ts: '1w ago',
  action: 'forgot',
  text: 'Stale fact: "Working on Q4 2025 board deck" (auto-expired after 60 days)'
}, {
  ts: '2w ago',
  action: 'remembered',
  text: 'Pattern: runs Acquisition screening flow every Monday'
}];
const CONFIDENCE_LABEL = {
  high: {
    text: 'High',
    color: 'var(--accent-brand)'
  },
  medium: {
    text: 'Medium',
    color: 'var(--warning-text)'
  },
  low: {
    text: 'Low',
    color: 'var(--text-muted)'
  },
  locked: {
    text: 'Set by you',
    color: 'var(--info-text)'
  }
};

// ============================================================================
// Section
// ============================================================================
function MemorySection({
  markDirty
}) {
  const [memEnabled, setMemEnabled] = useMS(true);
  const [memories, setMemories] = useMS(MEMORIES);
  const [filter, setFilter] = useMS('all');
  const [query, setQuery] = useMS('');
  const [scope, setScope] = useMS('workspace'); // workspace | org | session
  const [showAddModal, setShowAddModal] = useMS(false);
  const [newMem, setNewMem] = useMS({
    cat: 'prefs',
    text: ''
  });
  const [blockList, setBlockList] = useMS(['Personal financial information', 'Specific deal terms from the Northstar acquisition']);
  const forget = id => {
    setMemories(prev => prev.filter(m => m.id !== id));
    markDirty();
  };
  const addMemory = () => {
    if (!newMem.text.trim()) return;
    setMemories(prev => [...prev, {
      id: Date.now(),
      cat: newMem.cat,
      text: newMem.text.trim(),
      source: 'manual',
      sourceLabel: 'You told ONE just now',
      when: 'Just now',
      confidence: 'locked'
    }]);
    setNewMem({
      cat: 'prefs',
      text: ''
    });
    setShowAddModal(false);
    markDirty();
  };
  const visible = memories.filter(m => (filter === 'all' || m.cat === filter) && (query === '' || m.text.toLowerCase().includes(query.toLowerCase())));
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "User \xB7 03",
    title: "AI memory",
    sub: "What Enverus ONE has learned about how you work. Memory powers continuity \u2014 ONE picks up where you left off without you re-explaining yourself."
  }), /*#__PURE__*/React.createElement(Card, {
    style: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
      padding: '16px 20px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-lg)',
      flexShrink: 0,
      background: 'var(--primary)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--primary-foreground)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "brain",
    size: 22,
    strokeWidth: 1.75
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 15,
      fontWeight: 600,
      color: 'var(--foreground)',
      marginBottom: 3
    }
  }, "Let ONE remember things about you"), /*#__PURE__*/React.createElement("div", {
    className: "mem-hero-s",
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      lineHeight: 1.5
    }
  }, memEnabled ? /*#__PURE__*/React.createElement(React.Fragment, null, "Currently remembering ", /*#__PURE__*/React.createElement("strong", null, memories.length), " facts. ONE uses these across chats, flows, and daily digests to skip the small-talk and get to the answer.") : /*#__PURE__*/React.createElement(React.Fragment, null, "Memory is off. ONE starts every conversation cold \u2014 no continuity, no learned preferences, no recent-context handoff."))), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    className: "switch-input",
    checked: memEnabled,
    onChange: () => {
      setMemEnabled(!memEnabled);
      markDirty();
    },
    "aria-label": "Enable memory",
    style: {
      transform: 'scale(1.4)',
      transformOrigin: 'right center',
      flexShrink: 0
    }
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Where memory applies",
    s: "Memory can be scoped tightly to one workspace, shared across all your workspaces, or used only for the current session."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content mem-scope-row"
  }, [{
    id: 'workspace',
    icon: 'briefcase',
    label: 'This workspace',
    sub: 'Memory is local to Permian Analytics. Other workspaces stay cold.'
  }, {
    id: 'org',
    icon: 'globe',
    label: 'All my workspaces',
    sub: 'Carries to Bakken Strategy, Renewables, anywhere else you go.'
  }, {
    id: 'session',
    icon: 'timer',
    label: 'Session only',
    sub: 'Forget everything when you sign out. Useful for shared / kiosk machines.'
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    type: "button",
    className: 'mem-scope-card' + (scope === o.id ? ' selected' : ''),
    onClick: () => {
      setScope(o.id);
      markDirty();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: o.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, o.label), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, o.sub)), /*#__PURE__*/React.createElement("span", {
    className: 'radio' + (scope === o.id ? ' on' : '')
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "What ONE is allowed to remember",
    s: "Toggle whole categories off if you don't want ONE inferring patterns in that area."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content mem-cat-grid"
  }, MEM_CATEGORIES.map(c => {
    const count = memories.filter(m => m.cat === c.id).length;
    return /*#__PURE__*/React.createElement("div", {
      key: c.id,
      className: "mem-cat-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: 'mem-cat-ic mem-cat-' + c.id
    }, /*#__PURE__*/React.createElement(Icon, {
      name: c.icon
    })), /*#__PURE__*/React.createElement("div", {
      className: "mem-cat-meta"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mem-cat-nm"
    }, c.label, " ", /*#__PURE__*/React.createElement("span", {
      className: "mem-cat-count"
    }, count)), /*#__PURE__*/React.createElement("div", {
      className: "mem-cat-desc"
    }, c.desc)), /*#__PURE__*/React.createElement("span", {
      className: "switch on"
    }));
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: `Remembered facts · ${visible.length}${visible.length !== memories.length ? ' of ' + memories.length : ''}`,
    s: "Review and curate what ONE knows. Locked entries come from your Persona or Data preferences \u2014 edit them at the source.",
    actions: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download"
    }), "Export"), /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm",
      onClick: () => setShowAddModal(true)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "Add memory"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content mem-toolbar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "docs-search",
    style: {
      flex: 1,
      padding: '8px 12px'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Search remembered facts\u2026",
    value: query,
    onChange: e => setQuery(e.target.value)
  })), /*#__PURE__*/React.createElement(TabsList, null, /*#__PURE__*/React.createElement(TabsTrigger, {
    value: "all",
    active: filter === 'all',
    onClick: () => setFilter('all')
  }, "All"), MEM_CATEGORIES.map(c => /*#__PURE__*/React.createElement(TabsTrigger, {
    key: c.id,
    value: c.id,
    active: filter === c.id,
    onClick: () => setFilter(c.id)
  }, c.label)))), /*#__PURE__*/React.createElement("div", {
    className: "mem-list"
  }, visible.length === 0 && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '40px 20px',
      textAlign: 'center',
      color: 'var(--text-muted)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search",
    style: {
      width: 24,
      height: 24,
      marginBottom: 8,
      color: 'var(--text-muted)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content",
    style: {
      fontSize: 13
    }
  }, "No memories match your search.")), visible.map(m => {
    const cat = MEM_CATEGORIES.find(c => c.id === m.cat);
    const conf = CONFIDENCE_LABEL[m.confidence];
    return /*#__PURE__*/React.createElement("div", {
      key: m.id,
      className: 'mem-row' + (m.recent ? ' mem-recent' : '')
    }, /*#__PURE__*/React.createElement("span", {
      className: 'mem-row-ic mem-cat-' + m.cat
    }, /*#__PURE__*/React.createElement(Icon, {
      name: cat?.icon || 'brain'
    })), /*#__PURE__*/React.createElement("div", {
      className: "mem-row-meta"
    }, /*#__PURE__*/React.createElement("div", {
      className: "mem-row-text"
    }, m.text), /*#__PURE__*/React.createElement("div", {
      className: "mem-row-foot"
    }, /*#__PURE__*/React.createElement("span", {
      className: "mem-tag"
    }, cat?.label), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
      name: "link"
    }), m.sourceLabel), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
      name: "clock"
    }), m.when), /*#__PURE__*/React.createElement("span", {
      className: "mem-conf",
      style: {
        color: conf.color
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: m.confidence === 'locked' ? 'lock' : 'circle-dot'
    }), conf.text), m.recent && /*#__PURE__*/React.createElement("span", {
      className: "mem-recent-tag"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "zap"
    }), "In current context"))), /*#__PURE__*/React.createElement("div", {
      className: "mem-row-actions"
    }, m.confidence === 'locked' ? /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      title: "Edit at source"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external-link"
    })) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      title: "Edit"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "edit-2"
    })), /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm",
      title: "Forget this",
      onClick: () => forget(m.id),
      style: {
        color: 'var(--danger-text)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "x"
    })))));
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Recent memory activity",
    s: "What ONE has learned, updated, or forgotten lately."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content docs-list"
  }, RECENT_ACTIVITY.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "docs-row",
    style: {
      gridTemplateColumns: '70px 18px 1fr 90px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, a.ts), /*#__PURE__*/React.createElement(Icon, {
    name: a.action === 'remembered' ? 'plus-circle' : a.action === 'updated' ? 'edit-2' : 'minus-circle'
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 12.5,
      color: 'var(--text-body)'
    }
  }, a.text), /*#__PURE__*/React.createElement("span", {
    className: 'mem-action mem-' + a.action
  }, a.action))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Topics ONE shouldn't remember",
    s: "Anything ONE encounters that matches these topics is processed in the moment but never persisted.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "Add topic")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content mem-block-list"
  }, blockList.map((t, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "mem-block-row"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-off"
  }), /*#__PURE__*/React.createElement("span", null, t), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    onClick: () => {
      setBlockList(b => b.filter((_, j) => j !== i));
      markDirty();
    },
    style: {
      color: 'var(--danger-text)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  }))))), /*#__PURE__*/React.createElement("span", {
    className: "lbl-sub",
    style: {
      marginTop: 4
    }
  }, "Examples: \"personal financial information,\" \"compensation discussions,\" \"confidential deal terms.\" ONE matches by topic, not exact string \u2014 wording variations are caught.")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Retention & cleanup",
    s: "How long memories stick around and how to wipe everything if you need to."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Auto-expire facts older than"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "90 days \xB7 refreshed on use",
    options: ['Never expire', '180 days · refreshed on use', '90 days · refreshed on use', '30 days · refreshed on use', '7 days · refreshed on use']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Recent context window"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Last 5 Ask ONE conversations",
    options: ['Just the current conversation', 'Last 3 Ask ONE conversations', 'Last 5 Ask ONE conversations', 'Last 10 Ask ONE conversations', 'Last 30 days of conversations']
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Show me when ONE saves a new memory (small toast in the corner)",
    defaultOn: true,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Surface remembered context at the top of every Ask ONE reply",
    defaultOn: false,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Auto-confirm before saving anything sensitive (anything ONE rates < 80% confidence)",
    defaultOn: true,
    markDirty: markDirty
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 8,
      padding: 14,
      border: '1px solid rgba(217,32,52,.3)',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(217,32,52,.04)',
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert-triangle",
    style: {
      width: 18,
      height: 18,
      color: 'var(--danger)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, "Forget everything"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, "Clear every memory ONE has learned about you. Locked memories (Persona, Data prefs) stay \u2014 edit those at their source.")), /*#__PURE__*/React.createElement(Button, {
    variant: "destructive",
    size: "sm",
    onClick: () => {
      setMemories(prev => prev.filter(m => m.confidence === 'locked'));
      markDirty();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trash-2"
  }), "Forget all"))), showAddModal && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "drawer-scrim open",
    onClick: () => setShowAddModal(false)
  }), /*#__PURE__*/React.createElement("div", {
    className: "req-modal",
    style: {
      width: 520
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "req-modal-head"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "brain"
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "req-modal-t"
  }, "Tell ONE something to remember"), /*#__PURE__*/React.createElement("div", {
    className: "req-modal-s"
  }, "A fact, preference, or work pattern ONE should keep in mind for future responses.")), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    onClick: () => setShowAddModal(false),
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "req-modal-body"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Category"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sel-wrap"
  }, /*#__PURE__*/React.createElement("select", {
    className: "sel",
    value: newMem.cat,
    onChange: e => setNewMem(s => ({
      ...s,
      cat: e.target.value
    }))
  }, MEM_CATEGORIES.map(c => /*#__PURE__*/React.createElement("option", {
    key: c.id,
    value: c.id
  }, c.label))), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down"
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "What should ONE remember?"
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "inp inst-area",
    rows: "4",
    placeholder: "e.g. I tend to compare Permian operators against EOG as a benchmark.",
    value: newMem.text,
    onChange: e => setNewMem(s => ({
      ...s,
      text: e.target.value
    }))
  }))), /*#__PURE__*/React.createElement("div", {
    className: "req-modal-foot"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setShowAddModal(false)
  }, "Cancel"), /*#__PURE__*/React.createElement(Button, {
    variant: "default",
    onClick: addMemory,
    disabled: !newMem.text.trim()
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Save memory")))));
}
Object.assign(window, {
  MemorySection
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/settings-memory.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/settings-org.jsx
try { (() => {
// settings-org.jsx
// Organization-scope sections — visible only to org admins (read for team
// admins, locked for members). Covers governance: workspaces overview, SSO/
// identity, audit log, billing & seats.

const {
  useState: useOS
} = React;

// -----------------------------------------------------------------------------
// Workspaces overview
// -----------------------------------------------------------------------------
const WORKSPACES = [{
  id: 'permian',
  label: 'Permian Analytics',
  slug: 'permian-analytics',
  members: 12,
  views: 147,
  flows: 8,
  active: true,
  color: '#3c8321'
}, {
  id: 'bakken',
  label: 'Bakken Strategy',
  slug: 'bakken-strategy',
  members: 8,
  views: 62,
  flows: 4,
  active: false,
  color: '#1f648d'
}, {
  id: 'renewables',
  label: 'Renewables Group',
  slug: 'renewables-group',
  members: 14,
  views: 91,
  flows: 12,
  active: false,
  color: '#0e7c66'
}, {
  id: 'midstream',
  label: 'Midstream Operations',
  slug: 'midstream-operations',
  members: 6,
  views: 38,
  flows: 3,
  active: false,
  color: '#5b399e'
}, {
  id: 'trading',
  label: 'Power Trading Desk',
  slug: 'power-trading-desk',
  members: 5,
  views: 24,
  flows: 2,
  active: false,
  color: '#c4622d'
}, {
  id: 'sandbox',
  label: 'Sandbox (internal)',
  slug: 'sandbox',
  members: 3,
  views: 9,
  flows: 0,
  active: false,
  color: '#9b1d4d',
  archived: true
}];
function OrgWorkspacesSection({
  markDirty,
  access
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Org \xB7 01",
    title: "Workspaces & teams",
    sub: "Every workspace running under the Enverus organization. Owners are responsible for their workspace's members and policies."
  }), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Workspaces"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, WORKSPACES.filter(w => !w.archived).length), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "+1 archived")), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Total members"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, WORKSPACES.reduce((s, w) => s + w.members, 0)), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Across all workspaces")), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Saved views"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, WORKSPACES.reduce((s, w) => s + w.views, 0)), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Org-wide")), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Workflows"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, WORKSPACES.reduce((s, w) => s + w.flows, 0)), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Active and scheduled"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "All workspaces",
    s: "Hover a card to see its admins; click to drill in. The archived workspace can be restored within 30 days of archival.",
    actions: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "filter"
    }), "Filter"), /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "New workspace"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content workspaces-grid"
  }, WORKSPACES.map(w => /*#__PURE__*/React.createElement(Card, {
    key: w.id,
    style: w.archived ? {
      opacity: 0.5
    } : {}
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, w.label, w.active && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--accent-brand)',
      fontWeight: 500,
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase',
      marginLeft: 6
    }
  }, "\xB7 yours")), /*#__PURE__*/React.createElement("div", {
    className: "card-description"
  }, "/", w.slug), /*#__PURE__*/React.createElement("div", {
    className: "card-action"
  }, w.archived ? /*#__PURE__*/React.createElement("span", {
    className: "pill",
    style: {
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: 10
    }
  }, "Archived") : /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    "aria-label": "More actions"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "card-content stats"
  }, /*#__PURE__*/React.createElement("span", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, w.members), "members"), /*#__PURE__*/React.createElement("span", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, w.views), "views"), /*#__PURE__*/React.createElement("span", {
    className: "stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, w.flows), "flows")))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Cross-workspace policies",
    s: "These rules apply to every workspace under Enverus."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [{
    name: 'Require MFA for all members',
    defaultOn: true,
    desc: 'No exceptions across any workspace.'
  }, {
    name: 'Block external sharing',
    defaultOn: false,
    desc: 'Override workspace-level external sharing settings.'
  }, {
    name: 'Restrict guest accounts',
    defaultOn: true,
    desc: 'External email domains require Org Admin approval.'
  }, {
    name: 'Domain allow-list enforced',
    defaultOn: true,
    desc: 'New members must sign in with an allow-listed domain.'
  }, {
    name: 'Session timeout (8h)',
    defaultOn: true,
    desc: 'All sessions expire after 8 hours of inactivity.'
  }].map(p => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 60px',
      gap: 12,
      alignItems: 'center',
      padding: '10px 14px',
      border: '1px solid var(--surface-border-elevated)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-base)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, p.desc)), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    className: "switch-input",
    checked: p.defaultOn,
    onChange: () => {
      setPolicies(ps => ps.map(x => x.id === p.id ? {
        ...x,
        defaultOn: !x.defaultOn
      } : x));
      markDirty();
    },
    "aria-label": p.label
  }))))));
}

// -----------------------------------------------------------------------------
// SSO & identity
// -----------------------------------------------------------------------------
function OrgSSOSection({
  markDirty
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Org \xB7 02",
    title: "Identity & access",
    sub: "Single sign-on providers, SCIM provisioning, and domain controls for the Enverus organization."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Identity providers",
    s: "The IDP your members use to sign in. The primary provider is the default; backups kick in only when the primary is unreachable.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "Add provider")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content sso-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, "Ok"), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, "Okta SAML 2.0 ", /*#__PURE__*/React.createElement("span", {
    className: "pill pill--brand",
    style: {
      marginLeft: 8,
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, "Primary")), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "enverus.okta.com \xB7 entity ID ", /*#__PURE__*/React.createElement("code", null, "https://sso.enverus.com/saml"))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "1,247 users"), /*#__PURE__*/React.createElement("span", {
    className: "pill pill--brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "Healthy"), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    "aria-label": "More actions"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sso-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic",
    style: {
      background: '#0078d4',
      color: '#fff'
    }
  }, "Ms"), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, "Microsoft Entra ID (Azure AD) ", /*#__PURE__*/React.createElement("span", {
    className: "pill",
    style: {
      marginLeft: 8,
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, "Backup")), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "enverus.onmicrosoft.com \xB7 OIDC")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "312 users"), /*#__PURE__*/React.createElement("span", {
    className: "pill pill--brand"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "Healthy"), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    "aria-label": "More actions"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "sso-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic",
    style: {
      background: '#000',
      color: '#fff'
    }
  }, "Gh"), /*#__PURE__*/React.createElement("div", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, "GitHub OAuth (engineering only) ", /*#__PURE__*/React.createElement("span", {
    className: "pill",
    style: {
      marginLeft: 8,
      fontSize: 10,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, "Scoped")), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, "enverus-ea organization \xB7 OAuth 2.0")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "48 users"), /*#__PURE__*/React.createElement("span", {
    className: "pill pill--warn"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), "Token expires 14d"), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    "aria-label": "More actions"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal"
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "SCIM provisioning",
    s: "Automatically create, update, and deactivate user accounts from your identity provider."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "SCIM endpoint"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp inp-mono",
    readOnly: true,
    defaultValue: "https://api.enverus.com/scim/v2"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Bearer token",
    sub: "Rotated automatically every 90 days."
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp inp-mono",
    type: "password",
    readOnly: true,
    defaultValue: "scim_prod_eFb2x7\u2026"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Auto-create users on first sign-in",
    defaultOn: true,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Auto-deactivate users removed from IDP",
    defaultOn: true,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Sync group \u2192 workspace memberships",
    defaultOn: true,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Sync attribute mapping nightly",
    defaultOn: false,
    markDirty: markDirty
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Domain allow-list",
    s: "Only email domains listed here can sign in or be invited.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "Add domain")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, [{
    d: 'enverus.com',
    type: 'Primary',
    users: 1247
  }, {
    d: 'enverus-ea.com',
    type: 'Internal',
    users: 89
  }, {
    d: 'partner-firm.com',
    type: 'Guest',
    users: 14
  }, {
    d: 'consulting-allies.com',
    type: 'Guest',
    users: 6
  }].map(d => /*#__PURE__*/React.createElement("div", {
    key: d.d,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 120px 100px 36px',
      gap: 12,
      alignItems: 'center',
      padding: '9px 14px',
      border: '1px solid var(--surface-border-elevated)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12.5,
      color: 'var(--text-body)'
    }
  }, "@", d.d), /*#__PURE__*/React.createElement("span", {
    className: 'pill ' + (d.type === 'Primary' ? 'pill--brand' : d.type === 'Guest' ? 'pill--warn' : ''),
    style: {
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: 10
    }
  }, d.type), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, d.users, " users"), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    "aria-label": "More actions"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal"
  })))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Session & device policy",
    s: "Limits applied to every authenticated session."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Session timeout"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "8 hours of inactivity",
    options: ['1 hour of inactivity', '4 hours of inactivity', '8 hours of inactivity', '24 hours of inactivity', 'Never (not recommended)']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Max sessions per user"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "4 concurrent",
    options: ['1 concurrent', '2 concurrent', '4 concurrent', 'Unlimited']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "MFA challenge frequency"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Daily (new device)",
    options: ['Every sign-in', 'Daily (new device)', 'Weekly', 'Monthly']
  })))));
}

// -----------------------------------------------------------------------------
// Audit log
// -----------------------------------------------------------------------------
const AUDIT_EVENTS = [{
  ts: '14:32:08',
  icon: 'shield-check',
  cls: 'act-ok',
  who: 'Karen Ortiz',
  what: 'enabled MFA enforcement org-wide',
  code: 'POLICY.MFA_REQUIRED=true',
  ip: '10.0.4.21'
}, {
  ts: '14:08:51',
  icon: 'user-plus',
  cls: 'act-info',
  who: 'Mike Donnelly',
  what: 'invited 3 users to',
  code: 'permian-analytics',
  ip: '10.0.4.18'
}, {
  ts: '13:52:14',
  icon: 'key',
  cls: 'act-info',
  who: 'Jason Shannon',
  what: 'rotated API token',
  code: 'ev1-cli',
  ip: '10.0.4.21'
}, {
  ts: '13:18:09',
  icon: 'alert-triangle',
  cls: 'act-warn',
  who: 'system',
  what: 'flagged unusual sign-in for',
  code: 'sarah.chen@enverus.com',
  ip: '73.45.12.8'
}, {
  ts: '12:47:32',
  icon: 'edit-2',
  cls: 'act-info',
  who: 'Maria Velez',
  what: 'changed workspace name',
  code: 'permian-analytics → Permian Analytics',
  ip: '10.0.4.19'
}, {
  ts: '11:31:55',
  icon: 'log-in',
  cls: 'act-ok',
  who: 'David Park',
  what: 'signed in via Okta SAML',
  code: 'session: 4h22m',
  ip: '10.0.4.27'
}, {
  ts: '10:18:42',
  icon: 'trash-2',
  cls: 'act-danger',
  who: 'Karen Ortiz',
  what: 'archived workspace',
  code: 'sandbox',
  ip: '10.0.4.21'
}, {
  ts: '09:54:11',
  icon: 'download',
  cls: 'act-info',
  who: 'Priya Anand',
  what: 'exported audit log',
  code: '2026-04-13 → 2026-05-13',
  ip: '10.0.4.22'
}, {
  ts: '09:08:33',
  icon: 'shield',
  cls: 'act-warn',
  who: 'system',
  what: 'denied SAML response, signature mismatch',
  code: 'enverus-okta',
  ip: '10.0.4.31'
}, {
  ts: '08:22:17',
  icon: 'log-out',
  cls: 'act-ok',
  who: 'Thomas Reilly',
  what: 'signed out all sessions',
  code: '5 sessions terminated',
  ip: '10.0.4.20'
}];
function OrgAuditSection({
  markDirty
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Org \xB7 03",
    title: "Audit log",
    sub: "Every privileged action across the org. Retained for 13 months, exportable to CSV / Splunk / Datadog."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Activity",
    s: "Showing the last 12 hours \xB7 1,247 events today",
    actions: /*#__PURE__*/React.createElement("div", {
      style: {
        display: 'flex',
        gap: 6
      }
    }, /*#__PURE__*/React.createElement("div", {
      className: "seg-row"
    }, /*#__PURE__*/React.createElement("button", {
      className: "seg on"
    }, "12h"), /*#__PURE__*/React.createElement("button", {
      className: "seg"
    }, "24h"), /*#__PURE__*/React.createElement("button", {
      className: "seg"
    }, "7d"), /*#__PURE__*/React.createElement("button", {
      className: "seg"
    }, "30d")), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "filter"
    }), "Filter"), /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "download"
    }), "Export"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content audit-log"
  }, /*#__PURE__*/React.createElement("div", {
    className: "audit-row head"
  }, /*#__PURE__*/React.createElement("span", null, "Time"), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null, "Event"), /*#__PURE__*/React.createElement("span", null, "Resource"), /*#__PURE__*/React.createElement("span", null, "Source IP")), AUDIT_EVENTS.map((e, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "audit-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ts"
  }, e.ts), /*#__PURE__*/React.createElement("span", {
    className: 'act ' + e.cls
  }, /*#__PURE__*/React.createElement(Icon, {
    name: e.icon
  })), /*#__PURE__*/React.createElement("span", {
    className: "who-line"
  }, /*#__PURE__*/React.createElement("span", {
    className: "who"
  }, /*#__PURE__*/React.createElement("strong", null, e.who)), ' ', /*#__PURE__*/React.createElement("span", {
    className: "what"
  }, e.what), ' ', /*#__PURE__*/React.createElement("code", null, e.code)), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, e.code), /*#__PURE__*/React.createElement("span", {
    className: "ip"
  }, e.ip))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Retention & exports",
    s: "Audit log retention and where the org auto-ships events for archival."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Retention window"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "13 months",
    options: ['3 months', '6 months', '13 months', '24 months']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Auto-export to"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Splunk \xB7 enverus-secops",
    options: ['Splunk · enverus-secops', 'Datadog', 'S3 bucket', 'Off']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Export frequency"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Hourly",
    options: ['Real-time', 'Hourly', 'Daily', 'Weekly']
  })))));
}

// -----------------------------------------------------------------------------
// Billing & seats
// -----------------------------------------------------------------------------
function OrgBillingSection({
  markDirty
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Org \xB7 04",
    title: "Billing & seats",
    sub: "Plan, seat usage, and the org's billing contact. Detailed invoicing lives in the customer portal."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Plan & seats",
    s: "Current plan, contract terms, and seat usage across the organization."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content billing-grid"
  }, /*#__PURE__*/React.createElement("div", {
    className: "billing-main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "head"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "plan-name"
  }, "Enterprise \xB7 annual"), /*#__PURE__*/React.createElement("div", {
    className: "plan-sub"
  }, "Renews ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, "Mar 14, 2027"), " \xB7 contract ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, "ENV-2024-1107"))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external-link"
  }), "Open customer portal")), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, "Seat usage"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--text-body)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 600
    }
  }, "1,247"), " ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)'
    }
  }, "+ 12 reserved / 1,500 paid"))), /*#__PURE__*/React.createElement("div", {
    className: "seat-bar"
  }, /*#__PURE__*/React.createElement("div", {
    className: "used",
    style: {
      width: `${1247 / 1500 * 100}%`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "reserved",
    style: {
      left: `${1247 / 1500 * 100}%`,
      width: `${12 / 1500 * 100}%`
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "seat-legend"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lg"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sw",
    style: {
      background: 'var(--accent-brand)'
    }
  }), "Active 1,247"), /*#__PURE__*/React.createElement("span", {
    className: "lg"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sw",
    style: {
      background: 'var(--warning)'
    }
  }), "Reserved 12"), /*#__PURE__*/React.createElement("span", {
    className: "lg"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sw",
    style: {
      background: 'var(--surface-border-elevated)'
    }
  }), "Available 241")))), /*#__PURE__*/React.createElement("div", {
    className: "billing-side"
  }, /*#__PURE__*/React.createElement("div", {
    className: "billing-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Annual contract"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "$2.4M"), /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, "$1,600 / seat / year (effective)")), /*#__PURE__*/React.createElement("div", {
    className: "billing-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Last invoice"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "$612,000"), /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, "Q1 2026 \xB7 paid Mar 24")), /*#__PURE__*/React.createElement("div", {
    className: "billing-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Next invoice"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "$612,000"), /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, "Q2 2026 \xB7 due Jun 14"))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Modules included",
    s: "Toggle on a module to enable it organization-wide. Cost adjustments take effect on the next billing cycle."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [{
    name: 'PRISM — production data',
    on: true,
    seats: '1,500'
  }, {
    name: 'Foundations — wells & permits',
    on: true,
    seats: '1,500'
  }, {
    name: 'Panels — dashboards & viz',
    on: true,
    seats: '1,500'
  }, {
    name: 'Power & Renewables analytics',
    on: true,
    seats: 'Add-on · 320'
  }, {
    name: 'Minerals — leases & royalties',
    on: false,
    seats: '—'
  }, {
    name: 'Trading — market data feeds',
    on: true,
    seats: 'Add-on · 48'
  }, {
    name: 'Agent Studio — AI workbench',
    on: true,
    seats: 'Beta · 200'
  }].map(m => /*#__PURE__*/React.createElement("div", {
    key: m.name,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 130px 60px',
      gap: 12,
      alignItems: 'center',
      padding: '10px 14px',
      border: '1px solid var(--surface-border-elevated)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, m.name), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, m.seats), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    className: "switch-input",
    checked: m.on,
    onChange: () => {
      setModules(ms => ms.map(x => x.id === m.id ? {
        ...x,
        on: !x.on
      } : x));
      markDirty();
    },
    "aria-label": m.name
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Billing contacts & invoicing",
    s: "Where invoices and renewal notifications are sent."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Primary billing contact"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    defaultValue: "Karen Ortiz \xB7 karen.ortiz@enverus.com"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Accounts payable email"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    defaultValue: "ap@enverus.com"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Purchase order required"
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Require PO before invoicing",
    defaultOn: true,
    markDirty: markDirty
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Invoice format"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "PDF + structured CSV",
    options: ['PDF only', 'PDF + structured CSV', 'EDI X12']
  })))));
}
Object.assign(window, {
  OrgWorkspacesSection,
  OrgSSOSection,
  OrgAuditSection,
  OrgBillingSection
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/settings-org.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/settings-persona.jsx
try { (() => {
// settings-persona.jsx
// "Persona & instructions" — user-scope section that captures how the
// person works and how AI surfaces (Ask ONE, Agent Studio, Flow outputs,
// daily digest copy) should shape their responses.
//
// Lives in the User scope as the second item, right after Profile.

const {
  useState: usePS,
  useMemo: usePM
} = React;

// -----------------------------------------------------------------------------
// Catalog
// -----------------------------------------------------------------------------
const PERSONAS = [{
  id: 'trader',
  label: 'Trader',
  icon: 'trending-up',
  desc: 'Real-time decisions, basis differentials, spot vs forward.'
}, {
  id: 'analyst',
  label: 'Energy analyst',
  icon: 'gauge',
  desc: 'Deep dives on producers, basins, type curves, decline.'
}, {
  id: 'operator',
  label: 'Operator',
  icon: 'drill',
  desc: 'Field activity, completions, well-by-well economics.'
}, {
  id: 'investor',
  label: 'Investor',
  icon: 'briefcase',
  desc: 'Asset packages, M&A screening, NAV, returns.'
}, {
  id: 'engineer',
  label: 'Reservoir engineer',
  icon: 'activity',
  desc: 'EUR, reserves, modeling, production diagnostics.'
}, {
  id: 'land',
  label: 'Land / minerals',
  icon: 'map',
  desc: 'Leases, royalties, mineral rights, expiry tracking.'
}, {
  id: 'midstream',
  label: 'Midstream',
  icon: 'pipette',
  desc: 'Pipeline capacity, throughput, midstream M&A.'
}, {
  id: 'renewables',
  label: 'Power & renewables',
  icon: 'zap',
  desc: 'Generation siting, ISO/RTO, PPAs, LCOE.'
}, {
  id: 'executive',
  label: 'Executive',
  icon: 'crown',
  desc: 'Top-line summaries, what changed, what to act on.'
}, {
  id: 'custom',
  label: 'Custom',
  icon: 'sparkles',
  desc: 'Define a role yourself.'
}];
const FOCUS_GROUPS = [{
  label: 'Upstream',
  items: ['Well economics', 'Type curves & decline', 'Reserves & EUR', 'Production forecasting', 'Completions activity', 'Drilling permits', 'Operator benchmarking']
}, {
  label: 'Midstream',
  items: ['Pipeline capacity', 'Gathering & processing', 'Throughput']
}, {
  label: 'Commercial',
  items: ['Price differentials', 'Spot vs forward', 'Refinery margins', 'LNG flows']
}, {
  label: 'Land & minerals',
  items: ['Lease tracking', 'Mineral rights', 'Royalty payments', 'Expirations']
}, {
  label: 'Power & renewables',
  items: ['Generation siting', 'PPAs', 'LCOE', 'Transmission & interconnect', 'ISO/RTO data']
}, {
  label: 'Capital & strategy',
  items: ['M&A screening', 'Asset packages', 'NAV / DCF', 'ESG & emissions', 'Methane intensity']
}];
const WORK_TYPES = [{
  id: 'morning-brief',
  label: 'Morning market briefings',
  icon: 'sunrise'
}, {
  id: 'monitoring',
  label: 'Daily monitoring',
  icon: 'eye'
}, {
  id: 'deep-dive',
  label: 'Deep-dive analytics',
  icon: 'microscope'
}, {
  id: 'forecast',
  label: 'Modeling & forecasting',
  icon: 'line-chart'
}, {
  id: 'screening',
  label: 'Investment / M&A screening',
  icon: 'crosshair'
}, {
  id: 'risk',
  label: 'Risk assessment',
  icon: 'shield-alert'
}, {
  id: 'regulatory',
  label: 'Regulatory & compliance',
  icon: 'gavel'
}, {
  id: 'field-ops',
  label: 'Field operations',
  icon: 'hard-hat'
}, {
  id: 'client-report',
  label: 'Client / board reporting',
  icon: 'file-text'
}];
const EXAMPLE_INSTRUCTIONS = ['Default to MMcfe rather than BOE for gas-weighted basins.', 'Always include midstream takeaway when scoring acreage.', 'Use IP30 / IP90 when comparing wells; never just first-month.', 'When prices are quoted, show WTI Cushing as the anchor benchmark.', 'Flag any well over 24 months without production reporting.'];
const APPLY_AREAS = [{
  id: 'ask',
  icon: 'sparkles',
  label: 'Ask ONE',
  desc: 'The command bar across the app'
}, {
  id: 'agents',
  icon: 'bot',
  label: 'Agent Studio',
  desc: 'Conversation history with your agents'
}, {
  id: 'flows',
  icon: 'workflow',
  label: 'Flow outputs',
  desc: 'Generated reports, summaries, briefings'
}, {
  id: 'digest',
  icon: 'newspaper',
  label: 'Daily digest',
  desc: 'Morning email and in-app summary'
}, {
  id: 'panels',
  icon: 'layout-grid',
  label: 'Dashboard panels',
  desc: 'AI-narrated insight tiles'
}];

// -----------------------------------------------------------------------------
// Section
// -----------------------------------------------------------------------------
function PersonaSection({
  markDirty
}) {
  const [persona, setPersona] = usePS('analyst');
  const [customLabel, setCustomLabel] = usePS('');
  const [focus, setFocus] = usePS(new Set(['Well economics', 'Operator benchmarking', 'M&A screening']));
  const [work, setWork] = usePS(new Set(['morning-brief', 'deep-dive', 'screening']));
  const [length, setLength] = usePS('standard'); // brief / standard / detailed
  const [tone, setTone] = usePS('professional'); // professional / direct / explanatory
  const [format, setFormat] = usePS(['bullets', 'tables', 'prose']); // ordered preference
  const [citations, setCitations] = usePS('always'); // always / ondemand / off
  const [unitsMental, setUnitsMental] = usePS('imperial');
  const [currency, setCurrency] = usePS('USD');
  const [spelling, setSpelling] = usePS('en-US');
  const [instructions, setInstructions] = usePS('Default to MMcfe rather than BOE for gas-weighted basins.\nWhen recommending acreage, always factor in midstream takeaway capacity.');
  const [apply, setApply] = usePS(new Set(['ask', 'agents', 'flows', 'digest']));
  const toggleSet = setter => val => {
    setter(s => {
      const next = new Set(s);
      if (next.has(val)) next.delete(val);else next.add(val);
      return next;
    });
    markDirty();
  };
  const personaMeta = PERSONAS.find(p => p.id === persona);
  const charsRemaining = 2000 - instructions.length;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "User \xB7 02",
    title: "Persona & instructions",
    sub: "Tell ONE how you work. These preferences shape AI responses across Ask ONE, Agent Studio, flow outputs, and daily digests \u2014 without affecting how data is displayed."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Your role",
    s: "Pick the persona that most closely matches how you approach Enverus ONE. This sets the default lens for AI responses.",
    actions: /*#__PURE__*/React.createElement("span", {
      className: "pill pill--brand card-action"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }), personaMeta?.label || 'Custom')
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content persona-grid"
  }, PERSONAS.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    type: "button",
    className: 'persona-card' + (persona === p.id ? ' selected' : ''),
    onClick: () => {
      setPersona(p.id);
      markDirty();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: p.icon
  })), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nm"
  }, p.label), /*#__PURE__*/React.createElement("span", {
    className: "ds"
  }, p.desc)), /*#__PURE__*/React.createElement("span", {
    className: 'radio' + (persona === p.id ? ' on' : '')
  })))), persona === 'custom' && /*#__PURE__*/React.createElement(Field, {
    label: "Custom persona name",
    sub: "A short label ONE can refer to (e.g. 'Crude trader, US gulf coast')."
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    placeholder: "What's your role?",
    value: customLabel,
    onChange: e => {
      setCustomLabel(e.target.value);
      markDirty();
    }
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Focus areas",
    s: "What you tend to think about. ONE will surface and rank these first in summaries, search, and digests.",
    actions: /*#__PURE__*/React.createElement("span", {
      className: "card-action",
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--text-muted)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase'
      }
    }, focus.size, " selected")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content focus-groups"
  }, FOCUS_GROUPS.map(g => /*#__PURE__*/React.createElement("div", {
    key: g.label,
    className: "focus-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "focus-group-h"
  }, g.label), /*#__PURE__*/React.createElement("div", {
    className: "focus-group-items"
  }, g.items.map(it => /*#__PURE__*/React.createElement("button", {
    key: it,
    type: "button",
    className: 'focus-chip' + (focus.has(it) ? ' on' : ''),
    onClick: () => toggleSet(setFocus)(it)
  }, focus.has(it) && /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), /*#__PURE__*/React.createElement("span", null, it)))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Types of work",
    s: "What you do on the platform week-to-week. Used to default suggested flows, agent teams, and dashboard layouts."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content work-grid"
  }, WORK_TYPES.map(w => /*#__PURE__*/React.createElement("button", {
    key: w.id,
    type: "button",
    className: 'work-pill' + (work.has(w.id) ? ' on' : ''),
    onClick: () => toggleSet(setWork)(w.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: w.icon
  })), /*#__PURE__*/React.createElement("span", null, w.label), /*#__PURE__*/React.createElement("span", {
    className: 'box' + (work.has(w.id) ? ' on' : '')
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Response style",
    s: "How ONE should write back to you. Tune the length, voice, and what formats it reaches for first."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Response length"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg-row",
    style: {
      width: 'fit-content'
    }
  }, [{
    id: 'brief',
    label: 'Brief',
    sub: '≤ 80 words'
  }, {
    id: 'standard',
    label: 'Standard',
    sub: '~200 words'
  }, {
    id: 'detailed',
    label: 'Detailed',
    sub: '≥ 400 words'
  }].map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    className: 'seg' + (length === o.id ? ' on' : ''),
    onClick: () => {
      setLength(o.id);
      markDirty();
    },
    title: o.sub
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    className: "lbl-sub",
    style: {
      marginTop: 6
    }
  }, length === 'brief' && 'Headline + 2-3 supporting numbers. Best for trading desks.', length === 'standard' && 'Headline + context + recommended next step. The default.', length === 'detailed' && 'Full analysis with sources and caveats. Best for client reports.')), /*#__PURE__*/React.createElement(Field, {
    label: "Tone"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg-row",
    style: {
      width: 'fit-content'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: 'seg' + (tone === 'professional' ? ' on' : ''),
    onClick: () => {
      setTone('professional');
      markDirty();
    }
  }, "Professional"), /*#__PURE__*/React.createElement("button", {
    className: 'seg' + (tone === 'direct' ? ' on' : ''),
    onClick: () => {
      setTone('direct');
      markDirty();
    }
  }, "Direct"), /*#__PURE__*/React.createElement("button", {
    className: 'seg' + (tone === 'explanatory' ? ' on' : ''),
    onClick: () => {
      setTone('explanatory');
      markDirty();
    }
  }, "Explanatory")))), /*#__PURE__*/React.createElement(Field, {
    label: "Preferred format",
    sub: "Drag to reorder. ONE reaches for the top format first when there's a choice."
  }, /*#__PURE__*/React.createElement("div", {
    className: "format-row"
  }, format.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: f,
    className: "format-pill"
  }, /*#__PURE__*/React.createElement("span", {
    className: "num"
  }, i + 1), /*#__PURE__*/React.createElement(Icon, {
    name: f === 'bullets' ? 'list' : f === 'tables' ? 'table' : f === 'prose' ? 'align-left' : f === 'charts' ? 'bar-chart-3' : 'file'
  }), /*#__PURE__*/React.createElement("span", null, f[0].toUpperCase() + f.slice(1)), /*#__PURE__*/React.createElement("button", {
    className: "up",
    disabled: i === 0,
    onClick: () => {
      const next = [...format];
      [next[i - 1], next[i]] = [next[i], next[i - 1]];
      setFormat(next);
      markDirty();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-up"
  })), /*#__PURE__*/React.createElement("button", {
    className: "up",
    disabled: i === format.length - 1,
    onClick: () => {
      const next = [...format];
      [next[i + 1], next[i]] = [next[i], next[i + 1]];
      setFormat(next);
      markDirty();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down"
  })))))), /*#__PURE__*/React.createElement(Field, {
    label: "Citations"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg-row",
    style: {
      width: 'fit-content'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: 'seg' + (citations === 'always' ? ' on' : ''),
    onClick: () => {
      setCitations('always');
      markDirty();
    }
  }, "Always cite"), /*#__PURE__*/React.createElement("button", {
    className: 'seg' + (citations === 'ondemand' ? ' on' : ''),
    onClick: () => {
      setCitations('ondemand');
      markDirty();
    }
  }, "On demand"), /*#__PURE__*/React.createElement("button", {
    className: 'seg' + (citations === 'off' ? ' on' : ''),
    onClick: () => {
      setCitations('off');
      markDirty();
    }
  }, "Off")))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "How you think in numbers",
    s: "Different from Data preferences (which controls display). This tells ONE which conventions to use when narrating analysis."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "I think in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg-row",
    style: {
      width: 'fit-content'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: 'seg' + (unitsMental === 'imperial' ? ' on' : ''),
    onClick: () => {
      setUnitsMental('imperial');
      markDirty();
    }
  }, "Imperial (bbl, ft, \xB0F)"), /*#__PURE__*/React.createElement("button", {
    className: 'seg' + (unitsMental === 'metric' ? ' on' : ''),
    onClick: () => {
      setUnitsMental('metric');
      markDirty();
    }
  }, "Metric (m\xB3, m, \xB0C)")), /*#__PURE__*/React.createElement("span", {
    className: "lbl-sub",
    style: {
      marginTop: 6
    }
  }, unitsMental === 'imperial' ? 'ONE will narrate volumes in barrels and depths in feet by default.' : 'ONE will narrate volumes in cubic meters and depths in meters by default.')), /*#__PURE__*/React.createElement(Field, {
    label: "Currency convention"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: currency === 'USD' ? 'USD ($) — US Dollar' : currency === 'CAD' ? 'CAD ($) — Canadian Dollar' : currency === 'EUR' ? 'EUR (€) — Euro' : 'GBP (£) — British Pound',
    onChange: e => {
      const v = e.target.value.split(' ')[0];
      setCurrency(v);
      markDirty();
    },
    options: ['USD ($) — US Dollar', 'CAD ($) — Canadian Dollar', 'EUR (€) — Euro', 'GBP (£) — British Pound']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Spelling & locale"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: spelling === 'en-US' ? 'American English (color, optimization)' : spelling === 'en-CA' ? 'Canadian English (colour, optimization)' : spelling === 'en-GB' ? 'British English (colour, optimisation)' : 'Australian English (colour, optimisation)',
    onChange: e => {
      const v = e.target.value.startsWith('American') ? 'en-US' : e.target.value.startsWith('Canadian') ? 'en-CA' : e.target.value.startsWith('British') ? 'en-GB' : 'en-AU';
      setSpelling(v);
      markDirty();
    },
    options: ['American English (color, optimization)', 'Canadian English (colour, optimization)', 'British English (colour, optimisation)', 'Australian English (colour, optimisation)']
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Custom instructions",
    s: "Anything ONE should remember about how you want responses shaped. One rule per line.",
    actions: /*#__PURE__*/React.createElement("span", {
      className: "card-action",
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: charsRemaining < 100 ? 'var(--warning-text)' : 'var(--text-muted)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase'
      }
    }, charsRemaining.toLocaleString(), " chars")
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Example rules",
    sub: "Click to add to your instructions."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 6
    }
  }, EXAMPLE_INSTRUCTIONS.map(ex => /*#__PURE__*/React.createElement("button", {
    key: ex,
    type: "button",
    className: "ex-pill",
    onClick: () => {
      setInstructions(prev => prev ? prev + '\n' + ex : ex);
      markDirty();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus"
  }), /*#__PURE__*/React.createElement("span", null, ex))))), /*#__PURE__*/React.createElement("textarea", {
    className: "inp inst-area",
    rows: "8",
    placeholder: "e.g. Default to MMcfe rather than BOE for gas-weighted basins.",
    value: instructions,
    onChange: e => {
      if (e.target.value.length <= 2000) {
        setInstructions(e.target.value);
        markDirty();
      }
    }
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Where this applies",
    s: "Choose which AI surfaces inherit your persona. Untoggled surfaces use Enverus defaults."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content apply-grid"
  }, APPLY_AREAS.map(a => /*#__PURE__*/React.createElement("button", {
    key: a.id,
    type: "button",
    className: 'apply-card' + (apply.has(a.id) ? ' on' : ''),
    onClick: () => toggleSet(setApply)(a.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: a.icon
  })), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nm"
  }, a.label), /*#__PURE__*/React.createElement("span", {
    className: "ds"
  }, a.desc)), /*#__PURE__*/React.createElement("span", {
    className: 'switch-visual' + (apply.has(a.id) ? ' on' : ''),
    "aria-hidden": "true"
  }))))), /*#__PURE__*/React.createElement(PersonaPreview, {
    persona: personaMeta,
    customLabel: customLabel,
    length: length,
    tone: tone,
    format: format,
    citations: citations,
    unitsMental: unitsMental,
    currency: currency,
    spelling: spelling,
    instructions: instructions,
    focus: focus
  }));
}

// -----------------------------------------------------------------------------
// Live preview — a synthesized "Ask ONE" response shaped by the persona.
// -----------------------------------------------------------------------------
function PersonaPreview({
  persona,
  customLabel,
  length,
  tone,
  format,
  citations,
  unitsMental,
  currency,
  spelling,
  instructions,
  focus
}) {
  // Compose a representative response from the current settings.
  const symbol = currency === 'USD' ? '$' : currency === 'CAD' ? 'C$' : currency === 'EUR' ? '€' : '£';
  const vol = unitsMental === 'imperial' ? '2,340 bbl/d' : '371.9 m³/d';
  const depth = unitsMental === 'imperial' ? '14,200 ft' : '4,328 m';
  const spell = (us, gb) => spelling === 'en-US' ? us : gb;
  const headline = `Permian — Midland rig count rose 4 WoW to 312; ${spell('color', 'colour')}-tagged operators added 3 of those.`;
  const subline = `WTI ${symbol}78.40 /bbl · HH ${symbol}3.18 /MMBtu.`;
  const bullets = [`Top three rig adds: Pioneer +2, Diamondback +1, Devon +1 — all targeting Wolfcamp B.`, `Loving County permits ${spell('organized', 'organised')} by operator show a ${spell('center', 'centre')}-of-basin shift.`, `Permian — Midland is ${spell('outperforming', 'outperforming')} Delaware on average ${vol} per new well; depths cluster around ${depth}.`, `Tracked operators with > 5 spuds: 7 of 12, +1 vs. last week.`];
  const detailed = [`Of the 4 new rigs, 3 are owned by tracked operators in your focus list (${[...focus].slice(0, 2).join(', ') || 'no focus areas yet'}).`, `Average ${unitsMental === 'imperial' ? 'IP30 of 1,420 BOE/d' : 'IP30 of 226 m³/d (BOE-equivalent)'} on completions reported since Apr 28.`, `Two operators in your watchlist (Pioneer, Diamondback) cleared their threshold for an alert; the alert was suppressed because you have quiet hours active.`];
  const usedBullets = format[0] === 'bullets';
  const usedTables = format[0] === 'tables';
  const usedProse = format[0] === 'prose';
  const renderBody = () => {
    if (length === 'brief') {
      return /*#__PURE__*/React.createElement("p", {
        className: "prv-line"
      }, headline, " ", subline);
    }
    if (usedTables && length !== 'brief') {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
        className: "prv-line"
      }, headline), /*#__PURE__*/React.createElement("table", {
        className: "prv-table"
      }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Operator"), /*#__PURE__*/React.createElement("th", null, "Rigs \u0394"), /*#__PURE__*/React.createElement("th", null, "Avg IP30"))), /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Pioneer"), /*#__PURE__*/React.createElement("td", null, "+2"), /*#__PURE__*/React.createElement("td", null, unitsMental === 'imperial' ? '1,540 BOE/d' : '245 m³/d')), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Diamondback"), /*#__PURE__*/React.createElement("td", null, "+1"), /*#__PURE__*/React.createElement("td", null, unitsMental === 'imperial' ? '1,410 BOE/d' : '224 m³/d')), /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", null, "Devon"), /*#__PURE__*/React.createElement("td", null, "+1"), /*#__PURE__*/React.createElement("td", null, unitsMental === 'imperial' ? '1,260 BOE/d' : '200 m³/d')))), length === 'detailed' && /*#__PURE__*/React.createElement("ul", {
        className: "prv-list"
      }, detailed.map((d, i) => /*#__PURE__*/React.createElement("li", {
        key: i
      }, d))));
    }
    if (usedProse) {
      const para = [headline, ...bullets.slice(0, length === 'standard' ? 2 : 4)].join(' ');
      return /*#__PURE__*/React.createElement("p", {
        className: "prv-line"
      }, para);
    }
    // bullets default
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", {
      className: "prv-line"
    }, /*#__PURE__*/React.createElement("strong", {
      style: {
        color: 'var(--text-body)',
        fontWeight: 500
      }
    }, headline), " ", subline), /*#__PURE__*/React.createElement("ul", {
      className: "prv-list"
    }, bullets.slice(0, length === 'standard' ? 3 : 4).map((b, i) => /*#__PURE__*/React.createElement("li", {
      key: i
    }, b)), length === 'detailed' && detailed.map((d, i) => /*#__PURE__*/React.createElement("li", {
      key: 'd' + i
    }, d))));
  };
  const recommend = tone === 'direct' ? 'Buy Pioneer; watch Diamondback.' : tone === 'explanatory' ? "Here's why this matters: Pioneer's rig adds are concentrated in Wolfcamp B, which has produced the basin's most consistent wells over the last 24 months." : "Recommended action: Open the Permian — Midland · Horizontal · Last 90d saved view to drill into Pioneer's recent completions.";
  return /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Live preview",
    s: `How Ask ONE would respond to "What changed in the Permian this week?" using your current persona.`,
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "ghost",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "refresh-cw"
    }), "Re-roll")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content prv-bubble-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prv-bubble prv-bubble-user"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prv-av prv-av-user"
  }, "JS"), /*#__PURE__*/React.createElement("div", {
    className: "prv-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prv-meta"
  }, "You \xB7 ", persona?.label || customLabel || 'Custom', " ", persona?.id !== 'custom' ? '' : `(${customLabel || 'unnamed'})`), /*#__PURE__*/React.createElement("p", {
    className: "prv-line"
  }, "What changed in the Permian this week?"))), /*#__PURE__*/React.createElement("div", {
    className: "prv-bubble prv-bubble-ai"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prv-av prv-av-ai"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles"
  })), /*#__PURE__*/React.createElement("div", {
    className: "prv-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "prv-meta"
  }, "Ask ONE \xB7 ", /*#__PURE__*/React.createElement("span", {
    className: "prv-tag"
  }, length === 'brief' ? 'BRIEF' : length === 'standard' ? 'STANDARD' : 'DETAILED'), /*#__PURE__*/React.createElement("span", {
    className: "prv-tag"
  }, (tone || '').toUpperCase()), /*#__PURE__*/React.createElement("span", {
    className: "prv-tag"
  }, format[0].toUpperCase())), renderBody(), /*#__PURE__*/React.createElement("p", {
    className: "prv-line prv-recommend"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-right"
  }), /*#__PURE__*/React.createElement("span", null, recommend)), citations !== 'off' && /*#__PURE__*/React.createElement("div", {
    className: "prv-cites"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "link"
  }), /*#__PURE__*/React.createElement("span", null, "Sources: ", /*#__PURE__*/React.createElement("code", null, "permian-rigs-2026w19"), " \xB7 ", /*#__PURE__*/React.createElement("code", null, "prism-prod-2026-04"), " \xB7 ", /*#__PURE__*/React.createElement("code", null, "wti-cme-front"))), instructions.trim() && /*#__PURE__*/React.createElement("div", {
    className: "prv-rule"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "info"
  }), /*#__PURE__*/React.createElement("span", null, "Applied your rule: ", /*#__PURE__*/React.createElement("em", null, "\u201C", instructions.split('\n')[0], "\u201D")))))));
}
Object.assign(window, {
  PersonaSection
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/settings-persona.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/settings-profile-simple.jsx
try { (() => {
// settings-profile-simple.jsx
// Simplified Profile section — overrides window.ProfileSection and disables
// the scope (User / Team / Org) switcher, for the "Profile" page variant.

const {
  useState: usePsS
} = React;
function ProfileSection({
  markDirty
}) {
  const [name, setName] = usePsS('Jason Shannon');
  const [title, setTitle] = usePsS('Lead Energy Analyst');
  const [altEmail, setAltEmail] = usePsS('jason.shannon@gmail.com');
  const [phone, setPhone] = usePsS('+1 512 555 0184');
  const [tz, setTz] = usePsS('America/Chicago — Central');
  const [locale, setLocale] = usePsS('English (United States)');
  const initials = name.split(' ').slice(0, 2).map(s => s[0]).join('').toUpperCase();
  const change = setter => e => {
    setter(e.target.value);
    markDirty();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "01 \xB7 You",
    title: "Profile",
    sub: "Your profile is shown to teammates across Enverus ONE."
  }), /*#__PURE__*/React.createElement("div", {
    className: "hero",
    style: {
      gridTemplateColumns: '1fr'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "h"
  }, "Signed in as"), /*#__PURE__*/React.createElement("span", {
    className: "t"
  }, name, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 400
    }
  }, " \xB7 ", title)), /*#__PURE__*/React.createElement("span", {
    className: "card-description"
  }, "Enverus \xB7 Permian Analytics \xB7 last sign-in", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, " 2 hours ago")))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Profile",
    s: "Visible to teammates in chats, shared views, and audit logs."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content profile-id"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar-big"
  }, initials, /*#__PURE__*/React.createElement("span", {
    className: "edit"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "profile-rows"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Full name"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    value: name,
    onChange: change(setName)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Job title"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    value: title,
    onChange: change(setTitle)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Alternate email",
    sub: "Email used for alerts and reports."
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    value: altEmail,
    onChange: change(setAltEmail)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Phone"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    value: phone,
    onChange: change(setPhone)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Time zone"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: tz,
    onChange: change(setTz),
    options: ['America/Chicago — Central', 'America/New_York — Eastern', 'America/Denver — Mountain', 'America/Los_Angeles — Pacific', 'America/Houston — Central', 'UTC']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Language"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: locale,
    onChange: change(setLocale),
    options: ['English (United States)', 'English (United Kingdom)', 'Español (México)', 'Français (Canada)']
  })))))));
}

// Suppress the User / Team / Organization scope switcher on this page.
function ScopeSwitcher() {
  return null;
}
Object.assign(window, {
  ProfileSection,
  ScopeSwitcher
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/settings-profile-simple.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/settings-resources.jsx
try { (() => {
// settings-resources.jsx
// User-scope resource tabs: What's new (release notes / feature spotlight)
// and Documentation (entry points + recently viewed docs).

const {
  useState: useRS
} = React;

// ============================================================================
// What's new
// ============================================================================
const RELEASES = [{
  version: '2026.4',
  date: 'May 9, 2026',
  tag: 'Current',
  headline: 'Persona-aware Ask ONE and a redesigned Settings surface',
  items: [{
    kind: 'feature',
    icon: 'sparkles',
    t: 'Persona & instructions',
    d: 'Tell ONE how you work — role, focus areas, response style, mental units, custom rules — and it shapes every AI surface to match. Live preview included.'
  }, {
    kind: 'feature',
    icon: 'key-round',
    t: 'Self-administered access requests',
    d: 'See exactly which capabilities you have, request elevated access with a reason and time bound, and track approvals in one place.'
  }, {
    kind: 'feature',
    icon: 'bar-chart-3',
    t: 'Org-wide usage & cost analytics',
    d: '12-month trend, by-module breakdown, top consumers, and configurable alerts when spend or AI token usage spikes.'
  }, {
    kind: 'improvement',
    icon: 'palette',
    t: 'Three-scope settings (User / Team / Org)',
    d: 'Every setting now lives in the right place, with role-aware access banners and locked empty-states for restricted scopes.'
  }]
}, {
  version: '2026.3',
  date: 'Apr 14, 2026',
  headline: 'Workflows on a schedule, refreshed map basemaps',
  items: [{
    kind: 'feature',
    icon: 'clock',
    t: 'Scheduled flows',
    d: 'Run any flow on a cron schedule. Outputs land in your daily digest or post to Slack / Teams.'
  }, {
    kind: 'feature',
    icon: 'map',
    t: 'Four new basemaps',
    d: 'Geological formation-tops, sectional grid, dark terrain, and a high-contrast monochrome option for printing.'
  }, {
    kind: 'improvement',
    icon: 'gauge',
    t: 'Faster well loads',
    d: 'Well-detail pages are 3.4× faster on initial load. Production charts hydrate progressively.'
  }]
}, {
  version: '2026.2',
  date: 'Mar 06, 2026',
  headline: 'Agent Studio general availability',
  items: [{
    kind: 'feature',
    icon: 'bot',
    t: 'Agent Studio · GA',
    d: 'Build agents that read your saved views, run flows on your behalf, and write back to dashboards. Teams of agents now stable.'
  }, {
    kind: 'feature',
    icon: 'users',
    t: 'Workspace switcher',
    d: 'Hop between Permian Analytics, Bakken Strategy, and any workspace you belong to without re-authenticating.'
  }, {
    kind: 'fix',
    icon: 'wrench',
    t: 'CSV export · special characters',
    d: 'API numbers and operator names with em-dashes no longer corrupt under Excel default encoding.'
  }]
}, {
  version: '2026.1',
  date: 'Jan 22, 2026',
  headline: 'New year, new dashboards',
  items: [{
    kind: 'feature',
    icon: 'layout-grid',
    t: 'Panels redesign',
    d: 'Drag-and-drop dashboard tiles with AI-narrated insights at the top of every panel.'
  }, {
    kind: 'improvement',
    icon: 'shield-check',
    t: 'MFA enforcement',
    d: 'Org admins can now require MFA across the entire organization in a single toggle.'
  }]
}];
const KIND_LABEL = {
  feature: 'NEW',
  improvement: 'IMPROVED',
  fix: 'FIXED'
};
const KIND_CLASS = {
  feature: 'kind-feature',
  improvement: 'kind-improvement',
  fix: 'kind-fix'
};
function WhatsNewSection({
  markDirty
}) {
  const [filter, setFilter] = useRS('all');
  const visible = item => filter === 'all' || item.kind === filter;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Resources \xB7 01",
    title: "What's new",
    sub: "Releases, features, and improvements across Enverus ONE. Subscribe to get the highlights in your daily digest."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    className: "rel-spotlight-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "rel-tag"
  }, "Latest \xB7 ", RELEASES[0].version), /*#__PURE__*/React.createElement("span", {
    className: "rel-date"
  }, RELEASES[0].date)), /*#__PURE__*/React.createElement("h2", {
    className: "rel-spotlight-h"
  }, RELEASES[0].headline), /*#__PURE__*/React.createElement("p", {
    className: "rel-spotlight-s"
  }, "Read the full changelog below, or jump into the new Persona & instructions section to start shaping AI responses to how you work."), /*#__PURE__*/React.createElement("div", {
    className: "rel-spotlight-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "default"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles"
  }), "Try Persona & instructions"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "video"
  }), "Watch the 3-min demo"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "rss"
  }), "Subscribe to release notes"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Changelog",
    s: "Every release going back four months. Older notes are in the documentation.",
    actions: /*#__PURE__*/React.createElement("div", {
      className: "seg-row"
    }, /*#__PURE__*/React.createElement("button", {
      className: 'seg' + (filter === 'all' ? ' on' : ''),
      onClick: () => setFilter('all')
    }, "All"), /*#__PURE__*/React.createElement("button", {
      className: 'seg' + (filter === 'feature' ? ' on' : ''),
      onClick: () => setFilter('feature')
    }, "New"), /*#__PURE__*/React.createElement("button", {
      className: 'seg' + (filter === 'improvement' ? ' on' : ''),
      onClick: () => setFilter('improvement')
    }, "Improved"), /*#__PURE__*/React.createElement("button", {
      className: 'seg' + (filter === 'fix' ? ' on' : ''),
      onClick: () => setFilter('fix')
    }, "Fixed"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content rel-list"
  }, RELEASES.map(r => {
    const items = r.items.filter(visible);
    if (items.length === 0) return null;
    return /*#__PURE__*/React.createElement("div", {
      key: r.version,
      className: "rel-block"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rel-header"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rel-rail"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rel-dot"
    }), /*#__PURE__*/React.createElement("span", {
      className: "rel-rail-line"
    })), /*#__PURE__*/React.createElement("div", {
      className: "rel-meta"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rel-v-row"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rel-v"
    }, "v", r.version), r.tag && /*#__PURE__*/React.createElement("span", {
      className: "pill pill--brand",
      style: {
        fontFamily: 'var(--font-mono)',
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        fontSize: 10
      }
    }, r.tag), /*#__PURE__*/React.createElement("span", {
      className: "rel-d"
    }, r.date)), /*#__PURE__*/React.createElement("div", {
      className: "rel-headline"
    }, r.headline))), /*#__PURE__*/React.createElement("div", {
      className: "rel-items"
    }, items.map((it, i) => /*#__PURE__*/React.createElement("div", {
      key: i,
      className: "rel-item"
    }, /*#__PURE__*/React.createElement("span", {
      className: "rel-item-ic"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: it.icon
    })), /*#__PURE__*/React.createElement("div", {
      className: "rel-item-body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "rel-item-top"
    }, /*#__PURE__*/React.createElement("span", {
      className: 'rel-kind ' + KIND_CLASS[it.kind]
    }, KIND_LABEL[it.kind]), /*#__PURE__*/React.createElement("span", {
      className: "rel-item-t"
    }, it.t)), /*#__PURE__*/React.createElement("div", {
      className: "rel-item-d"
    }, it.d))))));
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Subscribe",
    s: "Pick how you want to hear about what's new."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [{
    name: 'Daily digest',
    desc: 'Highlights bundled with your morning email',
    on: true
  }, {
    name: 'In-app notification',
    desc: 'A pill on the Settings tab when there\'s a new release',
    on: true
  }, {
    name: 'Email · release notes',
    desc: 'A dedicated email per release, more detail than the digest',
    on: false
  }, {
    name: 'RSS feed',
    desc: 'Subscribe at /releases.rss in any reader',
    on: false
  }].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.name,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 60px',
      gap: 12,
      alignItems: 'center',
      padding: '10px 14px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--background)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, s.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, s.desc)), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    className: "switch-input",
    checked: s.on,
    readOnly: true,
    "aria-label": s.name
  }))))));
}

// ============================================================================
// Documentation
// ============================================================================
const DOC_CATEGORIES = [{
  id: 'start',
  icon: 'play-circle',
  label: 'Getting started',
  desc: 'Setup, your first dashboard, your first flow',
  count: 14,
  accent: '#3c8321'
}, {
  id: 'flows',
  icon: 'workflow',
  label: 'Flows & workflows',
  desc: 'Building, scheduling, debugging energy workflows',
  count: 28,
  accent: '#1f648d'
}, {
  id: 'agents',
  icon: 'bot',
  label: 'Agent Studio',
  desc: 'Designing agents and agent teams',
  count: 22,
  accent: '#5b399e'
}, {
  id: 'data',
  icon: 'database',
  label: 'Data sources',
  desc: 'PRISM, Foundations, Panels, Trading, Power & Renewables',
  count: 41,
  accent: '#c4622d'
}, {
  id: 'api',
  icon: 'terminal',
  label: 'API reference',
  desc: 'REST + SDK reference for Python, R, JavaScript',
  count: 67,
  accent: '#9b1d4d'
}, {
  id: 'admin',
  icon: 'shield-check',
  label: 'Administration',
  desc: 'SSO, SCIM, roles, billing, audit',
  count: 19,
  accent: '#0e7c66'
}];
const POPULAR_ARTICLES = [{
  t: 'Building a well-screening flow in 15 minutes',
  cat: 'Flows',
  read: '7 min read',
  updated: 'Updated Apr 28'
}, {
  t: 'How Ask ONE picks data sources',
  cat: 'Agent Studio',
  read: '5 min read',
  updated: 'Updated May 02'
}, {
  t: 'Setting up SSO with Okta',
  cat: 'Administration',
  read: '12 min read',
  updated: 'Updated Mar 14'
}, {
  t: 'PRISM production data — schema reference',
  cat: 'Data sources',
  read: '18 min read',
  updated: 'Updated May 06'
}, {
  t: 'Exporting to PowerPoint and Excel',
  cat: 'Getting started',
  read: '4 min read',
  updated: 'Updated Apr 02'
}, {
  t: 'Webhooks: notifying Slack when a flow completes',
  cat: 'API reference',
  read: '9 min read',
  updated: 'Updated Apr 19'
}];
const RECENT_READS = [{
  t: 'Building a well-screening flow in 15 minutes',
  when: 'Yesterday',
  cat: 'Flows'
}, {
  t: 'How Ask ONE picks data sources',
  when: '2 days ago',
  cat: 'Agent Studio'
}, {
  t: 'Scheduling flows with cron expressions',
  when: '4 days ago',
  cat: 'Flows'
}, {
  t: 'PRISM — late-life decline curve fitting',
  when: '1 week ago',
  cat: 'Data sources'
}];
function DocsSection({
  markDirty
}) {
  const [query, setQuery] = useRS('');
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Resources \xB7 02",
    title: "Documentation",
    sub: "Guides, references, and recipes for getting more out of Enverus ONE."
  }), /*#__PURE__*/React.createElement("div", {
    className: "docs-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    placeholder: "Search documentation \u2014 try \u2018scheduled flows\u2019 or \u2018API tokens\u2019\u2026",
    value: query,
    onChange: e => setQuery(e.target.value)
  }), /*#__PURE__*/React.createElement("kbd", null, "\u2318K")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Browse by topic",
    s: "Pick a category to drill into the docs."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content docs-grid"
  }, DOC_CATEGORIES.map(c => /*#__PURE__*/React.createElement("button", {
    key: c.id,
    className: "docs-card",
    type: "button"
  }, /*#__PURE__*/React.createElement("span", {
    className: "docs-card-ic",
    style: {
      background: c.accent + '18',
      color: c.accent
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "docs-card-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "docs-card-h"
  }, c.label), /*#__PURE__*/React.createElement("div", {
    className: "docs-card-d"
  }, c.desc)), /*#__PURE__*/React.createElement("span", {
    className: "docs-card-count"
  }, c.count))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Popular this month",
    s: "What other Enverus ONE users are reading.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external-link"
    }), "Open docs site")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content docs-list"
  }, POPULAR_ARTICLES.map((a, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "docs-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "docs-row-num"
  }, (i + 1).toString().padStart(2, '0')), /*#__PURE__*/React.createElement(Icon, {
    name: "file-text"
  }), /*#__PURE__*/React.createElement("div", {
    className: "docs-row-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "docs-row-t"
  }, a.t), /*#__PURE__*/React.createElement("div", {
    className: "docs-row-sub"
  }, /*#__PURE__*/React.createElement("span", null, a.cat), /*#__PURE__*/React.createElement("span", {
    className: "docs-sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, a.read), /*#__PURE__*/React.createElement("span", {
    className: "docs-sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, a.updated))), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right"
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2",
    style: {
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Recently viewed",
    s: "Pick up where you left off."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content docs-list"
  }, RECENT_READS.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "docs-row docs-row--compact"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content docs-row-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "docs-row-t"
  }, r.t), /*#__PURE__*/React.createElement("div", {
    className: "docs-row-sub"
  }, /*#__PURE__*/React.createElement("span", null, r.cat), /*#__PURE__*/React.createElement("span", {
    className: "docs-sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, r.when))), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right"
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Quick links",
    s: "Things you'll need eventually."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content ql-list"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ql-row",
    href: "#"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "terminal"
  }), /*#__PURE__*/React.createElement("span", null, "API reference"), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right"
  })), /*#__PURE__*/React.createElement("a", {
    className: "ql-row",
    href: "#"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "video"
  }), /*#__PURE__*/React.createElement("span", null, "Video tutorials"), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right"
  })), /*#__PURE__*/React.createElement("a", {
    className: "ql-row",
    href: "#"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users"
  }), /*#__PURE__*/React.createElement("span", null, "Community forum"), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right"
  })), /*#__PURE__*/React.createElement("a", {
    className: "ql-row",
    href: "#"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "life-buoy"
  }), /*#__PURE__*/React.createElement("span", null, "Contact support"), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right"
  })), /*#__PURE__*/React.createElement("a", {
    className: "ql-row",
    href: "#"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-square"
  }), /*#__PURE__*/React.createElement("span", null, "Submit feedback"), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right"
  })), /*#__PURE__*/React.createElement("a", {
    className: "ql-row",
    href: "#"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "git-branch"
  }), /*#__PURE__*/React.createElement("span", null, "Public roadmap"), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right"
  }))))));
}
Object.assign(window, {
  WhatsNewSection,
  DocsSection,
  FeedbackSection
});

// ============================================================================
// Provide feedback
// ============================================================================
const FEEDBACK_TYPES = [{
  id: 'feature',
  icon: 'lightbulb',
  label: 'Feature request',
  desc: 'Something you wish ONE could do'
}, {
  id: 'bug',
  icon: 'bug',
  label: 'Bug report',
  desc: 'Something is broken or behaving unexpectedly'
}, {
  id: 'data',
  icon: 'database',
  label: 'Data question',
  desc: 'A specific data point looks wrong or stale'
}, {
  id: 'praise',
  icon: 'heart',
  label: 'Praise',
  desc: 'Something you love'
}, {
  id: 'other',
  icon: 'message-square',
  label: 'Something else',
  desc: 'Anything that doesn\'t fit above'
}];
const RECENT_FEEDBACK = [{
  ts: 'Apr 22, 2026',
  type: 'feature',
  t: 'Pin frequently-used filters to the top of every module',
  status: 'shipped',
  notes: 'Available in v2026.4 — see "Pin top 5 filters" in Saved views.'
}, {
  ts: 'Apr 04, 2026',
  type: 'bug',
  t: 'CSV export of well list breaks with em-dashes in operator names',
  status: 'shipped',
  notes: 'Fixed in v2026.2.'
}, {
  ts: 'Mar 18, 2026',
  type: 'feature',
  t: 'Allow chart palette to be overridden per dashboard',
  status: 'in-review',
  notes: 'Under consideration for v2026.5.'
}, {
  ts: 'Feb 02, 2026',
  type: 'data',
  t: 'GOR for Pioneer wells in Loving County appears 30% high',
  status: 'resolved',
  notes: 'Data correction applied 2026-02-09.'
}];
const STATUS_PILL = {
  'in-review': {
    cls: 'pill--warn',
    label: 'IN REVIEW'
  },
  'planned': {
    cls: 'pill--info',
    label: 'PLANNED'
  },
  'shipped': {
    cls: 'pill--brand',
    label: 'SHIPPED'
  },
  'resolved': {
    cls: 'pill--brand',
    label: 'RESOLVED'
  }
};
function FeedbackSection({
  markDirty
}) {
  const [fbType, setFbType] = useRS('feature');
  const [subject, setSubject] = useRS('');
  const [details, setDetails] = useRS('');
  const [contact, setContact] = useRS(true);
  const [attach, setAttach] = useRS(true);
  const [sent, setSent] = useRS(false);
  const submit = () => {
    setSent(true);
    setSubject('');
    setDetails('');
    setTimeout(() => setSent(false), 3200);
    markDirty();
  };
  const charCount = details.length;
  const remaining = 1500 - charCount;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Resources \xB7 03",
    title: "Provide feedback",
    sub: "Tell us what would make Enverus ONE more useful for the work you actually do. Product reads every submission."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "What kind of feedback?",
    s: "Pick the category that fits best \u2014 it routes to the right team."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content fb-types"
  }, FEEDBACK_TYPES.map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    type: "button",
    className: 'fb-type' + (fbType === f.id ? ' selected' : ''),
    onClick: () => {
      setFbType(f.id);
      markDirty();
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: f.icon
  })), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nm"
  }, f.label), /*#__PURE__*/React.createElement("span", {
    className: "ds"
  }, f.desc)), /*#__PURE__*/React.createElement("span", {
    className: 'radio' + (fbType === f.id ? ' on' : '')
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Tell us more",
    s: fbType === 'bug' ? "Steps to reproduce help us fix things faster." : "The more specific, the better — what would success look like?",
    actions: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: remaining < 100 ? 'var(--warning-text)' : 'var(--text-muted)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase'
      }
    }, remaining.toLocaleString(), " chars")
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Subject",
    sub: "A one-line summary."
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    placeholder: fbType === 'bug' ? 'e.g. CSV export fails when API number has a dash' : fbType === 'feature' ? 'e.g. Per-dashboard chart palette overrides' : 'A short headline for your feedback',
    value: subject,
    onChange: e => {
      setSubject(e.target.value);
      markDirty();
    }
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Details",
    sub: fbType === 'bug' ? 'Include steps to reproduce, expected vs. actual behavior, and any error messages.' : 'Walk us through the use case, who it helps, and how often it comes up.'
  }, /*#__PURE__*/React.createElement("textarea", {
    className: "inp inst-area",
    rows: "8",
    maxLength: "1500",
    placeholder: fbType === 'bug' ? "1. Open the Wells module\n2. Filter to Loving County\n3. Click Export → CSV\n4. CSV opens with shifted columns…" : "When I'm screening acquisition candidates, I tend to...",
    value: details,
    onChange: e => {
      setDetails(e.target.value);
      markDirty();
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Affected area (optional)"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Pick a module",
    options: ['Pick a module', 'Wells / Production', 'Saved views', 'Agent Studio', 'Flows', 'Dashboards', 'Settings', 'Search / Ask ONE', 'API / SDK', 'Other']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Severity (bug reports only)"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: fbType === 'bug' ? 'Minor — workaround exists' : '—',
    options: ['Critical — blocks my work', 'Major — significant impact', 'Minor — workaround exists', 'Cosmetic — visual issue', '—']
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Attach a screenshot of my current view",
    defaultOn: attach,
    onChange: () => setAttach(a => !a),
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "OK for the product team to contact me about this",
    defaultOn: contact,
    onChange: () => setContact(c => !c),
    markDirty: markDirty
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: 4,
      paddingTop: 12,
      borderTop: '1px solid var(--border)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, "Submissions are reviewed within 3 business days. We can't always reply, but we always read."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost"
  }, "Save draft"), /*#__PURE__*/React.createElement(Button, {
    variant: "default",
    onClick: submit,
    disabled: !subject || !details
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "send"
  }), "Send feedback"))), sent && /*#__PURE__*/React.createElement("div", {
    className: "acc-banner acc-read",
    style: {
      background: 'rgba(86,188,47,.08)',
      borderColor: 'rgba(86,188,47,.4)',
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "ico",
    style: {
      background: 'rgba(86,188,47,.18)',
      color: 'var(--accent-brand)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle-2"
  })), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, "Thanks \u2014 feedback received"), /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, "We routed it to the right team. You'll see it appear in your history below within a few minutes.")))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Your feedback history",
    s: "Everything you've sent us, with the latest status."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content docs-list"
  }, RECENT_FEEDBACK.map((f, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "docs-row",
    style: {
      gridTemplateColumns: '90px 18px 1fr auto 16px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, f.ts), /*#__PURE__*/React.createElement(Icon, {
    name: FEEDBACK_TYPES.find(t => t.id === f.type)?.icon || 'message-square'
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content docs-row-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "docs-row-t"
  }, f.t), /*#__PURE__*/React.createElement("div", {
    className: "docs-row-sub"
  }, /*#__PURE__*/React.createElement("span", null, FEEDBACK_TYPES.find(t => t.id === f.type)?.label), /*#__PURE__*/React.createElement("span", {
    className: "docs-sep"
  }, "\xB7"), /*#__PURE__*/React.createElement("span", null, f.notes))), /*#__PURE__*/React.createElement("span", {
    className: 'pill ' + STATUS_PILL[f.status].cls,
    style: {
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: 10,
      whiteSpace: 'nowrap'
    }
  }, STATUS_PILL[f.status].label), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right"
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Other places to be heard",
    s: "When a private form isn't the right channel."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement("a", {
    className: "ql-row",
    href: "#"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users"
  }), /*#__PURE__*/React.createElement("span", null, "Community forum \u2014 vote and comment on requests"), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right"
  })), /*#__PURE__*/React.createElement("a", {
    className: "ql-row",
    href: "#"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "git-branch"
  }), /*#__PURE__*/React.createElement("span", null, "Public roadmap \u2014 what's coming next"), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right"
  })), /*#__PURE__*/React.createElement("a", {
    className: "ql-row",
    href: "#"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "life-buoy"
  }), /*#__PURE__*/React.createElement("span", null, "Contact support \u2014 for account-blocking issues"), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right"
  })), /*#__PURE__*/React.createElement("a", {
    className: "ql-row",
    href: "#"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "video"
  }), /*#__PURE__*/React.createElement("span", null, "Book 30 min with the product team"), /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-up-right"
  })))));
}
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/settings-resources.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/settings-scheduled.jsx
try { (() => {
// settings-scheduled.jsx
// User-scope: Scheduled — every recurring artifact the user has set up
// (flows, runs, briefings, podcasts, chat questions, exports). Sits in the
// rail right under Notifications since it's the proactive counterpart:
// notifications tell you when things happen; schedules MAKE them happen.

const {
  useState: useSchS
} = React;

// ============================================================================
// Mock catalog
// ============================================================================
const SCHED_TYPES = [{
  id: 'all',
  label: 'All',
  icon: 'layers'
}, {
  id: 'flow',
  label: 'Flows',
  icon: 'workflow'
}, {
  id: 'briefing',
  label: 'Briefings',
  icon: 'sunrise'
}, {
  id: 'podcast',
  label: 'Podcasts',
  icon: 'mic'
}, {
  id: 'chat',
  label: 'Chat',
  icon: 'message-circle'
}, {
  id: 'report',
  label: 'Reports',
  icon: 'file-text'
}, {
  id: 'dashboard',
  label: 'Dashboards',
  icon: 'layout-grid'
}];
const SCHEDULES = [{
  id: 1,
  type: 'flow',
  name: 'Acquisition screening · Tier-1 basins',
  desc: 'Runs the saved screen against latest permit/production data.',
  cadence: 'Every Monday at 06:00 CT',
  cron: '0 6 * * 1',
  nextRun: 'Mon May 19 · 06:00',
  nextOffsetH: 28,
  lastRun: 'Mon May 12',
  lastStatus: 'success',
  deliver: ['Workspace', 'Email'],
  status: 'active',
  runsThisMo: 4,
  avgDuration: '2m 14s',
  icon: 'crosshair'
}, {
  id: 2,
  type: 'briefing',
  name: 'Morning market brief',
  desc: 'Ask ONE narrates yesterday\'s rig and price movement.',
  cadence: 'Weekdays at 07:00 CT',
  cron: '0 7 * * 1-5',
  nextRun: 'Tomorrow · 07:00',
  nextOffsetH: 16,
  lastRun: 'Today · 07:00',
  lastStatus: 'success',
  deliver: ['Daily digest', 'Slack'],
  status: 'active',
  runsThisMo: 13,
  avgDuration: '48s',
  icon: 'sunrise'
}, {
  id: 3,
  type: 'podcast',
  name: 'Permian week-in-review podcast',
  desc: 'AI-narrated 8-min episode summarizing the week\'s permit, rig, and completion activity. Hosted by ONE.',
  cadence: 'Every Friday at 17:00 CT',
  cron: '0 17 * * 5',
  nextRun: 'Fri May 23 · 17:00',
  nextOffsetH: 124,
  lastRun: 'Fri May 16',
  lastStatus: 'success',
  deliver: ['Email', 'RSS feed', 'In-app'],
  status: 'active',
  runsThisMo: 3,
  avgDuration: '8m 12s',
  icon: 'mic',
  badge: 'Beta'
}, {
  id: 4,
  type: 'chat',
  name: 'Daily WTI vs. HH spread check',
  desc: 'Asks ONE: "How did WTI and HH move yesterday? Anything unusual in basis?" Results land in your inbox.',
  cadence: 'Weekdays at 06:30 CT',
  cron: '30 6 * * 1-5',
  nextRun: 'Tomorrow · 06:30',
  nextOffsetH: 15.5,
  lastRun: 'Today · 06:30',
  lastStatus: 'success',
  deliver: ['Email'],
  status: 'active',
  runsThisMo: 13,
  avgDuration: '12s',
  icon: 'message-circle'
}, {
  id: 5,
  type: 'report',
  name: 'Investor leave-behind · Permian update',
  desc: 'Exports a PPT using the Investor briefings color template.',
  cadence: 'First Monday of the month at 08:00 CT',
  cron: '0 8 1-7 * 1',
  nextRun: 'Mon Jun 2 · 08:00',
  nextOffsetH: 480,
  lastRun: 'Mon May 5',
  lastStatus: 'success',
  deliver: ['Email · client list', 'OneDrive'],
  status: 'active',
  runsThisMo: 1,
  avgDuration: '4m 51s',
  icon: 'file-text'
}, {
  id: 6,
  type: 'dashboard',
  name: 'Executive snapshot · auto-refresh',
  desc: 'Refreshes data on the Executive snapshot dashboard and posts a Slack summary.',
  cadence: 'Every hour, weekdays 06:00 – 18:00 CT',
  cron: '0 6-18 * * 1-5',
  nextRun: 'Today · 14:00',
  nextOffsetH: 1.5,
  lastRun: 'Today · 13:00',
  lastStatus: 'success',
  deliver: ['Slack', 'In-app'],
  status: 'active',
  runsThisMo: 134,
  avgDuration: '32s',
  icon: 'layout-grid'
}, {
  id: 7,
  type: 'flow',
  name: 'Lease expiration report · 90-day',
  desc: 'Ranks expiring leases by NPV impact; outputs Excel.',
  cadence: 'Monthly on the 1st at 09:00 CT',
  cron: '0 9 1 * *',
  nextRun: 'Sun Jun 1 · 09:00',
  nextOffsetH: 432,
  lastRun: 'Wed May 1',
  lastStatus: 'failed',
  failureNote: 'Source data offline. Auto-retries 3×; needs attention.',
  deliver: ['Email', 'SharePoint'],
  status: 'paused',
  runsThisMo: 0,
  avgDuration: '6m 02s',
  icon: 'file-text'
}, {
  id: 8,
  type: 'briefing',
  name: 'Weekly rig-count narrative',
  desc: 'Generates a one-page narrative for the Permian rig deck.',
  cadence: 'Every Friday at 16:00 CT',
  cron: '0 16 * * 5',
  nextRun: 'Fri May 23 · 16:00',
  nextOffsetH: 123,
  lastRun: 'Fri May 16',
  lastStatus: 'success',
  deliver: ['In-app', 'Email'],
  status: 'active',
  runsThisMo: 3,
  avgDuration: '1m 28s',
  icon: 'sunrise'
}];
const RUN_HISTORY = [{
  ts: 'Today · 13:00',
  name: 'Executive snapshot · auto-refresh',
  status: 'success',
  dur: '31s'
}, {
  ts: 'Today · 12:00',
  name: 'Executive snapshot · auto-refresh',
  status: 'success',
  dur: '33s'
}, {
  ts: 'Today · 07:00',
  name: 'Morning market brief',
  status: 'success',
  dur: '52s'
}, {
  ts: 'Today · 06:30',
  name: 'Daily WTI vs. HH spread check',
  status: 'success',
  dur: '14s'
}, {
  ts: 'Yesterday · 17:00',
  name: 'Permian week-in-review podcast — manual',
  status: 'success',
  dur: '8m 04s'
}, {
  ts: 'Yesterday · 13:00',
  name: 'Executive snapshot · auto-refresh',
  status: 'success',
  dur: '30s'
}, {
  ts: 'Mon May 12 · 06:00',
  name: 'Acquisition screening · Tier-1 basins',
  status: 'success',
  dur: '2m 12s'
}, {
  ts: 'Wed May 1 · 09:00',
  name: 'Lease expiration report · 90-day',
  status: 'failed',
  dur: '15s',
  note: 'Source data offline'
}];

// ============================================================================
// Section
// ============================================================================
function ScheduledSection({
  markDirty
}) {
  const [filter, setFilter] = useSchS('all');
  const [showCreate, setShowCreate] = useSchS(false);
  const [schedules, setSchedules] = useSchS(SCHEDULES);
  const toggleStatus = id => {
    setSchedules(prev => prev.map(s => s.id === id ? {
      ...s,
      status: s.status === 'active' ? 'paused' : 'active'
    } : s));
    markDirty();
  };
  const visible = filter === 'all' ? schedules : schedules.filter(s => s.type === filter);
  const active = schedules.filter(s => s.status === 'active').length;
  const totalRuns = schedules.reduce((acc, s) => acc + s.runsThisMo, 0);
  const failing = schedules.filter(s => s.lastStatus === 'failed').length;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "User \xB7 03",
    title: "Scheduled",
    sub: "Flows, briefings, podcasts, chat questions, and reports that run on a schedule \u2014 set them up once, hear back automatically."
  }), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Active schedules"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, active, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 400,
      fontSize: 13
    }
  }, " / ", schedules.length)), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, schedules.length - active, " paused")), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Runs \xB7 this month"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, totalRuns), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, failing > 0 ? /*#__PURE__*/React.createElement("span", {
    className: "down"
  }, "\u25BC ", failing, " failed") : /*#__PURE__*/React.createElement("span", {
    className: "up"
  }, "All healthy"))), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Next run"), /*#__PURE__*/React.createElement("span", {
    className: "v",
    style: {
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      fontWeight: 500
    }
  }, "Today \xB7 14:00"), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Executive snapshot \xB7 auto-refresh")), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Compute \xB7 this month"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "4h 12m"), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Counts toward your usage quota"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Next 7 days",
    s: "Every run scheduled to happen between now and Sunday.",
    actions: /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 11,
        color: 'var(--text-muted)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase'
      }
    }, visible.filter(s => s.nextOffsetH < 168 && s.status === 'active').length, " upcoming")
  }), /*#__PURE__*/React.createElement(NextSevenDays, {
    schedules: schedules.filter(s => s.status === 'active' && s.nextOffsetH < 168)
  })), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "All schedules",
    s: "What's set up to run automatically. Click any row to edit cadence, delivery, or recipients.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm",
      onClick: () => setShowCreate(true)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "New schedule")
  }), /*#__PURE__*/React.createElement("div", {
    className: "sched-tabs"
  }, SCHED_TYPES.map(t => {
    const count = t.id === 'all' ? schedules.length : schedules.filter(s => s.type === t.id).length;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      className: 'sched-tab' + (filter === t.id ? ' on' : ''),
      onClick: () => setFilter(t.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: t.icon
    }), /*#__PURE__*/React.createElement("span", null, t.label), /*#__PURE__*/React.createElement("span", {
      className: "count"
    }, count));
  })), /*#__PURE__*/React.createElement("div", {
    className: "sched-list"
  }, visible.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    className: 'sched-row sched-' + s.status
  }, /*#__PURE__*/React.createElement("span", {
    className: 'sched-ic sched-type-' + s.type
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "sched-meta"
  }, /*#__PURE__*/React.createElement("div", {
    className: "sched-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sched-name"
  }, s.name), /*#__PURE__*/React.createElement("span", {
    className: "pill pill--mono",
    style: {
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, s.type), s.badge && /*#__PURE__*/React.createElement("span", {
    className: "pill pill--info",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, s.badge), s.lastStatus === 'failed' && /*#__PURE__*/React.createElement("span", {
    className: "pill pill--danger",
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      textTransform: 'uppercase',
      letterSpacing: '0.06em'
    }
  }, "Last failed")), /*#__PURE__*/React.createElement("div", {
    className: "sched-desc"
  }, s.desc), /*#__PURE__*/React.createElement("div", {
    className: "sched-foot"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), s.cadence), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "play"
  }), "Next: ", /*#__PURE__*/React.createElement("strong", null, s.nextRun)), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "send"
  }), s.deliver.join(' · ')), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "bar-chart-3"
  }), s.runsThisMo, " runs \xB7 avg ", s.avgDuration)), s.failureNote && /*#__PURE__*/React.createElement("div", {
    className: "sched-failure"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "alert-triangle"
  }), /*#__PURE__*/React.createElement("span", null, s.failureNote))), /*#__PURE__*/React.createElement("div", {
    className: "sched-side"
  }, /*#__PURE__*/React.createElement("button", {
    className: 'sched-toggle' + (s.status === 'active' ? ' on' : ''),
    onClick: () => toggleStatus(s.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, s.status === 'active' ? 'Active' : 'Paused')), /*#__PURE__*/React.createElement("div", {
    className: "sched-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    title: "Run now",
    "aria-label": "Run now"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "play"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    title: "Edit",
    "aria-label": "Edit"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit-2"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    title: "More",
    "aria-label": "More actions"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal"
  })))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Recent run history",
    s: `The last ${RUN_HISTORY.length} executions across all your schedules.`,
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external-link"
    }), "Full history")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content run-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "run-row run-head"
  }, /*#__PURE__*/React.createElement("span", null, "Time"), /*#__PURE__*/React.createElement("span", null), /*#__PURE__*/React.createElement("span", null, "Schedule"), /*#__PURE__*/React.createElement("span", null, "Duration"), /*#__PURE__*/React.createElement("span", null)), RUN_HISTORY.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "run-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "run-ts"
  }, r.ts), /*#__PURE__*/React.createElement("span", {
    className: 'run-status run-' + r.status
  }, /*#__PURE__*/React.createElement(Icon, {
    name: r.status === 'success' ? 'check' : 'x'
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "run-name"
  }, r.name), r.note && /*#__PURE__*/React.createElement("div", {
    className: "run-note"
  }, r.note)), /*#__PURE__*/React.createElement("span", {
    className: "run-dur"
  }, r.dur), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    "aria-label": "More actions"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal"
  })))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Default behavior",
    s: "How new schedules behave unless you override per-item."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Default time zone"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "America/Chicago \u2014 Central",
    options: ['America/Chicago — Central', 'America/New_York — Eastern', 'America/Denver — Mountain', 'America/Los_Angeles — Pacific', 'UTC']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Default delivery channel"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Email + In-app",
    options: ['Email + In-app', 'Email only', 'In-app only', 'Slack', 'Teams']
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Pause schedule after 3 consecutive failures",
    defaultOn: true,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Send me a notification when a schedule fails",
    defaultOn: true,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Run history retention: 90 days",
    defaultOn: true,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Skip runs during quiet hours (cosmetic delivery only)",
    defaultOn: false,
    markDirty: markDirty
  }))), showCreate && /*#__PURE__*/React.createElement(CreateScheduleModal, {
    onClose: () => setShowCreate(false),
    markDirty: markDirty
  }));
}

// ============================================================================
// Next 7 days timeline component
// ============================================================================
function NextSevenDays({
  schedules
}) {
  const now = new Date();
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(d.getDate() + i);
    days.push({
      lbl: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', {
        weekday: 'short'
      }),
      date: d.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric'
      }),
      isWeekend: d.getDay() === 0 || d.getDay() === 6
    });
  }
  const buckets = days.map(() => []);
  schedules.forEach(s => {
    const dayIdx = Math.floor(s.nextOffsetH / 24);
    if (dayIdx < 7) {
      buckets[dayIdx].push(s);
    }
  });
  return /*#__PURE__*/React.createElement("div", {
    className: "next7"
  }, days.map((d, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: 'next7-day' + (d.isWeekend ? ' weekend' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "next7-hd"
  }, /*#__PURE__*/React.createElement("span", {
    className: "next7-lbl"
  }, d.lbl), /*#__PURE__*/React.createElement("span", {
    className: "next7-date"
  }, d.date)), /*#__PURE__*/React.createElement("div", {
    className: "next7-runs"
  }, buckets[i].length === 0 ? /*#__PURE__*/React.createElement("div", {
    className: "next7-empty"
  }, "\u2014") : buckets[i].map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    className: 'next7-pill next7-' + s.type
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon
  }), /*#__PURE__*/React.createElement("span", {
    className: "next7-pill-t"
  }, s.name)))))));
}

// ============================================================================
// Create modal — picks the type of thing to schedule
// ============================================================================
const CREATE_OPTIONS = [{
  id: 'flow',
  icon: 'workflow',
  label: 'Schedule a Flow',
  desc: 'Pick a saved flow and run it on a cadence. Outputs land where you choose.'
}, {
  id: 'briefing',
  icon: 'sunrise',
  label: 'Generate a briefing',
  desc: 'Ask ONE to produce a narrative on a schedule. Great for morning markets.'
}, {
  id: 'podcast',
  icon: 'mic',
  label: 'Build a podcast',
  desc: 'Have ONE narrate a week-in-review as a 5-10 minute audio episode.',
  badge: 'Beta'
}, {
  id: 'chat',
  icon: 'message-circle',
  label: 'Re-run a chat question',
  desc: 'Saved Ask ONE prompts that re-execute and land in your inbox.'
}, {
  id: 'report',
  icon: 'file-text',
  label: 'Export a report',
  desc: 'PDF / PowerPoint / Excel exports with your org\'s color template applied.'
}, {
  id: 'dashboard',
  icon: 'layout-grid',
  label: 'Refresh a dashboard',
  desc: 'Force a data refresh and post a short summary to the channel of your choice.'
}];
function CreateScheduleModal({
  onClose,
  markDirty
}) {
  const [step, setStep] = useSchS(0);
  const [type, setType] = useSchS(null);
  const [name, setName] = useSchS('');
  const [cadence, setCadence] = useSchS('weekdays-7');
  const [time, setTime] = useSchS('07:00');
  const [deliver, setDeliver] = useSchS(new Set(['inapp', 'email']));
  const toggleDeliver = v => {
    setDeliver(s => {
      const n = new Set(s);
      if (n.has(v)) n.delete(v);else n.add(v);
      return n;
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "drawer-scrim open",
    onClick: onClose
  }), /*#__PURE__*/React.createElement("div", {
    className: "req-modal",
    style: {
      width: 640
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "req-modal-head"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar-clock"
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "req-modal-t"
  }, "New schedule"), /*#__PURE__*/React.createElement("div", {
    className: "req-modal-s"
  }, "Pick what to schedule, set a cadence, and choose how to be told about it.")), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "req-modal-body"
  }, step === 0 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "What do you want to schedule?"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 8
    }
  }, CREATE_OPTIONS.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.id,
    type: "button",
    className: 'persona-card' + (type === o.id ? ' selected' : ''),
    onClick: () => setType(o.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: o.icon
  })), /*#__PURE__*/React.createElement("span", {
    className: "meta"
  }, /*#__PURE__*/React.createElement("span", {
    className: "nm"
  }, o.label, " ", o.badge && /*#__PURE__*/React.createElement("span", {
    className: "pill pill--info",
    style: {
      marginLeft: 6,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      fontSize: 9,
      letterSpacing: '0.06em'
    }
  }, o.badge)), /*#__PURE__*/React.createElement("span", {
    className: "ds"
  }, o.desc)), /*#__PURE__*/React.createElement("span", {
    className: 'radio' + (type === o.id ? ' on' : '')
  })))))), step === 1 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "Name"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    placeholder: "e.g. Morning Permian briefing",
    value: name,
    onChange: e => setName(e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Cadence"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: cadence === 'weekdays-7' ? 'Weekdays at 07:00 CT' : cadence === 'daily-7' ? 'Daily at 07:00 CT' : cadence === 'weekly-mon' ? 'Mondays at 06:00 CT' : cadence === 'monthly-1' ? 'First of the month at 09:00 CT' : cadence === 'hourly' ? 'Every hour, weekdays 06:00–18:00 CT' : 'Custom cron…',
    onChange: e => {
      const v = e.target.value.startsWith('Weekdays') ? 'weekdays-7' : e.target.value.startsWith('Daily') ? 'daily-7' : e.target.value.startsWith('Mondays') ? 'weekly-mon' : e.target.value.startsWith('First') ? 'monthly-1' : e.target.value.startsWith('Every') ? 'hourly' : 'custom';
      setCadence(v);
    },
    options: ['Weekdays at 07:00 CT', 'Daily at 07:00 CT', 'Mondays at 06:00 CT', 'First of the month at 09:00 CT', 'Every hour, weekdays 06:00–18:00 CT', 'Custom cron…']
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Start at"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp inp-mono",
    value: time,
    onChange: e => setTime(e.target.value)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Time zone"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "America/Chicago \u2014 Central",
    options: ['America/Chicago — Central', 'America/New_York — Eastern', 'UTC']
  })))), step === 2 && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
    label: "Deliver to"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, [{
    id: 'inapp',
    icon: 'bell',
    label: 'In-app'
  }, {
    id: 'email',
    icon: 'mail',
    label: 'Email · me'
  }, {
    id: 'email-list',
    icon: 'users',
    label: 'Email · client list'
  }, {
    id: 'slack',
    icon: 'hash',
    label: 'Slack · #permian-team'
  }, {
    id: 'sharepoint',
    icon: 'folder',
    label: 'SharePoint · /reports/2026/'
  }, {
    id: 'rss',
    icon: 'rss',
    label: 'RSS feed (for podcasts)'
  }].map(d => /*#__PURE__*/React.createElement("label", {
    key: d.id,
    className: "check",
    style: {
      padding: '8px 12px',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer'
    },
    onClick: () => toggleDeliver(d.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: 'box' + (deliver.has(d.id) ? ' on' : '')
  }), /*#__PURE__*/React.createElement(Icon, {
    name: d.icon,
    style: {
      width: 14,
      height: 14,
      marginRight: 4,
      color: 'var(--text-muted)'
    }
  }), /*#__PURE__*/React.createElement("span", null, d.label))))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 12px',
      background: 'var(--background)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--text-muted)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, "Summary"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      color: 'var(--text-body)',
      marginTop: 4
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 500
    }
  }, name || 'Untitled schedule'), " \xB7 ", type ? CREATE_OPTIONS.find(o => o.id === type).label : '—'), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      marginTop: 4
    }
  }, cadence === 'weekdays-7' ? 'Weekdays at ' + time + ' CT' : cadence === 'daily-7' ? 'Daily at ' + time + ' CT' : cadence === 'weekly-mon' ? 'Mondays at ' + time + ' CT' : cadence === 'monthly-1' ? 'First of the month at ' + time + ' CT' : cadence === 'hourly' ? 'Every hour, weekdays 06:00–18:00 CT' : 'Custom cron', " \xB7 ", [...deliver].length, " channel", [...deliver].length === 1 ? '' : 's')))), /*#__PURE__*/React.createElement("div", {
    className: "req-modal-foot"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginRight: 'auto',
      alignItems: 'center',
      fontFamily: 'var(--font-mono)',
      fontSize: 10,
      color: 'var(--text-muted)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: step >= 0 ? 'step-dot active' : 'step-dot'
  }), /*#__PURE__*/React.createElement("span", null, "Type"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 1,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: step >= 1 ? 'step-dot active' : 'step-dot'
  }), /*#__PURE__*/React.createElement("span", null, "Cadence"), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 14,
      height: 1,
      background: 'var(--border)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: step >= 2 ? 'step-dot active' : 'step-dot'
  }), /*#__PURE__*/React.createElement("span", null, "Delivery")), step > 0 && /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: () => setStep(step - 1)
  }, "Back"), step < 2 && /*#__PURE__*/React.createElement(Button, {
    variant: "default",
    onClick: () => setStep(step + 1),
    disabled: step === 0 && !type
  }, "Next"), step === 2 && /*#__PURE__*/React.createElement(Button, {
    variant: "default",
    onClick: () => {
      markDirty();
      onClose();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Create schedule"))), /*#__PURE__*/React.createElement("style", null, `
        .step-dot { width:6px; height:6px; border-radius:50%; background: var(--border); }
        .step-dot.active { background: var(--accent-brand); }
      `));
}
Object.assign(window, {
  ScheduledSection
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/settings-scheduled.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/settings-sections.jsx
try { (() => {
// settings-sections.jsx
// All six settings panels: Profile, Notifications, Saved views,
// Team & roles, Data preferences, Appearance.

const {
  useState: useS,
  useMemo,
  useEffect: useE
} = React;

// -----------------------------------------------------------------------------
// 1. PROFILE & ACCOUNT
// -----------------------------------------------------------------------------
function ProfileSection({
  markDirty
}) {
  const [name, setName] = useS('Jason Shannon');
  const [title, setTitle] = useS('Lead Energy Analyst');
  const [tz, setTz] = useS('America/Chicago — Central');
  const [locale, setLocale] = useS('English (United States)');
  const [pwd, setPwd] = useS('');
  const initials = name.split(' ').slice(0, 2).map(s => s[0]).join('').toUpperCase();
  const pwdStrength = useMemo(() => {
    let s = 0;
    if (pwd.length >= 8) s++;
    if (/[A-Z]/.test(pwd) && /[a-z]/.test(pwd)) s++;
    if (/\d/.test(pwd)) s++;
    if (/[^A-Za-z0-9]/.test(pwd)) s++;
    return Math.min(s, 4);
  }, [pwd]);
  const pwdLabel = ['—', 'Weak', 'Fair', 'Good', 'Strong'][pwdStrength];
  const change = setter => e => {
    setter(e.target.value);
    markDirty();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "01 \xB7 Identity",
    title: "Profile & account",
    sub: "Your profile is shown to teammates across Enverus ONE. Sign-in details and MFA control how you access the platform."
  }), /*#__PURE__*/React.createElement(HeroStrip, {
    user: {
      name,
      title,
      lastSignIn: '2 hours ago',
      org: 'Enverus · Permian Analytics'
    }
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Identity",
    s: "Visible to teammates in chats, shared views, and audit logs."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content profile-id"
  }, /*#__PURE__*/React.createElement("div", {
    className: "avatar-big"
  }, initials, /*#__PURE__*/React.createElement("span", {
    className: "edit"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "camera"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "profile-rows"
  }, /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Full name"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    value: name,
    onChange: change(setName)
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Job title"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    value: title,
    onChange: change(setTitle)
  }))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Time zone"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: tz,
    onChange: change(setTz),
    options: ['America/Chicago — Central', 'America/New_York — Eastern', 'America/Denver — Mountain', 'America/Los_Angeles — Pacific', 'America/Houston — Central', 'UTC']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Language"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: locale,
    onChange: change(setLocale),
    options: ['English (United States)', 'English (United Kingdom)', 'Español (México)', 'Français (Canada)']
  })))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Connected accounts",
    s: "Single sign-on and data integrations linked to your profile."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement(ConnRow, {
    icon: "key-round",
    name: "Okta SSO",
    detail: "enverus.okta.com \xB7 primary",
    status: "Linked"
  }), /*#__PURE__*/React.createElement(ConnRow, {
    icon: "microsoft",
    name: "Microsoft 365",
    detail: "Teams \xB7 OneDrive \xB7 Outlook calendar",
    status: "Linked"
  }), /*#__PURE__*/React.createElement(ConnRow, {
    icon: "slack",
    name: "Slack",
    detail: "enverus-permian.slack.com",
    status: "Linked"
  }), /*#__PURE__*/React.createElement(ConnRow, {
    icon: "link",
    name: "Salesforce",
    detail: "Not connected",
    status: "off"
  }))));
}
function HeroStrip({
  user
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "hero"
  }, /*#__PURE__*/React.createElement("div", {
    className: "hero-card"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("span", {
    className: "card-title"
  }, "Signed in as")), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }, user.name, " \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 400
    }
  }, user.title), /*#__PURE__*/React.createElement("div", {
    className: "card-description"
  }, user.org, " \xB7 last sign-in ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, user.lastSignIn)))), /*#__PURE__*/React.createElement("div", {
    className: "hero-grid"
  }, /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("span", {
    className: "card-header card-title"
  }, "MFA"), /*#__PURE__*/React.createElement("span", {
    className: "card-content"
  }, "Enabled \xB7 TOTP")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("span", {
    className: "card-header card-title"
  }, "Region"), /*#__PURE__*/React.createElement("span", {
    className: "card-content mono"
  }, "US-East \xB7 v2026.4")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("span", {
    className: "card-header card-title"
  }, "Session"), /*#__PURE__*/React.createElement("span", {
    className: "card-content mono"
  }, "14h 22m")), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("span", {
    className: "card-header card-title"
  }, "API tokens"), /*#__PURE__*/React.createElement("span", {
    className: "card-content mono"
  }, "2 active"))));
}
function ConnRow({
  icon,
  name,
  detail,
  status
}) {
  const linked = status === 'Linked';
  return /*#__PURE__*/React.createElement("div", {
    className: "sec-card",
    style: {
      padding: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "row1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: icon === 'microsoft' ? 'square' : icon === 'slack' ? 'hash' : icon
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "ttl"
  }, name), /*#__PURE__*/React.createElement("div", {
    className: "sub"
  }, detail)), linked ? /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Disconnect") : /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, "Connect")));
}

// -----------------------------------------------------------------------------
// 2. NOTIFICATIONS
// -----------------------------------------------------------------------------
const NOTIF_CHANNELS = [{
  id: 'inapp',
  icon: 'bell',
  label: 'In-app'
}, {
  id: 'email',
  icon: 'mail',
  label: 'Email'
}, {
  id: 'mobile',
  icon: 'smartphone',
  label: 'Mobile push'
}, {
  id: 'digest',
  icon: 'newspaper',
  label: 'Daily digest'
}];
const NOTIF_EVENTS = [{
  id: 'price',
  icon: 'trending-up',
  label: 'Price alerts',
  sub: 'WTI, HH, basis differentials cross thresholds'
}, {
  id: 'permits',
  icon: 'clipboard-list',
  label: 'New permits',
  sub: 'Drilling, completion, hearing filings in tracked counties'
}, {
  id: 'completions',
  icon: 'gauge',
  label: 'Completions',
  sub: 'Wells brought online in saved acreage'
}, {
  id: 'production',
  icon: 'activity',
  label: 'Production data',
  sub: 'Monthly volumes published or revised'
}, {
  id: 'rig',
  icon: 'drill',
  label: 'Rig movement',
  sub: 'Rigs added, released, or repositioned'
}, {
  id: 'mna',
  icon: 'briefcase',
  label: 'M&A activity',
  sub: 'Asset packages and corporate deals matching filters'
}, {
  id: 'share',
  icon: 'share-2',
  label: 'Shares & mentions',
  sub: 'Workspace shares, comments, and @mentions'
}, {
  id: 'system',
  icon: 'wrench',
  label: 'Workflow status',
  sub: 'Scheduled flows complete or fail'
}];
const DEFAULT_MATRIX = {
  price: {
    inapp: true,
    email: true,
    mobile: true,
    digest: true
  },
  permits: {
    inapp: true,
    email: false,
    mobile: false,
    digest: true
  },
  completions: {
    inapp: true,
    email: false,
    mobile: false,
    digest: true
  },
  production: {
    inapp: false,
    email: false,
    mobile: false,
    digest: true
  },
  rig: {
    inapp: true,
    email: false,
    mobile: false,
    digest: true
  },
  mna: {
    inapp: true,
    email: true,
    mobile: false,
    digest: true
  },
  share: {
    inapp: true,
    email: true,
    mobile: true,
    digest: false
  },
  system: {
    inapp: true,
    email: false,
    mobile: false,
    digest: false
  }
};
function NotificationsSection({
  tweaks,
  markDirty
}) {
  const [matrix, setMatrix] = useS(DEFAULT_MATRIX);
  const [hoverRow, setHoverRow] = useS(null);
  const [hoverCol, setHoverCol] = useS(null);
  const [quietOn, setQuietOn] = useS(true);
  const [digestTime, setDigestTime] = useS('07:30');
  const [digestDays, setDigestDays] = useS({
    mon: true,
    tue: true,
    wed: true,
    thu: true,
    fri: true,
    sat: false,
    sun: false
  });
  const toggle = (eventId, chanId) => {
    setMatrix(m => ({
      ...m,
      [eventId]: {
        ...m[eventId],
        [chanId]: !m[eventId][chanId]
      }
    }));
    markDirty();
  };
  const totalActive = Object.values(matrix).reduce((s, row) => s + Object.values(row).filter(Boolean).length, 0);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "02 \xB7 Signals",
    title: "Notifications",
    sub: "Choose what gets a push, what waits for your daily digest, and what stays silent. Every event ships through up to four channels."
  }), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Active channels"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, totalActive, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 400,
      fontSize: 13
    }
  }, " / 32")), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Across 8 event types")), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "This week"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "147"), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, /*#__PURE__*/React.createElement("span", {
    className: "up"
  }, "\u25B2 12"), " vs. last week")), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Muted alerts"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, "3"), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Auto-resume ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, "May 18"))), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Digest preview"), /*#__PURE__*/React.createElement("span", {
    className: "v",
    style: {
      fontSize: 13,
      fontFamily: 'var(--font-sans)',
      fontWeight: 500
    }
  }, "Mon\u2013Fri"), /*#__PURE__*/React.createElement("span", {
    className: "d",
    style: {
      fontFamily: 'var(--font-mono)'
    }
  }, "07:30 CT"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Quiet hours",
    s: "Pause push notifications during set hours. Critical alerts (price thresholds, system failures) still come through.",
    actions: /*#__PURE__*/React.createElement("span", {
      className: "switch on",
      onClick: () => {
        setQuietOn(!quietOn);
        markDirty();
      },
      style: {
        background: quietOn ? 'var(--accent-brand)' : 'var(--input-border)'
      }
    })
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-3",
    style: {
      maxWidth: 420
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Start"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp inp-mono",
    defaultValue: "19:00"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "End"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp inp-mono",
    defaultValue: "07:00"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Time zone"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    value: "America/Chicago",
    readOnly: true
  }))), /*#__PURE__*/React.createElement("div", {
    className: "quiet-strip",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: "quiet",
    style: {
      left: `${19 / 24 * 100}%`,
      width: `${5 / 24 * 100}%`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "quiet",
    style: {
      left: 0,
      width: `${7 / 24 * 100}%`
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "ticks"
  }, ['00', '03', '06', '09', '12', '15', '18', '21'].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    className: "tick"
  }, t))), /*#__PURE__*/React.createElement("div", {
    className: "now",
    style: {
      left: `${(new Date().getHours() + new Date().getMinutes() / 60) / 24 * 100}%`
    }
  }))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Event subscriptions",
    s: tweaks.notifLayout === 'matrix' ? "Tap any cell to flip a channel for that event. Hovering highlights the row and column." : "Pick channels per event. Hover an event to focus its row.",
    actions: /*#__PURE__*/React.createElement("div", {
      className: "seg-row"
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        fontSize: 11,
        color: 'var(--text-muted)',
        marginRight: 8,
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.06em',
        textTransform: 'uppercase'
      }
    }, "Layout"), /*#__PURE__*/React.createElement("button", {
      className: 'seg' + (tweaks.notifLayout === 'matrix' ? ' on' : ''),
      onClick: () => tweaks.setTweak('notifLayout', 'matrix')
    }, "Matrix"), /*#__PURE__*/React.createElement("button", {
      className: 'seg' + (tweaks.notifLayout === 'cards' ? ' on' : ''),
      onClick: () => tweaks.setTweak('notifLayout', 'cards')
    }, "Cards"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }, tweaks.notifLayout === 'matrix' ? /*#__PURE__*/React.createElement("table", {
    className: "notif-matrix"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "first"
  }, "Event"), NOTIF_CHANNELS.map((c, ci) => /*#__PURE__*/React.createElement("th", {
    key: c.id,
    className: hoverCol === ci ? 'col-hover' : '',
    style: {
      width: 95
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon
  }), c.label)), /*#__PURE__*/React.createElement("th", {
    style: {
      width: 60
    }
  }))), /*#__PURE__*/React.createElement("tbody", null, NOTIF_EVENTS.map(ev => /*#__PURE__*/React.createElement("tr", {
    key: ev.id,
    onMouseEnter: () => setHoverRow(ev.id),
    onMouseLeave: () => setHoverRow(null),
    className: hoverRow === ev.id ? 'row-hover' : ''
  }, /*#__PURE__*/React.createElement("td", {
    className: "first"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ev.icon
  })), /*#__PURE__*/React.createElement("span", null, ev.label), /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, ev.sub)), NOTIF_CHANNELS.map((c, ci) => /*#__PURE__*/React.createElement("td", {
    key: c.id,
    className: hoverCol === ci ? 'col-hover' : '',
    onMouseEnter: () => setHoverCol(ci),
    onMouseLeave: () => setHoverCol(null)
  }, /*#__PURE__*/React.createElement("button", {
    className: 'cell-toggle' + (matrix[ev.id][c.id] ? ' on' : ''),
    onClick: () => toggle(ev.id, c.id),
    "aria-label": `${ev.label} via ${c.label}`
  }))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "row-actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "icon-sm",
    title: "Edit thresholds",
    "aria-label": "Edit thresholds"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sliders"
  })))))))) : /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, NOTIF_EVENTS.map(ev => /*#__PURE__*/React.createElement("div", {
    key: ev.id,
    className: "notif-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ev.icon
  })), /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, ev.label), /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, ev.sub)), /*#__PURE__*/React.createElement("div", {
    className: "channels"
  }, NOTIF_CHANNELS.map(c => /*#__PURE__*/React.createElement("span", {
    key: c.id,
    className: 'chan' + (matrix[ev.id][c.id] ? ' on' : ''),
    onClick: () => toggle(ev.id, c.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: c.icon
  }), c.label.split(' ')[0])))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Daily digest",
    s: "One email at the start of the day with everything you opted into. Skip days you're off."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Delivery time"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp inp-mono",
    value: digestTime,
    onChange: e => {
      setDigestTime(e.target.value);
      markDirty();
    }
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Format"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Compact (top 10 per category)",
    options: ['Compact (top 10 per category)', 'Detailed (every event)', 'Executive (top 3 only)']
  }))), /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, "Days"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'].map(d => /*#__PURE__*/React.createElement("button", {
    key: d,
    onClick: () => {
      setDigestDays(s => ({
        ...s,
        [d]: !s[d]
      }));
      markDirty();
    },
    className: 'btn btn--default btn--xs',
    style: digestDays[d] ? {
      background: 'var(--accent-brand)',
      color: '#fff',
      borderColor: 'var(--accent-brand)'
    } : {}
  }, d[0].toUpperCase() + d.slice(1)))))));
}

// -----------------------------------------------------------------------------
// 3. SAVED VIEWS
// -----------------------------------------------------------------------------
const VIEW_MODULES = [{
  id: 'wells',
  icon: 'crosshair',
  label: 'Wells',
  count: 12
}, {
  id: 'prod',
  icon: 'gauge',
  label: 'Production',
  count: 6
}, {
  id: 'rigs',
  icon: 'drill',
  label: 'Rigs',
  count: 3
}, {
  id: 'land',
  icon: 'map',
  label: 'Land & leases',
  count: 4
}, {
  id: 'screening',
  icon: 'filter',
  label: 'Screening',
  count: 8
}];
const SEED_VIEWS = {
  wells: [{
    id: 1,
    name: 'Permian — Midland · Horizontal · Last 90d',
    desc: 'Operators with > 5 wells spudded in the last quarter.',
    chips: ['basin=permian-midland', 'orient=horiz', 'spud≤90d'],
    shared: 'Just me',
    updated: '2h ago',
    star: true
  }, {
    id: 2,
    name: 'Bakken — Reservation operators',
    desc: 'McKenzie and Mountrail focus.',
    chips: ['basin=bakken', 'county∈[mckenzie,mountrail]'],
    shared: 'Team · 4',
    updated: 'Yesterday',
    star: false
  }, {
    id: 3,
    name: 'Eagle Ford completions Q2',
    desc: 'Recently completed wells with > 1,500 BOE/d IP30.',
    chips: ['basin=eagleford', 'ip30>1500'],
    shared: 'Just me',
    updated: '3 days ago',
    star: false
  }, {
    id: 4,
    name: 'Delaware — Loving County rigs',
    desc: 'Active rigs in Loving County.',
    chips: ['county=loving', 'rig_status=active'],
    shared: 'Workspace',
    updated: '1 wk ago',
    star: false
  }, {
    id: 5,
    name: 'DJ Basin — Wattenberg refracs',
    desc: 'Refrac candidates by EUR uplift potential.',
    chips: ['basin=dj', 'workover=refrac'],
    shared: 'Just me',
    updated: '2 wk ago',
    star: false
  }],
  prod: [{
    id: 6,
    name: 'Tier-1 operators · 3-stream',
    desc: 'Oil + gas + NGL trends for tracked operators.',
    chips: ['stream=3', 'operators∈[t1]'],
    shared: 'Team · 8',
    updated: '5h ago',
    star: true
  }, {
    id: 7,
    name: 'GOR shift watchlist',
    desc: 'Wells with GOR Δ > 20% MoM.',
    chips: ['delta_gor>20%'],
    shared: 'Just me',
    updated: 'Yesterday',
    star: false
  }],
  rigs: [{
    id: 8,
    name: 'Permian rig count weekly',
    desc: 'Permian-only rigs, weekly resolution.',
    chips: ['basin=permian', 'freq=wk'],
    shared: 'Workspace',
    updated: '4h ago',
    star: true
  }],
  land: [{
    id: 9,
    name: 'Lease expirations next 60 days',
    desc: 'High-value leases approaching expiry.',
    chips: ['expires≤60d', 'nbv>$1M'],
    shared: 'Just me',
    updated: '1 d ago',
    star: false
  }],
  screening: [{
    id: 10,
    name: 'Acquisition screen — Midland Tier 1',
    desc: 'Bolt-on candidates: 5K–20K acres, < $500/acre.',
    chips: ['acres=5k-20k', '$/ac<500'],
    shared: 'Team · 3',
    updated: 'Today',
    star: true
  }, {
    id: 11,
    name: 'Greenfield power siting · Texas',
    desc: 'Generation site candidates with grid headroom.',
    chips: ['state=tx', 'grid_headroom>40MW'],
    shared: 'Workspace',
    updated: '2 d ago',
    star: false
  }]
};
function SavedViewsSection({
  markDirty
}) {
  const [module, setModule] = useS('wells');
  const [views, setViews] = useS(SEED_VIEWS);
  const toggleStar = (mod, id) => {
    setViews(v => ({
      ...v,
      [mod]: v[mod].map(x => x.id === id ? {
        ...x,
        star: !x.star
      } : x)
    }));
    markDirty();
  };
  const curr = views[module] || [];
  const defaultView = curr.find(v => v.star);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "03 \xB7 Defaults",
    title: "Saved views",
    sub: "Default filters, layouts, and column orders per module. Star a view to make it the workspace landing view when you open that screen."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Module",
    s: "Each module has its own set of saved views and one default."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content module-tabs"
  }, VIEW_MODULES.map(m => /*#__PURE__*/React.createElement("button", {
    key: m.id,
    className: 'module-tab' + (module === m.id ? ' active' : ''),
    onClick: () => setModule(m.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: m.icon
  }), m.label, /*#__PURE__*/React.createElement("span", {
    className: "count"
  }, views[m.id]?.length || 0)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '12px 14px',
      borderRadius: 'var(--radius-md)',
      background: 'rgba(86,188,47,.06)',
      border: '1px solid rgba(86,188,47,.2)',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star",
    style: {
      width: 16,
      height: 16,
      color: 'var(--warning)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, "Workspace default: ", defaultView ? defaultView.name : /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 400
    }
  }, "None \u2014 opens unfiltered view")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, "Opens automatically when teammates land on the ", VIEW_MODULES.find(m => m.id === module).label, " module."))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit-2"
  }), "Change")), /*#__PURE__*/React.createElement("div", {
    className: "views-list"
  }, curr.map(v => /*#__PURE__*/React.createElement("div", {
    key: v.id,
    className: "view-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "grip"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "grip-vertical"
  })), /*#__PURE__*/React.createElement("span", {
    className: 'star' + (v.star ? ' on' : ''),
    onClick: () => toggleStar(module, v.id)
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "star"
  })), /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, v.name), /*#__PURE__*/React.createElement("span", {
    className: "desc"
  }, v.desc)), /*#__PURE__*/React.createElement("div", {
    className: "chips"
  }, v.chips.map(c => /*#__PURE__*/React.createElement("span", {
    key: c,
    className: "chip"
  }, c))), /*#__PURE__*/React.createElement("span", {
    className: "shared"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: v.shared.startsWith('Just') ? 'user' : v.shared.startsWith('Team') ? 'users' : 'globe'
  }), v.shared), /*#__PURE__*/React.createElement("span", {
    className: "updated"
  }, v.updated), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    "aria-label": "More actions"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal"
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "lbl-sub"
  }, "Drag to reorder \xB7 star to set default \xB7 click name to edit filters"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "plus"
  }), "New view"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Module defaults",
    s: "What you see when you open a module fresh."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Default landing screen"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "ONE \u2014 command center",
    options: ['ONE — command center', 'Wells dashboard', 'Production dashboard', 'Map view', 'Last visited']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Table density"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Compact (28px rows)",
    options: ['Compact (28px rows)', 'Comfortable (32px rows)', 'Spacious (40px rows)']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Default chart type"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Line \xB7 time-series",
    options: ['Line · time-series', 'Bar · grouped', 'Scatter', 'Heatmap']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Pin frequently-used filters"
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Pin top 5 filters across modules",
    defaultOn: true,
    markDirty: markDirty
  })))));
}

// -----------------------------------------------------------------------------
// 4. TEAM & ROLES
// -----------------------------------------------------------------------------
const TEAM = [{
  name: 'Jason Shannon',
  email: 'jason.shannon@enverus.com',
  role: 'Owner',
  status: 'active',
  last: 'now',
  av: '#3c8321',
  initials: 'JS',
  you: true
}, {
  name: 'Maria Velez',
  email: 'maria.velez@enverus.com',
  role: 'Admin',
  status: 'active',
  last: '12 min ago',
  av: '#c4622d',
  initials: 'MV'
}, {
  name: 'David Park',
  email: 'david.park@enverus.com',
  role: 'Editor',
  status: 'idle',
  last: '2h ago',
  av: '#1f648d',
  initials: 'DP'
}, {
  name: 'Priya Anand',
  email: 'priya.anand@enverus.com',
  role: 'Editor',
  status: 'active',
  last: '4 min ago',
  av: '#5b399e',
  initials: 'PA'
}, {
  name: 'Thomas Reilly',
  email: 'tom.reilly@enverus.com',
  role: 'Viewer',
  status: 'off',
  last: '5 days ago',
  av: '#586f78',
  initials: 'TR'
}, {
  name: 'Sarah Chen',
  email: 'sarah.chen@enverus.com',
  role: 'Editor',
  status: 'active',
  last: 'just now',
  av: '#9b1d4d',
  initials: 'SC'
}];
const PERM_ROWS = [{
  area: 'Wells & production',
  Owner: 'full',
  Admin: 'full',
  Editor: 'edit',
  Viewer: 'read'
}, {
  area: 'Saved views',
  Owner: 'full',
  Admin: 'full',
  Editor: 'edit',
  Viewer: 'read'
}, {
  area: 'Workflows & flows',
  Owner: 'full',
  Admin: 'full',
  Editor: 'edit',
  Viewer: 'read'
}, {
  area: 'Agent Studio',
  Owner: 'full',
  Admin: 'full',
  Editor: 'edit',
  Viewer: 'none'
}, {
  area: 'Team & roles',
  Owner: 'full',
  Admin: 'partial',
  Editor: 'none',
  Viewer: 'none'
}, {
  area: 'Billing & licensing',
  Owner: 'full',
  Admin: 'read',
  Editor: 'none',
  Viewer: 'none'
}, {
  area: 'API tokens',
  Owner: 'full',
  Admin: 'full',
  Editor: 'self',
  Viewer: 'none'
}];
const PERM_LABELS = {
  full: 'Full',
  edit: 'Edit',
  read: 'Read',
  partial: 'Partial',
  self: 'Self only',
  none: '—'
};
function TeamSection({
  markDirty
}) {
  const [defaultShare, setDefaultShare] = useS('workspace');
  const [linkAccess, setLinkAccess] = useS('viewer');
  const [domainLock, setDomainLock] = useS(true);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "04 \xB7 Workspace",
    title: "Team & roles",
    sub: "Who's in the Permian Analytics workspace, what they can do, and how shared work is governed by default."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Workspace identity",
    s: "Members see this name across the product and in the audit log.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external-link"
    }), "View audit log")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Workspace name"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    defaultValue: "Permian Analytics"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "URL slug"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp inp-mono",
    defaultValue: "permian-analytics"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Logo (optional)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: 'var(--accent-brand)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600
    }
  }, "PA"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload"
  }), "Upload"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Remove"))), /*#__PURE__*/React.createElement(Field, {
    label: "Primary contact"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Jason Shannon (you)",
    options: ['Jason Shannon (you)', 'Maria Velez', 'David Park']
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Sharing defaults",
    s: "What happens when someone shares a view, a flow, or a dashboard in this workspace."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content card-contents"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Default visibility for new artifacts",
    sub: "Applies to saved views, dashboards, and screening results.",
    style: {
      paddingBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, [{
    id: 'private',
    icon: 'lock',
    label: 'Private',
    sub: 'Only the creator'
  }, {
    id: 'team',
    icon: 'users',
    label: 'Team',
    sub: 'Direct teammates'
  }, {
    id: 'workspace',
    icon: 'briefcase',
    label: 'Workspace',
    sub: 'Everyone in Permian Analytics'
  }, {
    id: 'org',
    icon: 'building-2',
    label: 'Organization',
    sub: 'All Enverus users'
  }].map(opt => /*#__PURE__*/React.createElement("div", {
    key: opt.id,
    onClick: () => {
      setDefaultShare(opt.id);
      markDirty();
    },
    style: {
      flex: 1,
      minWidth: 140,
      padding: 12,
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (defaultShare === opt.id ? 'var(--accent-brand)' : 'var(--surface-border-elevated)'),
      background: defaultShare === opt.id ? 'rgba(86,188,47,.08)' : 'var(--surface-base)',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: opt.icon,
    style: {
      width: 14,
      height: 14,
      color: defaultShare === opt.id ? 'var(--accent-brand)' : 'var(--text-muted)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, opt.label), /*#__PURE__*/React.createElement("span", {
    className: "radio",
    style: {
      marginLeft: 'auto'
    }
  }, defaultShare === opt.id && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--accent-brand)'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, opt.sub))))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Default link permission",
    sub: "When someone copies a share link."
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: linkAccess === 'viewer' ? 'Viewer (read-only)' : 'Editor (can modify)',
    onChange: e => {
      setLinkAccess(e.target.value.startsWith('Viewer') ? 'viewer' : 'editor');
      markDirty();
    },
    options: ['Viewer (read-only)', 'Editor (can modify)', 'Owner (can re-share)']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "External sharing"
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Allow sharing outside enverus.com",
    defaultOn: false,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Require domain allow-list",
    defaultOn: domainLock,
    onChange: () => {
      setDomainLock(!domainLock);
      markDirty();
    },
    markDirty: markDirty
  }))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Members",
    s: `${TEAM.length} people in Permian Analytics · 4 seats remaining`,
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "user-plus"
    }), "Invite")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/React.createElement("table", {
    className: "team-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Role"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Last active"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, TEAM.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.email
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "who"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av",
    style: {
      background: p.av
    }
  }, p.initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, p.name, " ", p.you && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 400,
      fontSize: 11.5
    }
  }, "\xB7 you")), /*#__PURE__*/React.createElement("div", {
    className: "em"
  }, p.email)))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: 'pill ' + (p.role === 'Owner' ? 'pill--brand' : p.role === 'Admin' ? 'pill--info' : ''),
    style: {
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: 10
    }
  }, p.role)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: 'active-dot ' + (p.status === 'active' ? '' : p.status)
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: p.status === 'active' ? 'var(--text-body)' : 'var(--text-muted)',
      fontSize: 12.5
    }
  }, p.status === 'active' ? 'Active' : p.status === 'idle' ? 'Idle' : 'Offline')), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, p.last), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    "aria-label": "More actions"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal"
  }))))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Roles & permissions",
    s: "What each role can do across major surfaces. Custom roles are available on Enterprise plans.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "New role")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/React.createElement("table", {
    className: "perm-matrix"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "first"
  }, "Area"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Admin"), /*#__PURE__*/React.createElement("th", null, "Editor"), /*#__PURE__*/React.createElement("th", null, "Viewer"))), /*#__PURE__*/React.createElement("tbody", null, PERM_ROWS.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.area
  }, /*#__PURE__*/React.createElement("td", {
    className: "first"
  }, r.area), ['Owner', 'Admin', 'Editor', 'Viewer'].map(role => {
    const v = r[role];
    const cls = v === 'full' || v === 'edit' ? 'perm-yes' : v === 'none' ? 'perm-no' : 'perm-partial';
    return /*#__PURE__*/React.createElement("td", {
      key: role
    }, /*#__PURE__*/React.createElement("span", {
      className: cls,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 11.5,
        fontWeight: 500,
        fontFamily: 'var(--font-mono)'
      }
    }, v === 'full' && /*#__PURE__*/React.createElement(Icon, {
      name: "circle-dot",
      style: {
        width: 11,
        height: 11
      }
    }), v === 'edit' && /*#__PURE__*/React.createElement(Icon, {
      name: "edit-2",
      style: {
        width: 11,
        height: 11
      }
    }), v === 'read' && /*#__PURE__*/React.createElement(Icon, {
      name: "eye",
      style: {
        width: 11,
        height: 11
      }
    }), v === 'partial' && /*#__PURE__*/React.createElement(Icon, {
      name: "minus",
      style: {
        width: 11,
        height: 11
      }
    }), v === 'self' && /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      style: {
        width: 11,
        height: 11
      }
    }), PERM_LABELS[v]));
  }))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Pending invitations",
    s: "People who've been invited but haven't joined yet.",
    actions: /*#__PURE__*/React.createElement("span", {
      className: "pill pill--warn"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }), "2 pending")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content invite-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "invite-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  })), /*#__PURE__*/React.createElement("span", {
    className: "em"
  }, "k.thompson@enverus.com"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, "Editor"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, "Sent 2 days ago"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Resend"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    style: {
      color: 'var(--danger-text)'
    }
  }, "Revoke"))), /*#__PURE__*/React.createElement("div", {
    className: "invite-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  })), /*#__PURE__*/React.createElement("span", {
    className: "em"
  }, "consultant@external-firm.com"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, "Viewer \xB7 ext."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, "Sent 5h ago"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Resend"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    style: {
      color: 'var(--danger-text)'
    }
  }, "Revoke"))))));
}

// -----------------------------------------------------------------------------
// 5. DATA PREFERENCES
// -----------------------------------------------------------------------------
const BASINS = [{
  id: 'permian-midland',
  label: 'Permian — Midland',
  state: 'TX',
  x: 295,
  y: 280,
  w: 60,
  h: 30
}, {
  id: 'permian-delaware',
  label: 'Permian — Delaware',
  state: 'TX/NM',
  x: 230,
  y: 280,
  w: 60,
  h: 30
}, {
  id: 'eagleford',
  label: 'Eagle Ford',
  state: 'TX',
  x: 320,
  y: 340,
  w: 65,
  h: 22
}, {
  id: 'haynesville',
  label: 'Haynesville',
  state: 'LA/TX',
  x: 405,
  y: 305,
  w: 50,
  h: 22
}, {
  id: 'bakken',
  label: 'Bakken',
  state: 'ND',
  x: 330,
  y: 90,
  w: 60,
  h: 30
}, {
  id: 'powder-river',
  label: 'Powder River',
  state: 'WY',
  x: 240,
  y: 145,
  w: 50,
  h: 28
}, {
  id: 'dj',
  label: 'DJ / Niobrara',
  state: 'CO',
  x: 245,
  y: 200,
  w: 50,
  h: 26
}, {
  id: 'anadarko',
  label: 'Anadarko / SCOOP',
  state: 'OK',
  x: 345,
  y: 245,
  w: 55,
  h: 22
}, {
  id: 'marcellus',
  label: 'Marcellus / Utica',
  state: 'PA/OH/WV',
  x: 535,
  y: 195,
  w: 60,
  h: 32
}, {
  id: 'uinta',
  label: 'Uinta',
  state: 'UT',
  x: 175,
  y: 215,
  w: 35,
  h: 22
}];
function DataPrefsSection({
  markDirty
}) {
  const [units, setUnits] = useS('imperial');
  const [currency, setCurrency] = useS('USD');
  const [dateFmt, setDateFmt] = useS('Oct 3, 2025');
  const [timeFmt, setTimeFmt] = useS('24h');
  const [selectedBasins, setSelectedBasins] = useS({
    'permian-midland': true,
    'permian-delaware': true,
    'eagleford': true,
    'bakken': true
  });
  const [commodity, setCommodity] = useS('Oil (crude + condensate)');
  const [fiscal, setFiscal] = useS('January (calendar year)');
  const toggleBasin = id => {
    setSelectedBasins(s => ({
      ...s,
      [id]: !s[id]
    }));
    markDirty();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "05 \xB7 Defaults",
    title: "Data preferences",
    sub: "How numbers, dates, and regions appear across the product. Changes propagate to every dashboard and report you open."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Units & numbers",
    s: "Switch between imperial and metric. The preview below shows the same dataset under your selection."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Unit system"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg-row",
    style: {
      width: 'fit-content'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: 'seg' + (units === 'imperial' ? ' on' : ''),
    onClick: () => {
      setUnits('imperial');
      markDirty();
    }
  }, "Imperial"), /*#__PURE__*/React.createElement("button", {
    className: 'seg' + (units === 'metric' ? ' on' : ''),
    onClick: () => {
      setUnits('metric');
      markDirty();
    }
  }, "Metric"), /*#__PURE__*/React.createElement("button", {
    className: 'seg' + (units === 'mixed' ? ' on' : ''),
    onClick: () => {
      setUnits('mixed');
      markDirty();
    }
  }, "Mixed (industry)"))), /*#__PURE__*/React.createElement(Field, {
    label: "Number format"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "1,234.56 (US)",
    options: ['1,234.56 (US)', '1.234,56 (EU)', '1 234,56 (FR)']
  }))), /*#__PURE__*/React.createElement("div", {
    className: "unit-preview"
  }, units === 'imperial' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Upi, {
    l: "Production",
    v: "2,340",
    u: "bbl/d"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Gas rate",
    v: "3.4",
    u: "MMcf/d"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Depth",
    v: "14,200",
    u: "ft"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Pressure",
    v: "4,850",
    u: "psi"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Temperature",
    v: "245",
    u: "\xB0F"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Heating value",
    v: "1,030",
    u: "BTU/scf"
  })), units === 'metric' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Upi, {
    l: "Production",
    v: "371.9",
    u: "m\xB3/d"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Gas rate",
    v: "96,280",
    u: "m\xB3/d"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Depth",
    v: "4,328",
    u: "m"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Pressure",
    v: "33.4",
    u: "MPa"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Temperature",
    v: "118",
    u: "\xB0C"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Heating value",
    v: "38.4",
    u: "MJ/m\xB3"
  })), units === 'mixed' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Upi, {
    l: "Production",
    v: "2,340",
    u: "bbl/d"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Gas rate",
    v: "96,280",
    u: "m\xB3/d"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Depth",
    v: "14,200",
    u: "ft"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Pressure",
    v: "33.4",
    u: "MPa"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Temperature",
    v: "245",
    u: "\xB0F"
  }), /*#__PURE__*/React.createElement(Upi, {
    l: "Heating value",
    v: "38.4",
    u: "MJ/m\xB3"
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Currency & finance",
    s: "Reporting currency and FX source for cross-region comparisons."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Reporting currency"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: currency + ' — US Dollar',
    onChange: e => {
      setCurrency(e.target.value.split(' ')[0]);
      markDirty();
    },
    options: ['USD — US Dollar', 'CAD — Canadian Dollar', 'EUR — Euro', 'GBP — British Pound', 'MXN — Mexican Peso']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "FX source"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "ECB \xB7 daily fixing",
    options: ['ECB · daily fixing', 'Bloomberg BFIX', 'OANDA', 'Workspace manual override']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Price benchmark"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "WTI Cushing \xB7 CME front-month",
    options: ['WTI Cushing · CME front-month', 'Brent · ICE front-month', 'HH · CME front-month', 'Workspace blend']
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Time & calendar",
    s: "Date display, time format, and fiscal year start."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Date format"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: dateFmt,
    onChange: e => {
      setDateFmt(e.target.value);
      markDirty();
    },
    options: ['Oct 3, 2025', '2025-10-03', '3 Oct 2025', '10/03/2025', '03/10/2025']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Time format"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg-row",
    style: {
      width: 'fit-content'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: 'seg' + (timeFmt === '12h' ? ' on' : ''),
    onClick: () => {
      setTimeFmt('12h');
      markDirty();
    }
  }, "12-hour"), /*#__PURE__*/React.createElement("button", {
    className: 'seg' + (timeFmt === '24h' ? ' on' : ''),
    onClick: () => {
      setTimeFmt('24h');
      markDirty();
    }
  }, "24-hour"))), /*#__PURE__*/React.createElement(Field, {
    label: "Fiscal year start"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: fiscal,
    onChange: e => {
      setFiscal(e.target.value);
      markDirty();
    },
    options: ['January (calendar year)', 'April', 'July', 'October']
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Week starts on"
  }, /*#__PURE__*/React.createElement("div", {
    className: "seg-row",
    style: {
      width: 'fit-content'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "seg on"
  }, "Sunday"), /*#__PURE__*/React.createElement("button", {
    className: "seg"
  }, "Monday")))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Regions of interest",
    s: "Filters, search, and dashboards default to these basins and plays. Selecting nothing means everything is visible.",
    actions: /*#__PURE__*/React.createElement("span", {
      className: "pill pill--brand"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }), Object.values(selectedBasins).filter(Boolean).length, " selected")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content basin-map-wrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "basin-map"
  }, /*#__PURE__*/React.createElement("svg", {
    viewBox: "0 0 700 460",
    "aria-hidden": "true"
  }, /*#__PURE__*/React.createElement("path", {
    className: "us-outline",
    d: "M60,200 L80,150 L120,110 L160,90 L210,80 L260,70 L320,75 L370,65 L420,60 L470,68 L520,75 L570,82 L610,95 L630,125 L640,155 L645,185 L640,215 L630,240 L620,260 L600,275 L580,290 L605,310 L620,330 L615,360 L595,385 L555,400 L500,405 L450,400 L395,395 L340,395 L290,400 L240,398 L195,380 L160,355 L130,330 L105,300 L85,265 L70,235 Z"
  }), BASINS.map(b => /*#__PURE__*/React.createElement("g", {
    key: b.id
  }, /*#__PURE__*/React.createElement("rect", {
    x: b.x,
    y: b.y,
    width: b.w,
    height: b.h,
    rx: "6",
    className: 'basin-shape' + (selectedBasins[b.id] ? ' selected' : ''),
    onClick: () => toggleBasin(b.id)
  }), /*#__PURE__*/React.createElement("text", {
    x: b.x + b.w / 2,
    y: b.y + b.h / 2 + 3.5,
    className: "basin-label",
    fill: selectedBasins[b.id] ? '#fff' : 'currentColor'
  }, b.id.split('-')[0].slice(0, 8).toUpperCase()))))), /*#__PURE__*/React.createElement("div", {
    className: "basin-list"
  }, BASINS.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.id,
    className: 'bi' + (selectedBasins[b.id] ? ' selected' : ''),
    onClick: () => toggleBasin(b.id)
  }, /*#__PURE__*/React.createElement("span", {
    className: "box"
  }, selectedBasins[b.id] && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 7,
      height: 3,
      borderLeft: '2px solid #fff',
      borderBottom: '2px solid #fff',
      transform: 'rotate(-45deg) translate(1px, -1px)'
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "n"
  }, b.label), /*#__PURE__*/React.createElement("span", {
    className: "c"
  }, b.state))))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Default commodity"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: commodity,
    onChange: e => {
      setCommodity(e.target.value);
      markDirty();
    },
    options: ['Oil (crude + condensate)', 'Gas (dry + wet)', 'NGL', 'BOE (6:1)', 'BOE (20:1)', 'Power (MWh)']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Default map basemap"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Satellite \u2014 sectional grid",
    options: ['Light terrain', 'Dark terrain', 'Satellite — sectional grid', 'Geological — formation tops']
  })))));
}

// -----------------------------------------------------------------------------
// 6. APPEARANCE
// -----------------------------------------------------------------------------
const ACCENT_OPTIONS = ['#3c8321', '#1f648d', '#5b399e', '#c4622d', '#9b1d4d', '#0e7c66'];
function AppearanceSection({
  tweaks,
  markDirty
}) {
  const setT = tweaks.setTweak;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "06 \xB7 Appearance",
    title: "Look & feel",
    sub: "Light mode, dark mode, or follow your system setting. Theme changes apply immediately \u2014 no save needed."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Theme",
    s: "Light works in bright rooms and on printouts. Dark is built for trading floors and dim ops centers. System follows your OS.",
    actions: /*#__PURE__*/React.createElement("div", {
      className: "seg-row"
    }, /*#__PURE__*/React.createElement("button", {
      className: 'seg' + (tweaks.themePicker === 'cards' ? ' on' : ''),
      onClick: () => setT('themePicker', 'cards')
    }, "Preview cards"), /*#__PURE__*/React.createElement("button", {
      className: 'seg' + (tweaks.themePicker === 'swatches' ? ' on' : ''),
      onClick: () => setT('themePicker', 'swatches')
    }, "Swatches"))
  }), tweaks.themePicker === 'cards' ? /*#__PURE__*/React.createElement("div", {
    className: "theme-cards"
  }, [{
    id: 'light',
    label: 'Light',
    sub: 'Default'
  }, {
    id: 'dark',
    label: 'Dark',
    sub: 'Trader'
  }, {
    id: 'system',
    label: 'System',
    sub: 'Auto'
  }].map(o => /*#__PURE__*/React.createElement("div", {
    key: o.id,
    className: 'theme-card ' + o.id + (tweaks.theme === o.id ? ' selected' : ''),
    onClick: () => setT('theme', o.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "preview"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mini-side"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot act"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", {
    className: "dot"
  })), /*#__PURE__*/React.createElement("div", {
    className: "mini-main"
  }, /*#__PURE__*/React.createElement("span", {
    className: "mini-bar"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mini-bar short"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mini-bar shorter"
  }), /*#__PURE__*/React.createElement("span", {
    className: "mini-card"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "lbl-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: 'radio' + (tweaks.theme === o.id ? ' on' : '')
  }), /*#__PURE__*/React.createElement("span", {
    className: "nm"
  }, o.label), /*#__PURE__*/React.createElement("span", {
    className: "sub"
  }, o.sub))))) : /*#__PURE__*/React.createElement("div", {
    className: "theme-swatches"
  }, [{
    id: 'light',
    label: 'Light'
  }, {
    id: 'dark',
    label: 'Dark'
  }, {
    id: 'system',
    label: 'System'
  }].map(o => /*#__PURE__*/React.createElement("div", {
    key: o.id,
    className: 'theme-sw' + (tweaks.theme === o.id ? ' selected' : ''),
    onClick: () => setT('theme', o.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: 'chip ' + o.id
  }, /*#__PURE__*/React.createElement("span", {
    className: "check"
  })), /*#__PURE__*/React.createElement("span", {
    className: "lbl"
  }, o.label))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Sidebar default",
    s: "What state the primary nav sidebar opens in."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content seg-row",
    style: {
      width: 'fit-content'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "seg"
  }, "Expanded (240px)"), /*#__PURE__*/React.createElement("button", {
    className: "seg on"
  }, "Icons only (56px)"), /*#__PURE__*/React.createElement("button", {
    className: "seg"
  }, "Remember last"))));
}

// -----------------------------------------------------------------------------
// Shared helpers
// -----------------------------------------------------------------------------
function PageHead({
  eyebrow,
  title,
  sub
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "s-page-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-page-title"
  }, title), sub && /*#__PURE__*/React.createElement("p", {
    className: "s-page-sub"
  }, sub));
}
function CardHead({
  h,
  s,
  actions
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "card-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "card-title"
  }, h), s && /*#__PURE__*/React.createElement("div", {
    className: "card-description"
  }, s), actions && actions);
}
function Field({
  label,
  sub,
  children,
  style
}) {
  const autoId = React.useId();
  let child = children;
  if (React.isValidElement(children) && !children.props.id) {
    child = React.cloneElement(children, {
      id: autoId
    });
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "row",
    style: style
  }, /*#__PURE__*/React.createElement("label", {
    className: "lbl",
    htmlFor: autoId
  }, label, sub && /*#__PURE__*/React.createElement("span", {
    className: "lbl-sub",
    style: {
      display: 'block',
      fontWeight: 400
    }
  }, sub)), child);
}
function SelectBox({
  id,
  value,
  onChange,
  options
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "sel-wrap"
  }, /*#__PURE__*/React.createElement("select", {
    id: id,
    className: "sel",
    value: value,
    onChange: onChange || (() => {})
  }, options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o
  }, o))), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-down"
  }));
}
function Toggle({
  label,
  defaultOn,
  onChange,
  markDirty
}) {
  const [on, setOn] = useS(defaultOn);
  const handle = () => {
    setOn(o => !o);
    if (onChange) onChange();
    if (markDirty) markDirty();
  };
  const input = /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    className: "switch-input",
    checked: on,
    onChange: handle,
    "aria-label": label || 'Toggle'
  });
  if (label) {
    return /*#__PURE__*/React.createElement("label", {
      className: "switch-wrapper"
    }, input, /*#__PURE__*/React.createElement("span", null, label));
  }
  return input;
}
function Upi({
  l,
  v,
  u
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "upi"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, l), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, v, /*#__PURE__*/React.createElement("span", {
    className: "u"
  }, u)));
}
function TeamIdentitySection({
  markDirty
}) {
  const [defaultShare, setDefaultShare] = useS('workspace');
  const [linkAccess, setLinkAccess] = useS('viewer');
  const [domainLock, setDomainLock] = useS(true);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Team \xB7 01",
    title: "Workspace identity & sharing",
    sub: "The name, logo, and default sharing posture of the Permian Analytics workspace. Visible to everyone on the team."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Workspace identity",
    s: "Members see this name across the product and in the audit log.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "external-link"
    }), "View audit log")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Workspace name"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp",
    defaultValue: "Permian Analytics"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "URL slug"
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp inp-mono",
    defaultValue: "permian-analytics"
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Logo (optional)"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-md)',
      background: 'var(--accent-brand)',
      color: '#fff',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600
    }
  }, "PA"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "upload"
  }), "Upload"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Remove"))), /*#__PURE__*/React.createElement(Field, {
    label: "Primary contact"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Jason Shannon (you)",
    options: ['Jason Shannon (you)', 'Maria Velez', 'David Park']
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Sharing defaults",
    s: "What happens when someone shares a view, a flow, or a dashboard in this workspace."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-1"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Default visibility for new artifacts",
    sub: "Applies to saved views, dashboards, and screening results."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 10,
      flexWrap: 'wrap'
    }
  }, [{
    id: 'private',
    icon: 'lock',
    label: 'Private',
    sub: 'Only the creator'
  }, {
    id: 'team',
    icon: 'users',
    label: 'Team',
    sub: 'Direct teammates'
  }, {
    id: 'workspace',
    icon: 'briefcase',
    label: 'Workspace',
    sub: 'Everyone in Permian Analytics'
  }, {
    id: 'org',
    icon: 'building-2',
    label: 'Organization',
    sub: 'All Enverus users'
  }].map(opt => /*#__PURE__*/React.createElement("div", {
    key: opt.id,
    onClick: () => {
      setDefaultShare(opt.id);
      markDirty();
    },
    style: {
      flex: 1,
      minWidth: 140,
      padding: 12,
      borderRadius: 'var(--radius-md)',
      border: '1px solid ' + (defaultShare === opt.id ? 'var(--accent-brand)' : 'var(--surface-border-elevated)'),
      background: defaultShare === opt.id ? 'rgba(86,188,47,.08)' : 'var(--surface-base)',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: opt.icon,
    style: {
      width: 14,
      height: 14,
      color: defaultShare === opt.id ? 'var(--accent-brand)' : 'var(--text-muted)'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, opt.label), /*#__PURE__*/React.createElement("span", {
    className: "radio",
    style: {
      marginLeft: 'auto'
    }
  }, defaultShare === opt.id && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 8,
      height: 8,
      borderRadius: '50%',
      background: 'var(--accent-brand)'
    }
  }))), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, opt.sub))))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Default link permission",
    sub: "When someone copies a share link."
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: linkAccess === 'viewer' ? 'Viewer (read-only)' : 'Editor (can modify)',
    onChange: e => {
      setLinkAccess(e.target.value.startsWith('Viewer') ? 'viewer' : 'editor');
      markDirty();
    },
    options: ['Viewer (read-only)', 'Editor (can modify)', 'Owner (can re-share)']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "External sharing"
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Allow sharing outside enverus.com",
    defaultOn: false,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Require domain allow-list",
    defaultOn: domainLock,
    onChange: () => {
      setDomainLock(!domainLock);
      markDirty();
    },
    markDirty: markDirty
  }))))));
}
function TeamMembersSection({
  markDirty
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Team \xB7 02",
    title: "Members, roles & permissions",
    sub: `${TEAM.length} people in Permian Analytics. Add or remove members and adjust what each role can do.`
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Members",
    s: `${TEAM.length} people in Permian Analytics · 4 seats remaining`,
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "user-plus"
    }), "Invite")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/React.createElement("table", {
    className: "team-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Name"), /*#__PURE__*/React.createElement("th", null, "Role"), /*#__PURE__*/React.createElement("th", null, "Status"), /*#__PURE__*/React.createElement("th", null, "Last active"), /*#__PURE__*/React.createElement("th", null))), /*#__PURE__*/React.createElement("tbody", null, TEAM.map(p => /*#__PURE__*/React.createElement("tr", {
    key: p.email
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "who"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av",
    style: {
      background: p.av
    }
  }, p.initials), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, p.name, " ", p.you && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 400,
      fontSize: 11.5
    }
  }, "\xB7 you")), /*#__PURE__*/React.createElement("div", {
    className: "em"
  }, p.email)))), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: 'pill ' + (p.role === 'Owner' ? 'pill--brand' : p.role === 'Admin' ? 'pill--info' : ''),
    style: {
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: 10
    }
  }, p.role)), /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("span", {
    className: 'active-dot ' + (p.status === 'active' ? '' : p.status)
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: p.status === 'active' ? 'var(--text-body)' : 'var(--text-muted)',
      fontSize: 12.5
    }
  }, p.status === 'active' ? 'Active' : p.status === 'idle' ? 'Idle' : 'Offline')), /*#__PURE__*/React.createElement("td", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, p.last), /*#__PURE__*/React.createElement("td", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    "aria-label": "More actions"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "more-horizontal"
  }))))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Roles & permissions",
    s: "What each role can do across major surfaces. Custom roles are available on Enterprise plans.",
    actions: /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "New role")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content"
  }, /*#__PURE__*/React.createElement("table", {
    className: "perm-matrix"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "first"
  }, "Area"), /*#__PURE__*/React.createElement("th", null, "Owner"), /*#__PURE__*/React.createElement("th", null, "Admin"), /*#__PURE__*/React.createElement("th", null, "Editor"), /*#__PURE__*/React.createElement("th", null, "Viewer"))), /*#__PURE__*/React.createElement("tbody", null, PERM_ROWS.map(r => /*#__PURE__*/React.createElement("tr", {
    key: r.area
  }, /*#__PURE__*/React.createElement("td", {
    className: "first"
  }, r.area), ['Owner', 'Admin', 'Editor', 'Viewer'].map(role => {
    const v = r[role];
    const cls = v === 'full' || v === 'edit' ? 'perm-yes' : v === 'none' ? 'perm-no' : 'perm-partial';
    return /*#__PURE__*/React.createElement("td", {
      key: role
    }, /*#__PURE__*/React.createElement("span", {
      className: cls,
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        fontSize: 11.5,
        fontWeight: 500,
        fontFamily: 'var(--font-mono)'
      }
    }, v === 'full' && /*#__PURE__*/React.createElement(Icon, {
      name: "circle-dot",
      style: {
        width: 11,
        height: 11
      }
    }), v === 'edit' && /*#__PURE__*/React.createElement(Icon, {
      name: "edit-2",
      style: {
        width: 11,
        height: 11
      }
    }), v === 'read' && /*#__PURE__*/React.createElement(Icon, {
      name: "eye",
      style: {
        width: 11,
        height: 11
      }
    }), v === 'partial' && /*#__PURE__*/React.createElement(Icon, {
      name: "minus",
      style: {
        width: 11,
        height: 11
      }
    }), v === 'self' && /*#__PURE__*/React.createElement(Icon, {
      name: "user",
      style: {
        width: 11,
        height: 11
      }
    }), PERM_LABELS[v]));
  }))))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Pending invitations",
    s: "People who've been invited but haven't joined yet.",
    actions: /*#__PURE__*/React.createElement("span", {
      className: "pill pill--warn"
    }, /*#__PURE__*/React.createElement("span", {
      className: "dot"
    }), "2 pending")
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content invite-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "invite-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  })), /*#__PURE__*/React.createElement("span", {
    className: "em"
  }, "k.thompson@enverus.com"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, "Editor"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, "Sent 2 days ago"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Resend"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    style: {
      color: 'var(--danger-text)'
    }
  }, "Revoke"))), /*#__PURE__*/React.createElement("div", {
    className: "invite-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ic"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  })), /*#__PURE__*/React.createElement("span", {
    className: "em"
  }, "consultant@external-firm.com"), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, "Viewer \xB7 ext."), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, "Sent 5h ago"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 4,
      justifyContent: 'flex-end'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm"
  }, "Resend"), /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    size: "sm",
    style: {
      color: 'var(--danger-text)'
    }
  }, "Revoke"))))));
}
function TeamDefaultsSection({
  markDirty
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Team \xB7 03",
    title: "Defaults for new members",
    sub: "When someone joins Permian Analytics, these settings apply by default. Individuals can override their own preferences in the User scope."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Default data preferences",
    s: "Units, currency, and basins of interest for new members."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-3"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Unit system"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Imperial",
    options: ['Imperial', 'Metric', 'Mixed (industry)']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Reporting currency"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "USD \u2014 US Dollar",
    options: ['USD — US Dollar', 'CAD — Canadian Dollar', 'EUR — Euro']
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Default commodity"
  }, /*#__PURE__*/React.createElement(SelectBox, {
    value: "Oil (crude + condensate)",
    options: ['Oil (crude + condensate)', 'Gas (dry + wet)', 'BOE (6:1)']
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Default basins of interest",
    sub: "New members start with these basins pre-selected; they can change them in their User scope."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, ['Permian — Midland', 'Permian — Delaware', 'Eagle Ford', 'Bakken', 'Haynesville', 'Marcellus / Utica', 'DJ / Niobrara', 'Anadarko / SCOOP'].map((b, i) => /*#__PURE__*/React.createElement("span", {
    key: b,
    className: 'pill' + (i < 4 ? ' pill--brand' : ''),
    style: {
      cursor: 'pointer'
    }
  }, i < 4 ? /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    style: {
      width: 11,
      height: 11
    }
  }) : /*#__PURE__*/React.createElement(Icon, {
    name: "plus",
    style: {
      width: 11,
      height: 11
    }
  }), b))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Notification policy",
    s: "Mandatory alerts that new members can't opt out of, plus default channel settings."
  }), /*#__PURE__*/React.createElement(Field, {
    label: "Mandatory alerts",
    sub: "Members can mute these temporarily, but not disable them."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [{
    name: 'System outages',
    desc: 'Service degradations affecting your workspace',
    on: true,
    mandatory: true
  }, {
    name: 'Critical price moves',
    desc: 'WTI / HH ±3 σ daily move',
    on: true,
    mandatory: true
  }, {
    name: 'Security events',
    desc: 'Failed sign-in attempts, MFA changes',
    on: true,
    mandatory: true
  }, {
    name: 'New permits in saved AOI',
    desc: 'Recommended; members can disable',
    on: true,
    mandatory: false
  }, {
    name: 'Workflow failures',
    desc: 'Recommended; members can disable',
    on: true,
    mandatory: false
  }].map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: p.name,
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 110px 60px',
      gap: 12,
      alignItems: 'center',
      padding: '10px 14px',
      border: '1px solid var(--surface-border-elevated)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-base)'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)',
      marginTop: 2
    }
  }, p.desc)), /*#__PURE__*/React.createElement("span", {
    className: 'pill ' + (p.mandatory ? 'pill--danger' : 'pill--brand'),
    style: {
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: 10
    }
  }, p.mandatory ? 'Required' : 'Recommended'), /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    role: "switch",
    className: "switch-input",
    checked: p.on,
    readOnly: true,
    "aria-label": p.name
  }))))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Default delivery channels",
    sub: "When a member joins, these channels are turned on."
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "In-app",
    defaultOn: true,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Email",
    defaultOn: true,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Mobile push",
    defaultOn: false,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Daily digest",
    defaultOn: true,
    markDirty: markDirty
  }))), /*#__PURE__*/React.createElement(Field, {
    label: "Digest default time",
    sub: "Members can change this in their User scope."
  }, /*#__PURE__*/React.createElement("input", {
    className: "inp inp-mono",
    defaultValue: "07:30"
  })))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Default saved views",
    s: "Pin these views so they're available to every new member when they open each module."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, [{
    mod: 'Wells',
    view: 'Permian — Midland · Horizontal · Last 90d'
  }, {
    mod: 'Production',
    view: 'Tier-1 operators · 3-stream'
  }, {
    mod: 'Rigs',
    view: 'Permian rig count weekly'
  }, {
    mod: 'Screening',
    view: 'Acquisition screen — Midland Tier 1'
  }].map(d => /*#__PURE__*/React.createElement("div", {
    key: d.mod,
    style: {
      display: 'grid',
      gridTemplateColumns: '100px 1fr 32px',
      gap: 12,
      alignItems: 'center',
      padding: '10px 14px',
      border: '1px solid var(--surface-border-elevated)',
      borderRadius: 'var(--radius-md)',
      background: 'var(--surface-base)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)',
      letterSpacing: '0.06em',
      textTransform: 'uppercase'
    }
  }, d.mod), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-body)'
    }
  }, d.view), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    "aria-label": "Edit"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "edit-2"
  })))))));
}
Object.assign(window, {
  ProfileSection,
  NotificationsSection,
  SavedViewsSection,
  TeamSection,
  DataPrefsSection,
  AppearanceSection,
  TeamIdentitySection,
  TeamMembersSection,
  TeamDefaultsSection,
  PageHead,
  CardHead,
  Field,
  SelectBox,
  Toggle,
  Upi,
  TEAM,
  PERM_ROWS,
  PERM_LABELS
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/settings-sections.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/settings-shell.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
// settings-shell.jsx
// Top bar, primary nav rail, and the outer chrome of the settings page.

const {
  useState,
  useEffect,
  useRef
} = React;
const PRIMARY_NAV = [{
  id: 'one',
  icon: 'home',
  label: 'ONE'
}, {
  id: 'flows',
  icon: 'workflow',
  label: 'Flows'
}, {
  id: 'agents',
  icon: 'bot',
  label: 'Agent Studio'
}, {
  id: 'apps',
  icon: 'layout-grid',
  label: 'Applications'
}, {
  id: 'activity',
  icon: 'activity',
  label: 'Activity'
}, {
  id: 'hub',
  icon: 'lightbulb',
  label: 'Innovation Hub'
}];
const SETTINGS_SECTIONS = [{
  group: 'You'
}, {
  id: 'profile',
  icon: 'user',
  label: 'Profile & account',
  count: 5
}, {
  id: 'notifs',
  icon: 'bell',
  label: 'Notifications',
  count: 14
}, {
  id: 'views',
  icon: 'bookmark',
  label: 'Saved views',
  count: 23
}, {
  group: 'Workspace'
}, {
  id: 'team',
  icon: 'users',
  label: 'Team & roles',
  count: 12
}, {
  id: 'data',
  icon: 'database',
  label: 'Data preferences',
  count: null
}, {
  id: 'appearance',
  icon: 'palette',
  label: 'Appearance',
  count: null
}];

// Render a Lucide icon by name. Crucial: we inject the SVG INSIDE a
// React-owned <span> (innerHTML), instead of letting lucide.createIcons()
// replace the <i data-lucide> element itself. Letting lucide do the swap
// breaks React's fiber tree (it still references the original <i>) and
// surfaces as `removeChild: not a child` errors on re-render.
//
// lucide.icons[Name] is a flat array of [tag, attrs] tuples representing
// the children of the SVG — no SVG root in the data. We wrap them in one
// with the lucide default attrs (24×24 viewBox, stroke-width 2, etc.).
const LUCIDE_DEFAULTS = ' xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 24 24"' + ' fill="none" stroke="currentColor" stroke-width="2"' + ' stroke-linecap="round" stroke-linejoin="round"';
function Icon({
  name,
  ...rest
}) {
  const ref = useRef();
  useEffect(() => {
    if (!ref.current) return;
    const lib = window.lucide;
    if (!lib || !lib.icons) {
      ref.current.innerHTML = '';
      return;
    }
    const pn = name.split('-').map(s => s ? s[0].toUpperCase() + s.slice(1) : '').join('');
    const children = lib.icons[pn] || lib.icons[pn + 'Icon'];
    if (!children || !Array.isArray(children)) {
      ref.current.innerHTML = '';
      return;
    }
    const body = children.map(([tag, attrs]) => {
      const a = Object.entries(attrs || {}).map(([k, v]) => `${k}="${String(v).replace(/"/g, '&quot;')}"`).join(' ');
      return `<${tag}${a ? ' ' + a : ''}/>`;
    }).join('');
    ref.current.innerHTML = `<svg${LUCIDE_DEFAULTS}>${body}</svg>`;
  }, [name]);
  return /*#__PURE__*/React.createElement("span", _extends({
    ref: ref,
    "data-lucide": name,
    className: "lucide-icon",
    "aria-hidden": "true"
  }, rest));
}
function TopBar({
  user,
  role,
  onAvatar
}) {
  const [dark, setDark] = React.useState(() => document.documentElement.classList.contains('dark'));
  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle('dark', next);
    document.documentElement.classList.toggle('dark-theme', next);
    document.body.classList.toggle('dark', next);
    document.body.classList.toggle('dark-theme', next);
  };
  return /*#__PURE__*/React.createElement(Header, {
    dark: dark,
    onToggleTheme: toggleTheme,
    onSearch: () => {}
  });
}
function SideBar() {
  /* Dead code — not mounted anywhere; the real rail is RailItem in shell.jsx */
  return /*#__PURE__*/React.createElement("div", {
    className: "side"
  }, PRIMARY_NAV.map(n => /*#__PURE__*/React.createElement("button", {
    key: n.id,
    type: "button",
    className: "navico",
    "aria-label": n.label
  }, /*#__PURE__*/React.createElement(Icon, {
    name: n.icon
  }), /*#__PURE__*/React.createElement("span", {
    className: "tip"
  }, n.label))), /*#__PURE__*/React.createElement("div", {
    className: "grow"
  }), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "navico active",
    "aria-label": "Settings"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "settings"
  }), /*#__PURE__*/React.createElement("span", {
    className: "tip"
  }, "Settings")));
}
function SettingsRail({
  active,
  onPick,
  sections,
  scopeLabel,
  scopeSubtitle
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "s-rail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "s-rail-head"
  }, /*#__PURE__*/React.createElement("span", {
    className: "s-rail-eyebrow"
  }, scopeLabel ? scopeLabel + ' scope' : 'Customize ONE'), /*#__PURE__*/React.createElement("span", {
    className: "s-rail-title"
  }, scopeSubtitle || 'Settings')), /*#__PURE__*/React.createElement("div", {
    className: "s-rail-search"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "search"
  }), /*#__PURE__*/React.createElement("input", {
    placeholder: "Find a setting\u2026"
  }), /*#__PURE__*/React.createElement("kbd", null, "\u2318K")), /*#__PURE__*/React.createElement("div", {
    className: "s-rail-nav"
  }, sections.map((s, i) => {
    if (s.group) return /*#__PURE__*/React.createElement("div", {
      key: 'g' + i,
      className: "s-rail-group"
    }, s.group);
    return /*#__PURE__*/React.createElement("div", {
      key: s.id,
      className: 's-rail-item' + (active === s.id ? ' active' : ''),
      onClick: () => onPick(s.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: s.icon
    }), /*#__PURE__*/React.createElement("span", null, s.label), s.count != null && /*#__PURE__*/React.createElement("span", {
      className: "meta"
    }, s.count));
  })));
}
function SaveBar({
  show,
  dirtyCount,
  onSave,
  onDiscard
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'save-bar' + (show ? ' show' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "left"
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontWeight: 500
    }
  }, dirtyCount), " unsaved ", dirtyCount === 1 ? 'change' : 'changes')), /*#__PURE__*/React.createElement("div", {
    className: "right"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "ghost",
    onClick: onDiscard
  }, "Discard"), /*#__PURE__*/React.createElement(Button, {
    variant: "default",
    onClick: onSave
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check"
  }), "Save changes")));
}
function Toast({
  show,
  message
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: 'toast' + (show ? ' show' : '')
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check-circle-2"
  }), /*#__PURE__*/React.createElement("span", null, message));
}
function AvatarDrawer({
  open,
  onClose,
  user,
  role,
  onJumpTo
}) {
  const drawerRef = React.useRef(null);
  const triggerRef = React.useRef(null);
  React.useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement;
      const t = setTimeout(() => {
        const first = drawerRef.current && drawerRef.current.querySelector('button, [href], [tabindex]:not([tabindex="-1"])');
        if (first) first.focus();
      }, 0);
      return () => clearTimeout(t);
    } else if (triggerRef.current) {
      triggerRef.current.focus();
    }
  }, [open]);
  const handleKeyDown = e => {
    if (e.key === 'Escape') {
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !drawerRef.current) return;
    const focusables = drawerRef.current.querySelectorAll('button, [href], [tabindex]:not([tabindex="-1"])');
    if (!focusables.length) return;
    const first = focusables[0],
      last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: 'drawer-scrim' + (open ? ' open' : ''),
    onClick: onClose,
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", _extends({
    className: 'drawer' + (open ? ' open' : ''),
    ref: drawerRef,
    role: "dialog",
    "aria-modal": "true",
    "aria-labelledby": "avatar-drawer-title",
    onKeyDown: handleKeyDown
  }, !open ? {
    'aria-hidden': 'true',
    inert: ''
  } : {}), /*#__PURE__*/React.createElement("div", {
    className: "drawer-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "av",
    "aria-hidden": "true"
  }, user.initials), /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm",
    id: "avatar-drawer-title"
  }, user.name), /*#__PURE__*/React.createElement("div", {
    className: "em"
  }, user.email)), /*#__PURE__*/React.createElement("button", {
    className: "iconbtn",
    onClick: onClose,
    "aria-label": "Close"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "x"
  }))), role && /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '10px 20px',
      borderBottom: '1px solid var(--border)',
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "role-badge",
    style: {
      margin: 0
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "dot"
  }), ROLE_LABEL[role]), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)'
    }
  }, ROLE_DESC[role].split('.')[0], ".")), /*#__PURE__*/React.createElement("div", {
    className: "drawer-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "drawer-section"
  }, "User scope"), /*#__PURE__*/React.createElement("div", {
    className: "drawer-link active",
    onClick: () => {
      onJumpTo('profile');
      onClose();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "user"
  }), /*#__PURE__*/React.createElement("span", null, "Profile & account")), /*#__PURE__*/React.createElement("div", {
    className: "drawer-link",
    onClick: () => {
      onJumpTo('persona');
      onClose();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sparkles"
  }), /*#__PURE__*/React.createElement("span", null, "Persona & instructions")), /*#__PURE__*/React.createElement("div", {
    className: "drawer-link",
    onClick: () => {
      onJumpTo('notifs');
      onClose();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "bell"
  }), /*#__PURE__*/React.createElement("span", null, "Notifications")), /*#__PURE__*/React.createElement("div", {
    className: "drawer-link",
    onClick: () => {
      onJumpTo('data');
      onClose();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "database"
  }), /*#__PURE__*/React.createElement("span", null, "Data preferences")), /*#__PURE__*/React.createElement("div", {
    className: "drawer-link",
    onClick: () => {
      onJumpTo('appearance');
      onClose();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "palette"
  }), /*#__PURE__*/React.createElement("span", null, "Appearance")), /*#__PURE__*/React.createElement("div", {
    className: "drawer-section"
  }, "Team scope"), /*#__PURE__*/React.createElement("div", {
    className: "drawer-link",
    onClick: () => {
      onJumpTo('team-identity');
      onClose();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "briefcase"
  }), /*#__PURE__*/React.createElement("span", null, "Identity & sharing")), /*#__PURE__*/React.createElement("div", {
    className: "drawer-link",
    onClick: () => {
      onJumpTo('team-members');
      onClose();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "users"
  }), /*#__PURE__*/React.createElement("span", null, "Members & roles")), /*#__PURE__*/React.createElement("div", {
    className: "drawer-link",
    onClick: () => {
      onJumpTo('team-defaults');
      onClose();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "sliders"
  }), /*#__PURE__*/React.createElement("span", null, "Member defaults")), /*#__PURE__*/React.createElement("div", {
    className: "drawer-section"
  }, "Organization scope"), /*#__PURE__*/React.createElement("div", {
    className: "drawer-link",
    onClick: () => {
      onJumpTo('org-workspaces');
      onClose();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "building-2"
  }), /*#__PURE__*/React.createElement("span", null, "Workspaces & teams"), role !== 'org_admin' && /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    style: {
      marginLeft: 'auto',
      width: 13,
      height: 13,
      color: 'var(--text-muted)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "drawer-link",
    onClick: () => {
      onJumpTo('org-sso');
      onClose();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield-check"
  }), /*#__PURE__*/React.createElement("span", null, "Identity & access"), role !== 'org_admin' && /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    style: {
      marginLeft: 'auto',
      width: 13,
      height: 13,
      color: 'var(--text-muted)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "drawer-link",
    onClick: () => {
      onJumpTo('org-audit');
      onClose();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "history"
  }), /*#__PURE__*/React.createElement("span", null, "Audit log"), role !== 'org_admin' && /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    style: {
      marginLeft: 'auto',
      width: 13,
      height: 13,
      color: 'var(--text-muted)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    className: "drawer-link",
    onClick: () => {
      onJumpTo('org-billing');
      onClose();
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "credit-card"
  }), /*#__PURE__*/React.createElement("span", null, "Billing & seats"), role !== 'org_admin' && /*#__PURE__*/React.createElement(Icon, {
    name: "lock",
    style: {
      marginLeft: 'auto',
      width: 13,
      height: 13,
      color: 'var(--text-muted)'
    }
  }))), /*#__PURE__*/React.createElement("div", {
    className: "drawer-foot"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "log-out"
  }), "Sign out"))));
}
Object.assign(window, {
  Icon,
  TopBar,
  SideBar,
  SettingsRail,
  SaveBar,
  Toast,
  AvatarDrawer,
  PRIMARY_NAV,
  SETTINGS_SECTIONS
});

// ----------------------------------------------------------------------------
// Scope model — three customization layers
// ----------------------------------------------------------------------------
//   USER         TEAM                 ORG
//   me           Permian Analytics    Enverus, all workspaces
//
// Role hierarchy & access:
//   member      → user:edit, team:read,  org:locked
//   team_admin  → user:edit, team:edit,  org:read
//   org_admin   → user:edit, team:edit,  org:edit
//
// Access values: 'edit' | 'read' | 'locked'
// ----------------------------------------------------------------------------

const SCOPES = [{
  id: 'user',
  icon: 'user',
  label: 'User',
  sub: 'Just for you'
}, {
  id: 'team',
  icon: 'users',
  label: 'Team',
  sub: 'Permian Analytics workspace'
}, {
  id: 'org',
  icon: 'building-2',
  label: 'Organization',
  sub: 'Enverus — all workspaces'
}];
const ROLE_LABEL = {
  member: 'Member',
  team_admin: 'Team Admin',
  org_admin: 'Org Admin'
};
const ROLE_DESC = {
  member: 'You can edit your own settings. Team and Org settings are read-only.',
  team_admin: 'You can edit your own and Team settings. Organization settings are read-only.',
  org_admin: 'You have full access across all three scopes.'
};
function getAccess(role, scope) {
  if (scope === 'user') return 'edit';
  if (scope === 'team') return role === 'member' ? 'read' : 'edit';
  if (scope === 'org') return role === 'org_admin' ? 'edit' : role === 'team_admin' ? 'read' : 'locked';
  return 'locked';
}

// ----------------------------------------------------------------------------
// Scope switcher — large segmented control at the top of the settings page.
// Shows current access level per scope.
// ----------------------------------------------------------------------------
function ScopeSwitcher({
  scope,
  setScope,
  role
}) {
  return /*#__PURE__*/React.createElement(ToggleGroup, {
    style: {
      alignSelf: 'flex-start',
      marginBottom: 20
    }
  }, SCOPES.map(s => {
    const access = getAccess(role, s.id);
    const active = scope === s.id;
    return /*#__PURE__*/React.createElement(ToggleButton, {
      key: s.id,
      active: active,
      onClick: () => setScope(s.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: s.icon,
      size: 14,
      strokeWidth: 1.75
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 1
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 13,
        fontWeight: active ? 600 : 400
      }
    }, s.label), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 11,
        color: 'var(--muted-foreground)',
        fontWeight: 400
      }
    }, s.sub)), /*#__PURE__*/React.createElement("span", {
      style: {
        display: 'inline-flex',
        alignItems: 'center',
        gap: 4,
        fontSize: 11,
        marginLeft: 4
      }
    }, access === 'edit' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--primary)',
        display: 'inline-block'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--primary)',
        fontWeight: 500
      }
    }, "Full access")), access === 'read' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      style: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--warning, #ff9500)',
        display: 'inline-block'
      }
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--muted-foreground)',
        fontWeight: 400
      }
    }, "Read only")), access === 'locked' && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 11
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        color: 'var(--muted-foreground)',
        fontWeight: 400
      }
    }, "Restricted"))));
  }));
}

// ----------------------------------------------------------------------------
// Access banner — appears at the top of a scope when the user can't fully edit
// it. Read-only: amber strip with a Request CTA. Locked: ghosted strip with a
// "Contact admin" CTA. (When `access === 'edit'` no banner shows.)
// ----------------------------------------------------------------------------
function AccessBanner({
  access,
  scope,
  role
}) {
  if (access === 'edit') return null;
  if (access === 'read') {
    const target = scope === 'team' ? 'Team Admin' : 'Org Admin';
    return /*#__PURE__*/React.createElement("div", {
      className: "acc-banner acc-read"
    }, /*#__PURE__*/React.createElement("span", {
      className: "ico"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "eye"
    })), /*#__PURE__*/React.createElement("div", {
      className: "body"
    }, /*#__PURE__*/React.createElement("div", {
      className: "t"
    }, "View-only access"), /*#__PURE__*/React.createElement("div", {
      className: "s"
    }, "You're signed in as ", /*#__PURE__*/React.createElement("strong", null, ROLE_LABEL[role]), ". Only a ", /*#__PURE__*/React.createElement("strong", null, target), " can change settings on this scope.")), /*#__PURE__*/React.createElement("div", {
      className: "actions"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "user"
    }), "Contact admin"), /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "key-round"
    }), "Request access")));
  }

  // locked
  return /*#__PURE__*/React.createElement("div", {
    className: "acc-banner acc-locked"
  }, /*#__PURE__*/React.createElement("span", {
    className: "ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield"
  })), /*#__PURE__*/React.createElement("div", {
    className: "body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "t"
  }, "Restricted to organization administrators"), /*#__PURE__*/React.createElement("div", {
    className: "s"
  }, "Settings on this scope are governed by your Enverus org administrator. To request changes, contact the people below.")), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  }), "Email admin"), /*#__PURE__*/React.createElement(Button, {
    variant: "default",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "key-round"
  }), "Request access")));
}

// ----------------------------------------------------------------------------
// Locked scope screen — full-bleed empty state shown instead of section content
// when access === 'locked'. Surfaces the responsible admins so the user has
// somewhere concrete to go.
// ----------------------------------------------------------------------------
function LockedScopeScreen({
  scope
}) {
  const admins = [{
    name: 'Karen Ortiz',
    email: 'karen.ortiz@enverus.com',
    title: 'Director, Platform Operations',
    initials: 'KO',
    av: '#1f648d'
  }, {
    name: 'Mike Donnelly',
    email: 'mike.d@enverus.com',
    title: 'Sr. Manager, Data Governance',
    initials: 'MD',
    av: '#5b399e'
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "locked-scope"
  }, /*#__PURE__*/React.createElement("div", {
    className: "locked-card"
  }, /*#__PURE__*/React.createElement("span", {
    className: "big-ico"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shield"
  })), /*#__PURE__*/React.createElement("h2", null, "This scope is administrator-only"), /*#__PURE__*/React.createElement("p", null, "Organization settings \u2014 SSO, audit logs, billing, and data governance \u2014 are managed by your Enverus org administrators. You have access to", /*#__PURE__*/React.createElement("strong", null, " User"), " and read-only access to ", /*#__PURE__*/React.createElement("strong", null, "Team"), " settings."), /*#__PURE__*/React.createElement("div", {
    className: "admin-list"
  }, /*#__PURE__*/React.createElement("div", {
    className: "admin-list-h"
  }, "Your org administrators"), admins.map(a => /*#__PURE__*/React.createElement("div", {
    key: a.email,
    className: "admin-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "av",
    style: {
      background: a.av
    }
  }, a.initials), /*#__PURE__*/React.createElement("div", {
    className: "info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "nm"
  }, a.name), /*#__PURE__*/React.createElement("div", {
    className: "ti"
  }, a.title)), /*#__PURE__*/React.createElement("div", {
    className: "actions"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "mail"
  }), "Email"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "sm"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "message-square"
  }), "Message"))))), /*#__PURE__*/React.createElement("div", {
    className: "cta-row"
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "default"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "key-round"
  }), "Request org admin access"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "book-open"
  }), "Read the access policy"))));
}

// ----------------------------------------------------------------------------
// LockedField — wraps controls so they read-only with a lock indicator when
// the user lacks write access. Keeps the value visible for transparency.
// ----------------------------------------------------------------------------
function LockedFieldset({
  access,
  children
}) {
  if (access === 'edit') return children;
  return /*#__PURE__*/React.createElement("fieldset", {
    className: 'locked-fieldset ' + (access === 'read' ? 'is-readonly' : 'is-locked'),
    disabled: true
  }, children);
}
Object.assign(window, {
  SCOPES,
  ROLE_LABEL,
  ROLE_DESC,
  getAccess,
  ScopeSwitcher,
  AccessBanner,
  LockedScopeScreen,
  LockedFieldset
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/settings-shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/settings-skills.jsx
try { (() => {
// settings-skills.jsx
// User-scope: Skills library — the catalog of reusable AI skills the user can
// turn on for Ask ONE, Flows, and Agent Studio. Sits in the rail right under
// "Persona & instructions" since it's the other half of how the user shapes
// what the AI can do: persona says *how* it works, skills say *what* it can do.

const {
  useState: useSkS
} = React;

// ============================================================================
// Catalog
// ============================================================================
const SKILL_CATS = [{
  id: 'all',
  label: 'All',
  icon: 'layers'
}, {
  id: 'analysis',
  label: 'Analysis',
  icon: 'line-chart'
}, {
  id: 'land',
  label: 'Land & legal',
  icon: 'scroll-text'
}, {
  id: 'report',
  label: 'Reporting',
  icon: 'file-text'
}, {
  id: 'data',
  label: 'Data ops',
  icon: 'database'
}];
const SKILLS = [{
  id: 1,
  cat: 'analysis',
  icon: 'activity',
  name: 'Decline curve forecaster',
  desc: 'Fits Arps/Duong curves to producing wells and projects EUR with confidence bands.',
  enabled: true,
  source: 'Enverus',
  surfaces: ['Ask ONE', 'Flows'],
  runs: 142,
  lastUsed: '2h ago',
  badge: null
}, {
  id: 2,
  cat: 'analysis',
  icon: 'crosshair',
  name: 'Acquisition screener',
  desc: 'Ranks assets against your saved economic thresholds and flags Tier-1 acreage.',
  enabled: true,
  source: 'Permian Analytics',
  surfaces: ['Ask ONE', 'Flows', 'Agents'],
  runs: 87,
  lastUsed: 'Yesterday',
  badge: 'Team'
}, {
  id: 3,
  cat: 'analysis',
  icon: 'git-compare',
  name: 'Basin comparison',
  desc: 'Side-by-side well-economics and productivity across basins or operators.',
  enabled: true,
  source: 'Enverus',
  surfaces: ['Ask ONE'],
  runs: 54,
  lastUsed: '3d ago',
  badge: null
}, {
  id: 4,
  cat: 'land',
  icon: 'scroll-text',
  name: 'Lease document extractor',
  desc: 'Pulls royalty rates, expiration dates, and depth clauses from scanned leases.',
  enabled: true,
  source: 'Enverus',
  surfaces: ['Flows'],
  runs: 31,
  lastUsed: '1w ago',
  badge: 'Beta'
}, {
  id: 5,
  cat: 'land',
  icon: 'gavel',
  name: 'Title chain summarizer',
  desc: 'Reads a title chain and surfaces gaps, conflicts, and curative items.',
  enabled: false,
  source: 'Enverus',
  surfaces: ['Ask ONE', 'Flows'],
  runs: 0,
  lastUsed: 'Never',
  badge: 'Beta'
}, {
  id: 6,
  cat: 'report',
  icon: 'presentation',
  name: 'Investor deck builder',
  desc: 'Turns a screening result into a branded PowerPoint using your org template.',
  enabled: true,
  source: 'Permian Analytics',
  surfaces: ['Flows'],
  runs: 23,
  lastUsed: '4d ago',
  badge: 'Team'
}, {
  id: 7,
  cat: 'report',
  icon: 'mic',
  name: 'Market brief narrator',
  desc: 'Writes a morning narrative on rig, price, and permit movement in your voice.',
  enabled: true,
  source: 'Enverus',
  surfaces: ['Ask ONE', 'Scheduled'],
  runs: 96,
  lastUsed: 'Today',
  badge: null
}, {
  id: 8,
  cat: 'report',
  icon: 'leaf',
  name: 'Emissions & ESG reporter',
  desc: 'Compiles flaring, intensity, and Scope-1 metrics into a regulator-ready summary.',
  enabled: false,
  source: 'Enverus',
  surfaces: ['Flows'],
  runs: 0,
  lastUsed: 'Never',
  badge: null
}, {
  id: 9,
  cat: 'data',
  icon: 'wand-2',
  name: 'Production anomaly detector',
  desc: 'Watches your tracked wells and explains unexpected rate changes.',
  enabled: true,
  source: 'Enverus',
  surfaces: ['Ask ONE', 'Agents'],
  runs: 118,
  lastUsed: '6h ago',
  badge: null
}, {
  id: 10,
  cat: 'data',
  icon: 'table-2',
  name: 'Smart CSV reshaper',
  desc: 'Cleans, joins, and normalizes uploaded well data against the ONE schema.',
  enabled: false,
  source: 'You',
  surfaces: ['Flows'],
  runs: 7,
  lastUsed: '2w ago',
  badge: 'Custom'
}];
const BADGE_CLASS = {
  Beta: 'pill--info',
  Team: 'pill--brand',
  Custom: 'pill--mono'
};

// ============================================================================
// Section
// ============================================================================
function SkillsLibrarySection({
  markDirty
}) {
  const [filter, setFilter] = useSkS('all');
  const [skills, setSkills] = useSkS(SKILLS);
  const toggle = id => {
    setSkills(prev => prev.map(s => s.id === id ? {
      ...s,
      enabled: !s.enabled
    } : s));
    markDirty();
  };
  const visible = filter === 'all' ? skills : skills.filter(s => s.cat === filter);
  const enabled = skills.filter(s => s.enabled).length;
  const totalRuns = skills.reduce((a, s) => a + s.runs, 0);
  const custom = skills.filter(s => s.source === 'You').length;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "User \xB7 03",
    title: "Skills library",
    sub: "Reusable skills extend what ONE can do in chat, Flows, and Agent Studio. Turn on the ones you want available \u2014 your persona shapes how they respond."
  }), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat-row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Enabled skills"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, enabled, /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-muted)',
      fontWeight: 400,
      fontSize: 13
    }
  }, " / ", skills.length)), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, skills.length - enabled, " available to add")), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Skill runs \xB7 this month"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, totalRuns), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, /*#__PURE__*/React.createElement("span", {
    className: "up"
  }, "Across all surfaces"))), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Custom skills"), /*#__PURE__*/React.createElement("span", {
    className: "v"
  }, custom), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "Built by you")), /*#__PURE__*/React.createElement("div", {
    className: "notif-stat"
  }, /*#__PURE__*/React.createElement("span", {
    className: "l"
  }, "Most used"), /*#__PURE__*/React.createElement("span", {
    className: "v",
    style: {
      fontSize: 14,
      fontFamily: 'var(--font-sans)',
      fontWeight: 500
    }
  }, "Decline curve"), /*#__PURE__*/React.createElement("span", {
    className: "d"
  }, "142 runs \xB7 last 2h ago"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Available skills",
    s: "Browse the catalog and toggle skills on. Enabled skills appear automatically when relevant.",
    actions: /*#__PURE__*/React.createElement("div", {
      className: "card-action"
    }, /*#__PURE__*/React.createElement(Button, {
      variant: "secondary",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "store"
    }), "Browse marketplace"), /*#__PURE__*/React.createElement(Button, {
      variant: "default",
      size: "sm"
    }, /*#__PURE__*/React.createElement(Icon, {
      name: "plus"
    }), "Create skill"))
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content sched-tabs"
  }, SKILL_CATS.map(c => {
    const count = c.id === 'all' ? skills.length : skills.filter(s => s.cat === c.id).length;
    return /*#__PURE__*/React.createElement("button", {
      key: c.id,
      className: 'sched-tab' + (filter === c.id ? ' on' : ''),
      onClick: () => setFilter(c.id)
    }, /*#__PURE__*/React.createElement(Icon, {
      name: c.icon
    }), /*#__PURE__*/React.createElement("span", null, c.label), /*#__PURE__*/React.createElement("span", {
      className: "count"
    }, count));
  })), /*#__PURE__*/React.createElement("div", {
    className: "skill-grid"
  }, visible.map(s => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    className: 'skill-card' + (s.enabled ? ' on' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "skill-top"
  }, /*#__PURE__*/React.createElement("span", {
    className: 'skill-ic skill-cat-' + s.cat
  }, /*#__PURE__*/React.createElement(Icon, {
    name: s.icon
  })), /*#__PURE__*/React.createElement(Toggle, {
    defaultOn: s.enabled,
    onChange: () => toggle(s.id)
  })), /*#__PURE__*/React.createElement("div", {
    className: "skill-name"
  }, s.name, s.badge && /*#__PURE__*/React.createElement("span", {
    className: 'pill ' + BADGE_CLASS[s.badge],
    style: {
      marginLeft: 8,
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: 9
    }
  }, s.badge)), /*#__PURE__*/React.createElement("div", {
    className: "skill-desc"
  }, s.desc), /*#__PURE__*/React.createElement("div", {
    className: "skill-surfaces"
  }, s.surfaces.map(su => /*#__PURE__*/React.createElement("span", {
    key: su,
    className: "skill-surface"
  }, su))), /*#__PURE__*/React.createElement("div", {
    className: "skill-foot"
  }, /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "package"
  }), s.source), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "bar-chart-3"
  }), s.runs, " runs"), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement(Icon, {
    name: "clock"
  }), s.lastUsed)))))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Skill behavior",
    s: "How skills surface and run unless you override per-skill."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content grid-2"
  }, /*#__PURE__*/React.createElement(Field, {
    label: "Suggest skills automatically",
    sub: "ONE proposes a relevant skill mid-conversation."
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Surface skill suggestions in Ask ONE",
    defaultOn: true,
    markDirty: markDirty
  })), /*#__PURE__*/React.createElement(Field, {
    label: "Confirmation",
    sub: "Before a skill writes back to a dashboard or sends output."
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Require my confirmation for write actions",
    defaultOn: true,
    markDirty: markDirty
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Toggle, {
    label: "Let teammates see which skills I've enabled",
    defaultOn: false,
    markDirty: markDirty
  }), /*#__PURE__*/React.createElement(Toggle, {
    label: "Auto-enable new skills published by Permian Analytics",
    defaultOn: true,
    markDirty: markDirty
  }))), /*#__PURE__*/React.createElement("style", null, `
        .skill-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        @media (max-width: 920px) { .skill-grid { grid-template-columns: 1fr; } }
        .skill-card {
          display: flex; flex-direction: column; gap: 8px;
          padding: 16px;
          border: 1px solid var(--border);
          border-radius: var(--radius-lg, 12px);
          background: var(--background);
          transition: border-color .15s ease, box-shadow .15s ease;
        }
        .skill-card.on {
          border-color: color-mix(in oklab, var(--accent-brand) 45%, var(--border));
          box-shadow: 0 0 0 1px color-mix(in oklab, var(--accent-brand) 22%, transparent) inset;
        }
        .skill-top { display:flex; align-items:center; justify-content:space-between; }
        .skill-ic {
          width: 38px; height: 38px; border-radius: var(--radius-md, 8px);
          display: inline-flex; align-items: center; justify-content: center;
          background: var(--surface-raised, rgba(127,127,127,.08));
          color: var(--text-muted);
        }
        .skill-ic .lucide-icon { width: 19px; height: 19px; }
        .skill-card.on .skill-ic { background: rgba(86,188,47,.12); color: var(--accent-brand); }
        .skill-cat-land.skill-ic, .skill-card.on .skill-cat-land { }
        .skill-name {
          font-size: 14px; font-weight: 600; color: var(--text-body);
          letter-spacing: -0.005em; display:flex; align-items:center; flex-wrap:wrap;
        }
        .skill-desc { font-size: 12.5px; line-height: 1.5; color: var(--text-muted); }
        .skill-surfaces { display:flex; flex-wrap:wrap; gap:5px; margin-top: 2px; }
        .skill-surface {
          font-family: var(--font-mono); font-size: 10px;
          letter-spacing: 0.04em; text-transform: uppercase;
          color: var(--text-muted);
          padding: 2px 7px; border-radius: 999px;
          border: 1px solid var(--border);
        }
        .skill-foot {
          display:flex; flex-wrap:wrap; gap: 14px; margin-top: 4px;
          padding-top: 10px; border-top: 1px solid var(--border);
          font-size: 11.5px; color: var(--text-muted);
        }
        .skill-foot span { display:inline-flex; align-items:center; gap:5px; }
        .skill-foot .lucide-icon { width: 13px; height: 13px; opacity: .8; }
      `));
}
Object.assign(window, {
  SkillsLibrarySection
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/settings-skills.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/settings-whats-new-simple.jsx
try { (() => {
// settings-whats-new-simple.jsx
// Simplified What's new — overrides window.WhatsNewSection.
// Drops the changelog timeline rail, filter tabs, hero CTAs, and the
// "Subscribe" card. Leaves a single recent-changes list, grouped by release.

const WN_RELEASES = [{
  version: '2026.4',
  date: 'May 9, 2026',
  tag: 'Current',
  headline: 'Persona-aware Ask ONE and a redesigned Settings surface',
  items: [{
    kind: 'feature',
    t: 'Persona & instructions',
    d: 'Tell ONE how you work — role, focus areas, response style, mental units, custom rules — and it shapes every AI surface to match.'
  }, {
    kind: 'feature',
    t: 'Self-administered access requests',
    d: 'See which capabilities you have, request elevated access with a reason and time bound, and track approvals in one place.'
  }, {
    kind: 'feature',
    t: 'Org-wide usage & cost analytics',
    d: '12-month trend, by-module breakdown, top consumers, and configurable alerts when spend or AI token usage spikes.'
  }, {
    kind: 'improvement',
    t: 'Three-scope settings (User / Team / Org)',
    d: 'Every setting now lives in the right place, with role-aware access banners and locked empty-states for restricted scopes.'
  }]
}, {
  version: '2026.3',
  date: 'Apr 14, 2026',
  headline: 'Workflows on a schedule, refreshed map basemaps',
  items: [{
    kind: 'feature',
    t: 'Scheduled flows',
    d: 'Run any flow on a cron schedule. Outputs land in your daily digest or post to Slack / Teams.'
  }, {
    kind: 'feature',
    t: 'Four new basemaps',
    d: 'Geological formation-tops, sectional grid, dark terrain, and a high-contrast monochrome option for printing.'
  }, {
    kind: 'improvement',
    t: 'Faster well loads',
    d: 'Well-detail pages are 3.4× faster on initial load. Production charts hydrate progressively.'
  }]
}, {
  version: '2026.2',
  date: 'Mar 06, 2026',
  headline: 'Agent Studio general availability',
  items: [{
    kind: 'feature',
    t: 'Agent Studio · GA',
    d: 'Build agents that read your saved views, run flows on your behalf, and write back to dashboards. Teams of agents now stable.'
  }, {
    kind: 'feature',
    t: 'Workspace switcher',
    d: 'Hop between Permian Analytics, Bakken Strategy, and any workspace you belong to without re-authenticating.'
  }, {
    kind: 'fix',
    t: 'CSV export · special characters',
    d: 'API numbers and operator names with em-dashes no longer corrupt under Excel default encoding.'
  }]
}, {
  version: '2026.1',
  date: 'Jan 22, 2026',
  headline: 'New year, new dashboards',
  items: [{
    kind: 'feature',
    t: 'Panels redesign',
    d: 'Drag-and-drop dashboard tiles with AI-narrated insights at the top of every panel.'
  }, {
    kind: 'improvement',
    t: 'MFA enforcement',
    d: 'Org admins can now require MFA across the entire organization in a single toggle.'
  }]
}];
const WN_KIND_LABEL = {
  feature: 'NEW',
  improvement: 'IMPROVED',
  fix: 'FIXED'
};
const WN_KIND_CLASS = {
  feature: 'kind-feature',
  improvement: 'kind-improvement',
  fix: 'kind-fix'
};
function WhatsNewSection({
  markDirty
}) {
  const latest = WN_RELEASES[0];
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(PageHead, {
    eyebrow: "Resources",
    title: "What's new",
    sub: "Recent releases across Enverus ONE."
  }), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "pill pill--brand",
    style: {
      fontFamily: 'var(--font-mono)',
      textTransform: 'uppercase',
      letterSpacing: '0.06em',
      fontSize: 10
    }
  }, "Latest \xB7 v", latest.version), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 11.5,
      color: 'var(--text-muted)',
      fontFamily: 'var(--font-mono)'
    }
  }, latest.date), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      minWidth: 240,
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--text-body)',
      letterSpacing: '-0.005em'
    }
  }, latest.headline), /*#__PURE__*/React.createElement("button", {
    className: "btn btn--default btn--xs"
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "external-link"
  }), "Read more"))), /*#__PURE__*/React.createElement(Card, null, /*#__PURE__*/React.createElement(CardHead, {
    h: "Recent releases",
    s: "The last four releases. Older notes are in the documentation."
  }), /*#__PURE__*/React.createElement("div", {
    className: "card-content",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 18
    }
  }, WN_RELEASES.map(r => /*#__PURE__*/React.createElement("div", {
    key: r.version
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 10,
      paddingBottom: 8,
      marginBottom: 10,
      borderBottom: '1px solid var(--surface-border-elevated)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--text-body)',
      letterSpacing: '0.02em'
    }
  }, "v", r.version), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 11,
      color: 'var(--text-muted)'
    }
  }, "\xB7 ", r.date), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      color: 'var(--text-body)',
      fontWeight: 500,
      marginLeft: 8
    }
  }, r.headline)), /*#__PURE__*/React.createElement("ul", {
    style: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, r.items.map((it, i) => /*#__PURE__*/React.createElement("li", {
    key: i,
    style: {
      display: 'grid',
      gridTemplateColumns: '80px 1fr',
      gap: 12,
      alignItems: 'baseline'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: 'rel-kind ' + WN_KIND_CLASS[it.kind],
    style: {
      justifySelf: 'start'
    }
  }, WN_KIND_LABEL[it.kind]), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 500,
      color: 'var(--text-body)'
    }
  }, it.t), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--text-muted)',
      marginTop: 2,
      lineHeight: 1.5
    }
  }, it.d))))))))));
}

// Suppress the User / Team / Organization scope switcher on this page,
// matching the Profile-page simplification.
function ScopeSwitcher() {
  return null;
}
Object.assign(window, {
  WhatsNewSection,
  ScopeSwitcher
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/settings-whats-new-simple.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/shell.jsx
try { (() => {
/* global React, Icon, Button, Header, ToggleGroup, ToggleButton */
// Enverus One — AppShell: collapsible sidebar + header.
// Sidebar styling via sidebar.css (className-based, derived from preview/nav.html).

const NAV = [{
  id: 'one',
  label: 'ONE',
  subtitle: 'Your command center',
  icon: 'house'
}, {
  id: 'flows',
  label: 'Flows',
  subtitle: 'Expert-built energy workflows',
  icon: 'workflow'
}, {
  id: 'agent',
  label: 'Agent Studio',
  subtitle: 'Agents, Teams & AI experience',
  icon: 'message-square-more'
}, {
  id: 'applications',
  label: 'Applications',
  subtitle: 'Enterprise solutions & integrations',
  icon: 'layout-grid'
}, {
  id: 'library',
  label: 'Library',
  subtitle: 'Discover & manage assets',
  icon: 'library-big'
}, {
  id: 'spaces',
  label: 'Spaces',
  subtitle: 'Collaborative project spaces',
  icon: 'component'
}, {
  id: 'activity',
  label: 'Activity',
  subtitle: 'Monitor logs & history',
  icon: 'clock-check'
}, {
  id: 'concepts',
  label: 'Concepts',
  subtitle: 'Early-stage product concepts',
  icon: 'lightbulb',
  dot: true
}];
function AskRing({
  size = 20
}) {
  return React.createElement('img', {
    src: '../../assets/ask-one-ring.svg',
    width: size,
    height: size,
    alt: '',
    style: {
      flexShrink: 0,
      display: 'block'
    }
  });
}

// ── Rail item (collapsed) ────────────────────────────────────────────────────
function RailItem({
  item,
  active,
  onClick
}) {
  return React.createElement('button', {
    onClick,
    title: item.label,
    'aria-label': item.label,
    className: 'rail-btn' + (active ? ' active' : '')
  }, React.createElement(Icon, {
    name: item.icon,
    size: 20,
    strokeWidth: active ? 2.1 : 1.75
  }));
}

// ── Nav item (expanded) ──────────────────────────────────────────────────────
function NavItem({
  item,
  active,
  onClick
}) {
  return React.createElement('button', {
    onClick,
    className: 'nav-item' + (active ? ' active' : '')
  }, React.createElement('span', {
    className: 'ic'
  }, React.createElement(Icon, {
    name: item.icon,
    size: 18,
    strokeWidth: 1.75
  })), React.createElement('span', {
    className: 'txt'
  }, React.createElement('span', {
    className: 'lbl'
  }, item.label), React.createElement('span', {
    className: 'sub'
  }, item.subtitle)), item.dot && active ? React.createElement('span', {
    className: 'dot-badge'
  }) : null);
}

// ── Sidebar ──────────────────────────────────────────────────────────────────
function Sidebar({
  view,
  setView,
  collapsed,
  setCollapsed
}) {
  // ── Collapsed rail ──
  if (collapsed) {
    return React.createElement('aside', {
      className: 'sidebar rail',
      style: {}
    }, React.createElement('div', {
      style: {
        background: 'linear-gradient(135deg, rgba(42,46,51,.10) 0%, rgba(77,143,30,.20) 100%), var(--sidebar)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: '100%'
      },
      className: 'backdrop-blur-md p2'
    }, React.createElement('button', {
      onClick: () => setCollapsed(false),
      title: 'Expand sidebar',
      'aria-label': 'Expand sidebar',
      className: 'rail-btn'
    }, React.createElement(Icon, {
      name: 'chevron-right',
      size: 16,
      strokeWidth: 2
    })), React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 56,
        height: 44
      }
    }, React.createElement(AskRing, {
      size: 22
    })), React.createElement('button', {
      className: 'rail-btn',
      'aria-label': 'Voice input'
    }, React.createElement(Icon, {
      name: 'mic',
      size: 18,
      strokeWidth: 1.75
    })), React.createElement('div', {
      className: 'rail-divider'
    }), ...NAV.map(item => React.createElement(RailItem, {
      key: item.id,
      item,
      active: view === item.id,
      onClick: () => setView(item.id)
    })), React.createElement('div', {
      className: 'rail-footer'
    }, React.createElement('div', {
      className: 'sb-avatar'
    }, 'AS'))));
  }

  // ── Expanded panel ──
  return React.createElement('aside', {
    className: 'sidebar expanded',
    style: {}
  }, React.createElement('div', {
    style: {
      background: 'linear-gradient(135deg, rgba(42,46,51,.10) 0%, rgba(77,143,30,.20) 100%), var(--sidebar)',
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      position: 'relative'
    },
    className: 'backdrop-blur-md p2'
  }, React.createElement('button', {
    onClick: () => setCollapsed(true),
    title: 'Collapse sidebar',
    className: 'btn-collapse'
  }, React.createElement(Icon, {
    name: 'chevron-left',
    size: 14,
    strokeWidth: 2.5,
    color: 'var(--background)'
  })), React.createElement('div', {
    className: 'sidebar-inner'
  }, React.createElement('div', {
    className: 'ask-bar'
  }, React.createElement(AskRing, {
    size: 20
  }), React.createElement('span', {
    className: 'ask-bar-ph'
  }, 'Ask ONE...'), React.createElement('button', {
    className: 'icon-btn',
    'aria-label': 'Record voice input'
  }, React.createElement(Icon, {
    name: 'mic',
    size: 16,
    strokeWidth: 1.75
  })), React.createElement('button', {
    className: 'icon-btn',
    'aria-label': 'Send message'
  }, React.createElement(Icon, {
    name: 'send-horizontal',
    size: 16,
    strokeWidth: 1.75
  }))), React.createElement('div', {
    className: 'sidebar-scroll'
  }, React.createElement('div', {
    className: 'nav-list'
  }, NAV.map(item => React.createElement(NavItem, {
    key: item.id,
    item,
    active: view === item.id,
    onClick: () => setView(item.id)
  }))), React.createElement('div', {
    style: {
      flex: 1
    }
  }), React.createElement('div', {
    className: 'promo'
  }, React.createElement('div', {
    className: 'promo-icon'
  }, React.createElement(Icon, {
    name: 'smartphone',
    size: 20,
    strokeWidth: 1.75
  })), React.createElement('div', null, React.createElement('div', {
    className: 'promo-title'
  }, 'Enverus ONE Mobile'), React.createElement('div', {
    className: 'promo-desc'
  }, 'Chat with all your agents while on the go!'), React.createElement('a', {
    href: '#',
    className: 'promo-link'
  }, 'Learn more')))),
  // end sidebar-scroll

  React.createElement('div', {
    className: 'user-footer'
  }, React.createElement('div', {
    className: 'sb-avatar'
  }, 'AS'), React.createElement('div', {
    style: {
      flex: 1,
      minWidth: 0
    }
  }, React.createElement('div', {
    className: 'user-name'
  }, 'Akash Sharma'), React.createElement('div', {
    className: 'user-org'
  }, 'Enverus')), React.createElement('button', {
    className: 'more-btn',
    'aria-label': 'User menu'
  }, React.createElement(Icon, {
    name: 'ellipsis',
    size: 16
  }))))));
}

// ── Header ───────────────────────────────────────────────────────────────────
function Header({
  onSearch,
  dark,
  onToggleTheme
}) {
  return React.createElement('header', {
    style: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      zIndex: 50,
      height: 56,
      flexShrink: 0,
      background: 'var(--card)',
      color: 'var(--card-foreground)',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
      padding: '0 20px',
      borderBottom: '1px solid var(--border)'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center'
    }
  }, React.createElement('img', {
    src: dark ? '../../assets/enverus-one-logo-light.svg' : '../../assets/enverus-one-logo.svg',
    alt: 'Enverus One',
    style: {
      height: 18,
      display: 'block'
    }
  })), React.createElement('div', {
    style: {
      flex: 1
    }
  }), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, React.createElement('a', {
    href: 'z-accessibility.html',
    target: '_blank',
    rel: 'noopener noreferrer',
    'aria-label': 'Accessibility audit (opens in new tab)',
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      height: 30,
      padding: '0 10px',
      borderRadius: 'var(--radius-md)',
      border: '1px solid var(--border)',
      background: 'transparent',
      color: 'var(--muted-foreground)',
      fontSize: 11,
      fontWeight: 600,
      textDecoration: 'none',
      letterSpacing: '.2px',
      whiteSpace: 'nowrap'
    }
  }, React.createElement(Icon, {
    name: 'shield-check',
    size: 13
  }), ' A11y'), React.createElement(HeaderIcon, {
    icon: dark ? 'sun' : 'moon',
    onClick: onToggleTheme,
    title: dark ? 'Switch to light' : 'Switch to dark'
  }), React.createElement(HeaderIcon, {
    icon: 'bell',
    dot: true,
    title: 'Notifications'
  })));
}
function HeaderIcon({
  icon,
  dot,
  onClick,
  title
}) {
  const [hover, setHover] = React.useState(false);
  return React.createElement('button', {
    onClick,
    title,
    'aria-label': title || icon,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: 'relative',
      width: 40,
      height: 40,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: hover ? 'var(--accent)' : 'transparent',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      color: 'var(--muted-foreground)',
      cursor: 'pointer'
    }
  }, React.createElement(Icon, {
    name: icon,
    size: 18
  }), dot ? React.createElement('span', {
    style: {
      position: 'absolute',
      top: 7,
      right: 8,
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--primary)',
      border: '1.5px solid var(--sidebar)'
    }
  }) : null);
}
Object.assign(window, {
  Sidebar,
  Header,
  NAV
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/shell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/spaces.jsx
try { (() => {
/* global React, Icon, Button */
// Enverus One — Spaces detail view with inner tab navigation.

const SPACE_FLOWS = [{
  name: 'AFE Evaluation',
  category: 'Minerals',
  lastRun: '2 hours ago',
  status: 'Success'
}, {
  name: 'DEPR_Inventory Evaluation',
  category: 'Operators',
  lastRun: 'Yesterday',
  status: 'Success'
}, {
  name: 'Generation Site Selection',
  category: 'Power & Renewables',
  lastRun: '3 days ago',
  status: 'Success'
}, {
  name: 'Activity Analytics Analyst',
  category: 'Additional',
  lastRun: '5 days ago',
  status: 'Error'
}, {
  name: 'Current Production Valuation',
  category: 'Finance',
  lastRun: '1 week ago',
  status: 'Success'
}];
const ACTIVITY = [{
  user: 'Brendan H.',
  action: 'ran',
  target: 'AFE Evaluation',
  time: '2 hours ago',
  icon: 'play'
}, {
  user: 'Jason S.',
  action: 'added',
  target: 'Louisiana AFE Example to Library',
  time: '5 hours ago',
  icon: 'plus'
}, {
  user: 'Akash S.',
  action: 'updated',
  target: 'space settings',
  time: 'Yesterday',
  icon: 'settings'
}, {
  user: 'Michal B.',
  action: 'invited',
  target: 'Sarah Connor',
  time: '2 days ago',
  icon: 'user-plus'
}, {
  user: 'Brendan H.',
  action: 'ran',
  target: 'Generation Site Selection',
  time: '3 days ago',
  icon: 'play'
}, {
  user: 'Jason S.',
  action: 'commented on',
  target: 'Production Benchmarking concept',
  time: '4 days ago',
  icon: 'message-square'
}];
const MEMBERS = [{
  name: 'Akash Sharma',
  initials: 'AS',
  role: 'Owner',
  email: 'akash.sharma@enverus.com',
  joined: 'Jan 2026'
}, {
  name: 'Brendan Heberton',
  initials: 'BH',
  role: 'Editor',
  email: 'brendan.h@enverus.com',
  joined: 'Feb 2026'
}, {
  name: 'Jason Shannon',
  initials: 'JS',
  role: 'Editor',
  email: 'jason.shannon@enverus.com',
  joined: 'Feb 2026'
}, {
  name: 'Michal Bures',
  initials: 'MB',
  role: 'Viewer',
  email: 'michal.bures@enverus.com',
  joined: 'Mar 2026'
}, {
  name: 'Sarah Connor',
  initials: 'SC',
  role: 'Viewer',
  email: 'sarah.connor@enverus.com',
  joined: 'Jun 2026'
}];
const STATS = [{
  label: 'Flows',
  value: '5',
  icon: 'workflow'
}, {
  label: 'Members',
  value: '5',
  icon: 'users'
}, {
  label: 'Runs',
  value: '142',
  icon: 'play'
}, {
  label: 'Assets',
  value: '12',
  icon: 'server'
}];

// ── Tab: Overview ─────────────────────────────────────────────────────────
function OverviewTab() {
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 24
    }
  },
  // Stats row
  React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 12
    }
  }, STATS.map(function (s) {
    return React.createElement('div', {
      key: s.label,
      style: {
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-xl)',
        padding: '16px 20px',
        display: 'flex',
        alignItems: 'center',
        gap: 14
      }
    }, React.createElement('div', {
      style: {
        width: 36,
        height: 36,
        borderRadius: 'var(--radius-md)',
        background: 'color-mix(in srgb, var(--primary) 10%, transparent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, React.createElement(Icon, {
      name: s.icon,
      size: 16,
      strokeWidth: 1.75,
      color: 'var(--primary)'
    })), React.createElement('div', null, React.createElement('div', {
      style: {
        fontSize: 22,
        fontWeight: 700,
        color: 'var(--foreground)',
        lineHeight: 1.1
      }
    }, s.value), React.createElement('div', {
      style: {
        fontSize: 12,
        color: 'var(--muted-foreground)',
        marginTop: 2
      }
    }, s.label)));
  })),
  // About + recent activity split
  React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: '1.2fr 1fr',
      gap: 16
    }
  },
  // About
  React.createElement('div', {
    style: {
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: '20px 24px'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)',
      marginBottom: 10
    }
  }, 'About'), React.createElement('p', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      lineHeight: 1.65,
      margin: '0 0 16px'
    }
  }, 'A shared workspace for the Permian Basin energy analytics team. Centralises governed workflows, asset libraries, and agent runs for cross-functional collaboration across Operators, Finance, and Power & Renewables verticals.'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, ['Permian', 'Analytics', 'Operators', 'Finance'].map(function (tag) {
    return React.createElement('span', {
      key: tag,
      style: {
        fontSize: 11,
        fontWeight: 500,
        padding: '2px 8px',
        borderRadius: 'var(--radius-pill)',
        background: 'var(--accent)',
        border: '1px solid var(--border)',
        color: 'var(--muted-foreground)'
      }
    }, tag);
  }))),
  // Recent activity
  React.createElement('div', {
    style: {
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: '20px 24px'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)',
      marginBottom: 12
    }
  }, 'Recent Activity'), React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, ACTIVITY.slice(0, 4).map(function (a, i) {
    return React.createElement('div', {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 10
      }
    }, React.createElement('div', {
      style: {
        width: 26,
        height: 26,
        borderRadius: 'var(--radius-full)',
        background: 'var(--accent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, React.createElement(Icon, {
      name: a.icon,
      size: 12,
      strokeWidth: 1.75,
      color: 'var(--muted-foreground)'
    })), React.createElement('div', {
      style: {
        flex: 1
      }
    }, React.createElement('span', {
      style: {
        fontSize: 12,
        color: 'var(--foreground)'
      }
    }, React.createElement('strong', null, a.user), ' ' + a.action + ' ', React.createElement('span', {
      style: {
        color: 'var(--primary)'
      }
    }, a.target)), React.createElement('div', {
      style: {
        fontSize: 11,
        color: 'var(--muted-foreground)',
        marginTop: 1
      }
    }, a.time)));
  })))));
}

// ── Tab: Flows ─────────────────────────────────────────────────────────────
function FlowsTab() {
  const STATUS_COLOR = {
    Success: 'var(--primary)',
    Error: 'var(--destructive)'
  };
  const th = {
    padding: '10px 16px',
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: '.3px',
    color: 'var(--muted-foreground)',
    textTransform: 'uppercase',
    textAlign: 'left',
    borderBottom: '1px solid var(--border)',
    background: 'var(--env-one-background)',
    whiteSpace: 'nowrap'
  };
  const td = {
    padding: '13px 16px',
    fontSize: 13,
    color: 'var(--foreground)',
    borderBottom: '1px solid var(--border)'
  };
  return React.createElement('div', {
    style: {
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      borderBottom: '1px solid var(--border)'
    }
  }, React.createElement('span', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, '5 Flows'), React.createElement(Button, {
    variant: 'default',
    size: 'sm',
    icon: 'plus'
  }, 'Add Flow')), React.createElement('table', {
    style: {
      width: '100%',
      borderCollapse: 'collapse'
    }
  }, React.createElement('thead', null, React.createElement('tr', null, ['Flow', 'Category', 'Last Run', 'Status', ''].map(function (h) {
    return React.createElement('th', {
      key: h,
      style: th
    }, h);
  }))), React.createElement('tbody', null, SPACE_FLOWS.map(function (f, i) {
    return React.createElement('tr', {
      key: f.name,
      style: {
        background: 'var(--card)'
      }
    }, React.createElement('td', {
      style: Object.assign({}, td, {
        fontWeight: 600,
        borderBottom: i === SPACE_FLOWS.length - 1 ? 'none' : '1px solid var(--border)'
      })
    }, f.name), React.createElement('td', {
      style: Object.assign({}, td, {
        color: 'var(--muted-foreground)',
        borderBottom: i === SPACE_FLOWS.length - 1 ? 'none' : '1px solid var(--border)'
      })
    }, f.category), React.createElement('td', {
      style: Object.assign({}, td, {
        color: 'var(--muted-foreground)',
        borderBottom: i === SPACE_FLOWS.length - 1 ? 'none' : '1px solid var(--border)'
      })
    }, f.lastRun), React.createElement('td', {
      style: Object.assign({}, td, {
        borderBottom: i === SPACE_FLOWS.length - 1 ? 'none' : '1px solid var(--border)'
      })
    }, React.createElement('span', {
      style: {
        fontSize: 12,
        fontWeight: 500,
        padding: '2px 10px',
        borderRadius: 'var(--radius-pill)',
        background: 'color-mix(in srgb, ' + STATUS_COLOR[f.status] + ' 10%, transparent)',
        color: STATUS_COLOR[f.status],
        border: '1px solid color-mix(in srgb, ' + STATUS_COLOR[f.status] + ' 30%, transparent)'
      }
    }, f.status)), React.createElement('td', {
      style: Object.assign({}, td, {
        textAlign: 'right',
        borderBottom: i === SPACE_FLOWS.length - 1 ? 'none' : '1px solid var(--border)'
      })
    }, React.createElement(Button, {
      variant: 'default',
      size: 'sm'
    }, 'Run')));
  }))));
}

// ── Tab: Activity ─────────────────────────────────────────────────────────
function ActivityTab() {
  return React.createElement('div', {
    style: {
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden'
    }
  }, React.createElement('div', {
    style: {
      padding: '14px 16px',
      borderBottom: '1px solid var(--border)',
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, 'All Activity'), React.createElement('div', {
    style: {
      padding: '8px 0'
    }
  }, ACTIVITY.map(function (a, i) {
    return React.createElement('div', {
      key: i,
      style: {
        display: 'flex',
        alignItems: 'flex-start',
        gap: 12,
        padding: '12px 20px',
        borderBottom: i === ACTIVITY.length - 1 ? 'none' : '1px solid var(--border)'
      }
    }, React.createElement('div', {
      style: {
        width: 32,
        height: 32,
        borderRadius: 'var(--radius-full)',
        background: 'color-mix(in srgb, var(--primary) 10%, transparent)',
        border: '1px solid color-mix(in srgb, var(--primary) 25%, transparent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0
      }
    }, React.createElement(Icon, {
      name: a.icon,
      size: 14,
      strokeWidth: 1.75,
      color: 'var(--primary)'
    })), React.createElement('div', {
      style: {
        flex: 1
      }
    }, React.createElement('div', {
      style: {
        fontSize: 13,
        color: 'var(--foreground)',
        lineHeight: 1.4
      }
    }, React.createElement('strong', null, a.user), ' ' + a.action + ' ', React.createElement('span', {
      style: {
        color: 'var(--primary)',
        fontWeight: 500
      }
    }, a.target)), React.createElement('div', {
      style: {
        fontSize: 12,
        color: 'var(--muted-foreground)',
        marginTop: 3
      }
    }, a.time)));
  })));
}

// ── Tab: Members ──────────────────────────────────────────────────────────
function MembersTab() {
  const ROLE_COLOR = {
    Owner: 'var(--primary)',
    Editor: 'var(--info)',
    Viewer: 'var(--muted-foreground)'
  };
  return React.createElement('div', {
    style: {
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      overflow: 'hidden'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '14px 16px',
      borderBottom: '1px solid var(--border)'
    }
  }, React.createElement('span', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, '5 Members'), React.createElement(Button, {
    variant: 'default',
    size: 'sm',
    icon: 'user-plus'
  }, 'Invite')), React.createElement('div', null, MEMBERS.map(function (m, i) {
    return React.createElement('div', {
      key: m.email,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 14,
        padding: '14px 20px',
        borderBottom: i === MEMBERS.length - 1 ? 'none' : '1px solid var(--border)'
      }
    }, React.createElement('div', {
      style: {
        width: 36,
        height: 36,
        borderRadius: 'var(--radius-full)',
        background: 'var(--muted-foreground)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 12,
        fontWeight: 700,
        color: 'var(--sidebar)',
        flexShrink: 0
      }
    }, m.initials), React.createElement('div', {
      style: {
        flex: 1
      }
    }, React.createElement('div', {
      style: {
        fontSize: 13,
        fontWeight: 600,
        color: 'var(--foreground)'
      }
    }, m.name), React.createElement('div', {
      style: {
        fontSize: 12,
        color: 'var(--muted-foreground)',
        marginTop: 1
      }
    }, m.email)), React.createElement('span', {
      style: {
        fontSize: 12,
        fontWeight: 500,
        padding: '2px 10px',
        borderRadius: 'var(--radius-pill)',
        background: 'color-mix(in srgb, ' + ROLE_COLOR[m.role] + ' 10%, transparent)',
        color: ROLE_COLOR[m.role],
        border: '1px solid color-mix(in srgb, ' + ROLE_COLOR[m.role] + ' 25%, transparent)'
      }
    }, m.role), React.createElement('span', {
      style: {
        fontSize: 12,
        color: 'var(--muted-foreground)'
      }
    }, 'Joined ' + m.joined), React.createElement('button', {
      'aria-label': 'More actions for ' + m.name,
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--muted-foreground)',
        padding: 4,
        display: 'flex'
      }
    }, React.createElement(Icon, {
      name: 'ellipsis',
      size: 15
    })));
  })));
}

// ── Main view ─────────────────────────────────────────────────────────────
function SpacesView() {
  const tabs = [{
    id: 'overview',
    label: 'Overview',
    icon: 'layout-dashboard'
  }, {
    id: 'flows',
    label: 'Tab 2',
    icon: 'workflow'
  }, {
    id: 'activity',
    label: 'Tab 3',
    icon: 'clock'
  }, {
    id: 'members',
    label: 'Tab 4',
    icon: 'users'
  }];
  const [active, setActive] = React.useState('overview');
  let content;
  if (active === 'overview') content = React.createElement(OverviewTab);else if (active === 'flows') content = React.createElement(FlowsTab);else if (active === 'activity') content = React.createElement(ActivityTab);else content = React.createElement(MembersTab);
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 0
    }
  },
  // ── Page header ───────────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 24
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14
    }
  }, React.createElement('div', {
    style: {
      width: 44,
      height: 44,
      borderRadius: 'var(--radius-lg)',
      background: 'color-mix(in srgb, var(--primary) 15%, transparent)',
      border: '1px solid color-mix(in srgb, var(--primary) 30%, transparent)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }
  }, React.createElement(Icon, {
    name: 'folders',
    size: 20,
    strokeWidth: 1.5,
    color: 'var(--primary)'
  })), React.createElement('div', null, React.createElement('h1', {
    style: {
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--foreground)',
      margin: '0 0 4px'
    }
  }, 'Spaces'), React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      margin: 0
    }
  }, 'Collaborative project spaces · 5 members · updated 2 hours ago'))), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 8
    }
  }, React.createElement(Button, {
    variant: 'secondary',
    size: 'sm',
    icon: 'settings'
  }, 'Settings'), React.createElement(Button, {
    variant: 'default',
    size: 'sm',
    icon: 'user-plus'
  }, 'Invite'))),
  // ── Tab bar ───────────────────────────────────────────────────────────
  React.createElement('div', {
    role: 'tablist',
    'aria-label': 'Spaces view',
    style: {
      display: 'flex',
      borderBottom: '1px solid var(--border)',
      marginBottom: 24,
      gap: 4
    }
  }, tabs.map(function (tab) {
    const isActive = active === tab.id;
    return React.createElement('button', {
      key: tab.id,
      role: 'tab',
      'aria-selected': isActive,
      onClick: function () {
        setActive(tab.id);
      },
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 7,
        padding: '10px 16px',
        fontSize: 13,
        fontWeight: isActive ? 600 : 500,
        color: isActive ? 'var(--foreground)' : 'var(--muted-foreground)',
        background: 'transparent',
        border: 'none',
        borderBottom: isActive ? '2px solid var(--primary)' : '2px solid transparent',
        marginBottom: -1,
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)',
        transition: 'color .1s'
      }
    }, React.createElement(Icon, {
      name: tab.icon,
      size: 14,
      strokeWidth: 1.75,
      color: isActive ? 'var(--primary)' : 'var(--muted-foreground)'
    }), tab.label);
  })),
  // ── Tab content ───────────────────────────────────────────────────────
  content);
}
Object.assign(window, {
  SpacesView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/spaces.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/tweaks-panel.jsx
try { (() => {
// tweaks-panel.jsx
// Reusable Tweaks shell + form-control helpers.
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
    const edits = typeof keyOrEdits === 'object' && keyOrEdits !== null ? keyOrEdits : {
      [keyOrEdits]: val
    };
    setValues(prev => ({
      ...prev,
      ...edits
    }));
    window.parent.postMessage({
      type: '__edit_mode_set_keys',
      edits
    }, '*');
    // Same-window signal so in-page listeners (deck-stage rail thumbnails)
    // can react — the parent message only reaches the host, not peers.
    window.dispatchEvent(new CustomEvent('tweakchange', {
      detail: edits
    }));
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
function TweaksPanel({
  title = 'Tweaks',
  noDeckControls = false,
  children
}) {
  const [open, setOpen] = React.useState(false);
  const dragRef = React.useRef(null);
  // Auto-inject a rail toggle when a <deck-stage> is on the page. The
  // toggle drives the deck's per-viewer _railVisible via window message;
  // state is mirrored from the same localStorage key the deck reads so
  // the control reflects reality across reloads. The mechanism is the
  // message — authors who want custom placement can post it directly
  // and pass noDeckControls to suppress this one.
  const hasDeckStage = React.useMemo(() => typeof document !== 'undefined' && !!document.querySelector('deck-stage'), []);
  // deck-stage enables its rail in connectedCallback, but this panel can
  // mount before that element has upgraded. The initial read catches the
  // common case; the listener covers mounting first. (Older deck-stage.js
  // copies still wait for the host's __omelette_rail_enabled postMessage —
  // same listener handles those.)
  const [railEnabled, setRailEnabled] = React.useState(() => hasDeckStage && !!document.querySelector('deck-stage')?._railEnabled);
  React.useEffect(() => {
    if (!hasDeckStage || railEnabled) return undefined;
    const onMsg = e => {
      if (e.data && e.data.type === '__omelette_rail_enabled') setRailEnabled(true);
    };
    window.addEventListener('message', onMsg);
    return () => window.removeEventListener('message', onMsg);
  }, [hasDeckStage, railEnabled]);
  const [railVisible, setRailVisible] = React.useState(() => {
    try {
      return localStorage.getItem('deck-stage.railVisible') !== '0';
    } catch (e) {
      return true;
    }
  });
  const toggleRail = on => {
    setRailVisible(on);
    window.postMessage({
      type: '__deck_rail_visible',
      on
    }, '*');
  };
  const offsetRef = React.useRef({
    x: 16,
    y: 16
  });
  const PAD = 16;
  const clampToViewport = React.useCallback(() => {
    const panel = dragRef.current;
    if (!panel) return;
    const w = panel.offsetWidth,
      h = panel.offsetHeight;
    const maxRight = Math.max(PAD, window.innerWidth - w - PAD);
    const maxBottom = Math.max(PAD, window.innerHeight - h - PAD);
    offsetRef.current = {
      x: Math.min(maxRight, Math.max(PAD, offsetRef.current.x)),
      y: Math.min(maxBottom, Math.max(PAD, offsetRef.current.y))
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
    const onMsg = e => {
      const t = e?.data?.type;
      if (t === '__activate_edit_mode') setOpen(true);else if (t === '__deactivate_edit_mode') setOpen(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({
      type: '__edit_mode_available'
    }, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);
  const dismiss = () => {
    setOpen(false);
    window.parent.postMessage({
      type: '__edit_mode_dismissed'
    }, '*');
  };
  const onDragStart = e => {
    const panel = dragRef.current;
    if (!panel) return;
    const r = panel.getBoundingClientRect();
    const sx = e.clientX,
      sy = e.clientY;
    const startRight = window.innerWidth - r.right;
    const startBottom = window.innerHeight - r.bottom;
    const move = ev => {
      offsetRef.current = {
        x: startRight - (ev.clientX - sx),
        y: startBottom - (ev.clientY - sy)
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("style", null, __TWEAKS_STYLE), /*#__PURE__*/React.createElement("div", {
    ref: dragRef,
    className: "twk-panel",
    "data-noncommentable": "",
    style: {
      right: offsetRef.current.x,
      bottom: offsetRef.current.y
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-hd",
    onMouseDown: onDragStart
  }, /*#__PURE__*/React.createElement("b", null, title), /*#__PURE__*/React.createElement("button", {
    className: "twk-x",
    "aria-label": "Close tweaks",
    onMouseDown: e => e.stopPropagation(),
    onClick: dismiss
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "twk-body"
  }, children, hasDeckStage && railEnabled && !noDeckControls && /*#__PURE__*/React.createElement(TweakSection, {
    label: "Deck"
  }, /*#__PURE__*/React.createElement(TweakToggle, {
    label: "Thumbnail rail",
    value: railVisible,
    onChange: toggleRail
  })))));
}

// ── Layout helpers ──────────────────────────────────────────────────────────

function TweakSection({
  label,
  children
}) {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "twk-sect"
  }, label), children);
}
function TweakRow({
  label,
  value,
  children,
  inline = false
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: inline ? 'twk-row twk-row-h' : 'twk-row'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label), value != null && /*#__PURE__*/React.createElement("span", {
    className: "twk-val"
  }, value)), children);
}

// ── Controls ────────────────────────────────────────────────────────────────

function TweakSlider({
  label,
  value,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label,
    value: `${value}${unit}`
  }, /*#__PURE__*/React.createElement("input", {
    type: "range",
    className: "twk-slider",
    min: min,
    max: max,
    step: step,
    value: value,
    onChange: e => onChange(Number(e.target.value))
  }));
}
function TweakToggle({
  label,
  value,
  onChange
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-row twk-row-h"
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-lbl"
  }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "twk-toggle",
    "data-on": value ? '1' : '0',
    role: "switch",
    "aria-checked": !!value,
    onClick: () => onChange(!value)
  }, /*#__PURE__*/React.createElement("i", null)));
}
function TweakRadio({
  label,
  value,
  options,
  onChange
}) {
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
  const labelLen = o => String(typeof o === 'object' ? o.label : o).length;
  const maxLen = options.reduce((m, o) => Math.max(m, labelLen(o)), 0);
  const fitsAsSegments = maxLen <= ({
    2: 16,
    3: 10
  }[options.length] ?? 0);
  if (!fitsAsSegments) {
    // <select> emits strings — map back to the original option value so the
    // fallback stays type-preserving (numbers, booleans) like the segment path.
    const resolve = s => {
      const m = options.find(o => String(typeof o === 'object' ? o.value : o) === s);
      return m === undefined ? s : typeof m === 'object' ? m.value : m;
    };
    return /*#__PURE__*/React.createElement(TweakSelect, {
      label: label,
      value: value,
      options: options,
      onChange: s => onChange(resolve(s))
    });
  }
  const opts = options.map(o => typeof o === 'object' ? o : {
    value: o,
    label: o
  });
  const idx = Math.max(0, opts.findIndex(o => o.value === value));
  const n = opts.length;
  const segAt = clientX => {
    const r = trackRef.current.getBoundingClientRect();
    const inner = r.width - 4;
    const i = Math.floor((clientX - r.left - 2) / inner * n);
    return opts[Math.max(0, Math.min(n - 1, i))].value;
  };
  const onPointerDown = e => {
    setDragging(true);
    const v0 = segAt(e.clientX);
    if (v0 !== valueRef.current) onChange(v0);
    const move = ev => {
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
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    ref: trackRef,
    role: "radiogroup",
    onPointerDown: onPointerDown,
    className: dragging ? 'twk-seg dragging' : 'twk-seg'
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-seg-thumb",
    style: {
      left: `calc(2px + ${idx} * (100% - 4px) / ${n})`,
      width: `calc((100% - 4px) / ${n})`
    }
  }), opts.map(o => /*#__PURE__*/React.createElement("button", {
    key: o.value,
    type: "button",
    role: "radio",
    "aria-checked": o.value === value
  }, o.label))));
}
function TweakSelect({
  label,
  value,
  options,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("select", {
    className: "twk-field",
    value: value,
    onChange: e => onChange(e.target.value)
  }, options.map(o => {
    const v = typeof o === 'object' ? o.value : o;
    const l = typeof o === 'object' ? o.label : o;
    return /*#__PURE__*/React.createElement("option", {
      key: v,
      value: v
    }, l);
  })));
}
function TweakText({
  label,
  value,
  placeholder,
  onChange
}) {
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("input", {
    className: "twk-field",
    type: "text",
    value: value,
    placeholder: placeholder,
    onChange: e => onChange(e.target.value)
  }));
}
function TweakNumber({
  label,
  value,
  min,
  max,
  step = 1,
  unit = '',
  onChange
}) {
  const clamp = n => {
    if (min != null && n < min) return min;
    if (max != null && n > max) return max;
    return n;
  };
  const startRef = React.useRef({
    x: 0,
    val: 0
  });
  const onScrubStart = e => {
    e.preventDefault();
    startRef.current = {
      x: e.clientX,
      val: value
    };
    const decimals = (String(step).split('.')[1] || '').length;
    const move = ev => {
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
  return /*#__PURE__*/React.createElement("div", {
    className: "twk-num"
  }, /*#__PURE__*/React.createElement("span", {
    className: "twk-num-lbl",
    onPointerDown: onScrubStart
  }, label), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: value,
    min: min,
    max: max,
    step: step,
    onChange: e => onChange(clamp(Number(e.target.value)))
  }), unit && /*#__PURE__*/React.createElement("span", {
    className: "twk-num-unit"
  }, unit));
}

// Relative-luminance contrast pick — checkmarks drawn over a swatch need to
// read on both #111 and #fafafa without per-option configuration. Hex input
// only (#rgb / #rrggbb); named or rgb()/hsl() colors fall through to "light".
function __twkIsLight(hex) {
  const h = String(hex).replace('#', '');
  const x = h.length === 3 ? h.replace(/./g, c => c + c) : h.padEnd(6, '0');
  const n = parseInt(x.slice(0, 6), 16);
  if (Number.isNaN(n)) return true;
  const r = n >> 16 & 255,
    g = n >> 8 & 255,
    b = n & 255;
  return r * 299 + g * 587 + b * 114 > 148000;
}
const __TwkCheck = ({
  light
}) => /*#__PURE__*/React.createElement("svg", {
  viewBox: "0 0 14 14",
  "aria-hidden": "true"
}, /*#__PURE__*/React.createElement("path", {
  d: "M3 7.2 5.8 10 11 4.2",
  fill: "none",
  strokeWidth: "2.2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
  stroke: light ? 'rgba(0,0,0,.78)' : '#fff'
}));

// TweakColor — curated color/palette picker. Each option is either a single
// hex string or an array of 1-5 hex strings; the card adapts — a lone color
// renders solid, a palette renders colors[0] as the hero (left ~2/3) with the
// rest stacked in a sharp column on the right. onChange emits the
// option in the shape it was passed (string stays string, array stays array).
// Without options it falls back to the native color input for back-compat.
function TweakColor({
  label,
  value,
  options,
  onChange
}) {
  if (!options || !options.length) {
    return /*#__PURE__*/React.createElement("div", {
      className: "twk-row twk-row-h"
    }, /*#__PURE__*/React.createElement("div", {
      className: "twk-lbl"
    }, /*#__PURE__*/React.createElement("span", null, label)), /*#__PURE__*/React.createElement("input", {
      type: "color",
      className: "twk-swatch",
      value: value,
      onChange: e => onChange(e.target.value)
    }));
  }
  // Native <input type=color> emits lowercase hex per the HTML spec, so
  // compare case-insensitively. String() guards JSON.stringify(undefined),
  // which returns the primitive undefined (no .toLowerCase).
  const key = o => String(JSON.stringify(o)).toLowerCase();
  const cur = key(value);
  return /*#__PURE__*/React.createElement(TweakRow, {
    label: label
  }, /*#__PURE__*/React.createElement("div", {
    className: "twk-chips",
    role: "radiogroup"
  }, options.map((o, i) => {
    const colors = Array.isArray(o) ? o : [o];
    const [hero, ...rest] = colors;
    const sup = rest.slice(0, 4);
    const on = key(o) === cur;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      className: "twk-chip",
      role: "radio",
      "aria-checked": on,
      "data-on": on ? '1' : '0',
      "aria-label": colors.join(', '),
      title: colors.join(' · '),
      style: {
        background: hero
      },
      onClick: () => onChange(o)
    }, sup.length > 0 && /*#__PURE__*/React.createElement("span", null, sup.map((c, j) => /*#__PURE__*/React.createElement("i", {
      key: j,
      style: {
        background: c
      }
    }))), on && /*#__PURE__*/React.createElement(__TwkCheck, {
      light: __twkIsLight(hero)
    }));
  })));
}
function TweakButton({
  label,
  onClick,
  secondary = false
}) {
  return /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: secondary ? 'twk-btn secondary' : 'twk-btn',
    onClick: onClick
  }, label);
}
Object.assign(window, {
  useTweaks,
  TweaksPanel,
  TweakSection,
  TweakRow,
  TweakSlider,
  TweakToggle,
  TweakRadio,
  TweakSelect,
  TweakText,
  TweakNumber,
  TweakColor,
  TweakButton
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/tweaks-panel.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/whats-new.jsx
try { (() => {
/* global React, Icon */
// Enverus One — What's New view.

const CATEGORY_STYLE = {
  NEW: {
    bg: 'color-mix(in srgb, var(--primary) 20%, transparent)',
    color: 'var(--primary)',
    border: 'color-mix(in srgb, var(--primary) 40%, transparent)'
  },
  FIXED: {
    bg: 'color-mix(in srgb, #d97706 20%, transparent)',
    color: '#d97706',
    border: 'color-mix(in srgb, #d97706 40%, transparent)'
  },
  IMPROVED: {
    bg: 'color-mix(in srgb, var(--info) 20%, transparent)',
    color: 'var(--info)',
    border: 'color-mix(in srgb, var(--info) 40%, transparent)'
  }
};
function TypeBadge({
  type
}) {
  const s = CATEGORY_STYLE[type] || CATEGORY_STYLE.NEW;
  return React.createElement('span', {
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: '2px 8px',
      borderRadius: 'var(--radius-sm)',
      background: s.bg,
      color: s.color,
      border: '1px solid ' + s.border,
      letterSpacing: '.3px'
    }
  }, type);
}
function TagPill({
  label
}) {
  return React.createElement('span', {
    style: {
      fontSize: 11,
      fontWeight: 500,
      padding: '2px 8px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--accent)',
      color: 'var(--muted-foreground)',
      border: '1px solid var(--border)'
    }
  }, label);
}
function EntryIcon({
  type
}) {
  const iconName = type === 'FIXED' ? 'bug' : 'leaf';
  const color = type === 'FIXED' ? '#d97706' : 'var(--primary)';
  return React.createElement('div', {
    style: {
      width: 28,
      height: 28,
      borderRadius: 'var(--radius-full)',
      background: type === 'FIXED' ? 'color-mix(in srgb, #d97706 15%, transparent)' : 'color-mix(in srgb, var(--primary) 15%, transparent)',
      border: '1px solid ' + (type === 'FIXED' ? 'color-mix(in srgb, #d97706 30%, transparent)' : 'color-mix(in srgb, var(--primary) 30%, transparent)'),
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }
  }, React.createElement(Icon, {
    name: iconName,
    size: 13,
    strokeWidth: 1.75,
    color: color
  }));
}
function ActionBtn({
  icon,
  label
}) {
  return React.createElement('button', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 5,
      fontSize: 12,
      fontWeight: 500,
      padding: '4px 10px',
      borderRadius: 'var(--radius-md)',
      background: 'transparent',
      border: '1px solid var(--border)',
      color: 'var(--foreground)',
      cursor: 'pointer',
      fontFamily: 'var(--font-sans)'
    }
  }, React.createElement(Icon, {
    name: icon,
    size: 12,
    strokeWidth: 1.75
  }), label);
}
const VERSIONS = [{
  version: '2.9',
  current: true,
  date: 'JUN 23, 2026',
  changes: 1,
  entries: [{
    type: 'NEW',
    title: 'TEST RELEASE INTERNAL 2.9',
    desc: 'TEST',
    tags: [],
    actions: []
  }]
}, {
  version: '2.8',
  current: false,
  date: 'JUN 23, 2026',
  changes: 1,
  entries: [{
    type: 'NEW',
    title: 'TEST INTERNAL 2.8',
    desc: 'TEST',
    tags: [],
    actions: []
  }]
}, {
  version: '2.7',
  current: false,
  date: 'JUN 23, 2026',
  changes: 1,
  entries: [{
    type: 'NEW',
    title: 'TEST RELEASE NOTE EXTERNAL',
    desc: 'TEST',
    tags: [],
    actions: []
  }]
}, {
  version: '2.6',
  current: false,
  date: 'JUN 23, 2026',
  changes: 1,
  entries: [{
    type: 'FIXED',
    title: 'test external',
    desc: 'test',
    tags: [],
    actions: []
  }]
}, {
  version: '2.5',
  current: false,
  date: 'JUN 23, 2026',
  changes: 1,
  entries: [{
    type: 'NEW',
    title: 'Type Curve Enhancements',
    subtitle: 'TEST NOTE - 2.5 ( MYRO )',
    desc: 'Type curves can now be normalized by three additional metrics.',
    tags: ['Apps'],
    featured: true,
    actions: []
  }]
}, {
  version: '2.4',
  current: false,
  date: 'JUN 22, 2026',
  changes: 1,
  entries: [{
    type: 'NEW',
    title: 'Myro Test Video',
    desc: 'test',
    tags: [],
    actions: [{
      icon: 'play',
      label: 'Watch demo'
    }]
  }]
}, {
  version: '2.2',
  current: false,
  date: 'JUN 22, 2026',
  changes: 1,
  entries: [{
    type: 'FIXED',
    title: 'test 2',
    desc: 'Test',
    tags: ['QuickStart', 'Flows'],
    featured: true,
    actions: [{
      icon: 'external-link',
      label: 'try QS'
    }, {
      icon: 'tag',
      label: 'label'
    }, {
      icon: 'play',
      label: 'Watch demo'
    }]
  }]
}];
function VersionEntry({
  entry
}) {
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'flex-start',
      padding: '12px 0'
    }
  }, React.createElement(EntryIcon, {
    type: entry.type
  }), React.createElement('div', {
    style: {
      flex: 1
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      flexWrap: 'wrap',
      marginBottom: 4
    }
  }, React.createElement(TypeBadge, {
    type: entry.type
  }), entry.featured ? React.createElement(Icon, {
    name: 'star',
    size: 12,
    color: '#f59e0b',
    strokeWidth: 0,
    style: {
      fill: '#f59e0b'
    }
  }) : null, (entry.tags || []).map(function (t) {
    return React.createElement(TagPill, {
      key: t,
      label: t
    });
  })), entry.subtitle ? React.createElement('div', {
    style: {
      fontSize: 11,
      fontWeight: 500,
      color: 'var(--muted-foreground)',
      marginBottom: 2,
      letterSpacing: '.3px',
      textTransform: 'uppercase'
    }
  }, entry.subtitle) : null, React.createElement('div', {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--foreground)',
      marginBottom: 3
    }
  }, entry.title), React.createElement('div', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      lineHeight: 1.5,
      marginBottom: entry.actions && entry.actions.length ? 8 : 0
    }
  }, entry.desc), entry.actions && entry.actions.length > 0 ? React.createElement('div', {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, entry.actions.map(function (a) {
    return React.createElement(ActionBtn, {
      key: a.label,
      icon: a.icon,
      label: a.label
    });
  })) : null));
}
function VersionRow({
  ver
}) {
  const [open, setOpen] = React.useState(true);
  const dotColor = ver.current ? 'var(--primary)' : ver.entries[0] && ver.entries[0].type === 'FIXED' ? '#d97706' : 'var(--primary)';
  return React.createElement('div', {
    style: {
      display: 'flex',
      gap: 16,
      alignItems: 'flex-start'
    }
  },
  // Left dot + line
  React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      paddingTop: 4,
      flexShrink: 0
    }
  }, React.createElement('div', {
    style: {
      width: 12,
      height: 12,
      borderRadius: 'var(--radius-full)',
      background: dotColor,
      border: '2px solid var(--card)',
      outline: '2px solid ' + dotColor,
      flexShrink: 0
    }
  })),
  // Content
  React.createElement('div', {
    style: {
      flex: 1,
      paddingBottom: 20
    }
  },
  // Version header
  React.createElement('div', {
    onClick: function () {
      setOpen(function (o) {
        return !o;
      });
    },
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      cursor: 'pointer',
      marginBottom: open ? 8 : 0
    }
  }, React.createElement('span', {
    style: {
      fontSize: 14,
      fontWeight: 700,
      color: 'var(--foreground)'
    }
  }, 'v' + ver.version), ver.current ? React.createElement('span', {
    style: {
      fontSize: 10,
      fontWeight: 700,
      padding: '1px 6px',
      borderRadius: 'var(--radius-sm)',
      background: 'var(--primary)',
      color: 'var(--primary-foreground)',
      letterSpacing: '.4px'
    }
  }, 'CURRENT') : null, React.createElement('span', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)',
      textTransform: 'uppercase',
      letterSpacing: '.3px'
    }
  }, ver.date), React.createElement('span', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)'
    }
  }, '· ' + ver.changes + ' change'), React.createElement('div', {
    style: {
      marginLeft: 'auto'
    }
  }, open ? React.createElement(Icon, {
    name: 'chevron-down',
    size: 14,
    color: 'var(--muted-foreground)'
  }) : React.createElement(Icon, {
    name: 'chevron-right',
    size: 14,
    color: 'var(--muted-foreground)'
  }))),
  // Entries
  open ? React.createElement('div', {
    style: {
      paddingLeft: 0
    }
  }, ver.entries.map(function (entry, i) {
    return React.createElement(VersionEntry, {
      key: i,
      entry: entry
    });
  })) : null));
}
function WhatsNewView() {
  const [category, setCategory] = React.useState('ALL');
  const [featuredOnly, setFeaturedOnly] = React.useState(false);
  const categories = ['ALL', 'NEW', 'IMPROVED', 'FIXED'];
  const availableTags = ['Agent Studio', 'Apps', 'Concepts', 'Data Library', 'Flows', 'ONE Agents', 'Platform', 'QuickStart'];

  // Latest release (v2.5) expanded content
  const latestContent = React.createElement('div', {
    style: {
      background: 'color-mix(in srgb, var(--primary) 8%, var(--card))',
      border: '1px solid color-mix(in srgb, var(--primary) 25%, transparent)',
      borderRadius: 'var(--radius-xl)',
      padding: '20px 24px',
      marginBottom: 24
    }
  },
  // Header row
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      marginBottom: 12,
      flexWrap: 'wrap'
    }
  }, React.createElement('span', {
    style: {
      fontSize: 11,
      fontWeight: 700,
      padding: '3px 10px',
      borderRadius: 'var(--radius-pill)',
      background: 'var(--primary)',
      color: 'var(--primary-foreground)',
      letterSpacing: '.3px'
    }
  }, 'LATEST · 2·5'), React.createElement(TypeBadge, {
    type: 'NEW'
  }), React.createElement(Icon, {
    name: 'star',
    size: 13,
    color: '#f59e0b'
  }), React.createElement('span', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)'
    }
  }, 'Jun 23, 2026'), React.createElement('div', {
    style: {
      marginLeft: 'auto'
    }
  }, React.createElement(Icon, {
    name: 'chevron-up',
    size: 15,
    color: 'var(--muted-foreground)'
  }))), React.createElement(TagPill, {
    label: 'Apps'
  }), React.createElement('div', {
    style: {
      marginTop: 14
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '.5px',
      textTransform: 'uppercase',
      color: 'var(--muted-foreground)',
      marginBottom: 4
    }
  }, 'TEST NOTE - 2.5 ( MYRO )'), React.createElement('h2', {
    style: {
      fontSize: 22,
      fontWeight: 700,
      color: 'var(--foreground)',
      margin: '0 0 20px'
    }
  }, 'Type Curve Enhancements'), React.createElement('h3', {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--foreground)',
      margin: '0 0 6px'
    }
  }, 'New normalization options'), React.createElement('p', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      margin: '0 0 12px'
    }
  }, 'Type curves can now be normalized by three additional metrics:'),
  // Table
  React.createElement('table', {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      marginBottom: 20,
      fontSize: 13
    }
  }, React.createElement('thead', null, React.createElement('tr', {
    style: {
      background: 'color-mix(in srgb, var(--primary) 5%, var(--card))'
    }
  }, React.createElement('th', {
    style: {
      padding: '8px 12px',
      textAlign: 'left',
      color: 'var(--foreground)',
      fontWeight: 600,
      borderBottom: '1px solid var(--border)',
      width: '40%'
    }
  }, 'Method'), React.createElement('th', {
    style: {
      padding: '8px 12px',
      textAlign: 'left',
      color: 'var(--foreground)',
      fontWeight: 600,
      borderBottom: '1px solid var(--border)'
    }
  }, 'Description'))), React.createElement('tbody', null, [['Lateral length', 'Divide EUR by completed lateral feet'], ['Proppant intensity', 'Divide EUR by lbs/ft of proppant'], ['Fluid intensity', 'Divide EUR by bbl/ft of fluid']].map(function (row) {
    return React.createElement('tr', {
      key: row[0],
      style: {
        borderBottom: '1px solid var(--border)'
      }
    }, React.createElement('td', {
      style: {
        padding: '8px 12px',
        color: 'var(--foreground)'
      }
    }, row[0]), React.createElement('td', {
      style: {
        padding: '8px 12px',
        color: 'var(--muted-foreground)'
      }
    }, row[1]));
  }))), React.createElement('h3', {
    style: {
      fontSize: 16,
      fontWeight: 700,
      color: 'var(--foreground)',
      margin: '0 0 8px'
    }
  }, 'Improved P-series bands'), React.createElement('p', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      lineHeight: 1.6,
      margin: '0 0 10px'
    }
  }, 'The ', React.createElement('strong', {
    style: {
      color: 'var(--foreground)'
    }
  }, 'P10/P50/P90'), ' confidence bands are now computed using a bootstrapped ensemble method rather than a simple percentile rank. This produces smoother bands on sparse datasets and better represents uncertainty at the tails.'), React.createElement('blockquote', {
    style: {
      borderLeft: '3px solid var(--primary)',
      paddingLeft: 12,
      margin: '10px 0',
      fontStyle: 'italic',
      fontSize: 13,
      color: 'var(--muted-foreground)'
    }
  }, '"Note: Existing saved type curves will be recalculated automatically the first time you open them after this update."'), React.createElement('p', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      margin: '10px 0 16px'
    }
  }, 'To switch normalization methods, use the ', React.createElement('strong', {
    style: {
      color: 'var(--foreground)'
    }
  }, 'Normalize by'), ' dropdown in the type curve toolbar.'), React.createElement('button', {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      padding: '8px 16px',
      background: 'var(--primary)',
      border: 'none',
      borderRadius: 'var(--radius-md)',
      cursor: 'pointer',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--primary-foreground)',
      fontFamily: 'var(--font-sans)',
      letterSpacing: '.3px'
    }
  }, React.createElement(Icon, {
    name: 'zap',
    size: 13,
    strokeWidth: 2.5,
    color: 'var(--primary-foreground)'
  }), 'CLICK THIS BTN')));
  return React.createElement('div', {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 20
    }
  },
  // ── Header ────────────────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      marginBottom: 4
    }
  }, React.createElement('div', null, React.createElement('h1', {
    style: {
      fontSize: 24,
      fontWeight: 600,
      color: 'var(--foreground)',
      margin: '0 0 4px'
    }
  }, "What's New"), React.createElement('p', {
    style: {
      fontSize: 14,
      color: 'var(--muted-foreground)',
      margin: 0
    }
  }, 'The latest features, improvements, and fixes across Enverus ONE.'))),
  // ── Filters card ──────────────────────────────────────────────────────
  React.createElement('div', {
    style: {
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)',
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 13,
      fontWeight: 600,
      color: 'var(--foreground)'
    }
  }, React.createElement(Icon, {
    name: 'filter',
    size: 14,
    strokeWidth: 1.75
  }), 'Filters'),
  // Search
  React.createElement('div', null, React.createElement('div', {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--muted-foreground)',
      marginBottom: 6
    }
  }, 'Search'), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8,
      height: 34,
      background: 'var(--accent)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      padding: '0 12px'
    }
  }, React.createElement(Icon, {
    name: 'search',
    size: 13,
    color: 'var(--muted-foreground)',
    strokeWidth: 1.75
  }), React.createElement('span', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)',
      userSelect: 'none'
    }
  }, 'Search by title or description...'))),
  // Category + Featured only
  React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, React.createElement('div', null, React.createElement('div', {
    style: {
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--muted-foreground)',
      marginBottom: 6
    }
  }, 'Category'), React.createElement('div', {
    role: 'tablist',
    'aria-label': 'Category filter',
    style: {
      display: 'flex',
      gap: 6
    }
  }, categories.map(function (cat) {
    const active = category === cat;
    return React.createElement('button', {
      key: cat,
      role: 'tab',
      'aria-selected': active,
      onClick: function () {
        setCategory(cat);
      },
      style: {
        padding: '5px 12px',
        fontSize: 12,
        fontWeight: active ? 700 : 500,
        background: active ? 'var(--primary)' : 'transparent',
        color: active ? 'var(--primary-foreground)' : 'var(--foreground)',
        border: '1px solid ' + (active ? 'var(--primary)' : 'var(--border)'),
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)'
      }
    }, cat);
  }))), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, React.createElement(Icon, {
    name: 'star',
    size: 14,
    color: 'var(--muted-foreground)'
  }),
  // Toggle
  React.createElement('div', {
    onClick: function () {
      setFeaturedOnly(function (f) {
        return !f;
      });
    },
    style: {
      width: 36,
      height: 20,
      borderRadius: 'var(--radius-full)',
      background: featuredOnly ? 'var(--primary)' : 'var(--muted)',
      cursor: 'pointer',
      position: 'relative',
      transition: 'background .2s'
    }
  }, React.createElement('div', {
    style: {
      position: 'absolute',
      top: 2,
      left: featuredOnly ? 18 : 2,
      width: 16,
      height: 16,
      borderRadius: 'var(--radius-full)',
      background: 'white',
      transition: 'left .2s'
    }
  })), React.createElement('span', {
    style: {
      fontSize: 13,
      color: 'var(--muted-foreground)'
    }
  }, 'Featured only'))),
  // Tags
  React.createElement('div', null, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6,
      fontSize: 12,
      fontWeight: 500,
      color: 'var(--muted-foreground)',
      marginBottom: 6
    }
  }, React.createElement(Icon, {
    name: 'tag',
    size: 12,
    strokeWidth: 1.75
  }), 'Tags'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 6,
      flexWrap: 'wrap'
    }
  }, availableTags.map(function (tag) {
    return React.createElement('button', {
      key: tag,
      style: {
        fontSize: 12,
        fontWeight: 500,
        padding: '3px 10px',
        borderRadius: 'var(--radius-pill)',
        background: 'transparent',
        border: '1px solid var(--border)',
        color: 'var(--muted-foreground)',
        cursor: 'pointer',
        fontFamily: 'var(--font-sans)'
      }
    }, tag);
  })))),
  // ── Latest release expanded card ───────────────────────────────────────
  latestContent,
  // ── Changelog ─────────────────────────────────────────────────────────
  React.createElement('div', null, React.createElement('div', {
    style: {
      fontSize: 15,
      fontWeight: 700,
      color: 'var(--foreground)',
      marginBottom: 16
    }
  }, 'Changelog'), React.createElement('div', {
    style: {
      paddingLeft: 8
    }
  }, VERSIONS.map(function (ver) {
    return React.createElement(VersionRow, {
      key: ver.version,
      ver: ver
    });
  }))));
}
Object.assign(window, {
  WhatsNewView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/whats-new.jsx", error: String((e && e.message) || e) }); }

// ui_kits/enverus-one/workflow.jsx
try { (() => {
/* global React, Icon, Button, ChatScroller, ChatMarker, ChatMessage, ChatBubble, ChatAttachment */
// Enverus One — AFE Evaluation Workflow view

const WF_STEPS = [{
  id: 'upload',
  label: 'Upload Documents',
  done: true
}, {
  id: 'extract',
  label: 'Extract Documents',
  done: true
}, {
  id: 'review',
  label: 'Run Review',
  done: true
}, {
  id: 'analyze',
  label: 'Analyze',
  done: true
}, {
  id: 'output',
  label: 'Output',
  done: true,
  active: true
}];
function GaugeChart({
  value
}) {
  var r = 36,
    circ = 2 * Math.PI * r,
    dash = value / 100 * circ;
  return React.createElement('svg', {
    width: 88,
    height: 88,
    viewBox: '0 0 88 88',
    style: {
      flexShrink: 0
    }
  }, React.createElement('circle', {
    cx: 44,
    cy: 44,
    r: r,
    fill: 'none',
    stroke: 'var(--border)',
    strokeWidth: 7
  }), React.createElement('circle', {
    cx: 44,
    cy: 44,
    r: r,
    fill: 'none',
    stroke: 'var(--primary)',
    strokeWidth: 7,
    strokeDasharray: dash + ' ' + (circ - dash),
    strokeLinecap: 'round',
    transform: 'rotate(-90 44 44)'
  }), React.createElement('text', {
    x: 44,
    y: 50,
    textAnchor: 'middle',
    fontSize: 15,
    fontWeight: 700,
    fill: 'var(--foreground)',
    fontFamily: 'var(--font-sans)'
  }, value + '%'));
}
function WorkflowSidebar() {
  return React.createElement('div', {
    style: {
      width: 210,
      flexShrink: 0,
      background: 'var(--sidebar)',
      borderRight: '1px solid var(--sidebar-border)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, React.createElement('div', {
    style: {
      padding: '14px 16px 12px',
      borderBottom: '1px solid var(--sidebar-border)'
    }
  }, React.createElement('div', {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--sidebar-foreground)'
    }
  }, 'Steps')), React.createElement('div', {
    style: {
      padding: '14px'
    }
  }, WF_STEPS.map(function (step, i) {
    return React.createElement('div', {
      key: step.id
    }, React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '5px 0'
      }
    }, React.createElement('div', {
      style: {
        width: 22,
        height: 22,
        borderRadius: '50%',
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: step.done ? 'var(--primary)' : 'var(--accent)',
        border: step.done ? 'none' : '1px solid var(--border)'
      }
    }, step.done ? React.createElement(Icon, {
      name: 'check',
      size: 12,
      strokeWidth: 2.5,
      color: 'var(--primary-foreground)'
    }) : React.createElement('div', {
      style: {
        width: 6,
        height: 6,
        borderRadius: '50%',
        background: 'var(--border)'
      }
    })), React.createElement('span', {
      style: {
        fontSize: 13,
        fontWeight: step.active ? 600 : 400,
        color: step.active ? 'var(--sidebar-foreground)' : 'var(--muted-foreground)'
      }
    }, step.label)), i < WF_STEPS.length - 1 && React.createElement('div', {
      style: {
        width: 2,
        height: 18,
        background: WF_STEPS[i + 1].done ? 'var(--primary)' : 'var(--border)',
        margin: '2px 0 2px 10px'
      }
    }));
  })));
}

// ── Data ───────────────────────────────────────────────────────────────────

var VERIFY_ROWS = [{
  field: 'WELL NAME',
  value: 'PALO DURO TR 2 UNIT 2H',
  hl: false
}, {
  field: 'OPERATOR LEASE',
  value: 'OCCIDENTAL PETROLEUM',
  hl: false
}, {
  field: 'FINANCIAL VALUE',
  value: '$2,450,000',
  hl: true
}, {
  field: 'API NUMBER',
  value: '42-165-37721-00-00',
  hl: false
}, {
  field: 'SURFACE LOCATION',
  value: '33N-5W Sec 12 NE/4',
  hl: false
}, {
  field: 'TOTAL DEPTH',
  value: '12,840 ft MD',
  hl: false
}, {
  field: 'WORKING INTEREST',
  value: '100%',
  hl: false
}, {
  field: 'NET REVENUE INT.',
  value: '80.000%',
  hl: false
}];
var AFE_DETAILS = [{
  icon: 'map-pin',
  label: 'Location',
  val: 'Permian Basin, TX'
}, {
  icon: 'layers',
  label: 'Field',
  val: 'Delaware Basin'
}, {
  icon: 'file-text',
  label: 'Lease',
  val: 'PALO DURO TR 2'
}, {
  icon: 'dollar-sign',
  label: 'Net Cost',
  val: '$2,450,000'
}];
var LOG_ENTRIES = [{
  msg: 'loading_agent_tool_calls(null)',
  note: null
}, {
  msg: 'afe_will_use_these_files:',
  note: 'You will use files from all shown files'
}, {
  msg: 'apply_agent_prioritization_method(null)',
  note: 'afe will prioritize using 15 clear filter files'
}, {
  msg: 'apply_agent_normalized_method(null)',
  note: 'You will run evaluation from all shown files'
}, {
  msg: 'loading_agent_run_not(null)',
  note: null
}];
var REPORT_SECTIONS = [{
  title: 'Summary Analysis',
  content: [{
    h: 'Executive Decision Summary',
    type: 'text',
    text: 'Reviewing Operator AFEs to identify the most suitable exceeding $200,000 fiscal year limit. Recommend allocating $1,750,500 to Operator-level projects based on capital fit and strategic alignment.'
  }, {
    h: 'Recommendation',
    type: 'table',
    headers: ['FOB', 'MFR %', 'TARGET %'],
    rows: [['35,845', '$5,264.50', '$4.24,250'], ['35,845', '35%', '42%']]
  }]
}, {
  title: 'Evaluation Methodology',
  content: [{
    type: 'table',
    headers: ['Step', 'Method', 'Output'],
    rows: [['1', 'AFE document parsing + semantic extraction', 'Structured data fields'], ['2', 'Capital alignment scoring', 'Budget fit score']]
  }]
}, {
  title: 'AFE Comparison Summary',
  content: [{
    type: 'table',
    headers: ['AFE', 'Operator', 'Location', 'WI %', 'NRI %', 'Net Cost', 'Status'],
    rows: [['g1001665', 'Atlas Exploration', 'Permian', '100%', '80%', '$2.1M', 'Approved']]
  }]
}, {
  title: 'Detailed AFE Analysis',
  content: [{
    h: 'AFE g1001665 — Permian Basin',
    type: 'table',
    headers: ['Category', 'Methodology', 'Budget'],
    rows: [['Drilling', 'Vertical completion, 3-stage frac', '$940,000'], ['Completion', 'Plug-and-perf, 2" tubing, artificial lift', '$720,000'], ['Surface Equipment', 'Tank battery, separator, flow lines', '$290,000'], ['Environmental', 'Spill containment, reserve pit liner', '$189,000'], ['Contingency (10%)', 'Standard contingency provision', '$248,000']]
  }]
}, {
  title: 'Recommendations & Allocation',
  content: [{
    h: 'Capital Allocation',
    type: 'table',
    headers: ['Category', 'Recommended', 'Rationale'],
    rows: [['g1001665', '$2,450,000', 'High Priority']]
  }, {
    h: 'Optimization Metrics',
    type: 'table',
    headers: ['Metric', 'Value'],
    rows: [['Return on Investment', '34%'], ['Payback Period', '18 months']]
  }]
}];

// ── Chat content components ────────────────────────────────────────────────

var thS = {
  padding: '6px 10px',
  textAlign: 'left',
  fontSize: 11,
  fontWeight: 600,
  color: 'var(--muted-foreground)',
  letterSpacing: '.2px',
  textTransform: 'uppercase',
  borderBottom: '1px solid var(--border)',
  background: 'var(--env-one-background)',
  whiteSpace: 'nowrap'
};
var tdS = {
  padding: '7px 10px',
  fontSize: 12,
  color: 'var(--foreground)',
  borderBottom: '1px solid var(--border)'
};
function DataTable({
  headers,
  rows
}) {
  return React.createElement('div', {
    style: {
      overflowX: 'auto',
      marginTop: 8,
      marginBottom: 4
    }
  }, React.createElement('table', {
    style: {
      width: '100%',
      borderCollapse: 'collapse',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden'
    }
  }, React.createElement('thead', null, React.createElement('tr', null, headers.map(function (h) {
    return React.createElement('th', {
      key: h,
      style: thS
    }, h);
  }))), React.createElement('tbody', null, rows.map(function (row, ri) {
    return React.createElement('tr', {
      key: ri
    }, row.map(function (cell, ci) {
      return React.createElement('td', {
        key: ci,
        style: Object.assign({}, tdS, ri === rows.length - 1 ? {
          borderBottom: 0
        } : {})
      }, cell);
    }));
  }))));
}
function ExtractionContent() {
  return React.createElement('div', null, React.createElement('div', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)',
      marginBottom: 12
    }
  }, 'Extracted 8 fields from AFE_g1001665_2026.pdf:'), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '10px 24px'
    }
  }, VERIFY_ROWS.map(function (row) {
    return React.createElement('div', {
      key: row.field
    }, React.createElement('div', {
      style: {
        fontSize: 10,
        fontWeight: 600,
        letterSpacing: '.3px',
        color: 'var(--muted-foreground)',
        textTransform: 'uppercase',
        marginBottom: 2
      }
    }, row.field), React.createElement('div', {
      style: {
        fontSize: 13,
        color: row.hl ? 'var(--primary)' : 'var(--foreground)',
        fontWeight: row.hl ? 600 : 400
      }
    }, row.value));
  })), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 14
    }
  }, React.createElement(Button, {
    variant: 'secondary',
    size: 'sm',
    icon: 'download'
  }, 'Download CSV'), React.createElement(Button, {
    variant: 'secondary',
    size: 'sm'
  }, 'Reformat Data')));
}
function ReviewContent() {
  return React.createElement('div', null, React.createElement('div', {
    style: {
      display: 'flex',
      gap: 16,
      marginBottom: 14
    }
  }, React.createElement('div', {
    style: {
      flex: 1
    }
  }, React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--muted-foreground)',
      marginBottom: 3
    }
  }, 'Available Capital Budget'), React.createElement('div', {
    style: {
      fontSize: 22,
      fontWeight: 700,
      letterSpacing: '-0.5px',
      color: 'var(--foreground)',
      marginBottom: 10
    }
  }, '$100,000'), React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--muted-foreground)',
      marginBottom: 2
    }
  }, 'Total Budget Per Year (P)'), React.createElement('div', {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--foreground)',
      marginBottom: 8
    }
  }, '$2,450,000'), React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--muted-foreground)',
      lineHeight: 1.5
    }
  }, 'First in fiscal year evaluation. Capital Budget of $100,000 are the available capital budget.')), React.createElement(GaugeChart, {
    value: 93.3
  })), React.createElement('div', {
    style: {
      background: 'var(--env-one-background)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-lg)',
      padding: '12px 14px'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10
    }
  }, React.createElement('div', null, React.createElement('div', {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--foreground)'
    }
  }, 'g1001665'), React.createElement('div', {
    style: {
      fontSize: 11,
      color: 'var(--muted-foreground)',
      marginTop: 1
    }
  }, 'PALO DURO 2H')), React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 5
    }
  }, React.createElement('div', {
    style: {
      width: 7,
      height: 7,
      borderRadius: '50%',
      background: 'var(--primary)'
    }
  }), React.createElement('span', {
    style: {
      fontSize: 12,
      color: 'var(--primary)',
      fontWeight: 600
    }
  }, 'Score: 98'))), React.createElement('div', {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 10
    }
  }, AFE_DETAILS.map(function (d) {
    return React.createElement('div', {
      key: d.label
    }, React.createElement('div', {
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 4,
        marginBottom: 3
      }
    }, React.createElement(Icon, {
      name: d.icon,
      size: 11,
      color: 'var(--muted-foreground)'
    }), React.createElement('span', {
      style: {
        fontSize: 10,
        color: 'var(--muted-foreground)',
        textTransform: 'uppercase',
        letterSpacing: '.2px'
      }
    }, d.label)), React.createElement('div', {
      style: {
        fontSize: 12,
        fontWeight: 500,
        color: 'var(--foreground)'
      }
    }, d.val));
  }))));
}
function ReportContent() {
  return React.createElement('div', null, React.createElement('div', {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 14
    }
  }, React.createElement('h1', {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: 'var(--foreground)',
      margin: 0,
      letterSpacing: '-0.3px'
    }
  }, 'AFE Evaluation Report'), React.createElement('div', {
    style: {
      display: 'flex',
      gap: 6
    }
  }, React.createElement(Button, {
    variant: 'secondary',
    size: 'sm',
    icon: 'send-horizontal'
  }, 'Send to Sheets'), React.createElement(Button, {
    variant: 'default',
    size: 'sm',
    icon: 'download'
  }, 'Export PDF'))), React.createElement('div', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)',
      marginBottom: 14
    }
  }, '• Date: June 13, 2026'), REPORT_SECTIONS.map(function (section, si) {
    return React.createElement('div', {
      key: si
    }, React.createElement('h2', {
      style: {
        fontSize: 14,
        fontWeight: 700,
        color: 'var(--foreground)',
        margin: '18px 0 8px',
        paddingBottom: 5,
        borderBottom: '1px solid var(--border)'
      }
    }, section.title), section.content.map(function (item, ii) {
      return React.createElement('div', {
        key: ii,
        style: {
          marginBottom: 8
        }
      }, item.h && React.createElement('div', {
        style: {
          fontSize: 12,
          fontWeight: 600,
          color: 'var(--foreground)',
          margin: '8px 0 4px'
        }
      }, item.h), item.type === 'text' && React.createElement('p', {
        style: {
          fontSize: 13,
          color: 'var(--muted-foreground)',
          lineHeight: 1.6,
          margin: 0
        }
      }, item.text), item.type === 'list' && React.createElement('ul', {
        style: {
          paddingLeft: 18,
          margin: '4px 0'
        }
      }, item.items.map(function (it, j) {
        return React.createElement('li', {
          key: j,
          style: {
            fontSize: 13,
            color: 'var(--muted-foreground)',
            lineHeight: 1.6,
            marginBottom: 3
          }
        }, it);
      })), item.type === 'table' && React.createElement(DataTable, {
        headers: item.headers,
        rows: item.rows
      }));
    }));
  }));
}

// ── Workflow body (chat layout) ────────────────────────────────────────────

class WorkflowBody extends React.Component {
  constructor(props) {
    super(props);
    this.scrollRef = React.createRef();
  }
  componentDidMount() {
    if (this.scrollRef.current) {
      this.scrollRef.current.scrollTop = this.scrollRef.current.scrollHeight;
    }
  }
  render() {
    return React.createElement(ChatScroller, {
      scrollRef: this.scrollRef
    },
    // ── Step 1: Upload ──────────────────────────────────────
    React.createElement(ChatMarker, {
      completed: true
    }, 'Jun 13, 2026'), React.createElement(ChatMessage, {
      role: 'user'
    }, React.createElement(ChatBubble, {
      variant: 'primary'
    }, 'Evaluate AFE g1001665 for Q2 2026 capital allocation.'), React.createElement(ChatAttachment, {
      title: 'AFE_g1001665_2026.pdf',
      desc: 'PDF · 2.1 MB',
      state: 'done'
    })),
    // ── Step 2: Extract ─────────────────────────────────────
    React.createElement(ChatMarker, {
      completed: true
    }, 'Extracted documents'), React.createElement(ChatMessage, {
      role: 'assistant'
    }, React.createElement(ChatBubble, {
      variant: 'ghost'
    }, React.createElement(ExtractionContent, null))),
    // ── Step 3: Review ──────────────────────────────────────
    React.createElement(ChatMarker, {
      completed: true
    }, 'Ran review — Score 98'), React.createElement(ChatMessage, {
      role: 'assistant'
    }, React.createElement(ChatBubble, {
      variant: 'ghost'
    }, React.createElement(ReviewContent, null))),
    // ── Step 4: Analyze ─────────────────────────────────────
    // ── Step 5: Output ──────────────────────────────────────
    React.createElement(ChatMarker, {
      completed: true
    }, 'Output generated'), React.createElement(ChatMessage, {
      role: 'assistant'
    }, React.createElement(ChatBubble, {
      variant: 'ghost'
    }, React.createElement(ReportContent, null)), React.createElement(ChatAttachment, {
      title: 'AFE-evaluation-report.pdf',
      desc: 'PDF · Ready for download',
      state: 'done'
    })));
  }
}

// ── WorkflowView ───────────────────────────────────────────────────────────

function WorkflowView() {
  return React.createElement('div', {
    style: {
      display: 'flex',
      height: '100%'
    }
  }, React.createElement(WorkflowSidebar, null), React.createElement('div', {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      background: 'transparent'
    }
  }, React.createElement('div', {
    style: {
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '10px 22px 0',
      flexShrink: 0
    }
  }, React.createElement('span', {
    style: {
      fontSize: 12,
      color: 'var(--muted-foreground)'
    }
  }, '5 / 5 steps complete')), React.createElement('div', {
    style: {
      flex: 1,
      minHeight: 0,
      overflow: 'auto'
    }
  }, React.createElement(WorkflowBody, null))));
}
Object.assign(window, {
  WorkflowView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/enverus-one/workflow.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Progress = __ds_scope.Progress;

})();
