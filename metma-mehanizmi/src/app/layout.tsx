import type { Metadata } from "next";
import { Sofia_Sans, Sofia_Sans_Condensed } from "next/font/google";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import "./globals.css";

const googleVerification = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;

const body = Sofia_Sans({
  variable: "--font-body",
  subsets: ["latin", "cyrillic"],
});

const display = Sofia_Sans_Condensed({
  variable: "--font-display-face",
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.shortName}`,
  },
  description: siteConfig.defaultDescription,
  applicationName: siteConfig.shortName,
  authors: [{ name: siteConfig.legalName, url: siteConfig.url }],
  creator: siteConfig.legalName,
  publisher: siteConfig.legalName,
  category: "Мебелни механизми",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: { canonical: siteConfig.url },
  openGraph: {
    type: "website",
    locale: siteConfig.ogLocale,
    url: siteConfig.url,
    siteName: siteConfig.legalName,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [{ url: siteConfig.ogImage, alt: siteConfig.defaultTitle }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [siteConfig.ogImage],
  },
  icons: { icon: "/favicon.ico" },
  ...(googleVerification ? { verification: { google: googleVerification } } : {}),
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${body.variable} ${display.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col bg-paper font-sans text-ink">
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-white focus:px-3 focus:py-2"
        >
          Към съдържанието
        </a>
        <Header />
        <div id="main" className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
