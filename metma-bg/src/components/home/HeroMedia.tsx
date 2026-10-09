"use client";

import { useEffect, useState } from "react";

const frame =
  "absolute inset-0 h-full w-full object-cover object-[84%_top] md:static md:inset-auto md:block md:aspect-[1600/870] md:h-auto md:w-full md:object-fill";

export function HeroMedia() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  if (reduced) {
    return <img src="/videos/egg-dye-explosion.jpg" alt="" className={frame} />;
  }

  return (
    <video className={frame} autoPlay muted loop playsInline poster="/videos/egg-dye-explosion.jpg" aria-hidden>
      <source src="/videos/egg-dye-explosion.mp4" type="video/mp4" />
    </video>
  );
}
