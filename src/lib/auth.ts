import crypto from 'crypto';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'opra_admin_session';
const SESSION_SECRET = process.env.ADMIN_SESSION_SECRET || 'opra-secret-session-key-2026';
const ADMIN_PIN = process.env.ADMIN_SECRET_PIN || 'opra2026admin';
const SESSION_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 7 days

export function getExpectedAdminPin(): string {
  return ADMIN_PIN;
}

export function verifyAdminPin(pin: string): boolean {
  if (!pin || typeof pin !== 'string') return false;
  // Timing-safe comparison to prevent side-channel timing attacks
  const expectedBuffer = Buffer.from(ADMIN_PIN.trim());
  const actualBuffer = Buffer.from(pin.trim());
  if (expectedBuffer.length !== actualBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(expectedBuffer, actualBuffer);
}

export function createSessionToken(): string {
  const expiresAt = Date.now() + SESSION_DURATION_MS;
  const payload = JSON.stringify({ role: 'admin', expiresAt });
  const base64Payload = Buffer.from(payload).toString('base64url');
  
  const signature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(base64Payload)
    .digest('base64url');

  return `${base64Payload}.${signature}`;
}

export function verifySessionToken(token: string): boolean {
  if (!token || !token.includes('.')) return false;
  
  const [base64Payload, signature] = token.split('.');
  if (!base64Payload || !signature) return false;

  const expectedSignature = crypto
    .createHmac('sha256', SESSION_SECRET)
    .update(base64Payload)
    .digest('base64url');

  if (signature !== expectedSignature) return false;

  try {
    const payload = JSON.parse(Buffer.from(base64Payload, 'base64url').toString('utf8'));
    if (!payload || payload.role !== 'admin') return false;
    if (typeof payload.expiresAt === 'number' && Date.now() > payload.expiresAt) {
      return false; // expired
    }
    return true;
  } catch {
    return false;
  }
}

export async function setAdminSessionCookie(): Promise<string> {
  const token = createSessionToken();
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: Math.floor(SESSION_DURATION_MS / 1000),
  });
  return token;
}

export async function clearAdminSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(COOKIE_NAME);
  if (!sessionCookie || !sessionCookie.value) return false;
  return verifySessionToken(sessionCookie.value);
}
