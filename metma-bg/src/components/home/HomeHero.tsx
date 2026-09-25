import Image from "next/image";
import Link from "next/link";

export function HomeHero() {
  return (
    <section className="relative isolate overflow-hidden bg-[#fff8f4] text-[var(--metma-ink)]">
      <Image
        src="/images/hero/color-burst.jpg"
        alt=""
        fill
        priority
        quality={75}
        className="object-cover object-[78%_center] md:object-[68%_center]"
        sizes="100vw"
      />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,244,0.2)_0%,rgba(255,248,244,0.55)_55%,#fff8f4_100%)] md:bg-[linear-gradient(90deg,#fff8f4_0%,rgba(255,248,244,0.92)_28%,rgba(255,248,244,0.35)_48%,transparent_68%)]"
      />

      <div className="container-metma relative z-10 flex min-h-[28rem] flex-col justify-end py-8 sm:min-h-[32rem] sm:py-12 md:min-h-[36rem] md:justify-center">
        <div className="max-w-xl">
          <p className="eyebrow text-[0.62rem] text-[var(--metma-rose)] sm:text-[0.7rem]">
            Боя за яйца · От 1999
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,3.8rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            С нашата боя
            <br />
            стават чудеса!
          </h1>
          <p className="mt-4 max-w-md text-[0.95rem] leading-7 text-[var(--metma-ink)]/75 sm:text-base">
            Комплекти, украси и дисплеи от собствено производство.
          </p>
          <div className="mt-7 grid w-full max-w-sm grid-cols-1 gap-3 sm:max-w-none sm:grid-cols-2 sm:gap-3 md:flex">
            <Link href="/produkti" className="btn-metma min-h-12 w-full px-6 md:w-52">
              Към колекцията
            </Link>
            <Link href="/za-nas" className="btn-outline min-h-12 w-full px-6 md:w-52">
              За нас
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
