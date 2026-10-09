import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/auth';
import { getSiteContent, updateSiteContent } from '@/lib/db/siteContent';

export async function GET() {
  const content = await getSiteContent();
  return NextResponse.json({ content });
}

export async function POST(request: NextRequest) {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    await updateSiteContent(body);
    return NextResponse.json({ success: true, message: 'Site content updated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Failed to update site content' }, { status: 500 });
  }
}
