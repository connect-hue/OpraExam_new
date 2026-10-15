import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getPublishedBlogs } from '@/lib/db/blogs';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://opraexam.in').replace(/\/$/, '');

export const metadata: Metadata = {
  title: 'OPRA Exam Preparation Blog & Articles | Expert Tips & Guides',
  description: 'Read the latest operational guidelines, study tips, and comprehensive syllabus guides to pass the Australian OPRA pharmacist exam.',
  keywords: [
    'OPRA exam blog',
    'OPRA study tips',
    'Australian pharmacist exam guide',
    'OPRA sample questions',
    'APC exam preparation',
  ],
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    title: 'OPRA Exam Preparation Blog & Articles | Expert Tips',
    description: 'Expert strategies, detailed syllabus breakdowns, and insider tips to pass the Overseas Pharmacist Readiness Assessment.',
    url: `${siteUrl}/blog`,
    type: 'website',
    images: [`${siteUrl}/og-image.jpg`],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPRA Exam Preparation Blog & Articles | Expert Guides',
    description: 'Expert strategies and comprehensive syllabus guides to pass the Australian OPRA pharmacist exam.',
    images: [`${siteUrl}/og-image.jpg`],
  },
};

export const revalidate = 60;

export default async function BlogIndexPage() {
  const blogPosts = await getPublishedBlogs();
  const featuredPost = blogPosts[0];
  const remainingPosts = blogPosts.slice(1);

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
    ],
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-8 text-sm text-slate-500 font-medium">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-emerald-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <span className="text-slate-300">/</span>
            </li>
            <li className="text-slate-900 font-bold" aria-current="page">
              Blog
            </li>
          </ol>
        </nav>

        {/* Header */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-8 md:p-14 mb-14 shadow-xl border border-slate-800">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-emerald-300 mb-6 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400"></span>
              Insights, Study Guides & Strategy
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-6 leading-tight">
              OPRA Exam <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Preparation Articles & Guides
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              In-depth articles written by registered Australian pharmacists. Master the official syllabus, stay ahead of exam windows, and learn clinical problem-solving techniques for the OPRA exam.
            </p>

            {/* Quick Cross-Links */}
            <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-800/80 text-sm">
              <span className="text-slate-400 self-center">Explore core resources:</span>
              <Link
                href="/syllabus"
                className="bg-white/10 hover:bg-white/20 text-emerald-300 px-3.5 py-1.5 rounded-full transition-colors font-medium text-xs sm:text-sm"
              >
                Official Syllabus & Domains →
              </Link>
              <Link
                href="/exam-dates"
                className="bg-white/10 hover:bg-white/20 text-teal-300 px-3.5 py-1.5 rounded-full transition-colors font-medium text-xs sm:text-sm"
              >
                2026 Verified Exam Dates →
              </Link>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        {featuredPost && (
          <div className="mb-14">
            <div className="text-xs font-bold uppercase tracking-wider text-emerald-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-600"></span>
              Featured Comprehensive Guide
            </div>
            <Link
              href={`/blog/${featuredPost.slug}`}
              className="group block bg-white rounded-3xl p-8 sm:p-12 border border-emerald-200 ring-2 ring-emerald-500/10 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {featuredPost.readTime}
                    </span>
                    <span className="text-xs text-slate-400 font-medium">{featuredPost.date}</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors leading-tight">
                    {featuredPost.title}
                  </h2>

                  <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed line-clamp-3">
                    {featuredPost.description}
                  </p>

                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                      {(featuredPost.author || 'O').charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-900">{featuredPost.author}</p>
                      <p className="text-xs text-slate-500">Australian Registered Pharmacist</p>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between h-full">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm mb-2 uppercase tracking-wider">
                      Key Highlights Inside
                    </h3>
                    <ul className="text-xs text-slate-600 space-y-2 mb-6">
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold">✓</span> Exam format & test-day schedule
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold">✓</span> Core AMH monographs to revise
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="text-emerald-500 font-bold">✓</span> Common pitfalls to avoid
                      </li>
                    </ul>
                  </div>

                  <span className="inline-flex items-center text-sm font-bold text-emerald-600 group-hover:text-emerald-700">
                    Read Complete Guide →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        )}

        {/* Blog Grid */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-8 tracking-tight">
            All Articles & Resources ({blogPosts.length})
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingPosts.map((post) => (
              <Link
                href={`/blog/${post.slug}`}
                key={post.slug}
                className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col group"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full">
                    {post.readTime}
                  </span>
                  <span className="text-xs text-slate-400">{post.date}</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-700 transition-colors line-clamp-2 leading-snug">
                  {post.title}
                </h3>

                <p className="text-slate-600 text-sm mb-6 line-clamp-3 leading-relaxed flex-1">
                  {post.description}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mr-2.5 font-bold text-xs">
                      {(post.author || 'O').charAt(0)}
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{post.author}</span>
                  </div>
                  <span className="text-xs font-bold text-emerald-600 group-hover:underline">
                    Read Article &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="text-center pt-8 border-t border-slate-200 flex flex-wrap justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-full hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-2xs"
          >
            ← Return to Homepage
          </Link>
          <Link
            href="/syllabus"
            className="bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-full hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-2xs"
          >
            View OPRA Syllabus →
          </Link>
          <Link
            href="/exam-dates"
            className="bg-emerald-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Check 2026 Exam Dates →
          </Link>
        </div>
      </div>
    </div>
  );
}
