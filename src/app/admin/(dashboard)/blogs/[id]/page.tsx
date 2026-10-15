import React from 'react';
import Link from 'next/link';
import BlogEditor from '@/components/admin/BlogEditor';
import { getBlogById, getBlogBySlug } from '@/lib/db/blogs';

export default async function EditBlogPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  
  // Try finding by id, then by slug
  let blog = await getBlogById(id);
  if (!blog) {
    blog = await getBlogBySlug(id);
  }

  if (!blog) {
    return (
      <div className="rounded-3xl bg-white border border-slate-200 p-12 text-center max-w-lg mx-auto shadow-sm">
        <h2 className="text-xl font-bold text-slate-900 mb-2">Article Not Found</h2>
        <p className="text-xs text-slate-500 mb-6">
          The requested blog post could not be located in the database.
        </p>
        <Link
          href="/admin/blogs"
          className="inline-flex px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200 border border-slate-200 transition-colors"
        >
          &larr; Back to Articles
        </Link>
      </div>
    );
  }

  return <BlogEditor initialData={blog} isNew={false} />;
}
