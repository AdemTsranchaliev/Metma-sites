import Link from "next/link";
import { ArrowIcon } from "./Icons";

export function CategoryLink({ href }: { href: string }) {
  return (
    <Link
      href={href}
      aria-label="Open category"
      className="mx-auto mt-2 mb-10 inline-flex rounded-full border border-[#c5d0c5] p-3 text-black"
    >
      <ArrowIcon />
    </Link>
  );
}
