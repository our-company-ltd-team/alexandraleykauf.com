/* eslint-disable unicorn/filename-case */
/**
 * Configuration file required by contentful-typescript-codegen.
 *
 * This file connects to Contentful using the Management API
 * and returns the environment to generate types from.
 *
 * Note: Uses CommonJS syntax because contentful-typescript-codegen
 * uses require() to load this file.
 *
 * Required environment variables:
 * - CONTENTFUL_MANAGEMENT_TOKEN: Your Contentful Management API token
 * - CONTENTFUL_SPACE_ID: Your Contentful space ID
 * - CONTENTFUL_ENVIRONMENT: The environment name (defaults to "master")
 */

require("dotenv/config");
const contentfulManagement = require("contentful-management");
const { z } = require("zod");

// Same schema as @alexandraleykauf/env-schemas (CJS compatible)
const envSchema = z.object({
  CONTENTFUL_SPACE_ID: z
    .string({ required_error: "CONTENTFUL_SPACE_ID is required" })
    .min(1, "CONTENTFUL_SPACE_ID cannot be empty"),
  CONTENTFUL_MANAGEMENT_TOKEN: z
    .string({ required_error: "CONTENTFUL_MANAGEMENT_TOKEN is required" })
    .min(1, "CONTENTFUL_MANAGEMENT_TOKEN cannot be empty"),
  CONTENTFUL_ENVIRONMENT: z
    .string()
    .default("master"),
});

module.exports = function getContentfulEnvironment() {
  // eslint-disable-next-line node/no-process-env
  const result = envSchema.safeParse(process.env);

  if (!result.success) {
    const errors = result.error.issues
      .map(issue => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`Environment validation failed:\n${errors}`);
  }

  const env = result.data;

  const client = contentfulManagement.createClient({
    accessToken: env.CONTENTFUL_MANAGEMENT_TOKEN,
  });

  return client
    .getSpace(env.CONTENTFUL_SPACE_ID)
    .then(space => space.getEnvironment(env.CONTENTFUL_ENVIRONMENT));
};
