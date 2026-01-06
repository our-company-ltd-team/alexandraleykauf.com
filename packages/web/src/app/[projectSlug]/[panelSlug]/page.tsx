import { notFound, redirect, RedirectType } from "next/navigation";

import { TextPageDetail } from "@/components/text-page-detail";
import { getProjectPanelBySlugData } from "@/lib/features/projects/api";

export default async function PanelPage({ params }: PageProps<"/[projectSlug]/[panelSlug]">) {
  const { projectSlug, panelSlug } = await params;

  const panel = await getProjectPanelBySlugData(panelSlug);

  if (!panel) {
    return notFound();
  }

  // If TextPage, render directly
  if (panel.type === "TextPage") {
    const backHref = `/${projectSlug}`;
    return <TextPageDetail textPage={panel} backHref={backHref} />;
  }

  // For ImagesPanel and VideosPanel, redirect to first asset
  return redirect(`/${projectSlug}/${panelSlug}/1`, RedirectType.replace);
}
