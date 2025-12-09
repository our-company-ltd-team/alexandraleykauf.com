import Link from "next/link";

import type { ProjectImagesPanel, ProjectPreviewImage } from "@/lib/features/projects/types";

import styles from "./image-block.module.css";

export type Thumbnail = {
  src: string;
  alt?: string;
  id?: string | number;
};

const THUMB_HEIGHT = 50;

function buildThumbnails(previewImages: ProjectPreviewImage[]): Thumbnail[] {
  if (previewImages.length === 0) {
    return [];
  }

  return previewImages.map(({ image, altText, id }) => {
    const ref = image.url;
    if (!ref) {
      return null;
    }

    return {
      src: ref,
      srcFull: ref,
      alt: altText ?? "",
      id: id ?? "",
    } as Thumbnail;
  }).filter(Boolean) as Thumbnail[];
}

export default function ImageBlock({ previewImages, title, slug }: ProjectImagesPanel) {
  const thumbs = buildThumbnails(previewImages);

  if (!thumbs.length)
    return null;

  return (
    <div className={styles.container}>
      {thumbs.map(t => (
        <Link
          key={t.id ?? t.src}
          // href={`/i/${projectId}/${t.id}`}
          href={`${slug}`}
          title={title ?? ""}
          rel="noopener noreferrer"
          className={styles.thumbnailLink}
        >
          <img
            src={t.src}
            alt={t.alt ?? ""}
            loading="lazy"
            height={THUMB_HEIGHT}
            className={styles.thumbnail}
          />
        </Link>
      ))}
    </div>
  );
}
