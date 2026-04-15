import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | L'Avenue Boulangerie",
  description: "A visual journal of our craft - breads, pastries, and the art of the bakery.",
  alternates: {
    canonical: "/gallery",
  },
  openGraph: {
    title: "Gallery | L'Avenue Boulangerie",
    description: "A visual journal of artisan breads, pastries, and bakery craftsmanship.",
    url: "https://lavenuebakery.com/gallery",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gallery | L'Avenue Boulangerie",
    description: "A visual journal of artisan breads, pastries, and bakery craftsmanship.",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}