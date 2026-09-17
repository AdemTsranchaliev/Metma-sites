"use client";

import Link from "next/link";
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

function pad(n: number) {
  return String(n).padStart(2, "0");
}

type Unit = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function useCountdown(target: Date): Unit {
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

function CountdownGrid({ label, value }: { label: string; value: Unit }) {
  const cells = [
    { label: "Days", value: value.days },
    { label: "Hours", value: value.hours },
    { label: "Minutes", value: value.minutes },
    { label: "Seconds", value: value.seconds, live: true },
  ];

  return (
    <div className="mb-5 last:mb-0">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-white">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
        {cells.map((cell) => (
          <div
            key={cell.label}
            className="bg-[var(--metma-navy)] px-2 py-4 text-center"
          >
            <div
              key={`${cell.label}-${cell.value}`}
              className={`font-display text-3xl font-bold tabular-nums text-[var(--metma-yellow)] md:text-4xl ${
                cell.live ? "tick" : ""
              }`}
            >
              {pad(cell.value)}
            </div>
            <div className="mt-1.5 text-[10px] uppercase tracking-wide text-white/70">
              {cell.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function HomeAboutWave() {
  const targets = useMemo(() => {
    const year = new Date().getFullYear();
    let catholic = getEasterSunday(year);
    let orthodox = getOrthodoxEaster(year);
    if (catholic.getTime() < Date.now()) catholic = getEasterSunday(year + 1);
    if (orthodox.getTime() < Date.now()) orthodox = getOrthodoxEaster(year + 1);
    return { catholic, orthodox };
  }, []);

  const catholic = useCountdown(targets.catholic);
  const orthodox = useCountdown(targets.orthodox);

  return (
    <section className="bg-[var(--metma-blue)] py-16 text-white md:py-20">
      <div className="container-metma grid gap-12 md:grid-cols-2 md:items-center md:gap-16">
        <div>
          <h2 className="font-display text-5xl font-bold tracking-tight text-[var(--metma-yellow)] md:text-6xl">
            METMA
          </h2>
          <p className="mt-5 max-w-md text-base font-semibold uppercase leading-snug tracking-wide text-white md:text-lg">
            Das einzige Unternehmen für Eierfärben in Bulgarien
          </p>
          <p className="mt-4 max-w-md text-sm leading-7 text-white/90 md:text-base">
            Geschlossener Produktionsprozess, starker Preis und kompromisslose
            Qualität für Handel und Displays.
          </p>
          <Link href="/uber-uns" className="btn-metma mt-8 inline-flex">
            Über uns ›
          </Link>
        </div>

        <div>
          <p className="font-display text-3xl font-semibold text-[var(--metma-yellow)] md:text-4xl">
            Zeit bis Ostern
          </p>
          <div className="mt-6">
            <CountdownGrid label="Catholic" value={catholic} />
            <CountdownGrid label="Orthodox" value={orthodox} />
          </div>
        </div>
      </div>
    </section>
  );
}
