import NextImage from "next/image";
import Link from "next/link";

import imageViewStyles from "./image-view.module.css";

type ImageViewProps = {
  imageUrl: string;
  altText?: string;
  nextUrl: string;
};

export function ImageView({ imageUrl, altText = "", nextUrl }: ImageViewProps) {
  return (
    <figure className={imageViewStyles.figure}>
      <Link href={nextUrl} className={imageViewStyles.imageLink} />
      <NextImage
        className={imageViewStyles.image}
        src={imageUrl}
        alt={altText}
        sizes="100vw"
        fill
        loading="eager"
      />
    </figure>
  );
}
