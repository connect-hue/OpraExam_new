import type { MetadataRoute } from 'next';
import { getPublishedBlogs, type DbBlogPost } from '@/lib/db/blogs';

// Refresh the generated sitemap every 60 seconds
export const revalidate = 60;

// Use the same domain as your canonical URLs and redirects
const BASE_URL = 'https://www.opraexam.in';

/**
 * Return a valid modification date.
 * Never generate a new timestamp just because the
 * sitemap was requested.
 */
function getValidDate(value: unknown): Date | undefined {
  if (
    value === null ||
    value === undefined ||
    value === ''
  ) {
    return undefined;
  }

  if (
    !(value instanceof Date) &&
    typeof value !== 'string' &&
    typeof value !== 'number'
  ) {
    return undefined;
  }

  const date = new Date(value);

  return !isNaN(date.getTime()) ? date : undefined;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  // Main static website pages
  // Add lastModified only when you know the real
  // date of a meaningful content update.
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/syllabus`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/exam-dates`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/sample-papers`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/opra-quiz`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/blog`,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/about`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/terms`,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/privacy`,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
  ];

  // Fetch published blogs from database
  const blogPosts = await getPublishedBlogs();

  const blogRoutes: MetadataRoute.Sitemap = blogPosts
    .filter((post: DbBlogPost) => Boolean(post.slug))
    .map((post: DbBlogPost) => {

      // Use the actual stored modification date
      const lastModified =
        getValidDate(post.updatedAt) ??
        getValidDate(post.publishedAt) ??
        getValidDate(post.date) ??
        getValidDate(post.createdAt);

      return {
        url: `${BASE_URL}/blog/${encodeURIComponent(post.slug)}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: 'monthly',
        priority: 0.7,
      };
    });

  return [...staticRoutes, ...blogRoutes];
}
