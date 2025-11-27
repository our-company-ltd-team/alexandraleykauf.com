import { spawn } from "node:child_process";
import { logger } from "../utils/logger.js";
import { ContentfulClient } from "./contentful-client.js";
import { MigrationTracker } from "./migration-tracker.js";
/**
 * Runs migrations using the contentful-migration CLI
 */
export class MigrationRunner {
    config;
    client;
    tracker;
    constructor(config) {
        this.config = config;
        this.client = new ContentfulClient(config);
        this.tracker = new MigrationTracker(this.client);
    }
    /**
     * Get the migration tracker
     */
    getTracker() {
        return this.tracker;
    }
    /**
     * Run a single migration file
     */
    async runMigration(migration) {
        const startTime = Date.now();
        // Check if already applied
        const isApplied = await this.tracker.isApplied(migration.name, migration.type);
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
            // Run the migration using contentful-migration CLI via tsx
            await this.executeMigration(migration.path);
            // Record the migration as applied
            await this.tracker.recordMigration(migration.name, migration.type);
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
     * Execute a migration file using contentful-migration CLI
     */
    executeMigration(filePath) {
        return new Promise((resolve, reject) => {
            // Use npx to run contentful-migration with tsx for TypeScript support
            const args = [
                "contentful-migration",
                "--space-id",
                this.config.spaceId,
                "--access-token",
                this.config.managementToken,
                "--environment-id",
                this.config.environment,
                "--yes", // Skip confirmation prompts
                filePath,
            ];
            const child = spawn("npx", args, {
                stdio: ["inherit", "pipe", "pipe"],
                shell: true,
                env: {
                    // eslint-disable-next-line node/no-process-env
                    ...process.env,
                    // Enable tsx for TypeScript migration files
                    NODE_OPTIONS: "--import tsx",
                },
            });
            let stdout = "";
            let stderr = "";
            child.stdout?.on("data", (data) => {
                stdout += data.toString();
            });
            child.stderr?.on("data", (data) => {
                stderr += data.toString();
            });
            child.on("close", (code) => {
                if (code === 0) {
                    resolve();
                }
                else {
                    reject(new Error(stderr || stdout || `Migration failed with exit code ${code}`));
                }
            });
            child.on("error", (error) => {
                reject(error);
            });
        });
    }
}
