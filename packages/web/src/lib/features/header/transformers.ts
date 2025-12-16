import type { HeaderData } from "@/lib/features/header";
import type { GetHeaderQuery } from "@/lib/graphql/generated/graphql";

import { isNotNull } from "@/lib/graphql/type-utils";

export function transformHeader(data: GetHeaderQuery): HeaderData | null {
  const categories = data.categoryCollection?.items;
  if (!categories || categories.length === 0) {
    return null;
  }

  const categoryTypename = categories[0]?.__typename ?? "";

  return {
    categories: categories.filter(isNotNull).map(category => ({
      color: category.color ?? "",
      id: category.sys.id,
      showOnStartPage: category.showOnStartPage ?? false,
      showItemsInHomepage: category.showItemsInHomepage ?? false,
      slug: category.slug ?? "",
      title: category.title ?? "",
      typename: categoryTypename,
    })),
  };
}
