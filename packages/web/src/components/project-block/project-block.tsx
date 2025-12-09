"use client";

import type { FC } from "react";

import clsx from "clsx";
import Link from "next/link";
import React, { useLayoutEffect, useRef } from "react";

import type { HomepageProjectItem } from "@/lib";
import type { ProjectImagesPanel, ProjectPanel, ProjectRow } from "@/lib/features/projects/types";

import { useHomeProjectPanels, usePrefetchHomeProjectPanels } from "@/lib";

import { ImageBlock } from "../image-block";
import styles from "./project-block.module.css";

function buildContent(panel: ProjectPanel) {
  // if (!rows)
  //   return null;

  switch (panel.type) {
    case "ImagesPanel":
      return <ImageBlock key={panel.id} {...panel as ProjectImagesPanel} />;
      // case "VideosPanel":
      //   return <VideoBlock key={panel.id} videoBlock={panel.previewImages} projectId={panel.id} />;
      // case "TextPanel":
      //   return <TextBlock key={panel.id} textBlock={panel.text} projectId={panel.id} />;
      // case "TextPage":
      //   return null;

    default:
      return null;
  }
}

function buildProjectBlockList(row: ProjectRow) {
  return (
    <div className={styles.details}>
      {row.map((item: ProjectPanel) => {
        return (
          <article key={item.id} className="paragraph clearfix">
            {buildContent(item)}
          </article>
        );
      })}
    </div>
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

const ProjectBlock: FC<HomepageProjectItem
  & { activeSlug?: string }> = ({ sys, title, year, slug, activeSlug, category }) => {
  const isProjectActive = slug === activeSlug;
  const liRef = React.useRef<HTMLLIElement | null>(null);
  const hasScrolledRef = useRef(false);
  const prefetchPanels = usePrefetchHomeProjectPanels();
  const { data: homeProjectPanels } = useHomeProjectPanels(slug ?? "", { enabled: isProjectActive });
  const categoryColor = category?.color;

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
    <li
      id={sys.id}
      ref={liRef}
      className={
        clsx(styles.item, isProjectActive && styles.active,
        )
      }
      style={{
        ...(categoryColor && {
          "--project-color": categoryColor,
        } as React.CSSProperties),
      }}
      onMouseEnter={() => prefetchPanels(slug)}
    >
      <header className={styles.header}>
        <Link
          href={`${slug}`}
          className={styles.link}
          aria-expanded={isProjectActive}
          scroll={false}
        >
          <span aria-hidden />
        </Link>

        <span className={styles.center}>{title}</span>
        <div className={styles.left}>{year}</div>
        <div className={clsx(styles.right, "hidden md:block")} />
      </header>

      {isProjectActive && homeProjectPanels?.rows.map(row => buildProjectBlockList(row))}
    </li>
  );
};

export default ProjectBlock;
