"use client";

import React, { useState } from 'react';
import LeadForm from '@/components/LeadForm';
import Link from 'next/link';

export default function SamplePapersPage() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleLeadSuccess = (data: { name: string; email: string; phone: string }) => {
    // In a real application, we would send this data to a backend or CRM here.
    console.log("Lead captured:", data);
    setIsUnlocked(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-xl group-hover:bg-emerald-700 transition-colors">
              OP
            </div>
            <span className="font-extrabold text-xl text-slate-800 tracking-tight">OPRA Exam</span>
          </Link>
          <Link href="/" className="text-slate-500 hover:text-emerald-600 font-medium transition-colors">
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-16 flex flex-col items-center">
        <div className="max-w-3xl w-full text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Exclusive <span className="text-emerald-600">Sample Papers</span>
          </h1>
          <p className="text-xl text-slate-600 leading-relaxed">
            Get a feel for the real OPRA Exam with our curated collection of sample questions, structured exactly like the actual assessment.
          </p>
        </div>

        <div className="w-full max-w-4xl flex justify-center">
          {!isUnlocked ? (
            <div className="w-full max-w-md relative z-10 transition-all duration-500">
              <LeadForm onSuccess={handleLeadSuccess} />
            </div>
          ) : (
            <div className="w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-emerald-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
              <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-slate-900">Successfully Unlocked</h3>
                  <p className="text-emerald-600 font-medium">Your sample papers are ready to download.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <a 
                  href="/sample-papers/opra-sample-paper-1.pdf" 
                  download
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                >
                  <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl group-hover:bg-emerald-100 group-hover:text-emerald-600 flex items-center justify-center flex-shrink-0 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 mb-1">Official Sample Paper 1</h4>
                    <p className="text-sm text-slate-500 line-clamp-2">Complete set of 120 multiple-choice questions covering all core domains.</p>
                  </div>
                </a>

                <a 
                  href="/sample-papers/opra-sample-paper-2.pdf" 
                  download
                  className="group flex items-start gap-4 p-5 rounded-2xl border border-slate-200 hover:border-emerald-500 hover:bg-emerald-50 transition-all"
                >
                  <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl group-hover:bg-emerald-100 group-hover:text-emerald-600 flex items-center justify-center flex-shrink-0 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 mb-1">Mock Assessment 2026</h4>
                    <p className="text-sm text-slate-500 line-clamp-2">Practice questions focused heavily on Pharmaceutics and Therapeutics.</p>
                  </div>
                </a>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
