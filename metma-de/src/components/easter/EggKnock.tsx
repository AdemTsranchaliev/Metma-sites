import { EggIcon } from "@/components/easter/EasterMotifs";

/** Two Easter eggs tapping — clean Ostern animation */
export function EggKnock() {
  return (
    <section
      aria-label="Ostereier klopfen"
      className="relative overflow-hidden border-y border-[var(--metma-peach)]/50 bg-[linear-gradient(160deg,var(--metma-mint)_0%,#fff6e8_48%,var(--metma-lilac)_100%)] py-12 md:py-14"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 top-0 h-48 w-48 rounded-full bg-[var(--metma-butter)]/35 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-12 bottom-0 h-44 w-44 rounded-full bg-[var(--metma-rose)]/15 blur-3xl"
      />

      <div className="container-metma relative z-[1] flex flex-col items-center text-center">
        <p className="eyebrow text-[var(--metma-rose)]">Ostern-Tradition</p>
        <h2 className="mt-2 font-display text-[clamp(1.45rem,3vw,2rem)] font-bold tracking-tight text-[var(--metma-ink)]">
          Wer knackt zuerst?
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--metma-mute)]">
          Zwei Eier, ein Klopfen — reine Ostern-Freude.
        </p>

        <div className="egg-knock relative mt-9 h-32 w-full max-w-[260px] sm:mt-10 sm:h-36 sm:max-w-[300px]">
          <div
            aria-hidden
            className="egg-knock-ground absolute inset-x-10 bottom-2 h-2.5 rounded-[100%] bg-[var(--metma-ink)]/10"
          />
          <span aria-hidden className="egg-knock-spark" />

          <div className="egg-knock-left absolute bottom-3 left-1/2 z-[1]">
            <EggIcon
              fill="var(--metma-rose)"
              pattern="dots"
              className="h-20 w-14 sm:h-24 sm:w-[4.25rem]"
            />
          </div>
          <div className="egg-knock-right absolute bottom-3 left-1/2 z-[1]">
            <EggIcon
              fill="var(--metma-blue)"
              pattern="stripes"
              className="h-20 w-14 sm:h-24 sm:w-[4.25rem]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
