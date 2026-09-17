import Image from "next/image";
import Link from "next/link";
import type { Product } from "@/data/home";
import { Reveal } from "@/components/Reveal";

const swatches = [
  "var(--metma-blue-soft)",
  "var(--metma-peach)",
  "var(--metma-mint)",
  "var(--metma-lilac)",
  "#fff4d6",
  "var(--metma-peach)",
  "var(--metma-butter)",
  "var(--metma-blue-soft)",
] as const;

type Props = {
  products: Product[];
  columns?: "3" | "4";
  animated?: boolean;
};

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
        const card = (
          <Link href={`/produkte/${product.slug}`} className="group block">
            <div
              className="product-tile relative mb-3 aspect-square overflow-hidden"
              style={{ background: swatches[index % swatches.length] }}
            >
              <Image
                src={product.image}
                alt={product.name}
                fill
                quality={70}
                className="object-contain p-4 transition duration-500 group-hover:scale-[1.04] sm:p-5"
                sizes="(max-width:768px) 45vw, 25vw"
              />
            </div>
            <p className="text-[0.65rem] tracking-wider text-[var(--metma-mute)] sm:text-xs">
              {product.id}
            </p>
            <h3 className="mt-1 text-xs font-semibold leading-snug text-[var(--metma-ink)] transition group-hover:text-[var(--metma-rose)] sm:text-sm">
              {product.name}
            </h3>
            {"shortDescription" in product && product.shortDescription ? (
              <p className="mt-1.5 line-clamp-2 text-[0.7rem] leading-5 text-[var(--metma-mute)] sm:text-xs">
                {product.shortDescription}
              </p>
            ) : null}
          </Link>
        );

        if (!animated) {
          return <div key={product.id}>{card}</div>;
        }

        return (
          <Reveal key={product.id} delayMs={(index % 4) * 50}>
            {card}
          </Reveal>
        );
      })}
    </div>
  );
}
