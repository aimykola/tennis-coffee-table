import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://ball-craft.vercel.app'
  const now = new Date()
  return [
    { url: base + '/', lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: base + '/#catalog', lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: base + '/#about', lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: base + '/#reviews', lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: base + '/#contacts', lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ]
}
