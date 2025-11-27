import type { ContentfulClient } from "./contentful-client.js";

import { logger } from "../utils/logger.js";

/**
 * Content type ID for tracking migrations
 */
const CONTENT_MODEL_VERSION_TYPE = "contentModelVersion";

/**
 * Entry ID for the version tracking entry (one per environment)
 */
const VERSION_ENTRY_ID = "contentModelVersionEntry";

/**
 * Version entry structure
 */
type VersionEntry = {
  updatedAt: string;
  lastMigration: string;
  migrations: string[];
};

/**
 * Tracks applied migrations in Contentful.
 *
 * Assumes the `contentModelVersion` content type already exists.
 * Run `0001-init-content-model-version` migration first on new environments.
 */
export class MigrationTracker {
  private client: ContentfulClient;

  constructor(client: ContentfulClient) {
    this.client = client;
  }

  /**
   * Ensure the content type and version entry exist
   */
  async ensureContentTypeExists(): Promise<void> {
    const exists = await this.client.contentTypeExists(CONTENT_MODEL_VERSION_TYPE);

    if (!exists) {
      logger.error("Content Model Version content type does not exist");
      throw new Error("Content Model Version content type does not exist");
    }
  }

  /**
   * Get the version entry, or null if it doesn't exist
   */
  private async getVersionEntry(): Promise<VersionEntry | null> {
    try {
      const entry = await this.client.getEntry(VERSION_ENTRY_ID);
      return {
        updatedAt: entry.fields.updatedAt?.["en-US"] as string,
        lastMigration: entry.fields.lastMigration?.["en-US"] as string,
        migrations: (entry.fields.migrations?.["en-US"] as string[]) || [],
      };
    }
    catch (error) {
      if ((error as { name?: string }).name === "NotFound") {
        return null;
      }
      throw error;
    }
  }

  /**
   * Get all applied migration names
   */
  async getAppliedMigrations(): Promise<string[]> {
    // await this.ensureContentTypeExists();
    const entry = await this.getVersionEntry();
    return entry?.migrations ?? [];
  }

  /**
   * Check if a migration has been applied
   */
  async isApplied(migrationName: string): Promise<boolean> {
    const migrations = await this.getAppliedMigrations();
    return migrations.includes(migrationName);
  }

  /**
   * Record a migration as applied
   */
  async recordMigration(migrationName: string): Promise<void> {
    // await this.ensureContentTypeExists();

    const now = new Date().toISOString();
    const existingEntry = await this.getVersionEntry();

    if (existingEntry) {
      // Update existing entry
      const entry = await this.client.getEntry(VERSION_ENTRY_ID);
      entry.fields.contentfulDescription = { "en-US": "Content Model Version" };
      entry.fields.updatedAt = { "en-US": now };
      entry.fields.lastMigration = { "en-US": migrationName };
      entry.fields.migrations = { "en-US": [...existingEntry.migrations, migrationName] };
      const updated = await entry.update();
      await updated.publish();
    }
    else {
      // Create new entry
      await this.client.createEntryWithId(CONTENT_MODEL_VERSION_TYPE, VERSION_ENTRY_ID, {
        contentfulDescription: { "en-US": "Content Model Version" },
        updatedAt: { "en-US": now },
        lastMigration: { "en-US": migrationName },
        migrations: { "en-US": [migrationName] },
      });
    }
  }
}
