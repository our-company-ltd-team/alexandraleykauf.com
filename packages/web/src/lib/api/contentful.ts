/**
 * Contentful API functions for server-side data fetching.
 * These functions use Next.js fetch with caching for optimal performance.
 */

import type {
  HomePageDataQueryResponse,
  ProjectDetailGraphQL,
  ProjectRowGraphQL,
} from "@/lib/graphql/types";

import { serverGraphQLFetch } from "@/lib/graphql/client";
import { GET_PROJECT_PANELS } from "@/lib/graphql/queries/panels";
import { GET_HOME_PAGE_DATA, GET_PROJECT_BY_SLUG } from "@/lib/graphql/queries/projects";

/**
 * Fetches all data needed for the home page.
 * Uses ISR with 1 hour revalidation by default.
 */
export async function getHomePageData(): Promise<HomePageDataQueryResponse> {
  return serverGraphQLFetch<HomePageDataQueryResponse>(GET_HOME_PAGE_DATA, undefined, {
    revalidate: 3600,
    tags: ["contentful", "home"],
  });
}

/**
 * Fetches a project by slug with all its panel data.
 * Uses ISR with 1 hour revalidation by default.
 */
export async function getProjectBySlug(
  slug: string,
): Promise<ProjectDetailGraphQL | null> {
  const response = await serverGraphQLFetch<{
    projectCollection: { items: ProjectDetailGraphQL[] };
  }>(GET_PROJECT_BY_SLUG, { slug }, {
    revalidate: 3600,
    tags: ["contentful", `project-${slug}`],
  });

  return response.projectCollection.items[0] ?? null;
}

/**
 * Fetches project panels by slug.
 * This is used for prefetching panel data on hover.
 */
export async function getProjectPanels(
  slug: string,
): Promise<ProjectRowGraphQL[]> {
  const response = await serverGraphQLFetch<{
    projectCollection: {
      items: Array<{
        projectRowsCollection: { items: ProjectRowGraphQL[] } | null;
      }>;
    };
  }>(GET_PROJECT_PANELS, { slug }, {
    revalidate: 3600,
    tags: ["contentful", `panels-${slug}`],
  });

  const project = response.projectCollection.items[0];
  return project?.projectRowsCollection?.items ?? [];
}
