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
