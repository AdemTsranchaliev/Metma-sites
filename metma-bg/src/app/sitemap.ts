import type { MetadataRoute } from "next";
import { brands } from "@/data/brands";
import { getBlogPosts, getCategories, getProducts } from "@/lib/catalog";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, products, posts] = await Promise.all([
    getCategories(),
    getProducts(),
    getBlogPosts(),
  ]);

  return [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/produkti"), changeFrequency: "weekly", priority: 0.9 },
    ...brands.map((brand) => ({
      url: absoluteUrl(`/marki/${brand.id}`),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.7 },
    { url: absoluteUrl("/za-nas"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/deklaratsii"), changeFrequency: "yearly", priority: 0.4 },
    { url: absoluteUrl("/kontakti"), changeFrequency: "monthly", priority: 0.6 },
    ...categories.map((category) => ({
      url: absoluteUrl(`/produkti/${category.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/produkti/${product.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
