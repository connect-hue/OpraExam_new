import { blogInputSchema, validateBlogInput } from '@/lib/content/blog';
import { contentErrorResponse } from '@/lib/content/apiErrors';
import { revalidatePublicContent } from '@/lib/content/revalidate';
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
    const post = blogInputSchema.parse(validateBlogInput({
      description: '', author: 'OPRAExam.in Editorial Team', date: new Date().toISOString(),
      readTime: '6 min read', keywords: '', content: [], published: false,
      ...body, slug: body.slug || body.title,
    }));
    const newPost = await createBlog(post);
    revalidatePublicContent();

    return NextResponse.json({ success: true, blog: newPost });
  } catch (error: unknown) {
    return contentErrorResponse(error);
  }
}
