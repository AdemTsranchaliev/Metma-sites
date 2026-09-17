import { socialLinks } from "@/components/icons";

type Props = {
  variant?: "light" | "dark" | "footer" | "onBlue" | "pastel";
};

export function SocialIcons({ variant = "light" }: Props) {
  const styles =
    variant === "pastel"
      ? "bg-[var(--metma-paper)] text-[var(--metma-navy)] hover:bg-[var(--metma-rose)] hover:text-white"
      : variant === "footer"
        ? "bg-[var(--metma-navy)] text-white hover:bg-[var(--metma-rose)]"
        : variant === "onBlue"
          ? "bg-white/20 text-white hover:bg-[var(--metma-rose)]"
          : variant === "dark"
            ? "bg-[var(--metma-sand)] text-[var(--metma-mute)] hover:bg-[var(--metma-lilac)]"
            : "bg-[var(--metma-sand)] text-[var(--metma-mute)] hover:bg-[var(--metma-lilac)]";

  const size =
    variant === "footer" || variant === "onBlue" || variant === "pastel"
      ? "h-11 w-11"
      : "h-8 w-8";
  const iconSize =
    variant === "footer" || variant === "onBlue" || variant === "pastel"
      ? "h-4 w-4"
      : "h-3.5 w-3.5";

  return (
    <div className="flex items-center gap-2">
      {socialLinks.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          aria-label={label}
          target="_blank"
          rel="noreferrer"
          className={`flex items-center justify-center rounded-full transition ${styles} ${size}`}
        >
          <Icon className={iconSize} />
        </a>
      ))}
    </div>
  );
}
