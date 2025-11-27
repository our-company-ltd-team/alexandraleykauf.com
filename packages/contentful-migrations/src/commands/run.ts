import { MigrationRunner } from "../core/migration-runner.js";
import { getConfig, validateConfig } from "../utils/config.js";
import { findMigrationByName } from "../utils/file-system.js";
import { logger } from "../utils/logger.js";

/**
 * Run a single regular migration by name
 */
export async function run(options: { name: string; environment?: string }): Promise<void> {
  const config = getConfig();

  // Override environment if specified
  if (options.environment) {
    config.environment = options.environment;
  }

  validateConfig(config);

  // Find the migration file
  const migration = await findMigrationByName(config.migrationsDir, options.name, "regular");

  if (!migration) {
    logger.error(`Migration not found: ${options.name}`);
    logger.info(`Make sure the migration file exists in the migrations/ directory`);

    process.exit(1);
  }

  logger.header(`Running migration: ${migration.name}`);
  logger.info(`Environment: ${config.environment}`);
  logger.newline();

  const runner = new MigrationRunner(config);
  const result = await runner.runMigration(migration);

  logger.newline();

  if (result.success) {
    logger.success(`Migration completed in ${result.duration}ms`);
  }
  else {
    logger.error(`Migration failed: ${result.error}`);

    process.exit(1);
  }
}
