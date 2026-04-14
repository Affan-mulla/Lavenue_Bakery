export type MenuCategory = {
  id: string;
  title: string;
  subtitle: string;
};

export type MenuItem = {
  id: string;
  category: string;
  name: string;
  description: string;
  price: string;
  tag?: "seasonal" | "popular" | "new";
};

export const menuCategories: MenuCategory[] = [
  { id: "breads", title: "Breads", subtitle: "Stone-milled. Slow fermented." },
  { id: "pastries", title: "Pastries", subtitle: "Laminated. Layered. Precise." },
  { id: "seasonal", title: "Seasonal", subtitle: "Market-driven. Daily changing." },
  { id: "drinks", title: "Drinks", subtitle: "Coffee. Tea. House presses." },
];

export const menuItems: MenuItem[] = [
  {
    id: "breads-country-sourdough",
    category: "breads",
    name: "Country Sourdough",
    description: "72-hour fermentation, stone-milled flour, dark crust",
    price: "$9",
    tag: "popular",
  },
  {
    id: "breads-whole-wheat-miche",
    category: "breads",
    name: "Whole Wheat Miche",
    description: "Heritage wheat, dense crumb, nutty finish",
    price: "$11",
  },
  {
    id: "breads-seeded-rye",
    category: "breads",
    name: "Seeded Rye",
    description: "Dark rye, caraway, sunflower seeds",
    price: "$10",
  },
  {
    id: "breads-focaccia",
    category: "breads",
    name: "Focaccia",
    description: "Olive oil, flaky salt, rosemary",
    price: "$8",
  },
  {
    id: "pastries-butter-croissant",
    category: "pastries",
    name: "Butter Croissant",
    description: "AOP butter, 27 layers",
    price: "$5",
    tag: "popular",
  },
  {
    id: "pastries-pain-au-chocolat",
    category: "pastries",
    name: "Pain au Chocolat",
    description: "Valrhona dark chocolate",
    price: "$6",
  },
  {
    id: "pastries-kouign-amann",
    category: "pastries",
    name: "Kouign Amann",
    description: "Caramelised, flaky, Breton style",
    price: "$7",
  },
  {
    id: "pastries-fruit-tart",
    category: "pastries",
    name: "Fruit Tart",
    description: "Seasonal pastry cream, fresh fruit",
    price: "$9",
    tag: "new",
  },
  {
    id: "seasonal-spring-asparagus-tartine",
    category: "seasonal",
    name: "Spring Asparagus Tartine",
    description: "Asparagus ribbons, whipped ricotta, lemon zest",
    price: "$14",
    tag: "seasonal",
  },
  {
    id: "seasonal-rhubarb-danish",
    category: "seasonal",
    name: "Rhubarb Danish",
    description: "Poached rhubarb, vanilla glaze, cultured butter dough",
    price: "$8",
    tag: "seasonal",
  },
  {
    id: "seasonal-pea-pesto-focaccia",
    category: "seasonal",
    name: "Pea Pesto Focaccia",
    description: "Sweet peas, basil pesto, shaved pecorino",
    price: "$12",
    tag: "seasonal",
  },
  {
    id: "seasonal-strawberry-cream-brioche",
    category: "seasonal",
    name: "Strawberry Cream Brioche",
    description: "Ontario strawberries, mascarpone cream, citrus sugar",
    price: "$10",
    tag: "seasonal",
  },
  {
    id: "drinks-espresso",
    category: "drinks",
    name: "Espresso",
    description: "House blend, short extraction",
    price: "$4",
  },
  {
    id: "drinks-cortado",
    category: "drinks",
    name: "Cortado",
    description: "Equal parts espresso and steamed milk",
    price: "$5",
  },
  {
    id: "drinks-flat-white",
    category: "drinks",
    name: "Flat White",
    description: "Double ristretto with velvety microfoam",
    price: "$6",
  },
  {
    id: "drinks-house-lemonade",
    category: "drinks",
    name: "House Lemonade",
    description: "Cold-pressed lemon, cane syrup, sparkling water",
    price: "$5",
  },
];