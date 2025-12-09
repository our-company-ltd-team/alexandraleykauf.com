import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0013-add-theme-colors-to-homepage
 * Created: 2025-01-XX
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  const generalConfigType = migration.createContentType("generalConfig", {
    name: "General Config",
    description: "The general config of the website",
    displayField: "contentfulDescription",
  });

  generalConfigType.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  generalConfigType.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  generalConfigType.createField("seoTitle", {
    name: "SEO Title",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  generalConfigType.changeFieldControl("seoTitle", "builtin", "singleLine", {
    helpText: "The SEO title of the website.",
  });

  generalConfigType.createField("seoDescription", {
    name: "SEO Description",
    type: "Text",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  generalConfigType.changeFieldControl("seoDescription", "builtin", "multipleLine", {
    helpText: "The SEO description of the website.",
  });

  generalConfigType.createField("seoImage", {
    name: "SEO Image",
    type: "Link",
    linkType: "Asset",
    validations: [{ linkMimetypeGroup: ["image"] }],
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  generalConfigType.changeFieldControl("seoImage", "builtin", "assetLinkEditor", {
    helpText: "The SEO image of the website.",
  });

  generalConfigType.createField("googleAnalyticsCode", {
    name: "Google Analytics Code",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  generalConfigType.changeFieldControl("googleAnalyticsCode", "builtin", "singleLine", {
    helpText: "The Google Analytics code for the website.",
  });

  generalConfigType.createField("hoverColor", {
    name: "Hover Color",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  generalConfigType.changeFieldControl("hoverColor", "builtin", "singleLine", {
    helpText: "The default hover color for interactive elements.",
  });

  generalConfigType.createField("activeColor", {
    name: "Active Color",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  generalConfigType.changeFieldControl("activeColor", "builtin", "singleLine", {
    helpText: "The default active color for selected elements.",
  });

  generalConfigType.createField("detailsBackgroundColor", {
    name: "Details Background Color",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  generalConfigType.changeFieldControl("detailsBackgroundColor", "builtin", "singleLine", {
    helpText: "The default background color for detail sections.",
  });
};

export default migration;
