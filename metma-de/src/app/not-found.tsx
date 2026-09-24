import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Seite nicht gefunden",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="bg-white py-20 md:py-28">
      <div className="container-metma max-w-xl text-center">
        <p className="eyebrow text-[var(--metma-rose)]">404</p>
        <h1 className="mt-3 font-display text-[clamp(2rem,4vw,3rem)] font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
          Seite nicht gefunden
        </h1>
        <p className="mt-4 text-base leading-7 text-[var(--metma-mute)]">
          Diese Adresse gibt es nicht. Zurück zur Startseite oder ins Sortiment.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-metma">
            Startseite
          </Link>
          <Link href="/produkte" className="btn-outline">
            Produkte
          </Link>
        </div>
      </div>
    </section>
  );
}
