export type BlogPostContent = {
  type: 'h2' | 'h3' | 'p' | 'text' | 'cta' | 'alert' | 'list' | 'table';
  id?: string;
  text?: string;
  alertType?: 'tip' | 'warning' | 'info';
  items?: string[];
  tableHeaders?: string[];
  tableRows?: string[][];
  caption?: string;
};

export type BlogPostFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  keywords: string;
  content: BlogPostContent[];
  rawContent?: string;
  faqs?: BlogPostFaq[];
  relatedSlugs?: string[];
  published?: boolean;
};
