import { MetadataRoute } from 'next';
import { getPublishedBlogs } from '@/lib/db/blogs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://opraexam.in').replace(/\/$/, '');

  // Static Routes with stable, realistic lastModified dates
  const staticRouteDefs = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' as const, lastModified: '2026-03-24T00:00:00.000Z' },
    { path: '/syllabus', priority: 0.9, changeFrequency: 'monthly' as const, lastModified: '2026-03-20T00:00:00.000Z' },
    { path: '/exam-dates', priority: 0.9, changeFrequency: 'weekly' as const, lastModified: '2026-03-24T00:00:00.000Z' },
    { path: '/sample-papers', priority: 0.9, changeFrequency: 'monthly' as const, lastModified: '2026-03-25T00:00:00.000Z' },
    { path: '/opra-quiz', priority: 0.8, changeFrequency: 'monthly' as const, lastModified: '2026-03-15T00:00:00.000Z' },
    { path: '/blog', priority: 0.8, changeFrequency: 'weekly' as const, lastModified: '2026-03-24T00:00:00.000Z' },
    { path: '/about', priority: 0.7, changeFrequency: 'monthly' as const, lastModified: '2026-03-15T00:00:00.000Z' },
    { path: '/terms', priority: 0.4, changeFrequency: 'yearly' as const, lastModified: '2026-03-01T00:00:00.000Z' },
    { path: '/privacy', priority: 0.4, changeFrequency: 'yearly' as const, lastModified: '2026-03-01T00:00:00.000Z' },
  ];

  const routes = staticRouteDefs.map((def) => ({
    url: `${baseUrl}${def.path}`,
    lastModified: def.lastModified,
    changeFrequency: def.changeFrequency,
    priority: def.priority,
  }));

  // Dynamic Blog Content
  const blogPosts = await getPublishedBlogs();
  const blogRoutes = blogPosts.map((post) => {
    let lastMod = new Date().toISOString();
    try {
      const parsed = new Date(post.date);
      if (!isNaN(parsed.getTime())) {
        lastMod = parsed.toISOString();
      }
    } catch {
      lastMod = new Date().toISOString();
    }

    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: lastMod,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    };
  });

  return [...routes, ...blogRoutes];
}
