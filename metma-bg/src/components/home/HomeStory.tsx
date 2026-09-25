import Link from "next/link";
import { EggIcon } from "@/components/easter/EasterMotifs";
import { Reveal } from "@/components/Reveal";

function GlobeIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="8.25" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M3.9 12h16.2M12 3.8c2.1 2.2 3.2 4.9 3.2 8.2s-1.1 6-3.2 8.2c-2.1-2.2-3.2-4.9-3.2-8.2s1.1-6 3.2-8.2Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" aria-hidden>
      <rect x="3.5" y="5.5" width="17" height="13" rx="2.4" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M4.6 7.6 12 12.8l7.4-5.2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function EggBadgeIcon() {
  return <EggIcon fill="currentColor" pattern="dots" className="h-8 w-6" />;
}

const points = [
  {
    n: "01",
    title: "Международна боя за яйца",
    text: "Боите се предлагат в много страни. Пишете ни за повече информация.",
    href: "/kontakti",
    bg: "#ffd8c8",
    fg: "#9a3412",
    mute: "#7c4a3a",
    icon: GlobeIcon,
  },
  {
    n: "02",
    title: "Имате въпрос?",
    text: "Изпратете имейл и ще ви отговорим.",
    href: "/kontakti",
    bg: "#ffe7a8",
    fg: "#8a5a12",
    mute: "#6d5430",
    icon: MailIcon,
  },
  {
    n: "03",
    title: "Перфектното великденско яйце",
    text: "Целта ни е най-високо качество за вашите яйца.",
    href: "/produkti",
    bg: "#d4e6f8",
    fg: "#24598a",
    mute: "#3d6280",
    icon: EggBadgeIcon,
  },
];

export function HomeStory() {
  return (
    <section className="relative overflow-hidden bg-[#fff8f4] py-14 text-[#2f3b4c] sm:py-16 md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-16 h-72 w-72 rounded-full bg-[#ffd0bf] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-[#d6e6f4] blur-3xl"
      />

      <div className="container-metma relative">
        <Reveal>
          <p className="eyebrow text-[var(--metma-rose)]">За METMA</p>
          <h2 className="mt-4 max-w-3xl font-display text-[clamp(2rem,4.6vw,3.35rem)] font-bold leading-[1.05] tracking-[-0.04em]">
            Единствената фирма
            <span className="mt-1 block">за боя за яйца в България</span>
          </h2>
        </Reveal>

        <Reveal
          delayMs={50}
          className="mt-6 flex flex-col items-start gap-5 sm:mt-7 sm:flex-row sm:items-center sm:justify-between"
        >
          <p className="max-w-xl text-[0.98rem] leading-7 text-[#5c6b7a]">
            С изцяло затворено производство постигаме съотношението цена-качество.
            Работим с големи вериги в България и Европа.
          </p>
          <Link href="/za-nas" className="btn-metma shrink-0">
            Повече за нас
          </Link>
        </Reveal>

        <div className="mt-8 grid gap-3 sm:mt-10 md:grid-cols-3 md:gap-4">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
            <Reveal key={point.n} delayMs={index * 80} className="h-full">
              <Link
                href={point.href}
                className="group flex h-full flex-col rounded-[1.4rem] px-5 py-5 transition duration-300 hover:-translate-y-1 sm:px-6 sm:py-6"
                style={{ background: point.bg, color: point.fg }}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/80">
                    <Icon />
                  </span>
                  <span
                    aria-hidden
                    className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/70 text-sm font-bold transition duration-300 group-hover:translate-x-0.5 group-hover:bg-white"
                  >
                    →
                  </span>
                </span>
                <span className="mt-5 block text-xs font-bold tracking-[0.18em]">{point.n}</span>
                <span className="mt-2 block font-display text-xl font-bold leading-snug tracking-[-0.03em] sm:text-[1.35rem]">
                  {point.title}
                </span>
                <span className="mt-2 block text-sm leading-6" style={{ color: point.mute }}>
                  {point.text}
                </span>
              </Link>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
