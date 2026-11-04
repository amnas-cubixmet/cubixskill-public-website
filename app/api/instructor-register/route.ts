import { proxyAcademyRegistration } from '@/lib/server/academyRegistrationProxy';

export async function POST(request: Request) {
  return proxyAcademyRegistration(request, 'register/academy/');
}
