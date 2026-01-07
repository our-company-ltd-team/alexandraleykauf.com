import * as React from "react";
import { Suspense } from "react";

import { HomepageShell } from "@/components";
import { getHeaderData, getHomePageData } from "@/lib";

type ProjectPageProps = {
  params: Promise<{ project?: string }>;
};

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { project: initialSlug } = await params;

  const [homepageData, headerData] = await Promise.allSettled([
    getHomePageData(),
    getHeaderData(),
  ]);

  const homepage = homepageData.status === "fulfilled" ? homepageData.value : null;
  const header = headerData.status === "fulfilled" ? headerData.value : null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <HomepageShell
        categories={header?.categories ?? []}
        contentItems={homepage?.contentItems ?? []}
        initialSlug={initialSlug}
      />
    </Suspense>
  );
}
