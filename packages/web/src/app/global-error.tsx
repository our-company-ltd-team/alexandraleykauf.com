"use client";

import { useEffect } from "react";

type GlobalErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Global error boundary for the entire app.
 *
 * This catches errors in the root layout and renders a complete HTML page.
 * It's the last line of defense for uncaught errors.
 */
export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
            padding: "2rem",
            textAlign: "center",
            fontFamily:
              "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, sans-serif",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              color: "#1f2937",
            }}
          >
            Application Error
          </h1>
          <p
            style={{
              marginBottom: "1.5rem",
              color: "#6b7280",
              maxWidth: "500px",
            }}
          >
            A critical error occurred. Please refresh the page or try again
            later.
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
              fontSize: "1rem",
              fontWeight: 500,
            }}
          >
            Refresh page
          </button>
        </div>
      </body>
    </html>
  );
}
