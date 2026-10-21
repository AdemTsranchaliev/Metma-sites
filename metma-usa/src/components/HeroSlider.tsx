"use client";

import { useEffect, useState } from "react";
import { banners } from "@/data/content";

export function HeroSlider() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIndex((current) => (current + 1) % banners.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, []);

  function go(next: number) {
    setIndex((next + banners.length) % banners.length);
  }

  return (
    <section className="relative bg-white" aria-roledescription="carousel">
      <div className="relative overflow-hidden">
        {banners.map((banner, bannerIndex) => (
          <img
            key={banner.src}
            src={banner.src}
            alt={banner.alt}
            width={1920}
            height={500}
            className={`block h-auto w-full ${bannerIndex === index ? "" : "hidden"}`}
          />
        ))}
        <button
          type="button"
          aria-label="Previous"
          onClick={() => go(index - 1)}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-4xl leading-none text-[#e02b20] md:left-6"
        >
          ‹
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={() => go(index + 1)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-4xl leading-none text-[#e02b20] md:right-6"
        >
          ›
        </button>
      </div>
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        {banners.map((banner, bannerIndex) => (
          <button
            key={banner.src}
            type="button"
            aria-label={`Slide ${bannerIndex + 1}`}
            onClick={() => setIndex(bannerIndex)}
            className={`h-2.5 w-2.5 rounded-full ${bannerIndex === index ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  );
}
