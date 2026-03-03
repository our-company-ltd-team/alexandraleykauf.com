import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0019-allow-hr-in-text-page
 * Created: 2026-03-02 22:56
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  const textPageType = migration.editContentType("textPage");

  const textField = textPageType.editField("text");

  textField.validations([{
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
      "ordered-list",
      "unordered-list",
      "hr",
      "hyperlink",
    ],
    message:
      "Only heading 1, heading 2, heading 3, ordered list, unordered list, horizontal rule, and hyperlink are allowed",
  }, {
    nodes: {},
  }]);
};

export default migration;
