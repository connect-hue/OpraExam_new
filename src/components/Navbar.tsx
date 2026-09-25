"use client";

import Link from "next/link";
import { FC, useState } from "react";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-white/80 backdrop-blur-md shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-emerald-700 tracking-tight" onClick={() => setIsOpen(false)}>
              OPRA<span className="text-slate-800">Exam</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link href="/" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/#syllabus" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">
              Syllabus
            </Link>
            <Link href="/#exam-dates" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">
              Exam Dates
            </Link>
            <Link href="/blog" className="text-slate-600 hover:text-emerald-600 font-medium transition-colors">
              Blog
            </Link>
            {/* Pro Mock Test — monetisation CTA */}
            <a
              href="https://gumroad.com/l/opra-pro-mock-test-pack"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-700 hover:text-emerald-600 font-semibold transition-colors flex items-center gap-1"
            >
              <span className="text-xs bg-emerald-100 text-emerald-700 rounded-full px-2 py-0.5 font-bold uppercase tracking-wide">Pro</span>
              Mock Tests
            </a>
          </nav>

          <div className="hidden md:flex items-center">
            <Link
              href="/opra-quiz"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-full font-medium transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              Free OPRA Quiz
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-slate-600 hover:text-emerald-600 focus:outline-none p-2"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-emerald-50 absolute w-full shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2">
            <Link href="/" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50">
              Home
            </Link>
            <Link href="/#syllabus" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50">
              Syllabus
            </Link>
            <Link href="/#exam-dates" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50">
              Exam Dates
            </Link>
            <Link href="/blog" onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium text-slate-700 hover:text-emerald-600 hover:bg-emerald-50">
              Blog
            </Link>
            <a
              href="https://gumroad.com/l/opra-pro-mock-test-pack"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 rounded-md text-base font-semibold text-emerald-700 hover:bg-emerald-50"
            >
              🏆 Pro Mock Test Pack
            </a>
            <Link href="/opra-quiz" onClick={() => setIsOpen(false)} className="block px-3 py-3 mt-4 text-center rounded-md font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm">
              Free OPRA Quiz
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
