import { MigrationRunner } from "../core/migration-runner.js";
import { getConfig } from "../utils/config.js";
import { findMigrationByName } from "../utils/file-system.js";
import { logger } from "../utils/logger.js";

/**
 * Run a single one-off migration by name
 */
export async function oneOff(options: { name: string; environment?: string }): Promise<void> {
  const config = getConfig();

  // Override environment if specified
  if (options.environment) {
    config.environment = options.environment;
  }

  // Find the migration file
  const migration = await findMigrationByName(config.oneOffsDir, options.name, "once");

  if (!migration) {
    logger.error(`One-off migration not found: ${options.name}`);
    logger.info(`Make sure the migration file exists in the one-offs/ directory`);

    process.exit(1);
  }

  logger.header(`Running one-off migration: ${migration.name}`);
  logger.info(`Environment: ${config.environment}`);
  logger.newline();

  const runner = new MigrationRunner(config);
  const result = await runner.runMigration(migration);

  logger.newline();

  if (result.success) {
    logger.success(`One-off migration completed in ${result.duration}ms`);
  }
  else {
    logger.error(`One-off migration failed: ${result.error}`);

    process.exit(1);
  }
}
