# @alexandraleykauf/env-schemas

Shared Zod schemas for environment variable validation across the monorepo.

## Purpose

This package provides reusable Zod schemas for environment variables that are shared across multiple packages. It enables:

- **Type safety** - Full TypeScript inference for env vars
- **Consistent validation** - Same validation rules everywhere
- **Easy maintenance** - Update schema once, applies everywhere
- **Portability** - If a package is externalized, the schema can be inlined

## Usage

### In Node.js packages (with @t3-oss/env-core)

```typescript
import { createEnv } from "@t3-oss/env-core";

import { contentfulServerSchema } from "@alexandraleykauf/env-schemas";

export const env = createEnv({
  server: contentfulServerSchema,
  // eslint-disable-next-line node/no-process-env
  runtimeEnv: process.env,
});

// Type-safe access
console.log(env.CONTENTFUL_SPACE_ID);
```

### In Next.js (with @t3-oss/env-nextjs)

```typescript
import { createEnv } from "@t3-oss/env-nextjs";

import { contentfulDeliverySchema, contentfulServerSchema } from "@alexandraleykauf/env-schemas";

export const env = createEnv({
  server: {
    ...contentfulServerSchema,
    ...contentfulDeliverySchema,
  },
  client: {},
  runtimeEnv: {
    // eslint-disable-next-line node/no-process-env
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    // ... other vars
  },
});
```

### In CommonJS files

```javascript
const { z } = require("zod");

// Inline the schema (same definition as contentfulServerSchema)
const envSchema = z.object({
  CONTENTFUL_SPACE_ID: z.string().min(1),
  CONTENTFUL_MANAGEMENT_TOKEN: z.string().min(1),
  CONTENTFUL_ENVIRONMENT: z.string().default("master"),
});

// eslint-disable-next-line node/no-process-env
const result = envSchema.safeParse(process.env);
if (!result.success) {
  throw new Error("Invalid environment");
}
```

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

```typescript
// Inlined schema (no dependency required)
import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    CONTENTFUL_SPACE_ID: z.string().min(1, "CONTENTFUL_SPACE_ID is required"),
    CONTENTFUL_MANAGEMENT_TOKEN: z.string().min(1, "CONTENTFUL_MANAGEMENT_TOKEN is required"),
    CONTENTFUL_ENVIRONMENT: z.string().default("master"),
  },

  // eslint-disable-next-line node/no-process-env
  runtimeEnv: process.env,
});
```
