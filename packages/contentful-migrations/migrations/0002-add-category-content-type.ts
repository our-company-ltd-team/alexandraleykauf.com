import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0002-add-category-content-type
 * Created: 2025-11-27 15:41
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */
const migration: MigrationFunction = (migration) => {
  const categoryType = migration.createContentType("category", {
    name: "Category",
    description: "A category for projects",
    displayField: "contentfulDescription",
  });

  categoryType.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  categoryType.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  categoryType.createField("title", {
    name: "Title",
    type: "Symbol",
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  categoryType.changeFieldControl("title", "builtin", "singleLine", {
    helpText: "The title of the category",
  });

  categoryType
    .createField("slug")
    .name("Slug")
    .type("Symbol")
    .required(true)
    .validations([
      {
        unique: true,
      },
    ])
    .localized(false)
    .disabled(false);

  categoryType.changeFieldControl("slug", "builtin", "slugEditor", {
    helpText: "The slug of the category. This is used to generate the URL of the category.",
    trackingFieldId: "title",
  });

  categoryType.createField("showOnStartPage", {
    name: "Show On Start Page",
    type: "Boolean",
    defaultValue: { "en-US": false },
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  categoryType.changeFieldControl("showOnStartPage", "builtin", "boolean", {
    helpText: "Whether to show the category on the start page",
    trueLabel: "Yes",
    falseLabel: "No",
  });

  categoryType.createField("color", {
    name: "Color",
    type: "Symbol",
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  categoryType.changeFieldControl("color", "builtin", "singleLine", {
    helpText: "The color of the category. Use the format #RRGGBB or rgb(255,255,255).",
  });
};

export default migration;
