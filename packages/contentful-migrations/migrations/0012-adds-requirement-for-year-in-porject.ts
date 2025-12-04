import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0012-adds-requirement-for-year-in-porject
 * Created: 2025-12-04 13:34
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  const projectType = migration.editContentType("project");

  projectType.editField("year", {
    name: "Year",
    type: "Symbol",
    required: true,
  });

  projectType.changeFieldControl("year", "builtin", "singleLine", {
    helpText: "The year of the project. Required for sorting projects.",
  });
};

export default migration;
