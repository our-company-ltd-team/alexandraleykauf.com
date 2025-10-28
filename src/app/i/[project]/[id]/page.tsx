import { MockProjects } from "@/MockData/fake_data";
import Link from "next/link";

export default async function ImagePage({
  params,

}: {
  params: { project: string; id: string };
}) {
    const { project: projectId, id } = await params;



    const backHref = `/?open=${projectId}`;
    return (
        <div id="container">
            <article className="detail-page">
                <header className="clearfix">
                    <h1 className="hidden"></h1>
                    <Link href={backHref} className="back">
                        zurück
                    </Link>
                </header>
                <figure>

                </figure>
                <div className="bottom">
                    <nav></nav>
                </div>
            </article>
        </div>
    );
}