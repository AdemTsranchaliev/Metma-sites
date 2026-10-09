"use client";

import { useEffect, useState } from "react";
import {
  DEFAULT_HERO_FRAME,
  fetchHeroFrame,
  heroMediaStyle,
  type HeroFrame,
} from "@/lib/hero-frame";

const mediaClass = "absolute inset-0 h-full w-full transition-opacity duration-500";
const CACHE_KEY = "metma-hero-frame";
// Show the default frame if the saved one has not arrived by then.
const FETCH_TIMEOUT_MS = 1500;

function readCachedFrame(): HeroFrame | null {
  try {
    const raw = window.localStorage.getItem(CACHE_KEY);
    return raw ? (JSON.parse(raw) as HeroFrame) : null;
  } catch {
    return null;
  }
}

function writeCachedFrame(frame: HeroFrame) {
  try {
    window.localStorage.setItem(CACHE_KEY, JSON.stringify(frame));
  } catch {
    // Storage can be blocked; the frame still comes from Firestore next time.
  }
}

export function HeroMedia() {
  const [reduced, setReduced] = useState(false);
  const [phone, setPhone] = useState<boolean | null>(null);
  // Stay hidden until the real frame is known, so the picture never jumps.
  const [frame, setFrame] = useState<HeroFrame | null>(null);

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
    const showCached = () => {
      const cached = readCachedFrame();
      if (cached) setFrame(cached);
    };
    showCached();
    const fallback = window.setTimeout(() => {
      if (!cancelled) setFrame((current) => current ?? DEFAULT_HERO_FRAME);
    }, FETCH_TIMEOUT_MS);
    fetchHeroFrame().then((next) => {
      window.clearTimeout(fallback);
      writeCachedFrame(next);
      if (!cancelled) setFrame(next);
    });
    return () => {
      cancelled = true;
      window.clearTimeout(fallback);
    };
  }, []);

  const ready = phone !== null && frame !== null;
  const shown = frame ?? DEFAULT_HERO_FRAME;
  const style = {
    ...heroMediaStyle(phone ? shown.phone : shown.desktop),
    opacity: ready ? 1 : 0,
  };

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
