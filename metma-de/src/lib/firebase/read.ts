import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  type DocumentData,
} from "firebase/firestore";
import { getDb } from "./client";
import { optimizeMediaUrl } from "@/lib/media";
import type { BlogBlock } from "@/data/blog";

const SITE = "De" as const;

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
  return current.replace(/\s+/g, " ").trim();
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

export type StoreProduct = {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: string;
  shortDescription: string;
  description: string;
  features: string[];
  specs: { label: string; value: string }[];
  isFeatured: boolean;
};

export type StoreCategory = {
  label: string;
  href: string;
  slug: string;
};

export type StoreBlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  content: BlogBlock[];
};

function mapProduct(id: string, data: DocumentData): StoreProduct | null {
  if (data.isActive === false) return null;
  const sku = String(data.sku ?? id);
  const category = String(data.category ?? "sets");
  let image =
    (Array.isArray(data.imageUrls) && data.imageUrls[0]) ||
    data.imageUrl ||
    "/images/products/markers.png";
  // Prefer trimmed transparent PNGs in catalog when jpg path is stored
  if (
    typeof image === "string" &&
    image.includes("/images/products/catalog/") &&
    image.endsWith(".jpg")
  ) {
    image = image.replace(/\.jpg$/i, ".png");
  }
  image = optimizeMediaUrl(String(image), { width: 900 });
  const name = String(data.name ?? "");
  const shortDescription = String(data.shortDescription ?? "");
  const description = String(data.description ?? shortDescription);
  const features = description
    ? description
        .split(/\n|•/)
        .map((s: string) => s.trim())
        .filter((s: string) => s.length > 8 && s.length < 80)
        .slice(0, 4)
    : [];

  return {
    id: sku,
    name,
    slug: String(data.slug ?? id),
    image: String(image),
    category,
    shortDescription,
    description,
    features:
      features.length > 0
        ? features
        : ["Aus eigener Produktion", "Für Handel & Zuhause", "METMA Qualität"],
    specs: [
      { label: "Art.-Nr.", value: sku },
      { label: "Kategorie", value: category },
    ],
    isFeatured: Boolean(data.isFeatured),
  };
}

/** Read-only: products for DE */
export async function readProducts(): Promise<StoreProduct[]> {
  const q = query(
    collection(getDb(), "products"),
    where("site", "==", SITE),
    orderBy("sortOrder", "asc"),
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => mapProduct(d.id, d.data()))
    .filter((p): p is StoreProduct => p !== null);
}

/** Read-only: categories for DE */
export async function readCategories(): Promise<StoreCategory[]> {
  const q = query(
    collection(getDb(), "categories"),
    where("site", "==", SITE),
    orderBy("sortOrder", "asc"),
  );
  const snap = await getDocs(q);
  return snap.docs
    .map((d) => {
      const data = d.data();
      if (data.isActive === false) return null;
      const slug = String(data.slug ?? "");
      if (!slug) return null;
      return {
        slug,
        label: String(data.name ?? slug),
        href: `/produkte/${slug}`,
      };
    })
    .filter((c): c is StoreCategory => c !== null);
}

/** Read-only: published blog posts for DE */
export async function readBlogPosts(): Promise<StoreBlogPost[]> {
  const q = query(
    collection(getDb(), "blogPosts"),
    where("site", "==", SITE),
  );
  const snap = await getDocs(q);
  const posts = snap.docs
    .map((d) => {
      const data = d.data();
      if (!data.isPublished) return null;
      const bodyHtml = data.bodyHtml as string | null | undefined;
      const content = htmlToBlocks(bodyHtml);
      return {
        slug: String(data.slug ?? d.id),
        title: decodeText(String(data.title ?? "")),
        excerpt: decodeText(String(data.excerpt ?? "")),
        date: String(
          data.publishedAtUtc ?? new Date().toISOString().slice(0, 10),
        ),
        category: "Blog",
        image: optimizeMediaUrl(
          String(data.coverImageUrl || "/images/blog/easter.jpg"),
          { width: 1400 },
        ),
        content:
          content.length > 0
            ? content
            : [
                {
                  type: "p" as const,
                  text: decodeText(String(data.excerpt ?? data.title ?? "")),
                },
              ],
      } satisfies StoreBlogPost;
    })
    .filter((p): p is StoreBlogPost => p !== null);

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
}
