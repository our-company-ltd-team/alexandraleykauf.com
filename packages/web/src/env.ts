/* eslint-disable node/no-process-env */
import {
  contentfulDeliverySchema,
  contentfulServerSchema,
} from "@alexandraleykauf/env-schemas";
import { createEnv } from "@t3-oss/env-nextjs";

/**
 * Type-safe environment variables for the web package.
 *
 * This validates environment variables at runtime and provides
 * full TypeScript inference for all env vars.
 *
 * Server-side vars are only available in server components and API routes.
 * Client-side vars (NEXT_PUBLIC_*) are available everywhere.
 *
 * Usage:
 *   import { env } from "@/env";
 *   console.log(env.CONTENTFUL_SPACE_ID);
 */
export const env = createEnv({
  server: {
    ...contentfulServerSchema,
    ...contentfulDeliverySchema,
  },
  client: {
    // Add NEXT_PUBLIC_* vars here
    // Example: NEXT_PUBLIC_APP_URL: z.string().url(),
  },
  // For Next.js, we need to explicitly list the env vars
  // that should be included in the runtime
  runtimeEnv: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_MANAGEMENT_TOKEN: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
    CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
    CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
  },
  emptyStringAsUndefined: true,
  // Skip validation during build if env vars aren't available
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
