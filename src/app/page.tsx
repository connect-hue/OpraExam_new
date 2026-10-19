import type { Metadata } from 'next';
import Link from 'next/link';
import MedicalBackground from '@/components/MedicalBackground';
import LeadForm from '@/components/LeadForm';
import { getPublishedBlogs } from '@/lib/db/blogs';
import { examSessions, getEffectiveSessionStatus, APC_URL } from '@/components/VerifiedExamDates';

export const revalidate = 60; // revalidate at most once every minute

export const metadata: Metadata = {
  title: "OPRA Exam 2026: Syllabus, Dates, Fees & Preparation",
  description: "Explore the OPRA Exam 2026 syllabus, exam dates, fees, eligibility, preparation strategies and free practice questions for overseas-qualified pharmacists.",
  alternates: {
    canonical: "https://www.opraexam.in/",
  },
  openGraph: {
    title: "OPRA Exam 2026: Syllabus, Dates, Fees & Preparation",
    description: "Explore the OPRA Exam 2026 syllabus, exam dates, fees, eligibility, preparation strategies and free practice questions for overseas-qualified pharmacists.",
    url: "https://www.opraexam.in/",
    type: "website",
    siteName: "OPRAExam.in",
  },
  twitter: {
    card: "summary_large_image",
    title: "OPRA Exam 2026: Syllabus, Dates, Fees & Preparation",
    description: "Explore the OPRA Exam 2026 syllabus, exam dates, fees, eligibility, preparation strategies and free practice questions for overseas-qualified pharmacists.",
  },
};

const homeFaqs = [
  {
    q: "1. What is the OPRA exam?",
    a: "OPRA stands for Overseas Pharmacist Readiness Assessment. It is administered by the Australian Pharmacy Council and assesses the biomedical, pharmaceutical, and clinical science knowledge of eligible overseas-qualified pharmacists.",
  },
  {
    q: "2. How many questions are in the OPRA exam?",
    a: "The examination consists of 120 multiple-choice questions, each with four answer options and one correct answer.",
  },
  {
    q: "3. What is the duration of the OPRA exam?",
    a: "Candidates have 150 minutes, or 2 hours and 30 minutes, to complete the examination.",
  },
  {
    q: "4. What is the OPRA exam passing score?",
    a: "APC uses a scaled scoring system and an established passing standard. It does not publish a universal raw percentage that guarantees a pass. Results depend on overall examination performance.",
  },
  {
    q: "5. What is the OPRA exam fee in 2026?",
    a: "The APC OPRA examination fee is AUD $2,245 per attempt as published in October 2026. The Eligibility Check and other assessment-related services are charged separately.",
  },
  {
    q: "6. Which subjects are included in the OPRA exam syllabus?",
    a: "The five content areas are Biomedical Sciences, Medicinal Chemistry and Biopharmaceutics, Pharmacokinetics and Pharmacodynamics, Pharmacology and Toxicology, and Therapeutics and Patient Care.",
  },
  {
    q: "7. Is OPRA more difficult than KAPS?",
    a: "OPRA and KAPS have different structures, content specifications, and scoring approaches. Their relative difficulty cannot be determined solely from these differences. Candidates should prepare using the current OPRA syllabus.",
  },
  {
    q: "8. Can I take the OPRA exam in India?",
    a: "Yes. APC lists approved examination centres in India. Test centre availability can vary between examination sessions, and candidates should confirm available locations when booking.",
  },
  {
    q: "9. Can I use a calculator during the OPRA exam?",
    a: "Yes. APC permits eligible standard and scientific calculators that comply with examination restrictions. An on-screen calculator is also provided.",
  },
  {
    q: "10. What happens after passing the OPRA exam?",
    a: "Candidates following the Australian Knowledge Stream can progress towards the relevant Skills Assessment Outcome and applicable provisional registration requirements. Further supervised practice, examinations, and registration requirements must be completed before general registration.",
  },
];

export default async function Home() {
  const allBlogs = await getPublishedBlogs();
  const latestBlogs = allBlogs.slice(0, 3);

  // Dynamic date maintenance: Registration closed on October 19, 2026 at 5:00 PM AEDT (11:30 AM IST)
  const isNov2026Open = new Date().getTime() < new Date('2026-10-19T17:00:00+11:00').getTime();

  return (
    <div className="flex flex-col w-full h-full bg-white relative">
      {/* Structured Data: Organization, WebSite, WebPage, FAQPage */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "Organization",
                "@id": "https://www.opraexam.in/#organization",
                "name": "OPRAExam.in",
                "url": "https://www.opraexam.in",
                "logo": "https://www.opraexam.in/logo.png",
                "description": "Independent educational resource supporting overseas-qualified pharmacists preparing for the OPRA examination."
              },
              {
                "@type": "WebSite",
                "@id": "https://www.opraexam.in/#website",
                "url": "https://www.opraexam.in",
                "name": "OPRAExam.in",
                "publisher": { "@id": "https://www.opraexam.in/#organization" }
              },
              {
                "@type": "WebPage",
                "@id": "https://www.opraexam.in/#webpage",
                "url": "https://www.opraexam.in/",
                "name": "OPRA Exam 2026: Syllabus, Dates, Fees & Preparation Guide",
                "description": "Explore the OPRA Exam 2026 syllabus, exam dates, fees, eligibility, preparation strategies and free practice questions for overseas-qualified pharmacists.",
                "isPartOf": { "@id": "https://www.opraexam.in/#website" }
              },
              {
                "@type": "FAQPage",
                "@id": "https://www.opraexam.in/#faq",
                "mainEntity": homeFaqs.map((faq) => ({
                  "@type": "Question",
                  "name": faq.q,
                  "acceptedAnswer": {
                    "@type": "Answer",
                    "text": faq.a
                  }
                }))
              }
            ]
          })
        }}
      />

      {/* Hero Section */}
      <section id="hero" className="relative overflow-hidden w-full bg-gradient-to-b from-emerald-50/70 via-white/50 to-white pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-100">
        <MedicalBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Authoritative Heading & Value Props */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Dynamic Notification Badge */}
              <div className="inline-flex items-center rounded-full border border-slate-200 bg-slate-100/90 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-slate-700 mb-6 shadow-2xs backdrop-blur-xs">
                <span className="flex h-2 w-2 rounded-full mr-2 bg-slate-400"></span>
                November 2026 Registration Closed — Next: March 2027
              </div>
              
              {/* Single Primary H1 */}
              <h1 className="text-3xl sm:text-5xl lg:text-[2.85rem] font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.2]">
                OPRA Exam 2026: Syllabus, Dates, Fees &amp; Preparation Guide
              </h1>
              
              <p className="text-base sm:text-lg text-emerald-950 font-semibold mb-3 leading-relaxed">
                Your complete guide to the Overseas Pharmacist Readiness Assessment (OPRA) for internationally qualified pharmacists.
              </p>

              <p className="text-base sm:text-lg text-slate-600 mb-6 leading-relaxed">
                Planning to become a registered pharmacist in Australia? Explore everything you need to know about the OPRA Exam 2026, including the examination pattern, syllabus, eligibility, registration dates, fees, sample questions, and preparation strategies.
              </p>

              <p className="text-sm sm:text-base text-slate-500 mb-8 leading-relaxed italic border-l-4 border-emerald-400 pl-4 py-1">
                OPRAExam.in is an independent educational resource designed to help overseas-qualified pharmacists understand the examination and prepare with structured, accessible study materials.
              </p>

              {/* Why explore OPRAExam.in? Card */}
              <div className="w-full bg-white/95 backdrop-blur-xs border border-emerald-100 rounded-2xl p-5 mb-8 shadow-xs">
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-3">
                  Why explore OPRAExam.in?
                </span>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs sm:text-sm text-slate-700 font-medium">
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>Detailed OPRA Exam Syllabus and Subject Weightage</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>Free OPRA Exam Sample Questions and Practice Resources</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>OPRA Exam Dates, Registration Deadlines and Fees</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>Pharmaceutical Calculations and Subject-Wise Guides</span>
                  </li>
                  <li className="flex items-center gap-2 sm:col-span-2">
                    <svg className="w-4 h-4 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    <span>Free OPRA Readiness Quiz</span>
                  </li>
                </ul>
              </div>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center gap-4 w-full">
                <Link
                  href="/syllabus"
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all text-sm sm:text-base text-center"
                >
                  Explore OPRA Syllabus &rarr;
                </Link>
                <Link
                  href="/sample-papers"
                  className="bg-slate-900 hover:bg-slate-800 text-white font-semibold px-7 py-3.5 rounded-xl shadow-sm hover:shadow-md transition-all text-sm sm:text-base text-center"
                >
                  Practise Free OPRA Questions
                </Link>
              </div>
            </div>

            {/* Right Column: Lead Form */}
            <div className="lg:col-span-5 w-full">
              <LeadForm
                title="Book Your 1 : 1 Doubt Clearing Session"
                subtitle="Independent educational guidance from international pharmacy mentors. Free study roadmap & eligibility overview."
                buttonText="BOOK NOW"
                tag="opraexam-home"
                source="OPRAExam Homepage"
              />
              <p className="text-[11px] text-slate-400 text-center mt-3 leading-relaxed">
                Independent educational service. Not affiliated with APC, Ahpra, or Pearson VUE.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Section: What Is the OPRA Exam? */}
      <section className="py-16 md:py-20 bg-white w-full border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              What Is the OPRA Exam?
            </h2>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto mb-6"></div>
          </div>

          <div className="bg-slate-50 border border-slate-200/80 rounded-3xl p-8 md:p-10 shadow-xs space-y-5 text-slate-700 text-base md:text-lg leading-relaxed">
            <p>
              The <strong>Overseas Pharmacist Readiness Assessment (OPRA)</strong> is a computer-based examination administered by the <strong>Australian Pharmacy Council (APC)</strong>.
            </p>
            <p>
              The examination assesses the biomedical, pharmaceutical, and clinical science knowledge of overseas-qualified pharmacists seeking to progress through the applicable pharmacist registration pathway in Australia.
            </p>
            <p>
              Introduced in March 2025, OPRA replaced the former Knowledge Assessment of Pharmaceutical Sciences (KAPS) examination.
            </p>
            <p className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 text-emerald-900 text-sm md:text-base font-medium">
              Passing the OPRA exam is an important step towards provisional registration and supervised practice for pharmacists following the APC Knowledge Stream. However, passing OPRA alone does not grant the right to practise independently as a registered pharmacist in Australia.
            </p>
          </div>
        </div>
      </section>

      {/* Section: OPRA Exam 2026: Quick Overview */}
      <section className="py-16 md:py-20 bg-slate-50 w-full border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              OPRA Exam 2026: Quick Overview
            </h2>
            <p className="text-slate-600 text-base">Key structural facts and delivery parameters at a glance.</p>
          </div>

          {/* Quick Overview Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-sm uppercase tracking-wider">
                    <th className="py-4 px-6 font-bold w-1/2 border-r border-slate-800">Examination Details</th>
                    <th className="py-4 px-6 font-bold w-1/2">Information</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Full name</td>
                    <td className="py-3.5 px-6 text-slate-700">Overseas Pharmacist Readiness Assessment</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Conducting authority</td>
                    <td className="py-3.5 px-6 text-slate-700">Australian Pharmacy Council (APC)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Examination mode</td>
                    <td className="py-3.5 px-6 text-slate-700">Computer-based at approved test centres</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Total questions</td>
                    <td className="py-3.5 px-6 font-bold text-emerald-700">120 MCQs</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Examination duration</td>
                    <td className="py-3.5 px-6 font-bold text-emerald-700">150 minutes (2 hours 30 mins)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Options per question</td>
                    <td className="py-3.5 px-6 text-slate-700">Four (single best answer)</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Examination fee</td>
                    <td className="py-3.5 px-6 font-bold text-slate-900">AUD $2,245 per attempt</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Syllabus content areas</td>
                    <td className="py-3.5 px-6 text-slate-700">Five distinct domains</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Registration process</td>
                    <td className="py-3.5 px-6 text-slate-700">APC Candidate Portal</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base text-center mb-6">
            The examination is closed-book and evaluates factual knowledge, conceptual understanding, and the application of pharmaceutical science principles.
          </p>

          <div className="text-center">
            <Link
              href="/syllabus"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3 rounded-full text-sm sm:text-base transition-all shadow-sm"
            >
              View Complete OPRA Exam Details &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Who Is Eligible for the OPRA Exam? */}
      <section className="py-16 md:py-20 bg-white w-full border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Who Is Eligible for the OPRA Exam?
            </h2>
            <div className="w-16 h-1 bg-emerald-500 rounded-full mx-auto mb-6"></div>
          </div>

          <div className="space-y-6 text-slate-700 text-base md:text-lg leading-relaxed mb-8">
            <p>
              The OPRA exam is primarily intended for overseas-qualified pharmacists following the applicable <strong>Knowledge Stream</strong> assessment pathway.
            </p>
            <p>
              For the Australian Knowledge Stream, candidates generally need to hold a suitable overseas pharmacy qualification that meets the Australian Pharmacy Council&apos;s eligibility requirements.
            </p>
          </div>

          {/* Checklist Box */}
          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8 mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              Before registering for an OPRA exam session, candidates must:
            </h3>
            <ul className="space-y-3.5 text-sm sm:text-base text-slate-700">
              {[
                "Determine whether the APC Knowledge Stream is the appropriate pathway for their qualifications.",
                "Complete the APC Eligibility Check.",
                "Submit the required qualification and identity documents.",
                "Receive confirmation from APC that they are eligible to sit OPRA.",
                "Register for an available examination session through the APC Candidate Portal."
              ].map((step, idx) => (
                <li key={idx} className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8 text-amber-900 text-sm sm:text-base leading-relaxed">
            <p className="font-semibold mb-1">Important Eligibility Distinctions:</p>
            <p>
              Eligibility depends on several factors, including the country and duration of pharmacy education. Candidates from certain countries may qualify for another assessment pathway.
            </p>
            <p className="mt-2 font-medium">
              Important: Eligibility for OPRA and eligibility for pharmacist registration are not identical. Additional registration requirements may apply.
            </p>
          </div>

          <div className="text-center">
            <a
              href="https://www.pharmacycouncil.org.au/pharmacist/skills-assessment/knowledge-stream/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold px-7 py-3 rounded-full text-sm sm:text-base transition-all"
            >
              Check Official APC Eligibility Requirements
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Section: How to Become a Registered Pharmacist in Australia After OPRA */}
      <section className="py-16 md:py-20 bg-slate-50 w-full border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              How to Become a Registered Pharmacist in Australia After OPRA
            </h2>
            <p className="text-slate-600 text-base">
              For eligible overseas-qualified pharmacists following the Knowledge Stream, the pathway generally involves the following stages.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {[
              {
                num: "Step 1",
                title: "Complete the APC Eligibility Check",
                desc: "Submit your pharmacy qualification and required supporting documents through the Australian Pharmacy Council's Candidate Portal. APC reviews whether you meet the applicable requirements for the Knowledge Stream."
              },
              {
                num: "Step 2",
                title: "Register for and Pass the OPRA Exam",
                desc: "Once your eligibility has been confirmed, select an available examination session and prepare for the 120-question, 150-minute assessment."
              },
              {
                num: "Step 3",
                title: "Obtain the Relevant Skills Assessment Outcome",
                desc: "After successfully completing the applicable APC assessment requirements, candidates can request a Skills Assessment Outcome through the APC Candidate Portal when needed."
              },
              {
                num: "Step 4",
                title: "Apply for Provisional Registration and Supervised Practice",
                desc: "Candidates intending to practise in Australia must meet the applicable Pharmacy Board of Australia registration requirements, including relevant registration standards and English language requirements."
              },
              {
                num: "Step 5",
                title: "Complete the Requirements for General Registration",
                desc: "The Knowledge Stream internship pathway includes supervised practice, an approved intern training program, and required written and oral examinations before eligibility for general registration."
              }
            ].map((step, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-start gap-4 shadow-2xs">
                <span className="inline-block bg-emerald-600 text-white font-extrabold text-xs uppercase px-3 py-1.5 rounded-lg shrink-0 w-fit">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{step.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-slate-100/80 border border-slate-200 rounded-2xl p-4 text-xs sm:text-sm text-slate-600 text-center mb-8 italic">
            The Pharmacy Board of Australia determines registration eligibility, and completion of OPRA does not guarantee registration, employment, or a visa.
          </div>

          <div className="text-center">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3 rounded-full text-sm sm:text-base transition-all shadow-sm"
            >
              Learn About the Pharmacist Registration Pathway &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Section: OPRA Exam vs KAPS: What Changed? */}
      <section className="py-16 md:py-20 bg-white w-full border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              OPRA Exam vs KAPS: What Changed?
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              The OPRA exam replaced KAPS in March 2025. The redesigned examination introduced changes to the examination structure, content specifications, and scoring methodology.
            </p>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-900 text-white text-sm uppercase tracking-wider">
                    <th className="py-4 px-6 font-bold w-1/3 border-r border-slate-800">Examination Feature</th>
                    <th className="py-4 px-6 font-bold w-1/3 bg-emerald-800 border-r border-emerald-900">OPRA Exam</th>
                    <th className="py-4 px-6 font-bold w-1/3">Previous KAPS Exam</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm sm:text-base">
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Examination status</td>
                    <td className="py-3.5 px-6 font-bold text-emerald-700 bg-emerald-50/40 border-r border-slate-100">Current</td>
                    <td className="py-3.5 px-6 text-slate-500">Replaced in 2025</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Examination format</td>
                    <td className="py-3.5 px-6 font-semibold text-slate-800 bg-emerald-50/40 border-r border-slate-100">Single computer-based examination</td>
                    <td className="py-3.5 px-6 text-slate-500">Two examination papers</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Number of questions</td>
                    <td className="py-3.5 px-6 font-bold text-emerald-700 bg-emerald-50/40 border-r border-slate-100">120</td>
                    <td className="py-3.5 px-6 text-slate-500">200 in total</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Examination duration</td>
                    <td className="py-3.5 px-6 font-bold text-emerald-700 bg-emerald-50/40 border-r border-slate-100">150 minutes</td>
                    <td className="py-3.5 px-6 text-slate-500">4 hours in total</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Syllabus approach</td>
                    <td className="py-3.5 px-6 text-slate-800 bg-emerald-50/40 border-r border-slate-100">Five published content areas</td>
                    <td className="py-3.5 px-6 text-slate-500">Previous KAPS content specifications</td>
                  </tr>
                  <tr className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-6 font-semibold text-slate-800 border-r border-slate-100">Assessment emphasis</td>
                    <td className="py-3.5 px-6 font-semibold text-slate-800 bg-emerald-50/40 border-r border-slate-100">Biomedical, pharmaceutical, and clinical sciences</td>
                    <td className="py-3.5 px-6 text-slate-500">Pharmaceutical sciences</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            <p>
              Unlike claims that OPRA tests only clinical case studies, the examination includes <strong>remembering and recall (approx. 55%)</strong>, <strong>comprehension (approx. 30%)</strong>, and <strong>application (approx. 15%)</strong> questions.
            </p>
            <p>
              Candidates should use the current OPRA examination guide rather than relying entirely on outdated KAPS preparation materials.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/syllabus"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3 rounded-full text-sm sm:text-base transition-all shadow-sm"
            >
              Explore the Updated OPRA Exam Syllabus &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Section: OPRA Exam Syllabus 2026: Subject-Wise Weightage */}
      <section className="py-16 md:py-20 bg-slate-50 w-full border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              OPRA Exam Syllabus 2026: Subject-Wise Weightage
            </h2>
            <p className="text-slate-600 text-base">
              The Australian Pharmacy Council divides the OPRA examination into five main content areas.
            </p>
          </div>

          {/* Table summary of weightage */}
          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs mb-10 max-w-2xl mx-auto">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-3.5 px-5 font-bold">OPRA Exam Subject</th>
                  <th className="py-3.5 px-5 font-bold text-right">Approximate Weightage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-5 text-slate-800">Biomedical Sciences</td>
                  <td className="py-3 px-5 text-right font-bold text-slate-900">20%</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-5 text-slate-800">Medicinal Chemistry and Biopharmaceutics</td>
                  <td className="py-3 px-5 text-right font-bold text-slate-900">10%</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-5 text-slate-800">Pharmacokinetics and Pharmacodynamics</td>
                  <td className="py-3 px-5 text-right font-bold text-slate-900">10%</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3 px-5 text-slate-800">Pharmacology and Toxicology</td>
                  <td className="py-3 px-5 text-right font-bold text-slate-900">15%</td>
                </tr>
                <tr className="hover:bg-slate-50 bg-emerald-50/50">
                  <td className="py-3 px-5 font-semibold text-emerald-900">Therapeutics and Patient Care</td>
                  <td className="py-3 px-5 text-right font-bold text-emerald-700">45%</td>
                </tr>
                <tr className="bg-slate-100 font-bold">
                  <td className="py-3 px-5 text-slate-900">Total</td>
                  <td className="py-3 px-5 text-right text-slate-900">100%</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* 5 Detailed Content Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-slate-900">Biomedical Sciences</h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2.5 py-1 rounded-full border border-blue-200">20%</span>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Includes human physiology, pathophysiology, microbiology, immunology, body systems, and disease mechanisms.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-slate-900">Medicinal Chemistry &amp; Biopharmaceutics</h3>
                <span className="bg-teal-100 text-teal-800 text-xs font-bold px-2.5 py-1 rounded-full border border-teal-200">10%</span>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Covers physicochemical drug properties, solubility, dissolution, pharmaceutical formulation, stability, and drug delivery.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-slate-900">Pharmacokinetics &amp; Pharmacodynamics</h3>
                <span className="bg-amber-100 text-amber-800 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-200">10%</span>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Covers drug absorption, distribution, metabolism, elimination, clearance, half-life, therapeutic drug monitoring, and drug effects.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-slate-900">Pharmacology and Toxicology</h3>
                <span className="bg-purple-100 text-purple-800 text-xs font-bold px-2.5 py-1 rounded-full border border-purple-200">15%</span>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Focuses on drug mechanisms, receptor pharmacology, adverse reactions, medicine interactions, toxicity, and antidotes.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-emerald-300 shadow-2xs md:col-span-2">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-bold text-lg text-emerald-900">Therapeutics and Patient Care</h3>
                <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-300">45% (Highest Weightage)</span>
              </div>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Includes therapeutic decision-making, medicine safety, dosage calculations, patient management, monitoring, and appropriate medicine use.
              </p>
            </div>
          </div>

          <p className="text-slate-600 text-sm sm:text-base text-center mb-6">
            Therapeutics and Patient Care carries the largest examination weightage, but preparation should cover all five areas.
          </p>

          <div className="text-center">
            <Link
              href="/syllabus"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3 rounded-full text-sm sm:text-base transition-all shadow-sm"
            >
              View Detailed OPRA Exam Syllabus 2026 &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Section: OPRA Exam Dates 2026–2027 */}
      <section className="py-16 md:py-20 bg-white w-full border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              OPRA Exam Dates 2026–2027
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              The Australian Pharmacy Council publishes registration windows, examination sessions, and result release dates. The following dates were published by APC as of October 2026.
            </p>
          </div>

          {/* Dates Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-4 px-6 font-bold">Examination Session</th>
                    <th className="py-4 px-6 font-bold">Exam Dates</th>
                    <th className="py-4 px-6 font-bold">Registration Deadline</th>
                    <th className="py-4 px-6 font-bold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {examSessions.map((session) => {
                    const status = getEffectiveSessionStatus(session);
                    return (
                      <tr key={session.session} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-6 font-semibold text-slate-900">{session.session}</td>
                        <td className="py-3.5 px-6 text-slate-700">{session.examDate}</td>
                        <td className="py-3.5 px-6 text-slate-700 font-medium">{session.registrationClose}</td>
                        <td className="py-3.5 px-6 text-center">
                          <span
                            className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border ${
                              status === 'open'
                                ? 'bg-emerald-100 text-emerald-800 border-emerald-200'
                                : status === 'upcoming'
                                ? 'bg-amber-100 text-amber-800 border-amber-200'
                                : 'bg-slate-100 text-slate-600 border-slate-200'
                            }`}
                          >
                            {status === 'open' ? 'Registration Open' : status === 'upcoming' ? 'Upcoming' : 'Registration Closed'}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 mb-8 text-xs sm:text-sm text-slate-600 leading-relaxed">
            Examination places can fill up, and registration availability varies by test centre. Candidates should complete their eligibility process well before the examination registration deadline and confirm current information directly with APC.
          </div>

          <div className="text-center">
            <Link
              href="/exam-dates"
              className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-bold px-7 py-3 rounded-full text-sm sm:text-base transition-all shadow-sm"
            >
              Check OPRA Exam Dates and Test Centres &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Section: OPRA Exam Fees 2026 */}
      <section className="py-16 md:py-20 bg-slate-50 w-full border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              OPRA Exam Fees 2026
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              The OPRA exam registration fee is <strong>AUD $2,245 per attempt</strong>, according to the APC fee schedule available in October 2026. Additional charges apply to other stages of the assessment process.
            </p>
          </div>

          {/* Fees Table */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-8 max-w-2xl mx-auto">
            <table className="w-full text-left border-collapse text-sm sm:text-base">
              <thead>
                <tr className="bg-slate-900 text-white">
                  <th className="py-4 px-6 font-bold">APC Assessment Stage</th>
                  <th className="py-4 px-6 font-bold text-right">Fee (AUD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-6 text-slate-800">Knowledge Stream Eligibility Check</td>
                  <td className="py-3.5 px-6 text-right font-semibold text-slate-900">$810</td>
                </tr>
                <tr className="hover:bg-slate-50 bg-emerald-50/40">
                  <td className="py-3.5 px-6 font-semibold text-emerald-900">OPRA Exam Registration</td>
                  <td className="py-3.5 px-6 text-right font-bold text-emerald-700">$2,245</td>
                </tr>
                <tr className="hover:bg-slate-50">
                  <td className="py-3.5 px-6 text-slate-800">Skills Assessment Outcome issuance</td>
                  <td className="py-3.5 px-6 text-right font-semibold text-slate-900">$300</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="space-y-2 text-slate-600 text-xs sm:text-sm text-center max-w-2xl mx-auto mb-8">
            <p>These fees do not include additional costs associated with English language testing, professional registration, travel, supervised practice, or other requirements.</p>
            <p className="font-semibold text-slate-700">Fees may change. Always confirm the latest APC schedule before making payments.</p>
          </div>

          <div className="text-center">
            <Link
              href="/exam-dates"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-7 py-3 rounded-full text-sm sm:text-base transition-all shadow-sm"
            >
              View Official APC Fees and Registration Information &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Free OPRA Exam Sample Papers and Practice Questions */}
      <section className="py-16 md:py-20 bg-white w-full border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Free OPRA Exam Sample Papers and Practice Questions
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Practising OPRA-style questions can help candidates become familiar with examination formats, assess subject knowledge, and identify areas that need further revision.
            </p>
          </div>

          <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 mb-8">
            <p className="text-slate-700 text-base mb-6 font-medium">
              Our free OPRA practice resources are intended to support independent learning across the five syllabus content areas. You can explore:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                "Biomedical Sciences practice questions",
                "Pharmacology and Toxicology MCQs",
                "Pharmaceutical calculations",
                "Pharmacokinetics questions",
                "Therapeutics and Patient Care exercises",
                "Questions with answers and explanations"
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex items-center gap-3">
                  <svg className="w-5 h-5 text-emerald-600 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">{item}</span>
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-6 italic">
              The independently developed practice questions on OPRAExam.in are educational resources and are not official or previously administered APC examination questions.
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/sample-papers"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-full text-base transition-all shadow-md"
            >
              Practise Free OPRA Exam Questions &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Section: How to Prepare for the OPRA Exam */}
      <section className="py-16 md:py-20 bg-slate-50 w-full border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              How to Prepare for the OPRA Exam
            </h2>
            <p className="text-slate-600 text-base leading-relaxed">
              Effective OPRA exam preparation requires a structured approach combining pharmaceutical knowledge, conceptual understanding, and regular question practice.
            </p>
          </div>

          <div className="space-y-4 mb-10">
            {[
              {
                num: "1",
                title: "Start With the Official Syllabus",
                desc: "Review all five APC content areas and understand their relative examination weightages."
              },
              {
                num: "2",
                title: "Build a Practical Study Schedule",
                desc: "Set realistic weekly learning goals based on your current pharmaceutical knowledge, available study time, and examination date."
              },
              {
                num: "3",
                title: "Strengthen Important Pharmaceutical Concepts",
                desc: "Focus on biomedical sciences, pharmacology, pharmacokinetics, medicinal chemistry, and therapeutics."
              },
              {
                num: "4",
                title: "Practise Pharmaceutical Calculations",
                desc: "Revise dosage calculations, concentration and dilution, infusion rates, renal function calculations, and pharmacokinetic principles."
              },
              {
                num: "5",
                title: "Use Reliable Learning Resources",
                desc: "Study from current textbooks, peer-reviewed information, recognised clinical guidelines, and official APC guidance. (The Australian Pharmacy Council does not endorse any particular commercial preparation course or external textbook.)"
              },
              {
                num: "6",
                title: "Practise With Timed Mock Tests",
                desc: "Complete OPRA-style practice questions under timed conditions to improve your ability to read, interpret, and answer questions efficiently."
              },
              {
                num: "7",
                title: "Review and Improve",
                desc: "Analyse incorrect answers, identify weak areas, and revise relevant concepts before attempting additional practice questions."
              }
            ].map((step) => (
              <div key={step.num} className="bg-white rounded-2xl border border-slate-200 p-6 flex items-start gap-4 shadow-2xs">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                  {step.num}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-base sm:text-lg mb-1">{step.title}</h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/opra-quiz"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-8 py-3.5 rounded-full text-base transition-all shadow-md"
            >
              Start Your Free OPRA Readiness Quiz &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Section: Frequently Asked Questions About the OPRA Exam */}
      <section id="faq" className="py-16 md:py-20 bg-white w-full border-b border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Frequently Asked Questions About the OPRA Exam
            </h2>
            <p className="text-slate-600 text-base">
              Clear, authoritative answers to common candidate queries for the 2026 examination cycle.
            </p>
          </div>

          <div className="space-y-4">
            {homeFaqs.map((faq, idx) => (
              <details
                key={idx}
                className="group bg-slate-50 p-6 rounded-2xl border border-slate-200 cursor-pointer open:border-emerald-300 open:bg-white open:shadow-md transition-all"
              >
                <summary className="font-bold text-base sm:text-lg text-slate-900 flex justify-between items-center outline-none list-none">
                  <span>{faq.q}</span>
                  <span className="text-emerald-600 group-open:rotate-180 transition-transform ml-4 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-slate-200/70 text-slate-600 text-sm sm:text-base leading-relaxed pr-6">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Start Your OPRA Exam Preparation Today */}
      <section className="py-16 md:py-20 bg-slate-900 text-white w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight">
              Start Your OPRA Exam Preparation Today
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Understanding the examination is the first step towards preparing effectively. Explore our free learning resources to review the syllabus, understand registration timelines, and practise important pharmaceutical concepts.
            </p>
          </div>

          {/* 5 Fast Navigation Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
            <Link
              href="/syllabus"
              className="bg-slate-800 hover:bg-slate-750 p-6 rounded-2xl border border-slate-700 transition-all hover:-translate-y-1 group"
            >
              <div className="text-emerald-400 font-bold text-xs uppercase mb-2">Curriculum</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Explore OPRA Exam Syllabus &rarr;
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">5 content areas with published percentage weightages.</p>
            </Link>

            <Link
              href="/sample-papers"
              className="bg-slate-800 hover:bg-slate-750 p-6 rounded-2xl border border-slate-700 transition-all hover:-translate-y-1 group"
            >
              <div className="text-emerald-400 font-bold text-xs uppercase mb-2">Practice</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Practise Free OPRA Questions &rarr;
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">Sample MCQs with detailed rationale and explanations.</p>
            </Link>

            <Link
              href="/exam-dates"
              className="bg-slate-800 hover:bg-slate-750 p-6 rounded-2xl border border-slate-700 transition-all hover:-translate-y-1 group"
            >
              <div className="text-emerald-400 font-bold text-xs uppercase mb-2">Schedule</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Check OPRA Exam Dates &rarr;
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">2026–2027 registration windows and Pearson VUE test dates.</p>
            </Link>

            <Link
              href="/opra-quiz"
              className="bg-slate-800 hover:bg-slate-750 p-6 rounded-2xl border border-slate-700 transition-all hover:-translate-y-1 group"
            >
              <div className="text-emerald-400 font-bold text-xs uppercase mb-2">Assessment</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Take the Free OPRA Quiz &rarr;
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">Test your diagnostic baseline across key pharmaceutical concepts.</p>
            </Link>

            <Link
              href="/about"
              className="bg-slate-800 hover:bg-slate-750 p-6 rounded-2xl border border-slate-700 transition-all hover:-translate-y-1 group sm:col-span-2 lg:col-span-1"
            >
              <div className="text-emerald-400 font-bold text-xs uppercase mb-2">About Us</div>
              <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                Learn About OPRAExam.in &rarr;
              </h3>
              <p className="text-slate-400 text-xs sm:text-sm">Our educational mission and support for overseas pharmacists.</p>
            </Link>
          </div>

          {/* Official References */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-2xl p-6 mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
              Official References
            </h3>
            <ul className="space-y-2 text-xs sm:text-sm text-emerald-400">
              <li>
                <a
                  href="https://www.pharmacycouncil.org.au/resources/opra-exam-guide-and-sample-content/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Australian Pharmacy Council – OPRA Exam Guide and Sample Content</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.pharmacycouncil.org.au/pharmacist/skills-assessment/knowledge-stream/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Australian Pharmacy Council – Knowledge Stream</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </li>
              <li>
                <a
                  href="https://www.pharmacycouncil.org.au/pharmacist/Exam-information/opra-exam-day-preparation/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline inline-flex items-center gap-1.5"
                >
                  <span>Australian Pharmacy Council – OPRA Exam Day Preparation</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Disclaimer */}
          <div className="bg-slate-950/60 border border-slate-800 rounded-2xl p-5 text-xs text-slate-400 leading-relaxed">
            <strong className="text-slate-300 block mb-1">Disclaimer:</strong>
            OPRAExam.in is an independent educational website and is not affiliated with, officially approved by, or endorsed by the Australian Pharmacy Council, Ahpra, or the Pharmacy Board of Australia. Information is provided for general educational purposes and does not replace official examination or registration guidance. Candidates should verify current eligibility requirements, examination dates, fees, and registration policies with the relevant authorities.
          </div>
        </div>
      </section>

      {/* Latest Blog Articles section */}
      {latestBlogs.length > 0 && (
        <section className="py-16 bg-white w-full border-t border-slate-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8">
              <div>
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 uppercase tracking-wider inline-block mb-3">
                  Articles &amp; Guides
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Latest OPRA Preparation Guides
                </h2>
              </div>
              <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 font-bold text-sm flex items-center mt-3 md:mt-0 transition-colors">
                View All Articles &rarr;
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestBlogs.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:shadow-lg transition-all duration-200 flex flex-col group"
                >
                  <span className="text-emerald-600 font-semibold text-xs mb-2">{post.readTime}</span>
                  <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-slate-600 text-xs sm:text-sm line-clamp-3 mb-4 leading-relaxed">
                    {post.description}
                  </p>
                  <div className="mt-auto pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs text-slate-500">
                    <span>{post.date}</span>
                    <span className="font-bold text-emerald-600 group-hover:underline">Read Guide &rarr;</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
