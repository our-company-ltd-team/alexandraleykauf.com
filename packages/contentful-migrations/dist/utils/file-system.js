import fs from "node:fs/promises";
import path from "node:path";
/**
 * Pattern for migration file names: 0001-migration-name.ts
 */
const MIGRATION_PATTERN = /^(\d{4})-(.+)\.ts$/;
/**
 * Get all migration files from a directory
 */
export async function getMigrationFiles(directory, type) {
    try {
        const files = await fs.readdir(directory);
        const migrations = [];
        for (const file of files) {
            const match = file.match(MIGRATION_PATTERN);
            if (match) {
                migrations.push({
                    path: path.join(directory, file),
                    name: file.replace(/\.ts$/, ""),
                    number: Number.parseInt(match[1], 10),
                    type,
                });
            }
        }
        // Sort by number
        return migrations.sort((a, b) => a.number - b.number);
    }
    catch (error) {
        // Directory doesn't exist, return empty array
        if (error.code === "ENOENT") {
            return [];
        }
        throw error;
    }
}
/**
 * Get the next migration number for a directory
 */
export async function getNextMigrationNumber(directory) {
    const migrations = await getMigrationFiles(directory, "regular");
    if (migrations.length === 0) {
        return 1;
    }
    return Math.max(...migrations.map(m => m.number)) + 1;
}
/**
 * Format a migration number as a 4-digit string
 */
export function formatMigrationNumber(num) {
    return num.toString().padStart(4, "0");
}
/**
 * Create a migration file from template
 */
export async function createMigrationFile(directory, name, template) {
    // Ensure directory exists
    await fs.mkdir(directory, { recursive: true });
    const number = await getNextMigrationNumber(directory);
    const fileName = `${formatMigrationNumber(number)}-${name}.ts`;
    const filePath = path.join(directory, fileName);
    // Replace template placeholders
    const content = template
        .replace(/\{\{MIGRATION_NAME\}\}/g, `${formatMigrationNumber(number)}-${name}`)
        .replace(/\{\{DATE\}\}/g, new Date().toISOString());
    await fs.writeFile(filePath, content, "utf-8");
    return filePath;
}
/**
 * Check if a file exists
 */
export async function fileExists(filePath) {
    try {
        await fs.access(filePath);
        return true;
    }
    catch {
        return false;
    }
}
/**
 * Find a migration file by name in a directory
 */
export async function findMigrationByName(directory, name, type) {
    const migrations = await getMigrationFiles(directory, type);
    return migrations.find(m => m.name === name);
}
