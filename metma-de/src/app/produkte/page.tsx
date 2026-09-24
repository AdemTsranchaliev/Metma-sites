import type { Metadata } from "next";
import { PageIntro } from "@/components/PageIntro";
import { ProductCatalog } from "@/components/ProductCatalog";
import { getProducts } from "@/lib/catalog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Produkte",
  description:
    "Eierfarben, Sets und Dekorationen von METMA. Sortiment aus eigener Produktion für Ostern, Handel und Großbestellung.",
  path: "/produkte",
});

export const revalidate = 60;

export default async function ProduktePage() {
  const products = await getProducts();

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
