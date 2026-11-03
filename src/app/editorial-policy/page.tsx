import Link from 'next/link';
import { pageMetadata } from '@/lib/seo/metadata';

export const metadata = pageMetadata('Editorial & Corrections Policy', 'How OPRAExam.in identifies authors, uses official sources, and handles corrections to independent examination guides.', '/editorial-policy');

export default function EditorialPolicyPage() {
  return <article className="container mx-auto max-w-3xl px-5 py-16 space-y-7 text-slate-700 leading-relaxed">
    <h1 className="text-3xl sm:text-4xl font-bold text-slate-900">Editorial and corrections policy</h1>
    <p>OPRAExam.in is an independent educational resource. It is not affiliated with or endorsed by the Australian Pharmacy Council (APC), Ahpra, or Pearson VUE.</p>
    <section><h2 className="text-xl font-bold text-slate-900 mb-3">Official information and sources</h2><p>APC and the relevant registration authorities determine examination and registration requirements. Our guides help explain those requirements and link to official sources where available. Check the authority’s current guidance before booking an exam or making a payment.</p></section>
    <section><h2 className="text-xl font-bold text-slate-900 mb-3">Authorship and review</h2><p>Articles identify their contributor or editorial team. A professional review or registration claim is displayed only when a corresponding verified profile and review record are available. An author’s name alone does not imply professional registration or clinical review.</p><Link href="/authors/editorial-team" className="text-emerald-700 underline">About the editorial team</Link></section>
    <section><h2 className="text-xl font-bold text-slate-900 mb-3">Practice material</h2><p>Practice questions are independent learning exercises. They are not official APC questions, recalled exam questions, or a guarantee of examination performance. This content does not replace professional clinical advice.</p></section>
    <section><h2 className="text-xl font-bold text-slate-900 mb-3">Dates and corrections</h2><p>Publication dates identify when a guide first appeared. Editorial update dates, where available, identify changes to its public content. To report an error, email <a className="text-emerald-700 underline" href="mailto:contact@opraexam.in">contact@opraexam.in</a> with the page URL, the relevant passage and a supporting official reference. Avoid including personal documents or patient information.</p></section>
  </article>;
}
