import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type LeadStatus = 'active' | 'converted' | 'expired' | 'deactivated';
export type InterestedStatus = 'hot' | 'warm' | 'cold';

export interface DemoLead {
  uuid: string;
  academyUuid: string;
  courseUuid: string;
  courseTitle: string;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
  status: LeadStatus;
  interestedStatus: InterestedStatus;
  demoStartDate: string;
  demoExpiryDate: string; // Default: 5 days from creation
  magicToken: string;
  loginUrl: string;
  lastLoginAt?: string;
  completionPercent: number;
  completedLessonUuids: string[];
  notes?: string;
  createdAt: string;
}

export interface DemoLeadInput {
  academyUuid: string;
  courseUuid: string;
  courseTitle: string;
  fullName: string;
  email: string;
  phone?: string;
  organization?: string;
}

export interface DemoLeadStats {
  totalRegistrations: number;
  activeDemoUsers: number;
  expiredDemos: number;
  conversionRate: number;
  completionRate: number;
  mostRequestedCourses: { title: string; count: number }[];
}

interface DemoLeadStoreState {
  leads: DemoLead[];
  createDemoLead: (input: DemoLeadInput) => { lead: DemoLead; token: string; loginUrl: string };
  extendDemoAccess: (leadUuid: string, extraDays: number) => void;
  deactivateDemoAccess: (leadUuid: string) => void;
  convertToPaidStudent: (leadUuid: string) => void;
  updateLeadNotes: (leadUuid: string, notes: string) => void;
  getLeadsByAcademy: (academyUuid: string) => DemoLead[];
  getStatsByAcademy: (academyUuid: string) => DemoLeadStats;
  getLeadByToken: (token: string) => DemoLead | undefined;
}

const INITIAL_DEMO_LEADS: DemoLead[] = [
  {
    uuid: 'lead-demo-101',
    academyUuid: '550e8400-e29b-41d4-a716-446655440000',
    courseUuid: '9c78bda1-98c2-4b11-8b81-92d3db12b501',
    courseTitle: 'Full-Stack Web Development Bootcamp',
    fullName: 'Sophia Chen',
    email: 'sophia.chen@techcorp.io',
    phone: '+1 (555) 234-5678',
    organization: 'TechCorp Solutions',
    status: 'active',
    interestedStatus: 'hot',
    demoStartDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    demoExpiryDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
    magicToken: 'demo-tok-sophia-9823',
    loginUrl: 'http://localhost:5173/login?demoToken=demo-tok-sophia-9823',
    lastLoginAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    completionPercent: 60,
    completedLessonUuids: ['les-1', 'les-2'],
    notes: 'Requested group discount info for engineering team of 15 members.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    uuid: 'lead-demo-102',
    academyUuid: '550e8400-e29b-41d4-a716-446655440000',
    courseUuid: 'a8b9c1d2-3e4f-5678-90ab-cdef12345678',
    courseTitle: 'UI/UX Design Masterclass 2026',
    fullName: 'Marcus Vance',
    email: 'marcus.vance@designstudio.com',
    phone: '+1 (555) 876-5432',
    organization: 'Vance Design Lab',
    status: 'converted',
    interestedStatus: 'hot',
    demoStartDate: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    demoExpiryDate: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    magicToken: 'demo-tok-marcus-1102',
    loginUrl: 'http://localhost:5173/login?demoToken=demo-tok-marcus-1102',
    lastLoginAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
    completionPercent: 100,
    completedLessonUuids: ['les-1', 'les-2', 'les-3'],
    notes: 'Converted to full paid student account after completing demo module.',
    createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    uuid: 'lead-demo-103',
    academyUuid: '550e8400-e29b-41d4-a716-446655440000',
    courseUuid: '9c78bda1-98c2-4b11-8b81-92d3db12b501',
    courseTitle: 'Full-Stack Web Development Bootcamp',
    fullName: 'Aarav Patel',
    email: 'aarav.patel@devhouse.in',
    phone: '+91 98765 43210',
    organization: 'DevHouse India',
    status: 'expired',
    interestedStatus: 'warm',
    demoStartDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    demoExpiryDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    magicToken: 'demo-tok-aarav-3341',
    loginUrl: 'http://localhost:5173/login?demoToken=demo-tok-aarav-3341',
    lastLoginAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    completionPercent: 33,
    completedLessonUuids: ['les-1'],
    notes: 'Expired 2 days ago. Candidate for demo extension email.',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const useDemoLeadStore = create<DemoLeadStoreState>()(
  persist(
    (set, get) => ({
      leads: INITIAL_DEMO_LEADS,

      createDemoLead: (input) => {
        const token = `dtok-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
        const leadUuid = `lead-${Date.now()}`;
        const now = new Date();
        const expiryDate = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString();
        const loginUrl = `http://localhost:5173/login?demoToken=${token}&course=${input.courseUuid}`;

        const newLead: DemoLead = {
          uuid: leadUuid,
          academyUuid: input.academyUuid,
          courseUuid: input.courseUuid,
          courseTitle: input.courseTitle,
          fullName: input.fullName,
          email: input.email,
          phone: input.phone || '',
          organization: input.organization || '',
          status: 'active',
          interestedStatus: 'hot',
          demoStartDate: now.toISOString(),
          demoExpiryDate: expiryDate,
          magicToken: token,
          loginUrl,
          completionPercent: 0,
          completedLessonUuids: [],
          createdAt: now.toISOString(),
        };

        set((state) => ({ leads: [newLead, ...state.leads] }));
        return { lead: newLead, token, loginUrl };
      },

      extendDemoAccess: (leadUuid, extraDays) => {
        set((state) => ({
          leads: state.leads.map((l) => {
            if (l.uuid !== leadUuid) return l;
            const currentExpiry = new Date(l.demoExpiryDate).getTime() > Date.now() ? new Date(l.demoExpiryDate) : new Date();
            const newExpiry = new Date(currentExpiry.getTime() + extraDays * 24 * 60 * 60 * 1000).toISOString();
            return {
              ...l,
              demoExpiryDate: newExpiry,
              status: 'active',
              notes: `${l.notes ? l.notes + ' | ' : ''}Extended by ${extraDays} days on ${new Date().toLocaleDateString()}`,
            };
          }),
        }));
      },

      deactivateDemoAccess: (leadUuid) => {
        set((state) => ({
          leads: state.leads.map((l) => (l.uuid === leadUuid ? { ...l, status: 'deactivated' } : l)),
        }));
      },

      convertToPaidStudent: (leadUuid) => {
        set((state) => ({
          leads: state.leads.map((l) => (l.uuid === leadUuid ? { ...l, status: 'converted' } : l)),
        }));
      },

      updateLeadNotes: (leadUuid, notes) => {
        set((state) => ({
          leads: state.leads.map((l) => (l.uuid === leadUuid ? { ...l, notes } : l)),
        }));
      },

      getLeadsByAcademy: (academyUuid) => {
        return get().leads.filter((l) => l.academyUuid === academyUuid);
      },

      getStatsByAcademy: (academyUuid) => {
        const academyLeads = get().leads.filter((l) => l.academyUuid === academyUuid);
        const totalRegistrations = academyLeads.length;
        const now = Date.now();

        const activeDemoUsers = academyLeads.filter(
          (l) => l.status === 'active' && new Date(l.demoExpiryDate).getTime() > now
        ).length;

        const expiredDemos = academyLeads.filter(
          (l) => l.status === 'expired' || (l.status === 'active' && new Date(l.demoExpiryDate).getTime() <= now)
        ).length;

        const convertedCount = academyLeads.filter((l) => l.status === 'converted').length;
        const conversionRate = totalRegistrations > 0 ? Math.round((convertedCount / totalRegistrations) * 100) : 0;

        const totalProgress = academyLeads.reduce((sum, l) => sum + l.completionPercent, 0);
        const completionRate = totalRegistrations > 0 ? Math.round(totalProgress / totalRegistrations) : 0;

        const courseCountsMap = new Map<string, number>();
        academyLeads.forEach((l) => {
          courseCountsMap.set(l.courseTitle, (courseCountsMap.get(l.courseTitle) || 0) + 1);
        });

        const mostRequestedCourses = Array.from(courseCountsMap.entries())
          .map(([title, count]) => ({ title, count }))
          .sort((a, b) => b.count - a.count);

        return {
          totalRegistrations,
          activeDemoUsers,
          expiredDemos,
          conversionRate,
          completionRate,
          mostRequestedCourses,
        };
      },

      getLeadByToken: (token) => {
        return get().leads.find((l) => l.magicToken === token);
      },
    }),
    {
      name: 'cubixskill_demo_leads_store',
    }
  )
);
