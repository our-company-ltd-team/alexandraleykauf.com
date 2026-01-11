/* eslint-disable node/no-process-env */
import { createEnv } from "@t3-oss/env-core";
// import { vercel } from "@t3-oss/env-core/presets-valibot";
import * as v from "valibot";

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
 *   console.log(env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID);
 */
export const env = createEnv({
  server: {
    CONTENTFUL_WEBHOOK_SECRET: v.pipe(v.string(), v.minLength(1)),
  },
  clientPrefix: "NEXT_PUBLIC_",
  client: {
    NEXT_PUBLIC_CONTENTFUL_SPACE_ID: v.pipe(v.string(), v.minLength(1)),
    NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT: v.pipe(v.string(), v.minLength(1)),
    NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW: v.pipe(
      v.picklist(["true", "false"], "NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW must be 'true' or 'false'"),
      v.transform(val => val === "true"),
    ),
    NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN: v.pipe(v.string(), v.minLength(1)),
    NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN: v.pipe(v.string(), v.minLength(1)),
  },
  // For Next.js, we need to explicitly list the env vars
  // that should be included in the runtime
  runtimeEnv: {
    CONTENTFUL_WEBHOOK_SECRET: process.env.CONTENTFUL_WEBHOOK_SECRET,
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
