import type { Metadata } from "next";

import { notFound } from "next/navigation";

import { MediaPage } from "@/components";
import { getGeneralConfigData } from "@/lib/features/general-config/api";
import { getProjectMetadataData, getProjectPanelBySlugData } from "@/lib/features/projects/api";

export default async function AssetPage({ params }: PageProps<"/[project]/[panel]/[index]">) {
  const { project, panel, index } = await params;
  const assetIndexInt = Number(index);

  const panelData = await getProjectPanelBySlugData(panel);

  // TextPage panels should not reach this route (they render directly)
  if (!panelData || panelData.type === "TextPage" || Number.isNaN(assetIndexInt)) {
    return notFound();
  }

  const asset = panelData.type === "ImagesPanel" ? panelData.images?.[assetIndexInt - 1] : panelData.videos?.[assetIndexInt - 1];
  if (!asset) {
    return notFound();
  }

  const totalCount = panelData.type === "ImagesPanel" ? panelData.images?.length : panelData.videos?.length;
  if (!totalCount) {
    return notFound();
  }

  const backHref = `/${project}`;
  const previousUrl = assetIndexInt - 1 < 1 ? `/${project}` : `/${project}/${panel}/${assetIndexInt - 1}`;
  const nextUrl = assetIndexInt + 1 > totalCount ? `/${project}` : `/${project}/${panel}/${assetIndexInt + 1}`;
  const currentIndex = assetIndexInt;

  return (
    <MediaPage
      backHref={backHref}
      asset={asset}
      previousUrl={previousUrl}
      nextUrl={nextUrl}
      currentIndex={currentIndex}
      totalCount={totalCount}
    />
  );
}

export async function generateMetadata({ params }: PageProps<"/[project]/[panel]/[index]">): Promise<Metadata> {
  const { project: slug, panel, index } = await params;

  const [projectMetadata, generalConfigData] = await Promise.allSettled([
    getProjectMetadataData(slug),
    getGeneralConfigData(),
  ]);

  const project = projectMetadata.status === "fulfilled" ? projectMetadata.value : null;
  const generalConfig = generalConfigData.status === "fulfilled" ? generalConfigData.value : null;

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

  const url = `https://www.alexandra-leykauf.com/${slug}/${panel}/${index}`;

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
    robots: {
      index: false,
      follow: true,
    },
  };
}
