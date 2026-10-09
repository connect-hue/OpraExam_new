'use client';

import React, { useState, useEffect } from 'react';
import { SiteContent, defaultSiteContent } from '@/data/siteContent';

export default function AdminContentPage() {
  const [content, setContent] = useState<SiteContent>(defaultSiteContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const fetchContent = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/admin/content');
      if (res.ok) {
        const data = await res.json();
        if (data.content) {
          setContent(data.content);
        }
      }
    } catch (err) {
      console.error('Failed to fetch site content:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage(null);

    try {
      const res = await fetch('/api/admin/content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update content');

      setMessage({ text: 'Homepage content updated successfully!', type: 'success' });
    } catch (err: any) {
      setMessage({ text: err?.message || 'Failed to update content', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <h1 className="text-2xl font-extrabold text-white tracking-tight">Homepage Content Editor</h1>
          <p className="text-slate-400 text-xs mt-1">
            Customize hero banners, headlines, perks, stats, and syllabus domains displayed on the main landing page.
          </p>
        </div>

        <button
          type="submit"
          disabled={saving || loading}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-400 hover:to-indigo-400 text-white font-bold text-xs shadow-lg shadow-blue-500/25 transition-all disabled:opacity-50"
        >
          {saving ? 'Saving...' : 'Save All Changes'}
        </button>
      </div>

      {/* Message */}
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

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs">
          Loading site content...
        </div>
      ) : (
        <>
          {/* Section 1: Hero Section */}
          <div className="rounded-3xl bg-slate-950/60 border border-slate-800 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                Hero Section
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                The top-of-page banner, value propositions, and headline.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Announcement Badge Text
              </label>
              <input
                type="text"
                value={content.hero.badgeText}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, badgeText: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Heading Prefix
                </label>
                <input
                  type="text"
                  value={content.hero.headingPrefix}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, headingPrefix: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Heading Highlight (Gradient Text)
                </label>
                <input
                  type="text"
                  value={content.hero.headingHighlight}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, headingHighlight: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Heading Suffix
                </label>
                <input
                  type="text"
                  value={content.hero.headingSuffix}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, headingSuffix: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Main Hero Subtitle / Description
              </label>
              <textarea
                rows={3}
                value={content.hero.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, description: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            {/* Perks */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                4 Key Value Highlights (Checklist pills)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {content.hero.perks.map((perk, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500 w-4">#{i + 1}</span>
                    <input
                      type="text"
                      value={perk}
                      onChange={(e) => {
                        const newPerks = [...content.hero.perks];
                        newPerks[i] = e.target.value;
                        setContent({
                          ...content,
                          hero: { ...content.hero, perks: newPerks },
                        });
                      }}
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Candidates Metric
                </label>
                <input
                  type="text"
                  value={content.hero.candidatesGuided}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, candidatesGuided: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Satisfaction Metric
                </label>
                <input
                  type="text"
                  value={content.hero.satisfactionRating}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      hero: { ...content.hero, satisfactionRating: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          {/* Section 2: About OPRA Section */}
          <div className="rounded-3xl bg-slate-950/60 border border-slate-800 p-6 sm:p-8 space-y-5">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                About OPRA Exam Section
              </h2>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Section Heading
              </label>
              <input
                type="text"
                value={content.about.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, title: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Highlight Paragraph
              </label>
              <textarea
                rows={2}
                value={content.about.highlight}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, highlight: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                Detailed Description
              </label>
              <textarea
                rows={2}
                value={content.about.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, description: e.target.value },
                  })
                }
                className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs leading-relaxed focus:ring-2 focus:ring-blue-500 focus:outline-none"
              ></textarea>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                Key Points (Checkmarks)
              </label>
              <div className="space-y-2">
                {content.about.points.map((pt, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-slate-500 w-4">#{i + 1}</span>
                    <input
                      type="text"
                      value={pt}
                      onChange={(e) => {
                        const newPts = [...content.about.points];
                        newPts[i] = e.target.value;
                        setContent({
                          ...content,
                          about: { ...content.about, points: newPts },
                        });
                      }}
                      className="flex-1 px-3 py-2 bg-slate-900 border border-slate-700 rounded-lg text-white text-xs focus:ring-1 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 3: Syllabus Breakdown */}
          <div className="rounded-3xl bg-slate-950/60 border border-slate-800 p-6 sm:p-8 space-y-6">
            <div className="border-b border-slate-800 pb-4">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span>
                Syllabus Breakdown Section
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Section Title
                </label>
                <input
                  type="text"
                  value={content.syllabus.title}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      syllabus: { ...content.syllabus, title: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-1.5">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={content.syllabus.subtitle}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      syllabus: { ...content.syllabus, subtitle: e.target.value },
                    })
                  }
                  className="w-full px-3.5 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Domains */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.syllabus.domains.map((dom, i) => (
                <div key={i} className="p-4 rounded-2xl bg-slate-900 border border-slate-800 space-y-3">
                  <span className="text-xs font-bold text-purple-400">Domain #{i + 1}</span>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      value={dom.title}
                      onChange={(e) => {
                        const copy = [...content.syllabus.domains];
                        copy[i].title = e.target.value;
                        setContent({
                          ...content,
                          syllabus: { ...content.syllabus, domains: copy },
                        });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Weight</label>
                    <input
                      type="text"
                      value={dom.weight}
                      onChange={(e) => {
                        const copy = [...content.syllabus.domains];
                        copy[i].weight = e.target.value;
                        setContent({
                          ...content,
                          syllabus: { ...content.syllabus, domains: copy },
                        });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Description</label>
                    <textarea
                      rows={3}
                      value={dom.description}
                      onChange={(e) => {
                        const copy = [...content.syllabus.domains];
                        copy[i].description = e.target.value;
                        setContent({
                          ...content,
                          syllabus: { ...content.syllabus, domains: copy },
                        });
                      }}
                      className="w-full px-3 py-1.5 bg-slate-950 border border-slate-700 rounded-lg text-white text-xs leading-relaxed"
                    ></textarea>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </form>
  );
}
