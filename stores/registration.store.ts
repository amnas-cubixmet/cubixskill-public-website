import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface StudentRegistrationInput {
  academyUuid: string;
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  country: string;
  consentPasswordEmail: boolean;
  agreeTerms: boolean;
}

export interface StudentAccount {
  uuid: string;
  academyUuid: string;
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  country: string;
  passwordSetupToken: string;
  isPasswordSet: boolean;
  createdAt: string;
}

interface RegistrationStoreState {
  registeredStudents: StudentAccount[];
  registerStudent: (input: StudentRegistrationInput) => { success: boolean; token?: string; error?: string };
  verifySetupToken: (token: string) => StudentAccount | undefined;
  completePasswordSetup: (token: string, password: string) => boolean;
}

const INITIAL_STUDENTS: StudentAccount[] = [
  {
    uuid: 'usr-student-01',
    academyUuid: '550e8400-e29b-41d4-a716-446655440000',
    fullName: 'Alex Rivers',
    email: 'alex.rivers@gmail.com',
    countryCode: '+1',
    phone: '4155550199',
    country: 'United States',
    passwordSetupToken: 'token-alex-123',
    isPasswordSet: true,
    createdAt: '2026-08-01T10:00:00.000Z',
  },
];

export const useRegistrationStore = create<RegistrationStoreState>()(
  persist(
    (set, get) => ({
      registeredStudents: INITIAL_STUDENTS,

      registerStudent: (input) => {
        const existing = get().registeredStudents.find(
          (s) => s.email.toLowerCase() === input.email.toLowerCase() && s.academyUuid === input.academyUuid
        );

        if (existing) {
          return {
            success: false,
            error: 'An account with this email address already exists for this academy. Please log in.',
          };
        }

        const token = `setup-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const studentUuid = `usr-std-${Date.now()}`;
        const now = new Date().toISOString();

        const newStudent: StudentAccount = {
          uuid: studentUuid,
          academyUuid: input.academyUuid,
          fullName: input.fullName,
          email: input.email,
          countryCode: input.countryCode,
          phone: input.phone,
          country: input.country,
          passwordSetupToken: token,
          isPasswordSet: false,
          createdAt: now,
        };

        set((state) => ({ registeredStudents: [...state.registeredStudents, newStudent] }));

        return { success: true, token };
      },

      verifySetupToken: (token) => {
        return get().registeredStudents.find((s) => s.passwordSetupToken === token);
      },

      completePasswordSetup: (token, _password) => {
        const student = get().registeredStudents.find((s) => s.passwordSetupToken === token);
        if (!student) return false;

        set((state) => ({
          registeredStudents: state.registeredStudents.map((s) =>
            s.passwordSetupToken === token ? { ...s, isPasswordSet: true } : s
          ),
        }));

        return true;
      },
    }),
    {
      name: 'cubixskill_public_registration_store_v1',
    }
  )
);
