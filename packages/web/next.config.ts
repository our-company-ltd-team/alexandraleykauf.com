import type { NextConfig } from "next";

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

// Validate environment variables at build/start time
import "./src/env";

// Try to load generated redirects file (optional)
// Generate it first with: pnpm generate-redirects --format=json --out=redirects.json
let legacyRedirects: Array<{ source: string; destination: string; permanent: boolean }> = [];
try {
  const redirectsPath = resolve(process.cwd(), "redirects.json");
  const redirectsContent = readFileSync(redirectsPath, "utf-8");
  legacyRedirects = JSON.parse(redirectsContent);
  // eslint-disable-next-line no-console
  console.log(`Loaded ${legacyRedirects.length} legacy redirects from redirects.json`);
}
catch {
  // File doesn't exist or is invalid - that's okay, redirects are optional
  // eslint-disable-next-line no-console
  console.log("No redirects.json found - run 'pnpm generate-redirects --format=json --out=redirects.json' to generate");
}

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async redirects() {
    return legacyRedirects;
  },
};

export default nextConfig;
