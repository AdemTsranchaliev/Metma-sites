import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductGallery } from "@/components/ProductGallery";
import { ProductGrid } from "@/components/ProductGrid";
import { ShowMore } from "@/components/ShowMore";
import { getCategories, getProductBySlug, getProducts } from "@/lib/catalog";
import { categoryName, companies, companyName, productTitle } from "@/lib/types";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getProducts();
  return [...new Set(products.map((item) => item.slug))].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = await getProductBySlug((await params).slug);
  if (!product) return { title: "Продукт" };
  return { title: product.name, description: product.shortDescription || product.description };
}

function productCopy(short: string, description: string) {
  const lead = short.replace(/^Описание\s*:?\s*/i, "").trim();
  const body = description.trim();
  if (!body || body === short.trim()) return { lead, usage: "", ingredients: "", usageLabel: "" };
  const label = body.match(/^(Упътване|Употреба)(?=\s|:|$)/i)?.[1];
  const [rawUsage, ingredients = ""] = body.replace(/^(Упътване|Употреба)\s*:?\s*/i, "").split(/\n?\s*Съставки\s*:\s*/i);
  const usage = rawUsage.trim();
  const usageLabel = label ? (label.toLowerCase().startsWith("употреба") ? "Употреба" : "Упътване") : "Описание";
  return { lead, usage: usage === lead ? "" : usage, ingredients: ingredients.trim(), usageLabel };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();
  const [relatedAll, categories] = await Promise.all([getProducts({ brand: product.brand }), getCategories()]);
  const related = relatedAll.filter((item) => item.slug !== product.slug).slice(0, 4);
  const label = categoryName(product.category, categories);
  const brand = companies.find((item) => item.id === product.brand);
  const title = productTitle(product.name, product.id);
  const copy = productCopy(product.shortDescription, product.description);
  const wash = brand?.wash ?? "var(--metma-wash)";
  const ink = brand?.ink ?? "var(--metma-rose)";

  return (
    <article>
      <section style={{ background: wash }}>
        <div className="container-metma py-6 sm:py-8 lg:py-10">
          <Link href="/produkti" className="text-sm font-semibold" style={{ color: ink }}>
            Продукти
          </Link>
          <div className="mt-4 grid items-start gap-6 lg:grid-cols-2 lg:gap-12">
            <div className="lg:sticky lg:top-20">
              <ProductGallery images={product.images} name={title} frame="white" />
            </div>
            <div>
              <div className="flex items-center gap-3">
                {brand ? (
                  <Link href={`/produkti?firma=${brand.id}`} aria-label={brand.name} className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-white shadow-[0_8px_18px_-12px_rgba(29,36,45,0.45)]">
                    <Image src={brand.logo} alt="" fill className="object-contain p-1.5" sizes="44px" />
                  </Link>
                ) : null}
                <p className="text-sm">
                  <Link href={`/produkti?firma=${product.brand}`} className="font-semibold" style={{ color: ink }}>
                    {companyName(product.brand)}
                  </Link>
                  <span className="text-[var(--metma-mute)]"> · </span>
                  <Link href={`/produkti?kategoriya=${product.category}`} className="text-[var(--metma-mute)] hover:text-[var(--metma-ink)]">
                    {label}
                  </Link>
                </p>
              </div>
              <h1 className="mt-4 font-display text-[clamp(1.7rem,3vw,2.6rem)] font-bold leading-[1.08] tracking-[-0.03em]">{title}</h1>
              <p className="mt-3 inline-flex rounded-full bg-white px-3 py-1 text-xs font-bold tracking-[0.08em] text-[var(--metma-mute)]">{product.id}</p>
              {copy.lead ? (
                <ShowMore lines={3} className="mt-4 max-w-xl text-base leading-7">
                  <p>{copy.lead}</p>
                </ShowMore>
              ) : null}
              <Link href={`/kontakti?produkt=${encodeURIComponent(title)}`} className="btn-metma mt-5 w-full px-6 sm:w-auto">
                Запитване
              </Link>
              {copy.usage ? (
                <div className="mt-6 rounded-2xl bg-white/80 p-4 ring-1 ring-black/[0.04] sm:p-5">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em]" style={{ color: ink }}>
                    {copy.usageLabel}
                  </p>
                  <ShowMore lines={4} className="mt-2 text-sm leading-6 text-[var(--metma-ink)]/85">
                    <p className="whitespace-pre-line">{copy.usage}</p>
                  </ShowMore>
                </div>
              ) : null}
              {copy.ingredients ? (
                <div className="mt-3 rounded-2xl bg-white/80 p-4 ring-1 ring-black/[0.04] sm:p-5">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em]" style={{ color: ink }}>
                    Съставки
                  </p>
                  <ShowMore lines={3} className="mt-2 text-sm leading-6 text-[var(--metma-ink)]/85">
                    <p>{copy.ingredients}</p>
                  </ShowMore>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </section>
      {related.length > 0 ? (
        <section className="bg-white">
          <div className="container-metma py-12">
            <div className="mb-6 flex items-end justify-between gap-4">
              <h2 className="font-display text-2xl font-bold">Още от {companyName(product.brand)}</h2>
              <Link href={`/produkti?firma=${product.brand}`} className="text-sm font-semibold" style={{ color: ink }}>
                Всички
              </Link>
            </div>
            <ProductGrid products={related} />
          </div>
        </section>
      ) : null}
    </article>
  );
}
