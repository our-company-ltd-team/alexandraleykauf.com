"use client";
import React from "react";
import TextBlock from "./TextBlock";
import {usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";

function buildContent(content: any[] = [], projectId: string) {
  return content.map((contentBlock: any) => {
    const key = contentBlock._key || contentBlock._id || Math.random();

    switch (contentBlock._type) {
      case "image":
        return (
          <div key={key} className="paragraph-image details-right">
            image block
          </div>
        );

      case "text":
      case "textPage":
        return <TextBlock key={key} textBlock={contentBlock} projectId={projectId} />;

      case "video":
        return (
          <div key={key} className="paragraph-video details-right">
            video block
          </div>
        );

      default:
        return (
          <div key={key} className="paragraph-unknown details-right">
            unknown projekt block
          </div>
        );
    }
  });
}

function buildProjectBlockList(paragraphs: any, projectId: string) {
  if (!paragraphs) return null;
  return (
    <div className="list-item-details">
      {paragraphs.map((p: any) => (
        <article key={p._key || p._id} className="paragraph clearfix">
          <div className="paragraph-title details-left">{p.title}</div>
          {buildContent(p.content, projectId)}
        </article>
      ))}
    </div>
  );
}

function parseOpenParam(param: string | null) {
  if (!param) return [];
  return String(param)
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
}

export default function ProjectBlock({ data }: { data: any }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const openParam = searchParams?.get("open") ?? "";
  const openList = React.useMemo(() => parseOpenParam(openParam), [openParam]);

  // derive open state directly from the URL (no router push here)
  const showParagraphs = openList.includes(data._id);

  // scroll to the top of this <li> when it becomes open
  const liRef = React.useRef<HTMLLIElement | null>(null);
  React.useEffect(() => {
    if (showParagraphs && liRef.current) {
      liRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showParagraphs]);

  // compute toggled href for this project (used by Link)
  const computeToggledHref = () => {
    const params = new URLSearchParams(searchParams?.toString() ?? "");
    const current = parseOpenParam(params.get("open"));
    const idx = current.indexOf(data._id);
    const newList = [...current];
    if (idx === -1) newList.push(data._id);
    else newList.splice(idx, 1);

    if (newList.length) params.set("open", newList.join(","));
    else params.delete("open");

    const q = params.toString();
    return `${pathname}${q ? `?${q}` : ""}`;
  };

  const href = computeToggledHref();

  return (
    <li id={data._id} ref={liRef}>
      <header className="list-item-header">
        <Link
          href={href}
          className="list-item-link to-transform"
          aria-expanded={showParagraphs}
        >
          <span aria-hidden />
        </Link>

        <span className="list-item-center">{data.title}</span>
        <div className="list-item-left">{data.year}</div>
        <div className="media-phone-hidden media-small-hidden list-item-right"></div>
      </header>

      {showParagraphs && buildProjectBlockList(data.paragraphs, data._id)}
    </li>
  );
}