import { env } from "@/env";

import type { TypedDocumentString } from "./generated/graphql";

const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${env.CONTENTFUL_SPACE_ID}/environments/${env.CONTENTFUL_ENVIRONMENT}`;

/**
 * Type-safe server-side GraphQL execute function.
 * Uses Next.js fetch with caching for ISR benefits.
 */
export async function execute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  options?: {
    revalidate?: number | false;
    tags?: string[];
  },
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<TResult> {
  const response = await fetch(CONTENTFUL_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${env.CONTENTFUL_DELIVERY_TOKEN}`,
    },
    body: JSON.stringify({
      query: query.toString(),
      variables,
    }),
    next: {
      revalidate: options?.revalidate ?? 3600, // Default 1 hour ISR
      tags: options?.tags,
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
 * Type-safe client-side GraphQL execute function.
 * Used by React Query hooks.
 */
export async function clientExecute<TResult, TVariables>(
  query: TypedDocumentString<TResult, TVariables>,
  ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
): Promise<TResult> {
  const response = await fetch(CONTENTFUL_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${env.CONTENTFUL_DELIVERY_TOKEN}`,
    },
    body: JSON.stringify({
      query: query.toString(),
      variables,
    }),
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
