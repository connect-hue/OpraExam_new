import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  metadataBase: new URL("https://opraexam.in"),
  title: {
    default: "OPRA Exam Guide 2026 | Syllabus, Fees & Preparation",
    template: "%s | OPRA Exam Guide 2026",
  },
  description: "Comprehensive guide for the OPRA exam Australia (Overseas Pharmacist Readiness Assessment). Get details on syllabus, fees, dates, and preparation materials.",
  keywords: ["OPRA exam Australia", "pharmacist readiness assessment", "OPRA syllabus", "OPRA exam fees", "OPRA exam dates", "Australia pharmacy exam"],
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://opraexam.in",
    siteName: "OPRA Exam Guide",
    title: "OPRA Exam Guide 2026 | Syllabus, Fees & Preparation",
    description: "Start your journey to becoming a registered pharmacist in Australia. Comprehensive guide for OPRA exam preparation.",
  },
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
              "url": "https://opraexam.in",
              "description": "Comprehensive operational guide and study resources for the Australian OPRA pharmacist exam."
            })
          }}
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <Navbar />
        <main className="flex-1 w-full flex flex-col items-center">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
