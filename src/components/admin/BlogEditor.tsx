'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { BlogPostContent, BlogPostFaq } from '@/data/blogPosts';
import RichTextEditor from '@/components/admin/RichTextEditor';

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
          { type: 'text', text: '<h2>Introduction</h2><p>Write or paste your article content here with full headings, formatting, and paragraphs...</p>' },
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
    } else if (type === 'p' || type === 'text') {
      newBlock.type = 'text';
      newBlock.text = '<p>Write or paste your article text and content here...</p>';
    } else if (type === 'alert') {
      newBlock.alertType = 'tip';
      newBlock.text = 'Important tip or insight...';
    } else if (type === 'list') {
      newBlock.items = ['First point', 'Second point', 'Third point'];
    } else if (type === 'table') {
      newBlock.caption = 'Comparison / Summary Table';
      newBlock.tableHeaders = ['Category / Feature', 'Standard Pathway', 'OPRA Requirement'];
      newBlock.tableRows = [
        ['Eligibility', 'Overseas B.Pharm / M.Pharm degree', 'Verified through APC Stage 1 Assessment'],
        ['Exam Structure', 'Computer-based test (120 MCQs)', 'Minimum 75% scaled pass score in each domain'],
        ['Attempts Allowed', 'Multiple re-sits permitted', 'Up to 3 attempts within a 2-year window'],
      ];
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

  // Table block helpers
  const addTableColumn = (blockIndex: number) => {
    setFormData((prev) => {
      const copy = [...prev.content];
      const block = { ...copy[blockIndex] };
      const headers = [...(block.tableHeaders || ['Column 1', 'Column 2'])];
      headers.push(`Column ${headers.length + 1}`);
      const rows = (block.tableRows || []).map((row) => [...row, '']);
      block.tableHeaders = headers;
      block.tableRows = rows;
      copy[blockIndex] = block;
      return { ...prev, content: copy };
    });
  };

  const removeTableColumn = (blockIndex: number, colIndex?: number) => {
    setFormData((prev) => {
      const copy = [...prev.content];
      const block = { ...copy[blockIndex] };
      const currentHeaders = block.tableHeaders || [];
      if (currentHeaders.length <= 1) return prev;
      const targetIndex = typeof colIndex === 'number' ? colIndex : currentHeaders.length - 1;
      block.tableHeaders = currentHeaders.filter((_, i) => i !== targetIndex);
      block.tableRows = (block.tableRows || []).map((row) => row.filter((_, i) => i !== targetIndex));
      copy[blockIndex] = block;
      return { ...prev, content: copy };
    });
  };

  const updateTableHeader = (blockIndex: number, colIndex: number, val: string) => {
    setFormData((prev) => {
      const copy = [...prev.content];
      const block = { ...copy[blockIndex] };
      const headers = [...(block.tableHeaders || [])];
      headers[colIndex] = val;
      block.tableHeaders = headers;
      copy[blockIndex] = block;
      return { ...prev, content: copy };
    });
  };

  const addTableRow = (blockIndex: number) => {
    setFormData((prev) => {
      const copy = [...prev.content];
      const block = { ...copy[blockIndex] };
      const colCount = (block.tableHeaders || []).length || 2;
      const newRow = new Array(colCount).fill('');
      block.tableRows = [...(block.tableRows || []), newRow];
      copy[blockIndex] = block;
      return { ...prev, content: copy };
    });
  };

  const updateTableCell = (blockIndex: number, rowIndex: number, colIndex: number, val: string) => {
    setFormData((prev) => {
      const copy = [...prev.content];
      const block = { ...copy[blockIndex] };
      const rows = (block.tableRows || []).map((r) => [...r]);
      if (!rows[rowIndex]) rows[rowIndex] = [];
      rows[rowIndex][colIndex] = val;
      block.tableRows = rows;
      copy[blockIndex] = block;
      return { ...prev, content: copy };
    });
  };

  const removeTableRow = (blockIndex: number, rowIndex: number) => {
    setFormData((prev) => {
      const copy = [...prev.content];
      const block = { ...copy[blockIndex] };
      block.tableRows = (block.tableRows || []).filter((_, i) => i !== rowIndex);
      copy[blockIndex] = block;
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
            <Link href="/admin/blogs" className="hover:text-slate-900 transition-colors">
              &larr; Back to Blogs
            </Link>
            <span>/</span>
            <span>{isNew ? 'New Article' : formData.slug}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {isNew ? 'Write New Blog Article' : 'Edit Article'}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/blogs"
            className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/25 transition-all disabled:opacity-50"
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
              ? 'bg-emerald-50 border border-emerald-200 text-emerald-800'
              : 'bg-red-50 border border-red-200 text-red-800'
          }`}
        >
          <span>{message.text}</span>
          <button type="button" onClick={() => setMessage(null)} className="text-slate-400 hover:text-slate-700">✕</button>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
        <button
          type="button"
          onClick={() => setActiveTab('blocks')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'blocks'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Content Blocks ({formData.content.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('meta')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'meta'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          SEO & Metadata
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('faqs')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'faqs'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Article FAQs ({formData.faqs.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            activeTab === 'preview'
              ? 'bg-emerald-50 text-emerald-700 border border-emerald-300 shadow-xs'
              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
          }`}
        >
          Live Preview
        </button>
      </div>

      {/* Tab 1: Content Blocks */}
      {activeTab === 'blocks' && (
        <div className="space-y-6">
          {/* Quick Header Fields */}
          <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-4 shadow-sm">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Article Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="e.g. OPRA Exam Preparation Guide 2026: Everything You Need to Know"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-base font-bold focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none shadow-xs"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  URL Slug (/blog/[slug]) *
                </label>
                <div className="flex items-center">
                  <span className="bg-slate-100 border border-r-0 border-slate-300 px-3 py-2.5 rounded-l-xl text-slate-500 text-xs font-mono">
                    /blog/
                  </span>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-r-xl text-slate-900 text-xs font-mono focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none shadow-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Short Excerpt / Description
                </label>
                <input
                  type="text"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Summary for search engines and article cards..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none shadow-xs"
                />
              </div>
            </div>
          </div>

          {/* Add Block Toolbar */}
          <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap items-center gap-2 shadow-xs">
            <span className="text-xs font-bold text-slate-600 mr-2">Add Block:</span>
            <button
              type="button"
              onClick={() => addBlock('h2')}
              className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors shadow-xs"
            >
              + H2 Heading
            </button>
            <button
              type="button"
              onClick={() => addBlock('h3')}
              className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors shadow-xs"
            >
              + H3 Subheading
            </button>
            <button
              type="button"
              onClick={() => addBlock('text')}
              className="text-xs px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition-colors shadow-xs flex items-center gap-1"
            >
              <span>+ Text Box</span>
            </button>
            <button
              type="button"
              onClick={() => addBlock('alert')}
              className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors shadow-xs"
            >
              + Alert Box
            </button>
            <button
              type="button"
              onClick={() => addBlock('list')}
              className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors shadow-xs"
            >
              + Bullet List
            </button>
            <button
              type="button"
              onClick={() => addBlock('table')}
              className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors shadow-xs"
            >
              + Table
            </button>
            <button
              type="button"
              onClick={() => addBlock('cta')}
              className="text-xs px-3 py-1.5 bg-slate-50 hover:bg-emerald-50 text-slate-700 hover:text-emerald-700 rounded-lg border border-slate-200 hover:border-emerald-300 transition-colors shadow-xs"
            >
              + CTA Banner
            </button>
          </div>

          {/* Block list */}
          <div className="space-y-4">
            {formData.content.map((block, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 relative group shadow-xs"
              >
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      #{index + 1}
                    </span>
                    <span className="text-xs font-bold uppercase text-emerald-700">
                      {block.type === 'h2' && 'Section Heading (H2)'}
                      {block.type === 'h3' && 'Subheading (H3)'}
                      {(block.type === 'p' || block.type === 'text') && 'Text Box'}
                      {block.type === 'alert' && `Callout Box (${block.alertType || 'tip'})`}
                      {block.type === 'list' && 'Bullet List'}
                      {block.type === 'table' && 'Data Table'}
                      {block.type === 'cta' && 'Interactive Lead CTA Box'}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      disabled={index === 0}
                      onClick={() => moveBlock(index, 'up')}
                      className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-30"
                      title="Move up"
                    >
                      ▲
                    </button>
                    <button
                      type="button"
                      disabled={index === formData.content.length - 1}
                      onClick={() => moveBlock(index, 'down')}
                      className="p-1 rounded text-slate-400 hover:text-slate-800 disabled:opacity-30"
                      title="Move down"
                    >
                      ▼
                    </button>
                    <button
                      type="button"
                      onClick={() => removeBlock(index)}
                      className="p-1 rounded text-red-500 hover:bg-red-50"
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
                      <label className="block text-[11px] text-slate-600 font-semibold mb-1">Heading Text</label>
                      <input
                        type="text"
                        value={block.text || ''}
                        onChange={(e) => updateBlock(index, { text: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-semibold focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white shadow-xs"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-slate-600 font-semibold mb-1">Anchor ID (TOC)</label>
                      <input
                        type="text"
                        value={block.id || ''}
                        onChange={(e) => updateBlock(index, { id: e.target.value })}
                        placeholder="e.g. exam-structure"
                        className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs font-mono focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white shadow-xs"
                      />
                    </div>
                  </div>
                )}

                {(block.type === 'p' || block.type === 'text') && (
                  <div>
                    <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                      Text Box (Headings, Paragraphs, Links & Rich Content)
                    </label>
                    <RichTextEditor
                      value={block.text || ''}
                      onChange={(html) => updateBlock(index, { text: html })}
                      placeholder="Write or paste full article content, headings, and paragraphs..."
                      minHeight="240px"
                    />
                  </div>
                )}

                {block.type === 'alert' && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <label className="text-[11px] text-slate-600 font-semibold">Alert Style:</label>
                      {(['tip', 'warning', 'info'] as const).map((at) => (
                        <label key={at} className="inline-flex items-center gap-1.5 text-xs text-slate-700 cursor-pointer">
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
                    <div>
                      <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                        Alert Content (Rich Text Toolbar)
                      </label>
                      <RichTextEditor
                        value={block.text || ''}
                        onChange={(html) => updateBlock(index, { text: html })}
                        placeholder="Write alert or tip text..."
                        minHeight="100px"
                      />
                    </div>
                  </div>
                )}

                {block.type === 'list' && (
                  <div className="space-y-2">
                    <label className="block text-[11px] text-slate-600 font-semibold">Bullet Items (one per line)</label>
                    <textarea
                      rows={4}
                      value={(block.items || []).join('\n')}
                      onChange={(e) =>
                        updateBlock(index, {
                          items: e.target.value.split('\n').filter((item) => item.trim().length > 0),
                        })
                      }
                      className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs leading-relaxed focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:bg-white shadow-xs"
                    ></textarea>
                  </div>
                )}

                {block.type === 'table' && (
                  <div className="space-y-3">
                    {/* Caption and Grid Controls */}
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                      <div className="flex-1">
                        <label className="block text-[11px] text-slate-600 font-semibold mb-1">
                          Table Title / Caption (Optional)
                        </label>
                        <input
                          type="text"
                          value={block.caption || ''}
                          onChange={(e) => updateBlock(index, { caption: e.target.value })}
                          placeholder="e.g. Visa Subclasses Comparison, Scoring Breakdown..."
                          className="w-full px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-1 focus:ring-emerald-500 focus:bg-white shadow-xs"
                        />
                      </div>
                      <div className="flex items-center gap-2 self-end sm:self-auto pt-1 sm:pt-4">
                        <button
                          type="button"
                          onClick={() => addTableColumn(index)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-semibold border border-slate-200 transition-colors flex items-center gap-1 shadow-xs"
                        >
                          <span>+ Col</span>
                        </button>
                        <button
                          type="button"
                          disabled={(block.tableHeaders || []).length <= 1}
                          onClick={() => removeTableColumn(index)}
                          className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-slate-900 rounded-lg text-xs font-semibold border border-slate-200 transition-colors disabled:opacity-40 shadow-xs"
                          title="Remove last column"
                        >
                          <span>- Col</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => addTableRow(index)}
                          className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg text-xs font-semibold border border-emerald-200 transition-colors flex items-center gap-1 shadow-xs"
                        >
                          <span>+ Row</span>
                        </button>
                      </div>
                    </div>

                    {/* Table Editor Grid */}
                    <div className="overflow-x-auto rounded-xl border border-slate-200 bg-slate-50/50 shadow-xs">
                      <table className="min-w-full divide-y divide-slate-200 text-left text-xs">
                        <thead className="bg-slate-100/80 text-slate-800">
                          <tr>
                            {(block.tableHeaders || []).map((header, colIdx) => (
                              <th key={colIdx} className="p-2 border-r border-slate-200 last:border-r-0 min-w-[140px]">
                                <div className="flex items-center gap-1 mb-1">
                                  <span className="text-[10px] font-mono text-slate-400">Col {colIdx + 1}</span>
                                  {(block.tableHeaders || []).length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeTableColumn(index, colIdx)}
                                      className="ml-auto text-[10px] text-slate-400 hover:text-red-600"
                                      title="Delete this column"
                                    >
                                      ✕
                                    </button>
                                  )}
                                </div>
                                <input
                                  type="text"
                                  value={header}
                                  onChange={(e) => updateTableHeader(index, colIdx, e.target.value)}
                                  placeholder={`Header ${colIdx + 1}`}
                                  className="w-full px-2 py-1 bg-white border border-slate-300 rounded text-slate-900 text-xs font-bold focus:ring-1 focus:ring-emerald-500 focus:outline-none"
                                />
                              </th>
                            ))}
                            <th className="w-10 p-2 text-center text-[10px] font-semibold text-slate-400">Del</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-200 bg-white">
                          {(block.tableRows || []).map((row, rowIdx) => (
                            <tr key={rowIdx} className="hover:bg-slate-50/70 transition-colors">
                              {row.map((cell, colIdx) => (
                                <td key={colIdx} className="p-2 border-r border-slate-100 last:border-r-0 min-w-[140px]">
                                  <textarea
                                    rows={1}
                                    value={cell || ''}
                                    onChange={(e) => updateTableCell(index, rowIdx, colIdx, e.target.value)}
                                    placeholder="Enter text..."
                                    className="w-full px-2 py-1 bg-slate-50 border border-slate-200 rounded text-slate-800 text-xs leading-relaxed focus:bg-white focus:ring-1 focus:ring-emerald-500 focus:outline-none resize-y"
                                  />
                                </td>
                              ))}
                              <td className="w-10 p-2 text-center">
                                <button
                                  type="button"
                                  onClick={() => removeTableRow(index, rowIdx)}
                                  className="p-1 rounded text-slate-400 hover:text-red-600 hover:bg-red-50 text-xs transition-colors"
                                  title="Delete row"
                                >
                                  ✕
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span>{(block.tableHeaders || []).length} columns &bull; {(block.tableRows || []).length} rows</span>
                      <button
                        type="button"
                        onClick={() => addTableRow(index)}
                        className="text-emerald-600 hover:text-emerald-700 font-semibold"
                      >
                        + Add another row
                      </button>
                    </div>
                  </div>
                )}

                {block.type === 'cta' && (
                  <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 font-medium">
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
        <div className="rounded-3xl bg-white border border-slate-200 p-6 space-y-5 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Author
              </label>
              <input
                type="text"
                value={formData.author}
                onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Publish Date
              </label>
              <input
                type="text"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none shadow-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Read Time
              </label>
              <input
                type="text"
                value={formData.readTime}
                onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none shadow-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
              Keywords (comma-separated for SEO)
            </label>
            <input
              type="text"
              value={formData.keywords}
              onChange={(e) => setFormData({ ...formData, keywords: e.target.value })}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none shadow-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
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
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-slate-900 text-xs focus:ring-2 focus:ring-emerald-500 focus:bg-white focus:outline-none font-mono shadow-xs"
            />
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
            <input
              type="checkbox"
              id="published-toggle"
              checked={formData.published}
              onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
            />
            <label htmlFor="published-toggle" className="text-xs font-semibold text-slate-800 cursor-pointer">
              Visible on Public Website (Published)
            </label>
          </div>
        </div>
      )}

      {/* Tab 3: Blog FAQs */}
      {activeTab === 'faqs' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">
              FAQs added here render automatically at the end of this blog post and generate Google FAQPage Schema.
            </p>
            <button
              type="button"
              onClick={addFaq}
              className="text-xs font-bold px-3 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-300 rounded-xl hover:bg-emerald-100 transition-colors shadow-xs"
            >
              + Add FAQ to Post
            </button>
          </div>

          {formData.faqs.length === 0 ? (
            <div className="rounded-2xl bg-white border border-slate-200 p-8 text-center text-xs text-slate-500 shadow-xs">
              No FAQs added to this article yet. Click &quot;+ Add FAQ to Post&quot; above.
            </div>
          ) : (
            formData.faqs.map((faq, i) => (
              <div key={i} className="rounded-2xl bg-white border border-slate-200 p-4 space-y-3 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">FAQ #{i + 1}</span>
                  <button
                    type="button"
                    onClick={() => removeFaq(i)}
                    className="text-red-500 hover:text-red-700 text-xs font-semibold"
                  >
                    Remove
                  </button>
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 font-semibold mb-1">Question</label>
                  <input
                    type="text"
                    value={faq.question}
                    onChange={(e) => updateFaq(i, 'question', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg text-slate-900 text-xs focus:ring-1 focus:ring-emerald-500 focus:bg-white focus:outline-none shadow-xs"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-slate-600 font-semibold mb-1">Answer (Rich Text Toolbar)</label>
                  <RichTextEditor
                    value={faq.answer || ''}
                    onChange={(html) => updateFaq(i, 'answer', html)}
                    placeholder="Write detailed FAQ answer..."
                    minHeight="110px"
                  />
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 4: Live Preview */}
      {activeTab === 'preview' && (
        <div className="rounded-3xl bg-white text-slate-900 p-8 sm:p-12 shadow-sm border border-slate-200 space-y-6 max-w-4xl mx-auto">
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
              if (block.type === 'p' || (block.type as string) === 'text') {
                return (
                  <div
                    key={idx}
                    className="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-4 my-4"
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
              if (block.type === 'table') {
                return (
                  <div key={idx} className="my-6 overflow-x-auto rounded-2xl border border-slate-200 shadow-xs not-prose">
                    {block.caption && (
                      <div className="bg-emerald-50/70 px-4 py-2.5 font-bold text-xs uppercase tracking-wider text-emerald-900 border-b border-emerald-100 flex items-center gap-1.5">
                        <span>📊</span>
                        <span>{block.caption}</span>
                      </div>
                    )}
                    <table className="min-w-full divide-y divide-slate-200 text-left text-sm">
                      <thead className="bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider">
                        <tr>
                          {(block.tableHeaders || []).map((th, thIdx) => (
                            <th key={thIdx} className="px-4 py-3 border-r border-slate-200 last:border-r-0">
                              {th}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 bg-white">
                        {(block.tableRows || []).map((row, rIdx) => (
                          <tr key={rIdx} className="hover:bg-slate-50/70 transition-colors">
                            {row.map((cell, cIdx) => (
                              <td key={cIdx} className="px-4 py-3 text-slate-700 border-r border-slate-100 last:border-r-0 leading-relaxed">
                                <span dangerouslySetInnerHTML={{ __html: cell || '' }} />
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
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
