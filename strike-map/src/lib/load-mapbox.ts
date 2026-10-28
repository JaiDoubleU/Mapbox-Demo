import type mapboxgl from "mapbox-gl";

/** Loads Mapbox GL from the app bundle. The single-file Artifact build swaps in load-mapbox.cdn.ts. */
export function loadMapbox(): Promise<typeof mapboxgl> {
  return import("mapbox-gl").then((m) => m.default);
}
