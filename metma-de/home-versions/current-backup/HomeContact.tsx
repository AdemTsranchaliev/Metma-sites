import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function HomeContact() {
  return (
    <section className="bg-[var(--metma-butter)] py-20 md:py-24">
      <div className="container-metma grid gap-10 md:grid-cols-[1.2fr_0.8fr] md:items-end">
        <Reveal>
          <p className="eyebrow text-[var(--metma-navy)]">Kontakt</p>
          <h2 className="mt-4 max-w-lg font-display text-[clamp(2.1rem,4.2vw,3.4rem)] font-bold leading-[1.06] tracking-[-0.03em] text-[var(--metma-ink)]">
            Lass uns dein Ostern bunter machen.
          </h2>
          <p className="mt-4 max-w-md text-base leading-7 text-[var(--metma-mute)]">
            Fragen zu Sortiment, Displays oder Großhandel? Wir helfen gerne
            weiter.
          </p>
        </Reveal>
        <Reveal delayMs={70}>
          <div className="space-y-3 md:text-right">
            <a
              href="tel:+359885828771"
              className="block text-lg font-semibold text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)]"
            >
              +359 885 828 771
            </a>
            <a
              href="mailto:sales@metma-de.com"
              className="block text-base text-[var(--metma-mute)] transition hover:text-[var(--metma-ink)]"
            >
              sales@metma-de.com
            </a>
            <Link href="/kontakt" className="btn-dark mt-5">
              Nachricht senden
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
