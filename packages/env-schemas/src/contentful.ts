import { z } from "zod";

/**
 * Server-side Contentful environment variable schema.
 *
 * Used by packages that interact with the Contentful Management API:
 * - contentful-migrations
 * - contentful-types
 * - web (server-side)
 */
export const contentfulServerSchema = {
  CONTENTFUL_SPACE_ID: z
    .string({ required_error: "CONTENTFUL_SPACE_ID is required" })
    .min(1, "CONTENTFUL_SPACE_ID cannot be empty"),

  CONTENTFUL_MANAGEMENT_TOKEN: z
    .string({ required_error: "CONTENTFUL_MANAGEMENT_TOKEN is required" })
    .min(1, "CONTENTFUL_MANAGEMENT_TOKEN cannot be empty"),

  CONTENTFUL_ENVIRONMENT: z
    .string()
    .default("master"),
};

/**
 * Server-side Contentful Delivery API schema.
 *
 * Used by packages that fetch content from Contentful:
 * - web (server-side)
 */
export const contentfulDeliverySchema = {
  CONTENTFUL_DELIVERY_TOKEN: z
    .string({ required_error: "CONTENTFUL_DELIVERY_TOKEN is required" })
    .min(1, "CONTENTFUL_DELIVERY_TOKEN cannot be empty"),

  CONTENTFUL_PREVIEW_TOKEN: z
    .string()
    .optional(),
};

/**
 * Client-side Contentful environment variable schema.
 *
 * These are exposed to the browser via NEXT_PUBLIC_ prefix.
 * Currently empty, but available for future use.
 */
export const contentfulClientSchema = {
  // Add NEXT_PUBLIC_* contentful vars here if needed
};
