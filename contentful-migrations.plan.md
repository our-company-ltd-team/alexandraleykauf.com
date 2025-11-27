# Create Contentful Migrations Package

## Package Structure

Create `packages/contentful-migrations/` with the following structure:

```
packages/contentful-migrations/
├── package.json
├── tsconfig.json
├── eslint.config.mjs
├── src/
│   ├── cli.ts                    # Main CLI entry point
│   ├── commands/
│   │   ├── generate.ts           # Generate new migration files
│   │   ├── run.ts                # Execute a single migration
│   │   ├── one-off.ts            # Execute one-off migrations
│   │   ├── status.ts             # Show migration status
│   │   └── validate.ts           # Validate migration files
│   ├── core/
│   │   ├── migration-runner.ts   # Core migration execution logic
│   │   ├── migration-tracker.ts  # Track applied migrations
│   │   └── contentful-client.ts  # Contentful API wrapper
│   ├── utils/
│   │   ├── file-system.ts        # File operations
│   │   ├── logger.ts             # Logging utility
│   │   └── config.ts             # Configuration management
│   └── types/
│       └── index.ts              # Migration-specific types
├── migrations/                    # Regular migration files
│   ├── 0001-initial-content-model.ts
│   └── .gitkeep
├── one-offs/                      # One-off migration files
│   └── .gitkeep
└── templates/
    ├── migration.template.ts          # Template for regular migrations
    └── migration-one-off.template.ts  # Template for one-off migrations
```

## Configuration Files

### 1. package.json

```json
{
  "name": "@alexandraleykauf/contentful-migrations",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "bin": {
    "migrate": "./dist/cli.js"
  },
  "scripts": {
    "build": "tsc",
    "dev": "tsc --watch",
    "typecheck": "tsc --noEmit",
    "lint": "eslint .",
    "lint:fix": "eslint --fix",
    "migrate:generate": "tsx src/cli.ts generate",
    "migrate:run": "tsx src/cli.ts run",
    "migrate:one-off": "tsx src/cli.ts one-off",
    "migrate:status": "tsx src/cli.ts status"
  },
  "dependencies": {
    "contentful-management": "^11.x",
    "contentful-migration": "^4.x",
    "commander": "^12.x",
    "chalk": "^5.x",
    "dotenv": "^16.x"
  },
  "devDependencies": {
    "@alexandraleykauf/contentful-types": "workspace:*",
    "@types/node": "^20",
    "tsx": "^4.x",
    "typescript": "^5"
  }
}
```

### 2. tsconfig.json

Extend root config with Node.js specific settings:

```json
{
  "extends": "../../tsconfig.json",
  "compilerOptions": {
    "outDir": "./dist",
    "rootDir": "./src",
    "module": "ESNext",
    "moduleResolution": "Bundler"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist", "migrations", "one-offs"]
}
```

### 3. eslint.config.mjs

Import shared rules from root (same pattern as web package).

## Core Implementation

### Design Principles

- **Forward-only migrations**: No rollback support. Migrations are applied once and cannot be reversed automatically.
- **Two migration types**: Regular migrations run in sequence; one-off migrations run individually.
- **Applied-only tracking**: Only successful migrations are recorded in Contentful.

### Migration Naming Convention

- **Regular migrations**: `0001-<name>.ts`, `0002-<name>.ts`, etc.
- Sequential numbering ensures proper execution order
- Four-digit padding allows up to 9999 migrations

### Migration Runner (`src/core/migration-runner.ts`)

- Use `contentful-migration` CLI wrapper for running migration files
- Use `contentful-management` SDK for custom migration logic
- Support TypeScript migration files via tsx
- Execute migrations in order based on numeric prefix
- Separate runners for regular and one-off migrations

### Migration Tracker (`src/core/migration-tracker.ts`)

- Store migration history in Contentful as a custom content type "MigrationHistory"
- Track only applied migrations (no pending/failed status):
  - `migrationName`: string (e.g., "0001-initial-content-model")
  - `appliedAt`: datetime (when the migration was applied)
  - `environment`: string (target environment)
  - `type`: string ("regular" | "once")
- Pending migrations are determined by comparing files on disk vs applied entries
- Separate tracking entries for regular and one-off migrations

### CLI Commands

**Generate**: `pnpm migrate:generate <name> [--one-off]`

- Create numbered migration file: `0001-<name>.ts`
- Auto-increment from last migration number
- Use `--one-off` flag to generate in `one-offs/` directory
- Scaffold from appropriate template with type imports

**Run**: `pnpm migrate:run --name=<migration-name> [--environment=<env>]`

- Execute a single regular migration by name
- `--name` flag is required (e.g., `--name=0001-initial-content-model`)
- Show progress with chalk-colored output
- Record successful migration in tracker
- Fail if migration has already been applied

**One-off**: `pnpm migrate:one-off --name=<migration-name> [--environment=<env>]`

- Execute a specific one-off migration from `one-offs/`
- `--name` flag is required
- Record execution in tracker (type: "once")
- Prevent re-running already executed one-off migrations

**Status**: `pnpm migrate:status`

- List all migration files with their status (pending or applied)
- Show applied date for completed migrations
- Display separately for regular and one-off migrations
- Pending = file exists on disk but not in tracker

### Migration File Template

Regular migration (`templates/migration.template.ts`):

```typescript
import type { MigrationFunction } from 'contentful-migration';

/**
 * Migration: {{MIGRATION_NAME}}
 * Created: {{DATE}}
 * 
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */
const migration: MigrationFunction = (migration) => {
  // Migration logic here
  // Example: Create content type
  const contentType = migration.createContentType('newType', {
    name: 'New Type',
    description: 'Description',
  });
  
  contentType.createField('title', {
    name: 'Title',
    type: 'Symbol',
    required: true,
  });
};

export default migration;
```

One-off migration (`templates/migration-one-off.template.ts`):

```typescript
import type { MigrationFunction } from 'contentful-migration';

/**
 * One-off Migration: {{MIGRATION_NAME}}
 * Created: {{DATE}}
 * 
 * This is a one-time migration that will only be executed once.
 * Use for data transformations or fixes that should not be re-run.
 * 
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */
const migration: MigrationFunction = (migration) => {
  // One-off migration logic here
};

export default migration;
```

## Environment Configuration

Create `.env.example` in package root:

```
CONTENTFUL_SPACE_ID=
CONTENTFUL_MANAGEMENT_TOKEN=
CONTENTFUL_ENVIRONMENT=master
```

## Integration Points

1. **contentful-types package**: Import generated types for type-safe migrations
2. **Turbo caching**: Add migration-related tasks to `turbo.json`
3. **Root scripts**: Add convenience scripts to root `package.json`
4. **Monorepo lint-staged**: Already configured to lint all packages

## Initial Migration

Create first migration based on existing content model in `packages/web/compsturcuture.txt`:

- GeneralConfig content type
- Category content type  
- Project content type with nested structures
- Link and Separator content types

## Documentation

Create `packages/contentful-migrations/README.md` with:

- Setup instructions
- Usage examples for each command
- Migration file structure
- Best practices (when to use regular vs one-off migrations)
- Forward-only design explanation (no rollback support)
- Troubleshooting guide
