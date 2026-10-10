"use client";

import { FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Footer: FC = () => {
  const pathname = usePathname();

  // Hide public footer on admin pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }
  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <span className="text-2xl font-bold text-white tracking-tight block mb-4">
              OPRA<span className="text-emerald-400">Exam</span>
            </span>
            <p className="text-slate-400 text-sm max-w-xs">
              Built by pharmacists who passed OPRA. Your ultimate guide for the Overseas
              Pharmacist Readiness Assessment in Australia.
            </p>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Quick Links</h3>
            <ul className="space-y-3 text-sm">
              <li><Link href="/" className="hover:text-emerald-400 transition-colors">Home</Link></li>
              <li><Link href="/sample-papers" className="hover:text-emerald-400 transition-colors">Sample Papers</Link></li>
              <li><Link href="/#enquiry" className="hover:text-emerald-400 transition-colors">Get Study Pack</Link></li>
              <li><Link href="/#syllabus" className="hover:text-emerald-400 transition-colors">Syllabus</Link></li>
              <li><Link href="/#exam-dates" className="hover:text-emerald-400 transition-colors">Exam Dates</Link></li>
              <li><Link href="/opra-quiz" className="hover:text-emerald-400 transition-colors">Free Quiz</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Contact & Info</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>Support: contact@opraexam.in</li>
              <li>
                <Link href="/about" className="hover:text-emerald-400 transition-colors">
                  About the Authors
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-emerald-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-800 mt-12 pt-8 text-sm text-center text-slate-500 flex flex-col md:flex-row justify-between items-center gap-2">
          <p>&copy; {new Date().getFullYear()} OPRA Exam Guide. All rights reserved.</p>
          <p>Not affiliated with the Australian Pharmacy Council.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
