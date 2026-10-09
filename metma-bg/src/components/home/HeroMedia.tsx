"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_HERO_FRAME,
  fetchHeroFrame,
  heroMediaStyle,
  type HeroFrame,
} from "@/lib/hero-frame";

const mediaClass = "absolute inset-0 h-full w-full";

export function HeroMedia() {
  const [reduced, setReduced] = useState(false);
  const [phone, setPhone] = useState(false);
  const [frame, setFrame] = useState<HeroFrame>(DEFAULT_HERO_FRAME);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setPhone(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    let cancelled = false;
    fetchHeroFrame().then((next) => {
      if (!cancelled) setFrame(next);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  const style = heroMediaStyle(phone ? frame.phone : frame.desktop);

  if (reduced) {
    return <img src="/videos/egg-dye-explosion.jpg" alt="" className={mediaClass} style={style} />;
  }

  return (
    <video
      className={mediaClass}
      style={style}
      autoPlay
      muted
      loop
      playsInline
      poster="/videos/egg-dye-explosion.jpg"
      aria-hidden
    >
      <source src="/videos/egg-dye-explosion.mp4" type="video/mp4" />
    </video>
  );
}
