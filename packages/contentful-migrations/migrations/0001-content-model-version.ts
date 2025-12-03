import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0001-init-content-model-version
 * Created: 2025-11-27
 *
 * Creates the Content Model Version content type used to track applied migrations.
 * This migration MUST be run first on any new environment.
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */
const migration: MigrationFunction = (migration) => {
  const contentModelVersion = migration.createContentType("contentModelVersion", {
    name: "Content Model Version",
    description: "Tracks the version of the content model and applied migrations",
    displayField: "contentfulDescription",
  });

  contentModelVersion.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  contentModelVersion.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  contentModelVersion.createField("updatedAt", {
    name: "Updated At",
    type: "Symbol",
    required: true,
  });

  contentModelVersion.createField("lastMigration", {
    name: "Last Migration",
    type: "Symbol",
    required: true,
  });

  contentModelVersion.createField("migrations", {
    name: "Migrations",
    type: "Array",
    required: true,
    items: {
      type: "Symbol",
      validations: [],
    },
  });

  contentModelVersion.changeFieldControl("migrations", "builtin", "tagEditor", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });
};

export default migration;
