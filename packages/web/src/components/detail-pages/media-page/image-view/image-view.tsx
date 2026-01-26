import NextImage from "next/image";
import Link from "next/link";

import imageViewStyles from "./image-view.module.css";

type ImageViewProps = {
  altText?: string;
  imageUrl: string;
  nextUrl: string;
  previousUrl: string;
  width: number;
  height: number;
};

export function ImageView({ imageUrl, altText = "", nextUrl, previousUrl, width, height }: ImageViewProps) {
  return (
    <figure className={imageViewStyles.figure}>
      <Link href={previousUrl} aria-label="Previous image" scroll={false} className={imageViewStyles.previousButton} />
      <Link href={nextUrl} aria-label="Next image" scroll={false} className={imageViewStyles.nextButton} />
      <NextImage
        className={imageViewStyles.image}
        src={imageUrl}
        alt={altText}
        width={width}
        height={height}
        sizes="(max-width: 767px) 100vw, (max-width: 1199px) calc(100vw - 70px), 1000px"
        loading="eager"
        preload={true}
        fetchPriority="high"
      />
    </figure>
  );
}
