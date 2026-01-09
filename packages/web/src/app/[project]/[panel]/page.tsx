import type { Metadata } from "next";

import { notFound, redirect, RedirectType } from "next/navigation";

import { TextPage } from "@/components";
import { getGeneralConfigData } from "@/lib";
import { getProjectMetadataData, getProjectPanelBySlugData } from "@/lib/features/projects/api";

export async function generateMetadata({ params }: PageProps<"/[project]/[panel]">): Promise<Metadata> {
  const { project: slug, panel } = await params;

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

  const url = `https://www.alexandra-leykauf.com/${slug}/${panel}`;

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

export default async function PanelPage({ params }: PageProps<"/[project]/[panel]">) {
  const { project, panel } = await params;

  const panelData = await getProjectPanelBySlugData(panel);

  if (!panelData) {
    return notFound();
  }

  // If TextPage, render directly
  if (panelData.type === "TextPage") {
    const backHref = `/${project}`;
    return <TextPage textPage={panelData} backHref={backHref} />;
  }

  // For ImagesPanel and VideosPanel, redirect to first asset
  return redirect(`/${project}/${panel}/1`, RedirectType.replace);
}
