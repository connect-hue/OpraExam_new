"use client";

import { useEffect, useState } from "react";

export default function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    // Collect all h2 and h3 elements in the article content after initial render
    const elements = Array.from(document.querySelectorAll("article h2, article h3"))
      .map((element) => ({
        id: element.id,
        text: element.textContent || "",
        level: Number(element.tagName.replace("H", ""))
      }));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setHeadings(elements);

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
  }, []);

  if (headings.length === 0) return null;

  return (
    <div className="sticky top-24 p-6 bg-slate-50 border border-slate-100 rounded-2xl hidden lg:block shadow-sm">
      <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-4">On this page</h4>
      <nav className="flex flex-col space-y-3">
        {headings.map((heading, idx) => (
          <a
            key={idx}
            href={`#${heading.id}`}
            className={`text-sm transition-colors duration-200 ${
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
