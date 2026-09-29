import { collection, getDocs, orderBy, query, where, type DocumentData } from "firebase/firestore";
import { getDb } from "./client";
import { optimizeMediaUrl } from "@/lib/media";
import { isBrandId, type BrandId } from "@/data/brands";
import type { Product, ProductCategorySlug } from "@/data/home";
import type { BlogBlock, BlogPost } from "@/data/blog";

const SITE = "Bg" as const;

const CATEGORIES = new Set<ProductCategorySlug>(["boi", "komplekti", "ukrasi", "displei"]);

function decodeText(value: string): string {
  let current = value;
  let previous = "";
  while (current !== previous) {
    previous = current;
    current = current
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");
  }
  return current.replace(/[ \t]+\n/g, "\n").replace(/[ \t]{2,}/g, " ").trim();
}

function htmlToBlocks(html: string | null | undefined): BlogBlock[] {
  if (!html?.trim()) return [];
  const blocks: BlogBlock[] = [];
  const list: string[] = [];
  const flushList = () => {
    if (list.length === 0) return;
    blocks.push({ type: "ul", items: [...list] });
    list.length = 0;
  };
  const pattern = /<(h2|h3|p|li)\b[^>]*>([\s\S]*?)<\/\1>/gi;
  let match: RegExpExecArray | null;
  while ((match = pattern.exec(html))) {
    const tag = match[1].toLowerCase();
    const text = decodeText(match[2].replace(/<[^>]+>/g, " "));
    if (!text) continue;
    if (tag === "li") {
      list.push(text);
      continue;
    }
    flushList();
    if (tag === "h2" || tag === "h3") blocks.push({ type: "h2", text });
    else blocks.push({ type: "p", text });
  }
  flushList();
  if (blocks.length > 0) return blocks;
  return decodeText(html.replace(/<[^>]+>/g, " "))
    .split(/\n+/)
    .map((text) => text.trim())
    .filter(Boolean)
    .map((text) => ({ type: "p" as const, text }));
}

function asCategory(value: unknown): ProductCategorySlug {
  const slug = String(value ?? "");
  return CATEGORIES.has(slug as ProductCategorySlug) ? (slug as ProductCategorySlug) : "komplekti";
}

function asBrand(value: unknown): BrandId {
  const brand = String(value ?? "");
  return isBrandId(brand) ? brand : "metma";
}

function mapProduct(id: string, data: DocumentData): Product | null {
  if (data.isActive === false) return null;
  const urls = Array.isArray(data.imageUrls)
    ? data.imageUrls.map((url) => optimizeMediaUrl(String(url), { width: 1200 })).filter(Boolean)
    : [];
  const image = optimizeMediaUrl(
    String(urls[0] || data.imageUrl || "/images/products/markers.png"),
    { width: 1200 },
  );
  const images = urls.length > 0 ? urls : [image];
  return {
    id: String(data.sku ?? id),
    name: String(data.name ?? ""),
    slug: String(data.slug ?? id),
    image,
    images,
    category: asCategory(data.category),
    brand: asBrand(data.brand),
    shortDescription: String(data.shortDescription ?? ""),
    description: String(data.description ?? data.shortDescription ?? ""),
    isFeatured: Boolean(data.isFeatured),
  };
}

export type StoreCategory = {
  label: string;
  href: string;
  slug: string;
};

export async function readProducts(): Promise<Product[]> {
  const snap = await getDocs(
    query(collection(getDb(), "products"), where("site", "==", SITE), orderBy("sortOrder", "asc")),
  );
  return snap.docs.map((doc) => mapProduct(doc.id, doc.data())).filter((p): p is Product => p !== null);
}

export async function readCategories(): Promise<StoreCategory[]> {
  const snap = await getDocs(
    query(collection(getDb(), "categories"), where("site", "==", SITE), orderBy("sortOrder", "asc")),
  );
  return snap.docs
    .map((doc) => {
      const data = doc.data();
      if (data.isActive === false) return null;
      const slug = String(data.slug ?? "");
      if (!slug) return null;
      return { slug, label: String(data.name ?? slug), href: `/produkti/${slug}` };
    })
    .filter((c): c is StoreCategory => c !== null);
}

function mapPost(id: string, data: DocumentData): BlogPost | null {
  if (!data.isPublished) return null;
  const kind = data.kind === "declaration" ? "declaration" : "story";
  const content = htmlToBlocks(data.bodyHtml as string | null | undefined);
  const images = Array.isArray(data.images)
    ? data.images.map((url) => optimizeMediaUrl(String(url), { width: 1400 }))
    : undefined;
  return {
    slug: String(data.slug ?? id),
    title: decodeText(String(data.title ?? "")),
    excerpt: decodeText(String(data.excerpt ?? "")),
    date: String(data.publishedAtUtc ?? new Date().toISOString().slice(0, 10)),
    category: String(data.category ?? "Блог"),
    image: optimizeMediaUrl(String(data.coverImageUrl || "/images/blog/easter.jpg"), { width: 1400 }),
    imagePosition: data.imagePosition ? String(data.imagePosition) : undefined,
    images,
    kind,
    content:
      content.length > 0
        ? content
        : [{ type: "p", text: decodeText(String(data.excerpt ?? data.title ?? "")) }],
  };
}

export async function readBlogPosts(): Promise<BlogPost[]> {
  const snap = await getDocs(query(collection(getDb(), "blogPosts"), where("site", "==", SITE)));
  return snap.docs
    .map((doc) => mapPost(doc.id, doc.data()))
    .filter((post): post is BlogPost => post !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
