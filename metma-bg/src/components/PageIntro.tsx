import { SectionScatter } from "@/components/easter/EasterScatter";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  /** Soft Easter accents in this intro band */
  scatter?: boolean;
};

/** Shared blue-soft page intro */
export function PageIntro({
  eyebrow,
  title,
  subtitle,
  centered,
  scatter = true,
}: Props) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--metma-line)] bg-[var(--metma-blue-soft)] py-10 md:py-12">
      {scatter ? <SectionScatter variant="story" /> : null}
      <div
        className={`container-metma relative z-[1] ${centered ? "text-center" : ""}`}
      >
        <p className="eyebrow text-[var(--metma-rose)]">{eyebrow}</p>
        <h1 className="mt-2 font-display text-[clamp(2rem,4vw,2.9rem)] font-bold tracking-[-0.03em] text-[var(--metma-ink)]">
          {title}
        </h1>
        {subtitle ? (
          <p
            className={`mt-2 max-w-lg text-sm leading-7 text-[var(--metma-mute)] md:text-base ${
              centered ? "mx-auto" : ""
            }`}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
    </section>
  );
}
