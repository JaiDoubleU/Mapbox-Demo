# Mapbox-Demo
Demo repository for Mapbox-related experiments

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FJaiDoubleU%2FMapbox-Demo&root-directory=strike-map&env=NEXT_PUBLIC_MAPBOX_TOKEN&envDescription=Public%20Mapbox%20token%20(pk.%E2%80%A6)%20for%20the%20live%20map&envLink=https%3A%2F%2Faccount.mapbox.com%2Faccess-tokens%2F&project-name=mapbox-demo&repository-name=mapbox-demo)

Built from the Claude Design "Strike Map" prototype on the Enverus One design system.

| Folder | What it is | How to run |
|---|---|---|
| `strike-map/` | Next.js 15 + TypeScript + Tailwind + shadcn/ui implementation of the Strike Map | `cd strike-map && cp .env.example .env && npm install && npm run dev` — see `strike-map/README.md` |
| `mapbox-demo/` | **Mapbox Demo**: standalone copy of the original HTML prototype | Serve the folder (`npx serve mapbox-demo`) and open `Mapbox Demo.html` |
| `project/` | Original Claude Design prototype (`Strike Map.html`), design system files and assets | Serve the folder (`npx serve project`) and open `Strike Map.html` |
| `chats/` | Design chat transcripts the prototype came from | — |

`HANDOFF.md` holds the original Claude Design handoff notes.

**Mapbox token:** no token is committed to this repo. Set `NEXT_PUBLIC_MAPBOX_TOKEN` in `strike-map/.env`
(gitignored). The HTML prototypes take it from their Tweaks panel, or set `"token"` in `TWEAK_DEFAULTS`
in their `strike-bundle.jsx` locally (don't commit it). Restrict the token to your domains in your Mapbox account.

## Deploy to Vercel

**Your own repo (recommended):** in Vercel choose **Add New → Project**, import `JaiDoubleU/Mapbox-Demo`,
set **Root Directory** to `strike-map`, add `NEXT_PUBLIC_MAPBOX_TOKEN`, and deploy. Pushes to `main` then
deploy to production and other branches get preview URLs.

**Deploy button:** the button above copies this repo into the clicking person's GitHub account, sets the
root directory to `strike-map` and asks for the Mapbox token. It deploys from `main`.

After the first deploy, add the Vercel domain to the token's allowed URLs in your Mapbox account.
`NEXT_PUBLIC_*` values are built into the app, so redeploy after changing the token.
