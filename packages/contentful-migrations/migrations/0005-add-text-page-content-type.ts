import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0005-add-text-page-content-type
 * Created: 2025-11-27 23:39
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  const textPageType = migration.createContentType("textPage", {
    name: "🔖 Text Page",
    description: "A text page is an entry that allows to create a text page for a project.",
    displayField: "contentfulDescription",
  });

  textPageType.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  textPageType.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  textPageType.createField("title", {
    name: "Title",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  textPageType.changeFieldControl("title", "builtin", "singleLine", {
    helpText: "The title used to display the text page in the website.",
  });

  textPageType.createField("slug", {
    name: "Slug",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  textPageType.changeFieldControl("slug", "builtin", "slugEditor", {
    helpText: "The slug used to generate the URL of the text page.",
    trackingFieldId: "title",
  });

  textPageType.createField("oldSlug", {
    name: "Old Slug",
    type: "Symbol",
    required: true,
    localized: false,
    omitted: false,
    disabled: true,
  });

  textPageType.changeFieldControl("oldSlug", "builtin", "singleLine", {
    helpText: "The old slug used to generate redirects.",
  });

  textPageType.createField("text", {
    name: "Text",
    type: "RichText",
    validations: [{
      enabledMarks: [
        "bold",
        "italic",
        "underline",
        "superscript",
        "subscript",
      ],
      message:
        "Only bold, italic, underline, superscript, and subscript marks are allowed",
    }, {
      enabledNodeTypes: [
        "heading-1",
        "heading-2",
        "heading-3",
        "heading-4",
        "heading-5",
        "heading-6",
        "ordered-list",
        "unordered-list",
        "hyperlink",
      ],
      message:
        "Only heading 1, heading 2, heading 3, heading 4, heading 5, heading 6, ordered list, unordered list, horizontal rule are allowed",
    }, {
      nodes: {},
    }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  textPageType.changeFieldControl("text", "builtin", "richTextEditor", {
    helpText: "The text for the page.",
  });
};

export default migration;
