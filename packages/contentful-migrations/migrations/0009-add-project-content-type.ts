import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0009-add-project-content-type
 * Created: 2025-12-02 23:11
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  //////////////////////////////////////////////////////////////////////////////
  // Create the project row content type
  //////////////////////////////////////////////////////////////////////////////
  const projectRowType = migration.createContentType("projectRow", {
    name: "Project Row",
    description: "A project row is organizational entry to gather project panels.",
    displayField: "contentfulDescription",
  });

  projectRowType.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectRowType.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  projectRowType.createField("row", {
    name: "Row",
    type: "Array",
    items: {
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["textPage", "textPanel", "imagesPanel", "videosPanel"] }],
    },
    validations: [{ size: { min: 1 } }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectRowType.changeFieldControl("row", "builtin", "entryLinksEditor", {
    helpText: "The projects to display in the project row.",
  });

  //////////////////////////////////////////////////////////////////////////////
  // Create the project content type
  //////////////////////////////////////////////////////////////////////////////

  const projectType = migration.createContentType("project", {
    name: "Project",
    description: "A project is an entry that represents a project.",
    displayField: "contentfulDescription",
  });

  projectType.createField("contentfulDescription", {
    name: "Contentful Description",
    type: "Symbol",
    validations: [{ unique: true }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectType.changeFieldControl("contentfulDescription", "builtin", "singleLine", {
    helpText: "Description of the entry. Create a unique name to find it easier in the Contentful UI. Does not have any visual effect.",
  });

  projectType.createField("title", {
    name: "Title",
    type: "Symbol",
    required: true,
    validations: [{ unique: true }],
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectType.changeFieldControl("title", "builtin", "singleLine", {
    helpText: "The title of the project.",
  });

  projectType.createField("slug", {
    name: "Slug",
    type: "Symbol",
    required: true,
    validations: [{ unique: true }],
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectType.changeFieldControl("slug", "builtin", "slugEditor", {
    helpText: "The slug of the project. This is used to generate the URL of the project.",
    trackingFieldId: "title",
  });

  projectType.createField("oldSlug", {
    name: "Old Slug",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: true,
  });

  projectType.changeFieldControl("oldSlug", "builtin", "slugEditor", {
    helpText: "The old slug of the project. This is used to generate the URL of the project.",
  });

  projectType.createField("year", {
    name: "Year",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectType.changeFieldControl("year", "builtin", "singleLine", {
    helpText: "The year of the project.",
  });

  projectType.createField("place", {
    name: "Place",
    type: "Symbol",
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectType.changeFieldControl("place", "builtin", "singleLine", {
    helpText: "The place of the project.",
  });

  projectType.createField("category", {
    name: "Category",
    type: "Link",
    linkType: "Entry",
    validations: [{ linkContentType: ["category"] }],
    required: true,
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectType.changeFieldControl("category", "builtin", "entryLinkEditor", {
    helpText: "The category of the project.",
  });

  projectType.createField("projectRows", {
    name: "Project Rows",
    type: "Array",
    items: {
      type: "Link",
      linkType: "Entry",
      validations: [{ linkContentType: ["projectRow"] }],
    },
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  projectType.changeFieldControl("projectRows", "builtin", "entryLinksEditor", {
    helpText: "The project rows to display in the project.",
  });
};

export default migration;
