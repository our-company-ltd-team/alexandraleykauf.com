"use client";
import type { FC } from "react";

import type { HomepageContentItem, HomepageProjectItem } from "@/lib";
import type { Link } from "@/lib/graphql/generated/graphql";

import layoutStyles from "@/styles/layout.module.css";

import { LinkBlock } from "./link-block";
import { ProjectBlock } from "./project-block";
import { SeparatorBlock } from "./separator-block";

/**
 * Builds a React element for a single content item based on its __typename.
 *
 * With fragmentMasking: false, sys.id is directly accessible on the type.
 * Components expect full schema types, so we cast to satisfy TypeScript.
 */
function buildBlock(block: HomepageContentItem, activeSlug?: string) {
  switch (block.__typename) {
    case "Link":
      return <LinkBlock key={block.sys.id} data={block as Link} />;
    case "Project":
      if (block.projectRowsCollection?.total && block.projectRowsCollection.total! > 0) {
        return (
          <ProjectBlock
            key={block.sys.id}
            activeSlug={activeSlug}
            {...block as HomepageProjectItem}
          />
        );
      }
      return null;
    case "Separator":
      return <SeparatorBlock key={block.sys.id} />;
    default:
      return null;
  }
}

export const Homepage: FC<{
  items: HomepageContentItem[];
  activeSlug?: string;
}> = ({ items, activeSlug }) => {
  // const { data: projectData, isLoading } = useProjectPanels(activeSlug ?? "", { enabled: !!activeSlug });

  // console.log({ projectData });

  // if (!projectData || isLoading) {
  //   return null;
  // }

  return (
    <div>
      <section className={layoutStyles.list}>
        <ul className={layoutStyles.listUl}>
          {items
            .map(block => buildBlock(block, activeSlug))}
        </ul>
      </section>
    </div>
  );
};

export default Homepage;
