import React from 'react';
import Link from 'next/link';





function buildParagraph(textBlock: any, projectId: string) {
    switch(textBlock._type){
        case "text":
            return <div className="text" >{textBlock.text} </div>;
        case "textPage":
            return (
              <Link href={`/t/${projectId}/${textBlock._key}#back=${projectId}`} className="textpage-link">
                {textBlock.title}
              </Link>
            );
        default:
            return <>unknown text block</>;
    }
}

export default function TextBlock({ textBlock, projectId }: { textBlock: any; projectId: string }) {
  return (
    <div className="paragraph-texts details-right">
        {buildParagraph(textBlock, projectId)}
    </div>
  );
}