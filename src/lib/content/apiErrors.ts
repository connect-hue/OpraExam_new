import { NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { ContentValidationError } from './blog';

export function contentErrorResponse(error: unknown) {
  if (error instanceof ContentValidationError) return NextResponse.json({ error: error.message }, { status: 400 });
  if (error instanceof ZodError) return NextResponse.json({ error: error.issues.map(issue => issue.message).join('; ') }, { status: 400 });
  if (error && typeof error === 'object' && 'code' in error && error.code === 11000) return NextResponse.json({ error: 'This article slug already exists.' }, { status: 409 });
  console.error('Content operation failed:', error instanceof Error ? error.name : 'Unknown error');
  return NextResponse.json({ error: 'Content service is temporarily unavailable. Please retry.' }, { status: 503 });
}
