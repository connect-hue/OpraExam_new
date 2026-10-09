import { MetadataRoute } from 'next';
import { getPublishedBlogs } from '@/lib/db/blogs';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://opraexam.in').replace(/\/$/, '');

  // Static Routes
  const routes = [
    '',
    '/blog',
    '/about',
    '/opra-quiz',
    '/sample-papers',
    '/terms',
    '/privacy',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : route === '/opra-quiz' ? 0.9 : (route === '/terms' || route === '/privacy') ? 0.4 : 0.8,
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
