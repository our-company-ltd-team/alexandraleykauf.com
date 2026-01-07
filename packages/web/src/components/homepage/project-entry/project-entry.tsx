"use client";

import clsx from "clsx";
import React, { useLayoutEffect, useRef } from "react";

import type { HomepageProjectItem } from "@/lib";

import { useOpenedProjects } from "@/hooks";
import { useHomeProjectPanels, usePrefetchHomeProjectPanels } from "@/lib";

import styles from "./project-entry.module.css";
import { ProjectRow } from "./project-row";

export function ProjectEntry({
  sys,
  title,
  year,
  slug,
  category,
  place,
}: HomepageProjectItem) {
  const liRef = React.useRef<HTMLLIElement | null>(null);
  const hasScrolledRef = useRef(false);
  const prefetchPanels = usePrefetchHomeProjectPanels();
  const categoryColor = category?.color;
  const parsedYear = year ? new Date(year).getFullYear() : undefined;

  const { openedProjects, activeSlug, toggleProject } = useOpenedProjects();

  const isProjectActive = slug === activeSlug;
  const isProjectExpanded = openedProjects.includes(slug!);

  // Enable query when project is expanded
  const { data: homeProjectPanels } = useHomeProjectPanels(slug ?? "", {
    enabled: isProjectExpanded,
  });

  const handleProjectClick = () => {
    if (!slug) {
      return;
    }

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
    if (!isProjectActive || !liRef.current || hasScrolledRef.current)
      return;

    hasScrolledRef.current = true;
    liRef.current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });

    const timeout = setTimeout(() => {
      hasScrolledRef.current = false;
    }, 1000);

    return () => clearTimeout(timeout);
  }, [isProjectActive]);

  if (!slug) {
    return null;
  }

  return (
    <article
      key={sys.id}
      ref={liRef}
      className={clsx(styles.item, isProjectExpanded && styles.active)}
      style={{
        ...(categoryColor && {
          "--project-color": categoryColor,
        } as React.CSSProperties),
      }}
    >
      <header
        className={styles.header}
        onMouseEnter={() => prefetchPanels(slug)}
        onClick={handleProjectClick}
      >
        <div className={styles.left}>{parsedYear}</div>
        <h3 className={styles.center}>{title}</h3>
        <div className={styles.right}>{place}</div>
      </header>

      {isProjectExpanded && homeProjectPanels?.rows.map(row => <ProjectRow key={row.id} row={row} projectSlug={slug} />)}
    </article>
  );
}

export default ProjectEntry;
