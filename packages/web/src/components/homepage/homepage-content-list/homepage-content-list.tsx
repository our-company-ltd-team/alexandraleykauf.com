"use client";

import type { HomepageContentItem } from "@/lib/features/home/types";

import { LinkEntry } from "../link-entry";
import { ProjectEntry } from "../project-entry";
import { SeparatorEntry } from "../separator-entry";
import homepageContentListStyles from "./homepage-content-list.module.css";

export function HomepageContentList({ items }: { items: HomepageContentItem[] }) {
  const sortedItems = items.sort((a, b) => {
    if (a.type === "Project" && b.type === "Project") {
      const yearDiff = new Date(b.year ?? "").getFullYear() - new Date(a.year ?? "").getFullYear();
      if (yearDiff !== 0) {
        return yearDiff;
      }
      // If years are the same, sort by day of month (ascending)
      return new Date(a.year ?? "").getDate() - new Date(b.year ?? "").getDate();
    }
    // keep other types in their original order
    return 0;
  });

  return (
    <section className={homepageContentListStyles.listWrapper}>
      <ul className={homepageContentListStyles.list}>
        {sortedItems
          .map((item) => {
            let blockElement: React.ReactNode | null = null;

            switch (item.type) {
              case "Link":
                blockElement = <LinkEntry key={item.id} data={item} />;
                break;
              case "Project":
                blockElement = <ProjectEntry key={item.id} {...item} />;
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
