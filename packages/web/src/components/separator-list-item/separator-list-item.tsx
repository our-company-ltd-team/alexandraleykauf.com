import type { FC } from "react";

import styles from "./separator-list-item.module.css";

export const SeparatorListItem: FC = () => {
  return (
    <div className={styles.separator} />
  );
};

export default SeparatorListItem;
