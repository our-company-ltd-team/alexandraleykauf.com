# @alexandraleykauf/contentful-migrations

Contentful schema migration CLI for managing content model changes.

## Features

- **Forward-only migrations**: No rollback support. Migrations are applied once and cannot be reversed automatically.
- **Two migration types**: Regular migrations run in sequence; one-off migrations run individually.
- **Applied-only tracking**: Only successful migrations are recorded in Contentful.
- **TypeScript support**: Write migrations in TypeScript with full type safety.

## Setup

1. Copy `.env.example` to `.env` and fill in your Contentful credentials:

```bash
CONTENTFUL_SPACE_ID=your-space-id
CONTENTFUL_MANAGEMENT_TOKEN=your-management-token
CONTENTFUL_ENVIRONMENT=master
```

2. Install dependencies:

```bash
pnpm install
```

3. **Important**: Run the initial migration to set up migration tracking:

```bash
pnpm migrate:run --name=0001-init-content-model-version
```

This creates the `contentModelVersion` content type that tracks which migrations have been applied. This step is required once per Contentful environment.

## Usage

### Generate a Migration

Create a new regular migration:

```bash
pnpm migrate:generate my-migration-name
```

Create a one-off migration:

```bash
pnpm migrate:generate my-one-off-migration --one-off
```

### Run Migrations

Run a specific regular migration:

```bash
pnpm migrate:run --name=0001-my-migration-name
```

Run a one-off migration:

```bash
pnpm migrate:one-off --name=0001-my-one-off-migration
```

### Check Status

View the status of all migrations:

```bash
pnpm migrate:status
```

### Validate Migrations

Check for issues in migration files:

```bash
pnpm migrate:validate
```

## Migration File Structure

Migrations are stored in two directories:

- `migrations/` - Regular migrations that run in sequence
- `one-offs/` - One-time migrations for data fixes

### Naming Convention

Migrations follow the pattern: `0001-migration-name.ts`

- Four-digit prefix for ordering (0001, 0002, etc.)
- Kebab-case name describing the change
- `.ts` extension for TypeScript

### Example Migration

```typescript
import type { MigrationFunction } from "contentful-migration";

const migration: MigrationFunction = (migration) => {
  const contentType = migration.createContentType("blogPost", {
    name: "Blog Post",
    description: "A blog post entry",
  });

  contentType.createField("title", {
    name: "Title",
    type: "Symbol",
    required: true,
  });

  contentType.createField("body", {
    name: "Body",
    type: "RichText",
    required: true,
  });
};

export default migration;
```

## Best Practices

### When to Use Regular Migrations

- Creating or modifying content types
- Adding or removing fields
- Changing field validations
- Any schema change that should be tracked in version control

### When to Use One-off Migrations

- Data transformations (e.g., migrating content between fields)
- Fixing data inconsistencies
- One-time cleanup operations
- Any operation that should only run once and not be repeated

## Tracking

Migrations are tracked in Contentful using a `contentModelVersion` content type. A single entry stores:

- `lastMigration`: Name of the most recently applied migration
- `updatedAt`: Timestamp of the last update
- `migrations`: Array of all applied migration names

The content type is created by running the `0001-init-content-model-version` migration (see Setup).

## Environment Targeting

By default, migrations run against the environment specified in `.env`. You can override this:

```bash
pnpm migrate:run --name=0001-my-migration --environment=staging
```
