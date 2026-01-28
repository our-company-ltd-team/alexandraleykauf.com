import styles from "./close-icon.module.css";

export function CloseIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      data-name="Layer 2"
      viewBox="0 0 30 30"
      className={styles.closeIcon}
    >
      <path
        d="M16.43 15 29.7 1.73c.4-.4.4-1.04 0-1.43s-1.04-.4-1.43 0L15 13.57 1.73.3C1.33-.1.69-.1.3.3s-.4 1.03 0 1.43L13.57 15 .3 28.27c-.4.4-.4 1.04 0 1.43a1.015 1.015 0 0 0 1.44 0l13.27-13.27L28.28 29.7a1.015 1.015 0 0 0 1.44 0c.4-.4.4-1.04 0-1.43L16.45 15Z"
        style={{ fill: "#929292" }}
      />
    </svg>
  );
}
