import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { brands, getBrand } from "@/data/brands";
import { BrandSwitch } from "@/components/BrandSwitch";
import { BrandWash } from "@/components/BrandWash";
import { ProductGrid } from "@/components/ProductGrid";
import { getMessages } from "@/i18n/messages";
import { getProducts } from "@/lib/catalog";
import { getStatic } from "@/i18n/static";
import { localePath, parseLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return brands.map((brand) => ({ slug: brand.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = parseLocale(raw);
  const copy = getMessages(locale);
  const brand = getBrand(slug);
  if (!brand) {
    return pageMetadata({
      title: copy.home.brandsTitle,
      description: copy.meta.description,
      path: "/marki",
      locale,
    });
  }
  return pageMetadata({
    title: brand.name,
    description: brand.text,
    path: `/marki/${brand.id}`,
    image: brand.logo,
    locale,
  });
}

export default async function BrandPage({ params }: Props) {
  const { locale: raw, slug } = await params;
  const locale = parseLocale(raw);
  const brand = getBrand(slug);
  if (!brand) notFound();
  const copy = getStatic(locale).brands[brand.id as "vesache" | "ino" | "pet" | "metma"];
  const toProducts = getStatic(locale).products.toProducts;

  const products = await getProducts({ brand: brand.id });

  return (
    <div style={{ background: brand.wash }} className="min-h-[70vh]">
      <BrandWash color={brand.wash} />
      <div className="container-metma flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between md:py-14">
        <div className="min-w-0">
          <h1 className="font-display text-[clamp(3.2rem,8vw,6rem)] font-bold leading-[0.86] tracking-[-0.05em] text-[var(--metma-ink)]">
            {brand.name}
          </h1>
          <p className="mt-3 text-sm text-[var(--metma-ink)]/65">
            {brand.since} · {copy.tag}
          </p>
          <p className="mt-2 max-w-md text-sm leading-6 text-[var(--metma-ink)]/75">{copy.text}</p>
          <Link href={`${localePath(locale, "/produkti")}?marka=${brand.id}`} className="mt-5 inline-flex text-sm font-semibold" style={{ color: brand.ink }}>
            {toProducts}
          </Link>
        </div>
        <BrandSwitch active={brand.id} links />
      </div>
      <div className="rounded-t-[1.75rem] bg-white pb-16 pt-8">
        <div className="container-metma">
          <ProductGrid products={products} animated={false} />
        </div>
      </div>
    </div>
  );
}
