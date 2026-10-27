/* Entry for the single-file claude.ai Artifact build (scripts/build-artifact.mjs).
   Renders the same app as the Next.js page, without Next. */
import { createRoot } from "react-dom/client";
import { StrikeApp } from "@/components/strike-app";
import { DatasetProvider } from "@/lib/dataset-context";

// Theme: the viewer's saved choice, else the host's theme, else the OS setting.
(() => {
  const root = document.documentElement;
  let saved: string | null = null;
  try {
    saved = localStorage.getItem("strike_theme");
  } catch {
    /* storage unavailable */
  }
  const host = root.getAttribute("data-theme");
  const dark = saved ? saved === "dark" : host ? host === "dark" : matchMedia("(prefers-color-scheme: dark)").matches;
  root.classList.toggle("dark", dark);
})();

createRoot(document.getElementById("root")!).render(
  <DatasetProvider>
    <StrikeApp />
  </DatasetProvider>,
);
