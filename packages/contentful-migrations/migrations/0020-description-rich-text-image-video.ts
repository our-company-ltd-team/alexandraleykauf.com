import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0020-description-rich-text-image-video
 *
 * Changes the description field on Image and Video content types from plain Text
 * to RichText (italic-only). Migrates existing content and renames the new field.
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

function createRichTextDocumentFromPlainText(plainText: string | undefined): {
  nodeType: "document";
  data: Record<string, never>;
  content: Array<{
    nodeType: "paragraph";
    data: Record<string, never>;
    content: Array<{
      nodeType: "text";
      value: string;
      data: Record<string, never>;
      marks: never[];
    }>;
  }>;
} {
  return {
    nodeType: "document",
    data: {},
    content: [{
      nodeType: "paragraph",
      data: {},
      content: [{
        nodeType: "text",
        value: plainText ?? "",
        data: {},
        marks: [],
      }],
    }],
  };
}

const migration: MigrationFunction = (migration) => {
  //////////////////////////////////////////////////////////////////////////////
  // Image content type
  //////////////////////////////////////////////////////////////////////////////

  const imageType = migration.editContentType("image");

  imageType.createField("descriptionRichText", {
    name: "Description (Rich Text)",
    type: "RichText",
    validations: [{
      enabledMarks: ["italic"],
      message: "Only italic is allowed",
    }, {
      enabledNodeTypes: [],
    }, {
      nodes: {},
    }],
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  imageType.changeFieldControl("descriptionRichText", "builtin", "richTextEditor", {
    helpText: "The description of the image. Appears at the bottom of the page, after the title. Italic formatting is supported.",
  });

  migration.transformEntries({
    contentType: "image",
    from: ["description"],
    to: ["descriptionRichText"],
    transformEntryForLocale: (fromFields, currentLocale) => {
      const plainText = fromFields.description?.[currentLocale] as string | undefined;
      return {
        descriptionRichText: createRichTextDocumentFromPlainText(plainText),
      };
    },
  });

  imageType.deleteField("description");
  imageType.changeFieldId("descriptionRichText", "description");

  //////////////////////////////////////////////////////////////////////////////
  // Video content type
  //////////////////////////////////////////////////////////////////////////////

  const videoType = migration.editContentType("video");

  videoType.createField("descriptionRichText", {
    name: "Description (Rich Text)",
    type: "RichText",
    validations: [{
      enabledMarks: ["italic"],
      message: "Only italic is allowed",
    }, {
      enabledNodeTypes: [],
    }, {
      nodes: {},
    }],
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  videoType.changeFieldControl("descriptionRichText", "builtin", "richTextEditor", {
    helpText: "The description of the video. Appears at the bottom of the page, after the title. Italic formatting is supported.",
  });

  migration.transformEntries({
    contentType: "video",
    from: ["description"],
    to: ["descriptionRichText"],
    transformEntryForLocale: (fromFields, currentLocale) => {
      const plainText = fromFields.description?.[currentLocale] as string | undefined;
      return {
        descriptionRichText: createRichTextDocumentFromPlainText(plainText),
      };
    },
  });

  videoType.deleteField("description");
  videoType.changeFieldId("descriptionRichText", "description");
};

export default migration;
