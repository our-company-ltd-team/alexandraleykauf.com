import type { Metadata } from "next";

import "./globals.css";
import "../styles/fonts.css";
import "../styles/variables.css";
import "../styles/base.css";
import "../styles/legacy.clean.css";
import { MockGeneralConfig } from "@/MockData/fake-data";
import { QueryProvider } from "@/providers";
import layoutStyles from "@/styles/layout.module.css";

export const metadata: Metadata = {
  title: "Alexandra Leykauf",
  description: "Portfolio of Alexandra Leykauf",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const smallPageIcon = MockGeneralConfig.smallPageIcon;

  return (
    <html lang="en">
      <head>
        <link rel="icon" href={smallPageIcon?.asset._ref} sizes="any" />
        <style
          precedence="default"
          href="theme-colors"
          dangerouslySetInnerHTML={{
            __html: `:root {
              --hover-color: ${MockGeneralConfig.hoverColor};
              --active-color: ${MockGeneralConfig.activeColor};
              --details-background-color: ${MockGeneralConfig.detailsBackgroundColor};
            }`,
          }}
        />
      </head>
      <body id="body">
        <QueryProvider>
          <div className={layoutStyles.container}>
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
