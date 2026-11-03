import { z } from 'zod';
import { getAuthor } from '../../data/authors';
import { toIsoDate } from './dates';

const shortText = z.string().trim().max(1000);
const block = z.object({
  type: z.enum(['h2', 'h3', 'p', 'text', 'cta', 'alert', 'list', 'table']),
  id: z.string().max(150).optional(), text: z.string().max(200000).optional(),
  alertType: z.enum(['tip', 'warning', 'info']).optional(),
  items: z.array(z.string().max(20000)).max(200).optional(),
  tableHeaders: z.array(shortText).max(30).optional(),
  tableRows: z.array(z.array(z.string().max(20000)).max(30)).max(300).optional(), caption: shortText.optional(),
});

export const blogInputSchema = z.object({
  title: shortText.min(1), slug: z.string().trim().max(180), description: shortText,
  author: shortText, date: z.string().trim().max(100), readTime: z.string().trim().max(100), keywords: shortText,
  content: z.array(block).max(500), rawContent: z.string().max(1000000).optional(),
  faqs: z.array(z.object({ question: shortText.min(1), answer: z.string().max(20000) })).max(100).optional(),
  relatedSlugs: z.array(z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)).max(30).optional(),
  published: z.boolean(), seoTitle: z.string().trim().max(200).optional(),
  authorId: z.string().max(100).optional(), reviewerId: z.string().max(100).optional(), reviewedAt: z.string().max(100).optional(),
  sources: z.array(z.object({ label: shortText.min(1), url: z.url().refine(url => url.startsWith('https://'), 'Sources must use HTTPS') })).max(50).optional(),
});

export class ContentValidationError extends Error {}

export function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
}

export function validateBlogInput(value: unknown, partial = false) {
  const result = (partial ? blogInputSchema.partial() : blogInputSchema).safeParse(value);
  if (!result.success) throw new ContentValidationError(result.error.issues.map(issue => `${issue.path.join('.')}: ${issue.message}`).join('; '));
  const data = result.data;
  if (data.slug !== undefined) {
    data.slug = slugify(data.slug || data.title || '');
    if (!data.slug) throw new ContentValidationError('A valid article slug is required.');
  }
  for (const key of ['authorId', 'reviewerId'] as const) {
    if (data[key] && !getAuthor(data[key])) throw new ContentValidationError(`Unknown ${key}. Add a verified profile first.`);
  }
  for (const key of ['date', 'reviewedAt'] as const) {
    if (data[key]) {
      const iso = toIsoDate(data[key]);
      if (!iso || Date.parse(iso) > Date.now()) throw new ContentValidationError(`${key} must be a valid date that is not in the future.`);
    }
  }
  return data;
}

export function publicationTransition(previous: { published?: boolean; publishedAt?: string; date?: string }, published: boolean, date: string | undefined, now: string) {
  if (date && date !== previous.date) return toIsoDate(date);
  if (previous.publishedAt) return previous.publishedAt;
  return published ? toIsoDate(previous.date) ?? now : undefined;
}
