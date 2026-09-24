import Link from "next/link";
import { MagneticCta } from "@/components/MagneticCta";
import { Reveal } from "@/components/Reveal";
import { SectionScatter } from "@/components/easter/EasterScatter";
import { siteConfig } from "@/lib/site";

export function HomeContact() {
  return (
    <section className="relative overflow-hidden bg-[var(--metma-peach)] py-12 sm:py-16 md:py-16">
      <SectionScatter variant="contact" />
      <div className="container-metma relative z-[1] grid items-end gap-8 md:grid-cols-[1.25fr_0.85fr] md:gap-12">
        <Reveal>
          <p className="eyebrow text-[var(--metma-rose)]">Контакт</p>
          <h2 className="mt-2.5 max-w-xl font-display text-[clamp(1.7rem,6.5vw,3rem)] font-bold leading-[1.06] tracking-[-0.03em] text-[var(--metma-ink)] sm:mt-3">
            Свържете се с нас сега.
          </h2>
          <p className="mt-3 max-w-md text-[0.95rem] leading-7 text-[var(--metma-mute)] sm:mt-4 sm:text-base">
            Въпроси за асортимент, дисплеи или едра поръчка? Ще ви отговорим.
          </p>
          <MagneticCta className="mt-6 w-full sm:mt-8 sm:w-auto">
            <Link href="/kontakti" className="btn-metma">
              Изпратете съобщение
            </Link>
          </MagneticCta>
        </Reveal>

        <Reveal delayMs={70}>
          <div className="grid grid-cols-1 gap-4 border-t border-[var(--metma-ink)]/10 pt-6 sm:grid-cols-2 sm:gap-6 md:grid-cols-1 md:border-0 md:pt-0 md:text-right">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
                Телефон
              </p>
              <a
                href={`tel:${siteConfig.phoneE164}`}
                className="mt-1.5 block text-lg font-semibold text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)] sm:text-xl"
              >
                {siteConfig.phone}
              </a>
              <a
                href={`tel:${siteConfig.phoneAltE164}`}
                className="mt-1 block text-lg font-semibold text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)] sm:text-xl"
              >
                {siteConfig.phoneAlt}
              </a>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--metma-mute)]">
                Имейл
              </p>
              <a
                href={`mailto:${siteConfig.email}`}
                className="mt-1.5 block break-all text-sm font-medium text-[var(--metma-ink)] transition hover:text-[var(--metma-rose)] sm:text-base md:break-normal"
              >
                {siteConfig.email}
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
