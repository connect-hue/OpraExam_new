import React from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import VerifiedExamDates, { examSessions, APC_URL } from '@/components/VerifiedExamDates';
import LeadForm from '@/components/LeadForm';

export const revalidate = 60;

export const metadata: Metadata = {
  title: 'OPRA Exam Dates 2026 | APC Official Schedule, Windows & Deadlines',
  description: 'Check official 2026 OPRA exam dates, registration opening & closing deadlines, test windows, and results release dates verified against the Australian Pharmacy Council (APC).',
  keywords: [
    'OPRA exam dates 2026',
    'OPRA exam schedule',
    'OPRA registration deadline',
    'Australian pharmacy council exam dates',
    'OPRA test window July 2026',
    'OPRA test window November 2026',
    'Pearson VUE OPRA test centers',
  ],
  openGraph: {
    title: 'OPRA Exam Dates 2026 | Australian Pharmacy Council Official Schedule',
    description: 'Verified schedule for the 2026 Overseas Pharmacist Readiness Assessment (OPRA) exam sessions.',
    type: 'website',
  },
};

const examDatesFaqs = [
  {
    q: 'Can I sit the OPRA exam outside Australia?',
    a: 'Yes. The OPRA exam is delivered globally through Pearson VUE professional test centers. You can sit the exam in India (Delhi, Mumbai, Bengaluru, Hyderabad, Chennai), the UAE (Dubai, Abu Dhabi), the UK, the Philippines, and many other international locations without traveling to Australia.',
  },
  {
    q: 'How far in advance must I submit my APC Document Evaluation before booking an exam date?',
    a: 'You should submit your Document Evaluation at least 8 to 12 weeks before the exam registration deadline. The Australian Pharmacy Council will not allow you to book an OPRA testing seat until your qualification assessment is fully approved.',
  },
  {
    q: 'What happens if Pearson VUE seats fill up in my preferred city?',
    a: 'Pearson VUE seats are allocated on a first-come, first-served basis once the APC registration window opens. If local seats fill up, candidates must choose the nearest alternate city or test center. Booking on the very first day of the window is strongly advised.',
  },
  {
    q: 'Can I postpone or reschedule my OPRA exam date once booked?',
    a: 'Rescheduling is permitted through your Pearson VUE portal up to 48 hours before your scheduled appointment, subject to seat availability in the same testing window. Transferring to a future testing cycle requires formal APC approval and may incur administrative fees.',
  },
  {
    q: 'How long does it take to receive OPRA exam results?',
    a: 'Official results are released by the Australian Pharmacy Council approximately 4 to 5 weeks after the conclusion of the testing window (typically mid-April for March session, mid-August for July session, and mid-December for November session).',
  },
];

const testCenters = [
  {
    region: 'Australia',
    cities: 'Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Hobart, Darwin',
    badge: 'Domestic',
  },
  {
    region: 'India & South Asia',
    cities: 'New Delhi, Mumbai, Bengaluru, Hyderabad, Chennai, Kolkata, Ahmedabad, Pune, Kochi',
    badge: 'High Demand',
  },
  {
    region: 'Middle East & Gulf',
    cities: 'Dubai, Abu Dhabi, Riyadh, Jeddah, Doha, Muscat, Manama, Kuwait City',
    badge: 'International',
  },
  {
    region: 'United Kingdom & Europe',
    cities: 'London, Manchester, Birmingham, Edinburgh, Dublin, Frankfurt',
    badge: 'International',
  },
  {
    region: 'Southeast Asia & Pacific',
    cities: 'Manila, Cebu, Kuala Lumpur, Singapore, Auckland, Suva',
    badge: 'International',
  },
  {
    region: 'North America & Africa',
    cities: 'Toronto, New York, Chicago, Johannesburg, Nairobi, Cairo',
    badge: 'International',
  },
];

export default function ExamDatesPage() {
  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: examDatesFaqs.map((faq) => ({
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
              Exam Dates
            </li>
          </ol>
        </nav>

        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-teal-950 to-slate-900 text-white p-8 md:p-14 lg:p-16 mb-12 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-500/10 px-4 py-1.5 text-xs sm:text-sm font-semibold text-teal-300 mb-6 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-teal-400 animate-pulse"></span>
              Verified With Australian Pharmacy Council (APC)
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              OPRA Exam Dates (2026–2027): <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Official Schedule & Deadlines
              </span>
            </h1>

            <p className="text-slate-300 text-base sm:text-lg lg:text-xl leading-relaxed mb-8 max-w-3xl">
              Stay ahead of strict registration cutoffs. The APC conducts the Overseas Pharmacist Readiness Assessment multiple times per year. OPRA exam fee: AUD $2,245 per attempt. Missing a deadline postpones your registration by 4 to 6 months.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-sm text-slate-300">
              <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 px-4 py-2 rounded-full backdrop-blur-xs text-emerald-200">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>November 2026 Registration: <strong>OPEN (Closes 19 Oct 2026)</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                <span>Exam: <strong>23–25 November 2026</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <span>Exam Fee: <strong>AUD $2,245</strong></span>
              </div>
              <a
                href={APC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:text-emerald-300 underline font-medium"
              >
                Confirm on official APC portal →
              </a>
            </div>
          </div>
        </div>

        {/* Main Verified Exam Dates Component */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden mb-16">
          <VerifiedExamDates />
        </div>

        {/* 4-Step Registration & Document Evaluation Roadmap */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs sm:text-sm font-semibold text-amber-800 mb-3">
              Prerequisite Warning
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
              Step-by-Step Registration Timeline
            </h2>
            <p className="text-slate-600 text-base sm:text-lg">
              You cannot book an OPRA exam date until your Document Evaluation is approved. Plan your journey using this proven countdown.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center mb-4">
                1
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                8–12 Weeks Before Window
              </span>
              <h3 className="font-bold text-slate-900 text-lg mb-2">APC Document Evaluation</h3>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                Submit degree transcripts, syllabus equivalence, and identity proofs to the Australian Pharmacy Council for formal international assessment. Verify the current Document Evaluation fee on the <a href="https://www.pharmacycouncil.org.au/candidates/fees/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 underline">APC fees page</a>.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center mb-4">
                2
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 mb-1">
                Day 1 of Registration
              </span>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Book Pearson VUE Slot</h3>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                Log into Pearson VUE using your APC candidate ID. Pay the exam fee (AUD $2,245) and immediately secure your seat in your preferred city before slots fill up.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center mb-4">
                3
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 mb-1">
                Exam Week
              </span>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Sit the OPRA Exam</h3>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                Arrive at the approved Pearson VUE centre on your scheduled date. Complete 120 multiple-choice questions in 2 hours and 30 minutes. The exam is computer-based.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm relative flex flex-col">
              <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-800 font-bold flex items-center justify-center mb-4">
                4
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-purple-600 mb-1">
                4–5 Weeks Post Exam
              </span>
              <h3 className="font-bold text-slate-900 text-lg mb-2">Results & Next Steps</h3>
              <p className="text-sm text-slate-600 leading-relaxed flex-1">
                Receive official APC outcome letter. A pass clears you for Ahpra provisional registration, English test submission, and Australian internship hours.
              </p>
            </div>
          </div>
        </section>

        {/* International Pearson VUE Centers */}
        <section className="mb-16 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-3">
              Global Testing Network
            </div>
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4">
              Where Can You Take the OPRA Exam?
            </h2>
            <p className="text-slate-600 leading-relaxed">
              You do <strong>not</strong> need to fly to Australia to sit the OPRA Exam. The assessment is conducted at authorized Pearson VUE testing facilities across the world:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testCenters.map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-100 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold text-slate-900">{item.region}</h3>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-sm text-slate-600 leading-relaxed mb-4">{item.cities}</p>
                </div>
                <div className="text-xs text-slate-400 font-medium pt-3 border-t border-slate-200/60">
                  Computer-delivered via Pearson VUE
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fees Summary Table */}
        <section className="mb-16">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 tracking-tight">
              APC Official Fee Schedule (2026)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-2xl">
              All fees are payable in Australian Dollars (AUD) directly to the Australian Pharmacy Council via credit card during online submission.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="border-b border-slate-800 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="py-4 pr-6">Stage</th>
                    <th className="py-4 pr-6">Description</th>
                    <th className="py-4 text-right">Fee (AUD)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-200">
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-white">Stage 1</td>
                    <td className="py-4 pr-6 text-slate-300">
                      APC Eligibility & Document Evaluation (One-time)
                    </td>
                    <td className="py-4 text-right font-bold text-emerald-400"><a href="https://www.pharmacycouncil.org.au/candidates/fees/" target="_blank" rel="noopener noreferrer" className="underline hover:text-emerald-300">Verify on APC</a></td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-white">Stage 2</td>
                    <td className="py-4 pr-6 text-slate-300">
                      OPRA Examination Registration (Per attempt)
                    </td>
                    <td className="py-4 text-right font-bold text-emerald-400">AUD $2,245</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-white">Stage 3</td>
                    <td className="py-4 pr-6 text-slate-300">
                      Ahpra Provisional Registration (After passing OPRA)
                    </td>
                    <td className="py-4 text-right font-bold text-slate-300">~AUD $400–$500</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Deadline Notification Lead Form */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-4">
                Deadline Reminders
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Never Miss an OPRA Exam Window
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed">
                Connect with our team to verify your documents before submitting to APC, receive critical alerts on when Pearson VUE slots open, and prepare with customized study schedules.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">
                    Instant alerts when Pearson VUE testing windows open
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">
                    Free evaluation of degree eligibility before paying APC evaluation fees
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">
                    1-on-1 counseling on exam session timing and study timeline
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/syllabus"
                  className="inline-flex items-center font-bold text-emerald-600 hover:text-emerald-700 text-sm group"
                >
                  Explore OPRA Syllabus Breakdown
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
                  className="inline-flex items-center font-bold text-slate-700 hover:text-emerald-600 text-sm group"
                >
                  Download Free Sample Papers
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
                title="Book 1:1 Eligibility Check"
                buttonText="VERIFY MY ELIGIBILITY"
                tag="exam-dates-page"
                source="ExamDatesPage"
              />
            </div>
          </div>
        </section>

        {/* Exam Dates FAQs */}
        <section className="mb-16">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-4 tracking-tight">
              Frequently Asked Questions About Dates & Bookings
            </h2>
            <p className="text-slate-600">
              Clear answers to the most common queries regarding OPRA registration windows and test slots.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {examDatesFaqs.map((faq, i) => (
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
            href="/syllabus"
            className="bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-full hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-2xs"
          >
            Explore OPRA Syllabus →
          </Link>
          <Link
            href="/blog"
            className="bg-white border border-slate-200 text-slate-700 font-semibold py-3 px-6 rounded-full hover:bg-slate-50 hover:text-emerald-600 transition-colors shadow-2xs"
          >
            Read Exam Strategy Blog →
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
