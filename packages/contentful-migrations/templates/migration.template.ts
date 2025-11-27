import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: {{MIGRATION_NAME}}
 * Created: {{DATE}}
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

// eslint-disable-next-line unused-imports/no-unused-vars
const migration: MigrationFunction = (migration) => {
  // const contentModelVersion = migration.createContentType("contentModelVersion", {
  //   name: "📜 Content Model Version",
  //   description: "Tracks the version of the content model and applied migrations",
  //   displayField: "contentfulDescription",
  // });

  // contentModelVersion.createField("contentfulDescription", {
  //   name: "Contentful Description",
  //   type: "Symbol",
  //   validations: [{ unique: true }],
  //   required: true,
  //   localized: false,
  //   omitted: false,
  //   disabled: false,
  // });

  // contentModelVersion.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
  //   helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  // });
};

export default migration;
