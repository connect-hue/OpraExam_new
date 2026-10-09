import { NextRequest, NextResponse } from 'next/server';
import { verifyAdminPin, setAdminSessionCookie } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { pin } = body;

    if (!pin) {
      return NextResponse.json({ error: 'PIN is required' }, { status: 400 });
    }

    const isValid = verifyAdminPin(pin);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid Passcode / PIN' }, { status: 401 });
    }

    await setAdminSessionCookie();

    return NextResponse.json({ success: true, message: 'Authenticated successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || 'Authentication failed' }, { status: 500 });
  }
}
