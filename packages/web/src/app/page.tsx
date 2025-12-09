import NextLink from "next/link";

import { Homepage } from "@/components/homepage";
import { getHomePageData } from "@/lib";
import { getCollectionItems, getFirstItem } from "@/lib/graphql/type-utils";
import layoutStyles from "@/styles/layout.module.css";

export default async function Page() {
  const { homepageCollection } = await getHomePageData();
  const homepage = getFirstItem(homepageCollection);
  const contentItems = getCollectionItems(homepage?.contentCollection);

  return (
    <div>
      <header className={layoutStyles.mainHeader}>
        <h1 className={layoutStyles.mainTitle}>
          <NextLink href="/">ALEXANDRA LEYKAUF</NextLink>
        </h1>
      </header>
      <Homepage items={contentItems} />
      <footer className={layoutStyles.footer}>
        <NextLink
          href="https://www.ourcompany.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Our Company Ltd. / © A.L. 2025
        </NextLink>
      </footer>
    </div>
  );
}
