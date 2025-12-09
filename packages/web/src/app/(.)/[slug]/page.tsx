import * as React from "react";

import { Homepage } from "@/components";
import { getHomePageData } from "@/lib";
import { getCollectionItems, getFirstItem } from "@/lib/graphql";

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { homepageCollection } = await getHomePageData();
  const homepage = getFirstItem(homepageCollection);
  const contentItems = getCollectionItems(homepage?.contentCollection);
  const { slug } = await params;

  return <Homepage items={contentItems} activeSlug={slug} />;
}
