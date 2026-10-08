"use client";

import React, { useState } from 'react';
import { COUNTRY_CODES } from '@/data/countryCodes';

export type LeadData = {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  educationQualification?: string;
  program?: string;
  source?: string;
  tag?: string;
  city?: string;
};

export type LeadFormProps = {
  title?: string;
  subtitle?: string;
  buttonText?: string;
  tag?: string;
  source?: string;
  onSuccess?: (data: LeadData) => void;
  className?: string;
  compact?: boolean;
};

const QUALIFICATION_OPTIONS = [
  "Bachelor of Pharmacy (B.Pharm)",
  "Master of Pharmacy (M.Pharm)",
  "Doctor of Pharmacy (Pharm.D)",
  "Diploma in Pharmacy (D.Pharm)",
  "Pharmacy",
  "Other Pharmacy / Medical Degree",
];

const PROGRAM_OPTIONS = [
  "OPRA for Australia",
  "KAPS for Australia",
  "SPLE for Saudi",
  "PEBC for Canada",
  "DHA / MOH / HAAD for UAE",
];

export default function LeadForm({
  title = "Book Your 1 : 1 Doubt Clearing Session",
  subtitle,
  buttonText = "BOOK NOW",
  tag = "opraexam",
  source = "OPRAExam",
  onSuccess,
  className = "",
  compact = false,
}: LeadFormProps) {
  const [formData, setFormData] = useState<LeadData>({
    name: '',
    email: '',
    phone: '',
    qualification: '',
    program: 'OPRA for Australia',
    source: source,
    tag: tag,
  });

  const [countryCode, setCountryCode] = useState('+91');
  const [customQualification, setCustomQualification] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (statusMessage) setStatusMessage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatusMessage(null);

    const finalQualification =
      formData.qualification === 'Other Pharmacy / Medical Degree' && customQualification.trim()
        ? customQualification.trim()
        : formData.qualification;

    if (!formData.name.trim()) {
      setStatusMessage({ type: 'error', text: 'Please fill in your name.' });
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid email address.' });
      return;
    }

    if (!formData.phone.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your phone number.' });
      return;
    }

    if (!finalQualification.trim()) {
      setStatusMessage({ type: 'error', text: 'Please select your qualification.' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Format phone with country code if not already included
      let formattedPhone = formData.phone.trim();
      if (!formattedPhone.startsWith('+')) {
        formattedPhone = `${countryCode} ${formattedPhone}`;
      }

      const submissionData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formattedPhone,
        qualification: 'Pharmacy',
        educationQualification: finalQualification,
        program: formData.program || 'OPRA for Australia',
        source: source || 'OPRAExam',
        tag: tag || 'opraexam',
      };

      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (!response.ok && !result.isDuplicate) {
        throw new Error(result.error || 'Failed to submit form. Please try again.');
      }

      setIsSubmitted(true);
      setStatusMessage({
        type: 'success',
        text: result.message || 'Thank you! Your session has been booked successfully.',
      });

      if (onSuccess) {
        onSuccess(submissionData);
      }
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : 'An unexpected error occurred. Please try again.';
      setStatusMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted && !compact) {
    return (
      <div className={`bg-white p-10 md:p-14 rounded-[2rem] shadow-2xl border border-slate-100 text-center transition-all animate-in fade-in zoom-in-95 duration-500 flex flex-col items-center justify-center min-h-[380px] ${className}`}>
        <h3 className="text-4xl sm:text-5xl font-extrabold text-[#00b090] mb-4 tracking-tight">
          Thank You!
        </h3>
        <p className="text-slate-600 font-bold text-base sm:text-lg">
          Our representative will contact you soon.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`bg-gradient-to-b from-[#02b38d] to-[#009b78] text-white p-6 sm:p-8 rounded-[2rem] shadow-2xl border border-white/20 relative overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="text-center mb-6 relative z-10">
        <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
          {title}
        </h3>
        {subtitle && (
          <p className="text-white/80 text-sm mt-2 leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>

      {statusMessage && (
        <div
          className={`mb-5 p-3.5 rounded-xl text-sm font-semibold flex items-start gap-2.5 ${
            statusMessage.type === 'error'
              ? 'bg-rose-950/80 border border-rose-300 text-rose-200'
              : 'bg-black/30 border border-white/40 text-white'
          }`}
        >
          {statusMessage.type === 'error' ? (
            <svg className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg className="w-5 h-5 text-emerald-300 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
        {/* NAME Input */}
        <div>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="NAME"
            disabled={isSubmitting}
            className="w-full px-5 py-3.5 sm:py-4 rounded-2xl border-2 border-white/90 bg-transparent text-white placeholder:text-white/85 placeholder:font-bold placeholder:text-sm sm:placeholder:text-base placeholder:tracking-wider placeholder:uppercase outline-none font-medium focus:bg-black/10 focus:border-white focus:ring-2 focus:ring-white/30 transition-all"
          />
        </div>

        {/* EMAIL Input */}
        <div>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            placeholder="EMAIL"
            disabled={isSubmitting}
            className="w-full px-5 py-3.5 sm:py-4 rounded-2xl border-2 border-white/90 bg-transparent text-white placeholder:text-white/85 placeholder:font-bold placeholder:text-sm sm:placeholder:text-base placeholder:tracking-wider placeholder:uppercase outline-none font-medium focus:bg-black/10 focus:border-white focus:ring-2 focus:ring-white/30 transition-all"
          />
        </div>

        {/* PHONE Input with Country Code Selector */}
        <div>
          <div className="flex items-center rounded-2xl border-2 border-white/90 bg-transparent overflow-hidden focus-within:bg-black/10 focus-within:border-white focus-within:ring-2 focus-within:ring-white/30 transition-all">
            <div className="relative border-r-2 border-white/40 flex items-center justify-center px-3 py-3.5 sm:py-4 bg-white/10 shrink-0 w-20 sm:w-24 cursor-pointer hover:bg-white/15 transition-colors">
              <span className="text-white font-bold text-sm sm:text-base mr-1 pointer-events-none select-none">
                {countryCode}
              </span>
              <svg className="w-3.5 h-3.5 text-white shrink-0 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
              </svg>
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                disabled={isSubmitting}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                aria-label="Select Country Code"
              >
                {COUNTRY_CODES.map((item, idx) => (
                  <option key={`${item.code}-${item.name}-${idx}`} value={item.code} className="text-slate-900 font-medium">
                    {item.code} ({item.name})
                  </option>
                ))}
              </select>
            </div>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              value={formData.phone}
              onChange={handleChange}
              placeholder="PHONE"
              disabled={isSubmitting}
              className="w-full px-4 sm:px-5 py-3.5 sm:py-4 bg-transparent text-white placeholder:text-white/85 placeholder:font-bold placeholder:text-sm sm:placeholder:text-base placeholder:tracking-wider placeholder:uppercase outline-none font-medium"
            />
          </div>
        </div>

        {/* QUALIFICATION Dropdown */}
        <div className="relative">
          <select
            id="qualification"
            name="qualification"
            required
            value={formData.qualification}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-5 py-3.5 sm:py-4 rounded-2xl border-2 border-white/90 bg-transparent text-white font-bold text-sm sm:text-base outline-none appearance-none cursor-pointer focus:bg-black/10 focus:border-white focus:ring-2 focus:ring-white/30 transition-all"
          >
            <option value="" disabled className="text-slate-900 font-bold">
              Pharmacy / Qualification
            </option>
            {QUALIFICATION_OPTIONS.map((opt) => (
              <option key={opt} value={opt} className="text-slate-900 font-medium">
                {opt}
              </option>
            ))}
          </select>
          <svg className="w-4 h-4 text-white absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {formData.qualification === 'Other Pharmacy / Medical Degree' && (
          <input
            type="text"
            placeholder="SPECIFY DEGREE"
            value={customQualification}
            onChange={(e) => setCustomQualification(e.target.value)}
            className="w-full px-5 py-3 rounded-2xl border-2 border-white/90 bg-transparent text-white placeholder:text-white/80 placeholder:font-bold placeholder:text-sm placeholder:tracking-wider placeholder:uppercase outline-none font-medium focus:bg-black/10 transition-all"
          />
        )}

        {/* PROGRAM / TARGET EXAM Dropdown */}
        <div className="relative">
          <select
            id="program"
            name="program"
            value={formData.program}
            onChange={handleChange}
            disabled={isSubmitting}
            className="w-full px-5 py-3.5 sm:py-4 rounded-2xl border-2 border-white/90 bg-transparent text-white font-bold text-sm sm:text-base outline-none appearance-none cursor-pointer focus:bg-black/10 focus:border-white focus:ring-2 focus:ring-white/30 transition-all"
          >
            {PROGRAM_OPTIONS.map((prog) => (
              <option key={prog} value={prog} className="text-slate-900 font-medium">
                {prog}
              </option>
            ))}
          </select>
          <svg className="w-4 h-4 text-white absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* SUBMIT Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mt-3 bg-[#081125] hover:bg-[#050b18] text-[#00e3a5] hover:text-[#25f4bd] font-extrabold py-4 px-6 rounded-2xl transition-all shadow-xl hover:shadow-2xl active:scale-[0.99] disabled:opacity-75 disabled:cursor-not-allowed flex justify-center items-center text-center tracking-widest text-base sm:text-lg uppercase cursor-pointer border border-white/10"
        >
          {isSubmitting ? (
            <span className="flex items-center gap-2 text-white">
              <svg className="animate-spin h-5 w-5 text-[#00e3a5]" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span className="text-sm font-bold tracking-normal">BOOKING SESSION...</span>
            </span>
          ) : (
            <span>{buttonText}</span>
          )}
        </button>
      </form>
    </div>
  );
}
