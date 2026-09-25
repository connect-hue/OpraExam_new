import Link from "next/link";

export default function InlineCTA() {
  return (
    <div className="my-10 bg-emerald-50 border-l-4 border-emerald-500 p-8 rounded-r-2xl shadow-sm not-prose relative overflow-hidden">
      <div className="absolute right-0 top-0 -mr-16 -mt-16 w-48 h-48 bg-emerald-100 rounded-full blur-2xl opacity-50 pointer-events-none"></div>
      <h3 className="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Are you ready for the OPRA Exam?</h3>
      <p className="text-slate-600 mb-6 text-lg leading-relaxed">
        Test your knowledge with our free 5-question diagnostic quiz tailored to mirror the actual exam format and domains.
      </p>
      <Link href="/opra-quiz" className="inline-flex items-center bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-8 rounded-full shadow-md hover:shadow-lg transform hover:-translate-y-0.5 transition-all">
        Take the Free OPRA Readiness Quiz
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </Link>
    </div>
  );
}
