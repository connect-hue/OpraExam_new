"use client";

import Link from "next/link";
import { FC, useState } from "react";
import { usePathname } from "next/navigation";

const Navbar: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Hide public navbar on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  const isHome = pathname === "/";
  const isSyllabus = pathname === "/syllabus";
  const isExamDates = pathname === "/exam-dates";
  const isBlog = pathname === "/blog" || pathname?.startsWith("/blog/");

  return (
    <header className="sticky top-0 z-50 w-full border-b border-emerald-100 bg-white/90 backdrop-blur-md shadow-xs">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-emerald-700 tracking-tight" onClick={() => setIsOpen(false)}>
              OPRA<span className="text-slate-800"> Exam</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6 items-center">
            <Link
              href="/"
              className={`font-medium transition-colors ${
                isHome ? "text-emerald-600 font-semibold" : "text-slate-600 hover:text-emerald-600"
              }`}
            >
              Home
            </Link>
            <Link
              href="/syllabus"
              className={`font-medium transition-colors ${
                isSyllabus ? "text-emerald-600 font-semibold" : "text-slate-600 hover:text-emerald-600"
              }`}
            >
              Syllabus
            </Link>
            <Link
              href="/exam-dates"
              className={`font-medium transition-colors ${
                isExamDates ? "text-emerald-600 font-semibold" : "text-slate-600 hover:text-emerald-600"
              }`}
            >
              Exam Dates
            </Link>
            <Link
              href="/blog"
              className={`font-medium transition-colors ${
                isBlog ? "text-emerald-600 font-semibold" : "text-slate-600 hover:text-emerald-600"
              }`}
            >
              Blog
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-3">
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
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-3 rounded-md text-base font-medium ${
                isHome ? "text-emerald-600 bg-emerald-50 font-bold" : "text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              Home
            </Link>
            <Link
              href="/syllabus"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-3 rounded-md text-base font-medium ${
                isSyllabus ? "text-emerald-600 bg-emerald-50 font-bold" : "text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              Syllabus
            </Link>
            <Link
              href="/exam-dates"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-3 rounded-md text-base font-medium ${
                isExamDates ? "text-emerald-600 bg-emerald-50 font-bold" : "text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              Exam Dates
            </Link>
            <Link
              href="/blog"
              onClick={() => setIsOpen(false)}
              className={`block px-3 py-3 rounded-md text-base font-medium ${
                isBlog ? "text-emerald-600 bg-emerald-50 font-bold" : "text-slate-700 hover:text-emerald-600 hover:bg-emerald-50"
              }`}
            >
              Blog
            </Link>
            <Link
              href="/opra-quiz"
              onClick={() => setIsOpen(false)}
              className="block px-3 py-3 mt-4 text-center rounded-md font-medium bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm"
            >
              Free OPRA Quiz
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
