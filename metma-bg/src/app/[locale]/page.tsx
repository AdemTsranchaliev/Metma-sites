import { getMessages } from "@/i18n/messages";
import { parseLocale } from "@/lib/i18n";
import { pageMetadata } from "@/lib/seo";
import { HomeHero } from "@/components/home/HomeHero";
import { HomeStory } from "@/components/home/HomeStory";
import { HomeBrands } from "@/components/home/HomeBrands";
import { HomeProducts } from "@/components/home/HomeProducts";
import { EggPainter } from "@/components/easter/EggPainter";
import { HomeCountdownStrip } from "@/components/home/HomeCountdownStrip";
import { HomeJournal } from "@/components/home/HomeJournal";
import { HomeInstagram } from "@/components/home/HomeInstagram";
import { HomeContact } from "@/components/home/HomeContact";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<import("next").Metadata> {
  const locale = parseLocale((await params).locale);
  return pageMetadata({
    description: getMessages(locale).meta.description,
    path: "/",
    locale,
  });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = parseLocale((await params).locale);
  return (
    <>
      <HomeHero locale={locale} />
      <HomeBrands />
      <HomeCountdownStrip />
      <HomeStory locale={locale} />
      <HomeProducts locale={locale} />
      <EggPainter />
      <HomeJournal locale={locale} />
      <HomeInstagram locale={locale} />
      <HomeContact locale={locale} />
    </>
  );
}
