import type { Metadata } from "next";

import "./globals.css";
import "../styles/fonts.css";
import "../styles/variables.css";
import "../styles/base.css";
// import "../styles/legacy.clean.css";
import { getGeneralConfigData } from "@/lib/features/general-config";
import { QueryProvider } from "@/providers";
import layoutStyles from "@/styles/layout.module.css";

export const metadata: Metadata = {
  title: "Alexandra Leykauf",
  description: "Portfolio of Alexandra Leykauf",
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
        <QueryProvider>
          <div className={layoutStyles.container}>
            {children}
          </div>
        </QueryProvider>
      </body>
    </html>
  );
}
