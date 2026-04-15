export type MenuItemVariant = {
  label: string;
  price: string;
};

export type MenuItem = {
  id: string;
  name: string;
  basePrice?: string;
  description?: string;
  variants?: MenuItemVariant[];
  image?: string;
  tag?: "popular" | "new" | "seasonal";
};

export type MenuCategory = {
  id: string;
  title: string;
  subtitle?: string;
  items: MenuItem[];
};

export const menuData: MenuCategory[] = [
  {
    id: "breads",
    title: "Breads",
    subtitle: "Baked fresh every morning",
    items: [
      {
        id: "baguette",
        name: "Baguette",
        basePrice: "$4.25",
        description: "Baked fresh daily",
        image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "demi-baguette",
        name: "Demi Baguette",
        basePrice: "$2.30",
        description: "Baked fresh daily",
        image: "https://images.unsplash.com/photo-1603377928626-72e2f5d9f9f2?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "breakfast-baguette",
        name: "Breakfast Baguette",
        basePrice: "$5.25",
        description: "Baked fresh daily - Butter and Jam",
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "sourdough-loaf",
        name: "Sourdough Loaf",
        basePrice: "$7.50",
        description: "Large",
        image: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "sourdough-walnut",
        name: "Sourdough - Walnut & Cranberry",
        basePrice: "$8.75",
        description: "Baked fresh daily",
        image: "https://images.unsplash.com/photo-1585478259715-876acc5be8eb?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "sourdough-olive",
        name: "Sourdough - Olive",
        basePrice: "$8.75",
        description: "Baked fresh daily",
        image: "https://images.unsplash.com/photo-1608198093002-ad4e005484ec?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "sourdough-sunflower",
        name: "Sourdough - Sunflower & Pumpkin Seed",
        basePrice: "$8.75",
        description: "Baked fresh daily",
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "flatbread",
        name: "Gourmet Flat Bread",
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=600&auto=format&fit=crop",
        variants: [
          { label: "Medium", price: "$7.50" },
          { label: "Large", price: "$10.00" },
        ],
      },
    ],
  },
  {
    id: "pastries",
    title: "Pastries",
    subtitle: "Laminated. Layered. Precise.",
    items: [
      {
        id: "butter-croissant",
        name: "Butter Croissant",
        tag: "popular",
        image: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=600&auto=format&fit=crop",
        variants: [
          { label: "Original", price: "$4.00" },
          { label: "Nutella", price: "$6.35" },
          { label: "Nutella-Banana-Walnut", price: "$6.35" },
          { label: "Hazelnut", price: "$5.25" },
          { label: "Almond", price: "$5.25" },
          { label: "Chocolate-Almond", price: "$5.50" },
          { label: "Pistachio", price: "$5.60" },
          { label: "Chocolate-Pistachio", price: "$5.70" },
          { label: "Blueberry-Almond", price: "$5.85" },
          { label: "Raspberry-Almond", price: "$5.85" },
          { label: "Chocolate-Blueberry", price: "$5.85" },
          { label: "Chocolate-Raspberry", price: "$5.85" },
        ],
      },
      {
        id: "tarts",
        name: "Tarts",
        image: "https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?q=80&w=600&auto=format&fit=crop",
        variants: [
          { label: "Lemon", price: "$8.50" },
          { label: "Chocolate", price: "$8.50" },
          { label: "Fruit", price: "$8.50" },
          { label: "Pistachio-Peach", price: "$8.50" },
        ],
      },
      {
        id: "eclair",
        name: "Eclair",
        image: "https://images.unsplash.com/photo-1603532648955-039310d9ed75?q=80&w=600&auto=format&fit=crop",
        variants: [
          { label: "Classic", price: "$6.75" },
          { label: "Hazelnut", price: "$6.75" },
        ],
      },
      {
        id: "opera",
        name: "Opera",
        basePrice: "$8.50",
        image: "https://images.unsplash.com/photo-1571115177098-24ec42ed204d?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "tiramisu",
        name: "Tiramisu Cup",
        basePrice: "$8.50",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "cookie",
        name: "Cookie",
        image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600&auto=format&fit=crop",
        variants: [
          { label: "Almond", price: "$5.50" },
          { label: "Pistachio", price: "$5.50" },
          { label: "Hazelnut", price: "$5.50" },
          { label: "Chocolate", price: "$5.50" },
        ],
      },
    ],
  },
  {
    id: "hot-drinks",
    title: "Hot Drinks",
    subtitle: "Sourced. Roasted. Served.",
    items: [
      {
        id: "espresso",
        name: "Espresso",
        basePrice: "$3.10",
        image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "americano",
        name: "Americano",
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=600&auto=format&fit=crop",
        variants: [
          { label: "Small", price: "$3.50" },
          { label: "Medium", price: "$3.75" },
          { label: "Large", price: "$4.10" },
        ],
      },
      {
        id: "macchiato",
        name: "Macchiato",
        basePrice: "$4.00",
        image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "cortado",
        name: "Cortado",
        basePrice: "$4.35",
        image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?q=80&w=600&auto=format&fit=crop",
      },
      {
        id: "cappuccino",
        name: "Cappuccino",
        image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=600&auto=format&fit=crop",
        variants: [
          { label: "Small", price: "$5.10" },
          { label: "Medium", price: "$5.25" },
          { label: "Large", price: "$5.75" },
        ],
      },
      {
        id: "latte",
        name: "Latte",
        image: "https://images.unsplash.com/photo-1561047029-3000c68339ca?q=80&w=600&auto=format&fit=crop",
        variants: [
          { label: "Small", price: "$5.10" },
          { label: "Medium", price: "$5.25" },
          { label: "Large", price: "$5.75" },
        ],
      },
      {
        id: "flat-white",
        name: "Flat White",
        image: "https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop",
        variants: [
          { label: "Small", price: "$5.10" },
          { label: "Medium", price: "$5.25" },
          { label: "Large", price: "$5.75" },
        ],
      },
      {
        id: "french-hot-chocolate",
        name: "French Hot Chocolate",
        image: "https://images.unsplash.com/photo-1542990253-0d0f5be5f0ed?q=80&w=600&auto=format&fit=crop",
        variants: [
          { label: "Small", price: "$5.65" },
          { label: "Medium", price: "$6.75" },
          { label: "Large", price: "$7.35" },
        ],
      },
      {
        id: "hot-chocolate",
        name: "Hot Chocolate",
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=600&auto=format&fit=crop",
        variants: [
          { label: "Small", price: "$4.75" },
          { label: "Medium", price: "$5.75" },
          { label: "Large", price: "$6.25" },
        ],
      },
      {
        id: "hot-tea",
        name: "Hot Tea",
        basePrice: "$3.75",
        image: "https://images.unsplash.com/photo-1597318038686-43f3e5a4f4d4?q=80&w=600&auto=format&fit=crop",
      },
    ],
  },
  {
    id: "cold-drinks",
    title: "Cold Drinks",
    subtitle: "Chilled. Refreshing.",
    items: [
      {
        id: "bottles",
        name: "Bottles",
        image: "https://images.unsplash.com/photo-1625772299848-391b6a87d7b3?q=80&w=600&auto=format&fit=crop",
        variants: [
          { label: "Soda", price: "$2.50" },
          { label: "Perrier", price: "$2.65" },
          { label: "Evian", price: "$3.50" },
          { label: "Fillette Mineral Water", price: "$4.50" },
        ],
      },
      {
        id: "cans",
        name: "Cans",
        image: "https://images.unsplash.com/photo-1581636625402-29b2a704ef13?q=80&w=600&auto=format&fit=crop",
        variants: [
          { label: "Soda", price: "$2.00" },
          { label: "San Pellegrino - Orange", price: "$2.65" },
          { label: "San Pellegrino - Lemon", price: "$2.65" },
          { label: "San Pellegrino - Blood Orange", price: "$2.65" },
        ],
      },
    ],
  },
];

export default menuData;