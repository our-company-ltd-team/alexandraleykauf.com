import type { MetadataRoute } from "next";

import { REVALIDATION_TIME } from "@/lib/constants";
import { getSitemapData } from "@/lib/features/projects/api";

const BASE_URL = "https://www.alexandra-leykauf.com";

export const revalidate = REVALIDATION_TIME;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
//   const isPreview = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW;

  // Return empty sitemap in preview mode
  //   if (isPreview) {
  //     return [];
  //   }

  const projects = await getSitemapData();
  const entries: MetadataRoute.Sitemap = [];

  // Add homepage
  entries.push({
    url: BASE_URL,
    lastModified: new Date(),
    changeFrequency: "always",
    priority: 1.0,
  });

  // Process each project
  for (const project of projects) {
    if (!project?.slug)
      continue;

    const projectRows = project.projectRowsCollection?.items ?? [];

    // Skip projects without rows
    if (projectRows.length === 0)
      continue;

    const projectSlug = project.slug;
    const projectPublishedAt = project.sys?.publishedAt
      ? new Date(project.sys.publishedAt)
      : undefined;

    // Add project page
    entries.push({
      url: `${BASE_URL}/${projectSlug}`,
      lastModified: projectPublishedAt,
      changeFrequency: "monthly",
      priority: 0.8,
    });

    // Process project rows and panels
    for (const projectRow of projectRows) {
      if (!projectRow)
        continue;

      const panels = projectRow.rowCollection?.items ?? [];
      for (const panel of panels) {
        if (!panel)
          continue;

        if (panel.__typename !== "TextPage" && panel.__typename !== "ImagesPanel" && panel.__typename !== "VideosPanel") {
          continue;
        }

        const panelSlug = panel.slug;
        if (!panelSlug)
          continue;

        const panelPublishedAt = panel.sys?.publishedAt
          ? new Date(panel.sys.publishedAt)
          : projectPublishedAt;

        // Handle different panel types
        if (panel.__typename === "TextPage") {
          // TextPage panels have their own route
          entries.push({
            url: `${BASE_URL}/${projectSlug}/${panelSlug}`,
            lastModified: panelPublishedAt,
            changeFrequency: "monthly",
            priority: 0.6,
          });
        }
        else if (panel.__typename === "ImagesPanel") {
          // ImagesPanel: add panel route and individual asset routes
          const imageCount = panel.imagesCollection?.total ?? 0;

          if (imageCount > 0) {
            // Add asset pages (index starts at 1)
            for (let index = 1; index <= imageCount; index++) {
              entries.push({
                url: `${BASE_URL}/${projectSlug}/${panelSlug}/${index}`,
                lastModified: panelPublishedAt,
                changeFrequency: "monthly",
                priority: 0.6,
              });
            }
          }
        }
        else if (panel.__typename === "VideosPanel") {
          // VideosPanel: add panel route and individual asset routes
          const videoCount = panel.videosCollection?.total ?? 0;

          if (videoCount > 0) {
            // Add asset pages (index starts at 1)
            for (let index = 1; index <= videoCount; index++) {
              entries.push({
                url: `${BASE_URL}/${projectSlug}/${panelSlug}/${index}`,
                lastModified: panelPublishedAt,
                changeFrequency: "monthly",
                priority: 0.6,
              });
            }
          }
        }
      }
    }
  }

  return entries;
}
