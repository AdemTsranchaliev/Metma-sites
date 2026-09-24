export type CategoryId =
  | "mechanisms"
  | "frame"
  | "parts"
  | "displays"
  | "auto"
  | "springs";

export type Product = {
  slug: string;
  title: string;
  category: CategoryId;
  images: string[];
};

export const categories: {
  id: CategoryId;
  name: string;
  summary: string;
}[] = [
  { id: "mechanisms", name: "Механизми", summary: "Механизми за повдигане и подматрачни системи за мека мебел." },
  { id: "frame", name: "Рамкови механизми", summary: "Рамки за фотьойли, кухненски ъгли и ламелни системи." },
  { id: "parts", name: "Детайли", summary: "Планки, панти, спирачки, колела и други мебелни детайли." },
  { id: "displays", name: "Дървени дисплеи", summary: "Дървени дисплеи, поставки и кутии за вино." },
  { id: "auto", name: "Автоматни детайли", summary: "Автоматни детайли — гайки и дистанционери." },
  { id: "springs", name: "Пружини", summary: "Пружини за механизми." },
];

export const products: Product[] = [
  {
    slug: "mehanizam-za-podmatrak-golyam-3-ka",
    title: "Механизъм за подматрак голям 3-КА",
    category: "mechanisms",
    images: ["/images/products/meh11.jpg", "/images/products/meh11-1.jpg"],
  },
  {
    slug: "mehanizam-ankona",
    title: "Механизъм Анкона",
    category: "mechanisms",
    images: ["/images/products/meh10.jpg", "/images/products/meh10-1.jpg"],
  },
  {
    slug: "mehanizam-za-podmatrak-malak-3-ka",
    title: "Механизъм за подматрак малък 3-КА",
    category: "mechanisms",
    images: ["/images/products/meh9.jpg", "/images/products/meh9-1.jpg"],
  },
  {
    slug: "mehanizam-za-povdigane-na-matrak-45-za-amortisor",
    title: "Механизъм за повдигане на матрак 45° за амортисьор",
    category: "mechanisms",
    images: ["/images/products/meh8.jpg", "/images/products/meh8-1.jpg", "/images/products/meh8-2.jpg"],
  },
  {
    slug: "mehanizam-za-podmatrak-malak-i-golyam",
    title: "Механизъм за подматрак малък и голям",
    category: "mechanisms",
    images: ["/images/products/meh6.jpg", "/images/products/meh6-1.jpg", "/images/products/meh6-2.jpg"],
  },
  {
    slug: "mehanizam-za-podmatrak-malak-i-golyam-2-ka",
    title: "Механизъм за подматрак малък и голям 2-КА",
    category: "mechanisms",
    images: ["/images/products/meh5.jpg", "/images/products/meh5-1.jpg"],
  },
  {
    slug: "mehanizam-stefi",
    title: "Механизъм Стефи",
    category: "mechanisms",
    images: ["/images/products/meh4.jpg", "/images/products/meh4-1.jpg", "/images/products/meh4-2.jpg"],
  },
  {
    slug: "mehanizam-za-povdigane-na-matrak-45-golyam",
    title: "Механизъм за повдигане на матрак 45° – голям",
    category: "mechanisms",
    images: ["/images/products/meh3.jpg", "/images/products/meh3-1.jpg"],
  },
  {
    slug: "mehanizam-za-povdigane-na-matrak-45-malak",
    title: "Механизъм за повдигане на матрак 45° – малък",
    category: "mechanisms",
    images: ["/images/products/meh2.jpg", "/images/products/meh2-1.jpg"],
  },
  {
    slug: "mehanizam-za-povdigane-na-matrak-45",
    title: "Механизъм за повдигане на матрак 45°",
    category: "mechanisms",
    images: ["/images/products/meh1.jpg", "/images/products/meh1-1.jpg", "/images/products/meh1-2.jpg"],
  },
  {
    slug: "mehanizam-fotoyl-poli",
    title: "Механизъм фотьойл – Поли",
    category: "frame",
    images: ["/images/products/ram16.jpg"],
  },
  {
    slug: "ramkov-mehanizam-poli-2-ka-3-ka",
    title: "Рамков механизъм – Поли 2-КА, 3-КА",
    category: "frame",
    images: ["/images/products/ram15.jpg"],
  },
  {
    slug: "ramkov-mehanizam-kuhnenski-agal-1550",
    title: "Рамков механизъм – Кухненски ъгъл 1550",
    category: "frame",
    images: ["/images/products/ram14.jpg", "/images/products/ram14-1.jpg"],
  },
  {
    slug: "ramkov-mehanizam-kuhnenski-agal-1310-1350-1430",
    title: "Рамков механизъм – Кухненски ъгъл 1310, 1350, 1430",
    category: "frame",
    images: ["/images/products/ram13.jpg", "/images/products/ram13-1.jpg"],
  },
  {
    slug: "mehanizam-fotoyl-akva-2-ka-3-ka",
    title: "Механизъм фотьойл – Аква 2-КА,3-КА",
    category: "frame",
    images: ["/images/products/ram12.jpg", "/images/products/ram12-1.jpg"],
  },
  {
    slug: "mehanizam-fotoyl-akva",
    title: "Механизъм фотьойл – Аква",
    category: "frame",
    images: ["/images/products/ram11.jpg", "/images/products/ram11-1.jpg"],
  },
  {
    slug: "ramkov-mehanizam-marti-1350",
    title: "Рамков механизъм – Марти 1350",
    category: "frame",
    images: ["/images/products/ram10.jpg"],
  },
  {
    slug: "lamelna-ramka-marti",
    title: "Ламелна рамка – Марти",
    category: "frame",
    images: ["/images/products/ram9.jpg", "/images/products/ram9-1.jpg"],
  },
  {
    slug: "ramkov-mehanizam-kuhnenski-agal-1300-1420",
    title: "Рамков механизъм – Кухненски ъгъл 1300, 1420",
    category: "frame",
    images: ["/images/products/ram8.jpg", "/images/products/ram8-1.jpg"],
  },
  {
    slug: "ramkov-mehanizam-kuhnenski-agal-1290-1410-1530",
    title: "Рамков механизъм – Кухненски ъгъл 1290, 1410, 1530",
    category: "frame",
    images: ["/images/products/ram7.jpg", "/images/products/ram7-1.jpg", "/images/products/ram7-2.jpg"],
  },
  {
    slug: "ramkov-mehanizam-albena-640-1340",
    title: "Рамков механизъм – Албена 640, 1340",
    category: "frame",
    images: ["/images/products/ram6.jpg", "/images/products/ram6-1.jpg"],
  },
  {
    slug: "ramkov-mehanizam-gabi-1150-1270-1420-1960",
    title: "Рамков механизъм – Габи 1150, 1270, 1420, 1960",
    category: "frame",
    images: ["/images/products/ram5.jpg", "/images/products/ram5-1.jpg", "/images/products/ram5-2.jpg"],
  },
  {
    slug: "ramkov-mehanizam-dzhesi",
    title: "Рамков механизъм – Джеси",
    category: "frame",
    images: ["/images/products/ram4.jpg", "/images/products/ram4-1.jpg"],
  },
  {
    slug: "ramkov-mehanizam-nona-1320-1520",
    title: "Рамков механизъм – Нона 1320,1520",
    category: "frame",
    images: ["/images/products/ram2.jpg", "/images/products/ram2-1.jpg"],
  },
  {
    slug: "aglova-planka-za-leglo",
    title: "Ъглова планка за легло",
    category: "parts",
    images: ["/images/products/det15.jpg"],
  },
  {
    slug: "planka-za-masa-malka-i-golyama",
    title: "Планка за маса – малка и голяма",
    category: "parts",
    images: ["/images/products/det14.jpg"],
  },
  {
    slug: "panta-panta-malka",
    title: "Панта, панта малка",
    category: "parts",
    images: ["/images/products/det13.jpg"],
  },
  {
    slug: "planka-za-masa-komplekt",
    title: "Планка за маса комплект",
    category: "parts",
    images: ["/images/products/det12.jpg"],
  },
  {
    slug: "spirachka-8",
    title: "Спирачка 8",
    category: "parts",
    images: ["/images/products/det11.jpg", "/images/products/det11-1.jpg"],
  },
  {
    slug: "spirachka-7",
    title: "Спирачка 7",
    category: "parts",
    images: ["/images/products/det10.jpg", "/images/products/det10-1.jpg"],
  },
  {
    slug: "spirachka-6",
    title: "Спирачка 6",
    category: "parts",
    images: ["/images/products/det9.jpg", "/images/products/det9-1.jpg"],
  },
  {
    slug: "spirachka-5",
    title: "Спирачка 5",
    category: "parts",
    images: ["/images/products/det8.jpg", "/images/products/det8-1.jpg"],
  },
  {
    slug: "spirachka-4",
    title: "Спирачка 4",
    category: "parts",
    images: ["/images/products/det7.jpg", "/images/products/det7-1.jpg"],
  },
  {
    slug: "spirachka-3",
    title: "Спирачка 3",
    category: "parts",
    images: ["/images/products/det6.jpg", "/images/products/det6-1.jpg"],
  },
  {
    slug: "spirachka-2",
    title: "Спирачка 2",
    category: "parts",
    images: ["/images/products/det5.jpg", "/images/products/det5-1.jpg"],
  },
  {
    slug: "spirachka-1",
    title: "Спирачка 1",
    category: "parts",
    images: ["/images/products/det4.jpg", "/images/products/det4-1.jpg"],
  },
  {
    slug: "pruzhina-dalga-i-kasa",
    title: "Пружина – дълга и къса",
    category: "parts",
    images: ["/images/products/det3.jpg"],
  },
  {
    slug: "mebelno-kolelo-2",
    title: "Мебелно колело 2",
    category: "parts",
    images: ["/images/products/det2.jpg", "/images/products/det2-1.jpg"],
  },
  {
    slug: "mebelno-kolelo-1",
    title: "Мебелно колело 1",
    category: "parts",
    images: ["/images/products/det1.jpg", "/images/products/det1-1.jpg"],
  },
  {
    slug: "velikdenska-postavka-za-8-yaytsa",
    title: "Великденска поставка за 8 яйца",
    category: "displays",
    images: ["/images/products/velikdenska-postavka-za-8-yaytsa.jpg"],
  },
  {
    slug: "velikdenska-postavka-za-1-yaytse",
    title: "Великденска поставка за 1 яйце",
    category: "displays",
    images: ["/images/products/velikdenska-postavka-za-1-yaytse.jpg"],
  },
  {
    slug: "kutii-za-vino-razlichni-razmeri",
    title: "Кутии за вино – различни размери",
    category: "displays",
    images: ["/images/products/kutii-za-vino-razlichni-razmeri.jpg"],
  },
  {
    slug: "mini-displei-za-vino",
    title: "Мини дисплеи за вино",
    category: "displays",
    images: ["/images/products/mini-displei-za-vino.jpg"],
  },
  {
    slug: "darven-displey-kendi",
    title: "Дървен дисплей Кенди",
    category: "displays",
    images: ["/images/products/displey-kendi.jpg"],
  },
  {
    slug: "darven-displey-ino",
    title: "Дървен дисплей ИНО",
    category: "displays",
    images: ["/images/products/darven-displey-ino.jpg"],
  },
  {
    slug: "darven-displey-no-3",
    title: "Дървен дисплей № 3",
    category: "displays",
    images: ["/images/products/darven-displey-n3.jpg"],
  },
  {
    slug: "darven-displey-no4",
    title: "Дървен дисплей №4",
    category: "displays",
    images: ["/images/products/darven-displey-n4.jpg"],
  },
  {
    slug: "vatreshna-gayka",
    title: "Вътрешна гайка",
    category: "auto",
    images: ["/images/products/fullsizerender-2.jpg", "/images/products/fullsizerender-1.jpg"],
  },
  {
    slug: "distantsioner",
    title: "Дистанционер",
    category: "auto",
    images: ["/images/products/fullsizerender.jpg"],
  },
  {
    slug: "pruzhini-za-mehanizmi",
    title: "Пружини за механизми",
    category: "springs",
    images: ["/images/products/pruzhini-za-mehanizmi.jpg"],
  },
];

export const featuredSlugs = [
  "velikdenska-postavka-za-8-yaytsa",
  "velikdenska-postavka-za-1-yaytse",
  "kutii-za-vino-razlichni-razmeri",
  "mini-displei-za-vino",
  "darven-displey-kendi",
  "darven-displey-ino",
  "darven-displey-no-3",
  "darven-displey-no4",
  "pruzhini-za-mehanizmi",
  "vatreshna-gayka",
];

export function getCategory(id: string) {
  return categories.find((category) => category.id === id);
}

export function isCategoryId(id: string): id is CategoryId {
  return categories.some((category) => category.id === id);
}

export function getProduct(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function productsByCategory(id: CategoryId) {
  return products.filter((product) => product.category === id);
}

export function productCountLabel(count: number) {
  return count === 1 ? "1 продукт" : `${count} продукта`;
}

export function featuredProducts() {
  return featuredSlugs
    .map((slug) => getProduct(slug))
    .filter((product): product is Product => Boolean(product));
}

