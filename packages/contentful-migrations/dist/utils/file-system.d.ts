import type { MigrationFile, MigrationType } from "../types/index.js";
/**
 * Get all migration files from a directory
 */
export declare function getMigrationFiles(directory: string, type: MigrationType): Promise<MigrationFile[]>;
/**
 * Get the next migration number for a directory
 */
export declare function getNextMigrationNumber(directory: string): Promise<number>;
/**
 * Format a migration number as a 4-digit string
 */
export declare function formatMigrationNumber(num: number): string;
/**
 * Create a migration file from template
 */
export declare function createMigrationFile(directory: string, name: string, template: string): Promise<string>;
/**
 * Check if a file exists
 */
export declare function fileExists(filePath: string): Promise<boolean>;
/**
 * Find a migration file by name in a directory
 */
export declare function findMigrationByName(directory: string, name: string, type: MigrationType): Promise<MigrationFile | undefined>;
//# sourceMappingURL=file-system.d.ts.map