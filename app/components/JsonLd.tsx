export default function JsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": ["Bakery", "LocalBusiness"],
    name: "L'Avenue Boulangerie",
    url: "https://lavenuebakery.com",
    telephone: "(416) 333-4455",
    email: "info@lavenuebakery.com",
    priceRange: "$$",
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
        opens: "18:00",
        closes: "00:00",
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}