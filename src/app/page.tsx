import {MockProjects} from "@/MockData/fake_data";
import LinkBlock from "@/components/LinkBlock";
import ProjectBlock from "@/components/ProjectBlock";
import SeparatorBlock from "@/components/SeparatorBlock";
import Link from "next/link";
import {Project, ProjectLink, ProjectItem} from "@/types";

function buildBlock(type: string, data: Project){
  switch(type){
    case "link":
      return <LinkBlock key={data._id} data={data as ProjectLink} />
    case "project":
      return <ProjectBlock key={data._id} data={data as ProjectItem}  />
    case "separator":
      return <SeparatorBlock key={data._id}  />
    default:
      return <div>Unknown Block</div>
  }
}

function buildBlockList(Blocks: Project[]){
  let blockList = []
  for (const block of Blocks) {
    blockList.push(buildBlock(block._type, block))
  }   
  return blockList
}

export default function Home() {

  return (
    <div >
      <header className="clearfix main-header">
        <h1 className="main-title">
          <Link href="/">ALEXANDRA LEYKAUF</Link>
        </h1>

      </header>
      <section id="list" className="list">
        <ul className="list" key={"list-ul"}>
          {buildBlockList(MockProjects)}
        </ul>
      </section>
      <footer >
        <Link
          href="https://www.ourcompany.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Our Company Ltd. / © A.L. 2025
        </Link>
 
      </footer>
    </div>
  );
}
