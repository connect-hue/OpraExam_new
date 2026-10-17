"use client";

import React, { useState } from 'react';
import LeadForm, { LeadData } from '@/components/LeadForm';

export default function SamplePaperGate() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  const handleLeadSuccess = (data: LeadData) => {
    console.log("Lead captured and unlocked sample papers:", data);
    setIsUnlocked(true);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex justify-center">
      {!isUnlocked ? (
        <div className="w-full max-w-md relative z-10 transition-all duration-500">
          <div className="mb-4 text-center">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 mb-2">
              Practice Papers PDF Access
            </span>
            <h3 className="text-xl font-bold text-slate-900">Download OPRA Practice Papers PDF</h3>
            <p className="text-sm text-slate-500 mt-1">Enter your details to receive immediate download access to OPRA-style practice mock papers with answers.</p>
          </div>
          <LeadForm
            title="Download OPRA Practice Papers PDF"
            buttonText="GET PRACTICE PAPERS PDF"
            subtitle="Enter your details below to unlock instant PDF access."
            tag="sample-papers-pdf"
            source="SamplePapersPage"
            onSuccess={handleLeadSuccess}
          />
        </div>
      ) : (
        <div className="w-full bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-emerald-100 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center gap-4 mb-8 pb-6 border-b border-slate-100">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-slate-900">Successfully Unlocked</h3>
              <p className="text-emerald-600 font-medium">Your 2026 OPRA sample papers are ready for immediate download.</p>
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
                <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 mb-1">Official Mock Paper 1</h4>
                <p className="text-sm text-slate-500 line-clamp-2">Complete 120-question exam covering Biomedical, Pharmaceutical and Clinical Sciences.</p>
                <span className="inline-block mt-2 text-xs font-semibold text-emerald-600 group-hover:underline">Download PDF &darr;</span>
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
                <h4 className="font-bold text-slate-800 group-hover:text-emerald-700 mb-1">Clinical Mock Paper 2</h4>
                <p className="text-sm text-slate-500 line-clamp-2">Advanced calculation set with AMH-guided patient case vignettes and explanations.</p>
                <span className="inline-block mt-2 text-xs font-semibold text-emerald-600 group-hover:underline">Download PDF &darr;</span>
              </div>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
