export const LIGHT_BASEMAP_STYLES = [
  { value: "mapbox://styles/jaidoubleu/cmped3pws002k01sc2twg1als", label: "Default Light" },
  { value: "mapbox://styles/jaidoubleu/cksruzh4z30oh18ptegc97aan", label: "Muted Light" },
  { value: "mapbox://styles/jaidoubleu/cmrat1y5v000w01ri5hgtbl44", label: "Light Blue Green" },
  { value: "mapbox://styles/jaidoubleu/cmolnwpmv000t01s61q70cq53", label: "2D Light" },
  { value: "mapbox://styles/jaidoubleu/cmnq32zve00a301s0852df4fr", label: "Prism Light" },
];

export const DARK_BASEMAP_STYLES = [
  { value: "mapbox://styles/jaidoubleu/cmp9wzzqs000q01ri6lrldt2v", label: "Default Dark" },
  { value: "mapbox://styles/jaidoubleu/cl127hars001a15qoc7cmvxjy", label: "Dark Blue Gray" },
  { value: "mapbox://styles/jaidoubleu/clm7sk7yt02qe01qi0inwduj1", label: "Dark Muted" },
  { value: "mapbox://styles/jaidoubleu/cl24sqi6000hj15ozr8ix7fdh", label: "Claude Design Dark" },
  { value: "mapbox://styles/jaidoubleu/cmpe9zi1k000x01s3abdx3u87", label: "Mapbox Dark" },
  { value: "mapbox://styles/jaidoubleu/cmnq2xzrv000701s4djtu2l4x", label: "Prism Dark" },
  { value: "mapbox://styles/jaidoubleu/clm7sjoom02qr01qxdoer3830", label: "Dark Theme" },
];

export const DEFAULT_LIGHT_STYLE = LIGHT_BASEMAP_STYLES[0].value;
export const DEFAULT_DARK_STYLE = DARK_BASEMAP_STYLES[0].value;

/** Public Mapbox token from the environment; without one the canvas basemap is used. */
export const ENV_MAPBOX_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? "";

/** Placeholder until the app is wired to the signed-in user. */
export const CURRENT_USER_INITIALS = process.env.NEXT_PUBLIC_USER_INITIALS ?? "JS";
