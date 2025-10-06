import React from 'react';

function buildParagraph(textBlock: any, projectId: string) {
    switch(textBlock._type){
        case "text":
            return <div className="text" >{textBlock.text} </div>;
        case "textPage":
            return (
              <a href={`/t/${projectId}/${textBlock._key}`} className="textpage-link">
                {textBlock.title}
                <br />
                {textBlock.text}
              </a>
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