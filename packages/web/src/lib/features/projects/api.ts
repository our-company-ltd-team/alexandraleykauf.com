/**
 * Server-side data fetching for projects.
 * Use these functions in Server Components.
 */

import type { GetSitemapDataQuery, GetSitemapDataQueryVariables } from "@/lib/graphql/generated/graphql";

import { env } from "@/env";
import { execute } from "@/lib/graphql/client";

import { getProjectMetadata, getProjectPanelBySlug, getSitemapQuery as getSitemapDataQuery } from "./queries";
import { transformPanelBySlug, transformProjectMetadata } from "./transformers";

/**
 * Fetches project metadata by slug for SEO purposes.
 * Uses ISR with 1 hour revalidation by default.
 */
export async function getProjectMetadataData(slug: string) {
  const isPreview = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW;

  const response = await execute({
    query: getProjectMetadata,
    variables: { preview: isPreview, slug },
    options: { revalidate: 3600, tags: [`project-metadata-${slug}`] },
  });

  return transformProjectMetadata(response);
}

export async function getProjectPanelBySlugData(slug: string) {
  const isPreview = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW;

  const response = await execute({
    query: getProjectPanelBySlug,
    variables: { preview: isPreview, slug },
    options: { revalidate: 3600, tags: [`panel-${slug}`] },
  });

  return transformPanelBySlug(response);
}

/**
 * Fetches all projects with panels for sitemap generation.
 * Handles pagination automatically if there are more than 100 projects.
 */
export async function getSitemapData() {
  const isPreview = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW;
  const allProjects: NonNullable<GetSitemapDataQuery["projectCollection"]>["items"] = [];

  let skip = 0;
  const limit = 100;
  let hasMore = true;

  while (hasMore) {
    const response = await execute<GetSitemapDataQuery, GetSitemapDataQueryVariables>({
      query: getSitemapDataQuery,
      variables: { preview: isPreview, skip, limit },
      options: { revalidate: 3600, tags: ["sitemap"] },
    });

    const projects = response.projectCollection?.items ?? [];
    allProjects.push(...projects);

    const total = response.projectCollection?.total ?? 0;
    hasMore = skip + limit < total;
    skip += limit;
  }

  return allProjects;
}
