"use client";

import type { FC } from "react";

import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { HomepageContentItem } from "@/lib";
import type { Category } from "@/lib/features/header";

import { OpenedProjectsProvider } from "@/providers";
import layoutStyles from "@/styles/layout.module.css";

import { ContentList } from "../content-list";
import { Header } from "../header";

export type MainPageWrapperClientProps = {
  categories: Category[];
  contentItems: HomepageContentItem[];
};

export const MainPageWrapperClient: FC<MainPageWrapperClientProps> = ({ categories, contentItems }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoriesAlwaysActive = useMemo(
    () => categories.filter(c => c.showItemsInHomepage && !c.showOnStartPage),
    [categories],
  );
  const toggleableCategories = useMemo(
    () => categories.filter(category => category.showOnStartPage),
    [categories],
  );

  const [activeToggleableCategories, setActiveToggleableCategories] = useState<Category[]>(() => {
    const param = searchParams.get("categories");
    if (!param) {
      return categories.filter(category => category.showItemsInHomepage);
    }

    const slugs = new Set(param.split(","));
    return toggleableCategories.filter(c => slugs.has(c.slug));
  });

  const activeCategories = useMemo(
    () => [...categoriesAlwaysActive, ...activeToggleableCategories],
    [categoriesAlwaysActive, activeToggleableCategories],
  );

  const contentItemsToRender = useMemo(() => {
    return contentItems.filter(item => activeCategories.some(category => category.slug === item?.category?.slug));
  }, [contentItems, activeCategories]);

  const toggleCategory = (category: Category) => {
    setActiveToggleableCategories((prev) => {
      const isActive = prev.some(c => c.slug === category.slug);

      const next = isActive
        ? prev.filter(c => c.slug !== category.slug)
        : [...prev, category];

      const params = new URLSearchParams(searchParams.toString());

      if (next.length === 0) {
        params.delete("categories");
      }
      else {
        params.set(
          "categories",
          next.map(c => c.slug).join(","),
        );
      }

      router.push(`${pathname}?${params.toString()}`, { scroll: false });

      return next;
    });
  };

  useEffect(() => {
    const param = searchParams.get("categories");

    if (!param) {
      return;
    }

    const slugs = new Set(param?.split(",") ?? []);
    // TODO: Revisit this useEffect to see if it can be simplified.
    // eslint-disable-next-line react-hooks/set-state-in-effect, react-hooks-extra/no-direct-set-state-in-use-effect
    setActiveToggleableCategories(
      toggleableCategories.filter(c => slugs.has(c.slug)),
    );
  }, [searchParams, toggleableCategories]);

  return (
    <OpenedProjectsProvider>
      <Header
        categories={toggleableCategories}
        activeCategories={activeCategories.map(category => category.id)}
        toggleCategory={toggleCategory}
      />
      <ContentList items={contentItemsToRender} />
      <footer className={layoutStyles.footer}>
        <NextLink
          href="https://www.ourcompany.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Our Company Ltd. / © A.L. 2025
        </NextLink>
      </footer>
    </OpenedProjectsProvider>
  );
};
