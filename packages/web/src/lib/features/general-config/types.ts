import type { GeneralConfig as GeneralConfigType } from "@/lib/graphql/generated/graphql";

export type GeneralConfig = {
  id: string;
  __typename: GeneralConfigType["__typename"];
  activeColor?: string | undefined;
  detailsBackgroundColor?: string | undefined;
  googleAnalyticsCode?: string | undefined;
  hoverColor?: string | undefined;
  seoDescription?: string | undefined;
  seoImage?: string | undefined;
  seoTitle?: string | undefined;
};
