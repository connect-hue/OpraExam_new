import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { blogPosts } from '@/data/blogPosts';

export const metadata: Metadata = {
  title: 'OPRA Exam Preparation Blog & Articles | Expert Tips',
  description: 'Read the latest operational guidelines, study tips, and comprehensive syllabus guides to pass the Australian OPRA pharmacist exam.',
};

export default function BlogIndexPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            OPRA Exam <span className="text-emerald-600">Preparation Blog</span>
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed">
            Discover expert strategies, detailed syllabus breakdowns, and insider tips to help you conquer the Overseas Pharmacist Readiness Assessment and register in Australia.
          </p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <Link 
              href={`/blog/${post.slug}`} 
              key={post.slug}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 flex flex-col group"
            >
              <div className="text-sm font-semibold text-emerald-600 mb-3 bg-emerald-50 inline-block px-3 py-1 rounded-full w-max">
                {post.readTime}
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-4 group-hover:text-emerald-700 transition-colors line-clamp-2">
                {post.title}
              </h2>
              <p className="text-slate-600 mb-8 line-clamp-3">
                {post.description}
              </p>
              
              <div className="mt-auto pt-6 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center mr-3 font-bold text-sm">
                    {post.author.charAt(0)}
                  </div>
                  <div className="text-sm">
                    <p className="text-slate-900 font-bold leading-none">{post.author}</p>
                    <p className="text-slate-500 mt-1">{post.date}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        
        {/* Return Home */}
        <div className="text-center mt-16">
          <Link href="/" className="inline-flex items-center bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-8 rounded-full hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Return to Homepage
          </Link>
        </div>

      </div>
    </div>
  );
}
