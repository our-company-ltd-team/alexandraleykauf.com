import { notFound } from "next/navigation";

import ProjectDetailPage from "@/components/project-detail-page/project-detail-page";
import { getProjectPanelBySlugData } from "@/lib/features/projects/api";

export default async function AssetPage({ params }: PageProps<"/[projectSlug]/[panelSlug]/[assetPosition]">) {
  const { projectSlug, panelSlug, assetPosition } = await params;
  const assetPositionInt = Number(assetPosition);

  const panel = await getProjectPanelBySlugData(panelSlug);
  const asset = panel?.type === "ImagesPanel" ? panel.images?.[assetPositionInt - 1] : panel?.videos?.[assetPositionInt - 1];

  if (!panel || !asset || Number.isNaN(assetPositionInt)) {
    return notFound();
  }

  const totalCount = panel.type === "ImagesPanel" ? panel.images?.length : panel.videos?.length;
  if (!totalCount) {
    return notFound();
  }

  const backHref = `/${projectSlug}`;
  const previousUrl = assetPositionInt - 1 < 1 ? `/${projectSlug}` : `/${projectSlug}/${panelSlug}/${assetPositionInt - 1}`;
  const nextUrl = assetPositionInt + 1 > totalCount ? `/${projectSlug}` : `/${projectSlug}/${panelSlug}/${assetPositionInt + 1}`;
  const currentIndex = assetPositionInt;

  return (
    <ProjectDetailPage
      backHref={backHref}
      asset={asset}
      previousUrl={previousUrl}
      nextUrl={nextUrl}
      currentIndex={currentIndex}
      totalCount={totalCount}
    />
  );
}
