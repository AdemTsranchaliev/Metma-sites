import { CatalogShell } from "@/components/CatalogShell";
import { getMessages } from "@/i18n/messages";
import { getProducts } from "@/lib/catalog";
import { getStatic } from "@/i18n/static";
import { parseLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const copy = getMessages(locale).meta;
  return pageMetadata({
    title: copy.productsTitle,
    description: copy.productsDescription,
    path: "/produkti",
    locale,
  });
}

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  const products = await getProducts();
  const copy = getMessages(locale);

  return (
    <CatalogShell
      products={products}
      activeCategory="alle"
      title={copy.meta.productsTitle}
      subtitle={getStatic(locale).products.subtitle}
    />
  );
}
