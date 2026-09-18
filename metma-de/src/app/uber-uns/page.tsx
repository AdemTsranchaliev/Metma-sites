import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionScatter } from "@/components/easter/EasterScatter";
import { HomeContact } from "@/components/home/HomeContact";
import { PageIntro } from "@/components/PageIntro";
import { Reveal } from "@/components/Reveal";
import { team } from "@/data/home";

export const metadata: Metadata = {
  title: "Über Uns – METMA Ltd. – Eierfarbe",
  description:
    "METMA — das einzige Unternehmen für Eierfärben in Bulgarien mit geschlossenem Produktionsprozess. Qualität seit 1999.",
};

const story = [
  {
    n: "01",
    title: "Seit 1999",
    text: "Eierfarben aus eigener Hand — gewachsen mit Ostern, Handel und Familie.",
    bg: "var(--metma-peach)",
    num: "var(--metma-rose)",
  },
  {
    n: "02",
    title: "Eigene Produktion",
    text: "Vom Rezept bis zur Packung unter einem Dach — Qualität und faire Preise.",
    bg: "var(--metma-blue-soft)",
    num: "var(--metma-blue)",
  },
  {
    n: "03",
    title: "BG & Europa",
    text: "Große Einzelhandelsketten vertrauen uns in Bulgarien und darüber hinaus.",
    bg: "var(--metma-butter)",
    num: "var(--metma-navy)",
  },
];

export default function UberUnsPage() {
  return (
    <>
      <PageIntro
        eyebrow="Unternehmen"
        title="Über uns"
        subtitle="Eierfarben aus eigener Produktion — seit 1999 in Bulgarien."
      />

      <section className="bg-white py-10 md:py-14">
        <div className="container-metma">
          <Reveal>
            <div className="relative aspect-[2058/834] overflow-hidden bg-[var(--metma-sand)]">
              <Image
                src="/images/about/history.png"
                alt="METMA — Geschichte und Produktion"
                fill
                priority
                quality={85}
                className="object-cover"
                sizes="(max-width:1120px) 100vw, 1120px"
              />
            </div>
          </Reveal>

          <Reveal delayMs={60}>
            <div className="mx-auto mt-10 max-w-2xl text-center md:mt-12">
              <h2 className="font-display text-[clamp(1.45rem,3vw,2rem)] font-bold leading-snug tracking-[-0.03em] text-[var(--metma-ink)]">
                Das einzige Unternehmen für Eierfärben in Bulgarien
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--metma-mute)]">
                Mit vollständig geschlossenem Produktionsprozess. Wir arbeiten
                mit großen Einzelhandelsketten in Bulgarien und Europa —
                kompromisslos in Qualität und Service.
              </p>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-3 md:mt-12 md:grid-cols-3">
            {story.map((item, i) => (
              <Reveal key={item.n} delayMs={i * 55}>
                <div
                  className="flex h-full flex-col px-6 py-7 sm:px-7"
                  style={{ background: item.bg }}
                >
                  <span
                    className="font-display text-3xl font-bold leading-none tracking-tight"
                    style={{ color: item.num }}
                  >
                    {item.n}
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-[var(--metma-ink)]">
                    {item.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-[var(--metma-mute)]">
                    {item.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delayMs={100}>
            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link href="/produkte" className="btn-metma">
                Sortiment entdecken
              </Link>
              <Link href="/kontakt" className="btn-outline">
                Kontakt
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-t border-[var(--metma-line)] bg-[var(--metma-sand)] py-14 md:py-16">
        <SectionScatter variant="story" />
        <div className="container-metma relative z-[1]">
          <Reveal>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-[var(--metma-rose)]">Team</p>
                <h2 className="mt-2 font-display text-[clamp(1.55rem,2.8vw,2.15rem)] font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
                  Wer hinter den Farben steht
                </h2>
              </div>
              <p className="text-sm text-[var(--metma-mute)]">
                {team.length} Personen · Produktion & Vertrieb
              </p>
            </div>
          </Reveal>

          <div className="mt-9 grid gap-x-5 gap-y-9 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, i) => (
              <Reveal key={member.name} delayMs={i * 45}>
                <article className="group text-center">
                  <div className="relative mx-auto aspect-square w-full max-w-[200px] overflow-hidden rounded-full bg-white">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      quality={80}
                      className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
                      sizes="200px"
                    />
                  </div>
                  <h3 className="mt-4 font-display text-[1.02rem] font-bold tracking-tight text-[var(--metma-ink)]">
                    {member.name}
                  </h3>
                  <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-rose)]">
                    {member.role}
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HomeContact />
    </>
  );
}
