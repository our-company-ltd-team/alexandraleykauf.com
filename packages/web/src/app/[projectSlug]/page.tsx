import NextLink from "next/link";
import * as React from "react";

import { ContentList, Header } from "@/components";
import { getHeaderData, getHomePageData } from "@/lib";
import { getCollectionItems, getFirstItem } from "@/lib/graphql";
import { OpenedProjectsProvider } from "@/providers";
import layoutStyles from "@/styles/layout.module.css";

export default async function ProjectPage() {
  const [homepageCollection, headerData] = await Promise.allSettled([getHomePageData(), getHeaderData()]);
  const homepageData = homepageCollection.status === "fulfilled" ? getFirstItem(homepageCollection.value.homepageCollection) : null;
  const contentItems = getCollectionItems(homepageData?.contentCollection);

  const header = headerData.status === "fulfilled" ? headerData.value : null;
  const categories = header?.categories.filter(category => category.showOnStartPage) ?? [];

  return (
    <OpenedProjectsProvider>
      <Header categories={categories} />
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

    </OpenedProjectsProvider>
  );
}
