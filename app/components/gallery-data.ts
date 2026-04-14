export type GalleryImage = {
  id: string;
  src: string;
  alt: string;
  category: "breads" | "pastries" | "interior" | "process";
  width: number;
  caption?: string;
};

export const galleryCategories = [
  { id: "all", label: "All" },
  { id: "breads", label: "Breads" },
  { id: "pastries", label: "Pastries" },
  { id: "interior", label: "Interior" },
  { id: "process", label: "Process" },
] as const;

export const galleryImages: GalleryImage[] = [
  {
    id: "breads-baker-scoring",
    src: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&auto=format&fit=crop",
    alt: "Baker scoring dough before it enters the oven.",
    category: "breads",
    width: 2,
    caption: "Scored by hand each morning.",
  },
  {
    id: "breads-sourdough-loaves",
    src: "https://images.unsplash.com/photo-1512058564366-18510be2db19?q=80&w=800&auto=format&fit=crop",
    alt: "Rows of sourdough loaves cooling on wooden shelves.",
    category: "breads",
    width: 1,
  },
  {
    id: "breads-close-crumb",
    src: "https://images.unsplash.com/photo-1586444248902-2f64eddc13df?q=80&w=800&auto=format&fit=crop",
    alt: "Close-up of artisan bread crust and open crumb texture.",
    category: "breads",
    width: 2,
  },
  {
    id: "breads-artisan-loaf",
    src: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?q=80&w=800&auto=format&fit=crop",
    alt: "Fresh artisan loaf presented on a bakery counter.",
    category: "breads",
    width: 1,
  },
  {
    id: "pastries-croissants",
    src: "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?q=80&w=800&auto=format&fit=crop",
    alt: "Golden croissants cooling after the morning bake.",
    category: "pastries",
    width: 2,
    caption: "Laminated with cultured butter.",
  },
  {
    id: "pastries-pain-au-chocolat",
    src: "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?q=80&w=800&auto=format&fit=crop",
    alt: "Pain au chocolat arranged for early service.",
    category: "pastries",
    width: 1,
  },
  {
    id: "pastries-fruit-tart",
    src: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?q=80&w=800&auto=format&fit=crop",
    alt: "Seasonal fruit tart with glossy finish and pastry cream.",
    category: "pastries",
    width: 2,
  },
  {
    id: "pastries-morning-set",
    src: "https://images.unsplash.com/photo-1473093295043-cdd812d0e601?q=80&w=800&auto=format&fit=crop",
    alt: "Morning pastry setup beside coffee service.",
    category: "pastries",
    width: 1,
  },
  {
    id: "interior-counter-light",
    src: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop",
    alt: "Warm bakery interior with pastry counter and seating.",
    category: "interior",
    width: 2,
    caption: "A calm room from first espresso to close.",
  },
  {
    id: "interior-window-seating",
    src: "https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?q=80&w=800&auto=format&fit=crop",
    alt: "Cafe window seating with soft natural daylight.",
    category: "interior",
    width: 1,
  },
  {
    id: "interior-main-room",
    src: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?q=80&w=800&auto=format&fit=crop",
    alt: "Main bakery room with communal tables and open sightlines.",
    category: "interior",
    width: 2,
  },
  {
    id: "interior-evening-glow",
    src: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?q=80&w=800&auto=format&fit=crop",
    alt: "Evening interior glow across a polished service bar.",
    category: "interior",
    width: 1,
  },
  {
    id: "process-kneading-dough",
    src: "https://images.unsplash.com/photo-1483695028939-5bb13f8648b0?q=80&w=800&auto=format&fit=crop",
    alt: "Hands kneading enriched dough on a floured bench.",
    category: "process",
    width: 2,
    caption: "Technique before speed.",
  },
  {
    id: "process-flour-motion",
    src: "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?q=80&w=800&auto=format&fit=crop",
    alt: "Flour dust rising during morning prep in the bake room.",
    category: "process",
    width: 1,
  },
  {
    id: "process-oven-transfer",
    src: "https://images.unsplash.com/photo-1458642849426-cfb724f15ef7?q=80&w=800&auto=format&fit=crop",
    alt: "Breads being transferred to the oven deck with peels.",
    category: "process",
    width: 2,
  },
  {
    id: "process-lamination",
    src: "https://images.unsplash.com/photo-1464306076886-da185f6a9d05?q=80&w=800&auto=format&fit=crop",
    alt: "Pastry lamination process on a stainless steel workbench.",
    category: "process",
    width: 1,
  },
];