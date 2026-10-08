import { MetadataRoute } from 'next';
import { blogPosts } from '@/data/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
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
  const blogRoutes = blogPosts.map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date).toISOString(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...routes, ...blogRoutes];
}
