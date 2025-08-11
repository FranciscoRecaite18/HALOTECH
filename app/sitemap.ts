import type { MetadataRoute } from "next"
import { db } from "@/lib/data"

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://example.com"
  return [
    { url: `${base}/`, changefreq: "daily", priority: 1 },
    { url: `${base}/about`, changefreq: "monthly", priority: 0.5 },
    ...db.posts.map((p) => ({
      url: `${base}/posts/${p.slug}`,
      changefreq: "weekly" as const,
      priority: 0.8,
    })),
  ]
}
