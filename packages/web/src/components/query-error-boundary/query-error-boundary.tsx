"use client";

import type { ReactNode } from "react";

import { QueryErrorResetBoundary } from "@tanstack/react-query";

import { ErrorBoundary } from "../error-boundary";

type QueryErrorBoundaryProps = {
  children: ReactNode;
  fallback?: (error: Error, reset: () => void) => ReactNode;
};

/**
 * Error boundary specifically for React Query errors.
 *
 * Wraps QueryErrorResetBoundary from React Query to properly reset
 * queries when the user clicks "Try again".
 *
 * @example
 * ```tsx
 * <QueryErrorBoundary>
 *   <Suspense fallback={<Loading />}>
 *     <MyQueryComponent />
 *   </Suspense>
 * </QueryErrorBoundary>
 * ```
 */
export function QueryErrorBoundary({
  children,
  fallback,
}: QueryErrorBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallback={(error, boundaryReset) => {
            const handleReset = () => {
              reset(); // Reset React Query cache
              boundaryReset(); // Reset error boundary
            };

            if (fallback) {
              return fallback(error, handleReset);
            }

            // Default fallback
            return (
              <div
                role="alert"
                style={{
                  padding: "1rem",
                  border: "1px solid #ef4444",
                  borderRadius: "0.5rem",
                  backgroundColor: "#fef2f2",
                  color: "#991b1b",
                }}
              >
                <h2 style={{ margin: "0 0 0.5rem 0", fontSize: "1.125rem" }}>
                  Failed to load data
                </h2>
                <p style={{ margin: "0 0 1rem 0", fontSize: "0.875rem" }}>
                  {error.message}
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  style={{
                    padding: "0.5rem 1rem",
                    backgroundColor: "#991b1b",
                    color: "white",
                    border: "none",
                    borderRadius: "0.25rem",
                    cursor: "pointer",
                  }}
                >
                  Try again
                </button>
              </div>
            );
          }}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
