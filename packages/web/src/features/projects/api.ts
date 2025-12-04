/**
 * Server-side data fetching for projects.
 * Use these functions in Server Components.
 */

import { execute } from "@/lib/graphql/client";

import { GetProjectBySlugDocument, GetProjectPanelsDocument } from "./queries";

/**
 * Fetches a project by slug with all its panel data.
 * Uses ISR with 1 hour revalidation by default.
 */
export async function getProjectBySlug(slug: string) {
  const response = await execute(
    GetProjectBySlugDocument,
    { revalidate: 3600, tags: ["contentful", `project-${slug}`] },
    { slug },
  );

  return response.projectCollection?.items[0] ?? null;
}

/**
 * Fetches project panels by slug.
 * This is used for prefetching panel data on hover.
 */
export async function getProjectPanels(slug: string) {
  const response = await execute(
    GetProjectPanelsDocument,
    { revalidate: 3600, tags: ["contentful", `panels-${slug}`] },
    { slug },
  );

  const project = response.projectCollection?.items[0];
  return project?.projectRowsCollection?.items ?? [];
}
