import { MigrationRunner } from "../core/migration-runner.js";
import { getConfig } from "../utils/config.js";
import { getMigrationFiles } from "../utils/file-system.js";
import { logger } from "../utils/logger.js";

/**
 * Run all pending regular migrations in order
 */
export async function runAll(options: { environment?: string }): Promise<void> {
  const config = getConfig();

  // Override environment if specified
  if (options.environment) {
    config.environment = options.environment;
  }

  const runner = new MigrationRunner(config);
  const tracker = runner.getTracker();

  // Get all migration files and applied migrations
  const migrationFiles = await getMigrationFiles(config.migrationsDir, "regular");
  const appliedMigrations = await tracker.getAppliedMigrations();
  const appliedSet = new Set(appliedMigrations);

  // Filter to only pending migrations
  const pendingMigrations = migrationFiles.filter(m => !appliedSet.has(m.name));

  logger.header("Running All Pending Migrations");
  logger.info(`Environment: ${config.environment}`);
  logger.newline();

  if (pendingMigrations.length === 0) {
    logger.success("No pending migrations to run");
    return;
  }

  logger.info(`Found ${pendingMigrations.length} pending migration(s)`);
  logger.newline();

  let successCount = 0;
  let failedCount = 0;

  for (const migration of pendingMigrations) {
    const result = await runner.runMigration(migration);

    if (result.success) {
      successCount++;
    }
    else {
      failedCount++;
      logger.error(`Migration failed: ${result.error}`);
      logger.newline();
      logger.error("Stopping migration run due to failure");
      break;
    }
  }

  logger.newline();
  logger.header("Summary");
  logger.info(`Successful: ${successCount}`);
  logger.info(`Failed: ${failedCount}`);
  logger.info(`Remaining: ${pendingMigrations.length - successCount - failedCount}`);

  if (failedCount > 0) {
    process.exit(1);
  }
}
