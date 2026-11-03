export function toIsoDate(value: unknown): string | undefined {
  if (!(typeof value === 'string' || value instanceof Date) || value === '') return undefined;
  let normalized: string | Date = value;
  if (typeof value === 'string') {
    const legacy = value.match(/^([A-Za-z]+) (\d{1,2}),? (\d{4})$/);
    if (legacy) {
      const months = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
      const month = months.indexOf(legacy[1].toLowerCase());
      if (month < 0) return undefined;
      normalized = `${legacy[3]}-${String(month + 1).padStart(2, '0')}-${legacy[2].padStart(2, '0')}`;
    }
    const calendar = String(normalized).match(/^(\d{4})-(\d{2})-(\d{2})(.*)$/);
    if (!calendar) return undefined;
    const day = new Date(Date.UTC(Number(calendar[1]), Number(calendar[2]) - 1, Number(calendar[3])));
    if (day.toISOString().slice(0, 10) !== calendar.slice(1, 4).join('-')) return undefined;
    if (calendar[4] && !/^T.*(?:Z|[+-]\d{2}:\d{2})$/.test(calendar[4])) return undefined;
  }
  const date = new Date(normalized);
  return Number.isNaN(date.getTime()) ? undefined : date.toISOString();
}

export type ArticleDates = {
  publishedAt?: string; date?: string; createdAt?: string; contentUpdatedAt?: string; updatedAt?: string;
};

export function publicationDate(post: ArticleDates): string | undefined {
  const date = toIsoDate(post.publishedAt) ?? toIsoDate(post.date) ?? toIsoDate(post.createdAt);
  // Keep a legacy future-dated article accessible without advertising a false date.
  return date && Date.parse(date) <= Date.now() ? date : undefined;
}

export function modificationDate(post: ArticleDates): string | undefined {
  // Legacy updatedAt did not distinguish editorial changes from administrative writes.
  return toIsoDate(post.contentUpdatedAt) ?? publicationDate(post);
}

export function displayDate(value?: string): string {
  const iso = toIsoDate(value);
  return iso ? new Intl.DateTimeFormat('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Australia/Sydney' }).format(new Date(iso)) : '';
}
