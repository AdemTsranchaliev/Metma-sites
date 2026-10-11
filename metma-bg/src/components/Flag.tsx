import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n";

// Inline SVG flags: emoji flags do not render on Windows.
const flags: Record<Locale, { viewBox: string; body: ReactNode }> = {
  bg: {
    viewBox: "0 0 3 3",
    body: (
      <>
        <rect width="3" height="1" fill="#fff" />
        <rect y="1" width="3" height="1" fill="#00966E" />
        <rect y="2" width="3" height="1" fill="#D62612" />
      </>
    ),
  },
  en: {
    viewBox: "0 0 60 30",
    body: (
      <>
        <rect width="60" height="30" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#C8102E" strokeWidth="2" />
        <path d="M30,0 V30 M0,15 H60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 V30 M0,15 H60" stroke="#C8102E" strokeWidth="6" />
      </>
    ),
  },
  ro: {
    viewBox: "0 0 3 3",
    body: (
      <>
        <rect width="1" height="3" fill="#002B7F" />
        <rect x="1" width="1" height="3" fill="#FCD116" />
        <rect x="2" width="1" height="3" fill="#CE1126" />
      </>
    ),
  },
  el: {
    viewBox: "0 0 27 18",
    body: (
      <>
        <rect width="27" height="18" fill="#0D5EAF" />
        <path d="M0,3 H27 M0,7 H27 M0,11 H27 M0,15 H27" stroke="#fff" strokeWidth="2" />
        <rect width="10" height="10" fill="#0D5EAF" />
        <path d="M5,0 V10 M0,5 H10" stroke="#fff" strokeWidth="2" />
      </>
    ),
  },
  lt: {
    viewBox: "0 0 3 3",
    body: (
      <>
        <rect width="3" height="1" fill="#FDB913" />
        <rect y="1" width="3" height="1" fill="#006A44" />
        <rect y="2" width="3" height="1" fill="#C1272D" />
      </>
    ),
  },
  lv: {
    viewBox: "0 0 5 5",
    body: (
      <>
        <rect width="5" height="5" fill="#9E3039" />
        <rect y="2" width="5" height="1" fill="#fff" />
      </>
    ),
  },
  et: {
    viewBox: "0 0 3 3",
    body: (
      <>
        <rect width="3" height="1" fill="#0072CE" />
        <rect y="1" width="3" height="1" fill="#000" />
        <rect y="2" width="3" height="1" fill="#fff" />
      </>
    ),
  },
  cs: {
    viewBox: "0 0 30 20",
    body: (
      <>
        <rect width="30" height="10" fill="#fff" />
        <rect y="10" width="30" height="10" fill="#D7141A" />
        <path d="M0,0 L15,10 L0,20 Z" fill="#11457E" />
      </>
    ),
  },
  pl: {
    viewBox: "0 0 2 2",
    body: (
      <>
        <rect width="2" height="1" fill="#fff" />
        <rect y="1" width="2" height="1" fill="#DC143C" />
      </>
    ),
  },
  it: {
    viewBox: "0 0 3 3",
    body: (
      <>
        <rect width="1" height="3" fill="#009246" />
        <rect x="1" width="1" height="3" fill="#fff" />
        <rect x="2" width="1" height="3" fill="#CE2B37" />
      </>
    ),
  },
};

export function Flag({ locale, className = "" }: { locale: Locale; className?: string }) {
  const flag = flags[locale];
  return (
    <svg
      aria-hidden
      focusable="false"
      viewBox={flag.viewBox}
      preserveAspectRatio="none"
      className={`inline-block h-3 w-[18px] shrink-0 rounded-[2px] shadow-[0_0_0_1px_rgba(0,0,0,0.12)] ${className}`}
    >
      {flag.body}
    </svg>
  );
}
