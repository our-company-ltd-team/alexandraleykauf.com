import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0011-add-homepage
 * Created: 2025-12-04 13:22
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  const homepageType = migration.createContentType("homepage", {
    name: "Homepage",
    description: "The homepage of the website",
    displayField: "contentfulDescription",
  });

  homepageType.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  homepageType.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  homepageType.createField("content", {
    name: "Content",
    type: "Array",
    items: {
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["project", "link", "separator"] }],
    },
    validations: [{ size: { min: 1 } }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  homepageType.changeFieldControl("content", "builtin", "entryLinksEditor", {
    helpText: "The content of the homepage.",
  });

  homepageType.createField("seoTitle", {
    name: "SEO Title",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  homepageType.changeFieldControl("seoTitle", "builtin", "singleLine", {
    helpText: "The SEO title of the homepage.",
  });

  homepageType.createField("seoDescription", {
    name: "SEO Description",
    type: "Text",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  homepageType.changeFieldControl("seoDescription", "builtin", "multipleLine", {
    helpText: "The SEO description of the homepage.",
  });

  homepageType.createField("seoImage", {
    name: "SEO Image",
    type: "Link",
    linkType: "Asset",
    validations: [{ linkMimetypeGroup: ["image"] }],
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  homepageType.changeFieldControl("seoImage", "builtin", "assetLinkEditor", {
    helpText: "The SEO image of the homepage.",
  });
};

export default migration;
