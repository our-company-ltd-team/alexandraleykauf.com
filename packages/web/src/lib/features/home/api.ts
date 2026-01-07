/**
 * Server-side data fetching for the home page.
 * Use these functions in Server Components.
 */

import { env } from "@/env";
import { execute } from "@/lib/graphql/client";

import { getHomepageQuery } from "./queries";

/**
 * Fetches all data needed for the home page.
 * Uses ISR with 1 hour revalidation by default.
 */
export async function getHomePageData() {
  const data = await execute({
    query: getHomepageQuery,
    variables: { preview: env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW, limit: 1 },
    options: { revalidate: 3600, tags: ["home"] },
  });

  return data;
}
