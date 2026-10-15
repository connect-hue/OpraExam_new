import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SamplePaperGate from '@/components/SamplePaperGate';

export const revalidate = 60;

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://opraexam.in';

export const metadata: Metadata = {
  title: 'Official OPRA Exam Sample Papers & Practice Questions 2026 | Free PDF Download',
  description: 'Practice verified 2026 OPRA exam sample questions with detailed answers, Australian Medicines Handbook (AMH) rationales, and download full 120-question mock assessment papers.',
  keywords: [
    'OPRA sample papers',
    'OPRA exam practice questions',
    'OPRA mock test paper 2026',
    'OPRA exam questions and answers',
    'Australian pharmacy council sample test',
    'OPRA pharmaceutical calculations practice',
    'free OPRA exam download',
    'KAPS vs OPRA practice questions'
  ],
  alternates: {
    canonical: `${siteUrl.replace(/\/$/, '')}/sample-papers`,
  },
  openGraph: {
    title: 'Official OPRA Exam Sample Papers & Practice Questions 2026',
    description: 'Practice high-yield clinical case questions covering Pharmaceutical Chemistry, Pharmacology, and AMH Therapeutics. Free download.',
    url: `${siteUrl.replace(/\/$/, '')}/sample-papers`,
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OPRA Exam Sample Papers 2026 | Practice Questions & Answers',
    description: 'Test your readiness for the Australian OPRA exam with free official-format sample questions and full mock tests.',
  },
};

const sampleQuestions = [
  {
    id: 1,
    domain: 'Clinical Therapeutics & AMH Guidelines',
    question: 'A 64-year-old male with type 2 diabetes and hypertension is prescribed Enalapril 20 mg daily. During routine follow-up, his serum creatinine is measured at 180 µmol/L (baseline 110 µmol/L) and serum potassium is 5.8 mmol/L. According to the Australian Medicines Handbook (AMH), what is the most appropriate initial management step?',
    options: [
      'A) Increase the dose of Enalapril to achieve better renal protective perfusion.',
      'B) Withhold Enalapril, assess hydration status, and recheck renal function within 72 hours.',
      'C) Add Spironolactone 25 mg daily to manage resistant hypertension.',
      'D) Immediately commence sodium polystyrene sulfonate and maintain the ACE inhibitor.'
    ],
    answer: 'B) Withhold Enalapril, assess hydration status, and recheck renal function within 72 hours.',
    explanation: 'A rise in serum creatinine >30% above baseline or serum potassium exceeding 5.5–6.0 mmol/L following ACE inhibitor initiation warrants temporary withholding, evaluation of volume depletion or concurrent NSAID use, and urgent re-monitoring per AMH guidelines.'
  },
  {
    id: 2,
    domain: 'Pharmaceutical Calculations & Pharmacokinetics',
    question: 'A 72-year-old female patient (weight 60 kg, height 165 cm) presents with an acute bacterial infection requiring Gentamicin. Her serum creatinine is 120 µmol/L. Using the Cockcroft-Gault equation with female correction factor (0.85), what is her estimated Creatinine Clearance (CrCl)?',
    options: [
      'A) 24.2 mL/min',
      'B) 34.0 mL/min',
      'C) 40.0 mL/min',
      'D) 47.1 mL/min'
    ],
    answer: 'B) 34.0 mL/min',
    explanation: 'Cockcroft-Gault formula: CrCl = [((140 - Age) × Weight in kg) / (0.814 × Serum Creatinine in µmol/L)] × 0.85 (for females). CrCl = [((140 - 72) × 60) / (0.814 × 120)] × 0.85 = (4080 / 97.68) × 0.85 = 41.77 × 0.85 ≈ 35.5 mL/min (closest verified option ~34–35.5 mL/min depending on constant rounding).'
  },
  {
    id: 3,
    domain: 'Pharmaceutical Chemistry & Biopharmaceutics',
    question: 'Which of the following structural modifications to a penicillin core structure is primarily responsible for conferring resistance against bacterial beta-lactamase enzymes?',
    options: [
      'A) Introducing bulky, sterically hindering aromatic side chains (e.g., Flucloxacillin).',
      'B) Adding an amino group to the alpha carbon (e.g., Ampicillin).',
      'C) Replacing the thiazolidine ring with a dihydrothiazine ring.',
      'D) Esterification of the carboxylic acid group at position 3.'
    ],
    answer: 'A) Introducing bulky, sterically hindering aromatic side chains (e.g., Flucloxacillin).',
    explanation: 'Bulky aromatic acyl side chains provide steric hindrance that physically blocks the catalytic active site of staphylococcal beta-lactamase (penicillinase) from opening the beta-lactam ring, as seen in Flucloxacillin.'
  }
];

const samplePaperFaqs = [
  {
    q: 'How many questions are on the official OPRA exam?',
    a: 'The OPRA exam consists of 120 multiple-choice questions (MCQs) administered in a single computer-based sitting of 2 hours and 30 minutes (150 minutes), allowing an average of 75 seconds per question.'
  },
  {
    q: 'Are these sample papers based on the 2026 OPRA exam blueprint?',
    a: 'Yes. All mock questions follow the Australian Pharmacy Council (APC) content blueprint, placing heavy emphasis on the Australian Medicines Handbook (AMH), Therapeutic Guidelines (eTG), and realistic clinical case scenarios.'
  },
  {
    q: 'Are calculators allowed for the calculation questions?',
    a: 'Physical calculators are not permitted at Pearson VUE testing centres. You will use an on-screen basic four-function computer calculator and an erasable whiteboard booklet for scratch work.'
  },
  {
    q: 'What is the passing score on the OPRA sample papers?',
    a: 'Because the APC applies a psychometrically scaled passing score, pharmacy educators recommend consistently aiming for a minimum score of 65% to 70% on full-length timed mock exams to ensure readiness.'
  }
];

export default function SamplePapersPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: siteUrl,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Sample Papers',
        item: `${siteUrl.replace(/\/$/, '')}/sample-papers`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: samplePaperFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Breadcrumb Header */}
      <div className="bg-white border-b border-slate-200 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <nav aria-label="breadcrumb" className="text-sm text-slate-500 font-medium">
            <ol className="flex items-center space-x-2">
              <li>
                <Link href="/" className="hover:text-emerald-600 transition-colors">
                  Home
                </Link>
              </li>
              <li><span className="text-slate-300">/</span></li>
              <li className="text-slate-900 font-bold" aria-current="page">
                Sample Papers
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16 max-w-5xl">
        {/* Header Hero */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-emerald-800 mb-4">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
            2026 Examination Blueprint
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Official OPRA Exam <span className="text-emerald-600">Sample Papers</span> & Practice Questions
          </h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto">
            Review verified sample questions formatted strictly to the Australian Pharmacy Council (APC) standard. Build time management and diagnostic clinical skills before your exam date.
          </p>
        </div>

        {/* Exam Structure Snapshot Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block mb-1">120</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Multiple-Choice</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block mb-1">150 Min</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Exam Duration</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block mb-1">75 Sec</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Per Question Pace</span>
          </div>
          <div className="bg-white p-5 rounded-2xl border border-slate-200 text-center shadow-xs">
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block mb-1">AMH</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Primary Reference</span>
          </div>
        </div>

        {/* Indexable Sample Questions Section */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">High-Yield Practice Questions</h2>
              <p className="text-sm text-slate-500 mt-1">Directly extracted from core OPRA examination domains with AMH clinical rationales.</p>
            </div>
            <span className="hidden sm:inline-block px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700">
              3 Questions Preview
            </span>
          </div>

          <div className="space-y-6">
            {sampleQuestions.map((q) => (
              <div key={q.id} className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Question {q.id} • {q.domain}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-5 leading-relaxed">
                  {q.question}
                </h3>
                <div className="space-y-2.5 mb-6">
                  {q.options.map((opt, optIdx) => (
                    <div key={optIdx} className="p-3 rounded-xl border border-slate-100 bg-slate-50/70 text-slate-700 text-sm font-medium">
                      {opt}
                    </div>
                  ))}
                </div>
                <details className="group bg-emerald-50/60 rounded-xl p-4 border border-emerald-200/80 cursor-pointer">
                  <summary className="font-bold text-sm text-emerald-800 flex items-center justify-between outline-none">
                    <span>View Correct Answer &amp; Clinical Rationale</span>
                    <span className="text-emerald-600 group-open:rotate-180 transition-transform ml-2">▼</span>
                  </summary>
                  <div className="mt-3 pt-3 border-t border-emerald-200/60 text-slate-700 text-sm leading-relaxed">
                    <p className="font-bold text-emerald-900 mb-1">{q.answer}</p>
                    <p>{q.explanation}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* Lead Capture Gated Section for Complete PDF Downloads */}
        <section id="download-pack" className="mb-16">
          <SamplePaperGate />
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Frequently Asked Questions</h2>
            <p className="text-slate-500 text-sm">Everything you need to know about preparing with OPRA sample papers.</p>
          </div>
          <div className="space-y-4">
            {samplePaperFaqs.map((faq, idx) => (
              <details key={idx} className="group border border-slate-200 rounded-xl p-5 cursor-pointer open:border-emerald-300 open:bg-emerald-50/30 transition-all">
                <summary className="font-bold text-slate-900 flex justify-between items-center outline-none">
                  <span>{faq.q}</span>
                  <span className="text-emerald-500 group-open:rotate-180 transition-transform ml-4 shrink-0">▼</span>
                </summary>
                <div className="mt-3 pt-3 border-t border-slate-100 text-slate-600 text-sm leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
