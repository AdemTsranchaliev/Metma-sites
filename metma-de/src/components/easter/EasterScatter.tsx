import { BunnyIcon, EggIcon } from "@/components/easter/EasterMotifs";

type Motif =
  | {
      id: string;
      type: "egg";
      fill: string;
      pattern: "dots" | "stripes" | "zigzag";
      className: string;
    }
  | {
      id: string;
      type: "bunny";
      fill: string;
      className: string;
    };

const presets = {
  hero: [
    {
      id: "h-egg-1",
      type: "egg",
      fill: "var(--metma-peach)",
      pattern: "dots",
      className:
        "egg-float right-[6%] top-[18%] h-10 w-7 opacity-50 sm:h-12 sm:w-9 sm:opacity-60",
    },
    {
      id: "h-bunny-1",
      type: "bunny",
      fill: "var(--metma-lilac)",
      className:
        "egg-float-delay left-[8%] bottom-[14%] h-12 w-11 opacity-45 sm:h-14 sm:w-12 sm:opacity-55 md:left-[12%]",
    },
    {
      id: "h-egg-2",
      type: "egg",
      fill: "#f2c94c",
      pattern: "zigzag",
      className:
        "egg-float right-[18%] bottom-[20%] hidden h-9 w-7 rotate-[12deg] opacity-45 md:block",
    },
  ],
  story: [
    {
      id: "s-bunny-1",
      type: "bunny",
      fill: "var(--metma-mint)",
      className:
        "egg-float right-[3%] top-[12%] h-11 w-10 opacity-40 sm:right-[5%] sm:opacity-50",
    },
    {
      id: "s-egg-1",
      type: "egg",
      fill: "var(--metma-rose)",
      pattern: "stripes",
      className:
        "egg-float-delay left-[2%] bottom-[18%] h-10 w-7 rotate-[-10deg] opacity-40 sm:left-[4%] sm:opacity-50",
    },
    {
      id: "s-egg-2",
      type: "egg",
      fill: "var(--metma-blue)",
      pattern: "dots",
      className:
        "egg-float right-[12%] bottom-[8%] hidden h-8 w-6 opacity-40 lg:block",
    },
  ],
  products: [
    {
      id: "p-egg-1",
      type: "egg",
      fill: "#7bc47f",
      pattern: "zigzag",
      className:
        "egg-float left-[2%] top-[8%] h-9 w-7 opacity-40 sm:left-[3%] sm:top-[6%] sm:h-11 sm:w-8 sm:opacity-50",
    },
    {
      id: "p-bunny-1",
      type: "bunny",
      fill: "var(--metma-peach)",
      className:
        "egg-float-delay right-[2%] top-[40%] h-12 w-11 opacity-35 sm:right-[4%] sm:opacity-45",
    },
    {
      id: "p-egg-2",
      type: "egg",
      fill: "var(--metma-lilac)",
      pattern: "dots",
      className:
        "egg-float left-[5%] bottom-[10%] hidden h-9 w-7 rotate-[8deg] opacity-40 md:block",
    },
    {
      id: "p-bunny-2",
      type: "bunny",
      fill: "#f2c94c",
      className:
        "egg-float-delay right-[8%] bottom-[6%] hidden h-10 w-9 opacity-35 xl:block",
    },
  ],
  knock: [
    {
      id: "k-bunny-1",
      type: "bunny",
      fill: "var(--metma-blue)",
      className:
        "egg-float left-[6%] top-[20%] h-10 w-9 opacity-40 sm:left-[10%] sm:opacity-50",
    },
    {
      id: "k-egg-1",
      type: "egg",
      fill: "var(--metma-rose)",
      pattern: "dots",
      className:
        "egg-float-delay right-[8%] top-[24%] h-9 w-7 opacity-40 sm:right-[12%] sm:opacity-50",
    },
  ],
  countdown: [
    {
      id: "c-egg-1",
      type: "egg",
      fill: "var(--metma-navy)",
      pattern: "stripes",
      className:
        "egg-float left-[4%] top-[30%] h-10 w-7 opacity-35 sm:opacity-45",
    },
    {
      id: "c-bunny-1",
      type: "bunny",
      fill: "var(--metma-rose)",
      className:
        "egg-float-delay right-[5%] bottom-[12%] h-12 w-11 opacity-40 sm:opacity-50",
    },
    {
      id: "c-egg-2",
      type: "egg",
      fill: "var(--metma-peach)",
      pattern: "zigzag",
      className:
        "egg-float left-[48%] top-[8%] hidden h-8 w-6 -translate-x-1/2 opacity-35 lg:block",
    },
  ],
  journal: [
    {
      id: "j-bunny-1",
      type: "bunny",
      fill: "var(--metma-lilac)",
      className:
        "egg-float right-[3%] top-[10%] h-11 w-10 opacity-40 sm:right-[6%] sm:opacity-50",
    },
    {
      id: "j-egg-1",
      type: "egg",
      fill: "#f2c94c",
      pattern: "dots",
      className:
        "egg-float-delay left-[4%] bottom-[14%] h-10 w-7 rotate-[-6deg] opacity-40 sm:left-[8%] sm:opacity-50",
    },
  ],
  contact: [
    {
      id: "ct-egg-1",
      type: "egg",
      fill: "var(--metma-blue)",
      pattern: "stripes",
      className:
        "egg-float right-[5%] top-[16%] h-11 w-8 opacity-45 sm:right-[8%] sm:opacity-55",
    },
    {
      id: "ct-bunny-1",
      type: "bunny",
      fill: "var(--metma-mint)",
      className:
        "egg-float-delay left-[4%] bottom-[10%] h-12 w-11 opacity-40 sm:left-[7%] sm:opacity-50",
    },
    {
      id: "ct-egg-2",
      type: "egg",
      fill: "var(--metma-rose)",
      pattern: "zigzag",
      className:
        "egg-float right-[20%] bottom-[18%] hidden h-9 w-7 rotate-[10deg] opacity-40 md:block",
    },
  ],
  /** Light accents for inner pages (produkte, blog, …) */
  page: [
    {
      id: "pg-egg-1",
      type: "egg",
      fill: "var(--metma-rose)",
      pattern: "dots",
      className:
        "egg-float left-[2%] top-[24%] h-10 w-7 opacity-35 sm:opacity-45",
    },
    {
      id: "pg-bunny-1",
      type: "bunny",
      fill: "var(--metma-lilac)",
      className:
        "egg-float-delay right-[2%] top-[42%] h-11 w-10 opacity-30 sm:opacity-40",
    },
    {
      id: "pg-egg-2",
      type: "egg",
      fill: "#7bc47f",
      pattern: "stripes",
      className:
        "egg-float left-[3%] top-[68%] h-9 w-7 rotate-[-8deg] opacity-30 sm:opacity-40",
    },
    {
      id: "pg-bunny-2",
      type: "bunny",
      fill: "#f2c94c",
      className:
        "egg-float-delay right-[4%] top-[78%] h-10 w-9 opacity-30 sm:opacity-40",
    },
  ],
} as const satisfies Record<string, Motif[]>;

export type ScatterPreset = keyof typeof presets;

/** Decorative eggs & bunnies — place inside a `relative overflow-hidden` section */
export function SectionScatter({
  variant,
  className = "",
}: {
  variant: ScatterPreset;
  className?: string;
}) {
  const motifs = presets[variant];

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 z-[2] overflow-hidden ${className}`}
    >
      {motifs.map((m) =>
        m.type === "egg" ? (
          <EggIcon
            key={m.id}
            fill={m.fill}
            pattern={m.pattern}
            className={`absolute drop-shadow-sm ${m.className}`}
          />
        ) : (
          <BunnyIcon
            key={m.id}
            fill={m.fill}
            className={`absolute drop-shadow-sm ${m.className}`}
          />
        ),
      )}
    </div>
  );
}

/** Fixed light scatter for non-home pages */
export function EasterScatter() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[25] overflow-hidden"
    >
      {presets.page.map((m) =>
        m.type === "egg" ? (
          <EggIcon
            key={m.id}
            fill={m.fill}
            pattern={m.pattern}
            className={`absolute drop-shadow-sm ${m.className}`}
          />
        ) : (
          <BunnyIcon
            key={m.id}
            fill={m.fill}
            className={`absolute drop-shadow-sm ${m.className}`}
          />
        ),
      )}
    </div>
  );
}
