import { HomeHero } from "@/components/home/HomeHero";
import { HomeStory } from "@/components/home/HomeStory";
import { HomeProducts } from "@/components/home/HomeProducts";
import { EggKnock } from "@/components/easter/EggKnock";
import { HomeCountdownStrip } from "@/components/home/HomeCountdownStrip";
import { HomeJournal } from "@/components/home/HomeJournal";
import { HomeContact } from "@/components/home/HomeContact";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeCountdownStrip />
      <HomeStory />
      <HomeProducts />
      <EggKnock />
      <HomeJournal />
      <HomeContact />
    </>
  );
}
