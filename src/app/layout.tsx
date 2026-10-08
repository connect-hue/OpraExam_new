import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://opraexam.in';
const gaId = process.env.NEXT_PUBLIC_GA_ID;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OPRA Exam Guide 2026 | Syllabus, Fees & Preparation Australia",
    template: "%s | OPRA Exam Guide 2026",
  },
  description: "Complete guide for the OPRA exam Australia (Overseas Pharmacist Readiness Assessment). Access 2026 syllabus, exam dates, fees, APC document evaluation & mock tests.",
  keywords: [
    "OPRA exam Australia",
    "OPRA exam syllabus 2026",
    "OPRA exam fees",
    "OPRA exam dates 2026",
    "pharmacist readiness assessment",
    "APC skills assessment",
    "KAPS vs OPRA exam",
    "Australian pharmacy council exam",
    "how to become pharmacist in Australia",
    "OPRA sample papers"
  ],
  authors: [{ name: "OPRA Exam Editorial Team", url: `${siteUrl}/about` }],
  creator: "OPRA Exam Guide",
  publisher: "OPRA Exam Guide",
  alternates: {
    canonical: "./",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: siteUrl,
    siteName: "OPRA Exam Guide",
    title: "OPRA Exam Guide 2026 | Syllabus, Fees & Preparation Australia",
    description: "Start your journey to becoming a registered pharmacist in Australia. Comprehensive guide for OPRA exam preparation, syllabus & mock papers.",
  },
  twitter: {
    card: "summary_large_image",
    title: "OPRA Exam Guide 2026 | Australian Pharmacist Readiness Assessment",
    description: "Prepare for the Australian OPRA pharmacist exam with full syllabus breakdown, mock tests, and APC evaluation guidance.",
  },
  category: "education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "OPRA Exam Guide",
              "url": siteUrl,
              "description": "Comprehensive operational guide and study resources for the Australian OPRA pharmacist exam."
            })
          }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-slate-50 text-slate-900">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaId}');
              `}
            </Script>
          </>
        )}
        <Navbar />
        <main className="flex-1 w-full flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
