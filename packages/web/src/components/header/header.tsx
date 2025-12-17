import type { FC } from "react";

import clsx from "clsx";
import NextLink from "next/link";

import type { Category } from "@/lib";

import headerStyles from "./header.module.css";

export type HeaderProps = {
  categories: Category[];
  toggleCategory: (category: Category) => void;
  activeCategories: string[];
};

export const Header: FC<HeaderProps> = ({ categories, toggleCategory, activeCategories }) => {
  return (
    <header className={headerStyles.header}>
      <h1 className={headerStyles.title}>
        <NextLink href="/">ALEXANDRA LEYKAUF</NextLink>
      </h1>
      <ul className={headerStyles.categoriesWrapper}>
        {categories.map(category => (
          <li
            key={category.id}
            className={clsx(headerStyles.category, activeCategories.includes(category.id) && headerStyles.categoryActive)}
            style={{ "--category-color": category.color } as React.CSSProperties}
            onClick={() => toggleCategory(category)}
          >
            {category.title}
          </li>
        ))}
      </ul>
    </header>
  );
};
