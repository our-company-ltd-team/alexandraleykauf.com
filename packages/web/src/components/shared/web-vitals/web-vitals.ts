"use client";

import { useReportWebVitals } from "next/web-vitals";

function logWebVitals(metric: any) {
  // Web vitals logging - using warn instead of log per ESLint rules
  console.warn(metric);
}

export function WebVitals() {
  useReportWebVitals(logWebVitals);

  return null;
}
