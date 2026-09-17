export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  content: string[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "history-of-the-easter-holiday",
    title: "Geschichte des Osterfestes",
    excerpt:
      "Kurze Geschichte, große Farbe — warum das Färben von Eiern bis heute Menschen verbindet.",
    date: "2024-03-15",
    category: "Tradition",
    image: "/images/blog/easter.jpg",
    content: [
      "Ostern ist eines der wichtigsten christlichen Feste. Es erinnert an Auferstehung und Neubeginn — und ist zugleich eng mit Brauchtum, Familie und Farbe verbunden.",
      "Die Tradition des Eierfärbens reicht weit zurück. Früher stand das Ei für Leben und Fruchtbarkeit; später wurde das bunte Ei zum Symbol des Osterfestes in vielen Ländern Europas.",
      "Heute verbindet das Färben von Eiern Generationen: Kinder, Familien und den Handel. Genau hier setzt METMA an — mit Farben, Sets und Dekorationen aus eigener Produktion seit 1999.",
      "Ob Pastell, Brillant, Marmor oder Glitzer: Die richtige Farbe macht Ostern sichtbar. Und die Geschichte dahinter macht jedes Ei ein Stück besonderer.",
    ],
  },
  {
    slug: "so-faerbst-du-ostereier-richtig",
    title: "So färbst du Ostereier richtig",
    excerpt:
      "Einfache Tipps für leuchtende Farben — von der Vorbereitung bis zum fertigen Ei.",
    date: "2024-03-22",
    category: "Tipps",
    image: "/images/blog-easter.jpg",
    content: [
      "Gute Vorbereitung ist die halbe Farbe: Eier waschen, trocknen und bei Bedarf vorsichtig anstechen, damit sie beim Kochen nicht platzen.",
      "Je nach Produktfamilie — Tabletten, Flüssigfarbe oder Kaltwasser — unterscheiden sich die Schritte leicht. Immer die Packungsanleitung beachten.",
      "Für besonders kräftige Ergebnisse die Eier nach dem Färben kurz abtropfen lassen. Mit Glanz oder Glitter wird daraus schnell ein Highlight für den Ostertisch.",
      "METMA Farben sind für den Alltag zu Hause und für den Handel gemacht — zuverlässig, bunt und aus eigener Produktion.",
    ],
  },
  {
    slug: "pastell-brilant-marmor",
    title: "Pastell, Brillant oder Marmor?",
    excerpt:
      "Welche Farbserie passt zu dir? Ein kurzer Überblick über die METMA Look-Familien.",
    date: "2024-04-02",
    category: "Sortiment",
    image: "/images/hero-1.jpg",
    content: [
      "Pastell bringt weiche, moderne Töne — ideal für dezente Tischdekoration und ruhige Oster-Looks.",
      "Brillant steht für satte Leuchtkraft. Wer starke Farben und klare Kontraste mag, greift hier zu.",
      "Marmor erzeugt lebendige Muster und macht jedes Ei einzigartig. Perfekt, wenn Variation im Korb gewünscht ist.",
      "Dazu kommen Kristall, Glitter und Sets — so findest du für Familie und Handel die passende METMA Linie.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string) {
  return new Date(date).toLocaleDateString("de-DE", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
