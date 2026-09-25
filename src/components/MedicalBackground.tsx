"use client";

import React, { useEffect, useState } from 'react';

export default function MedicalBackground() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-[0.04]">
      {/* Abstract Grid/Pattern to feel clinical and precise */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      
      {/* 
        We use sleek, realistic SVG paths with low opacity so it feels professional, not cartoonish.
        Animations are extremely slow and subtle.
      */}

      {/* Syringe - Minimalist & Sleek */}
      <div className="absolute top-[10%] left-[15%] text-slate-900 animate-drift-1">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="0.8" stroke="currentColor" className="w-48 h-48 transform -rotate-45">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2v3m-3 0h6m-1.5 0v3A3 3 0 0115 11v6a2 2 0 01-2 2H11a2 2 0 01-2-2v-6a3 3 0 011.5-3V5M6 14h12m-6 5v3" />
        </svg>
      </div>

      {/* Stethoscope - Clinical & Professional */}
      <div className="absolute top-[40%] right-[10%] text-slate-900 animate-drift-2">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="0.8" stroke="currentColor" className="w-64 h-64 transform rotate-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0V8a2 2 0 012-2h1m10 0h1a2 2 0 012 2v4m-5 9a2 2 0 11-4 0m1.5-6h1" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 15a3 3 0 100 6 3 3 0 000-6z" />
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 12v3a3 3 0 01-6 0v-3" />
        </svg>
      </div>

      {/* Ambulance - Outline/Vector style for a modern look */}
      <div className="absolute bottom-[20%] left-[10%] text-slate-900 animate-drift-3">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="0.8" stroke="currentColor" className="w-56 h-56 transform -rotate-12">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13h1m3 0a2 2 0 100 4 2 2 0 000-4zM20 13h1m-3 0a2 2 0 100 4 2 2 0 000-4zM5 13H4a1 1 0 01-1-1v-2a1 1 0 011-1h10M15 9h2l2 2v2h2m-6-4H5m10 4M3 6h14a2 2 0 012 2v4H3V6zm8 7v-4m-2 2h4" />
        </svg>
      </div>

      {/* ECG / Heart Beat Tracker */}
      <div className="absolute top-[20%] right-[25%] text-slate-900 animate-drift-4">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="0.8" stroke="currentColor" className="w-40 h-40">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h4l3-8 4 16 3-8h4" />
        </svg>
      </div>

      {/* Medical Cross / Shield */}
      <div className="absolute bottom-[35%] right-[30%] text-slate-900 animate-drift-5">
        <svg fill="none" viewBox="0 0 24 24" strokeWidth="0.8" stroke="currentColor" className="w-40 h-40 transform rotate-45">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      </div>
    </div>
  );
}
