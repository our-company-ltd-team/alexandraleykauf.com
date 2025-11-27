import type { ClientAPI, Space } from "contentful-management";

import contentful from "contentful-management";

import type { MigrationConfig } from "../types/index.js";

/**
 * Contentful Management API client wrapper
 */
export class ContentfulClient {
  private client: ClientAPI;
  private config: MigrationConfig;
  private spaceCache: Space | null = null;

  constructor(config: MigrationConfig) {
    this.config = config;
    this.client = contentful.createClient({
      accessToken: config.managementToken,
    });
  }

  /**
   * Get the Space object
   */
  async getSpace(): Promise<Space> {
    if (!this.spaceCache) {
      this.spaceCache = await this.client.getSpace(this.config.spaceId);
    }
    return this.spaceCache;
  }

  /**
   * Get the Environment object
   */
  async getEnvironment() {
    const space = await this.getSpace();
    return space.getEnvironment(this.config.environment);
  }

  /**
   * Check if a content type exists
   */
  async contentTypeExists(contentTypeId: string): Promise<boolean> {
    try {
      const environment = await this.getEnvironment();
      await environment.getContentType(contentTypeId);
      return true;
    }
    catch (error) {
      if ((error as { name?: string }).name === "NotFound") {
        return false;
      }
      throw error;
    }
  }

  /**
   * Get entries of a specific content type
   */
  async getEntries(contentTypeId: string, query: Record<string, unknown> = {}) {
    const environment = await this.getEnvironment();
    return environment.getEntries({
      content_type: contentTypeId,
      ...query,
    });
  }

  /**
   * Create an entry
   */
  async createEntry(contentTypeId: string, fields: Record<string, unknown>) {
    const environment = await this.getEnvironment();
    const entry = await environment.createEntry(contentTypeId, { fields });
    return entry.publish();
  }

  /**
   * Get a single entry by ID
   */
  async getEntry(entryId: string) {
    const environment = await this.getEnvironment();
    return environment.getEntry(entryId);
  }

  /**
   * Create an entry with a specific ID
   */
  async createEntryWithId(contentTypeId: string, entryId: string, fields: Record<string, unknown>) {
    const environment = await this.getEnvironment();
    const entry = await environment.createEntryWithId(contentTypeId, entryId, { fields });
    return entry.publish();
  }

  /**
   * Get the current environment name
   */
  getEnvironmentName(): string {
    return this.config.environment;
  }

  /**
   * Get the space ID
   */
  getSpaceId(): string {
    return this.config.spaceId;
  }
}
