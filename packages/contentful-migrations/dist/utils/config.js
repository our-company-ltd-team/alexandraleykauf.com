import path from "node:path";
import { fileURLToPath } from "node:url";
import { env } from "../env.js";
// Get the package root directory
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const packageRoot = path.resolve(__dirname, "../..");
/**
 * Get migration configuration from environment variables.
 *
 * Environment variables are validated at import time via the env module.
 * This function just maps the validated env vars to the config shape.
 */
export function getConfig() {
    return {
        spaceId: env.CONTENTFUL_SPACE_ID,
        managementToken: env.CONTENTFUL_MANAGEMENT_TOKEN,
        environment: env.CONTENTFUL_ENVIRONMENT,
        migrationsDir: path.join(packageRoot, "migrations"),
        oneOffsDir: path.join(packageRoot, "one-offs"),
    };
}
/**
 * Validate that all required configuration is present.
 *
 * @deprecated Validation is now handled by the env module at import time.
 * This function is kept for backwards compatibility but does nothing.
 */
export function validateConfig(_config) {
    // Validation is now handled by @t3-oss/env-core at import time
    // This function is kept for backwards compatibility
}
