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
    badgeText: "Registration for 2026 OPRA Exam is Open",
    headingPrefix: "How to Pass the ",
    headingHighlight: "OPRA Exam",
    headingSuffix: " in Australia",
    description: "The Overseas Pharmacist Readiness Assessment (OPRA) is the mandatory exam for international pharmacists. Master the clinical syllabus, access high-yield AMH materials, and unlock your Australian pharmacy career.",
    perks: [
      "Official 2026 OPRA Syllabus & Domain Weights",
      "120-Question Authentic Mock Practice Papers",
      "AMH Clinical Therapeutics & Calculation Guides",
      "1-on-1 APC Eligibility & Documentation Advice"
    ],
    candidatesGuided: "5,000+ Pharmacists Guided",
    satisfactionRating: "4.9/5 Candidate Satisfaction"
  },
  about: {
    title: "What is the OPRA Exam?",
    highlight: "The Overseas Pharmacist Readiness Assessment (OPRA) is a mandatory clinical examination administered by the Australian Pharmacy Council (APC).",
    description: "It officially replaces the legacy KAPS exam and serves as the primary gateway for all internationally qualified pharmacists seeking provisional registration to practice in Australia.",
    points: [
      "Mandatory for international pharmacist registration in Australia.",
      "Tests advanced clinical alignment with the Australian Medicines Handbook (AMH).",
      "Passing grants eligibility for Provisional Registration & Internship."
    ]
  },
  syllabus: {
    title: "Syllabus Breakdown",
    subtitle: "Master the key domains tested in the OPRA exam to ensure your success.",
    domains: [
      {
        title: "Pharmaceutical Chemistry",
        description: "Organic chemistry, stereochemistry, drug metabolism, analytical chemistry, and physical pharmacy principles.",
        weight: "~30% of Exam Weight",
        color: "blue"
      },
      {
        title: "Pharmaceutics & Therapeutics",
        description: "Formulation, biopharmaceutics, pharmacokinetics, and evidence-based clinical application of medicines.",
        weight: "~40% of Exam Weight",
        color: "emerald"
      },
      {
        title: "Pharmacology & Physiology",
        description: "Mechanism of action, adverse effects, body systems, pathology, and fundamental pharmacological concepts.",
        weight: "~30% of Exam Weight",
        color: "purple"
      }
    ]
  }
};
