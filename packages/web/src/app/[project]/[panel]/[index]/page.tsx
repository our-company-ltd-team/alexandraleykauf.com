import { notFound } from "next/navigation";

import { MediaPage } from "@/components";
import { getProjectPanelBySlugData } from "@/lib/features/projects/api";

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
