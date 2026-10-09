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
    const body = await request.json();
    const { question, answer, category, order } = body;

    const updates: any = {};
    if (question !== undefined) updates.question = question.trim();
    if (answer !== undefined) updates.answer = answer.trim();
    if (category !== undefined) updates.category = category.trim();
    if (order !== undefined) updates.order = Number(order);

    const success = await updateFaq(id, updates);
    if (!success) {
      return NextResponse.json({ error: 'FAQ not found or update failed' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'FAQ updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to update FAQ' }, { status: 500 });
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

    return NextResponse.json({ success: true, message: 'FAQ deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to delete FAQ' }, { status: 500 });
  }
}
