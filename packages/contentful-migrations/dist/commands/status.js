import chalk from "chalk";
import { ContentfulClient } from "../core/contentful-client.js";
import { MigrationTracker } from "../core/migration-tracker.js";
import { getConfig, validateConfig } from "../utils/config.js";
import { getMigrationFiles } from "../utils/file-system.js";
import { logger } from "../utils/logger.js";
/**
 * Show the status of all migrations
 */
export async function status() {
    const config = getConfig();
    validateConfig(config);
    const client = new ContentfulClient(config);
    const tracker = new MigrationTracker(client);
    logger.header("Migration Status");
    logger.info(`Environment: ${config.environment}`);
    logger.newline();
    // Get regular migrations status
    const regularStatus = await getMigrationStatus(config.migrationsDir, "regular", tracker);
    // Get one-off migrations status
    const oneOffStatus = await getMigrationStatus(config.oneOffsDir, "once", tracker);
    // Display regular migrations
    logger.header("Regular Migrations");
    if (regularStatus.length === 0) {
        logger.info("No migrations found");
    }
    else {
        displayMigrationTable(regularStatus);
    }
    // Display one-off migrations
    logger.header("One-off Migrations");
    if (oneOffStatus.length === 0) {
        logger.info("No one-off migrations found");
    }
    else {
        displayMigrationTable(oneOffStatus);
    }
    // Summary
    logger.newline();
    const pendingRegular = regularStatus.filter(m => !m.applied).length;
    const pendingOneOff = oneOffStatus.filter(m => !m.applied).length;
    if (pendingRegular > 0) {
        logger.warn(`${pendingRegular} pending regular migration(s)`);
    }
    if (pendingOneOff > 0) {
        logger.warn(`${pendingOneOff} pending one-off migration(s)`);
    }
    if (pendingRegular === 0 && pendingOneOff === 0) {
        logger.success("All migrations have been applied");
    }
}
/**
 * Get migration status by comparing files on disk with applied migrations
 */
async function getMigrationStatus(directory, type, tracker) {
    const files = await getMigrationFiles(directory, type);
    const applied = await tracker.getAppliedMigrations(type);
    const appliedMap = new Map(applied.map(m => [m.migrationName, m]));
    return files.map((file) => {
        const appliedMigration = appliedMap.get(file.name);
        return {
            name: file.name,
            type,
            applied: !!appliedMigration,
            appliedAt: appliedMigration?.appliedAt,
        };
    });
}
/**
 * Display migration status as a table
 */
function displayMigrationTable(migrations) {
    const headers = ["Status", "Name", "Applied At"];
    const rows = migrations.map((m) => {
        const status = m.applied
            ? chalk.green("✓ Applied")
            : chalk.yellow("○ Pending");
        const appliedAt = m.appliedAt
            ? new Date(m.appliedAt).toLocaleString()
            : "-";
        return [status, m.name, appliedAt];
    });
    logger.table(headers, rows);
}
