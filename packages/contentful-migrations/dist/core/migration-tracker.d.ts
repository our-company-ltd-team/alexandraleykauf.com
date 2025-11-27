import type { ContentfulClient } from "./contentful-client.js";
/**
 * Tracks applied migrations in Contentful.
 *
 * Assumes the `contentModelVersion` content type already exists.
 * Run `0001-init-content-model-version` migration first on new environments.
 */
export declare class MigrationTracker {
    private client;
    constructor(client: ContentfulClient);
    /**
     * Ensure the content type and version entry exist
     */
    ensureContentTypeExists(): Promise<void>;
    /**
     * Get the version entry, or null if it doesn't exist
     */
    private getVersionEntry;
    /**
     * Get all applied migration names
     */
    getAppliedMigrations(): Promise<string[]>;
    /**
     * Check if a migration has been applied
     */
    isApplied(migrationName: string): Promise<boolean>;
    /**
     * Record a migration as applied
     */
    recordMigration(migrationName: string): Promise<void>;
}
//# sourceMappingURL=migration-tracker.d.ts.map