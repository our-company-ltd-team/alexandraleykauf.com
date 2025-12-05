"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

import type { Project } from "@/lib/graphql/generated/graphql";

import styles from "./project-block.module.css";

function parseOpenParam(param: string | null) {
  if (!param)
    return [];
  return String(param)
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);
}

function scrollToElementEdge(element: HTMLElement) {
  const elementRect = element.getBoundingClientRect();
  const elementTop = elementRect.top + window.scrollY;

  const currentScroll = window.scrollY;
  const targetScroll = elementTop;

  if (targetScroll !== currentScroll) {
    window.scrollTo({
      top: targetScroll,
      behavior: "smooth",
    });
  }
}

export default function ProjectBlock({ data }: { data: Project }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const openParam = searchParams?.get("open") ?? "";
  const openList = React.useMemo(() => parseOpenParam(openParam), [openParam]);

  const showParagraphs = openList.includes(data._id);
  const liRef = React.useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    if (showParagraphs && liRef.current) {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }
      const timeout = setTimeout(() => {
        if (liRef.current) {
          scrollToElementEdge(liRef.current);
        }
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [showParagraphs]);

  const computeToggledHref = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    const current = parseOpenParam(params.get("open"));
    const idx = current.indexOf(data._id);
    const newList = [...current];
    if (idx === -1)
      newList.push(data._id);
    else newList.splice(idx, 1);

    if (newList.length)
      params.set("open", newList.join(","));
    else params.delete("open");

    const q = params.toString();
    return `${pathname}${q ? `?${q}` : ""}`;
  };

  const href = computeToggledHref();

  return (
    <li id={data._id} ref={liRef} className={clsx(styles.item, showParagraphs && styles.active)}>
      <header className={styles.header}>
        <Link
          href={href}
          className={styles.link}
          aria-expanded={showParagraphs}
          scroll={false}
        >
          <span aria-hidden />
        </Link>

        <span className={styles.center}>{data.title}</span>
        <div className={styles.left}>{data.year}</div>
        <div className={clsx(styles.right, "hidden md:block")} />
      </header>

      {/* {showParagraphs && buildProjectBlockList(data.paragraphs, data._id)} */}
    </li>
  );
}
