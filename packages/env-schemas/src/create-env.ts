import type { ZodType } from "zod/v4";

import { z } from "zod/v4";

/**
 * Options for creating a type-safe environment configuration.
 */
export type CreateEnvOptions<
  TServer extends Record<string, ZodType>,
  TClient extends Record<string, ZodType>,
> = {
  /**
   * Server-side environment variable schemas.
   * These variables are only available on the server.
   */
  server?: TServer;

  /**
   * Client-side environment variable schemas.
   * In Next.js, these must be prefixed with NEXT_PUBLIC_.
   */
  client?: TClient;

  /**
   * The runtime environment object containing the actual values.
   * For Node.js: pass `process.env` directly
   * For Next.js: pass an object with explicit mappings
   */
  runtimeEnv: Record<string, string | undefined>;

  /**
   * Whether to treat empty strings as undefined.
   * @default false
   */
  emptyStringAsUndefined?: boolean;

  /**
   * Skip validation entirely. Useful for build-time when env vars aren't available.
   * @default false
   */
  skipValidation?: boolean;

  /**
   * Called when validation fails.
   * @default throws an error with formatted messages
   */
  onValidationError?: (error: z.ZodError) => never;

  /**
   * Called when a server-side variable is accessed on the client.
   * Only relevant for Next.js/browser environments.
   * @default throws an error
   */
  onInvalidAccess?: (variable: string) => never;
};

/**
 * Detect if code is running on the client side (browser).
 * Uses globalThis to avoid TypeScript errors in Node.js environments
 * where DOM types aren't available.
 */
function isClient(): boolean {
  return typeof (globalThis as { window?: unknown }).window !== "undefined";
}

/**
 * Format Zod errors into a readable string.
 */
function formatErrors(error: z.ZodError): string {
  return error.issues
    .map(issue => `  ❌ ${issue.path.join(".")}: ${issue.message}`)
    .join("\n");
}

/**
 * Default error handler for validation failures.
 */
function defaultOnValidationError(error: z.ZodError): never {
  console.error(`❌ Invalid environment variables:\n${formatErrors(error)}`);
  throw new Error("Invalid environment variables");
}

/**
 * Default error handler for invalid server variable access on client.
 */
function defaultOnInvalidAccess(variable: string): never {
  throw new Error(
    `❌ Attempted to access server-side environment variable "${variable}" on the client`,
  );
}

/**
 * Creates a type-safe environment configuration with validation.
 *
 * This is a custom replacement for @t3-oss/env-* that works across
 * all packages (Node.js, Next.js, etc.) with zero external dependencies.
 *
 * @example
 * ```typescript
 * // Node.js package
 * import { createEnv } from "@alexandraleykauf/env-schemas";
 *
 * export const env = createEnv({
 *   server: {
 *     DATABASE_URL: z.string().url(),
 *   },
 *   runtimeEnv: process.env,
 * });
 * ```
 *
 * @example
 * ```typescript
 * // Next.js app
 * import { createEnv } from "@alexandraleykauf/env-schemas";
 *
 * export const env = createEnv({
 *   server: {
 *     SECRET_KEY: z.string(),
 *   },
 *   client: {
 *     NEXT_PUBLIC_API_URL: z.string().url(),
 *   },
 *   runtimeEnv: {
 *     SECRET_KEY: process.env.SECRET_KEY,
 *     NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
 *   },
 * });
 * ```
 */
export function createEnv<
  TServer extends Record<string, ZodType> = Record<string, never>,
  TClient extends Record<string, ZodType> = Record<string, never>,
>(
  options: CreateEnvOptions<TServer, TClient>,
): Readonly<
  z.infer<z.ZodObject<TServer>> & z.infer<z.ZodObject<TClient>>
> {
  const {
    server = {} as TServer,
    client = {} as TClient,
    runtimeEnv,
    emptyStringAsUndefined = false,
    skipValidation = false,
    onValidationError = defaultOnValidationError,
    onInvalidAccess = defaultOnInvalidAccess,
  } = options;

  // Process the runtime environment
  const processedEnv: Record<string, string | undefined> = {};
  for (const [key, value] of Object.entries(runtimeEnv)) {
    if (emptyStringAsUndefined && value === "") {
      processedEnv[key] = undefined;
    }
    else {
      processedEnv[key] = value;
    }
  }

  // If validation is skipped, return a proxy that returns raw values
  if (skipValidation) {
    return processedEnv as z.infer<z.ZodObject<TServer>>
      & z.infer<z.ZodObject<TClient>>;
  }

  // Combine server and client schemas
  const allSchemas = { ...server, ...client };
  const combinedSchema = z.object(allSchemas);

  // Validate the environment
  const result = combinedSchema.safeParse(processedEnv);

  if (!result.success) {
    return onValidationError(result.error);
  }

  const validatedEnv = result.data;

  // Create a proxy to protect server-side variables on the client
  const serverKeys = new Set(Object.keys(server));

  return new Proxy(validatedEnv, {
    get(target, prop) {
      if (typeof prop !== "string") {
        return undefined;
      }

      // Check if accessing a server variable on the client
      if (isClient() && serverKeys.has(prop)) {
        return onInvalidAccess(prop);
      }

      return target[prop as keyof typeof target];
    },
  }) as z.infer<z.ZodObject<TServer>> & z.infer<z.ZodObject<TClient>>;
}
