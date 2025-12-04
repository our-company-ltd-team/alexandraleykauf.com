"use client";

/**
 * Client-side hooks for project data.
 * Use these hooks in Client Components.
 */

import { useQuery, useQueryClient } from "@tanstack/react-query";

import { clientExecute } from "@/lib/graphql/client";

import { GetProjectPanelsDocument } from "./queries";

/**
 * Query key factory for projects.
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
 * Fetches project panels by slug.
 * Used internally by useProjectPanels and usePrefetchProjectPanels.
 */
async function fetchProjectPanels(slug: string) {
  const response = await clientExecute({
    query: GetProjectPanelsDocument,
    variables: { slug },
  });
  const project = response.projectCollection?.items[0];
  return project?.projectRowsCollection?.items ?? [];
}

/**
 * Hook to fetch project panels by slug.
 *
 * @param slug - The project slug
 * @param options - Query options
 * @param options.enabled - Whether the query should run (default: true)
 */
export function useProjectPanels(slug: string, options?: { enabled?: boolean }) {
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
