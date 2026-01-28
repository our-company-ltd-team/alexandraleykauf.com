"use client";

import NextLink from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import type { Category } from "@/lib/features/header/types";
import type { HomepageContentItem } from "@/lib/features/home/types";

import { SiteHeader } from "@/components/shared/site-header";
import { useKeyboardNavigation, useOpenedProjects } from "@/hooks";
import { OpenedProjectsProvider } from "@/providers";
import layoutStyles from "@/styles/layout.module.css";

import { HomepageContentList } from "../homepage-content-list";

export type HomepageShellProps = {
  categories: Category[];
  contentItems: HomepageContentItem[];
  initialSlug?: string;
};

export function HomepageShell({ categories, contentItems, initialSlug }: HomepageShellProps) {
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

  const activeToggleableCategorySlugs = useMemo(() => {
    return activeToggleableCategories
      .map(c => c.slug)
      .sort()
      .join(",");
  }, [activeToggleableCategories]);

  // Keep the URL in sync with the selected categories.
  // Important: do NOT call router.push inside setState, otherwise React can warn about updating Router during render.
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.get("categories") ?? "";

    if (activeToggleableCategorySlugs.length === 0) {
      params.delete("categories");
    }
    else {
      params.set("categories", activeToggleableCategorySlugs);
    }

    const next = params.get("categories") ?? "";
    if (current === next) {
      return;
    }

    const qs = params.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  }, [activeToggleableCategorySlugs, pathname, router, searchParams]);

  const activeCategories = useMemo(
    () => [...categoriesAlwaysActive, ...activeToggleableCategories],
    [categoriesAlwaysActive, activeToggleableCategories],
  );

  const contentItemsToRender = useMemo(() => {
    return contentItems.filter(item => activeCategories.some(category => category.slug === item.categorySlug));
  }, [contentItems, activeCategories]);

  // Extract visible project slugs for keyboard navigation (only projects with rows)
  const visibleProjectSlugs = useMemo(() =>
    contentItemsToRender
      .filter((item): item is Extract<HomepageContentItem, { type: "Project" }> =>
        item.type === "Project" && item.hasRows)
      .sort((a, b) => {
        const dateA = new Date(a.year ?? "");
        const dateB = new Date(b.year ?? "");

        // 1. Primary sort: Year descending (Newest first)
        const yearDiff = dateB.getFullYear() - dateA.getFullYear();
        if (yearDiff !== 0) {
          return yearDiff;
        }

        // 2. Secondary sort: Full date ascending (Oldest to newest within that year)
        // Use getTime() to compare the full date including month and day
        return dateA.getTime() - dateB.getTime();
      })
      .map(item => item.slug), [contentItemsToRender]);

  const toggleCategory = (category: Category) => {
    setActiveToggleableCategories((prev) => {
      const isActive = prev.some(c => c.slug === category.slug);

      const next = isActive
        ? prev.filter(c => c.slug !== category.slug)
        : [...prev, category];

      return next;
    });
  };

  return (
    <OpenedProjectsProvider initialSlug={initialSlug}>
      <HomepageShellContent
        toggleableCategories={toggleableCategories}
        activeCategories={activeCategories}
        toggleCategory={toggleCategory}
        contentItemsToRender={contentItemsToRender}
        visibleProjectSlugs={visibleProjectSlugs}
      />
    </OpenedProjectsProvider>
  );
};

// Inner component that has access to OpenedProjectsContext
function HomepageShellContent({
  toggleableCategories,
  activeCategories,
  toggleCategory,
  contentItemsToRender,
  visibleProjectSlugs,
}: {
  toggleableCategories: Category[];
  activeCategories: Category[];
  toggleCategory: (category: Category) => void;
  contentItemsToRender: HomepageContentItem[];
  visibleProjectSlugs: string[];
}) {
  const { navigateToNext, navigateToPrevious, setVisibleProjectSlugs } = useOpenedProjects();

  // Update visible project slugs in context when they change
  useEffect(() => {
    setVisibleProjectSlugs(visibleProjectSlugs);
  }, [visibleProjectSlugs, setVisibleProjectSlugs]);

  // Wire up keyboard navigation
  useKeyboardNavigation({
    onRight: navigateToNext,
    onLeft: navigateToPrevious,
    onUp: navigateToPrevious,
    onDown: navigateToNext,
  });

  return (
    <>
      <SiteHeader
        categories={toggleableCategories}
        activeCategories={activeCategories.map(category => category.id)}
        toggleCategory={toggleCategory}
      />
      <main id="main-content">
        <HomepageContentList items={contentItemsToRender} />
      </main>
      <footer className={layoutStyles.footer}>
        <NextLink
          href="https://www.ourcompany.ch/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Our Company Ltd. / © A.L. 2025
        </NextLink>
      </footer>
    </>
  );
}
