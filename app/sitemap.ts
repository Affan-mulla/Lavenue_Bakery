import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://lavenuebakery.com",
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: "https://lavenuebakery.com/menu",
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: "https://lavenuebakery.com/gallery",
      lastModified: new Date("2026-01-01"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
}