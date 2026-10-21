import type { Metadata } from "next";
import { Suspense } from "react";
import { getCategories, getProducts } from "@/lib/catalog";
import { ProductBrowser } from "./ProductBrowser";

export const metadata: Metadata = { title: "Продукти" };

export default async function ProductsPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <Suspense fallback={null}>
      <ProductBrowser products={products} categories={categories} />
    </Suspense>
  );
}
