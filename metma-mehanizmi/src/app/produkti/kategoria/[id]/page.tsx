import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Catalog } from "@/components/Catalog";
import { JsonLd } from "@/components/JsonLd";
import { PageHead } from "@/components/PageHead";
import { categories, isCategoryId, productsByCategory } from "@/data/products";
import { breadcrumbJsonLd, itemListJsonLd, pageMetadata } from "@/lib/seo";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return categories.map((category) => ({ id: category.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const category = categories.find((item) => item.id === id);
  if (!category) {
    return pageMetadata({
      title: "Продукти",
      description: "Каталог на МЕТМА.",
      path: "/produkti",
      noIndex: true,
    });
  }
  return pageMetadata({
    title: category.name,
    description: `${category.summary} Производство на МЕТМА ООД в Пазарджик. Размери и наличност при запитване.`,
    path: `/produkti/kategoria/${category.id}`,
  });
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  if (!isCategoryId(id)) notFound();
  const category = categories.find((item) => item.id === id);
  if (!category) notFound();
  const list = productsByCategory(category.id);

  return (
    <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: "Начало", path: "/" },
            { name: "Продукти", path: "/produkti" },
            { name: category.name, path: `/produkti/kategoria/${category.id}` },
          ]),
          itemListJsonLd(
            category.name,
            list.map((product) => ({
              name: product.title,
              path: `/produkti/${product.slug}`,
            })),
          ),
        ]}
      />
      <PageHead eyebrow="Каталог" title={category.name} lede={category.summary} />
      <div className="mt-10">
        <Catalog active={category.id} />
      </div>
    </div>
  );
}
