import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0018-add-faded-color-to-categoty-content-type
 * Created: 2026-01-09 11:31
 *
 * Adds a faded color field to the category content type.
 */

const migration: MigrationFunction = (migration) => {
  const category = migration.editContentType("category");

  category.createField("fadedColor", {
    name: "Faded Color",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  category.changeFieldControl("fadedColor", "builtin", "singleLine", {
    helpText: "The faded color of the category. Use the format #RRGGBB or rgb(255,255,255).",
  });

  category.editField("color").name("Active Color");
};

export default migration;
