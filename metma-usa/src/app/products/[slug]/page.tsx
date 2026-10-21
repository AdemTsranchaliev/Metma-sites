import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCatalog } from "@/components/ProductCatalog";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductGrid } from "@/components/ProductGrid";
import { getCategories, getProductBySlug, getProducts, type UsaProduct } from "@/lib/catalog";
import { toneFor } from "@/lib/tones";

export const dynamic = "force-static";

export async function generateStaticParams() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const slugs = new Set([...categories.map((item) => item.slug), ...products.map((item) => item.slug)]);
  return [...slugs].map((slug) => ({ slug }));
}

const labels: Record<string, string> = {
  classic: "Classic kits",
  children: "Children kits",
  display: "Display",
  decoration: "Egg decoration",
};

function instructionKind(url: string) {
  const path = url.split("?")[0].toLowerCase();
  if (path.endsWith(".pdf")) return "PDF";
  if (/\.(png|jpe?g|webp|gif)$/.test(path)) return "Sheet";
  return "File";
}

function kitItems(contents: string) {
  return contents
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function recommendedFor(product: UsaProduct, all: UsaProduct[]) {
  const same = all.filter((item) => item.slug !== product.slug && item.category === product.category);
  const rest = all.filter((item) => item.slug !== product.slug && item.category !== product.category);
  return [...same, ...rest].slice(0, 4);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (labels[slug]) return { title: labels[slug] };
  const product = await getProductBySlug(slug);
  return { title: product?.name ?? "Product" };
}

export default async function ProductOrCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const categories = await getCategories();

  if (categories.some((item) => item.slug === slug) || labels[slug]) {
    const all = await getProducts();
    const products = all.filter((item) => item.category === slug);
    const counts = Object.fromEntries(categories.map((category) => [category.slug, all.filter((item) => item.category === category.slug).length]));
    return (
      <main className="hero-wash">
        <div className="container-usa py-8 sm:py-10">
          <p className="inline-flex rounded-full px-3 py-1 text-[0.7rem] font-bold tracking-[0.18em] text-white uppercase" style={{ background: toneFor(slug).chip }}>
            Products
          </p>
          <h1 className="font-display mt-3 text-4xl text-[var(--usa-navy)] sm:text-5xl">{labels[slug] ?? slug}</h1>
          <div className="mt-6">
            <ProductCatalog products={products} categories={categories} activeCategory={slug} counts={counts} />
          </div>
        </div>
      </main>
    );
  }

  const all = await getProducts();
  const product = all.find((item) => item.slug === slug);
  if (!product) notFound();
  const tone = toneFor(product.category);
  const categoryLabel = categories.find((item) => item.slug === product.category)?.label ?? labels[product.category] ?? product.category;
  const items = kitItems(product.contents);
  const recommended = recommendedFor(product, all);
  const sameCategory = recommended.every((item) => item.category === product.category);
  const kind = product.instructionsUrl ? instructionKind(product.instructionsUrl) : null;
  const details = product.description && product.description !== product.shortDescription ? product.description : "";

  return (
    <main>
      <div className="hero-wash">
        <div className="container-usa py-8 sm:py-10">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm font-semibold text-[var(--usa-mute)]">
            <Link href="/products" className="hover:text-[var(--usa-red)]">
              Products
            </Link>
            <span aria-hidden="true">/</span>
            <Link href={`/products/${product.category}`} className="hover:text-[var(--usa-red)]">
              {categoryLabel}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-[var(--usa-navy)]">{product.name}</span>
          </nav>

          <div className="mt-6 grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <ProductGallery images={product.images} name={product.name} background={tone.bg} />
            <div className="lg:sticky lg:top-24">
              <p className="inline-flex rounded-full px-3 py-1 text-[0.7rem] font-bold tracking-[0.18em] text-white uppercase" style={{ background: tone.chip }}>
                {categoryLabel}
              </p>
              <h1 className="font-display mt-4 text-4xl text-[var(--usa-navy)] sm:text-5xl">{product.name}</h1>
              <p className="mt-2 text-sm font-bold tracking-wide" style={{ color: tone.ink }}>
                {product.sku}
              </p>
              <p className="mt-5 max-w-xl leading-7 text-[var(--usa-mute)]">{product.shortDescription}</p>
              {details ? <p className="mt-4 max-w-xl leading-7 text-[var(--usa-mute)]">{details}</p> : null}
              {items.length > 0 ? (
                <div className="mt-6 rounded-2xl bg-white/80 p-4 ring-1 ring-black/5">
                  <p className="text-[0.7rem] font-bold tracking-[0.16em] uppercase" style={{ color: tone.ink }}>
                    Contents
                  </p>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {items.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm leading-5 text-[var(--usa-ink)]">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: tone.chip }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
              {product.instructionsUrl ? (
                <a
                  href={product.instructionsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="group mt-5 flex items-center gap-4 rounded-2xl bg-white p-3 pr-4 text-left shadow-[0_14px_32px_-22px_rgba(12,35,64,0.55)] ring-1 ring-black/5 transition duration-200 hover:-translate-y-0.5 hover:ring-[var(--usa-navy)]"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-white" style={{ background: tone.chip }}>
                    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden="true">
                      <path d="M7 3.5h7.2L19 8.2V20a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 6 20V5A1.5 1.5 0 0 1 7.5 3.5H7Z" stroke="currentColor" strokeWidth="1.6" />
                      <path d="M14 3.8V8h4.2" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                      <path d="M9 12.5h6M9 16h4.2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
                    </svg>
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="flex flex-wrap items-center gap-2">
                      <span className="font-display text-xl leading-none text-[var(--usa-navy)]">Instructions</span>
                      <span className="rounded-full px-2 py-0.5 text-[0.62rem] font-bold tracking-[0.12em] text-white uppercase" style={{ background: tone.chip }}>
                        {kind}
                      </span>
                    </span>
                    <span className="mt-1 block text-sm text-[var(--usa-mute)]">
                      {kind === "PDF" ? "Open the coloring guide as a PDF" : "Open the coloring guide"}
                    </span>
                  </span>
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[var(--usa-sand)] text-[var(--usa-navy)] transition group-hover:bg-[var(--usa-navy)] group-hover:text-white">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" aria-hidden="true">
                      <path d="M8 16 16 8M10 8h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {recommended.length > 0 ? (
        <section className="border-t border-[var(--usa-line)] bg-white py-12 sm:py-16">
          <div className="container-usa">
            <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-[var(--usa-red)]">Recommended</p>
                <h2 className="font-display mt-2 text-3xl text-[var(--usa-navy)] sm:text-4xl">
                  {sameCategory ? `More ${categoryLabel.toLowerCase()}` : "You may also like"}
                </h2>
              </div>
              <Link href={`/products/${product.category}`} className="text-sm font-bold text-[var(--usa-navy)] hover:text-[var(--usa-red)]">
                All {categoryLabel}
              </Link>
            </div>
            <ProductGrid products={recommended} />
          </div>
        </section>
      ) : null}
    </main>
  );
}
