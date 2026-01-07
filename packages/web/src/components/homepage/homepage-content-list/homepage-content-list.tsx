"use client";

import type { HomepageContentItem } from "@/lib";

import { LinkEntry } from "../link-entry";
import { ProjectEntry } from "../project-entry";
import { SeparatorEntry } from "../separator-entry";
import homepageContentListStyles from "./homepage-content-list.module.css";

export function HomepageContentList({ items }: { items: HomepageContentItem[] }) {
  return (
    <section className={homepageContentListStyles.listWrapper}>
      <ul className={homepageContentListStyles.list}>
        {items
          .map((item) => {
            let blockElement: React.ReactNode | null = null;

            switch (item.type) {
              case "Link":
                blockElement = <LinkEntry key={item.id} data={item} />;
                break;
              case "Project":
                // Only render projects that have rows
                if (item.hasRows) {
                  blockElement = <ProjectEntry key={item.id} {...item} />;
                }
                break;
              case "Separator":
                blockElement = <SeparatorEntry key={item.id} />;
                break;
            }

            return (
              <li key={item.id} className={homepageContentListStyles.listItem}>
                {blockElement}
              </li>
            );
          })}
      </ul>
    </section>
  );
};

export default HomepageContentList;
