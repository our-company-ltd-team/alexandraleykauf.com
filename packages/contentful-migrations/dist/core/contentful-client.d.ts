import type { Space } from "contentful-management";
import contentful from "contentful-management";
import type { MigrationConfig } from "../types/index.js";
/**
 * Contentful Management API client wrapper
 */
export declare class ContentfulClient {
    private client;
    private config;
    private spaceCache;
    constructor(config: MigrationConfig);
    /**
     * Get the Space object
     */
    getSpace(): Promise<Space>;
    /**
     * Get the Environment object
     */
    getEnvironment(): Promise<contentful.Environment>;
    /**
     * Check if a content type exists
     */
    contentTypeExists(contentTypeId: string): Promise<boolean>;
    /**
     * Get entries of a specific content type
     */
    getEntries(contentTypeId: string, query?: Record<string, unknown>): Promise<contentful.Collection<contentful.Entry, contentful.EntryProps<contentful.KeyValueMap, unknown>>>;
    /**
     * Create an entry
     */
    createEntry(contentTypeId: string, fields: Record<string, unknown>): Promise<contentful.Entry>;
    /**
     * Get the current environment name
     */
    getEnvironmentName(): string;
    /**
     * Get the space ID
     */
    getSpaceId(): string;
}
//# sourceMappingURL=contentful-client.d.ts.map