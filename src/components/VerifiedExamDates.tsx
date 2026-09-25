// VerifiedExamDates.tsx
// Drop this component wherever exam dates are displayed on the site.
// CRITICAL (per improvement report): every date card must have an APC verify link
// and a Last Verified timestamp to protect candidates from acting on stale dates.

import React from "react";

type ExamSession = {
    session: string;          // e.g. "March 2026"
    registrationOpen: string; // e.g. "1 November 2025"
    registrationClose: string;// e.g. "31 January 2026"
    examDate: string;         // e.g. "16–20 March 2026"
    resultsDate: string;      // e.g. "Mid April 2026"
    status: "open" | "upcoming" | "closed";
    lastVerified: string;     // ISO date string e.g. "2026-03-20"
};

const examSessions: ExamSession[] = [
    {
        session: "March 2026",
        registrationOpen: "1 November 2025",
        registrationClose: "31 January 2026",
        examDate: "16–20 March 2026",
        resultsDate: "Mid April 2026",
        status: "closed",
        lastVerified: "2026-03-20",
    },
    {
        session: "July 2026",
        registrationOpen: "1 March 2026",
        registrationClose: "31 May 2026",
        examDate: "13–17 July 2026",
        resultsDate: "Mid August 2026",
        status: "open",
        lastVerified: "2026-03-20",
    },
    {
        session: "November 2026",
        registrationOpen: "1 July 2026",
        registrationClose: "30 September 2026",
        examDate: "9–13 November 2026",
        resultsDate: "Mid December 2026",
        status: "upcoming",
        lastVerified: "2026-03-20",
    },
];

const APC_URL = "https://www.pharmacycouncil.org.au/candidates/opra/";

const statusConfig = {
    open: {
        label: "Registration Open",
        dot: "bg-emerald-500",
        badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
        border: "border-emerald-400",
        ring: "ring-emerald-100",
    },
    upcoming: {
        label: "Registration Not Yet Open",
        dot: "bg-amber-500",
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        border: "border-amber-300",
        ring: "ring-amber-50",
    },
    closed: {
        label: "Registration Closed",
        dot: "bg-slate-400",
        badge: "bg-slate-100 text-slate-500 border-slate-200",
        border: "border-slate-200",
        ring: "ring-slate-50",
    },
};

function formatVerifiedDate(iso: string): string {
    const d = new Date(iso);
    return d.toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

export default function VerifiedExamDates() {
    return (
        <section id="exam-dates" className="py-16 px-4 bg-slate-50 scroll-mt-20">
            <div className="container mx-auto max-w-5xl">

                {/* Section Header */}
                <div className="mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                        OPRA Exam Dates 2026
                    </h2>
                    <p className="text-slate-500 text-sm">
                        All dates are verified directly against the{" "}
                        <a
                            href={APC_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 font-semibold hover:underline"
                        >
                            Australian Pharmacy Council (APC) website
                        </a>
                        . Always confirm before registering.
                    </p>
                </div>

                {/* ⚠️ Critical Warning Banner */}
                <div className="mb-8 flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-2xl p-5">
                    <span className="text-amber-500 text-xl flex-shrink-0">⚠️</span>
                    <div className="text-sm text-amber-800">
                        <span className="font-bold">Important: </span>
                        Exam dates can change without notice. Missing a registration window costs
                        AUD $1,310+ in forfeited Document Evaluation fees and a 6-month delay.
                        Always verify on the{" "}
                        <a
                            href={APC_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold underline hover:text-amber-900"
                        >
                            official APC website
                        </a>{" "}
                        before taking any action.
                    </div>
                </div>

                {/* Exam Date Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {examSessions.map((session) => {
                        const s = statusConfig[session.status];
                        return (
                            <div
                                key={session.session}
                                className={`bg-white rounded-3xl border-2 ${s.border} ring-4 ${s.ring} shadow-sm p-6 flex flex-col`}
                            >
                                {/* Status Badge */}
                                <div className="flex items-center justify-between mb-5">
                                    <span className="text-lg font-extrabold text-slate-900">{session.session}</span>
                                    <span className={`flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full border ${s.badge}`}>
                                        <span className={`w-1.5 h-1.5 rounded-full ${s.dot} inline-block`} />
                                        {s.label}
                                    </span>
                                </div>

                                {/* Date Details */}
                                <div className="space-y-3 flex-1 mb-5">
                                    {[
                                        { label: "Registration Opens", value: session.registrationOpen },
                                        { label: "Registration Closes", value: session.registrationClose },
                                        { label: "Exam Window", value: session.examDate },
                                        { label: "Results Expected", value: session.resultsDate },
                                    ].map((row, i) => (
                                        <div key={i} className="flex justify-between items-start gap-2 text-sm">
                                            <span className="text-slate-500 font-medium shrink-0">{row.label}</span>
                                            <span className="text-slate-800 font-semibold text-right">{row.value}</span>
                                        </div>
                                    ))}
                                </div>

                                {/* Last Verified + APC Link */}
                                <div className="border-t border-slate-100 pt-4 space-y-2">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span>
                                            Last verified:{" "}
                                            <span className="text-slate-600 font-medium">
                                                {formatVerifiedDate(session.lastVerified)}
                                            </span>
                                        </span>
                                    </div>
                                    <a
                                        href={APC_URL}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 hover:text-emerald-700 transition-colors"
                                    >
                                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                        </svg>
                                        Verify on APC website
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Fee Reference */}
                <div className="bg-white rounded-2xl border border-slate-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1 text-sm text-slate-600">
                        <span className="font-bold text-slate-800">Current OPRA fees (APC 2026):</span>{" "}
                        Exam — AUD $2,230 per attempt &nbsp;|&nbsp; Document Evaluation — approx. AUD $1,310.{" "}
                        <a
                            href="https://www.pharmacycouncil.org.au/candidates/fees/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-emerald-600 font-semibold hover:underline"
                        >
                            Verify current fees on APC →
                        </a>
                    </div>
                </div>

            </div>
        </section>
    );
}
