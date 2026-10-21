"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export function ScrollToTop() {
  const pathname = usePathname();
  const search = useSearchParams().toString();

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  }, []);

  useEffect(() => {
    if (window.location.hash) return;
    const root = document.documentElement;
    const previous = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, 0);
    const frame = requestAnimationFrame(() => {
      window.scrollTo(0, 0);
      root.style.scrollBehavior = previous;
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname, search]);

  return null;
}
