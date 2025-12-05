import Link from "next/link";

import type { TextBlock as TextBlockType } from "@/types";

import styles from "./text-block.module.css";

function buildParagraph(textBlock: TextBlockType, projectId: string) {
  switch (textBlock._type) {
    case "text":
      return (
        <div className={styles.text}>
          {textBlock.text}
          {" "}
        </div>
      );
    case "textPage":
      return (
        <Link href={`/t/${projectId}/${textBlock._key}#back=${projectId}`} className={styles.textpageLink}>
          {textBlock.title}
        </Link>
      );
    default:
      return <>unknown text block</>;
  }
}

export default function TextBlock({ textBlock, projectId }: { textBlock: TextBlockType; projectId: string }) {
  return (
    <div className={styles.detailsRight}>
      {buildParagraph(textBlock, projectId)}
    </div>
  );
}
