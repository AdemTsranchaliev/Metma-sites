"use client";

import { useEffect, useState } from "react";

const frame =
  "absolute inset-0 h-full w-full origin-[0%_58%] object-cover object-[100%_top] max-md:-translate-y-[3%] max-md:scale-[1.28] md:static md:inset-auto md:block md:aspect-[1600/870] md:h-auto md:w-full md:origin-center md:translate-y-0 md:scale-100 md:object-fill";

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
