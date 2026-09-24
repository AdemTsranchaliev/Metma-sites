import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const points = [
  {
    n: "01",
    title: "Международна боя за яйца",
    text: "Боите се предлагат в много страни. Пишете ни за повече информация.",
    href: "/kontakti",
  },
  {
    n: "02",
    title: "Имате въпрос?",
    text: "Изпратете имейл и ще ви отговорим.",
    href: "/kontakti",
  },
  {
    n: "03",
    title: "Перфектното великденско яйце",
    text: "Целта ни е най-високо качество за вашите яйца.",
    href: "/produkti",
  },
];

export function HomeStory() {
  return (
    <section className="bg-white py-16 md:py-24">
      <div className="container-metma grid items-start gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--metma-blue)]">
            За METMA
          </p>
          <div className="relative mt-5 h-16 w-44">
            <Image
              src="/images/logo-brand-v3.png"
              alt="METMA"
              fill
              className="object-contain object-left"
              sizes="176px"
            />
          </div>
          <h2 className="mt-6 max-w-md font-display text-[clamp(1.7rem,3.5vw,2.4rem)] font-bold leading-[1.15] tracking-[-0.03em] text-[var(--metma-ink)]">
            Единствената фирма за боя за яйца в България
          </h2>
          <p className="mt-4 max-w-md text-sm leading-7 text-[var(--metma-mute)] md:text-base md:leading-8">
            С изцяло затворено производство постигаме съотношението цена-качество.
            Работим с големи вериги в България и Европа.
          </p>
          <Link href="/za-nas" className="btn-metma mt-8 inline-flex">
            Повече за нас
          </Link>
        </Reveal>

        <div className="divide-y divide-[var(--metma-line)] border-y border-[var(--metma-line)]">
          {points.map((point, index) => (
            <Reveal key={point.n} delayMs={index * 60}>
              <Link href={point.href} className="group grid grid-cols-[3rem_1fr] gap-4 py-6 sm:py-7">
                <span className="font-display text-sm font-bold text-[var(--metma-blue)]">{point.n}</span>
                <span>
                  <span className="block text-base font-semibold text-[var(--metma-ink)] group-hover:text-[var(--metma-rose)]">
                    {point.title}
                  </span>
                  <span className="mt-1 block text-sm leading-6 text-[var(--metma-mute)]">{point.text}</span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
