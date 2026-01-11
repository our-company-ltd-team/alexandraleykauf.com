import { Skeleton } from "@/components/shared/skeleton";

import mediaPageStyles from "./media-page.module.css";

export default function MediaPageSkeleton() {
  return (
    <article className={mediaPageStyles.detailPage}>
      <header className={mediaPageStyles.header}>
      </header>
      <div className={mediaPageStyles.assetContainer}>
        <Skeleton width="100%" height="100%" />
      </div>
      <div className={mediaPageStyles.bottom}>
        <nav className={mediaPageStyles.nav}>
          <Skeleton width="100px" />
        </nav>
        <div className={mediaPageStyles.legend}>
          <Skeleton />
        </div>
      </div>
    </article>
  );
}
