import type { MetadataRoute } from "next";

import { env } from "@/env";

export default function robots(): MetadataRoute.Robots {
  const isPreview = env.NEXT_PUBLIC_CONTENTFUL_IS_PREVIEW;

  if (isPreview) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api", "/preview"],
    },
    sitemap: "https://www.alexandra-leykauf.com/sitemap.xml",
  };
}
