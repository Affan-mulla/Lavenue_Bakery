import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | L'Avenue Boulangerie",
  description:
    "Explore the L'Avenue Boulangerie menu with artisan breads, pastries, seasonal plates, and curated drinks.",
  alternates: {
    canonical: "/menu",
  },
  openGraph: {
    title: "Menu | L'Avenue Boulangerie",
    description:
      "Explore artisan breads, pastries, hot drinks, and cold drinks from L'Avenue Boulangerie.",
    url: "https://lavenuebakery.com/menu",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Menu | L'Avenue Boulangerie",
    description:
      "Explore artisan breads, pastries, hot drinks, and cold drinks from L'Avenue Boulangerie.",
  },
};

export default function MenuLayout({ children }: { children: React.ReactNode }) {
  return children;
}