import type { CodegenConfig } from "@graphql-codegen/cli";

import { config as dotenvConfig } from "dotenv";

// Load .env.local BEFORE importing env (must be synchronous, before any imports that use process.env)
dotenvConfig({ path: ".env.local" });

// Now we can safely use dynamic import since env vars are loaded
const { env } = await import("./src/env");

const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}`;

const config: CodegenConfig = {
  schema: {
    [CONTENTFUL_GRAPHQL_ENDPOINT]: {
      headers: {
        Authorization: `Bearer ${env.CONTENTFUL_PREVIEW_TOKEN}`,
      },
    },
  },
  documents: ["src/features/**/queries.ts"],
  ignoreNoDocuments: true,
  generates: {
    "./src/lib/graphql/generated/": {
      preset: "client",
      config: {
        documentMode: "string",
      },
    },
    "./schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
