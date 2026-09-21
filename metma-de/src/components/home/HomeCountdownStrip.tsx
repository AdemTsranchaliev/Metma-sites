"use client";

import { useEffect, useMemo, useState } from "react";
import { BunnyIcon, EggIcon } from "@/components/easter/EasterMotifs";
import { SectionScatter } from "@/components/easter/EasterScatter";

function getEasterSunday(year: number) {
  const a = year % 19;
  const b = Math.floor(year / 100);
  const c = year % 100;
  const d = Math.floor(b / 4);
  const e = b % 4;
  const f = Math.floor((b + 8) / 25);
  const g = Math.floor((b - f + 1) / 3);
  const h = (19 * a + b - d - g + 15) % 30;
  const i = Math.floor(c / 4);
  const k = c % 4;
  const l = (32 + 2 * e + 2 * i - h - k) % 7;
  const m = Math.floor((a + 11 * h + 22 * l) / 451);
  const month = Math.floor((h + l - 7 * m + 114) / 31);
  const day = ((h + l - 7 * m + 114) % 31) + 1;
  return new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
}

function getOrthodoxEaster(year: number) {
  const a = year % 4;
  const b = year % 7;
  const c = year % 19;
  const d = (19 * c + 15) % 30;
  const e = (2 * a + 4 * b - d + 34) % 7;
  const month = Math.floor((d + e + 114) / 31);
  const day = ((d + e + 114) % 31) + 1;
  const julian = new Date(Date.UTC(year, month - 1, day, 12, 0, 0));
  julian.setUTCDate(julian.getUTCDate() + 13);
  return julian;
}

function nextOccurrence(getDate: (y: number) => Date) {
  const year = new Date().getFullYear();
  const thisYear = getDate(year);
  return thisYear.getTime() < Date.now() ? getDate(year + 1) : thisYear;
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function formatDate(d: Date) {
  return d.toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function useCountdown(target: Date) {
  // null until mount so SSR/static HTML matches the first client render
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const total =
    now === null
      ? 0
      : Math.max(0, Math.floor((target.getTime() - now) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function CountdownCard({
  title,
  target,
  eggFill,
  eggPattern,
  tileColors,
}: {
  title: string;
  target: Date;
  eggFill: string;
  eggPattern: "dots" | "stripes" | "zigzag";
  tileColors: [string, string, string, string];
}) {
  const t = useCountdown(target);
  const units = [
    { value: t.days, label: "Tage", bg: tileColors[0] },
    { value: t.hours, label: "Std", bg: tileColors[1] },
    { value: t.minutes, label: "Min", bg: tileColors[2] },
    { value: t.seconds, label: "Sek", bg: tileColors[3] },
  ];

  return (
    <article className="bg-white/90 px-4 py-5 sm:rounded-[1.75rem] sm:px-6 sm:py-7 sm:shadow-[0_10px_28px_-18px_rgba(180,90,60,0.35)]">
      <div className="mb-4 flex items-center gap-3 sm:mb-5 sm:gap-3.5">
        <EggIcon
          fill={eggFill}
          pattern={eggPattern}
          className="egg-wobble h-10 w-7 shrink-0 sm:h-12 sm:w-9"
        />
        <div>
          <h3 className="font-display text-base font-bold tracking-tight text-[var(--metma-ink)] sm:text-lg">
            {title}
          </h3>
          <p className="mt-0.5 text-xs font-semibold text-[var(--metma-rose)] sm:text-sm">
            {formatDate(target)}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {units.map((unit) => (
          <div
            key={unit.label}
            className="rounded-xl px-0.5 py-2.5 text-center sm:rounded-2xl sm:px-1 sm:py-3"
            style={{ background: unit.bg }}
          >
            <p className="font-display text-lg font-bold tabular-nums text-[var(--metma-ink)] sm:text-2xl">
              <span key={unit.value} className="egg-num inline-block">
                {pad(unit.value)}
              </span>
            </p>
            <p className="mt-0.5 text-[0.55rem] font-bold uppercase tracking-[0.1em] text-[var(--metma-navy)]/65 sm:mt-1 sm:text-[0.6rem] sm:tracking-[0.12em]">
              {unit.label}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

export function HomeCountdownStrip() {
  const catholic = useMemo(() => nextOccurrence(getEasterSunday), []);
  const orthodox = useMemo(() => nextOccurrence(getOrthodoxEaster), []);

  const loop = [
    "Zeit bis Ostern",
    "Bunte Eier!",
    "Pastell · Brillant · Marmor",
    "METMA färbt mit",
    "Seit 1999",
  ];
  const items = [...loop, ...loop];

  return (
    <section
      aria-label="Countdown bis Ostern"
      className="relative overflow-hidden"
    >
      <SectionScatter variant="countdown" />
      <div className="relative z-[1] overflow-hidden bg-[var(--metma-butter)]">
        <div className="marquee py-3 text-xs font-bold uppercase tracking-[0.16em] text-[var(--metma-ink)] md:text-sm">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center gap-3 whitespace-nowrap"
            >
              {item}
              {i % 2 === 0 ? (
                <EggIcon
                  fill={
                    i % 3 === 0
                      ? "var(--metma-rose)"
                      : i % 3 === 1
                        ? "var(--metma-blue)"
                        : "#7bc47f"
                  }
                  pattern={
                    i % 3 === 0 ? "dots" : i % 3 === 1 ? "stripes" : "zigzag"
                  }
                  className="h-5 w-4"
                />
              ) : (
                <BunnyIcon
                  fill={i % 4 === 1 ? "var(--metma-lilac)" : "var(--metma-peach)"}
                  className="h-5 w-[1.15rem]"
                />
              )}
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-[1] overflow-hidden bg-[linear-gradient(165deg,var(--metma-peach)_0%,#ffe8c8_50%,var(--metma-butter)_100%)] py-10 sm:py-12 md:py-14">
        <EggIcon
          fill="var(--metma-rose)"
          pattern="dots"
          className="pointer-events-none absolute -left-3 top-8 hidden h-16 w-12 rotate-[-16deg] opacity-25 sm:block"
        />
        <BunnyIcon
          fill="var(--metma-lilac)"
          className="pointer-events-none absolute -right-1 bottom-6 hidden h-16 w-14 rotate-[10deg] opacity-25 sm:block"
        />

        <div className="container-metma relative">
          <div className="mb-6 text-center sm:mb-8">
            <div className="mb-2.5 flex items-center justify-center gap-2 sm:mb-3">
              <EggIcon
                fill="var(--metma-rose)"
                pattern="dots"
                className="h-6 w-4 sm:h-7 sm:w-5"
              />
              <BunnyIcon
                fill="var(--metma-butter)"
                className="h-7 w-6 sm:h-8 sm:w-7"
              />
              <EggIcon
                fill="var(--metma-blue)"
                pattern="zigzag"
                className="h-6 w-4 sm:h-7 sm:w-5"
              />
            </div>
            <p className="eyebrow text-[var(--metma-rose)]">Frohe Ostern</p>
            <h2 className="mt-2 font-display text-[clamp(1.55rem,6vw,2.5rem)] font-bold tracking-tight text-[var(--metma-ink)]">
              Wie viele Tage bis zu den Eiern?
            </h2>
          </div>

          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 md:gap-5">
            <CountdownCard
              title="Katholisch"
              target={catholic}
              eggFill="var(--metma-rose)"
              eggPattern="dots"
              tileColors={["#ffd6cf", "#ffe6a8", "#d9f0e0", "#d6e8f8"]}
            />
            <CountdownCard
              title="Orthodox"
              target={orthodox}
              eggFill="var(--metma-blue)"
              eggPattern="stripes"
              tileColors={["#d6e8f8", "#e8d9f5", "#ffd6cf", "#ffe6a8"]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
