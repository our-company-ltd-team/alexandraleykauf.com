"use client";

import React from "react";
import { useRouter } from "next/navigation";
import TextBlock from "./TextBlock";


function buildContent(content: any[], projectId: string) {
  return content.map((contentBlock: any) => {

    const key = contentBlock._key || Math.random();

    switch (contentBlock._type) {
      case "image":
        return <div key={key} className="paragraph-image details-right">image block</div>;

      case "text":
      case "textPage":
        return <TextBlock key={key} textBlock={contentBlock} projectId={projectId} />;

      case "video":
        return <div key={key} className="paragraph-video details-right">video block</div>;

      default:
        return <div key={key} className="paragraph-unknown details-right">unknown projekt block</div>;
    }
  });
}

function buildProjectBlockList(paragraphs: any, projectId: string) {
  console.log(paragraphs);
  if (!paragraphs) return null;
  return (<div className="list-item-details">
    {paragraphs.map((p: any) => (
      <article key={p._key} className="paragraph clearfix">
        <div className="paragraph-title details-left">
          {p.title}
        </div>
        {buildContent(p.content, projectId)}
      </article>
    ))}
  </div>
  );
}

export default function ProjectBlock({ data }: { data: any }) {
  const [showParagraphs, setShowParagraphs] = React.useState(false);

  return (
    <li >
      <header className="list-item-header">
        <a onClick={() => setShowParagraphs(!showParagraphs)} className="list-item-link to-transform"></a>

        <span className="list-item-center">{data.title}</span>
        <div className="list-item-left">{data.year}</div>
        <div className="media-phone-hidden media-small-hidden list-item-right"></div>

      </header>
      {showParagraphs && buildProjectBlockList(data.paragraphs, data._id)}
    </li>
  );
}
// ...existing code...