import type { MigrationConfig, MigrationFile, MigrationResult } from "../types/index.js";
import { MigrationTracker } from "./migration-tracker.js";
/**
 * Runs migrations using the contentful-migration CLI
 */
export declare class MigrationRunner {
    private config;
    private client;
    private tracker;
    constructor(config: MigrationConfig);
    /**
     * Get the migration tracker
     */
    getTracker(): MigrationTracker;
    /**
     * Run a single migration file
     */
    runMigration(migration: MigrationFile): Promise<MigrationResult>;
    /**
     * Execute a migration file using contentful-migration CLI
     */
    private executeMigration;
}
//# sourceMappingURL=migration-runner.d.ts.map