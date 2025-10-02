"use client";

import React from "react";

function buildInfoBlock(type: string, data: any){
  switch(type){
    case "textComponent":
      return <div>textComponent</div>
    case "imageComponent":
      return <div>imageComponent</div>
    case "videoComponent":
      return <div>videoComponent</div>
    default:
      return <div>Unknown Block</div>
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

  return (
      <li>
          <h2 onClick={() => setShowBlocks(!showBlocks)}>{data.title}</h2>
          {showBlocks && buildInfoBlockList(data)}
      </li>
  );
}
// ...existing code...