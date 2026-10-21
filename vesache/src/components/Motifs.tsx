export function EggIcon({
  fill = "var(--metma-rose)",
  pattern = "dots",
  className = "",
}: {
  fill?: string;
  pattern?: "dots" | "stripes" | "zigzag";
  className?: string;
}) {
  return (
    <svg viewBox="0 0 48 64" className={className} fill="none" aria-hidden>
      <ellipse cx="24" cy="34" rx="18" ry="24" fill={fill} />
      {pattern === "dots" && (
        <>
          <circle cx="18" cy="26" r="2.2" fill="white" opacity="0.85" />
          <circle cx="28" cy="22" r="1.8" fill="white" opacity="0.75" />
          <circle cx="24" cy="34" r="2.4" fill="white" opacity="0.8" />
          <circle cx="16" cy="40" r="1.6" fill="white" opacity="0.7" />
          <circle cx="31" cy="42" r="2" fill="white" opacity="0.8" />
        </>
      )}
      {pattern === "stripes" && (
        <path d="M10 28h28M9 36h30M11 44h26" stroke="white" strokeWidth="2.4" strokeLinecap="round" opacity="0.75" />
      )}
      {pattern === "zigzag" && (
        <path
          d="M12 30l6-4 6 4 6-4 6 4M12 40l6-4 6 4 6-4 6 4"
          stroke="white"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity="0.8"
        />
      )}
    </svg>
  );
}

export function BunnyIcon({ fill = "var(--metma-blue-soft)", className = "" }: { fill?: string; className?: string }) {
  return (
    <svg viewBox="0 0 64 72" className={className} fill="none" aria-hidden>
      <ellipse cx="22" cy="18" rx="7" ry="16" fill={fill} />
      <ellipse cx="42" cy="18" rx="7" ry="16" fill={fill} />
      <ellipse cx="22" cy="18" rx="3.2" ry="10" fill="white" opacity="0.55" />
      <ellipse cx="42" cy="18" rx="3.2" ry="10" fill="white" opacity="0.55" />
      <ellipse cx="32" cy="42" rx="18" ry="20" fill={fill} />
      <circle cx="25" cy="40" r="2.2" fill="var(--metma-ink)" opacity="0.55" />
      <circle cx="39" cy="40" r="2.2" fill="var(--metma-ink)" opacity="0.55" />
      <ellipse cx="32" cy="48" rx="4" ry="3" fill="white" opacity="0.7" />
      <path d="M28 52c1.5 1.4 3 2 4 2s2.5-.6 4-2" stroke="var(--metma-ink)" strokeWidth="1.4" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}
