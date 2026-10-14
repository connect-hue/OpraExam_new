export type SiteContent = {
  hero: {
    badgeText: string;
    headingPrefix: string;
    headingHighlight: string;
    headingSuffix: string;
    description: string;
    perks: string[];
    candidatesGuided: string;
    satisfactionRating: string;
  };
  about: {
    title: string;
    highlight: string;
    description: string;
    points: string[];
  };
  syllabus: {
    title: string;
    subtitle: string;
    domains: {
      title: string;
      description: string;
      weight: string;
      color: 'blue' | 'emerald' | 'purple';
    }[];
  };
};

export const defaultSiteContent: SiteContent = {
  hero: {
    badgeText: "Registration for November 2026 OPRA Exam is Open",
    headingPrefix: "How to Pass the ",
    headingHighlight: "OPRA Exam",
    headingSuffix: " in Australia",
    description: "The Overseas Pharmacist Readiness Assessment (OPRA) is conducted by the Australian Pharmacy Council (APC). It is a computer-based, multiple-choice examination for eligible overseas-qualified pharmacists.",
    perks: [
      "120 Multiple-Choice Questions (2 Hours 30 Minutes)",
      "Computer-Based at Approved APC & PearsonVUE Test Centres",
      "Biomedical, Pharmaceutical & Clinical Sciences",
      "1-on-1 APC Eligibility & Documentation Advice"
    ],
    candidatesGuided: "5,000+ Pharmacists Guided",
    satisfactionRating: "4.9/5 Candidate Satisfaction"
  },
  about: {
    title: "OPRA Exam Format",
    highlight: "The Overseas Pharmacist Readiness Assessment (OPRA) is conducted by the Australian Pharmacy Council (APC). It is a computer-based, multiple-choice examination for eligible overseas-qualified pharmacists.",
    description: "Assesses knowledge of the biomedical, pharmaceutical and clinical sciences relevant to pharmacy practice. Passing OPRA is one step in the pathway towards pharmacist registration. Candidates must also meet the applicable registration requirements of the Pharmacy Board of Australia.",
    points: [
      "Questions: 120 multiple-choice questions",
      "Duration: 2 hours and 30 minutes",
      "Delivery: At approved test centres by APC and the ones outside Australia, conducted by PearsonVUE",
      "Purpose: Assesses knowledge of the biomedical, pharmaceutical and clinical sciences relevant to pharmacy practice.",
      "Passing OPRA is one step in the pathway towards pharmacist registration. Candidates must also meet the applicable registration requirements of the Pharmacy Board of Australia."
    ]
  },
  syllabus: {
    title: "Syllabus Breakdown",
    subtitle: "Master the key domains tested in the OPRA exam to ensure your success.",
    domains: [
      {
        title: "Pharmaceutical Chemistry",
        description: "Organic chemistry, stereochemistry, drug metabolism, analytical chemistry, and physical pharmacy principles.",
        weight: "Biomedical Sciences Domain",
        color: "blue"
      },
      {
        title: "Pharmaceutics & Therapeutics",
        description: "Formulation, biopharmaceutics, pharmacokinetics, and evidence-based clinical application of medicines.",
        weight: "Pharmaceutical Sciences Domain",
        color: "emerald"
      },
      {
        title: "Pharmacology & Physiology",
        description: "Mechanism of action, adverse effects, body systems, pathology, and fundamental pharmacological concepts.",
        weight: "Clinical Sciences Domain",
        color: "purple"
      }
    ]
  }
};
