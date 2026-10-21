export const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/people/METMA/100090122576238/",
    color: "#3b5998",
    icon: "facebook",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/metma.official/?igshid=ZDdkNTZiNTM%3D",
    color: "#ea2c59",
    icon: "instagram",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@metma.usa",
    color: "#fe2c55",
    icon: "tiktok",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCZZqQY5cnk_uKcD6HQPoRfQ",
    color: "#a82400",
    icon: "youtube",
  },
  {
    label: "X",
    href: "https://twitter.com/salesmetma",
    color: "#000000",
    icon: "x",
  },
] as const;

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "About us", href: "/#aboutus" },
  { label: "Contacts", href: "/#contacts" },
] as const;

export const contact = {
  location: "444 N NORTHWEST HWY STE 345, PARK RIDGE 60068, ILLINOIS",
  email: "sales@metma-usa.com",
  phone: "1-847-868-6520",
  phoneHref: "tel:+18478686520",
};

export const banners = [
  { src: "/images/banner-1.webp", alt: "Metma egg coloring kits" },
  { src: "/images/banner-2.webp", alt: "Metma Easter egg dyes" },
  { src: "/images/banner-3.webp", alt: "Metma egg decorating kits" },
];

export const categories = [
  {
    title: "Classic Kits",
    href: "/products#classic",
    image: "/images/classic-kits.webp",
    fit: "contain" as const,
  },
  {
    title: "Children Kits",
    href: "/products#children",
    image: "/images/children-kits.webp",
    fit: "cover" as const,
  },
  {
    title: "Display",
    href: "/products#crafts",
    image: "/images/display-home.webp",
    fit: "contain" as const,
  },
  {
    title: "Egg Decoration",
    href: "/products#eggdecoration",
    image: "/images/egg-decoration.webp",
    fit: "cover" as const,
  },
];

export const team = [
  { name: "LYUBOMIR ILIEV", role: "Owner", image: "/images/lubo.webp" },
  { name: "ZAFER MYUMYUNOV", role: "CEO", image: "/images/zafer.webp" },
  { name: "VASILKA NONOVA", role: "SEO", image: "/images/vasilka.webp" },
];

export const productionImages = [
  { src: "/images/production-1.webp", alt: "Metma production" },
  { src: "/images/production-2.webp", alt: "Metma packaging line" },
  { src: "/images/production-3.webp", alt: "Metma Easter egg dyes" },
];

const uploads = "https://metma-usa.com/wp-content/uploads";

export type CatalogProduct = {
  name: string;
  description: string;
  contents?: string;
  front: string;
  back?: string;
  instructions?: string;
};

export const classicKits: CatalogProduct[] = [
  {
    name: "Easy Coloring",
    description:
      "This five color Easter set is easy to use and keeps clean the working area. Simply add warm water and vinegar to the tablet in the cup and wait until the desired color is obtained. Drawing patterns and designs with the wax crayon gives the eggs customized look.",
    contents: "5 egg dye tablets, 5 paper cups, 1 crayon, 1 metal holder",
    front: "/images/easy-front.webp",
    back: "/images/easy-back.webp",
    instructions: `${uploads}/2026/07/S-001-D-EASY-COLORING-KIT_PRINT_SMR1.jpg`,
  },
  {
    name: "Basic",
    description:
      "This six color Easter set provides vibrant colors for up to 60 eggs and is easy to use by the whole family. Create cheerful eggs using the thermal and other stickers for a festive Easter holiday.",
    contents:
      "6 egg dye tablets, 34 stickers, 8 egg stands, 3 thermal stickers, 1 metal holder",
    front: "/images/basic.webp",
    instructions: `${uploads}/2024/02/S-005-Instruction-BASIC.pdf`,
  },
  {
    name: "Luxury",
    description:
      "This nine color Easter set turns the egg decorating tradition into real fun when creating beautiful patterns using the wax crayon or applying the thermal and other colorful stickers.",
    contents:
      "9 egg dye tablets, 41 stickers, 12 egg stands, 6 thermal stickers, 1 crayon, 2 metal holders",
    front: "/images/luxury-front.webp",
    back: "/images/luxury-back.webp",
    instructions: `${uploads}/2024/02/S-006-Instruction-LUXURY.pdf`,
  },
];

export const childrenKits: CatalogProduct[] = [
  {
    name: "Robo eggs",
    description:
      "Creating robot characters has never been so easy and amusing. This children kit facilitates the funny side of Easter egg decorating.",
    contents:
      "5 liquid egg dyes, 2 accessory sheets, 8 egg stands, 6 thermal stickers, 2 sheets tape strips, 1 metal holder",
    front: "/images/robo-front.webp",
    back: "/images/robo-back.webp",
    instructions: `${uploads}/2024/02/S-014-instrustions-ROBO-EGGS.pdf`,
  },
  {
    name: "Planet eggs",
    description:
      "Universe meets Easter in this classy egg decorating kit. Eggs are turned into fabulous space objects.",
    contents:
      "5 liquid egg dyes, 2 accessory sheets, 8 egg stands, 6 thermal stickers, 1 sheet tape strips, 1 metal holder",
    front: "/images/planet-front.webp",
    back: "/images/planet-back.webp",
    instructions: `${uploads}/2024/02/S-015-instrustions-PLANET-EGGS.pdf`,
  },
  {
    name: "Glowing eggs",
    description:
      "A different Easter look has been provided with this amusing children kit for creating decorations in neon colors.",
    contents:
      "5 neon egg dye tablets, 47 neon stickers, 6 thermal stickers, 8 egg stands, 1 metal holder",
    front: "/images/glowing-front.webp",
    back: "/images/glowing-back.webp",
    instructions: `${uploads}/2024/02/S-016-Instructions-GLOWING-EGGS.pdf`,
  },
  {
    name: "Shake that Easter",
    description:
      "An amusing egg coloring kit providing interesting coloring technique for a classy and colorful eggs.",
    contents:
      "5 liquid egg dyes, 5 plastic bags, 5 twist ties, 6 thermal stickers, 8 egg stands",
    front: "/images/shake-front.webp",
    back: "/images/shake-back.webp",
    instructions: `${uploads}/2024/02/S-017-instrustions-SHAKE-THAT-EASTER.pdf`,
  },
  {
    name: "Unicorns",
    description:
      "Fairy tales come to live with this colorful Easter kit. With plenty of stickers and six unicorn thermal stickers the eggs turn into beautiful fantasy characters.",
    contents:
      "5 liquid egg dyes, 141 stickers, 8 egg stands, 6 thermal stickers, 1 metal holder",
    front: "/images/unicorns-front.webp",
    back: "/images/unicorns-back.webp",
    instructions: `${uploads}/2024/02/S-007-Instruction-UNICORNS.pdf`,
  },
  {
    name: "Faces eggs",
    description:
      "Funny faces are easily created by using this amusing Easter decorating kit for children.",
    contents: "5 liquid egg dye, 66 stickers, 8 egg stands, 1 metal holder",
    front: "/images/faces-front.webp",
    back: "/images/faces-back.webp",
    instructions: `${uploads}/2024/02/S-008-Instruction-FACES-EGGS.pdf`,
  },
  {
    name: "Golden Pearl",
    description:
      "Gold is timeless so is the Easter tradition. Create beautiful glittering eggs with this color-and-pearl easy to use kit and make a classy Easter atmosphere.",
    contents: "5 pearl egg dyes, 2 pairs of gloves, 8 egg stands",
    front: "/images/pearl-front.webp",
    back: "/images/pearl-back.webp",
    instructions: `${uploads}/2024/02/S-009-Instruction-GOLDEN-PEARL.pdf`,
  },
  {
    name: "Hologram art",
    description:
      "This amusing children kit provides the opportunity to create shiny and colorful holographic patterns on the Easter eggs.",
    contents:
      "5 liquid egg dyes, 4 hologram foil sheets, 30 stickers, 8 egg stands, 1 metal holder",
    front: "/images/hologram-front.webp",
    back: "/images/hologram-back.webp",
    instructions: `${uploads}/2024/02/S-010-Instruction-HOLOGRAM-ART.pdf`,
  },
  {
    name: "Marbleous",
    description:
      "Magnificent marble eggs are so easy to make now with this classy children kit. With two different decorating techniques it is now real fun to recreate the marble shades on the Easter eggs.",
    contents:
      "5 marble egg dyes, 4 egg dye tablets, 2 pair of gloves, 12 egg stands, 2 cotton pads, 1 metal holder",
    front: "/images/marble-front.webp",
    back: "/images/marble-back.webp",
    instructions: `${uploads}/2024/02/S-011-instrustions-MARBLEOUS.pdf`,
  },
  {
    name: "Heroes",
    description:
      "Easily transform the Eater eggs into heroes with this funny and children kit.",
    contents:
      "5 liquid egg dyes, 6 thermal stickers, 8 egg stands, 1 sheet tape strips, 2 accessory sheets, 1 metal holder",
    front: "/images/heroes-front.webp",
    back: "/images/heroes-back.webp",
    instructions: `${uploads}/2024/02/S-012-instrustions-HEROES.pdf`,
  },
];

export const decorations: CatalogProduct[] = [
  {
    name: "Egg stamps for decoration",
    description:
      "This amusing four – stamp kit is ideal for applying beautiful motives on the Easter eggs.",
    contents: "4 rubber stamps",
    front: "/images/stamps.webp",
  },
  {
    name: "Easter shrink wraps",
    description:
      "These easy to use wraps are perfect for creating beautiful designs on the Easter eggs. They can also be used when you have a cracked egg.",
    contents: "4 shrink wraps",
    front: "/images/wraps.webp",
  },
  {
    name: "Easter coloring book",
    description:
      "A book with Easter motives for coloring providing amusing activity for children.",
    front: "/images/coloring-book.webp",
  },
  {
    name: "Egg decoration felt – tip pens",
    description:
      "These felt – tip pens are ideal for creating drawings on the egg shells and providing lots of fun while decorating.",
    contents: "3 felt – tip pens",
    front: "/images/felt-tips.webp",
  },
  {
    name: "Stickers for Easter eggs",
    description: "Stickers for decorating Easter eggs.",
    contents: "29 stickers",
    front: "/images/stickers.webp",
  },
];
