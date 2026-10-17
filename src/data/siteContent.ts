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
      color: 'blue' | 'emerald' | 'purple' | 'teal' | 'amber';
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
    title: "Official OPRA Exam Syllabus Breakdown",
    subtitle: "According to the Australian Pharmacy Council, the OPRA examination covers five core content areas with the following approximate question distribution.",
    domains: [
      {
        title: "Therapeutics and Patient Care",
        description: "Principles of medicine selection, therapeutic decision-making, patient condition assessment, medicine safety, and drug dosing calculations.",
        weight: "45% Weightage",
        color: "emerald"
      },
      {
        title: "Biomedical Sciences",
        description: "Human physiology, major organ system functions, disease mechanisms, pathophysiology, medical microbiology, and immunology principles.",
        weight: "20% Weightage",
        color: "blue"
      },
      {
        title: "Pharmacology and Toxicology",
        description: "Drug mechanisms of action, receptor pharmacology, drug-drug interactions, enzyme induction/inhibition, adverse reactions, and overdose poisoning management.",
        weight: "15% Weightage",
        color: "purple"
      },
      {
        title: "Medicinal Chemistry and Biopharmaceutics",
        description: "Physicochemical properties, drug ionization, pKa, solubility, dosage forms, chemical stability, degradation pathways, and sterilisation.",
        weight: "10% Weightage",
        color: "teal"
      },
      {
        title: "Pharmacokinetics and Pharmacodynamics",
        description: "ADME processes, bioavailability, volume of distribution, clearance, elimination half-life, steady-state concentrations, and concentration-response curves.",
        weight: "10% Weightage",
        color: "amber"
      }
    ]
  }
};
