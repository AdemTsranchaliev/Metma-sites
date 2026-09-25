import type { MetadataRoute } from "next";
import { brands } from "@/data/brands";
import { getBlogPosts, getCategories, getProducts } from "@/lib/catalog";
import { locales, localePath } from "@/lib/i18n";
import { absoluteUrl, languageAlternates } from "@/lib/seo";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products, posts] = await Promise.all([
    getCategories(),
    getProducts(),
    getBlogPosts(),
  ]);

  const paths: {
    path: string;
    changeFrequency: "weekly" | "monthly" | "yearly";
    priority: number;
    lastModified?: Date;
  }[] = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/produkti", changeFrequency: "weekly" as const, priority: 0.9 },
    ...brands.map((brand) => ({
      path: `/marki/${brand.id}`,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { path: "/blog", changeFrequency: "weekly" as const, priority: 0.7 },
    { path: "/za-nas", changeFrequency: "monthly" as const, priority: 0.6 },
    { path: "/deklaratsii", changeFrequency: "yearly" as const, priority: 0.4 },
    { path: "/kontakti", changeFrequency: "monthly" as const, priority: 0.6 },
    ...categories.map((category) => ({
      path: `/produkti/${category.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      path: `/produkti/${product.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      path: `/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return locales.flatMap((locale) =>
    paths.map((entry) => ({
      url: absoluteUrl(localePath(locale, entry.path)),
      lastModified: entry.lastModified,
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: { languages: languageAlternates(entry.path) },
    })),
  );
}
