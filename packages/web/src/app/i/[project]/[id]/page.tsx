import Link from "next/link";

export default async function ImagePage({
  params,

}: {
  params: { project: string; id: string };
}) {
  const { project: projectId } = await params;

  const backHref = `/?open=${projectId}`;
  return (
    <div>
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
