/**
 * Server-side data fetching for the header.
 * Use these functions in Server Components.
 */

import { env } from "@/env";
import { execute } from "@/lib/graphql/client";

import { getHeader } from "./queries";
import { transformHeader } from "./transformers";

/**
 * Fetches all data needed for the Header.
 * Uses ISR with 1 hour revalidation by default.
 */
export async function getHeaderData() {
  const data = await execute({
    query: getHeader,
    variables: { preview: env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW },
    options: { revalidate: 3600, tags: ["header"] },
  });

  return transformHeader(data);
}
