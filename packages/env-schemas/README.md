# @alexandraleykauf/env-schemas

Shared Zod schemas and utilities for environment variable validation across the monorepo.

## Purpose

This package provides:

- **Reusable Zod schemas** for environment variables shared across packages
- **`createEnv()`** - A custom type-safe environment validation function

Benefits:

- **Type safety** - Full TypeScript inference for env vars
- **Consistent validation** - Same validation rules everywhere
- **Zero external dependencies** - Only relies on Zod
- **Browser/Node compatible** - Works in Next.js, Node.js, and other environments
- **Portability** - If a package is externalized, the schema can be inlined

## Usage

### Basic Usage (Node.js)

<!-- eslint-disable node/no-process-env -->

```typescript
import { contentfulServerSchema, createEnv } from "@alexandraleykauf/env-schemas";

export const env = createEnv({
  server: contentfulServerSchema,
  runtimeEnv: process.env,
});

// Type-safe access
console.error(env.CONTENTFUL_SPACE_ID);
```

### Next.js Usage

<!-- eslint-disable node/no-process-env -->

```typescript
import {
  contentfulDeliverySchema,
  contentfulServerSchema,
  createEnv,
} from "@alexandraleykauf/env-schemas";

export const env = createEnv({
  server: {
    ...contentfulServerSchema,
    ...contentfulDeliverySchema,
  },
  client: {
    // Add NEXT_PUBLIC_* vars here
  },
  runtimeEnv: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_MANAGEMENT_TOKEN: process.env.CONTENTFUL_MANAGEMENT_TOKEN,
    CONTENTFUL_ENVIRONMENT: process.env.CONTENTFUL_ENVIRONMENT,
    CONTENTFUL_DELIVERY_TOKEN: process.env.CONTENTFUL_DELIVERY_TOKEN,
    CONTENTFUL_PREVIEW_TOKEN: process.env.CONTENTFUL_PREVIEW_TOKEN,
  },
  emptyStringAsUndefined: true,
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
});
```

### In CommonJS files

<!-- eslint-disable node/no-process-env -->

```javascript
const { z } = require("zod");

// Inline the schema (same definition as contentfulServerSchema)
const envSchema = z.object({
  CONTENTFUL_SPACE_ID: z.string().min(1),
  CONTENTFUL_MANAGEMENT_TOKEN: z.string().min(1),
  CONTENTFUL_ENVIRONMENT: z.string().default("master"),
});

const result = envSchema.safeParse(process.env);
if (!result.success) {
  throw new Error("Invalid environment");
}
```

## API Reference

### `createEnv(options)`

Creates a type-safe environment configuration with validation.

#### Options

| Option                   | Type                                  | Default  | Description                                            |
| ------------------------ | ------------------------------------- | -------- | ------------------------------------------------------ |
| `server`                 | `Record<string, ZodType>`             | `{}`     | Server-side environment variable schemas               |
| `client`                 | `Record<string, ZodType>`             | `{}`     | Client-side schemas (NEXT_PUBLIC\_\* in Next.js)       |
| `runtimeEnv`             | `Record<string, string \| undefined>` | Required | The runtime environment object                         |
| `emptyStringAsUndefined` | `boolean`                             | `false`  | Treat empty strings as undefined                       |
| `skipValidation`         | `boolean`                             | `false`  | Skip validation (for build-time when vars unavailable) |
| `onValidationError`      | `(error: ZodError) => never`          | Throws   | Custom validation error handler                        |
| `onInvalidAccess`        | `(variable: string) => never`         | Throws   | Custom handler for server var access on client         |

#### Features

- **Server variable protection**: In browser environments, accessing server-side variables throws an error
- **Empty string handling**: Optionally treat `""` as `undefined`
- **Skip validation**: Useful for build steps when env vars aren't available
- **Custom error handling**: Override default error behavior

## Available Schemas

### `contentfulServerSchema`

Server-side Contentful Management API variables:

| Variable                      | Required | Default    | Description          |
| ----------------------------- | -------- | ---------- | -------------------- |
| `CONTENTFUL_SPACE_ID`         | Yes      | -          | Contentful space ID  |
| `CONTENTFUL_MANAGEMENT_TOKEN` | Yes      | -          | Management API token |
| `CONTENTFUL_ENVIRONMENT`      | No       | `"master"` | Environment name     |

### `contentfulDeliverySchema`

Server-side Contentful Delivery API variables:

| Variable                    | Required | Default | Description        |
| --------------------------- | -------- | ------- | ------------------ |
| `CONTENTFUL_DELIVERY_TOKEN` | Yes      | -       | Delivery API token |
| `CONTENTFUL_PREVIEW_TOKEN`  | No       | -       | Preview API token  |

### `contentfulClientSchema`

Client-side Contentful variables (currently empty, for future use).

## Externalization

If you extract a package to its own repository, you can either:

1. **Publish this package** to npm and depend on it
2. **Inline the schema** by copying the Zod definition:

<!-- eslint-disable node/no-process-env -->

```typescript
import { z } from "zod";

// Custom createEnv (or copy from this package)
function createEnv<T extends Record<string, z.ZodType>>(opts: {
  server: T;
  runtimeEnv: Record<string, string | undefined>;
}) {
  const schema = z.object(opts.server);
  const result = schema.safeParse(opts.runtimeEnv);
  if (!result.success) {
    console.error("Invalid environment:", result.error.format());
    throw new Error("Invalid environment variables");
  }
  return result.data;
}

// Inlined schema
export const env = createEnv({
  server: {
    CONTENTFUL_SPACE_ID: z.string().min(1),
    CONTENTFUL_MANAGEMENT_TOKEN: z.string().min(1),
    CONTENTFUL_ENVIRONMENT: z.string().default("master"),
  },
  runtimeEnv: process.env,
});
```
