"use client";

import { useState } from "react";
import { EggIcon } from "@/components/easter/EasterMotifs";

const palette = [
  { id: "red", name: "червено", color: "#e10600", pattern: "dots" },
  { id: "orange", name: "оранжево", color: "#ff7a00", pattern: "stripes" },
  { id: "yellow", name: "жълто", color: "#ffe100", pattern: "zigzag" },
  { id: "green", name: "зелено", color: "#22a84a", pattern: "dots" },
  { id: "blue", name: "синьо", color: "#0072ef", pattern: "stripes" },
  { id: "lilac", name: "лилаво", color: "#7a2fbe", pattern: "zigzag" },
  { id: "pink", name: "розово", color: "#ff4d88", pattern: "dots" },
] as const;

function otherEgg(avoid?: string) {
  const pool = palette.filter((item) => item.id !== avoid);
  return pool[Math.floor(Math.random() * pool.length)] ?? palette[0];
}

function Crack() {
  return (
    <svg viewBox="0 0 48 64" className="egg-crack pointer-events-none absolute inset-0 h-full w-full" aria-hidden>
      <path d="M24 9l2.2 6.2-3.4 3.4 4.2 5.2-2.6 4.2 3.4 6.4-2 5.2 2.4 7.2-1.6 6.2-2.2-5.4 1.2-6.2-2.6-5.6 2-4.4-3.2-4.6 2.4-3.6-1.8-5.4z" fill="#24160f" />
      <path d="M24.6 10.2l1.5 5.2-2.2 2.6 2.8 4.2" fill="none" stroke="#fff6ea" strokeWidth="1.1" strokeLinecap="round" />
      <path d="M20 16l5 3 2 7-4 3" fill="#f3e2c8" />
      <path d="M27 28l4 2 1 6-5 2" fill="#efe0c4" />
    </svg>
  );
}

function ShellCap() {
  return <span className="egg-break-cap" aria-hidden />;
}

export function EggKnock({ painted, onNewEgg }: { painted: string; onNewEgg: () => void }) {
  const [foe, setFoe] = useState(() => otherEgg());
  const [phase, setPhase] = useState<"ready" | "knock" | "result">("ready");
  const [youWin, setYouWin] = useState(false);
  const knocking = phase === "knock";
  const yourBreaks = phase !== "ready" && !youWin;
  const foeBreaks = phase !== "ready" && youWin;

  function knock() {
    if (knocking) return;
    setYouWin(Math.random() < 0.5);
    setPhase("knock");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => setPhase("result"), reduced ? 160 : 1400);
  }

  function again() {
    setFoe(otherEgg(foe.id));
    setPhase("ready");
  }

  return (
    <div id="egg-knock" className="container-metma mt-4 border-t border-black/10 pt-4 sm:mt-8 sm:pt-8">
      <div className="grid items-center gap-4 md:grid-cols-2 md:gap-8">
        <div className="flex flex-col items-center">
          <div className={`egg-arena relative flex h-44 w-full max-w-[300px] items-end justify-center gap-1 sm:h-56 sm:max-w-[360px] ${knocking ? "is-live" : ""}`}>
            <div aria-hidden className="absolute inset-x-10 bottom-1 h-3 rounded-[100%] bg-[var(--metma-ink)]/10" />
            <span className={`egg-tap-spark ${knocking ? "is-on" : ""}`} />
            <span className={`egg-tap-ring ${knocking ? "is-on" : ""}`} />
            {phase === "result" && youWin ? (
              <span className="egg-win-burst" aria-hidden>
                <i /><i /><i /><i /><i /><i /><i /><i />
              </span>
            ) : null}
            <div className={`egg-tap-left relative z-[1] flex h-24 w-16 items-end justify-center sm:h-32 sm:w-24 ${knocking ? "is-knocking" : ""} ${yourBreaks && knocking ? "is-loser" : ""} ${yourBreaks && !knocking ? "egg-tap-cracked" : ""}`}>
              <img src={painted} alt="" className="max-h-full max-w-full object-contain" />
              {yourBreaks ? <Crack /> : null}
              {yourBreaks ? <ShellCap /> : null}
              {yourBreaks ? (
                <>
                  <span className="egg-shell-chip" />
                  <span className="egg-shell-chip egg-chip-b" />
                  <span className="egg-shell-chip egg-chip-c" />
                </>
              ) : null}
            </div>
            <div className={`egg-tap-right relative z-[1] ${knocking ? "is-knocking" : ""} ${foeBreaks && knocking ? "is-loser" : ""} ${foeBreaks && !knocking ? "egg-tap-cracked" : ""}`}>
              <EggIcon fill={foe.color} pattern={foe.pattern} className="h-24 w-16 sm:h-32 sm:w-24" />
              {foeBreaks ? <Crack /> : null}
              {foeBreaks ? <ShellCap /> : null}
              {foeBreaks ? (
                <>
                  <span className="egg-shell-chip" />
                  <span className="egg-shell-chip egg-chip-b" />
                  <span className="egg-shell-chip egg-chip-c" />
                </>
              ) : null}
            </div>
          </div>
          <p className={`mt-4 text-center font-semibold text-[var(--metma-ink)] ${phase === "result" && youWin ? "egg-win-title" : "text-sm"}`}>
            {phase === "result" ? (youWin ? "Ти победи!" : "Ти беше победен.") : `Твоето яйце срещу ${foe.name}`}
          </p>
          {phase === "result" ? <p className="text-center text-sm text-[var(--metma-mute)]">Опитай отново.</p> : null}
          {phase === "result" ? (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              <button type="button" onClick={again} className="btn-metma">
                Опитай отново
              </button>
              <button type="button" onClick={onNewEgg} className="min-h-11 bg-[var(--metma-sand)] px-4 text-sm font-semibold text-[var(--metma-ink)]">
                Ново яйце
              </button>
            </div>
          ) : (
            <button type="button" onClick={knock} disabled={knocking} className="btn-metma mt-4 disabled:opacity-50">
              Чукни
            </button>
          )}
        </div>
        <div>
          <p className="eyebrow text-[var(--metma-rose)]">Чукане</p>
          <h3 className="mt-2 font-display text-2xl font-bold text-[var(--metma-ink)]">Чукна се</h3>
          <p className="mt-2 hidden max-w-md text-sm leading-6 text-[var(--metma-mute)] sm:mt-3 sm:block">
            Твоето боядисано яйце срещу друго. Ако се счупи, опитай с нов противник или си направи ново яйце.
          </p>
        </div>
      </div>
    </div>
  );
}
