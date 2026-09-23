import {
  isFirebaseConfigured,
} from "./firebase/client";
import {
  readBlogPosts,
  readCategories,
  readProducts,
  type StoreBlogPost,
  type StoreCategory,
  type StoreProduct,
} from "./firebase/read";
import {
  productCategories as staticCategories,
  products as staticProducts,
  type Product,
} from "@/data/home";
import {
  blogPosts as staticBlog,
  formatBlogDate,
  type BlogPost,
} from "@/data/blog";

export type { StoreProduct as CatalogProduct, StoreCategory, StoreBlogPost };
export { formatBlogDate };

const useFirebase =
  process.env.NEXT_PUBLIC_USE_FIREBASE === "true" && isFirebaseConfigured;

/**
 * Catalog for metma-de — Firestore read-only when configured.
 * Never writes. No silent static fallback when Firebase is on
 * (empty catalog = empty site, so admin changes are obvious).
 */
export async function getProducts(options?: {
  featuredOnly?: boolean;
  category?: string;
}): Promise<Product[]> {
  let list: Product[];

  if (useFirebase) {
    list = await readProducts();
  } else {
    list = staticProducts as unknown as Product[];
  }

  if (options?.featuredOnly) {
    const featured = list.filter(
      (p) => "isFeatured" in p && (p as StoreProduct).isFeatured,
    );
    list = featured.length > 0 ? featured : list.slice(0, 8);
  }

  if (options?.category) {
    list = list.filter((p) => p.category === options.category);
  }

  return list;
}

export async function getProductBySlug(
  slug: string,
): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<StoreCategory[]> {
  if (useFirebase) {
    const fromFb = await readCategories();
    if (fromFb.length > 0) return fromFb;
  }
  return staticCategories.map((c) => ({
    label: c.label,
    href: c.href,
    slug: c.slug,
  }));
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (useFirebase) {
    return readBlogPosts();
  }
  return staticBlog;
}

export async function getBlogPostBySlug(
  slug: string,
): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) ?? null;
}

export function isUsingFirebase() {
  return useFirebase;
}
