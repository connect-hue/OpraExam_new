import Link from 'next/link';
import { getPublishedBlogSummaries } from '@/lib/db/blogs';

const subjectSlugs = ['opra-biomedical-sciences-syllabus-mcqs-2027', 'opra-pharmacology-toxicology-2027', 'opra-therapeutics-patient-care-2027', 'opra-exam-calculations-formulas-practice-questions'];

export default async function SubjectResources() {
  const posts = await getPublishedBlogSummaries();
  const guides = posts.filter(post => subjectSlugs.includes(post.slug));
  return <section className="bg-white border border-emerald-100 rounded-2xl p-6 my-10">
    <h2 className="text-2xl font-bold mb-4">Subject guides and practice resources</h2>
    <ul className="grid sm:grid-cols-2 gap-4">{guides.map(guide => <li key={guide.slug}><Link href={`/blog/${guide.slug}`} className="text-emerald-700 underline">{guide.title}</Link></li>)}<li><Link href="/practice" className="text-emerald-700 underline">20 practice questions with explanations</Link></li><li><Link href="/fees" className="text-emerald-700 underline">Exam and assessment fees</Link></li></ul>
  </section>;
}
