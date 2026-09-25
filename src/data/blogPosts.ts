export type BlogPostContent = {
  type: 'h2' | 'h3' | 'p' | 'cta' | 'alert' | 'list';
  id?: string;
  text?: string;
  alertType?: 'tip' | 'warning' | 'info';
  items?: string[];
};

export type BlogPostFaq = {
  question: string;
  answer: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  author: string;
  date: string;
  readTime: string;
  keywords: string;
  content: BlogPostContent[];
  faqs?: BlogPostFaq[];
  relatedSlugs?: string[];
};

export const blogPosts: BlogPost[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // 1. OPRA Exam Preparation Guide 2026
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'opra-exam-preparation-guide-2026',
    title: 'OPRA Exam Preparation Guide 2026: Everything You Need to Know',
    description: 'The ultimate 2026 preparation guide for the Overseas Pharmacist Readiness Assessment (OPRA) exam. Learn the syllabus, test structure, and top study techniques.',
    author: 'Dr. Sarah Jenkins',
    date: 'March 23, 2026',
    readTime: '8 min read',
    keywords: 'OPRA exam, OPRA exam preparation, KAPS exam, Australian Pharmacy Council, pharmacist registration Australia',
    relatedSlugs: ['how-to-pass-opra-exam-first-try', 'understanding-opra-exam-syllabus', 'is-the-opra-exam-hard'],
    content: [
      { type: 'h2', id: 'what-is-opra', text: 'What is the OPRA Exam?' },
      { type: 'p', text: 'The Overseas Pharmacist Readiness Assessment (OPRA) is the compulsory examination for international pharmacy graduates wishing to register and practice in Australia. Replacing the <a href="/blog/opra-vs-kaps-exam-difference-2026">older KAPS assessment</a>, the OPRA exam tests a modern, clinically-focused syllabus aligned with strict Australian standards.' },
      { type: 'h2', id: 'exam-structure', text: 'Understanding the 2026 Exam Structure' },
      { type: 'p', text: 'The exam features two extensive multiple-choice (MCQ) papers, each consisting of 120 questions. Candidates must tackle both papers on the same day. Each paper has a strict time limit of 3 hours. See our dedicated breakdown of <a href="/blog/opra-exam-paper-1-and-2-breakdown">Paper 1 and Paper 2</a>.' },
      { type: 'alert', alertType: 'info', text: 'The OPRA exam is administered only 3 times per year. The 2026 windows are <strong>March 23–25</strong>, <strong>July 13–15</strong>, and <strong>November 23–25</strong>. Plan your study timeline accordingly.' },
      { type: 'h3', id: 'paper-1', text: 'Paper 1: Chemistry and Pharmacology' },
      { type: 'p', text: 'Paper 1 drills deeply into pharmaceutical chemistry, mechanism of action, and fundamental pharmacology. Expect comprehensive questions on stereochemistry, pharmacokinetics, and drug behavior.' },
      { type: 'cta' },
      { type: 'h3', id: 'paper-2', text: 'Paper 2: Pharmaceutics and Therapeutics' },
      { type: 'p', text: 'Paper 2 is your clinical assessment. It focuses on problem-solving patient cases, therapeutics, and recognizing adverse drug reactions. Applying theoretical knowledge to practical clinical scenarios is critical.' },
      { type: 'h2', id: 'how-to-prepare', text: 'Best Preparation Strategies' },
      { type: 'alert', alertType: 'tip', text: 'Use the <strong>Australian Medicines Handbook (AMH)</strong> as your primary reference — not Lippincott or Katzung. Find our full list in <a href="/blog/best-opra-exam-preparation-books">Top 5 OPRA Preparation Books</a>.' },
      { type: 'p', text: 'Review the official APC guidelines thoroughly. Allocate balanced time across all domains, as failing one domain can compromise your entire result. Utilize mock tests explicitly tailored to the 2026 OPRA exam format to build time-management skills and stamina.' },
      { type: 'list', items: ['Create a 12–16 week structured study plan.', 'Cover AMH monographs for top 30 drug classes.', 'Simulate exam conditions with full 120-question timed mocks.', 'Join study groups or OPRA online forums for peer learning.'] },
    ],
    faqs: [
      { question: 'How long should I study for the OPRA exam?', answer: 'Most candidates require between 3 to 6 months of dedicated study depending on their clinical background. If your undergraduate degree included strong clinical exposure, 3–4 months of focused AMH-based revision is typically sufficient.' },
      { question: 'Can I sit the OPRA exam outside Australia?', answer: 'Yes. The OPRA exam is delivered via Pearson VUE test centers globally, including in India, the UAE, the UK, and the Philippines. You do <strong>not</strong> need to travel to Australia to sit the exam.' },
      { question: 'What happens if I fail the OPRA exam?', answer: 'You may re-sit the exam in the next available window. The APC provides candidates with a performance feedback report indicating domain-level strengths and weaknesses to guide subsequent preparation.' },
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 2. How to Pass the OPRA Exam on Your First Try
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'how-to-pass-opra-exam-first-try',
    title: 'How to Pass the OPRA Exam on Your First Try',
    description: 'Expert tips and actionable study strategies to help you pass the Australian OPRA exam on your very first attempt. Maximize your score in Paper 1 and Paper 2.',
    author: 'Michael Nguyen',
    date: 'February 15, 2026',
    readTime: '6 min read',
    keywords: 'pass OPRA exam, OPRA exam tips, how to pass OPRA, OPRA exam difficulty, OPRA vs KAPS',
    relatedSlugs: ['opra-exam-preparation-guide-2026', 'is-the-opra-exam-hard', 'what-is-a-good-score-for-opra-exam'],
    content: [
      { type: 'h2', id: 'introduction', text: 'The Secret to Passing the OPRA Exam' },
      { type: 'p', text: 'Passing the OPRA exam on your first attempt is completely achievable, but it requires <strong>strategic studying</strong> rather than sheer memorization. The Australian Pharmacy Council wants to verify that you are a safe, competent, and clinically-aware pharmacist.' },
      { type: 'h2', id: 'common-mistakes', text: 'Common Mistakes to Avoid' },
      { type: 'alert', alertType: 'warning', text: 'Do <strong>not</strong> rely on KAPS preparation materials. The <a href="/blog/opra-vs-kaps-exam-difference-2026">KAPS exam is retired</a> and its content weighting differs significantly from OPRA. Using KAPS resources will cost you critical marks in Paper 2.' },
      { type: 'p', text: 'The biggest mistake candidates make is applying their home-country clinical guidelines. The OPRA exam requires strict adherence to the <strong>Australian Medicines Handbook (AMH)</strong>. Ignoring Australian standards almost guarantees failure in the Therapeutics domain.' },
      { type: 'h3', id: 'time-management', text: 'Mastering Time Management' },
      { type: 'p', text: 'You have exactly <strong>90 seconds per question</strong>. Candidates often get stuck on calculations in Paper 1 and lose precious time. Learn more about <a href="/blog/can-you-use-a-calculator-in-opra-exam">calculator rules for the OPRA exam</a>.' },
      { type: 'cta' },
      { type: 'h2', id: 'mock-exams', text: 'The Importance of Mock Exams' },
      { type: 'p', text: 'Repetitive textbook reading yields diminishing returns. Transition to active recall in your first month. Doing full 120-question OPRA mock exams under timed conditions replicates the mental fatigue of the real test day.' },
      { type: 'list', items: ['Do a minimum of 10 full mock papers before exam day.', 'Review every incorrect answer against the relevant AMH monograph.', 'Track your performance by domain to identify weaknesses.'] },
    ],
    faqs: [
      { question: 'What is the first-attempt pass rate for the OPRA exam?', answer: 'The APC does not publicly publish official pass rate data. However, anecdotally from candidate communities, a structured 4–6 month preparation using AMH-aligned resources generally results in a high first-attempt pass rate.' },
      { question: 'Is Paper 1 or Paper 2 harder?', answer: 'Most candidates find <strong>Paper 2 (Therapeutics) harder</strong> because it requires applying AMH and Therapeutic Guidelines (eTG) to complex patient scenarios, rather than straight recall of chemistry facts tested in Paper 1.' },
      { question: 'How many mock exams should I do before sitting the OPRA?', answer: 'We recommend a minimum of <strong>10 full-length, 120-question timed mock exams</strong> before your exam date. This builds the time-management muscle memory and emotional resilience needed for the 6-hour two-paper format.' },
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 3. Understanding the OPRA Exam Syllabus
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'understanding-opra-exam-syllabus',
    title: 'Understanding the OPRA Exam Syllabus and Content',
    description: 'A deep dive into the official OPRA exam syllabus. Discover the exact domains, percentage weightings, and clinical topics tested by the Australian Pharmacy Council.',
    author: 'Dr. Sarah Jenkins',
    date: 'January 28, 2026',
    readTime: '7 min read',
    keywords: 'OPRA exam syllabus, OPRA exam domains, APC OPRA exam, OPRA content outline, clinical pharmacy Australia',
    relatedSlugs: ['opra-exam-paper-1-and-2-breakdown', 'best-opra-exam-preparation-books', 'opra-exam-preparation-guide-2026'],
    content: [
      { type: 'h2', id: 'syllabus-overview', text: 'A Deep Dive into the Syllabus' },
      { type: 'p', text: 'Before opening a single textbook, you must familiarize yourself with the <a href="/blog/opra-exam-paper-1-and-2-breakdown">APC OPRA exam syllabus</a>. It is broken into interconnected domains assessing entirely different aspects of pharmacological and clinical proficiency.' },
      { type: 'h2', id: 'domain-weightings', text: 'Topic Domains and Percentage Weightings' },
      { type: 'h3', id: 'pharmaceutical-chemistry', text: 'Pharmaceutical Chemistry (~30%)' },
      { type: 'p', text: 'Tested exclusively in Paper 1, this covers physical pharmacy, analytical methods, organic chemistry nomenclature, and stereochemistry. Many candidates find this the most challenging domain due to its computational depth.' },
      { type: 'h3', id: 'pharmacology-physiology', text: 'Pharmacology and Physiology (~30%)' },
      { type: 'p', text: 'Also tested in Paper 1, this domain focuses on the autonomic nervous system, cardiovascular physiology, renal function, and how specific drug classes influence these systems at a receptor level.' },
      { type: 'alert', alertType: 'tip', text: 'For Paper 1, prioritize mastering pharmacokinetics calculations (half-life, loading dose, creatinine clearance). These appear across both domains and yield high marks. See our guide on <a href="/blog/can-you-use-a-calculator-in-opra-exam">using the on-screen calculator</a>.' },
      { type: 'cta' },
      { type: 'h3', id: 'therapeutics', text: 'Pharmaceutics and Therapeutics (~40%)' },
      { type: 'p', text: 'This represents the entirety of Paper 2. It requires you to know evidence-based medicine applications, exact dosing algorithms for common pathologies (Asthma, Hypertension, Diabetes) based on Australian guidelines, and adverse event management.' },
      { type: 'h2', id: 'conclusion', text: 'Focus Your Energy Strategically' },
      { type: 'p', text: 'Knowing the syllabus weightings enables you to prioritize high-yield topics. Reference our complete <a href="/blog/best-opra-exam-preparation-books">list of the best OPRA preparation books</a> to map resources to each domain.' },
    ],
    faqs: [
      { question: 'Does the OPRA test Australian laws and ethics?', answer: 'The core OPRA exam (administered by the APC) focuses on pharmaceutical sciences and clinical therapeutics — it does not primarily test pharmacy law. The Ahpra board exam during your internship covers law and ethics in depth.' },
      { question: 'Is the 2026 OPRA syllabus the same as 2025?', answer: 'The APC periodically updates its assessment blueprint. Always download the most current content guide from the official APC website (pharmacy.org.au) before commencing your study. Minor updates in high-priority therapeutics areas are common.' },
      { question: 'Which domain causes the most failure in the OPRA exam?', answer: 'Anecdotally, <strong>Pharmaceutics and Therapeutics (Paper 2)</strong> accounts for the majority of overall failures. Candidates struggle to apply AMH-based therapeutic algorithms to multi-step patient case scenarios under time pressure.' },
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 4. OPRA vs KAPS
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'opra-vs-kaps-exam-difference-2026',
    title: 'OPRA vs KAPS Exam: Everything You Need to Know for 2026',
    description: 'Understand the fundamental differences between the retired KAPS exam and the new OPRA exam. Essential guidance for transitioning candidates.',
    author: 'Dr. Sarah Jenkins',
    date: 'March 24, 2026',
    readTime: '6 min read',
    keywords: 'OPRA vs KAPS, KAPS exam retired, OPRA exam difficulty, Australian Pharmacy Council OPRA',
    relatedSlugs: ['opra-exam-preparation-guide-2026', 'understanding-opra-exam-syllabus', 'best-opra-exam-preparation-books'],
    content: [
      { type: 'h2', text: 'The Shift from KAPS to OPRA' },
      { type: 'p', text: 'For years, international pharmacists relied on the Knowledge Assessment of Pharmaceutical Sciences (KAPS) to prove their competence. The Australian Pharmacy Council (APC) has now permanently retired KAPS, replacing it with the <a href="/blog/opra-exam-preparation-guide-2026">Overseas Pharmacist Readiness Assessment (OPRA)</a>.' },
      { type: 'alert', alertType: 'warning', text: 'KAPS is permanently retired. Do <strong>not</strong> purchase or use KAPS preparation materials for the OPRA exam. The content emphasis, question formats, and clinical expectations are fundamentally different.' },
      { type: 'h2', text: 'Why did the APC make this change?' },
      { type: 'p', text: 'The KAPS exam heavily tested theoretical rote memorization of anatomy, organic chemistry, and cellular physiology. Modern Australian pharmacy practice requires intense clinical reasoning and patient-centered decision making. OPRA was designed to bridge this gap.' },
      { type: 'h3', text: 'Key Differences in Examination Structure' },
      { type: 'list', items: [
        '<strong>KAPS:</strong> Heavily theory-based, recall-heavy, 2 papers (100 MCQs each).',
        '<strong>OPRA Paper 1:</strong> Sciences foundation — still includes chemistry but more computationally applied.',
        '<strong>OPRA Paper 2:</strong> Almost entirely clinical case studies based on the <a href="/blog/best-opra-exam-preparation-books">Australian Medicines Handbook (AMH)</a>.',
      ]},
      { type: 'cta' },
      { type: 'h2', text: 'Should I study differently?' },
      { type: 'p', text: 'Absolutely. Memorizing structures no longer guarantees a pass. You must study complex clinical case scenarios, dosage adjustments for special populations (renal/hepatic impairment), and drug-drug interactions.' },
    ],
    faqs: [
      { question: 'Is there any overlap between KAPS and OPRA preparation materials?', answer: 'There is partial overlap in Pharmaceutical Chemistry and Pharmacology domains. However, all Therapeutics content must be sourced exclusively from Australian resources (AMH, eTG) — KAPS books are insufficient for OPRA Paper 2.' },
      { question: 'Can I still take the KAPS exam in 2026?', answer: 'No. The KAPS exam is officially retired and no further sittings are offered. All international pharmacy graduates seeking Australian registration must now complete the OPRA assessment.' },
      { question: 'My KAPS results are already registered with the APC. Do I still need to do OPRA?', answer: 'If you hold a valid, unexpired KAPS result that was accepted by the APC before the cutoff, you may be exempt. Contact the APC directly at pharmacy.org.au to verify your individual eligibility status.' },
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 5. Best OPRA Preparation Books
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'best-opra-exam-preparation-books',
    title: 'Top 5 OPRA Exam Preparation Books and Resources',
    description: 'The definitive list of the best books, clinical references, and study materials required to pass the OPRA exam in Australia.',
    author: 'Michael Nguyen',
    date: 'March 20, 2026',
    readTime: '7 min read',
    keywords: 'OPRA exam books, AMH OPRA exam, OPRA study materials, best pharmacy books OPRA',
    relatedSlugs: ['understanding-opra-exam-syllabus', 'opra-exam-preparation-guide-2026', 'is-the-opra-exam-hard'],
    content: [
      { type: 'h2', text: 'Essential Texts for the OPRA Exam' },
      { type: 'p', text: 'Passing the OPRA exam requires the correct authorized texts. Relying on global pharmacology textbooks (Lippincott, Katzung) alone is insufficient because OPRA tests strict adherence to Australian clinical guidelines. Read our full <a href="/blog/understanding-opra-exam-syllabus">syllabus breakdown</a> to understand why.' },
      { type: 'h3', text: '1. Australian Medicines Handbook (AMH)' },
      { type: 'p', text: 'The AMH is the undisputed bible for the OPRA exam. Paper 2 heavily relies on AMH monographs. Understand contraindications, adverse effects, and comparative efficacy between drug classes as outlined in the AMH.' },
      { type: 'h3', text: '2. Australian Pharmaceutical Formulary (APF)' },
      { type: 'p', text: 'Critical for counseling guidelines, extemporaneous dispensing, and legal Australian drug classifications. OPRA examiners frequently use APF counseling points for multiple-choice distractors.' },
      { type: 'h3', text: '3. Therapeutic Guidelines (eTG)' },
      { type: 'p', text: 'While the AMH provides drug monographs, the eTG dictates standard treatment algorithms for diseases (e.g., first-line antihypertensives). The OPRA exam assumes you understand these algorithms for Paper 2.' },
      { type: 'alert', alertType: 'tip', text: 'Do not read the AMH cover-to-cover. When practicing OPRA mock questions, cross-reference every incorrect answer against the specific AMH monograph. This "error-linked reading" method is the most efficient way to build clinical memory.' },
      { type: 'cta' },
      { type: 'h3', text: '4. Rang & Dale\'s Pharmacology' },
      { type: 'p', text: 'An excellent supplementary text for building your pharmacokinetics and mechanism-of-action foundations required for Paper 1. Keep a bookmark on chapters covering the ANS, CNS drugs, and cardiovascular therapeutics.' },
      { type: 'h3', text: '5. OPRA Practice Question Banks' },
      { type: 'p', text: 'Dedicated OPRA MCQ banks are indispensable. Combined with the books above, targeted question practice is how you discover knowledge gaps and develop the 90-second-per-question pace you need.' },
    ],
    faqs: [
      { question: 'Is the AMH free to access?', answer: 'The AMH is a paid subscription resource. However, many Australian state library networks offer free digital access to the AMH Online for registered members. Check your local public library for complimentary access options.' },
      { question: 'Can I use Lippincott as my primary pharmacology book?', answer: 'Lippincott\'s Illustrated Reviews: Pharmacology is an excellent supplementary source for mechanism of action. However, it is <strong>not</strong> sufficient as a primary resource because it does not reflect Australian therapeutic guidelines tested in Paper 2.' },
      { question: 'Which edition of the AMH should I use?', answer: 'Always use the most recent edition. The AMH is updated annually. Using an outdated edition risks studying superseded drug recommendations that no longer align with current APC exam expectations.' },
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 6. Is the OPRA Exam Hard?
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'is-the-opra-exam-hard',
    title: 'Is the OPRA Exam Hard? A Detailed Difficulty Analysis',
    description: 'An honest breakdown of the OPRA exam difficulty level, pass rates, and the most challenging syllabus domains for international pharmacists.',
    author: 'Dr. Sarah Jenkins',
    date: 'March 18, 2026',
    readTime: '5 min read',
    keywords: 'is OPRA exam hard, OPRA pass rate, OPRA difficulty, OPRA vs KAPS difficulty',
    relatedSlugs: ['how-to-pass-opra-exam-first-try', 'what-is-a-good-score-for-opra-exam', 'opra-exam-day-checklist'],
    content: [
      { type: 'h2', text: 'Understanding the Difficulty of OPRA' },
      { type: 'p', text: 'The OPRA exam is explicitly designed as a rigorous, high-stakes barrier to entry, ensuring only highly competent pharmacists practice in Australia. It is significantly harder than undergraduate pharmacy finals for most international candidates.' },
      { type: 'h2', text: 'Why do candidates fail the OPRA exam?' },
      { type: 'list', items: [
        'Failing to adapt to the <a href="/blog/best-opra-exam-preparation-books">Australian AMH/eTG clinical context</a>.',
        'Running out of time — only 90 seconds per question.',
        'Underestimating Paper 2\'s multi-step case complexity.',
        'Using outdated <a href="/blog/opra-vs-kaps-exam-difference-2026">KAPS preparation materials</a>.',
      ]},
      { type: 'h3', text: 'The Time Pressure Element' },
      { type: 'p', text: 'With 120 questions per 3-hour paper, you have exactly 90 seconds per question. The difficulty stems from reading extensive multi-paragraph clinical case studies and performing pharmacokinetic calculations within that constraint.' },
      { type: 'alert', alertType: 'warning', text: 'Do not underestimate endurance. The OPRA consists of 6 hours of MCQ examination in a single day. Physical fatigue significantly degrades clinical decision-making in the latter half of Paper 2. Train your stamina through full-length mock sessions.' },
      { type: 'cta' },
      { type: 'h2', text: 'How does OPRA compare to the Ahpra pre-registration board exams?' },
      { type: 'p', text: 'The <a href="/blog/australian-pharmacist-general-registration">Ahpra board exam</a> after your internship is narrowly focused on pharmacy law, ethics, and OSCE clinical stations. The OPRA exam is far broader and academically more demanding — it covers the entire pharmaceutical sciences spectrum.' },
    ],
    faqs: [
      { question: 'Is the OPRA exam harder than KAPS?', answer: 'Most candidates who transitioned from KAPS to OPRA preparation report that the OPRA is harder overall. While Paper 1 is comparable, <strong>Paper 2 of OPRA is considered significantly more clinically complex</strong> than the equivalent KAPS paper due to its scenario-based case format.' },
      { question: 'What is the OPRA exam pass rate?', answer: 'The APC does not publicly publish official pass rate figures. Community estimates suggest a significant minority of candidates (potentially 20–40%) do not pass on their first attempt, reinforcing the importance of structured, Australian-specific preparation.' },
      { question: 'Can I appeal if I fail the OPRA exam?', answer: 'The APC provides a formal appeals and review process for candidates who believe there was an administrative error in their result. A personal reconsideration of borderline marks is also available at an additional fee.' },
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 7. Document Evaluation Process
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'opra-document-evaluation-process',
    title: 'How to Apply for the OPRA Document Evaluation Process',
    description: 'A step-by-step guide to navigating the Australian Pharmacy Council Document Evaluation process required before sitting the OPRA exam.',
    author: 'Michael Nguyen',
    date: 'March 15, 2026',
    readTime: '8 min read',
    keywords: 'OPRA document evaluation, APC skills assessment, OPRA exam eligibility',
    relatedSlugs: ['opra-exam-dates-and-test-centers', 'australian-pharmacist-general-registration', 'opra-exam-preparation-guide-2026'],
    content: [
      { type: 'h2', text: 'What is the APC Document Evaluation?' },
      { type: 'p', text: 'Before booking your <a href="/blog/opra-exam-dates-and-test-centers">OPRA exam date</a>, you must definitively prove your identity and academic qualifications to the Australian Pharmacy Council (APC). This is called the Document Evaluation process and serves as your formal entry point into Australian pharmacy registration.' },
      { type: 'h2', text: 'Required Documentation' },
      { type: 'list', items: [
        'Valid <strong>passport</strong> (certified color scan, all pages).',
        '<strong>Pharmacy degree certificate</strong> and full academic transcripts.',
        '<strong>Letter of Good Standing</strong> from your home registration board (if registered).',
        'English language proficiency score (if required).',
        'Evidence of any postgraduate study or internship.',
      ]},
      { type: 'alert', alertType: 'warning', text: 'Documents must be certified by an authorized notary or JP. The APC does <strong>not</strong> accept standard photocopies or uncertified color scans. Submitting incorrect documentation restarts the 8-week processing clock.' },
      { type: 'h3', text: 'Letter of Good Standing' },
      { type: 'p', text: 'If you are registered as a pharmacist in your home country, your domestic pharmacy board must send a Letter of Good Standing directly to the APC. This proves you have no disciplinary actions on record.' },
      { type: 'cta' },
      { type: 'h2', text: 'Processing Times and Fees' },
      { type: 'p', text: 'The Document Evaluation fee is approximately <strong>$1,310 AUD</strong>. Processing takes approximately 8 weeks from the date all correct documentation is received. You cannot book your OPRA exam date until this process is marked complete by the APC.' },
    ],
    faqs: [
      { question: 'Does the APC conduct Document Evaluation online?', answer: 'Yes. The APC manages the entire application portal online via their website (pharmacy.org.au). All certified document uploads are submitted digitally. However, original documents may be requested for physical verification in specific cases.' },
      { question: 'Can I start studying for OPRA while my documents are being processed?', answer: 'Absolutely — and you should. The 8-week document processing window is valuable study time. Begin your AMH review and pharmacology fundamentals immediately while awaiting your eligibility confirmation.' },
      { question: 'What if my pharmacy degree was taught in a language other than English?', answer: 'All academic documents not originally in English must be accompanied by a certified English translation. The APC accepts translations from NAATI-certified translators only (the National Accreditation Authority for Translators and Interpreters).' },
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 8. Paper 1 & Paper 2 Breakdown
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'opra-exam-paper-1-and-2-breakdown',
    title: 'Understanding the OPRA Syllabus: Paper 1 & Paper 2 Breakdown',
    description: 'A comprehensive structural breakdown of OPRA Paper 1 and Paper 2, exploring pharmaceutical chemistry, physiology, and therapeutics.',
    author: 'Dr. Sarah Jenkins',
    date: 'March 10, 2026',
    readTime: '9 min read',
    keywords: 'OPRA exam papers, OPRA Paper 1, OPRA Paper 2, OPRA syllabus breakdown',
    relatedSlugs: ['understanding-opra-exam-syllabus', 'can-you-use-a-calculator-in-opra-exam', 'best-opra-exam-preparation-books'],
    content: [
      { type: 'h2', text: 'The Dual-Paper Structure' },
      { type: 'p', text: 'The OPRA exam is an endurance test split across two 120-question papers taking place on a single day. Understanding each paper\'s scope is fundamental to any good <a href="/blog/opra-exam-preparation-guide-2026">preparation plan</a>.' },
      { type: 'h2', text: 'Paper 1: The Sciences Foundation' },
      { type: 'p', text: 'Paper 1 is weighted towards Pharmaceutical Chemistry (~30%) and Pharmacology/Physiology (~30%). You must navigate organic nomenclature, identify stereocenters attached to drug activity, and understand intricate hepatic/renal physiological processes.' },
      { type: 'h3', text: 'Pharmacokinetics — The High-Yield Sub-Domain' },
      { type: 'p', text: 'Expect advanced pharmacokinetic calculations encompassing half-life, volume of distribution, and clearance mechanisms. Master these formulas using the <a href="/blog/can-you-use-a-calculator-in-opra-exam">on-screen calculator</a> — physical calculators are not permitted.' },
      { type: 'alert', alertType: 'tip', text: 'Dedicate at least 40% of your Paper 1 study time to pharmacokinetics. Questions in this area appear consistently across both the Chemistry and Pharmacology domains and are high-yield marks.' },
      { type: 'cta' },
      { type: 'h2', text: 'Paper 2: Clinical Execution' },
      { type: 'p', text: 'Paper 2 focuses exclusively on Pharmaceutics and Therapeutics (~40%). This paper presents large, multi-variable patient case studies. You must identify the safest, most efficacious Australian drug choice based on the <a href="/blog/best-opra-exam-preparation-books">AMH and eTG</a>.' },
      { type: 'list', items: [
        'First-line vs second-line drug selection for chronic diseases.',
        'Drug dosage adjustments in renal/hepatic impairment.',
        'Identifying and managing adverse drug reactions.',
        'Patient counseling on medications (from APF guidelines).',
      ]},
      { type: 'p', text: 'Paper 1 asks <em>"How does this drug work?"</em> while Paper 2 asks <em>"When and how should this drug be safely given to this specific patient?"</em>' },
    ],
    faqs: [
      { question: 'Are Paper 1 and Paper 2 taken on the same day?', answer: 'Yes. Both papers are administered at the Pearson VUE test center on the same day. You receive a scheduled break between papers. The entire examination experience, including check-in procedures and breaks, lasts approximately 7–8 hours.' },
      { question: 'Can I take Paper 1 and Paper 2 in different sittings?', answer: 'No. Both papers must be completed within the same examination window. If you are absent for one paper due to illness or emergency, you must apply to the APC for a special consideration, which may result in a deferred sitting.' },
      { question: 'Which paper is worth more marks?', answer: 'Each paper is marked independently. Your overall OPRA result is determined by your performance across both papers evaluated against the scaled competency threshold. Failing one paper severely impacts your overall outcome even with a strong performance in the other.' },
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 9. Good Score for OPRA
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'what-is-a-good-score-for-opra-exam',
    title: 'What is a Good Score for the OPRA Exam?',
    description: 'Analyze how the APC calculates OPRA exam scores, the scaled competency threshold, and what percentage you should aim for in mock tests.',
    author: 'Michael Nguyen',
    date: 'March 05, 2026',
    readTime: '6 min read',
    keywords: 'OPRA passing score, OPRA scaled score, OPRA pass marks, OPRA grading system',
    relatedSlugs: ['how-to-pass-opra-exam-first-try', 'is-the-opra-exam-hard', 'opra-exam-preparation-guide-2026'],
    content: [
      { type: 'h2', text: 'The Scaled Scoring System Explained' },
      { type: 'p', text: 'Unlike university exams, the OPRA exam does not use a raw percentage grade (e.g., exactly 50%). Instead, the APC uses sophisticated statistical scaling based on the probabilistic difficulty of questions selected for that specific session.' },
      { type: 'alert', alertType: 'info', text: 'Because scores are scaled, a "60% raw" in one exam window might be equivalent to a "55% raw" in another. This is a standard psychometric technique used to ensure fairness across cohorts. See our guide on <a href="/blog/opra-exam-preparation-guide-2026">how to prepare</a>.' },
      { type: 'h2', text: 'The Competency Threshold' },
      { type: 'p', text: 'Candidates receive a scaled score reported as "Competent" or "Not Yet Competent." The threshold ensures fairness regardless of whether a specific exam paper was statistically harder than a previous year\'s paper.' },
      { type: 'h3', text: 'Target Mock Score to Aim For' },
      { type: 'p', text: 'Because the exact raw score threshold varies, leading pharmacy educators recommend consistently scoring <strong>65%–70%</strong> on reputable, high-difficulty OPRA mock exams as a strong readiness indicator.' },
      { type: 'cta' },
      { type: 'h2', text: 'Understanding Domain-Level Competency' },
      { type: 'p', text: 'You cannot rely on acing Chemistry to compensate for completely failing Therapeutics. Review the <a href="/blog/understanding-opra-exam-syllabus">domain weightings</a> and ensure you meet baseline competency across all tested pillars.' },
      { type: 'list', items: [
        'Pharmaceutical Chemistry: target ≥ 65% on mock domain scores.',
        'Pharmacology &amp; Physiology: target ≥ 65% on mock domain scores.',
        'Pharmaceutics &amp; Therapeutics: target ≥ 70% given the highest weighting.',
      ]},
    ],
    faqs: [
      { question: 'What does "Not Yet Competent" mean on the OPRA result?', answer: '"Not Yet Competent" means you did not achieve the scaled passing threshold. The APC will provide a domain-level performance report so you can identify specific areas requiring remediation before re-sitting.' },
      { question: 'How soon after the exam do I get my result?', answer: 'OPRA results are typically released within 4–6 weeks of the examination date. The APC communicates results via a secure online portal notification to your registered email address.' },
      { question: 'Is there a limit on how many times I can sit the OPRA exam?', answer: 'The APC does not publicly impose a hard limit on the number of re-sits. However, candidates with multiple unsuccessful attempts may be subject to additional APC review or mandatory supervised preparation requirements.' },
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 10. Exam Dates & Test Centers
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'opra-exam-dates-and-test-centers',
    title: 'Test Centers and Dates for the 2026 OPRA Exam',
    description: 'Find out exactly when the 2026 OPRA exam is held, the registration deadlines, and where global Pearson VUE test centers are located.',
    author: 'Dr. Sarah Jenkins',
    date: 'February 28, 2026',
    readTime: '5 min read',
    keywords: 'OPRA exam dates 2026, OPRA test centers, Pearson VUE OPRA, OPRA registration',
    relatedSlugs: ['opra-document-evaluation-process', 'opra-exam-day-checklist', 'opra-exam-preparation-guide-2026'],
    content: [
      { type: 'h2', text: 'The 2026 OPRA Examination Schedule' },
      { type: 'p', text: 'The APC strictly administers the OPRA exam only three times per calendar year. Planning your study timeline around these fixed windows is the most important organizational step you will take. Ensure your <a href="/blog/opra-document-evaluation-process">Document Evaluation</a> is approved before attempting to register.' },
      { type: 'h3', text: '2026 Exam Windows' },
      { type: 'list', items: [
        '<strong>Session 1 — March 23–25, 2026</strong> (Spring). Ideal for candidates who have completed 3–4 months of structured study.',
        '<strong>Session 2 — July 13–15, 2026</strong> (Summer). Highest demand. Early registration strongly advised.',
        '<strong>Session 3 — November 23–25, 2026</strong> (Fall). Best option for candidates needing additional preparation time.',
      ]},
      { type: 'alert', alertType: 'warning', text: 'Registration for each window typically closes 4–6 weeks before the exam date. Late registrations are <strong>not</strong> accepted. Do not miss the deadline or you will need to wait for the next window.' },
      { type: 'cta' },
      { type: 'h2', text: 'Where can I take the OPRA exam?' },
      { type: 'p', text: 'The APC exclusively partners with Pearson VUE for delivery. Pearson VUE maintains secure testing centers in major cities worldwide including <strong>India, UAE, UK, Philippines, and South Africa</strong>, meaning you do not need to travel to Australia to sit the exam.' },
      { type: 'h2', text: 'Can I take the exam online remotely?' },
      { type: 'p', text: 'Under standard procedures, no. You must physically attend an authorized Pearson VUE center. See our full guide on <a href="/blog/opra-exam-day-checklist">what to expect on exam day</a>.' },
    ],
    faqs: [
      { question: 'How early should I arrive at the Pearson VUE center?', answer: 'Pearson VUE strongly recommends arriving at least 30 minutes before your scheduled exam time. Late arrivals may not be admitted and forfeit their examination fee. The check-in process includes biometric ID verification.' },
      { question: 'Can I reschedule my OPRA exam after booking?', answer: 'Yes, but rescheduling fees apply if you change your booking within a certain window before the exam date. Last-minute cancellations (within 24 hours) typically result in full fee forfeiture. Check Pearson VUE\'s current cancellation policy.' },
      { question: 'Do Pearson VUE centers provide exam instructions in languages other than English?', answer: 'No. All OPRA exam instructions, on-screen questions, and the testing interface are exclusively in English. There are no translation accommodations available during the examination session.' },
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 11. General Registration Pathway
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'australian-pharmacist-general-registration',
    title: 'How to Transition from OPRA to General Registration in Australia',
    description: 'Learn the exact legal steps required after passing the OPRA exam to achieve full General Registration as an Australian Pharmacist.',
    author: 'Michael Nguyen',
    date: 'February 20, 2026',
    readTime: '8 min read',
    keywords: 'Ahpra general registration, Pharmacy internship Australia, after OPRA exam, OPRA to Pharmacist',
    relatedSlugs: ['opra-document-evaluation-process', 'opra-exam-dates-and-test-centers', 'opra-exam-preparation-guide-2026'],
    content: [
      { type: 'h2', text: 'Congratulations — You Passed OPRA. What\'s Next?' },
      { type: 'p', text: 'Passing the <a href="/blog/opra-exam-preparation-guide-2026">OPRA exam</a> proves your core clinical competence to the APC, but you are not yet legally permitted to practice independently. The transition to a fully licensed Australian pharmacist involves several supervised practice requirements.' },
      { type: 'h2', text: 'Step 1: English Language Proficiency' },
      { type: 'p', text: 'Before applying for Provisional Registration, you must prove English proficiency. The Pharmacy Board of Australia (Ahpra) accepts IELTS (Academic), OET (Pharmacy-specific), PTE, and TOEFL iBT. Strict minimum bands apply (e.g., IELTS 7.0 across all components).' },
      { type: 'alert', alertType: 'info', text: 'English tests have validity periods (typically 2 years). Ensure your test results have not expired before submitting your application. OET is often preferred as it is pharmacist-specific and uses healthcare scenarios.' },
      { type: 'h3', text: 'Step 2: Provisional Registration & Internship' },
      { type: 'p', text: 'With your OPRA pass and English scores secured, find an employer to sponsor your pharmacy internship program (typically <strong>1,824 supervised clinical hours</strong>). With a signed employment contract, apply to Ahpra for Provisional Registration.' },
      { type: 'cta' },
      { type: 'h2', text: 'Step 3: Ahpra Board Examinations' },
      { type: 'p', text: 'At the culmination of your internship hours, you must pass the final Ahpra Pharmacy Board exams — a rigorous written exam focused on pharmacy law and an oral OSCE examination. Passing these grants unconditional General Registration.' },
    ],
    faqs: [
      { question: 'How long does the entire process take from OPRA to General Registration?', answer: 'The full process typically takes <strong>1.5 to 2.5 years</strong> after passing OPRA. This includes English testing, locating an internship employer, completing 1,824 supervised contact hours, and sitting the Ahpra board examinations.' },
      { question: 'Can I work in a pharmacy in Australia while holding only Provisional Registration?', answer: 'Yes. With Provisional Registration, you are legally permitted to perform pharmacist activities under the direct supervision of a registered pharmacist. You cannot operate independently or hold a Responsible Pharmacist position until you receive General Registration.' },
      { question: 'Does General Registration in Australia allow me to practice in other countries?', answer: 'Being registered with Ahpra may support skills assessment for New Zealand (as a mutual recognition arrangement exists), but does not automatically grant registration rights in other countries. Each jurisdiction has its own registration and assessment requirements.' },
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 12. Exam Day Checklist
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'opra-exam-day-checklist',
    title: 'The Ultimate OPRA Exam Day Checklist: What to Bring and Expect',
    description: 'A comprehensive guide on managing Pearson VUE exam day procedures, what documents to bring, and how to pace yourself through the 6-hour test.',
    author: 'Dr. Sarah Jenkins',
    date: 'February 10, 2026',
    readTime: '6 min read',
    keywords: 'OPRA exam day, Pearson VUE OPRA rules, OPRA checklist, what to bring OPRA',
    relatedSlugs: ['opra-exam-dates-and-test-centers', 'can-you-use-a-calculator-in-opra-exam', 'is-the-opra-exam-hard'],
    content: [
      { type: 'h2', text: 'The Reality of Exam Day' },
      { type: 'p', text: 'The OPRA exam is an extreme mental endurance test. Sitting through two 3-hour papers back-to-back in a secured testing facility generates immense fatigue. Knowing exactly what to expect is half the battle. Check the <a href="/blog/opra-exam-dates-and-test-centers">official exam dates</a> well in advance.' },
      { type: 'h2', text: 'Your Exam Day Checklist' },
      { type: 'list', items: [
        '✅ <strong>Valid primary photo ID</strong> (passport preferred). Both papers on the ID must be legible.',
        '✅ <strong>A secondary ID</strong> (credit card with name, national ID, or driver\'s license).',
        '✅ Confirmation of your Pearson VUE booking (email print or screenshot).',
        '✅ High-calorie snacks and water for the break between papers.',
        '✅ Comfortable, layered clothing. Testing center temperatures vary.',
      ]},
      { type: 'h3', text: 'Center Security Protocols' },
      { type: 'p', text: 'Expect airport-style security. All personal belongings (phones, watches, physical calculators, bags) must be secured outside the testing room. You will be provided with an erasable whiteboard booklet and marker for <a href="/blog/can-you-use-a-calculator-in-opra-exam">calculations</a>.' },
      { type: 'alert', alertType: 'warning', text: 'Pearson VUE requires <strong>two forms of valid ID</strong>. Digital copies, expired IDs, or photocopies will result in <strong>immediate denial of entry</strong> and forfeiture of your ~$2,230 AUD registration fee. Do not cut corners on this.' },
      { type: 'cta' },
      { type: 'h2', text: 'Pacing the 6-Hour Marathon' },
      { type: 'p', text: 'Hydrate effectively and eat complex carbohydrates during the break. Do not waste the break reviewing Paper 1 answers. Focus forward. Your performance in Paper 2 is what carries the most weight.' },
    ],
    faqs: [
      { question: 'Is there a break between Paper 1 and Paper 2?', answer: 'Yes. There is a scheduled break between the two papers. Break duration and schedule are determined by the APC and Pearson VUE. You will be escorted from the testing room and permitted to use the restroom and access your secured belongings during this period.' },
      { question: 'Can I leave the testing room during a paper?', answer: 'Exiting the testing room during an active paper is permitted only for supervised restroom breaks. However, the exam clock continues to run while you are outside. Use restroom breaks strategically and only when necessary.' },
      { question: 'What happens if I become ill on exam day?', answer: 'If you are unable to continue due to illness, immediately notify the test center supervisor. You should contact the APC as soon as possible following the event to request a Special Consideration application, which may allow a deferred sitting without financial penalty.' },
    ]
  },
  // ─────────────────────────────────────────────────────────────────────────
  // 13. Calculator Rules
  // ─────────────────────────────────────────────────────────────────────────
  {
    slug: 'can-you-use-a-calculator-in-opra-exam',
    title: 'Can You Use a Calculator in the OPRA Exam? Complete Rules',
    description: 'Detailed clarification regarding calculation questions, on-screen calculators, and Pearson VUE rules for the OPRA exam.',
    author: 'Michael Nguyen',
    date: 'February 05, 2026',
    readTime: '4 min read',
    keywords: 'OPRA exam calculator, OPRA calculations, Pearson VUE calculator OPRA',
    relatedSlugs: ['opra-exam-paper-1-and-2-breakdown', 'opra-exam-day-checklist', 'what-is-a-good-score-for-opra-exam'],
    content: [
      { type: 'h2', text: 'Calculations in Paper 1' },
      { type: 'p', text: 'Advanced pharmaceutical calculations are a core pillar of <a href="/blog/opra-exam-paper-1-and-2-breakdown">OPRA Paper 1</a>. You will be required to calculate loading doses, creatinine clearance rates, and complex pediatric weight-based titrations.' },
      { type: 'h2', text: 'The Calculator Rules (What Is and Is Not Allowed)' },
      { type: 'list', items: [
        '❌ <strong>Physical scientific calculators</strong> (Casio, Texas Instruments, etc.) — strictly prohibited.',
        '❌ <strong>Mobile phones</strong> — locked in your secured locker.',
        '✅ <strong>Pearson VUE on-screen basic calculator</strong> — built into the test software.',
        '✅ <strong>Erasable whiteboard booklet</strong> — provided for manual working.',
      ]},
      { type: 'alert', alertType: 'tip', text: 'During your preparation, intentionally practice all pharmacokinetic calculations using your operating system\'s <strong>default basic calculator</strong> (Windows Calculator or macOS Calculator). Do <em>not</em> rely on scientific calculators. This builds real exam muscle memory.' },
      { type: 'h3', text: 'Practicing with On-Screen Constraints' },
      { type: 'p', text: 'The Pearson VUE on-screen calculator lacks advanced scientific functions. You must master performing multi-step calculations using only addition, subtraction, multiplication, and division — and using your whiteboard for working.' },
      { type: 'cta' },
      { type: 'h2', text: 'The Golden Rule of Calculations' },
      { type: 'p', text: 'Never spend more than <strong>2 minutes on a single calculation question</strong>. With the 90-second average per question, burning 5 minutes on one math problem sacrifices several easy clinical questions in Paper 2. Flag difficult calculations, guess, and return if time permits.' },
    ],
    faqs: [
      { question: 'What types of calculations appear in the OPRA exam?', answer: 'Common calculation types include: <strong>creatinine clearance</strong> for renal dosing, <strong>loading and maintenance dose calculations</strong>, <strong>infusion rate calculations</strong>, <strong>pediatric weight-based dosing</strong>, and <strong>pharmacokinetic parameters</strong> (half-life, Vd, clearance).' },
      { question: 'How many calculation questions are in Paper 1?', answer: 'The APC does not specify the exact number of calculation questions. Most candidates report approximately 15–25 calculation-based questions across Paper 1, though this varies by session.' },
      { question: 'Can I use my own scratch paper in the OPRA exam?', answer: 'No. You are not permitted to bring any external paper into the testing room. The Pearson VUE center provides an erasable whiteboard notepad and marker for all working. Bring nothing into the room other than your IDs.' },
    ]
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find(post => post.slug === slug);
}
