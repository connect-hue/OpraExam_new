import Link from 'next/link';
import type { Metadata } from 'next';
import { APC_URL, APC_PORTAL_URL } from '@/components/VerifiedExamDates';
import LeadForm from '@/components/LeadForm';

// The page contains time-dependent registration badges; refresh periodically.
export const revalidate = 60;

// Must match robots.ts, sitemap.ts, root metadataBase, and site redirects.
const siteUrl = 'https://www.opraexam.in';
const pageUrl = `${siteUrl}/exam-dates`;
const seoTitle = 'OPRA Exam Dates 2026–2027: Registration & Results';
const seoDescription =
  'Check OPRA Exam Dates 2026–2027, registration deadlines, examination centres, fees and result dates. Find the latest APC schedule and registration guidance.';

export const metadata: Metadata = {
  title: { absolute: seoTitle },
  description: seoDescription,
  alternates: { canonical: pageUrl },
  openGraph: {
    title: seoTitle,
    description: seoDescription,
    url: pageUrl,
    type: 'website',
    siteName: 'opraexam.in',
    locale: 'en_AU',
    images: [
      {
        url: `${siteUrl}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'OPRA Exam Dates 2026–2027 – opraexam.in',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: seoTitle,
    description: seoDescription,
    images: [`${siteUrl}/og-image.jpg`],
  },
};

// Dates and Sydney-time registration cutoffs published by APC.
// Update this array when APC publishes further examination sessions.
const sessionSchedule = [
  {
    session: 'Nov 2026',
    fullName: 'November 2026',
    registrationDates: '18 Aug – 19 Oct 2026',
    registrationOpens: '2026-08-18T09:00:00+10:00', // AEST
    registrationCloses: '2026-10-19T17:00:00+11:00', // AEDT
    openingLabel: '18 Aug 2026',
    examDates: '23–25 Nov 2026',
    examEnds: '2026-11-25T23:59:59+11:00',
    resultsDate: '22 Dec 2026',
  },
  {
    session: 'Mar 2027',
    fullName: 'March 2027',
    registrationDates: '19 Jan – 22 Feb 2027',
    registrationOpens: '2027-01-19T09:00:00+11:00', // AEDT
    registrationCloses: '2027-02-22T17:00:00+11:00', // AEDT
    openingLabel: '19 Jan 2027',
    examDates: '22–24 Mar 2027',
    examEnds: '2027-03-24T23:59:59+11:00',
    resultsDate: '6 May 2027',
  },
  {
    session: 'Jul 2027',
    fullName: 'July 2027',
    registrationDates: '11 May – 28 Jun 2027',
    registrationOpens: '2027-05-11T09:00:00+10:00', // AEST
    registrationCloses: '2027-06-28T17:00:00+10:00', // AEST
    openingLabel: '11 May 2027',
    examDates: '26–28 Jul 2027',
    examEnds: '2027-07-28T23:59:59+10:00',
    resultsDate: '9 Sep 2027',
  },
  {
    session: 'Nov 2027',
    fullName: 'November 2027',
    registrationDates: '14 Sep – 11 Oct 2027',
    registrationOpens: '2027-09-14T09:00:00+10:00', // AEST
    registrationCloses: '2027-10-11T17:00:00+11:00', // AEDT
    openingLabel: '14 Sep 2027',
    examDates: '8–10 Nov 2027',
    examEnds: '2027-11-10T23:59:59+11:00',
    resultsDate: '23 Dec 2027',
  },
] as const;

type ExamSession = (typeof sessionSchedule)[number];

function getRegistrationStatus(session: ExamSession, now: number) {
  if (now < Date.parse(session.registrationOpens)) {
    return {
      label: `Opens ${session.openingLabel}`,
      badge: 'bg-amber-100 text-amber-800 border-amber-200',
    };
  }
  if (now <= Date.parse(session.registrationCloses)) {
    return {
      label: 'Registration Open',
      badge: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    };
  }
  return {
    label: now > Date.parse(session.examEnds) ? 'Exam Completed' : 'Registration Closed',
    badge: 'bg-slate-100 text-slate-700 border-slate-200',
  };
}

function safeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, '\\u003c');
}

const examDatesFaqs = [
  {
    q: 'Can You Reschedule Your OPRA Exam?',
    a: 'Candidates can reschedule their examination appointment through the APC Candidate Portal during the applicable registration period, subject to available appointments. APC does not provide a general rule allowing rescheduling until 48 hours before the examination.',
  },
  {
    q: 'When Are OPRA Exam Results Released?',
    a: 'APC publishes the results date for each examination session in advance. Candidates receive an email when their results are available and can access their outcome through the APC Candidate Portal. The result indicates whether the candidate passed or was unsuccessful. APC does not provide individual numerical examination scores.',
  },
  {
    q: 'Can I sit the OPRA exam outside Australia?',
    a: 'Yes. The OPRA exam is delivered globally through Pearson VUE professional test centres. Overseas-qualified pharmacists can sit the examination in approved test locations across India, the UAE, the UK, the Philippines, and other international centres without traveling to Australia.',
  },
  {
    q: 'How far in advance should I submit the APC Eligibility Check?',
    a: 'Candidates are advised to complete their APC Eligibility Check well before the registration deadline. APC recommends submitting the application at least eight weeks before the relevant registration closing date, as you cannot book an exam seat until your eligibility is confirmed.',
  },
  {
    q: 'What happens if test-centre appointments fill up in my preferred city?',
    a: 'Appointments depend on test-centre availability during each examination session. A city appearing on the published list does not guarantee an available appointment. Candidates should register early during the open registration window to select their preferred date and venue.',
  },
  {
    q: 'What are the next steps after passing the OPRA exam?',
    a: 'Passing OPRA is an essential milestone in the APC Knowledge Stream. Successful candidates can request their Skills Assessment Outcome, meet the Pharmacy Board of Australia English language standards, and proceed towards provisional registration to begin supervised practice (internship).',
  },
];

// Locations are drawn from APC's published OPRA test-centre list.
// Listed cities do not guarantee an available appointment for every sitting.
const testCenters = [
  {
    region: 'India & South Asia',
    cities: 'Bengaluru (Bangalore), Chennai, Hyderabad, Mumbai, New Delhi, Noida and surrounding areas; Islamabad, Lahore, Karachi; Colombo; Itahari',
    badge: 'APC Listed',
    note: 'Confirm appointment availability in the APC Candidate Portal.',
  },
  {
    region: 'Australia',
    cities: 'Adelaide, Brisbane, Canberra, Darwin, Alice Springs, Hobart, Melbourne, Perth, Sydney, Townsville',
    badge: 'APC Listed',
    note: 'Test centres may reach capacity or change by session.',
  },
  {
    region: 'Middle East & Gulf',
    cities: 'Dubai and surrounding areas; Riyadh, Jeddah, Dammam; Doha; Muscat; Salmiya',
    badge: 'APC Listed',
    note: 'Availability depends on the specific examination session.',
  },
  {
    region: 'United Kingdom & Europe',
    cities: 'London; Helsinki and Espoo; Athens; Krakow; Madrid; Istanbul',
    badge: 'APC Listed',
    note: 'Refer to APC for any location changes.',
  },
  {
    region: 'Southeast Asia & Pacific',
    cities: 'Manila; Kuala Lumpur; Singapore; Bangkok; Ho Chi Minh; Auckland, Wellington, Christchurch; Suva; Taipei City; Wan Chai',
    badge: 'APC Listed',
    note: 'Seat availability varies by test centre and session.',
  },
  {
    region: 'Americas & Africa',
    cities: 'Toronto, Alberta; Buenos Aires; Kingston; Johannesburg, Cape Town; Giza, Cairo; Nairobi; Gaborone; Legon; Harare',
    badge: 'APC Listed',
    note: 'Check the official location list before booking.',
  },
];

export default function ExamDatesPage() {
  const now = Date.now();
  const featuredSession =
    sessionSchedule.find((session) => now <= Date.parse(session.examEnds)) ??
    sessionSchedule[sessionSchedule.length - 1];
  const featuredStatus = getRegistrationStatus(featuredSession, now);
  const nextRegistration = sessionSchedule.find(
    (session) => now < Date.parse(session.registrationOpens)
  );

  const pageSchema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebPage',
        '@id': `${pageUrl}#webpage`,
        url: pageUrl,
        name: seoTitle,
        description: seoDescription,
        isPartOf: { '@id': `${siteUrl}/#website` },
        breadcrumb: { '@id': `${pageUrl}#breadcrumb` },
      },
      {
        '@type': 'BreadcrumbList',
        '@id': `${pageUrl}#breadcrumb`,
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: `${siteUrl}/` },
          { '@type': 'ListItem', position: 2, name: 'Exam Dates', item: pageUrl },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${pageUrl}#faq`,
        mainEntity: examDatesFaqs.map((faq) => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      },
    ],
  };

  return (
    <div className="bg-slate-50 min-h-screen py-10 lg:py-16">
      {/* Accurate page-specific structured data. Do not invent exam start times or locations. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(pageSchema) }}
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
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-teal-950 text-white p-8 md:p-14 lg:p-16 mb-12 shadow-2xl border border-slate-800">
          <div className="absolute top-0 right-0 -mt-16 -mr-16 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-slate-700 bg-slate-800/80 px-4 py-1.5 text-xs sm:text-sm font-semibold text-slate-300 mb-6 backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-slate-400"></span>
              Australian Pharmacy Council (APC) Examination Schedule
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-tight">
              OPRA Exam Dates 2026–2027: <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                Registration, Exam Schedule &amp; Results
              </span>
            </h1>

            <p className="text-slate-200 text-base sm:text-lg lg:text-xl leading-relaxed mb-4 max-w-3xl font-medium">
              Stay informed about the latest OPRA exam dates for 2026 and 2027, including examination windows, registration deadlines, result announcements and approved test centres.
            </p>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-8 max-w-3xl">
              The Overseas Pharmacist Readiness Assessment (OPRA) is administered by the Australian Pharmacy Council (APC). Overseas-qualified pharmacists must complete the required eligibility process before registering for an examination session.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-300">
              <div className="flex items-center gap-2 bg-slate-800/90 border border-slate-700 px-4 py-2 rounded-full backdrop-blur-xs text-slate-200">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-400"></span>
                <span>{featuredSession.fullName} Registration: <strong className="text-slate-100">{featuredStatus.label}</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full backdrop-blur-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-400"></span>
                <span>{featuredSession.fullName} Exam Dates: <strong>{featuredSession.examDates}</strong></span>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/20 border border-emerald-400/40 px-4 py-2 rounded-full backdrop-blur-xs text-emerald-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                <span>{nextRegistration ? (<>Next Registration: <strong>{nextRegistration.openingLabel} ({nextRegistration.fullName} Session)</strong></>) : (<>Future registration dates: <strong>Check APC</strong></>)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Card: November 2026 OPRA Exam — Registration Closed */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-md p-8 md:p-10 mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 text-slate-700 text-xs font-bold uppercase tracking-wider mb-2 border border-slate-200">
                Current Session Notice
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {featuredSession.fullName} OPRA Exam — {featuredStatus.label}
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider border border-slate-300 self-start lg:self-auto">
              <span className="w-2 h-2 rounded-full bg-slate-400"></span>
              {featuredStatus.label}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block mb-1">Registration Period</span>
              <strong className="text-sm sm:text-base text-slate-900">{featuredSession.registrationDates}</strong>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block mb-1">Examination Dates</span>
              <strong className="text-sm sm:text-base text-emerald-700">{featuredSession.examDates}</strong>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block mb-1">Results Release</span>
              <strong className="text-sm sm:text-base text-slate-900">{featuredSession.resultsDate}</strong>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
              <span className="text-xs text-slate-500 font-medium block mb-1">Exam Fee</span>
              <strong className="text-sm sm:text-base text-slate-900">AUD $2,245 per attempt</strong>
            </div>
          </div>

          <div className="space-y-3 text-slate-700 text-sm sm:text-base leading-relaxed mb-6">
            <p>
              {featuredStatus.label === 'Registration Open'
                ? `Registration is open for the ${featuredSession.fullName} OPRA examination. Eligible candidates can book through the APC Candidate Portal, subject to seat availability.`
                : `Check the ${featuredSession.fullName} OPRA session schedule. Candidates with confirmed bookings should review their examination confirmation, identification requirements and test-centre instructions.`}
            </p>
            <p className="text-slate-600">
              {nextRegistration ? (
                <>The next announced registration window opens on <strong>{nextRegistration.openingLabel}</strong> for the {nextRegistration.fullName} examination.</>
              ) : (
                <>For examination sessions after November 2027, check APC for newly announced registration windows.</>
              )}
            </p>
          </div>

          <div>
            <a
              href="#schedule-table"
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-3 rounded-xl text-sm sm:text-base transition-all shadow-sm"
            >
              View All Published Exam Dates &darr;
            </a>
          </div>
        </div>

        {/* Section: Upcoming OPRA Exam Registrations in 2027 */}
        <section id="sessions-2027" className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-10 mb-12">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-800 mb-3">
              Future Sessions
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Upcoming OPRA Exam Registrations in 2027
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-3">
              The Australian Pharmacy Council has announced three examination sessions for 2027: March, July and November.
            </p>
            <p className="text-slate-700 text-base leading-relaxed mb-4">
              {nextRegistration ? (
                <>The next scheduled registration period opens on <strong>{nextRegistration.openingLabel}</strong> for the {nextRegistration.fullName} examination. See the table below for the published closing date.</>
              ) : (
                <>The published 2027 registration windows are shown below. Check APC for subsequent examination sessions.</>
              )}
            </p>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 text-amber-900 text-sm leading-relaxed">
              <strong>Planning Advice:</strong> Candidates are advised to complete their APC Eligibility Check well before the registration deadline. APC recommends submitting the application at least eight weeks before the relevant registration closing date.
            </div>
          </div>

          {/* Official Schedule Table (Image 1) */}
          <div id="schedule-table" className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs mb-8">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm sm:text-base">
                <thead>
                  <tr className="bg-slate-900 text-white">
                    <th className="py-4 px-6 font-bold">Session</th>
                    <th className="py-4 px-6 font-bold">Registration dates</th>
                    <th className="py-4 px-6 font-bold">Examination</th>
                    <th className="py-4 px-6 font-bold">Results</th>
                    <th className="py-4 px-6 font-bold text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {sessionSchedule.map((session) => {
                    const status = getRegistrationStatus(session, now);
                    return (
                      <tr key={session.session} className="hover:bg-slate-50/80">
                        <td className="py-4 px-6 font-bold text-slate-900">{session.session}</td>
                        <td className="py-4 px-6 text-slate-700">{session.registrationDates}</td>
                        <td className="py-4 px-6 font-semibold text-emerald-800">{session.examDates}</td>
                        <td className="py-4 px-6 text-slate-700">{session.resultsDate}</td>
                        <td className="py-4 px-6 text-center">
                          <span className={`inline-block text-xs font-bold px-2.5 py-1 rounded-full border ${status.badge}`}>
                            {status.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* Section: How to Register for the OPRA Exam */}
        <section className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 md:p-12 mb-12">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-3">
              Official Procedure
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
              How to Register for the OPRA Exam
            </h2>
            <p className="text-slate-600 text-base">
              Follow the required steps through the official Australian Pharmacy Council portal:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[
              {
                step: '1',
                title: 'Check Knowledge Stream',
                desc: 'Check whether the APC Knowledge Stream applies to your pharmacy qualification.',
              },
              {
                step: '2',
                title: 'Submit Eligibility Check',
                desc: 'Submit an Eligibility Check through the APC Candidate Portal along with your degree and identity documents.',
              },
              {
                step: '3',
                title: 'Receive Confirmation',
                desc: 'Receive confirmation from APC that you are eligible to sit OPRA before booking any session.',
              },
              {
                step: '4',
                title: 'Register During Window',
                desc: 'Register for an available examination session during its published registration period.',
              },
              {
                step: '5',
                title: 'Select Centre & Pay Fee',
                desc: 'Choose an available test-centre appointment and pay the examination fee (AUD $2,245).',
              },
              {
                step: '6',
                title: 'Prepare for Test Day',
                desc: 'Review your examination confirmation, ID requirements, and prepare for test day.',
              },
            ].map((item) => (
              <div key={item.step} className="bg-slate-50 p-6 rounded-2xl border border-slate-200 flex flex-col">
                <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-sm flex items-center justify-center mb-3">
                  {item.step}
                </div>
                <h3 className="font-bold text-slate-900 text-base mb-1.5">{item.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Official Registration CTA linking directly to APC Candidate Portal */}
          <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <span className="text-xs uppercase tracking-wider text-emerald-400 font-bold block mb-1">
                Official APC Portal
              </span>
              <h3 className="text-lg sm:text-xl font-bold">Register via APC Candidate Portal</h3>
              <p className="text-slate-300 text-xs sm:text-sm mt-1">
                All examination bookings, scheduling, and results are handled directly via the official candidate portal.
              </p>
            </div>
            <a
              href={APC_PORTAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-7 py-3.5 rounded-xl text-sm sm:text-base transition-all shrink-0 shadow-md"
            >
              Open APC Candidate Portal &rarr;
            </a>
          </div>
        </section>

        {/* Section: OPRA Exam Centres in India & Global Locations */}
        <section className="mb-12 bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-3">
              Approved Locations
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">
              OPRA Exam Centres in India &amp; International Locations
            </h2>
            <p className="text-slate-700 text-base leading-relaxed mb-2">
              According to APC&apos;s published test-centre list, examination locations in India include <strong>Bengaluru (Bangalore), Chennai, Hyderabad, Mumbai, New Delhi, Noida and surrounding areas</strong>. Other listed international centres are summarised below.
            </p>
            <p className="text-slate-500 text-sm italic">
              Appointments depend on test-centre availability during each examination session. A city appearing on the published list does not guarantee an available appointment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testCenters.map((item, idx) => (
              <div key={idx} className="bg-slate-50 rounded-2xl p-6 border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-base font-bold text-slate-900">{item.region}</h3>
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                      {item.badge}
                    </span>
                  </div>
                  <p className="text-sm text-slate-700 font-medium leading-relaxed mb-3">{item.cities}</p>
                </div>
                <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
                  {item.note}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Fees Summary Table */}
        <section className="mb-12">
          <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 tracking-tight">
              APC Official Assessment Fees (2026)
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mb-8 max-w-2xl leading-relaxed">
              APC charges fees at different stages of the assessment process. Make payments only through the official APC Candidate Portal when the relevant service is requested.
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
                    <td className="py-4 pr-6 font-semibold text-white">Eligibility Check</td>
                    <td className="py-4 pr-6 text-slate-300">
                      APC Knowledge Stream Eligibility &amp; Document Evaluation
                    </td>
                    <td className="py-4 text-right font-bold text-emerald-400">$810</td>
                  </tr>
                  <tr className="bg-emerald-950/30">
                    <td className="py-4 pr-6 font-semibold text-white">OPRA Exam Registration</td>
                    <td className="py-4 pr-6 text-slate-300">
                      Single sitting, 120 MCQs in 150 minutes (Per attempt)
                    </td>
                    <td className="py-4 text-right font-bold text-emerald-400">AUD $2,245</td>
                  </tr>
                  <tr>
                    <td className="py-4 pr-6 font-semibold text-white">Skills Assessment Outcome</td>
                    <td className="py-4 pr-6 text-slate-300">
                      Official issuance after successfully passing assessment requirements
                    </td>
                    <td className="py-4 text-right font-bold text-emerald-400">$300</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-xs text-slate-400 mt-6 italic">
              Fees do not include English testing, visa costs, or provisional registration fees. Always verify the current fee schedule on the official APC website.
            </p>
          </div>
        </section>

        {/* Lead Form Consultation Section */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-4">
                Independent Guidance
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">
                Plan Your OPRA Timeline for 2027
              </h2>
              <p className="text-slate-600 text-base sm:text-lg mb-6 leading-relaxed">
                Need guidance on APC Eligibility Check requirements, published registration windows, or building a study plan for an upcoming examination? Connect with our independent educational mentors.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">
                    Preparation strategies for the 5 official OPRA syllabus areas
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">
                    Understanding the APC Eligibility Check document checklist
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                    ✓
                  </div>
                  <span className="text-slate-700 font-semibold text-sm">
                    Free diagnostic quiz and pharmaceutical calculation exercises
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
                  Practise Sample Questions
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
                title="Book 1:1 Study Plan Session"
                subtitle="Independent educational guidance for overseas pharmacists preparing for Australian licensing."
                buttonText="GET STUDY PLAN"
                tag="exam-dates-page"
                source="OPRAExam"
                notes="Exam Dates"
              />
            </div>
          </div>
        </section>

        {/* Section: Frequently Asked Questions About Dates & Bookings */}
        <section className="mb-12">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 mb-3 tracking-tight">
              Frequently Asked Questions About Dates &amp; Bookings
            </h2>
            <p className="text-slate-600 text-base">
              Clear, verified answers regarding registration windows, test scheduling, and result timelines.
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {examDatesFaqs.map((faq, i) => (
              <details
                key={i}
                className="group bg-white p-6 rounded-2xl border border-slate-200 cursor-pointer open:border-emerald-300 open:shadow-md transition-all"
              >
                <summary className="font-bold text-base sm:text-lg text-slate-900 flex justify-between items-center outline-none list-none">
                  <span>{faq.q}</span>
                  <span className="text-emerald-600 group-open:rotate-180 transition-transform ml-4 shrink-0">
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

        {/* Section: Start Preparing for Your Next OPRA Exam */}
        <section className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl mb-12">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3 tracking-tight">
              Start Preparing for Your Next OPRA Exam
            </h2>
            <p className="text-slate-300 text-base leading-relaxed">
              Explore these free preparation resources:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
            <Link
              href="/syllabus"
              className="bg-slate-800 hover:bg-slate-750 p-5 rounded-2xl border border-slate-700 text-center transition-all hover:-translate-y-1 group"
            >
              <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                OPRA Exam Syllabus &rarr;
              </h3>
              <p className="text-xs text-slate-400">Five official content areas and subject weightages.</p>
            </Link>

            <Link
              href="/sample-papers"
              className="bg-slate-800 hover:bg-slate-750 p-5 rounded-2xl border border-slate-700 text-center transition-all hover:-translate-y-1 group"
            >
              <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                OPRA Exam Sample Papers &rarr;
              </h3>
              <p className="text-xs text-slate-400">Free practice questions with explanations.</p>
            </Link>

            <Link
              href="/opra-quiz"
              className="bg-slate-800 hover:bg-slate-750 p-5 rounded-2xl border border-slate-700 text-center transition-all hover:-translate-y-1 group"
            >
              <h3 className="font-bold text-white group-hover:text-emerald-400 transition-colors mb-1">
                Free OPRA Readiness Quiz &rarr;
              </h3>
              <p className="text-xs text-slate-400">Test your diagnostic baseline score.</p>
            </Link>
          </div>

          <div className="border-t border-slate-800 pt-6 max-w-3xl mx-auto text-center text-xs text-slate-400 space-y-2">
            <p>
              Official source:{' '}
              <a
                href={APC_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400 hover:underline inline-flex items-center gap-1"
              >
                Australian Pharmacy Council – Knowledge Stream
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </p>
            <p>Last reviewed: 21 October 2026</p>
            <p className="text-slate-500 pt-2 border-t border-slate-800/60">
              opraexam.in is an independent educational resource and is not affiliated with or endorsed by the Australian Pharmacy Council.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
