"use client";

import { useQuery } from "@tanstack/react-query";

import type { HomePageDataQueryResponse } from "@/lib/graphql/types";

import { clientGraphQLFetch } from "@/lib/graphql/client";
import { GET_HOME_PAGE_DATA } from "@/lib/graphql/queries/projects";

/**
 * Query key factory for projects.
 * Helps with cache invalidation and prefetching.
 */
export const projectKeys = {
  all: ["projects"] as const,
  lists: () => [...projectKeys.all, "list"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...projectKeys.lists(), filters] as const,
  details: () => [...projectKeys.all, "detail"] as const,
  detail: (slug: string) => [...projectKeys.details(), slug] as const,
  panels: (slug: string) => [...projectKeys.all, "panels", slug] as const,
};

/**
 * Hook to fetch home page data (projects, links, separators, categories).
 *
 * For server components, use getHomePageData() from @/lib/api/contentful instead.
 * This hook is for client-side fetching and interactivity.
 */
export function useHomePageData() {
  return useQuery({
    queryKey: projectKeys.lists(),
    queryFn: async () => {
      return clientGraphQLFetch<HomePageDataQueryResponse>(GET_HOME_PAGE_DATA);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
