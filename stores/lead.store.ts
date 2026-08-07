import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LeadType =
  | 'CubixSkill Demo'
  | 'Instructor Registration'
  | 'Academy Demo'
  | 'Course Inquiry'
  | 'Student Registration Inquiry'
  | 'Contact Form';

export type LeadStatus =
  | 'New'
  | 'Contacted'
  | 'Demo Scheduled'
  | 'Qualified'
  | 'Converted'
  | 'Closed'
  | 'Spam';

export interface LeadEntity {
  uuid: string;
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  country: string;
  academyName?: string;
  courseTitle?: string;
  courseUuid?: string;
  academyUuid?: string;
  studentCount?: string;
  courseCount?: string;
  currentPlatform?: string;
  mainRequirement?: string;
  preferredDate?: string;
  preferredTime?: string;
  timeZone?: string;
  message?: string;
  leadType: LeadType;
  status: LeadStatus;
  source: string;
  campaign?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BookDemoInput {
  fullName: string;
  email: string;
  countryCode: string;
  phone: string;
  country: string;
  academyName: string;
  studentCount: string;
  courseCount: string;
  currentPlatform: string;
  mainRequirement: string;
  preferredDate: string;
  preferredTime: string;
  timeZone: string;
  message?: string;
  source?: string;
}

interface LeadStoreState {
  leads: LeadEntity[];
  createBookDemoLead: (input: BookDemoInput) => string;
  createInstructorRegLead: (data: Partial<LeadEntity>) => string;
  createAcademyDemoLead: (academyUuid: string, data: Partial<LeadEntity>) => string;
  createCourseInquiryLead: (academyUuid: string, courseUuid: string, data: Partial<LeadEntity>) => string;
  updateLeadStatus: (uuid: string, status: LeadStatus) => void;
  getLeadsByAcademy: (academyUuid?: string) => LeadEntity[];
}

const INITIAL_LEADS: LeadEntity[] = [
  {
    uuid: 'lead-001',
    fullName: 'David Miller',
    email: 'david.miller@techcorp.io',
    countryCode: '+1',
    phone: '4155552671',
    country: 'United States',
    academyName: 'Apex Data Science Institute',
    studentCount: '100-500',
    courseCount: '5-10',
    currentPlatform: 'Teachable',
    mainRequirement: 'Integrated OMR Quizzes & QR Certificate Verification',
    preferredDate: '2026-08-15',
    preferredTime: '14:00',
    timeZone: 'EST (UTC-5)',
    message: 'Looking for a comprehensive platform to migrate 350 active students and host live classes.',
    leadType: 'CubixSkill Demo',
    status: 'Demo Scheduled',
    source: 'Website Book Demo',
    createdAt: '2026-08-04T10:15:00.000Z',
    updatedAt: '2026-08-05T11:30:00.000Z',
  },
  {
    uuid: 'lead-002',
    fullName: 'Ananya Deshmukh',
    email: 'ananya@codeverse.in',
    countryCode: '+91',
    phone: '9876543210',
    country: 'India',
    academyName: 'CodeVerse Software Academy',
    studentCount: '500-1000',
    courseCount: '10-25',
    currentPlatform: 'Custom LMS',
    mainRequirement: 'Personal Chat with Instructors & Multi-Instructor Staff Support',
    preferredDate: '2026-08-12',
    preferredTime: '11:00',
    timeZone: 'IST (UTC+5:30)',
    message: 'We are expanding to 800 students this quarter. Need custom white-label website builder.',
    leadType: 'Instructor Registration',
    status: 'New',
    source: 'Instructor Registration Form',
    createdAt: '2026-08-05T16:20:00.000Z',
    updatedAt: '2026-08-05T16:20:00.000Z',
  },
  {
    uuid: 'lead-003',
    fullName: 'Marcus Vance',
    email: 'marcus@vancecloud.co',
    countryCode: '+44',
    phone: '7911123456',
    country: 'United Kingdom',
    academyName: 'Vance Cloud Academy',
    courseTitle: 'Full Stack React 19 & Cloud Architecture',
    academyUuid: '550e8400-e29b-41d4-a716-446655440000',
    message: 'Can I get corporate group enrollment pricing for 15 engineers?',
    leadType: 'Course Inquiry',
    status: 'Qualified',
    source: 'Bright Academy Public Site',
    createdAt: '2026-08-06T08:45:00.000Z',
    updatedAt: '2026-08-06T09:10:00.000Z',
  },
];

export const useLeadStore = create<LeadStoreState>()(
  persist(
    (set, get) => ({
      leads: INITIAL_LEADS,

      createBookDemoLead: (input) => {
        const uuid = `lead-demo-${Date.now()}`;
        const now = new Date().toISOString();

        const newLead: LeadEntity = {
          uuid,
          fullName: input.fullName,
          email: input.email,
          countryCode: input.countryCode,
          phone: input.phone,
          country: input.country,
          academyName: input.academyName,
          studentCount: input.studentCount,
          courseCount: input.courseCount,
          currentPlatform: input.currentPlatform,
          mainRequirement: input.mainRequirement,
          preferredDate: input.preferredDate,
          preferredTime: input.preferredTime,
          timeZone: input.timeZone,
          message: input.message,
          leadType: 'CubixSkill Demo',
          status: 'New',
          source: input.source || 'CubixSkill Marketing Demo Form',
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({ leads: [newLead, ...state.leads] }));
        return uuid;
      },

      createInstructorRegLead: (data) => {
        const uuid = `lead-reg-${Date.now()}`;
        const now = new Date().toISOString();

        const newLead: LeadEntity = {
          uuid,
          fullName: data.fullName || 'Instructor Applicant',
          email: data.email || '',
          countryCode: data.countryCode || '+1',
          phone: data.phone || '',
          country: data.country || '',
          academyName: data.academyName,
          studentCount: data.studentCount,
          leadType: 'Instructor Registration',
          status: 'New',
          source: 'Instructor Multi-Step Registration',
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({ leads: [newLead, ...state.leads] }));
        return uuid;
      },

      createAcademyDemoLead: (academyUuid, data) => {
        const uuid = `lead-acad-demo-${Date.now()}`;
        const now = new Date().toISOString();

        const newLead: LeadEntity = {
          uuid,
          academyUuid,
          fullName: data.fullName || 'Academy Visitor',
          email: data.email || '',
          countryCode: data.countryCode || '+1',
          phone: data.phone || '',
          country: data.country || '',
          message: data.message,
          leadType: 'Academy Demo',
          status: 'New',
          source: `Academy Public Site (${academyUuid})`,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({ leads: [newLead, ...state.leads] }));
        return uuid;
      },

      createCourseInquiryLead: (academyUuid, courseUuid, data) => {
        const uuid = `lead-crs-${Date.now()}`;
        const now = new Date().toISOString();

        const newLead: LeadEntity = {
          uuid,
          academyUuid,
          courseUuid,
          courseTitle: data.courseTitle,
          fullName: data.fullName || 'Course Prospect',
          email: data.email || '',
          countryCode: data.countryCode || '+1',
          phone: data.phone || '',
          country: data.country || '',
          message: data.message,
          leadType: 'Course Inquiry',
          status: 'New',
          source: `Academy Course Page (${courseUuid})`,
          createdAt: now,
          updatedAt: now,
        };

        set((state) => ({ leads: [newLead, ...state.leads] }));
        return uuid;
      },

      updateLeadStatus: (uuid, status) => {
        const now = new Date().toISOString();
        set((state) => ({
          leads: state.leads.map((l) => (l.uuid === uuid ? { ...l, status, updatedAt: now } : l)),
        }));
      },

      getLeadsByAcademy: (academyUuid) => {
        if (!academyUuid) return get().leads;
        return get().leads.filter((l) => l.academyUuid === academyUuid || !l.academyUuid);
      },
    }),
    {
      name: 'cubixskill_public_lead_store_v1',
    }
  )
);
