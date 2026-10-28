import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The app has no server code, so it can also ship as plain static files. The repo-root
  // vercel.json sets STATIC_EXPORT=1 and serves strike-map/out; `npm run build` alone is unchanged.
  output: process.env.STATIC_EXPORT ? "export" : undefined,
};

export default nextConfig;
