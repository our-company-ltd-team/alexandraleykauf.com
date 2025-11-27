import type { AppliedMigration, MigrationType } from "../types/index.js";
import type { ContentfulClient } from "./contentful-client.js";
/**
 * Tracks applied migrations in Contentful
 */
export declare class MigrationTracker {
    private client;
    constructor(client: ContentfulClient);
    /**
     * Ensure the MigrationHistory content type exists
     */
    ensureContentTypeExists(): Promise<void>;
    /**
     * Create the MigrationHistory content type
     */
    private createMigrationHistoryContentType;
    /**
     * Get all applied migrations
     */
    getAppliedMigrations(type?: MigrationType): Promise<AppliedMigration[]>;
    /**
     * Check if a migration has been applied
     */
    isApplied(migrationName: string, type: MigrationType): Promise<boolean>;
    /**
     * Record a migration as applied
     */
    recordMigration(migrationName: string, type: MigrationType): Promise<void>;
}
//# sourceMappingURL=migration-tracker.d.ts.map