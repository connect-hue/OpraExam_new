import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import { getSiteContent } from '@/lib/db/siteContent';
import LeadForm from '@/components/LeadForm';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'Official OPRA Exam Syllabus 2026 | Domain Weights, Exam Format & Topics',
  description: 'Complete OPRA exam syllabus breakdown for Australian pharmacist registration. 120 multiple-choice questions in 2 hours and 30 minutes covering biomedical, pharmaceutical, and clinical sciences.',
  keywords: [
    'OPRA exam syllabus',
    'OPRA exam syllabus 2026',
    'OPRA exam format',
    'OPRA exam duration',
    'Australian pharmacy council syllabus',
    'AMH pharmacy therapeutics',
    'OPRA exam domains',
    'KAPS vs OPRA syllabus',
  ],
  openGraph: {
    title: 'Official OPRA Exam Syllabus 2026 | Australian Pharmacy Council',
    description: 'Detailed syllabus, domain weights, and clinical competencies required to pass the OPRA exam in Australia.',
    type: 'website',
  },
};

const syllabusFaqs = [
  {
    q: 'How is the OPRA exam syllabus different from the retired KAPS exam?',
    a: 'While KAPS focused heavily on theoretical drug memorization and basic sciences across two separate papers, OPRA is a single 120-question, 2.5-hour exam that places much greater weight on applied clinical therapeutics, Australian Medicines Handbook (AMH) guidelines, patient communication, and evidence-based pharmacotherapy case studies.',
  },
  {
    q: 'What is the structure and format of the OPRA exam?',
    a: 'The OPRA exam consists of 120 multiple-choice questions (MCQs) completed in a single sitting of 2 hours and 30 minutes. It is a computer-based examination conducted at approved test centres by APC and PearsonVUE outside Australia. It assesses knowledge of biomedical, pharmaceutical, and clinical sciences.',
  },
  {
    q: 'Are calculations tested on the OPRA exam?',
    a: 'Yes, pharmaceutical calculations are rigorously tested across the clinical and pharmaceutical science domains, covering creatinine clearance (Cockcroft-Gault), pharmacokinetics (half-life, clearance, volume of distribution), posology, infusion rates, and percentage/mEq concentrations.',
  },
  {
    q: 'What is the passing score for the OPRA exam?',
    a: 'Candidates must achieve a scaled pass mark and satisfy competency thresholds across core domains. Passing OPRA is one step in the pathway towards pharmacist registration. Candidates must also meet the applicable registration requirements of the Pharmacy Board of Australia.',
  },
  {
    q: 'Which reference books and guidelines must I study for the OPRA syllabus?',
    a: 'The gold standard reference is the Australian Medicines Handbook (AMH). You should also consult the Therapeutic Guidelines (eTG), Australian Pharmaceutical Formulary and Handbook (APF), and Pharmacy Board of Australia guidelines.',
  },
];

export default async function SyllabusPage() {
  const content = await getSiteContent();

  const domainDeepDives = [
    {
      title: 'Domain 1: Pharmaceutical Chemistry',
      weight: '~30% of Total Weight',
      badgeColor: 'bg-blue-100 text-blue-800 border-blue-200',
      iconBg: 'bg-blue-50 text-blue-600',
      paper: 'Biomedical Sciences Domain',
      overview: 'Evaluates chemical structure comprehension, stereochemical influence on drug efficacy, formulation stability, and physico-chemical foundations of drug delivery.',
      topics: [
        'Structure-Activity Relationships (SAR) of key drug classes',
        'Stereochemistry, chiral centers, enantiomers, and therapeutic significance',
        'Physicochemical properties: pKa, partition coefficient (LogP), and ionization',
        'Drug degradation kinetics, hydrolytic & oxidative pathways, and stability preservation',
        'Analytical pharmacy: Chromatography (HPLC/GC), spectroscopy (UV/IR), and spectrometry',
        'Prodrug design, functional groups, and metabolic activation pathways',
      ],
    },
    {
      title: 'Domain 2: Pharmaceutics & Clinical Therapeutics',
      weight: '~40% of Total Weight',
      badgeColor: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      iconBg: 'bg-emerald-50 text-emerald-600',
      paper: 'Pharmaceutical & Clinical Sciences Domain',
      overview: 'The highest weighted domain in OPRA. Emphasizes clinical disease state management, Australian Medicines Handbook protocols, dosage formulations, and calculation precision.',
      topics: [
        'Cardiovascular & Renal: Hypertension, Heart Failure, DOAC anticoagulation, CKD dosing',
        'Endocrine & Metabolic: Type 1 & 2 Diabetes, Insulin regimens, Thyroid disorders, Osteoporosis',
        'Antimicrobial Stewardship: Australian Therapeutic Guidelines empiric treatment protocols',
        'Respiratory & GI: Asthma stepwise therapy, COPD inhaler selection, Peptic ulcer, IBD',
        'High-alert medications: Methotrexate, Lithium, Digoxin, Warfarin therapeutic drug monitoring',
        'Pharmaceutical Calculations: Creatinine clearance (CrCl), infusion rates, alligations, osmolarity',
        'Drug formulation selection: Modified release, transdermal systems, bioavailability factors',
      ],
    },
    {
      title: 'Domain 3: Pharmacology & Physiology',
      weight: '~30% of Total Weight',
      badgeColor: 'bg-purple-100 text-purple-800 border-purple-200',
      iconBg: 'bg-purple-50 text-purple-600',
      paper: 'Biomedical & Clinical Sciences Domain',
      overview: 'Assesses pharmacological mechanisms, physiological feedback loops, CYP450 enzyme interactions, toxicological mechanisms, and adverse effect profiles.',
      topics: [
        'Autonomic Nervous System: Sympathetic vs parasympathetic receptor pharmacology',
        'Central Nervous System: SSRIs, SNRIs, receptor pathways, antiepileptics, sedatives',
        'Pharmacokinetics: Volume of distribution, bioequivalence, clearance, half-life formulas',
        'CYP450 Enzyme Pathways: Inducers, inhibitors, and severe clinical drug-drug interactions',
        'Immunology & Oncology: Targeted biologics, monoclonal antibodies, immunosuppressants',
        'Toxicology, overdose management, and clinical antidotes (e.g., Naloxone, Acetylcysteine)',
      ],
    },
  ];

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
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
          }),
        }}
      />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Breadcrumb */}
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

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white p-8 md:p-14 lg:p-16 mb-16 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-emerald-300 mb-6 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Official 2026 Australian Pharmacy Council (APC) Standard
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              OPRA Exam Syllabus <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Structure & Domain Weights
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-3xl">
              The Overseas Pharmacist Readiness Assessment (OPRA) tests clinical competence, pharmacotherapeutics, and foundational science aligned with the Australian healthcare system. Master each domain below.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-left">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">120</div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">MCQ Questions</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">2h 30m</div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">Total Duration</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">PearsonVUE</div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">Computer-Based</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 backdrop-blur-xs">
                <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400">AMH</div>
                <div className="text-xs sm:text-sm text-slate-300 font-medium">Reference Standard</div>
              </div>
            </div>
          </div>
        </div>

        {/* OPRA Exam Format Overview Section */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              OPRA Exam Format
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              The Overseas Pharmacist Readiness Assessment (OPRA) is conducted by the Australian Pharmacy Council (APC). It is a computer-based, multiple-choice examination for eligible overseas-qualified pharmacists.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Exam Specifications */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-emerald-50 text-emerald-700 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full border border-emerald-200">
                  Key Specifications
                </span>
                <span className="text-slate-500 text-sm font-medium">120 MCQs • 2 Hours 30 Mins</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Exam Architecture
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                The OPRA examination is delivered in a single computer-based sitting through authorized Pearson VUE test centres worldwide and approved test centres by the APC.
              </p>

              <div className="space-y-3.5 mb-8 flex-1">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    <strong>Questions:</strong> 120 multiple-choice questions
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    <strong>Duration:</strong> 2 hours and 30 minutes
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    <strong>Delivery:</strong> At approved test centres by APC and the ones outside Australia, conducted by PearsonVUE
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Exam Fee:</span>
                <span className="text-emerald-700 font-extrabold">AUD $2,245 per attempt</span>
              </div>
            </div>

            {/* Purpose & Pathway */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-emerald-200 ring-2 ring-emerald-500/20 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
              <div className="flex items-center justify-between mb-6">
                <span className="bg-blue-50 text-blue-700 text-xs sm:text-sm font-bold px-3 py-1.5 rounded-full border border-blue-200">
                  Assessment Scope
                </span>
                <span className="text-slate-500 text-sm font-medium">Registration Pathway</span>
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Purpose & Registration Pathway
              </h3>
              <p className="text-slate-600 mb-6 leading-relaxed">
                Assesses knowledge of the biomedical, pharmaceutical and clinical sciences relevant to pharmacy practice in Australia.
              </p>

              <div className="space-y-3.5 mb-8 flex-1">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    <strong>Biomedical Sciences:</strong> Medicinal chemistry, pharmacokinetics, and autonomic/organ physiology
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    <strong>Pharmaceutical & Clinical Sciences:</strong> Formulation, clinical disease management, and calculations
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    ✓
                  </div>
                  <span className="text-sm font-medium text-slate-700">
                    <strong>Registration Pathway:</strong> Passing OPRA is one step in the pathway towards pharmacist registration. Candidates must also meet the applicable registration requirements of the Pharmacy Board of Australia.
                  </span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100 flex items-center justify-between text-sm">
                <span className="text-slate-500 font-medium">Clinical Standard:</span>
                <span className="text-blue-700 font-extrabold">Australian Medicines Handbook (AMH)</span>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Domain Deep Dives */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs sm:text-sm font-semibold text-emerald-800 mb-3">
              Official Knowledge Areas
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Detailed Domain-by-Domain Breakdown
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              Here is what you must study within each official APC syllabus domain to guarantee clinical alignment.
            </p>
          </div>

          <div className="space-y-8">
            {domainDeepDives.map((domain, index) => (
              <div
                key={index}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm hover:shadow-md transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className={`text-xs font-bold px-3 py-1 rounded-full border ${domain.badgeColor}`}>
                        {domain.weight}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
                        {domain.paper}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900">{domain.title}</h3>
                  </div>
                </div>

                <p className="text-slate-600 mb-6 leading-relaxed">{domain.overview}</p>

                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">
                  High-Yield Core Competencies & Sub-Topics
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
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
              </div>
            ))}
          </div>
        </section>

        {/* Australian References & Textbooks Guide */}
        <section className="mb-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-3">
              Essential Resources
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Approved Australian Study Materials
            </h2>
            <p className="text-slate-600 leading-relaxed">
              International textbooks (like UK BNF, US First Aid, or Indian pharmacopeias) often list different first-line agents, brand names, and drug schedules. For the OPRA exam, APC expects answers strictly conforming to Australian references:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-emerald-50/50 rounded-2xl p-6 border border-emerald-100">
              <div className="text-2xl font-black text-emerald-600 mb-2">01</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Australian Medicines Handbook (AMH)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                The supreme authority for OPRA therapeutics. Study comparative monographs, dosage guidelines, contraindications, and counselling points.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="text-2xl font-black text-teal-600 mb-2">02</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Therapeutic Guidelines (eTG)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Crucial for antimicrobial stewardship, cardiology protocols, respiratory stepped treatment, and dermatology management in Australia.
              </p>
            </div>

            <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
              <div className="text-2xl font-black text-slate-600 mb-2">03</div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                APF (Aust. Pharmaceutical Formulary)
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Vital for non-prescription medicines (Schedule 2/3), extemporaneous compounding, caution advisory labels, and clinical calculations.
              </p>
            </div>
          </div>
        </section>

        {/* Lead Form Consultation / Study Plan */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-4">
                Personalized Preparation
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Get the 16-Week OPRA Syllabus Master Schedule
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed">
                Don’t waste months studying outdated KAPS materials or low-yield subjects. Connect with registered Australian pharmacists who will map your degree background directly against the official OPRA curriculum.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">
                    High-yield AMH drug class cheat sheets (Top 100 medications)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">
                    50+ Step-by-step pharmaceutical calculation practice sets
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">
                    Australian Medicines Handbook chapter-by-chapter reading guide
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/exam-dates"
                  className="inline-flex items-center font-bold text-emerald-600 hover:text-emerald-700 text-sm group"
                >
                  View 2026 Exam Dates & Deadlines
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
                  className="inline-flex items-center font-bold text-slate-700 hover:text-emerald-600 text-sm group"
                >
                  Test Knowledge on Free OPRA Quiz
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
                source="SyllabusPage"
              />
            </div>
          </div>
        </section>

        {/* Syllabus FAQs */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Frequently Asked Questions About the Syllabus
            </h2>
            <p className="text-slate-600">
              Clear answers to the most common queries international pharmacists ask about the OPRA curriculum.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {syllabusFaqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white p-6 rounded-2xl border border-slate-200 cursor-pointer open:border-emerald-200 open:shadow-md transition-all"
              >
                <summary className="font-bold text-base sm:text-lg text-slate-900 flex justify-between items-center outline-none">
                  {faq.q}
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

        {/* Quick Navigation Footer Links */}
        <div className="text-center pt-8 border-t border-slate-200 flex flex-wrap justify-center gap-4">
          <Link
            href="/exam-dates"
            className="bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-full hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-2xs"
          >
            Check 2026 Exam Dates →
          </Link>
          <Link
            href="/blog"
            className="bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-full hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-2xs"
          >
            Read OPRA Blog Guides →
          </Link>
          <Link
            href="/sample-papers"
            className="bg-emerald-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Practice Sample Papers →
          </Link>
        </div>
      </div>
    </div>
  );
}
