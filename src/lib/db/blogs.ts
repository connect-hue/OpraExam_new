import { ObjectId } from 'mongodb';
import { getDb } from '../mongodb';
import { BlogPost, BlogPostContent, BlogPostFaq } from '@/data/blogPosts';

export interface DbBlogPost {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  keywords: string;
  content: BlogPostContent[];
  rawContent?: string;
  faqs?: BlogPostFaq[];
  relatedSlugs?: string[];
  published?: boolean;
  publishedAt?: string;
  createdAt?: string;
  updatedAt?: string;
}

const COLLECTION_NAME = 'blogs';

export function getBlogTimestamp(blog: DbBlogPost): number {
  if (blog.publishedAt) {
    const t = new Date(blog.publishedAt).getTime();
    if (!isNaN(t)) return t;
  }
  if (blog.date) {
    const t = new Date(blog.date).getTime();
    if (!isNaN(t)) return t;
  }
  if (blog.createdAt) {
    const t = new Date(blog.createdAt).getTime();
    if (!isNaN(t)) return t;
  }
  if (blog._id && blog._id.length === 24) {
    return parseInt(blog._id.substring(0, 8), 16) * 1000;
  }
  return 0;
}

export async function getAllBlogs(): Promise<DbBlogPost[]> {
  try {
    const db = await getDb();
    if (!db) {
      console.warn('MongoDB not connected: getAllBlogs returning empty array');
      return [];
    }

    const collection = db.collection<DbBlogPost>(COLLECTION_NAME);
    const docs = await collection
      .find({})
      .sort({ publishedAt: -1, createdAt: -1, _id: -1 })
      .toArray();

    return docs
      .map((doc) => ({
        ...doc,
        _id: doc._id?.toString(),
      }))
      .sort((a, b) => getBlogTimestamp(b) - getBlogTimestamp(a));
  } catch (error) {
    console.error('Error fetching blogs from MongoDB:', error);
    return [];
  }
}

export async function getPublishedBlogs(): Promise<DbBlogPost[]> {
  try {
    const db = await getDb();
    if (!db) {
      console.warn('MongoDB not connected: getPublishedBlogs returning empty array');
      return [];
    }

    const collection = db.collection<DbBlogPost>(COLLECTION_NAME);
    const docs = await collection
      .find({ published: { $ne: false } })
      .sort({ publishedAt: -1, createdAt: -1, _id: -1 })
      .toArray();

    return docs
      .map((doc) => ({
        ...doc,
        _id: doc._id?.toString(),
      }))
      .sort((a, b) => getBlogTimestamp(b) - getBlogTimestamp(a));
  } catch (error) {
    console.error('Error fetching published blogs from MongoDB:', error);
    return [];
  }
}

export async function getBlogBySlug(slug: string): Promise<DbBlogPost | null> {
  try {
    const db = await getDb();
    if (!db) {
      console.warn('MongoDB not connected: getBlogBySlug returning null');
      return null;
    }

    const collection = db.collection<DbBlogPost>(COLLECTION_NAME);
    const doc = await collection.findOne({ slug });
    if (!doc) {
      return null;
    }

    return {
      ...doc,
      _id: doc._id?.toString(),
    };
  } catch (error) {
    console.error('Error finding blog by slug in MongoDB:', error);
    return null;
  }
}

export async function getBlogById(id: string): Promise<DbBlogPost | null> {
  const db = await getDb();
  if (!db) return null;

  try {
    const collection = db.collection(COLLECTION_NAME);
    const doc = await collection.findOne({ _id: new ObjectId(id) });
    if (!doc) return null;
    return {
      ...doc,
      _id: doc._id.toString(),
    } as unknown as DbBlogPost;
  } catch {
    return null;
  }
}

export async function createBlog(post: Omit<DbBlogPost, '_id'>): Promise<DbBlogPost | null> {
  const db = await getDb();
  if (!db) throw new Error('Database is not connected');

  const collection = db.collection(COLLECTION_NAME);
  const now = new Date().toISOString();

  // Validate slug uniqueness
  const existing = await collection.findOne({ slug: post.slug });
  if (existing) {
    throw new Error(`A blog post with slug "${post.slug}" already exists.`);
  }

  let publishedAt = now;
  if (post.date) {
    const parsed = new Date(post.date);
    if (!isNaN(parsed.getTime())) {
      publishedAt = parsed.toISOString();
    }
  }

  const newDoc = {
    ...post,
    published: post.published ?? true,
    publishedAt,
    createdAt: now,
    updatedAt: now,
  };

  const result = await collection.insertOne(newDoc as any);
  return {
    ...newDoc,
    _id: result.insertedId.toString(),
  };
}

export async function updateBlog(id: string, updates: Partial<DbBlogPost>): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error('Database is not connected');

  const collection = db.collection(COLLECTION_NAME);
  const now = new Date().toISOString();
  const { _id, ...cleanUpdates } = updates;

  // If slug is changed, check if new slug collides with another post
  if (cleanUpdates.slug) {
    const collision = await collection.findOne({
      slug: cleanUpdates.slug,
      _id: { $ne: new ObjectId(id) },
    });
    if (collision) {
      throw new Error(`A blog post with slug "${cleanUpdates.slug}" already exists.`);
    }
  }

  const finalUpdates: any = {
    ...cleanUpdates,
    updatedAt: now,
  };

  if (cleanUpdates.date) {
    const parsed = new Date(cleanUpdates.date);
    if (!isNaN(parsed.getTime())) {
      finalUpdates.publishedAt = parsed.toISOString();
    }
  }

  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: finalUpdates }
  );

  return result.matchedCount > 0;
}

export async function deleteBlog(id: string): Promise<boolean> {
  const db = await getDb();
  if (!db) throw new Error('Database is not connected');

  const collection = db.collection(COLLECTION_NAME);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount > 0;
}

export async function seedDefaultBlogs(): Promise<number> {
  // All blogs are maintained directly in MongoDB
  return 0;
}
