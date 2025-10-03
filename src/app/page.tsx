import {MockProjects} from "@/MockData/fake_data";
import LinkBlock from "@/components/LinkBlock";
import InfoBlock from "@/components/InfoBlock";
import EmptyBlock from "@/components/EmptyBlock";



function buildBlock(type: string, data: any){
  switch(type){
    case "link":
      return <LinkBlock key={data._id} data={data} />
    case "project":
      return <InfoBlock key={data._id} data={data} />
    case "seperator":
      return <EmptyBlock key={data._id}  />
    default:
      return <div>Unknown Block</div>
  }
}

function buildBlockList(Blocks: any){
  let blockList = []
  for (const block of Blocks) {
    blockList.push(buildBlock(block._type, block))
  }   
  return blockList
}

export default function Home() {
  return (
    <div id="container" key={"container"}>
      <header className="clearfix main-header">
        <h1 className="main-title">
          <a href="/">ALEXANDRA LEYKAUF</a>
        </h1>

      </header>
      <section id="list" className="list">
        <ul className="list" key={"list-ul"}>
          {buildBlockList(MockProjects)}
        </ul>
      </section>
      <footer >
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
