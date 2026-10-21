import type { Metadata } from "next";
import Link from "next/link";
import { contact, productionImages, team } from "@/data/content";

export const metadata: Metadata = { title: "About" };

const milestones = [
  { year: "1989", text: "The company starts trade with food products.", color: "#2f7de1" },
  { year: "1995", text: "The company starts producing Easter products.", color: "#e10600" },
  { year: "1999", text: "Leader of the local market, with two trademarks.", color: "#f4b000" },
  { year: "2002", text: "The company enters the European market.", color: "#1f9d62" },
  { year: "2015", text: "A new trade brand, working with over 30 European countries.", color: "#7c5cbf" },
  { year: "2021", text: "METMA USA was founded.", color: "#0c2340" },
];

const rings = ["#e10600", "#f4b000", "#2f7de1"];

const stats = [
  ["1989", "Company starts"],
  ["30+", "European countries"],
  ["2021", "USA office opens"],
];

function titleCase(value: string) {
  return value
    .toLowerCase()
    .split(" ")
    .map((word) => (word.length <= 3 ? word.toUpperCase() : word.charAt(0).toUpperCase() + word.slice(1)))
    .join(" ");
}

export default function AboutPage() {
  const dyes = productionImages[1];
  const factory = productionImages[0];
  const line = productionImages[2];

  return (
    <main>
      <section className="hero-wash overflow-hidden">
        <div className="container-usa grid items-center gap-10 py-14 lg:grid-cols-2 lg:py-20">
          <div>
            <p className="inline-flex rounded-full bg-[var(--usa-red)] px-3 py-1 text-[0.7rem] font-bold tracking-[0.18em] text-white uppercase">
              About us
            </p>
            <h1 className="font-display mt-5 text-5xl leading-[1.02] font-semibold text-[var(--usa-navy)] md:text-6xl">
              A family production, now in Illinois.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-[var(--usa-mute)]">
              Easter egg dyes and packaging, built by a company that started in 1989. METMA USA was founded in 2021 and works from Park Ridge.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/products" className="btn-usa">
                Shop the kits
              </Link>
              <Link href="/contact" className="btn-navy">
                Contact the office
              </Link>
            </div>
          </div>
          <div className="relative">
            {dyes ? (
              <img src={dyes.src} alt={dyes.alt} className="h-72 w-full rounded-[1.8rem] object-cover shadow-[0_24px_50px_-28px_rgba(12,35,64,0.55)] sm:h-[26rem]" />
            ) : null}
            <dl className="absolute inset-x-3 bottom-3 grid grid-cols-3 gap-2 sm:inset-x-4 sm:bottom-4">
              {stats.map(([value, label]) => (
                <div key={label} className="rounded-2xl bg-white/95 px-2 py-3 text-center shadow-sm">
                  <dt className="font-display text-2xl text-[var(--usa-navy)] sm:text-3xl">{value}</dt>
                  <dd className="mt-1 text-[0.7rem] leading-4 text-[var(--usa-mute)]">{label}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="container-usa grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:items-start">
          <div className="lg:sticky lg:top-24">
            <p className="eyebrow text-[var(--usa-red)]">Our story</p>
            <h2 className="font-display mt-3 text-4xl text-[var(--usa-navy)]">From food trade to Easter dyes.</h2>
            <p className="mt-4 max-w-sm leading-7 text-[var(--usa-mute)]">
              Six steps, from the first trades in 1989 to a USA office in Illinois.
            </p>
          </div>
          <ol className="relative border-l border-[var(--usa-line)]">
            {milestones.map((item) => (
              <li key={item.year} className="relative py-5 pl-8">
                <span className="absolute top-7 -left-[7px] h-3.5 w-3.5 rounded-full ring-4 ring-white" style={{ background: item.color }} />
                <p className="font-display text-3xl text-[var(--usa-navy)]">{item.year}</p>
                <p className="mt-1 max-w-md leading-7 text-[var(--usa-ink)]">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-[var(--usa-cream)] py-14 sm:py-20">
        <div className="container-usa">
          <p className="eyebrow text-[var(--usa-red)]">Team</p>
          <h2 className="font-display mt-3 max-w-xl text-balance text-4xl text-[var(--usa-navy)]">The people behind METMA USA</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {team.map((person, index) => {
              const ring = rings[index % rings.length];
              return (
                <figure key={person.name} className="flex items-center gap-4 rounded-[1.6rem] bg-white p-4 shadow-[0_18px_40px_-30px_rgba(12,35,64,0.7)] md:flex-col md:px-6 md:py-8 md:text-center">
                  <img
                    src={person.image}
                    alt=""
                    className="h-24 w-24 shrink-0 rounded-full object-cover md:h-44 md:w-44"
                    style={{ boxShadow: `0 0 0 3px white, 0 0 0 6px ${ring}` }}
                  />
                  <figcaption>
                    <p className="font-display text-2xl leading-tight text-[var(--usa-navy)]">{titleCase(person.name)}</p>
                    <p className="mt-1 text-sm font-semibold" style={{ color: ring }}>
                      {titleCase(person.role)}
                    </p>
                  </figcaption>
                </figure>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        {factory ? <img src={factory.src} alt="" className="h-64 w-full object-cover sm:h-80" /> : null}
        <div className="container-usa relative z-10 -mt-16 pb-14 sm:-mt-20 sm:pb-20">
          <div className="grid items-stretch gap-4 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="rounded-[1.6rem] bg-white p-6 shadow-[0_20px_50px_-28px_rgba(12,35,64,0.45)] ring-1 ring-black/5 sm:p-8">
              <p className="eyebrow text-[var(--usa-sky)]">Production</p>
              <h2 className="font-display mt-3 text-4xl text-[var(--usa-navy)]">Color, mixed and packed.</h2>
              <p className="mt-4 leading-7 text-[var(--usa-mute)]">
                Our production facilities have a wide range of capabilities for various egg dye products. Among all we have extensive experience in production of Easter egg dyes and packaging.
              </p>
            </div>
            {line ? <img src={line.src} alt={line.alt} className="h-56 w-full rounded-[1.6rem] object-cover sm:h-full sm:min-h-56" /> : null}
          </div>
        </div>
      </section>

      <section className="bg-[var(--usa-cream)] pb-14 sm:pb-16">
        <div className="container-usa">
          <div className="relative overflow-hidden rounded-[1.8rem] bg-[var(--usa-navy)] px-6 py-10 text-white sm:px-10">
            <div className="color-bar absolute inset-x-0 top-0" />
            <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow text-[#f3c1c8]">Park Ridge</p>
                <h2 className="font-display mt-3 text-4xl">Visit the office, or write to us.</h2>
                <p className="mt-4 max-w-md text-sm leading-7 text-white/75">444 N Northwest Hwy Ste 345, Park Ridge 60068, Illinois</p>
              </div>
              <div className="flex flex-col gap-3 sm:items-end">
                <a href={`mailto:${contact.email}`} className="text-lg font-semibold hover:text-[var(--usa-gold)]">
                  {contact.email}
                </a>
                <a href={contact.phoneHref} className="text-lg font-semibold hover:text-[var(--usa-gold)]">
                  {contact.phone}
                </a>
                <Link href="/contact" className="btn-usa mt-2 w-full sm:w-fit">
                  Send a message
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
