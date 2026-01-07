"use client";

import clsx from "clsx";
import NextLink from "next/link";

import type { HomepageLink } from "@/lib";

import styles from "./link-entry.module.css";

export function LinkEntry({ data }: { data: HomepageLink }) {
  function getLink(): string {
    if (data.emailLink) {
      return `mailto:${data.emailLink}`;
    }
    if (data.externalLink) {
      return data.externalLink;
    }
    if (data.pdfUrl) {
      return data.pdfUrl;
    }
    return "#";
  }

  return (
    <div className={styles.header} data-visible="true">
      <NextLink target="_blank" href={getLink()} className={styles.link} />
      <div className={styles.center}>
        {data.title}
      </div>
      <div className={styles.left}>
        <span className={styles.at}>@</span>
      </div>
      <div className={clsx(styles.right, "hidden md:block")} />
    </div>
  );
};
