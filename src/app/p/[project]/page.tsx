import {MockProjects} from "@/MockData/fake_data";
import ProjectBlock from "@/components/ProjectBlock";
import LinkBlock from "@/components/LinkBlock";
import SeparatorBlock from "@/components/SeparatorBlock";
import Link from "next/link";

function getSlug(item: { _id?: string; title?: string }) {
  if (item.title) {
    return item.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '');
  }
  return item._id || '';
}

function buildBlock(type: string, data: any, expandedProjectId?: string){
  const isExpanded = data._id === expandedProjectId;
  
  switch(type){
    case "link":
      return <LinkBlock key={data._id} data={data} />
    case "project":
      return <ProjectBlock key={data._id} data={data} isExpanded={isExpanded} />
    case "separator":
      return <SeparatorBlock key={data._id}  />
    default:
      return <div key={data._id}>Unknown Block</div>
  }
}

export default function ProjectDetailPage({ params }: { params: { project: string } }) {
  // Find project by slug or ID
  const project = MockProjects.find(p => 
    p._type === "project" && (
      p._id === params.project || 
      getSlug(p) === params.project
    )
  );

  if (!project || project._type !== "project") {
    return (
      <div id="container">
        <header className="clearfix main-header">
          <h1 className="main-title">
            <Link href="/">ALEXANDRA LEYKAUF</Link>
          </h1>
        </header>
        <div>Project not found</div>
      </div>
    );
  }

  return (
    <div id="container">
      <header className="clearfix main-header">
        <h1 className="main-title">
          <Link href="/">ALEXANDRA LEYKAUF</Link>
        </h1>
      </header>
      <section id="list" className="list">
        <ul className="list">
          {MockProjects.map(block => buildBlock(block._type, block, project._id))}
        </ul>
      </section>
      <footer>
        <a
          href="https://www.ourcompany.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Our Company Ltd. / © A.L. 2025
        </a>
      </footer>
    </div>
  );
}

export async function generateStaticParams() {
  return MockProjects
    .filter(p => p._type === "project")
    .map(p => ({
      project: getSlug(p)
    }));
}
