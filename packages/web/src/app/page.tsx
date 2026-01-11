import type { Metadata } from "next";

import { Suspense } from "react";

import { HomepageShell } from "@/components";
import { getGeneralConfigData, getHeaderData, getHomePageData } from "@/lib";
import { QueryProvider } from "@/providers";

export default async function Page() {
  const [homepageData, headerData] = await Promise.allSettled([
    getHomePageData(),
    getHeaderData(),
  ]);

  const homepage = homepageData.status === "fulfilled" ? homepageData.value : null;
  const header = headerData.status === "fulfilled" ? headerData.value : null;

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <a href="#main-content" className="sr-only sr-only-focusable">
        Skip to main content
      </a>

      <QueryProvider>
        <HomepageShell
          categories={header?.categories ?? []}
          contentItems={homepage?.contentItems ?? []}
        />
      </QueryProvider>
    </Suspense>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const generalConfigData = await getGeneralConfigData();

  if (!generalConfigData) {
    return {
      title: "Alexandra Leykauf",
      description: "Portfolio of Alexandra Leykauf",
    };
  }

  const title = generalConfigData.seoTitle ?? "Alexandra Leykauf";
  const description = generalConfigData.seoDescription ?? "Portfolio of Alexandra Leykauf";
  const siteName = generalConfigData.seoTitle ?? "Alexandra Leykauf";

  const seoImages = generalConfigData.seoImages !== undefined
    ? generalConfigData.seoImages.map(image => ({
        url: image.url,
        width: 1200,
        height: 630,
        alt: image.description ?? undefined,
      }))
    : undefined;

  return {
    title,
    description: generalConfigData?.seoDescription ?? "Portfolio of Alexandra Leykauf",
    openGraph: {
      title,
      description,
      url: "https://www.alexandra-leykauf.com",
      siteName,
      type: "website",
      images: seoImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: seoImages,
    },
  };
}
