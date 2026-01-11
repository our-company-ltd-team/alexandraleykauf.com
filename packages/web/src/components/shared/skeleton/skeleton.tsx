import styles from "./skeleton.module.css";

export function Skeleton({ width = "100%", height = "1em", style }: { width?: string; height?: string; style?: React.CSSProperties }) {
  return <div className={styles.skeleton} aria-hidden="true" style={{ width, height, ...style }}></div>;
}
