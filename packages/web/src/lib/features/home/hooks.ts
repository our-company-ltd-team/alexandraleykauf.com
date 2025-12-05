"use client";

/**
 * Client-side hooks for home page data.
 * Use these hooks in Client Components.
 */

import { useQuery } from "@tanstack/react-query";

import { env } from "@/env";
import { clientExecute } from "@/lib/graphql/client";

import { getHomepageQuery } from "./queries";

/**
 * Query key factory for home page.
 */
export const homeKeys = {
  all: ["home"] as const,
  data: () => [...homeKeys.all, "data"] as const,
};

/**
 * Hook to fetch home page data (projects, links, separators, categories).
 *
 * For server components, use getHomePageData() from ./api instead.
 * This hook is for client-side fetching and interactivity.
 */
export function useHomePageData() {
  return useQuery({
    queryKey: homeKeys.data(),
    queryFn: () => clientExecute({
      query: getHomepageQuery,
      variables: { preview: env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW, limit: 1 },
    }),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}
