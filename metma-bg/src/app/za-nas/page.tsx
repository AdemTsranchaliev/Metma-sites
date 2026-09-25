import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { EggIcon } from "@/components/easter/EasterMotifs";
import { HomeContact } from "@/components/home/HomeContact";
import { Reveal } from "@/components/Reveal";
import { brands } from "@/data/brands";
import { productCategories, products, team } from "@/data/home";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: "За нас",
  description:
    "METMA е единствената фирма за боя за яйца в България с изцяло затворено производство. От 1989 г. — днес в над 30 европейски страни.",
  path: "/za-nas",
  image: "/images/about/METMA-History-infochart-1.png",
});

function LineIcon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden>
      {children}
    </svg>
  );
}

function BasketIcon() {
  return (
    <LineIcon>
      <path d="M6 8h12l-1 11H7L6 8Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 8V6.5A3 3 0 0 1 12 3.5 3 3 0 0 1 15 6.5V8" stroke="currentColor" strokeWidth="1.7" />
    </LineIcon>
  );
}

function AwardIcon() {
  return (
    <LineIcon>
      <circle cx="12" cy="9" r="4.2" stroke="currentColor" strokeWidth="1.7" />
      <path d="M9.2 12.6 8 20l4-2.2L16 20l-1.2-7.4" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </LineIcon>
  );
}

function PlaneIcon() {
  return (
    <LineIcon>
      <path d="M4 12.5 20 5l-6.2 14-2.2-5.2L4 12.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
    </LineIcon>
  );
}

function GlobeIcon() {
  return (
    <LineIcon>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4 12h16M12 4c2 2.2 3 4.8 3 8s-1 5.8-3 8c-2-2.2-3-4.8-3-8s1-5.8 3-8Z" stroke="currentColor" strokeWidth="1.7" />
    </LineIcon>
  );
}

function PinIcon() {
  return (
    <LineIcon>
      <path d="M12 21s6-5.2 6-10a6 6 0 1 0-12 0c0 4.8 6 10 6 10Z" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="12" cy="11" r="1.8" fill="currentColor" />
    </LineIcon>
  );
}

function TagsIcon() {
  return (
    <LineIcon>
      <path d="M4 12.5V6h6.5L20 15.5 13.5 22 4 12.5Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <circle cx="8.2" cy="9.2" r="1" fill="currentColor" />
    </LineIcon>
  );
}

function LeafIcon() {
  return (
    <LineIcon>
      <path d="M5 19s2-9 14-14c0 8-5 14-14 14Z" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round" />
      <path d="M9 15c2-2 4-4 6-6" stroke="currentColor" strokeWidth="1.7" />
    </LineIcon>
  );
}

function PeopleIcon() {
  return (
    <LineIcon>
      <circle cx="9" cy="9" r="2.4" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16" cy="10" r="1.8" stroke="currentColor" strokeWidth="1.7" />
      <path d="M4.5 18.5c.6-2.4 2.4-3.7 4.5-3.7s3.9 1.3 4.5 3.7M14 14.8c1.3-.5 2.6-.4 3.6.4 1 .7 1.6 1.8 1.9 3.3" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
    </LineIcon>
  );
}

function CheckIcon() {
  return (
    <LineIcon>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
      <path d="m8.2 12.2 2.4 2.4 5.2-5.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
    </LineIcon>
  );
}

const milestones = [
  {
    year: "1989",
    title: "Търговия с храни",
    text: "Компанията започва търговия с хранителни продукти.",
    dot: "#e4572e",
    icon: BasketIcon,
  },
  {
    year: "1995",
    title: "Великденско производство",
    text: "Започва производството на боя за яйца и великденски украси.",
    dot: "#3d7ab5",
    icon: null,
  },
  {
    year: "1999",
    title: "Лидер с две марки",
    text: "Компанията е лидер на местния пазар с две търговски марки.",
    dot: "#c4890a",
    icon: AwardIcon,
  },
  {
    year: "2002",
    title: "Европейски пазар",
    text: "Продуктите излизат извън България и влизат в европейската търговия.",
    dot: "#3d7a32",
    icon: PlaneIcon,
  },
  {
    year: "2015",
    title: "Над 30 страни",
    text: "Нова търговска марка и работа в над 30 европейски страни.",
    dot: "#7a4ea3",
    icon: GlobeIcon,
  },
  {
    year: "2021",
    title: "METMA USA",
    text: "Създадена е METMA USA LTD. — компанията стъпва и отвъд океана.",
    dot: "#e4572e",
    icon: PinIcon,
  },
];

const facts = [
  { value: "1989", label: "Начало", wash: "#ffd8c8", ink: "#9a3412", icon: BasketIcon },
  { value: "30+", label: "Европейски страни", wash: "#d4e6f8", ink: "#24598a", icon: GlobeIcon },
  { value: "4", label: "Марки", wash: "#ffe7a8", ink: "#8a5a12", icon: TagsIcon },
  { value: "Пазарджик", label: "Седалище", wash: "#d8f0e4", ink: "#246b45", icon: PinIcon },
];

const teamWash = ["#ffd8c8", "#d4e6f8", "#ffe7a8"];

const madeHere = productCategories.map((category) => ({
  ...category,
  image: products.find((product) => product.category === category.slug)?.image ?? "",
}));

const policies = [
  {
    title: "Качество",
    text: "От рецептата до опаковката.",
    href: "/deklaratsii#politika-po-kachestvo",
    icon: CheckIcon,
  },
  {
    title: "Околна среда",
    text: "По-отговорно производство.",
    href: "/deklaratsii#politika-okolna-sreda",
    icon: LeafIcon,
  },
  {
    title: "Хора",
    text: "Труд и общност.",
    href: "/deklaratsii#deklaratsiya-sotsialna-otgovornost",
    icon: PeopleIcon,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-[#fff8f4] pb-12 pt-10 sm:pb-16 sm:pt-14 md:pb-20">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-20 -top-24 h-80 w-80 rounded-full bg-[#ffd0bf] blur-3xl"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-[#d6e6f4] blur-3xl"
        />
        <EggIcon
          fill="#e4572e"
          pattern="dots"
          className="pointer-events-none absolute right-[8%] top-8 hidden h-16 w-12 rotate-12 opacity-80 md:block"
        />

        <div className="container-metma relative">
          <Reveal>
            <p className="eyebrow text-[var(--metma-rose)]">Компания · от 1989</p>
            <h1 className="mt-3 max-w-3xl font-display text-[clamp(2.4rem,6vw,4.2rem)] font-bold leading-[0.95] tracking-[-0.045em] text-[#2f3b4c]">
              Единствената фирма
              <span className="mt-1 block text-[var(--metma-rose)]">за боя за яйца</span>
              в България
            </h1>
          </Reveal>
          <Reveal delayMs={40}>
            <p className="mt-5 max-w-xl text-base leading-7 text-[#5c6b7a] sm:text-lg">
              Правим боята сами — от рецептата до опаковката. Започваме с
              търговия на храни, стигаме до над 30 европейски страни и до
              компания в САЩ.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3 md:grid-cols-4">
            {facts.map((fact, index) => (
              <Reveal key={fact.label} delayMs={index * 50}>
                <div
                  className="flex h-full flex-col rounded-[1.35rem] px-4 py-5 sm:px-5"
                  style={{ background: fact.wash, color: fact.ink }}
                >
                  <fact.icon />
                  <p className="mt-4 font-display text-[clamp(1.6rem,3vw,2.15rem)] font-bold leading-none tracking-[-0.04em] text-[var(--metma-ink)]">
                    {fact.value}
                  </p>
                  <p className="mt-2 text-sm font-medium text-[#3d4a5c]">{fact.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="container-metma">
          <Reveal className="max-w-xl">
            <p className="eyebrow text-[var(--metma-rose)]">История</p>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-[-0.03em] text-[#2f3b4c]">
              Шест стъпки, една линия
            </h2>
          </Reveal>

          <div className="relative mt-8">
            <div
              aria-hidden
              className="absolute bottom-2 left-[4.85rem] top-2 w-px bg-[#eadfd6] sm:left-[6.35rem]"
            />
            <div className="space-y-1">
              {milestones.map((item, index) => (
                <Reveal key={item.year} delayMs={index * 35}>
                  <article className="relative grid grid-cols-[4.5rem_1fr] items-start gap-6 py-4 sm:grid-cols-[6rem_1fr] sm:gap-10 sm:py-5">
                    <div className="pt-1 text-right">
                      <p className="font-display text-lg font-bold leading-none tracking-[-0.04em] text-[var(--metma-ink)] sm:text-2xl">
                        {item.year}
                      </p>
                    </div>
                    <span
                      aria-hidden
                      className="absolute left-[4.55rem] top-[1.15rem] h-2.5 w-2.5 rounded-full ring-4 ring-white sm:left-[6.05rem] sm:top-[1.35rem]"
                      style={{ background: item.dot }}
                    />
                    <div className="min-w-0 border-b border-[var(--metma-line)] pb-4 sm:pb-5">
                      <h3 className="flex items-center gap-2.5 font-display text-xl font-bold tracking-[-0.03em] text-[var(--metma-ink)] sm:text-2xl">
                        <span
                          className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#fff8f4]"
                          style={{ color: item.dot }}
                        >
                          {item.icon ? (
                            <item.icon />
                          ) : (
                            <EggIcon fill="currentColor" pattern="dots" className="h-5 w-4" />
                          )}
                        </span>
                        {item.title}
                      </h3>
                      <p className="mt-1.5 max-w-lg text-sm leading-6 text-[var(--metma-mute)] sm:text-base">
                        {item.text}
                      </p>
                    </div>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#2f3b4c] py-12 text-white sm:py-16 md:py-20">
        <div className="container-metma">
          <Reveal className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="eyebrow text-[#ffb199]">Марки</p>
              <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-[-0.03em]">
                Четири имена.
                <span className="mt-1 block text-white/70">Едно производство.</span>
              </h2>
            </div>
            <Link href="/produkti" className="btn-metma shrink-0 self-start sm:self-auto">
              Към продуктите
            </Link>
          </Reveal>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {brands.map((brand, index) => (
              <Reveal key={brand.id} delayMs={index * 40}>
                <Link
                  href={`/marki/${brand.id}`}
                  className="group flex h-full min-h-40 flex-col justify-between rounded-[1.4rem] p-5 transition duration-300 hover:-translate-y-1 sm:p-6"
                  style={{ background: brand.wash, color: "#171717" }}
                >
                  <span className="flex items-start justify-between gap-3">
                    <Image
                      src={brand.logo}
                      alt=""
                      width={64}
                      height={64}
                      className="h-14 w-14 object-contain"
                    />
                    <span
                      className="text-xs font-bold uppercase tracking-[0.14em]"
                      style={{ color: brand.ink }}
                    >
                      {brand.tag}
                    </span>
                  </span>
                  <span className="mt-6 block">
                    <span className="font-display text-[clamp(1.8rem,3vw,2.4rem)] font-bold leading-none tracking-[-0.04em]">
                      {brand.name}
                    </span>
                    <span className="mt-2 block max-w-md text-sm leading-6 text-[#3d4a5c]">
                      {brand.text}
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-12 sm:py-16 md:py-20">
        <div className="container-metma">
          <Reveal>
            <p className="eyebrow text-[var(--metma-rose)]">От фабриката</p>
            <h2 className="mt-2 max-w-2xl font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-[-0.03em] text-[#2f3b4c]">
              Затворено производство в {siteConfig.address.city}
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-[var(--metma-mute)]">
              Офисът е на {siteConfig.address.street}. Боите, комплектите, украсите
              и дисплеите минават през собствено производство.
            </p>
          </Reveal>

          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {madeHere.map((item, index) => (
              <Reveal key={item.slug} delayMs={index * 40}>
                <Link
                  href={item.href}
                  className="group block overflow-hidden rounded-[1.3rem] bg-[#fff8f4]"
                >
                  <span className="relative block aspect-[5/4] p-4">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt=""
                        fill
                        className="object-contain p-4 transition duration-500 group-hover:scale-[1.04]"
                        sizes="260px"
                      />
                    ) : null}
                  </span>
                  <span className="flex items-center justify-between gap-2 px-4 pb-4 font-display text-lg font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
                    {item.label}
                    <span className="text-sm text-[var(--metma-rose)] transition group-hover:translate-x-0.5">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            {policies.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="group flex items-center gap-3 rounded-[1.2rem] border border-[var(--metma-line)] px-4 py-3 transition hover:border-[var(--metma-rose)]"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[#fff8f4] text-[var(--metma-rose)]">
                  <item.icon />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-bold text-[var(--metma-ink)]">{item.title}</span>
                  <span className="block text-xs text-[var(--metma-mute)]">{item.text}</span>
                </span>
                <span className="text-sm font-bold text-[var(--metma-rose)] transition group-hover:translate-x-0.5">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--metma-line)] bg-[#fff8f4] py-12 sm:py-16 md:py-20">
        <div className="container-metma">
          <Reveal>
            <p className="eyebrow text-[var(--metma-rose)]">Екип</p>
            <h2 className="mt-2 font-display text-[clamp(1.8rem,4vw,2.6rem)] font-bold tracking-[-0.03em] text-[#2f3b4c]">
              Хората зад боята
            </h2>
          </Reveal>

          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {team.map((person, index) => (
              <Reveal key={person.name} delayMs={index * 50}>
                <figure
                  className="overflow-hidden rounded-[1.6rem] px-4 pb-6 pt-6 text-center sm:px-5"
                  style={{ background: teamWash[index] ?? "#fff" }}
                >
                  <div className="relative mx-auto aspect-square w-full max-w-[220px] overflow-hidden rounded-full bg-white ring-4 ring-white">
                    <Image
                      src={person.image}
                      alt={person.name}
                      fill
                      className="object-cover object-top"
                      sizes="220px"
                    />
                  </div>
                  <figcaption className="mt-4">
                    <p className="font-display text-xl font-bold tracking-tight text-[var(--metma-ink)]">
                      {person.name}
                    </p>
                    <p className="mt-1 text-[0.68rem] font-bold uppercase tracking-[0.14em] text-[var(--metma-rose-deep)]">
                      {person.role}
                    </p>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <HomeContact />
    </>
  );
}
