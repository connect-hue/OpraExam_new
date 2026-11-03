/** Read-only crawl; --base-url allows checking a local build with production canonicals. */
async function main() {
  const argument = (name: string) => process.argv.find(value => value.startsWith(`${name}=`))?.slice(name.length + 1);
  const base = new URL(argument('--base-url') || 'http://localhost:3000');
  const origin = new URL(argument('--expected-origin') || 'https://www.opraexam.in').origin;
  const errors: string[] = [];
  const get = async (path: string) => {
    const response = await fetch(new URL(path, base), { signal: AbortSignal.timeout(30000) });
    if (response.status !== 200) errors.push(`${path}: HTTP ${response.status}`);
    return response.text();
  };
  const xml = await get('/sitemap.xml');
  const robots = await get('/robots.txt');
  if (!robots.includes(`Sitemap: ${origin}/sitemap.xml`)) errors.push('robots.txt declares a different sitemap origin');
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
  if (!urls.length) errors.push('Sitemap is empty');
  if (new Set(urls).size !== urls.length) errors.push('Sitemap contains duplicate URLs');
  const listing = await get('/blog');
  const linkedArticles = [...new Set([...listing.matchAll(/href="(\/blog\/[^"?#]+)"/g)].map(match => match[1]))];
  for (const path of linkedArticles) if (!urls.includes(new URL(path, origin).href)) errors.push(`Missing sitemap entry: ${path}`);
  for (let index = 0; index < urls.length; index += 4) await Promise.all(urls.slice(index, index + 4).map(async url => {
    const location = new URL(url);
    if (location.origin !== origin) errors.push(`${url}: unexpected sitemap origin`);
    const html = await get(location.pathname);
    const canonicals = [...html.matchAll(/<link\b[^>]*rel="canonical"[^>]*href="([^"]+)"[^>]*>/g)];
    if (canonicals.length !== 1 || new URL(canonicals[0]?.[1] || '/', origin).href !== new URL(location.pathname, origin).href) errors.push(`${location.pathname}: missing or incorrect canonical`);
    if ([...html.matchAll(/<h1\b/g)].length !== 1) errors.push(`${location.pathname}: expected one primary heading`);
    for (const script of html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
      try {
        const json = JSON.parse(script[1]);
        const checkDates = (value: unknown): void => {
          if (!value || typeof value !== 'object') return;
          for (const [key, child] of Object.entries(value)) {
            if (['datePublished', 'dateModified'].includes(key) && typeof child === 'string' && (!/^\d{4}-\d{2}-\d{2}T/.test(child) || Number.isNaN(Date.parse(child)) || Date.parse(child) > Date.now())) errors.push(`${location.pathname}: invalid ${key}`);
            checkDates(child);
          }
        };
        checkDates(json);
      } catch { errors.push(`${location.pathname}: invalid JSON-LD`); }
    }
  }));
  const missing = await fetch(new URL('/blog/seo-check-nonexistent-20261103', base));
  if (missing.status !== 404) errors.push('Unknown article should return 404');
  console.log(JSON.stringify({ origin, pagesChecked: urls.length, linkedArticles: linkedArticles.length, errors }, null, 2));
  if (errors.length) process.exitCode = 1;
}
main().catch(error => { console.error(error instanceof Error ? error.message : 'SEO check failed'); process.exitCode = 1; });
