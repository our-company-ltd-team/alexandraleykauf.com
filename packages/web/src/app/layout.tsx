import "./globals.css";
import "../styles/fonts.css";
import "../styles/variables.css";
import "../styles/base.css";
import type { Metadata } from "next";

import { WebVitals } from "@/components/shared/web-vitals";
import { getGeneralConfigData } from "@/lib/features/general-config";
import layoutStyles from "@/styles/layout.module.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.alexandra-leykauf.com"),
  robots: {
    index: true,
    follow: true,
    googleBot: {
      "index": true,
      "follow": true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const generalConfigData = await getGeneralConfigData();

  const hoverColor = generalConfigData?.hoverColor ?? "";
  const activeColor = generalConfigData?.activeColor ?? "";
  const detailsBackgroundColor = generalConfigData?.detailsBackgroundColor ?? "";

  return (
    <html lang="en">
      <head>
        <style
          precedence="default"
          href="theme-colors"
          // eslint-disable-next-line react-dom/no-dangerously-set-innerhtml
          dangerouslySetInnerHTML={{
            __html: `:root {
              --hover-color: ${hoverColor};
              --active-color: ${activeColor};
              --details-background-color: ${detailsBackgroundColor};
            }`,
          }}
        />
      </head>
      <body>
        <div className={layoutStyles.container}>
          {children}
        </div>
        <WebVitals />
      </body>
    </html>
  );
}
