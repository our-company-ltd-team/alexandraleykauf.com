"use client";
import type { FC } from "react";

import type { HomepageContentItem, HomepageProjectItem } from "@/lib";
import type { Link } from "@/lib/graphql/generated/graphql";

import { LinkBlock } from "../link-block";
import { ProjectBlock } from "../project-block";
import { SeparatorBlock } from "../separator-block";
import homepageStyles from "./homepage.module.css";

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
  return (
    <section className={homepageStyles.listWrapper}>
      <ul className={homepageStyles.list}>
        {items
          .map((block) => {
            return (
              <li
                key={block.sys.id}
                className={homepageStyles.listItem}
              >
                {buildBlock(block, activeSlug)}
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default Homepage;
