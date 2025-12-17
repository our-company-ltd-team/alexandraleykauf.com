import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0015-add-show-in-homapage-toggle-to-category
 * Created: 2025-12-16 14:41
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  const category = migration.editContentType("category");
  category
    .createField("showItemsInHomepage")
    .name("Show items in homepage")
    .type("Boolean")
    .required(true)
    .defaultValue({ "en-US": false })
    .localized(false)
    .omitted(false)
    .disabled(false);

  category.changeFieldControl("showItemsInHomepage", "builtin", "boolean", {
    helpText: "Whether to show the items marked with this category on the start page. Default is false.",
    trueLabel: "Yes",
    falseLabel: "No",
  });

  category.moveField("showItemsInHomepage").beforeField("color");

  // Correct help text for migrations field in content model version
  const contentModelVersion = migration.editContentType("contentModelVersion");
  contentModelVersion.changeFieldControl("migrations", "builtin", "tagEditor", {
    helpText: "List of migrations that have been applied to the content model. Does not have any visual effect.",
  });
};

export default migration;
