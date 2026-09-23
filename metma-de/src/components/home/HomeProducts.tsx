import Image from "next/image";
import Link from "next/link";
import { MagneticCta } from "@/components/MagneticCta";
import { Reveal } from "@/components/Reveal";
import { SectionScatter } from "@/components/easter/EasterScatter";
import { getCategories, getProducts } from "@/lib/catalog";

export async function HomeProducts() {
  const [featured, productCategories] = await Promise.all([
    getProducts({ featuredOnly: true }),
    getCategories(),
  ]);
  const items = featured.slice(0, 8);

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

        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-4 md:gap-6">
          {items.map((product, index) => (
            <Reveal key={product.slug} delayMs={(index % 4) * 45}>
              <Link href={`/produkte/${product.slug}`} className="group block">
                <div className="relative mb-3 aspect-square overflow-hidden bg-white">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-3 transition duration-500 group-hover:scale-105 sm:p-4"
                    sizes="(max-width:640px) 45vw, 22vw"
                    unoptimized={
                      product.image.startsWith("http") ||
                      product.image.endsWith(".png")
                    }
                  />
                </div>
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.12em] text-[var(--metma-mute)]">
                  {product.id}
                </p>
                <h3 className="mt-1 font-display text-sm font-bold leading-snug text-[var(--metma-ink)] sm:text-base">
                  {product.name}
                </h3>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-10 flex justify-center sm:mt-12">
          <MagneticCta>
            <Link href="/produkte" className="btn-metma">
              Alle Produkte
            </Link>
          </MagneticCta>
        </Reveal>
      </div>
    </section>
  );
}
