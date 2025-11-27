import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0004-add-link-content-type
 * Created: 2025-11-27 23:05
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  const linkType = migration.createContentType("link", {
    name: "🔗 Link",
    description: "A link is an entry that allows to create a link for several purposes.",
    displayField: "contentfulDescription",
  });

  linkType.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  linkType.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  linkType.createField("title", {
    name: "Title",
    type: "Symbol",
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  linkType.changeFieldControl("title", "builtin", "singleLine", {
    helpText: "The title used to display the link in the website.",
  });

  linkType.createField("place", {
    name: "Place",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  // linkType.changeFieldControl("title", "builtin", "singleLine", {
  //   helpText: "The title used to display the link in the website.",
  // });

  linkType.createField("category", {
    name: "Category",
    type: "Link",
    linkType: "Entry",
    validations: [{ linkContentType: ["category"] }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  linkType.changeFieldControl("category", "builtin", "entryLinkEditor", {
    helpText: "The category of the link.",
  });

  linkType.createField("externalLink", {
    name: "External Link",
    type: "Symbol",
    validations: [
      {
        regexp: {
          pattern:
            "^(ftp|http|https):\\/\\/(\\w+:{0,1}\\w*@)?(\\S+)(:[0-9]+)?(\\/|\\/([\\w#!:.?+=&%@!\\-/]))?$",
        },
        message: "Please enter a valid external link.",
      },
    ],
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  linkType.changeFieldControl("externalLink", "builtin", "singleLine", {
    helpText: "The external link of the link.",
  });

  linkType.createField("pdfLink", {
    name: "PDF Link",
    type: "Link",
    linkType: "Asset",
    validations: [{ linkMimetypeGroup: ["pdfdocument"] }],
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  linkType.changeFieldControl("pdfLink", "builtin", "assetLinkEditor", {
    helpText: "The PDF to link to.",
  });
};

export default migration;
