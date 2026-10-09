import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/auth';
import { checkMongoStatus, getDb } from '@/lib/mongodb';
import { seedDefaultFaqs } from '@/lib/db/faqs';
import { seedDefaultBlogs } from '@/lib/db/blogs';

export async function GET() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const mongoStatus = await checkMongoStatus();
  let counts = {
    faqs: 0,
    blogs: 0,
    leads: 0,
  };

  if (mongoStatus.connected) {
    try {
      const db = await getDb();
      if (db) {
        counts.faqs = await db.collection('faqs').countDocuments();
        counts.blogs = await db.collection('blogs').countDocuments();
        counts.leads = await db.collection('leads').countDocuments();
      }
    } catch (err) {
      console.warn('Error reading collection counts:', err);
    }
  }

  return NextResponse.json({
    status: mongoStatus,
    counts,
  });
}

export async function POST(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'seed-faqs') {
      const count = await seedDefaultFaqs();
      return NextResponse.json({ success: true, count, message: `Seeded ${count} default FAQs` });
    }

    if (action === 'seed-blogs') {
      const count = await seedDefaultBlogs();
      return NextResponse.json({ success: true, count, message: `Seeded ${count} default blog posts` });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Operation failed' }, { status: 500 });
  }
}
