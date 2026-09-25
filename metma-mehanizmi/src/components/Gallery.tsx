"use client";

import Image from "next/image";
import { useState } from "react";

export function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];

  return (
    <div>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[1.25rem] border border-line bg-mist">
        <Image
          src={current}
          alt={alt}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-contain p-6"
        />
      </div>
      {images.length > 1 ? (
        <div className="mt-3 flex gap-2">
          {images.map((src, imageIndex) => (
            <button
              key={src}
              type="button"
              onClick={() => setIndex(imageIndex)}
              aria-label={`Снимка ${imageIndex + 1}`}
              aria-current={imageIndex === index ? "true" : undefined}
              className={`relative h-20 w-20 overflow-hidden rounded-xl bg-mist ring-2 ${
                imageIndex === index ? "ring-brand" : "ring-line"
              }`}
            >
              <Image src={src} alt="" fill sizes="64px" className="object-contain p-1" />
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
