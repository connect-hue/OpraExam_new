import { NextResponse } from 'next/server';

interface LeadRequestBody {
  name: string;
  email: string;
  phone: string;
  qualification: string;
  source?: string;
  program?: string;
  tag?: string;
  city?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadRequestBody;
    const { name, email, phone, qualification, source, program, tag, city } = body;

    // Validation: Required fields as specified by user
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

    if (!qualification || !qualification.trim()) {
      return NextResponse.json(
        { success: false, error: 'Qualification is required.' },
        { status: 400 }
      );
    }

    // Prepare payload according to Pharmlly API specifications
    const pharmllyPayload = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      source: source || 'OPRAExam',
      qualification: qualification.trim(),
      program: program || 'OPRA Exam Preparation',
      tag: tag || 'opraexam',
      ...(city && { city: city.trim() }),
    };

    const baseUrl = process.env.PHARMLLY_API_BASE_URL || 'https://pharmlly.com';
    const accessKey = process.env.PHARMLLY_ACCESS_KEY;
    const secretKey = process.env.PHARMLLY_SECRET_KEY;

    // If API credentials are not yet configured in environment variables (e.g. initial dev setup)
    if (!accessKey || !secretKey) {
      console.warn(
        '[Pharmlly API] Warning: PHARMLLY_ACCESS_KEY or PHARMLLY_SECRET_KEY is not defined in environment variables. Simulating successful response in development mode.'
      );
      return NextResponse.json(
        {
          success: true,
          leadId: 'MOCK_DEV_' + Date.now(),
          message: 'Lead captured successfully (Development mode: API keys not configured).',
          isMock: true,
        },
        { status: 201 }
      );
    }

    // Call Pharmlly API
    const response = await fetch(`${baseUrl.replace(/\/$/, '')}/api/leads`, {
      method: 'POST',
      headers: {
        'x-api-access-key': accessKey,
        'x-api-secret-key': secretKey,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(pharmllyPayload),
    });

    const data = await response.json().catch(() => null);

    if (response.status === 201) {
      return NextResponse.json(
        {
          success: true,
          leadId: data?.leadId,
          message: data?.message || 'Lead created successfully on Pharmlly.',
        },
        { status: 201 }
      );
    }

    if (response.status === 409) {
      // 409 Conflict: Lead already exists in Pharmlly
      return NextResponse.json(
        {
          success: true,
          isDuplicate: true,
          leadId: data?.leadId,
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
    console.error('[Lead Submission API Error]', error);
    const message = error instanceof Error ? error.message : 'Internal Server Error';
    return NextResponse.json(
      {
        success: false,
        error: `Failed to process lead submission: ${message}`,
      },
      { status: 500 }
    );
  }
}
