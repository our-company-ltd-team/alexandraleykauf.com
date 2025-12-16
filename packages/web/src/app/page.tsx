import NextLink from "next/link";

import { ContentList, Header } from "@/components";
import { getHomePageData } from "@/lib";
import { getCollectionItems, getFirstItem } from "@/lib/graphql/type-utils";
import { OpenedProjectsProvider } from "@/providers";
import layoutStyles from "@/styles/layout.module.css";

export default async function Page() {
  const { homepageCollection } = await getHomePageData();
  const homepage = getFirstItem(homepageCollection);
  const contentItems = getCollectionItems(homepage?.contentCollection);

  return (
    <OpenedProjectsProvider>
      <Header categories={[]} />
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
