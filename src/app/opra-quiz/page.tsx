import type { Metadata } from "next";
import QuizApp from "@/components/QuizApp";

export const metadata: Metadata = {
  title: "OPRA Readiness Quiz | Free Diagnostic Test",
  description: "Test your pharmacy knowledge with our free 5-question diagnostic quiz tailored for the Australia OPRA exam syllabus. Find out if you are ready.",
};

export default function QuizPage() {
  return (
    <div className="min-h-screen bg-slate-50 w-full py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">OPRA Readiness Quiz</h1>
        <p className="text-lg text-slate-600">Take our quick diagnostic test to evaluate your current understanding of the core clinical syllabus.</p>
      </div>
      
      <QuizApp />
    </div>
  );
}
