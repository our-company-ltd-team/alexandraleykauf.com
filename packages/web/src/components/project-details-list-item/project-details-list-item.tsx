"use client";

import type { Options } from "@contentful/rich-text-react-renderer";
import type { FC } from "react";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import Link from "next/link";
import React from "react";

import type { ProjectImagesOrVideosPanel, ProjectPanel, ProjectRow } from "@/lib/features/projects/types";

import { ProjectPreviewImages } from "../project-preview-images";
import styles from "./project-details-list-item.module.css";

const renderOptions: Options = {
  renderText: (text) => {
    // Split text by newlines and insert <br> tags
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, [] as React.ReactNode[]);
  },
};

export const ProjectDetailsListItem: FC<{ row: ProjectRow; projectSlug: string }> = ({ row, projectSlug }) => {
  const panels = row.panels.map((panel: ProjectPanel) => {
    let panelElement: React.ReactNode | null = null;

    switch (panel.type) {
      case "ImagesPanel":
      case "VideosPanel":
        panelElement = <ProjectPreviewImages key={panel.id} {...panel as ProjectImagesOrVideosPanel} projectSlug={projectSlug} />;
        break;
      case "TextPanel":
        panelElement = <div key={panel.id} className={styles.text}>{documentToReactComponents(panel.text, renderOptions)}</div>;
        break;
      case "TextPage":
        panelElement = (
          <Link key={panel.id} className={styles.textPageLink} href={`/${projectSlug}/${panel.slug}`}>
            {panel.title}
          </Link>
        );
        break;
      default:
        panelElement = null;
    }

    return (
      <div key={panel.id} className={styles.detailsRowPanel}>{panelElement}</div>
    );
  });

  return (
    <section className={styles.detailsRow}>
      <div className={styles.detailsRowTitle}>{row.title}</div>
      <div className={styles.detailsRowPanelWrapper}>
        {panels}
      </div>
    </section>
  );
};
