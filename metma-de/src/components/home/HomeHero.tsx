import Image from "next/image";
import Link from "next/link";
import { MagneticCta } from "@/components/MagneticCta";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[min(58vh,520px)] overflow-hidden bg-[#f7f5f2] text-[var(--metma-ink)] sm:min-h-[min(64vh,580px)] md:min-h-[min(72vh,680px)]">
      <div className="hero-media absolute inset-0">
        <Image
          src="/images/hero-color-burst.jpg"
          alt="METMA Ostereierfarben"
          fill
          priority
          quality={75}
          className="object-cover object-[78%_center] sm:object-[72%_center] md:object-center"
          sizes="100vw"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,245,242,0.72)_0%,rgba(247,245,242,0.35)_42%,rgba(247,245,242,0.88)_100%)] md:bg-[linear-gradient(100deg,rgba(247,245,242,0.94)_0%,rgba(247,245,242,0.72)_38%,rgba(247,245,242,0.2)_58%,transparent_74%)]"
      />

      <div className="hero-copy relative z-10 flex min-h-[min(58vh,520px)] flex-col justify-end px-0 pb-9 pt-8 sm:min-h-[min(64vh,580px)] sm:pb-12 md:min-h-[min(72vh,680px)] md:justify-center md:pb-16 md:pt-12">
        <div className="container-metma max-w-xl">
          <p className="eyebrow text-[var(--metma-rose)]">
            Farbe · Ostern · Seit 1999
          </p>
          <h1 className="relative mt-3 h-[clamp(2.75rem,12vw,5.25rem)] w-[min(100%,28rem)] sm:mt-4">
            <Image
              src="/images/logo-brand-v3.png"
              alt="METMA"
              fill
              priority
              sizes="(max-width:640px) 90vw, 448px"
              className="object-contain object-left drop-shadow-[0_6px_18px_rgba(23,23,23,0.12)]"
            />
          </h1>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-[var(--metma-mute)] sm:mt-4 sm:text-base md:text-lg">
            Neue Art, Ostern zu färben — Sets und Displays aus eigener
            Produktion.
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
            <MagneticCta className="w-full sm:w-auto">
              <Link href="/produkte" className="btn-metma">
                Kollektion öffnen
              </Link>
            </MagneticCta>
            <MagneticCta className="w-full sm:w-auto">
              <Link
                href="/uber-uns"
                className="btn-outline border-[var(--metma-ink)]/25 bg-white/95 text-[var(--metma-ink)] shadow-[0_4px_16px_-8px_rgba(23,23,23,0.35)] hover:border-[var(--metma-ink)] hover:bg-white"
              >
                Über uns
              </Link>
            </MagneticCta>
          </div>
        </div>
      </div>
    </section>
  );
}
