import NextLink from "next/link";

import type { ContentItem } from "@/lib/features/home";
import type { Link, Project } from "@/lib/graphql/generated/graphql";

import LinkBlock from "@/components/link-block";
import ProjectBlock from "@/components/project-block";
import SeparatorBlock from "@/components/separator-block";
import { getHomePageData } from "@/lib";
import { getCollectionItems, getFirstItem, isNotNull } from "@/lib/graphql/type-utils";

// =============================================================================
// Block Building
// =============================================================================

/**
 * Builds a React element for a single content item based on its __typename.
 *
 * With fragmentMasking: false, sys.id is directly accessible on the type.
 * Components expect full schema types, so we cast to satisfy TypeScript.
 */
function buildBlock(block: ContentItem) {
  switch (block.__typename) {
    case "Link":
      return <LinkBlock key={block.sys.id} data={block as Link} />;
    case "Project":
      return <ProjectBlock key={block.sys.id} data={block as Project} />;
    case "Separator":
      return <SeparatorBlock key={block.sys.id} />;
    default:
      return null;
  }
}

// =============================================================================
// Page Component
// =============================================================================

export default async function Page() {
  const { homepageCollection } = await getHomePageData();
  const homepage = getFirstItem(homepageCollection);
  const contentItems = getCollectionItems(homepage?.contentCollection);

  return (
    <div>
      <header className="clearfix main-header">
        <h1 className="main-title">
          <NextLink href="/">ALEXANDRA LEYKAUF</NextLink>
        </h1>
      </header>
      <section id="list" className="list">
        <ul className="list" key="list-ul">
          {contentItems.filter(isNotNull).map(buildBlock)}
        </ul>
      </section>
      <footer>
        <NextLink
          href="https://www.ourcompany.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Our Company Ltd. / © A.L. 2025
        </NextLink>
      </footer>
    </div>
  );
}
