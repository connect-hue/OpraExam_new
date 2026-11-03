import Link from 'next/link';
import { practiceQuestions } from '@/data/practiceQuestions';
import { pageMetadata } from '@/lib/seo/metadata';
import { sanitizeRichText } from '@/lib/content/html';

export const metadata = pageMetadata('OPRA Practice Questions: 20 MCQs, Answers & Explanations', 'Practise 20 independent pharmacy MCQs with answers and explanations, covering pharmacology, pharmaceutics and medicinal chemistry topics.', '/practice');

export default function PracticePage() {
  return <article className="container mx-auto max-w-4xl px-5 py-14">
    <h1 className="text-3xl sm:text-5xl font-bold text-slate-900 mb-6">OPRA practice questions with answers and explanations</h1>
    <p className="text-lg text-slate-600 mb-5">Use these 20 independent practice questions to identify topics for revision. They are learning exercises, not official APC questions or a prediction of your examination result.</p>
    <nav aria-label="Practice resources" className="flex flex-wrap gap-5 mb-10"><Link href="/opra-quiz" className="text-emerald-700 underline">Take the interactive quiz</Link><Link href="/syllabus" className="text-emerald-700 underline">Review the official content areas</Link><Link href="/sample-papers#download-pack" className="text-emerald-700 underline">Download practice papers</Link></nav>
    <div className="space-y-7">{practiceQuestions.map((question, index) => <section key={question.id} className="bg-white border border-slate-200 rounded-2xl p-6" id={`question-${question.id}`}>
      <p className="text-sm text-emerald-700 font-medium mb-2">{question.domain}</p>
      <h2 className="text-xl font-semibold mb-4">{index + 1}. {question.question}</h2>
      <ol className="list-[upper-alpha] pl-6 space-y-2 text-slate-700">{question.options.map(option => <li key={option}>{option}</li>)}</ol>
      <details className="mt-5 border-t border-slate-100 pt-4"><summary className="cursor-pointer font-semibold text-emerald-700">Answer and explanation</summary><p className="font-medium mt-4">Answer: {String.fromCharCode(65 + question.answer)}. {question.options[question.answer]}</p><div className="mt-3 text-slate-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeRichText(question.explanation) }} /></details>
    </section>)}</div>
    <p className="mt-10 text-sm text-slate-500">Educational content; clinical decisions require appropriate professional guidance. <Link href="/editorial-policy" className="underline">Read our editorial policy</Link>.</p>
  </article>;
}
