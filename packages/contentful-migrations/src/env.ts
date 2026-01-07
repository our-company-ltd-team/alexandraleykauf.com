import { config as dotenvConfig } from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

// Load .env file before validating environment variables
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenvConfig({ path: path.join(__dirname, "..", ".env") });

const envSchema = z.object({
  CONTENTFUL_SPACE_ID: z.string().min(1, "CONTENTFUL_SPACE_ID is required"),
  CONTENTFUL_MANAGEMENT_TOKEN: z
    .string()
    .min(1, "CONTENTFUL_MANAGEMENT_TOKEN is required"),
  CONTENTFUL_ENVIRONMENT: z.string().default("master"),
});

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
// eslint-disable-next-line node/no-process-env
export const env = envSchema.parse(process.env);
