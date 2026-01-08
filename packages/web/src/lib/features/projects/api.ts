/**
 * Server-side data fetching for projects.
 * Use these functions in Server Components.
 */

import { env } from "@/env";
import { execute } from "@/lib/graphql/client";

import { getProjectMetadata, getProjectPanelBySlug } from "./queries";
import { transformPanelBySlug, transformProjectMetadata } from "./transformers";

/**
 * Fetches project metadata by slug for SEO purposes.
 * Uses ISR with 1 hour revalidation by default.
 */
export async function getProjectMetadataData(slug: string) {
  const isPreview = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW;

  const response = await execute({
    query: getProjectMetadata,
    variables: { preview: isPreview, slug },
    options: { revalidate: 3600, tags: [`project-metadata-${slug}`] },
  });

  return transformProjectMetadata(response);
}

export async function getProjectPanelBySlugData(slug: string) {
  const isPreview = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW;

  const response = await execute({
    query: getProjectPanelBySlug,
    variables: { preview: isPreview, slug },
    options: { revalidate: 3600, tags: [`panel-${slug}`] },
  });

  return transformPanelBySlug(response);
}
