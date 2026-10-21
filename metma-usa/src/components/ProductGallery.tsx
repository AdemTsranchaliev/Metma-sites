"use client";

import { useState } from "react";

function shotLabel(index: number, total: number) {
  if (total === 2 && index === 0) return "Front";
  if (total === 2 && index === 1) return "Back";
  return `View ${index + 1}`;
}

export function ProductGallery({
  images,
  name,
  background,
}: {
  images: string[];
  name: string;
  background: string;
}) {
  const [active, setActive] = useState(0);
  const safe = images.filter(Boolean);
  const current = safe[active] ?? safe[0];
  if (!current) return null;

  return (
    <div>
      <div
        className="relative overflow-hidden rounded-[1.6rem] shadow-[0_18px_40px_-28px_rgba(12,35,64,0.55)] ring-1 ring-black/5"
        style={{ background }}
      >
        <img src={current} alt={name} className="aspect-square w-full object-contain p-6 sm:p-10" />
        {safe.length > 1 ? (
          <p className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-[0.68rem] font-bold tracking-[0.14em] text-[var(--usa-navy)] uppercase">
            {shotLabel(active, safe.length)}
          </p>
        ) : null}
      </div>
      {safe.length > 1 ? (
        <div className="mt-3 flex gap-3">
          {safe.map((src, index) => {
            const on = index === active;
            return (
              <button
                key={src}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`Show ${shotLabel(index, safe.length).toLowerCase()} of ${name}`}
                aria-pressed={on}
                className={`overflow-hidden rounded-2xl p-1 transition ${
                  on ? "ring-2 ring-[var(--usa-navy)]" : "ring-1 ring-black/10 hover:ring-[var(--usa-navy)]/40"
                }`}
                style={{ background }}
              >
                <img src={src} alt="" className="h-16 w-16 object-contain sm:h-20 sm:w-20" />
                <span className="block pb-1 text-center text-[0.65rem] font-bold tracking-[0.12em] text-[var(--usa-navy)] uppercase">
                  {shotLabel(index, safe.length)}
                </span>
              </button>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}
