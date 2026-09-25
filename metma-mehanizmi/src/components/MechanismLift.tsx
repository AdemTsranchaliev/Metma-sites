export function MechanismLift() {
  return (
    <figure className="rounded-[1.25rem] border border-line bg-foam px-3 py-4">
      <svg
        viewBox="-16 -40 592 436"
        className="h-auto w-full"
        role="img"
        aria-label="Механизъм за повдигане на матрак, който се отваря и се затваря"
      >
        <rect x="64" y="252" width="432" height="92" rx="18" fill="#fff" stroke="#e6e3de" />
        <line x1="96" y1="292" x2="464" y2="292" stroke="#e6e3de" />
        <g className="lift-strut">
          <line
            x1="230"
            y1="312"
            x2="230"
            y2="228"
            stroke="#8a8681"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <line
            x1="230"
            y1="312"
            x2="230"
            y2="228"
            stroke="#e7e3de"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </g>
        <circle cx="230" cy="312" r="7" fill="#2a2826" />
        <g className="lift-lid">
          <rect x="132" y="186" width="292" height="46" rx="12" fill="#fff" stroke="#e6e3de" />
          <path d="M156 202h36M156 216h22" stroke="#e6e3de" strokeWidth="3" strokeLinecap="round" />
          <rect x="120" y="228" width="320" height="20" rx="6" fill="#2a2826" />
          <circle cx="156" cy="238" r="3.5" fill="#5c5854" />
          <circle cx="404" cy="238" r="3.5" fill="#5c5854" />
          <circle cx="268" cy="238" r="6" fill="#2a2826" />
        </g>
        <circle cx="128" cy="248" r="9" fill="#e10600" />
        <circle cx="128" cy="248" r="3.5" fill="#fff" />
      </svg>
      <figcaption className="mt-1 text-center text-xs text-muted">
        Повдигане · 45°
      </figcaption>
    </figure>
  );
}
