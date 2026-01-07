import type { Dispatch, SetStateAction } from "react";

import { createContext } from "react";

export type OpenedProjectsContextType = {
  openedProjects: string[];
  setOpenedProjects: Dispatch<SetStateAction<string[]>>;
  activeSlug: string | null; // Currently "active" project (for styling)
  setActiveSlug: Dispatch<SetStateAction<string | null>>;
  toggleProject: (slug: string) => void; // Convenience method
  navigateToNext: () => void;
  navigateToPrevious: () => void;
  visibleProjectSlugs: string[]; // Projects currently visible based on category filter
  setVisibleProjectSlugs: Dispatch<SetStateAction<string[]>>;
};

export const OpenedProjectsContext = createContext<OpenedProjectsContextType | null>(null);
