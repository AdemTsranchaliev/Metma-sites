import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { productCategories, products } from "@/data/home";

const featured = products.slice(0, 6);
const swatches = [
  "var(--metma-blue-soft)",
  "var(--metma-peach)",
  "var(--metma-mint)",
  "var(--metma-lilac)",
  "#fff4d6",
  "var(--metma-peach)",
] as const;

export function HomeProducts() {
  return (
    <section className="bg-[var(--metma-sand)] py-20 md:py-28">
      <div className="container-metma">
        <Reveal className="mb-12 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-[var(--metma-rose)]">Shop</p>
            <h2 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
              Ausgewählte Farben
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {productCategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="bg-white px-3.5 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--metma-ink)] transition hover:bg-[var(--metma-ink)] hover:text-white"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-x-7 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((product, index) => (
            <Reveal key={product.id} delayMs={(index % 3) * 60}>
              <Link href={`/produkte/${product.slug}`} className="group block">
                <div
                  className="product-tile relative mb-4 aspect-[4/5] overflow-hidden"
                  style={{ background: swatches[index % swatches.length] }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    quality={70}
                    className="object-contain p-7 transition duration-500 group-hover:scale-[1.04]"
                    sizes="(max-width:768px) 90vw, 340px"
                  />
                </div>
                <p className="text-xs tracking-wider text-[var(--metma-mute)]">
                  {product.id}
                </p>
                <h3 className="mt-1.5 text-sm font-semibold leading-snug text-[var(--metma-ink)] transition group-hover:text-[var(--metma-rose)]">
                  {product.name}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 text-center">
          <Link href="/produkte" className="btn-metma">
            Alle Produkte
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
