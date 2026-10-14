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
    description: "OPRA is part of the APC Knowledge Stream for eligible overseas-qualified pharmacists. It is not the only possible assessment pathway for every applicant. Master the clinical syllabus and unlock your Australian pharmacy career.",
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
    highlight: "The Overseas Pharmacist Readiness Assessment (OPRA) is a clinical examination administered by the Australian Pharmacy Council (APC) as part of their Knowledge Stream.",
    description: "It officially replaces the legacy KAPS exam and is one pathway for internationally qualified pharmacists seeking to practise in Australia. Not every applicant will follow this route — eligibility depends on your individual APC assessment outcome.",
    points: [
      "One pathway within the APC assessment process for eligible overseas-qualified pharmacists.",
      "Assesses biomedical, pharmaceutical and clinical sciences — not country-specific legislation or practice standards.",
      "Passing OPRA is one step towards applying for provisional registration. You must also meet the Pharmacy Board of Australia's registration requirements."
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
