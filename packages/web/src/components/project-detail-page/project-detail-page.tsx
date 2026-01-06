import Link from "next/link";

import type { ProjectDetailImage, ProjectDetailVideo } from "@/lib/features/projects";

import { ProjectDetailImage as ProjectDetailImageComponent } from "./project-detail-image";
import projectDetailStyles from "./project-detail-page.module.css";
import { ProjectDetailVideo as ProjectDetailVideoComponent } from "./project-detail-video";

type ProjectDetailPageProps = {
  backHref: string;
  asset: ProjectDetailImage | ProjectDetailVideo;
  previousUrl: string;
  nextUrl: string;
  currentIndex: number;
  totalCount: number;
};

export default function ProjectDetailPage({
  backHref,
  asset,
  previousUrl,
  nextUrl,
  currentIndex,
  totalCount,
}: ProjectDetailPageProps) {
  let assetToRender: React.ReactNode = null;
  let title: string | undefined;
  let description: string | undefined;

  if (asset.type === "Image" && asset.image) {
    title = asset.title;
    description = asset.description;
    assetToRender
      = (
        <ProjectDetailImageComponent
          imageUrl={asset.image.url}
          altText={asset.altText}
          nextUrl={nextUrl}
        />
      );
  }
  else if (asset.type === "Video" && (asset.video || asset.videoUrl)) {
    title = asset.title;
    description = asset.description;
    assetToRender
      = (
        <ProjectDetailVideoComponent
          uploadedVideoUrl={asset.video?.url}
          videoUrl={asset.videoUrl}
          autoStart={asset.autoStart}
        />
      );
  }

  return (
    <article className={projectDetailStyles.detailPage}>
      <header className={projectDetailStyles.header}>
        <Link href={backHref} className={projectDetailStyles.back}>
          zurück
        </Link>
      </header>
      {assetToRender}
      <div className={projectDetailStyles.bottom}>
        <nav className={projectDetailStyles.nav}>
          <Link href={previousUrl} className={projectDetailStyles.arrow}>‹</Link>
          <span className={projectDetailStyles.arrowSeparator}>{`${currentIndex} / ${totalCount}`}</span>
          <Link href={nextUrl} className={projectDetailStyles.arrow}>›</Link>
        </nav>
        <div className={projectDetailStyles.legend}>
          <p>{title}</p>
          <p>{description}</p>
        </div>
      </div>
    </article>
  );
}
