import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0003-add-separator-content-type
 * Created: 2025-11-27 22:57
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  const separatorType = migration.createContentType("separator", {
    name: "Separator",
    description: "A separator for projects",
    displayField: "contentfulDescription",
  });

  separatorType.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  separatorType.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  separatorType.createField("category", {
    name: "Category",
    type: "Link",
    linkType: "Entry",
    validations: [{ linkContentType: ["category"] }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  separatorType.changeFieldControl("category", "builtin", "entryLinkEditor", {
    helpText: "The category of the separator.",
  });
};

export default migration;
