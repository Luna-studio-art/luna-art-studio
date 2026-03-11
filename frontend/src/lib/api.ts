import axios from 'axios';
import { Project, Admin, ApiResponse, UploadResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('admin');
      window.location.href = '/admin/login';
    }
    return Promise.reject(error);
  }
);

// Project APIs
export const projectApi = {
  getAll: async (params?: { category?: string; featured?: boolean; page?: number; limit?: number; search?: string }) => {
    const response = await api.get<ApiResponse<Project>>('/projects', { params });
    return response.data;
  },

  getFeatured: async () => {
    const response = await api.get<Project[]>('/projects/featured');
    return response.data;
  },

  getByCategory: async (category: string) => {
    const response = await api.get<Project[]>(`/projects/category/${encodeURIComponent(category)}`);
    return response.data;
  },

  getBySlug: async (slug: string) => {
    const response = await api.get<Project>(`/projects/${slug}`);
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get<string[]>('/projects/meta/categories');
    return response.data;
  },

  create: async (project: Partial<Project>) => {
    const response = await api.post<Project>('/projects', project);
    return response.data;
  },

  update: async (id: string, project: Partial<Project>) => {
    const response = await api.put<Project>(`/projects/${id}`, project);
    return response.data;
  },

  delete: async (id: string) => {
    const response = await api.delete(`/projects/${id}`);
    return response.data;
  },
};

// Upload APIs
export const uploadApi = {
  image: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('image', file);

    const response = await api.post<UploadResponse>('/upload/image', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  images: async (files: File[]): Promise<UploadResponse[]> => {
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file));

    const response = await api.post<UploadResponse[]>('/upload/images', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  video: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('video', file);

    const response = await api.post<UploadResponse>('/upload/video', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  deleteImage: async (publicId: string) => {
    const response = await api.delete(`/upload/image/${publicId}`);
    return response.data;
  },
};

// Auth APIs
export const authApi = {
  login: async (email: string, password: string) => {
    const response = await api.post<{ _id: string; email: string; name: string; token: string; role: string }>(
      '/auth/login',
      { email, password }
    );
    return response.data;
  },

  register: async (email: string, password: string, name: string) => {
    const response = await api.post('/auth/register', { email, password, name });
    return response.data;
  },

  getMe: async () => {
    const response = await api.get<Admin>('/auth/me');
    return response.data;
  },

  updateProfile: async (data: Partial<Admin>) => {
    const response = await api.put<Admin>('/auth/me', data);
    return response.data;
  },
};

export default api;
