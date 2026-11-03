import sanitizeHtml from 'sanitize-html';
import { decodeHTML } from 'entities';
import type { BlogPostContent } from '../../data/blogPosts';

export function sanitizeRichText(value: string): string {
  const sanitized = sanitizeHtml(value, {
    allowedTags: ['p', 'br', 'hr', 'h2', 'h3', 'h4', 'strong', 'b', 'em', 'i', 'u', 's', 'blockquote', 'pre', 'code', 'ul', 'ol', 'li', 'a', 'table', 'thead', 'tbody', 'tr', 'th', 'td', 'caption', 'figure', 'figcaption', 'img', 'iframe', 'sup', 'sub', 'span', 'div'],
    allowedAttributes: { a: ['href', 'title', 'target', 'rel'], img: ['src', 'alt', 'width', 'height', 'loading', 'decoding'], iframe: ['src', 'title', 'width', 'height', 'loading', 'allowfullscreen'], th: ['colspan', 'rowspan', 'scope'], td: ['colspan', 'rowspan'] },
    allowedIframeHostnames: ['www.youtube.com', 'www.youtube-nocookie.com', 'player.vimeo.com'],
    allowedSchemes: ['https', 'http', 'mailto'],
    allowedSchemesByTag: { img: ['https'], iframe: ['https'] },
    allowProtocolRelative: false,
    transformTags: {
      h1: 'h2',
      a: (_tag, attributes) => ({ tagName: 'a', attribs: { ...attributes, ...(attributes.target === '_blank' ? { rel: 'noopener noreferrer' } : {}) } }),
      img: (_tag, attributes) => ({ tagName: 'img', attribs: { ...attributes, alt: attributes.alt || '', loading: 'lazy', decoding: 'async' } }),
      iframe: (_tag, attributes) => ({ tagName: 'iframe', attribs: { ...attributes, title: attributes.title || 'Embedded video', loading: 'lazy' } }),
    },
  });
  // Pasted introductory paragraphs were sometimes incorrectly marked as H1/H2.
  return sanitized.replace(/<h2>([\s\S]*?)<\/h2>/g, (heading, inner: string) => plainText(inner).length > 180 ? `<p>${inner}</p>` : heading);
}

export function plainText(value: string): string {
  return decodeHTML(sanitizeHtml(value, { allowedTags: [], allowedAttributes: {} }));
}

export function sanitizeBlocks(blocks: BlogPostContent[]): BlogPostContent[] {
  return blocks.map(block => ({
    ...block,
    ...(block.text !== undefined ? { text: ['h2', 'h3'].includes(block.type) ? plainText(block.text) : sanitizeRichText(block.text) } : {}),
    ...(block.items ? { items: block.items.map(sanitizeRichText) } : {}),
    ...(block.tableHeaders ? { tableHeaders: block.tableHeaders.map(plainText) } : {}),
    ...(block.tableRows ? { tableRows: block.tableRows.map(row => row.map(sanitizeRichText)) } : {}),
  }));
}
