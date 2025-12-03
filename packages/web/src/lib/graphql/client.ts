import { GraphQLClient } from "graphql-request";

import { env } from "@/env";

const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}`;

/**
 * Creates a GraphQL client for Contentful.
 * Used for client-side queries via React Query.
 */
export function createGraphQLClient(): GraphQLClient {
  return new GraphQLClient(CONTENTFUL_GRAPHQL_ENDPOINT, {
    headers: {
      Authorization: `Bearer ${env.CONTENTFUL_DELIVERY_TOKEN}`,
    },
  });
}

/**
 * Server-side GraphQL fetch function with Next.js caching.
 * Use this in Server Components for ISR and caching benefits.
 */
export async function serverGraphQLFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
  options?: {
    revalidate?: number | false;
    tags?: string[];
  },
): Promise<T> {
  const response = await fetch(CONTENTFUL_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${env.CONTENTFUL_DELIVERY_TOKEN}`,
    },
    body: JSON.stringify({ query, variables }),
    next: {
      revalidate: options?.revalidate ?? 3600, // Default 1 hour ISR
      tags: options?.tags ?? ["contentful"],
    },
  });

  if (!response.ok) {
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

/**
 * Client-side GraphQL fetch function.
 * Used by React Query hooks for client-side data fetching.
 */
export async function clientGraphQLFetch<T>(
  query: string,
  variables?: Record<string, unknown>,
): Promise<T> {
  const client = createGraphQLClient();
  return client.request<T>(query, variables);
}
