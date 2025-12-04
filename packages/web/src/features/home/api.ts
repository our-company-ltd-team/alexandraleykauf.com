/**
 * Server-side data fetching for the home page.
 * Use these functions in Server Components.
 */

import { execute } from "@/lib/graphql/client";

import { GetHomePageDataDocument } from "./queries";

/**
 * Fetches all data needed for the home page.
 * Uses ISR with 1 hour revalidation by default.
 */
export async function getHomePageData() {
  return execute(GetHomePageDataDocument, {
    revalidate: 3600,
    tags: ["contentful", "home"],
  });
}
