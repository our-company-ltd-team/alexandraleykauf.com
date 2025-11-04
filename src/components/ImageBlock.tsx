import React from "react";
import type { ImagesBlock as ImageBlockType } from "@/types";
import Link from "next/link";
// ...existing code...
export type Thumbnail = {
    src: string;
    alt?: string;
    id?: string | number;
};

const THUMB_HEIGHT = 50;
const RADIUS = 8;

function buildThumbnails(imageBlock: ImageBlockType): Thumbnail[] {
    if (!imageBlock?.images || !Array.isArray(imageBlock.images) || imageBlock.images.length === 0) return [];

    const altBase = imageBlock.title || imageBlock.description || "";

    return imageBlock.images.map((img, idx) => {
        const ref = img?.asset?.asset._ref ?? "";
        if (!ref) return null;
        const thumbSrc = `${ref}?height=${THUMB_HEIGHT}`;
        return {
            src: thumbSrc,
            srcFull: ref,
            alt: altBase,
            id: `${imageBlock._key ?? "img"}-${idx}`
        } as Thumbnail;
    }).filter(Boolean) as Thumbnail[];
}

export default function ImageBlock({ imageBlock, projectId }: { imageBlock: ImageBlockType; projectId: string }) {
    const thumbs = buildThumbnails(imageBlock);

    if (!thumbs.length) return null;

    return (
        <div className="paragraph-images details-right" >
            {thumbs.map((t) => (
                <Link
                    key={t.id ?? t.src}
                    href={`/i/${projectId}/${t.id}`} // link to full image
                    title={imageBlock.title || imageBlock.description || ""}
                    rel="noopener noreferrer"
                    style={{ display: "inline-block", overflow: "hidden" }}
                >
                    <img
                        src={t.src}
                        alt={t.alt ?? ""}
                        loading="lazy"
                        height={THUMB_HEIGHT}
                        style={{
                            display: "block",
                            height: THUMB_HEIGHT,
                            width: "auto",
                            maxWidth: "100%",
                            objectFit: "cover",
                        }}
                    />
                </Link>
            ))}
        </div>
    );
}
