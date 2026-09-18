/** Hardcoded nav for design — replace with CMS later */
export const menuNav = [
  { label: "Home", href: "/" },
  { label: "Produkte", href: "/produkte", children: true },
  { label: "Blog", href: "/blog" },
  { label: "Über uns", href: "/uber-uns" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const menuCategories = [
  {
    label: "Farbstoffe",
    href: "/produkte/farbstoffe",
    hint: "Tabletten, Flüssig & mehr",
  },
  {
    label: "Sets",
    href: "/produkte/sets",
    hint: "Komplettpakete für Ostern",
  },
  {
    label: "Dekorationen",
    href: "/produkte/dekorationen",
    hint: "Marker, Maler & Aufkleber",
  },
] as const;

export const menuContact = {
  phone: "+359 885 828 771",
  phoneHref: "tel:+359885828771",
  email: "sales@metma-de.com",
  emailHref: "mailto:sales@metma-de.com",
} as const;
