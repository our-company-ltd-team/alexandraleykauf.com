import mediaPageStyles from "./media-page.module.css";

export default function MediaPageSkeleton() {
  return (
    <article className={mediaPageStyles.detailPage}>
      <header className={mediaPageStyles.header}>
      </header>
      <div className={(mediaPageStyles.loadingContainer)}>
        <div className={mediaPageStyles.loading}>Loading</div>
      </div>
      <div className={mediaPageStyles.bottom}>
      </div>
    </article>
  );
}
