import type { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import type { ProjectImagesOrVideosPanel } from "@/lib/features/projects/types";

import styles from "./panel-thumbnails.module.css";

export type PanelThumbnailsProps = ProjectImagesOrVideosPanel & {
  projectSlug: string;
};

export const PanelThumbnails: FC<PanelThumbnailsProps> = ({ previewImages, slug, projectSlug }: PanelThumbnailsProps) => {
  return (
    <div className={styles.container}>
      {previewImages.map((previewImage, index) => {
        const imagePosition = index + 1;

        return (
          <Link
            key={previewImage.id}
            href={`/${projectSlug}/${slug}/${imagePosition}`}
          >
            <Image
              src={previewImage.image.url}
              alt={previewImage.altText ?? ""}
              height={previewImage.image.height}
              width={previewImage.image.width}
              className={styles.thumbnail}
              sizes="(min-width: 1200px) 200px, (min-width: 768px) 150px, 100px"
            />
          </Link>
        );
      })}
    </div>
  );
};
