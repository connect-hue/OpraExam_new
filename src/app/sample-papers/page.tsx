import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import SamplePaperGate from '@/components/SamplePaperGate';

export const revalidate = 60;

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || process.env.SITE_URL || 'https://www.opraexam.in').replace(/\/$/, '');

export const metadata: Metadata = {
  title: {
    absolute: "OPRA Exam Sample Papers 2026 | Free MCQs & Answers",
  },
  description:
    "Practise free OPRA exam sample questions with answers and explanations. Explore the 2026 exam pattern, five syllabus areas and mock test resources.",
  keywords: [
    "OPRA Exam Sample Paper",
    "OPRA exam sample paper 2026",
    "OPRA exam questions and answers",
    "OPRA exam practice questions",
    "OPRA MCQs",
    "OPRA exam mock test",
    "OPRA exam sample paper PDF",
    "Australian pharmacy council sample test",
    "OPRA pharmaceutical calculations practice",
  ],
  alternates: {
    canonical: `${siteUrl}/sample-papers`,
  },
  openGraph: {
    title: "OPRA Exam Sample Papers 2026 | Free MCQs & Answers",
    description:
      "Practise free OPRA exam sample questions with answers and explanations. Explore the 2026 exam pattern, five syllabus areas and mock test resources.",
    url: `${siteUrl}/sample-papers`,
    type: "website",
    images: [`${siteUrl}/og-image.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "OPRA Exam Sample Papers 2026 | Free MCQs & Answers",
    description:
      "Practise free OPRA exam sample questions with answers and explanations. Explore the 2026 exam pattern, five syllabus areas and mock test resources.",
    images: [`${siteUrl}/og-image.jpg`],
  },
};

const examPatternRows = [
  { label: "Examination", value: "Overseas Pharmacist Readiness Assessment (OPRA)" },
  { label: "Conducting authority", value: "Australian Pharmacy Council" },
  { label: "Question format", value: "Multiple-choice questions" },
  { label: "Total questions", value: "120" },
  { label: "Exam duration", value: "150 minutes" },
  { label: "Options per question", value: "Four" },
  { label: "Correct answers", value: "One per question" },
  { label: "Content areas", value: "Five" },
  { label: "Examination mode", value: "Computer-based at approved test centres" },
];

const subjectWeightages = [
  { name: "Therapeutics and Patient Care", weight: "45%", pct: 45, isPrimary: true },
  { name: "Biomedical Sciences", weight: "20%", pct: 20, isPrimary: false },
  { name: "Pharmacology and Toxicology", weight: "15%", pct: 15, isPrimary: false },
  { name: "Medicinal Chemistry and Biopharmaceutics", weight: "10%", pct: 10, isPrimary: false },
  { name: "Pharmacokinetics and Pharmacodynamics", weight: "10%", pct: 10, isPrimary: false },
];

const practiceQuestions = [
  {
    id: 1,
    domain: "Biomedical Sciences",
    weight: "20% Content Area",
    question: "Which of the following findings is MOST consistent with primary metabolic acidosis before respiratory compensation?",
    options: [
      "A. Increased blood pH and increased bicarbonate concentration",
      "B. Decreased blood pH and decreased bicarbonate concentration",
      "C. Increased blood pH and decreased carbon dioxide concentration",
      "D. Normal blood pH and increased bicarbonate concentration",
    ],
    answer: "B. Decreased blood pH and decreased bicarbonate concentration",
    explanation:
      "Metabolic acidosis is characterised by a primary decrease in serum bicarbonate concentration, resulting in a reduction in blood pH. Respiratory compensation may subsequently reduce arterial carbon dioxide through increased ventilation.",
  },
  {
    id: 2,
    domain: "Medicinal Chemistry and Biopharmaceutics",
    weight: "10% Content Area",
    question: "A weakly acidic drug has a pKa of 4.0. At a solution pH of 6.0, which form of the drug will predominate?",
    options: [
      "A. Unionised form",
      "B. Ionised form",
      "C. Both forms in equal concentrations",
      "D. The drug will be completely degraded",
    ],
    answer: "B. Ionised form",
    explanation:
      "For a weak acid, the Henderson–Hasselbalch equation is: pH = pKa + log([A⁻]/[HA]). At pH 6.0 and pKa 4.0, pH - pKa = 2.0, meaning log([A⁻]/[HA]) = 2, so the ratio of ionised to unionised drug is 100:1. Therefore, approximately 99% of the drug exists in the ionised form.",
  },
  {
    id: 3,
    domain: "Pharmacokinetics and Pharmacodynamics",
    weight: "10% Content Area",
    question: "A drug follows first-order elimination and has an elimination half-life of 4 hours. If 80 mg is present in the body initially, approximately how much will remain after 12 hours, assuming no additional doses?",
    options: [
      "A. 40 mg",
      "B. 20 mg",
      "C. 10 mg",
      "D. 5 mg",
    ],
    answer: "C. 10 mg",
    explanation:
      "Twelve hours represents three elimination half-lives (12 ÷ 4 = 3 half-lives). After 4 hours: 40 mg. After 8 hours: 20 mg. After 12 hours: 10 mg. The amount of drug remaining decreases by 50% during each consecutive half-life.",
  },
  {
    id: 4,
    domain: "Pharmacology and Toxicology",
    weight: "15% Content Area",
    question: "Naloxone is primarily used to reverse opioid toxicity through which mechanism?",
    options: [
      "A. Activation of opioid receptors",
      "B. Competitive antagonism at opioid receptors",
      "C. Inhibition of opioid metabolism",
      "D. Increased renal excretion of opioids",
    ],
    answer: "B. Competitive antagonism at opioid receptors",
    explanation:
      "Naloxone is an opioid receptor antagonist that reverses opioid effects, particularly life-threatening respiratory depression. It acts predominantly through competitive antagonism at mu-opioid receptors without exerting intrinsic agonist activity.",
  },
  {
    id: 5,
    domain: "Therapeutics and Patient Care",
    weight: "45% Content Area",
    question: "A prescription requires 500 mg of a medicine twice daily. The available tablet strength is 250 mg. How many tablets are required for a full day of treatment?",
    options: [
      "A. 2 tablets",
      "B. 3 tablets",
      "C. 4 tablets",
      "D. 6 tablets",
    ],
    answer: "C. 4 tablets",
    explanation:
      "Tablets per single dose = 500 mg ÷ 250 mg = 2 tablets. Total daily tablets = 2 tablets × 2 doses daily = 4 tablets. This example illustrates a fundamental pharmaceutical dose calculation. Candidates should also prepare for body surface area dosing, dilution, and creatinine clearance calculations.",
  },
  {
    id: 6,
    domain: "Pharmacokinetics & Calculations",
    weight: "10% Content Area",
    question: "A 72-year-old female patient (weight 60 kg, height 165 cm) presents with an acute bacterial infection requiring Gentamicin. Her serum creatinine is 120 µmol/L. Using the Cockcroft-Gault equation with female correction factor (0.85), what is her estimated Creatinine Clearance (CrCl)?",
    options: [
      "A. 24.2 mL/min",
      "B. 35.5 mL/min",
      "C. 40.0 mL/min",
      "D. 47.1 mL/min",
    ],
    answer: "B. 35.5 mL/min",
    explanation:
      "Cockcroft-Gault formula: CrCl = [((140 - Age) × Weight in kg) / (0.814 × Serum Creatinine in µmol/L)] × 0.85 (for females). CrCl = [((140 - 72) × 60) / (0.814 × 120)] × 0.85 = (4080 / 97.68) × 0.85 = 41.77 × 0.85 ≈ 35.5 mL/min.",
  },
  {
    id: 7,
    domain: "Medicinal Chemistry & Biopharmaceutics",
    weight: "10% Content Area",
    question: "Which of the following structural modifications to a penicillin core structure is primarily responsible for conferring resistance against bacterial beta-lactamase enzymes?",
    options: [
      "A. Introducing bulky, sterically hindering aromatic side chains (e.g., Flucloxacillin)",
      "B. Adding an amino group to the alpha carbon (e.g., Ampicillin)",
      "C. Replacing the thiazolidine ring with a dihydrothiazine ring",
      "D. Esterification of the carboxylic acid group at position 3",
    ],
    answer: "A. Introducing bulky, sterically hindering aromatic side chains (e.g., Flucloxacillin)",
    explanation:
      "Bulky aromatic acyl side chains provide steric hindrance that physically blocks the catalytic active site of staphylococcal beta-lactamase (penicillinase) from hydrolysing the beta-lactam ring, as seen in Flucloxacillin and Oxacillin.",
  },
  {
    id: 8,
    domain: "Clinical Therapeutics & Patient Care",
    weight: "45% Content Area",
    question: "A 64-year-old male with type 2 diabetes and hypertension is prescribed Enalapril 20 mg daily. During routine follow-up, his serum creatinine is measured at 180 µmol/L (baseline 110 µmol/L) and serum potassium is 5.8 mmol/L. According to therapeutic practice guidelines, what is the most appropriate initial management step?",
    options: [
      "A. Increase the dose of Enalapril to achieve better renal protective perfusion",
      "B. Withhold Enalapril, assess hydration status, and recheck renal function within 72 hours",
      "C. Add Spironolactone 25 mg daily to manage resistant hypertension",
      "D. Immediately commence sodium polystyrene sulfonate and maintain the ACE inhibitor",
    ],
    answer: "B. Withhold Enalapril, assess hydration status, and recheck renal function within 72 hours",
    explanation:
      "A rise in serum creatinine >30% above baseline or serum potassium exceeding 5.5–6.0 mmol/L following ACE inhibitor initiation warrants temporary withholding, evaluation of volume depletion or concurrent NSAID use, and urgent re-monitoring of renal biochemistry.",
  },
];

const samplePaperFaqs = [
  {
    q: "1. Where can I find OPRA exam sample papers with answers?",
    a: "The Australian Pharmacy Council provides official sample content through its website. Candidates can also practise with independently developed OPRA-style questions covering the published examination syllabus.",
  },
  {
    q: "2. How many questions are in the OPRA exam?",
    a: "The OPRA exam consists of 120 multiple-choice questions to be completed in 150 minutes.",
  },
  {
    q: "3. Are OPRA exam sample papers useful for preparation?",
    a: "Yes. Sample questions help candidates understand examination formats, revise pharmaceutical concepts, practise calculations, and identify areas requiring further study.",
  },
  {
    q: "4. Can I use a calculator in the OPRA exam?",
    a: "Yes. According to APC's exam-day guidance, candidates may bring a compliant standard or scientific calculator. Calculators must meet the applicable restrictions. An online calculator is also provided at the testing centre.",
  },
  {
    q: "5. What is the passing score for an OPRA mock test?",
    a: "There is no universal mock-test percentage that guarantees success in the actual OPRA examination. The APC uses a scaled scoring system and an examination standard-setting process. Practice-test scores should be used to identify knowledge gaps and measure progress rather than predict an official pass result.",
  },
  {
    q: "6. Are OPRA sample-paper questions the same as the real exam?",
    a: "No. Official APC sample content demonstrates examination question formats, but live examination questions differ. Independently developed practice questions are educational resources and are not official APC examination questions.",
  },
  {
    q: "7. Which subjects should I focus on when practising OPRA questions?",
    a: "All five syllabus content areas are important. Therapeutics and Patient Care has the highest published approximate weightage at 45%.",
  },
  {
    q: "8. Where can I check the complete OPRA exam syllabus?",
    a: "You can review our OPRA Exam Syllabus 2026 guide on this website for subject-wise weightage, key topics, and preparation guidance.",
  },
];

const studySteps = [
  {
    step: "1",
    title: "Review the OPRA Exam Syllabus",
    desc: "Before starting a mock test, understand the five content areas and their respective weightages.",
  },
  {
    step: "2",
    title: "Practise Under Timed Conditions",
    desc: "The actual OPRA examination allows 150 minutes for 120 questions. Practising with a time limit can help you improve question-reading speed and time management.",
  },
  {
    step: "3",
    title: "Review Every Explanation",
    desc: "Do not focus only on whether an answer is correct. Understand why the correct option is appropriate and why the alternatives are incorrect.",
  },
  {
    step: "4",
    title: "Identify Weak Subjects",
    desc: "Review performance across Biomedical Sciences, Pharmacology, Pharmacokinetics, Medicinal Chemistry, and Therapeutics.",
  },
  {
    step: "5",
    title: "Revise Pharmaceutical Calculations",
    desc: "Regularly practise dose calculations, dilution, concentration, infusion rates, and pharmacokinetic formulas.",
  },
  {
    step: "6",
    title: "Repeat Practice After Revision",
    desc: "Reattempt questions after reviewing weak concepts, and use new questions to assess whether your understanding has improved.",
  },
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
        item: `${siteUrl}/sample-papers`,
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
        {/* ─── 1. Header Hero ─────────────────────────────────────────── */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-emerald-800 mb-4">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            2026 Examination Blueprint
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            OPRA Exam Sample Papers 2026: <br className="hidden sm:inline" />
            <span className="text-emerald-600">Free Practice Questions &amp; Answers</span>
          </h1>
          <div className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto space-y-4">
            <p>
              Preparing for the Overseas Pharmacist Readiness Assessment (OPRA)? Practising OPRA exam sample questions is a useful way to understand the examination format, revise important pharmaceutical concepts, and evaluate your preparation.
            </p>
            <p>
              On this page, you can explore free OPRA exam practice questions with answers and explanations, understand the official exam pattern, and access resources for further practice.
            </p>
            <p className="text-sm sm:text-base text-slate-500">
              Our independently developed OPRA-style questions are organised around the five content areas outlined by the Australian Pharmacy Council (APC).
            </p>
          </div>

          {/* Quick Action Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <a
              href="#practice-questions"
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm px-6 py-3 rounded-full shadow-xs transition-colors"
            >
              Start Free Practice Questions ↓
            </a>
            <a
              href="#exam-pattern"
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm px-6 py-3 rounded-full shadow-xs transition-colors"
            >
              View Exam Pattern
            </a>
            <a
              href="#official-apc-sample"
              className="bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-semibold text-sm px-6 py-3 rounded-full shadow-xs transition-colors"
            >
              Official APC Sample Content
            </a>
          </div>
        </header>

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
            <span className="text-2xl sm:text-3xl font-extrabold text-emerald-600 block mb-1">5</span>
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Content Areas</span>
          </div>
        </div>

        {/* ─── 2. OPRA Exam Pattern 2026 ───────────────────────────────── */}
        <section id="exam-pattern" className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              OPRA Exam Pattern 2026
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Before attempting an OPRA sample paper, it is important to understand the official examination structure.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs mb-6">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-xs sm:text-sm uppercase tracking-wider">
                    <th className="py-3.5 px-6 font-bold w-1/2">Exam Details</th>
                    <th className="py-3.5 px-6 font-bold w-1/2">Information</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                  {examPatternRows.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}>
                      <td className="py-3 px-6 font-semibold text-slate-900">{row.label}</td>
                      <td className="py-3 px-6 text-slate-700">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-emerald-50/80 border border-emerald-200 rounded-2xl p-4 text-center text-emerald-950 font-medium text-sm sm:text-base">
            Candidates have an average of 75 seconds per question when attempting all 120 questions.
          </div>
        </section>

        {/* ─── 3. Subject-Wise Coverage ────────────────────────────────── */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-8">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              OPRA Exam Sample Papers: Subject-Wise Coverage
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              The OPRA exam assesses five core content areas with the following approximate question distribution:
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs mb-6">
            <div className="space-y-4">
              {subjectWeightages.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1.5 text-sm sm:text-base">
                    <span className="font-semibold text-slate-900">{item.name}</span>
                    <span className="font-bold text-slate-900">{item.weight}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        item.isPrimary ? "bg-emerald-600" : "bg-slate-500"
                      }`}
                      style={{ width: `${item.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-100 rounded-2xl p-4 text-center text-slate-700 text-sm sm:text-base">
            A balanced OPRA exam mock test should cover these content areas, with particular attention to Therapeutics and Patient Care.
          </div>
        </section>

        {/* ─── 4. Free Practice Questions Section (Displayed before form) ─ */}
        <section id="practice-questions" className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10 pb-4 border-b border-slate-200">
            <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Free Question Bank
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-3">
              Free OPRA Exam Practice Questions With Answers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-3">
              The following original practice questions are intended to help overseas-qualified pharmacists revise important concepts relevant to the OPRA syllabus.
            </p>
            <p className="text-xs text-slate-500 italic">
              These questions are not taken from a live APC examination and do not represent a prediction of actual examination questions.
            </p>
          </div>

          <div className="space-y-6">
            {practiceQuestions.map((q) => (
              <div
                key={q.id}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-xs hover:border-emerald-300 transition-all"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-100">
                    Question {q.id} • {q.domain}
                  </span>
                  <span className="text-xs font-semibold text-slate-400 bg-slate-50 px-2.5 py-0.5 rounded-full">
                    {q.weight}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-semibold text-slate-900 mb-5 leading-relaxed">
                  {q.question}
                </h3>

                <div className="space-y-2.5 mb-6">
                  {q.options.map((opt, optIdx) => (
                    <div
                      key={optIdx}
                      className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 text-slate-700 text-sm font-medium"
                    >
                      {opt}
                    </div>
                  ))}
                </div>

                <details className="group bg-emerald-50/60 rounded-2xl p-5 border border-emerald-200/80 cursor-pointer">
                  <summary className="font-bold text-sm text-emerald-800 flex items-center justify-between outline-none list-none">
                    <span>View Correct Answer &amp; Explanation</span>
                    <span className="text-emerald-600 group-open:rotate-180 transition-transform ml-2">▼</span>
                  </summary>
                  <div className="mt-3 pt-3 border-t border-emerald-200/60 text-slate-700 text-sm leading-relaxed space-y-2">
                    <p className="font-bold text-emerald-900 text-base">
                      {q.answer}
                    </p>
                    <p className="text-slate-700">
                      <strong>Explanation: </strong>
                      {q.explanation}
                    </p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 5. Official APC Sample PDF Section ──────────────────────── */}
        <section id="official-apc-sample" className="mb-16">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
            <div className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Official Reference
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              Official OPRA Exam Sample Paper PDF
            </h2>
            <div className="text-slate-300 text-sm sm:text-base leading-relaxed space-y-4 mb-8">
              <p>
                The Australian Pharmacy Council provides official sample examination content to help candidates become familiar with the OPRA question format.
              </p>
              <p>
                The official sample content includes multiple-choice questions drawn from the examination&apos;s content areas and an answer sheet.
              </p>
              <p className="text-slate-400 text-xs sm:text-sm">
                These questions are supplied for preparation and familiarisation purposes and are not questions currently used in live examinations.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <a
                href="https://www.pharmacycouncil.org.au/resources/opra-exam-guide-and-sample-content/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-6 py-3.5 rounded-full shadow-lg transition-all text-sm group"
              >
                <span>Access the Official APC OPRA Exam Sample Content</span>
                <span className="ml-2 group-hover:translate-x-1 transition-transform">↗</span>
              </a>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800 text-xs text-slate-400">
              For additional practice, candidates may also use independently developed OPRA-style mock examinations and pharmaceutical calculation exercises.
            </div>
          </div>
        </section>

        {/* ─── 6. Your Mock-Test Resource (Separated PDF Access) ───────── */}
        <section id="download-pack" className="mb-16">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              Practice Papers
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Download Full Practice Mock Papers
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2">
              Access independently developed 120-question practice papers with detailed answers and clinical rationales.
            </p>
          </div>

          <SamplePaperGate />
        </section>

        {/* ─── 7. How to Use OPRA Exam Sample Papers Effectively ───────── */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-2">
              Preparation Guide
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              How to Use OPRA Exam Sample Papers Effectively
            </h2>
            <p className="text-slate-600 text-sm sm:text-base">
              Follow these six practical recommendations to maximize your mock-test learning:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {studySteps.map((s, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 font-extrabold text-sm flex items-center justify-center mb-4">
                    {s.step}
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {s.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 8. Frequently Asked Questions ──────────────────────────── */}
        <section className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-xs mb-16">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
              Frequently Asked Questions About OPRA Exam Sample Papers
            </h2>
            <p className="text-slate-500 text-sm">
              Answers to common queries regarding sample questions, calculators, scoring, and official resources.
            </p>
          </div>

          <div className="space-y-4 max-w-4xl mx-auto">
            {samplePaperFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group border border-slate-200 rounded-2xl p-5 cursor-pointer open:border-emerald-300 open:bg-emerald-50/20 transition-all"
              >
                <summary className="font-bold text-slate-900 flex justify-between items-center outline-none list-none text-sm sm:text-base">
                  <span>{faq.q}</span>
                  <span className="text-emerald-500 group-open:rotate-180 transition-transform ml-4 shrink-0">
                    ▼
                  </span>
                </summary>
                <div className="mt-3 pt-3 border-t border-slate-100 text-slate-600 text-sm sm:text-base leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ─── 9. Start Practising for the OPRA Exam (CTA) ────────────── */}
        <section className="bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl text-center">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-3 tracking-tight">
            Start Practising for the OPRA Exam
          </h2>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto mb-8 leading-relaxed">
            Regular practice, concept-based revision, and structured learning can help you prepare more effectively. Explore the following resources:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto mb-8">
            <Link
              href="/syllabus"
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-4 text-center transition-all group"
            >
              <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                OPRA Exam Syllabus 2026
              </div>
              <div className="text-xs text-slate-400 mt-1">Review all 5 content areas →</div>
            </Link>

            <Link
              href="/exam-dates"
              className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-4 text-center transition-all group"
            >
              <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                OPRA Exam Dates
              </div>
              <div className="text-xs text-slate-400 mt-1">Check 2026 test windows →</div>
            </Link>

            <Link
              href="/opra-quiz"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl p-4 text-center transition-all group shadow-md"
            >
              <div>Free OPRA Readiness Quiz</div>
              <div className="text-xs text-slate-800 mt-1">Evaluate your baseline score →</div>
            </Link>
          </div>

          <div className="pt-6 border-t border-slate-800 text-xs text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Disclaimer: OPRAExam.in is an independent educational platform and is not affiliated with or endorsed by the Australian Pharmacy Council. All independently developed questions are provided for educational and revision purposes only. Candidates should verify current examination requirements through the official APC website.
          </div>
        </section>
      </main>
    </div>
  );
}
