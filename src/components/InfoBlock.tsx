"use client";

import React from "react";

function buildInfoBlock(type: string, data: any){
  switch(type){
    case "textComponent":
      return <article>textComponent</article>
    case "imageComponent":
      return <article>imageComponent</article>
    case "videoComponent":
      return <article>videoComponent</article>
    default:
      return <article>Unknown Block</article>
  }
}

function buildInfoBlockList(Blocks: any){
  if (!Blocks?.components) return null;
  return Blocks.components.map((block: any, idx: number) => (
    <React.Fragment key={block._id ?? idx}>
      {buildInfoBlock(block._type, block)}
    </React.Fragment>
  ));
}

export default function InfoBlock({ data }: { data: any }) {
  const [showBlocks, setShowBlocks] = React.useState(false);
  data.date = 2024; // temporary
  return (
      <li>
        <header className="list-item-header">
          <a onClick={() => setShowBlocks(!showBlocks)} className="list-item-link to-transform"></a>
          <span className="list-item-center">{data.title}</span>
          <div className="list-item-left">{data.date}</div>
          <div className="media-phone-hidden media-small-hidden list-item-right"></div>
        </header>
        {showBlocks &&  <div className="list-item-details">
          { buildInfoBlockList(data)}
        </div>}
        
      </li>
  );
}
// ...existing code...