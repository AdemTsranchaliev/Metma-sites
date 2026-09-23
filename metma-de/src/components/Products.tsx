import Link from "next/link";
import { ProductGrid } from "@/components/ProductGrid";
import { Reveal } from "@/components/Reveal";
import { getProducts } from "@/lib/catalog";

export async function Products() {
  const products = await getProducts({ featuredOnly: true });

  return (
    <section className="relative bg-[var(--metma-bg-soft)] pb-20 pt-4">
      <svg
        className="wave-top fill-white"
        viewBox="0 0 1440 70"
        preserveAspectRatio="none"
        aria-hidden
      >
        <path d="M0,40 C240,80 480,0 720,30 C960,60 1200,10 1440,40 L1440,0 L0,0 Z" />
      </svg>

      <div className="container-metma">
        <Reveal className="mb-2 text-center">
          <p className="text-xs font-medium uppercase tracking-[0.28em] text-[#9a9a9a]">
            PRODUKTE
          </p>
          <h2 className="mt-2 text-2xl font-medium uppercase tracking-[0.12em] text-[#8a8a8a] md:text-[28px]">
            Empfohlene Produkte
          </h2>
        </Reveal>

        <div className="mt-12">
          <ProductGrid products={products} animated />
        </div>

        <Reveal delayMs={120} className="mt-14 text-center">
          <Link href="/produkte" className="btn-metma">
            Alle Produkte
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
