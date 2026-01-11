import styles from "./separator-entry.module.css";

export function SeparatorEntry() {
  return (
    <hr className={styles.separator} aria-hidden="true" />
  );
};

export default SeparatorEntry;
