import test from 'node:test';
import assert from 'node:assert/strict';
import { submitLead, type LeadPayload } from '../src/lib/leads/client';
import { POST } from '../src/app/api/leads/route';

const payload: LeadPayload = { name: 'Test Person', email: 'test@example.com', phone: '+91 9000000000', qualification: 'Pharmacy' };

test('client rejects HTTP failures, malformed success and network failure', async () => {
  for (const response of [Response.json({ success: true }, { status: 502 }), Response.json({ error: 'Failure' }), new Response('not JSON')]) {
    await assert.rejects(() => submitLead(payload, async () => response));
  }
  await assert.rejects(() => submitLead(payload, async () => { throw new Error('offline'); }));
});

test('client accepts a confirmed duplicate without pretending it is a new lead', async () => {
  const result = await submitLead(payload, async () => Response.json({ success: true, isDuplicate: true }));
  assert.equal(result.isDuplicate, true);
});

test('lead API rejects invalid input before contacting CRM', async () => {
  const response = await POST(new Request('https://example.com/api/leads', { method: 'POST', body: JSON.stringify({ name: 42 }) }));
  assert.equal(response.status, 400);
});

test('CRM HTTP failure cannot be promoted to success by an updated payload', async () => {
  const originalFetch = globalThis.fetch;
  const previous = Object.fromEntries(['PHARMLLY_API_BASE_URL', 'PHARMLLY_ACCESS_KEY', 'PHARMLLY_SECRET_KEY'].map(key => [key, process.env[key]]));
  Object.assign(process.env, { PHARMLLY_API_BASE_URL: 'https://crm.example', PHARMLLY_ACCESS_KEY: 'test-key', PHARMLLY_SECRET_KEY: 'test-secret' });
  try {
    globalThis.fetch = async () => Response.json({ action: 'updated' }, { status: 500 });
    const response = await POST(new Request('https://example.com/api/leads', { method: 'POST', body: JSON.stringify(payload) }));
    assert.equal(response.status, 502);
    assert.equal((await response.json()).success, false);
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(previous)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
  }
});

test('CRM follow-up is awaited and failure remains retryable', async () => {
  const originalFetch = globalThis.fetch;
  const previous = Object.fromEntries(['PHARMLLY_API_BASE_URL', 'PHARMLLY_ACCESS_KEY', 'PHARMLLY_SECRET_KEY'].map(key => [key, process.env[key]]));
  Object.assign(process.env, { PHARMLLY_API_BASE_URL: 'https://crm.example', PHARMLLY_ACCESS_KEY: 'test-key', PHARMLLY_SECRET_KEY: 'test-secret' });
  const methods: string[] = [];
  try {
    globalThis.fetch = async (_url, init) => { methods.push(init?.method || 'GET'); return init?.method === 'PATCH' ? Response.json({}, { status: 500 }) : Response.json({ leadId: 'test-id' }, { status: 201 }); };
    const response = await POST(new Request('https://example.com/api/leads', { method: 'POST', body: JSON.stringify(payload) }));
    assert.deepEqual(methods, ['POST', 'PATCH']);
    assert.equal(response.status, 502);
  } finally {
    globalThis.fetch = originalFetch;
    for (const [key, value] of Object.entries(previous)) { if (value === undefined) delete process.env[key]; else process.env[key] = value; }
  }
});
