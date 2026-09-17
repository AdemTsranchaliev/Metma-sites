import { BunnyIcon, EggIcon } from "@/components/easter/EasterMotifs";

const motifs = [
  {
    id: "egg-tl",
    type: "egg" as const,
    fill: "var(--metma-rose)",
    pattern: "dots" as const,
    className:
      "egg-float left-[2%] top-[18%] h-10 w-7 opacity-[0.18] sm:h-12 sm:w-9 sm:opacity-[0.22] md:left-[4%] md:top-[22%]",
  },
  {
    id: "bunny-tr",
    type: "bunny" as const,
    fill: "var(--metma-lilac)",
    className:
      "egg-float-delay right-[3%] top-[28%] h-11 w-10 opacity-[0.16] sm:h-14 sm:w-12 sm:opacity-[0.2] md:right-[5%] md:top-[20%]",
  },
  {
    id: "egg-ml",
    type: "egg" as const,
    fill: "var(--metma-blue)",
    pattern: "stripes" as const,
    className:
      "egg-float hidden left-[1%] top-[48%] h-9 w-7 rotate-[-12deg] opacity-[0.15] md:block md:opacity-[0.2]",
  },
  {
    id: "bunny-mr",
    type: "bunny" as const,
    fill: "#f2c94c",
    className:
      "egg-float hidden right-[2%] top-[52%] h-12 w-11 rotate-[8deg] opacity-[0.14] lg:block lg:opacity-[0.18]",
  },
  {
    id: "egg-bl",
    type: "egg" as const,
    fill: "#7bc47f",
    pattern: "zigzag" as const,
    className:
      "egg-float-delay left-[6%] top-[72%] h-8 w-6 opacity-[0.14] sm:h-10 sm:w-7 sm:opacity-[0.18]",
  },
  {
    id: "egg-br",
    type: "egg" as const,
    fill: "var(--metma-peach)",
    pattern: "dots" as const,
    className:
      "egg-float right-[4%] top-[78%] h-9 w-7 rotate-[14deg] opacity-[0.16] sm:opacity-[0.2]",
  },
  {
    id: "bunny-bc",
    type: "bunny" as const,
    fill: "var(--metma-mint)",
    className:
      "egg-float-delay hidden left-[48%] top-[88%] h-10 w-9 -translate-x-1/2 opacity-[0.12] xl:block",
  },
];

/** Soft site-wide Easter scatter — decorative only */
export function EasterScatter() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] overflow-hidden"
    >
      {motifs.map((m) =>
        m.type === "egg" ? (
          <EggIcon
            key={m.id}
            fill={m.fill}
            pattern={m.pattern}
            className={`absolute ${m.className}`}
          />
        ) : (
          <BunnyIcon
            key={m.id}
            fill={m.fill}
            className={`absolute ${m.className}`}
          />
        ),
      )}
    </div>
  );
}
