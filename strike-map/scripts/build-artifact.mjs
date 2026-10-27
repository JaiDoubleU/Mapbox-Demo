// Builds a single self-contained HTML file of the app for publishing as a claude.ai Artifact:
// JS bundled by esbuild, CSS compiled by Tailwind, fonts inlined as data: URIs.
// Mapbox is left out (the Artifact sandbox blocks api.mapbox.com), so the canvas basemap is used.
import { build } from "esbuild";
import postcss from "postcss";
import tailwind from "@tailwindcss/postcss";
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const out = path.resolve(process.argv[2] ?? path.join(root, "dist-artifact/index.html"));

const js = await build({
  entryPoints: [path.join(root, "src/artifact-entry.tsx")],
  bundle: true,
  minify: true,
  format: "iife",
  jsx: "automatic",
  target: "es2020",
  write: false,
  logLevel: "error",
  external: ["mapbox-gl"],
  define: {
    "process.env.NODE_ENV": '"production"',
    "process.env.NEXT_PUBLIC_MAPBOX_TOKEN": '""',
    "process.env.NEXT_PUBLIC_USER_INITIALS": '"JS"',
  },
});

const cssSrc = fs.readFileSync(path.join(root, "src/app/globals.css"), "utf8");
let { css } = await postcss([tailwind({ base: root, optimize: { minify: true } })]).process(cssSrc, {
  from: path.join(root, "src/app/globals.css"),
});
css = css.replace(/url\((['"]?)\/fonts\/([^'")]+)\1\)/g, (_, _q, file) => {
  const data = fs.readFileSync(path.join(root, "public/fonts", file)).toString("base64");
  return `url(data:font/ttf;base64,${data})`;
});

const bundle = js.outputFiles[0].text.replace(/<\/script/gi, "<\\/script");
const html = `<title>Enverus STRIKE Map</title>
<style>${css}</style>
<div id="root"></div>
<script>${bundle}</script>
`;
fs.mkdirSync(path.dirname(out), { recursive: true });
fs.writeFileSync(out, html);
console.log(`wrote ${out} (${(html.length / 1024 / 1024).toFixed(2)} MB)`);
