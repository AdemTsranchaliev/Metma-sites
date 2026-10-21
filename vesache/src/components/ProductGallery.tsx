"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, name, frame = "wash" }: { images: string[]; name: string; frame?: "wash" | "white" }) {
  const [selected, setSelected] = useState(0);
  const current = images[selected] ?? images[0];
  if (!current) return null;
  const frameClass = frame === "white" ? "bg-white shadow-[0_18px_40px_-22px_rgba(29,36,45,0.4)]" : "bg-[var(--metma-wash)]";
  return (
    <div>
      <div className={`relative aspect-square overflow-hidden rounded-3xl ring-1 ring-black/[0.06] ${frameClass}`}>
        <Image src={current} alt={name} fill className="object-contain p-6" sizes="(max-width:768px) 100vw, 50vw" unoptimized priority />
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2 overflow-x-auto">
          {images.map((image, index) => (
            <button
              key={image}
              type="button"
              aria-label={`Снимка ${index + 1}`}
              aria-current={index === selected ? "true" : undefined}
              onClick={() => setSelected(index)}
              className={`relative h-[4.5rem] w-[4.5rem] shrink-0 overflow-hidden rounded-xl bg-white ring-1 ring-black/10 ${
                index === selected ? "ring-2 ring-[var(--metma-rose)]" : ""
              }`}
            >
              <Image src={image} alt="" fill className="object-contain p-1" sizes="64px" unoptimized />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
