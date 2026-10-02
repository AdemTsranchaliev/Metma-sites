import type { MetadataRoute } from "next";
import { posts } from "@/data/blog";
import { categories, products } from "@/data/products";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/produkti"), changeFrequency: "weekly", priority: 0.9 },
    ...categories.map((category) => ({
      url: absoluteUrl(`/produkti/kategoria/${category.id}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...products.map((product) => ({
      url: absoluteUrl(`/produkti/${product.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    { url: absoluteUrl("/blog"), changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: absoluteUrl(`/blog/${post.slug}`),
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    { url: absoluteUrl("/za-nas"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/kontakti"), changeFrequency: "monthly", priority: 0.6 },
  ];

  return staticPages;
}
