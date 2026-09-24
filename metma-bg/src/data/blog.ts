export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  dateLabel: string;
  image: string;
  cover: boolean;
  categoryHref: string;
  categoryLabel: string;
  paragraphs: string[];
  products: string[];
};

export const posts: Post[] = [
  {
    slug: "mehanizmi-za-povdigane-na-matrak",
    title: "Повдигане на матрак",
    excerpt: "Подматрак, 45° и вариант с амортисьор.",
    dateLabel: "12 септември 2026",
    image: "/images/products/meh8.jpg",
    cover: false,
    categoryHref: "/produkti?kategoria=mechanisms",
    categoryLabel: "Механизми",
    paragraphs: [
      "Серийни механизми за мека мебел: малък и голям подматрак, включително 2-КА и 3-КА.",
      "Отделно са моделите на 45° — малък, голям и за амортисьор. Анкона и Стефи са именувани позиции. Размер и наличност — при запитване.",
    ],
    products: [
      "mehanizam-za-povdigane-na-matrak-45-za-amortisor",
      "mehanizam-ankona",
      "mehanizam-stefi",
    ],
  },
  {
    slug: "ramkovi-mehanizmi-za-fotoyli-i-kuhnya",
    title: "Рамки за фотьойл и кухня",
    excerpt: "Поли, Аква, Габи и кухненски ъгъл.",
    dateLabel: "5 септември 2026",
    image: "/images/products/ram16.jpg",
    cover: false,
    categoryHref: "/produkti?kategoria=frame",
    categoryLabel: "Рамкови механизми",
    paragraphs: [
      "Рамки за фотьойли, кухненски ъгли и ламелни системи. Серийно, в няколко дължини.",
      "Фотьойли: Поли, Аква, Джеси, Албена, Нона, Габи, Марти. Дължината често е в името — например Габи 1150–1960.",
    ],
    products: [
      "mehanizam-fotoyl-poli",
      "ramkov-mehanizam-gabi-1150-1270-1420-1960",
      "ramkov-mehanizam-kuhnenski-agal-1290-1410-1530",
    ],
  },
  {
    slug: "darveni-displei-i-kutii-za-vino",
    title: "Дървени дисплеи",
    excerpt: "Кенди, ИНО и кутии за вино.",
    dateLabel: "28 август 2026",
    image: "/images/products/displey-kendi.jpg",
    cover: true,
    categoryHref: "/produkti?kategoria=displays",
    categoryLabel: "Дървени дисплеи",
    paragraphs: [
      "Отделна линия до металните механизми: Кенди, ИНО, дисплей № 3 и № 4.",
      "Също мини дисплеи и кутии за вино, плюс великденски поставки. Наличност и поръчка по заявка — в Пазарджик.",
    ],
    products: [
      "darven-displey-kendi",
      "kutii-za-vino-razlichni-razmeri",
      "mini-displei-za-vino",
    ],
  },
];

export function getPost(slug: string) {
  return posts.find((post) => post.slug === slug);
}
