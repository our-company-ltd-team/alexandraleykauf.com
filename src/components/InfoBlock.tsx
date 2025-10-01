"use client";

function buildInfoBlock(type: string, data: any){
  switch(type){
    case "textComponent":
      return <div key={data._id}>textComponent</div>
    case "imageComponent":
      return <div key={data._id}>imageComponent</div>
    case "videoComponent":
        return <div key={data._id}>videoComponent</div>
    default:
      return <div>Unknown Block</div>
  }
}

function buildInfoBlockList(Blocks: any){
  let blockList = []
  for (const block of Blocks.components) {
    blockList.push(buildInfoBlock(block._type, block))
  }   
  return blockList
}

export default function InfoBlock({ data }: { data: any }) {
    return (
        <div key={data._id}>
            <h2 onClick={() => console.log(data)} >{data.title}</h2>
            <p>{data.description}</p>
            {buildInfoBlockList(data)}
            
        </div>
    );
}