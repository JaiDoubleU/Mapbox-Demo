// Renders the STRIKE area for each basemap style with the Mapbox Static Images API and
// writes the results to src/generated/basemap-images.json as data: URIs. The canvas engine
// draws them under the wells, which gives the Artifact build a real basemap without live tiles.
//
//   MAPBOX_TOKEN=pk.… npm run fetch:basemaps           # Default Light + Default Dark
//   MAPBOX_TOKEN=pk.… npm run fetch:basemaps -- --all  # every style in the Tweaks list
//
// Needs network access to api.mapbox.com (run it on your own machine).
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const token = process.env.MAPBOX_TOKEN || process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
if (!token) {
  console.error("Set MAPBOX_TOKEN (a pk.… token that can read the styles).");
  process.exit(1);
}

// Keep in sync with src/lib/config.ts and the dataset BOUNDS (padded by the canvas pan limit).
const DEFAULTS = [
  "mapbox://styles/jaidoubleu/cmped3pws002k01sc2twg1als",
  "mapbox://styles/jaidoubleu/cmp9wzzqs000q01ri6lrldt2v",
];
const ALL = [
  ...DEFAULTS,
  "mapbox://styles/jaidoubleu/cksruzh4z30oh18ptegc97aan",
  "mapbox://styles/jaidoubleu/cmrat1y5v000w01ri5hgtbl44",
  "mapbox://styles/jaidoubleu/cmolnwpmv000t01s61q70cq53",
  "mapbox://styles/jaidoubleu/cmnq32zve00a301s0852df4fr",
  "mapbox://styles/jaidoubleu/cl127hars001a15qoc7cmvxjy",
  "mapbox://styles/jaidoubleu/clm7sk7yt02qe01qi0inwduj1",
  "mapbox://styles/jaidoubleu/cl24sqi6000hj15ozr8ix7fdh",
  "mapbox://styles/jaidoubleu/cmpe9zi1k000x01s3abdx3u87",
  "mapbox://styles/jaidoubleu/cmnq2xzrv000701s4djtu2l4x",
  "mapbox://styles/jaidoubleu/clm7sjoom02qr01qxdoer3830",
];
const PAD = 0.1;
const bbox = [-102.92 - PAD, 31.74 - PAD, -102.18 + PAD, 32.2 + PAD];

const styles = process.argv.includes("--all") ? ALL : DEFAULTS;
const out = {};
for (const style of styles) {
  const id = style.replace("mapbox://styles/", "");
  const url = `https://api.mapbox.com/styles/v1/${id}/static/[${bbox.join(",")}]/1280x1100@2x?attribution=false&logo=false&access_token=${token}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`${style}: HTTP ${res.status} ${await res.text()}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  out[style] = { bbox, src: `data:${res.headers.get("content-type") || "image/png"};base64,${buf.toString("base64")}` };
  console.log(`${style}: ${(buf.length / 1024).toFixed(0)} KB`);
}
const file = path.join(root, "src/generated/basemap-images.json");
fs.writeFileSync(file, JSON.stringify(out));
console.log(`wrote ${Object.keys(out).length} image(s) to ${file}`);
