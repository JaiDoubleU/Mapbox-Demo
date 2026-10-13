# Mapbox-Demo
Demo repository for Mapbox-related experiments

Built from the Claude Design "Strike Map" prototype on the Enverus One design system.

| Folder | What it is | How to run |
|---|---|---|
| `strike-map/` | Next.js 15 + TypeScript + Tailwind + shadcn/ui implementation of the Strike Map | `cd strike-map && cp .env.example .env && npm install && npm run dev` — see `strike-map/README.md` |
| `mapbox-demo/` | **Mapbox Demo**: standalone copy of the original HTML prototype | Serve the folder (`npx serve mapbox-demo`) and open `Mapbox Demo.html` |
| `project/` | Original Claude Design prototype (`Strike Map.html`), design system files and assets | Serve the folder (`npx serve project`) and open `Strike Map.html` |
| `chats/` | Design chat transcripts the prototype came from | — |

`HANDOFF.md` holds the original Claude Design handoff notes.

**Mapbox token:** set `NEXT_PUBLIC_MAPBOX_TOKEN` in `strike-map/.env` (gitignored). The HTML prototypes
take it from the Tweaks panel, or from `"token"` in `TWEAK_DEFAULTS` in their `strike-bundle.jsx`.
