import type { MigrationConfig } from "../types/index.js";
/**
 * Get migration configuration from environment variables.
 *
 * Environment variables are validated at import time via the env module.
 * This function just maps the validated env vars to the config shape.
 */
export declare function getConfig(): MigrationConfig;
/**
 * Validate that all required configuration is present.
 *
 * @deprecated Validation is now handled by the env module at import time.
 * This function is kept for backwards compatibility but does nothing.
 */
export declare function validateConfig(_config: MigrationConfig): void;
//# sourceMappingURL=config.d.ts.map