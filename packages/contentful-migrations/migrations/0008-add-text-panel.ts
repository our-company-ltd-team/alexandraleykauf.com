import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0008-add-text-panel
 * Created: 2025-12-02 23:08
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  const textPanelType = migration.createContentType("textPanel", {
    name: "Text Panel",
    description: "A text panel is an entry that displays a text.",
    displayField: "contentfulDescription",
  });

  textPanelType.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  textPanelType.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  textPanelType.createField("text", {
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

  textPanelType.changeFieldControl("text", "builtin", "richTextEditor", {
    helpText: "The text to display in the text panel.",
  });
};

export default migration;
