import { redirect, RedirectType } from "next/navigation";

export default async function PanelPage({ params }: PageProps<"/[projectSlug]/[panelSlug]">) {
  const { projectSlug, panelSlug } = await params;

  return redirect(`/${projectSlug}/${panelSlug}/1`, RedirectType.replace);
};
