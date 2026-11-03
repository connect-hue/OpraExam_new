# SEO implementation and release notes

The source implements the SEO foundations, CMS publishing changes, conversion tracking and resource pages from the audit. The original audit is retained as a dated snapshot. Production deployment and database changes are separate release steps.

## Source changes

- `src/lib/site.ts` centralizes the preferred public origin and normalizes the historical apex-domain environment value to `https://www.opraexam.in`. Public metadata, robots, sitemap and schema use this identity; preview origins do not become canonical URLs.
- Blog metadata uses one title suffix, safe JSON-LD serialization and ISO timestamps. Future legacy publication dates are omitted from public date/schema output while the article remains accessible. Editorial timestamps are distinct from administrative updates.
- Public blog reads distinguish operational failure from missing content, so an outage is not converted into an empty sitemap or article deletion. Failed ISR regeneration can preserve the existing cached response. Site-content and FAQ readers retain built-in fallback content.
- CMS mutations validate input, sanitize rich text and invalidate public routes. Published article slugs are permanent; draft slug uniqueness checks use the record ID rather than overwriting the requested slug condition. A unique index is available through the migration script after duplicate checks.
- Headings and table-of-contents anchors are generated on the server. Pasted H1 markup is normalized; long introductory paragraphs are converted to paragraphs. Embedded video hosts are restricted and media loads lazily.
- Homepage content and public FAQs read the CMS. Homepage and syllabus FAQ schema use the corresponding visible content. Empty configured FAQ collections do not emit empty FAQ schema. Registration displays share one schedule with Sydney-time boundaries.
- Automatic professional-registration/clinical-review claims were removed. Verified author/reviewer profiles are configured in `src/data/authors.ts`; only the editorial organization is supplied. The CMS supports SEO titles, profiles, review dates and sources.
- New routes: `/fees`, `/practice`, `/editorial-policy`, `/authors/editorial-team`. The practice page and interactive quiz share the original question bank. Subject guides are linked from the syllabus; the footer links the new resources.
- Lead forms and quiz share response validation. Failed quiz submissions remain retryable. CRM follow-up is awaited with bounded timeouts and HTTP failures checked. Analytics captures successful accepted outcomes separately from duplicate/update outcomes and never receives form contact fields. Download clicks measure intent, not verified file delivery.
- Next.js and its ESLint configuration are pinned to 16.4.4 following the dependency audit. The previous 16.2.1 pin had a critical advisory. A scoped selector-parser patch override addresses the typography plugin's vulnerable dependency. Existing admin lint issues were corrected during validation.

## Configuration

Set `SITE_URL=https://www.opraexam.in` consistently in deployment configuration. Keep domain redirects on the hosting platform. Local `.env.local` values were not edited.

The CRM program identifier remains compatible with the current integration. `PHARMLLY_OPRA_PROGRAM` can override the legacy identifier when the CRM's accepted OPRA value has been confirmed. No live CRM submissions were made during testing.

Authors' professional details require verification before adding a Person profile or review claim. No individual registration information has been invented.

## Verification commands

```powershell
npm.cmd run lint
node node_modules/typescript/bin/tsc --noEmit --incremental false
npm.cmd test
npm.cmd run build
npm.cmd run start -- --port 3100 --hostname 127.0.0.1
```

With the built site running:

```powershell
npm.cmd run seo:check -- --base-url=http://127.0.0.1:3100
npm.cmd run test:e2e
```

Playwright uses installed Chrome by default and tests desktop and 390-pixel mobile layouts. Configure `PLAYWRIGHT_CHANNEL` for another installed supported channel if needed. Browser tests intercept lead requests and block external requests, including real analytics. Screenshots are stored in ignored `test-results/` directories.

The SEO checker crawls sitemap entries, compares blog discovery links, checks canonical identity, primary headings, JSON-LD date syntax and unknown-article 404 behavior. It is not a substitute for Google's Rich Results Test or Search Console indexing reports.

## Database migration

Review the proposed changes first:

```powershell
npm.cmd run seo:migrate -- --include-corrections
```

The default is read-only. It checks slugs, previews sanitization/date changes and optionally proposes replacements for the obsolete calculator and syllabus articles, the books article's pacing correction, and the identified legacy homepage claims. Other CMS copy is preserved. It does not invent missing or future publication dates. A version marker prevents rerunning an article correction from overwriting later editorial work.

The calculator article's publication date was changed to 3 November 2026 at the user's request, using the date-only apply mode below. The update was backed up and checked for concurrent edits. Other content corrections remain in the migration proposal for review before application. Other older educational claims still need editorial review.

```powershell
npm.cmd run seo:migrate -- --calculator-publication-date=2026-11-03 --date-only --apply
```

This optional date flag interprets the calendar day in Asia/Kolkata. The date-only mode updates only publication-date and associated modification fields for the calculator article.

After review and staging verification, applying the reviewed migration is an explicit operation:

```powershell
npm.cmd run seo:migrate -- --include-corrections --apply --create-index
```

The apply mode creates a local backup of original documents in ignored `backups/`, checks for concurrent edits before each update and optionally creates the unique slug index. A failure after some updates can leave a partially applied batch; inspect the output and backup before retrying. Do not share backups because they can include unpublished content. Back up the database independently through the normal database administration process too.

Run this from the intended checkout/environment. Restart/regenerate the deployed pages afterward: the standalone script does not share the deployment's Next.js cache. For deployment, apply the reviewed data migration and rebuild/redeploy so static pages and sitemap reflect the corrected records together. A code rollback does not revert database edits; restore only the necessary records from the backup after checking for subsequent edits.

## Release checks

1. Verify the preferred domain and required configuration on the deployment.
2. Review the migration dry run, proposed article corrections and identified homepage-copy corrections. Confirm the requested 3 November publication date is retained.
3. Apply the reviewed migration in staging and run the code, browser and HTTP checks.
4. Release the source and reviewed data updates together through the normal deployment process.
5. Run the SEO checker against production, verify redirects and inspect important URLs in Search Console. Submit the preferred-host sitemap.
6. Confirm conversion events in GA4 DebugView using a test property or controlled test session. Review organic landing pages and qualified leads over comparable periods.

No production deployment or index creation was performed. The requested calculator publication-date update was applied; the broader content migration was exercised only in dry-run mode against the existing 24 articles. Field Core Web Vitals, real analytics delivery, production CRM delivery, Google indexing and traffic improvement are not claimed by local tests.

## Recorded verification — 3 November 2026

- Production build, standalone TypeScript check and lint passed on Next.js 16.4.4.
- 19 unit/regression tests passed.
- Six browser tests passed across desktop and mobile, covering hydration/layout, quiz failure/retry, analytics and download gating. No real lead submissions were made.
- The local SEO crawl checked 37 public pages and all 24 linked blog articles with no reported errors.
- Production dependencies: `npm.cmd audit --omit=dev` reported zero vulnerabilities. The full development dependency tree still has existing advisories and should be maintained separately.
- The calculator date-only apply was backed up; a subsequent dry run reported no further date changes, and a live read showed November 3, 2026.
