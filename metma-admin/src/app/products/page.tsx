import type { SiteCode } from "@/lib/sites";
import { PageHeader } from "@/components/ui";
import { ProductsManager } from "@/components/ProductsManager";

type Props = {
  searchParams: Promise<{ site?: string }>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const { site: raw } = await searchParams;
  const site = (raw as SiteCode) || "De";

  return (
    <>
      <PageHeader
        title="Продукти"
        description={`Каталог за ${site}. Добавяне, редакция, няколко снимки и видео.`}
      />
      <ProductsManager site={site} />
    </>
  );
}
