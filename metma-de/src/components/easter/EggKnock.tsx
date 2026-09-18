import { EggIcon } from "@/components/easter/EasterMotifs";

/** Two Easter eggs tapping — clean Ostern animation */
export function EggKnock() {
  return (
    <section
      aria-label="Ostereier klopfen"
      className="border-y border-[var(--metma-line)] bg-white py-12 md:py-14"
    >
      <div className="container-metma flex flex-col items-center text-center">
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
            className="egg-knock-ground absolute inset-x-10 bottom-2 h-2.5 rounded-[100%] bg-[var(--metma-ink)]/8"
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
