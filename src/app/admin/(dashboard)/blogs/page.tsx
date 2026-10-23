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
  const [filterStatus, setFilterStatus] = useState<'all' | 'published' | 'draft'>('all');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/blogs');
      if (res.ok) {
        const data = await res.json();
        setBlogs(data.blogs || []);
      }
    } catch (err: unknown) {
      console.error('Failed to load blogs:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleTogglePublish = async (idOrSlug: string, newPublishedState: boolean) => {
    try {
      setUpdatingId(idOrSlug);
      const res = await fetch(`/api/admin/blogs/${idOrSlug}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ published: newPublishedState }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to update publication status');
      }
      setMessage({
        text: newPublishedState
          ? 'Article is now Published live on the website!'
          : 'Article moved to Draft (hidden from public website).',
        type: 'success',
      });
      await fetchBlogs();
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Failed to update publication status';
      setMessage({ text: errMsg, type: 'error' });
    } finally {
      setUpdatingId(null);
    }
  };

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
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : 'Failed to delete blog post';
      setMessage({ text: errMsg, type: 'error' });
    }
  };

  const publishedCount = blogs.filter((b) => b.published !== false).length;
  const draftCount = blogs.filter((b) => b.published === false).length;

  const filteredBlogs = blogs.filter((blog) => {
    const isPublished = blog.published !== false;
    if (filterStatus === 'published' && !isPublished) return false;
    if (filterStatus === 'draft' && isPublished) return false;

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
            Create, edit, manage drafts, and publish preparation guides, high-yield reviews, and syllabus articles.
          </p>
        </div>
        <Link
          href="/admin/blogs/new"
          className="self-start sm:self-auto inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-bold text-xs shadow-lg shadow-teal-600/20 transition-all cursor-pointer"
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
          className={`p-4 rounded-2xl text-xs flex items-center justify-between animate-in fade-in duration-200 ${
            message.type === 'success'
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <span className="font-medium">{message.text}</span>
          <button onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-700 font-bold ml-2">✕</button>
        </div>
      )}

      {/* Filters & Search Toolbar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Status Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-100/80 rounded-2xl border border-slate-200/80 w-fit">
          <button
            type="button"
            onClick={() => setFilterStatus('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              filterStatus === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            All ({blogs.length})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('published')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterStatus === 'published'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-emerald-700'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${filterStatus === 'published' ? 'bg-white' : 'bg-emerald-500'}`}></span>
            Published ({publishedCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterStatus('draft')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              filterStatus === 'draft'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'text-slate-600 hover:text-amber-700'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${filterStatus === 'draft' ? 'bg-white' : 'bg-amber-500'}`}></span>
            Drafts ({draftCount})
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <svg className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            placeholder="Search by title, slug, or author..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-300 rounded-xl text-slate-900 placeholder-slate-400 text-xs focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent shadow-xs"
          />
        </div>
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
          <div className="p-12 text-center text-slate-500 text-xs space-y-3">
            <p>No blog articles found{filterStatus !== 'all' ? ` in ${filterStatus}` : ''}.</p>
            {filterStatus !== 'all' && (
              <button
                type="button"
                onClick={() => setFilterStatus('all')}
                className="text-teal-600 hover:underline font-bold"
              >
                Clear filter &amp; view all articles
              </button>
            )}
          </div>
        ) : (
          filteredBlogs.map((blog) => {
            const isPublished = blog.published !== false;
            const targetId = blog._id || blog.slug;
            const isUpdating = updatingId === targetId;

            return (
              <div key={blog.slug} className="p-5 hover:bg-slate-50/80 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1 space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    {/* Status Pill Badge */}
                    {isPublished ? (
                      <span className="text-[11px] font-bold bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full border border-emerald-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        Published
                      </span>
                    ) : (
                      <span className="text-[11px] font-bold bg-amber-50 text-amber-700 px-2.5 py-0.5 rounded-full border border-amber-300 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Draft (Incomplete)
                      </span>
                    )}

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

                  <div className="text-[11px] font-mono text-slate-400 flex items-center gap-2">
                    <span>/blog/{blog.slug}</span>
                    {!isPublished && (
                      <span className="text-amber-600 font-sans font-medium text-[10px]">
                        (Hidden from public /blog)
                      </span>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                  {/* Quick Draft / Publish Toggle Button */}
                  {isPublished ? (
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleTogglePublish(targetId, false)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 hover:bg-amber-100 text-amber-700 hover:text-amber-800 border border-amber-200 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      title="Set this article to draft (hide from public website)"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                      <span>{isUpdating ? 'Updating...' : 'Set to Draft'}</span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      disabled={isUpdating}
                      onClick={() => handleTogglePublish(targetId, true)}
                      className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-50 hover:bg-emerald-100 text-emerald-700 hover:text-emerald-800 border border-emerald-200 transition-colors flex items-center gap-1 cursor-pointer disabled:opacity-50"
                      title="Publish this article live to the public website"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{isUpdating ? 'Publishing...' : 'Publish'}</span>
                    </button>
                  )}

                  {/* Public View (only if published) */}
                  {isPublished ? (
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
                  ) : (
                    <span
                      className="p-2 text-xs text-slate-300 cursor-not-allowed"
                      title="Drafts cannot be viewed publicly. Click Edit to preview."
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                      </svg>
                    </span>
                  )}

                  {/* Edit button */}
                  <Link
                    href={`/admin/blogs/${targetId}`}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 border border-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    <svg className="w-3.5 h-3.5 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </Link>

                  {/* Delete button */}
                  {deleteConfirmId === targetId ? (
                    <div className="flex items-center gap-1 bg-red-50 border border-red-200 p-1 rounded-lg">
                      <button
                        onClick={() => handleDelete(targetId)}
                        className="px-2 py-0.5 bg-red-600 text-white rounded text-[11px] font-bold hover:bg-red-700 cursor-pointer"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="px-2 py-0.5 text-slate-600 text-[11px] hover:text-slate-900 cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirmId(targetId)}
                      className="p-2 rounded-lg text-xs text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors cursor-pointer"
                      title="Delete Post"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

