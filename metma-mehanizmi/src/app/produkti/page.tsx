import type { Metadata } from "next";
import { Suspense } from "react";
import { Catalog } from "@/components/Catalog";
import { PageHead } from "@/components/PageHead";

export const metadata: Metadata = {
  title: "Продукти",
  description:
    "Каталог на МЕТМА: механизми, рамкови механизми, детайли, дървени дисплеи, автоматни детайли и пружини.",
};

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <PageHead
        eyebrow="Каталог"
        title="Продукти"
        lede="Механизми, рамки, детайли и дисплеи. Размери и наличност — при запитване."
      />
      <div className="mt-10">
        <Suspense>
          <Catalog />
        </Suspense>
      </div>
    </div>
  );
}
