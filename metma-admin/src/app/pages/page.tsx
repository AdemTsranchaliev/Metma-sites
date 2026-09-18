import type { SiteCode } from "@/lib/sites";
import { PageHeader } from "@/components/ui";
import { PagesManager } from "@/components/PagesManager";

type Props = {
  searchParams: Promise<{ site?: string }>;
};

export default async function PagesAdminPage({ searchParams }: Props) {
  const { site: raw } = await searchParams;
  const site = (raw as SiteCode) || "De";

  return (
    <>
      <PageHeader
        title="Страници"
        description={`CMS страници за ${site}.`}
      />
      <PagesManager site={site} />
    </>
  );
}
