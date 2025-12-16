import { Suspense } from "react";

import { MainPageWrapperClient } from "@/components/main-page-wrapper/main-page-wrapper.client";
import { getHeaderData, getHomePageData } from "@/lib";
import { getCollectionItems, getFirstItem } from "@/lib/graphql/type-utils";

export const revalidate = 3600; // 1 hour

export async function generateStaticParams() {
  const homepageData = await getHomePageData();
  const firstItem = getFirstItem(homepageData?.homepageCollection);
  const contentItems = getCollectionItems(firstItem?.contentCollection);
  const projects = contentItems.filter(item => item.__typename === "Project");

  const projectSlugs = projects.map(project => project.slug ?? "");

  return projectSlugs;
}

export default async function Page() {
  const [homepageCollection, headerData] = await Promise.allSettled([getHomePageData(), getHeaderData()]);
  const homepageData = homepageCollection.status === "fulfilled" ? getFirstItem(homepageCollection.value.homepageCollection) : null;
  const contentItems = getCollectionItems(homepageData?.contentCollection);

  const header = headerData.status === "fulfilled" ? headerData.value : null;
  const categories = header?.categories ?? [];

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MainPageWrapperClient categories={categories} contentItems={contentItems} />
    </Suspense>
  );
}
