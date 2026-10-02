import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  const base = siteConfig.url.replace(/\/$/, "");
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${base}${normalized}`;
}

type PageMeta = {
  title?: string;
  description: string;
  path: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export function pageMetadata({
  title,
  description,
  path,
  image,
  type = "website",
  publishedTime,
  noIndex = false,
}: PageMeta): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = absoluteUrl(image ?? siteConfig.ogImage);

  return {
    ...(title ? { title } : {}),
    description,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type,
      locale: siteConfig.ogLocale,
      url,
      siteName: siteConfig.name,
      title: title ?? siteConfig.defaultTitle,
      description,
      images: [{ url: imageUrl, alt: title ?? siteConfig.defaultTitle }],
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: publishedTime, authors: [siteConfig.name] }
        : {}),
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title: title ?? siteConfig.defaultTitle,
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
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "de",
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

export function contactPageJsonLd(page: { title: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: page.title,
    url: absoluteUrl(page.path),
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      email: siteConfig.email,
      telephone: siteConfig.phoneE164,
      address: {
        "@type": "PostalAddress",
        streetAddress: siteConfig.address.street,
        addressLocality: siteConfig.address.city,
        postalCode: siteConfig.address.postalCode,
        addressCountry: siteConfig.address.country,
      },
    },
  };
}
