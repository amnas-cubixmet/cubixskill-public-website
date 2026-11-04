import { NextResponse } from 'next/server';

type BackendEndpoint = 'register/academy/' | 'password/setup/resend/';

function resolveBackendBaseUrl(): string | null {
  const configured =
    process.env.CUBIXSKILL_BACKEND_URL?.trim() ||
    process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

  if (!configured && process.env.NODE_ENV === 'production') {
    return null;
  }

  const raw = configured || 'http://localhost:8000';
  try {
    const url = new URL(raw);
    const local = ['localhost', '127.0.0.1', '::1', '[::1]'].includes(url.hostname);
    if (!['https:', 'http:'].includes(url.protocol) || url.username || url.password ||
        url.search || url.hash || (process.env.NODE_ENV === 'production' && (local || url.protocol !== 'https:'))) {
      return null;
    }

    // Accept both bare server URLs and accidental /api/v1 suffix.
    const pathname = url.pathname.replace(/\/+$/, '').replace(/\/api\/v1$/, '');
    return url.origin + pathname;
  } catch {
    return null;
  }
}

export async function proxyAcademyRegistration(
  request: Request,
  endpoint: BackendEndpoint,
): Promise<NextResponse> {
  const baseUrl = resolveBackendBaseUrl();
  if (!baseUrl) {
    return NextResponse.json({
      success: false,
      message: 'Instructor registration is not configured. Please contact support.',
    }, { status: 503 });
  }

  if (!request.headers.get('content-type')?.toLowerCase().includes('application/json')) {
    return NextResponse.json({ success: false, message: 'JSON request required.' }, { status: 415 });
  }

  let body: string;
  try {
    body = await request.text();
    if (body.length > 8192) {
      return NextResponse.json({ success: false, message: 'Request is too large.' }, { status: 413 });
    }
    const parsed = JSON.parse(body);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
      return NextResponse.json({ success: false, message: 'Invalid form data.' }, { status: 400 });
    }
  } catch {
    return NextResponse.json({ success: false, message: 'Invalid JSON request.' }, { status: 400 });
  }

  try {
    const response = await fetch(`${baseUrl}/api/v1/auth/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
      cache: 'no-store',
      redirect: 'manual',
      signal: AbortSignal.timeout(15000),
    });
    const data = await response.json().catch(() => null);
    if (!data || typeof data !== 'object' || Array.isArray(data)) {
      return NextResponse.json({ success: false, message: 'Invalid response from registration service.' }, { status: 502 });
    }
    return NextResponse.json(data, { status: response.status >= 300 && response.status < 400 ? 502 : response.status });
  } catch {
    return NextResponse.json({
      success: false,
      message: 'Unable to connect to the registration service. Please try again later.',
    }, { status: 502 });
  }
}
