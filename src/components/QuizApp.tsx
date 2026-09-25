"use client";

import React, { useState } from 'react';

type Domain = 'Pharmacology' | 'Pharmaceutics' | 'Chemistry';

type Question = {
  id: number;
  question: string;
  options: string[];
  answer: number;
  domain: Domain;
  explanation: string;
};

const questions: Question[] = [
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
    explanation: "Using the dilution equation C1V1 = C2V2: (9%) × V1 = (0.9%) × 200 mL → V1 = (0.9 × 200) / 9 = 20 mL. Therefore, 20 mL of the 9% stock solution is diluted to 200 mL total volume with sterile water. Dilution calculations are a high-frequency topic in OPRA Paper 1. <strong>AMH reference: Pharmaceutical calculations.</strong>"
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

const DOMAIN_COLOURS: Record<Domain, { bg: string; text: string; border: string; light: string }> = {
  Pharmacology: { bg: 'bg-emerald-600', text: 'text-emerald-700', border: 'border-emerald-500', light: 'bg-emerald-50' },
  Pharmaceutics: { bg: 'bg-blue-600', text: 'text-blue-700', border: 'border-blue-500', light: 'bg-blue-50' },
  Chemistry:     { bg: 'bg-violet-600', text: 'text-violet-700', border: 'border-violet-500', light: 'bg-violet-50' },
};

type AnswerRecord = { selected: number; correct: boolean };

export default function QuizApp() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<number, AnswerRecord>>({});
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);

  // Lead capture
  const [email, setEmail] = useState('');
  const [country, setCountry] = useState('Australia');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formError, setFormError] = useState('');

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(index);
    setShowExplanation(true);

    const correct = index === questions[currentIdx].answer;
    setAnswers(prev => ({
      ...prev,
      [currentIdx]: { selected: index, correct }
    }));
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setFormError('Please enter a valid email address.');
      return;
    }
    setFormError('');
    setIsFormSubmitted(true);
  };

  const handleRetake = () => {
    setCurrentIdx(0);
    setAnswers({});
    setSelectedOption(null);
    setShowExplanation(false);
    setIsQuizFinished(false);
    setIsFormSubmitted(false);
    setEmail('');
  };

  // ─── RESULTS ───────────────────────────────────────────────────────────────
  if (isQuizFinished && isFormSubmitted) {
    const totalScore = Object.values(answers).filter(a => a.correct).length;
    const percentage = Math.round((totalScore / questions.length) * 100);

    const domains: Domain[] = ['Pharmacology', 'Pharmaceutics', 'Chemistry'];
    const domainStats = domains.map(domain => {
      const domainQs = questions.filter(q => q.domain === domain);
      const correct = domainQs.filter((q, _) => answers[questions.indexOf(q)]?.correct).length;
      return { domain, correct, total: domainQs.length, pct: Math.round((correct / domainQs.length) * 100) };
    });

    const weakestDomain = domainStats.reduce((a, b) => a.pct < b.pct ? a : b);

    let readinessMsg = '';
    let readinessBg = '';
    if (percentage >= 80) {
      readinessMsg = '🎯 Excellent — you show strong exam readiness. Focus on any weak domains below.';
      readinessBg = 'bg-emerald-50 border-emerald-200 text-emerald-800';
    } else if (percentage >= 60) {
      readinessMsg = '📈 Good foundation — targeted practice on your weak domains will push you over the line.';
      readinessBg = 'bg-blue-50 border-blue-200 text-blue-800';
    } else {
      readinessMsg = '📚 More preparation needed — focus on all three domains, especially your weakest area below.';
      readinessBg = 'bg-amber-50 border-amber-200 text-amber-800';
    }

    return (
      <div className="w-full max-w-2xl mx-auto space-y-6 animate-fade-in-up">
        {/* Score Card */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8 text-center">
          <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-4xl">🏆</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-800 mb-1">Quiz Complete!</h2>
          <p className="text-slate-500 mb-6">Your OPRA readiness score</p>
          <div className="text-7xl font-black text-emerald-600 mb-2 tracking-tighter">{percentage}%</div>
          <p className="text-slate-600 font-medium mb-6">{totalScore} / {questions.length} correct</p>
          <div className={`rounded-2xl border p-4 text-sm font-medium ${readinessBg}`}>{readinessMsg}</div>
        </div>

        {/* Domain Breakdown */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Score by Domain</h3>
          <div className="space-y-5">
            {domainStats.map(({ domain, correct, total, pct }) => {
              const c = DOMAIN_COLOURS[domain];
              return (
                <div key={domain}>
                  <div className="flex justify-between items-center mb-2">
                    <span className={`font-semibold text-sm ${c.text}`}>{domain}</span>
                    <span className="text-slate-600 text-sm font-medium">{correct}/{total} &nbsp;({pct}%)</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-3">
                    <div
                      className={`${c.bg} h-3 rounded-full transition-all duration-700`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Gumroad Upsell Card */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl shadow-2xl p-8 text-white relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="relative">
            <div className="inline-block bg-emerald-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-4 uppercase tracking-widest">
              Recommended for you
            </div>
            <h3 className="text-2xl font-extrabold mb-2">
              OPRA Pro Mock Test Pack
            </h3>
            <p className="text-slate-300 mb-2 text-sm leading-relaxed">
              Your weakest domain was <strong className="text-white">{weakestDomain.domain}</strong> ({weakestDomain.pct}%).
              The Pro Pack includes 3 full-length 120-question papers with detailed AMH-cited explanations — exactly what you need.
            </p>
            <ul className="text-sm text-slate-300 space-y-1 mb-6 mt-4">
              {[
                '3 × 120-question full papers (timed, 3 hrs each)',
                'Domain-wise score breakdown after each attempt',
                'Detailed AMH-referenced answer explanations',
                'Lifetime access + unlimited retakes',
                '30-day full refund guarantee',
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span> {item}
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <a
                href="https://gumroad.com/l/opra-pro-mock-test-pack"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-emerald-500 hover:bg-emerald-400 text-white font-bold py-3.5 px-8 rounded-full shadow-lg hover:shadow-emerald-500/30 hover:-translate-y-0.5 transition-all text-center"
              >
                Get the Pro Pack — AUD $27
              </a>
              <span className="text-slate-400 text-xs">
                <s className="text-slate-500">AUD $49</s> &nbsp;Limited launch price
              </span>
            </div>
            <p className="text-slate-500 text-xs mt-3">INR 1,499 option available at checkout via Razorpay</p>
          </div>
        </div>

        {/* Answer Review */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-100 p-8">
          <h3 className="text-xl font-bold text-slate-800 mb-6">Answer Review</h3>
          <div className="space-y-6">
            {questions.map((q, idx) => {
              const a = answers[idx];
              const isCorrect = a?.correct;
              const c = DOMAIN_COLOURS[q.domain];
              return (
                <div key={q.id} className={`rounded-2xl border p-5 ${isCorrect ? 'border-emerald-200 bg-emerald-50/50' : 'border-red-200 bg-red-50/50'}`}>
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <p className="text-slate-800 font-semibold text-sm leading-snug">{idx + 1}. {q.question}</p>
                    <span className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold ${isCorrect ? 'bg-emerald-500' : 'bg-red-500'}`}>
                      {isCorrect ? '✓' : '✗'}
                    </span>
                  </div>
                  {!isCorrect && (
                    <p className="text-red-700 text-xs mb-1">
                      <span className="font-semibold">Your answer:</span> {q.options[a?.selected]}
                    </p>
                  )}
                  <p className="text-emerald-700 text-xs mb-3">
                    <span className="font-semibold">Correct answer:</span> {q.options[q.answer]}
                  </p>
                  <div className={`rounded-xl ${c.light} p-3 text-xs text-slate-700 leading-relaxed`}>
                    <span className={`font-bold ${c.text} text-xs uppercase tracking-wide`}>{q.domain} — </span>
                    <span dangerouslySetInnerHTML={{ __html: q.explanation }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="text-center pb-4">
          <button onClick={handleRetake} className="text-emerald-600 font-medium hover:underline text-sm">
            ↺ Retake Quiz
          </button>
        </div>
      </div>
    );
  }

  // ─── LEAD CAPTURE ──────────────────────────────────────────────────────────
  if (isQuizFinished && !isFormSubmitted) {
    return (
      <div className="w-full max-w-lg mx-auto bg-white rounded-3xl shadow-xl border border-slate-100 p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-3xl">🎉</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Almost there!</h2>
          <p className="text-slate-500 text-sm">
            Enter your email to see your full score, domain breakdown, and personalised answer explanations.
          </p>
        </div>

        <form onSubmit={handleLeadSubmit} className="space-y-5">
          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="pharmacist@example.com"
            />
          </div>
          <div>
            <label htmlFor="country" className="block text-sm font-semibold text-slate-700 mb-1.5">
              Target Registration State
            </label>
            <select
              id="country"
              value={country}
              onChange={e => setCountry(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
            >
              <option>Australia</option>
              <option>New Zealand</option>
            </select>
          </div>
          {formError && <p className="text-red-500 text-sm">{formError}</p>}
          <button
            type="submit"
            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-full shadow-md hover:shadow-lg transition-all"
          >
            Reveal My Score & Review Answers →
          </button>
        </form>
        <p className="text-xs text-slate-400 text-center mt-4">
          No spam. We'll send you a free AMH case study every Monday.
        </p>
      </div>
    );
  }

  // ─── ACTIVE QUIZ ───────────────────────────────────────────────────────────
  const question = questions[currentIdx];
  const progressPercentage = (currentIdx / questions.length) * 100;
  const domainColour = DOMAIN_COLOURS[question.domain];

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Progress + Domain */}
      <div className="mb-4 flex items-center justify-between">
        <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${domainColour.light} ${domainColour.text}`}>
          {question.domain}
        </span>
        <span className="text-sm text-slate-500 font-medium">
          {currentIdx + 1} / {questions.length}
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full mb-6">
        <div
          className="bg-emerald-500 h-1.5 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
        <div className="p-8 md:p-10">
          <h2 className="text-xl md:text-2xl font-bold text-slate-800 mb-8 leading-snug">
            {question.question}
          </h2>

          <div className="space-y-3">
            {question.options.map((option, idx) => {
              let style = "border-slate-200 hover:border-emerald-400 hover:bg-emerald-50 text-slate-700 cursor-pointer hover:-translate-y-0.5 shadow-sm hover:shadow-md";
              let icon = null;

              if (selectedOption !== null) {
                if (idx === question.answer) {
                  style = "border-emerald-500 bg-emerald-50 text-emerald-800 cursor-default";
                  icon = <span className="text-emerald-600 font-bold text-lg ml-3">✓</span>;
                } else if (idx === selectedOption) {
                  style = "border-red-400 bg-red-50 text-red-800 cursor-default";
                  icon = <span className="text-red-500 font-bold text-lg ml-3">✗</span>;
                } else {
                  style = "border-slate-100 opacity-40 text-slate-400 cursor-not-allowed";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleOptionClick(idx)}
                  disabled={selectedOption !== null}
                  className={`w-full text-left p-4 md:p-5 rounded-2xl border-2 font-medium transition-all duration-200 flex items-center justify-between ${style}`}
                >
                  <span>{option}</span>
                  {icon}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {showExplanation && (
            <div className={`mt-6 rounded-2xl ${domainColour.light} border ${domainColour.border} p-5 text-sm text-slate-700 leading-relaxed`}>
              <p className={`font-bold ${domainColour.text} mb-1 text-xs uppercase tracking-wide`}>
                Explanation
              </p>
              <p dangerouslySetInnerHTML={{ __html: question.explanation }} />
            </div>
          )}

          {/* Next Button */}
          {selectedOption !== null && (
            <button
              onClick={handleNext}
              className="mt-6 w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              {currentIdx < questions.length - 1 ? 'Next Question →' : 'See My Results →'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
