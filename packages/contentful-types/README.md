# @alexandraleykauf/contentful-types

Auto-generated TypeScript types from the Contentful content model.

This package uses [contentful-typescript-codegen](https://github.com/intercom/contentful-typescript-codegen) to generate TypeScript interfaces from your Contentful environment, ensuring type safety across all packages that interact with Contentful content.

## Prerequisites

### Environment Variables

The following environment variables are required:

| Variable                      | Description                                 |
| ----------------------------- | ------------------------------------------- |
| `CONTENTFUL_MANAGEMENT_TOKEN` | Your Contentful Management API token        |
| `CONTENTFUL_SPACE_ID`         | Your Contentful space ID                    |
| `CONTENTFUL_ENVIRONMENT`      | The environment name (defaults to `master`) |

Create a `.env` file in the monorepo root or set these variables in your shell.

## Usage

### Generating Types

**One-time generation:**

```bash
# From monorepo root
pnpm generate:types

# Or from this package
pnpm generate
```

**Watch mode (for development):**

```bash
# From monorepo root
pnpm generate:types:watch

# Or from this package
pnpm generate:watch
```

Watch mode polls Contentful every 15 seconds for changes and regenerates types automatically.

### Consuming Types

Import the generated types in other packages:

```typescript
import type { ICategory, ICategoryFields } from "@alexandraleykauf/contentful-types";

// Use with Contentful Delivery API
const categories: ICategory[] = await client.getEntries<ICategoryFields>({
  content_type: "category",
});
```

## Generated Type Structure

The codegen produces the following type patterns:

### Entry Types

For each content type (e.g., `category`), you get:

- `ICategoryFields` - The fields interface containing all field definitions
- `ICategory` - The full Entry type extending Contentful's `Entry<ICategoryFields>`

### Locale Types

- `LOCALE_CODE` - Union type of all available locale codes
- `CONTENTFUL_DEFAULT_LOCALE_CODE` - The default locale string type

### Contentful Base Types

The generated file also re-exports useful types from Contentful:

- `Asset` - Contentful asset type
- `Entry` - Base entry type
- `RichTextContent` - Rich text document type (if using Rich Text fields)

## Workflow

### When to Regenerate Types

Run `pnpm generate:types` after:

1. Creating a new content type in Contentful
2. Adding, removing, or modifying fields on a content type
3. Changing field validations (e.g., adding new options to a dropdown)
4. Running migrations that modify the content model

### Recommended Workflow

1. Make content model changes via migrations (`pnpm migrate:run`)
2. Regenerate types (`pnpm generate:types`)
3. Update consuming code to use new/modified types
4. Commit the updated `generated/contentful.d.ts`

### CI/CD Considerations

For production builds, ensure types are generated before building dependent packages:

```bash
pnpm generate:types && pnpm build
```

## File Structure

```text
packages/contentful-types/
├── package.json
├── tsconfig.json
├── getContentfulEnvironment.js  # Contentful connection config (CommonJS)
├── src/
│   └── index.ts                 # Re-exports generated types
└── generated/
    └── contentful.d.ts          # Auto-generated types (committed)
```

## Troubleshooting

### "Cannot find module '../generated/contentful'"

Run `pnpm generate:types` to generate the types file.

### "CONTENTFUL_MANAGEMENT_TOKEN environment variable is required"

Ensure your `.env` file contains the required environment variables, or export them in your shell.

### Types are outdated

Re-run `pnpm generate:types` to fetch the latest content model from Contentful.
