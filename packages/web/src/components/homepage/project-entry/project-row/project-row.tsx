"use client";

import type { Options } from "@contentful/rich-text-react-renderer";
import type { FC } from "react";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import Link from "next/link";
import React from "react";

import type { ProjectImagesOrVideosPanel, ProjectPanel, ProjectRow as ProjectRowType } from "@/lib/features/projects/types";

import { PanelThumbnails } from "./panel-thumbnails";
import styles from "./project-row.module.css";

const renderOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: text => <strong>{text}</strong>,
    [MARKS.ITALIC]: text => <em>{text}</em>,
    [MARKS.UNDERLINE]: text => <u>{text}</u>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => <p>{children}</p>,
    [INLINES.HYPERLINK]: (node, children) => {
      const uri = node.data.uri as string;
      return (
        <a href={uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  },

  renderText: (text) => {
    // Split text by newlines and insert <br> tags
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, [] as React.ReactNode[]);
  },
};

export const ProjectRow: FC<{ row: ProjectRowType; projectSlug: string }> = ({ row, projectSlug }) => {
  const panels = row.panels.map((panel: ProjectPanel) => {
    let panelElement: React.ReactNode | null = null;

    switch (panel.type) {
      case "ImagesPanel":
      case "VideosPanel":
        panelElement = <PanelThumbnails key={panel.id} {...panel as ProjectImagesOrVideosPanel} projectSlug={projectSlug} />;
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
