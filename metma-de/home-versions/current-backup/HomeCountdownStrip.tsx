"use client";

import { useEffect, useMemo, useState } from "react";

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

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const total = Math.max(0, Math.floor((target.getTime() - now) / 1000));
  return {
    days: Math.floor(total / 86400),
    hours: Math.floor((total % 86400) / 3600),
    minutes: Math.floor((total % 3600) / 60),
    seconds: total % 60,
  };
}

function Row({ label, target }: { label: string; target: Date }) {
  const t = useCountdown(target);
  const parts = [
    { v: t.days, l: "Tage" },
    { v: t.hours, l: "Std" },
    { v: t.minutes, l: "Min" },
    { v: t.seconds, l: "Sek" },
  ];

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
      <p className="text-sm font-semibold text-[var(--metma-ink)]">{label}</p>
      <div className="flex gap-5 sm:gap-7">
        {parts.map((p) => (
          <div key={p.l} className="min-w-[3rem] text-center">
            <p className="font-display text-2xl font-bold tabular-nums text-[var(--metma-ink)] sm:text-[1.7rem]">
              {pad(p.v)}
            </p>
            <p className="mt-0.5 text-[0.62rem] font-semibold uppercase tracking-[0.14em] text-[var(--metma-mute)]">
              {p.l}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeCountdownStrip() {
  const catholic = useMemo(() => nextOccurrence(getEasterSunday), []);
  const orthodox = useMemo(() => nextOccurrence(getOrthodoxEaster), []);

  const loop = [
    "Zeit bis Ostern",
    "Pastell · Brillant · Marmor",
    "METMA färbt mit",
    "Seit 1999",
  ];
  const items = [...loop, ...loop];

  return (
    <section aria-label="Countdown bis Ostern">
      <div className="overflow-hidden bg-[var(--metma-butter)]">
        <div className="marquee py-3 text-xs font-bold uppercase tracking-[0.18em] text-[var(--metma-ink)] md:text-sm">
          {items.map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="inline-flex items-center gap-3 whitespace-nowrap"
            >
              {item}
              <span
                aria-hidden
                className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--metma-rose)]"
              />
            </span>
          ))}
        </div>
      </div>

      <div className="border-b border-[var(--metma-line)] bg-white">
        <div className="container-metma grid gap-6 py-8 md:grid-cols-2 md:gap-12 md:py-10">
          <Row label="Katholisch" target={catholic} />
          <Row label="Orthodox" target={orthodox} />
        </div>
      </div>
    </section>
  );
}
