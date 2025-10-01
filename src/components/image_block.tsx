import React from "react";

export type Thumbnail = {
    src: string;
    alt?: string;
    id?: string | number;
};

type ImageBlockProps = {
    images: Thumbnail[];
    onSelect?: (image: Thumbnail, index: number) => void;
};

const THUMB_SIZE = 96;
const GAP = 8;
const RADIUS = 8;

export default function ImageBlock({ images, onSelect }: ImageBlockProps) {
    if (!images?.length) return null;

    return (
        <div style={{ display: "flex", flexWrap: "wrap", gap: GAP }}>
            {images.map((img, i) => {
                const key = img.id ?? img.src ?? i;
                return (
                    <img
                        key={key}
                        src={img.src}
                        alt={img.alt ?? ""}
                        width={THUMB_SIZE}
                        height={THUMB_SIZE}
                        loading="lazy"
                        decoding="async"
                        onClick={onSelect ? () => onSelect(img, i) : undefined}
                        style={{
                            objectFit: "cover",
                            borderRadius: RADIUS,
                            border: "1px solid #e5e7eb",
                            display: "block",
                            cursor: onSelect ? "pointer" : "default",
                        }}
                    />
                );
            })}
        </div>
    );
}
