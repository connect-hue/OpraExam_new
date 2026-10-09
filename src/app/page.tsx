import Link from 'next/link';
import MedicalBackground from '@/components/MedicalBackground';
import VerifiedExamDates from '@/components/VerifiedExamDates';
import LeadForm from '@/components/LeadForm';
import { getAllFaqs } from '@/lib/db/faqs';
import { getSiteContent } from '@/lib/db/siteContent';
import { getPublishedBlogs } from '@/lib/db/blogs';

export const revalidate = 60; // revalidate at most once every minute

export default async function Home() {
  const [faqs, content, allBlogs] = await Promise.all([
    getAllFaqs(),
    getSiteContent(),
    getPublishedBlogs(),
  ]);

  const latestBlogs = allBlogs.slice(0, 3);

  return (
    <div className="flex flex-col w-full h-full bg-white relative">
      {/* Hero Section with LeadForm */}
      <section id="hero-lead-form" className="relative overflow-hidden w-full bg-gradient-to-b from-emerald-50/70 via-white/50 to-white pt-10 pb-16 md:pt-16 md:pb-24">
        <MedicalBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column: Hero Content & Value Props */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50/90 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-emerald-800 mb-6 shadow-2xs backdrop-blur-xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-600 mr-2 animate-pulse"></span>
                {content.hero.badgeText}
              </div>
              
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-6 leading-[1.15]">
                {content.hero.headingPrefix}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">
                  {content.hero.headingHighlight}
                </span>
                {content.hero.headingSuffix}
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 mb-8 leading-relaxed font-normal max-w-2xl">
                {content.hero.description}
              </p>

              {/* Key Highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 w-full mb-8">
                {content.hero.perks.map((perk, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 bg-white/80 backdrop-blur-xs border border-emerald-100 rounded-xl px-3.5 py-2.5 shadow-2xs">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-700">{perk}</span>
                  </div>
                ))}
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-200/60 w-full text-slate-500 text-xs sm:text-sm">
                <div className="flex items-center gap-2">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">OP</div>
                    <div className="w-8 h-8 rounded-full bg-teal-600 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">PS</div>
                    <div className="w-8 h-8 rounded-full bg-slate-800 text-white font-bold text-xs flex items-center justify-center ring-2 ring-white">+5k</div>
                  </div>
                  <span className="font-semibold text-slate-700">{content.hero.candidatesGuided}</span>
                </div>
                <div className="flex items-center gap-1 text-amber-500 font-semibold">
                  <span>★★★★★</span>
                  <span className="text-slate-600 font-medium">{content.hero.satisfactionRating}</span>
                </div>
              </div>
            </div>

            {/* Right Column: Lead Form in Hero Section */}
            <div className="lg:col-span-5 w-full">
              <LeadForm
                title="Book Your 1 : 1 Doubt Clearing Session"
                buttonText="BOOK NOW"
                tag="opraexam"
                source="OPRAExam"
              />
            </div>

          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white w-full border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                {content.about.title}
              </h2>
              <div className="w-20 h-1.5 bg-emerald-500 rounded-full mb-8 opacity-80"></div>
              <p className="text-lg text-slate-700 font-medium mb-4 leading-relaxed">
                {content.about.highlight}
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                {content.about.description}
              </p>
              <ul className="space-y-4">
                {content.about.points.map((item, idx) => (
                  <li key={idx} className="flex items-start group">
                    <svg className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-slate-700 font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 p-8 rounded-3xl border border-slate-100 shadow-xl relative overflow-hidden group">
               <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
               <div className="grid grid-cols-2 gap-6 relative z-10">
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center transform transition-transform hover:-translate-y-1 duration-300">
                   <div className="text-4xl font-extrabold text-emerald-600 mb-2">120</div>
                   <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Questions</div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center transform transition-transform hover:-translate-y-1 duration-300 delay-75">
                   <div className="text-4xl font-extrabold text-emerald-600 mb-2">100%</div>
                   <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">MCQ Format</div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center transform transition-transform hover:-translate-y-1 duration-300 delay-100">
                   <div className="text-4xl font-extrabold text-emerald-600 mb-2">2</div>
                   <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Papers</div>
                 </div>
                 <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center transform transition-transform hover:-translate-y-1 duration-300 delay-150">
                   <div className="text-4xl font-extrabold text-emerald-600 mb-2">3 hrs</div>
                   <div className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Per Paper</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pathway to Registration Section */}
      <section id="pathway" className="py-16 md:py-24 bg-emerald-50 w-full border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">4 Steps to Australian Pharmacist Registration</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Follow this exact roadmap to convert your international pharmacy degree into an Australian practicing license.</p>
          </div>
          <div className="relative">
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-emerald-200 -translate-y-1/2 z-0"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative z-10">
              <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 text-center relative">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-white shadow-sm shadow-emerald-200">1</div>
                <h3 className="font-bold text-slate-900 mb-2">APC Document Evaluation</h3>
                <p className="text-sm text-slate-600">Submit your degree transcripts to the Australian Pharmacy Council (APC) for formal international skills assessment.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 text-center relative pointer-events-none ring-2 ring-emerald-500">
                <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Critical Step</div>
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-white shadow-sm shadow-emerald-200">2</div>
                <h3 className="font-bold text-slate-900 mb-2">Pass the OPRA Exam</h3>
                <p className="text-sm text-slate-600">Register and clear the 240-question OPRA exam to prove your clinical alignment with Australian standards.</p>
              </div>
              <div className="bg-emerald-600 p-6 rounded-2xl shadow-lg border border-emerald-500 text-center relative transform hover:-translate-y-1 transition-transform">
                <div className="w-12 h-12 bg-white text-emerald-600 rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-emerald-500 shadow-sm shadow-emerald-800">3</div>
                <h3 className="font-bold text-white mb-2">IELTS/OET & Internship</h3>
                <p className="text-sm text-emerald-100">Clear your English proficiency test and complete supervised pharmacy internship hours in Australia.</p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-md border border-emerald-100 text-center relative">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold text-xl mx-auto mb-4 border-4 border-white shadow-sm shadow-emerald-200">4</div>
                <h3 className="font-bold text-slate-900 mb-2">Ahpra General Registration</h3>
                <p className="text-sm text-slate-600">Pass the final Pharmacy Board (Ahpra) oral/written exams to achieve your independent practicing license.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* OPRA vs KAPS Section */}
      <section id="opra-vs-kaps" className="py-16 md:py-24 bg-slate-900 text-white w-full border-t border-slate-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="inline-flex items-center rounded-full border border-slate-700 bg-slate-800 px-3 py-1 text-sm font-medium text-emerald-400 mb-6">
                Important Transitional Update
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">OPRA vs KAPS: What Changed in 2026?</h2>
              <p className="text-lg text-slate-300 mb-6 leading-relaxed">
                The Australian Pharmacy Council has officially retired the Knowledge Assessment of Pharmaceutical Sciences (KAPS) in favor of the new OPRA exam. All applicants must now pass OPRA to register.
              </p>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span><strong>Clinical Judgment Over Recall:</strong> OPRA completely eliminates rote memorization questions, replacing them with multi-step primary care case studies derived from the Australian Medicines Handbook.</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 text-emerald-500 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                  <span><strong>Expanded Therapeutics:</strong> Paper 2 now heavily features complex patient counseling scenarios, drug-drug interaction management, and dosage adjustments.</span>
                </li>
              </ul>
            </div>
            <div className="bg-slate-800 p-8 rounded-3xl border border-slate-700 shadow-2xl relative">
              <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4">
                <div className="bg-emerald-500 text-slate-900 font-extrabold text-sm px-4 py-2 rounded-full shadow-lg transform rotate-12">Action Required</div>
              </div>
              <h4 className="text-xl font-bold mb-6 text-center text-slate-100">Which exam is right for you?</h4>
              <p className="text-slate-400 text-center mb-8">The KAPS exam is strictly obsolete. Do not buy outdated KAPS materials. You must study explicitly for the newly formulated OPRA syllabus.</p>
              <Link href="#syllabus" className="block w-full text-center bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl transition-colors">
                View Valid OPRA Syllabus
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Mid-page Fast-Track Consultation Banner */}
      <section className="py-14 bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-800 text-white w-full relative overflow-hidden shadow-inner">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-100 text-xs font-semibold uppercase tracking-wider mb-3">
              Fast-Track Preparation
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">
              Ready to verify your eligibility for the 2026 OPRA Exam?
            </h3>
            <p className="text-emerald-100 text-base leading-relaxed">
              Connect with OPRA mentors to get a full transcript evaluation and comprehensive APC skills assessment roadmap.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 shrink-0 w-full md:w-auto">
            <Link
              href="#hero-lead-form"
              className="bg-white text-emerald-800 hover:bg-emerald-50 px-7 py-3.5 rounded-full font-bold text-base transition-all shadow-lg hover:shadow-xl text-center transform hover:-translate-y-0.5"
            >
              Get Free Study Kit
            </Link>
            <Link
              href="/sample-papers"
              className="bg-emerald-900/60 hover:bg-emerald-900 text-white border border-white/20 px-7 py-3.5 rounded-full font-semibold text-base transition-all text-center"
            >
              Sample Papers
            </Link>
          </div>
        </div>
      </section>

      {/* Exam Dates Section */}
      <VerifiedExamDates />

      {/* Syllabus Breakdown Section */}
      <section id="syllabus" className="py-16 md:py-24 bg-white w-full border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">{content.syllabus.title}</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">{content.syllabus.subtitle}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {content.syllabus.domains.map((dom, idx) => {
              const iconColor =
                dom.color === 'blue'
                  ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                  : dom.color === 'purple'
                  ? 'bg-purple-50 text-purple-600 group-hover:bg-purple-600 group-hover:text-white'
                  : 'bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white';
              const badgeColor =
                dom.color === 'blue'
                  ? 'bg-blue-50 text-blue-700'
                  : dom.color === 'purple'
                  ? 'bg-purple-50 text-purple-700'
                  : 'bg-emerald-50 text-emerald-700';

              return (
                <div key={idx} className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-2 group">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-all duration-300 ${iconColor}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">{dom.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-4">
                    {dom.description}
                  </p>
                  <div className={`mt-auto inline-block px-3 py-1 rounded-full text-sm font-semibold ${badgeColor}`}>
                    {dom.weight}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-16 md:py-24 bg-white w-full border-t border-slate-100 relative">
        {/* Inject FAQPage Schema for AI Search / Google Snippets */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              "mainEntity": faqs.map((faq) => ({
                "@type": "Question",
                "name": faq.question,
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": faq.answer
                }
              }))
            })
          }}
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Frequently Asked Questions</h2>
            <p className="text-lg text-slate-600">Everything you need to know about passing the OPRA Exam in 2026.</p>
          </div>
          
          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details key={faq._id || index} className="group bg-slate-50 p-6 rounded-2xl border border-slate-200 cursor-pointer open:bg-white open:border-emerald-200 open:shadow-md transition-all">
                <summary className="font-bold text-lg text-slate-900 flex justify-between items-center outline-none">
                  {faq.question}
                  <span className="text-emerald-500 group-open:rotate-180 transition-transform ml-4 shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                  </span>
                </summary>
                <div className="mt-4 pt-4 border-t border-slate-100 text-slate-600 leading-relaxed pr-8">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Blog & Resources Section */}
      <section className="py-16 md:py-24 bg-slate-50 w-full border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12">
            <div>
              <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 mb-4">
                Strategy & Tips
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">OPRA Exam Resources</h2>
            </div>
            <Link href="/blog" className="text-emerald-600 hover:text-emerald-700 font-semibold group flex items-center mt-4 md:mt-0 transition-colors">
              View All Articles
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {latestBlogs.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col">
                <div className="text-emerald-600 font-semibold text-sm mb-3">{post.readTime}</div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">{post.title}</h3>
                <p className="text-slate-600 line-clamp-3 mb-4">{post.description}</p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span>{post.date}</span>
                  <span className="font-semibold text-emerald-600 group-hover:underline">Read Guide &rarr;</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 md:py-24 bg-emerald-700 w-full relative overflow-hidden flex flex-col items-center">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-80 h-80 bg-emerald-600 rounded-full blur-3xl opacity-50"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-80 h-80 bg-teal-600 rounded-full blur-3xl opacity-50"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">Ready to test your knowledge?</h2>
          <p className="text-emerald-50 mb-10 text-xl font-light">Take our free diagnostic assessment and discover which areas of the OPRA syllabus you need to focus on.</p>
          <Link href="/opra-quiz" className="inline-block bg-white text-emerald-800 px-10 py-5 rounded-full font-bold text-xl shadow-xl hover:shadow-2xl hover:bg-slate-50 transform hover:-translate-y-1 transition-all">
            Start Free Quiz
          </Link>
        </div>
      </section>
    </div>
  );
}
