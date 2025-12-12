/**
 * Server-side data fetching for projects.
 * Use these functions in Server Components.
 */

import { env } from "@/env";
import { execute } from "@/lib/graphql/client";

import { getProjectPanels as getProjectPanelsQuery } from "./queries";

/**
 * Fetches a project by slug with all its panel data.
 * Uses ISR with 1 hour revalidation by default.
 */
// export async function getProjectBySlug(slug: string) {
//   const response = await execute({
//     query: GetProjectBySlugDocument,
//     variables: { slug },
//     options: { revalidate: 3600, tags: ["contentful", `project-${slug}`] },
//   });

//   return response.projectCollection?.items[0] ?? null;
// }

/**
 * Fetches project panels by slug.
 * This is used for prefetching panel data on hover.
 */
export async function getProjectPanelsData(slug: string) {
  const isPreview = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW;

  const response = await execute({
    query: getProjectPanelsQuery,
    variables: { preview: isPreview, slug },
    options: { revalidate: 3600, tags: ["contentful", `panels-${slug}`] },
  });

  const project = response.projectCollection?.items[0];
  return project?.projectRowsCollection?.items ?? [];
}
