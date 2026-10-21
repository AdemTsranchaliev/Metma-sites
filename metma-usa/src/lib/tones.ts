export const categoryTones: Record<string, { bg: string; ink: string; chip: string }> = {
  classic: { bg: "#fff1f0", ink: "#e10600", chip: "#e10600" },
  children: { bg: "#fff6d8", ink: "#a16207", chip: "#e8a317" },
  display: { bg: "#e8f1ff", ink: "#1d4e89", chip: "#1d4e89" },
  decoration: { bg: "#e7f7ee", ink: "#157a45", chip: "#1f9d62" },
};

export function toneFor(slug: string) {
  return categoryTones[slug] ?? { bg: "#fff6ee", ink: "#0c2340", chip: "#0c2340" };
}
