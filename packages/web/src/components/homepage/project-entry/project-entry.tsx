"use client";
import clsx from "clsx";
import dynamic from "next/dynamic";
import React, { useLayoutEffect, useRef } from "react";

import type { HomepageProject } from "@/lib/features/home/types";

import { useOpenedProjects } from "@/hooks";
import { useHomeProjectPanels, usePrefetchHomeProjectPanels } from "@/lib/features/projects/hooks";

import styles from "./project-entry.module.css";

const DynamicProjectRow = dynamic(
  () => import("./project-row/project-row").then(mod => ({ default: mod.ProjectRow })),
  {
    ssr: false,
    loading: () => <div>Loading...</div>,
  },
);

export function ProjectEntry({
  id,
  title,
  year,
  slug,
  categoryColor,
  categoryFadedColor,
  place,
  hasRows,
}: HomepageProject) {
  const liRef = useRef<HTMLLIElement | null>(null);
  const hasScrolledRef = useRef(false);
  const parsedYear = year ? new Date(year).getFullYear() : undefined;
  const prefetchPanels = usePrefetchHomeProjectPanels();

  const { openedProjects, activeSlug, toggleProject } = useOpenedProjects();

  const isProjectActive = slug === activeSlug;
  const isProjectExpanded = openedProjects.includes(slug);

  // Enable query when project is expanded
  const { data: homeProjectPanels } = useHomeProjectPanels(slug, {
    enabled: isProjectExpanded && hasRows,
  });

  const handleProjectClick = () => {
    if (!hasRows)
      return;
    // Toggle expansion and set active (URL updates via effect in provider)
    toggleProject(slug);

    if (!isProjectExpanded && liRef.current) {
      liRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  // Handle initial scroll when coming from URL
  useLayoutEffect(() => {
    if (!hasRows || !isProjectActive || !liRef.current || hasScrolledRef.current) {
      return;
    }

    hasScrolledRef.current = true;
    liRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const timeout = setTimeout(() => {
      hasScrolledRef.current = false;
    }, 0);

    return () => clearTimeout(timeout);
  }, [isProjectActive, hasRows]);

  return (
    <article
      key={id}
      ref={liRef}
      data-project-slug={slug}
      className={clsx(styles.item, isProjectExpanded && styles.active)}
      style={{
        ...(categoryColor && {
          "--project-background-color": categoryColor,
          "--project-faded-background-color": categoryFadedColor,
        } as React.CSSProperties),
      }}
    >
      <header
        className={clsx(styles.header, !hasRows && styles.headerNonInteractive)}
        onMouseEnter={hasRows ? () => prefetchPanels(slug) : undefined}
        onClick={hasRows ? handleProjectClick : undefined}
        onKeyDown={hasRows
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleProjectClick();
              }
            }
          : undefined}
        role={hasRows ? "button" : undefined}
        tabIndex={hasRows ? 0 : undefined}
        aria-expanded={hasRows ? isProjectExpanded : undefined}
        aria-controls={hasRows ? `project-content-${id}` : undefined}
      >
        <div className={styles.left}>{parsedYear}</div>
        <h3 className={styles.center}>{title}</h3>
        <div className={styles.right}>{place}</div>
      </header>
      <div id={`project-content-${id}`} aria-live="polite" aria-atomic="true">
        {isProjectExpanded && homeProjectPanels?.rows.map(row => <DynamicProjectRow key={row.id} row={row} projectSlug={slug} />)}
      </div>
    </article>
  );
}

export default ProjectEntry;
