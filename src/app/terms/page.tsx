import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service | OPRA Exam Guide",
  description: "Terms and conditions governing your use of the OPRA Exam Guide (opraexam.in) educational website, resources, and study tools.",
};

export default function TermsPage() {
  const lastUpdated = "March 2026";

  return (
    <div className="bg-slate-50 min-h-screen py-16 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 mb-10">
          <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-4">
            Legal Agreement
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: <span className="text-slate-700 font-medium">{lastUpdated}</span>
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-a:text-emerald-600 hover:prose-a:text-emerald-700 space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Agreement to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              By accessing or using <strong>OPRAExam.in</strong> (&quot;the Website&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), you agree to be bound by these Terms of Service. If you do not agree with any part of these terms, please discontinue use of our website and services immediately.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Educational Disclaimer & Non-Affiliation</h2>
            <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-xl not-prose mb-4">
              <p className="text-sm text-amber-900 font-medium leading-relaxed">
                <strong>Important Notice:</strong> OPRAExam.in is an independent educational resource created by registered pharmacists. We are <strong>not affiliated, associated, authorized, endorsed by, or in any way officially connected</strong> with the Australian Pharmacy Council (APC), Ahpra (Australian Health Practitioner Regulation Agency), or Pearson VUE.
              </p>
            </div>
            <p className="text-slate-600 leading-relaxed">
              All information, sample questions, quiz assessments, and guides provided on this website are for educational and preparatory purposes only. Official assessment guidelines, dates, fees, and requirements should always be verified directly through the official Australian Pharmacy Council portal.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. No Medical or Legal Advice</h2>
            <p className="text-slate-600 leading-relaxed">
              Content published on OPRAExam.in does not constitute formal medical diagnosis, clinical practice instructions, immigration counsel, or legal advice. Pharmacotherapy decisions and regulatory migration processes must always follow official statutory guidelines and the Australian Medicines Handbook (AMH).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. Intellectual Property Rights</h2>
            <p className="text-slate-600 leading-relaxed">
              Unless otherwise stated, all written articles, diagnostic quiz questions, illustrations, and proprietary study outlines published on OPRAExam.in are the intellectual property of OPRAExam.in. You may download and print materials for your personal, non-commercial preparatory study only. Reproduction, redistribution, or commercial exploitation without written consent is strictly prohibited.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. User Submissions & Diagnostic Tools</h2>
            <p className="text-slate-600 leading-relaxed">
              When taking our diagnostic assessments or submitting contact forms for study materials, you agree to provide accurate and current information. We reserve the right to modify, suspend, or discontinue any free quiz or sample paper service at our discretion without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. External Links & Third-Party Services</h2>
            <p className="text-slate-600 leading-relaxed">
              Our website may contain links to external third-party websites (such as APC, Ahpra, Gumroad, or Pearson VUE). We do not control and are not responsible for the content, privacy policies, or practices of any third-party websites or services.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Limitation of Liability</h2>
            <p className="text-slate-600 leading-relaxed">
              To the maximum extent permitted by applicable law, OPRAExam.in and its authors shall not be liable for any direct, indirect, incidental, or consequential damages resulting from your use of, or inability to use, the materials on this site, including exam performance or registration outcomes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Changes to Terms</h2>
            <p className="text-slate-600 leading-relaxed">
              We reserve the right to revise these Terms of Service at any time. Changes will be posted on this page with an updated revision date. Your continued use of the website signifies your acceptance of any updated terms.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">9. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions regarding these Terms of Service, please reach out to us at: <br />
              <a href="mailto:contact@opraexam.in" className="font-semibold">contact@opraexam.in</a>
            </p>
          </section>

        </div>

        {/* Back Link */}
        <div className="mt-10 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-semibold text-emerald-700 hover:text-emerald-800 bg-white px-6 py-3 rounded-full border border-slate-200 shadow-sm transition-all hover:shadow"
          >
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
