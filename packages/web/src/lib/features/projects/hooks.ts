"use client";

/**
 * Client-side hooks for project data.
 * Use these hooks in Client Components.
 */

import { useQuery, useQueryClient } from "@tanstack/react-query";

import type { HomeProjectPanels } from "./types";

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
 * Fetches project panels by slug from the Next.js API route.
 * The API route handles server-side caching, reducing direct Contentful calls.
 */
async function fetchHomeProjectPanels(slug: string): Promise<HomeProjectPanels> {
  const response = await fetch(`/api/projects/${slug}/panels`);

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`Project not found: ${slug}`);
    }
    throw new Error(`Failed to fetch project panels: ${response.statusText}`);
  }

  return response.json();
}

/**
 * Hook to fetch project panels by slug.
 *
 * @param slug - The project slug
 * @param options - Query options
 * @param options.enabled - Whether the query should run (default: true)
 */
export function useHomeProjectPanels(slug: string, options?: { enabled?: boolean }) {
  return useQuery({
    queryKey: projectKeys.panels(slug),
    queryFn: () => fetchHomeProjectPanels(slug),
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
export function usePrefetchHomeProjectPanels() {
  const queryClient = useQueryClient();

  return (slug: string) => {
    queryClient.prefetchQuery({
      queryKey: projectKeys.panels(slug),
      queryFn: () => fetchHomeProjectPanels(slug),
      staleTime: 5 * 60 * 1000, // Consider fresh for 5 mins
    });
  };
}
