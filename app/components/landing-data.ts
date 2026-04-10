export type MenuItem = {
  name: string;
  price: string;
  note?: string;
};

export type MenuGroup = {
  title: string;
  items: MenuItem[];
};

export type MenuEntry = {
  id: string;
  group: string;
  index: number;
  name: string;
  price: string;
  note?: string;
  image: string;
};

function getPreviewImage(itemName: string, group: string): string {
  const itemSlug = itemName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
  const groupSlug = group.toLowerCase().replace(/\s+/g, "-");

  return `https://picsum.photos/seed/${groupSlug}-${itemSlug}/1200/900`;
}

const breads: MenuItem[] = [
  { name: "Baguette", price: "$4.25", note: "Baked fresh daily" },
  { name: "Demi Baguette", price: "$2.30", note: "Baked fresh daily" },
  { name: "Breakfast Baguette", price: "$5.25", note: "Butter and Jam" },
  { name: "Sourdough Loaf", price: "$7.50", note: "Large" },
  {
    name: "Sourdough Loaf - Walnut & Cranberry",
    price: "$8.75",
    note: "Baked fresh daily",
  },
  { name: "Sourdough Loaf - Olive", price: "$8.75", note: "Baked fresh daily" },
  {
    name: "Sourdough Loaf - Sunflower - Pumpkin seed",
    price: "$8.75",
    note: "Baked fresh daily",
  },
  { name: "Gourmet Flat Bread (Medium)", price: "$7.50" },
  { name: "Gourmet Flat Bread (Large)", price: "$10.00" },
];

const pastries: MenuItem[] = [
  { name: "Butter Croissant - Original", price: "$4.00" },
  { name: "Butter Croissant - Nutella", price: "$6.35" },
  { name: "Butter Croissant - Nutella-Banana-Walnut", price: "$6.35" },
  { name: "Butter Croissant - Hazelnut", price: "$5.25" },
  { name: "Butter Croissant - Almond", price: "$5.25" },
  { name: "Butter Croissant - Chocolate-Almond", price: "$5.50" },
  { name: "Butter Croissant - Pistachio", price: "$5.60" },
  { name: "Butter Croissant - Chocolate-Pistachio", price: "$5.70" },
  { name: "Butter Croissant - Blueberry-Almond", price: "$5.85" },
  { name: "Butter Croissant - Raspberry-Almond", price: "$5.85" },
  { name: "Butter Croissant - Chocolate-Blueberry", price: "$5.85" },
  { name: "Butter Croissant - Chocolate-Raspberry", price: "$5.85" },
  { name: "Eclair - Classic", price: "$6.75" },
  { name: "Eclair - Hazelnut", price: "$6.75" },
  { name: "Cookie - Almond | Pistachio | Hazelnut", price: "$5.50" },
  { name: "Cookie - Chocolate", price: "$5.50" },
];

const desserts: MenuItem[] = [
  { name: "Tart - Lemon", price: "$8.50" },
  { name: "Tart - Chocolate", price: "$8.50" },
  { name: "Tart - Fruit", price: "$8.50" },
  { name: "Tart - Pistachio-Peach", price: "$8.50" },
  { name: "Opera", price: "$8.50" },
  { name: "Tiramisu Cup", price: "$8.50" },
];

export const menuGroups: MenuGroup[] = [
  { title: "Breads", items: breads },
  { title: "Pastries", items: pastries },
  { title: "Desserts", items: desserts },
];

export const INITIAL_MENU_ITEMS = 4;

export const menuEntriesByGroup = menuGroups.map((group) => ({
  title: group.title,
  entries: group.items.map((item, index) => ({
    id: `${group.title}-${item.name}-${index}`,
    group: group.title,
    index: index + 1,
    name: item.name,
    price: item.price,
    note: item.note,
    image: getPreviewImage(item.name, group.title),
  })),
}));

export const processSteps = [
  {
    title: "Slow Fermentation",
    text: "Dough rests overnight to build aroma, tenderness, and a naturally complex crumb.",
  },
  {
    title: "Lamination",
    text: "Butter is folded by hand for a crisp shell, honeyed interior, and clean layered structure.",
  },
  {
    title: "Final Service",
    text: "Every pastry is finished to order with visual polish, warmth, and uncompromised freshness.",
  },
];
