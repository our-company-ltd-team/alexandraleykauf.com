import type { FC } from "react";

import NextImage from "next/image";
import Link from "next/link";

import projectDetailStyles from "./project-detail-image.module.css";

type ProjectDetailImageProps = {
  imageUrl: string;
  altText?: string;
  nextUrl: string;
};

export const ProjectDetailImage: FC<ProjectDetailImageProps> = ({ imageUrl, altText = "", nextUrl }) => {
  return (
    <figure className={projectDetailStyles.figure}>
      <Link href={nextUrl} className={projectDetailStyles.imageLink} />
      <NextImage
        className={projectDetailStyles.image}
        src={imageUrl}
        alt={altText}
        sizes="100vw"
        fill
        loading="eager"
      />
    </figure>
  );
};
