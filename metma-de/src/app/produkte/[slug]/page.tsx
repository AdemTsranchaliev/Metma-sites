import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SectionScatter } from "@/components/easter/EasterScatter";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ProductGrid } from "@/components/ProductGrid";
import {
  getCategories,
  getProductBySlug,
  getProducts,
} from "@/lib/catalog";

type Props = {
  params: Promise<{ slug: string }>;
};

export const revalidate = 60;

export async function generateStaticParams() {
  const [cats, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);
  return [
    ...cats.map((c) => ({ slug: c.slug })),
    ...products.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cats = await getCategories();
  const cat = cats.find((c) => c.slug === slug);
  if (cat) return { title: `${cat.label} – METMA Ltd. – Eierfarbe` };
  const product = await getProductBySlug(slug);
  if (product) {
    return {
      title: `${product.name} – METMA Ltd. – Eierfarbe`,
      description: product.shortDescription,
    };
  }
  return { title: "Produkte – METMA Ltd. – Eierfarbe" };
}

export default async function ProdukteSlugPage({ params }: Props) {
  const { slug } = await params;
  const [cats, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);
  const cat = cats.find((c) => c.slug === slug);

  if (cat) {
    const filtered = products.filter((p) => p.category === cat.slug);
    return (
      <>
        <section className="relative overflow-hidden border-b border-[var(--metma-line)] bg-[var(--metma-blue-soft)] py-12 md:py-14">
          <SectionScatter variant="story" />
          <div className="container-metma relative z-[1] text-center">
            <p className="eyebrow text-[var(--metma-rose)]">Sortiment</p>
            <h1 className="mt-3 font-display text-[clamp(2.1rem,4.5vw,3.2rem)] font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
              {cat.label}
            </h1>
            <p className="mx-auto mt-3 max-w-lg text-sm leading-7 text-[var(--metma-mute)] md:text-base">
              {filtered.length} Produkte in dieser Kategorie
            </p>
          </div>
        </section>

        <section className="bg-white py-12 md:py-14">
          <div className="container-metma">
            <ProductCatalog products={filtered} activeCategory={cat.slug} />
          </div>
        </section>
      </>
    );
  }

  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const categoryLabel =
    cats.find((c) => c.slug === product.category)?.label ?? product.category;

  const specs = [
    ...product.specs,
    { label: "Produktion", value: "Bulgarien · METMA" },
  ];

  return (
    <>
      <section className="relative overflow-hidden bg-white py-10 md:py-14">
        <SectionScatter variant="products" />
        <div className="container-metma relative z-[1]">
          <nav
            aria-label="Brotkrumen"
            className="flex flex-wrap items-center gap-2 text-sm text-[var(--metma-mute)]"
          >
            <Link
              href="/produkte"
              className="transition hover:text-[var(--metma-rose)]"
            >
              Produkte
            </Link>
            <span aria-hidden>/</span>
            <Link
              href={`/produkte/${product.category}`}
              className="transition hover:text-[var(--metma-rose)]"
            >
              {categoryLabel}
            </Link>
            <span aria-hidden>/</span>
            <span className="text-[var(--metma-ink)]">{product.id}</span>
          </nav>

          <div className="mt-8 grid items-start gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
            <div className="relative aspect-square overflow-hidden bg-white">
              <Image
                src={product.image}
                alt={product.name}
                fill
                priority
                quality={85}
                className="object-contain p-5 transition duration-500 md:p-8"
                sizes="(max-width:1024px) 90vw, 520px"
                unoptimized={
                  product.image.startsWith("http") ||
                  product.image.endsWith(".png")
                }
              />
            </div>

            <div className="lg:pt-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="bg-[var(--metma-sand)] px-3 py-1 text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-navy)]">
                  {categoryLabel}
                </span>
                <span className="text-[0.7rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-mute)]">
                  Art. {product.id}
                </span>
              </div>

              <h1 className="mt-4 font-display text-[clamp(1.85rem,3.6vw,2.75rem)] font-bold leading-[1.1] tracking-[-0.03em] text-[var(--metma-ink)]">
                {product.name}
              </h1>

              <p className="mt-5 max-w-md text-base leading-8 text-[var(--metma-mute)]">
                {product.shortDescription}
              </p>

              <ul className="mt-6 space-y-3 border-y border-[var(--metma-line)] py-6">
                {product.features.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-[var(--metma-ink)]"
                  >
                    <span
                      aria-hidden
                      className="inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--metma-rose)]"
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={`/kontakt?produkt=${product.slug}`}
                  className="btn-metma"
                >
                  Anfrage senden
                </Link>
                <Link
                  href={`/produkte/${product.category}`}
                  className="btn-outline"
                >
                  Mehr {categoryLabel}
                </Link>
              </div>

              <p className="mt-6 text-sm text-[var(--metma-mute)]">
                Fragen?{" "}
                <a
                  href="mailto:sales@metma-de.com"
                  className="font-semibold text-[var(--metma-ink)] underline-offset-4 hover:text-[var(--metma-rose)] hover:underline"
                >
                  sales@metma-de.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--metma-line)] bg-[var(--metma-sand)] py-12 md:py-16">
        <div className="container-metma grid gap-10 lg:grid-cols-2 lg:gap-14">
          <div>
            <p className="eyebrow text-[var(--metma-rose)]">Beschreibung</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--metma-ink)]">
              Produktdetails
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--metma-mute)]">
              {product.description}
            </p>
          </div>

          <div>
            <p className="eyebrow text-[var(--metma-rose)]">Übersicht</p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--metma-ink)]">
              Technische Daten
            </h2>
            <dl className="mt-5 divide-y divide-[var(--metma-line)] border border-[var(--metma-line)] bg-white">
              {specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-[8.5rem_1fr] gap-4 px-5 py-3.5 text-sm sm:grid-cols-[10rem_1fr]"
                >
                  <dt className="font-semibold text-[var(--metma-ink)]">
                    {spec.label}
                  </dt>
                  <dd className="text-[var(--metma-mute)]">{spec.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {related.length > 0 ? (
        <section className="relative overflow-hidden border-t border-[var(--metma-line)] bg-white py-14 md:py-16">
          <SectionScatter variant="story" />
          <div className="container-metma relative z-[1]">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-[var(--metma-rose)]">Weiter stöbern</p>
                <h2 className="mt-2 font-display text-2xl font-bold tracking-tight text-[var(--metma-ink)] md:text-[1.75rem]">
                  Ähnliche Produkte
                </h2>
              </div>
              <Link
                href={`/produkte/${product.category}`}
                className="text-sm font-semibold text-[var(--metma-ink)] underline-offset-4 hover:text-[var(--metma-rose)] hover:underline"
              >
                Alle {categoryLabel} →
              </Link>
            </div>
            <ProductGrid products={related} animated={false} />
          </div>
        </section>
      ) : null}
    </>
  );
}
