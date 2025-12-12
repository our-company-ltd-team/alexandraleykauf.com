"use client";

import type { FC } from "react";

import clsx from "clsx";

import type { Link } from "@/lib/graphql/generated/graphql";

import styles from "./link-list-item.module.css";

export const LinkListItem: FC<{ data: Link }> = ({ data }) => {
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
