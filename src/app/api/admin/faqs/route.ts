import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/auth';
import { getAllFaqs, createFaq } from '@/lib/db/faqs';

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const faqs = await getAllFaqs();
  return NextResponse.json({ faqs });
}

export async function POST(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { question, answer, category, order } = body;

    if (!question?.trim() || !answer?.trim()) {
      return NextResponse.json({ error: 'Question and answer are required' }, { status: 400 });
    }

    const created = await createFaq({
      question: question.trim(),
      answer: answer.trim(),
      category: category?.trim() || 'General',
      order: typeof order === 'number' ? order : undefined,
    });

    return NextResponse.json({ success: true, faq: created });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to create FAQ' }, { status: 500 });
  }
}
