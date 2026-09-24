import {
  productCategories,
  products,
  type Product,
} from "@/data/home";
import { blogPosts, type BlogPost } from "@/data/blog";

export type StoreCategory = {
  label: string;
  href: string;
  slug: string;
};

export async function getProducts(options?: {
  featuredOnly?: boolean;
  category?: string;
  brand?: string;
}): Promise<Product[]> {
  let list = products;
  if (options?.featuredOnly) {
    const featured = list.filter((p) => p.isFeatured && p.brand === "metma");
    list = featured.length > 0 ? featured : list.filter((p) => p.brand === "metma").slice(0, 8);
  }
  if (options?.category) {
    list = list.filter((p) => p.category === options.category);
  }
  if (options?.brand) {
    list = list.filter((p) => p.brand === options.brand);
  }
  return list;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  return products.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<StoreCategory[]> {
  return productCategories.map((c) => ({
    label: c.label,
    href: c.href,
    slug: c.slug,
  }));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return blogPosts.filter((post) => post.kind !== "declaration");
}

export async function getDeclarations(): Promise<BlogPost[]> {
  return blogPosts.filter((post) => post.kind === "declaration");
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return (
    blogPosts.find((post) => post.slug === slug && post.kind !== "declaration") ??
    null
  );
}

export { formatBlogDate } from "@/data/blog";
