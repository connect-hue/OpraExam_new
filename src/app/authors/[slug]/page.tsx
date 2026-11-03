import { notFound } from 'next/navigation';
import Link from 'next/link';
import { authors, getAuthor } from '@/data/authors';
import { pageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/site';
import { serializeJsonLd } from '@/lib/seo/structuredData';

export function generateStaticParams() { return authors.map(author => ({ slug: author.id })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const author = getAuthor((await params).slug);
  return author ? pageMetadata(author.name, author.bio, `/authors/${author.id}`) : { title: 'Author not found', robots: { index: false } };
}

export default async function AuthorPage({ params }: { params: Promise<{ slug: string }> }) {
  const author = getAuthor((await params).slug);
  if (!author) notFound();
  return <article className="container mx-auto max-w-3xl px-5 py-16">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ '@context': 'https://schema.org', '@type': author.type, name: author.name, description: author.bio, url: absoluteUrl(`/authors/${author.id}`) }) }} />
    <h1 className="text-3xl sm:text-4xl font-bold mb-6">{author.name}</h1>
    <p className="text-lg text-slate-700 leading-relaxed">{author.bio}</p>
    {author.credentials && <p className="mt-4">{author.credentials}</p>}
    {author.registrationUrl && <a href={author.registrationUrl} className="block mt-4 underline text-emerald-700">Verify professional registration</a>}
    <p className="mt-8"><Link href="/editorial-policy" className="text-emerald-700 underline">Editorial and corrections policy</Link></p>
    <p className="mt-4"><Link href="/blog" className="text-emerald-700 underline">Explore preparation guides</Link></p>
  </article>;
}
