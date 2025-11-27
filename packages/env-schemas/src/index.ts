/**
 * Shared environment variable schemas and utilities
 *
 * This package exports:
 * - Zod schemas for environment variables shared across packages
 * - createEnv() - a custom type-safe env validation function
 */

export * from "./contentful.js";
export { createEnv, type CreateEnvOptions } from "./create-env.js";
