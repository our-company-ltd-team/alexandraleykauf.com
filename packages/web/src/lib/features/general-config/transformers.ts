import type { GeneralConfig } from "@/lib/features/general-config";
import type { GetGeneralConfigQuery } from "@/lib/graphql/generated/graphql";

import { isNotNull } from "@/lib/graphql";

export function transformGeneralConfig(data: GetGeneralConfigQuery): GeneralConfig | null {
  const generalConfig = data.generalConfigCollection?.items?.[0];
  if (!generalConfig) {
    return null;
  }

  const seoImages = generalConfig.seoImagesCollection?.items.map((image) => {
    if (image === null || !image.url) {
      return null;
    }

    return {
      id: image.sys.id,
      url: image.url,
      width: image.width ?? 0,
      height: image.height ?? 0,
      description: image.description ?? undefined,
    };
  }).filter(isNotNull);

  return {
    id: generalConfig.sys.id,
    activeColor: generalConfig.activeColor ?? undefined,
    detailsBackgroundColor: generalConfig.detailsBackgroundColor ?? undefined,
    googleAnalyticsCode: generalConfig.googleAnalyticsCode ?? undefined,
    hoverColor: generalConfig.hoverColor ?? undefined,
    seoDescription: generalConfig.seoDescription ?? undefined,
    seoImages,
    seoTitle: generalConfig.seoTitle ?? "Alexandra Leykauf",
  };
}
