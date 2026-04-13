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

export const heroLines = [
  "Where the ideas thrive,",
  "where kitchen and beer yes",
  "they merge for become alive.",
];

export const heroImages = [
  {
    src: "https://images.unsplash.com/photo-1681218079567-35aef7c8e7e4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Seafood plate staged on marble.",
  },
  {
    src: "https://images.unsplash.com/photo-1609590981063-d495e2914ce4?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    alt: "Editorial overhead food spread.",
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

export const storyImages = {
  team: "https://picsum.photos/seed/lavenue-founders/960/760",
  archive: "https://picsum.photos/seed/lavenue-archive/720/900",
};

export const galleryImages = [
  "https://images.unsplash.com/photo-1568254183919-78a4f43a2877?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://img1.wsimg.com/isteam/ip/1b79d52e-a81a-482a-91ea-bf71e7d0bc6e/REG02061.jpg/:/rs=w:2320,h:1740",
  "https://img1.wsimg.com/isteam/ip/1b79d52e-a81a-482a-91ea-bf71e7d0bc6e/REG02100.jpg/:/rs=w:2320,h:1740",
  "https://img1.wsimg.com/isteam/ip/1b79d52e-a81a-482a-91ea-bf71e7d0bc6e/REG03615.jpg/:/rs=w:1160,h:1547",
  "https://img1.wsimg.com/isteam/ip/1b79d52e-a81a-482a-91ea-bf71e7d0bc6e/REG02053.jpg/:/cr=t:0%25,l:0%25,w:88.89%25,h:88.89%25/rs=w:2320,h:1740",
  "https://img1.wsimg.com/isteam/ip/1b79d52e-a81a-482a-91ea-bf71e7d0bc6e/REG05332.jpg/:/rs=w:2320,h:1740  ",
];

export const reservationRows = [
  {
    label: "Address",
    value: "1850 Avenue Road,\n Toronto, Ontario M5M 3Z5, Canada",
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
