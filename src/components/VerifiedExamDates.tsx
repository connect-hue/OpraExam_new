// VerifiedExamDates.tsx
// Drop this component wherever exam dates are displayed on the site.
// CRITICAL: every date card must have an APC verify link
// and a Last Verified timestamp to protect candidates from acting on stale dates.

import React from "react";

export type ExamSession = {
    session: string;          // e.g. "November 2026"
    year: number;             // 2026 | 2027
    registrationOpen: string; // e.g. "18 August 2026"
    registrationClose: string;// e.g. "19 October 2026"
    examDate: string;         // e.g. "23–25 November 2026"
    resultsDate: string;      // e.g. "22 December 2026"
    status: "open" | "upcoming" | "closed";
    lastVerified: string;     // ISO date string e.g. "2026-10-14"
};

export const examSessions: ExamSession[] = [
    {
        session: "November 2026",
        year: 2026,
        registrationOpen: "18 August 2026",
        registrationClose: "19 October 2026",
        examDate: "23–25 November 2026",
        resultsDate: "22 December 2026",
        status: "open",
        lastVerified: "2026-10-14",
    },
    {
        session: "March 2027",
        year: 2027,
        registrationOpen: "19 January 2027",
        registrationClose: "22 February 2027",
        examDate: "22–24 March 2027",
        resultsDate: "6 May 2027",
        status: "upcoming",
        lastVerified: "2026-10-14",
    },
    {
        session: "July 2027",
        year: 2027,
        registrationOpen: "11 May 2027",
        registrationClose: "28 June 2027",
        examDate: "26–28 July 2027",
        resultsDate: "9 September 2027",
        status: "upcoming",
        lastVerified: "2026-10-14",
    },
    {
        session: "November 2027",
        year: 2027,
        registrationOpen: "14 September 2027",
        registrationClose: "11 October 2027",
        examDate: "8–10 November 2027",
        resultsDate: "23 December 2027",
        status: "upcoming",
        lastVerified: "2026-10-14",
    },
];

export const APC_URL = "https://www.pharmacycouncil.org.au/candidates/opra/";

const statusConfig = {
    open: {
        label: "Registration Open",
        dot: "bg-emerald-500",
        badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
        border: "border-emerald-400",
        ring: "ring-emerald-100",
    },
    upcoming: {
        label: "Upcoming Session",
        dot: "bg-amber-500",
        badge: "bg-amber-100 text-amber-700 border-amber-200",
        border: "border-slate-200",
        ring: "ring-slate-50",
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

function renderSessionCard(session: ExamSession) {
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
}

export default function VerifiedExamDates() {
    const sessions2026 = examSessions.filter(s => s.year === 2026);
    const sessions2027 = examSessions.filter(s => s.year === 2027);

    return (
        <section id="exam-dates" className="py-16 px-4 bg-slate-50 scroll-mt-20">
            <div className="container mx-auto max-w-5xl">

                {/* Section Header */}
                <div className="mb-10">
                    <h2 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">
                        OPRA Exam Dates (2026–2027)
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
                        Exam dates and seats can fill quickly. Missing a registration window can delay your Australian licensing journey by 4 to 6 months.
                        Always verify on the{" "}
                        <a
                            href={APC_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-semibold underline hover:text-amber-900"
                        >
                            official APC website
                        </a>{" "}
                        before taking action.
                    </div>
                </div>

                {/* 2026 Sessions */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                        <h3 className="text-2xl font-bold text-slate-900">OPRA Exam Dates 2026</h3>
                        <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded-full border border-emerald-200">
                            Current Session
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sessions2026.map(renderSessionCard)}
                    </div>
                </div>

                {/* 2027 Sessions */}
                <div className="mb-10">
                    <div className="flex items-center gap-3 mb-6">
                        <h3 className="text-2xl font-bold text-slate-900">OPRA Exam Dates 2027</h3>
                        <span className="bg-slate-100 text-slate-700 text-xs font-bold px-3 py-1 rounded-full border border-slate-200">
                            Upcoming Year
                        </span>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {sessions2027.map(renderSessionCard)}
                    </div>
                </div>

                {/* Fee Reference */}
                <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
                    <div className="text-sm text-slate-600">
                        <span className="font-extrabold text-slate-900 text-base block sm:inline mr-2">OPRA Exam Fee:</span>
                        <strong className="text-emerald-700 text-base font-bold">AUD $2,245</strong> per attempt.
                        <span className="text-slate-500 block sm:inline sm:ml-2">
                            (Eligibility & Document Evaluation fees charged separately by APC).
                        </span>
                    </div>
                    <a
                        href="https://www.pharmacycouncil.org.au/candidates/fees/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-sm font-bold text-emerald-600 hover:text-emerald-700 hover:underline shrink-0"
                    >
                        Verify official APC fees →
                    </a>
                </div>

            </div>
        </section>
    );
}
