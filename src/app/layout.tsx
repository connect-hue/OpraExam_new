
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Preferred canonical domain
const SITE_URL = "https://www.opraexam.in";

const SITE_NAME = "OPRAExam.in";

const DEFAULT_TITLE =
  "OPRA Exam 2026: Syllabus, Dates, Fees & Preparation";

const DEFAULT_DESCRIPTION =
  "Explore the OPRA Exam 2026 syllabus, exam dates, fees, eligibility, preparation strategies and free practice questions for overseas-qualified pharmacists.";

const gaId =
  process.env.NEXT_PUBLIC_GA_ID ||
  process.env.GA_ID;

// Global metadata
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  applicationName: SITE_NAME,

  title: {
    default: DEFAULT_TITLE,
    template: "%s | OPRAExam.in",
  },

  description: DEFAULT_DESCRIPTION,

  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "education",

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

  // Do not place a global canonical here.
  // Each page must define its own canonical URL.

  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "OPRA Exam Preparation - OPRAExam.in",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
    images: ["/og-image.jpg"],
  },
};

// Website and organization structured data
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      description:
        "Independent educational resource for OPRA exam preparation and overseas-qualified pharmacists.",
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: `${SITE_URL}/`,
      inLanguage: "en",
      publisher: {
        "@id": `${SITE_URL}/#organization`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} scroll-smooth antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(
              /</g,
              "\\u003c"
            ),
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

            <Script
              id="google-analytics"
              strategy="afterInteractive"
            >
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

        <main className="flex-1 w-full flex flex-col">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
