import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ProductCatalog } from "@/components/ProductCatalog";
import { products } from "@/data/home";

export const metadata: Metadata = {
  title: "Produkte – METMA Ltd. – Eierfarbe",
};

export default function ProduktePage() {
  return (
    <>
      <PageIntro
        eyebrow="Sortiment"
        title="Produkte"
        subtitle="Sets, Farben und Dekorationen aus eigener Produktion."
        centered
      />

      <section className="bg-white py-12 md:py-14">
        <div className="container-metma">
          <ProductCatalog products={products} activeCategory="alle" />
        </div>
      </section>
    </>
  );
}
