import { ObjectId, type Document } from 'mongodb';
import { cache } from 'react';
import { getDb } from '../mongodb';
import type { BlogPostContent, BlogPostFaq } from '@/data/blogPosts';
import { ContentValidationError, publicationTransition } from '../content/blog';
import { publicationDate, toIsoDate } from '../content/dates';
import { sanitizeBlocks, sanitizeRichText } from '../content/html';

export interface DbBlogPost {
  _id?: string; slug: string; title: string; description: string; author: string;
  date: string; readTime: string; keywords: string; content: BlogPostContent[];
  rawContent?: string; faqs?: BlogPostFaq[]; relatedSlugs?: string[]; published?: boolean;
  publishedAt?: string; createdAt?: string; updatedAt?: string; contentUpdatedAt?: string;
  seoTitle?: string; authorId?: string; reviewerId?: string; reviewedAt?: string;
  seoCorrectionVersion?: number;
  sources?: { label: string; url: string }[];
}

export class ContentUnavailableError extends Error {
  constructor() { super('Content service is temporarily unavailable.'); }
}

async function collection() {
  const db = await getDb();
  if (!db) throw new ContentUnavailableError();
  return db.collection('blogs');
}

function normalize(doc: Document): DbBlogPost {
  return { ...doc, _id: doc._id.toString() } as DbBlogPost;
}

export function getBlogTimestamp(blog: DbBlogPost): number { return Date.parse(publicationDate(blog) ?? '') || 0; }

function ordered(docs: Document[]): DbBlogPost[] {
  return docs.map(normalize).sort((a, b) => getBlogTimestamp(b) - getBlogTimestamp(a));
}

export async function getAllBlogs(): Promise<DbBlogPost[]> {
  return ordered(await (await collection()).find({}).toArray());
}

// Legacy records without a flag remain public until explicitly unpublished.
export const publishedFilter = { published: { $ne: false } };

export async function getPublishedBlogs(): Promise<DbBlogPost[]> {
  return ordered(await (await collection()).find(publishedFilter).toArray());
}

export async function getPublishedBlogSummaries(): Promise<DbBlogPost[]> {
  return ordered(await (await collection()).find(publishedFilter, {
    projection: { slug: 1, title: 1, description: 1, author: 1, authorId: 1, date: 1, readTime: 1, publishedAt: 1, createdAt: 1, contentUpdatedAt: 1, updatedAt: 1 },
  }).toArray());
}

export const getBlogBySlug = cache(async (slug: string): Promise<DbBlogPost | null> => {
  const doc = await (await collection()).findOne({ slug, ...publishedFilter });
  return doc ? normalize(doc) : null;
});

function identity(id: string) {
  return ObjectId.isValid(id) && id.length === 24 ? { _id: new ObjectId(id) } : { slug: id };
}

export async function getBlogById(id: string): Promise<DbBlogPost | null> {
  const doc = await (await collection()).findOne(identity(id));
  return doc ? normalize(doc) : null;
}

function cleanContent(post: Partial<DbBlogPost>): Partial<DbBlogPost> {
  return {
    ...post,
    ...(post.content ? { content: sanitizeBlocks(post.content) } : {}),
    ...(post.rawContent !== undefined ? { rawContent: sanitizeRichText(post.rawContent) } : {}),
    ...(post.faqs ? { faqs: post.faqs.map(faq => ({ ...faq, answer: sanitizeRichText(faq.answer) })) } : {}),
  };
}

export async function createBlog(post: Omit<DbBlogPost, '_id'>): Promise<DbBlogPost> {
  const blogs = await collection();
  if (await blogs.findOne({ slug: post.slug })) throw new ContentValidationError('This article slug already exists.');
  if (post.published !== false && !post.content.length) throw new ContentValidationError('Add article content before publishing.');
  const now = new Date().toISOString();
  const publishedAt = post.published !== false ? toIsoDate(post.date) ?? now : undefined;
  const doc = { ...cleanContent(post), published: post.published !== false, ...(publishedAt ? { publishedAt } : {}), createdAt: now, updatedAt: now, contentUpdatedAt: now };
  const result = await blogs.insertOne(doc as Document);
  return { ...doc, _id: result.insertedId.toString() } as DbBlogPost;
}

export async function updateBlog(id: string, updates: Partial<DbBlogPost>): Promise<boolean> {
  const blogs = await collection();
  const previous = await blogs.findOne(identity(id));
  if (!previous) return false;
  if (updates.slug && updates.slug !== previous.slug) {
    if (previous.published !== false || previous.publishedAt) throw new ContentValidationError('Published article URLs are permanent. Keep the existing slug.');
    if (await blogs.findOne({ slug: updates.slug, _id: { $ne: previous._id } })) throw new ContentValidationError('This article slug already exists.');
  }
  const current = normalize(previous);
  const merged = { ...current, ...updates };
  if (merged.published !== false && !merged.content.length) throw new ContentValidationError('Add article content before publishing.');
  const now = new Date().toISOString();
  const cleaned = cleanContent(updates);
  delete cleaned._id;
  const publishedAt = publicationTransition(current, merged.published !== false, updates.date, now);
  const editorialFields: (keyof DbBlogPost)[] = ['title', 'description', 'content', 'faqs', 'author', 'authorId', 'reviewerId', 'reviewedAt', 'sources'];
  const contentChanged = editorialFields.some(key => key in cleaned && JSON.stringify(cleaned[key]) !== JSON.stringify(current[key]));
  return (await blogs.updateOne({ _id: previous._id }, { $set: {
    ...cleaned, updatedAt: now, ...(publishedAt ? { publishedAt } : {}), ...(contentChanged ? { contentUpdatedAt: now } : {}),
  } })).matchedCount > 0;
}

export async function deleteBlog(id: string): Promise<boolean> {
  return (await (await collection()).deleteOne(identity(id))).deletedCount > 0;
}

export async function seedDefaultBlogs(): Promise<number> { return 0; }
