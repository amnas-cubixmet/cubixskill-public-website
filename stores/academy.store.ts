import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface AcademyTheme {
  primaryColor: string;
  primaryHover: string;
  primarySoft: string;
  secondaryColor: string;
  accentColor: string;
}

export interface AcademyBranding {
  academyUuid: string;
  name: string;
  tagline: string;
  logoUrl: string;
  faviconUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  aboutText: string;
  instructorName: string;
  instructorTitle: string;
  instructorAvatar: string;
  instructorBio: string;
  supportEmail: string;
  supportPhone: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    youtube?: string;
    github?: string;
  };
  theme: AcademyTheme;
}

interface AcademyStoreState {
  academies: AcademyBranding[];
  getAcademyByUuid: (uuid: string) => AcademyBranding | undefined;
  updateAcademyBranding: (uuid: string, data: Partial<AcademyBranding>) => void;
}

export const MOCK_ACADEMIES: AcademyBranding[] = [
  {
    academyUuid: '550e8400-e29b-41d4-a716-446655440000',
    name: 'Bright Academy of Technology',
    tagline: 'Master Full-Stack Engineering, Cloud Native, and React 19',
    logoUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=180',
    faviconUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=32',
    heroHeadline: 'Build Production-Grade Software with Hands-On Industry Mentorship',
    heroSubheadline: 'Join over 4,200 software engineers learning modern web architecture, cloud deployment, and system design.',
    aboutText: 'Bright Academy of Technology was founded in 2021 by Dr. Vikramaditya Rao to bridge the gap between academic computer science and modern enterprise software engineering practices.',
    instructorName: 'Dr. Vikramaditya Rao',
    instructorTitle: 'Principal Software Architect & Lead Instructor',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300',
    instructorBio: 'Former Senior Staff Architect with 15+ years leading distributed engineering teams. Author of 3 best-selling system design guides.',
    supportEmail: 'support@brightacademy.io',
    supportPhone: '+1 (800) 555-0199',
    socialLinks: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      youtube: 'https://youtube.com',
      github: 'https://github.com',
    },
    theme: {
      primaryColor: '#2563EB',
      primaryHover: '#1D4ED8',
      primarySoft: '#EFF6FF',
      secondaryColor: '#1E293B',
      accentColor: '#3B82F6',
    },
  },
  {
    academyUuid: '660f9511-f3ac-52e5-b827-557766551111',
    name: 'CodeVerse Software Academy',
    tagline: 'Enterprise DevOps, Kubernetes, and Cloud Native Infrastructure',
    logoUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=180',
    faviconUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=32',
    heroHeadline: 'Accelerate Your Career in Cloud Infrastructure & Kubernetes',
    heroSubheadline: 'Hands-on canary deployments, automated CI/CD pipelines, and microservices architecture.',
    aboutText: 'CodeVerse Software Academy specializes in enterprise DevOps training, preparing engineers for AWS, GCP, and Kubernetes certifications with real cluster sandboxes.',
    instructorName: 'Priya Sharma',
    instructorTitle: 'Head of Cloud DevOps & Infrastructure',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300',
    instructorBio: 'Certified Kubernetes Administrator (CKA) with extensive background automating multi-cloud Kubernetes clusters.',
    supportEmail: 'help@codeverse.in',
    supportPhone: '+91 98765 43210',
    socialLinks: {
      twitter: 'https://twitter.com',
      linkedin: 'https://linkedin.com',
      github: 'https://github.com',
    },
    theme: {
      primaryColor: '#059669',
      primaryHover: '#047857',
      primarySoft: '#ECFDF5',
      secondaryColor: '#064E3B',
      accentColor: '#10B981',
    },
  },
  {
    academyUuid: '770a0622-a4bd-63f6-c938-668877662222',
    name: 'MathWorld Data Institute',
    tagline: 'Applied Machine Learning, Neural Networks & AI Engineering',
    logoUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=180',
    faviconUrl: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=32',
    heroHeadline: 'Master Machine Learning & Large Language Models',
    heroSubheadline: 'From mathematical foundations to fine-tuning state-of-the-art transformer models for production.',
    aboutText: 'MathWorld Data Institute empowers data scientists and ML engineers with rigorous mathematical frameworks and PyTorch deep learning models.',
    instructorName: 'Dr. Meera Iyer',
    instructorTitle: 'AI Research Scientist & Professor',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300',
    instructorBio: 'Ph.D. in Machine Learning with 20+ peer-reviewed papers on neural network optimization and hyperparameter tuning.',
    supportEmail: 'contact@mathworld.edu',
    supportPhone: '+1 (888) 444-9876',
    socialLinks: {
      linkedin: 'https://linkedin.com',
      youtube: 'https://youtube.com',
    },
    theme: {
      primaryColor: '#D97706',
      primaryHover: '#B45309',
      primarySoft: '#FFFBEB',
      secondaryColor: '#78350F',
      accentColor: '#F59E0B',
    },
  },
];

export const useAcademyStore = create<AcademyStoreState>()(
  persist(
    (set, get) => ({
      academies: MOCK_ACADEMIES,

      getAcademyByUuid: (uuid) => {
        return get().academies.find((a) => a.academyUuid === uuid) || get().academies[0];
      },

      updateAcademyBranding: (uuid, data) => {
        set((state) => ({
          academies: state.academies.map((a) => (a.academyUuid === uuid ? { ...a, ...data } : a)),
        }));
      },
    }),
    {
      name: 'cubixskill_public_academy_store_v1',
    }
  )
);
