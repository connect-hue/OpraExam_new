import { NextResponse } from 'next/server';

import { z } from 'zod';

const text = z.string().trim().max(500);
const leadSchema = z.object({
  name: text.min(1), email: z.email().max(254), phone: text.min(1),
  qualification: text.optional(), educationQualification: text.optional(),
  education_qualification: text.optional(), educationalQualification: text.optional(),
  source: text.optional(), program: text.optional(), tag: text.optional(), city: text.optional(), notes: text.optional(),
});

export async function POST(request: Request) {
  try {
    const parsed = leadSchema.safeParse(await request.json());
    if (!parsed.success) return NextResponse.json({ success: false, error: 'Please enter valid contact details.' }, { status: 400 });
    const body = parsed.data;
    const {
      name,
      email,
      phone,
      qualification,
      educationQualification,
      education_qualification,
      educationalQualification,
      source,
      program,
      tag,
      city,
      notes,
    } = body;

    // Validation: Required fields
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Full name is required.' },
        { status: 400 }
      );
    }

    if (!email || !email.trim()) {
      return NextResponse.json(
        { success: false, error: 'Email address is required.' },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid email address.' },
        { status: 400 }
      );
    }

    if (!phone || !phone.trim()) {
      return NextResponse.json(
        { success: false, error: 'Contact number is required.' },
        { status: 400 }
      );
    }

    const selectedEducation =
      educationQualification?.trim() ||
      education_qualification?.trim() ||
      educationalQualification?.trim() ||
      qualification?.trim() ||
      '';

    if (!selectedEducation) {
      return NextResponse.json(
        { success: false, error: 'Qualification is required.' },
        { status: 400 }
      );
    }

    // Prepare payload according to Pharmlly API specifications:
    // Qualification category is set to 'Pharmacy', while the user's selected degree is stored in education qualification.
    const pharmllyPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      source: source || 'OPRAExam',
      qualification: 'Pharmacy',
      educationQualification: selectedEducation,
      education_qualification: selectedEducation,
      educationalQualification: selectedEducation,
      program: program || process.env.PHARMLLY_OPRA_PROGRAM || 'KAPS for Australia',
      tag: tag || 'opraexam',
      upsert: true,
      updateIfExists: true,
      ...(city && { city: city.trim() }),
      ...(notes && { notes: notes.trim() }),
    };

    const baseUrl = process.env.PHARMLLY_API_BASE_URL;
    const accessKey = process.env.PHARMLLY_ACCESS_KEY;
    const secretKey = process.env.PHARMLLY_SECRET_KEY;

    // Check that all required environment variables are provided
    if (!baseUrl || !accessKey || !secretKey) {
      console.error(
        '[Pharmlly API Error] Missing environment configuration. Ensure PHARMLLY_API_BASE_URL, PHARMLLY_ACCESS_KEY, and PHARMLLY_SECRET_KEY are set.'
      );
      return NextResponse.json(
        {
          success: false,
          error: 'Server configuration error: Missing API environment variables.',
        },
        { status: 500 }
      );
    }

    // Call Pharmlly API to register lead / resubmission
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api/leads`, {
      method: 'POST',
      headers: {
        'x-api-access-key': accessKey,
        'x-api-secret-key': secretKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pharmllyPayload),
      signal: AbortSignal.timeout(10000),
    });

    const data = await response.json().catch(() => null);
    const leadId = data?.leadId || data?.lead?._id;

    // A successful-looking payload must not override a failed HTTP response.
    const accepted = (response.status === 200 || response.status === 201 || response.status === 409) && data && data.success !== false;
    if (!accepted) {
      console.error('CRM lead request rejected:', response.status);
      return NextResponse.json({ success: false, error: 'Your details could not be submitted. Please try again.' }, { status: 502 });
    }

    if (leadId) {
      const followUp = await fetch(`${baseUrl.replace(/\/$/, '')}/api/leads/${encodeURIComponent(leadId)}`, {
        method: 'PATCH',
        signal: AbortSignal.timeout(10000),
        headers: {
          'x-api-access-key': accessKey,
          'x-api-secret-key': secretKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          updates: {
            qualification: 'Pharmacy',
            Qualification: 'Pharmacy',
            program: program || process.env.PHARMLLY_OPRA_PROGRAM || 'KAPS for Australia',
            'Interested Program': program || process.env.PHARMLLY_OPRA_PROGRAM || 'KAPS for Australia',
            'First Name': name.trim(),
            firstName: name.trim(),
            'Lead Name': name.trim(),
            name: name.trim(),
            'Phone Number': phone.trim(),
            phone: phone.trim(),
            source: source || 'OPRAExam',
            'Lead Source': source || 'OPRAExam',
            tag: tag || 'opraexam',
            'Education Qualification': selectedEducation,
            educationQualification: selectedEducation,
            education_qualification: selectedEducation,
            educationalQualification: selectedEducation,
            data: {
              education_qualification: selectedEducation,
              educationQualification: selectedEducation,
              'Education Qualification': selectedEducation,
              educationalQualification: selectedEducation,
            },
            ...(city && { city: city.trim(), City: city.trim() }),
            ...(notes && { notes: notes.trim(), Notes: notes.trim() }),
          },
        }),
      });
      if (!followUp.ok) {
        console.error('CRM lead follow-up rejected:', followUp.status);
        return NextResponse.json({ success: false, error: 'Your details were received, but could not be fully saved. Please retry.' }, { status: 502 });
      }
    }

    // 201: Newly created lead
    if (response.status === 201) {
      return NextResponse.json(
        {
          success: true,
          leadId: leadId,
          message: data?.message || 'Lead created successfully on Pharmlly.',
        },
        { status: 201 }
      );
    }

    // 200: Existing lead updated
    if (response.status === 200) {
      return NextResponse.json(
        {
          success: true,
          isUpdated: true,
          leadId: leadId,
          message: data?.message || 'Lead updated successfully on Pharmlly.',
        },
        { status: 200 }
      );
    }

    // 409: Duplicate lead fallback
    if (response.status === 409) {
      return NextResponse.json(
        {
          success: true,
          isDuplicate: true,
          leadId: leadId,
          message: 'Thank you! Your information is already registered. Our OPRA counselor will reach out shortly.',
        },
        { status: 200 }
      );
    }

    // Handle any other Pharmlly API errors
    const errorMessage =
      data?.error || data?.message || `Pharmlly API responded with status ${response.status}`;
    console.error('[Pharmlly API Error]', response.status, data);

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: response.status >= 400 && response.status < 500 ? response.status : 502 }
    );
  } catch (error: unknown) {
    console.error('Lead submission failed:', error instanceof Error ? error.name : 'Unknown error');
    return NextResponse.json(
      {
        success: false,
        error: error instanceof SyntaxError ? 'Invalid request body.' : 'Your details could not be submitted. Please try again.',
      },
      { status: error instanceof SyntaxError ? 400 : 502 }
    );
  }
}
