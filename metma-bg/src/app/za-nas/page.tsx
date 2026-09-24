import type { Metadata } from "next";
import Image from "next/image";
import { HomeContact } from "@/components/home/HomeContact";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { team } from "@/data/home";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "За нас",
  description:
    "METMA е единствената фирма за боя за яйца в България с изцяло затворено производство. Качество от 1999 г.",
  path: "/za-nas",
  image: "/images/about/METMA-History-infochart-1.png",
});

const story = [
  {
    n: "01",
    title: "От 1999",
    text: "Бои за яйца, направени от нас — пораснали заедно с Великден, търговията и семейството.",
    bg: "var(--metma-peach)",
    num: "var(--metma-rose)",
  },
  {
    n: "02",
    title: "Собствено производство",
    text: "От рецептата до опаковката под един покрив — качество и честна цена.",
    bg: "var(--metma-blue-soft)",
    num: "var(--metma-blue)",
  },
  {
    n: "03",
    title: "България и Европа",
    text: "Работим с големи търговски вериги в България и извън нея.",
    bg: "var(--metma-butter)",
    num: "var(--metma-navy)",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro
        eyebrow="Компания"
        title="За нас"
        subtitle="Боя за яйца от собствено производство — от 1999 г. в България."
      />

      <section className="bg-white py-10 md:py-14">
        <div className="container-metma">
          <Reveal>
            <div className="relative aspect-[2058/834] overflow-hidden bg-[var(--metma-sand)]">
              <Image
                src="/images/about/METMA-History-infochart-1.png"
                alt="METMA — история и производство"
                fill
                priority
                className="object-contain"
                sizes="(max-width:1120px) 100vw, 1120px"
              />
            </div>
          </Reveal>

          <Reveal delayMs={60}>
            <div className="mx-auto mt-10 max-w-2xl text-center md:mt-12">
              <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-bold leading-snug tracking-[-0.03em] text-[var(--metma-ink)]">
                Единствената фирма за боя за яйца в България
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--metma-mute)]">
                С изцяло затворено производство постигаме съотношението
                цена-качество. Работим с едни от най-големите вериги в България
                и Европа. Безкомпромисни сме в качеството и обслужването на
                клиентите ни.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-3 md:mt-12 md:grid-cols-3">
            {story.map((item, i) => (
              <Reveal key={item.n} delayMs={i * 55}>
                <div className="flex h-full flex-col px-6 py-7 sm:px-7" style={{ background: item.bg }}>
                  <span
                    className="font-display text-3xl font-bold leading-none tracking-tight"
                    style={{ color: item.num }}
                  >
                    {item.n}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-[var(--metma-ink)]">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-[var(--metma-mute)]">{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <figure key={person.name} className="text-center">
                <div className="relative mx-auto aspect-square max-w-[220px] overflow-hidden bg-[var(--metma-sand)]">
                  <Image src={person.image} alt={person.name} fill className="object-cover object-top" sizes="220px" />
                </div>
                <figcaption className="mt-3">
                  <p className="font-display text-lg font-bold text-[var(--metma-ink)]">{person.name}</p>
                  <p className="text-sm text-[var(--metma-mute)]">{person.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
      <HomeContact />
    </>
  );
}
