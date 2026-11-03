"use client";

import { useEffect, useState } from "react";
import type { ArticleHeading } from '@/lib/content/article';

export default function TableOfContents({ headings }: { headings: ArticleHeading[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Collect all h2 and h3 elements in the article content after initial render
    const elements = headings;

    // Setup IntersectionObserver for scroll spy
    const callback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(callback, {
      rootMargin: "0px 0px -80% 0px", // triggers when heading hits top 20%
    });

    elements.forEach(({ id }) => {
      if (id) {
        const el = document.getElementById(id);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <div className="p-6 bg-slate-50 border border-slate-200/80 rounded-2xl shadow-xs max-h-[calc(100vh-8rem)] overflow-y-auto">
      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4 sticky top-0 bg-slate-50 py-1 z-10">
        On this page
      </h4>
      <nav className="flex flex-col space-y-3">
        {headings.map((heading, idx) => (
          <a
            key={idx}
            href={`#${heading.id}`}
            className={`text-sm transition-colors duration-200 leading-snug ${
              heading.level === 3 ? "ml-4" : ""
            } ${
              activeId === heading.id
                ? "text-emerald-600 font-bold"
                : "text-slate-600 hover:text-emerald-500 font-medium"
            }`}
          >
            {heading.text}
          </a>
        ))}
      </nav>
    </div>
  );
}
