import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getConfig } from "../utils/config.js";
import { createMigrationFile } from "../utils/file-system.js";
import { logger } from "../utils/logger.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
/**
 * Generate a new migration file
 */
export async function generate(name, options) {
    const config = getConfig();
    // Determine directory and template based on type
    const isOneOff = options.oneOff ?? false;
    const directory = isOneOff ? config.oneOffsDir : config.migrationsDir;
    const templateName = isOneOff ? "migration-one-off.template.ts" : "migration.template.ts";
    // Load template
    const templatePath = path.resolve(__dirname, "../../templates", templateName);
    const template = await fs.readFile(templatePath, "utf-8");
    // Create the migration file
    const filePath = await createMigrationFile(directory, name, template);
    logger.success(`Created migration: ${path.basename(filePath)}`);
    logger.info(`Path: ${filePath}`);
}
