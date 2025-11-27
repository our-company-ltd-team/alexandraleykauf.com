import contentful from "contentful-management";
/**
 * Contentful Management API client wrapper
 */
export class ContentfulClient {
    client;
    config;
    spaceCache = null;
    constructor(config) {
        this.config = config;
        this.client = contentful.createClient({
            accessToken: config.managementToken,
        });
    }
    /**
     * Get the Space object
     */
    async getSpace() {
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
    async contentTypeExists(contentTypeId) {
        try {
            const environment = await this.getEnvironment();
            await environment.getContentType(contentTypeId);
            return true;
        }
        catch (error) {
            if (error.name === "NotFound") {
                return false;
            }
            throw error;
        }
    }
    /**
     * Get entries of a specific content type
     */
    async getEntries(contentTypeId, query = {}) {
        const environment = await this.getEnvironment();
        return environment.getEntries({
            content_type: contentTypeId,
            ...query,
        });
    }
    /**
     * Create an entry
     */
    async createEntry(contentTypeId, fields) {
        const environment = await this.getEnvironment();
        const entry = await environment.createEntry(contentTypeId, { fields });
        return entry.publish();
    }
    /**
     * Get the current environment name
     */
    getEnvironmentName() {
        return this.config.environment;
    }
    /**
     * Get the space ID
     */
    getSpaceId() {
        return this.config.spaceId;
    }
}
