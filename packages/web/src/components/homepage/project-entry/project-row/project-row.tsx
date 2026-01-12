import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

import type { ProjectImagesOrVideosPanel, ProjectPanel, ProjectRow as ProjectRowType } from "@/lib/features/projects/types";

import { PanelTextSkeleton } from "./panel-text";
import styles from "./project-row.module.css";

const DynamicPanelThumbnails = dynamic(
  () => import("./panel-thumbnails/panel-thumbnails").then(mod => ({ default: mod.PanelThumbnails })),
  {
    ssr: false,
    loading: () => <div className={styles.loading}>Loading...</div>,
  },
);

const DynamicPanelText = dynamic(
  () => import("./panel-text/panel-text").then(mod => ({ default: mod.PanelText })),
  {
    ssr: false,
    loading: () => <PanelTextSkeleton />,
  },
);

type ProjectRowProps = {
  row: ProjectRowType;
  projectSlug: string;
};

export function ProjectRow({ row, projectSlug }: ProjectRowProps) {
  const panels = row.panels.map((panel: ProjectPanel) => {
    let panelElement: React.ReactNode | null = null;

    switch (panel.type) {
      case "ImagesPanel":
      case "VideosPanel":
        panelElement = <DynamicPanelThumbnails key={panel.id} {...panel as ProjectImagesOrVideosPanel} projectSlug={projectSlug} />;
        break;
      case "TextPanel":
        panelElement = <DynamicPanelText key={panel.id} text={panel.text} />;
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
}
