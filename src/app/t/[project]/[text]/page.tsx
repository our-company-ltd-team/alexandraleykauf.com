import { MockProjects } from "@/MockData/fake_data";
import Link from "next/link";
import type { TextBlock as TextBlockType, Paragraph, ProjectItem } from "@/types";
export default async function TextPage({
  params,

}: {
  params: { project: string; text: string };
}) {
  const { project: projectId, text } = await params;
  const project = MockProjects.find(p => p._id === projectId && p._type === "project") as ProjectItem | undefined;

  if (!project) return <div>Project not found</div>;
  
  // Find the text block in paragraphs
  let textBlock = null;
  for (const para of project.paragraphs || []) {
    textBlock = para.content?.find((c: any) =>
      (c._type === "text" || c._type === "textPage") && c._key === text
    ) as TextBlockType;
    if (textBlock) break;
  }

  if (!textBlock) return <div>Text page not found</div>;

  // Build back URL with preserved open state and hash for scroll
  const backHref = `/?open=${projectId}`;


  return (
    <div id="container">
      <article className="detail-page">
        <header className="clearfix main-header">
          {textBlock.title && <h2 className="hidden">{textBlock.title}</h2>}
          <Link href={backHref} className="back">
            zurück
          </Link>
        </header>

        <div className="text-content" dangerouslySetInnerHTML={{ __html: textBlock.text || "" }} />
      </article>
    </div>
  );
}