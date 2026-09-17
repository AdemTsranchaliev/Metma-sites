import type { Metadata } from "next";
import { ProductCatalog } from "@/components/ProductCatalog";
import { products } from "@/data/home";

export const metadata: Metadata = {
  title: "Produkte – METMA Ltd. – Eierfarbe",
};

export default function ProduktePage() {
  return (
    <>
      <section className="border-b border-[var(--metma-line)] bg-[var(--metma-blue-soft)] py-12 md:py-14">
        <div className="container-metma text-center">
          <p className="eyebrow text-[var(--metma-rose)]">Sortiment</p>
          <h1 className="mt-3 font-display text-[clamp(2.1rem,4.5vw,3.2rem)] font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
            Produkte
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[var(--metma-mute)] md:text-base">
            Sets, Farben und Dekorationen aus eigener Produktion.
          </p>
        </div>
      </section>

      <section className="bg-white py-12 md:py-14">
        <div className="container-metma">
          <ProductCatalog products={products} activeCategory="alle" />
        </div>
      </section>
    </>
  );
}
