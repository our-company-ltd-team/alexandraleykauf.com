import NextLink from "next/link";
import * as React from "react";

import { ContentList } from "@/components/content-list";
import { getHomePageData } from "@/lib";
import { getCollectionItems, getFirstItem } from "@/lib/graphql";
import layoutStyles from "@/styles/layout.module.css";

export default async function ProjectPage() {
  const { homepageCollection } = await getHomePageData();
  const homepage = getFirstItem(homepageCollection);
  const contentItems = getCollectionItems(homepage?.contentCollection);

  return (
    <>
      <header className={layoutStyles.mainHeader}>
        <h1 className={layoutStyles.mainTitle}>
          <NextLink href="/">ALEXANDRA LEYKAUF</NextLink>
        </h1>
      </header>
      <ContentList items={contentItems} />
      <footer className={layoutStyles.footer}>
        <NextLink
          href="https://www.ourcompany.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Our Company Ltd. / © A.L. 2025
        </NextLink>
      </footer>
    </>
  );
}
