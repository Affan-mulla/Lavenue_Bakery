export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Bakery", "LocalBusiness"],
    name: "L'Avenue Boulangerie",
    url: "https://lavenuebakery.com",
    image:
      "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=1200&auto=format&fit=crop",
    telephone: "(416) 333-4455",
    email: "info@lavenuebakery.com",
    priceRange: "$$",
    servesCuisine: "Bakery, French Pastry",
    menu: "https://lavenuebakery.com/menu",
    hasMap: "https://maps.google.com/?q=1850+Avenue+Road+Toronto+Ontario",
    sameAs: ["https://www.instagram.com/lavenuebakery"],
    currenciesAccepted: "CAD",
    paymentAccepted: "Cash, Credit Card",
    address: {
      "@type": "PostalAddress",
      streetAddress: "1850 Avenue Road",
      addressLocality: "Toronto",
      addressRegion: "Ontario",
      postalCode: "M5M 3Z5",
      addressCountry: "Canada",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 43.7397,
      longitude: -79.4208,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "07:00",
        closes: "18:00",
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}