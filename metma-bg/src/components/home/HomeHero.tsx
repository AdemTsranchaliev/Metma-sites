import Link from "next/link";
import { HeroMedia } from "@/components/home/HeroMedia";
import { getMessages } from "@/i18n/messages";
import { localePath, type Locale } from "@/lib/i18n";

function KnockEggsIcon() {
  return (
    <svg viewBox="0 0 34 20" className="h-5 w-8 shrink-0" aria-hidden>
      <ellipse cx="9" cy="11" rx="5.6" ry="8.2" transform="rotate(-26 9 11)" fill="#e4572e" />
      <ellipse cx="8.2" cy="8.4" rx="1.6" ry="2.4" transform="rotate(-26 8.2 8.4)" fill="#fff" opacity="0.45" />
      <ellipse cx="25" cy="11" rx="5.6" ry="8.2" transform="rotate(26 25 11)" fill="#fff" stroke="#c94520" strokeWidth="1.25" />
    </svg>
  );
}

export function HomeHero({ locale }: { locale: Locale }) {
  const copy = getMessages(locale).hero;
  return (
    <section className="relative isolate overflow-hidden bg-[#fff8f4] text-[var(--metma-ink)]">
      <HeroMedia />
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,248,244,0.2)_0%,rgba(255,248,244,0.55)_55%,#fff8f4_100%)] md:bg-[linear-gradient(90deg,#fff8f4_0%,rgba(255,248,244,0.92)_28%,rgba(255,248,244,0.35)_48%,transparent_68%)]"
      />

      <div className="container-metma relative z-10 flex min-h-[26rem] flex-col justify-end py-8 sm:min-h-[28rem] md:min-h-[32rem] md:justify-center md:py-10">
        <div className="max-w-xl">
          <p className="eyebrow text-[0.62rem] text-[var(--metma-rose)] sm:text-[0.7rem]">
            {copy.eyebrow}
          </p>
          <h1 className="mt-3 font-display text-[clamp(2.2rem,6vw,3.8rem)] font-bold leading-[0.95] tracking-[-0.04em]">
            {copy.title1}
            <br />
            {copy.title2}
          </h1>
          <p className="mt-4 max-w-md text-[0.95rem] leading-7 text-[var(--metma-ink)]/75 sm:text-base">
            {copy.text}
          </p>
          <div className="mt-7 grid w-full max-w-sm grid-cols-1 gap-3 sm:max-w-none sm:grid-cols-2 sm:gap-3 md:flex">
            <Link href={localePath(locale, "/produkti")} className="btn-metma min-h-12 w-full px-6 md:w-52">
              {copy.collection}
            </Link>
            <a href="#igra" className="btn-butter min-h-12 w-full gap-2 px-5 md:w-52">
              <KnockEggsIcon />
              {copy.game}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
