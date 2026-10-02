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
  const pageTitle = title ?? siteConfig.defaultTitle;

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
      siteName: siteConfig.legalName,
      title: pageTitle,
      description,
      images: [{ url: imageUrl, alt: pageTitle }],
      ...(type === "article" && publishedTime
        ? { publishedTime, modifiedTime: publishedTime, authors: [siteConfig.legalName] }
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
    name: siteConfig.legalName,
    url: siteConfig.url,
    logo: absoluteUrl(siteConfig.logo),
    image: absoluteUrl(siteConfig.ogImage),
    email: siteConfig.email,
    telephone: siteConfig.mobileE164,
    description: siteConfig.defaultDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.street,
      addressLocality: siteConfig.address.city,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.country,
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: siteConfig.mobileE164,
        contactType: "sales",
        areaServed: "BG",
        availableLanguage: "Bulgarian",
      },
      {
        "@type": "ContactPoint",
        telephone: siteConfig.phoneE164,
        contactType: "customer service",
        areaServed: "BG",
        availableLanguage: "Bulgarian",
      },
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.legalName,
    url: siteConfig.url,
    inLanguage: "bg",
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
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
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: product.images.filter(Boolean).map((image) => absoluteUrl(image)),
    url: absoluteUrl(product.path),
    brand: { "@type": "Brand", name: siteConfig.shortName },
    ...(product.category ? { category: product.category } : {}),
    manufacturer: {
      "@type": "Organization",
      name: siteConfig.legalName,
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
    inLanguage: "bg",
    mainEntityOfPage: absoluteUrl(article.path),
    ...(article.body ? { articleBody: article.body } : {}),
    author: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.legalName,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.logo),
      },
    },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function contactPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Контакти",
    url: absoluteUrl("/kontakti"),
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.legalName,
      email: siteConfig.email,
      telephone: [siteConfig.phoneE164, siteConfig.mobileE164],
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
