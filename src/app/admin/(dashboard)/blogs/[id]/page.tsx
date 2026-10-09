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
      <div className="rounded-3xl bg-slate-950/60 border border-slate-800 p-12 text-center max-w-lg mx-auto">
        <h2 className="text-xl font-bold text-white mb-2">Article Not Found</h2>
        <p className="text-xs text-slate-400 mb-6">
          The requested blog post could not be located in the database.
        </p>
        <Link
          href="/admin/blogs"
          className="inline-flex px-4 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700 transition-colors"
        >
          &larr; Back to Articles
        </Link>
      </div>
    );
  }

  return <BlogEditor initialData={blog} isNew={false} />;
}
