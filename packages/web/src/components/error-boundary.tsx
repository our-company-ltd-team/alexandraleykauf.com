"use client";

import type { ErrorInfo, ReactNode } from "react";

import { Component } from "react";

type ErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode | ((error: Error, reset: () => void) => ReactNode);
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
};

type ErrorBoundaryState = {
  hasError: boolean;
  error: Error | null;
};

/**
 * Client-side error boundary component.
 *
 * Catches JavaScript errors in child component tree and displays a fallback UI.
 *
 * @example
 * ```tsx
 * <ErrorBoundary
 *   fallback={(error, reset) => (
 *     <div>
 *       <p>Something went wrong: {error.message}</p>
 *       <button onClick={reset}>Try again</button>
 *     </div>
 *   )}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.props.onError?.(error, errorInfo);
  }

  reset = (): void => {
    this.setState({ hasError: false, error: null });
  };

  render(): ReactNode {
    if (this.state.hasError && this.state.error) {
      const { fallback } = this.props;

      if (typeof fallback === "function") {
        return fallback(this.state.error, this.reset);
      }

      if (fallback) {
        return fallback;
      }

      // Default fallback UI
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
            Something went wrong
          </h2>
          <p style={{ margin: "0 0 1rem 0", fontSize: "0.875rem" }}>
            {this.state.error.message}
          </p>
          <button
            type="button"
            onClick={this.reset}
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
    }

    return this.props.children;
  }
}
