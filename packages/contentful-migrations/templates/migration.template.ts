import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: {{MIGRATION_NAME}}
 * Created: {{DATE}}
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */
const migration: MigrationFunction = (_migration) => {
  // Migration logic here
  // Example: Create content type
  // const contentType = migration.createContentType("newType", {
  //   name: "New Type",
  //   description: "Description",
  // });
  //
  // contentType.createField("title", {
  //   name: "Title",
  //   type: "Symbol",
  //   required: true,
  // });
};

export default migration;
