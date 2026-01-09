"use client";

import NextLink from "next/link";

import type { HomepageLink } from "@/lib";

import styles from "./link-entry.module.css";

function getLink(link: HomepageLink): string {
  if (link.externalLink) {
    return link.externalLink;
  }
  if (link.emailLink) {
    return `mailto:${link.emailLink}`;
  }
  if (link.pdfUrl) {
    return link.pdfUrl;
  }
  return "";
}

export function LinkEntry({ data }: { data: HomepageLink }) {
  return (
    <div
      className={styles.header}
      style={{
        "--link-color": data.categoryColor,
      } as React.CSSProperties}
    >
      <NextLink target="_blank" href={getLink(data)} className={styles.link} />
      <div className={styles.left}>@</div>
      <div className={styles.center}>
        {data.title}
      </div>
      <div className={styles.right}>
        {data.place}
      </div>
    </div>
  );
};
