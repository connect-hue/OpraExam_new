import Link from 'next/link';
import type { Metadata } from 'next';
import LeadForm from '@/components/LeadForm';

const SITE_URL = 'https://www.opraexam.in';

export const metadata: Metadata = {
  title: {
    absolute: "OPRA Exam Syllabus 2026: 5 Subjects, Topics & Weightage",
  },
  description:
    "Explore the OPRA Exam Syllabus 2026 with all 5 APC content areas, official subject weightage, important topics, exam pattern and preparation tips.",
  keywords: [
    "OPRA exam syllabus",
    "OPRA exam syllabus 2026",
    "OPRA exam pattern",
    "OPRA exam subjects",
    "OPRA subject weightage",
    "Australian pharmacy council syllabus",
    "overseas pharmacist readiness assessment syllabus",
    "pharmaceutical calculations OPRA",
    "Therapeutics and Patient Care OPRA",
  ],
  alternates: {
    canonical: `${SITE_URL}/syllabus`,
  },
  openGraph: {
    title: "OPRA Exam Syllabus 2026: 5 Subjects, Topics & Weightage",
    description:
      "Explore the OPRA Exam Syllabus 2026 with all 5 APC content areas, official subject weightage, important topics, exam pattern and preparation tips.",
    url: `${SITE_URL}/syllabus`,
    type: "website",
    siteName: "OPRAExam.in",
    locale: "en_AU",
    images: [{
      url: `${SITE_URL}/og-image.jpg`,
      width: 1200,
      height: 630,
      alt: "OPRA Exam Syllabus 2026 - OPRAExam.in",
    }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OPRA Exam Syllabus 2026: 5 Subjects, Topics & Weightage",
    description:
      "Explore the OPRA Exam Syllabus 2026 with all 5 APC content areas, official subject weightage, important topics, exam pattern and preparation tips.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

const syllabusFaqs = [
  {
    q: "1. How many subjects are included in the OPRA exam syllabus?",
    a: "The official OPRA exam syllabus consists of five content areas: Biomedical Sciences, Medicinal Chemistry and Biopharmaceutics, Pharmacokinetics and Pharmacodynamics, Pharmacology and Toxicology, and Therapeutics and Patient Care.",
  },
  {
    q: "2. Which subject has the highest weightage in the OPRA exam?",
    a: "Therapeutics and Patient Care has the highest approximate weightage at 45% of examination questions.",
  },
  {
    q: "3. What is the OPRA exam pattern in 2026?",
    a: "The OPRA exam consists of 120 multiple-choice questions completed within 150 minutes. Each question has four options, with one correct answer.",
  },
  {
    q: "4. Are pharmaceutical calculations included in OPRA?",
    a: "Yes. The published syllabus includes calculations involving drug doses, concentrations, dilutions, infusion rates, pharmacokinetics, and related pharmaceutical topics.",
  },
  {
    q: "5. Is Australian pharmacy law included in the OPRA syllabus?",
    a: "No. APC states that country-specific pharmacy legislation and practice standards are not assessed in OPRA. These are addressed in later stages of the registration pathway.",
  },
  {
    q: "6. Is the OPRA exam syllabus different from KAPS?",
    a: "Yes. OPRA replaced the previous KAPS examination in March 2025. OPRA uses a single computer-based examination and a published five-content-area structure with substantial emphasis on Therapeutics and Patient Care.",
  },
  {
    q: "7. Is there a fixed passing percentage for the OPRA exam?",
    a: "APC uses a scaled scoring system and a standard-setting process. Passing is based on meeting the overall standard for the allocated examination form, not a publicly specified fixed percentage or separate minimum passing score for each content area.",
  },
  {
    q: "8. Where can I find the official OPRA exam syllabus?",
    a: "The official examination guide and content specifications are available on the Australian Pharmacy Council website.",
  },
];

const examPatternDetails = [
  { label: "Examination", value: "Overseas Pharmacist Readiness Assessment (OPRA)" },
  { label: "Conducting authority", value: "Australian Pharmacy Council (APC)" },
  { label: "Examination mode", value: "Computer-based" },
  { label: "Question format", value: "Multiple-choice questions" },
  { label: "Total questions", value: "120" },
  { label: "Number of answer options", value: "4 per question" },
  { label: "Examination duration", value: "150 minutes" },
  { label: "Examination sessions", value: "Single examination sitting" },
  { label: "Syllabus content areas", value: "5" },
  { label: "Assessment approach", value: "Overall scaled performance" },
];

const subjectWeightages = [
  { name: "Therapeutics and Patient Care", weight: 45, isPrimary: true },
  { name: "Biomedical Sciences", weight: 20, isPrimary: false },
  { name: "Pharmacology and Toxicology", weight: 15, isPrimary: false },
  { name: "Medicinal Chemistry and Biopharmaceutics", weight: 10, isPrimary: false },
  { name: "Pharmacokinetics and Pharmacodynamics", weight: 10, isPrimary: false },
];

const detailedContentAreas = [
  {
    id: "biomedical-sciences",
    title: "1. Biomedical Sciences – 20%",
    weight: "20%",
    summary:
      "Biomedical Sciences focuses on the structure and normal functioning of the human body, the mechanisms of disease development, and changes in physiological processes during illness.",
    tip: "Focus on understanding normal physiological processes before studying the changes associated with particular diseases.",
    topics: [
      "Human physiology and functions of major organ systems",
      "Cardiovascular, respiratory, nervous, renal, gastrointestinal, and endocrine systems",
      "General pathophysiology and disease mechanisms",
      "Medical microbiology and infectious diseases",
      "Immunology, immune responses, and vaccination principles",
      "Fluid and electrolyte disorders",
      "Acid-base balance and related disturbances",
      "Haematological disorders",
      "Disease symptoms, diagnostic investigations, and laboratory values",
    ],
    defaultOpen: true,
  },
  {
    id: "medicinal-chemistry",
    title: "2. Medicinal Chemistry and Biopharmaceutics – 10%",
    weight: "10%",
    summary:
      "This content area covers drug physicochemical properties, pharmaceutical formulations, medicine stability, solubility, and principles influencing drug delivery.",
    tip: "Build conceptual understanding of how drug properties and formulation characteristics influence medicine stability and drug delivery.",
    topics: [
      "Physicochemical properties of pharmaceutical compounds",
      "Drug ionization, pKa, and partitioning",
      "Solubility and dissolution",
      "Dosage forms and formulation principles",
      "Oral, parenteral, topical, pulmonary, and other drug delivery routes",
      "Suspensions, emulsions, and solutions",
      "Chemical stability and drug degradation",
      "Hydrolysis and oxidation",
      "Zero-order and first-order degradation",
      "Pharmaceutical preservation and sterilisation",
    ],
    defaultOpen: false,
  },
  {
    id: "pharmacokinetics-pharmacodynamics",
    title: "3. Pharmacokinetics and Pharmacodynamics – 10%",
    weight: "10%",
    summary:
      "Pharmacokinetics examines how medicines move through the body, while pharmacodynamics explains the relationships between drug exposure, drug targets, and pharmacological effects.",
    tip: "Practise interpreting pharmacokinetic data and solving calculation-based questions. Understanding the meaning of formulas is as important as remembering them.",
    topics: [
      "Drug absorption, distribution, metabolism, and excretion (ADME)",
      "Bioavailability and bioequivalence",
      "Volume of distribution",
      "Drug clearance and elimination",
      "Biological half-life",
      "First-order and zero-order elimination concepts",
      "Steady-state concentrations",
      "Loading doses and maintenance dosing principles",
      "Plasma concentration-time curves",
      "Therapeutic drug monitoring",
      "Pharmacokinetic changes in renal and hepatic dysfunction",
      "Receptor interactions and concentration-response relationships",
    ],
    defaultOpen: false,
  },
  {
    id: "pharmacology-toxicology",
    title: "4. Pharmacology and Toxicology – 15%",
    weight: "15%",
    summary:
      "Pharmacology and Toxicology examines how medicines produce their effects, drug mechanisms of action, adverse reactions, interactions, and the effects of toxic substances.",
    tip: "When revising individual drug classes, compare their mechanisms of action, indications, major adverse effects, and clinically important interactions.",
    topics: [
      "Drug mechanisms of action",
      "Receptor pharmacology and dose-response relationships",
      "Agonists, antagonists, and partial agonists",
      "Autonomic nervous system pharmacology",
      "Cardiovascular and central nervous system medicines",
      "Antimicrobial and anticancer pharmacology",
      "Drug-drug interactions",
      "Enzyme induction and inhibition",
      "Adverse drug reactions",
      "Pharmacological effects in special populations",
      "Drug toxicity and overdose",
      "Recognition and management of poisoning",
      "Antidotes and toxicological treatment principles",
    ],
    defaultOpen: false,
  },
  {
    id: "therapeutics-patient-care",
    title: "5. Therapeutics and Patient Care – 45%",
    weight: "45%",
    summary:
      "Therapeutics and Patient Care is the largest content area in the OPRA examination. It assesses the application of biomedical and pharmaceutical knowledge to therapeutic decision-making, medicine safety, patient management, and the appropriate use of medicines.",
    tip: "Practise questions requiring you to evaluate patient information, understand treatment options, identify medicine-related risks, and apply pharmaceutical calculations.",
    topics: [
      "Principles of medicine selection and therapeutic management",
      "Assessment of patient conditions and treatment options",
      "Safe and effective use of medicines",
      "Identification and management of adverse effects",
      "Monitoring treatment effectiveness",
      "Medicine-related problems and adherence",
      "Drug selection considerations for older adults and children",
      "Medicine use during pregnancy and breastfeeding",
      "Dose adjustment considerations in renal and hepatic dysfunction",
      "Screening parameters such as body mass index and creatinine clearance",
      "Drug dosing calculations",
      "Weight-based and body surface area-based dosing",
      "Dilution and concentration calculations",
      "Alligation and ratio calculations",
      "Electrolyte concentrations and milliequivalents",
      "Intravenous infusion calculations",
      "Health promotion and disease prevention",
      "Non-pharmacological treatment options",
      "Harm minimisation and prevention of medicine misuse",
      "General principles of confidentiality and professionalism",
    ],
    defaultOpen: true,
  },
];

const calculationTopics = [
  "Dose calculations using body weight and body surface area",
  "Creatinine clearance calculations",
  "Ratio and proportion",
  "Percentage strength calculations",
  "Concentration and dilution",
  "Alligation",
  "Stock solution calculations",
  "Milliequivalents and milliosmoles",
  "Reconstitution calculations",
  "Infusion flow rates",
  "Isotonicity",
  "Pharmacokinetic calculations",
];

const preparationSteps = [
  {
    step: "Step 1",
    title: "Understand the Examination Structure",
    desc: "Review the five content areas, approximate subject weightages, examination duration, and question format before developing your preparation timetable.",
  },
  {
    step: "Step 2",
    title: "Create a Subject-Wise Study Plan",
    desc: "Allocate study time according to the breadth of the syllabus, your existing knowledge, and the relative weightage of different content areas.",
  },
  {
    step: "Step 3",
    title: "Strengthen Fundamental Pharmaceutical Knowledge",
    desc: "Revise important concepts in physiology, pharmacology, pharmacokinetics, medicinal chemistry, and pharmaceutics.",
  },
  {
    step: "Step 4",
    title: "Focus on Therapeutics and Patient Care",
    desc: "Develop a strong understanding of therapeutic reasoning, medicine safety, clinical applications, and pharmaceutical calculations.",
  },
  {
    step: "Step 5",
    title: "Practise OPRA-Style Questions",
    desc: "Use practice questions to reinforce concepts, identify mistakes, and improve your ability to answer within the allocated examination time.",
  },
  {
    step: "Step 6",
    title: "Review Your Weak Areas",
    desc: "Evaluate your performance regularly and revisit topics that require additional study.",
  },
];

export default function SyllabusPage() {

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Syllabus',
        item: `${SITE_URL}/syllabus`,
      },
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: syllabusFaqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.a,
      },
    })),
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      {/* Schema Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema).replace(/</g, '\\u003c') }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema).replace(/</g, '\\u003c') }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb Navigation */}
        <nav aria-label="breadcrumb" className="mb-8 text-sm text-slate-500 font-medium">
          <ol className="flex items-center space-x-2">
            <li>
              <Link href="/" className="hover:text-emerald-600 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <span className="text-slate-300">/</span>
            </li>
            <li className="text-slate-900 font-bold" aria-current="page">
              Syllabus
            </li>
          </ol>
        </nav>

        {/* ─── 1. Hero Section ─────────────────────────────────────────── */}
        <header className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white p-8 md:p-14 lg:p-16 mb-16 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-emerald-300 mb-6 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              Based on the Australian Pharmacy Council OPRA Exam Guide
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              OPRA Exam Syllabus 2026: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Subjects, Topics & Weightage
              </span>
            </h1>

            <div className="text-slate-300 text-base sm:text-lg leading-relaxed mb-8 max-w-3xl space-y-4">
              <p>
                The OPRA Exam Syllabus 2026 covers five major content areas that assess the biomedical, pharmaceutical, and clinical science knowledge of overseas-qualified pharmacists seeking to progress towards pharmacist registration in Australia or New Zealand.
              </p>
              <p>
                The Overseas Pharmacist Readiness Assessment (OPRA) is conducted by the Australian Pharmacy Council (APC). Understanding the examination syllabus, subject weightage, and question format can help candidates develop a focused and structured preparation strategy.
              </p>
              <p className="text-slate-400 text-sm sm:text-base">
                This guide explains the five OPRA syllabus content areas, important study topics, examination pattern, and practical preparation strategies based on the APC&apos;s published OPRA Exam Guide.
              </p>
            </div>

            {/* Quick Stats Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-left">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">120</div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">MCQ Questions</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">150 mins</div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">Total Duration</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">Computer</div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">Based Testing</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">5</div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">Content Areas</div>
              </div>
            </div>
          </div>
        </header>

        {/* ─── 2. OPRA Exam Pattern 2026 ───────────────────────────────── */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Structure & Format
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              OPRA Exam Pattern 2026
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Before beginning your preparation, it is important to understand the OPRA examination structure.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm max-w-4xl mx-auto mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-sm uppercase tracking-wider">
                    <th className="py-4 px-6 font-bold w-1/2">Exam Particulars</th>
                    <th className="py-4 px-6 font-bold w-1/2">Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                  {examPatternDetails.map((row, i) => (
                    <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-slate-50/70"}>
                      <td className="py-3.5 px-6 font-semibold text-slate-900">{row.label}</td>
                      <td className="py-3.5 px-6 text-slate-700">{row.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-100/80 rounded-2xl p-6 border border-slate-200 text-slate-700 text-sm sm:text-base space-y-2">
            <p className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span>The examination is closed-book and administered at approved testing centres. Each question has one correct answer.</span>
            </p>
            <p className="flex items-start gap-2">
              <span className="text-emerald-600 font-bold shrink-0">✓</span>
              <span>The examination assesses knowledge of pharmaceutical sciences and the application of this knowledge in patient care.</span>
            </p>
          </div>
        </section>

        {/* ─── 3. OPRA Exam Syllabus 2026: Subject-Wise Weightage ──────── */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Official Weightage
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              OPRA Exam Syllabus 2026: Subject-Wise Weightage
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              According to the Australian Pharmacy Council, the OPRA examination consists of five content areas with the following approximate question distribution.
            </p>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm max-w-4xl mx-auto mb-8">
            <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-6">
              Official APC subject weightage
            </div>

            {/* Visual Bar Chart / Progress Bars matching requested specs */}
            <div className="space-y-6">
              {subjectWeightages.map((item, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-2 text-sm sm:text-base">
                    <span className="font-semibold text-slate-900">{item.name}</span>
                    <span className="font-extrabold text-slate-900 text-base sm:text-lg">{item.weight}%</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3.5 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${item.isPrimary ? "bg-emerald-600" : "bg-slate-500"
                        }`}
                      style={{ width: `${item.weight}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 text-center text-xs sm:text-sm text-slate-500 italic">
              These are APC&apos;s published approximate percentages of examination questions, not individual subject passing thresholds.
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-emerald-50/80 rounded-2xl p-6 border border-emerald-200 text-slate-800 text-base leading-relaxed space-y-2">
            <p className="font-semibold text-emerald-950">
              Therapeutics and Patient Care has the highest examination weightage at 45%, followed by Biomedical Sciences at 20%.
            </p>
            <p className="text-slate-700">
              Candidates should consider these weightages while planning their studies, but preparation should cover all five content areas.
            </p>
          </div>
        </section>

        {/* ─── 4. Detailed OPRA Exam Syllabus: All 5 Content Areas ─────── */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Comprehensive Breakdown
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Detailed OPRA Exam Syllabus: All 5 Content Areas
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Explore the detailed scope, important study topics, and preparation tips for each of the five official content areas. Click any area to expand or collapse.
            </p>
          </div>

          <div className="space-y-6 max-w-5xl mx-auto">
            {detailedContentAreas.map((domain) => (
              <details
                key={domain.id}
                id={domain.id}
                open={domain.defaultOpen}
                className="group bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-md transition-all open:border-emerald-300 open:shadow-md"
              >
                <summary className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer list-none select-none outline-none">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                        Weight: {domain.weight}
                      </span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                      {domain.title}
                    </h3>
                  </div>
                  <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
                    <span className="text-xs font-semibold text-slate-500 group-open:hidden">Expand Topics ▼</span>
                    <span className="text-xs font-semibold text-emerald-600 hidden group-open:inline">Collapse ▲</span>
                    <div className="w-8 h-8 rounded-full bg-slate-100 group-open:bg-emerald-100 text-slate-600 group-open:text-emerald-700 flex items-center justify-center transition-colors">
                      <svg
                        className="w-4 h-4 transform group-open:rotate-180 transition-transform"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </summary>

                <div className="mt-6 pt-6 border-t border-slate-100">
                  <p className="text-slate-700 text-base sm:text-lg leading-relaxed mb-6">
                    {domain.summary}
                  </p>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                    Important topics to study:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                    {domain.topics.map((topic, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 bg-slate-50 border border-slate-100 rounded-xl p-3.5"
                      >
                        <span className="text-emerald-500 font-bold text-sm shrink-0 mt-0.5">•</span>
                        <span className="text-sm font-medium text-slate-700 leading-snug">{topic}</span>
                      </div>
                    ))}
                  </div>

                  {/* Preparation Tip Box */}
                  <div className="bg-emerald-50/70 border-l-4 border-emerald-500 rounded-r-xl p-4 text-sm sm:text-base text-slate-800">
                    <strong className="text-emerald-900 font-bold">Preparation tip: </strong>
                    {domain.tip}
                  </div>
                </div>
              </details>
            ))}
          </div>

          <div className="max-w-4xl mx-auto mt-6 text-center">
            <p className="text-xs sm:text-sm text-slate-500 italic">
              The topics above are a study-oriented summary of APC&apos;s published content areas and examples. They are not a prediction of individual examination questions.
            </p>
          </div>
        </section>

        {/* ─── 5. OPRA Exam Question Types (Cognitive Levels) ─────────── */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-block bg-purple-100 text-purple-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Cognitive Levels
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              OPRA Exam Question Types
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              The OPRA examination assesses different levels of knowledge and understanding. APC specifies the following approximate distribution:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mb-8">
            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                    55% Weightage
                  </span>
                  <span className="text-2xl">🧠</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Remembering and Recall
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  These questions assess knowledge of facts, medicine properties, scientific principles, terminology, and drug-related information.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-100 text-teal-800">
                    30% Weightage
                  </span>
                  <span className="text-2xl">💡</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Comprehension and Understanding
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  These questions evaluate how well candidates understand relationships between concepts, explain mechanisms, and compare relevant pharmaceutical information.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800">
                    15% Weightage
                  </span>
                  <span className="text-2xl">⚡</span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">
                  Application
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  These questions assess the ability to apply pharmaceutical knowledge to unfamiliar situations, interpret information, and solve problems.
                </p>
              </div>
            </div>
          </div>

          <div className="max-w-4xl mx-auto bg-slate-100 rounded-2xl p-5 text-center text-slate-700 text-sm sm:text-base font-medium">
            A successful preparation strategy should combine factual revision, conceptual understanding, and application-based practice.
          </div>
        </section>

        {/* ─── 6. Pharmaceutical Calculations in the OPRA Exam Syllabus ── */}
        <section className="mb-16">
          <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 shadow-sm max-w-5xl mx-auto">
            <div className="max-w-3xl mb-8">
              <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
                Calculations Focus
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
                Pharmaceutical Calculations in the OPRA Exam Syllabus
              </h2>
              <p className="text-slate-700 text-base leading-relaxed">
                Pharmaceutical calculations are an important component of OPRA preparation. APC includes a range of calculation topics within its published examination content.
              </p>
            </div>

            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Relevant calculation topics include:
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
              {calculationTopics.map((calc, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-200/80 rounded-xl p-3.5 flex items-center gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold flex items-center justify-center shrink-0">
                    #
                  </span>
                  <span className="text-sm font-semibold text-slate-800">{calc}</span>
                </div>
              ))}
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 text-slate-800 text-sm sm:text-base">
              <strong>Tip for candidates:</strong> Candidates should develop calculation accuracy by working through different question formats and checking units carefully.
            </div>
          </div>
        </section>

        {/* ─── 7. What Is Not Included in the OPRA Exam Syllabus? ──────── */}
        <section className="mb-16">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 max-w-5xl mx-auto shadow-xl">
            <div className="inline-block bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
              Scope Clarification
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
              What Is Not Included in the OPRA Exam Syllabus?
            </h2>
            <div className="text-slate-300 text-base sm:text-lg leading-relaxed space-y-4">
              <p>
                The OPRA examination is primarily designed to assess biomedical, pharmaceutical, and clinical science knowledge.
              </p>
              <p>
                According to APC, pharmacy practice matters specific to Australian or New Zealand settings, such as country-specific legislation and professional practice standards, are not examined in OPRA.
              </p>
              <p>
                These requirements are addressed during later stages of the relevant registration process.
              </p>
              <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-emerald-300 text-sm sm:text-base font-medium">
                Candidates should therefore distinguish OPRA examination preparation from the additional learning required for professional registration and practice.
              </div>
            </div>
          </div>
        </section>

        {/* ─── 8. Recommended Resources for OPRA Exam Preparation ──────── */}
        <section className="mb-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm max-w-5xl mx-auto">
          <div className="max-w-3xl mb-8">
            <div className="inline-block bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Preparation Materials
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-4">
              Recommended Resources for OPRA Exam Preparation
            </h2>
            <p className="text-slate-700 leading-relaxed text-base">
              The Australian Pharmacy Council recommends using up-to-date, evidence-based educational materials, including:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {[
              "Peer-reviewed scientific and pharmaceutical journals",
              "Relevant clinical practice guidelines",
              "Current pharmacology, therapeutics, pharmaceutics, and biomedical science textbooks",
              "The official APC OPRA Exam Guide",
              "APC-provided examination sample questions",
            ].map((res, i) => (
              <div key={i} className="flex items-start gap-3 bg-slate-50 border border-slate-200 p-4 rounded-2xl">
                <span className="text-emerald-600 font-bold text-lg leading-none mt-0.5">✓</span>
                <span className="text-sm font-semibold text-slate-800 leading-snug">{res}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-200 pt-6 text-slate-600 text-sm sm:text-base leading-relaxed space-y-3">
            <p>
              Resources such as the Australian Medicines Handbook and relevant therapeutic guidelines may also be useful when studying medicines and therapeutic concepts.
            </p>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 font-medium">
              However, the APC does not endorse any particular external textbook, commercial preparation course, or examination preparation provider.
            </div>
            <p>
              Candidates should use the official syllabus to identify relevant subjects and select reliable learning resources suited to their individual preparation needs.
            </p>
          </div>
        </section>

        {/* ─── 9. How to Prepare for the OPRA Exam Syllabus ────────────── */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3">
              Strategy Roadmap
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              How to Prepare for the OPRA Exam Syllabus
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Follow this step-by-step strategy to organize your revision around the five official content areas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {preparationSteps.map((item, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl border border-slate-200 p-7 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div>
                  <div className="inline-block text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-slate-100 text-emerald-700 mb-4">
                    {item.step}
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 10. Lead Form Consultation / Study Plan ─────────────────── */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-4">
                Personalized Preparation
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Get the OPRA Syllabus Study Blueprint
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed">
                Connect your study routine directly with the five official content areas. Receive a curated study blueprint and high-yield calculation practice sets aligned with the APC syllabus guidelines.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">
                    High-yield pharmacology and therapeutics concept review sheets
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">
                    Pharmaceutical calculations practice sets with step-by-step solutions
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">
                    Subject-wise study schedule mapped to official APC weightages
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 text-sm font-semibold">
                <Link
                  href="/exam-dates"
                  className="inline-flex items-center text-emerald-600 hover:text-emerald-700 group"
                >
                  View OPRA Exam Dates 2026–2027
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <span className="text-slate-300">•</span>
                <Link
                  href="/sample-papers"
                  className="inline-flex items-center text-slate-700 hover:text-emerald-600 group"
                >
                  Access OPRA Exam Sample Papers
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
                <span className="text-slate-300">•</span>
                <Link
                  href="/opra-quiz"
                  className="inline-flex items-center text-slate-700 hover:text-emerald-600 group"
                >
                  Take Free OPRA Readiness Quiz
                  <svg
                    className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 w-full">
              <LeadForm
                title="Get Syllabus Study Blueprint"
                buttonText="SEND STUDY BLUEPRINT"
                tag="syllabus-page"
                source="OPRAExam"
                notes="Syllabus"
              />
            </div>
          </div>
        </section>

        {/* ─── 11. Frequently Asked Questions About the Syllabus ──────── */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Frequently Asked Questions About the OPRA Exam Syllabus
            </h2>
            <p className="text-slate-600">
              Clear answers to the most common queries international pharmacists ask about the OPRA curriculum.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {syllabusFaqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white p-6 rounded-2xl border border-slate-200 cursor-pointer open:border-emerald-300 open:shadow-md transition-all"
              >
                <summary className="font-bold text-base sm:text-lg text-slate-900 flex justify-between items-center outline-none list-none">
                  <span>{faq.q}</span>
                  <span className="text-emerald-500 group-open:rotate-180 transition-transform ml-4 shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="2"
                      stroke="currentColor"
                      className="w-5 h-5"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                    </svg>
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed text-sm sm:text-base">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </section>

        {/* ─── 12. Start Your OPRA Exam Preparation (CTA & Links) ──────── */}
        <section className="mb-16 bg-gradient-to-br from-slate-950 via-slate-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-14 border border-slate-800 shadow-2xl text-center relative overflow-hidden">
          <div className="max-w-3xl mx-auto relative z-10">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
              Start Your OPRA Exam Preparation
            </h2>
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed mb-6">
              Understanding the OPRA exam syllabus is the first step towards effective preparation.
              Begin by reviewing the five content areas, identifying subjects that require additional attention, and practising questions regularly.
            </p>
            <div className="text-sm font-semibold uppercase tracking-wider text-emerald-400 mb-6">
              Explore our free learning resources:
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <Link
                href="/sample-papers"
                className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-4 text-center transition-all group"
              >
                <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  OPRA Exam Sample Papers
                </div>
                <div className="text-xs text-slate-400 mt-1">Practice questions & tests →</div>
              </Link>
              <Link
                href="/exam-dates"
                className="bg-white/10 hover:bg-white/20 border border-white/20 rounded-2xl p-4 text-center transition-all group"
              >
                <div className="font-semibold text-white group-hover:text-emerald-300 transition-colors">
                  OPRA Exam Dates 2026–2027
                </div>
                <div className="text-xs text-slate-400 mt-1">Schedules & deadlines →</div>
              </Link>
              <Link
                href="/opra-quiz"
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-2xl p-4 text-center transition-all group shadow-lg"
              >
                <div>Free OPRA Readiness Quiz</div>
                <div className="text-xs text-slate-800 mt-1">Assess your readiness →</div>
              </Link>
            </div>

            <div className="pt-6 border-t border-slate-800 text-xs sm:text-sm text-slate-400 space-y-2">
              <p>
                Official reference:{" "}
                <a
                  href="https://www.pharmacycouncil.org.au/resources/opra-exam-guide-and-sample-content/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-400 underline hover:text-emerald-300 font-medium"
                >
                  Australian Pharmacy Council – OPRA Exam Guide and Sample Content
                </a>
              </p>
              <p className="text-slate-500 text-xs mt-3 max-w-2xl mx-auto leading-relaxed">
                Disclaimer: OPRAExam.in is an independent educational resource and is not affiliated with or endorsed by the Australian Pharmacy Council. Examination information may change. Candidates should always verify current requirements with the official examination authority.
              </p>
            </div>
          </div>
        </section>

        {/* Quick Navigation Footer Links */}
        <div className="text-center pt-8 border-t border-slate-200 flex flex-wrap justify-center gap-4">
          <Link
            href="/exam-dates"
            className="bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-full hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-2xs"
          >
            Check OPRA Exam Dates →
          </Link>
          <Link
            href="/sample-papers"
            className="bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-full hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-2xs"
          >
            Practice Sample Papers →
          </Link>
          <Link
            href="/opra-quiz"
            className="bg-emerald-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Take Free Diagnostic Quiz →
          </Link>
        </div>
      </div>
    </div>
  );
}
