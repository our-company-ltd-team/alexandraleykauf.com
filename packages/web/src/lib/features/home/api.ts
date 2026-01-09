/**
 * Server-side data fetching for the home page.
 * Use these functions in Server Components.
 */

import { env } from "@/env";
import { REVALIDATION_TIME } from "@/lib/constants";
import { execute } from "@/lib/graphql/client";

import { getHomepageQuery } from "./queries";
import { transformHomepage } from "./transformers";

/**
 * Fetches all data needed for the home page.
 * Uses ISR with 1 hour revalidation by default.
 */
export async function getHomePageData() {
  const data = await execute({
    query: getHomepageQuery,
    variables: { preview: env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW, limit: 1 },
    options: { revalidate: REVALIDATION_TIME, tags: ["projects", "home"] },
  });

  return transformHomepage(data);
}
