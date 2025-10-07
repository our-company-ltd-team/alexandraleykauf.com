import {MockProjects} from "@/MockData/fake_data";
import Link from "next/link";

export default async function TextPage({ params }: { params: { project: string; text: string } }) {
  const project = MockProjects.find(p => p._id === params.project && p._type === "project");
  
  if (!project) return <div>Project not found</div>;

  // Find the text block in paragraphs
  let textBlock = null;
  const {text } = await params;
  for (const para of project.paragraphs || []) {
    textBlock = para.content?.find((c: any) => 
      (c._type === "text" || c._type === "textPage") && c._key === text
    );
    if (textBlock) break;
  }

  if (!textBlock) return <div>Text page not found</div>;

  return (
    <div id="container">
      <header className="clearfix main-header">
        <h1 className="main-title">
          <Link href="/">ALEXANDRA LEYKAUF</Link>
        </h1>
      </header>
      <article className="text-page-detail">
        {textBlock.title && <h2>{textBlock.title}</h2>}
        <div dangerouslySetInnerHTML={{ __html: textBlock.text || "" }} />
      </article>
    </div>
  );
}