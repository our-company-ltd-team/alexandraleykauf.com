"use client";

import type { Options } from "@contentful/rich-text-react-renderer";
import type { FC } from "react";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import clsx from "clsx";
import Link from "next/link";
import React, { useLayoutEffect, useRef } from "react";

import type { HomepageProjectItem } from "@/lib";
import type { ProjectImagesPanel, ProjectPanel, ProjectRow } from "@/lib/features/projects/types";

import { useOpenedProjects } from "@/hooks";
import { useHomeProjectPanels, usePrefetchHomeProjectPanels } from "@/lib";

import { ImageBlock } from "../image-block";
import styles from "./project-block.module.css";

function buildContent(panel: ProjectPanel, projectSlug: string) {
  const renderOptions: Options = {
    renderText: (text) => {
      // Split text by newlines and insert <br> tags
      return text.split("\n").reduce((children, textSegment, index) => {
        return [...children, index > 0 && <br key={index} />, textSegment];
      }, [] as React.ReactNode[]);
    },
  };

  switch (panel.type) {
    case "ImagesPanel":
      return <ImageBlock key={panel.id} {...panel as ProjectImagesPanel} projectSlug={projectSlug} />;
      // case "VideosPanel":
      //   return <VideoBlock key={panel.id} videoBlock={panel.previewImages} projectId={panel.id} />;
    case "TextPanel":
      return <div key={panel.id} className={styles.text}>{documentToReactComponents(panel.text, renderOptions)}</div>;
    case "TextPage":
      return (
        <Link key={panel.id} href={`/${projectSlug}/${panel.slug}`}>
          {panel.title}
        </Link>
      );
      // case "TextPage":
      //   return null;

    default:
      return null;
  }
}

function buildProjectBlockList(row: ProjectRow, projectSlug: string) {
  const panels = row.panels.map((panel: ProjectPanel) => <div key={panel.id} className={styles.detailsRowPanel}>{buildContent(panel, projectSlug)}</div>);
  return (
    <section className={styles.detailsRow}>
      <div className={styles.detailsRowTitle}>{row.title}</div>
      <div className={styles.detailsRowPanelWrapper}>
        {panels}
      </div>
    </section>
  );
}

// function parseOpenParam(param: string | null) {
//   if (!param)
//     return [];
//   return String(param)
//     .split(",")
//     .map(s => s.trim())
//     .filter(Boolean);
// }

const ProjectBlock: FC<HomepageProjectItem> = ({ sys, title, year, slug, category, place }) => {
  const liRef = React.useRef<HTMLLIElement | null>(null);
  const hasScrolledRef = useRef(false);
  const prefetchPanels = usePrefetchHomeProjectPanels();
  const categoryColor = category?.color;

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
        <div className={styles.left}>{year}</div>
        <h3 className={styles.center}>{title}</h3>
        <div className={styles.right}>{place}</div>
      </header>

      {isProjectExpanded && homeProjectPanels?.rows.map(row => buildProjectBlockList(row, slug))}
    </article>
  );
};

export default ProjectBlock;
