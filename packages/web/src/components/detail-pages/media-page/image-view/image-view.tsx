import NextImage from "next/image";
import Link from "next/link";

import imageViewStyles from "./image-view.module.css";

type ImageViewProps = {
  altText?: string;
  imageUrl: string;
  nextUrl: string;
  width: number;
  height: number;
};

export function ImageView({ imageUrl, altText = "", nextUrl, width, height }: ImageViewProps) {
  return (
    <figure className={imageViewStyles.figure}>
      <Link href={nextUrl}>
        <NextImage
          className={imageViewStyles.image}
          src={imageUrl}
          alt={altText}
          width={width}
          height={height}
          sizes="(min-width: 1200px) 966px, 100vw"
          loading="eager"
        />
      </Link>
    </figure>
  );
}
