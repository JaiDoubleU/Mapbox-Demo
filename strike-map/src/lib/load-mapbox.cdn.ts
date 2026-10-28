import type mapboxgl from "mapbox-gl";

const MAPBOX_JS = "https://unpkg.com/mapbox-gl@3.9.0/dist/mapbox-gl.js";
let pending: Promise<typeof mapboxgl> | null = null;

/** Single-file build: fetch Mapbox GL from the CDN only when a token is actually set. */
export function loadMapbox(): Promise<typeof mapboxgl> {
  pending ??= new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = MAPBOX_JS;
    s.onload = () => {
      const lib = (window as unknown as { mapboxgl?: typeof mapboxgl }).mapboxgl;
      if (lib) resolve(lib);
      else reject(new Error("Mapbox GL loaded but did not define window.mapboxgl"));
    };
    s.onerror = () => {
      pending = null;
      reject(new Error(`Could not load ${MAPBOX_JS}`));
    };
    document.head.appendChild(s);
  });
  return pending;
}
