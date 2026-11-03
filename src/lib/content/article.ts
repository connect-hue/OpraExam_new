import type { BlogPostContent } from '../../data/blogPosts';
import { sanitizeBlocks, plainText } from './html';
import { createHeadingIds } from './headings';

export type ArticleHeading = { id: string; text: string; level: number };

export function prepareArticleContent(content: BlogPostContent[]) {
  const allocate = createHeadingIds();
  const headings: ArticleHeading[] = [];
  const html = (value: string) => value.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_match, level, inner) => {
    const text = plainText(inner);
    const id = allocate(text);
    headings.push({ id, text, level: Number(level) });
    return `<h${level} id="${id}">${inner}</h${level}>`;
  });
  const blocks = sanitizeBlocks(content).map(block => {
    if (block.type === 'h2' || block.type === 'h3') {
      const id = allocate(block.id || block.text || 'section');
      headings.push({ id, text: block.text || '', level: block.type === 'h2' ? 2 : 3 });
      return { ...block, id };
    }
    return { ...block, ...(block.text ? { text: html(block.text) } : {}), ...(block.items ? { items: block.items.map(html) } : {}), ...(block.tableRows ? { tableRows: block.tableRows.map(row => row.map(html)) } : {}) };
  });
  return { blocks, headings };
}
