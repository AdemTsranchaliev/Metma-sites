import { collection, getDocs, orderBy, query, where, type DocumentData } from "firebase/firestore";
import { getDb } from "./client";

export type UsaProduct = {
  id: string;
  sku: string;
  name: string;
  slug: string;
  category: string;
  shortDescription: string;
  description: string;
  contents: string;
  image: string;
  images: string[];
  instructionsUrl: string | null;
  isFeatured: boolean;
};

const SITE = "Usa" as const;

export type StoreCategory = {
  slug: string;
  label: string;
  href: string;
};

function text(value: unknown) {
  return String(value ?? "").trim();
}

function mapProduct(id: string, data: DocumentData): UsaProduct | null {
  if (data.isActive === false || data.site !== SITE) return null;
  const urls = Array.isArray(data.imageUrls)
    ? data.imageUrls.map((url) => text(url)).filter(Boolean)
    : [];
  const image = text(urls[0] || data.imageUrl);
  if (!image) return null;
  return {
    id: text(data.sku) || id,
    sku: text(data.sku) || id,
    name: text(data.name),
    slug: text(data.slug) || id,
    category: text(data.category) || "classic",
    shortDescription: text(data.shortDescription),
    description: text(data.description || data.shortDescription),
    contents: text(data.contents),
    image,
    images: urls.length > 0 ? urls : [image],
    instructionsUrl: text(data.instructionsUrl) || null,
    isFeatured: Boolean(data.isFeatured),
  };
}

export async function readProducts(): Promise<UsaProduct[]> {
  const snap = await getDocs(
    query(collection(getDb(), "products"), where("site", "==", SITE), orderBy("sortOrder", "asc")),
  );
  return snap.docs.map((item) => mapProduct(item.id, item.data())).filter((item): item is UsaProduct => item !== null);
}

export async function readCategories(): Promise<StoreCategory[]> {
  const snap = await getDocs(
    query(collection(getDb(), "categories"), where("site", "==", SITE), orderBy("sortOrder", "asc")),
  );
  return snap.docs
    .map((item) => {
      const data = item.data();
      if (data.isActive === false) return null;
      const slug = text(data.slug);
      if (!slug) return null;
      return { slug, label: text(data.name) || slug, href: `/products/${slug}` };
    })
    .filter((item): item is StoreCategory => item !== null);
}
