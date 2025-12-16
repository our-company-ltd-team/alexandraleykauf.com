import type { FC } from "react";

import NextLink from "next/link";

import type { Category } from "@/lib";

import headerStyles from "./header.module.css";

export const Header: FC<{ categories: Category[] }> = ({ categories }) => {
  return (
    <header className={headerStyles.header}>
      <h1 className={headerStyles.title}>
        <NextLink href="/">ALEXANDRA LEYKAUF</NextLink>
      </h1>
      <ul className={headerStyles.categoriesWrapper}>
        {categories.map(category => (
          <li
            key={category.id}
            className={headerStyles.category}
            style={{ "--category-color": category.color } as React.CSSProperties}
          >
            {category.title}
          </li>
        ))}
      </ul>
    </header>
  );
};
