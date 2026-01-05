import type { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import type { ProjectImagesOrVideosPanel } from "@/lib/features/projects/types";

import styles from "./project-preview-images.module.css";

export type ImageBlockProps = ProjectImagesOrVideosPanel & {
  projectSlug: string;
};

export const ProjectPreviewImages: FC<ImageBlockProps> = ({ previewImages, slug, projectSlug }: ImageBlockProps) => {
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
            />
          </Link>
        );
      })}
    </div>
  );
};
