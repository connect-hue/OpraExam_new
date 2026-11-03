import type { Metadata } from 'next';
import { absoluteUrl, SITE_NAME } from '../site';

export function pageMetadata(title: string, description: string, path: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title, description, url: absoluteUrl(path), type: 'website', siteName: SITE_NAME,
      images: [{ url: absoluteUrl('/og-image.jpg'), width: 1200, height: 630, alt: title }],
    },
    twitter: { card: 'summary_large_image', title, description, images: [absoluteUrl('/og-image.jpg')] },
  };
}
