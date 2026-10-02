import type { Metadata } from "next";
import { defaultLocale, localeMeta, localePath, locales, type Locale } from "@/lib/i18n";
import { siteConfig } from "@/lib/site";

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

export function languageAlternates(path: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of locales) {
    languages[localeMeta[locale].hreflang] = absoluteUrl(localePath(locale, path));
  }
  languages["x-default"] = absoluteUrl(localePath(defaultLocale, path));
  return languages;
}

type PageMeta = {
  title?: string;
  description: string;
  path: string;
  locale?: Locale;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  locale = defaultLocale,
  image,
  type = "website",
  publishedTime,
  noIndex = false,
}: PageMeta): Metadata {
  const publicPath = localePath(locale, path);
  const url = absoluteUrl(publicPath);
  const imageUrl = absoluteUrl(image ?? siteConfig.ogImage);
  const pageTitle = title ?? siteConfig.defaultTitle;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: {
      canonical: url,
      languages: languageAlternates(path),
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      locale: localeMeta[locale].og,
      alternateLocale: locales.filter((item) => item !== locale).map((item) => localeMeta[item].og),
      url,
      siteName: siteConfig.name,
      title: pageTitle,
      description,
      images: [{ url: imageUrl, alt: pageTitle }],
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: publishedTime, authors: [siteConfig.name] }
        : {}),
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "Manufacturer"],
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/images/logo-brand-v3.png"),
    image: absoluteUrl(siteConfig.ogImage),
    email: siteConfig.email,
    telephone: siteConfig.phoneE164,
    foundingDate: "1999",
    description: siteConfig.defaultDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    sameAs: Object.values(siteConfig.social),
  };
}

export function websiteJsonLd(locale: Locale = defaultLocale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: absoluteUrl(localePath(locale, "/")),
    inLanguage: localeMeta[locale].htmlLang,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function itemListJsonLd(name: string, items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      url: absoluteUrl(item.path),
    })),
  };
}

export function productJsonLd(product: {
  name: string;
  description: string;
  path: string;
  images: string[];
  sku?: string;
  brand?: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    sku: product.sku,
    image: product.images.filter(Boolean).map((image) => absoluteUrl(image)),
    url: absoluteUrl(product.path),
    brand: { "@type": "Brand", name: product.brand || siteConfig.shortName },
    ...(product.category ? { category: product.category } : {}),
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function articleJsonLd(article: {
  title: string;
  description: string;
  path: string;
  image?: string;
  datePublished: string;
  inLanguage: string;
  body?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    ...(article.image ? { image: absoluteUrl(article.image) } : {}),
    datePublished: article.datePublished,
    dateModified: article.datePublished,
    inLanguage: article.inLanguage,
    mainEntityOfPage: absoluteUrl(article.path),
    ...(article.body ? { articleBody: article.body } : {}),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/images/logo-brand-v3.png"),
      },
    },
  };
}
