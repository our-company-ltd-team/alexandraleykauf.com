/* eslint-disable node/no-process-env */
import {
  createEnv,
} from "@alexandraleykauf/env-schemas";
import z from "zod/v4";

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
  },
  client: {
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID: z.string().min(1),
    NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT: z.string().min(1),
    NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW: z
      .enum(["true", "false"], {
        error: "NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW must be 'true' or 'false'",
      })
      .transform(val => val === "true"),
    NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN: z.string().min(1),
    NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN: z.string().min(1),
  },
  // For Next.js, we need to explicitly list the env vars
  // that should be included in the runtime
  runtimeEnv: {
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID: process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID,
    NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT: process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT,
    NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW: process.env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW,
    NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN,
    NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN: process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN,
  },
  emptyStringAsUndefined: true,
  // Skip validation during build if env vars aren't available
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
