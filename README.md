# OPRAExam.in

Independent OPRA examination information, preparation guides, practice questions and lead capture, built with Next.js 16, React 19, TypeScript and MongoDB.

## Local setup

Use a supported Node.js runtime; this checkout was validated with Node.js 24 on Windows.

1. Install dependencies with `npm.cmd install`.
2. Create `.env.local` with the intended environment's configuration. Never commit it.
3. Set `MONGODB_URI` and `MONGODB_DB`.
4. Set `SITE_URL=https://www.opraexam.in`. This is the public search identity, including for preview builds.
5. Configure private `ADMIN_SECRET_PIN` and `ADMIN_SESSION_SECRET` values before using the admin portal.
6. Configure `PHARMLLY_API_BASE_URL`, `PHARMLLY_ACCESS_KEY`, and `PHARMLLY_SECRET_KEY` for lead delivery. `PHARMLLY_OPRA_PROGRAM` may override the existing CRM program identifier after its accepted value is verified.
7. Set `NEXT_PUBLIC_GA_ID` when analytics is required.
8. Run `npm.cmd run dev`.

The public blog and sitemap require a working database for initial generation. Built-in site-content and FAQ defaults remain available when those optional CMS sections cannot be loaded.

## Checks

```powershell
npm.cmd run lint
node node_modules/typescript/bin/tsc --noEmit --incremental false
npm.cmd test
npm.cmd run build
```

Run the production build on localhost and inspect it:

```powershell
npm.cmd run start -- --port 3100 --hostname 127.0.0.1
npm.cmd run seo:check -- --base-url=http://127.0.0.1:3100
npm.cmd run test:e2e
```

Browser tests use installed Chrome by default, mock lead submission and block external traffic. Screenshots and failure traces go to ignored `test-results/`. Use `PLAYWRIGHT_CHANNEL` to select another installed supported browser channel.

## Editorial changes and deployment

See [SEO implementation and release notes](SEO-IMPLEMENTATION.md) for publishing behavior, migration previews, database backups, staging verification, deployment and Search Console checks. The migration defaults to read-only and requires an explicit `--apply` flag to write data. Do not run it against an unintended database.

The dated [SEO audit](SEO-AUDIT-2026-11-03.md) records the starting state; it is not a description of the current implementation.
