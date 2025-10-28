import Link from "next/link";

export default async function ImagePage({
  params,

}: {
  params: { project: string; image: string };
}) {
    const { project: projectId, image } = await params;



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