import { HomeHero } from "@/components/home/HomeHero";
import { HomeFeatures } from "@/components/home/HomeFeatures";
import { HomeAboutWave } from "@/components/home/HomeAboutWave";
import { HomeProducts } from "@/components/home/HomeProducts";
import { HomeJournal } from "@/components/home/HomeJournal";
import { HomeContact } from "@/components/home/HomeContact";
import { WaveBottom } from "@/components/home/DesignDetails";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <HomeFeatures />
      <div className="bg-white">
        <WaveBottom fill="var(--metma-blue)" />
      </div>
      <HomeAboutWave />
      <div className="bg-[var(--metma-blue)]">
        <WaveBottom fill="var(--metma-paper)" />
      </div>
      <HomeProducts />
      <HomeJournal />
      <HomeContact />
    </>
  );
}
