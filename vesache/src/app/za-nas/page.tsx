import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { EggIcon } from "@/components/Motifs";
import { ShowMore } from "@/components/ShowMore";
import { companies } from "@/lib/types";

export const metadata: Metadata = {
  title: "За нас",
  description: "Весаче ЕАД — боя за яйца и великденски украси от 1992 г. в Пазарджик.",
};

const dyes = [
  ["#e23b3b", "Червена", "dots"],
  ["#f08a24", "Оранжева", "stripes"],
  ["#f2c31a", "Жълта", "zigzag"],
  ["#3dae4a", "Зелена", "dots"],
  ["#2f6fe0", "Синя", "stripes"],
  ["#7a4bb8", "Лилава", "zigzag"],
  ["#e45b9a", "Розова", "dots"],
] as const;

const tilts = [-10, 7, -5, 9, -8, 6, -12];

const beats = [
  {
    year: "1992",
    dye: "#2e64b4",
    wash: "#dbe9fb",
    pattern: "dots" as const,
    title: "Търговия с храни",
    text: "Фирмата е основана в Пазарджик и започва търговия с хранителни продукти.",
  },
  {
    year: "1995",
    dye: "#c41212",
    wash: "#ffe0e0",
    pattern: "stripes" as const,
    title: "Боя и украси",
    text: "Дейността се насочва към боя за яйца, а после и към голям брой великденски украси.",
  },
  {
    year: "износ",
    dye: "#1a7a34",
    wash: "#e4f6e6",
    pattern: "zigzag" as const,
    title: "България и Европа",
    text: "Продуктите са в цялата страна. Част от тях пътуват към Румъния, Литва, Латвия и Естония.",
  },
];

const places = [
  ["България", "#2e64b4"],
  ["Румъния", "#c41212"],
  ["Литва", "#8f5a00"],
  ["Латвия", "#1a7a34"],
  ["Естония", "#7a4bb8"],
] as const;

const mission = [
  "Качество на изделията, което отговаря на изискванията на ЕС.",
  "Нови продукти и технологии.",
  "По-широк пазар в страната и в чужбина.",
  "Подкрепа за етнографските музеи и традициите при украса на великденски яйца.",
  "Образователна програма за деца в духа на българските традиции.",
  "Литература за традиционните технологии за писани яйца.",
];

export default function AboutPage() {
  const [lead, ...rest] = companies;

  return (
    <>
      <div className="flex h-1.5" aria-hidden>
        {dyes.map(([color]) => (
          <span key={color} className="flex-1" style={{ background: color }} />
        ))}
      </div>

      <section className="relative isolate overflow-hidden bg-[#eef5fd]">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <span className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-[#e23b3b]/25 blur-3xl" />
          <span className="absolute right-0 top-0 h-36 w-36 rounded-full bg-[#f2c31a]/45 blur-3xl" />
          <span className="absolute bottom-0 left-1/4 h-28 w-28 rounded-full bg-[#3dae4a]/25 blur-3xl" />
        </div>
        <div className="container-metma relative grid items-center gap-8 py-10 sm:py-14 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
          <div>
            <p className="eyebrow text-[var(--metma-rose)]">Весаче ЕАД · от 1992</p>
            <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.5rem,6.2vw,4.4rem)] font-bold leading-[0.9] tracking-[-0.045em]">
              Оригиналната марка
              <span className="mt-1 block text-[var(--metma-rose)]">за боя за яйца</span>
            </h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-[var(--metma-ink)]/75">
              От търговия с храни през 1992 г. до производство на боя за яйца и великденски украси за България и за износ.
            </p>
          </div>
          <ul className="flex items-end justify-center gap-1.5 py-2 sm:gap-3 lg:justify-end" aria-label="Цветове за яйца">
            {dyes.map(([color, name, pattern], index) => (
              <li key={name} style={{ transform: `rotate(${tilts[index]}deg)` }}>
                <EggIcon
                  fill={color}
                  pattern={pattern}
                  className={index % 2 === 0 ? "h-11 w-8 sm:h-16 sm:w-12" : "h-14 w-10 sm:h-20 sm:w-14"}
                />
                <span className="sr-only">{name}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-14">
        <div className="container-metma">
          <p className="eyebrow text-[var(--metma-rose)]">История</p>
          <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">От 1992 г. до днес</h2>
          <ol className="mt-6 grid gap-3 sm:grid-cols-3">
            {beats.map((beat) => (
              <li key={beat.year} className="rounded-[1.4rem] p-5" style={{ background: beat.wash }}>
                <div className="flex items-center gap-3">
                  <EggIcon fill={beat.dye} pattern={beat.pattern} className="h-10 w-8" />
                  <p className="font-display text-3xl font-bold leading-none tracking-[-0.04em]" style={{ color: beat.dye }}>
                    {beat.year}
                  </p>
                </div>
                <h3 className="mt-4 font-display text-xl font-bold tracking-[-0.03em]">{beat.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--metma-ink)]/75">{beat.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-16">
        <div className="container-metma grid items-start gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
          <div>
            <p className="eyebrow text-[var(--metma-rose)]">Производство</p>
            <h2 className="mt-3 max-w-xl font-display text-[clamp(1.9rem,4vw,2.8rem)] font-bold leading-[1.02] tracking-[-0.03em]">
              По-голямата част от работата е автоматизирана
            </h2>
            <ShowMore lines={4} className="mt-5 max-w-xl text-base leading-7 text-[var(--metma-ink)]/75">
              <div className="space-y-4">
                <p>Ръчната работа се върши от квалифициран екип, за да пазим качеството. В магазина са и линиите Пет, Ино и METMA — всяка си остава отделна марка.</p>
                <p>Работим с търговски вериги в България и Европа. Правим и поръчкови продукти, с гъвкави количества.</p>
              </div>
            </ShowMore>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Къде се намират продуктите">
              {places.map(([name, color]) => (
                <li key={name} className="inline-flex items-center gap-2 rounded-full bg-[var(--metma-wash)] py-1.5 pl-2 pr-3 text-sm font-semibold">
                  <span className="h-3 w-3 rounded-full" style={{ background: color }} />
                  {name}
                </li>
              ))}
            </ul>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Link href="/produkti" className="btn-metma w-full px-6 sm:w-auto">
                Към продуктите
              </Link>
              <Link href="/kontakti" className="btn-outline w-full px-6 sm:w-auto">
                Свържете се с нас
              </Link>
            </div>
          </div>

          <aside className="overflow-hidden rounded-[1.8rem] bg-white shadow-[0_24px_50px_-28px_rgba(46,100,180,0.55)] ring-1 ring-black/[0.05]">
            <div className="bg-[var(--metma-rose)] px-6 py-6 text-white sm:px-7">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.16em] text-white/70">Седалище</p>
              <p className="mt-2 font-display text-[2.4rem] font-bold leading-none tracking-[-0.04em]">Пазарджик</p>
            </div>
            <div className="border-t border-dashed border-[var(--metma-rose)]/30 px-6 py-6 sm:px-7">
              <p className="text-sm leading-6 text-[var(--metma-ink)]/80">
                ВЕСАЧЕ ЕАД
                <br />
                бул. Ген. Гурко №6, ет. 3
                <br />
                4400 Пазарджик, България
              </p>
              <a href="tel:+35934443888" className="mt-4 inline-flex min-h-12 items-center font-display text-3xl font-bold tracking-[-0.03em] text-[var(--metma-rose)]">
                034 44 38 88
              </a>
              <a href="mailto:vessache@gmail.com" className="mt-1 block text-sm font-semibold text-[var(--metma-ink)] hover:text-[var(--metma-rose)]">
                vessache@gmail.com
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="bg-[#eef5fd] py-10 sm:py-16">
        <div className="container-metma grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <p className="eyebrow text-[var(--metma-rose)]">Мисия</p>
            <h2 className="mt-3 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold leading-[1.05] tracking-[-0.03em]">Традицията и новият продукт</h2>
            <p className="mt-4 max-w-sm text-base leading-7 text-[var(--metma-ink)]/75">
              Държим на изискванията на пазара и на българския обичай яйцето да се боядисва и украсява за Великден.
            </p>
          </div>
          <ShowMore lines={5} className="text-base leading-7">
            <ol className="grid gap-3">
              {mission.map((item, index) => (
                <li key={item} className="flex items-start gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_10px_24px_-18px_rgba(29,36,45,0.45)]">
                  <EggIcon fill={dyes[index][0]} pattern={dyes[index][2]} className="mt-0.5 h-7 w-5 shrink-0" />
                  <p>{item}</p>
                </li>
              ))}
            </ol>
          </ShowMore>
        </div>
      </section>

      <section className="bg-white py-10 sm:py-16">
        <div className="container-metma">
          <p className="eyebrow text-[var(--metma-rose)]">Марки</p>
          <h2 className="mt-3 font-display text-[clamp(1.9rem,4vw,2.8rem)] font-bold leading-[1.02] tracking-[-0.03em]">Четири имена в един магазин</h2>
          <div className="mt-8 grid gap-3 lg:grid-cols-3">
            {lead ? (
              <Link
                href={`/produkti?firma=${lead.id}`}
                className="flex flex-col gap-5 rounded-[1.7rem] p-5 transition duration-300 motion-safe:hover:-translate-y-1 sm:flex-row sm:items-center sm:gap-8 sm:p-7 lg:col-span-3"
                style={{ background: lead.wash }}
              >
                <span className="relative block h-24 w-24 shrink-0 overflow-hidden rounded-full bg-white ring-1 ring-black/[0.06] sm:h-28 sm:w-28">
                  <Image src={lead.logo} alt="" fill className="object-contain p-2" sizes="112px" />
                </span>
                <span>
                  <span className="block font-display text-3xl font-bold" style={{ color: lead.ink }}>
                    {lead.name}
                  </span>
                  <span className="mt-1 block text-xs font-bold uppercase tracking-[0.14em]" style={{ color: lead.ink }}>
                    {lead.since} · {lead.tag}
                  </span>
                  <span className="mt-3 block max-w-2xl text-base leading-7 text-[var(--metma-ink)]/75">{lead.text}</span>
                </span>
              </Link>
            ) : null}
            {rest.map((company) => (
              <Link
                key={company.id}
                href={`/produkti?firma=${company.id}`}
                className="flex h-full flex-col rounded-[1.6rem] p-5 transition duration-300 motion-safe:hover:-translate-y-1"
                style={{ background: company.wash }}
              >
                <span className="relative block h-16 w-16 overflow-hidden rounded-full bg-white ring-1 ring-black/[0.06]">
                  <Image src={company.logo} alt="" fill className="object-contain p-1.5" sizes="64px" />
                </span>
                <span className="mt-4 font-display text-2xl font-bold" style={{ color: company.ink }}>
                  {company.name}
                </span>
                <span className="mt-1 text-xs font-bold uppercase tracking-[0.14em]" style={{ color: company.ink }}>
                  {company.since} · {company.tag}
                </span>
                <span className="mt-3 text-sm leading-6 text-[var(--metma-ink)]/75">{company.text}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
