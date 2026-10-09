'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

interface SystemStatus {
  connected: boolean;
  message: string;
  dbName: string;
}

interface Counts {
  faqs: number;
  blogs: number;
  leads: number;
}

export default function AdminDashboardPage() {
  const [status, setStatus] = useState<SystemStatus | null>(null);
  const [counts, setCounts] = useState<Counts>({ faqs: 0, blogs: 0, leads: 0 });
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState<'faqs' | 'blogs' | null>(null);
  const [seedNotice, setSeedNotice] = useState('');

  const fetchStatus = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/status');
      if (res.ok) {
        const data = await res.json();
        setStatus(data.status);
        setCounts(data.counts);
      }
    } catch (err) {
      console.error('Error fetching admin status:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  const handleSeed = async (type: 'seed-faqs' | 'seed-blogs') => {
    setSeeding(type === 'seed-faqs' ? 'faqs' : 'blogs');
    setSeedNotice('');
    try {
      const res = await fetch('/api/admin/status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: type }),
      });
      const data = await res.json();
      if (res.ok) {
        setSeedNotice(data.message || 'Operation successful!');
        await fetchStatus();
      } else {
        setSeedNotice(`Error: ${data.error || 'Failed to seed'}`);
      }
    } catch (err: any) {
      setSeedNotice(`Error: ${err?.message || 'Failed to seed'}`);
    } finally {
      setSeeding(null);
    }
  };

  return (
    <div className="space-y-8">
      {/* Top Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-900/60 via-slate-800/80 to-slate-900 border border-emerald-500/20 p-8 shadow-xl">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Management Console
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">
            Welcome to OPRA Exam Admin
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            Manage your exam FAQs, publish informative preparation guides and articles, and modify the homepage hero and syllabus content from this central dashboard.
          </p>
        </div>
      </div>

      {/* Database Connection & Health Card */}
      <div className="rounded-3xl bg-slate-950/60 border border-slate-800 p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <span>Database Connection Status</span>
              {loading ? (
                <span className="text-xs bg-slate-800 text-slate-400 px-2.5 py-1 rounded-full font-normal">Checking...</span>
              ) : status?.connected ? (
                <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Connected to MongoDB
                </span>
              ) : (
                <span className="text-xs bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-1 rounded-full font-semibold flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> Fallback / Standby Mode
                </span>
              )}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {status?.message || 'Checking database configuration in .env.local...'}
            </p>
          </div>

          <button
            onClick={fetchStatus}
            disabled={loading}
            className="self-start md:self-auto text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white px-3.5 py-2 rounded-xl transition-colors flex items-center gap-1.5"
          >
            <svg className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Refresh Status
          </button>
        </div>

        {seedNotice && (
          <div className="mt-4 p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
            <span>{seedNotice}</span>
            <button onClick={() => setSeedNotice('')} className="text-slate-400 hover:text-white">✕</button>
          </div>
        )}

        <div className="mt-6 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-slate-900/80 p-4 rounded-2xl border border-slate-800/80">
          <div className="text-xs text-slate-400 space-y-1">
            <div>
              <strong className="text-slate-300">Target Database:</strong> <span className="font-mono text-emerald-400">{status?.dbName || 'opraexam'}</span>
            </div>
            <div>
              <strong className="text-slate-300">Collection Counts:</strong> {counts.faqs} FAQs, {counts.blogs} Blogs
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleSeed('seed-faqs')}
              disabled={seeding !== null}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600/30 text-slate-200 hover:text-emerald-300 border border-slate-700 transition-colors disabled:opacity-50"
            >
              {seeding === 'faqs' ? 'Seeding...' : '📥 Sync/Seed Default FAQs'}
            </button>
            <button
              onClick={() => handleSeed('seed-blogs')}
              disabled={seeding !== null}
              className="text-xs font-semibold px-3 py-2 rounded-xl bg-slate-800 hover:bg-emerald-600/30 text-slate-200 hover:text-emerald-300 border border-slate-700 transition-colors disabled:opacity-50"
            >
              {seeding === 'blogs' ? 'Seeding...' : '📥 Sync/Seed Default Blogs'}
            </button>
          </div>
        </div>

        {!status?.connected && (
          <div className="mt-4 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <p className="font-semibold text-amber-400 mb-1">💡 How to connect your MongoDB Atlas cluster:</p>
            <p className="text-slate-400">
              Add your connection string to <code className="bg-slate-800 px-1.5 py-0.5 rounded text-emerald-400 font-mono">.env.local</code>:
            </p>
            <pre className="mt-2 bg-slate-950 p-3 rounded-xl font-mono text-[11px] text-slate-300 overflow-x-auto border border-slate-800">
              MONGODB_URI=mongodb+srv://&lt;username&gt;:&lt;password&gt;@cluster0.mongodb.net/opraexam?retryWrites=true&amp;w=majority
            </pre>
            <p className="text-[11px] text-slate-400 mt-2">
              (While in Fallback Mode, the site will safely read from the built-in TypeScript datasets so the public site never goes down.)
            </p>
          </div>
        )}
      </div>

      {/* Primary Section Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* FAQs Card */}
        <div className="rounded-3xl bg-slate-950/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-colors group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform border border-emerald-500/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">FAQs Management</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Create, edit, reorder, and remove questions for the homepage FAQ accordion and Google FAQPage rich snippet schema.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              {counts.faqs > 0 ? `${counts.faqs} Questions` : 'Ready to manage'}
            </span>
            <Link
              href="/admin/faqs"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              Manage FAQs &rarr;
            </Link>
          </div>
        </div>

        {/* Blogs Card */}
        <div className="rounded-3xl bg-slate-950/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-colors group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform border border-teal-500/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Blog Posts & Articles</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Publish new preparation guides, syllabus breakdowns, study tips, and manage SEO metadata and internal FAQ blocks.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">
              {counts.blogs > 0 ? `${counts.blogs} Articles` : 'Ready to write'}
            </span>
            <Link
              href="/admin/blogs"
              className="text-xs font-bold text-teal-400 hover:text-teal-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              Manage Blogs &rarr;
            </Link>
          </div>
        </div>

        {/* Site Content Card */}
        <div className="rounded-3xl bg-slate-950/60 border border-slate-800 p-6 flex flex-col justify-between hover:border-emerald-500/40 transition-colors group">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-400 flex items-center justify-center mb-5 group-hover:scale-105 transition-transform border border-blue-500/20">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Homepage Content</h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-6">
              Customize hero announcement badges, headline text, value proposition highlights, stats, and syllabus domain weights.
            </p>
          </div>
          <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Live Editor</span>
            <Link
              href="/admin/content"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
            >
              Edit Content &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
