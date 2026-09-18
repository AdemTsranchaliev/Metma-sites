import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { SectionScatter } from "@/components/easter/EasterScatter";
import { productCategories, products } from "@/data/home";

const featured = products.slice(0, 8);
const swatches = [
  "var(--metma-blue-soft)",
  "var(--metma-peach)",
  "var(--metma-mint)",
  "var(--metma-lilac)",
  "var(--metma-butter-soft)",
  "var(--metma-peach)",
  "var(--metma-butter)",
  "var(--metma-blue-soft)",
] as const;

export function HomeProducts() {
  return (
    <section className="relative overflow-hidden bg-white py-14 sm:py-20 md:py-24">
      <SectionScatter variant="products" />
      <div className="container-metma relative z-[1]">
        <Reveal className="mb-7 flex flex-col gap-4 sm:mb-10 sm:gap-6 md:mb-12 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow text-[var(--metma-rose)]">Shop</p>
            <h2 className="mt-2 font-display text-[clamp(1.75rem,6vw,3rem)] font-bold tracking-[-0.03em] text-[var(--metma-ink)] sm:mt-3">
              Ausgewählte Farben
            </h2>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:flex-wrap sm:overflow-visible sm:pb-0">
            {productCategories.map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="shrink-0 bg-[var(--metma-sand)] px-3.5 py-2 text-xs font-semibold uppercase tracking-wide text-[var(--metma-ink)] transition hover:bg-[var(--metma-ink)] hover:text-white"
              >
                {cat.label}
              </Link>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 md:gap-x-6 md:gap-y-10 lg:grid-cols-4">
          {featured.map((product, index) => (
            <Reveal key={product.id} delayMs={(index % 4) * 50}>
              <Link href={`/produkte/${product.slug}`} className="group block">
                <div
                  className="product-tile relative mb-2.5 aspect-square overflow-hidden sm:mb-3"
                  style={{ background: swatches[index % swatches.length] }}
                >
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    quality={70}
                    className="object-contain p-3 transition duration-500 group-hover:scale-[1.04] sm:p-5"
                    sizes="(max-width:768px) 45vw, 25vw"
                  />
                </div>
                <p className="text-[0.6rem] tracking-wider text-[var(--metma-mute)] sm:text-xs">
                  {product.id}
                </p>
                <h3 className="mt-0.5 line-clamp-2 text-[0.78rem] font-semibold leading-snug text-[var(--metma-ink)] transition group-hover:text-[var(--metma-rose)] sm:mt-1 sm:text-sm">
                  {product.name}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 text-center sm:mt-12 md:mt-14">
          <Link href="/produkte" className="btn-metma w-full sm:w-auto">
            Alle Produkte
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
