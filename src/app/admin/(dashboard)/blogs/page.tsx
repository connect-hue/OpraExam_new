'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface BlogSummary {
  _id?: string;
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  published?: boolean;
}

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<BlogSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || []);
      }
    } catch (err) {
      console.error('Failed to load blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (idOrSlug: string) => {
    try {
      const res = await fetch(`/api/admin/blogs/${idOrSlug}`, { method: 'DELETE' });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to delete blog post');
      }
      setDeleteConfirmId(null);
      setMessage({ text: 'Article deleted successfully.', type: 'success' });
      await fetchBlogs();
    } catch (err: any) {
      setMessage({ text: err?.message || 'Failed to delete blog post', type: 'error' });
    }
  };

  const filteredBlogs = blogs.filter((blog) => {
    const q = search.toLowerCase();
    return (
      blog.title.toLowerCase().includes(q) ||
      blog.slug.toLowerCase().includes(q) ||
      blog.author.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">Blog Posts & Articles</h1>
          <p className="text-slate-500 text-xs mt-1">
            Create, edit, and publish preparation guides, high-yield clinical reviews, and syllabus articles.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs shadow-lg shadow-teal-600/20 transition-all"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Write New Article
        </Link>
      </div>

      {/* Toast */}
      {message && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center justify-between ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <span>{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>
      )}

      {/* Search */}
      <div className="relative">
        <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input
          type="text"
          placeholder="Search by title, slug, or author..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-xs"
        />
      </div>

      {/* Blogs List */}
      <div className="rounded-3xl bg-white border border-slate-200 divide-y divide-slate-100 overflow-hidden shadow-sm">
        {loading ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            <svg className="animate-spin h-6 w-6 text-teal-600 mx-auto mb-3" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Loading blog articles...
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs">
            No blog articles found.
          </div>
        ) : (
          filteredBlogs.map((blog) => (
            <div key={blog.slug} className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex-1 space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[11px] font-semibold bg-teal-50 text-teal-700 px-2.5 py-0.5 rounded-full border border-teal-200">
                    {blog.readTime || '5 min read'}
                  </span>
                  <span className="text-[11px] text-slate-500">
                    {blog.date}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    by {blog.author}
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {blog.title}
                </h3>

                <p className="text-xs text-slate-600 line-clamp-2">
                  {blog.description}
                </p>

                <div className="text-[11px] font-mono text-slate-400">
                  /blog/{blog.slug}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                <Link
                  href={`/blog/${blog.slug}`}
                  target="_blank"
                  className="p-2 rounded-lg text-xs text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                  title="View Public Post"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </Link>

                <Link
                  href={`/admin/blogs/${blog._id || blog.slug}`}
                  className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors flex items-center gap-1"
                >
                  <svg className="w-3.5 h-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                  Edit
                </Link>

                {deleteConfirmId === (blog._id || blog.slug) ? (
                  <div className="flex items-center gap-1 bg-red-50 border border-red-200 p-1 rounded-lg">
                    <button
                      onClick={() => handleDelete(blog._id || blog.slug)}
                      className="px-2 py-0.5 bg-red-600 text-white rounded text-[11px] font-bold hover:bg-red-700"
                    >
                      Confirm
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-2 py-0.5 text-slate-600 text-[11px] hover:text-slate-900"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setDeleteConfirmId(blog._id || blog.slug)}
                    className="p-2 rounded-lg text-xs text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete Post"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
