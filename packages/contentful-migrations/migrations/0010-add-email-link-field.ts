import type { MigrationFunction } from "contentful-migration";

/**
 * Migration: 0010-add-email-link-field
 * Created: 2025-12-02
 *
 * Adds an emailLink field to the link content type to support mailto: addresses.
 *
 * Note: Migrations are forward-only. Rollbacks are not supported.
 */

const migration: MigrationFunction = (migration) => {
  const linkType = migration.editContentType("link");

  linkType.createField("emailLink", {
    name: "Email Link",
    type: "Symbol",
    validations: [
      {
        regexp: {
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
          flags: "i",
        },
        message: "Please enter a valid email address.",
      },
    ],
    required: false,
    localized: false,
    omitted: false,
    disabled: false,
  });

  linkType.changeFieldControl("emailLink", "builtin", "singleLine", {
    helpText: "The email address to link to (will be used as mailto: link).",
  });

  // Move the new field after externalLink for logical grouping
  linkType.moveField("emailLink").afterField("externalLink");
};

export default migration;
