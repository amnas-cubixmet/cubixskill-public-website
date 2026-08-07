import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  bonusCredits: number;
  totalCredits: number;
  priceINR: number;
  isBestValue?: boolean;
  popularBadge?: string;
  description: string;
  features: string[];
  ctaText: string;
}

export interface BlogPost {
  uuid: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  authorName: string;
  authorAvatar: string;
  coverImage: string;
  publishedAt: string;
}

export interface PlatformFaq {
  question: string;
  answer: string;
  category: string;
}

interface PublicSiteStoreState {
  creditPackages: CreditPackage[];
  blogPosts: BlogPost[];
  faqs: PlatformFaq[];
  getPostByUuid: (uuid: string) => BlogPost | undefined;
}

export const MOCK_CREDIT_PACKAGES: CreditPackage[] = [
  {
    id: 'pack-starter',
    name: 'Starter Credits',
    credits: 500,
    bonusCredits: 50,
    totalCredits: 550,
    priceINR: 999,
    description: 'Ideal for independent instructors launching their first online academy courses.',
    features: [
      '500 Base Credits + 50 Bonus Credits',
      'QR Code Certificate Generation',
      'OMR Sheet Scanning & Auto-Grading',
      'Live Stream Class Streaming',
      'Credits Never Expire',
      'Instant Wallet Top-Up',
    ],
    ctaText: 'Buy Starter Pack',
  },
  {
    id: 'pack-growth',
    name: 'Growth Credits',
    credits: 2000,
    bonusCredits: 300,
    totalCredits: 2300,
    priceINR: 2999,
    isBestValue: true,
    popularBadge: 'MOST POPULAR',
    description: 'Perfect for growing academies with active student cohorts & regular assessments.',
    features: [
      '2,000 Base Credits + 300 Bonus Credits',
      'Custom Domain White-Labeling (SSL)',
      'Personal 1-on-1 Student Chat',
      'OMR & Online Quiz Engine',
      'SMS & WhatsApp Notification Triggers',
      'Priority Instructor Support',
    ],
    ctaText: 'Buy Growth Pack',
  },
  {
    id: 'pack-business',
    name: 'Business Credits',
    credits: 5000,
    bonusCredits: 1000,
    totalCredits: 6000,
    priceINR: 6999,
    description: 'For established training institutes requiring advanced CRM & multi-staff seats.',
    features: [
      '5,000 Base Credits + 1,000 Bonus Credits',
      'Sequential Drip Learning & Lesson Locking',
      'Lead Management CRM & Pipeline Engine',
      'Multi-Staff & Co-Instructor Seats',
      'Custom Academy CSS & Color Tokens',
      'Dedicated Account Support Manager',
    ],
    ctaText: 'Buy Business Pack',
  },
  {
    id: 'pack-enterprise',
    name: 'Enterprise Credits',
    credits: 15000,
    bonusCredits: 3500,
    totalCredits: 18500,
    priceINR: 19999,
    description: 'Tailored for large organizations requiring custom volume packs & 24/7 SLA.',
    features: [
      '15,000 Base Credits + 3,500 Bonus Credits',
      'Unlimited Active Student Capacity',
      'Custom Bulk Volume Discounts',
      'Enterprise SSO & SAML Integration',
      'Full REST API & Webhook Stream',
      'Dedicated 24/7 SLA Account Manager',
    ],
    ctaText: 'Contact Sales',
  },
];

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    uuid: 'blog-101',
    title: 'How to Launch a 6-Figure Online Academy in 2026',
    slug: 'launch-6-figure-online-academy',
    excerpt: 'Discover the exact step-by-step framework top instructors use to structure curriculum, convert leads, and scale recurring revenue.',
    content: `Building a profitable online academy requires more than just recording video lessons. In 2026, students demand interactive learning, 1-on-1 personal support, and verifiable credentials.

### 1. Structure Sequential Drip Learning
Don't overwhelm students with 50 hours of content on day one. Use drip learning to unlock modules based on assignment completion.

### 2. Leverage Personal Chat & Support Staff
Public community forums can get noisy. Personal 1-on-1 chat creates high accountability and improves course completion rates from 15% to 85%.

### 3. Issue QR-Verifiable Certificates
Certificates that can be instantly verified via QR codes give your academy credibility and encourage graduates to share their credentials on LinkedIn.`,
    category: 'Academy Growth',
    readTime: '6 min read',
    authorName: 'Dr. Vikramaditya Rao',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100',
    coverImage: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    publishedAt: '2026-08-01T10:00:00.000Z',
  },
  {
    uuid: 'blog-102',
    title: 'The Power of OMR & Direct-Answer Quiz Engines in Modern E-Learning',
    slug: 'omr-quiz-engines-e-learning',
    excerpt: 'Why physical and digital OMR question sets increase student engagement and provide rigorous evaluation.',
    content: 'Automated evaluation saves instructors hundreds of hours every month. Learn how CubixSkill integrates physical OMR sheet scanning and digital auto-grading.',
    category: 'Assessment',
    readTime: '4 min read',
    authorName: 'Priya Sharma',
    authorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    coverImage: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    publishedAt: '2026-08-03T14:30:00.000Z',
  },
];

export const MOCK_FAQS: PlatformFaq[] = [
  {
    question: 'How do CubixSkill platform credits work?',
    answer: 'Credits are consumed when executing platform actions such as issuing QR certificates, conducting live class streaming, sending SMS/WhatsApp notifications, and hosting media. You can purchase credit packages or upgrade your plan anytime.',
    category: 'Billing',
  },
  {
    question: 'Can I use my own custom domain for my academy website?',
    answer: 'Yes! On Growth, Professional, and Enterprise plans, you can connect your custom domain (e.g., learn.yourcompany.com) with automatic SSL certificate provisioning.',
    category: 'Customization',
  },
  {
    question: 'Is there a limit on the number of courses I can create?',
    answer: 'No, all CubixSkill plans allow you to create unlimited courses, modules, and lessons.',
    category: 'Features',
  },
];

export const usePublicSiteStore = create<PublicSiteStoreState>()(
  persist(
    (set, get) => ({
      creditPackages: MOCK_CREDIT_PACKAGES,
      blogPosts: MOCK_BLOG_POSTS,
      faqs: MOCK_FAQS,

      getPostByUuid: (uuid) => {
        return get().blogPosts.find((p) => p.uuid === uuid);
      },
    }),
    {
      name: 'cubixskill_public_site_store_v2',
    }
  )
);
