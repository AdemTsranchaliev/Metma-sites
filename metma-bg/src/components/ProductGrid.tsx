import Image from "next/image";
import Link from "next/link";
import { getBrand } from "@/data/brands";
import type { Product } from "@/data/home";
import { Reveal } from "@/components/Reveal";

type Props = {
  products: Product[];
  columns?: "3" | "4";
  animated?: boolean;
};

function cardName(name: string, id: string) {
  const code = id.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  return name
    .replace(new RegExp(`\\s*[–—-]?\\s*\\(?${code}\\)?\\s*$`, "i"), "")
    .replace(/\s*[–—-]?\s*\([A-Za-zА-Яа-я0-9]+\)\s*$/u, "")
    .replace(/\s*[–—-]\s*$/, "")
    .trim();
}

export function ProductGrid({
  products,
  columns = "4",
  animated = true,
}: Props) {
  const grid =
    columns === "3"
      ? "grid-cols-2 sm:grid-cols-2 lg:grid-cols-3"
      : "grid-cols-2 lg:grid-cols-4";

  return (
    <div className={`grid gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10 ${grid}`}>
      {products.map((product, index) => {
        const brand = getBrand(product.brand);
        const card = (
          <Link href={`/produkti/${product.slug}`} className="group block">
            <div className="product-tile relative aspect-square overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                quality={80}
                className="object-contain p-5 transition duration-500 group-hover:scale-[1.03] sm:p-6"
                sizes="(max-width:768px) 45vw, 25vw"
                unoptimized={
                  product.image.startsWith("http") ||
                  product.image.endsWith(".png")
                }
              />
            </div>
            <p className="mt-3 flex items-center gap-2 text-[0.68rem] text-[var(--metma-mute)]">
              <span className="h-1.5 w-1.5 rounded-full" style={{ background: brand?.ink ?? "var(--metma-ink)" }} />
              {product.id}
            </p>
            <h3 className="mt-1 line-clamp-2 text-sm font-medium leading-snug text-[var(--metma-ink)]">
              {cardName(product.name, product.id)}
            </h3>
          </Link>
        );

        if (!animated) {
          return <div key={`${product.id}-${product.slug}`}>{card}</div>;
        }

        return (
          <Reveal
            key={`${product.id}-${product.slug}`}
            delayMs={(index % 4) * 50}
          >
            {card}
          </Reveal>
        );
      })}
    </div>
  );
}
