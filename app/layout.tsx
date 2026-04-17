import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Cormorant_Garamond, Great_Vibes, Quintessential } from "next/font/google";
import PreconnectHints from "./components/PreconnectHints";
import JsonLd from "./components/JsonLd";
import MagneticCursor from "./components/MagneticCursor";
import SmoothScroll from "./components/SmoothScroll";
import PageTransition from "./components/layout/PageTransition";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  display: "block",
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
  applicationName: "L'Avenue Boulangerie",
  metadataBase: new URL("https://lavenuebakery.com"),
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
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
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "L'Avenue Boulangerie | Artisan Bakery Toronto",
    description:
      "L'Avenue Boulangerie on Avenue Road, Toronto. Handcrafted breads, pastries, and seasonal menus in the heart of the city.",
    type: "website",
    url: "https://lavenuebakery.com",
    siteName: "L'Avenue Boulangerie",
    locale: "en_CA",
    images: [
      {
        url: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1200&h=630&auto=format&fit=crop",
        width: 1200,
        height: 630,
        alt: "L'Avenue Boulangerie fresh croissant and pastry display",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "L'Avenue Boulangerie | Artisan Bakery Toronto",
    description:
      "L'Avenue Boulangerie on Avenue Road, Toronto. Handcrafted breads, pastries, and seasonal menus in the heart of the city.",
    images: ["https://images.unsplash.com/photo-1555507036-ab1f4038808a?q=80&w=1200&h=630&auto=format&fit=crop"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a1220",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${cormorant.variable} ${quintessential.variable} ${greatVibes.variable} ${bricolageGrotesque.variable} h-full antialiased`}
    >
      <head>
        <PreconnectHints />
      </head>
      <body className="no-js min-h-full flex flex-col">
        <JsonLd />
        <SmoothScroll />
        <MagneticCursor />
        <PageTransition />
        {children}
      </body>
    </html>
  );
}
