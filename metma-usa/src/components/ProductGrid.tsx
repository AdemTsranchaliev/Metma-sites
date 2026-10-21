import Link from "next/link";
import type { UsaProduct } from "@/lib/catalog";
import { toneFor } from "@/lib/tones";

export function ProductGrid({ products }: { products: UsaProduct[] }) {
  return (
    <div className="grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-4">
      {products.map((product) => {
        const tone = toneFor(product.category);
        return (
          <Link key={product.slug} href={`/products/${product.slug}`} className="group block overflow-hidden rounded-2xl bg-white shadow-[0_10px_30px_-18px_rgba(12,35,64,0.45)] ring-1 ring-black/5">
            <div className="h-1.5" style={{ background: tone.chip }} />
            <div className="relative aspect-square overflow-hidden" style={{ background: tone.bg }}>
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="px-3 py-3">
              <p className="text-[0.65rem] font-bold tracking-[0.14em] uppercase" style={{ color: tone.ink }}>
                {product.sku}
              </p>
              <h3 className="mt-1 font-display text-lg leading-snug font-semibold text-[var(--usa-navy)]">{product.name}</h3>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
