import { BunnyIcon, EggIcon } from "@/components/easter/EasterMotifs";

/** Two Easter eggs tapping — classic Ostern animation */
export function EggKnock() {
  return (
    <section
      aria-label="Ostereier klopfen"
      className="relative overflow-hidden bg-[linear-gradient(180deg,#fff8f0_0%,var(--metma-peach)_55%,#ffe8c8_100%)] py-12 md:py-16"
    >
      <BunnyIcon
        fill="var(--metma-lilac)"
        className="pointer-events-none absolute left-[6%] top-8 hidden h-12 w-11 rotate-[-12deg] opacity-30 sm:block md:left-[12%]"
      />
      <BunnyIcon
        fill="var(--metma-mint)"
        className="pointer-events-none absolute right-[7%] top-10 hidden h-11 w-10 rotate-[14deg] opacity-30 sm:block md:right-[14%]"
      />

      <div className="container-metma relative flex flex-col items-center text-center">
        <p className="eyebrow text-[var(--metma-rose)]">Ostern-Tradition</p>
        <h2 className="mt-2 font-display text-[clamp(1.55rem,3.5vw,2.15rem)] font-bold tracking-tight text-[var(--metma-ink)]">
          Wer knackt zuerst?
        </h2>
        <p className="mt-2 max-w-sm text-sm leading-6 text-[var(--metma-mute)]">
          Zwei Eier, ein Klopfen — reine Ostern-Freude.
        </p>

        <div className="egg-knock relative mt-10 h-36 w-full max-w-[280px] sm:mt-12 sm:h-40 sm:max-w-[320px]">
          {/* ground */}
          <div
            aria-hidden
            className="egg-knock-ground absolute inset-x-8 bottom-3 h-3 rounded-[100%] bg-[var(--metma-ink)]/10 blur-[1px] sm:inset-x-10"
          />

          {/* impact burst */}
          <span aria-hidden className="egg-knock-ring" />
          <span aria-hidden className="egg-knock-spark" />
          <span aria-hidden className="egg-knock-chip egg-knock-chip-a" />
          <span aria-hidden className="egg-knock-chip egg-knock-chip-b" />
          <span aria-hidden className="egg-knock-chip egg-knock-chip-c" />
          <span aria-hidden className="egg-knock-word">
            KLACK!
          </span>

          <div className="egg-knock-left absolute bottom-4 left-1/2 z-[1]">
            <EggIcon
              fill="var(--metma-rose)"
              pattern="dots"
              className="h-[5.5rem] w-[4rem] sm:h-28 sm:w-20"
            />
          </div>

          <div className="egg-knock-right absolute bottom-4 left-1/2 z-[1]">
            <EggIcon
              fill="var(--metma-blue)"
              pattern="stripes"
              className="h-[5.5rem] w-[4rem] sm:h-28 sm:w-20"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
