import Link from "next/link";

import { getHomePageData } from "@/lib";

export default async function Page() {
  const { projectCollection } = await getHomePageData();

  // eslint-disable-next-line no-console
  console.info(projectCollection);

  return (
    <div>
      <header className="clearfix main-header">
        <h1 className="main-title">
          <Link href="/">ALEXANDRA LEYKAUF</Link>
        </h1>

      </header>
      <section id="list" className="list">
        <ul className="list" key="list-ul">
          {/* {buildBlockList(MockProjects)} */}
        </ul>
      </section>
      <footer>
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
