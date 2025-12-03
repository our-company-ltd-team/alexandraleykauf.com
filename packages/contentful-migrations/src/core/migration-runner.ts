import { runMigration } from "contentful-migration";

import type { MigrationConfig, MigrationFile, MigrationResult } from "../types/index.js";

import { logger } from "../utils/logger.js";
import { ContentfulClient } from "./contentful-client.js";
import { MigrationTracker } from "./migration-tracker.js";

/**
 * Runs migrations using the contentful-migration API
 */
export class MigrationRunner {
  private config: MigrationConfig;
  private client: ContentfulClient;
  private tracker: MigrationTracker;

  constructor(config: MigrationConfig) {
    this.config = config;
    this.client = new ContentfulClient(config);
    this.tracker = new MigrationTracker(this.client);
  }

  /**
   * Get the migration tracker
   */
  getTracker(): MigrationTracker {
    return this.tracker;
  }

  /**
   * Run a single migration file
   */
  async runMigration(migration: MigrationFile): Promise<MigrationResult> {
    const startTime = Date.now();

    // Check if already applied
    const isApplied = await this.tracker.isApplied(migration.name);
    if (isApplied) {
      return {
        success: false,
        name: migration.name,
        error: "Migration has already been applied",
        duration: Date.now() - startTime,
      };
    }

    logger.migration(migration.name, "running");

    try {
      // Run the migration using contentful-migration API
      await this.executeMigration(migration.path);

      // Record the migration as applied
      await this.tracker.recordMigration(migration.name);

      logger.migration(migration.name, "applied");

      return {
        success: true,
        name: migration.name,
        duration: Date.now() - startTime,
      };
    }
    catch (error) {
      logger.migration(migration.name, "failed");

      return {
        success: false,
        name: migration.name,
        error: error instanceof Error ? error.message : String(error),
        duration: Date.now() - startTime,
      };
    }
  }

  /**
   * Execute a migration file using contentful-migration API
   */
  private async executeMigration(filePath: string): Promise<void> {
    const { default: migrationFunction } = await import(filePath);

    await runMigration({
      spaceId: this.config.spaceId,
      accessToken: this.config.managementToken,
      environmentId: this.config.environment,
      yes: true,
      migrationFunction,
    });
  }
}
