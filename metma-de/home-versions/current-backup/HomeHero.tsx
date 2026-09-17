import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative isolate min-h-[min(68vh,620px)] overflow-hidden text-white md:min-h-[min(72vh,680px)]">
      <div className="hero-media absolute inset-0">
        <Image
          src="/images/hero-1.jpg"
          alt="METMA Ostereierfarben"
          fill
          priority
          quality={85}
          className="object-cover object-[68%_center] md:object-center"
          sizes="100vw"
        />
      </div>

      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(105deg,rgba(15,40,75,0.7)_0%,rgba(15,40,75,0.4)_36%,rgba(15,40,75,0.1)_56%,transparent_70%)]"
      />

      <div className="hero-copy relative z-10 flex min-h-[min(68vh,620px)] flex-col justify-end px-6 pb-12 pt-10 sm:px-10 sm:pb-14 md:min-h-[min(72vh,680px)] md:justify-center md:pb-16 md:pt-12">
        <div className="container-metma max-w-xl">
          <p className="eyebrow text-white/75">Farbe · Ostern · Seit 1999</p>
          <h1 className="mt-3 font-display text-[clamp(3.2rem,10vw,6.2rem)] font-bold leading-[0.88] tracking-[-0.045em]">
            METMA
          </h1>
          <p className="mt-4 max-w-md text-base leading-relaxed text-white/85 md:text-lg">
            Neue Art, Ostern zu färben — Sets und Displays aus eigener
            Produktion.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/produkte" className="btn-metma">
              Kollektion öffnen
            </Link>
            <Link
              href="/uber-uns"
              className="btn-outline border-white/40 text-white hover:border-white hover:bg-white/10"
            >
              Über uns
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
