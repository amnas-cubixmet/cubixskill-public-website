export interface InstructorRegistrationRequest {
  full_name: string;
  email: string;
  country_code: string;
  mobile: string;
  qualification: string;
  teaching_subjects: string;
  years_experience: number;
  bio: string;
}

interface RegistrationResponse {
  success?: boolean;
  message?: string;
  data?: { status?: 'pending_activation' };
  errors?: Partial<Record<keyof InstructorRegistrationRequest, string | string[]>>;
}

async function post(path: string, body: object) {
  try {
    const response = await fetch(path, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(20000),
    });
    const result: RegistrationResponse | null = await response.json().catch(() => null);
    return { status: response.status, result };
  } catch {
    return {
      status: 0,
      result: { message: 'Could not reach registration. Check your connection and try again.' },
    };
  }
}

export function registerInstructor(data: InstructorRegistrationRequest) {
  return post('/api/instructor-register', data);
}

export function resendInstructorSetup(email: string) {
  return post('/api/instructor-register/resend', { email });
}
