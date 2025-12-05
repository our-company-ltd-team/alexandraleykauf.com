import clsx from "clsx";
import Link from "next/link";

import detailStyles from "@/styles/detail-page.module.css";

export default async function ImagePage({
  params,
}: {
  params: { project: string; id: string };
}) {
  const { project: projectId } = await params;

  const backHref = `/?open=${projectId}`;
  return (
    <div>
      <article className={detailStyles.detailPage}>
        <header className={clsx(detailStyles.header, "clearfix")}>
          <h1 className={clsx(detailStyles.title, "hidden")} />
          <Link href={backHref} className={detailStyles.back}>
            zurück
          </Link>
        </header>
        <figure className={detailStyles.figure}>
          {/* Image content */}
        </figure>
        <div className={detailStyles.bottom}>
          <nav className={detailStyles.nav}>
            {/* Navigation */}
          </nav>
        </div>
      </article>
    </div>
  );
}
