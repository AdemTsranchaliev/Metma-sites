import Link from "next/link";
import { Reveal } from "@/components/Reveal";

const points = [
  {
    n: "01",
    title: "Eierfarben International",
    text: "Unsere Eierfarben sind in allen Ländern erhältlich. Senden Sie uns eine Anfrage für weitere Informationen!",
    accent: "var(--metma-rose)",
    href: "/kontakt",
  },
  {
    n: "02",
    title: "Haben Sie eine Frage?",
    text: "Senden Sie uns eine E-Mail und unsere freundlichen Mitarbeiter werden Ihnen bald antworten!",
    accent: "var(--metma-blue)",
    href: "/kontakt",
  },
  {
    n: "03",
    title: "Das perfekte Osterei",
    text: "Unser Ziel ist es, die höchstmögliche Qualität für Ihre Ostereier zu gewährleisten!",
    accent: "var(--metma-navy)",
    href: "/produkte",
  },
];

export function HomeStory() {
  return (
    <section className="bg-[var(--metma-sand)] py-14 sm:py-16 md:py-24">
      <div className="container-metma grid gap-8 lg:grid-cols-[1fr_1.15fr] lg:items-start lg:gap-16">
        <Reveal className="lg:sticky lg:top-28">
          <p className="eyebrow text-[var(--metma-rose)]">Über METMA</p>
          <h2 className="mt-2.5 font-display text-[clamp(1.85rem,7vw,3.3rem)] font-bold leading-[1.05] tracking-[-0.03em] text-[var(--metma-ink)] sm:mt-3">
            METMA
            <span className="mt-1.5 block text-[clamp(1.1rem,4.2vw,1.85rem)] font-semibold leading-snug tracking-[-0.02em] text-[var(--metma-blue)] sm:mt-2">
              Das einzige Unternehmen für Eierfärben in Bulgarien
            </span>
          </h2>
          <p className="mt-4 max-w-md text-[0.95rem] leading-7 text-[var(--metma-mute)] sm:mt-5 sm:text-base sm:leading-8">
            Mit vollständig geschlossenem Produktionsprozess erreichen wir ein
            starkes Preis-Leistungs-Verhältnis. Wir arbeiten mit großen
            Einzelhandelsketten in Bulgarien und Europa — kompromisslos in
            Qualität und Service.
          </p>
          <Link href="/uber-uns" className="btn-metma mt-6 w-full sm:mt-8 sm:w-auto">
            Mehr erfahren
          </Link>
        </Reveal>

        <div className="flex flex-col gap-3">
          {points.map((point, i) => (
            <Reveal key={point.n} delayMs={i * 70}>
              <Link
                href={point.href}
                className="grid grid-cols-[auto_1fr] gap-3.5 border-l-[3px] bg-white px-4 py-5 transition active:scale-[0.99] sm:gap-6 sm:px-6 sm:py-6 sm:hover:-translate-y-0.5"
                style={{ borderLeftColor: point.accent }}
              >
                <span
                  className="font-display text-2xl font-bold leading-none tracking-tight sm:text-3xl"
                  style={{ color: point.accent }}
                >
                  {point.n}
                </span>
                <div>
                  <h3 className="text-base font-bold text-[var(--metma-ink)] sm:text-lg">
                    {point.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-6 text-[var(--metma-mute)] sm:leading-7">
                    {point.text}
                  </p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
