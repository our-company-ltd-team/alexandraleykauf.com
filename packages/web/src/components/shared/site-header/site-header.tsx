import type { FC } from "react";

import clsx from "clsx";
import NextLink from "next/link";

import type { Category } from "@/lib/features/header/types";

import siteHeaderStyles from "./site-header.module.css";

export type SiteHeaderProps = {
  categories: Category[];
  toggleCategory: (category: Category) => void;
  activeCategories: string[];
};

export const SiteHeader: FC<SiteHeaderProps> = ({ categories, toggleCategory, activeCategories }) => {
  return (
    <header className={siteHeaderStyles.header}>
      <h1 className={siteHeaderStyles.title}>
        <NextLink href="/">ALEXANDRA LEYKAUF</NextLink>
      </h1>
      <ul className={siteHeaderStyles.categoriesWrapper}>
        {categories.map(category => (
          <li
            key={category.id}

          >
            <button
              type="button"
              className={clsx(siteHeaderStyles.category, activeCategories.includes(category.id) && siteHeaderStyles.categoryActive)}
              onClick={() => toggleCategory(category)}
              aria-pressed={activeCategories.includes(category.id)}
              style={{ "--category-color": category.color } as React.CSSProperties}
            >
              {category.title}
            </button>
          </li>
        ))}
      </ul>
    </header>
  );
};
