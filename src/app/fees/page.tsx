import Link from 'next/link';
import { assessmentFees, feesSource, feesVerifiedAt } from '@/data/fees';
import { displayDate } from '@/lib/content/dates';
import { pageMetadata } from '@/lib/seo/metadata';
import { absoluteUrl } from '@/lib/site';
import { serializeJsonLd } from '@/lib/seo/structuredData';

export const metadata = pageMetadata('OPRA Exam Fees: Exam, Eligibility & Assessment Costs', 'Understand the APC OPRA exam fee, Eligibility Check fee, Skills Assessment Outcome charge and other costs to budget for.', '/fees');

export default function FeesPage() {
  return <article className="container mx-auto max-w-4xl px-5 py-14 space-y-8 text-slate-700 leading-relaxed">
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') }, { '@type': 'ListItem', position: 2, name: 'OPRA fees', item: absoluteUrl('/fees') }] }) }} />
    <h1 className="text-3xl sm:text-5xl font-bold text-slate-900">OPRA exam fees and assessment costs</h1>
    <p className="text-lg">The APC OPRA examination fee is <strong>AUD $2,245 per attempt</strong>. The Eligibility Check and Skills Assessment Outcome are separate charges. All amounts below are in Australian dollars.</p>
    <p className="text-sm">Last checked: <time dateTime={feesVerifiedAt}>{displayDate(feesVerifiedAt)}</time>. <a href={feesSource} className="text-emerald-700 underline">Verify the current APC fee schedule</a>.</p>
    <section><h2 className="text-2xl font-bold text-slate-900 mb-4">Published APC charges</h2><div className="overflow-x-auto"><table className="w-full table-fixed text-left text-sm sm:text-base bg-white border border-slate-200"><thead><tr><th className="p-3 sm:p-4">Stage</th><th className="p-3 sm:p-4">AUD</th><th className="p-3 sm:p-4">When it applies</th></tr></thead><tbody>{assessmentFees.map(fee => <tr key={fee.name} className="border-t border-slate-200"><th scope="row" className="p-3 sm:p-4 break-words">{fee.name}</th><td className="p-3 sm:p-4"><strong className="block">${fee.amount.toLocaleString('en-AU')}</strong><span>{fee.unit}</span></td><td className="p-3 sm:p-4 break-words">{fee.note}</td></tr>)}</tbody></table></div></section>
    <section><h2 className="text-2xl font-bold text-slate-900 mb-3">Example assessment budget</h2><p>One Eligibility Check, one OPRA attempt and one Skills Assessment Outcome request add up to <strong>AUD $3,355</strong> at the listed prices. This example covers those three APC charges only. It is not the total cost of obtaining registration, moving to Australia, or preparing for the exam.</p></section>
    <section><h2 className="text-2xl font-bold text-slate-900 mb-3">Other costs to consider</h2><ul className="list-disc pl-6 space-y-2"><li>Translation and document preparation, where required.</li><li>Travel, accommodation and payment-provider currency conversion charges.</li><li>Optional books, courses and other study materials.</li><li>Separate English-language, registration and later assessment costs where applicable.</li></ul><p className="mt-3">Your final cost depends on your pathway and circumstances. Check each provider’s current fees rather than treating a currency conversion or example budget as a fixed quote.</p></section>
    <section><h2 className="text-2xl font-bold text-slate-900 mb-3">Booking, reattempts and refunds</h2><p>Book and pay through the official APC Candidate Portal. A further examination attempt requires another examination fee. Cancellation and refund eligibility depend on timing and APC policy; consult the <a href={feesSource} className="text-emerald-700 underline">official payment and refund guidance</a> before cancelling.</p></section>
    <nav aria-label="Related preparation resources" className="flex flex-wrap gap-5"><Link href="/exam-dates" className="text-emerald-700 underline">Registration dates</Link><Link href="/blog/opra-exam-registration-process-2027" className="text-emerald-700 underline">Registration steps</Link><Link href="/sample-papers" className="text-emerald-700 underline">Free practice questions</Link></nav>
  </article>;
}
