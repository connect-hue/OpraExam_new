import Link from 'next/link';
import MedicalBackground from '@/components/MedicalBackground';
import { faqs } from '@/data/faqs';

export default function Home() {
  return (
    <div className="flex flex-col w-full h-full bg-white relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden w-full bg-gradient-to-b from-emerald-50/70 via-white/50 to-white pt-16 pb-24 md:pt-24 md:pb-32">
        <MedicalBackground />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 mb-8 transform transition-transform hover:scale-105 duration-300">
            <span className="flex h-2 w-2 rounded-full bg-emerald-600 mr-2 animate-pulse"></span>
            Registration for 2026 OPRA Exam is Open
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-slate-900 max-w-4xl mb-6 leading-tight">
            How to Pass the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">OPRA Exam</span> in Australia
          </h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mb-10 leading-relaxed font-medium">
            The Overseas Pharmacist Readiness Assessment (OPRA) is the mandatory exam for international pharmacists. Master the clinical syllabus, access past papers, and unlock your Australian pharmacy career.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-6">
            <Link 
              href="#syllabus" 
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-emerald-500/30 transform hover:-translate-y-1 w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              Explore 2026 Syllabus
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
            <Link 
              href="/sample-papers" 
              className="bg-white hover:bg-slate-50 text-emerald-700 border-2 border-emerald-600 px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-sm hover:shadow-md transform hover:-translate-y-1 w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              Download Free OPRA Cheat Sheet (PDF)
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 md:py-24 bg-white w-full border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6 tracking-tight">
                What is the OPRA Exam?
              </h2>
              <div className="w-20 h-1.5 bg-emerald-500 rounded-full mb-8 opacity-80"></div>
              <p className="text-lg text-slate-700 font-medium mb-4 leading-relaxed">
                The Overseas Pharmacist Readiness Assessment (OPRA) is a mandatory clinical examination administered by the Australian Pharmacy Council (APC).
              </p>
              <p className="text-lg text-slate-600 mb-6 leading-relaxed">
                It officially replaces the legacy KAPS exam and serves as the primary gateway for all internationally qualified pharmacists seeking provisional registration to practice in Australia.
              </p>
              <ul className="space-y-4">
                {[
                  "Mandatory for international pharmacist registration in Australia.",
                  "Tests advanced clinical alignment with the Australian Medicines Handbook (AMH).",
                  "Passing grants eligibility for Provisional Registration & Internship.",
                  "Recognized by the Department of Home Affairs for Skills Assessment visas."
                ].map((item, idx) => (
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

      {/* Newsletter Lead Magnet Section */}
      <section className="py-12 bg-emerald-600 w-full">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 bg-emerald-700/50 p-8 rounded-3xl border border-emerald-500/50 backdrop-blur-sm">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-2">Want to ace the OPRA exam?</h3>
              <p className="text-emerald-100">Join 5,000+ top pharmacists receiving weekly AMH case studies, syllabus updates, and preparation tips directly in their inbox.</p>
            </div>
            <div className="w-full md:w-auto flex flex-col sm:flex-row gap-3">
              <input type="email" placeholder="Enter your email address" className="px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-400 min-w-[250px] text-slate-800" />
              <button className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-6 py-3 rounded-xl transition-colors whitespace-nowrap shadow-lg">
                Send Me Tips
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Exam Dates Section */}
      <section id="exam-dates" className="py-16 md:py-24 bg-white w-full border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800 mb-4">
              <span className="flex h-2 w-2 rounded-full bg-emerald-600 mr-2"></span>
              2026 Schedule
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Upcoming Exam Dates</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Register early to secure your preferred date and testing location. Slots fill up quickly.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* March Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 text-xl font-bold group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all">
                Mar
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">March 23–25</h3>
              <p className="text-slate-500 mb-4">Spring 2026 Session. Ideal for those who have completed their syllabus review.</p>
              <div className="mt-auto w-full border-t border-slate-100 pt-4 flex flex-col gap-2">
                <a
                  href="https://www.pharmacycouncil.org.au/pharmacist/exam-information/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Verify on APC website
                </a>
                <p className="text-[11px] text-slate-400">✓ Last verified: March 2026</p>
              </div>
            </div>

            {/* July Card */}
            <div className="bg-white rounded-3xl p-8 border border-emerald-200 shadow-xl relative transition-all duration-300 transform hover:-translate-y-2 group flex flex-col items-center text-center ring-2 ring-emerald-500 ring-offset-4 ring-offset-slate-50">
              <div className="absolute top-0 right-0 -mt-3 -mr-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-sm animate-pulse">
                Filling Fast
              </div>
              <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mb-6 text-xl font-bold group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                Jul
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">July 13–15</h3>
              <p className="text-slate-500 mb-4">Summer 2026 Session. The most popular testing window. High demand expected.</p>
              <div className="mt-auto w-full border-t border-slate-100 pt-4 flex flex-col gap-2">
                <a
                  href="https://www.pharmacycouncil.org.au/pharmacist/exam-information/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Verify on APC website
                </a>
                <p className="text-[11px] text-slate-400">✓ Last verified: March 2026</p>
              </div>
            </div>

            {/* November Card */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group flex flex-col items-center text-center">
              <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center mb-6 text-xl font-bold group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all">
                Nov
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-2">November 23–25</h3>
              <p className="text-slate-500 mb-4">Fall 2026 Session. Perfect target for candidates needing extra preparation time.</p>
              <div className="mt-auto w-full border-t border-slate-100 pt-4 flex flex-col gap-2">
                <a
                  href="https://www.pharmacycouncil.org.au/pharmacist/exam-information/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-purple-600 hover:text-purple-700 transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Verify on APC website
                </a>
                <p className="text-[11px] text-slate-400">✓ Last verified: March 2026</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Breakdown Section */}
      <section id="syllabus" className="py-16 md:py-24 bg-white w-full border-t border-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">Syllabus Breakdown</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">Master the key domains tested in the OPRA exam to ensure your success.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors">Pharmaceutical Chemistry</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Organic chemistry, stereochemistry, drug metabolism, analytical chemistry, and physical pharmacy principles.
              </p>
              <div className="mt-auto inline-block bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                ~30% of Exam Weight
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">Pharmaceutics & Therapeutics</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Formulation, biopharmaceutics, pharmacokinetics, and evidence-based clinical application of medicines.
              </p>
              <div className="mt-auto inline-block bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-sm font-semibold">
                ~40% of Exam Weight
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl border border-slate-100 transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-purple-600 group-hover:text-white transition-all duration-300">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-purple-600 transition-colors">Pharmacology & Physiology</h3>
              <p className="text-slate-600 leading-relaxed mb-4">
                Mechanism of action, adverse effects, body systems, pathology, and fundamental pharmacological concepts.
              </p>
              <div className="mt-auto inline-block bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">
                ~30% of Exam Weight
              </div>
            </div>
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
              <details key={index} className="group bg-slate-50 p-6 rounded-2xl border border-slate-200 cursor-pointer open:bg-white open:border-emerald-200 open:shadow-md transition-all">
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
            <Link href="/blog/opra-exam-preparation-guide-2026" className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="text-emerald-600 font-semibold text-sm mb-3">8 min read</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">OPRA Exam Preparation Guide 2026</h3>
              <p className="text-slate-600 line-clamp-3">The ultimate 2026 preparation guide for the Overseas Pharmacist Readiness Assessment...</p>
            </Link>
            <Link href="/blog/how-to-pass-opra-exam-first-try" className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="text-emerald-600 font-semibold text-sm mb-3">6 min read</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">How to Pass the OPRA Exam on Your First Try</h3>
              <p className="text-slate-600 line-clamp-3">Expert tips and actionable study strategies to help you pass the Australian OPRA exam...</p>
            </Link>
            <Link href="/blog/understanding-opra-exam-syllabus" className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 group">
              <div className="text-emerald-600 font-semibold text-sm mb-3">7 min read</div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-2">Understanding the OPRA Exam Syllabus</h3>
              <p className="text-slate-600 line-clamp-3">A deep dive into the official OPRA exam syllabus and the exact clinical domains tested...</p>
            </Link>
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
