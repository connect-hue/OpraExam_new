import { revalidatePublicContent } from '@/lib/content/revalidate';
import { contentErrorResponse } from '@/lib/content/apiErrors';
import { z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/auth';
import { getFaqById, updateFaq, deleteFaq } from '@/lib/db/faqs';

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await params;
  const faq = await getFaqById(id);
  if (!faq) {
    return NextResponse.json({ error: 'FAQ not found' }, { status: 404 });
  }

  return NextResponse.json({ faq });
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
    const body = z.object({ question: z.string().trim().min(1).max(1000).optional(), answer: z.string().trim().min(1).max(20000).optional(), category: z.string().trim().regex(/^[a-zA-Z0-9 -]+$/).max(100).optional(), order: z.number().int().nonnegative().optional() }).parse(await request.json());
    const { question, answer, category, order } = body;

    const updates: Partial<import('@/lib/db/faqs').DbFaq> = {};
    if (question !== undefined) updates.question = question.trim();
    if (answer !== undefined) updates.answer = answer.trim();
    if (category !== undefined) updates.category = category.trim();
    if (order !== undefined) updates.order = Number(order);

    const success = await updateFaq(id, updates);
    if (!success) {
      return NextResponse.json({ error: 'FAQ not found or update failed' }, { status: 404 });
    }

    revalidatePublicContent();
    return NextResponse.json({ success: true, message: 'FAQ updated successfully' });
  } catch (error: unknown) {
    return contentErrorResponse(error);
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
    const success = await deleteFaq(id);
    if (!success) {
      return NextResponse.json({ error: 'FAQ not found or deletion failed' }, { status: 404 });
    }

    revalidatePublicContent();
    return NextResponse.json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error: unknown) {
    return contentErrorResponse(error);
  }
}
