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

          <div className="flex flex-col items-center justify-center text-center p-8 rounded-2xl border border-emerald-100 bg-emerald-50/40">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-4 shadow-sm">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h4 className="text-xl font-bold text-slate-900 mb-2">OPRA Practice Mock Paper</h4>
            <p className="text-sm text-slate-600 max-w-md mb-6 leading-relaxed">
              Complete 120-question practice mock paper covering Biomedical, Pharmaceutical, and Clinical Sciences with detailed answers and clinical rationales.
            </p>
            <a
              href="https://pharmlly.com/api/documents/6ad06c346756a46507b7d358/url"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-base px-8 py-4 rounded-full shadow-lg hover:shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Download OPRA Sample Paper PDF</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
