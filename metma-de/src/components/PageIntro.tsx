import { EasterInline } from "@/components/easter/EasterMotifs";

type Props = {
  eyebrow: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
};

/** Shared blue-soft page intro with Easter motifs */
export function PageIntro({ eyebrow, title, subtitle, centered }: Props) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--metma-line)] bg-[var(--metma-blue-soft)] py-10 md:py-12">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-4 hidden items-center opacity-30 sm:flex md:right-10 md:opacity-40"
      >
        <EasterInline className="scale-125 md:scale-150" />
      </div>
      <div
        className={`container-metma relative ${centered ? "text-center" : ""}`}
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
