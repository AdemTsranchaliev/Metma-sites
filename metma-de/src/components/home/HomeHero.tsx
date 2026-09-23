import Image from "next/image";
import Link from "next/link";
import { MagneticCta } from "@/components/MagneticCta";

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#f7f5f2] text-[var(--metma-ink)]">
      <div className="hero-media absolute inset-0">
        <Image
          src="/images/hero-color-burst.jpg"
          alt="METMA Ostereierfarben"
          fill
          priority
          quality={75}
          className="object-cover object-[92%_32%] sm:object-[78%_center] md:object-center"
          sizes="100vw"
        />
      </div>

      {/* Mobile: strong bottom wash so copy + CTAs stay readable */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(247,245,242,0.15)_0%,rgba(247,245,242,0.45)_48%,rgba(247,245,242,0.96)_78%,#f7f5f2_100%)] md:bg-[linear-gradient(100deg,rgba(247,245,242,0.94)_0%,rgba(247,245,242,0.72)_38%,rgba(247,245,242,0.2)_58%,transparent_74%)]"
      />

      <div className="hero-copy relative z-10 flex min-h-[min(72svh,560px)] flex-col justify-end px-0 pb-5 pt-6 sm:min-h-[min(64vh,580px)] sm:pb-12 sm:pt-8 md:min-h-[min(72vh,680px)] md:justify-center md:pb-16 md:pt-12">
        <div className="container-metma max-w-xl">
          <p className="eyebrow text-[0.62rem] text-[var(--metma-rose)] sm:text-[0.7rem]">
            Farbe · Ostern · Seit 1999
          </p>

          <h1 className="relative mt-2.5 h-12 w-[min(100%,17.5rem)] sm:mt-4 sm:h-[clamp(2.75rem,12vw,5.25rem)] sm:w-[min(100%,28rem)]">
            <Image
              src="/images/logo-brand-v3.png"
              alt="METMA"
              fill
              priority
              sizes="(max-width:640px) 280px, 448px"
              className="object-contain object-left drop-shadow-[0_6px_18px_rgba(23,23,23,0.12)]"
            />
          </h1>

          <p className="mt-3 max-w-md font-display text-[1.15rem] font-bold leading-snug tracking-[-0.02em] text-[var(--metma-ink)] sm:mt-5 sm:text-[1.35rem] md:text-[1.5rem]">
            Mit unserer Farbe geschehen Wunder!
          </p>

          <p className="mt-2 max-w-md text-[0.9rem] leading-snug text-[var(--metma-mute)] sm:text-base sm:leading-relaxed">
            Sets und Displays aus eigener Produktion — seit 1999.
          </p>

          <div className="mt-4 grid grid-cols-1 gap-2 sm:mt-8 sm:flex sm:flex-row sm:flex-wrap sm:gap-3">
            <MagneticCta className="w-full sm:w-auto">
              <Link href="/produkte" className="btn-metma min-h-11 w-full sm:min-h-0 sm:w-auto">
                Kollektion öffnen
              </Link>
            </MagneticCta>
            <MagneticCta className="w-full sm:w-auto">
              <Link
                href="/uber-uns"
                className="btn-outline min-h-11 w-full border-[var(--metma-ink)]/20 bg-white text-[var(--metma-ink)] shadow-[0_4px_16px_-8px_rgba(23,23,23,0.35)] hover:border-[var(--metma-ink)] hover:bg-white sm:min-h-0 sm:w-auto sm:bg-white/95"
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
