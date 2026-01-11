"use client";

import type { ReactNode } from "react";

import {
  isServer,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // 5 minutes - consider data fresh for this duration
        staleTime: 5 * 60 * 1000,
        // 30 minutes - keep data in cache
        gcTime: 30 * 60 * 1000,
        // Retry failed requests up to 2 times
        retry: 2,
        // Don't refetch on window focus for portfolio content
        refetchOnWindowFocus: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) {
    // Server: always make a new query client
    return makeQueryClient();
  }
  // Browser: make a new query client if we don't already have one
  // This is very important so we don't re-make a new client
  // if React suspends during the initial render
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

type QueryProviderProps = {
  children: ReactNode;
};

export function QueryProvider({ children }: QueryProviderProps) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}

      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
