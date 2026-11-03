export type LeadPayload = {
  name: string; email: string; phone: string; qualification: string;
  educationQualification?: string; program?: string; source?: string; tag?: string; city?: string; notes?: string;
};
export type LeadResult = { success: true; message?: string; leadId?: string; isDuplicate?: boolean; isUpdated?: boolean };

export async function submitLead(payload: LeadPayload, request: typeof fetch = fetch): Promise<LeadResult> {
  const response = await request('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  const data = await response.json().catch(() => null);
  if (!response.ok || data?.success !== true) throw new Error(typeof data?.error === 'string' ? data.error : 'Your details could not be submitted. Please try again.');
  return data as LeadResult;
}
