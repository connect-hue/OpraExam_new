type AnalyticsEvent = 'quiz_start' | 'quiz_complete' | 'generate_lead' | 'sample_paper_download_click';
type AnalyticsParameters = { placement?: string; question_count?: number; lead_outcome?: 'created' | 'updated' | 'duplicate' };

declare global {
  interface Window { gtag?: (...args: unknown[]) => void; dataLayer?: unknown[] }
}

/** Only allow explicit non-personal parameters; never pass a form payload here. */
export function trackEvent(name: AnalyticsEvent, parameters: AnalyticsParameters = {}) {
  if (typeof window === 'undefined' || window.location.pathname.startsWith('/admin')) return;
  const values = {
    page_path: window.location.pathname,
    ...(parameters.placement ? { placement: parameters.placement } : {}),
    ...(Number.isFinite(parameters.question_count) ? { question_count: parameters.question_count } : {}),
    ...(parameters.lead_outcome ? { lead_outcome: parameters.lead_outcome } : {}),
  };
  try {
    if (typeof window.gtag === 'function') window.gtag('event', name, values);
    else (window.dataLayer ??= []).push(['event', name, values]);
  } catch {
    // A third-party analytics failure must not interrupt an accepted lead or quiz.
  }
}
