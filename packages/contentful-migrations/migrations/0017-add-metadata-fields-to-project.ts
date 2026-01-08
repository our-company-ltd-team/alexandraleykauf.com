import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0017-add-metadata-fields-to-project
 * Created: 2026-01-08 11:13
 *
 * Adds SEO fields to the project content type.
 * Also adds the SEO images to the general config content type.
 *
 */

const migration: MigrationFunction = (migration) => {
  const projectType = migration.editContentType("project");

  // Add SEO fields to the project content type
  projectType.createField("seoTitle", {
    name: "SEO Title",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectType.changeFieldControl("seoTitle", "builtin", "singleLine", {
    helpText: "The SEO title of the project.",
  });

  projectType.createField("seoDescription", {
    name: "SEO Description",
    type: "Text",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectType.changeFieldControl("seoDescription", "builtin", "multipleLine", {
    helpText: "The SEO description of the project.",
  });

  projectType.createField("seoImages", {
    name: "SEO Image",
    type: "Array",
    items: {
      type: "Link",
      linkType: "Asset",
      validations: [{ linkMimetypeGroup: ["image"] }],
    },
    validations: [{ size: { min: 1, max: 3 } }],
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectType.changeFieldControl("seoImages", "builtin", "assetLinksEditor", {
    helpText: "The SEO images of the project.",
  });

  // Edit general config content type to allow multiple seo images
  const generalConfigType = migration.editContentType("generalConfig");

  generalConfigType.deleteField("seoImage");

  generalConfigType.createField("seoImages", {
    name: "SEO Images",
    type: "Array",
    items: {
      type: "Link",
      linkType: "Asset",
      validations: [{ linkMimetypeGroup: ["image"] }],
    },
    validations: [{ size: { min: 1, max: 3 } }],
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  generalConfigType.changeFieldControl("seoImages", "builtin", "assetLinksEditor", {
    helpText: "The SEO images of the project.",
  });

  generalConfigType.moveField("seoImages").beforeField("googleAnalyticsCode");
};

export default migration;
