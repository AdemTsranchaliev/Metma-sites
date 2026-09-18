export type SiteCode = "Bg" | "De" | "Usa";

/** Category slug used on the public site (/produkte/[slug]) */
export type ProductCategorySlug = string;

export type ProductCategory = {
  id: string;
  siteId: string;
  name: string;
  slug: string;
  description?: string | null;
  sortOrder: number;
  isActive: boolean;
};

/** Default DE categories — also used as seed */
export const DEFAULT_PRODUCT_CATEGORIES: Omit<
  ProductCategory,
  "id" | "siteId"
>[] = [
  {
    name: "Farbstoffe",
    slug: "farbstoffe",
    description: "Tabletten, Flüssig & mehr",
    sortOrder: 1,
    isActive: true,
  },
  {
    name: "Sets",
    slug: "sets",
    description: "Komplettpakete für Ostern",
    sortOrder: 2,
    isActive: true,
  },
  {
    name: "Dekorationen",
    slug: "dekorationen",
    description: "Marker, Maler & Aufkleber",
    sortOrder: 3,
    isActive: true,
  },
];

/** @deprecated use getCategories() — kept for quick labels */
export const PRODUCT_CATEGORIES = DEFAULT_PRODUCT_CATEGORIES.map((c) => ({
  slug: c.slug,
  label: c.name,
  labelDe: c.name,
}));

export type Site = {
  id: string;
  code: SiteCode | number | string;
  name: string;
  domain: string;
  defaultLocale: string;
  isActive: boolean;
};

export type Product = {
  id: string;
  siteId: string;
  categoryId?: string | null;
  category?: ProductCategorySlug | null;
  sku: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  description?: string | null;
  price?: number | null;
  currency: string;
  imageUrl?: string | null;
  imageUrls?: string[];
  videoUrl?: string | null;
  isFeatured: boolean;
  isActive: boolean;
  sortOrder: number;
};

export type Page = {
  id: string;
  siteId: string;
  title: string;
  slug: string;
  heroTitle?: string | null;
  heroSubtitle?: string | null;
  bodyHtml?: string | null;
  metaTitle?: string | null;
  metaDescription?: string | null;
  isPublished: boolean;
};

export type BlogPost = {
  id: string;
  siteId: string;
  title: string;
  slug: string;
  excerpt?: string | null;
  bodyHtml?: string | null;
  coverImageUrl?: string | null;
  isPublished: boolean;
  publishedAtUtc?: string | null;
};

export type MediaAsset = {
  id: string;
  siteId?: string | null;
  fileName: string;
  contentType: string;
  sizeBytes: number;
  publicUrl: string;
  altText?: string | null;
};

/** Short QR link — redirects to a URL; product is optional label only */
export type QrLink = {
  id: string;
  siteId: string;
  code: string;
  /** Full URL the QR /go link redirects to */
  redirectUrl: string;
  /** Optional — only for orientation in the admin list */
  productId?: string | null;
  productName?: string | null;
  productSlug?: string | null;
  createdAtUtc: string;
};
