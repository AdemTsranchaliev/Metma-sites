export const menuNav = [
  { label: "Начало", href: "/" },
  { label: "Продукти", href: "/produkti", children: true },
  { label: "Блог", href: "/blog" },
  { label: "За нас", href: "/za-nas" },
  { label: "Контакти", href: "/kontakti" },
] as const;

export const menuCategories = [
  { label: "Бои", href: "/produkti/boi", hint: "Таблетки, капсули и течни" },
  { label: "Комплекти", href: "/produkti/komplekti", hint: "Всичко за боядисване" },
  { label: "Украси", href: "/produkti/ukrasi", hint: "Стикери, трева и яйца" },
  { label: "Дисплеи", href: "/produkti/displei", hint: "Рекламни стойки" },
] as const;

export const menuContact = {
  phone: "+359 884 624 024",
  phoneHref: "tel:+359884624024",
  email: "contacts@metma-bg.com",
  emailHref: "mailto:contacts@metma-bg.com",
} as const;
