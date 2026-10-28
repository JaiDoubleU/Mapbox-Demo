# Enverus One — Design System

A design-agent–ready package of the **Enverus One** visual language: colors, type, fonts, spacing, components, and a high-fidelity UI kit. Feed it to a design agent (or a developer) to produce on-brand interfaces, mocks, and prototypes for the Enverus One platform.

> **Note on the brand:** This system was reconstructed and is synced from the `enverus-one` codebase at https://github.com/enverus-ea/env-one.ui/.  It is a Next.js + shadcn/ui + Tailwind css based implementation with a comprehensive `DESIGN.md`. This design system is an *alpha* design system generated against that product and is internally labelled "Enverus One Design System."

---

## What is Enverus One?

Enverus One is the **governed AI execution platform for the energy industry**. The application is built for analysts, engineers, land managers, and operators who make high-stakes decisions fast — not for passive browsing. Design decisions tend to serve that context: **information density over decoration, green action authority over ambient brand color, and AI execution surfaces that are clearly distinct from surrounding data.**

The overall goal of this design system is to be the first step in a **design to code workflow** that streamlines the handoff between designers and developers.  Enverus One is a single application (no separate marketing site or docs site in scope). Its domain is upstream energy: **wells, basins, leases, production, formations** — the sample copy throughout references Permian / Midland / Delaware basins, API well numbers, MBoe/d production, and lease-expiry workflows.

### The two structural surfaces

The layout is built on the standard **shadcn/ui token model** with a full light + dark theme (toggle the `.dark` class on the root). Two surfaces frame every page:

1. **Content canvas** — white `--card` surfaces on a softer `--env-one-background` page (`oklch(0.85)` ≈ #d4d4d4 light / #1e1e1e dark). All analytical and workflow surfaces: DataTable, KPICard, SidePanel, DocumentViewer, ChatUI, ExecutionViewer.
2. **Navigation shell** — the AppSidebar (left) + AppHeader (top), driven by the `--sidebar*` tokens. The shell **follows the theme** (near-white in light mode, near-black in dark) rather than being a permanently dark frame. The active nav item is always solid Enverus green.

### What makes it AI-native

ChatUI, ExecutionViewer, and JsonUIRenderer are **first-class system components**, not add-ons. Agent execution has its own semantic state language (pending / running / success / error) that is distinct from generic badges. AI work product gets one extra step of elevation (`card-elevated`) to separate it from the data around it.

---

## Getting Started

This design system reflects the **Enverus One (E1) application**, built on **React, TypeScript, shadcn/ui, Tailwind CSS, and Next.js**. Source of truth: `enverus-ea/env-one.ui` on GitHub.

#### Creating a new design

- **Go to https://claude.ai/design**
- **Select this design system** from the "Design System" dropdown. 
- **Select 'Prototype'** from the Template dropdown.
- **Write a prompt for your project** that reference a starting page, by including the name of a page from this design system in your prompt.  For example:
  - *"Use the layout pattern from the Flows page as the starting point for a new screen that contains..."* 
  - *"Create a prototype using the Workflow Page as a starting point.  The prototype should ..."*
- **Review the first draft.** Claude checks its output against the connected design system and self-corrects before you see it, but treat this as a starting point, not final.
- **Refine** using inline comments, direct text edits, or adjustment sliders — then ask Claude to apply changes across the full design.
- **Export or hand off** when ready — as a share link, PDF/PPTX, standalone HTML, or **Handoff to Claude Code** if it's going into real code.

#### Tips for your prompts

- Reference components by name — say "use our `DataTable`" or "use `AppLayout` with a `SidePanel`," not "add a table" or "add a sidebar."

- Reference elements in the page by using the Comments button at the top to select an element OR you can reference elements by mentioning specific attributes (i.e. classnames, id, data- attribures, etc) of elements in the HTML of the prototype

#### Core building blocks

- **Layout:** `AppLayout`, `AppHeader`, `AppSidebar`, `SidePanel`

- **Primitives:** `Button`, `Badge`, `Input`, `Select`, `DataTable`

- **Overlays:** `Dialog`, `Sheet`, `Modal`

- **Chat/AI:** `ChatUI`, `ExecutionViewer`

- **App-level:** `Header`, `Sidebar`

#### Workflow

1. Write a specific first prompt naming the component(s) you want to target for change as well as any tokens you want to see used.

2. Review the results and refine with inline comments or adjustment prompts

3. Iterate

#### Where to check when something looks off

- Component props/variants: consult the `component-library` reference before assuming a component doesn't support what you need.

- Token conflicts (e.g. `--warning`) or legacy notation: cross-check against `EnvOne.css` in the repo — this system has had drift issues before.

---

## Sources

Everything in this design system was derived from a read-only codebase mounted into the project:

- **Codebase:** `enverus-one-design-system/` — a Next.js 15 + React 19 + Tailwind v4 + shadcn/ui project.
  - `DESIGN.md` (+ `design/*.md`) — the authoritative token + component spec. The single richest source.
  - `app/globals.css` — live OKLCH theme variables (light + dark + sidebar shell).
  - `app/preview/page.tsx` — a working component gallery; the source of truth for *real* sample copy and component composition.
  - `components/ui/*.tsx` — the shadcn/ui component implementations (button, badge, card, dialog, etc.).
- **Product page referenced in DESIGN.md:** `https://www.enverus.com/products/ai/one/`
- Package namespaces referenced by the spec (not present as source): `@enverus/one-ui`, `@env-one-ui/app-components`.

> The reader of this README may not have access to the original codebase — the relevant values have been copied into this folder so it stands alone.

---

## AI Instructions

- **Markdown:**
  - `DESIGN.md` (+ `design/*.md`) — the authoritative token + component spec. The single richest source. Other markdown files linked from DESIGN.md are as follows
  - `SKILL.md` - This a custom ShadCN/UI skill for generating well-branded interfaces and assets for Enverus One, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping.

---

## Content Fundamentals

How copy is written across the product.

- **Voice: operational and direct.** Copy reads like an instruction to a capable colleague, not marketing. Verbs lead actions: *"Run Workflow," "Run Analysis," "Generate Report," "Export CSV," "Apply," "Save Changes," "Discard."*
- **Person:** Mostly **imperative / no pronoun** for actions ("Run Analysis", "Configure data source"). System status is stated in the **third person, present continuous** ("Agent is currently processing 1,204 well records", "Formation data is updating in the background"). Avoids "I"; rarely uses "you."
- **Casing: sentence case everywhere** for body, descriptions, and dialog text. **Title Case for button labels and short action labels** ("Run Workflow", "Open Dialog", "Save Changes"). Section labels in the component gallery are **UPPERCASE with wide tracking** (e.g. "BUTTONS", "FORM INPUTS") — used sparingly as eyebrow/structural labels only.
- **Numbers are concrete and domain-specific.** Copy is dense with real figures: *"3,840 active wells · 142 MBoe/d avg production," "847 production records," "3 leases expire within 60 days," "24 wells flagged for review."* Numbers carry units (MBoe/d, wells, days) and use thousands separators.
- **Domain vocabulary:** basins (Permian, Midland, Delaware, Anadarko, ArkLaTex), API numbers ("42-329-30742-0000"), operators, formations, leases, production records, well IDs ("Well #4821-A").
- **Status language is precise and semantic.** Approved / Pending Review / Rejected / Processing / Archived / Active / Complete / Failed / Expired / Draft / Inactive. Each maps to a specific badge color — language and color are locked together.
- **Tone of alerts is factual, not alarmist** even at high stakes: *"This will permanently delete 847 production records for Well #4821-A. This action cannot be undone."* — states the consequence plainly, no exclamation.
- **No emoji. No exclamation points. No filler.** The product respects the reader's time and expertise. Microcopy is short, scannable, and assumes domain fluency.
- **Punctuation:** middle-dot (`·`) separates inline metadata ("Midland Basin · Permian · Last updated 2 hours ago"). Em-dashes and ellipses ("…") appear in descriptions and placeholders ("Add operational notes…").

---

## Visual Foundations

### Color

- **One authority color.** Enverus green `#3C8321` does *all* action authority — primary CTAs, the active sidebar item, positive KPI trends, confirmed execution steps, and the success semantic. Its **restraint** is what makes it read as an operational signal. Never used as a large surface background.
- **Orange `#FF5F23` is urgency-only** — warnings, alerts, escalation states. **Never a primary CTA.** Never in the nav.
- **Red `#dc2626` is the only red**, reserved for destructive/failure. The semantic split is strict: orange = caution, red = failure.
- **Blue `#2563eb` (info)** carries informational banners, focus context, and the *running* execution state.
- **Neutrals do the heavy lifting:** a **pure-gray** ramp (chroma 0) — `--foreground` (ink) → `--body` → `--muted-foreground` on the text side; `--card` (white) → `--env-one-background` (≈#d4d4d4) → `--accent` on surfaces; `--border` / `--input` for hairlines. All defined as shadcn `oklch` tokens and inverted under `.dark`.
- **Imagery vibe:** there is essentially **no decorative imagery** — the product is data surfaces, not photography. Color comes from data (charts, status), not atmosphere.

### Type

- **Roboto Flex for everything**, at controlled weights. Hierarchy is built from **size + weight + density**, never decorative faces. Display/KPI = 700, titles = 600, button/label/nav = 500, body = 400.
- **Roboto Mono only where column alignment matters** — DataTable numeric cells, execution log output, code/API values. Never a stylistic choice.
- **KPI values are always 700 / 28px / ink** — the scanning speed of an analyst depends on that weight; never soften it.

### Spacing & density

- **4px base unit.** Tokens xxs(2) · xs(4) · sm(8) · md(12) · lg(16) · xl(24) · 2xl(32) · 3xl(48) · section(64).
- **Tight, intentional whitespace.** This is a dense product — KPI rows, tables, filter panels, and execution viewers coexist on one surface. **Hairlines do the separation work**, not large breathing gaps. Card padding is 20–24px; dense table/tool cards drop to 12–16px.

### Backgrounds, depth & elevation

- **Flat-first.** Depth comes from **surface contrast** (white `--card` on the softer `--env-one-background` page) and **1px hairlines** — not shadows.
- **No atmospheric gradients, mesh, or glow.** Explicitly forbidden on content surfaces.
- Four elevation levels: **Flat** (page bg, sidebar items) → **Hairline** (default card, inputs, table dividers) → **Soft shadow** `0 1px 3px rgba(0,0,0,.08)` (card-elevated, AI surfaces, dropdowns) → **Overlay shadow** `0 20px 60px rgba(0,0,0,.15)` (dialogs, sheets).
- **AI surfaces** (ChatUI, ExecutionViewer) get exactly one elevation step (soft shadow) to sit above surrounding data — no separate color mode.

### Borders & corner radii

- Functional radius scale: **xs 2 · sm 4 · md 6 · lg 8 · xl 12 · 2xl 16 · pill 9999 · full 50%.**
- **`xl` (12px) is the default card radius** — reads "contained" without feeling rounded.
- **Buttons/inputs use `md` (6px).** **Pill radius is reserved for badges** — putting it on buttons dilutes badge language (explicit rule).
- Borders are `#e5e7eb` hairlines by default; inputs/selects use the stronger `#d1d5db`.

### Interaction states

- **Hover (green CTA):** darken to `#2f6a1a`. In shadcn implementation, default buttons hover via `bg-primary/80` (slight transparency).
- **Press/active:** darken further to `#265714`, plus the button nudges **down 1px** (`active:translate-y-px`) — a subtle tactile press, no shrink.
- **Disabled:** green CTAs go to `#c8dfc2` (a desaturated tint, not gray) with muted text; generic disabled is `opacity-50` + no pointer events.
- **Focus:** `1px` green border + a `2px` green ring at 15% opacity (`0 0 0 2px rgba(60,131,33,.15)`). Keyboard focus is always visible.
- **Sidebar nav hover:** background lifts to `--sidebar-accent`; active item is solid green with white text.
- **Table row hover:** background to a subtle muted fill; selected row gets a green-tinted `--success-background` fill + a 2px green left border.

### Animation

- Transitions are **quick and utilitarian** (`transition-all` on interactive elements). No bounces, no decorative motion. Skeletons use a subtle shimmer. Sidebar collapse and execution-step transitions exist but timings are intentionally unspecified — keep them fast and unobtrusive.

### Transparency & blur

- Used sparingly and structurally: the component-gallery header uses `bg-background/95` + `backdrop-blur` for a sticky bar. Semantic tints are built with low-opacity color-mix (e.g. `bg-primary/10`). No glassmorphism as decoration.

### Cards

- Default card: white surface, **1px `#e5e7eb` hairline**, **12px radius**, 20×24px padding, **no shadow**. Elevated card adds the soft shadow only. No colored left-border accent cards. No rounded-corner-plus-accent-bar trope.

---

## Iconography

- **Icon system: [Lucide](https://lucide.dev).** The codebase imports `lucide-react` directly (e.g. `Bell, Settings, Trash2, Download, Zap, Info, AlertTriangle, CheckCircle, User, Sun, Moon`). Lucide is the canonical icon set for Enverus One. **Material Symbols Outlined** is also wired (`fonts/MaterialSymbolsOutlined.ttf`, variable `FILL`/`GRAD`/`opsz`/`wght` axes) as a secondary glyph font.
- **Style:** thin, consistent **stroke icons** (no fills), rounded line caps/joins, drawn on a 24px grid. In the UI they render small and quiet — typically `size-4` (16px) inline and `size-3.5` (14px) in dense contexts, in muted gray, only taking green on active/semantic states.
- **No icon font, no SVG sprite, no PNG icons** ship in the repo — icons are pulled per-component from the Lucide React package.
- **No emoji**, and no unicode-glyph-as-icon. The middle-dot `·` is used as a *text separator*, not an icon.
- **In this design system:** use Lucide from CDN. For static HTML artifacts, load `https://unpkg.com/lucide@latest` (or `lucide-static` SVGs). Match the native usage: stroke-only, \~1.75–2px stroke, muted by default, green/semantic on state. **Never hand-draw icons or substitute a different set** — if an icon is missing from Lucide, pick the closest Lucide glyph rather than inventing one.

### Logo

The official **Enverus | ONE** wordmark lockup ships in `assets/`: `enverus-one-logo.svg` (dark text, for light backgrounds) and `enverus-one-logo-light.svg` (warm-white text, for dark surfaces / the dark theme shell). The mark's leaf accent uses brighter brand greens (#A0EF6E / #56BC2F) than the functional UI green (#3C8321), which stays reserved for CTAs and active states. Size by height (≈18px in a 56px header) and let the 164×17 ratio scale the width.

---

## Index / Manifest

Root files:

| File | What it is |
| --- | --- |
| `README.md` | This file — context, sources, content + visual foundations, iconography, manifest. |
| `DESIGN.md` | The authoritative token + component spec (front-matter colors/type/radii/spacing + full component index) and prose foundations. **The single richest source — read first.** |
| `colors_and_type.css` | All color + type + spacing + radius + elevation tokens as CSS variables, plus semantic type classes. **Import this into any artifact.** |
| `system-audit.html` | A live WCAG contrast audit of every token pair, rendered side-by-side in light + dark. |
| `SKILL.md` | Agent Skill front-matter so this folder works as a downloadable Claude Skill. |

Folders:

| Folder | Contents |
| --- | --- |
| `design/` | The expanded spec referenced by `DESIGN.md`: `colors.md`, `typography.md`, `layout.md`, `components.md`, `guidelines.md`, `shadcn.md`. |
| `components/` | Compiled design-system components — each subfolder contains a `<Name>.jsx` (React, ESM export), `<Name>.d.ts` (TypeScript types), and `<Name>.html` (`@dsCard` thumbnail). These are bundled into `_ds_bundle.js` and available as `window.EnverusOneDesignSystem_88ab72.<Name>` in any card or consuming project. Current components: **Progress**. |
| `skills/` | Bundled Claude Skills (e.g. `shadcn/`) usable alongside this design system. |

| Folder | Contents |
| --- | --- |
| `preview/` | Small HTML specimen cards that populate the Design System tab — colors (brand, neutrals, semantic, surface), type (display, body, mono/KPI), spacing, radii, elevation, and components (buttons, button states, **button group**, badges, alerts, tabs, **form inputs**, **form controls**, **range slider**, card, KPI cards, data table, chat message, **execution steps** (animated), iconography, logo wordmark). |
| `assets/` | Brand/visual assets: the official **Enverus One logo** (light + dark variants), the **Ask ONE** brand ring (`ask-one-ring.svg`), and iconography doc. |
| `fonts/` | Source variable font files: **Roboto Flex**, **Roboto Mono**, and **Material Symbols Outlined**. Wired via relative `@font-face` rules in `colors_and_type.css` (resolved against the stylesheet at project root, so they load from any folder depth). |
| `ui_kits/enverus-one/` | High-fidelity, interactive recreation of the Enverus One app: `index.html` (click-through prototype) + JSX component files + its own README. |

> No slide template was provided in the source, so no `slides/` folder was created.
