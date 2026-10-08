import { NextResponse } from 'next/server';

interface LeadRequestBody {
  name: string;
  email: string;
  phone: string;
  qualification?: string;
  educationQualification?: string;
  education_qualification?: string;
  educationalQualification?: string;
  source?: string;
  program?: string;
  tag?: string;
  city?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LeadRequestBody;
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
      program: program || 'OPRA for Australia',
      tag: tag || 'opraexam',
      upsert: true,
      updateIfExists: true,
      ...(city && { city: city.trim() }),
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
    });

    const data = await response.json().catch(() => null);
    const leadId = data?.leadId || data?.lead?._id;

    // Explicitly update the Lead Details in Pharmlly database to ensure fields (Qualification, Education Qualification, Program, Name, Phone) update in the CRM UI
    if (leadId) {
      try {
        await fetch(`${baseUrl.replace(/\/$/, '')}/api/leads/${leadId}`, {
          method: 'PATCH',
          headers: {
            'x-api-access-key': accessKey,
            'x-api-secret-key': secretKey,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            updates: {
              qualification: 'Pharmacy',
              Qualification: 'Pharmacy',
              program: program || 'OPRA for Australia',
              'Interested Program': program || 'OPRA for Australia',
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
            },
          }),
        });
      } catch (patchErr) {
        console.warn('[Pharmlly PATCH Warning] Could not patch lead details:', patchErr);
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
    if (response.status === 200 || data?.action === 'updated') {
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
