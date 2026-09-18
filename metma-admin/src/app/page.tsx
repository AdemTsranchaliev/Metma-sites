import type { SiteCode } from "@/lib/sites";
import { PageHeader } from "@/components/ui";
import { DashboardCounts } from "@/components/DashboardCounts";

type Props = {
  searchParams: Promise<{ site?: string }>;
};

export default async function DashboardPage({ searchParams }: Props) {
  const { site: raw } = await searchParams;
  const site = (raw as SiteCode) || "De";

  return (
    <>
      <PageHeader
        title="Табло"
        description="Преглед за избрания пазарен сайт. В демо режим промените се пазят в браузъра."
      />
      <DashboardCounts site={site} />
    </>
  );
}
