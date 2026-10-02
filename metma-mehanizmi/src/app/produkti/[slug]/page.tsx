import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Gallery } from "@/components/Gallery";
import { JsonLd } from "@/components/JsonLd";
import { ProductCard } from "@/components/ProductCard";
import { getCategory, getProduct, products, productsByCategory } from "@/data/products";
import { breadcrumbJsonLd, pageMetadata, productJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) {
    return pageMetadata({
      title: "Продукт",
      description: "Продукт от каталога на МЕТМА.",
      path: "/produkti",
      noIndex: true,
    });
  }
  const category = getCategory(product.category);
  return pageMetadata({
    title: product.title,
    description: category
      ? `${product.title}. ${category.summary} Размери и наличност при запитване.`
      : `${product.title} — продукт на МЕТМА ООД. Размери и наличност при запитване.`,
    path: `/produkti/${product.slug}`,
    image: product.images[0],
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const related = productsByCategory(product.category)
    .filter((item) => item.slug !== product.slug)
    .slice(0, 3);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Начало", path: "/" },
            { name: "Продукти", path: "/produkti" },
            ...(category
              ? [{ name: category.name, path: `/produkti/kategoria/${category.id}` }]
              : []),
            { name: product.title, path: `/produkti/${product.slug}` },
          ]),
          productJsonLd({
            name: product.title,
            description: category
              ? `${product.title}. ${category.summary}`
              : product.title,
            path: `/produkti/${product.slug}`,
            images: product.images,
            category: category?.name,
          }),
        ]}
      />
      <p className="text-sm text-muted">
        <Link href="/produkti" className="hover:text-ink">
          Продукти
        </Link>
        {category ? (
          <>
            {" / "}
            <Link href={`/produkti/kategoria/${category.id}`} className="hover:text-ink">
              {category.name}
            </Link>
          </>
        ) : null}
      </p>
      <div className="mt-8 grid items-start gap-10 lg:grid-cols-2">
        <Gallery images={product.images} alt={product.title} />
        <div className="lg:sticky lg:top-24">
          <p className="text-xs font-semibold tracking-[0.18em] text-brand uppercase">{category?.name}</p>
          <h1 className="display mt-3 text-4xl sm:text-5xl">{product.title}</h1>
          <p className="mt-5 max-w-md border-t border-line pt-5 text-base leading-7 text-muted">
            {category?.summary} Размери и наличност — при запитване.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/kontakti?produkt=${encodeURIComponent(product.title)}`}
              className="btn"
            >
              Запитване за този продукт
            </Link>
            <a
              href="tel:+359884624024"
              className="btn-quiet"
            >
              +359 884 624 024
            </a>
          </div>
        </div>
      </div>
      {related.length > 0 ? (
        <section className="mt-20 border-t border-line pt-12">
          <h2 className="display text-4xl">Още от категорията</h2>
          <div className="mt-8 grid gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}
