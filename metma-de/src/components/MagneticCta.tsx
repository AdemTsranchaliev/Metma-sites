"use client";

import {
  type ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** How strongly the CTA follows the cursor (0–1). */
  strength?: number;
};

/**
 * Desktop: soft magnetic pull toward the cursor + press scale.
 * Touch / reduced-motion: press only (via CSS :active on the button).
 */
export function MagneticCta({
  children,
  className = "",
  strength = 0.32,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [pressed, setPressed] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    setEnabled(fine && !reduce);
  }, []);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLSpanElement>) => {
      if (!enabled || !ref.current) return;
      const r = ref.current.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      setOffset({ x: x * strength, y: y * strength });
    },
    [enabled, strength],
  );

  const reset = useCallback(() => {
    setOffset({ x: 0, y: 0 });
    setPressed(false);
  }, []);

  return (
    <span
      ref={ref}
      className={`magnetic-cta inline-flex max-w-full ${className}`}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${pressed ? 0.97 : 1})`,
        transition: pressed
          ? "transform 0.08s ease-out"
          : "transform 0.45s cubic-bezier(0.22, 1, 0.36, 1)",
        willChange: enabled ? "transform" : undefined,
      }}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onBlur={reset}
    >
      {children}
    </span>
  );
}
