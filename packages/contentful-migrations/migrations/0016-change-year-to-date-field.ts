import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0016-change-year-to-date-field
 * Created: 2025-12-XX
 *
 * Changes the year field on the Project content type from Symbol (string) to Date (date-only).
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  const projectType = migration.editContentType("project");

  // Delete the old Symbol field and create new Date field
  projectType.deleteField("year");

  projectType.createField("year", {
    name: "Year",
    type: "Date",
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectType.changeFieldControl("year", "builtin", "datePicker", {
    helpText: "The year of the project. Used for sorting.",
  });
};

export default migration;
