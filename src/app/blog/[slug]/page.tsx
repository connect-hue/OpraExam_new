import { Metadata } from "next";
import TableOfContents from "@/components/TableOfContents";
import InlineCTA from "@/components/InlineCTA";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogBySlug, getPublishedBlogs } from "@/lib/db/blogs";

export const revalidate = 60;

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://opraexam.in').replace(/\/$/, '');

const slugify = (text?: string) =>
  text ? text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : undefined;

export async function generateStaticParams() {
  const posts = await getPublishedBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found | OPRA Exam Blog',
      description: 'The requested OPRA exam article could not be found.',
    };
  }

  const postUrl = `${siteUrl}/blog/${slug}`;

  return {
    title: `${post.title} | OPRA Success Strategy`,
    description: post.description,
    keywords: post.keywords,
    alternates: {
      canonical: postUrl,
    },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: postUrl,
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: `${siteUrl}/og-image.jpg`,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [`${siteUrl}/og-image.jpg`],
    },
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [post, allPosts] = await Promise.all([
    getBlogBySlug(slug),
    getPublishedBlogs(),
  ]);

  if (!post) {
    notFound();
  }

  const postUrl = `${siteUrl}/blog/${post.slug}`;

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${siteUrl}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: postUrl,
      },
    ],
  };

  const blogPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    author: { '@type': 'Person', name: post.author },
    datePublished: post.date,
    dateModified: post.date,
    description: post.description,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': postUrl,
    },
    image: [`${siteUrl}/og-image.jpg`],
    publisher: {
      '@type': 'Organization',
      name: 'OPRA Exam Guide',
      url: siteUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${siteUrl}/logo.png`,
      },
    },
  };

  const faqSchema = post.faqs && post.faqs.length > 0 ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: post.faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer }
    }))
  } : null;

  const alertStyles: Record<string, { border: string; bg: string; icon: string; label: string }> = {
    tip:     { border: 'border-emerald-500', bg: 'bg-emerald-50',  icon: '💡', label: 'Pro Tip' },
    warning: { border: 'border-amber-500',   bg: 'bg-amber-50',    icon: '⚠️', label: 'Warning' },
    info:    { border: 'border-blue-500',    bg: 'bg-blue-50',     icon: 'ℹ️', label: 'Important' },
  };

  return (
    <div className="bg-white min-h-screen py-10 lg:py-16">
      {/* Schema Injections */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">

        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-8 text-sm text-slate-500 font-medium">
          <ol className="flex items-center space-x-2">
            <li><Link href="/" className="hover:text-emerald-600 transition-colors">Home</Link></li>
            <li><span className="text-slate-300">/</span></li>
            <li><Link href="/blog" className="hover:text-emerald-600 transition-colors">Blog</Link></li>
            <li><span className="text-slate-300">/</span></li>
            <li className="text-slate-800 capitalize truncate" aria-current="page">{post.title}</li>
          </ol>
        </nav>

        <div className="flex flex-col lg:flex-row gap-12 relative items-start">

          {/* Main Article Content */}
          <article className="lg:w-8/12 w-full">
            {/* Post Header */}
            <header className="mb-12 border-b border-slate-100 pb-10">
              <h1 className="text-3xl md:text-4xl lg:text-6xl font-extrabold text-slate-900 mb-8 tracking-tight leading-tight capitalize">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-6 text-slate-600 font-medium pb-2">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mr-3 font-extrabold text-lg shadow-inner">
                    {(post.author || 'O').charAt(0)}
                  </div>
                  <span className="text-slate-900 font-bold">{post.author}</span>
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <time dateTime={post.date}>{post.date}</time>
                </div>
                <div className="hidden sm:block w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                <div className="flex items-center text-sm">
                  <svg className="w-4 h-4 mr-2 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  {post.readTime}
                </div>
              </div>
            </header>

            {/* Prose Content */}
            <div className="prose prose-lg prose-slate prose-a:text-emerald-600 hover:prose-a:text-emerald-500 prose-headings:text-slate-900 prose-img:rounded-2xl max-w-none pb-12">
              {post.content.map((block, idx) => {
                if (block.type === 'h2') {
                  const headingId = block.id || slugify(block.text);
                  return <h2 key={idx} id={headingId} className="scroll-mt-32">{block.text}</h2>;
                }
                if (block.type === 'h3') {
                  const headingId = block.id || slugify(block.text);
                  return <h3 key={idx} id={headingId} className="scroll-mt-32">{block.text}</h3>;
                }
                if (block.type === 'p' || (block.type as string) === 'text') {
                  return (
                    <div
                      key={idx}
                      className="leading-relaxed text-slate-700 my-4 space-y-4"
                      dangerouslySetInnerHTML={{ __html: block.text || "" }}
                    />
                  );
                }
                if (block.type === 'cta') return <InlineCTA key={idx} />;
                if (block.type === 'list' && block.items) {
                  return (
                    <ul key={idx} className="space-y-2 my-4 not-prose">
                      {block.items.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <svg className="h-5 w-5 text-emerald-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                          <div className="text-slate-700 flex-1 leading-relaxed [&_p]:my-0" dangerouslySetInnerHTML={{ __html: item }} />
                        </li>
                      ))}
                    </ul>
                  );
                }
                if (block.type === 'alert' && block.alertType) {
                  const s = alertStyles[block.alertType] || alertStyles.tip;
                  return (
                    <div key={idx} className={`not-prose my-6 border-l-4 ${s.border} ${s.bg} rounded-r-xl p-5 flex gap-3`}>
                      <span className="text-xl flex-shrink-0">{s.icon}</span>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-slate-800 mb-1">{s.label}</p>
                        <div className="text-slate-700 text-sm leading-relaxed space-y-2 [&_p]:mb-1 [&_p:last-child]:mb-0" dangerouslySetInnerHTML={{ __html: block.text || "" }} />
                      </div>
                    </div>
                  );
                }
                if (block.type === 'table' && (block.tableHeaders?.length || block.tableRows?.length)) {
                  return (
                    <div key={idx} className="my-8 overflow-x-auto rounded-2xl border border-slate-200 shadow-xs not-prose">
                      {block.caption && (
                        <div className="bg-emerald-50/70 px-5 py-3 font-bold text-xs uppercase tracking-wider text-emerald-900 border-b border-emerald-100 flex items-center gap-2">
                          <span>📊</span>
                          <span>{block.caption}</span>
                        </div>
                      )}
                      <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                        <thead className="bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider">
                          <tr>
                            {(block.tableHeaders || []).map((th, thIdx) => (
                              <th key={thIdx} className="px-4 py-3.5 border-r border-slate-200 last:border-r-0">
                                {th}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 bg-white">
                          {(block.tableRows || []).map((row, rIdx) => (
                            <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                              {row.map((cell, cIdx) => (
                                <td key={cIdx} className="px-4 py-3.5 text-slate-700 border-r border-slate-100 last:border-r-0 leading-relaxed">
                                  <div dangerouslySetInnerHTML={{ __html: cell || '' }} />
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  );
                }
                return null;
              })}
            </div>

            {/* E-E-A-T Clinical Reviewer & Lead Funnel Card */}
            <div className="my-10 p-6 sm:p-8 bg-gradient-to-br from-emerald-50/90 to-teal-50/60 rounded-3xl border border-emerald-200/80 shadow-xs not-prose">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-emerald-200/60">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-extrabold text-xl shadow-md shrink-0">
                    {(post.author || 'P').charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-base">{post.author}</h4>
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                        <svg className="w-3 h-3 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        AHPRA Registered
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 mt-0.5">
                      Clinical Pharmacy Reviewer • Practising in Australia
                    </p>
                  </div>
                </div>
                <Link
                  href="/about"
                  className="text-xs font-bold text-emerald-700 hover:text-emerald-800 underline underline-offset-2 shrink-0"
                >
                  View Pharmacist Profile →
                </Link>
              </div>

              <div className="pt-5">
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed mb-5">
                  This educational guide has been clinically reviewed and verified against current Australian Medicines Handbook (AMH) monographs and Australian Pharmacy Council (APC) blueprints.
                </p>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <Link
                    href="/sample-papers#download-pack"
                    className="inline-flex items-center justify-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all text-center"
                  >
                    Download Free 120-Question Mock Pack
                  </Link>
                  <Link
                    href="/opra-quiz"
                    className="inline-flex items-center justify-center bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm px-6 py-3 rounded-full border border-slate-200 transition-all text-center"
                  >
                    Take Free 5-Min Diagnostic Quiz →
                  </Link>
                </div>
              </div>
            </div>

            {/* FAQ Section */}
            {post.faqs && post.faqs.length > 0 && (
              <section className="border-t border-slate-100 pt-12 pb-8 mt-4">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h2>
                <p className="text-slate-500 mb-8 text-sm">Common questions about {post.title}.</p>
                <div className="space-y-4">
                  {post.faqs.map((faq, i) => (
                    <details key={i} className="group bg-slate-50 rounded-xl border border-slate-200 cursor-pointer open:bg-white open:border-emerald-200 open:shadow-md transition-all">
                      <summary className="font-semibold text-slate-900 p-5 flex justify-between items-center outline-none list-none">
                        {faq.question}
                        <span className="text-emerald-500 group-open:rotate-180 transition-transform ml-4 shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                        </span>
                      </summary>
                      <div className="px-5 pb-5 pt-2 border-t border-slate-100 text-slate-600 text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: faq.answer }} />
                    </details>
                  ))}
                </div>
              </section>
            )}

            {/* Related Posts */}
            {post.relatedSlugs && post.relatedSlugs.length > 0 && (
              <section className="border-t border-slate-100 pt-10 mt-4">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Continue Reading</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {post.relatedSlugs.map((s) => {
                    const related = allPosts.find((p) => p.slug === s);
                    if (!related) return null;
                    return (
                      <Link key={s} href={`/blog/${s}`} className="group block bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl p-5 transition-all">
                        <p className="text-xs text-emerald-600 font-semibold mb-1">{related.readTime}</p>
                        <p className="font-bold text-slate-900 group-hover:text-emerald-700 transition-colors text-sm leading-snug">{related.title}</p>
                      </Link>
                    );
                  })}
                </div>
              </section>
            )}
          </article>

          {/* Sidebar - Table of Contents */}
          <aside className="lg:w-4/12 hidden lg:block border-l border-slate-100 pl-8 sticky top-24 self-start">
            <TableOfContents />
          </aside>

        </div>
      </div>
    </div>
  );
}
