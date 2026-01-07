"use client";

import type { HomepageContentItem, HomepageProjectItem } from "@/lib";
import type { Link } from "@/lib/graphql/generated/graphql";

import { LinkEntry } from "../link-entry";
import { ProjectEntry } from "../project-entry";
import { SeparatorEntry } from "../separator-entry";
import homepageContentListStyles from "./homepage-content-list.module.css";

export function HomepageContentList({ items }: { items: HomepageContentItem[] }) {
  return (
    <section className={homepageContentListStyles.listWrapper}>
      <ul className={homepageContentListStyles.list}>
        {items
          .map((block) => {
            let blockElement: React.ReactNode | null = null;

            switch (block.__typename) {
              case "Link":
                blockElement = <LinkEntry key={block.sys.id} data={block as Link} />;
                break;
              case "Project":
                if (block.projectRowsCollection?.total && block.projectRowsCollection.total! > 0) {
                  blockElement = (
                    <ProjectEntry
                      key={block.sys.id}
                      {...block as HomepageProjectItem}
                    />
                  );
                }
                break;
              case "Separator":
                blockElement = <SeparatorEntry key={block.sys.id} />;
                break;
              default:
                blockElement = null;
            }

            return (
              <li key={block.sys.id} className={homepageContentListStyles.listItem}>
                {blockElement}
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default HomepageContentList;
