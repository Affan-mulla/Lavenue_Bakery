import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Menu | L'Avenue Boulangerie",
  description:
    "Explore L'Avenue Boulangerie's full menu. Artisan breads, laminated pastries, seasonal items, coffee and drinks. 1850 Avenue Road, Toronto.",
  robots: {
    index: true,
    follow: true,
  },
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