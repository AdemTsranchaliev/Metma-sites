import type { SiteCode } from "@/lib/sites";
import { PageHeader } from "@/components/ui";
import { MediaManager } from "@/components/MediaManager";

type Props = {
  searchParams: Promise<{ site?: string }>;
};

export default async function MediaAdminPage({ searchParams }: Props) {
  const { site: raw } = await searchParams;
  const site = (raw as SiteCode) || "De";

  return (
    <>
      <PageHeader
        title="Медия"
        description="Качване и управление на изображения и видеа за този сайт."
      />
      <MediaManager site={site} />
    </>
  );
}
