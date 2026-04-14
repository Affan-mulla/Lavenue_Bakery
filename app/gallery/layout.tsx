import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery | L'Avenue Boulangerie",
  description: "A visual journal of our craft - breads, pastries, and the art of the bakery.",
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}