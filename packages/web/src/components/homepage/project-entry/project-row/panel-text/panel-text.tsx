import type { Options } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS, INLINES, MARKS } from "@contentful/rich-text-types";

import { Skeleton } from "@/components/shared/skeleton";

import styles from "../project-row.module.css";

const renderOptions: Options = {
  renderMark: {
    [MARKS.BOLD]: text => <strong>{text}</strong>,
    [MARKS.ITALIC]: text => <em>{text}</em>,
    [MARKS.UNDERLINE]: text => <u>{text}</u>,
  },
  renderNode: {
    [BLOCKS.PARAGRAPH]: (_node, children) => <p>{children}</p>,
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
    // Split text by newlines and insert <br> tags
    return text.split("\n").reduce((children, textSegment, index) => {
      return [...children, index > 0 && <br key={index} />, textSegment];
    }, [] as React.ReactNode[]);
  },
};

export function PanelText({ text }: { text: Document }) {
  return <div className={styles.text}>{documentToReactComponents(text, renderOptions)}</div>;
}

export function PanelTextSkeleton() {
  return <div className={styles.text}><Skeleton /></div>;
}
