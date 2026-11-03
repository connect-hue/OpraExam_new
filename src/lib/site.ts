export const SITE_NAME = 'OPRAExam.in';

/** Search identity is independent of the deployment/preview hostname. */
export function normalizeSiteOrigin(value: string): string {
  const url = new URL(value);
  if (url.protocol !== 'https:' || url.username || url.password || url.pathname !== '/' || url.search || url.hash) {
    throw new Error('The public site origin must be an HTTPS origin without a path or credentials.');
  }
  // Historical environment values used the redirecting apex hostname.
  if (url.hostname === 'opraexam.in') url.hostname = 'www.opraexam.in';
  return url.origin;
}

export const SITE_URL = normalizeSiteOrigin(process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'https://www.opraexam.in');

export function absoluteUrl(path = '/'): string {
  if (!path.startsWith('/') || path.startsWith('//')) throw new Error('Expected a local absolute path.');
  return new URL(path, `${SITE_URL}/`).toString();
}
