import type { FC } from "react";

import projectDetailStyles from "./project-detail-video.module.css";

type ProjectDetailVideoProps = {
  videoUrl?: string;
  uploadedVideoUrl?: string;
  autoStart?: boolean;
};

/**
 * Converts a Vimeo URL to an embed URL.
 * Supports formats like:
 * - https://vimeo.com/123456789
 * - https://www.vimeo.com/123456789
 * - vimeo.com/123456789
 */
function getVimeoEmbedUrl(url: string): string | null {
  const vimeoRegex = /(?:https?:\/\/)?(?:www\.)?vimeo\.com\/(\d+)/;
  const match = url.match(vimeoRegex);

  if (!match || !match[1]) {
    return null;
  }

  const videoId = match[1];
  return `https://player.vimeo.com/video/${videoId}`;
}

export const ProjectDetailVideo: FC<ProjectDetailVideoProps> = ({
  videoUrl,
  uploadedVideoUrl,
  autoStart = false,
}) => {
  // Determine if we have a Vimeo URL or an uploaded video
  const vimeoEmbedUrl = videoUrl ? getVimeoEmbedUrl(videoUrl) : null;
  const hasUploadedVideo = !!uploadedVideoUrl;

  return (
    <figure className={projectDetailStyles.figure}>
      {vimeoEmbedUrl
        ? (
            <div className={projectDetailStyles.videoContainer}>
              <iframe
                src={`${vimeoEmbedUrl}${autoStart ? "?autoplay=1" : ""}`}
                className={projectDetailStyles.video}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title="Video player"
              />
            </div>
          )
        : hasUploadedVideo
          ? (
              <div className={projectDetailStyles.videoContainer}>
                <video
                  className={projectDetailStyles.video}
                  src={uploadedVideoUrl}
                  controls
                  autoPlay={autoStart}
                  playsInline
                />
              </div>
            )
          : null}
    </figure>
  );
};
