import type { Metadata } from "next";
import { CatalogShell } from "@/components/CatalogShell";
import { isBrandId } from "@/data/brands";
import { getProducts } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

type Props = { searchParams: Promise<{ marka?: string }> };

export const metadata: Metadata = pageMetadata({
  title: "Продукти",
  description:
    "Бои за яйца, комплекти, украси и рекламни дисплеи от Весаче, Ино, Пет и METMA.",
  path: "/produkti",
});

export default async function ProductsPage({ searchParams }: Props) {
  const { marka } = await searchParams;
  const products = await getProducts();
  const initialBrand = isBrandId(marka) ? marka : "all";

  return (
    <CatalogShell
      products={products}
      activeCategory="alle"
      initialBrand={initialBrand}
      title="Продукти"
      subtitle="Изберете марка или разгледайте целия асортимент. Цветът на страницата следва марката."
    />
  );
}
