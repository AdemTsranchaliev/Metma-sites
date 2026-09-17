import Link from "next/link";
import { Reveal } from "@/components/Reveal";
import { ScribbleUnderline } from "@/components/home/DesignDetails";

const features = [
  {
    title: "International",
    text: "Eierfarben für Märkte in ganz Europa — bereit für jede Saison.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden>
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 17.9V18h-2v1.9A8 8 0 014.1 13H6v-2H4.1A8 8 0 0111 4.1V6h2V4.1A8 8 0 0119.9 11H18v2h1.9A8 8 0 0113 19.9z" />
      </svg>
    ),
  },
  {
    title: "Fragen?",
    text: "Schreiben Sie uns — unser Team antwortet freundlich und schnell.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden>
        <path d="M4 4h12a2 2 0 012 2v8a2 2 0 01-2 2H9l-5 4v-4H4a2 2 0 01-2-2V6a2 2 0 012-2z" />
      </svg>
    ),
  },
  {
    title: "Qualität",
    text: "Das perfekte Osterei — Farbe, Glanz und Freude inklusive.",
    icon: (
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-white" aria-hidden>
        <path d="M12 2c4 0 7 5 7 10s-3 8-7 8-7-3-7-8 3-10 7-10zm-1 5l1.2 2.4L15 10l-2.2 1.2L12 14l-1-2.8L8 10l2.8-.6L11 7z" />
      </svg>
    ),
  },
];

export function HomeFeatures() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-metma">
        <Reveal className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold text-[var(--metma-orange)] md:text-4xl">
            Warum METMA
          </h2>
          <ScribbleUnderline />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-3 md:gap-8">
          {features.map((feature, i) => (
            <Reveal key={feature.title} delayMs={i * 80}>
              <article className="feature-card text-center">
                <div className="feature-orb mx-auto mb-5 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-[var(--metma-blue)] shadow-[0_10px_24px_rgba(74,132,196,0.35)]">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-[var(--metma-orange)]">
                  {feature.title}
                </h3>
                <p className="mx-auto mt-2 max-w-[260px] text-sm leading-6 text-[var(--metma-mute)]">
                  {feature.text}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delayMs={120} className="mt-12 flex flex-wrap justify-center gap-3">
          {[
            { label: "Farbstoffe", href: "/produkte/farbstoffe" },
            { label: "Sets", href: "/produkte/sets" },
            { label: "Dekorationen", href: "/produkte/dekorationen" },
          ].map((cat) => (
            <Link
              key={cat.href}
              href={cat.href}
              className="border border-[var(--metma-line)] bg-[var(--metma-paper)] px-4 py-2 text-sm font-semibold text-[var(--metma-ink)] transition hover:border-[var(--metma-orange)] hover:text-[var(--metma-orange)]"
            >
              {cat.label}
            </Link>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
