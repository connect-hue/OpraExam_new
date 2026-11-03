import type { DbBlogPost } from '../db/blogs';
import { sanitizeBlocks, sanitizeRichText } from './html';
import { toIsoDate } from './dates';
import type { SiteContent } from '../../data/siteContent';

const apcGuide = 'https://www.pharmacycouncil.org.au/resources/opra-exam-guide-and-sample-content/';
const apcDay = 'https://www.pharmacycouncil.org.au/pharmacist/Exam-information/opra-exam-day-preparation/';

function editorialCorrection(post: DbBlogPost): Partial<DbBlogPost> | undefined {
  const slug = post.slug;
  if (slug === 'best-opra-exam-preparation-books') {
    const content = post.content.map(block => ({ ...block, ...(block.text ? { text: block.text.replace(/90-second-per-question/g, '75-second-per-question') } : {}) }));
    if (JSON.stringify(content) !== JSON.stringify(post.content)) return { content, sources: [...(post.sources || []), { label: 'APC OPRA exam structure and duration', url: apcGuide }] };
  }
  if (slug === 'can-you-use-a-calculator-in-opra-exam') return {
    description: 'Understand permitted OPRA calculators, on-screen tools and practical preparation tips, with links to current APC exam-day rules.',
    content: [
      { type: 'h2', text: 'Can you bring a calculator to OPRA?' },
      { type: 'p', text: '<p>APC permits a standard or scientific calculator. It must not have internet access, text-storage capability, a camera or video recording. Check the current APC instructions before choosing a device.</p>' },
      { type: 'h2', text: 'Which on-screen tools are available?' },
      { type: 'p', text: '<p>APC lists standard and scientific online calculators, alongside tools for notes, highlighting and reviewing questions. Pearson provides a whiteboard notebook and erasable marker at the test centre.</p>' },
      { type: 'h2', text: 'How to practise calculations' },
      { type: 'p', text: '<p>Practise unit conversions, dosage calculations and pharmacokinetic problems. Write each step, check units and estimate whether your answer is reasonable. Familiarise yourself with the available exam software tools.</p>' },
      { type: 'cta' },
    ],
    faqs: [{ question: 'Are scientific calculators prohibited?', answer: 'No. APC permits scientific and standard calculators that meet its restrictions. Check the official exam-day guidance for the current rules.' }],
    sources: [{ label: 'APC OPRA exam-day preparation', url: apcDay }],
  };
  if (slug === 'understanding-opra-exam-syllabus') return {
    description: 'Understand the five APC OPRA content areas, their question weightings and how to organise revision around the current blueprint.',
    content: [
      { type: 'h2', text: 'The five OPRA content areas' },
      { type: 'p', text: '<p>The current APC blueprint uses five content areas. It should not be replaced by the older three-group 30/30/40 breakdown.</p>' },
      { type: 'table', tableHeaders: ['Content area', 'Question weighting'], tableRows: [['Biomedical sciences', '20%'], ['Medicinal chemistry and biopharmaceutics', '10%'], ['Pharmacokinetics and pharmacodynamics', '10%'], ['Pharmacology and toxicology', '15%'], ['Therapeutics and patient care', '45%']] },
      { type: 'h2', text: 'Plan revision across the whole blueprint' },
      { type: 'p', text: '<p>Use the weightings to plan your revision while continuing to practise every area. Track weak topics using mixed questions and work through explanations after each attempt. Our <a href="/syllabus">detailed syllabus guide</a> connects the blueprint with preparation resources.</p>' },
      { type: 'cta' },
    ],
    faqs: [{ question: 'How many OPRA content areas are there?', answer: 'The APC blueprint lists five content areas. Refer to the official guide for current topics and question weightings.' }],
    sources: [{ label: 'APC OPRA exam guide and content specifications', url: apcGuide }],
  };
}

export function buildBlogMigration(post: DbBlogPost, now: string, includeCorrections = false, calculatorDate?: string) {
  const updates: Partial<DbBlogPost> = {};
  const warnings: string[] = [];
  if (calculatorDate && post.slug === 'can-you-use-a-calculator-in-opra-exam') {
    const publishedAt = toIsoDate(`${calculatorDate}T00:00:00+05:30`);
    if (!publishedAt || Date.parse(publishedAt) > Date.parse(now)) throw new Error('Choose a valid publication date that is not in the future.');
    const label = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'Asia/Kolkata' }).format(new Date(publishedAt));
    if (post.date !== label || post.publishedAt !== publishedAt) { updates.date = label; updates.publishedAt = publishedAt; }
  }
  const correction = includeCorrections && post.seoCorrectionVersion !== 1 ? editorialCorrection(post) : undefined;
  if (correction) updates.seoCorrectionVersion = 1;
  const content = sanitizeBlocks(correction?.content ?? post.content);
  const faqs = (correction?.faqs ?? post.faqs)?.map(faq => ({ ...faq, answer: sanitizeRichText(faq.answer) }));
  if (JSON.stringify(content) !== JSON.stringify(post.content)) updates.content = content;
  if (JSON.stringify(faqs) !== JSON.stringify(post.faqs)) updates.faqs = faqs;
  if (post.rawContent !== undefined) {
    const clean = correction ? '' : sanitizeRichText(post.rawContent);
    if (clean !== post.rawContent) updates.rawContent = clean;
  }
  if (correction && JSON.stringify(correction.sources) !== JSON.stringify(post.sources)) {
    updates.sources = correction.sources;
    if (correction.description !== undefined) updates.description = correction.description;
  }
  const published = toIsoDate(updates.publishedAt ?? post.publishedAt) ?? toIsoDate(post.date);
  if (published && Date.parse(published) <= Date.parse(now)) {
    if (post.published !== false && published !== post.publishedAt) updates.publishedAt = published;
  } else warnings.push('Publication date requires editorial verification; no replacement date was invented.');
  if (Object.keys(updates).length) {
    updates.updatedAt = now;
    if (updates.content || updates.faqs || updates.description || updates.date) updates.contentUpdatedAt = now;
  }
  return { updates, warnings };
}

/** Correct only the identified legacy CMS copy, preserving other editorial fields. */
export function buildSiteCopyMigration(content: Partial<SiteContent>): Partial<SiteContent> {
  if (!content.hero) return {};
  const hero = { ...content.hero };
  if (/mandatory exam for international pharmacists/i.test(hero.description)) hero.description = 'OPRA assesses the biomedical, pharmaceutical and clinical science knowledge of eligible overseas-qualified pharmacists. Check official APC guidance for the assessment pathway that applies to your qualifications.';
  if (Array.isArray(hero.perks)) hero.perks = hero.perks.map(perk => perk.replace(/Authentic Mock Practice Papers/g, 'Independent Mock Practice Papers'));
  return JSON.stringify(hero) === JSON.stringify(content.hero) ? {} : { hero };
}
