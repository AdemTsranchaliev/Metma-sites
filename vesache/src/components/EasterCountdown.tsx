"use client";

import { useEffect, useMemo, useState } from "react";
import { BunnyIcon, EggIcon } from "@/components/Motifs";

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

function nextOccurrence(getDate: (year: number) => Date) {
  const year = new Date().getFullYear();
  const thisYear = getDate(year);
  return thisYear.getTime() < Date.now() ? getDate(year + 1) : thisYear;
}

function pad(value: number) {
  return String(value).padStart(2, "0");
}

const months = ["януари", "февруари", "март", "април", "май", "юни", "юли", "август", "септември", "октомври", "ноември", "декември"];

function formatDate(date: Date) {
  return `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()} г.`;
}

function useCountdown(target: Date) {
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const total = now === null ? 0 : Math.max(0, Math.floor((target.getTime() - now) / 1000));
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
  const time = useCountdown(target);
  const units = [
    { value: time.days, label: "Дни", bg: tileColors[0] },
    { value: time.hours, label: "Часа", bg: tileColors[1] },
    { value: time.minutes, label: "Мин", bg: tileColors[2] },
    { value: time.seconds, label: "Сек", bg: tileColors[3] },
  ];

  return (
    <article className="rounded-2xl bg-white px-3 py-4 shadow-[0_18px_40px_-12px_rgba(29,36,45,0.28)] ring-1 ring-black/[0.04] sm:rounded-[1.75rem] sm:px-6 sm:py-7">
      <div className="mb-4 flex items-center gap-3 sm:mb-5">
        <EggIcon fill={eggFill} pattern={eggPattern} className="egg-wobble h-10 w-7 shrink-0 sm:h-12 sm:w-9" />
        <div>
          <h3 className="font-display text-base font-bold tracking-tight sm:text-lg">{title}</h3>
          <p className="mt-0.5 text-xs font-semibold text-[var(--metma-rose)] sm:text-sm">{formatDate(target)}</p>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
        {units.map((unit) => (
          <div key={unit.label} className="rounded-xl px-0.5 py-2.5 text-center shadow-[0_8px_16px_-8px_rgba(29,36,45,0.35)] sm:rounded-2xl sm:px-1 sm:py-3" style={{ background: unit.bg }}>
            <p className="font-display text-lg font-bold tabular-nums sm:text-2xl">
              <span key={unit.value} className="egg-num inline-block">
                {pad(unit.value)}
              </span>
            </p>
            <p className="mt-0.5 text-[0.58rem] font-bold uppercase tracking-normal text-[var(--metma-ink)]/55 sm:mt-1 sm:text-[0.6rem] sm:tracking-[0.12em]">
              {unit.label}
            </p>
          </div>
        ))}
      </div>
    </article>
  );
}

const ticker = ["Остава до Великден", "Цветни яйца!", "Перла · Брилянт · Кристал", "С нашата боя стават чудеса", "От 1992"];

export function EasterCountdown() {
  const catholic = useMemo(() => nextOccurrence(getEasterSunday), []);
  const orthodox = useMemo(() => nextOccurrence(getOrthodoxEaster), []);
  const items = [...ticker, ...ticker];

  return (
    <section aria-label="Обратно броене до Великден" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 z-[2] hidden overflow-hidden md:block">
        <EggIcon fill="var(--metma-rose)" pattern="stripes" className="egg-float absolute left-[4%] top-[30%] h-10 w-7 opacity-30" />
        <BunnyIcon fill="var(--metma-blue)" className="egg-float-delay absolute right-[5%] bottom-[12%] h-12 w-11 opacity-35" />
        <EggIcon fill="var(--metma-blue-soft)" pattern="zigzag" className="egg-float absolute left-1/2 top-[8%] hidden h-8 w-6 -translate-x-1/2 opacity-80 lg:block" />
      </div>
      <div className="relative z-[1] overflow-hidden bg-[var(--metma-rose)]">
        <div className="marquee py-3 text-xs font-bold uppercase tracking-[0.16em] text-white md:text-sm">
          {items.map((item, index) => (
            <span key={`${item}-${index}`} className="inline-flex items-center gap-3 whitespace-nowrap">
              {item}
              {index % 2 === 0 ? (
                <EggIcon fill="white" pattern={index % 3 === 0 ? "dots" : index % 3 === 1 ? "stripes" : "zigzag"} className="h-5 w-4" />
              ) : (
                <BunnyIcon fill="var(--metma-blue-soft)" className="h-5 w-[1.15rem]" />
              )}
            </span>
          ))}
        </div>
      </div>
      <div className="relative z-[1] overflow-hidden bg-[#fff7ee] py-8 sm:py-12 md:py-14">
        <EggIcon fill="#f2c31a" pattern="stripes" className="pointer-events-none absolute -left-3 top-8 hidden h-16 w-12 rotate-[-16deg] opacity-70 sm:block" />
        <EggIcon fill="#3dae4a" pattern="dots" className="pointer-events-none absolute -right-1 bottom-6 hidden h-16 w-12 rotate-[10deg] opacity-60 sm:block" />
        <div className="container-metma relative">
          <div className="mb-6 text-center sm:mb-8">
            <div className="mb-2.5 flex items-center justify-center gap-2 sm:mb-3">
              <EggIcon fill="#e23b3b" pattern="dots" className="h-6 w-4 sm:h-7 sm:w-5" />
              <EggIcon fill="#f2c31a" pattern="stripes" className="h-6 w-4 sm:h-7 sm:w-5" />
              <EggIcon fill="#3dae4a" pattern="zigzag" className="h-6 w-4 sm:h-7 sm:w-5" />
            </div>
            <p className="eyebrow text-[var(--metma-rose)]">Честит Великден</p>
            <h2 className="mt-2 font-display text-[clamp(1.55rem,6vw,2.5rem)] font-bold tracking-tight">Колко дни остават до борбата с яйца?</h2>
          </div>
          <div className="grid gap-3 sm:gap-4 md:grid-cols-2 md:gap-5">
            <CountdownCard title="Католически" target={catholic} eggFill="#e23b3b" eggPattern="dots" tileColors={["#f8d0d0", "#ffe0bf", "#fff0b3", "#d7f3dc"]} />
            <CountdownCard title="Православен" target={orthodox} eggFill="#7a4bb8" eggPattern="stripes" tileColors={["#d5e4fb", "#e6d6f6", "#f8d4e6", "#d4f1fb"]} />
          </div>
        </div>
      </div>
    </section>
  );
}
