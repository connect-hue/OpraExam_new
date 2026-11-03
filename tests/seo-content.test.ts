import test from 'node:test';
import assert from 'node:assert/strict';
import { normalizeSiteOrigin, absoluteUrl } from '../src/lib/site';
import { serializeJsonLd } from '../src/lib/seo/structuredData';
import { publicationDate, modificationDate, toIsoDate } from '../src/lib/content/dates';
import { publicationTransition, validateBlogInput } from '../src/lib/content/blog';
import { prepareArticleContent } from '../src/lib/content/article';
import { sanitizeRichText } from '../src/lib/content/html';
import { buildBlogMigration, buildSiteCopyMigration } from '../src/lib/content/migration';
import { defaultSiteContent } from '../src/data/siteContent';
import { revalidatePublicContent } from '../src/lib/content/revalidate';
import { sessionSchedule, registrationPhase, examSessions, getEffectiveSessionStatus } from '../src/data/examSessions';
import type { DbBlogPost } from '../src/lib/db/blogs';
import { getPublishedBlogSummaries, getBlogBySlug, ContentUnavailableError } from '../src/lib/db/blogs';

test('canonical identity rejects unsafe origins and normalizes the redirecting domain', () => {
  assert.equal(normalizeSiteOrigin('https://opraexam.in/'), 'https://www.opraexam.in');
  for (const url of ['http://opraexam.in', 'https://u:p@opraexam.in', 'https://opraexam.in/blog', 'https://opraexam.in/?x=1']) assert.throws(() => normalizeSiteOrigin(url));
  assert.throws(() => absoluteUrl('//other.example'));
});

test('JSON-LD cannot close its HTML script and remains valid JSON', () => {
  const value = { title: '</script><script>alert(1)</script>' };
  const encoded = serializeJsonLd(value);
  assert.ok(!encoded.includes('<'));
  assert.deepEqual(JSON.parse(encoded), value);
});

test('publication dates survive administrative edits, with explicit date correction supported', () => {
  const previous = { published: true, publishedAt: '2026-01-01T00:00:00.000Z', date: 'January 1, 2026' };
  assert.equal(publicationTransition(previous, true, previous.date, '2026-11-03T00:00:00.000Z'), previous.publishedAt);
  assert.equal(publicationTransition(previous, true, 'January 2, 2026', '2026-11-03T00:00:00.000Z'), '2026-01-02T00:00:00.000Z');
  assert.equal(publicationTransition({}, false, undefined, '2026-11-03T00:00:00.000Z'), undefined);
  assert.equal(publicationTransition({}, true, undefined, '2026-11-03T00:00:00.000Z'), '2026-11-03T00:00:00.000Z');
  assert.equal(modificationDate({ ...previous, updatedAt: '2026-02-01' }), previous.publishedAt);
  assert.equal(publicationDate({ date: 'January 1, 2999' }), undefined);
  assert.equal(toIsoDate('February 31, 2026'), undefined);
  assert.equal(toIsoDate('2026-11-03T09:00:00'), undefined);
});

test('invalid CMS types and unknown reviewer identities cannot be written', () => {
  assert.throws(() => validateBlogInput({ published: 'false' }, true));
  assert.throws(() => validateBlogInput({ reviewerId: 'invented-reviewer' }, true));
  assert.throws(() => validateBlogInput({ date: 'January 1, 2999' }, true));
  assert.throws(() => validateBlogInput({ sources: [{ label: 'x', url: 'javascript:alert(1)' }] }, true));
  assert.deepEqual(validateBlogInput({ title: 'Updated title' }, true), { title: 'Updated title' });
});

test('rich content removes executable HTML and creates unique server anchors', () => {
  const { blocks, headings } = prepareArticleContent([
    { type: 'text', text: '<h1>Repeated &amp; useful</h1><script>alert(1)</script><a href="javascript:alert(1)">link</a><img src="https://example.com/a.jpg" onerror="alert(1)" />' },
    { type: 'h2', text: 'Repeated & useful' },
  ]);
  const html = blocks[0].text || '';
  assert.ok(!/<script|onerror|javascript:|<h1/.test(html));
  assert.ok(html.includes('loading="lazy"'));
  assert.deepEqual(headings.map(heading => heading.id), ['repeated-useful', 'repeated-useful-2']);
  assert.ok(html.includes('id="repeated-useful"'));
  assert.equal(headings[0].text, 'Repeated & useful');
  assert.ok(!sanitizeRichText('<iframe src="https://untrusted.example/embed"></iframe>').includes('src='));
});

test('migration is idempotent and flags future dates without inventing a date', () => {
  const post: DbBlogPost = { slug: 'test-post', title: 'Test', description: '', author: 'Editor', date: 'January 1, 2999', readTime: '', keywords: '', content: [{ type: 'text', text: '<p onclick="evil()">Text</p>' }] };
  const first = buildBlogMigration(post, '2026-11-03T00:00:00.000Z');
  assert.equal(first.updates.publishedAt, undefined);
  assert.equal(first.warnings.length, 1);
  assert.deepEqual(buildBlogMigration({ ...post, ...first.updates }, '2026-11-04T00:00:00.000Z').updates, {});
});

test('publishing invalidates listings, sitemap and related article pages', () => {
  const calls: [string, string?][] = [];
  revalidatePublicContent((path, type) => { calls.push([path, type]); });
  assert.ok(calls.some(([path]) => path === '/sitemap.xml'));
  assert.ok(calls.some(([path]) => path === '/blog'));
  assert.ok(calls.some(([path, type]) => path === '/blog/[slug]' && type === 'page'));
});

test('an applied correction does not overwrite later editorial changes', () => {
  const post: DbBlogPost = { slug: 'can-you-use-a-calculator-in-opra-exam', title: 'Calculator rules', description: '', author: 'Editor', date: 'January 1, 2026', readTime: '', keywords: '', content: [{ type: 'p', text: '<p>Original</p>' }] };
  const first = buildBlogMigration(post, '2026-11-03T00:00:00.000Z', true);
  const edited = { ...post, ...first.updates, content: [{ type: 'p' as const, text: '<p>A subsequent reviewed update.</p>' }] };
  assert.deepEqual(buildBlogMigration(edited, '2026-11-04T00:00:00.000Z', true).updates, {});
});

test('the requested calculator date uses the user calendar day and is idempotent', () => {
  const post: DbBlogPost = { slug: 'can-you-use-a-calculator-in-opra-exam', title: 'Calculator rules', description: '', author: 'Editor', date: 'December 31, 2026', publishedAt: '2026-12-31T00:00:00.000Z', readTime: '', keywords: '', content: [] };
  const first = buildBlogMigration(post, '2026-11-03T09:00:00.000Z', false, '2026-11-03');
  assert.equal(first.updates.date, 'November 3, 2026');
  assert.equal(first.updates.publishedAt, '2026-11-02T18:30:00.000Z');
  assert.deepEqual(first.warnings, []);
  assert.deepEqual(buildBlogMigration({ ...post, ...first.updates }, '2026-11-03T10:00:00.000Z', false, '2026-11-03').updates, {});
});

test('known legacy CMS claims are corrected without replacing unrelated copy', () => {
  const hero = { ...defaultSiteContent.hero, description: 'OPRA is the mandatory exam for international pharmacists.', perks: ['120-Question Authentic Mock Practice Papers'], badgeText: 'Retain this editorial badge' };
  const result = buildSiteCopyMigration({ hero });
  assert.ok(!result.hero?.description.includes('mandatory exam'));
  assert.equal(result.hero?.badgeText, hero.badgeText);
  assert.equal(result.hero?.perks[0], '120-Question Independent Mock Practice Papers');
  assert.deepEqual(buildSiteCopyMigration(result), {});
});

test('registration badges share exact Sydney-time boundaries', () => {
  const session = sessionSchedule[1];
  const close = Date.parse(session.registrationCloses);
  assert.equal(registrationPhase(session, close), 'open');
  assert.equal(registrationPhase(session, close + 1), 'closed');
  assert.equal(getEffectiveSessionStatus(examSessions[1], close + 1), 'closed');
});

test('missing content service is an operational failure, not an empty publication list or 404', async () => {
  const names = ['MONGODB_URI', 'MONGO_URI', 'MONGODB_URL', 'MONGO_URL'];
  const previous = names.map(name => process.env[name]);
  names.forEach(name => { process.env[name] = ''; });
  try {
    await assert.rejects(getPublishedBlogSummaries(), ContentUnavailableError);
    await assert.rejects(getBlogBySlug('known-article'), ContentUnavailableError);
  } finally {
    names.forEach((name, index) => { if (previous[index] === undefined) delete process.env[name]; else process.env[name] = previous[index]; });
  }
});
