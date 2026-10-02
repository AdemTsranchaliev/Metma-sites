import type { Metadata } from "next";
import { Catalog } from "@/components/Catalog";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { products } from "@/data/products";
import { breadcrumbJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Продукти",
  description:
    "Каталог на МЕТМА: механизми, рамкови механизми, детайли, дървени дисплеи, автоматни детайли и пружини.",
  path: "/produkti",
});

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Начало", path: "/" },
            { name: "Продукти", path: "/produkti" },
          ]),
          itemListJsonLd(
            "Продукти",
            products.map((product) => ({
              name: product.title,
              path: `/produkti/${product.slug}`,
            })),
          ),
        ]}
      />
      <PageHead
        eyebrow="Каталог"
        title="Продукти"
        lede="Механизми, рамки, детайли и дисплеи. Размери и наличност — при запитване."
      />
      <div className="mt-10">
        <Catalog />
      </div>
    </div>
  );
}
