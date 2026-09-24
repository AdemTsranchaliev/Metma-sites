"use client";

import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { brands } from "@/data/brands";

type Props = {
  active: string;
  onSelect?: (id: string) => void;
  links?: boolean;
};

export function BrandSwitch({ active, onSelect, links = false }: Props) {
  return (
    <div className="inline-flex w-fit items-center gap-1 rounded-full bg-white/75 p-1.5 shadow-[0_16px_40px_-28px_rgba(23,23,23,0.55)] backdrop-blur-md">
      <BrandControl
        label="Всички"
        selected={active === "all"}
        ink="#171717"
        href={links ? "/produkti" : undefined}
        onSelect={onSelect ? () => onSelect("all") : undefined}
      >
        <span className="text-[0.62rem] font-semibold leading-none tracking-tight">Всички</span>
      </BrandControl>
      {brands.map((brand) => (
        <BrandControl
          key={brand.id}
          label={brand.name}
          selected={active === brand.id}
          ink={brand.ink}
          href={links ? `/marki/${brand.id}` : undefined}
          onSelect={onSelect ? () => onSelect(brand.id) : undefined}
        >
          <Image src={brand.logo} alt="" fill className="object-contain p-1.5" sizes="56px" />
        </BrandControl>
      ))}
    </div>
  );
}

function BrandControl({
  label,
  selected,
  ink,
  href,
  onSelect,
  children,
}: {
  label: string;
  selected: boolean;
  ink: string;
  href?: string;
  onSelect?: () => void;
  children: ReactNode;
}) {
  const className = "relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-full transition duration-300 sm:h-[3.25rem] sm:w-[3.25rem]";
  const style = {
    background: "#fff",
    boxShadow: selected ? `0 0 0 2px ${ink}` : "0 0 0 1px rgba(23,23,23,0.06)",
    transform: selected ? "scale(1.06)" : undefined,
  };

  if (href) {
    return (
      <Link href={href} aria-label={label} aria-current={selected ? "page" : undefined} className={className} style={style}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" aria-label={label} aria-pressed={selected} onClick={onSelect} className={className} style={style}>
      {children}
    </button>
  );
}
