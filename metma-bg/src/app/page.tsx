import type { Metadata } from "next";
import { HomeHero } from "@/components/home/HomeHero";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";
import { HomeStory } from "@/components/home/HomeStory";
import { HomeBrands } from "@/components/home/HomeBrands";
import { HomeProducts } from "@/components/home/HomeProducts";
import { EggPainter } from "@/components/easter/EggPainter";
import { HomeCountdownStrip } from "@/components/home/HomeCountdownStrip";
import { HomeJournal } from "@/components/home/HomeJournal";
import { HomeInstagram } from "@/components/home/HomeInstagram";
import { HomeContact } from "@/components/home/HomeContact";

export const metadata: Metadata = pageMetadata({
  description: siteConfig.defaultDescription,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeBrands />
      <HomeCountdownStrip />
      <HomeStory />
      <HomeProducts />
      <EggPainter />
      <HomeJournal />
      <HomeInstagram />
      <HomeContact />
    </>
  );
}
