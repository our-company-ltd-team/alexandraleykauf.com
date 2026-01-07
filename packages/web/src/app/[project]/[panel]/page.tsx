import { notFound, redirect, RedirectType } from "next/navigation";

import { TextPage } from "@/components";
import { getProjectPanelBySlugData } from "@/lib/features/projects/api";

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
