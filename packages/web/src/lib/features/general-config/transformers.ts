import type { GeneralConfig } from "@/lib/features/general-config";
import type { GetGeneralConfigQuery } from "@/lib/graphql/generated/graphql";

export function transformGeneralConfig(data: GetGeneralConfigQuery): GeneralConfig | null {
  const generalConfig = data.generalConfigCollection?.items?.[0];
  if (!generalConfig) {
    return null;
  }

  return {
    id: generalConfig.sys.id,
    __typename: generalConfig.__typename,
    activeColor: generalConfig.activeColor ?? "",
    detailsBackgroundColor: generalConfig.detailsBackgroundColor ?? "",
    googleAnalyticsCode: generalConfig.googleAnalyticsCode ?? "",
    hoverColor: generalConfig.hoverColor ?? "",
    seoDescription: generalConfig.seoDescription ?? "",
    seoImage: generalConfig.seoImage?.url ?? "",
    seoTitle: generalConfig.seoTitle ?? "",
  };
}
