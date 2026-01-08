import type { GeneralConfig } from "@/lib/features/general-config";
import type { GetGeneralConfigQuery } from "@/lib/graphql/generated/graphql";

export function transformGeneralConfig(data: GetGeneralConfigQuery): GeneralConfig | null {
  const generalConfig = data.generalConfigCollection?.items?.[0];
  if (!generalConfig) {
    return null;
  }

  return {
    id: generalConfig.sys.id,
    activeColor: generalConfig.activeColor ?? undefined,
    detailsBackgroundColor: generalConfig.detailsBackgroundColor ?? undefined,
    googleAnalyticsCode: generalConfig.googleAnalyticsCode ?? undefined,
    hoverColor: generalConfig.hoverColor ?? undefined,
    seoDescription: generalConfig.seoDescription ?? undefined,
    seoImage: generalConfig.seoImage?.url ?? undefined,
    seoImageWidth: generalConfig.seoImage?.width ?? undefined,
    seoImageHeight: generalConfig.seoImage?.height ?? undefined,
    seoTitle: generalConfig.seoTitle ?? undefined,
  };
}
