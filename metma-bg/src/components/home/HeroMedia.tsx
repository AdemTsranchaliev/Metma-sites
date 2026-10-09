"use client";

import { useEffect, useState } from "react";

const frame =
  "absolute inset-0 h-full w-full origin-center object-cover object-[86%_58%] max-md:translate-x-[8%] max-md:-translate-y-[8%] max-md:scale-[1.2] md:translate-x-0 md:translate-y-0 md:scale-100 md:object-[68%_46%]";

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
