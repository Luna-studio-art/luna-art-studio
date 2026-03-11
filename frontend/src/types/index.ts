export interface Project {
  _id: string;
  title: string;
  slug: string;
  description: string;
  longDescription?: string;
  category: string;
  images: Image[];
  thumbnail: Image;
  videoUrl?: string;
  tools: string[];
  tags: string[];
  featured: boolean;
  order: number;
  process?: ProcessStep[];
  status: 'draft' | 'published';
  views: number;
  createdAt: string;
  updatedAt: string;
}

export interface Image {
  url: string;
  publicId?: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface ProcessStep {
  step: string;
  description: string;
  image?: string;
}

export interface Admin {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'super-admin';
  bio?: string;
  socialLinks?: SocialLinks;
  skills?: Skill[];
  experience?: Experience[];
}

export interface SocialLinks {
  instagram?: string;
  twitter?: string;
  youtube?: string;
  artstation?: string;
  website?: string;
}

export interface Skill {
  name: string;
  level: number;
}

export interface Experience {
  title: string;
  company: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface ApiResponse<T> {
  projects?: T[];
  project?: T;
  data?: T;
  totalPages?: number;
  currentPage?: number;
  total?: number;
  message?: string;
}

export interface UploadResponse {
  url: string;
  publicId: string;
  width?: number;
  height?: number;
  duration?: number;
}
