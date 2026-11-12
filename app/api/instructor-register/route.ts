import { proxyInstructorRegistration } from '@/lib/server/instructorRegistrationProxy';

export async function POST(request: Request) {
  return proxyInstructorRegistration(request, 'instructor/register/');
}
