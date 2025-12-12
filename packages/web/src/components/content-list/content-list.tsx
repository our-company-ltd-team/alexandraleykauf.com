"use client";
import type { FC } from "react";

import type { HomepageContentItem, HomepageProjectItem } from "@/lib";
import type { Link } from "@/lib/graphql/generated/graphql";

import { LinkListItem } from "../link-list-item";
import { ProjectListItem } from "../project-list-item";
import { SeparatorListItem } from "../separator-list-item";
import contentListStyles from "./content-list.module.css";

export const ContentList: FC<{ items: HomepageContentItem[] }> = ({ items }) => {
  return (
    <section className={contentListStyles.listWrapper}>
      <ul className={contentListStyles.list}>
        {items
          .map((block) => {
            let blockElement: React.ReactNode | null = null;

            switch (block.__typename) {
              case "Link":
                blockElement = <LinkListItem key={block.sys.id} data={block as Link} />;
                break;
              case "Project":
                if (block.projectRowsCollection?.total && block.projectRowsCollection.total! > 0) {
                  blockElement = (
                    <ProjectListItem
                      key={block.sys.id}
                      {...block as HomepageProjectItem}
                    />
                  );
                }
                break;
              case "Separator":
                blockElement = <SeparatorListItem key={block.sys.id} />;
                break;
              default:
                blockElement = null;
            }

            return (
              <li key={block.sys.id} className={contentListStyles.listItem}>
                {blockElement}
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default ContentList;
