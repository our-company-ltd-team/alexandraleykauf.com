import type { NextConfig } from "next";

// Validate environment variables at build/start time
import "./src/env";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // swcPlugins: [["@graphql-codegen/client-preset-swc-plugin", {}]],
  },
};

export default nextConfig;
