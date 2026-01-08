export type SeoImage = {
  description: string | undefined;
  height: number;
  id: string;
  url: string;
  width: number;
};

export type GeneralConfig = {
  seoImages: SeoImage[] | undefined;
  activeColor: string | undefined;
  detailsBackgroundColor: string | undefined;
  googleAnalyticsCode: string | undefined;
  hoverColor: string | undefined;
  id: string;
  seoDescription: string | undefined;
  seoTitle: string;
};
