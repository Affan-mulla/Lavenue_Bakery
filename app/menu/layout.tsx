import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | L'Avenue Boulangerie",
  description:
    "Explore the L'Avenue Boulangerie menu with artisan breads, pastries, seasonal plates, and curated drinks.",
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}