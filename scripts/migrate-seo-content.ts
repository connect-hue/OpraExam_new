import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { MongoClient } from 'mongodb';
import { buildBlogMigration, buildSiteCopyMigration } from '../src/lib/content/migration';
import type { DbBlogPost } from '../src/lib/db/blogs';
import type { SiteContent } from '../src/data/siteContent';

async function main() {
for (const name of ['.env.local', '.env']) if (existsSync(name)) process.loadEnvFile(name);
const apply = process.argv.includes('--apply');
const corrections = process.argv.includes('--include-corrections');
const calculatorDate = process.argv.find(value => value.startsWith('--calculator-publication-date='))?.split('=')[1];
const dateOnly = process.argv.includes('--date-only');
if (dateOnly && !calculatorDate) throw new Error('--date-only requires --calculator-publication-date=YYYY-MM-DD');
const uri = process.env.MONGODB_URI || process.env.MONGO_URI || process.env.MONGODB_URL || process.env.MONGO_URL;
if (!uri) throw new Error('Configure MongoDB before running this migration.');
const client = new MongoClient(uri.trim().replace(/^["']|["']$/g, ''), { serverSelectionTimeoutMS: 10000 });

try {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB || process.env.MONGO_DB || process.env.MONGODB_DB_NAME || process.env.MONGO_DB_NAME || process.env.MONGODB_DATABASE || 'opraexam');
  const blogs = db.collection('blogs');
  const settings = db.collection<Partial<SiteContent> & { _id: string; updatedAt?: string }>('site_content');
  const siteDocument = corrections && !dateOnly ? await settings.findOne({ _id: 'main_site_content' }) : null;
  const siteUpdates = siteDocument ? buildSiteCopyMigration(siteDocument) : {};
  const docs = await blogs.find({}).toArray();
  const now = new Date().toISOString();
  const seen = new Set<string>();
  const invalidSlugs = docs.filter(doc => !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(doc.slug) || seen.has(doc.slug) || !seen.add(doc.slug));
  if (invalidSlugs.length) throw new Error('Resolve invalid/duplicate slugs before migration or index creation.');
  const changes = docs.filter(doc => !dateOnly || doc.slug === 'can-you-use-a-calculator-in-opra-exam').map(doc => {
    const proposal = buildBlogMigration({ ...doc, _id: doc._id.toString() } as DbBlogPost, now, corrections, calculatorDate);
    if (dateOnly) {
      const allowed = ['date', 'publishedAt', 'updatedAt', 'contentUpdatedAt'];
      for (const key of Object.keys(proposal.updates)) if (!allowed.includes(key)) delete proposal.updates[key as keyof DbBlogPost];
      if (!proposal.updates.date && !proposal.updates.publishedAt) proposal.updates = {};
    }
    return { doc, ...proposal };
  });
  console.log(JSON.stringify({ mode: apply ? 'apply' : 'dry-run', includeCorrections: corrections, articles: docs.length, siteContentFields: Object.keys(siteUpdates), changes: changes.map(change => ({ slug: change.doc.slug, fields: Object.keys(change.updates), warnings: change.warnings })) }, null, 2));
  if (apply) {
    const directory = resolve('backups');
    mkdirSync(directory, { recursive: true });
    const backup = resolve(directory, `seo-content-${now.replace(/[:.]/g, '-')}.json`);
    writeFileSync(backup, JSON.stringify(dateOnly ? changes.map(change => change.doc) : { blogs: docs, siteContent: siteDocument }, null, 2), { flag: 'wx' });
    for (const { doc, updates } of changes) if (Object.keys(updates).length) {
      const result = await blogs.updateOne({ _id: doc._id, updatedAt: doc.updatedAt ?? { $exists: false } }, { $set: updates });
      if (!result.matchedCount) throw new Error(`Concurrent edit detected for ${doc.slug}; stopped without overwriting it.`);
    }
    if (siteDocument && Object.keys(siteUpdates).length) {
      const result = await settings.updateOne({ _id: siteDocument._id, updatedAt: siteDocument.updatedAt ?? { $exists: false } }, { $set: { ...siteUpdates, updatedAt: now } });
      if (!result.matchedCount) throw new Error('Concurrent site-content edit detected; stopped without overwriting it.');
    }
    if (process.argv.includes('--create-index')) await blogs.createIndex({ slug: 1 }, { unique: true });
    console.log('Migration applied with a local backup. Regenerate affected deployed routes after application.');
  } else console.log('Dry run only: no database records or indexes changed.');
} finally { await client.close(); }

}
main().catch(error => { console.error(error instanceof Error ? error.name + ": " + error.message : "Migration failed"); process.exitCode = 1; });
