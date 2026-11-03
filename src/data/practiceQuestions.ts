export type Domain = 'Pharmacology' | 'Pharmaceutics' | 'Chemistry';

export type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number;
  domain: Domain;
  explanation: string;
};

export const practiceQuestions: Question[] = [
  // --- PHARMACOLOGY (7 questions) ---
  {
    id: 1,
    domain: 'Pharmacology',
    question: "Which of the following best describes the first-pass effect in pharmacokinetics?",
    options: [
      "Extensive metabolism of a drug by the liver before reaching systemic circulation",
      "Rapid absorption of a drug from the stomach into the bloodstream",
      "Distribution of a drug from the bloodstream to peripheral tissues",
      "Immediate excretion of a drug through the kidneys without metabolism"
    ],
    answer: 0,
    explanation: "The first-pass effect (hepatic first-pass metabolism) refers to the extensive metabolism of an orally administered drug by the liver before it reaches systemic circulation. This reduces the bioavailability of drugs like morphine and GTN, which is why alternative routes (e.g. sublingual, IV) are sometimes preferred. <strong>AMH reference: Pharmacokinetics chapter.</strong>"
  },
  {
    id: 2,
    domain: 'Pharmacology',
    question: "What is the primary mechanism of action for Nonsteroidal Anti-inflammatory Drugs (NSAIDs)?",
    options: [
      "Inhibition of Angiotensin-Converting Enzyme (ACE)",
      "Inhibition of the cyclooxygenase (COX) enzyme",
      "Blockade of beta-adrenergic receptors in the heart",
      "Inhibition of the gastric H+/K+ ATPase pump"
    ],
    answer: 1,
    explanation: "NSAIDs inhibit cyclooxygenase (COX-1 and COX-2) enzymes, reducing the synthesis of prostaglandins and thromboxanes. This leads to their anti-inflammatory, antipyretic, and analgesic effects. COX-1 inhibition also accounts for GI side effects. <strong>AMH reference: Analgesics — NSAIDs.</strong>"
  },
  {
    id: 3,
    domain: 'Pharmacology',
    question: "Which antibiotic is typically associated with 'Red Man Syndrome' if administered via rapid intravenous infusion?",
    options: [
      "Penicillin G",
      "Azithromycin",
      "Vancomycin",
      "Ciprofloxacin"
    ],
    answer: 2,
    explanation: "Vancomycin, when infused too rapidly, causes a direct non-immune-mediated mast cell degranulation reaction called 'Red Man Syndrome' — characterised by flushing, erythema, and pruritis of the face, neck, and upper torso. Slowing the infusion rate to ≥60 minutes prevents this. <strong>AMH reference: Antibiotics — Glycopeptides.</strong>"
  },
  {
    id: 4,
    domain: 'Pharmacology',
    question: "What is the recognised primary antidote for paracetamol (acetaminophen) toxicity/overdose?",
    options: [
      "Naloxone",
      "Flumazenil",
      "Atropine",
      "N-acetylcysteine (NAC)"
    ],
    answer: 3,
    explanation: "N-acetylcysteine (NAC) is the antidote for paracetamol overdose. It replenishes glutathione stores, preventing the toxic metabolite NAPQI from binding to hepatocytes. IV NAC is the standard regimen in Australia. Time to treatment is critical — refer to the Rumack-Matthew nomogram. <strong>AMH reference: Paracetamol overdose management.</strong>"
  },
  {
    id: 5,
    domain: 'Pharmacology',
    question: "Which class of medications is considered first-line pharmacological therapy for type 2 diabetes mellitus according to Australian guidelines?",
    options: [
      "Sulfonylureas",
      "Biguanides (e.g., Metformin)",
      "Thiazolidinediones",
      "DPP-4 inhibitors"
    ],
    answer: 1,
    explanation: "Metformin (a biguanide) is first-line pharmacotherapy for type 2 diabetes in Australian guidelines when lifestyle modification is insufficient. It reduces hepatic glucose production, improves insulin sensitivity, and has a favourable safety profile. It is weight-neutral and does not cause hypoglycaemia as monotherapy. <strong>AMH reference: Antidiabetic drugs — Metformin.</strong>"
  },
  {
    id: 6,
    domain: 'Pharmacology',
    question: "A patient on warfarin is prescribed trimethoprim-sulfamethoxazole (cotrimoxazole). What is the most clinically significant interaction?",
    options: [
      "Cotrimoxazole reduces warfarin absorption from the gut",
      "Cotrimoxazole inhibits CYP2C9, increasing warfarin's anticoagulant effect",
      "Cotrimoxazole displaces warfarin from albumin, causing toxicity",
      "Cotrimoxazole accelerates warfarin clearance via CYP induction"
    ],
    answer: 1,
    explanation: "Cotrimoxazole inhibits CYP2C9, the primary enzyme responsible for warfarin (S-enantiomer) metabolism. This significantly raises warfarin plasma levels and increases bleeding risk. INR should be closely monitored and warfarin dose reduced. This is a high-priority interaction in clinical practice. <strong>AMH reference: Drug interactions — Warfarin.</strong>"
  },
  {
    id: 7,
    domain: 'Pharmacology',
    question: "Which of the following opioids is considered safest in patients with renal impairment for chronic pain management?",
    options: [
      "Morphine",
      "Codeine",
      "Fentanyl",
      "Oxycodone"
    ],
    answer: 2,
    explanation: "Fentanyl is the preferred opioid in renal impairment because it is primarily metabolised by the liver (CYP3A4) to inactive metabolites that do not accumulate renally. Morphine and codeine produce active/toxic metabolites (morphine-6-glucuronide, morphine-3-glucuronide) that accumulate in renal failure, causing respiratory depression. <strong>AMH reference: Opioid analgesics — Special populations.</strong>"
  },

  // --- PHARMACEUTICS (7 questions) ---
  {
    id: 8,
    domain: 'Pharmaceutics',
    question: "A patient is prescribed metoprolol succinate 47.5 mg extended-release tablets. They ask if they can crush them. What is the correct counselling advice?",
    options: [
      "Crushing is safe as the dose remains the same",
      "Crushing is acceptable if mixed with food",
      "Crushing must not be done as it destroys the extended-release mechanism, causing dose dumping",
      "Crushing is permitted only in elderly patients with swallowing difficulties"
    ],
    answer: 2,
    explanation: "Extended-release (ER/SR/XL/XR) formulations must NEVER be crushed or chewed. Crushing destroys the controlled-release matrix, leading to 'dose dumping' — rapid release of the entire dose into the bloodstream. For metoprolol ER, this can cause severe bradycardia and hypotension. An alternative immediate-release formulation given more frequently should be considered. <strong>AMH reference: Drug formulation considerations.</strong>"
  },
  {
    id: 9,
    domain: 'Pharmaceutics',
    question: "Which route of administration completely bypasses the first-pass effect?",
    options: [
      "Oral (tablet)",
      "Rectal suppository",
      "Intravenous injection",
      "Sublingual tablet"
    ],
    answer: 2,
    explanation: "Intravenous (IV) administration delivers the drug directly into systemic circulation, completely bypassing hepatic first-pass metabolism and achieving 100% bioavailability. Sublingual and rectal routes partially bypass first-pass metabolism but not completely. This is clinically important for drugs with extensive first-pass effects like glyceryl trinitrate (GTN). <strong>AMH reference: Routes of administration.</strong>"
  },
  {
    id: 10,
    domain: 'Pharmaceutics',
    question: "A patient's prescription reads 'salbutamol MDI 2 puffs PRN'. What does PRN mean in this context?",
    options: [
      "Per rectal night — to be administered rectally at night",
      "As required — when symptoms occur",
      "Twice daily without food",
      "Preventive regular night dose"
    ],
    answer: 1,
    explanation: "PRN is a Latin abbreviation for 'pro re nata', meaning 'as needed' or 'as required'. In the context of a salbutamol inhaler, this means the patient should use it when experiencing bronchospasm symptoms (wheeze, shortness of breath) rather than at fixed regular intervals. Counselling on recognising symptom triggers is essential. <strong>AMH reference: Asthma management — Reliever therapy.</strong>"
  },
  {
    id: 11,
    domain: 'Pharmaceutics',
    question: "Which storage condition is required for insulin vials that have NOT yet been opened?",
    options: [
      "Room temperature (15–25°C), away from light",
      "Refrigerated (2–8°C), protected from freezing",
      "Frozen (−20°C) to maintain potency",
      "At body temperature (37°C) to prevent crystallisation"
    ],
    answer: 1,
    explanation: "Unopened insulin vials must be stored in a refrigerator at 2–8°C and must NOT be frozen (freezing denatures insulin). Once opened or in-use, insulin can generally be kept at room temperature (below 25–30°C) for up to 28 days (product dependent). Always counsel patients never to use insulin that has been frozen or that appears cloudy/discoloured (for clear insulins). <strong>AMH reference: Insulin — storage.</strong>"
  },
  {
    id: 12,
    domain: 'Pharmaceutics',
    question: "A patient asks about taking their iron supplement. Which of the following provides the best counselling advice?",
    options: [
      "Take with a glass of milk to reduce stomach upset",
      "Take with vitamin C (ascorbic acid) to enhance absorption",
      "Take with antacids to improve tolerability",
      "Take with tea or coffee to mask the metallic taste"
    ],
    answer: 1,
    explanation: "Vitamin C (ascorbic acid) enhances non-haem iron absorption by reducing Fe³⁺ to the more soluble Fe²⁺ form and preventing formation of insoluble iron complexes. Conversely, calcium (milk), tannins (tea, coffee), and antacids (raising gastric pH) all reduce iron absorption significantly. <strong>AMH reference: Iron deficiency — oral supplementation.</strong>"
  },
  {
    id: 13,
    domain: 'Pharmaceutics',
    question: "What is the half-life (t½) of a drug, and what clinical implication does it have for dosing frequency?",
    options: [
      "Time for 50% of a drug to be absorbed; affects onset of action",
      "Time for the plasma concentration to fall by 50%; a drug reaches steady state in approximately 4–5 half-lives",
      "The time between doses; longer half-lives require more frequent dosing",
      "The time for a drug to distribute equally between plasma and tissues"
    ],
    answer: 1,
    explanation: "The biological half-life (t½) is the time required for plasma drug concentration to decrease by 50%. It takes approximately 4–5 half-lives to reach steady-state concentration during regular dosing, and the same to achieve full elimination after stopping. Drugs with long half-lives (e.g. amiodarone, t½ ~40–55 days) take weeks to reach steady state and linger long after cessation. <strong>AMH reference: Pharmacokinetics — Half-life and steady state.</strong>"
  },
  {
    id: 14,
    domain: 'Pharmaceutics',
    question: "A patient is prescribed methotrexate 15 mg ONCE WEEKLY for rheumatoid arthritis. Why is the once-weekly dosing critical?",
    options: [
      "Methotrexate is only effective when taken in a weekly cycle",
      "Daily dosing would cause rapid drug resistance",
      "Daily dosing causes severe and potentially fatal bone marrow suppression and hepatotoxicity",
      "The drug's half-life of exactly 7 days requires weekly dosing"
    ],
    answer: 2,
    explanation: "This is one of the most critical dispensing safety checks in pharmacy practice. Methotrexate for non-oncology indications (RA, psoriasis) is dosed ONCE WEEKLY. Dispensing or administering it daily causes fatal toxicity through cumulative bone marrow suppression, mucositis, and hepatotoxicity. It is a high-alert medicine in the AMH. Always confirm the prescriber's intent and counsel patients explicitly. <strong>AMH reference: Methotrexate — dosing and safety.</strong>"
  },

  // --- CHEMISTRY (6 questions) ---
  {
    id: 15,
    domain: 'Chemistry',
    question: "What is the Henderson-Hasselbalch equation used for in pharmacy?",
    options: [
      "Calculating drug dosage based on body weight",
      "Predicting the ionisation state of a drug at a given pH",
      "Determining the rate of drug metabolism in the liver",
      "Estimating the volume of distribution of a lipophilic drug"
    ],
    answer: 1,
    explanation: "The Henderson-Hasselbalch equation (pH = pKa + log([A⁻]/[HA])) predicts the degree of ionisation of a weak acid or base at a given pH. This is critical in pharmacy because only the un-ionised form of most drugs readily crosses biological membranes. For example, aspirin (a weak acid) is largely un-ionised (absorbed) in the acidic stomach environment. <strong>AMH reference: Pharmacokinetics — Ionisation and absorption.</strong>"
  },
  {
    id: 16,
    domain: 'Chemistry',
    question: "Which of the following best describes a prodrug?",
    options: [
      "A drug that is immediately active upon administration",
      "An inactive precursor that is converted to an active form by metabolic processes in the body",
      "A drug that requires refrigeration to remain stable",
      "A drug derived from natural plant sources"
    ],
    answer: 1,
    explanation: "A prodrug is a pharmacologically inactive compound that is converted to its active form in the body, typically by enzymatic reactions (e.g. hepatic metabolism). Examples include: enalapril → enalaprilat; codeine → morphine (via CYP2D6); and oseltamivir → oseltamivir carboxylate. Prodrugs are designed to improve bioavailability, stability, or target delivery. <strong>AMH reference: Pharmacokinetics — Prodrugs.</strong>"
  },
  {
    id: 17,
    domain: 'Chemistry',
    question: "Why are some drugs formulated as hydrochloride (HCl) salts (e.g., metformin HCl, cetirizine HCl)?",
    options: [
      "To increase the drug's molecular weight for extended release",
      "To convert a lipid-soluble drug into a fat-soluble form",
      "To improve water solubility and stability for oral or parenteral formulations",
      "To block receptor activity at physiological pH"
    ],
    answer: 2,
    explanation: "Forming a salt (e.g. HCl salt) of a basic drug dramatically increases its aqueous solubility, which is critical for tablet manufacturing, dissolution, and absorption. The HCl salt form converts a poorly water-soluble free base into a water-soluble ionic form. This is a fundamental principle of drug formulation chemistry. The salt does not alter the pharmacological activity — only the physicochemical properties. <strong>AMH reference: Drug formulation principles.</strong>"
  },
  {
    id: 18,
    domain: 'Chemistry',
    question: "A pharmacist needs to prepare 200 mL of a 0.9% NaCl (normal saline) solution from a stock solution of 9% NaCl. How much stock solution is required?",
    options: [
      "10 mL",
      "20 mL",
      "45 mL",
      "90 mL"
    ],
    answer: 1,
    explanation: "Using the dilution equation C1V1 = C2V2: (9%) × V1 = (0.9%) × 200 mL → V1 = (0.9 × 200) / 9 = 20 mL. Therefore, 20 mL of the 9% stock solution is diluted to 200 mL total volume with sterile water. Dilution calculations are a high-frequency topic in the OPRA exam. <strong>AMH reference: Pharmaceutical calculations.</strong>"
  },
  {
    id: 19,
    domain: 'Chemistry',
    question: "What is the significance of a drug's partition coefficient (log P) in pharmacy?",
    options: [
      "It measures the rate of drug elimination from the body",
      "It indicates the degree of protein binding in the plasma",
      "It describes the drug's relative solubility in lipid vs. water, influencing membrane permeability and distribution",
      "It calculates the maximum safe dose for a given body weight"
    ],
    answer: 2,
    explanation: "The partition coefficient (log P) quantifies a drug's lipophilicity — its relative preference for an octanol (lipid) phase vs. a water phase. High log P → lipophilic → better membrane penetration (e.g. CNS penetration), higher volume of distribution. Low log P → hydrophilic → poor membrane permeability, renally excreted. Optimal log P for oral drugs is typically 1–3. This principle underpins drug design and predicting distribution. <strong>AMH reference: Pharmacokinetics — Distribution.</strong>"
  },
  {
    id: 20,
    domain: 'Chemistry',
    question: "Which of the following is the correct definition of bioavailability (F)?",
    options: [
      "The speed at which a drug reaches its maximum plasma concentration",
      "The fraction of an administered dose that reaches systemic circulation in unchanged, active form",
      "The total amount of drug bound to plasma proteins",
      "The rate at which a drug is eliminated from the body"
    ],
    answer: 1,
    explanation: "Bioavailability (F) is the fraction (0–1 or 0–100%) of an administered dose that reaches systemic circulation in an unchanged, active form. IV administration achieves F = 1 (100%) by definition. Oral bioavailability is reduced by incomplete absorption and/or first-pass metabolism. For example, oral morphine has ~30% bioavailability, meaning larger oral doses are needed compared to IV. <strong>AMH reference: Pharmacokinetics — Bioavailability.</strong>"
  }
];

