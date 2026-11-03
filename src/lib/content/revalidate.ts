import { revalidatePath } from 'next/cache';

export const publicContentPaths = ['/', '/about', '/syllabus', '/exam-dates', '/sample-papers', '/blog', '/sitemap.xml'];

export function revalidatePublicContent(invalidate: typeof revalidatePath = revalidatePath) {
  for (const path of publicContentPaths) invalidate(path);
  // Article pages contain related-post titles and links as well as their own content.
  invalidate('/blog/[slug]', 'page');
}
