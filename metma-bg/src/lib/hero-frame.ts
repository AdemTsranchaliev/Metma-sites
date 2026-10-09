import type { CSSProperties } from "react";
import { doc, getDoc } from "firebase/firestore";
import { getDb, isFirebaseConfigured } from "./firebase/client";

export type HeroSide = {
  x: number;
  y: number;
  zoom: number;
};

export type HeroFrame = {
  desktop: HeroSide;
  phone: HeroSide;
};

export const DEFAULT_HERO_FRAME: HeroFrame = {
  desktop: { x: 50, y: 50, zoom: 1 },
  phone: { x: 100, y: 50, zoom: 1 },
};

function clamp(value: unknown, fallback: number, min: number, max: number) {
  const n = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(n)) return fallback;
  return Math.min(max, Math.max(min, n));
}

function normalizeSide(value: Partial<HeroSide> | undefined, fallback: HeroSide): HeroSide {
  return {
    x: clamp(value?.x, fallback.x, 0, 100),
    y: clamp(value?.y, fallback.y, 0, 100),
    zoom: clamp(value?.zoom, fallback.zoom, 0.8, 2.2),
  };
}

export function heroMediaStyle(side: HeroSide): CSSProperties {
  const position = `${side.x}% ${side.y}%`;
  // The video usually fills the frame top to bottom, so object-position alone
  // cannot move it vertically. Shift it as well (up to a quarter of the frame).
  const shiftY = `translateY(${((50 - side.y) * 0.5).toFixed(2)}%)`;
  if (side.zoom < 0.999) {
    return {
      objectFit: "contain",
      objectPosition: position,
      transform: `${shiftY} scale(${side.zoom})`,
      transformOrigin: position,
    };
  }
  return {
    objectFit: "cover",
    objectPosition: position,
    transform: side.zoom > 1.001 ? `${shiftY} scale(${side.zoom})` : shiftY,
    transformOrigin: position,
  };
}

export async function fetchHeroFrame(): Promise<HeroFrame> {
  if (!isFirebaseConfigured) return DEFAULT_HERO_FRAME;
  try {
    const snap = await getDoc(doc(getDb(), "heroFrames", "Bg"));
    if (!snap.exists()) return DEFAULT_HERO_FRAME;
    const data = snap.data() as Partial<HeroFrame>;
    return {
      desktop: normalizeSide(data.desktop, DEFAULT_HERO_FRAME.desktop),
      phone: normalizeSide(data.phone, DEFAULT_HERO_FRAME.phone),
    };
  } catch {
    return DEFAULT_HERO_FRAME;
  }
}
