import { getConfig } from "../utils/config.js";
import { getMigrationFiles } from "../utils/file-system.js";
import { logger } from "../utils/logger.js";
/**
 * Validate migration files
 */
export async function validate() {
    const config = getConfig();
    logger.header("Validating Migrations");
    let hasErrors = false;
    // Validate regular migrations
    const regularMigrations = await getMigrationFiles(config.migrationsDir, "regular");
    logger.info(`Found ${regularMigrations.length} regular migration(s)`);
    // Check for gaps in numbering
    for (let i = 0; i < regularMigrations.length; i++) {
        const expected = i + 1;
        const actual = regularMigrations[i].number;
        if (actual !== expected) {
            logger.error(`Gap in migration numbering: expected ${expected.toString().padStart(4, "0")}, found ${actual.toString().padStart(4, "0")}`);
            hasErrors = true;
        }
    }
    // Check for duplicate numbers
    const numbers = regularMigrations.map(m => m.number);
    const duplicates = numbers.filter((n, i) => numbers.indexOf(n) !== i);
    if (duplicates.length > 0) {
        logger.error(`Duplicate migration numbers: ${[...new Set(duplicates)].join(", ")}`);
        hasErrors = true;
    }
    // Validate one-off migrations
    const oneOffMigrations = await getMigrationFiles(config.oneOffsDir, "once");
    logger.info(`Found ${oneOffMigrations.length} one-off migration(s)`);
    // Check for duplicate names in one-offs
    const oneOffNames = oneOffMigrations.map(m => m.name);
    const oneOffDuplicates = oneOffNames.filter((n, i) => oneOffNames.indexOf(n) !== i);
    if (oneOffDuplicates.length > 0) {
        logger.error(`Duplicate one-off migration names: ${[...new Set(oneOffDuplicates)].join(", ")}`);
        hasErrors = true;
    }
    logger.newline();
    if (hasErrors) {
        logger.error("Validation failed");
        process.exit(1);
    }
    else {
        logger.success("All migrations are valid");
    }
}
