import Link from "next/link";

import type { ProjectImagesPanel } from "@/lib/features/projects/types";

import styles from "./image-block.module.css";

// const THUMB_HEIGHT = 50;

export type ImageBlockProps = ProjectImagesPanel & {
  projectSlug: string;
};

export default function ImageBlock({ previewImages, slug, projectSlug }: ImageBlockProps) {
  return (
    <div className={styles.container}>
      {previewImages.map(previewImage => (
        <Link
          key={previewImage.id}
          href={`/${projectSlug}/${slug}`}
          rel="noopener noreferrer"
          // className={styles.thumbnailLink}
        >
          <img
            src={previewImage.image.url}
            alt={previewImage.altText ?? ""}
            // loading="lazy"
            // height={THUMB_HEIGHT}
            className={styles.thumbnail}
          />
        </Link>
      ))}
    </div>
  );
}
