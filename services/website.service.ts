const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export function resolveMediaUrl(url: string | null | undefined): string {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('data:')) {
    return url;
  }
  const cleanPath = url.startsWith('/') ? url : `/${url}`;
  return `${API_BASE}${cleanPath}`;
}

export interface PublicAcademyConfigResponse {
  academy: {
    name: string;
    slug: string;
    uuid: string;
    logo: string;
    favicon: string;
    theme_color: string;
    email: string;
    phone: string;
  };
  theme: Record<string, any>;
  home: {
    hero_title: string;
    hero_subtitle: string;
    hero_image_url?: string;
  };
  courses: {
    title: string;
    description: string;
  };
  contact: {
    title: string;
    description: string;
    whatsapp_number: string;
    address: string;
    business_hours: string;
  };
}

export const websitePublicService = {
  async getPublicAcademyWebsite(academySlugOrUuid: string): Promise<PublicAcademyConfigResponse | null> {
    try {
      const res = await fetch(`${API_BASE}/api/v1/website/public/academies/${academySlugOrUuid}/website/`, {
        cache: 'no-store',
      });
      if (!res.ok) return null;
      return await res.json();
    } catch {
      return null;
    }
  },

  async getPublicAcademyCourses(academySlugOrUuid: string): Promise<any[]> {
    try {
      const res = await fetch(`${API_BASE}/api/v1/website/public/academies/${academySlugOrUuid}/courses/`, {
        cache: 'no-store',
      });
      if (!res.ok) return [];
      return await res.json();
    } catch {
      return [];
    }
  }
};
