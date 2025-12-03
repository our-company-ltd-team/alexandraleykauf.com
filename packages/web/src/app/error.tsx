"use client";

import { useEffect } from "react";

type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Root error boundary for the app.
 *
 * This catches errors in the route segments and renders a fallback UI.
 * Next.js automatically wraps routes with this error boundary.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Route error:", error);
  }, [error]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "50vh",
        padding: "2rem",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
          marginBottom: "1rem",
          color: "#1f2937",
        }}
      >
        Something went wrong
      </h1>
      <p
        style={{
          marginBottom: "1.5rem",
          color: "#6b7280",
          maxWidth: "400px",
        }}
      >
        We encountered an error while loading this page. Please try again.
      </p>
      {error.digest && (
        <p
          style={{
            marginBottom: "1.5rem",
            fontSize: "0.75rem",
            color: "#9ca3af",
          }}
        >
          Error ID:
          {" "}
          {error.digest}
        </p>
      )}
      <button
        type="button"
        onClick={reset}
        style={{
          padding: "0.75rem 1.5rem",
          backgroundColor: "#3b82f6",
          color: "white",
          border: "none",
          borderRadius: "0.375rem",
          cursor: "pointer",
          fontSize: "0.875rem",
          fontWeight: 500,
        }}
      >
        Try again
      </button>
    </div>
  );
}
