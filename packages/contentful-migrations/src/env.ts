import { contentfulServerSchema } from "@alexandraleykauf/env-schemas";
import { createEnv } from "@t3-oss/env-core";
import { config as dotenvConfig } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Load .env file before validating environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "..");
dotenvConfig({ path: path.join(packageRoot, ".env") });

/**
 * Type-safe environment variables for contentful-migrations.
 *
 * This validates environment variables at runtime and provides
 * full TypeScript inference for all env vars.
 *
 * Usage:
 *   import { env } from "./env.js";
 *   console.log(env.CONTENTFUL_SPACE_ID);
 */
export const env = createEnv({
  server: contentfulServerSchema,
  // eslint-disable-next-line node/no-process-env
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
});
