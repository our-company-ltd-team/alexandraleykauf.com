import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0007-add-videos-panel
 * Created: 2025-12-02 16:24
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  //////////////////////////////////////////////////////////////////////////////
  // Create the video content type
  //////////////////////////////////////////////////////////////////////////////

  const videoType = migration.createContentType("video", {
    name: "Video",
    description: "A video is an entry that to be added to a videos panel.",
    displayField: "contentfulDescription",
  });

  videoType.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  videoType.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  videoType.createField("title", {
    name: "Title",
    type: "Text",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  videoType.changeFieldControl("title", "builtin", "multipleLine", {
    helpText: "The title of the video.",
  });

  videoType.createField("previewImage", {
    name: "Preview Image",
    type: "Link",
    linkType: "Asset",
    validations: [{ linkMimetypeGroup: ["image"] }],
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  videoType.changeFieldControl("previewImage", "builtin", "assetLinkEditor", {
    helpText: "The preview image to display in the videos panel.",
  });

  videoType.createField("altText", {
    name: "Alt Text",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  videoType.changeFieldControl("altText", "builtin", "singleLine", {
    helpText: "The alt text of the preview image. Used for accessibility.",
  });

  videoType.createField("video", {
    name: "Video",
    type: "Link",
    linkType: "Asset",
    validations: [{ linkMimetypeGroup: ["video"], message: "Only videos are allowed." }],
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  videoType.changeFieldControl("video", "builtin", "assetLinkEditor", {
    helpText: "The video to display in the videos panel.",
  });

  videoType.createField("videoUrl", {
    name: "Video URL",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  videoType.changeFieldControl("videoUrl", "builtin", "urlEditor", {
    helpText: "The URL of the video. Supported urls are YouTube and Vimeo.",
  });

  videoType.createField("description", {
    name: "Description",
    type: "Text",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  videoType.changeFieldControl("description", "builtin", "multipleLine", {
    helpText: "The description of the video. Appears at the bottom of the page, after the title.",
  });

  videoType.createField("autoStart", {
    name: "Auto Start",
    type: "Boolean",
    defaultValue: { "en-US": false },
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  videoType.changeFieldControl("autoStart", "builtin", "boolean", {
    helpText: "Whether the video should start automatically.",
  });

  //////////////////////////////////////////////////////////////////////////////
  // Create the videos panel content type
  //////////////////////////////////////////////////////////////////////////////
  const videosPanelType = migration.createContentType("videosPanel", {
    name: "Videos Panel",
    description: "A videos panel is an entry that displays a list of videos.",
    displayField: "contentfulDescription",
  });

  videosPanelType.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  videosPanelType.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  videosPanelType.createField("title", {
    name: "Title",
    type: "Symbol",
    required: true,
    validations: [{ unique: true }],
    localized: false,
    omitted: false,
    disabled: false,
  });

  videosPanelType.changeFieldControl("title", "builtin", "singleLine", {
    helpText: "The title of the videos panel.",
  });

  videosPanelType.createField("slug", {
    name: "Slug",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  videosPanelType.changeFieldControl("slug", "builtin", "slugEditor", {
    helpText: "The slug of the videos panel. This is used to generate the URL of the videos panel.",
    trackingFieldId: "title",
  });

  videosPanelType.createField("oldSlug", {
    name: "Old Slug",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: true,
  });

  videosPanelType.changeFieldControl("oldSlug", "builtin", "slugEditor", {
    helpText: "The old slug of the videos panel. This is used to generate the URL of the videos panel.",
  });

  videosPanelType.createField("videos", {
    name: "Videos",
    type: "Array",
    items: {
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["video"] }],
    },
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  videosPanelType.changeFieldControl("videos", "builtin", "entryCardsEditor", {
    helpText: "The videos to display in the videos panel.",
  });
};

export default migration;
