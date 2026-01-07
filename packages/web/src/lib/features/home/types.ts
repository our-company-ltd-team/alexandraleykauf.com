/**
 * Domain types for the home page feature.
 *
 * These types are decoupled from GraphQL and represent the domain model
 * used throughout the application. Transformers convert GraphQL types
 * to these domain types.
 */

import type { Link, Project, Separator } from "@/lib/graphql/generated/graphql";

/**
 * A project item on the homepage.
 */
export type HomepageProject = {
  type: Project["__typename"];
  id: string;
  title: string;
  slug: string;
  year: string | undefined;
  place: string | undefined;
  categorySlug: string;
  categoryColor: string | undefined;
  hasRows: boolean;
};

/**
 * A link item on the homepage.
 */
export type HomepageLink = {
  type: Link["__typename"];
  id: string;
  title: string;
  emailLink: string | undefined;
  externalLink: string | undefined;
  pdfUrl: string | undefined;
  categorySlug: string;
};

/**
 * A separator item on the homepage.
 */
export type HomepageSeparator = {
  type: Separator["__typename"];
  id: string;
  categorySlug: string;
};

/**
 * A content item on the homepage (discriminated union).
 */
export type HomepageContentItem = HomepageProject | HomepageLink | HomepageSeparator;

/**
 * Complete homepage data including SEO and content items.
 */
export type HomepageData = {
  seoTitle: string | undefined;
  seoDescription: string | undefined;
  seoImageUrl: string | undefined;
  contentItems: HomepageContentItem[];
};
