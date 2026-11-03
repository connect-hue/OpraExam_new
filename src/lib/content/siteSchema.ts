import { z } from 'zod';

const text = z.string().trim().max(5000);
export const siteContentSchema = z.object({
  hero: z.object({ badgeText: text, headingPrefix: text, headingHighlight: text, headingSuffix: text, description: text, perks: z.array(text).max(20), candidatesGuided: text, satisfactionRating: text }),
  about: z.object({ title: text, highlight: text, description: text, points: z.array(text).max(30) }),
  syllabus: z.object({ title: text, subtitle: text, domains: z.array(z.object({ title: text.min(1), description: text, weight: text, color: z.enum(['blue', 'emerald', 'purple', 'teal', 'amber']) })).max(20) }),
});
