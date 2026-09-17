"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/Reveal";

type Unit = { days: number; hours: number; minutes: number; seconds: number };

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

function diffTo(target: Date, now: Date): Unit {
  const ms = Math.max(0, target.getTime() - now.getTime());
  const totalSeconds = Math.floor(ms / 1000);
  return {
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

function CountdownBlock({ label, value }: { label: string; value: Unit }) {
  const cells = [
    { label: "Days", value: value.days },
    { label: "Hours", value: value.hours },
    { label: "Minutes", value: value.minutes },
    { label: "Seconds", value: value.seconds },
  ];

  return (
    <div className="mb-8 last:mb-0">
      <p className="mb-3 text-center text-sm font-semibold uppercase tracking-[0.12em] text-white">
        {label}
      </p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {cells.map((cell) => (
          <div
            key={cell.label}
            className="countdown-cell rounded-md bg-[var(--metma-navy)] px-2 py-3 text-center text-white"
          >
            <div className="text-2xl font-semibold tabular-nums md:text-3xl">
              {pad(cell.value)}
            </div>
            <div className="mt-1 text-[11px] uppercase tracking-wide text-white/80">
              {cell.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AboutCountdown() {
  const targets = useMemo(() => {
    const year = new Date().getFullYear();
    let catholic = getEasterSunday(year);
    let orthodox = getOrthodoxEaster(year);
    const now = new Date();
    if (catholic.getTime() < now.getTime()) catholic = getEasterSunday(year + 1);
    if (orthodox.getTime() < now.getTime()) orthodox = getOrthodoxEaster(year + 1);
    return { catholic, orthodox };
  }, []);

  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative overflow-hidden bg-[var(--metma-blue)] text-white">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 top-10 h-72 w-72 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-[var(--metma-yellow)]/15 blur-3xl"
      />
      <div className="container-metma grid items-center gap-10 py-16 md:grid-cols-[1.1fr_0.9fr] md:gap-10 md:py-20">
        <Reveal className="relative">
          <div
            aria-hidden
            className="pointer-events-none absolute -left-2 -top-8 select-none text-[88px] font-bold leading-none text-[var(--metma-yellow)]/30 md:text-[120px]"
          >
            METMA
          </div>
          <h2 className="relative text-[28px] font-bold uppercase leading-tight tracking-[0.04em] text-[var(--metma-yellow)] md:text-[42px]">
            METMA
          </h2>
          <p className="relative mt-4 text-[18px] font-medium uppercase leading-snug tracking-[0.08em] md:text-[23px] md:leading-[28px]">
            Das einzige Unternehmen für Eierfärben in Bulgarien
          </p>
          <p className="relative mt-5 max-w-xl text-[15px] leading-7 text-white/95">
            Die einen vollständig geschlossenen Produktionsprozess hat, wodurch
            ein gutes Preis-Leistungs-Verhältnis erreicht wird. Wir arbeiten mit
            einigen der größten Einzelhandelsketten in Bulgarien und Europa
            zusammen. Wir sind kompromisslos in Qualität und Service für unsere
            Kunden.
          </p>
          <Link href="/uber-uns" className="btn-metma relative mt-8">
            Über uns <span aria-hidden>›</span>
          </Link>
        </Reveal>

        <Reveal delayMs={160}>
          <p className="mb-6 text-center text-lg font-semibold text-[var(--metma-yellow)] md:text-left">
            Zeit bis Ostern
          </p>
          <CountdownBlock label="CATHOLIC" value={diffTo(targets.catholic, now)} />
          <CountdownBlock label="ORTHODOX" value={diffTo(targets.orthodox, now)} />
        </Reveal>
      </div>
    </section>
  );
}
