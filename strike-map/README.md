# Enverus STRIKE — Map

Next.js 15 + TypeScript + Tailwind v4 + shadcn/ui (Radix) implementation of the
Claude Design "Strike Map" prototype (`../project/Strike Map.html`), built on the
Enverus One Design System tokens.

## Run

```bash
cp .env.example .env.local   # add NEXT_PUBLIC_MAPBOX_TOKEN for real Mapbox tiles
npm install
npm run dev                  # http://localhost:3000
```

Without a Mapbox token the map renders with the canvas basemap fallback (survey grid,
roads, leases, well dots). Both renderers share one `MapEngine` interface, so the
selection tools work the same on either.

**Tweaks panel:** press **Alt+T** or open `/?tweaks`. It holds dot size, density,
labels, survey grid, a Mapbox token override, light/dark basemap styles, and
responsive export-dialog height. Values persist in `localStorage`.

## Deploy (live Mapbox version)

The app is a static-friendly Next.js app with no server-side code.

1. **Vercel:** import the repo and set **Root Directory** to `strike-map`. Add the environment
   variable `NEXT_PUBLIC_MAPBOX_TOKEN`, then deploy.
2. **Any Node host** (Azure App Service, a container): `npm ci && npm run build && npm start`
   with `NEXT_PUBLIC_MAPBOX_TOKEN` set at build time (Next inlines `NEXT_PUBLIC_*` values during the build).

The token must be allowed to read the custom `jaidoubleu` styles listed in `src/lib/config.ts`.
If you use another account's token, restyle those URLs or the map falls back to the canvas basemap.
Restrict the token to your deployed domain in the Mapbox account settings.

## Artifact preview (claude.ai)

```bash
npm run fetch:basemaps          # optional: Mapbox snapshots for the canvas basemap (needs MAPBOX_TOKEN)
npm run build:artifact          # writes dist-artifact/index.html, a single self-contained page
```

The claude.ai Artifact sandbox blocks Mapbox, so the preview uses the canvas renderer. When
`src/generated/basemap-images.json` has snapshots (from `fetch:basemaps`, or from a Claude session
with the Mapbox connector), the canvas draws them under the wells in place of the synthetic roads.
Snapshots are static: zooming far in shows them soft. Only Default Light and Default Dark are
fetched by default (`-- --all` fetches every style, but that can push the page past the 16 MB limit).

## Structure

| Path | What |
|---|---|
| `src/styles/enverus-one.css` | Vendored Enverus One `colors_and_type.css` (tokens, fonts, type roles) |
| `src/app/globals.css` | Tailwind theme mapping for DS tokens + STRIKE `--s-*` surface tokens (light default, `.dark` on `<html>`) |
| `src/lib/strike-data.ts` | Deterministic synthetic Permian dataset (4,200 wells/permits/rigs, laterals, leases) |
| `src/lib/data-source.ts` | Data boundary — replace `loadStrikeDataset()` with real Enverus API calls |
| `src/components/map/` | `MapView`, canvas + Mapbox engines, selection toolbar, draw overlay, AI Select |
| `src/components/chrome/` | Header, Layers panel (3-state switches), Legend, status pill, toast, Export History, Copy API List |
| `src/components/insights/` | Insights panel and Export Options popover |
| `src/components/ui/` | shadcn/ui primitives styled with DS tokens |
| `src/lib/basemap-images.ts` | Optional Mapbox snapshots used by the canvas renderer |
| `scripts/` | `build-artifact.mjs` (single-file preview), `fetch-basemaps.mjs` (static basemap snapshots) |

## Behaviour notes

- Layer switches cycle **off → view only → interactive**. Only interactive layers can
  be clicked or selected, and that rule applies to every selection tool.
- Click selects one record, Ctrl/⌘+click toggles, and clicking empty map clears.
  Holding Shift makes shape, AI and Magic Wand selections add to the current one.
- AI Select uses keyword matching (orientation, well type, operator/formation/field)
  until a real model endpoint exists.
- Exports and Export History are simulated in memory (3.5 s export, toast, new history row).
