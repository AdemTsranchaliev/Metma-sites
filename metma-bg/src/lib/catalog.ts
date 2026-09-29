import { isFirebaseConfigured } from "./firebase/client";
import { readBlogPosts, readCategories, readProducts, type StoreCategory } from "./firebase/read";
import { productCategories, products, type Product } from "@/data/home";
import { blogPosts, type BlogPost } from "@/data/blog";

export type { StoreCategory };
export { formatBlogDate } from "@/data/blog";

const useFirebase = process.env.NEXT_PUBLIC_USE_FIREBASE === "true" && isFirebaseConfigured;

/**
 * Bulgarian catalog. Firestore (`site == "Bg"`) when configured.
 * Static files stay as the fallback for local work without Firebase.
 */
export async function getProducts(options?: {
  featuredOnly?: boolean;
  category?: string;
  brand?: string;
}): Promise<Product[]> {
  let list = useFirebase ? await readProducts() : products;
  if (useFirebase && list.length === 0) list = products;

  if (options?.featuredOnly) {
    const featured = list.filter((p) => p.isFeatured && p.brand === "metma");
    list = featured.length > 0 ? featured : list.filter((p) => p.brand === "metma").slice(0, 8);
  }
  if (options?.category) list = list.filter((p) => p.category === options.category);
  if (options?.brand) list = list.filter((p) => p.brand === options.brand);
  return list;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((p) => p.slug === slug) ?? null;
}

export async function getCategories(): Promise<StoreCategory[]> {
  if (useFirebase) {
    const fromFb = await readCategories();
    if (fromFb.length > 0) return fromFb;
  }
  return productCategories.map((c) => ({
    label: c.label,
    href: c.href,
    slug: c.slug,
  }));
}

async function posts(): Promise<BlogPost[]> {
  if (!useFirebase) return blogPosts;
  const fromFb = await readBlogPosts();
  return fromFb.length > 0 ? fromFb : blogPosts;
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return (await posts()).filter((post) => post.kind !== "declaration");
}

export async function getDeclarations(): Promise<BlogPost[]> {
  return (await posts()).filter((post) => post.kind === "declaration");
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  return (await getBlogPosts()).find((post) => post.slug === slug) ?? null;
}
