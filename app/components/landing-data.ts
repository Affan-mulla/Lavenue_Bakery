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
    copy: "Naturally leavened loaves baked fresh each morning with premium ingredients and artisan technique.",
    shape: "circle",
  },
  {
    title: "Pastries",
    copy: "Laminated viennoiserie and seasonal pastries are prepared daily for delicate layers and balanced flavor.",
    shape: "diamond",
  },
  {
    title: "Meals",
    copy: "Savory bakes, sandwiches, and light plates are crafted for a warm neighborhood bakery experience.",
    shape: "star",
  },
];

export const reviewItems: ReviewItem[] = [
  {
    quote:
      "Lovely cafe. Their staff are friendly. The raspberry pistachio croissant is great.",
    author: "Diana Lam",
    city: "Midtown Toronto",
  },
  {
    quote:
      "Charming little cafe serving incredibly delicious and fresh sandwiches and pastries. The staff is amazing as well. We look forward to going back.",
    author: "Ellie P.",
    city: "Forest Hill",
  },
  {
    quote:
      "Delicate, unique, and tasty pastries and fine coffee! The owner has put their heart into keeping the quality of their food and service high. ",
    author: "Tikta",
    city: "Lawrence Park",
  },
  {
    quote:
      "The best place for pistachio croissants in the city. Great lattes too. Owner is super friendly and loves to chat. Great spot in midtown, don't miss it.",
    author: "Michael Law",
    city: "Rosedale",
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
