import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CourseModule {
  id: string;
  title: string;
  lessonsCount: number;
  duration: string;
  lessons: { title: string; duration: string; isPreview?: boolean }[];
}

export interface CourseEntity {
  courseUuid: string;
  academyUuid: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  instructorName: string;
  instructorAvatar: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  price: number; // 0 for Free
  currency: string;
  duration: string;
  lessonCount: number;
  studentCount: number;
  rating: number;
  reviewsCount: number;
  isFeatured?: boolean;
  status: 'Published' | 'Draft' | 'Upcoming';
  whatYouWillLearn: string[];
  requirements: string[];
  modules: CourseModule[];
  faq: { question: string; answer: string }[];
  createdAt: string;
}

interface CourseStoreState {
  courses: CourseEntity[];
  getCoursesByAcademy: (academyUuid: string) => CourseEntity[];
  getCourseByUuid: (courseUuid: string) => CourseEntity | undefined;
  getFeaturedCourses: () => CourseEntity[];
}

export const MOCK_COURSES: CourseEntity[] = [
  {
    courseUuid: '9c78bda1-98c2-4b11-8b81-92d3db12b501',
    academyUuid: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Full Stack React 19 & Cloud Architecture',
    subtitle: 'Build scalable web applications with Server Actions, Hydration, and Zustand',
    description: 'Master the Next Generation of React 19 compiler optimizations, App Router architecture, and production cloud infrastructure.',
    thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800',
    instructorName: 'Dr. Vikramaditya Rao',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
    category: 'Web Development',
    level: 'Intermediate',
    language: 'English',
    price: 4999,
    currency: '₹',
    duration: '24 Hours',
    lessonCount: 25,
    studentCount: 1420,
    rating: 4.9,
    reviewsCount: 320,
    isFeatured: true,
    status: 'Published',
    whatYouWillLearn: [
      'Master React 19 Compiler, Server Actions, and Async Transitions',
      'Architect Zustand persistent stores with SSR hydration safety',
      'Deploy containerized React apps to AWS ECS & Vercel Edge',
      'Implement real-time 1-on-1 personal chat & WebSockets',
    ],
    requirements: ['Solid understanding of JavaScript ES6+', 'Basic experience with React or Node.js'],
    modules: [
      {
        id: 'mod-1',
        title: 'Module 1: React 19 Core Fundamentals & Async State',
        lessonsCount: 6,
        duration: '4h 30m',
        lessons: [
          { title: '1.1 React 19 Compiler Mechanics', duration: '35m', isPreview: true },
          { title: '1.2 useActionState & Optimistic UI Updates', duration: '45m', isPreview: true },
          { title: '1.3 Server Components vs Client Component Boundaries', duration: '50m' },
        ],
      },
      {
        id: 'mod-2',
        title: 'Module 2: State Hydration & Custom Zustand Tokens',
        lessonsCount: 8,
        duration: '6h 15m',
        lessons: [
          { title: '2.1 Preventing SSR Mismatch with useHasHydrated', duration: '40m' },
          { title: '2.2 Dynamic Theme Variable Injection', duration: '55m' },
        ],
      },
    ],
    faq: [
      { question: 'Is this course updated for React 19 final release?', answer: 'Yes! All code samples use React 19 stable APIs and Next.js App Router.' },
      { question: 'Do I receive a certificate upon completion?', answer: 'Yes, an automated QR-verifiable certificate is issued upon completing all lessons and assignments.' },
    ],
    createdAt: '2026-01-15T00:00:00.000Z',
  },
  {
    courseUuid: '8b67ac90-87b1-3a00-7a70-81c2ca01a400',
    academyUuid: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Enterprise DevOps & Kubernetes Deployment',
    subtitle: 'Automated CI/CD pipelines, Canary Releases, and Helm Charts',
    description: 'Learn enterprise Kubernetes orchestration from scratch. Deploy multi-region clusters with zero-downtime canary strategies.',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800',
    instructorName: 'Dr. Vikramaditya Rao',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
    category: 'DevOps & Cloud',
    level: 'Advanced',
    language: 'English',
    price: 7999,
    currency: '₹',
    duration: '32 Hours',
    lessonCount: 30,
    studentCount: 980,
    rating: 4.8,
    reviewsCount: 210,
    isFeatured: true,
    status: 'Published',
    whatYouWillLearn: [
      'Provision multi-master Kubernetes clusters with Terraform & Ansible',
      'Configure Helm charts for complex microservice architectures',
      'Automate Canary deployments with Istio Service Mesh & Prometheus',
    ],
    requirements: ['Linux command line proficiency', 'Basic Docker container knowledge'],
    modules: [
      {
        id: 'mod-devops-1',
        title: 'Module 1: Docker Containers & OCI Standards',
        lessonsCount: 5,
        duration: '5h',
        lessons: [{ title: '1.1 Multi-stage Docker Builds', duration: '40m', isPreview: true }],
      },
    ],
    faq: [
      { question: 'Are cloud credits provided for hands-on labs?', answer: 'Yes, sandbox cloud credentials are provided for the duration of the course.' },
    ],
    createdAt: '2026-02-01T00:00:00.000Z',
  },
  {
    courseUuid: '7a569b8f-76a0-29ff-696f-70b1b9009300',
    academyUuid: '660f9511-f3ac-52e5-b827-557766551111',
    title: 'Node.js Microservices & Event-Driven Architecture',
    subtitle: 'Build resilient message buses with RabbitMQ, Kafka, and Redis',
    description: 'Design distributed microservice backends that handle millions of events seamlessly with event sourcing and CQRS patterns.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    instructorName: 'Priya Sharma',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
    category: 'Backend Development',
    level: 'Advanced',
    language: 'English',
    price: 3999,
    currency: '₹',
    duration: '20 Hours',
    lessonCount: 22,
    studentCount: 850,
    rating: 4.9,
    reviewsCount: 185,
    isFeatured: true,
    status: 'Published',
    whatYouWillLearn: [
      'Implement Event-Driven Architecture using Apache Kafka',
      'Handle distributed transactions with SAGA patterns',
      'Optimize Redis caching for high-throughput APIs',
    ],
    requirements: ['Node.js & Express fundamentals'],
    modules: [],
    faq: [],
    createdAt: '2026-02-10T00:00:00.000Z',
  },
  {
    courseUuid: '6f458a7e-659f-18ee-585e-6f90a8ff8200',
    academyUuid: '770a0622-a4bd-63f6-c938-668877662222',
    title: 'Applied Machine Learning & PyTorch Neural Networks',
    subtitle: 'From mathematical gradient descent to fine-tuning LLMs',
    description: 'A comprehensive deep dive into PyTorch, computer vision, natural language processing, and LLM fine-tuning.',
    thumbnail: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800',
    instructorName: 'Dr. Meera Iyer',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120',
    category: 'Artificial Intelligence',
    level: 'Intermediate',
    language: 'English',
    price: 5999,
    currency: '₹',
    duration: '28 Hours',
    lessonCount: 28,
    studentCount: 1650,
    rating: 5.0,
    reviewsCount: 410,
    isFeatured: true,
    status: 'Published',
    whatYouWillLearn: [
      'Build Custom PyTorch Tensors and Neural Networks',
      'Implement Transformer Architecture & Attention Mechanisms',
      'Fine-tune Llama 3 & Mistral models with LoRA & QLoRA',
    ],
    requirements: ['Python 3.10+ programming', 'Basic Linear Algebra & Calculus'],
    modules: [],
    faq: [],
    createdAt: '2026-03-01T00:00:00.000Z',
  },
  {
    courseUuid: '5e34796d-548e-07dd-474d-5e8097ee7100',
    academyUuid: '550e8400-e29b-41d4-a716-446655440000',
    title: 'TypeScript 5 Enterprise Design Patterns',
    subtitle: 'Generic type algebra, decorators, and scalable codebases',
    description: 'Master advanced TypeScript 5 type system features, conditional types, mapped types, and clean code architecture.',
    thumbnail: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800',
    instructorName: 'Dr. Vikramaditya Rao',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
    category: 'Web Development',
    level: 'Intermediate',
    language: 'English',
    price: 0, // Free course
    currency: '₹',
    duration: '10 Hours',
    lessonCount: 14,
    studentCount: 2300,
    rating: 4.9,
    reviewsCount: 510,
    isFeatured: false,
    status: 'Published',
    whatYouWillLearn: [
      'Write advanced generic utility types and template literal types',
      'Implement Clean Architecture in TypeScript projects',
    ],
    requirements: ['Basic JavaScript experience'],
    modules: [],
    faq: [],
    createdAt: '2026-03-15T00:00:00.000Z',
  },
  {
    courseUuid: '4d23685c-437d-f6cc-363c-4d7086dd6000',
    academyUuid: '660f9511-f3ac-52e5-b827-557766551111',
    title: 'AWS Certified Solutions Architect Masterclass',
    subtitle: 'Pass the SAA-C03 exam with real VPC, IAM, and Lambda labs',
    description: 'Complete hands-on preparation for the AWS Solutions Architect Associate exam with 100+ practice questions and real architecture labs.',
    thumbnail: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    instructorName: 'Priya Sharma',
    instructorAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120',
    category: 'DevOps & Cloud',
    level: 'Beginner',
    language: 'English',
    price: 3499,
    currency: '₹',
    duration: '18 Hours',
    lessonCount: 20,
    studentCount: 1100,
    rating: 4.7,
    reviewsCount: 240,
    isFeatured: false,
    status: 'Published',
    whatYouWillLearn: ['Design resilient multi-AZ AWS VPC networks', 'Configure IAM policies, KMS encryption, and S3 lifecycle rules'],
    requirements: ['General IT knowledge'],
    modules: [],
    faq: [],
    createdAt: '2026-04-01T00:00:00.000Z',
  },
  {
    courseUuid: '3c12574b-326c-e5bb-252b-3c6075cc5000',
    academyUuid: '770a0622-a4bd-63f6-c938-668877662222',
    title: 'Data Science & Statistical Analysis with Python',
    subtitle: 'Pandas, NumPy, Matplotlib, and Hypothesis Testing',
    description: 'Learn data cleaning, exploratory data analysis, statistical modeling, and data visualization using modern Python libraries.',
    thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    instructorName: 'Dr. Meera Iyer',
    instructorAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120',
    category: 'Artificial Intelligence',
    level: 'Beginner',
    language: 'English',
    price: 2499,
    currency: '₹',
    duration: '15 Hours',
    lessonCount: 16,
    studentCount: 1950,
    rating: 4.8,
    reviewsCount: 380,
    isFeatured: false,
    status: 'Published',
    whatYouWillLearn: ['Perform data wrangling with Pandas DataFrames', 'Conduct Statistical Hypothesis testing (t-tests, ANOVA)'],
    requirements: ['No prior programming needed'],
    modules: [],
    faq: [],
    createdAt: '2026-04-10T00:00:00.000Z',
  },
  {
    courseUuid: '2b01463a-215b-d4aa-141a-2b5064bb4000',
    academyUuid: '550e8400-e29b-41d4-a716-446655440000',
    title: 'Next.js 16 App Router & GraphQL Masterclass',
    subtitle: 'Server Actions, Apollo Client, and Tailwind CSS v4',
    description: 'Build modern headless web applications combining GraphQL schemas, Next.js Server Components, and sleek Tailwind CSS design systems.',
    thumbnail: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800',
    instructorName: 'Dr. Vikramaditya Rao',
    instructorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120',
    category: 'Web Development',
    level: 'Intermediate',
    language: 'English',
    price: 4499,
    currency: '₹',
    duration: '22 Hours',
    lessonCount: 24,
    studentCount: 740,
    rating: 4.9,
    reviewsCount: 160,
    isFeatured: false,
    status: 'Published',
    whatYouWillLearn: ['Integrate Apollo Client with React 19 Server Components', 'Build GraphQL resolvers and mutations'],
    requirements: ['React basics'],
    modules: [],
    faq: [],
    createdAt: '2026-05-01T00:00:00.000Z',
  },
];

export const useCourseStore = create<CourseStoreState>()(
  persist(
    (set, get) => ({
      courses: MOCK_COURSES,

      getCoursesByAcademy: (academyUuid) => {
        return get().courses.filter((c) => c.academyUuid === academyUuid);
      },

      getCourseByUuid: (courseUuid) => {
        return get().courses.find((c) => c.courseUuid === courseUuid);
      },

      getFeaturedCourses: () => {
        return get().courses.filter((c) => c.isFeatured);
      },
    }),
    {
      name: 'cubixskill_public_course_store_v2',
    }
  )
);
