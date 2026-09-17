export type ProductCategorySlug = "farbstoffe" | "sets" | "dekorationen";

export type Product = {
  id: string;
  name: string;
  slug: string;
  image: string;
  category: ProductCategorySlug;
  shortDescription: string;
  description: string;
  features: string[];
  specs: {
    label: string;
    value: string;
  }[];
};

export const products: Product[] = [
  {
    id: "B597",
    name: "Ostern Dekoration Marker 5 Stück (B597)",
    slug: "ostern-dekoration-marker-5-stuck-b597",
    image: "/images/products/markers.png",
    category: "dekorationen",
    shortDescription:
      "5 Dekorationsmarker für kreative Muster und Details auf Ostereiern.",
    description:
      "Mit den METMA Dekorationsmarkern lassen sich Ostereier einfach verzieren — für feine Linien, Muster und persönliche Botschaften. Ideal als Ergänzung zu Farbstoffen und Sets.",
    features: [
      "5 Marker im Set",
      "Für Dekoration nach dem Färben",
      "Einfach und sauber anzuwenden",
    ],
    specs: [
      { label: "Art.-Nr.", value: "B597" },
      { label: "Kategorie", value: "Dekorationen" },
      { label: "Inhalt", value: "5 Marker" },
      { label: "Anwendung", value: "Dekoration von Ostereiern" },
    ],
  },
  {
    id: "B571",
    name: "Häschen-Set 5 Farben von Tabletten + Etiketten + Aufkleber",
    slug: "haschen-set-5-farben",
    image: "/images/products/haeschen.png",
    category: "sets",
    shortDescription:
      "Fröhliches Häschen-Set mit 5 Farbtabletten, Etiketten und Aufklebern.",
    description:
      "Das Häschen-Set bringt Farbe und Spielspaß zusammen: fünf Farbtabletten plus Etiketten und Aufkleber für ein komplettes Ostererlebnis — besonders beliebt bei Familien und im Handel.",
    features: [
      "5 Farbtabletten",
      "Etiketten & Aufkleber inklusive",
      "Kindgerechtes Ostermotiv",
    ],
    specs: [
      { label: "Art.-Nr.", value: "B571" },
      { label: "Kategorie", value: "Sets" },
      { label: "Inhalt", value: "5 Farben + Etiketten + Aufkleber" },
      { label: "Anwendung", value: "Eierfärben & Dekorieren" },
    ],
  },
  {
    id: "B558",
    name: "Eierfarben Komplekt Tabletten + Schalen (B558)",
    slug: "eierfarben-komplekt-tabletten-schalen-b558",
    image: "/images/products/schalen.png",
    category: "sets",
    shortDescription:
      "Komplettset mit Farbtabletten und Schalen — alles fürs Färben bereit.",
    description:
      "Praktisches Komplettset für den Start: Farbtabletten und Schalen in einer Packung. Ideal für den Handel und für alle, die ohne zusätzliches Zubehör sofort loslegen möchten.",
    features: [
      "Tabletten + Schalen im Set",
      "Sofort einsatzbereit",
      "Praktisch für Familien & Handel",
    ],
    specs: [
      { label: "Art.-Nr.", value: "B558" },
      { label: "Kategorie", value: "Sets" },
      { label: "Inhalt", value: "Farbtabletten + Schalen" },
      { label: "Anwendung", value: "Eierfärben" },
    ],
  },
  {
    id: "P101",
    name: "Komplekt Magie (Р101)",
    slug: "komplekt-magie-p101",
    image: "/images/products/magie.png",
    category: "sets",
    shortDescription:
      "Magisches Osterset für besondere Effekte und leuchtende Farben.",
    description:
      "Das Magie-Set ist für alle, die Ostereier mit besonderen Effekten gestalten möchten. Ein starkes Display-Produkt für den Handel und ein Highlight für zu Hause.",
    features: [
      "Besondere Färbeeffekte",
      "Attraktiv fürs Regal",
      "Aus eigener Produktion",
    ],
    specs: [
      { label: "Art.-Nr.", value: "P101" },
      { label: "Kategorie", value: "Sets" },
      { label: "Inhalt", value: "Magie-Komplettset" },
      { label: "Anwendung", value: "Eierfärben mit Effekt" },
    ],
  },
  {
    id: "P112",
    name: "Osterei Maler 3 Stück (Р112)",
    slug: "osterei-maler-3-stuck-p112",
    image: "/images/products/maler.png",
    category: "dekorationen",
    shortDescription:
      "3 Malstifte für individuelle Motive und bunte Details auf Eiern.",
    description:
      "Mit den Osterei-Malern entstehen persönliche Motive und feine Verzierungen. Perfekt als Ergänzung zu METMA Farbstoffen — für kreative Ostermomente.",
    features: [
      "3 Maler im Set",
      "Für individuelle Motive",
      "Ergänzt Farbstoffe & Sets",
    ],
    specs: [
      { label: "Art.-Nr.", value: "P112" },
      { label: "Kategorie", value: "Dekorationen" },
      { label: "Inhalt", value: "3 Maler" },
      { label: "Anwendung", value: "Bemalen von Ostereiern" },
    ],
  },
  {
    id: "B599",
    name: "Eierfarben 5 Farben Marmor (B599)",
    slug: "eierfarben-5-farben-marmor-b599",
    image: "/images/products/marmor.png",
    category: "farbstoffe",
    shortDescription:
      "5 Marmor-Farben für einzigartige, marmorierte Ostereier.",
    description:
      "Die Marmor-Serie erzeugt lebendige, gemaserte Effekte auf dem Ei. Fünf abgestimmte Farben für ein hochwertiges Ergebnis — ein Klassiker im METMA Sortiment.",
    features: [
      "5 Marmor-Farben",
      "Lebendige Muster-Effekte",
      "Beliebt im Handel",
    ],
    specs: [
      { label: "Art.-Nr.", value: "B599" },
      { label: "Kategorie", value: "Farbstoffe" },
      { label: "Inhalt", value: "5 Farben" },
      { label: "Effekt", value: "Marmor" },
    ],
  },
  {
    id: "B603",
    name: "Eierfarben 5 Farben Pastell (B603)",
    slug: "eierfarben-5-farben-pastell-b603",
    image: "/images/products/pastell.png",
    category: "farbstoffe",
    shortDescription:
      "5 zarte Pastellfarben für weiche, elegante Oster-Looks.",
    description:
      "Pastell bringt ruhige, moderne Töne aufs Ei. Die fünf Farben der Serie eignen sich für dezente Osterdekoration und ergänzen sich harmonisch untereinander.",
    features: [
      "5 Pastellfarben",
      "Weiche, elegante Töne",
      "Modernes Osterlook",
    ],
    specs: [
      { label: "Art.-Nr.", value: "B603" },
      { label: "Kategorie", value: "Farbstoffe" },
      { label: "Inhalt", value: "5 Farben" },
      { label: "Effekt", value: "Pastell" },
    ],
  },
  {
    id: "B600",
    name: "Eierfarben 5 Farben Brilant (B600)",
    slug: "eierfarben-5-farben-brilant-b600",
    image: "/images/products/brilant.png",
    category: "farbstoffe",
    shortDescription:
      "5 brillante Farben für kräftige, leuchtende Ostereier.",
    description:
      "Brilant steht für sattes, leuchtendes Farbergebnis. Die Serie mit fünf Farben ist ein Favorit für alle, die intensive Ostertöne und starke Regalwirkung suchen.",
    features: [
      "5 brillante Farben",
      "Kräftige Leuchtkraft",
      "Starke Regalwirkung",
    ],
    specs: [
      { label: "Art.-Nr.", value: "B600" },
      { label: "Kategorie", value: "Farbstoffe" },
      { label: "Inhalt", value: "5 Farben" },
      { label: "Effekt", value: "Brilant" },
    ],
  },
  {
    id: "B601",
    name: "Eierfarben 5 Farben Flüssig + Schnellack (B601)",
    slug: "eierfarben-5-farben-flussig-schnellack-b601",
    image: "/images/products/fluessig.png",
    category: "farbstoffe",
    shortDescription:
      "5 Flüssigfarben plus Schnellack für Glanz und schnelles Ergebnis.",
    description:
      "Flüssigfarbe mit Schnellack kombiniert Farbe und Finish: praktisches Färben und ein glänzendes Ergebnis in einem Set — effizient für Handel und Endkunden.",
    features: [
      "5 Flüssigfarben",
      "Schnellack inklusive",
      "Glänzendes Finish",
    ],
    specs: [
      { label: "Art.-Nr.", value: "B601" },
      { label: "Kategorie", value: "Farbstoffe" },
      { label: "Inhalt", value: "5 Flüssigfarben + Schnellack" },
      { label: "Anwendung", value: "Flüssigfärben" },
    ],
  },
  {
    id: "B604",
    name: "Eierfarben 5 Farben Tabletten + Kristall (B604)",
    slug: "eierfarben-5-farben-tabletten-kristall-b604",
    image: "/images/products/kristall.png",
    category: "farbstoffe",
    shortDescription:
      "5 Farbtabletten mit Kristall-Effekt für glitzernde Ostereier.",
    description:
      "Tabletten plus Kristall-Effekt sorgen für Farbe und Funkeln. Ein attraktives Produkt für Displays und für alle, die besondere Oster-Highlights wollen.",
    features: [
      "5 Farbtabletten",
      "Kristall-Effekt",
      "Auffällig im Regal",
    ],
    specs: [
      { label: "Art.-Nr.", value: "B604" },
      { label: "Kategorie", value: "Farbstoffe" },
      { label: "Inhalt", value: "5 Tabletten + Kristall" },
      { label: "Effekt", value: "Kristall" },
    ],
  },
  {
    id: "B598",
    name: "Eierfarben 5 Farben Flüssig für kaltes Wasser",
    slug: "eierfarben-5-farben-flussig-kaltes-wasser",
    image: "/images/products/kalt.png",
    category: "farbstoffe",
    shortDescription:
      "5 Flüssigfarben speziell für die Anwendung in kaltem Wasser.",
    description:
      "Diese Flüssigserie ist für kaltes Wasser ausgelegt — praktisch, wenn kein heißes Wasser nötig sein soll. Fünf Farben für zuverlässiges Färben zu Hause und im Handel.",
    features: [
      "5 Flüssigfarben",
      "Für kaltes Wasser",
      "Einfache Anwendung",
    ],
    specs: [
      { label: "Art.-Nr.", value: "B598" },
      { label: "Kategorie", value: "Farbstoffe" },
      { label: "Inhalt", value: "5 Flüssigfarben" },
      { label: "Anwendung", value: "Kaltes Wasser" },
    ],
  },
  {
    id: "B593",
    name: "Eierfarben 5 Farben Eierglanz + Goldglitter (B593)",
    slug: "eierfarben-5-farben-eierglanz-goldglitter-b593",
    image: "/images/products/gold.png",
    category: "farbstoffe",
    shortDescription:
      "5 Farben mit Eierglanz und Goldglitter für festlichen Schimmer.",
    description:
      "Eierglanz plus Goldglitter verleihen Ostereiern festlichen Glanz. Die Serie mit fünf Farben ist ein Highlight für Ostern — sichtbar, dekorativ und verkaufsstark.",
    features: [
      "5 Farben",
      "Eierglanz + Goldglitter",
      "Festlicher Schimmer",
    ],
    specs: [
      { label: "Art.-Nr.", value: "B593" },
      { label: "Kategorie", value: "Farbstoffe" },
      { label: "Inhalt", value: "5 Farben + Goldglitter" },
      { label: "Effekt", value: "Glanz & Glitter" },
    ],
  },
];

export const navItems = [
  { label: "Home", href: "/" },
  { label: "Produkte", href: "/produkte", highlight: true },
  { label: "Blog", href: "/blog" },
  { label: "Über Uns", href: "/uber-uns" },
  { label: "Kontakt", href: "/kontakt" },
] as const;

export const productCategories = [
  { label: "Farbstoffe", href: "/produkte/farbstoffe", slug: "farbstoffe" },
  { label: "Sets", href: "/produkte/sets", slug: "sets" },
  { label: "Dekorationen", href: "/produkte/dekorationen", slug: "dekorationen" },
] as const;

export const team = [
  {
    name: "Lyubomir Iliev",
    role: "Inhaber",
    image: "/images/team/lubo.png",
  },
  {
    name: "Zafer Myumyunov",
    role: "Geschäftsführer",
    image: "/images/team/zafer.png",
  },
  {
    name: "Vasilka Nonova",
    role: "Vertriebsleiter",
    image: "/images/team/vasilka.png",
  },
  {
    name: "Anna Pishinkova",
    role: "Verkäuferassistent",
    image: "/images/team/anna.png",
  },
] as const;

export const partners = [
  {
    name: "Krasgom LTD",
    city: "Veliko Tarnovo",
    detail: "5 Nish str.",
    phones: ["+359 888 28 52 63"],
  },
  {
    name: "Pleven",
    city: "Pleven",
    detail: "",
    phones: ["+359 888 28 49 72"],
  },
  {
    name: "Montana",
    city: "Montana",
    detail: "",
    phones: ["+359 887 79 07 36"],
  },
  {
    name: "Veliko Tarnovo",
    city: "Veliko Tarnovo",
    detail: "",
    phones: ["+359 888 74 95 76"],
  },
  {
    name: "Ruse",
    city: "Ruse",
    detail: "",
    phones: ["+359 887 84 84 85", "+359 889 15 51 00"],
  },
] as const;
