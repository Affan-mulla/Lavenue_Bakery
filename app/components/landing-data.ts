export type FeatureItem = {
  title: string;
  copy: string;
  shape: "circle" | "diamond" | "star";
};

export type ReviewItem = {
  quote: string;
  author: string;
  city: string;
};

// Keep only media/content objects consumed by rendered sections.
export const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1681218079567-35aef7c8e7e4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Fresh artisan sourdough and laminated pastries on a bakery counter.",
  },
  {
    src: "https://images.unsplash.com/photo-1609590981063-d495e2914ce4?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Golden croissants and morning pastries arranged for service.",
  },
];

export const featureItems: FeatureItem[] = [
  {
    title: "Breads",
    copy: "We combine street-food instinct with premium ingredients and craft-driven cooking discipline.",
    shape: "circle",
  },
  {
    title: "Pastries",
    copy: "15 craft beers from around the world in constant rotation with pairings for every plate.",
    shape: "diamond",
  },
  {
    title: "Meals",
    copy: "From signature cocktails to spirit-free options, the bar list is designed for all tastes.",
    shape: "star",
  },
];

export const reviewItems: ReviewItem[] = [
  {
    quote:
      "Great food, location and service. Fried dishes were crisp and light, absolutely recommended.",
    author: "Giulia M.",
    city: "Treviso",
  },
  {
    quote:
      "The pairing idea is brilliant: artisan bakes and rotating craft beers in one warm atmosphere.",
    author: "Lorenzo R.",
    city: "Padova",
  },
  {
    quote:
      "Impeccable hospitality and memorable flavors. You feel the kitchen precision in every plate.",
    author: "Chiara B.",
    city: "Venezia",
  },
  {
    quote:
      "A place with identity. Refined but never cold, with real personality from service to dessert.",
    author: "Marco T.",
    city: "Montebelluna",
  },
];

export const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=1200&auto=format&fit=crop",
    alt: "Freshly baked croissants cooling on a bakery tray.",
  },
  {
    src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=1200&auto=format&fit=crop",
    alt: "Artisan sourdough loaves lined up on wooden shelves.",
  },
  {
    src: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=1200&auto=format&fit=crop",
    alt: "Flaky pain au chocolat arranged for the morning rush.",
  },
  {
    src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=1200&auto=format&fit=crop",
    alt: "Seasonal fruit tart finished with meticulous pastry detail.",
  },
  {
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
    alt: "Baker scoring dough before loading breads into the oven.",
  },
  {
    src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=1200&auto=format&fit=crop",
    alt: "Morning espresso and pastry pairing at a neighborhood bakery.",
  },
];

export const reservationRows = [
  {
    label: "Address",
    value: "1850 Avenue Road, Toronto, Ontario M5M 3Z5",
  },
  {
    label: "Telephone",
    value: "(416) 333-4455",
  },
  {
    label: "Mail",
    value: "info@lavenuebakery.com",
  },
];
