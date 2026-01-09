/**
 * Transformers for the home page feature.
 *
 * Converts GraphQL query results to domain types.
 */

import type { GetHomepageQueryQuery, Link, Project, Separator } from "@/lib/graphql/generated/graphql";

import { isNotNull } from "@/lib/graphql";

import type { HomepageContentItem, HomepageData, HomepageLink, HomepageProject, HomepageSeparator } from "./types";

/**
 * Transforms a GraphQL Project item to a HomepageProject domain type.
 * Returns null if required fields are missing.
 */
export function transformProjectEntry(item: Project): HomepageProject | null {
  if (!item.slug || !item.title || !item.sys.id) {
    return null;
  }

  return {
    type: "Project",
    id: item.sys.id,
    title: item.title,
    slug: item.slug,
    year: item.year ? new Date(item.year).toISOString().split("T")[0] : undefined,
    place: item.place ?? undefined,
    categorySlug: item.category?.slug ?? "",
    categoryColor: item.category?.color ?? undefined,
    hasRows: (item.projectRowsCollection?.total ?? 0) > 0,
  };
}

/**
 * Transforms a GraphQL Link item to a HomepageLink domain type.
 * Returns null if required fields are missing.
 */
export function transformLinkEntry(item: Link): HomepageLink | null {
  if (!item.title || !item.sys.id) {
    return null;
  }

  return {
    type: "Link",
    id: item.sys.id,
    title: item.title,
    emailLink: item.emailLink ?? undefined,
    externalLink: item.externalLink ?? undefined,
    pdfUrl: item.pdfLink?.url ?? undefined,
    categorySlug: item.category?.slug ?? "",
    categoryColor: item.category?.color ?? undefined,
    place: item.place ?? undefined,
  };
}

/**
 * Transforms a GraphQL Separator item to a HomepageSeparator domain type.
 */
export function transformSeparatorEntry(item: Separator): HomepageSeparator {
  return {
    type: "Separator",
    id: item.sys.id,
    categorySlug: item.category?.slug ?? "",
  };
}

/**
 * Transforms the complete GraphQL homepage query result to HomepageData domain type.
 * Returns null if no homepage data is found.
 */
export function transformHomepage(data: GetHomepageQueryQuery): HomepageData | null {
  const homepage = data.homepageCollection?.items?.[0];
  if (!homepage) {
    return null;
  }

  const contentItems = (homepage.contentCollection?.items ?? [])
    .filter(isNotNull)
    .map((item): HomepageContentItem | null => {
      switch (item.__typename) {
        case "Project":
          return transformProjectEntry(item as Project);
        case "Link":
          return transformLinkEntry(item as Link);
        case "Separator":
          return transformSeparatorEntry(item as Separator);
        default:
          return null;
      }
    })
    .filter(isNotNull);

  return {
    seoTitle: homepage.seoTitle ?? undefined,
    seoDescription: homepage.seoDescription ?? undefined,
    seoImageUrl: homepage.seoImage?.url ?? undefined,
    contentItems,
  };
}
