import { use } from "react";

import { OpenedProjectsContext } from "@/contexts";

export function useOpenedProjects() {
  const context = use(OpenedProjectsContext);
  if (!context)
    throw new Error("useOpenedProjects must be used within OpenedProjectsProvider");
  return context;
}
