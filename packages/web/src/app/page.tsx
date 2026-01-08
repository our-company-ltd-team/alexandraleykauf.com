import type { Metadata } from "next";

import { Suspense } from "react";

import { HomepageShell } from "@/components";
import { getGeneralConfigData, getHeaderData, getHomePageData } from "@/lib";

export async function generateMetadata(): Promise<Metadata> {
  const generalConfigData = await getGeneralConfigData();

  const ogImage = generalConfigData?.seoImage
    ? {
        url: generalConfigData.seoImage,
        width: generalConfigData.seoImageWidth ?? 1200,
        height: generalConfigData.seoImageHeight ?? 630,
      }
    : undefined;

  return {
    title: generalConfigData?.seoTitle ?? "Alexandra Leykauf",
    description: generalConfigData?.seoDescription ?? "Portfolio of Alexandra Leykauf",
    openGraph: { images: ogImage ? [ogImage] : undefined },
  };
}

export default async function Page() {
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
      />
    </Suspense>
  );
}
