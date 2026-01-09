/* eslint-disable node/no-process-env */
/**
 * Contentful REST API client helper for scripts.
 * Creates a configured client for Preview or Delivery API.
 */

export type CreateClientOptions = {
  preview?: boolean;
};

export type ContentfulRestClient = {
  getEntries: <T = unknown>(query: Record<string, unknown>) => Promise<{
    items: T[];
    total: number;
  }>;
};

/**
 * Creates a Contentful REST API client.
 * @param options - Configuration options
 * @param options.preview - Use Preview API (default: true)
 * @returns Configured Contentful client
 */
export async function createContentfulRestClient(
  options: CreateClientOptions = {},
): Promise<ContentfulRestClient> {
  const { preview = true } = options;

  const spaceId = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
  const environment = process.env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT;
  const previewToken = process.env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN;
  const deliveryToken = process.env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN;

  if (!spaceId) {
    throw new Error("NEXT_PUBLIC_CONTENTFUL_SPACE_ID is required");
  }
  if (!environment) {
    throw new Error("NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT is required");
  }

  // contentful@11 is ESM-only; this repo uses TS NodeNext and treats this file
  // as CJS (no "type":"module"), so we must load it with dynamic import.
  const { createClient } = await import("contentful");

  if (preview) {
    if (!previewToken) {
      throw new Error("NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN is required for preview mode");
    }
    return createClient({
      space: spaceId,
      environment,
      accessToken: previewToken,
      host: "preview.contentful.com",
    }) as unknown as ContentfulRestClient;
  }

  if (!deliveryToken) {
    throw new Error("NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN is required for delivery mode");
  }
  return createClient({
    space: spaceId,
    environment,
    accessToken: deliveryToken,
    host: "cdn.contentful.com",
  }) as unknown as ContentfulRestClient;
}
