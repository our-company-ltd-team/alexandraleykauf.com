import {MockBlocks} from "@/MockData/fake_data";
import ContactBlock from "@/components/ContactBlock";
import InfoBlock from "@/components/InfoBlock";
import EmptyBlock from "@/components/EmptyBlock";



function buildBlock(type: string, data: any){
  switch(type){
    case "contact":
      return <ContactBlock key={data._id} data={data} />
    case "info":
      return <InfoBlock key={data._id} data={data} />
    case "empty":
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
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <header className="row-start-1">
        <h1 className="text-4xl font-bold text-center sm:text-left">
          Alexandra Leykauf
        </h1>

      </header>
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        {buildBlockList(MockBlocks)}
      <a href="/text">Text</a>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
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
