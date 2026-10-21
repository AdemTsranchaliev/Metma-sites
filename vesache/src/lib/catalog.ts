import { cache } from "react";
import { collection, getDocs, orderBy, query, where, type DocumentData } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "@/lib/firebase/client";
import { categories as fallbackCategories, type BrandId, type CatalogCategory, type Product } from "@/lib/types";

const BRANDS = new Set<BrandId>(["vesache", "ino", "pet", "metma"]);

function asBrand(value: unknown): BrandId | null {
  const brand = String(value ?? "") as BrandId;
  return BRANDS.has(brand) ? brand : null;
}

/** SKUs whose box art is a different brand from the stored catalog value. */
const PACKAGING_BRAND: Record<string, BrandId> = {
  P132: "pet",
};

function applyPackagingBrand(sku: string, brand: BrandId, text: string) {
  const packaged = PACKAGING_BRAND[sku];
  if (!packaged || packaged === brand) return { brand, text };
  const from = brand === "vesache" ? "Весаче" : brand === "pet" ? "Пет" : "";
  const to = packaged === "pet" ? "Пет" : packaged === "vesache" ? "Весаче" : "";
  return {
    brand: packaged,
    text: from && to ? text.replaceAll(from, to) : text,
  };
}

function asCategory(value: unknown): string {
  const slug = String(value ?? "").trim();
  return slug || "ukrasi";
}

export const getCategories = cache(async (): Promise<CatalogCategory[]> => {
  if (process.env.NEXT_PUBLIC_USE_FIREBASE !== "true" || !isFirebaseConfigured) return fallbackCategories;
  try {
    const snap = await getDocs(query(collection(getDb(), "categories"), where("site", "==", "Bg"), orderBy("sortOrder", "asc")));
    const list = snap.docs
      .map((item) => {
        const data = item.data();
        if (data.isActive === false) return null;
        const slug = String(data.slug ?? "").trim();
        if (!slug) return null;
        return {
          slug,
          label: String(data.name ?? slug),
          hint: String(data.description ?? ""),
        };
      })
      .filter((item): item is CatalogCategory => item !== null);
    return list.length > 0 ? list : fallbackCategories;
  } catch {
    return fallbackCategories;
  }
});

function mapProduct(id: string, data: DocumentData): Product | null {
  if (data.isActive === false || data.site !== "Bg") return null;
  const storedBrand = asBrand(data.brand);
  if (!storedBrand) return null;
  const sku = String(data.sku || id);
  const nameFix = applyPackagingBrand(sku, storedBrand, String(data.name ?? ""));
  const shortFix = applyPackagingBrand(sku, storedBrand, String(data.shortDescription ?? ""));
  const descriptionFix = applyPackagingBrand(sku, storedBrand, String(data.description || data.shortDescription || ""));
  const brand = nameFix.brand;
  const urls = Array.isArray(data.imageUrls)
    ? data.imageUrls.map((url) => String(url).trim()).filter((url) => url.startsWith("http"))
    : [];
  const image = String(urls[0] || data.imageUrl || "").trim();
  if (!image.startsWith("http")) return null;
  return {
    id: sku,
    name: nameFix.text,
    slug: String(data.slug || id),
    image,
    images: urls.length > 0 ? urls : [image],
    category: asCategory(data.category),
    brand,
    shortDescription: shortFix.text,
    description: descriptionFix.text,
    isFeatured: Boolean(data.isFeatured),
  };
}

const getAllProducts = cache(async (): Promise<Product[]> => {
  if (process.env.NEXT_PUBLIC_USE_FIREBASE !== "true" || !isFirebaseConfigured) return [];
  const snap = await getDocs(query(collection(getDb(), "products"), where("site", "==", "Bg"), orderBy("sortOrder", "asc")));
  return snap.docs.map((item) => mapProduct(item.id, item.data())).filter((item): item is Product => item !== null);
});

export async function getProducts(options?: { brand?: string; category?: string }): Promise<Product[]> {
  let list = await getAllProducts();
  if (options?.brand) list = list.filter((item) => item.brand === options.brand);
  if (options?.category) list = list.filter((item) => item.category === options.category);
  return list;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const all = await getProducts();
  return all.find((item) => item.slug === slug) ?? null;
}
