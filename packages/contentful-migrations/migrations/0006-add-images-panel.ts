import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0006-add-images-panel
 * Created: 2025-12-02 15:48
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  //////////////////////////////////////////////////////////////////////////////
  // Create the image content type
  //////////////////////////////////////////////////////////////////////////////

  const imageType = migration.createContentType("image", {
    name: "Image",
    description: "An image is an entry that to be added to an images panel.",
    displayField: "contentfulDescription",
  });

  imageType.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  imageType.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  imageType.createField("title", {
    name: "Title",
    type: "Text",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  imageType.changeFieldControl("title", "builtin", "multipleLine", {
    helpText: "The title of the image.",
  });

  imageType.createField("image", {
    name: "Image",
    type: "Link",
    linkType: "Asset",
    validations: [{ linkMimetypeGroup: ["image"] }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  imageType.changeFieldControl("image", "builtin", "assetLinkEditor", {
    helpText: "The image to display.",
  });

  imageType.createField("description", {
    name: "Description",
    type: "Text",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  imageType.changeFieldControl("description", "builtin", "multipleLine", {
    helpText: "The description of the image. Appears at the bottom of the page, after the title.",
  });

  imageType.createField("altText", {
    name: "Alt Text",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  imageType.changeFieldControl("altText", "builtin", "singleLine", {
    helpText: "The alt text of the image. Used for accessibility.",
  });

  //////////////////////////////////////////////////////////////////////////////
  // Create the images panel content type
  //////////////////////////////////////////////////////////////////////////////

  const imagesPanelType = migration.createContentType("imagesPanel", {
    name: "Images Panel",
    description: "An images panel is an entry that displays a list of images.",
    displayField: "contentfulDescription",
  });

  imagesPanelType.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  imagesPanelType.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  imagesPanelType.createField("title", {
    name: "Title",
    type: "Symbol",
    required: true,
    validations: [{ unique: true }],
    localized: false,
    omitted: false,
    disabled: false,
  });

  imagesPanelType.changeFieldControl("title", "builtin", "singleLine", {
    helpText: "The title of the images panel.",
  });

  imagesPanelType.createField("slug", {
    name: "Slug",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  imagesPanelType.changeFieldControl("slug", "builtin", "slugEditor", {
    helpText: "The slug of the images panel. This is used to generate the URL of the images panel.",
    trackingFieldId: "title",
  });

  imagesPanelType.createField("oldSlug", {
    name: "Old Slug",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: true,
  });
  imagesPanelType.changeFieldControl("oldSlug", "builtin", "slugEditor", {
    helpText: "The old slug of the images panel. This is used to generate the URL of the images panel.",
  });

  imagesPanelType.createField("images", {
    name: "Images",
    type: "Array",
    items: {
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["image"] }],
    },
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  imagesPanelType.changeFieldControl("images", "builtin", "entryCardsEditor", {
    helpText: "The images to display in the images panel.",
  });
};

export default migration;
