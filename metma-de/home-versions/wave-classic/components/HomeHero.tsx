import Image from "next/image";
import Link from "next/link";
import { ScribbleUnderline, WaveBottom } from "@/components/home/DesignDetails";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden bg-[var(--metma-blue)] text-white">
      <div className="absolute inset-0">
        <Image
          src="/images/hero-1.jpg"
          alt="METMA Ostereierfarben"
          fill
          priority
          quality={75}
          className="hero-zoom object-cover object-[70%_center] md:object-center"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1e4d86]/75 via-[#2f6db0]/45 to-[#2f6db0]/15" />
      </div>

      <div className="container-metma relative z-10 py-24 md:py-32">
        <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--metma-yellow)] backdrop-blur-sm">
          Seit 1999 · Ostern
        </p>
        <p className="mt-5 font-display text-[clamp(3.5rem,10vw,7rem)] font-bold leading-[0.9] tracking-tight">
          METMA
        </p>
        <h1 className="mt-5 max-w-xl font-display text-[clamp(1.7rem,3.4vw,2.75rem)] font-semibold leading-tight">
          Frohe Ostern in jeder Farbe
        </h1>
        <div className="mt-1 flex justify-start">
          <ScribbleUnderline
            color="var(--metma-yellow)"
            className="mx-0 mt-1 h-3.5 w-[160px] md:w-[200px]"
          />
        </div>
        <p className="mt-5 max-w-md text-base text-white/92 md:text-lg">
          Brillante Eierfarben, Sets und Dekorationen aus Bulgarien.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/produkte" className="btn-metma">
            Osterprodukte
          </Link>
          <Link
            href="/kontakt"
            className="btn-line border-white/90 bg-white/10 text-white backdrop-blur-sm hover:bg-white hover:text-[var(--metma-ink)]"
          >
            Kontakt
          </Link>
        </div>
      </div>

      <WaveBottom fill="#ffffff" />
    </section>
  );
}
