import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/auth';
import { getBlogById, updateBlog, deleteBlog } from '@/lib/db/blogs';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const blog = await getBlogById(id);
  if (!blog) {
    return NextResponse.json({ error: 'Blog not found' }, { status: 404 });
  }

  return NextResponse.json({ blog });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const body = await request.json();

    const updates: any = {};
    if (body.title !== undefined) updates.title = body.title.trim();
    if (body.slug !== undefined) {
      updates.slug = body.slug
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_-]+/g, '-')
        .replace(/^-+|-+$/g, '');
    }
    if (body.description !== undefined) updates.description = body.description.trim();
    if (body.author !== undefined) updates.author = body.author.trim();
    if (body.date !== undefined) updates.date = body.date.trim();
    if (body.readTime !== undefined) updates.readTime = body.readTime.trim();
    if (body.keywords !== undefined) updates.keywords = body.keywords.trim();
    if (body.content !== undefined) updates.content = body.content;
    if (body.rawContent !== undefined) updates.rawContent = body.rawContent;
    if (body.faqs !== undefined) updates.faqs = body.faqs;
    if (body.relatedSlugs !== undefined) updates.relatedSlugs = body.relatedSlugs;
    if (body.published !== undefined) updates.published = Boolean(body.published);

    const success = await updateBlog(id, updates);
    if (!success) {
      return NextResponse.json({ error: 'Blog not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { id } = await params;
    const success = await deleteBlog(id);
    if (!success) {
      return NextResponse.json({ error: 'Blog not found or deletion failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to delete blog' }, { status: 500 });
  }
}
