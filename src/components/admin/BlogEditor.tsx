'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPostContent, BlogPostFaq } from '@/data/blogPosts';

interface BlogFormData {
  _id?: string;
  title: string;
  slug: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  keywords: string;
  content: BlogPostContent[];
  faqs: BlogPostFaq[];
  relatedSlugs: string[];
  published: boolean;
}

interface BlogEditorProps {
  initialData?: Partial<BlogFormData>;
  isNew?: boolean;
}

export default function BlogEditor({ initialData, isNew = false }: BlogEditorProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<BlogFormData>({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    description: initialData?.description || '',
    author: initialData?.author || 'OPRA Exam Specialist',
    date:
      initialData?.date ||
      new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
    readTime: initialData?.readTime || '6 min read',
    keywords: initialData?.keywords || 'OPRA exam, Australian Pharmacy Council, KAPS replacement',
    content: initialData?.content && initialData.content.length > 0
      ? initialData.content
      : [
          { type: 'h2', id: 'introduction', text: 'Introduction to this Guide' },
          { type: 'p', text: 'Write the opening paragraph here with background and key insights.' },
        ],
    faqs: initialData?.faqs || [],
    relatedSlugs: initialData?.relatedSlugs || [],
    published: initialData?.published !== false,
  });

  const [activeTab, setActiveTab] = useState<'meta' | 'blocks' | 'faqs' | 'preview'>('blocks');
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  // Auto-slugify
  const handleTitleChange = (val: string) => {
    setFormData((prev) => {
      const next: BlogFormData = { ...prev, title: val };
      if (isNew || !prev.slug) {
        next.slug = val
          .toLowerCase()
          .trim()
          .replace(/[^\w\s-]/g, '')
          .replace(/[\s_-]+/g, '-')
          .replace(/^-+|-+$/g, '');
      }
      return next;
    });
  };

  // Add block
  const addBlock = (type: BlogPostContent['type']) => {
    const newBlock: BlogPostContent = { type };
    if (type === 'h2' || type === 'h3') {
      newBlock.text = 'New Heading';
      newBlock.id = 'new-heading-' + Date.now();
    } else if (type === 'p') {
      newBlock.text = 'New paragraph text...';
    } else if (type === 'alert') {
      newBlock.alertType = 'tip';
      newBlock.text = 'Important tip or insight...';
    } else if (type === 'list') {
      newBlock.items = ['First point', 'Second point', 'Third point'];
    } else if (type === 'cta') {
      // CTA has no text needed
    }

    setFormData((prev) => ({
      ...prev,
      content: [...prev.content, newBlock],
    }));
  };

  const updateBlock = (index: number, updates: Partial<BlogPostContent>) => {
    setFormData((prev) => {
      const copy = [...prev.content];
      copy[index] = { ...copy[index], ...updates };
      return { ...prev, content: copy };
    });
  };

  const removeBlock = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      content: prev.content.filter((_, i) => i !== index),
    }));
  };

  const moveBlock = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= formData.content.length) return;

    setFormData((prev) => {
      const copy = [...prev.content];
      const temp = copy[index];
      copy[index] = copy[targetIndex];
      copy[targetIndex] = temp;
      return { ...prev, content: copy };
    });
  };

  // FAQs
  const addFaq = () => {
    setFormData((prev) => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }],
    }));
  };

  const updateFaq = (index: number, field: 'question' | 'answer', val: string) => {
    setFormData((prev) => {
      const copy = [...prev.faqs];
      copy[index] = { ...copy[index], [field]: val };
      return { ...prev, faqs: copy };
    });
  };

  const removeFaq = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index),
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setMessage({ text: 'Article title is required.', type: 'error' });
      return;
    }
    if (!formData.slug.trim()) {
      setMessage({ text: 'URL slug is required.', type: 'error' });
      return;
    }

    setSaving(true);
    setMessage(null);

    try {
      const endpoint = isNew ? '/api/admin/blogs' : `/api/admin/blogs/${initialData?._id || formData.slug}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(endpoint, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save blog post');

      setMessage({ text: 'Article saved successfully!', type: 'success' });
      if (isNew) {
        router.push('/admin/blogs');
      }
    } catch (err: any) {
      setMessage({ text: err?.message || 'Failed to save blog post', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-6">
      {/* Top action header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
            <Link href="/admin/blogs" className="hover:text-white transition-colors">
              &larr; Back to Blogs
            </Link>
            <span>/</span>
            <span>{isNew ? 'New Article' : formData.slug}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            {isNew ? 'Write New Blog Article' : 'Edit Article'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white font-bold text-xs shadow-lg shadow-emerald-500/25 transition-all disabled:opacity-50"
          >
            {saving ? 'Saving...' : isNew ? 'Publish Article' : 'Save Changes'}
          </button>
        </div>
      </div>

      {/* Message feedback */}
      {message && (
        <div
          className={`p-4 rounded-2xl text-xs flex items-center justify-between ${
            message.type === 'success'
              ? 'bg-emerald-500/10 border border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border border-red-500/30 text-red-300'
          }`}
        >
          <span>{message.text}</span>
          <button type="button" onClick={() => setMessage(null)} className="text-slate-400 hover:text-white">✕</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('blocks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'blocks'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Content Blocks ({formData.content.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('meta')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'meta'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          SEO & Metadata
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('faqs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'faqs'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Article FAQs ({formData.faqs.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'preview'
              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
              : 'text-slate-400 hover:text-white hover:bg-slate-800'
          }`}
        >
          Live Preview
        </button>
      </div>

      {/* Tab 1: Content Blocks */}
      {activeTab === 'blocks' && (
        <div className="space-y-6">
          {/* Quick Header Fields */}
          <div className="rounded-3xl bg-slate-950/60 border border-slate-800 p-6 space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. OPRA Exam Preparation Guide 2026: Everything You Need to Know"
                className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white text-base font-bold focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  URL Slug (/blog/[slug]) *
                </label>
                <div className="flex items-center">
                  <span className="bg-slate-900 border border-r-0 border-slate-700 px-3 py-2.5 rounded-l-xl text-slate-500 text-xs font-mono">
                    /blog/
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-900 border border-slate-700 rounded-r-xl text-white text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Short Excerpt / Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary for search engines and article cards..."
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Add Block Toolbar */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-4 flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-slate-400 mr-2">Add Block:</span>
            <button
              type="button"
              onClick={() => addBlock('h2')}
              className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-emerald-600/30 text-slate-200 hover:text-emerald-300 rounded-lg border border-slate-700 transition-colors"
            >
              + H2 Heading
            </button>
            <button
              type="button"
              onClick={() => addBlock('h3')}
              className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-emerald-600/30 text-slate-200 hover:text-emerald-300 rounded-lg border border-slate-700 transition-colors"
            >
              + H3 Subheading
            </button>
            <button
              type="button"
              onClick={() => addBlock('p')}
              className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-emerald-600/30 text-slate-200 hover:text-emerald-300 rounded-lg border border-slate-700 transition-colors"
            >
              + Paragraph
            </button>
            <button
              type="button"
              onClick={() => addBlock('alert')}
              className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-emerald-600/30 text-slate-200 hover:text-emerald-300 rounded-lg border border-slate-700 transition-colors"
            >
              + Alert Box
            </button>
            <button
              type="button"
              onClick={() => addBlock('list')}
              className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-emerald-600/30 text-slate-200 hover:text-emerald-300 rounded-lg border border-slate-700 transition-colors"
            >
              + Bullet List
            </button>
            <button
              type="button"
              onClick={() => addBlock('cta')}
              className="text-xs px-3 py-1.5 bg-slate-800 hover:bg-emerald-600/30 text-slate-200 hover:text-emerald-300 rounded-lg border border-slate-700 transition-colors"
            >
              + CTA Banner
            </button>
          </div>

          {/* Block list */}
          <div className="space-y-4">
            {formData.content.map((block, index) => (
              <div
                key={index}
                className="rounded-2xl bg-slate-950/70 border border-slate-800 p-4 space-y-3 relative group"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-800/80">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                      #{index + 1}
                    </span>
                    <span className="text-xs font-bold uppercase text-emerald-400">
                      {block.type === 'h2' && 'Section Heading (H2)'}
                      {block.type === 'h3' && 'Subheading (H3)'}
                      {block.type === 'p' && 'Paragraph'}
                      {block.type === 'alert' && `Callout Box (${block.alertType || 'tip'})`}
                      {block.type === 'list' && 'Bullet List'}
                      {block.type === 'cta' && 'Interactive Lead CTA Box'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveBlock(index, 'up')}
                      className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                      title="Move up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      disabled={index === formData.content.length - 1}
                      onClick={() => moveBlock(index, 'down')}
                      className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                      title="Move down"
                    >
                      ▼
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBlock(index)}
                      className="p-1 rounded text-red-400 hover:bg-red-500/20"
                      title="Remove block"
                    >
                      ✕
                    </button>
                  </div>
                </div>

                {/* Block Fields */}
                {(block.type === 'h2' || block.type === 'h3') && (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div className="md:col-span-2">
                      <label className="block text-[11px] text-slate-400 mb-1">Heading Text</label>
                      <input
                        type="text"
                        value={block.text || ''}
                        onChange={(e) => updateBlock(index, { text: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-400 mb-1">Anchor ID (TOC)</label>
                      <input
                        type="text"
                        value={block.id || ''}
                        onChange={(e) => updateBlock(index, { id: e.target.value })}
                        placeholder="e.g. exam-structure"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                )}

                {block.type === 'p' && (
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">
                      Paragraph Content (HTML links & formatting supported)
                    </label>
                    <textarea
                      rows={3}
                      value={block.text || ''}
                      onChange={(e) => updateBlock(index, { text: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    ></textarea>
                  </div>
                )}

                {block.type === 'alert' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="text-[11px] text-slate-400">Alert Style:</label>
                      {(['tip', 'warning', 'info'] as const).map((at) => (
                        <label key={at} className="inline-flex items-center gap-1.5 text-xs text-slate-300 cursor-pointer">
                          <input
                            type="radio"
                            name={`alert-${index}`}
                            checked={block.alertType === at}
                            onChange={() => updateBlock(index, { alertType: at })}
                          />
                          <span className="capitalize">{at}</span>
                        </label>
                      ))}
                    </div>
                    <textarea
                      rows={2}
                      value={block.text || ''}
                      onChange={(e) => updateBlock(index, { text: e.target.value })}
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    ></textarea>
                  </div>
                )}

                {block.type === 'list' && (
                  <div className="space-y-2">
                    <label className="block text-[11px] text-slate-400">Bullet Items (one per line)</label>
                    <textarea
                      rows={4}
                      value={(block.items || []).join('\n')}
                      onChange={(e) =>
                        updateBlock(index, {
                          items: e.target.value.split('\n').filter((item) => item.trim().length > 0),
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    ></textarea>
                  </div>
                )}

                {block.type === 'cta' && (
                  <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
                    Lead capture banner widget will be automatically inserted here.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: SEO & Meta */}
      {activeTab === 'meta' && (
        <div className="rounded-3xl bg-slate-950/60 border border-slate-800 p-6 space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Publish Date
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Keywords (comma-separated for SEO)
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
              Related Article Slugs (comma-separated)
            </label>
            <input
              type="text"
              value={formData.relatedSlugs.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  relatedSlugs: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                })
              }
              placeholder="e.g. how-to-pass-opra-exam-first-try, is-the-opra-exam-hard"
              className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-emerald-500 focus:outline-none font-mono"
            />
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center gap-3">
            <input
              type="checkbox"
              id="published-toggle"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500"
            />
            <label htmlFor="published-toggle" className="text-xs font-semibold text-slate-200 cursor-pointer">
              Visible on Public Website (Published)
            </label>
          </div>
        </div>
      )}

      {/* Tab 3: Blog FAQs */}
      {activeTab === 'faqs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-400">
              FAQs added here render automatically at the end of this blog post and generate Google FAQPage Schema.
            </p>
            <button
              type="button"
              onClick={addFaq}
              className="text-xs font-bold px-3 py-1.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 rounded-xl hover:bg-emerald-500/30 transition-colors"
            >
              + Add FAQ to Post
            </button>
          </div>

          {formData.faqs.length === 0 ? (
            <div className="rounded-2xl bg-slate-950/60 border border-slate-800 p-8 text-center text-xs text-slate-400">
              No FAQs added to this article yet. Click &quot;+ Add FAQ to Post&quot; above.
            </div>
          ) : (
            formData.faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-slate-950/60 border border-slate-800 p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-400">FAQ #{i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFaq(i)}
                    className="text-red-400 hover:text-red-300 text-xs"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaq(i, 'question', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Answer</label>
                  <textarea
                    rows={2}
                    value={faq.answer}
                    onChange={(e) => updateFaq(i, 'answer', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs leading-relaxed focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                  ></textarea>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: Live Preview */}
      {activeTab === 'preview' && (
        <div className="rounded-3xl bg-white text-slate-900 p-8 sm:p-12 shadow-2xl space-y-6 max-w-4xl mx-auto">
          <div className="text-sm font-semibold text-emerald-600 bg-emerald-50 inline-block px-3 py-1 rounded-full">
            {formData.readTime} &bull; {formData.date}
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 leading-tight">
            {formData.title || 'Untitled Post'}
          </h1>
          <p className="text-base text-slate-600 leading-relaxed italic">
            {formData.description}
          </p>
          <div className="text-xs text-slate-500 font-medium">By {formData.author}</div>
          <hr className="border-slate-200" />

          {/* Render content preview */}
          <div className="space-y-4">
            {formData.content.map((block, idx) => {
              if (block.type === 'h2') {
                return (
                  <h2 key={idx} className="text-2xl font-bold text-slate-900 pt-4">
                    {block.text}
                  </h2>
                );
              }
              if (block.type === 'h3') {
                return (
                  <h3 key={idx} className="text-xl font-bold text-slate-800 pt-2">
                    {block.text}
                  </h3>
                );
              }
              if (block.type === 'p') {
                return (
                  <p
                    key={idx}
                    className="text-slate-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: block.text || '' }}
                  />
                );
              }
              if (block.type === 'alert') {
                const border =
                  block.alertType === 'warning'
                    ? 'border-amber-400 bg-amber-50 text-amber-900'
                    : block.alertType === 'info'
                    ? 'border-blue-400 bg-blue-50 text-blue-900'
                    : 'border-emerald-500 bg-emerald-50 text-emerald-900';
                return (
                  <div
                    key={idx}
                    className={`p-4 rounded-xl border-l-4 text-sm leading-relaxed ${border}`}
                    dangerouslySetInnerHTML={{ __html: block.text || '' }}
                  />
                );
              }
              if (block.type === 'list') {
                return (
                  <ul key={idx} className="list-disc list-inside space-y-1.5 text-slate-700">
                    {(block.items || []).map((item, itemIdx) => (
                      <li key={itemIdx}>{item}</li>
                    ))}
                  </ul>
                );
              }
              if (block.type === 'cta') {
                return (
                  <div
                    key={idx}
                    className="p-6 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center font-bold"
                  >
                    🚀 Interactive Preparation Consultation Banner
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
      )}
    </form>
  );
}
