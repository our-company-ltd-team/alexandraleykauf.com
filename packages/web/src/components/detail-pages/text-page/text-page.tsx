import type { Options } from "@contentful/rich-text-react-renderer";
import type { FC } from "react";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";
import Link from "next/link";
import React from "react";

import type { ProjectDetailTextPage } from "@/lib/features/projects/types";

import styles from "./text-page.module.css";

const renderOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: text => <strong>{text}</strong>,
    [MARKS.ITALIC]: text => <em>{text}</em>,
    [MARKS.UNDERLINE]: text => <u>{text}</u>,
    [MARKS.SUPERSCRIPT]: text => <sup>{text}</sup>,
    [MARKS.SUBSCRIPT]: text => <sub>{text}</sub>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => <p>{children}</p>,
    [BLOCKS.HEADING_1]: (_node, children) => <h1>{children}</h1>,
    [BLOCKS.HEADING_2]: (_node, children) => <h2>{children}</h2>,
    [BLOCKS.HEADING_3]: (_node, children) => <h3>{children}</h3>,
    [BLOCKS.HEADING_4]: (_node, children) => <h4>{children}</h4>,
    [BLOCKS.HEADING_5]: (_node, children) => <h5>{children}</h5>,
    [BLOCKS.HEADING_6]: (_node, children) => <h6>{children}</h6>,
    [BLOCKS.UL_LIST]: (_node, children) => <ul>{children}</ul>,
    [BLOCKS.OL_LIST]: (_node, children) => <ol>{children}</ol>,
    [BLOCKS.LIST_ITEM]: (_node, children) => <li>{children}</li>,
    [INLINES.HYPERLINK]: (node, children) => {
      const uri = node.data.uri as string;
      return (
        <a href={uri} target="_blank" rel="noopener noreferrer">
          {children}
        </a>
      );
    },
  },
  renderText: (text) => {
    // Split text by newlines and insert <br> tags to preserve line breaks
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, [] as React.ReactNode[]);
  },
};

type TextPageProps = {
  textPage: ProjectDetailTextPage;
  backHref: string;
};

export const TextPage: FC<TextPageProps> = ({ textPage, backHref }) => {
  return (
    <article className={styles.detailPage}>
      <header className={styles.header}>
        {textPage.title && <h2 className={styles.hidden}>{textPage.title}</h2>}
        <Link href={backHref} className={styles.back}>
          zurück
        </Link>
      </header>

      <div className={styles.textContent}>
        {documentToReactComponents(textPage.text, renderOptions)}
      </div>
    </article>
  );
};

export default TextPage;
