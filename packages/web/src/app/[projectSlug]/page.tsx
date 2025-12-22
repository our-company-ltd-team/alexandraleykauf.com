import * as React from "react";
import { Suspense } from "react";

import { MainPageWrapperClient } from "@/components";
import { getHeaderData, getHomePageData } from "@/lib";
import { getCollectionItems, getFirstItem } from "@/lib/graphql";

export default async function ProjectPage() {
  const [homepageCollection, headerData] = await Promise.allSettled([getHomePageData(), getHeaderData()]);
  const homepageData = homepageCollection.status === "fulfilled"
    ? getFirstItem(homepageCollection.value.homepageCollection)
    : null;
  const contentItems = getCollectionItems(homepageData?.contentCollection);

  const header = headerData.status === "fulfilled" ? headerData.value : null;
  const categories = header?.categories ?? [];

  console.log({ contentItems: contentItems.filter(item => item.__typename === "Project") });

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPageWrapperClient categories={categories} contentItems={contentItems} />
    </Suspense>
  );
}
