import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://tu-dominio.com";
  return [
    { url: base, priority: 1.0 },
    { url: base + "/services", priority: 0.9 },
    { url: base + "/portfolio", priority: 0.9 },
    { url: base + "/about", priority: 0.7 },
    { url: base + "/contact", priority: 0.7 },
  ];
}
