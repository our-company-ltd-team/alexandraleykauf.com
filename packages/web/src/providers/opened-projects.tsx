"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { OpenedProjectsContext } from "@/contexts";

type OpenedProjectsProviderProps = {
  children: React.ReactNode;
  initialSlug?: string | null;
};

export function OpenedProjectsProvider({ children, initialSlug = null }: OpenedProjectsProviderProps) {
  // Get initial slug from URL pathname
  // const getSlugFromPath = () => {
  //   if (typeof window === "undefined") {
  //     return null;
  //   }

  //   const path = window.location.pathname;
  //   // Assuming URLs like "/" or "/project-slug"
  //   const slug = path.replace(/^\//, "") || null;
  //   return slug;
  // };

  // const [activeSlug, setActiveSlug] = useState<string | null>(getSlugFromPath);
  // const [openedProjects, setOpenedProjects] = useState<string[]>(() => {
  //   const initial = getSlugFromPath();
  //   return initial ? [initial] : [];
  // });

  // Use the server-provided initial slug (no window access needed for initial state)
  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug);
  const [openedProjects, setOpenedProjects] = useState<string[]>(() =>
    initialSlug ? [initialSlug] : [],
  );

  // Sync URL when activeSlug changes (shallow update, no navigation)
  useEffect(() => {
    const newPath = activeSlug ? `/${activeSlug}` : "/";
    if (window.location.pathname !== newPath) {
      window.history.pushState(null, "", newPath);
    }
  }, [activeSlug]);

  // Handle browser back/forward buttons
  useEffect(() => {
    const getSlugFromPath = () => {
      const path = window.location.pathname;
      const slug = path.replace(/^\//, "") || null;
      return slug;
    };

    const handlePopState = () => {
      const slug = getSlugFromPath();
      setActiveSlug(slug);
      if (slug && !openedProjects.includes(slug)) {
        setOpenedProjects(prev => [...prev, slug]);
      }
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [openedProjects]);

  // Toggle a project: expand/collapse
  const toggleProject = useCallback((slug: string) => {
    setOpenedProjects((prev) => {
      const isOpen = prev.includes(slug);
      if (isOpen) {
        return prev.filter(s => s !== slug);
      }
      else {
        // Expand: add to opened, set as active
        setActiveSlug(slug);
        return [...prev, slug];
      }
    });
  }, []);

  const value = useMemo(
    () => ({ openedProjects, setOpenedProjects, activeSlug, setActiveSlug, toggleProject }),
    [openedProjects, activeSlug, toggleProject],
  );

  return <OpenedProjectsContext value={value}>{children}</OpenedProjectsContext>;
}
