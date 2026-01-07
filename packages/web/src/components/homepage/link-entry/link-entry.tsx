"use client";

import clsx from "clsx";

import type { Link } from "@/lib/graphql/generated/graphql";

import styles from "./link-entry.module.css";

export function LinkEntry({ data }: { data: Link }) {
  // TODO: Check if this is still needed
  // function getLink() {
  //   switch (data.linkType) {
  //     case "email":
  //       return `mailto:${data.email}`;
  //     case "url":
  //       return data.url || "#";
  //     case "file":
  //       return data.file?.asset._ref || "#";
  //     default:
  //       return "#";
  //   }
  // }

  return (

    <div className={styles.header} data-visible="true">
      {/* <NextLink target="_blank" href={getLink()} className={styles.link}></NextLink> */}
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
