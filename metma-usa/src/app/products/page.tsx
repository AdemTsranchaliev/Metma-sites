import type { Metadata } from "next";
import { ProductCatalog } from "@/components/ProductCatalog";
import { getCategories, getProducts } from "@/lib/catalog";

export const dynamic = "force-static";

export const metadata: Metadata = { title: "Products" };

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([getProducts(), getCategories()]);
  const counts = Object.fromEntries(categories.map((category) => [category.slug, products.filter((product) => product.category === category.slug).length]));

  return (
    <main>
      <div className="hero-wash">
        <div className="container-usa py-8 sm:py-10">
          <p className="inline-flex rounded-full bg-[var(--usa-gold)] px-3 py-1 text-[0.7rem] font-bold tracking-[0.18em] text-[var(--usa-navy)] uppercase">
            Catalog
          </p>
          <h1 className="font-display mt-4 text-5xl text-[var(--usa-navy)]">Products</h1>
          <p className="mt-4 max-w-xl text-[var(--usa-mute)]">
            Classic kits, children kits, a retail display and egg decoration from METMA USA.
          </p>
          <div className="mt-6">
            <ProductCatalog products={products} categories={categories} counts={counts} />
          </div>
        </div>
      </div>
    </main>
  );
}
