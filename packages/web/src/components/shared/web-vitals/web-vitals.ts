"use client";

import { useReportWebVitals } from "next/web-vitals";

function logWebVitals(metric: any) {
  console.log(metric);
}

export function WebVitals() {
  useReportWebVitals(logWebVitals);

  return null;
}
