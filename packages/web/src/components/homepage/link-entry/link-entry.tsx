"use client";

import NextLink from "next/link";

import type { HomepageLink } from "@/lib/features/home/types";

import styles from "./link-entry.module.css";

function getLink(link: HomepageLink): React.ReactNode {
  if (link.externalLink) {
    return (
      <NextLink target="_blank" href={link.externalLink} className={styles.link}>
        <div className="sr-only">{link.title}</div>
      </NextLink>
    );
  }

  if (link.emailLink) {
    return (
      <NextLink href={`mailto:${link.emailLink}`} className={styles.link}>
        <div className="sr-only">{link.title}</div>
      </NextLink>
    );
  }

  if (link.pdfUrl) {
    return (
      <NextLink target="_blank" href={link.pdfUrl} className={styles.link}>
        <div className="sr-only">{link.title}</div>
      </NextLink>
    );
  }
  return "";
}

export function LinkEntry({ data }: { data: HomepageLink }) {
  const linkElement = getLink(data);

  return (
    <div
      className={styles.header}
      style={{
        "--link-background-color": data.categoryColor,
        "--link-faded-background-color": data.categoryFadedColor,
      } as React.CSSProperties}
    >
      {linkElement}
      <div className={styles.left}>
        <span className={styles.at}>@</span>
      </div>
      <div className={styles.center}>
        {data.title}
      </div>
      <div className={styles.right}>
        {data.place}
      </div>
    </div>
  );
};
