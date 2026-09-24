export type BlogBlock =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  images?: string[];
  content: BlogBlock[];
  kind?: "story" | "declaration";
};

export const blogPosts: BlogPost[] = [
  {
    slug: "deklaratsiya-sotsialna-otgovornost",
    title: "Декларация Метма ЕООД – Политика за социална отговорност",
    excerpt:
      "Политика за социална отговорност на Метма ЕООД — ангажимент към хората, условията на труд и общността.",
    date: "2023-06-08",
    category: "Компания",
    kind: "declaration",
    image: "/images/blog/img19-scaled.jpg",
    content: [
      {
        type: "p",
        text: "Метма ЕООД публикува декларация за политиката си по социална отговорност. Документът описва ангажимента на фирмата към служителите, безопасните условия на труд и отговорното отношение към обществото.",
      },
    ],
  },
  {
    slug: "politika-po-kachestvo",
    title: "Декларация за политиката по качество на фирма Метма ЕООД",
    excerpt:
      "Политика по качество: затворено производство и контрол от рецептата до опаковката.",
    date: "2023-06-08",
    category: "Качество",
    kind: "declaration",
    image: "/images/blog/img7-1-scaled.jpg",
    content: [
      {
        type: "p",
        text: "Декларацията за политиката по качество описва как Метма контролира производството на бои за яйца и великденски продукти — от суровините до готовата опаковка.",
      },
    ],
  },
  {
    slug: "politika-okolna-sreda",
    title: "Политика по околна среда на Метма ЕООД",
    excerpt:
      "Как фирмата подхожда към опазването на околната среда в производството.",
    date: "2023-06-08",
    category: "Околна среда",
    kind: "declaration",
    image: "/images/blog/img7-scaled.jpg",
    content: [
      {
        type: "p",
        text: "Политиката по околна среда на Метма ЕООД задава правилата за отговорно производство и намаляване на въздействието върху природата.",
      },
    ],
  },
  {
    slug: "podkrepa-sredni-predpriyatiya-covid-19",
    title:
      "Подкрепа за средни предприятия за преодоляване на икономическите последствия от пандемията COVID-19",
    excerpt:
      "Информация за проекта за подкрепа на средни предприятия след пандемията COVID-19.",
    date: "2023-06-08",
    category: "Проекти",
    kind: "declaration",
    image: "/images/blog/1.1.-Publikacia-za-Proekt-na-sajta_Metma-1.jpg",
    content: [
      {
        type: "p",
        text: "Публикация за проекта на Метма за подкрепа на средни предприятия при преодоляване на икономическите последствия от пандемията COVID-19.",
      },
    ],
  },
  {
    slug: "istoriya-na-praznika-velikden",
    title: "История на празника Великден",
    excerpt:
      "Великден е празникът, около който се събира семейството — и боядисаното яйце е в центъра му.",
    date: "2019-10-01",
    category: "Традиция",
    image: "/images/blog/EASTER_holiday_5616x3744-scaled-e1582745422831.jpg",
    content: [
      {
        type: "p",
        text: "Великден събира семейството около боядисаното яйце. МЕТМА произвежда бои, комплекти и украси, с които тази традиция остава жива — у дома и по рафтовете на търговските вериги.",
      },
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string) {
  return new Date(date).toLocaleDateString("bg-BG", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
