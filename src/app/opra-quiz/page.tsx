import Link from 'next/link';
import { serializeJsonLd } from '@/lib/seo/structuredData';
import { SITE_URL } from '@/lib/site';
import type { Metadata } from "next";
import QuizApp from "@/components/QuizApp";


export const metadata: Metadata = {
  title: "OPRA Readiness Quiz | Free Diagnostic Test 2026",
  description: "Test your clinical pharmacy knowledge with our free diagnostic quiz tailored for the Australian OPRA exam syllabus. Find out if you are ready.",
  keywords: [
    "OPRA quiz",
    "OPRA diagnostic test",
    "OPRA practice questions",
    "Australian pharmacy readiness assessment quiz",
  ],
  alternates: {
    canonical: `${SITE_URL}/opra-quiz`,
  },
  openGraph: {
    title: "OPRA Readiness Quiz | Free Diagnostic Test",
    description: "Take the 2026 diagnostic quiz to evaluate your pharmacy readiness for the Australian OPRA exam.",
    url: `${SITE_URL}/opra-quiz`,
    type: "website",
    images: [`${SITE_URL}/og-image.jpg`],
  },
  twitter: {
    card: "summary_large_image",
    title: "OPRA Readiness Quiz | Free Diagnostic Test",
    description: "Evaluate your readiness for the Australian OPRA exam.",
    images: [`${SITE_URL}/og-image.jpg`],
  },
};

export default function QuizPage() {
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Quiz',
        item: `${SITE_URL}/opra-quiz`,
      },
    ],
  };

  const quizSchema = {
    '@context': 'https://schema.org',
    '@type': 'Quiz',
    name: 'OPRA Exam Readiness & Diagnostic Assessment',
    description: 'Free diagnostic assessment evaluating Pharmacology, Pharmaceutics, and Pharmaceutical Chemistry for the Australian OPRA exam.',
    educationalLevel: 'Professional Certification',
    assesses: 'Overseas Pharmacist Readiness Assessment Australia',
    hasPart: [
      {
        '@type': 'Question',
        name: 'Which of the following best describes the first-pass effect in pharmacokinetics?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Extensive metabolism of a drug by the liver before reaching systemic circulation',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the primary mechanism of action for Nonsteroidal Anti-inflammatory Drugs (NSAIDs)?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Inhibition of the cyclooxygenase (COX) enzyme',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the recognised primary antidote for paracetamol (acetaminophen) toxicity/overdose?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'N-acetylcysteine (NAC)',
        },
      },
      {
        '@type': 'Question',
        name: 'Which class of medications is considered first-line pharmacological therapy for type 2 diabetes mellitus according to Australian guidelines?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Biguanides (e.g., Metformin)',
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-slate-50 w-full py-20 px-4 sm:px-6 lg:px-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(quizSchema) }}
      />
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">OPRA Readiness Quiz</h1>
        <p className="text-lg text-slate-600">Take our quick diagnostic test to evaluate your current understanding of the core clinical syllabus.</p>
      </div>
      
      <QuizApp />
      <p className="text-center mt-8"><Link href="/practice" className="text-emerald-700 underline">Browse all practice questions and explanations</Link></p>
    </div>
  );
}
