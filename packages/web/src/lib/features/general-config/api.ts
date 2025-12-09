/**
 * Server-side data fetching for the home page.
 * Use these functions in Server Components.
 */

import { env } from "@/env";
import { execute } from "@/lib/graphql/client";

import { getGeneralConfig } from "./queries";
import { transformGeneralConfig } from "./transformers";

/**
 * Fetches all data needed for the general config.
 * Uses ISR with 1 hour revalidation by default.
 */
export async function getGeneralConfigData() {
  const data = await execute({
    query: getGeneralConfig,
    variables: { preview: env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW, limit: 1 },
    options: { revalidate: 3600, tags: ["general-config"] },
  });

  return transformGeneralConfig(data);
}
