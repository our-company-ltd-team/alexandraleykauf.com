/**
 * Migration types for the contentful-migrations package
 */
export type MigrationType = "regular" | "once";
/**
 * Represents a migration file on disk
 */
export type MigrationFile = {
    /** Full file path */
    path: string;
    /** Migration name without extension (e.g., "0001-initial-content-model") */
    name: string;
    /** Numeric prefix for ordering (e.g., 1 for "0001-...") */
    number: number;
    /** Type of migration */
    type: MigrationType;
};
/**
 * Represents an applied migration record stored in Contentful
 */
export type AppliedMigration = {
    /** Contentful entry ID */
    id: string;
    /** Migration name (e.g., "0001-initial-content-model") */
    migrationName: string;
    /** When the migration was applied */
    appliedAt: string;
    /** Target environment */
    environment: string;
    /** Type of migration */
    type: MigrationType;
};
/**
 * Migration status for display
 */
export type MigrationStatus = {
    /** Migration name */
    name: string;
    /** Type of migration */
    type: MigrationType;
    /** Whether the migration has been applied */
    applied: boolean;
    /** When the migration was applied (if applied) */
    appliedAt?: string;
};
/**
 * Configuration for the migration runner
 */
export type MigrationConfig = {
    /** Contentful Space ID */
    spaceId: string;
    /** Contentful Management Token */
    managementToken: string;
    /** Target environment (default: "master") */
    environment: string;
    /** Path to migrations directory */
    migrationsDir: string;
    /** Path to one-offs directory */
    oneOffsDir: string;
};
/**
 * Result of running a migration
 */
export type MigrationResult = {
    /** Whether the migration succeeded */
    success: boolean;
    /** Migration name */
    name: string;
    /** Error message if failed */
    error?: string;
    /** Duration in milliseconds */
    duration: number;
};
//# sourceMappingURL=index.d.ts.map