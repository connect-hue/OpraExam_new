import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | OPRA Exam Guide",
  description: "Learn how OPRA Exam Guide (opraexam.in) collects, protects, and handles your personal information when using our educational website.",
};

export default function PrivacyPage() {
  const lastUpdated = "March 2026";

  return (
    <div className="bg-slate-50 min-h-screen py-16 w-full">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 mb-10">
          <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-800 mb-4">
            Data Protection & Privacy
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-slate-500">
            Last Updated: <span className="text-slate-700 font-medium">{lastUpdated}</span>
          </p>
        </div>

        {/* Content Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-slate-200 prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-a:text-emerald-600 hover:prose-a:text-emerald-700 space-y-8">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">1. Introduction</h2>
            <p className="text-slate-600 leading-relaxed">
              At <strong>OPRAExam.in</strong> (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;), we respect your privacy and are committed to protecting any personal information you provide when using our website and diagnostic educational tools. This Privacy Policy explains what data we collect, why we collect it, and how we keep it safe.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">2. Information We Collect</h2>
            <p className="text-slate-600 leading-relaxed">
              We collect information in the following situations:
            </p>
            <ul className="list-disc pl-5 text-slate-600 space-y-2 mt-2">
              <li>
                <strong>Voluntary Submissions:</strong> When you unlock downloadable sample papers, participate in our OPRA Diagnostic Quiz, or subscribe to our newsletter, you may voluntarily submit your name, email address, phone number, and intended registration jurisdiction.
              </li>
              <li>
                <strong>Diagnostic Quiz Responses:</strong> Anonymous or associated score responses submitted during diagnostic mock assessments to provide personalized domain breakdowns.
              </li>
              <li>
                <strong>Automated Technical Data:</strong> Standard server logs, browser type, device information, IP address, and interaction data collected through cookies to optimize site performance and security.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">3. How We Use Your Information</h2>
            <p className="text-slate-600 leading-relaxed">
              We use the collected information strictly for the following purposes:
            </p>
            <ul className="list-disc pl-5 text-slate-600 space-y-2 mt-2">
              <li>To deliver requested OPRA sample examination papers and study cheat sheets.</li>
              <li>To calculate and present diagnostic test scores, domain breakdowns, and clinical recommendations.</li>
              <li>To send weekly AMH case studies, syllabus change alerts, and exam registration deadline updates.</li>
              <li>To improve website usability, content quality, and mobile responsiveness.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">4. We Do Not Sell Your Data</h2>
            <div className="bg-emerald-50 border-l-4 border-emerald-500 p-5 rounded-r-xl not-prose mb-4">
              <p className="text-sm text-emerald-900 font-medium leading-relaxed">
                <strong>Our Commitment:</strong> We do <strong>not</strong> sell, rent, trade, or monetize your personal information to third-party advertisers or unauthorized marketing brokers under any circumstances.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">5. Cookies & Analytics</h2>
            <p className="text-slate-600 leading-relaxed">
              We may utilize standard first-party cookies and privacy-friendly web analytics to understand traffic patterns, page popularity, and user engagement. You can choose to disable cookies through your individual browser settings at any time without impacting your core browsing experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">6. Data Security & Retention</h2>
            <p className="text-slate-600 leading-relaxed">
              We implement industry-standard SSL encryption and security practices to safeguard your information against unauthorized access, loss, or disclosure. We retain personal data only for as long as necessary to provide study resources or until you request its deletion.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">7. Your Rights & Opt-Out</h2>
            <p className="text-slate-600 leading-relaxed">
              You maintain full control over your personal data:
            </p>
            <ul className="list-disc pl-5 text-slate-600 space-y-2 mt-2">
              <li>You can unsubscribe from our educational email updates at any time by clicking the &quot;Unsubscribe&quot; link in any email footer.</li>
              <li>You may request a copy of the data we hold on you or request that we permanently delete your contact details by emailing us.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-3">8. Contact Us</h2>
            <p className="text-slate-600 leading-relaxed">
              If you have any questions, privacy inquiries, or deletion requests, please contact our team at: <br />
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
