import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const points = [
  {
    n: "01",
    title: "Eigene Produktion",
    text: "Vom Rezept bis zur Packung — alles unter einem Dach.",
    tone: "var(--metma-rose)",
  },
  {
    n: "02",
    title: "Für den Handel",
    text: "Sets und Displays für Ketten in Bulgarien und Europa.",
    tone: "var(--metma-blue)",
  },
  {
    n: "03",
    title: "Volle Palette",
    text: "Pastell, Brillant, Marmor, Kristall, Glitter und mehr.",
    tone: "var(--metma-navy)",
  },
];

export function HomeStory() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-metma grid gap-14 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow text-[var(--metma-rose)]">Über METMA</p>
          <h2 className="mt-4 font-display text-[clamp(2.1rem,4.2vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.03em] text-[var(--metma-ink)]">
            Nicht nur Farbe.
            <span className="mt-1 block text-[var(--metma-blue)]">
              Ein System für Ostern.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-base leading-8 text-[var(--metma-mute)]">
            Wir entwickeln und produzieren Eierfarben sowie Osterdekorationen —
            klar, zuverlässig und bereit für den Handel.
          </p>
          <Link href="/uber-uns" className="btn-dark mt-8">
            Mehr erfahren
          </Link>
        </Reveal>

        <div className="border-t border-[var(--metma-line)]">
          {points.map((point, i) => (
            <Reveal key={point.n} delayMs={i * 70}>
              <article className="grid grid-cols-[3.5rem_1fr] gap-4 border-b border-[var(--metma-line)] py-7 md:gap-6">
                <span
                  className="font-display text-lg font-bold"
                  style={{ color: point.tone }}
                >
                  {point.n}
                </span>
                <div>
                  <h3 className="text-base font-semibold text-[var(--metma-ink)]">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--metma-mute)]">
                    {point.text}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
