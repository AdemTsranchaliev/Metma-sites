import Link from "next/link";
import { Reveal } from "@/components/Reveal";

export function ContactCta() {
  return (
    <section className="relative overflow-hidden bg-[var(--metma-blue)] py-16 text-white md:py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #6aa0d8 0, transparent 40%), radial-gradient(circle at 80% 70%, #2f6db0 0, transparent 45%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/10 blur-3xl"
      />
      <div className="container-metma relative z-10 text-center">
        <Reveal>
          <h2 className="text-2xl font-semibold uppercase tracking-[0.06em] md:text-[32px]">
            Melden Sie sich bei uns
          </h2>
        </Reveal>

        <Reveal delayMs={100}>
          <div className="mt-8 flex flex-col items-center justify-center gap-6 md:flex-row md:gap-16">
            <a
              href="tel:+359885828771"
              className="text-lg font-medium tracking-wide transition duration-300 hover:text-[var(--metma-yellow)] md:text-xl"
            >
              +359 885 828 771
            </a>
            <a
              href="mailto:sales@metma-de.com"
              className="text-lg font-medium tracking-wide transition duration-300 hover:text-[var(--metma-yellow)] md:text-xl"
            >
              sales@metma-de.com
            </a>
          </div>
        </Reveal>

        <Reveal delayMs={180}>
          <div className="mt-10">
            <Link href="/kontakt" className="btn-metma gap-3 px-8 py-4 text-base">
              KONTAKTIERE UNS
              <EnvelopeIcon />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function EnvelopeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect
        x="3"
        y="5"
        width="18"
        height="14"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}
