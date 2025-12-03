"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { ProjectRowGraphQL } from "@/lib/graphql/types";

import { clientGraphQLFetch } from "@/lib/graphql/client";
import { GET_PROJECT_PANELS } from "@/lib/graphql/queries/panels";

import { projectKeys } from "./use-projects";

type ProjectPanelsResponse = {
  projectCollection: {
    items: Array<{
      projectRowsCollection: { items: ProjectRowGraphQL[] } | null;
    }>;
  };
};

/**
 * Fetches project panels by slug.
 * Used internally by useProjectPanels and usePrefetchProjectPanels.
 */
async function fetchProjectPanels(slug: string): Promise<ProjectRowGraphQL[]> {
  const response = await clientGraphQLFetch<ProjectPanelsResponse>(
    GET_PROJECT_PANELS,
    { slug },
  );

  const project = response.projectCollection.items[0];
  return project?.projectRowsCollection?.items ?? [];
}

/**
 * Hook to fetch project panels by slug.
 *
 * @param slug - The project slug
 * @param options - Query options
 * @param options.enabled - Whether the query should run (default: true)
 */
export function useProjectPanels(
  slug: string,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: projectKeys.panels(slug),
    queryFn: () => fetchProjectPanels(slug),
    enabled: options?.enabled ?? true,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Hook that returns a prefetch function for project panels.
 * Use this to prefetch panel data on hover before user clicks.
 *
 * @example
 * ```tsx
 * const prefetchPanels = usePrefetchProjectPanels();
 *
 * <li onMouseEnter={() => prefetchPanels(project.slug)}>
 *   {project.title}
 * </li>
 * ```
 */
export function usePrefetchProjectPanels() {
  const queryClient = useQueryClient();

  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: projectKeys.panels(slug),
      queryFn: () => fetchProjectPanels(slug),
      staleTime: 5 * 60 * 1000, // Consider fresh for 5 mins
    });
  };
}
