import type { ReactNode } from "react";

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
      {children}
    </svg>
  );
}

const icons = {
  facebook: (
    <Icon>
      <path d="M14.5 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.1C12.2 3 11 4.4 11 6.6v1.9H9v2.7h2V21h3.5v-9.8h2.3l.4-2.7h-2.7Z" />
    </Icon>
  ),
  instagram: (
    <Icon>
      <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 1.8H8A3.2 3.2 0 0 0 4.8 8v8A3.2 3.2 0 0 0 8 19.2h8a3.2 3.2 0 0 0 3.2-3.2V8A3.2 3.2 0 0 0 16 4.8ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8ZM17.35 6.4a.95.95 0 1 1-.95.95.95.95 0 0 1 .95-.95Z" />
    </Icon>
  ),
  "instagram-easter": (
    <Icon>
      <path d="M8 3h8a5 5 0 0 1 5 5v8a5 5 0 0 1-5 5H8a5 5 0 0 1-5-5V8a5 5 0 0 1 5-5Zm8 1.8H8A3.2 3.2 0 0 0 4.8 8v8A3.2 3.2 0 0 0 8 19.2h8a3.2 3.2 0 0 0 3.2-3.2V8A3.2 3.2 0 0 0 16 4.8ZM12 8.2A3.8 3.8 0 1 1 8.2 12 3.8 3.8 0 0 1 12 8.2Zm0 1.6A2.2 2.2 0 1 0 14.2 12 2.2 2.2 0 0 0 12 9.8ZM17.35 6.4a.95.95 0 1 1-.95.95.95.95 0 0 1 .95-.95Z" />
    </Icon>
  ),
  youtube: (
    <Icon>
      <path d="M22 12.2s0-3.1-.4-4.5a2.9 2.9 0 0 0-2-2C18 5.3 12 5.3 12 5.3s-6 0-7.6.4a2.9 2.9 0 0 0-2 2C2 9.1 2 12.2 2 12.2s0 3.1.4 4.5a2.9 2.9 0 0 0 2 2c1.6.4 7.6.4 7.6.4s6 0 7.6-.4a2.9 2.9 0 0 0 2-2c.4-1.4.4-4.5.4-4.5ZM10.2 15.2V9.2l5.2 3-5.2 3Z" />
    </Icon>
  ),
  tiktok: (
    <Icon>
      <path d="M14.2 3h2.1a5.4 5.4 0 0 0 3.5 3.3v2.2a7.5 7.5 0 0 1-3.5-1v6.7a5.9 5.9 0 1 1-5.9-5.9c.3 0 .6 0 .9.1v2.4a3.5 3.5 0 1 0 2.5 3.4V3Z" />
    </Icon>
  ),
} as const;

export function SocialIcon({ id }: { id: keyof typeof icons }) {
  return icons[id];
}
