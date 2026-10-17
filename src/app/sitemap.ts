import fs from 'fs';
import path from 'path';
import { MetadataRoute } from 'next';
import { getPublishedBlogs, DbBlogPost } from '@/lib/db/blogs';

export const revalidate = 60;

/**
 * Automatically inspects the filesystem to retrieve the actual last modified time (mtime)
 * of the source files corresponding to a page route.
 */
function getLatestModified(relativeSrcPaths: string[], fallbackDate?: string): Date {
  let latestTime = 0;

  for (const relPath of relativeSrcPaths) {
    try {
      const fullPath = path.join(process.cwd(), 'src', relPath);
      if (fs.existsSync(fullPath)) {
        const stats = fs.statSync(fullPath);
        if (stats.mtimeMs > latestTime) {
          latestTime = stats.mtimeMs;
        }
      }
    } catch {
      // Continue to next path
    }
  }

  if (latestTime > 0) {
    return new Date(latestTime);
  }

  return fallbackDate ? new Date(fallbackDate) : new Date();
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://www.opraexam.in').replace(/\/$/, '');

  // Static routes mapped to their physical source files so lastmod automatically updates on file changes
  const staticRouteDefs = [
    {
      path: '',
      files: ['app/page.tsx'],
      priority: 1.0,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/syllabus',
      files: ['app/syllabus/page.tsx'],
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/exam-dates',
      files: ['app/exam-dates/page.tsx'],
      priority: 0.9,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/sample-papers',
      files: ['app/sample-papers/page.tsx', 'components/SamplePaperGate.tsx'],
      priority: 0.9,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/opra-quiz',
      files: ['app/opra-quiz/page.tsx', 'components/Quiz.tsx'],
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/blog',
      files: ['app/blog/page.tsx'],
      priority: 0.8,
      changeFrequency: 'weekly' as const,
    },
    {
      path: '/about',
      files: ['app/about/page.tsx'],
      priority: 0.7,
      changeFrequency: 'monthly' as const,
    },
    {
      path: '/terms',
      files: ['app/terms/page.tsx'],
      priority: 0.4,
      changeFrequency: 'yearly' as const,
    },
    {
      path: '/privacy',
      files: ['app/privacy/page.tsx'],
      priority: 0.4,
      changeFrequency: 'yearly' as const,
    },
  ];

  const routes = staticRouteDefs.map((def) => ({
    url: `${baseUrl}${def.path}`,
    lastModified: getLatestModified(def.files),
    changeFrequency: def.changeFrequency,
    priority: def.priority,
  }));

  // Dynamic Blog Content
  const blogPosts = await getPublishedBlogs();
  const blogRoutes = blogPosts.map((post: DbBlogPost) => {
    let lastMod = new Date();
    try {
      const rawDate = post.updatedAt || post.publishedAt || post.date || post.createdAt;
      if (rawDate) {
        const parsed = new Date(rawDate);
        if (!isNaN(parsed.getTime())) {
          lastMod = parsed;
        }
      }
    } catch {
      lastMod = new Date();
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
