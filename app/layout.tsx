import type { Metadata } from "next";
import { Bricolage_Grotesque, Cormorant_Garamond, Great_Vibes, Quintessential } from "next/font/google";
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
  title: "L'Avenue Boulangerie | Crafted Evenings",
  description:
    "Immersive culinary destination with artisanal plates, cellar craft, and reservation-led dining rituals.",
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
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
