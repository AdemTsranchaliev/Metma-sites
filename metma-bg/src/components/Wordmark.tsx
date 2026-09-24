import Image from "next/image";
import Link from "next/link";

export function Wordmark({ priority = false }: { priority?: boolean }) {
  return (
    <Link href="/" className="shrink-0" aria-label="МЕТМА — начало">
      <Image
        src="/images/logo-on-light.png"
        alt="МЕТМА — механизми за мебели"
        width={250}
        height={40}
        priority={priority}
        className="h-8 w-auto sm:h-9 lg:h-10"
      />
    </Link>
  );
}
