import { env } from "@/env";

import type { TypedDocumentString } from "./generated/graphql";

const CONTENTFUL_GRAPHQL_ENDPOINT = `https://graphql.contentful.com/content/v1/spaces/${env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID}/environments/${env.NEXT_PUBLIC_CONTENTFUL_ENVIRONMENT}`;

type ExecuteArgs<TResult, TVariables> = {
  query: TypedDocumentString<TResult, TVariables>;
  variables?: TVariables extends Record<string, never> ? undefined : TVariables;
  options?: {
    revalidate?: number | false;
    tags?: string[];
  };
};

/**
 * Type-safe server-side GraphQL execute function.
 * Uses Next.js fetch with caching for ISR benefits.
 */
export async function execute<TResult, TVariables>({ query, variables, options }: ExecuteArgs<TResult, TVariables>): Promise<TResult> {
  const isPreview = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW;
  const token = isPreview
    ? env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN
    : env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN;

  const response = await fetch(CONTENTFUL_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: query.toString(),
      variables,
    }),
    ...(isPreview
      ? { cache: "no-store" }
      : {
          next: {
            revalidate: options?.revalidate ?? 3600,
            tags: options?.tags,
          },
        }
    ),
  });

  if (!response.ok) {
    console.error(response.statusText);
    console.error(await response.text());
    throw new Error(`GraphQL request failed: ${response.statusText}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  return json.data;
}

type ClientExecuteArgs<TResult, TVariables> = {
  query: TypedDocumentString<TResult, TVariables>;
  variables?: TVariables extends Record<string, never> ? undefined : TVariables;
};
/**
 * Type-safe client-side GraphQL execute function.
 * Used by React Query hooks.
 */
export async function clientExecute<TResult, TVariables>({ query, variables }: ClientExecuteArgs<TResult, TVariables>): Promise<TResult> {
  const token
    = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW
      ? env.NEXT_PUBLIC_CONTENTFUL_PREVIEW_TOKEN
      : env.NEXT_PUBLIC_CONTENTFUL_DELIVERY_TOKEN;

  const response = await fetch(CONTENTFUL_GRAPHQL_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
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
