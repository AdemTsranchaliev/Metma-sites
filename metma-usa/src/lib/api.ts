import { apiBaseUrl, siteConfig } from "./site";

export type Product = {
  id: string;
  siteId: string;
  sku: string;
  name: string;
  slug: string;
  shortDescription?: string | null;
  price?: number | null;
  currency: string;
  imageUrl?: string | null;
  isFeatured: boolean;
};

export async function getProducts(featuredOnly = false): Promise<Product[]> {
  const params = new URLSearchParams({
    siteCode: siteConfig.code,
    featuredOnly: String(featuredOnly),
  });

  const response = await fetch(`${apiBaseUrl}/api/products?${params}`, {
    next: { revalidate: 60 },
  });

  if (!response.ok) {
    return [];
  }

  return response.json();
}
