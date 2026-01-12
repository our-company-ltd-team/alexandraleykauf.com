"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

import type { ProjectDetailImage, ProjectDetailVideo } from "@/lib/features/projects";

import { useKeyboardNavigation } from "@/hooks/use-keyboard-navigation";
import { useSwipeGesture } from "@/hooks/use-swipe-gesture";

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
  const router = useRouter();

  // Keyboard navigation
  useKeyboardNavigation({
    onLeft: () => router.push(previousUrl, { scroll: false }),
    onRight: () => router.push(nextUrl, { scroll: false }),
  });

  // Swipe gesture for mobile
  const swipeRef = useSwipeGesture<HTMLElement>({
    onSwipeLeft: () => router.push(nextUrl, { scroll: false }),
    onSwipeRight: () => router.push(previousUrl, { scroll: false }),
  });

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
          width={asset.width}
          height={asset.height}
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
    <main ref={swipeRef} className={mediaPageStyles.detailPage}>
      <header className={mediaPageStyles.header}>
        <Link href={backHref} className={mediaPageStyles.back} scroll={false}>
          zurück
        </Link>
      </header>
      <div className={mediaPageStyles.assetContainer}>
        {assetToRender}
      </div>
      <div className={mediaPageStyles.bottom}>
        {totalCount > 1 && (
          <nav className={mediaPageStyles.nav}>
            <Link
              href={previousUrl}
              className={mediaPageStyles.arrow}
              aria-label="Previous image"
              scroll={false}
            >
              ‹
            </Link>
            <span className={mediaPageStyles.arrowSeparator}>{`${currentIndex} / ${totalCount}`}</span>
            <Link
              href={nextUrl}
              className={mediaPageStyles.arrow}
              aria-label="Next image"
              scroll={false}
            >
              ›
            </Link>
          </nav>
        )}
        <div className={mediaPageStyles.legend}>
          <p>{title}</p>
          <p>{description}</p>
        </div>
      </div>
    </main>
  );
}
