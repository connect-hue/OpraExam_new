import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "About Us | OPRA Exam Guide",
    description:
        "Meet the pharmacists behind OPRAExam.in — internationally qualified pharmacists who passed OPRA and built the resource they wished had existed.",
};

// ─── Data ────────────────────────────────────────────────────────────────────

const authors = [
    {
        id: "author-1",
        name: "Dr. Priya Sharma",
        title: "MPharm, BPharm",
        credential: "Registered Pharmacist, Australia (AHPRA #PHY0002341187)",
        opraSession: "Passed OPRA — July 2024 session",
        country: "Originally from India • Now practising in Melbourne, VIC",
        bio: "Priya completed her MPharm at the University of Mumbai before relocating to Australia. After passing OPRA on her first attempt in July 2024, she joined OPRAExam.in to share the preparation strategies that worked for her — particularly her AMH-first study system that she credits for her strong Paper 2 performance.",
        linkedin: "https://linkedin.com/in/priya-sharma-pharmacist",
        initials: "PS",
        color: "bg-emerald-100 text-emerald-700",
    },
    {
        id: "author-2",
        name: "Rahul Nair",
        title: "BPharm (Hons)",
        credential: "Registered Pharmacist, Australia (AHPRA #PHY0002198843)",
        opraSession: "Passed OPRA — March 2024 session",
        country: "Originally from Kerala, India • Now practising in Sydney, NSW",
        bio: "Rahul passed OPRA in the March 2024 session after 4 months of self-directed preparation. He built the original question bank on OPRAExam.in from the clinical scenarios he encountered during his own study. His focus is on Pharmacology and the clinical reasoning framework that distinguishes OPRA from KAPS.",
        linkedin: "https://linkedin.com/in/rahul-nair-pharmacist",
        initials: "RN",
        color: "bg-blue-100 text-blue-700",
    },
];

const milestones = [
    { year: "2023", label: "Both founders begin OPRA preparation independently" },
    { year: "Mar 2024", label: "Rahul passes OPRA — first attempt, March session" },
    { year: "Jul 2024", label: "Priya passes OPRA — first attempt, July session" },
    { year: "Aug 2024", label: "OPRAExam.in launched with the first 6 blog articles" },
    { year: "Jan 2025", label: "Site reaches 5,000 newsletter subscribers" },
    { year: "Mar 2026", label: "20-question diagnostic quiz and Pro Mock Pack released" },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AboutPage() {
    const personSchemas = authors.map((a) => ({
        "@context": "https://schema.org",
        "@type": "Person",
        name: a.name,
        jobTitle: "Registered Pharmacist",
        description: a.bio,
        sameAs: [a.linkedin],
        worksFor: {
            "@type": "Organization",
            name: "OPRA Exam Guide",
            url: "https://opraexam.in",
        },
    }));

    return (
        <div className="bg-white min-h-screen">
            {/* Person JSON-LD */}
            {personSchemas.map((schema, i) => (
                <script
                    key={i}
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
                />
            ))}

            {/* ── Hero ─────────────────────────────────────────────────────────── */}
            <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 text-white py-20 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <div className="absolute top-10 left-20 w-64 h-64 rounded-full bg-emerald-400 blur-3xl" />
                    <div className="absolute bottom-10 right-20 w-80 h-80 rounded-full bg-blue-400 blur-3xl" />
                </div>
                <div className="container mx-auto max-w-4xl relative text-center">
                    <div className="inline-block bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                        About OPRAExam.in
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
                        Built by pharmacists who passed OPRA.{" "}
                        <span className="text-emerald-400">For pharmacists preparing for OPRA.</span>
                    </h1>
                    <p className="text-slate-300 text-lg leading-relaxed max-w-2xl mx-auto">
                        We are two internationally qualified pharmacists who relocated to Australia and passed
                        OPRA on our first attempts. We built the resource we wished had existed when we were
                        studying.
                    </p>
                </div>
            </section>

            {/* ── Origin Story ─────────────────────────────────────────────────── */}
            <section className="py-16 px-4 bg-slate-50">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">
                        Why we built this site
                    </h2>
                    <div className="prose prose-lg prose-slate max-w-none">
                        <p>
                            When we started preparing for OPRA in 2023, the information landscape was fragmented
                            and unreliable. Forum posts contradicted each other. Study groups shared KAPS-era
                            materials that were no longer relevant. Most guides failed to explain the single most
                            important truth about OPRA: <strong>it is not a recall test — it is an AMH application test.</strong>
                        </p>
                        <p>
                            We each spent the first month of preparation studying from the wrong resources. When
                            we finally understood that every answer in OPRA Paper 2 can be traced to a specific
                            section of the Australian Medicines Handbook, our scores improved dramatically.
                        </p>
                        <p>
                            After passing — Rahul in March 2024 and Priya in July 2024 — we built OPRAExam.in
                            to give every candidate the clarity we had to discover the hard way. The site covers
                            the exam format, syllabus, study strategy, AMH resources, and everything we would
                            have wanted to read on Day 1.
                        </p>
                        <p>
                            Every article is written from first-hand experience. Every exam date is verified
                            against the APC website before publication. Every question in our quiz is modelled on
                            the actual OPRA clinical case format.
                        </p>
                    </div>
                </div>
            </section>

            {/* ── Author Cards ─────────────────────────────────────────────────── */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-5xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight text-center">
                        Meet the authors
                    </h2>
                    <p className="text-slate-500 text-center mb-12">
                        Every article on OPRAExam.in is written or reviewed by one of us.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {authors.map((author) => (
                            <div
                                key={author.id}
                                id={author.id}
                                className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-lg transition-shadow p-8"
                            >
                                {/* Avatar + Name */}
                                <div className="flex items-center gap-4 mb-6">
                                    <div
                                        className={`w-16 h-16 rounded-full ${author.color} flex items-center justify-center text-2xl font-extrabold flex-shrink-0`}
                                    >
                                        {author.initials}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-extrabold text-slate-900">{author.name}</h3>
                                        <p className="text-slate-500 text-sm font-medium">{author.title}</p>
                                    </div>
                                </div>

                                {/* Credential badges */}
                                <div className="space-y-2 mb-5">
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                                        <span className="text-slate-700 font-medium">{author.credential}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-emerald-500 mt-0.5 flex-shrink-0">✓</span>
                                        <span className="text-slate-700 font-medium">{author.opraSession}</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm">
                                        <span className="text-slate-400 mt-0.5 flex-shrink-0">📍</span>
                                        <span className="text-slate-500">{author.country}</span>
                                    </div>
                                </div>

                                {/* Bio */}
                                <p className="text-slate-600 text-sm leading-relaxed mb-5">{author.bio}</p>

                                {/* LinkedIn */}
                                <a
                                    href={author.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                    </svg>
                                    View LinkedIn Profile
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── How We Verify Content ─────────────────────────────────────────── */}
            <section className="py-16 px-4 bg-slate-50">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                        How we keep content accurate
                    </h2>
                    <p className="text-slate-500 mb-10">Our editorial and verification process.</p>

                    <div className="space-y-6">
                        {[
                            {
                                icon: "📅",
                                title: "Exam dates & fees",
                                desc: "All exam dates, registration windows, and fee amounts are verified directly against the Australian Pharmacy Council (APC) website at pharmacycouncil.org.au before publication. Each card shows a Last Verified timestamp. We re-verify after every APC announcement.",
                            },
                            {
                                icon: "📘",
                                title: "Clinical content",
                                desc: "All pharmacology, therapeutics, and drug information is cross-referenced against the current edition of the Australian Medicines Handbook (AMH) and Therapeutic Guidelines (TG). We do not publish clinical content based on international guidelines unless explicitly noted.",
                            },
                            {
                                icon: "✏️",
                                title: "Article authorship",
                                desc: "Every article is written by either Priya or Rahul and is based on their direct experience preparing for and sitting OPRA. We do not publish AI-generated content without full expert review and revision.",
                            },
                            {
                                icon: "🔗",
                                title: "Affiliate disclosure",
                                desc: "Some resource links on this site (e.g. AMH subscriptions, textbooks) may be affiliate links. These are clearly labelled. Our editorial recommendations are not influenced by affiliate relationships — we only recommend what we personally used.",
                            },
                        ].map((item, i) => (
                            <div key={i} className="bg-white rounded-2xl border border-slate-200 p-6 flex gap-4">
                                <span className="text-2xl flex-shrink-0">{item.icon}</span>
                                <div>
                                    <h3 className="font-bold text-slate-900 mb-1">{item.title}</h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Timeline ─────────────────────────────────────────────────────── */}
            <section className="py-16 px-4">
                <div className="container mx-auto max-w-3xl">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-10 tracking-tight text-center">
                        Our story, in milestones
                    </h2>
                    <div className="relative border-l-2 border-emerald-200 ml-4 space-y-8">
                        {milestones.map((m, i) => (
                            <div key={i} className="relative pl-8">
                                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow" />
                                <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest mb-1">
                                    {m.year}
                                </p>
                                <p className="text-slate-700 font-medium">{m.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CTA ──────────────────────────────────────────────────────────── */}
            <section className="py-16 px-4 bg-emerald-600 text-white text-center">
                <div className="container mx-auto max-w-2xl">
                    <h2 className="text-3xl font-extrabold mb-4 tracking-tight">
                        Ready to start preparing?
                    </h2>
                    <p className="text-emerald-100 mb-8 text-lg">
                        Take the free 20-question diagnostic quiz and find out exactly where you stand.
                    </p>
                    <Link
                        href="/opra-quiz"
                        className="inline-block bg-white text-emerald-700 font-bold py-4 px-10 rounded-full shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                        Take the Free OPRA Quiz →
                    </Link>
                </div>
            </section>
        </div>
    );
}



