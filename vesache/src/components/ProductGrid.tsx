import Image from "next/image";
import Link from "next/link";
import { companies, companyName, productTitle } from "@/lib/types";
import type { Product } from "@/lib/types";

export function ProductGrid({ products, tile = "sand" }: { products: Product[]; tile?: "sand" | "white" }) {
  if (products.length === 0) {
    return <p className="text-sm text-[var(--metma-mute)]">Няма продукти в тази група.</p>;
  }
  return (
    <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
      {products.map((product) => {
        const brand = companies.find((item) => item.id === product.brand);
        return (
        <Link key={`${product.id}-${product.slug}`} href={`/produkti/${product.slug}`} className="group block">
          <div className={`product-tile relative aspect-square overflow-hidden rounded-2xl ring-1 ring-black/[0.06] ${tile === "white" ? "bg-white" : "bg-[var(--metma-sand)]"}`}>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-contain p-3 transition duration-500 group-hover:scale-[1.03] sm:p-6"
              sizes="(max-width:768px) 45vw, 25vw"
              unoptimized
            />
          </div>
          <p className="mt-3 flex items-center gap-2 text-[0.68rem] text-[var(--metma-mute)]">
            <span className="h-1.5 w-1.5 rounded-full" style={{ background: brand?.ink ?? "var(--metma-rose)" }} />
            {companyName(product.brand)} · {product.id}
          </p>
          <h3 className="mt-1 line-clamp-2 font-display text-sm font-bold leading-snug sm:text-base">{productTitle(product.name, product.id)}</h3>
        </Link>
        );
      })}
    </div>
  );
}
