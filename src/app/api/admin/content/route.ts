import { NextRequest, NextResponse } from 'next/server';
import { isAuthenticatedAdmin } from '@/lib/auth';
import { getSiteContent, updateSiteContent } from '@/lib/db/siteContent';
import { siteContentSchema } from '@/lib/content/siteSchema';
import { contentErrorResponse } from '@/lib/content/apiErrors';
import { revalidatePublicContent } from '@/lib/content/revalidate';

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
    await updateSiteContent(siteContentSchema.parse(body));
    revalidatePublicContent();
    return NextResponse.json({ success: true, message: 'Site content updated successfully' });
  } catch (error: unknown) {
    return contentErrorResponse(error);
  }
}
