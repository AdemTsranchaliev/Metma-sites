"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    image: "/images/hero-1.jpg",
    title: "OSTEREI FÄRBUNGEN",
    subtitle: "MIT UNSEREN OSTEREIERFARBEN KÖNNEN SIE WUNDER VOLLBRINGEN",
    description:
      "Sets für Dekoration, Werbedisplays, Dekorationen, Kristall Farbe, Gelee Farbe und vieles mehr",
    overlay: true,
  },
  {
    id: 2,
    image: "/images/hero-2.png",
    title: "OSTEREI FÄRBUNGEN",
    subtitle: "MIT UNSEREN OSTEREIERFARBEN KÖNNEN SIE WUNDER VOLLBRINGEN",
    description:
      "Sets für Dekoration, Werbedisplays, Dekorationen, Kristall Farbe, Gelee Farbe und vieles mehr",
    overlay: false,
  },
  {
    id: 3,
    image: "/images/hero-slide-2.jpg",
    title: "OSTEREI FÄRBUNGEN",
    subtitle: "MIT UNSEREN OSTEREIERFARBEN KÖNNEN SIE WUNDER VOLLBRINGEN",
    description:
      "Sets für Dekoration, Werbedisplays, Dekorationen, Kristall Farbe, Gelee Farbe und vieles mehr",
    overlay: true,
  },
];

export function Hero() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [paused, index]);

  const slide = slides[index];

  return (
    <section
      className="relative overflow-hidden bg-[#2f5f9a]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative min-h-[380px] md:min-h-[480px] lg:min-h-[520px]">
        {slides.map((item, i) => (
          <div
            key={item.id}
            className={`hero-slide ${i === index ? "is-active" : ""}`}
            aria-hidden={i !== index}
          >
            <Image
              src={item.image}
              alt=""
              fill
              priority={i === 0}
              className={`object-cover object-center ${
                i === index ? "hero-kenburns" : ""
              }`}
              sizes="100vw"
            />
            {item.overlay && (
              <div className="absolute inset-0 bg-gradient-to-r from-[#1e4d86]/80 via-[#2f6db0]/40 to-transparent" />
            )}
          </div>
        ))}

        <div className="container-metma relative z-10 flex min-h-[380px] items-center py-14 md:min-h-[480px] lg:min-h-[520px]">
          <div key={slide.id} className="hero-copy max-w-xl text-white">
            <p className="mb-3 text-xs font-medium uppercase tracking-[0.28em] text-white/80">
              METMA · Seit 1999
            </p>
            <h1 className="text-3xl font-bold uppercase leading-[1.1] tracking-wide md:text-5xl lg:text-[52px]">
              {slide.title}
            </h1>
            <p className="mt-4 text-base font-semibold uppercase leading-snug text-white/95 md:text-xl">
              {slide.subtitle}
            </p>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/90 md:text-base">
              {slide.description}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/produkte" className="btn-metma">
                Produkte entdecken
              </Link>
              <Link
                href="/kontakt"
                className="inline-flex items-center justify-center border border-white/70 px-5 py-3 text-sm font-medium uppercase tracking-wide text-white transition duration-300 hover:bg-white hover:text-[var(--metma-blue)]"
              >
                Kontakt
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {slides.map((s, i) => (
          <button
            key={s.id}
            type="button"
            aria-label={`Slide ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-2.5 rounded-full border border-white/80 transition-all duration-500 ${
              i === index ? "w-8 bg-white" : "w-2.5 bg-transparent hover:bg-white/40"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
