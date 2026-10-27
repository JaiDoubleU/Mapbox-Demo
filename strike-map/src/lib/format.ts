import type { StrikeDataset, Well } from "./strike-data";
import type { ApiCopyMode, Layers } from "./types";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "Jun 07, 2026, 2:14 pm" — the timestamp format used in Export History. */
export function fmtJobTime(d: Date): string {
  let h = d.getHours();
  const ampm = h >= 12 ? "pm" : "am";
  h = h % 12 || 12;
  return `${MONTHS[d.getMonth()]} ${String(d.getDate()).padStart(2, "0")}, ${d.getFullYear()}, ${h}:${String(d.getMinutes()).padStart(2, "0")} ${ampm}`;
}

/** 4,123 → "4.1k" (status pill). */
export function compactCount(n: number): string {
  return n >= 1000 ? (n / 1000).toFixed(1).replace(/\.0$/, "") + "k" : String(n);
}

export function isWell(d: StrikeDataset, w: Well) {
  return d.CATS[w.cat].layer === "wells";
}

/** Newline-separated API numbers, either "42-329-30742" or digits only. */
export function buildApiList(wells: Well[], mode: ApiCopyMode): string {
  return wells.map((w) => (mode === "unformatted" ? w.api.replace(/[^0-9]/g, "") : w.api)).join("\n");
}

/** Wells to use for "Copy API List": the selection if any, otherwise interactive wells on the map. */
export function wellsForApiCopy(d: StrikeDataset, records: Well[], layers: Layers): Well[] {
  if (records.length) return records.filter((r) => isWell(d, r));
  return d.WELLS.filter((w) => isWell(d, w) && layers.wells === true);
}

export const API_COPIED_MESSAGE = "API list copied — paste with Ctrl+V (⌘V on Mac)";

export function copyToClipboard(text: string) {
  navigator.clipboard?.writeText(text).catch(() => {});
}
