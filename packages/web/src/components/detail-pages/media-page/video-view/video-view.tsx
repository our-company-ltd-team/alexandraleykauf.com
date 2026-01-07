/* eslint-disable react-dom/no-missing-iframe-sandbox */
import videoViewStyles from "./video-view.module.css";

type VideoViewProps = {
  videoUrl?: string;
  uploadedVideoUrl?: string;
  autoStart?: boolean;
  title?: string;
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
  return `http://player.vimeo.com/video/${videoId}`;
}

export function VideoView({
  videoUrl,
  uploadedVideoUrl,
  autoStart = false,
  title,
}: VideoViewProps) {
  // Determine if we have a Vimeo URL or an uploaded video
  const vimeoEmbedUrl = videoUrl ? getVimeoEmbedUrl(videoUrl) : null;
  const hasUploadedVideo = !!uploadedVideoUrl;

  return (
    <div className={videoViewStyles.videoWrapper}>
      {hasUploadedVideo
        ? (
            <div className={videoViewStyles.videoContainer}>
              <video
                className={videoViewStyles.video}
                src={uploadedVideoUrl}
                controls
                autoPlay={autoStart}
                playsInline
              />
            </div>
          )
        : vimeoEmbedUrl
          ? (
              <div className={videoViewStyles.videoContainer}>
                <iframe
                  src={`${vimeoEmbedUrl}?title=0&byline=0&portrait=0${autoStart ? "&autoplay=1" : ""}`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  title={title ?? "Video player"}
                />
              </div>
            )
          : null}
    </div>
  );
}
