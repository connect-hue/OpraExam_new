import { Metadata } from "next";
import Link from "next/link";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://www.opraexam.in').replace(/\/$/, '');

export const metadata: Metadata = {
    title: {
        absolute: "About OPRAExam.in | OPRA Exam Preparation & Study Resources",
    },
    description:
        "Learn about OPRAExam.in, an independent resource for OPRA exam preparation, syllabus guides, practice questions, sample papers and pharmacist registration information.",
    alternates: {
        canonical: "https://www.opraexam.in/about",
    },
    openGraph: {
        title: "About OPRAExam.in | OPRA Exam Preparation & Study Resources",
        description:
            "Learn about OPRAExam.in, an independent resource for OPRA exam preparation, syllabus guides, practice questions, sample papers and pharmacist registration information.",
        url: "https://www.opraexam.in/about",
        type: "website",
        images: [`${siteUrl}/og-image.jpg`],
    },
    twitter: {
        card: "summary_large_image",
        title: "About OPRAExam.in | OPRA Exam Preparation & Study Resources",
        description:
            "Learn about OPRAExam.in, an independent resource for OPRA exam preparation, syllabus guides, practice questions, sample papers and pharmacist registration information.",
        images: [`${siteUrl}/og-image.jpg`],
    },
};

export default function AboutPage() {
    const breadcrumbSchema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: siteUrl,
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "About Us",
                item: `${siteUrl}/about`,
            },
        ],
    };

    const aboutPageSchema = {
        "@context": "https://schema.org",
        "@type": "AboutPage",
        name: "About OPRAExam.in",
        url: `${siteUrl}/about`,
        description:
            "Learn about OPRAExam.in, an independent resource for OPRA exam preparation, syllabus guides, practice questions, sample papers and pharmacist registration information.",
        mainEntity: {
            "@type": "EducationalOrganization",
            name: "OPRAExam.in",
            url: siteUrl,
            description:
                "An independent educational platform dedicated to supporting overseas-qualified pharmacists preparing for the Overseas Pharmacist Readiness Assessment (OPRA) exam.",
            email: "contact@opraexam.in",
        },
    };

    const offerings = [
        {
            title: "OPRA Exam Syllabus and Subject Guides",
            desc: "Explore explanations of the OPRA exam syllabus, examination content areas, and important pharmaceutical concepts. Our educational resources help candidates organize their preparation around the knowledge domains outlined by the Australian Pharmacy Council.",
            link: "/syllabus",
            linkText: "View Syllabus Guide",
            icon: (
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
            ),
            bgAccent: "bg-emerald-50 border-emerald-100",
        },
        {
            title: "OPRA Exam Sample Papers and Practice Questions",
            desc: "Practice is an essential part of examination preparation. We provide OPRA-style sample questions and practice resources to help candidates assess their understanding, identify knowledge gaps, and become familiar with multiple-choice question formats. Our independently developed practice materials are intended for learning and revision and are not official APC examination papers.",
            link: "/sample-papers",
            linkText: "Browse Sample Papers",
            icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            bgAccent: "bg-blue-50 border-blue-100",
        },
        {
            title: "OPRA Exam Preparation Resources",
            desc: "Access study strategies, preparation guides, pharmaceutical calculations, pharmacology topics, and other educational content relevant to the OPRA examination. Our aim is to help candidates approach their studies in a structured and manageable way.",
            link: "/blog",
            linkText: "Read Preparation Guides",
            icon: (
                <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
            ),
            bgAccent: "bg-purple-50 border-purple-100",
        },
        {
            title: "OPRA Exam Dates and Registration Information",
            desc: "Find useful information about examination schedules, registration procedures, eligibility considerations, and key steps in the examination process. As schedules and regulatory requirements may change, candidates should always confirm the latest details through the Australian Pharmacy Council and relevant regulatory authorities.",
            link: "/exam-dates",
            linkText: "Check Exam Dates",
            icon: (
                <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
            ),
            bgAccent: "bg-amber-50 border-amber-100",
        },
        {
            title: "Pharmacist Career and Registration Guidance",
            desc: "Preparing for OPRA is one stage in a broader professional journey. We also publish educational content about Australian pharmacist registration pathways, supervised practice, and career-related topics to help overseas pharmacists better understand their next steps.",
            link: "/syllabus",
            linkText: "Explore Career Guidance",
            icon: (
                <svg className="w-6 h-6 text-teal-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
            ),
            bgAccent: "bg-teal-50 border-teal-100",
        },
    ];

    const commitmentPoints = [
        "Referring to the Australian Pharmacy Council and other appropriate primary sources for examination and registration information.",
        "Explaining technical and pharmaceutical topics in accessible language.",
        "Distinguishing official examination requirements from general study advice and independent practice materials.",
        "Reviewing time-sensitive information and updating content when changes are identified.",
        "Encouraging learners to verify important regulatory information through official authorities.",
    ];

    const targetAudiences = [
        {
            title: "Pharmacy Graduates",
            desc: "Beginning your examination journey and seeking clarity on knowledge domains, exam formats, and structured study milestones.",
            tag: "Graduates",
            icon: "🎓",
        },
        {
            title: "Working Pharmacists",
            desc: "Returning to academic revision alongside existing work commitments who need focused, high-yield pharmaceutical reviews.",
            tag: "Professionals",
            icon: "💊",
        },
        {
            title: "International Candidates",
            desc: "Overseas-qualified pharmacists actively exploring or undertaking pathways towards professional pharmacist registration in Australia or New Zealand.",
            tag: "Global Candidates",
            icon: "🌏",
        },
    ];

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* JSON-LD Schemas */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutPageSchema) }}
            />

            {/* ─── Hero Section ────────────────────────────────────────────── */}
            <header className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white py-20 lg:py-24 px-4 relative overflow-hidden">
                <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-emerald-500 blur-3xl" />
                    <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-teal-400 blur-3xl" />
                </div>

                <div className="container mx-auto max-w-4xl relative text-center">
                    <div className="inline-flex items-center gap-2 bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-6">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        About OPRAExam.in
                    </div>

                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight tracking-tight text-white">
                        About OPRAExam.in – Your Guide to OPRA Exam Preparation
                    </h1>

                    <p className="text-emerald-300 text-lg sm:text-xl font-medium max-w-2xl mx-auto mb-8 leading-relaxed">
                        Helping internationally qualified pharmacists prepare with clarity, confidence, and the right resources.
                    </p>

                    <div className="bg-slate-800/60 backdrop-blur-md rounded-2xl border border-slate-700/60 p-6 sm:p-8 text-left text-slate-200 text-base sm:text-lg leading-relaxed shadow-xl space-y-4">
                        <p>
                            Welcome to <strong className="text-white font-semibold">OPRAExam.in</strong>, an independent educational platform dedicated to supporting overseas-qualified pharmacists preparing for the Overseas Pharmacist Readiness Assessment (OPRA) exam.
                        </p>
                        <p>
                            Our goal is to make OPRA exam preparation simpler, more structured, and accessible by bringing together useful study resources, examination information, practice questions, and preparation guidance in one place.
                        </p>
                        <p className="text-slate-300">
                            Whether you are beginning your OPRA journey or looking to strengthen your pharmaceutical knowledge before the examination, OPRAExam.in is designed to help you make informed preparation decisions.
                        </p>
                    </div>

                    {/* Quick Highlights Bar */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-8">
                        <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-3.5 text-center">
                            <div className="text-2xl font-extrabold text-emerald-400">120</div>
                            <div className="text-xs text-slate-300 font-medium mt-0.5">MCQ Questions</div>
                        </div>
                        <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-3.5 text-center">
                            <div className="text-2xl font-extrabold text-emerald-400">150</div>
                            <div className="text-xs text-slate-300 font-medium mt-0.5">Minutes Duration</div>
                        </div>
                        <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-3.5 text-center">
                            <div className="text-2xl font-extrabold text-emerald-400">Mar 2025</div>
                            <div className="text-xs text-slate-300 font-medium mt-0.5">Replaced KAPS</div>
                        </div>
                        <div className="bg-slate-900/80 border border-slate-700/50 rounded-xl p-3.5 text-center">
                            <div className="text-2xl font-extrabold text-emerald-400">100%</div>
                            <div className="text-xs text-slate-300 font-medium mt-0.5">Independent Study</div>
                        </div>
                    </div>
                </div>
            </header>

            {/* ─── Our Mission ─────────────────────────────────────────────── */}
            <section className="py-16 sm:py-20 px-4 bg-white border-b border-slate-200">
                <div className="container mx-auto max-w-4xl">
                    <div className="flex flex-col md:flex-row gap-8 items-start">
                        <div className="md:w-1/3">
                            <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                                Purpose & Commitment
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                                Our Mission
                            </h2>
                            <div className="w-16 h-1 bg-emerald-500 rounded mt-3" />
                        </div>
                        <div className="md:w-2/3 space-y-4 text-slate-700 text-base sm:text-lg leading-relaxed">
                            <p className="font-semibold text-slate-900 text-lg">
                                Our mission is to help internationally qualified pharmacists understand the OPRA examination and prepare through relevant, accessible, and well-organized educational resources.
                            </p>
                            <p>
                                We recognize that preparing for a professional examination while navigating a new country&apos;s registration requirements can be challenging. Finding relevant study materials, understanding the examination structure, and identifying reliable sources of information are important parts of the process.
                            </p>
                            <p>
                                At OPRAExam.in, we aim to reduce this confusion by offering straightforward explanations, subject-focused resources, and practical study guidance.
                            </p>
                            <div className="p-4 rounded-xl bg-emerald-50/80 border-l-4 border-emerald-500 text-slate-800 font-medium text-base">
                                We believe that effective preparation begins with accurate information and a clear understanding of what to study.
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── What Is the OPRA Exam? ──────────────────────────────────── */}
            <section className="py-16 sm:py-20 px-4 bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center max-w-2xl mx-auto mb-12">
                        <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                            Examination Overview
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                            What Is the OPRA Exam?
                        </h2>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm space-y-6">
                        <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                            The <strong className="text-slate-900 font-semibold">Overseas Pharmacist Readiness Assessment (OPRA)</strong> is administered by the <strong className="text-slate-900 font-semibold">Australian Pharmacy Council (APC)</strong>. It assesses the biomedical, pharmaceutical, and clinical science knowledge of overseas-qualified pharmacists seeking to progress through applicable registration pathways in Australia or New Zealand.
                        </p>
                        <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                            Introduced in <strong className="text-slate-900 font-semibold">March 2025</strong> as a replacement for the Knowledge Assessment of Pharmaceutical Sciences (KAPS) examination, OPRA is a computer-based examination consisting of <strong className="text-slate-900 font-semibold">120 multiple-choice questions completed within 150 minutes</strong>.
                        </p>
                        <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                            Passing OPRA is one component of the relevant pharmacist registration pathway. Candidates must also satisfy other applicable eligibility and registration requirements.
                        </p>
                        <div className="pt-4 border-t border-slate-100">
                            <p className="text-slate-600 text-sm sm:text-base italic">
                                Our website helps candidates understand the examination and identify appropriate resources for their preparation.
                            </p>
                        </div>
                    </div>

                    {/* Quick Specs Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1">Administered By</div>
                            <div className="text-base font-bold text-slate-900">Australian Pharmacy Council (APC)</div>
                            <div className="text-xs text-slate-500 mt-1">For Australia & New Zealand pathways</div>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1">Structure</div>
                            <div className="text-base font-bold text-slate-900">120 MCQs / 150 Mins</div>
                            <div className="text-xs text-slate-500 mt-1">Biomedical, Pharmaceutical & Clinical</div>
                        </div>
                        <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs">
                            <div className="text-xs font-bold uppercase text-slate-400 tracking-wider mb-1">Replaced Exam</div>
                            <div className="text-base font-bold text-slate-900">KAPS Examination</div>
                            <div className="text-xs text-slate-500 mt-1">Transition effective March 2025</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── What We Offer ───────────────────────────────────────────── */}
            <section className="py-16 sm:py-20 px-4 bg-white border-b border-slate-200">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-14">
                        <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                            Comprehensive Learning Ecosystem
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                            What We Offer
                        </h2>
                        <p className="text-slate-600 text-base sm:text-lg">
                            Tailored resources designed to support every stage of your preparation for the OPRA examination.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                        {offerings.map((item, idx) => (
                            <div
                                key={idx}
                                className={`rounded-3xl border p-7 sm:p-8 flex flex-col justify-between transition-all hover:shadow-md ${item.bgAccent} bg-white`}
                            >
                                <div>
                                    <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center mb-5">
                                        {item.icon}
                                    </div>
                                    <h3 className="text-xl font-bold text-slate-900 mb-3 tracking-tight">
                                        {item.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6">
                                        {item.desc}
                                    </p>
                                </div>
                                <div>
                                    <Link
                                        href={item.link}
                                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800 transition-colors"
                                    >
                                        <span>{item.linkText}</span>
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Our Commitment to Accurate Information ──────────────────── */}
            <section className="py-16 sm:py-20 px-4 bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto max-w-4xl">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-block bg-teal-100 text-teal-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                            Editorial Integrity
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Our Commitment to Accurate Information
                        </h2>
                        <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                            Professional examination preparation requires trustworthy and clearly presented information.
                        </p>
                        <p className="text-slate-600 text-sm sm:text-base mt-2">
                            At OPRAExam.in, we aim to maintain educational content that is relevant, understandable, and consistent with published examination requirements. Our content approach focuses on:
                        </p>
                    </div>

                    <div className="space-y-4">
                        {commitmentPoints.map((point, index) => (
                            <div
                                key={index}
                                className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 flex items-start gap-4 shadow-xs hover:border-emerald-300 transition-colors"
                            >
                                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-sm shrink-0 mt-0.5">
                                    ✓
                                </div>
                                <p className="text-slate-800 text-base font-medium leading-relaxed">
                                    {point}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-8 text-center">
                        <p className="text-slate-600 text-base font-medium italic">
                            &ldquo;We aim to make our resources genuinely useful rather than simply providing more information.&rdquo;
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── Who Can Benefit from OPRAExam.in? ────────────────────────── */}
            <section className="py-16 sm:py-20 px-4 bg-white border-b border-slate-200">
                <div className="container mx-auto max-w-5xl">
                    <div className="text-center max-w-3xl mx-auto mb-12">
                        <div className="inline-block bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                            Learner Profiles
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                            Who Can Benefit from us?
                        </h2>
                        <p className="text-slate-700 text-base sm:text-lg leading-relaxed">
                            OPRAExam.in is designed for overseas-qualified pharmacists who want to understand the OPRA examination and develop a structured preparation plan.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        {targetAudiences.map((aud, i) => (
                            <div key={i} className="bg-slate-50 rounded-3xl border border-slate-200 p-7 flex flex-col justify-between">
                                <div>
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="text-3xl">{aud.icon}</span>
                                        <span className="text-xs font-bold bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-full">
                                            {aud.tag}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-900 mb-2">
                                        {aud.title}
                                    </h3>
                                    <p className="text-slate-600 text-sm leading-relaxed">
                                        {aud.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 text-center max-w-3xl mx-auto">
                        <p className="text-emerald-900 text-base font-medium">
                            Whether you are studying independently or using additional examination preparation support, our resources can complement your learning.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── Our Vision ──────────────────────────────────────────────── */}
            <section className="py-16 sm:py-20 px-4 bg-slate-50 border-b border-slate-200">
                <div className="container mx-auto max-w-4xl text-center">
                    <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                        Looking Forward
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-6">
                        Our Vision
                    </h2>
                    <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-10 shadow-sm text-left sm:text-center space-y-4">
                        <p className="text-slate-800 text-lg sm:text-xl font-medium leading-relaxed">
                            Our vision is to develop OPRAExam.in into a trusted, accessible, and comprehensive independent learning resource for international pharmacists.
                        </p>
                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                            We want to make it easier for candidates to find relevant examination information, access meaningful practice opportunities, and strengthen the scientific knowledge needed for the next stage of their professional journey.
                        </p>
                        <p className="text-slate-600 text-base sm:text-lg leading-relaxed font-normal">
                            We are committed to improving our educational resources as examination requirements, candidate needs, and professional knowledge evolve.
                        </p>
                    </div>
                </div>
            </section>

            {/* ─── Start Your OPRA Exam Preparation (CTA) ─────────────────── */}
            <section className="py-16 sm:py-20 px-4 bg-gradient-to-br from-emerald-900 via-slate-900 to-teal-950 text-white relative overflow-hidden">
                <div className="container mx-auto max-w-4xl relative text-center">
                    <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
                        Start Your OPRA Exam Preparation
                    </h2>
                    <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-10 leading-relaxed">
                        Your preparation journey begins with understanding the examination, reviewing the syllabus, identifying your learning needs, and practising consistently.
                    </p>

                    <div className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-6">
                        Explore our resources to get started:
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-10">
                        <Link
                            href="/syllabus"
                            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-4 text-left flex items-center justify-between transition-all group"
                        >
                            <span className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                                Explore the OPRA Exam Syllabus
                            </span>
                            <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                        </Link>

                        <Link
                            href="/sample-papers"
                            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-4 text-left flex items-center justify-between transition-all group"
                        >
                            <span className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                                Access OPRA Exam Sample Papers
                            </span>
                            <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                        </Link>

                        <Link
                            href="/exam-dates"
                            className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-4 text-left flex items-center justify-between transition-all group"
                        >
                            <span className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                                Check OPRA Exam Dates
                            </span>
                            <span className="text-emerald-400 group-hover:translate-x-1 transition-transform">→</span>
                        </Link>

                        <Link
                            href="/opra-quiz"
                            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl p-4 text-left flex items-center justify-between transition-all group shadow-lg"
                        >
                            <span>Take the Free OPRA Readiness Quiz</span>
                            <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                    </div>

                    <div className="pt-6 border-t border-slate-700/60 text-slate-400 text-sm">
                        For general enquiries, contact us at{" "}
                        <a
                            href="mailto:contact@opraexam.in"
                            className="text-emerald-400 underline hover:text-emerald-300 font-medium"
                        >
                            contact@opraexam.in
                        </a>
                        .
                    </div>
                </div>
            </section>

            {/* ─── Important Disclaimer ────────────────────────────────────── */}
            <section className="py-12 px-4 bg-slate-100 border-t border-slate-200">
                <div className="container mx-auto max-w-4xl">
                    <div className="bg-white rounded-2xl border border-slate-300 p-6 sm:p-8 shadow-xs">
                        <div className="flex items-center gap-2 mb-3">
                            <span className="text-amber-600 font-bold text-lg">⚠️</span>
                            <h2 className="text-lg font-bold text-slate-900 tracking-tight">
                                Important Disclaimer
                            </h2>
                        </div>
                        <div className="text-slate-600 text-xs sm:text-sm leading-relaxed space-y-3">
                            <p>
                                <strong>OPRAExam.in</strong> is an independent educational and examination preparation resource. We are not affiliated with, endorsed by, or officially associated with the Australian Pharmacy Council (APC), the Pharmacy Board of Australia, Ahpra, or the Pharmacy Council of New Zealand.
                            </p>
                            <p>
                                Our content is provided for educational and informational purposes only. Examination requirements, fees, registration procedures, and policies may change. Candidates should refer to the relevant official regulatory authorities for current and authoritative information.
                            </p>
                            <p className="text-slate-500">
                                OPRA® is a registered trademark of its respective owner. Use of the examination name on this website is for identification and informational purposes only.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
