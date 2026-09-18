import type { SiteCode } from "@/lib/sites";
import { PageHeader } from "@/components/ui";
import { QrCodesManager } from "@/components/QrCodesManager";

type Props = {
  searchParams: Promise<{ site?: string }>;
};

export default async function QrCodesPage({ searchParams }: Props) {
  const { site: raw } = await searchParams;
  const site = (raw as SiteCode) || "De";

  return (
    <>
      <PageHeader
        title="QR кодове"
        description="Поставяте линк за пренасочване. Продуктът е по избор — само за ориентация."
      />
      <QrCodesManager site={site} />
    </>
  );
}
