import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

import type { MigrationConfig } from "../types/index.js";

// Get the package root directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "../..");

// Load environment variables from .env file
dotenv.config({ path: path.join(packageRoot, ".env") });

/**
 * Get migration configuration from environment variables
 */
export function getConfig(): MigrationConfig {
  const spaceId = getEnvVar("CONTENTFUL_SPACE_ID");
  const managementToken = getEnvVar("CONTENTFUL_MANAGEMENT_TOKEN");
  const environment = getEnvVarOptional("CONTENTFUL_ENVIRONMENT") ?? "master";

  return {
    spaceId,
    managementToken,
    environment,
    migrationsDir: path.join(packageRoot, "migrations"),
    oneOffsDir: path.join(packageRoot, "one-offs"),
  };
}

/**
 * Get a required environment variable
 */
function getEnvVar(name: string): string {
  // eslint-disable-next-line node/no-process-env
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

/**
 * Get an optional environment variable
 */
function getEnvVarOptional(name: string): string | undefined {
  // eslint-disable-next-line node/no-process-env
  return process.env[name];
}

/**
 * Validate that all required configuration is present
 */
export function validateConfig(config: MigrationConfig): void {
  if (!config.spaceId) {
    throw new Error("CONTENTFUL_SPACE_ID is required");
  }
  if (!config.managementToken) {
    throw new Error("CONTENTFUL_MANAGEMENT_TOKEN is required");
  }
}
