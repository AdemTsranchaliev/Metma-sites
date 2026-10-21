import catalog from "@/data/usa-catalog.json";
import { isFirebaseConfigured } from "./firebase/client";
import { readCategories, readProducts, type StoreCategory, type UsaProduct } from "./firebase/read";

export type { StoreCategory, UsaProduct };

const fallbackCategories: StoreCategory[] = [
  { slug: "classic", label: "Classic kits", href: "/products/classic" },
  { slug: "children", label: "Children kits", href: "/products/children" },
  { slug: "display", label: "Display", href: "/products/display" },
  { slug: "decoration", label: "Egg decoration", href: "/products/decoration" },
];

const fallbackProducts: UsaProduct[] = catalog.map((item) => ({
  id: item.sku,
  sku: item.sku,
  name: item.name,
  slug: item.slug,
  category: item.category,
  shortDescription: item.shortDescription,
  description: item.shortDescription,
  contents: item.contents,
  image: item.image,
  images: item.images,
  instructionsUrl: item.instructionsUrl || null,
  isFeatured: item.isFeatured,
}));

const useFirebase = process.env.NEXT_PUBLIC_USE_FIREBASE === "true" && isFirebaseConfigured;

function filterProducts(
  list: UsaProduct[],
  options?: { featuredOnly?: boolean; category?: string },
) {
  let next = list;
  if (options?.featuredOnly) {
    const featured = next.filter((item) => item.isFeatured);
    next = featured.length > 0 ? featured : next.slice(0, 8);
  }
  if (options?.category) next = next.filter((item) => item.category === options.category);
  return next;
}

/**
 * USA catalog. Firestore (`site == "Usa"`) when configured.
 * If that query is empty, the local catalog is used so the storefront still renders.
 */
export async function getProducts(options?: {
  featuredOnly?: boolean;
  category?: string;
}): Promise<UsaProduct[]> {
  if (useFirebase) {
    try {
      const fromDb = await readProducts();
      if (fromDb.length > 0) return filterProducts(fromDb, options);
    } catch (error) {
      console.error("Firestore products failed", error);
    }
  }
  return filterProducts(fallbackProducts, options);
}

export async function getCategories(): Promise<StoreCategory[]> {
  const products = await getProducts();
  const used = new Set(products.map((item) => item.category));
  if (useFirebase) {
    try {
      const fromDb = await readCategories();
      const matched = fromDb.filter((item) => used.has(item.slug));
      if (matched.length > 0) return matched;
    } catch (error) {
      console.error("Firestore categories failed", error);
    }
  }
  return fallbackCategories.filter((item) => used.has(item.slug));
}

export async function getProductBySlug(slug: string): Promise<UsaProduct | null> {
  const all = await getProducts();
  return all.find((item) => item.slug === slug) ?? null;
}
