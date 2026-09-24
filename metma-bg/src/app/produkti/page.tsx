import type { Metadata } from "next";
import { CatalogShell } from "@/components/CatalogShell";
import { getProducts } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Продукти",
  description:
    "Бои за яйца, комплекти, украси и рекламни дисплеи от Весаче, Ино, Пет и METMA.",
  path: "/produkti",
});

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <CatalogShell
      products={products}
      activeCategory="alle"
      title="Продукти"
      subtitle="Изберете марка или разгледайте целия асортимент. Цветът на страницата следва марката."
    />
  );
}
