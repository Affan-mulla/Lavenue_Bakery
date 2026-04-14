import type { Metadata } from "next";
import { Bricolage_Grotesque, Cormorant_Garamond, Great_Vibes, Quintessential } from "next/font/google";
import JsonLd from "./components/JsonLd";
import MagneticCursor from "./components/MagneticCursor";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

const quintessential = Quintessential({
  variable: "--font-quintessential",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  weight: ["400"],
  subsets: ["latin"],
  display: "swap",
});

const bricolageGrotesque = Bricolage_Grotesque({
  variable: "--font-bricolage-grotesque",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://lavenuebakery.com"),
  alternates: {
    canonical: "/",
  },
  title: "L'Avenue Boulangerie | Artisan Bakery Toronto",
  description:
    "L'Avenue Boulangerie on Avenue Road, Toronto. Handcrafted breads, pastries, and seasonal menus in the heart of the city.",
  keywords: [
    "L'Avenue Boulangerie",
    "artisan bakery Toronto",
    "Avenue Road bakery",
    "fresh bread Toronto",
    "pastries Toronto",
    "seasonal bakery menu",
    "Toronto boulangerie",
    "handcrafted baked goods",
  ],
  authors: [
    { name: "L'Avenue Boulangerie", url: "https://lavenuebakery.com" },
    { name: "L'Avenue Bakery Team" },
  ],
  creator: "L'Avenue Boulangerie",
  openGraph: {
    title: "L'Avenue Boulangerie | Artisan Bakery Toronto",
    description:
      "L'Avenue Boulangerie on Avenue Road, Toronto. Handcrafted breads, pastries, and seasonal menus in the heart of the city.",
    type: "website",
    url: "https://lavenuebakery.com",
    siteName: "L'Avenue Boulangerie",
    locale: "en_CA",
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Avenue Boulangerie | Artisan Bakery Toronto",
    description:
      "L'Avenue Boulangerie on Avenue Road, Toronto. Handcrafted breads, pastries, and seasonal menus in the heart of the city.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${quintessential.variable} ${greatVibes.variable} ${bricolageGrotesque.variable} h-full antialiased`}
    >
      <body className="no-js min-h-full flex flex-col">
        <JsonLd />
        <MagneticCursor />
        {children}
      </body>
    </html>
  );
}
