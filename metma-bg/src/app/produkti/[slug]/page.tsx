import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBrand } from "@/data/brands";
import { BrandWash } from "@/components/BrandWash";
import { CatalogShell } from "@/components/CatalogShell";
import { ExpandableText } from "@/components/ExpandableText";
import { ProductGrid } from "@/components/ProductGrid";
import { JsonLd } from "@/components/JsonLd";
import {
  getCategories,
  getProductBySlug,
  getProducts,
} from "@/lib/catalog";
import { absoluteUrl, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const [cats, products] = await Promise.all([getCategories(), getProducts()]);
  return [
    ...cats.map((c) => ({ slug: c.slug })),
    ...products.map((p) => ({ slug: p.slug })),
  ];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const cats = await getCategories();
  const cat = cats.find((c) => c.slug === slug);
  if (cat) {
    return pageMetadata({
      title: cat.label,
      description: `${cat.label} от METMA — боя за яйца и великденски продукти от собствено производство.`,
      path: `/produkti/${cat.slug}`,
    });
  }
  const product = await getProductBySlug(slug);
  if (product) {
    return pageMetadata({
      title: product.name,
      description: product.shortDescription || product.description,
      path: `/produkti/${product.slug}`,
      image: product.image,
    });
  }
  return pageMetadata({
    title: "Продукти",
    description: "Асортимент на METMA.",
    path: "/produkti",
  });
}

export default async function ProductSlugPage({ params }: Props) {
  const { slug } = await params;
  const [cats, products] = await Promise.all([getCategories(), getProducts()]);
  const cat = cats.find((c) => c.slug === slug);

  if (cat) {
    const filtered = products.filter((p) => p.category === cat.slug);
    return (
      <>
        <JsonLd
          data={breadcrumbJsonLd([
            { name: "Продукти", path: "/produkti" },
            { name: cat.label, path: `/produkti/${cat.slug}` },
          ])}
        />
        <CatalogShell
          products={filtered}
          activeCategory={cat.slug}
          title={cat.label}
          subtitle={`${filtered.length} продукта в тази категория`}
        />
      </>
    );
  }

  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const related = products
    .filter((p) => p.brand === product.brand && p.slug !== product.slug)
    .slice(0, 4);
  const category = cats.find((c) => c.slug === product.category);
  const brand = getBrand(product.brand);
  const paragraphs = product.description
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Продукти", path: "/produkti" },
            ...(category
              ? [{ name: category.label, path: `/produkti/${category.slug}` }]
              : []),
            { name: product.name, path: `/produkti/${product.slug}` },
          ]),
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            sku: product.id,
            image: product.images.map((img) => absoluteUrl(img)),
            description: product.shortDescription || product.description,
            brand: { "@type": "Brand", name: brand?.name ?? siteConfig.shortName },
          },
        ]}
      />
      <BrandWash color={brand?.wash ?? "#f4f1ec"} />
      <div style={{ background: brand?.wash ?? "#f4f1ec" }}>
        <div className="container-metma flex items-end justify-between gap-6 py-8 md:py-12">
          <h1 className="max-w-3xl font-display text-[clamp(2.2rem,5vw,4.2rem)] font-bold leading-[0.9] tracking-[-0.045em] text-[var(--metma-ink)]">
            {product.name}
          </h1>
          {brand ? (
            <Link href={`/marki/${brand.id}`} className="relative hidden h-16 w-16 shrink-0 overflow-hidden rounded-full bg-white sm:block" aria-label={brand.name}>
              <Image src={brand.logo} alt="" fill className="object-contain p-1.5" sizes="64px" />
            </Link>
          ) : null}
        </div>
        <div className="rounded-t-[1.75rem] bg-white pb-16 shadow-[0_-20px_50px_-36px_rgba(23,23,23,0.35)]">
          <div className="container-metma grid gap-10 py-8 md:py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
            <div className="grid gap-3">
              {product.images.map((src) => (
                <div key={src} className="relative aspect-square overflow-hidden rounded-2xl bg-white ring-1 ring-black/[0.06]">
                  <Image
                    src={src}
                    alt={product.name}
                    fill
                    className="object-contain p-8"
                    sizes="(max-width:1024px) 100vw, 50vw"
                    unoptimized={src.endsWith(".png")}
                  />
                </div>
              ))}
            </div>
            <div className="lg:pt-4">
              <p className="text-sm text-[var(--metma-mute)]">
                {brand ? (
                  <Link href={`/marki/${brand.id}`} style={{ color: brand.ink }}>
                    {brand.name}
                  </Link>
                ) : null}
                {brand && category ? " · " : ""}
                {category ? category.label : ""}
                {` · ${product.id}`}
              </p>
              <div className="mt-6 text-sm leading-7 text-[var(--metma-ink)]/80 md:text-base md:leading-8">
                <ExpandableText paragraphs={paragraphs} />
              </div>
              <Link href="/kontakti" className="btn-metma mt-8 inline-flex" style={{ background: brand?.ink }}>
                Запитване
              </Link>
            </div>
          </div>
          {related.length > 0 ? (
            <div className="container-metma border-t border-[var(--metma-line)] pt-10">
              <h2 className="text-sm font-medium text-[var(--metma-mute)]">Още от {brand?.name ?? "категорията"}</h2>
              <div className="mt-6">
                <ProductGrid products={related} animated={false} />
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}
