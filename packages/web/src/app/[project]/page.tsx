import type { Metadata } from "next";

import * as React from "react";
import { Suspense } from "react";

import { HomepageShell } from "@/components/homepage/homepage-shell";
import { getGeneralConfigData } from "@/lib/features/general-config/api";
import { getHeaderData } from "@/lib/features/header/api";
import { getHomePageData } from "@/lib/features/home/api";
import { getProjectMetadataData } from "@/lib/features/projects/api";
import { QueryProvider } from "@/providers/query-provider";

export default async function ProjectPage({ params }: PageProps<"/[project]">) {
  const { project: initialSlug } = await params;

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
          initialSlug={initialSlug}
        />
      </QueryProvider>
    </Suspense>
  );
}

export async function generateMetadata({ params }: PageProps<"/[project]">): Promise<Metadata> {
  const { project: slug } = await params;

  const [projectMetadata, generalConfigData] = await Promise.allSettled([
    getProjectMetadataData(slug),
    getGeneralConfigData(),
  ]);

  const project = projectMetadata.status === "fulfilled" ? projectMetadata.value : null;
  const generalConfig = generalConfigData.status === "fulfilled" ? generalConfigData.value : null;

  // Fallback strategy:
  // 1. seoTitle -> project's seoTitle -> project's title -> general config seoTitle -> "Alexandra Leykauf"
  // 2. seoDescription -> project's seoDescription -> general config seoDescription -> "Portfolio of Alexandra Leykauf"
  // 3. seoImages -> project's seoImages -> general config seoImages

  const title = project?.seoTitle ?? project?.title ?? generalConfig?.seoTitle ?? "Alexandra Leykauf";
  const description = project?.seoDescription ?? generalConfig?.seoDescription ?? "Portfolio of Alexandra Leykauf";
  const siteName = generalConfig?.seoTitle ?? "Alexandra Leykauf";

  // Use project images if available, otherwise fall back to general config images
  const seoImages = project?.seoImages && project.seoImages.length > 0
    ? project.seoImages.map(image => ({
        url: image.url,
        width: 1200,
        height: 630,
        alt: image.description ?? undefined,
      }))
    : generalConfig?.seoImages?.map(image => ({
        url: image.url,
        width: 1200,
        height: 630,
        alt: image.description ?? undefined,
      }));

  const url = `https://www.alexandra-leykauf.com/${slug}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "website",
      images: seoImages,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: seoImages?.map(img => img.url),
    },
  };
}
