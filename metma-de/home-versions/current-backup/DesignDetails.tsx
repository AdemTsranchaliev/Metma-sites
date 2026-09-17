type WaveProps = {
  fill?: string;
  className?: string;
};

/** Wave pointing down — use at bottom of a section so next bg shows through */
export function WaveBottom({
  fill = "currentColor",
  className = "",
}: WaveProps) {
  return (
    <div className={`pointer-events-none leading-[0] ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-[52px] w-full md:h-[72px]"
        fill={fill}
      >
        <path d="M0,32 C180,72 360,8 540,36 C720,64 900,12 1080,40 C1260,68 1380,28 1440,44 L1440,80 L0,80 Z" />
      </svg>
    </div>
  );
}

/** Wave pointing up — use at top of a section */
export function WaveTop({
  fill = "currentColor",
  className = "",
}: WaveProps) {
  return (
    <div className={`pointer-events-none leading-[0] ${className}`} aria-hidden>
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        className="block h-[52px] w-full md:h-[72px]"
        fill={fill}
      >
        <path d="M0,48 C180,8 360,72 540,44 C720,16 900,68 1080,40 C1260,12 1380,52 1440,36 L1440,0 L0,0 Z" />
      </svg>
    </div>
  );
}

export function ScribbleUnderline({
  className = "",
  color = "var(--metma-orange)",
}: {
  className?: string;
  color?: string;
}) {
  return (
    <svg
      viewBox="0 0 220 18"
      className={`mx-auto mt-2 h-4 w-[180px] md:h-[18px] md:w-[220px] ${className}`}
      fill="none"
      aria-hidden
    >
      <path
        d="M4 9c28-6 56 6 84 1s52-8 80 2 36 4 48-1"
        stroke={color}
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <path
        d="M18 14c24-3 48 3 72 0s46-5 70 1 34 2 42-1"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.85"
      />
    </svg>
  );
}
