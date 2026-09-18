import type { SiteCode } from "@/lib/sites";
import { PageHeader } from "@/components/ui";
import { CategoriesManager } from "@/components/CategoriesManager";

type Props = {
  searchParams: Promise<{ site?: string }>;
};

export default async function CategoriesPage({ searchParams }: Props) {
  const { site: raw } = await searchParams;
  const site = (raw as SiteCode) || "De";

  return (
    <>
      <PageHeader
        title="Категории"
        description="Alle / Farbstoffe / Sets… — добавяйте нови категории за каталога."
      />
      <CategoriesManager site={site} />
    </>
  );
}
