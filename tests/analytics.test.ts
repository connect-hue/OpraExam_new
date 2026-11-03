import test from 'node:test';
import assert from 'node:assert/strict';
import { trackEvent } from '../src/lib/analytics';

test('analytics strips contact fields even when the caller passes an expanded object', () => {
  const events: unknown[][] = [];
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { location: { pathname: '/opra-quiz' }, gtag: (...args: unknown[]) => events.push(args) } });
  try {
    const expanded = { placement: 'opra-quiz', email: 'private@example.com', name: 'Private Name', phone: '9000000000' };
    trackEvent('generate_lead', expanded);
    assert.deepEqual(events[0], ['event', 'generate_lead', { page_path: '/opra-quiz', placement: 'opra-quiz' }]);
  } finally { Reflect.deleteProperty(globalThis, 'window'); }
});

test('a broken analytics integration cannot interrupt a successful user action', () => {
  Object.defineProperty(globalThis, 'window', { configurable: true, value: { location: { pathname: '/opra-quiz' }, gtag: () => { throw new Error('Third-party failure'); } } });
  try { assert.doesNotThrow(() => trackEvent('quiz_complete')); }
  finally { Reflect.deleteProperty(globalThis, 'window'); }
});
