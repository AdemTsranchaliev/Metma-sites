import type { SiteCode } from "@/lib/sites";
import { PageHeader } from "@/components/ui";
import { BlogManager } from "@/components/BlogManager";

type Props = {
  searchParams: Promise<{ site?: string }>;
};

export default async function BlogAdminPage({ searchParams }: Props) {
  const { site: raw } = await searchParams;
  const site = (raw as SiteCode) || "De";

  return (
    <>
      <PageHeader
        title="Блог"
        description={`Публикации за ${site}.`}
      />
      <BlogManager site={site} />
    </>
  );
}
