import Image from "next/image";
import Link from "next/link";
import { SectionScatter } from "@/components/easter/EasterScatter";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[min(58vh,520px)] overflow-hidden text-white sm:min-h-[min(64vh,580px)] md:min-h-[min(72vh,680px)]">
      <div className="hero-media absolute inset-0">
        <Image
          src="/images/hero-1.jpg"
          alt="METMA Ostereierfarben"
          fill
          priority
          quality={85}
          className="object-cover object-[72%_center] sm:object-[68%_center] md:object-center"
          sizes="100vw"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(15,40,75,0.25)_0%,rgba(15,40,75,0.55)_42%,rgba(15,40,75,0.82)_100%)] md:bg-[linear-gradient(105deg,rgba(15,40,75,0.7)_0%,rgba(15,40,75,0.4)_36%,rgba(15,40,75,0.1)_56%,transparent_70%)]"
      />

      <SectionScatter variant="hero" className="z-[5]" />

      <div className="hero-copy relative z-10 flex min-h-[min(58vh,520px)] flex-col justify-end px-0 pb-9 pt-8 sm:min-h-[min(64vh,580px)] sm:pb-12 md:min-h-[min(72vh,680px)] md:justify-center md:pb-16 md:pt-12">
        <div className="container-metma max-w-xl">
          <p className="eyebrow text-white/75">Farbe · Ostern · Seit 1999</p>
          <h1 className="mt-2.5 font-display text-[clamp(2.85rem,14vw,6.2rem)] font-bold leading-[0.88] tracking-[-0.045em] sm:mt-3">
            METMA
          </h1>
          <p className="mt-3 max-w-md text-[0.95rem] leading-relaxed text-white/85 sm:mt-4 sm:text-base md:text-lg">
            Neue Art, Ostern zu färben — Sets und Displays aus eigener
            Produktion.
          </p>
          <div className="mt-6 flex flex-col gap-2.5 sm:mt-8 sm:flex-row sm:flex-wrap sm:gap-3">
            <Link href="/produkte" className="btn-metma w-full sm:w-auto">
              Kollektion öffnen
            </Link>
            <Link
              href="/uber-uns"
              className="btn-outline w-full border-white/40 text-white hover:border-white hover:bg-white/10 sm:w-auto"
            >
              Über uns
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
