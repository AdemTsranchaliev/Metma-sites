"use client";

import { useEffect } from "react";

export function BrandWash({ color }: { color: string }) {
  useEffect(() => {
    const previous = document.body.style.background;
    document.body.style.background = color;
    return () => {
      document.body.style.background = previous;
    };
  }, [color]);

  return null;
}
