import { logger } from "../utils/logger.js";
/**
 * Content type ID for tracking migrations
 */
const MIGRATION_HISTORY_CONTENT_TYPE = "migrationHistory";
/**
 * Tracks applied migrations in Contentful
 */
export class MigrationTracker {
    client;
    constructor(client) {
        this.client = client;
    }
    /**
     * Ensure the MigrationHistory content type exists
     */
    async ensureContentTypeExists() {
        const exists = await this.client.contentTypeExists(MIGRATION_HISTORY_CONTENT_TYPE);
        if (!exists) {
            logger.info("Creating MigrationHistory content type...");
            await this.createMigrationHistoryContentType();
            logger.success("MigrationHistory content type created");
        }
    }
    /**
     * Create the MigrationHistory content type
     */
    async createMigrationHistoryContentType() {
        const environment = await this.client.getEnvironment();
        const contentType = await environment.createContentTypeWithId(MIGRATION_HISTORY_CONTENT_TYPE, {
            name: "Migration History",
            description: "Tracks applied database migrations",
            displayField: "migrationName",
            fields: [
                {
                    id: "migrationName",
                    name: "Migration Name",
                    type: "Symbol",
                    required: true,
                    localized: false,
                },
                {
                    id: "appliedAt",
                    name: "Applied At",
                    type: "Date",
                    required: true,
                    localized: false,
                },
                {
                    id: "environment",
                    name: "Environment",
                    type: "Symbol",
                    required: true,
                    localized: false,
                },
                {
                    id: "type",
                    name: "Type",
                    type: "Symbol",
                    required: true,
                    localized: false,
                    validations: [
                        {
                            in: ["regular", "once"],
                        },
                    ],
                },
            ],
        });
        await contentType.publish();
    }
    /**
     * Get all applied migrations
     */
    async getAppliedMigrations(type) {
        await this.ensureContentTypeExists();
        const query = {
            "fields.environment": this.client.getEnvironmentName(),
            "order": "fields.appliedAt",
        };
        if (type) {
            query["fields.type"] = type;
        }
        const entries = await this.client.getEntries(MIGRATION_HISTORY_CONTENT_TYPE, query);
        return entries.items.map((entry) => ({
            id: entry.sys.id,
            migrationName: entry.fields.migrationName?.["en-US"],
            appliedAt: entry.fields.appliedAt?.["en-US"],
            environment: entry.fields.environment?.["en-US"],
            type: entry.fields.type?.["en-US"],
        }));
    }
    /**
     * Check if a migration has been applied
     */
    async isApplied(migrationName, type) {
        const applied = await this.getAppliedMigrations(type);
        return applied.some(m => m.migrationName === migrationName);
    }
    /**
     * Record a migration as applied
     */
    async recordMigration(migrationName, type) {
        await this.ensureContentTypeExists();
        await this.client.createEntry(MIGRATION_HISTORY_CONTENT_TYPE, {
            migrationName: { "en-US": migrationName },
            appliedAt: { "en-US": new Date().toISOString() },
            environment: { "en-US": this.client.getEnvironmentName() },
            type: { "en-US": type },
        });
    }
}
