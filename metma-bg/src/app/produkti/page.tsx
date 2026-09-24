import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { PageHead } from "@/components/PageHead";
import { isCategoryId } from "@/data/products";

export const metadata: Metadata = {
  title: "Продукти",
  description:
    "Каталог на МЕТМА: механизми, рамкови механизми, детайли, дървени дисплеи, автоматни детайли и пружини.",
};

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ kategoria?: string }>;
}) {
  const { kategoria } = await searchParams;
  const initial = kategoria && isCategoryId(kategoria) ? kategoria : "all";

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <PageHead
        eyebrow="Каталог"
        title="Продукти"
        lede="Механизми, рамки, детайли и дисплеи. Размери и наличност — при запитване."
      />
      <div className="mt-10">
        <Catalog key={initial} initial={initial} />
      </div>
    </div>
  );
}
