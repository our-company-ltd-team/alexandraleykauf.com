import Link from "next/link";

import type { ProjectDetailImage, ProjectDetailVideo } from "@/lib/features/projects";

import { ImageView } from "./image-view";
import mediaPageStyles from "./media-page.module.css";
import { VideoView } from "./video-view";

type MediaPageProps = {
  backHref: string;
  asset: ProjectDetailImage | ProjectDetailVideo;
  previousUrl: string;
  nextUrl: string;
  currentIndex: number;
  totalCount: number;
};

export default function MediaPage({
  backHref,
  asset,
  previousUrl,
  nextUrl,
  currentIndex,
  totalCount,
}: MediaPageProps) {
  let assetToRender: React.ReactNode = null;
  let title: string | undefined;
  let description: string | undefined;

  if (asset.type === "Image" && asset.image) {
    title = asset.title;
    description = asset.description;
    assetToRender
      = (
        <ImageView
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
        <VideoView
          uploadedVideoUrl={asset.video?.url}
          videoUrl={asset.videoUrl}
          autoStart={asset.autoStart}
        />
      );
  }

  return (
    <article className={mediaPageStyles.detailPage}>
      <header className={mediaPageStyles.header}>
        <Link href={backHref} className={mediaPageStyles.back}>
          zurück
        </Link>
      </header>
      {assetToRender}
      <div className={mediaPageStyles.bottom}>
        <nav className={mediaPageStyles.nav}>
          <Link href={previousUrl} className={mediaPageStyles.arrow}>‹</Link>
          <span className={mediaPageStyles.arrowSeparator}>{`${currentIndex} / ${totalCount}`}</span>
          <Link href={nextUrl} className={mediaPageStyles.arrow}>›</Link>
        </nav>
        <div className={mediaPageStyles.legend}>
          <p>{title}</p>
          <p>{description}</p>
        </div>
      </div>
    </article>
  );
}
