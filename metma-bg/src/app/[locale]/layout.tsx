import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CookieBar } from "@/components/CookieBar";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import { LocaleProvider } from "@/components/LocaleProvider";
import { getMessages } from "@/i18n/messages";
import { isLocale, localeMeta, localePath, locales, type Locale } from "@/lib/i18n";
import { absoluteUrl, languageAlternates, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: raw } = await params;
  const locale: Locale = isLocale(raw) ? raw : "bg";
  const copy = getMessages(locale).meta;
  const canonical = absoluteUrl(localePath(locale, "/"));

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: copy.title,
      template: `%s | ${siteConfig.shortName}`,
    },
    description: copy.description,
    applicationName: siteConfig.shortName,
    authors: [{ name: siteConfig.name, url: siteConfig.url }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    category: copy.category,
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
    alternates: {
      canonical,
      languages: languageAlternates("/"),
    },
    openGraph: {
      type: "website",
      locale: localeMeta[locale].og,
      url: canonical,
      siteName: siteConfig.name,
      title: copy.title,
      description: copy.description,
      images: [{ url: siteConfig.ogImage, alt: copy.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [siteConfig.ogImage],
    },
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png" }],
      apple: "/favicon.png",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  if (!isLocale(raw)) notFound();

  return (
    <LocaleProvider locale={raw}>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.lang=${JSON.stringify(localeMeta[raw].htmlLang)}`,
        }}
      />
      <JsonLd data={[organizationJsonLd(), websiteJsonLd(raw)]} />
      <div className="relative z-10 flex min-h-full flex-1 flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer locale={raw} />
        <CookieBar />
      </div>
    </LocaleProvider>
  );
}
