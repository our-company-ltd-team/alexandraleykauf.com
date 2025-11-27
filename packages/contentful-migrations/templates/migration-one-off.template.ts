import type { MigrationFunction } from "contentful-migration";

/**
 * One-off Migration: {{MIGRATION_NAME}}
 * Created: {{DATE}}
 *
 * This is a one-time migration that will only be executed once.
 * Use for data transformations or fixes that should not be re-run.
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */
const migration: MigrationFunction = (_migration) => {
  // One-off migration logic here
};

export default migration;
