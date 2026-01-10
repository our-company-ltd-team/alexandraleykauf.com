"use client";
import { useCallback, useEffect, useMemo, useState } from "react";

import { OpenedProjectsContext } from "@/contexts";

type OpenedProjectsProviderProps = {
  children: React.ReactNode;
  initialSlug?: string | null;
};

export function OpenedProjectsProvider({ children, initialSlug = null }: OpenedProjectsProviderProps) {
  // Use the server-provided initial slug (no window access needed for initial state)
  const [activeSlug, setActiveSlug] = useState<string | null>(initialSlug);
  const [openedProjects, setOpenedProjects] = useState<string[]>(() =>
    initialSlug ? [initialSlug] : [],
  );
  const [visibleProjectSlugs, setVisibleProjectSlugs] = useState<string[]>([]);

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

  // Navigate to next project in the visible list
  const navigateToNext = useCallback(() => {
    if (visibleProjectSlugs.length === 0)
      return;

    const currentIndex = activeSlug
      ? visibleProjectSlugs.indexOf(activeSlug)
      : -1;

    const nextIndex = currentIndex + 1;
    if (nextIndex < visibleProjectSlugs.length) {
      const nextSlug = visibleProjectSlugs[nextIndex];
      setActiveSlug(nextSlug);
      if (!openedProjects.includes(nextSlug)) {
        setOpenedProjects(prev => [...prev, nextSlug]);
      }
      // Scroll to the project element
      setTimeout(() => {
        const element = document.querySelector(`[data-project-slug="${nextSlug}"]`);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 0);
    }
  }, [activeSlug, visibleProjectSlugs, openedProjects]);

  // Navigate to previous project in the visible list
  const navigateToPrevious = useCallback(() => {
    if (visibleProjectSlugs.length === 0)
      return;

    const currentIndex = activeSlug
      ? visibleProjectSlugs.indexOf(activeSlug)
      : visibleProjectSlugs.length; // If no active, start from end

    const prevIndex = currentIndex - 1;
    if (prevIndex >= 0) {
      const prevSlug = visibleProjectSlugs[prevIndex];
      setActiveSlug(prevSlug);
      if (!openedProjects.includes(prevSlug)) {
        setOpenedProjects(prev => [...prev, prevSlug]);
      }
      // Scroll to the project element
      setTimeout(() => {
        const element = document.querySelector(`[data-project-slug="${prevSlug}"]`);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }, 0);
    }
  }, [activeSlug, visibleProjectSlugs, openedProjects]);

  const value = useMemo(
    () => ({
      openedProjects,
      setOpenedProjects,
      activeSlug,
      setActiveSlug,
      toggleProject,
      navigateToNext,
      navigateToPrevious,
      visibleProjectSlugs,
      setVisibleProjectSlugs,
    }),
    [openedProjects, activeSlug, toggleProject, navigateToNext, navigateToPrevious, visibleProjectSlugs],
  );

  return <OpenedProjectsContext value={value}>{children}</OpenedProjectsContext>;
}
