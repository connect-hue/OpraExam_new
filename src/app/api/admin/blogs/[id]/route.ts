import { validateBlogInput } from '@/lib/content/blog';
import { contentErrorResponse } from '@/lib/content/apiErrors';
import { revalidatePublicContent } from '@/lib/content/revalidate';
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

    const updates = validateBlogInput(body, true);

    const success = await updateBlog(id, updates);
    if (!success) {
      return NextResponse.json({ error: 'Blog not found or update failed' }, { status: 404 });
    }

    revalidatePublicContent();
    return NextResponse.json({ success: true, message: 'Blog updated successfully' });
  } catch (error: unknown) {
    return contentErrorResponse(error);
  }
}

export async function PATCH(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  return PUT(request, context);
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

    revalidatePublicContent();
    return NextResponse.json({ success: true, message: 'Blog deleted successfully' });
  } catch (error: unknown) {
    return contentErrorResponse(error);
  }
}
