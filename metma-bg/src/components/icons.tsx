import type { ReactNode } from "react";

type IconProps = { className?: string };

function Icon({ className, children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      {children}
    </svg>
  );
}

export function IconStack({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M12 3 4 7l8 4 8-4-8-4Z" />
      <path d="m4 12 8 4 8-4" />
      <path d="m4 17 8 4 8-4" />
    </Icon>
  );
}

export function IconBadge({ className }: IconProps) {
  return (
    <Icon className={className}>
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12.2 2.2 2.2 4.8-5" />
    </Icon>
  );
}

export function IconSofa({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M4 12.5A1.5 1.5 0 0 1 5.5 11H7v4H5.5A1.5 1.5 0 0 1 4 13.5v-1Z" />
      <path d="M20 12.5A1.5 1.5 0 0 0 18.5 11H17v4h1.5a1.5 1.5 0 0 0 1.5-1.5v-1Z" />
      <path d="M7 11V9a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
      <path d="M7 11h10v4H7z" />
      <path d="M8 17.5V19M16 17.5V19" />
    </Icon>
  );
}

export function IconDraft({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M14 4H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V9l-5-5Z" />
      <path d="M14 4v5h5" />
      <path d="M8 13h8M8 17h5" />
    </Icon>
  );
}

export function IconPhone({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M8 4h2l1.2 3-1.5 1a12 12 0 0 0 5.3 5.3l1-1.5L20 14v2a2 2 0 0 1-2.2 2A16 16 0 0 1 4 6.2 2 2 0 0 1 6 4h2Z" />
    </Icon>
  );
}

export function IconArrow({ className }: IconProps) {
  return (
    <Icon className={className}>
      <path d="M5 12h14" />
      <path d="m13 6 6 6-6 6" />
    </Icon>
  );
}

export function IconMachine({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="3" y="8" width="13" height="10" rx="1.5" />
      <path d="M16 11h3.5a1.5 1.5 0 0 1 1.5 1.5V18H16" />
      <path d="M7 8V5h5v3" />
      <circle cx="8" cy="13" r="1.2" />
    </Icon>
  );
}

export function IconCoins({ className }: IconProps) {
  return (
    <Icon className={className}>
      <ellipse cx="9" cy="8" rx="5" ry="2.5" />
      <path d="M4 8v4c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V8" />
      <path d="M14 10.5c1.8.3 4 1.2 4 2.5v3c0 1.4-2.2 2.5-5 2.5-1.2 0-2.3-.2-3.2-.6" />
    </Icon>
  );
}

export function IconCalendar({ className }: IconProps) {
  return (
    <Icon className={className}>
      <rect x="4" y="5" width="16" height="15" rx="2" />
      <path d="M8 3v4M16 3v4M4 10h16" />
    </Icon>
  );
}
