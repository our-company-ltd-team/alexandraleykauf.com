import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0014-add-title-to-project-row
 * Created: 2025-12-12
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  const projectRowType = migration.editContentType("projectRow");

  projectRowType.createField("title", {
    name: "Title",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectRowType.changeFieldControl("title", "builtin", "singleLine", {
    helpText: "The title of the project row.",
  });

  projectRowType.moveField("title").beforeField("row");
};

export default migration;
