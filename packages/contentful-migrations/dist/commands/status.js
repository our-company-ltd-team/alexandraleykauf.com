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
    // Get applied migrations from tracker
    const appliedMigrations = await tracker.getAppliedMigrations();
    const appliedSet = new Set(appliedMigrations);
    // Get regular migrations status
    const regularFiles = await getMigrationFiles(config.migrationsDir, "regular");
    const regularStatus = regularFiles.map(file => ({
        name: file.name,
        applied: appliedSet.has(file.name),
    }));
    // Get one-off migrations status
    const oneOffFiles = await getMigrationFiles(config.oneOffsDir, "once");
    const oneOffStatus = oneOffFiles.map(file => ({
        name: file.name,
        applied: appliedSet.has(file.name),
    }));
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
 * Display migration status as a table
 */
function displayMigrationTable(migrations) {
    const headers = ["Status", "Name"];
    const rows = migrations.map((m) => {
        const status = m.applied
            ? chalk.green("✓ Applied")
            : chalk.yellow("○ Pending");
        return [status, m.name];
    });
    logger.table(headers, rows);
}
