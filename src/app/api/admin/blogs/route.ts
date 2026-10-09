import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/auth';
import { getAllBlogs, createBlog } from '@/lib/db/blogs';

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const blogs = await getAllBlogs();
  return NextResponse.json({ blogs });
}

export async function POST(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const {
      title,
      slug,
      description,
      author,
      date,
      readTime,
      keywords,
      content,
      rawContent,
      faqs,
      relatedSlugs,
      published,
    } = body;

    if (!title?.trim()) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    // Auto-generate slug from title if not provided
    const cleanSlug = (slug || title)
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');

    const newPost = await createBlog({
      title: title.trim(),
      slug: cleanSlug,
      description: description?.trim() || '',
      author: author?.trim() || 'OPRA Exam Specialist',
      date: date?.trim() || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: readTime?.trim() || '6 min read',
      keywords: keywords?.trim() || '',
      content: Array.isArray(content) ? content : [],
      rawContent: rawContent || '',
      faqs: Array.isArray(faqs) ? faqs : [],
      relatedSlugs: Array.isArray(relatedSlugs) ? relatedSlugs : [],
      published: published !== false,
    });

    return NextResponse.json({ success: true, blog: newPost });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create blog post' }, { status: 500 });
  }
}
