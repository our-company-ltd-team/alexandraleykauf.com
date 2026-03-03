"use server";
/**
 * Server-side data fetching for projects.
 * Use these functions in Server Components.
 */

import { cache } from "react";

import type { GetSitemapDataQuery, GetSitemapDataQueryVariables } from "@/lib/graphql/generated/graphql";

import { env } from "@/env";
import { REVALIDATION_TIME } from "@/lib/constants";
import { execute } from "@/lib/graphql/client";

import { getProjectMetadata, getProjectPanelBySlug, getSitemapQuery as getSitemapDataQuery } from "./queries";
import { transformPanelBySlug, transformProjectMetadata } from "./transformers";

/**
 * Fetches project metadata by slug for SEO purposes.
 * Uses ISR with 1 hour revalidation by default.
 */
export const getProjectMetadataData = cache(async (slug: string) => {
  const isPreview = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW;

  const response = await execute({
    query: getProjectMetadata,
    variables: { preview: isPreview, slug },
    options: { revalidate: REVALIDATION_TIME, tags: [`project-${slug}`] },
  });

  return transformProjectMetadata(response);
});

export const getProjectPanelBySlugData = cache(async (slug: string) => {
  const isPreview = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW;

  const response = await execute({
    query: getProjectPanelBySlug,
    variables: { preview: isPreview, slug },
    options: {
      revalidate: REVALIDATION_TIME,
      tags: ["projects", "panels", `panel-${slug}`],
    },
  });

  return transformPanelBySlug(response);
});

/**
 * Fetches all projects with panels for sitemap generation.
 * Handles pagination automatically if there are more than 100 projects.
 */
export async function getSitemapData() {
  const isPreview = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW;
  const allProjects: NonNullable<GetSitemapDataQuery["projectCollection"]>["items"] = [];

  /**
   * Contentful GraphQL query complexity is additive across levels:
   * cost = P + (P*R) + (P*R*N) + (P*R*N*C)
   * where:
   * - P = projects per request
   * - R = projectRowsCollection(limit)
   * - N = rowCollection(limit)
   * - C = max(limit) of any nested panel collection fetched (e.g. imagesCollection/videosCollection)
   *
   * For 1 project: costPerProject = 1 + R + (R*N) + (R*N*C)
   *
   * Keep these in sync with `getSitemapQuery` in `queries.ts`.
   */
  const PROJECT_ROWS_LIMIT = 15;
  const PANELS_LIMIT = 15;
  // IMPORTANT: even if we only query `total`, Contentful complexity is based on the maximum
  // number of entities the query can return. Avoid `limit: 0` for nested collections here.
  const PANEL_NESTED_COLLECTION_LIMIT = 1;
  const perProjectPanels = PROJECT_ROWS_LIMIT * PANELS_LIMIT;
  const costPerProject
    = 1
      + PROJECT_ROWS_LIMIT
      + perProjectPanels
      + (perProjectPanels * PANEL_NESTED_COLLECTION_LIMIT);
  const maxProjectsPerRequest = Math.max(1, Math.min(100, Math.floor(11000 / costPerProject)));

  let skip = 0;
  const limit = maxProjectsPerRequest;
  let hasMore = true;

  while (hasMore) {
    const response = await execute<GetSitemapDataQuery, GetSitemapDataQueryVariables>({
      query: getSitemapDataQuery,
      variables: { preview: isPreview, skip, limit },
      options: { revalidate: REVALIDATION_TIME, tags: ["projects", "panels", "sitemap"] },
    });

    const projects = response.projectCollection?.items ?? [];
    allProjects.push(...projects);

    const total = response.projectCollection?.total ?? 0;
    hasMore = skip + limit < total;
    skip += limit;
  }

  return allProjects;
}
